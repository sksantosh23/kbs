import { randomBytes } from 'node:crypto';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { getDb } from '../src/server/database.ts';
import { hashPassword } from '../src/server/auth.ts';
const username = process.argv[2];
if (!username || !/^[A-Za-z0-9_.-]{1,80}$/.test(username)) throw new Error('Usage: npm run admin -- <username>');
const rl=createInterface({input,output}); const password=await rl.question('Password (input may be visible in this terminal): '); rl.close();
const db=getDb(); const hash=await hashPassword(password); const now=Date.now(); const existing=db.prepare('SELECT id FROM admins WHERE username=?').get(username) as any;
if(existing){db.prepare('UPDATE admins SET password_hash=?,active=1 WHERE id=?').run(hash,existing.id); db.prepare('DELETE FROM sessions WHERE admin_id=?').run(existing.id);}
else db.prepare('INSERT INTO admins(id,username,password_hash,active,created_at) VALUES(?,?,?,?,?)').run(randomBytes(16).toString('hex'),username,hash,1,now);
console.log(existing ? 'Administrator password updated.' : 'Administrator created.');
