import {describe, expect, it} from 'vitest';
import {acquisitionTypes, canTransition, deriveQueue, inquiryFields, inquiryTypes, statuses, validateInquiry, type InquiryType, type Status} from '../../src/domain/inquiry';

function fixture(type: InquiryType): Record<string, unknown> {
  const input: Record<string, unknown> = {type, contact_name: 'Synthetic Visitor', email: 'visitor@example.test', details: 'We supply laboratory equipment and seek a business introduction.'};
  if (type === 'PRODUCT') input.subject = 'Laboratory equipment';
  if (type === 'GOVERNMENT') Object.assign(input, {organization: 'Synthetic agency', acquisition_type: 'RFQ'});
  if (['SERVICE', 'LOGISTICS'].includes(type)) input.timing = 'Next quarter';
  if (['IOT_CONNECTED_SYSTEMS', 'TECHNOLOGY'].includes(type)) input.desired_outcome = 'Improve operational visibility';
  if (type === 'IOT_CONNECTED_SYSTEMS') input.device_context = 'Environmental sensors';
  return input;
}
function accepted(input: Record<string, unknown>) {
  const result = validateInquiry(input);
  expect(result).toMatchObject({ok: true});
  if (!result.ok) throw new Error(JSON.stringify(result.errors));
  return result.value;
}
function rejected(input: Record<string, unknown>, key: string) {
  const result = validateInquiry(input);
  expect(result.ok).toBe(false);
  if (!result.ok) expect(result.errors[key]).toBeTruthy();
}

describe('FR-003, FR-007, FR-010 bounded inquiry validation', () => {
  for (const type of inquiryTypes) {
    it(`${type} accepts only its minimum fields`, () => {
      const value = accepted(fixture(type));
      expect(value.type).toBe(type);
      expect(value.subject.length).toBeGreaterThan(0);
      expect(value.structured_data).not.toHaveProperty('email');
    });
    it(`${type} accepts all applicable optional fields and omits blank optional values`, () => {
      const input = fixture(type);
      for (const f of inquiryFields(type)) {
        if (!f.required) input[f.name] = f.options?.[0] ?? (f.kind === 'url' ? 'https://example.test/' : f.kind === 'date' ? '2028-02-29' : 'Synthetic value');
      }
      const value = accepted(input);
      for (const f of inquiryFields(type)) {
        if (!f.required) {
          input[f.name] = '  ';
          const blank = accepted(input);
          expect(blank.structured_data).not.toHaveProperty(f.name);
        }
      }
      expect(value.subject).toBeTruthy();
    });
    for (const f of inquiryFields(type)) {
      if (f.required) it(`${type} requires ${f.name}`, () => {const input = fixture(type); delete input[f.name]; rejected(input, f.name); rejected({...input, [f.name]: '  '}, f.name);});
      it(`${type}.${f.name} rejects non-string and oversized input`, () => {
        for (const bad of [null, 1, false, [], {}, 'x'.repeat(f.maxLength + 1)]) rejected({...fixture(type), [f.name]: bad}, f.name);
      });
    }
    it(`${type} rejects queue overrides and unknown fields even when empty`, () => {
      for (const key of ['routing_queue', 'status', 'structured_data', 'unknown', '__proto__', 'constructor']) rejected({...fixture(type), [key]: ''}, key);
    });
  }
  it('accepts partner introductions without organization, title, or duplicate capability answers', () => {
    for (const type of ['SUPPLIER', 'TEAMING'] as const) expect(accepted(fixture(type)).organization).toBeUndefined();
  });
  it('does not infer business qualification or scan free text', () => {
    expect(accepted({...fixture('GENERAL'), details: '<script>synthetic markup</script> RFQ procurement'}).details).toBe('<script>synthetic markup</script> RFQ procurement');
  });
  it('normalizes whitespace and preserves email case and date-only semantics', () => {
    const value = accepted({...fixture('GOVERNMENT'), email: ' Name@Example.test ', details: ' First\r\nSecond ', due_date: '2028-02-29', solicitation_url: 'https://EXAMPLE.test'});
    expect(value.email).toBe('Name@Example.test');
    expect(value.details).toBe('First\nSecond');
    expect(value.structured_data).toMatchObject({due_date: '2028-02-29', solicitation_url: 'https://example.test/'});
  });
  it('rejects impossible dates, unsafe URLs, malformed emails and controls', () => {
    for (const due_date of ['2026-02-29', '2026-04-31', 'today', '2026-1-01']) rejected({...fixture('GOVERNMENT'), due_date}, 'due_date');
    for (const website of ['javascript:alert(1)', 'ftp://example.test', '/relative', 'https://user:pass@example.test']) rejected({...fixture('SUPPLIER'), website}, 'website');
    for (const email of ['a', 'a@b', 'a@@b.test', 'a b@example.test', 'a@b..test']) rejected({...fixture('GENERAL'), email}, 'email');
    rejected({...fixture('GENERAL'), details: 'bad\u0000value'}, 'details');
  });
  it('rejects unknown enums and inapplicable fields', () => {
    rejected({...fixture('GENERAL'), type: 'general'}, 'type');
    rejected({...fixture('GOVERNMENT'), acquisition_type: 'UNKNOWN'}, 'acquisition_type');
    rejected({...fixture('SERVICE'), business_context: 'CONTRACTS'}, 'business_context');
    rejected({...fixture('PRODUCT'), substitution: 'maybe'}, 'substitution');
    rejected({...fixture('GENERAL'), business_context: 'contracting'}, 'business_context');
    rejected({...fixture('PRODUCT'), acquisition_type: 'RFQ'}, 'acquisition_type');
    rejected({...fixture('GOVERNMENT'), business_context: 'procurement'}, 'business_context');
  });
  it('ignores inherited values and safely rejects non-object runtime input', () => {
    rejected(Object.create(fixture('GENERAL')), 'type');
    for (const input of [null, undefined, [], 'text']) expect(validateInquiry(input as unknown as Record<string, unknown>).ok).toBe(false);
  });
});

