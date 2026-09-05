import type { APIRoute } from 'astro';
import { randomBytes, createHash } from 'node:crypto';
import { submitInquiry } from '../../application/inquiries';

export const prerender = false;
export const POST: APIRoute = async ({ request, cookies }) => {
  const form = await request.formData();
  if (String(form.get('website') || '').trim()) return new Response('Received', { status: 202 });
  const attempt = cookies.get('kora_attempt')?.value || randomBytes(24).toString('base64url');
  cookies.set('kora_attempt', attempt, { httpOnly: true, sameSite: 'lax', secure: import.meta.env.PROD, maxAge: 172800, path: '/' });
  const input: Record<string, unknown> = {};
  for (const [key, value] of form.entries()) if (key !== 'type_display' && key !== 'website' && key !== 'consent') input[key] = String(value);
  try {
    const result = submitInquiry(input, attempt, createHash('sha256').update(request.headers.get('user-agent') || 'anonymous').digest('hex').slice(0, 24));
    if (!result.ok) return new Response(JSON.stringify(result), { status: result.conflict ? 409 : 400, headers: { 'content-type': 'application/json' } });
    return new Response(JSON.stringify({ ok: true, publicReference: result.publicReference, duplicate: result.duplicate }), { headers: { 'content-type': 'application/json' } });
  } catch { return new Response(JSON.stringify({ ok: false, errors: { form: 'We could not confirm whether your request was received. Retry this submission to check without sending a duplicate.' } }), { status: 503, headers: { 'content-type': 'application/json' } }); }
};
