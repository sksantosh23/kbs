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
export function createSession(adminId: string) { const token=randomBytes(32).toString('base64url'); const csrf=randomBytes(24).toString('base64url'); const now=Date.now(); getDb().prepare('INSERT INTO sessions(token_hash,admin_id,csrf,created_at,last_seen,expires_at) VALUES(?,?,?,?,?,?)').run(hashToken(token),adminId,csrf,now,now,now+8*60*60*1000); return {token,csrf}; }
export function getSession(token: string | undefined) { if (!token) return null; const row=getDb().prepare('SELECT s.*,a.username FROM sessions s JOIN admins a ON a.id=s.admin_id WHERE s.token_hash=? AND a.active=1 AND s.expires_at>?').get(hashToken(token),Date.now()) as any; return row || null; }
export function destroySession(token: string | undefined) { if(token) getDb().prepare('DELETE FROM sessions WHERE token_hash=?').run(hashToken(token)); }
