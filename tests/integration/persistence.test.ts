import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { getDb, openDatabase, resetDbForTests } from '../../src/server/database';
import { listInquiries, submitInquiry } from '../../src/application/inquiries';

describe('first-party SQLite schema and receipt persistence', () => {
  let dir: string;

  beforeEach(() => { dir = mkdtempSync(join(tmpdir(), 'kora-db-')); });
  afterEach(() => { resetDbForTests(); rmSync(dir, { recursive: true, force: true }); delete process.env.KORA_DB_PATH; });

  it('creates constrained tables and persists inquiry rows', () => {
    const db = openDatabase(join(dir, 'kora.sqlite'));
    const now = Date.now();
    db.prepare('INSERT INTO inquiries(id,public_reference,type,routing_queue,status,contact_name,email,subject,details,structured_data,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)').run('i1', 'KORA-TEST', 'GENERAL', 'GENERAL', 'NEW', 'Test', 'test@example.test', 'Topic', 'Details', '{}', now, now);
    expect((db.prepare('SELECT count(*) n FROM inquiries').get() as any).n).toBe(1);
    expect((db.prepare('PRAGMA foreign_keys').get() as any).foreign_keys).toBe(1);
  });

  it('retires an accepted attempt after inquiry deletion and prevents recreation', () => {
    process.env.KORA_DB_PATH = join(dir, 'kora.sqlite');
    resetDbForTests();
    const input = { type: 'GENERAL', contact_name: 'Test', email: 'test@example.test', details: 'A durable synthetic inquiry.' };
    const attempt = 'attempt-retirement-test-1234567890';
    const first = submitInquiry(input, attempt);
    expect(first.ok).toBe(true);
    const db = getDb();
    const row = db.prepare('SELECT token_hash,inquiry_id FROM attempts').get() as any;
    db.prepare('UPDATE attempts SET retired=1,inquiry_id=NULL WHERE token_hash=?').run(row.token_hash);
    db.prepare('DELETE FROM inquiries WHERE id=?').run(row.inquiry_id);
    const retry = submitInquiry(input, attempt);
    expect(retry.ok).toBe(false);
    if (!retry.ok) expect(retry.errors.form).toMatch(/expired/i);
  });

  it('filters the private inbox by queue, status and bounded text search', () => {
    process.env.KORA_DB_PATH = join(dir, 'kora.sqlite');
    resetDbForTests();
    submitInquiry({ type: 'GENERAL', contact_name: 'Alpha Contact', email: 'alpha@example.test', details: 'Alpha request.' }, 'attempt-filter-alpha-123456789');
    submitInquiry({ type: 'PRODUCT', contact_name: 'Beta Contact', email: 'beta@example.test', subject: 'Beta sourcing', details: 'Beta request.' }, 'attempt-filter-beta-123456789');
    expect(listInquiries({ q: 'alpha' })).toHaveLength(1);
    expect(listInquiries({ routing_queue: 'PROCUREMENT', status: 'NEW' })).toHaveLength(1);
    expect(listInquiries({ q: 'example.test', type: 'GENERAL' })).toHaveLength(1);
  });

  it('applies a bounded server-side rate limit after idempotent retry checks', () => {
    process.env.KORA_DB_PATH = join(dir, 'kora.sqlite');
    resetDbForTests();
    const browser = 'synthetic-browser-rate-limit';
    for (let i = 0; i < 5; i++) {
      const result = submitInquiry({ type: 'GENERAL', contact_name: `Test ${i}`, email: `test${i}@example.test`, details: 'A bounded synthetic inquiry.' }, `attempt-rate-limit-${i}-123456789`, browser);
      expect(result.ok).toBe(true);
    }
    const blocked = submitInquiry({ type: 'GENERAL', contact_name: 'Blocked', email: 'blocked@example.test', details: 'A bounded synthetic inquiry.' }, 'attempt-rate-limit-blocked-123456789', browser);
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) expect(blocked.rateLimited).toBe(true);
  });
});
