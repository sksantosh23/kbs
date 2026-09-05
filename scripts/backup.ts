import { copyFileSync, mkdirSync, chmodSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { getDb } from '../src/server/database.ts';
const destination=process.argv[2]; if(!destination) throw new Error('Usage: npm run backup -- <destination.sqlite>');
const path=resolve(destination); mkdirSync(dirname(path),{recursive:true,mode:0o700}); getDb().exec('PRAGMA wal_checkpoint(TRUNCATE)'); copyFileSync(process.env.KORA_DB_PATH||'./var/kora.sqlite',path); chmodSync(path,0o600); console.log(`Backup written: ${path}`);
