import { access, readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const roots = ['src', 'public', 'dist/client'];
const forbidden = [
  /#101111/iu, /#faf9f5/iu, /#ff5a36/iu, /#b9d8b0/iu,
  /Space Grotesk/iu, /font-family\s*:\s*Inter\b/iu, /fonts\.googleapis\.com/iu,
];
const required = ['src/assets/brand/kora-logo-on-dark.svg', 'src/assets/brand/kora-logo-on-light.svg', 'public/fonts/Manrope-Regular.ttf', 'public/fonts/Manrope-Medium.ttf', 'public/fonts/Manrope-SemiBold.ttf', 'public/fonts/Manrope-Bold.ttf'];
const findings = [];

async function walk(path) {
  let entries;
  try { entries = await readdir(path, { withFileTypes: true }); } catch { return; }
  for (const entry of entries) {
    const child = join(path, entry.name);
    if (entry.isDirectory()) await walk(child);
    else if (/\.(?:astro|css|html|js|json|mjs|svg|ts|txt|xml)$/iu.test(entry.name)) {
      const text = await readFile(child, 'utf8');
      for (const pattern of forbidden) if (pattern.test(text)) findings.push(`${relative('.', child)} matches ${pattern}`);
    }
  }
}

for (const path of required) try { await access(path); } catch { findings.push(`missing required asset: ${path}`); }
for (const root of roots) await walk(root);
if (findings.length) { console.error(JSON.stringify({ findings }, null, 2)); process.exitCode = 1; }
else console.log(JSON.stringify({ roots, findings: [] }, null, 2));
