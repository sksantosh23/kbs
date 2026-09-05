import type { APIRoute } from 'astro';
import { createHash } from 'node:crypto';
import { submitInquiry } from '../../application/inquiries';

export const prerender = false;
export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  if (String(form.get('website') || '').trim()) return new Response('Received', { status: 202 });
  const attempt = String(form.get('attempt') || '');
  if (!/^[A-Za-z0-9_-]{24,80}$/.test(attempt)) return new Response(JSON.stringify({ok:false, errors:{form:'This form session expired. Reload the page and try again.'}}), {status:400,headers:{'content-type':'application/json'}});
  const input: Record<string, unknown> = {};
  for (const [key, value] of form.entries()) if (key !== 'type_display' && key !== 'website' && key !== 'consent' && key !== 'attempt') input[key] = String(value);
  try {
    const result = submitInquiry(input, attempt, createHash('sha256').update(request.headers.get('user-agent') || 'anonymous').digest('hex').slice(0, 24));
    if (!result.ok) return new Response(JSON.stringify(result), { status: result.conflict ? 409 : 400, headers: { 'content-type': 'application/json' } });
    if ((request.headers.get('accept') || '').includes('text/html')) return Response.redirect(new URL(`/request?submitted=${encodeURIComponent(result.publicReference)}`, request.url), 303);
    return new Response(JSON.stringify({ ok: true, publicReference: result.publicReference, duplicate: result.duplicate }), { headers: { 'content-type': 'application/json' } });
  } catch { return new Response(JSON.stringify({ ok: false, errors: { form: 'We could not confirm whether your request was received. Retry this submission to check without sending a duplicate.' } }), { status: 503, headers: { 'content-type': 'application/json' } }); }
};
