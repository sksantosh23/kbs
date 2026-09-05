export const inquiryTypes = ['PRODUCT', 'MEDICAL_TECHNOLOGY', 'IOT_CONNECTED_SYSTEMS', 'SERVICE', 'LOGISTICS', 'TECHNOLOGY', 'GOVERNMENT', 'OTHER', 'SUPPLIER', 'TEAMING', 'GENERAL'] as const;
export type InquiryType = typeof inquiryTypes[number];
export type Queue = 'GENERAL' | 'PROCUREMENT' | 'CONTRACTS';
export const statuses = ['NEW', 'IN_REVIEW', 'CONTACTED', 'CLOSED', 'SPAM'] as const;
export type Status = typeof statuses[number];
export interface ValidatedInquiry {
  type: InquiryType; contact_name: string; email: string; organization?: string; phone?: string;
  subject: string; details: string; structured_data: Record<string, string>;
}
export const typeLabels: Record<InquiryType, string> = {
  PRODUCT: 'Product / sourcing', MEDICAL_TECHNOLOGY: 'Medical & invasive technologies',
  IOT_CONNECTED_SYSTEMS: 'IoT & connected systems', SERVICE: 'Service', LOGISTICS: 'Logistics / trade coordination',
  TECHNOLOGY: 'Technology enablement', GOVERNMENT: 'Government / public sector', OTHER: 'Other requirement',
  SUPPLIER: 'Supplier introduction', TEAMING: 'Teaming introduction', GENERAL: 'General contact',
};
export interface InquiryField {
  name: string; label: string; required: boolean; maxLength: number;
  kind?: 'email' | 'url' | 'date' | 'textarea' | 'select'; options?: readonly string[];
}
const field = (name: string, label: string, required = false, maxLength = 500, kind?: InquiryField['kind'], options?: readonly string[]): InquiryField => ({name, label, required, maxLength, kind, options});
const timing = field('timing', 'Timing (if known)');
const location = field('location', 'Delivery / work location (if relevant)');
const quantity = field('quantity', 'Quantity or scope (if known)', false, 200);
const brand = field('brand', 'Manufacturer / brand preference', false, 200);
const substitution = field('substitution', 'Substitution permitted', false, 6, 'select', ['Yes', 'No', 'Unsure']);
const outcome = field('desired_outcome', 'Desired outcome', true, 2000, 'textarea');
const context = field('business_context', 'Business context', false, 11, 'select', ['general', 'procurement', 'contracting']);
export const acquisitionTypes = ['RFQ', 'RFP', 'RFI', 'RFC', 'FFP', 'SOLICITATION', 'CONTRACT', 'SUBCONTRACT', 'TEAMING', 'OTHER'] as const;
const specific: Record<InquiryType, InquiryField[]> = {
  PRODUCT: [quantity, timing, location, brand, substitution, field('notes', 'Additional notes', false, 2000, 'textarea')],
  MEDICAL_TECHNOLOGY: [field('category', 'Category / use context (if known)'), quantity, timing, location, brand, field('model_reference', 'Model / reference', false, 200), substitution, field('constraints', 'Non-sensitive regulatory / facility constraints', false, 2000, 'textarea')],
  IOT_CONNECTED_SYSTEMS: [field('device_context', 'Device / system context', true, 2000, 'textarea'), outcome, timing, field('environment', 'Environment type'), field('endpoint_count', 'Approximate device / endpoint count', false, 200), field('connectivity_constraints', 'Non-sensitive connectivity constraints', false, 2000, 'textarea'), field('integration_goals', 'Integration goals', false, 2000, 'textarea'), context],
  SERVICE: [field('timing', 'Desired start / timing', true), location, field('duration', 'Duration'), field('capacity', 'Staffing / capacity estimate'), field('constraints', 'Additional constraints', false, 2000, 'textarea'), context],
  LOGISTICS: [field('timing', 'Desired timing', true), field('origin', 'Origin region (if known)'), field('destination', 'Destination region (if known)'), field('cargo_type', 'Cargo type'), field('dimensions_weight', 'Estimated dimensions / weight'), field('mode', 'Preferred mode'), field('trade_notes', 'Trade-coordination notes', false, 2000, 'textarea'), context],
  TECHNOLOGY: [outcome, timing, field('environment', 'Current environment summary', false, 2000, 'textarea'), field('integration_constraints', 'Non-sensitive integration constraints', false, 2000, 'textarea'), context],
  GOVERNMENT: [field('acquisition_type', 'Acquisition / opportunity type', true, 12, 'select', acquisitionTypes), field('due_date', 'Response / due date (if applicable)', false, 10, 'date'), field('notice_number', 'Solicitation / notice number', false, 200), field('solicitation_url', 'Public solicitation URL', false, 2048, 'url'), field('set_aside', 'Appropriate set-aside / category information'), field('contract_reference', 'Contract / vehicle reference'), field('instructions', 'Non-sensitive instructions', false, 2000, 'textarea')],
  OTHER: [], SUPPLIER: [field('supplier_type', 'Supplier type'), field('capabilities', 'Capabilities / categories', false, 2000, 'textarea'), field('operating_region', 'Operating region'), field('website', 'Website (if applicable)', false, 2048, 'url')],
  TEAMING: [field('geographic_coverage', 'Geographic coverage'), field('business_information', 'Voluntary relevant business information', false, 2000, 'textarea'), field('partnership_interest', 'Partnership interest', false, 2000, 'textarea')], GENERAL: [],
};
/** One field contract for public controls and authoritative server validation. */
export function inquiryFields(type: InquiryType): InquiryField[] {
  const fields = [field('contact_name', 'Contact name', true, 150), field('email', 'Email', true, 254, 'email'), field('organization', type === 'GOVERNMENT' ? 'Agency / organization' : 'Organization', type === 'GOVERNMENT', 200), field('phone', 'Phone', false, 50), field('subject', type === 'GENERAL' ? 'Topic' : 'Requirement title', type === 'PRODUCT', 200), field('details', type === 'SUPPLIER' || type === 'TEAMING' ? 'Capability / partnership summary' : 'Requirement summary / message', true, 10000, 'textarea')];
  if (!['GENERAL', 'SUPPLIER', 'TEAMING'].includes(type)) fields.push(field('job_title', 'Job title', false, 150), field('preferred_contact_method', 'Preferred contact method', false, 5, 'select', ['Email', 'Phone']));
  return [...fields, ...specific[type]];
}
const common = new Set(['contact_name', 'email', 'organization', 'phone', 'subject', 'details']);
export function validateInquiry(input: Record<string, unknown>): {ok: true; value: ValidatedInquiry} | {ok: false; errors: Record<string, string>} {
  const errors: Record<string, string> = Object.create(null);
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {ok: false, errors: {type: 'Choose a valid inquiry type.'}};
  if (!Object.hasOwn(input, 'type') || !inquiryTypes.includes(input.type as InquiryType)) return {ok: false, errors: {type: 'Choose a valid inquiry type.'}};
  const type = input.type as InquiryType;
  const fields = inquiryFields(type);
  const allowed = new Set(['type', ...fields.map(f => f.name)]);
  for (const key of Object.keys(input)) if (!allowed.has(key)) errors[key] = 'This field is not supported for this inquiry type.';
  const normalized: Record<string, string> = {};
  for (const f of fields) {
    const raw = Object.hasOwn(input, f.name) ? input[f.name] : undefined;
    if (raw !== undefined && typeof raw !== 'string') {errors[f.name] = 'Enter a text value.'; continue;}
    if (typeof raw === 'string' && raw.length > f.maxLength) {errors[f.name] = `Use ${f.maxLength} characters or fewer.`; continue;}
    const value = typeof raw === 'string' ? raw.trim().replace(/\r\n?/g, '\n') : '';
    if (!value) {if (f.required) errors[f.name] = `${f.label} is required.`; continue;}
    if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)) {errors[f.name] = 'Remove unsupported control characters.'; continue;}
    if (f.options && !f.options.includes(value)) {errors[f.name] = 'Choose a listed option.'; continue;}
    if (f.kind === 'email' && !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(value)) {errors[f.name] = 'Enter a valid email address.'; continue;}
    if (f.kind === 'date') {
      const date = new Date(`${value}T00:00:00.000Z`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) {errors[f.name] = 'Enter a valid date (YYYY-MM-DD).'; continue;}
    }
    if (f.kind === 'url') {
      try {
        const url = new URL(value);
        if (!['http:', 'https:'].includes(url.protocol) || !url.hostname || url.username || url.password) throw new Error('invalid');
        normalized[f.name] = url.href;
      } catch {errors[f.name] = 'Enter a public HTTP or HTTPS URL without credentials.';}
    } else normalized[f.name] = value;
  }
  if (Object.keys(errors).length) return {ok: false, errors};
  return {ok: true, value: {type, contact_name: normalized.contact_name!, email: normalized.email!, ...(normalized.organization ? {organization: normalized.organization} : {}), ...(normalized.phone ? {phone: normalized.phone} : {}), subject: normalized.subject || typeLabels[type], details: normalized.details!, structured_data: Object.fromEntries(Object.entries(normalized).filter(([key]) => !common.has(key)))}};
}
export function deriveQueue(value: ValidatedInquiry): Queue {
  if (value.type === 'GOVERNMENT') return ['RFQ', 'RFI'].includes(value.structured_data.acquisition_type!) ? 'PROCUREMENT' : 'CONTRACTS';
  if (value.type === 'TEAMING') return 'CONTRACTS';
  if (['SUPPLIER', 'PRODUCT', 'MEDICAL_TECHNOLOGY'].includes(value.type)) return 'PROCUREMENT';
  if (['IOT_CONNECTED_SYSTEMS', 'TECHNOLOGY', 'SERVICE', 'LOGISTICS'].includes(value.type)) {
    if (value.structured_data.business_context === 'contracting') return 'CONTRACTS';
    if (value.structured_data.business_context === 'procurement') return 'PROCUREMENT';
  }
  return 'GENERAL';
}
const transitions: Record<Status, readonly Status[]> = {NEW: ['IN_REVIEW', 'SPAM'], IN_REVIEW: ['CONTACTED', 'SPAM'], CONTACTED: ['CLOSED', 'SPAM'], CLOSED: [], SPAM: []};
export function canTransition(from: Status, to: Status): boolean {
  return statuses.includes(from) && statuses.includes(to) && (from === to || transitions[from].includes(to));
}
