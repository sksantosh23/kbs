import { describe, expect, it } from 'vitest';
import { csrfMatches } from '../../src/server/auth';

describe('admin CSRF boundary', () => {
  it('requires an exact non-empty token match', () => {
    expect(csrfMatches('token-value', 'token-value')).toBe(true);
    expect(csrfMatches('token-value', 'token-value-x')).toBe(false);
    expect(csrfMatches('token-value', undefined)).toBe(false);
    expect(csrfMatches(undefined, 'token-value')).toBe(false);
  });
});
