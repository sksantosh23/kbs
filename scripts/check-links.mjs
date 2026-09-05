import { readFile, stat } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import { listFiles } from './verify-public.mjs';

export const dynamicRoutes = [/^\/$/, /^\/(?:request|contact|about|products|government|insights|privacy|accessibility|partners|what-we-do)\/?$/, /^\/government\/contracting\/?$/, /^\/partners\/(suppliers|teaming)\/?$/, /^\/admin\/(login|logout|export)\/?$/, /^\/api\/inquiries\/?$/, /^\/health\/?$/, /^\/admin\/inquiries(?:\/[A-Za-z0-9-]+)?\/?$/, /^\/brand\/.+$/];
export function extractLinks(html) {
  return [...html.matchAll(/\b(?:href|src|action)\s*=\s*(["'])(.*?)\1/gi)].map(match => match[2].replaceAll('&amp;', '&'));
}
export async function checkLinks(root, { origin = 'https://kora.invalid', allowDynamic = dynamicRoutes } = {}) {
  root = resolve(root);
  const files = (await listFiles(root)).filter(path => path.endsWith('.html'));
  const findings = [];
  if (!files.length) findings.push({ path: '.', rule: 'no-html-output' });
  for (const file of files) {
    const path = relative(root, file).replaceAll('\\', '/');
    const route = '/' + path.replace(/index\.html$/, '').replace(/\.html$/, '');
    for (const link of extractLinks(await readFile(file, 'utf8'))) {
      if (!link || link === '#' || /^javascript:/i.test(link)) { findings.push({ path, link, rule: 'placeholder-link' }); continue; }
      if (/^(mailto:|tel:|data:)/i.test(link)) continue;
      let url;
      try { url = new URL(link, new URL(route, origin)); } catch { findings.push({ path, link, rule: 'invalid-link' }); continue; }
      if (url.origin !== origin) continue;
      let pathname;
      try { pathname = decodeURIComponent(url.pathname); } catch { findings.push({ path, link, rule: 'invalid-encoding' }); continue; }
      if (allowDynamic.some(pattern => pattern.test(pathname))) continue;
      const target = resolve(root, '.' + pathname);
      if (!target.startsWith(root + '/') && target !== root) { findings.push({ path, link, rule: 'invalid-path' }); continue; }
      const candidates = [target, resolve(target, 'index.html'), target + '.html'];
      let found;
      for (const candidate of candidates) { try { if ((await stat(candidate)).isFile()) { found = candidate; break; } } catch {} }
      if (!found) findings.push({ path, link, rule: 'missing-target' });
      else if (url.hash && found.endsWith('.html')) {
        const html = await readFile(found, 'utf8');
        const ids = [...html.matchAll(/\b(?:id|name)\s*=\s*(["'])(.*?)\1/gi)].map(match => match[2]);
        if (!ids.includes(decodeURIComponent(url.hash.slice(1)))) findings.push({ path, link, rule: 'missing-fragment' });
      }
    }
  }
  return { pages: files.length, findings };
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) checkLinks(process.argv[2] || 'dist/client', { origin: process.env.SITE_URL || 'https://kora.invalid' }).then(report => { console.log(JSON.stringify(report, null, 2)); if (report.findings.length) process.exitCode = 1; }).catch(() => { console.error('Link verification failed: unreadable output or invalid configuration.'); process.exitCode = 1; });
