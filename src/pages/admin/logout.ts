import type { APIRoute } from 'astro';
import { destroySession } from '../../server/auth';
export const prerender = false;
export const POST: APIRoute = ({cookies, redirect}) => { destroySession(cookies.get('kora_session')?.value); cookies.delete('kora_session',{path:'/'}); cookies.delete('kora_csrf',{path:'/'}); return redirect('/admin/login',303); };
