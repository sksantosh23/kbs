import type { APIRoute } from 'astro';
import { getSession } from '../../server/auth';
import { listInquiries } from '../../application/inquiries';
function csv(value: unknown) { const text=String(value ?? '').replace(/\r?\n/g,' '); return /[",=+@-]/.test(text) ? `"${text.replaceAll('"','""')}"` : text; }
export const prerender = false;
export const POST: APIRoute = ({cookies}) => { const session=getSession(cookies.get('kora_session')?.value); if(!session)return new Response('Unauthorized',{status:401}); const rows=listInquiries(); const header=['public_reference','type','routing_queue','status','contact_name','email','organization','subject','details','created_at']; const body=[header.join(','),...rows.map((r:any)=>header.map(k=>csv(r[k])).join(','))].join('\n'); return new Response(body,{headers:{'content-type':'text/csv; charset=utf-8','content-disposition':'attachment; filename="kora-inquiries.csv"','cache-control':'no-store'}}); };
