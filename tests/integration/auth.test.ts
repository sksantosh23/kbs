import { describe, expect, it } from 'vitest';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { consumeRateLimit, csrfMatches } from '../../src/server/auth';
import { resetDbForTests } from '../../src/server/database';

describe('admin CSRF boundary', () => {
  it('requires an exact non-empty token match', () => {
    expect(csrfMatches('token-value', 'token-value')).toBe(true);
    expect(csrfMatches('token-value', 'token-value-x')).toBe(false);
    expect(csrfMatches('token-value', undefined)).toBe(false);
    expect(csrfMatches(undefined, 'token-value')).toBe(false);
  });
});

describe('first-party login rate limiting', () => {
  it('blocks after the configured number of attempts', () => {
    const dir = mkdtempSync(join(tmpdir(), 'kora-auth-'));
    process.env.KORA_DB_PATH = join(dir, 'kora.sqlite');
    resetDbForTests();
    for (let i = 0; i < 5; i++) expect(consumeRateLimit('login:synthetic')).toBe(true);
    expect(consumeRateLimit('login:synthetic')).toBe(false);
    resetDbForTests();
    delete process.env.KORA_DB_PATH;
    rmSync(dir, { recursive: true, force: true });
  });
});
