import { mkdirSync, chmodSync } from 'node:fs';
import { dirname } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

let singleton: DatabaseSync | undefined;
export function openDatabase(path = process.env.KORA_DB_PATH || './var/kora.sqlite'): DatabaseSync {
  mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
  const db = new DatabaseSync(path);
  try { chmodSync(path, 0o600); } catch {}
  db.exec('PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;');
  db.exec(`CREATE TABLE IF NOT EXISTS inquiries (id TEXT PRIMARY KEY, public_reference TEXT UNIQUE NOT NULL, type TEXT NOT NULL, routing_queue TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'NEW', contact_name TEXT NOT NULL, email TEXT NOT NULL, organization TEXT, phone TEXT, subject TEXT NOT NULL, details TEXT NOT NULL, structured_data TEXT NOT NULL, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, version INTEGER NOT NULL DEFAULT 0, retention_until INTEGER);
  CREATE TABLE IF NOT EXISTS admins (id TEXT PRIMARY KEY, username TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, active INTEGER NOT NULL DEFAULT 1, created_at INTEGER NOT NULL, last_login_at INTEGER);
  CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, admin_id TEXT NOT NULL REFERENCES admins(id) ON DELETE CASCADE, csrf TEXT NOT NULL, created_at INTEGER NOT NULL, last_seen INTEGER NOT NULL, expires_at INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS attempts (token_hash TEXT PRIMARY KEY, browser_hash TEXT NOT NULL, created_at INTEGER NOT NULL, expires_at INTEGER NOT NULL, payload_hash TEXT, inquiry_id TEXT REFERENCES inquiries(id) ON DELETE SET NULL, retired INTEGER NOT NULL DEFAULT 0);
  CREATE TABLE IF NOT EXISTS notes (id TEXT PRIMARY KEY, inquiry_id TEXT NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE, admin_id TEXT NOT NULL REFERENCES admins(id), note TEXT NOT NULL, created_at INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS audit (id TEXT PRIMARY KEY, admin_id TEXT REFERENCES admins(id) ON DELETE SET NULL, action TEXT NOT NULL, target_id TEXT, created_at INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS rate_limits (bucket TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_at INTEGER NOT NULL);`);
  return db;
}
export function getDb(): DatabaseSync { return singleton ??= openDatabase(); }
export function resetDbForTests(): void { singleton = undefined; }
