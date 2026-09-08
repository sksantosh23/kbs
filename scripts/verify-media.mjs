import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
const root = process.cwd();
const manifestPath = join(root, 'content/media/media-manifest.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const allowed = new Set(['Pexels', 'Unsplash', 'Pixabay']);
const prohibited = /(?:UEI|CAGE|NAICS|SAM|registration|classified|CUI)/iu;
const findings = [];
const records = new Map();
for (const asset of manifest.assets ?? []) {
  if (records.has(asset.localPath)) findings.push(`duplicate manifest path: ${asset.localPath}`);
  records.set(asset.localPath, asset);
  if (!allowed.has(asset.sourcePlatform)) findings.push(`unapproved provider: ${asset.sourcePlatform}`);
  for (const path of [asset.localPath, ...(asset.derivatives ?? [])]) {
    try { const metadata = await sharp(join(root, path)).metadata(); if (!metadata.width || !metadata.height) findings.push(`missing dimensions: ${path}`); if (path === asset.localPath && metadata.width < 1600) findings.push(`source below preferred width: ${path}`); }
    catch { findings.push(`missing/unreadable asset: ${path}`); }
    if (prohibited.test(path)) findings.push(`prohibited identifier in filename: ${path}`);
  }
  if (!asset.sourcePageUrl?.startsWith('https://www.pexels.com/')) findings.push(`invalid provenance URL: ${asset.localPath}`);
  if (!asset.licenseUrl) findings.push(`missing license URL: ${asset.localPath}`);
}
const mediaSource = await readFile(join(root, 'src/content/media.ts'), 'utf8');
for (const path of [...mediaSource.matchAll(/from '(\.\.\/assets\/media\/[^']+\.jpg)'/g)].map(m => 'src/' + m[1].replace('../',''))) if (!records.has(path)) findings.push(`used image missing manifest record: ${path}`);
for (const dir of ['src','public','dist/client']) {
  async function scan(folder) { let entries=[]; try { entries=await readdir(join(root,folder),{withFileTypes:true}); } catch { return; } for(const entry of entries){const path=join(folder,entry.name); if(entry.isDirectory()) await scan(path); else if(/\.(?:astro|css|html|js|json|mjs|ts|xml)$/iu.test(entry.name)){const text=await readFile(join(root,path),'utf8'); if(/https?:\/\/(?:images\.)?(?:pexels|unsplash|pixabay)\.com/iu.test(text)) findings.push(`runtime/public provider reference: ${path}`); if(/<img[^>]+src=["']https?:/iu.test(text)) findings.push(`hotlinked image: ${path}`); if(prohibited.test(path)) findings.push(`prohibited identifier in generated path: ${path}`);}}}
  await scan(dir);
}
console.log(JSON.stringify({assets: manifest.assets?.length ?? 0, findings}, null, 2));
if (findings.length) process.exit(1);