describe('Q02 / BR-029 deterministic queue routing', () => {
  for (const acquisition_type of acquisitionTypes) it(`Government ${acquisition_type}`, () => {
    expect(deriveQueue(accepted({...fixture('GOVERNMENT'), acquisition_type}))).toBe(['RFQ', 'RFI'].includes(acquisition_type) ? 'PROCUREMENT' : 'CONTRACTS');
  });
  for (const type of ['IOT_CONNECTED_SYSTEMS', 'TECHNOLOGY', 'SERVICE', 'LOGISTICS'] as const) {
    for (const business_context of [undefined, 'general', 'procurement', 'contracting']) it(`${type} ${business_context ?? 'unspecified'} context`, () => {
      expect(deriveQueue(accepted({...fixture(type), ...(business_context ? {business_context} : {})}))).toBe(business_context === 'contracting' ? 'CONTRACTS' : business_context === 'procurement' ? 'PROCUREMENT' : 'GENERAL');
    });
  }
  for (const [type, queue] of [['PRODUCT', 'PROCUREMENT'], ['MEDICAL_TECHNOLOGY', 'PROCUREMENT'], ['SUPPLIER', 'PROCUREMENT'], ['TEAMING', 'CONTRACTS'], ['OTHER', 'GENERAL'], ['GENERAL', 'GENERAL']] as const) it(`${type} default ignores free-text keywords`, () => {
    expect(deriveQueue(accepted({...fixture(type), details: 'RFP contracting procurement RFQ'}))).toBe(queue);
  });
});

describe('Q04 forward-only lifecycle', () => {
  const allowed = new Set(['NEW:IN_REVIEW', 'NEW:SPAM', 'IN_REVIEW:CONTACTED', 'IN_REVIEW:SPAM', 'CONTACTED:CLOSED', 'CONTACTED:SPAM']);
  for (const from of statuses) for (const to of statuses) it(`${from} → ${to}`, () => expect(canTransition(from, to)).toBe(from === to || allowed.has(`${from}:${to}`)));
  it('rejects unknown states including matching unknown values', () => {
    expect(canTransition('UNKNOWN' as Status, 'UNKNOWN' as Status)).toBe(false);
    expect(canTransition('NEW', 'UNKNOWN' as Status)).toBe(false);
  });
});
