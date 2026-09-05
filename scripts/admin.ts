import { randomBytes } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { stdin as input, stdout as output } from 'node:process';
import { getDb } from '../src/server/database.ts';
import { hashPassword } from '../src/server/auth.ts';
const username = process.argv[2];
if (!username || !/^[A-Za-z0-9_.-]{1,80}$/.test(username)) throw new Error('Usage: npm run admin -- <username>');

async function readSecret(prompt: string): Promise<string> {
  output.write(prompt);
  input.setRawMode(true);
  input.resume();
  input.setEncoding('utf8');
  return await new Promise<string>((resolve, reject) => {
    let value = '';
    const onData = (chunk: string) => {
      for (const character of chunk) {
        if (character === '\u0003') {
          input.setRawMode?.(false);
          input.pause();
          input.off('data', onData);
          output.write('\n');
          reject(new Error('Password entry cancelled.'));
        } else if (character === '\r' || character === '\n') {
          input.setRawMode?.(false);
          input.pause();
          input.off('data', onData);
          output.write('\n');
          resolve(value);
        } else if (character === '\u007f' || character === '\b') {
          value = value.slice(0, -1);
        } else if (character >= ' ') {
          value += character;
        }
      }
    };
    input.on('data', onData);
  });
}

async function readCredentials(): Promise<[string, string]> {
  if (!input.isTTY || !input.setRawMode) {
    output.write('Password: ');
    const contents = readFileSync(0, 'utf8');
    const [password = '', confirmation = ''] = contents.split(/\r?\n/);
    output.write('Confirm password: \n');
    return [password, confirmation];
  }
  return [await readSecret('Password: '), await readSecret('Confirm password: ')];
}

const [password, confirmation] = await readCredentials();
if (password !== confirmation) throw new Error('Passwords do not match.');
const db = getDb();
const hash = await hashPassword(password);
const now = Date.now();
const existing = db.prepare('SELECT id FROM admins WHERE username=?').get(username) as any;
if (existing) {
  db.prepare('UPDATE admins SET password_hash=?,active=1 WHERE id=?').run(hash, existing.id);
  db.prepare('DELETE FROM sessions WHERE admin_id=?').run(existing.id);
} else {
  db.prepare('INSERT INTO admins(id,username,password_hash,active,created_at) VALUES(?,?,?,?,?)').run(randomBytes(16).toString('hex'), username, hash, 1, now);
}
console.log(existing ? 'Administrator password updated.' : 'Administrator created.');
