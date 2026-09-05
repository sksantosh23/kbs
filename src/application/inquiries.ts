import { createHash, randomBytes } from 'node:crypto';
import { deriveQueue, validateInquiry, canTransition, type Status } from '../domain/inquiry';
import { getDb } from '../server/database';
export function hashPayload(input: Record<string,unknown>) { return createHash('sha256').update(JSON.stringify(input, Object.keys(input).sort())).digest('hex'); }
export function submitInquiry(input: Record<string,unknown>, attemptToken: string, browserHash = 'anonymous') {
  const result=validateInquiry(input); if(!result.ok) return {ok:false as const, errors:result.errors};
  const db=getDb(); const tokenHash=createHash('sha256').update(attemptToken).digest('hex'); const payloadHash=hashPayload(input); const now=Date.now();
  const existing=db.prepare('SELECT a.*,i.public_reference FROM attempts a LEFT JOIN inquiries i ON i.id=a.inquiry_id WHERE a.token_hash=?').get(tokenHash) as any;
  if(existing?.retired) return {ok:false as const, errors:{form:'This submission has expired. Start again.'}};
  if(existing?.payload_hash && existing.payload_hash!==payloadHash) return {ok:false as const, conflict:true, errors:{form:'This submission attempt was changed. Start again.'}};
  if(existing?.inquiry_id && existing.public_reference) return {ok:true as const, publicReference:existing.public_reference, duplicate:true};
  const queue=deriveQueue(result.value); const id=randomBytes(16).toString('hex'); const reference=`KORA-${randomBytes(8).toString('hex').toUpperCase()}`;
  db.exec('BEGIN IMMEDIATE'); try {
    const bucket = `inquiry:${browserHash}`;
    const limit = db.prepare('SELECT count,expires_at FROM rate_limits WHERE bucket=?').get(bucket) as any;
    const window = 15 * 60 * 1000;
    if (limit && limit.expires_at > now && limit.count >= 5) { db.exec('ROLLBACK'); return {ok:false as const, rateLimited:true, errors:{form:'Too many requests. Wait a few minutes and try again.'}}; }
    if (!limit || limit.expires_at <= now) db.prepare('INSERT INTO rate_limits(bucket,count,expires_at) VALUES(?,?,?) ON CONFLICT(bucket) DO UPDATE SET count=excluded.count,expires_at=excluded.expires_at').run(bucket,1,now+window);
    else db.prepare('UPDATE rate_limits SET count=count+1 WHERE bucket=?').run(bucket);
    db.prepare('INSERT OR IGNORE INTO attempts(token_hash,browser_hash,created_at,expires_at,payload_hash) VALUES(?,?,?,?,?)').run(tokenHash,browserHash,now,now+48*60*60*1000,payloadHash);
    const attempt=db.prepare('SELECT inquiry_id,payload_hash,retired FROM attempts WHERE token_hash=?').get(tokenHash) as any;
    if(attempt?.inquiry_id) { const row=db.prepare('SELECT public_reference FROM inquiries WHERE id=?').get(attempt.inquiry_id) as any; db.exec('COMMIT'); return row ? {ok:true as const,publicReference:row.public_reference,duplicate:true} : {ok:false as const,errors:{form:'This submission has expired. Start again.'}}; }
    db.prepare('INSERT INTO inquiries(id,public_reference,type,routing_queue,status,contact_name,email,organization,phone,subject,details,structured_data,created_at,updated_at,retention_until) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').run(id,reference,result.value.type,queue,'NEW',result.value.contact_name,result.value.email,result.value.organization||null,result.value.phone||null,result.value.subject,result.value.details,JSON.stringify(result.value.structured_data),now,now,now+24*30*24*60*60*1000);
    db.prepare('UPDATE attempts SET inquiry_id=? WHERE token_hash=?').run(id,tokenHash); db.exec('COMMIT'); return {ok:true as const,publicReference:reference,duplicate:false};
  } catch(error) { try{db.exec('ROLLBACK')}catch{}; throw error; }
}
export function listInquiries(filters: Record<string,string|undefined> = {}) { const where:string[]=[]; const args:any[]=[]; for(const key of ['type','routing_queue','status'] as const){if(filters[key]){where.push(`${key}=?`);args.push(filters[key])}} const q=(filters.q||'').trim().slice(0,200).replace(/[\\%_]/g,'\\$&'); if(q){const term=`%${q}%`;where.push("(public_reference LIKE ? ESCAPE '\\' OR contact_name LIKE ? ESCAPE '\\' OR organization LIKE ? ESCAPE '\\' OR email LIKE ? ESCAPE '\\')");args.push(term,term,term,term)} const sql=`SELECT * FROM inquiries ${where.length?'WHERE '+where.join(' AND '):''} ORDER BY created_at DESC`; return getDb().prepare(sql).all(...args) as any[]; }
export function getInquiry(id:string) { const row=getDb().prepare('SELECT * FROM inquiries WHERE id=?').get(id) as any; if(!row)return null; row.structured_data=JSON.parse(row.structured_data); row.notes=getDb().prepare('SELECT n.*,a.username FROM notes n JOIN admins a ON a.id=n.admin_id WHERE inquiry_id=? ORDER BY n.created_at DESC').all(id); return row; }
export function updateStatus(id:string, next:Status, adminId:string) { const db=getDb(); const current=getDb().prepare('SELECT status,version FROM inquiries WHERE id=?').get(id) as any; if(!current || !canTransition(current.status,next)) return false; db.exec('BEGIN IMMEDIATE'); try{const r=db.prepare('UPDATE inquiries SET status=?,updated_at=?,version=version+1 WHERE id=? AND version=?').run(next,Date.now(),id,current.version); if(r.changes!==1){db.exec('ROLLBACK');return false} db.prepare('INSERT INTO audit(id,admin_id,action,target_id,created_at) VALUES(?,?,?,?,?)').run(randomBytes(16).toString('hex'),adminId,`STATUS_${next}`,id,Date.now());db.exec('COMMIT');return true}catch(e){try{db.exec('ROLLBACK')}catch{};throw e}}
export function addNote(id:string,adminId:string,note:string){if(!note.trim()||note.length>5000)return false;getDb().prepare('INSERT INTO notes(id,inquiry_id,admin_id,note,created_at) VALUES(?,?,?,?,?)').run(randomBytes(16).toString('hex'),id,adminId,note.trim(),Date.now());return true}
