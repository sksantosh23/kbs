import { strict as assert } from 'node:assert';
import { mkdtemp, rm, stat } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { test } from 'node:test';
import { randomUUID } from 'node:crypto';

const root = fileURLToPath(new URL('../..', import.meta.url));

function runScript(script, args, env, stdin = '') {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, ['--experimental-strip-types', script, ...args], {
      cwd: root,
      env: { ...process.env, ...env },
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    child.stdout.setEncoding('utf8').on('data', chunk => { stdout += chunk; });
    child.stderr.setEncoding('utf8').on('data', chunk => { stderr += chunk; });
    child.on('close', code => resolve({ code, stdout, stderr }));
    child.stdin.end(stdin);
  });
}

test('operational TypeScript CLIs provision, update, back up and safely gate retention', async () => {
  const directory = await mkdtemp('/tmp/kbs-ops-');
  const database = join(directory, 'kora.sqlite');
  const backup = join(directory, 'backup.sqlite');
  const env = { KORA_DB_PATH: database };
  const firstPassword = `fixture-${randomUUID()}-Aa9`;
  const secondPassword = `fixture-${randomUUID()}-Bb8`;
  const invalidPassword = `fixture-${randomUUID()}-Cc7`;
  try {
    const created = await runScript('scripts/admin.ts', ['test-admin'], env, `${firstPassword}\n${firstPassword}\n`);
    assert.equal(created.code, 0, created.stderr);
    assert.doesNotMatch(`${created.stdout}\n${created.stderr}`, new RegExp(firstPassword, 'u'));

    const db = new DatabaseSync(database);
    const first = db.prepare('SELECT id,password_hash FROM admins WHERE username=?').get('test-admin');
    assert.ok(first);
    assert.equal(db.prepare('SELECT COUNT(*) AS count FROM admins').get().count, 1);
    const sessionToken = 'session-token-hash';
    db.prepare('INSERT INTO sessions(token_hash,admin_id,csrf,created_at,last_seen,expires_at) VALUES(?,?,?,?,?,?)')
      .run(sessionToken, first.id, 'csrf', Date.now(), Date.now(), Date.now() + 60_000);
    db.close();

    const updated = await runScript('scripts/admin.ts', ['test-admin'], env, `${secondPassword}\n${secondPassword}\n`);
    assert.equal(updated.code, 0, updated.stderr);
    assert.doesNotMatch(`${updated.stdout}\n${updated.stderr}`, new RegExp(secondPassword, 'u'));

    const secondDb = new DatabaseSync(database);
    const second = secondDb.prepare('SELECT id,password_hash FROM admins WHERE username=?').get('test-admin');
    assert.equal(second.id, first.id);
    assert.notEqual(second.password_hash, first.password_hash);
    assert.equal(secondDb.prepare('SELECT COUNT(*) AS count FROM sessions WHERE admin_id=?').get(first.id).count, 0);
    secondDb.close();

    const { verifyPassword } = await import('../../src/server/auth.ts');
    assert.equal(await verifyPassword(secondPassword, second.password_hash), true);
    assert.equal(await verifyPassword(firstPassword, second.password_hash), false);

    const invalid = await runScript('scripts/admin.ts', ['bad username'], env, `${invalidPassword}\n${invalidPassword}\n`);
    assert.notEqual(invalid.code, 0);
    assert.match(`${invalid.stdout}\n${invalid.stderr}`, /Usage: npm run admin/);
    assert.doesNotMatch(`${invalid.stdout}\n${invalid.stderr}`, new RegExp(invalidPassword, 'u'));

    const backedUp = await runScript('scripts/backup.ts', [backup], env);
    assert.equal(backedUp.code, 0, backedUp.stderr);
    assert.ok((await stat(backup)).size > 0);
    const backupDb = new DatabaseSync(backup);
    assert.equal(backupDb.prepare('SELECT COUNT(*) AS count FROM admins').get().count, 1);
    backupDb.close();

    const blockedRetention = await runScript('scripts/retention.ts', [], env);
    assert.notEqual(blockedRetention.code, 0);
    assert.match(`${blockedRetention.stdout}\n${blockedRetention.stderr}`, /Retention policy is not approved/);
    const retention = await runScript('scripts/retention.ts', [], { ...env, KORA_RETENTION_APPROVED: '1' });
    assert.equal(retention.code, 0, retention.stderr);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
