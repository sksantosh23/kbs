import { readdir, readFile } from 'node:fs/promises';
import { resolve, relative, extname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';

// Publication verification only: never scan visitor submissions or discover secrets.
const field = '(?:uei(?:id|number)?|n?cage(?:code|number)?|naics(?:code|codes|number|numbers)?|sam(?:id|identifier|registration)?|governmentregistration(?:id|identifier)|registrationidentifier|classificationcode)';
const property = new RegExp(`(?:["'\\x60]${field}["'\\x60]\\s*:|\\b${field}\\s*[:=]|(?:name|property|data-field)\\s*=\\s*["']${field}["'])`, 'i');
const associated = /\b(?:UEI|N?CAGE|NAICS|SAM(?:\s+(?:ID|identifier|registration))?)\b(?:\s|<[^>]*>|&nbsp;|[:=#"']){0,80}(?=[A-Z0-9-]{3,}\b)(?=[A-Z0-9-]*\d)[A-Z0-9-]{3,}\b/i;
const textExtensions = new Set(['.html','.htm','.json','.jsonld','.js','.mjs','.cjs','.map','.svg','.xml','.txt','.csv','.css','.md','.webmanifest','.ics','.vcf']);
const fontExtensions = new Set(['.woff','.woff2','.ttf','.otf']);
export const SYNTHETIC_SENTINEL = 'KORA_RESTRICTED_SYNTHETIC_7F92D1';

export function normalizeText(text) {
  return text.replace(/\\u([0-9a-f]{4})/gi, (_, n) => String.fromCharCode(parseInt(n,16)))
    .replace(/\\x([0-9a-f]{2})/gi, (_, n) => String.fromCharCode(parseInt(n,16)))
    .replace(/&#(?:x([0-9a-f]+)|(\d+));/gi, (_, h, d) => String.fromCodePoint(parseInt(h || d, h ? 16 : 10)))
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'");
}
export function inspectText(text, restrictedValues = []) {
  const decoded = normalizeText(text);
  const fieldText = decoded.replace(/(?:uei|ncage|cage|naics|sam|government|registration|classification)[A-Za-z_-]*/gi, token => token.replace(/[_-]/g, ''));
  const rules = [];
  if (property.test(fieldText)) rules.push('restricted-field');
  if (associated.test(decoded)) rules.push('identifier-associated-value');
  if (decoded.includes(SYNTHETIC_SENTINEL)) rules.push('synthetic-sentinel');
  if (restrictedValues.some(value => decoded.includes(value))) rules.push('restricted-value');
  return rules;
}
export async function listFiles(root) {
  const result = [];
  async function visit(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = resolve(dir, entry.name);
      if (entry.isSymbolicLink()) throw new Error('Public symlinks are not permitted');
      if (entry.isDirectory()) await visit(path);
      else if (entry.isFile()) result.push(path);
    }
  }
  await visit(resolve(root));
  return result.sort();
}
export async function verifyPublic(root, { restrictedValues = [], reviews = {} } = {}) {
  const files = await listFiles(root);
  const findings = [];
  if (!files.length) findings.push({ path: '.', rule: 'empty-public-output' });
  for (const file of files) {
    const path = relative(resolve(root), file).replaceAll('\\', '/');
    const bytes = await readFile(file);
    for (const rule of inspectText(bytes.toString('utf8'), restrictedValues)) findings.push({ path, rule });
    const extension = extname(path).toLowerCase();
    // Opaque documents/images require extraction AND rendered review, attested to exact bytes.
    if (!textExtensions.has(extension) && !fontExtensions.has(extension)) {
      const hash = createHash('sha256').update(bytes).digest('hex');
      const review = reviews[path];
      if (!review || review.sha256 !== hash || !review.reviewer || !review.reviewedAt || review.textAndMetadataReviewed !== true || review.renderedReviewed !== true)
        findings.push({ path, rule: 'opaque-artifact-review-required' });
    }
  }
  return { files: files.length, findings };
}
async function main() {
  const restrictedValues = process.env.PUBLIC_RESTRICTED_VALUES_FILE ? JSON.parse(await readFile(process.env.PUBLIC_RESTRICTED_VALUES_FILE, 'utf8')) : [];
  if (!Array.isArray(restrictedValues) || restrictedValues.some(value => typeof value !== 'string' || value.length < 3)) throw new Error('Invalid restricted comparison input');
  const reviews = process.env.PUBLIC_ARTIFACT_REVIEWS_FILE ? JSON.parse(await readFile(process.env.PUBLIC_ARTIFACT_REVIEWS_FILE, 'utf8')) : {};
  const report = await verifyPublic(process.argv[2] || 'dist/client', { restrictedValues, reviews });
  // Only paths and rule IDs; never matched text or comparison values.
  console.log(JSON.stringify(report, null, 2));
  if (report.findings.length) process.exitCode = 1;
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) main().catch(() => { console.error('Public verification failed: unreadable output or invalid verification configuration.'); process.exitCode = 1; });
