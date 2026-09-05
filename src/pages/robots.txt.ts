import type { APIRoute } from 'astro';
export const prerender = true;
export const GET: APIRoute = () => new Response(`User-agent: *\nDisallow: /admin/\nDisallow: /api/\nSitemap: ${new URL('/sitemap.xml', import.meta.env.SITE || 'https://kora.invalid').toString()}\n`, {headers:{'content-type':'text/plain; charset=utf-8'}});
