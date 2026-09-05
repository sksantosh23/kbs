import { randomBytes, scrypt as scryptCallback, timingSafeEqual, createHash } from 'node:crypto';
import { promisify } from 'node:util';
import { getDb } from './database';
const scrypt = promisify(scryptCallback);
export async function hashPassword(password: string): Promise<string> {
  if (!password || password.length < 12) throw new Error('Password must be at least 12 characters.');
  const salt = randomBytes(16); const derived = await scrypt(password, salt, 64) as Buffer;
  return `scrypt$${salt.toString('base64url')}$${derived.toString('base64url')}`;
}
export async function verifyPassword(password: string, encoded: string): Promise<boolean> {
  try { const [,s,d] = encoded.split('$'); const expected = Buffer.from(d, 'base64url'); const actual = await scrypt(password, Buffer.from(s, 'base64url'), expected.length) as Buffer; return expected.length === actual.length && timingSafeEqual(expected, actual); } catch { return false; }
}
export function hashToken(token: string): string { return createHash('sha256').update(token).digest('hex'); }
export function csrfMatches(expected: string | undefined, supplied: string | undefined): boolean {
  if (!expected || !supplied) return false;
  const a = Buffer.from(expected); const b = Buffer.from(supplied);
  return a.length === b.length && timingSafeEqual(a, b);
}
export function consumeRateLimit(bucket: string, max = 5, windowMs = 15 * 60 * 1000): boolean {
  const db = getDb(); const now = Date.now();
  db.exec('BEGIN IMMEDIATE');
  try {
    const row = db.prepare('SELECT count,expires_at FROM rate_limits WHERE bucket=?').get(bucket) as any;
    if (row && row.expires_at > now && row.count >= max) { db.exec('ROLLBACK'); return false; }
    if (!row || row.expires_at <= now) db.prepare('INSERT INTO rate_limits(bucket,count,expires_at) VALUES(?,?,?) ON CONFLICT(bucket) DO UPDATE SET count=excluded.count,expires_at=excluded.expires_at').run(bucket, 1, now + windowMs);
    else db.prepare('UPDATE rate_limits SET count=count+1 WHERE bucket=?').run(bucket);
    db.exec('COMMIT'); return true;
  } catch (error) { try { db.exec('ROLLBACK'); } catch {} throw error; }
}
export function createSession(adminId: string) { const token=randomBytes(32).toString('base64url'); const csrf=randomBytes(24).toString('base64url'); const now=Date.now(); getDb().prepare('INSERT INTO sessions(token_hash,admin_id,csrf,created_at,last_seen,expires_at) VALUES(?,?,?,?,?,?)').run(hashToken(token),adminId,csrf,now,now,now+8*60*60*1000); return {token,csrf}; }
export function getSession(token: string | undefined) { if (!token) return null; const row=getDb().prepare('SELECT s.*,a.username FROM sessions s JOIN admins a ON a.id=s.admin_id WHERE s.token_hash=? AND a.active=1 AND s.expires_at>?').get(hashToken(token),Date.now()) as any; return row || null; }
export function destroySession(token: string | undefined) { if(token) getDb().prepare('DELETE FROM sessions WHERE token_hash=?').run(hashToken(token)); }
