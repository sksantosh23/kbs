import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { inspectText, verifyPublic, SYNTHETIC_SENTINEL } from '../../scripts/verify-public.mjs';
import { checkLinks } from '../../scripts/check-links.mjs';

test('warnings and ordinary words do not trigger identifier disclosure', () => {
  assert.deepEqual(inspectText('Do not submit credentials, secret keys, PHI or patient information. Government Registered Supplier. Keep UEI and NAICS identifiers private. A staircase and sample cage.'), []);
});
test('structured fields, metadata and associated identifier values fail', () => {
  for (const value of ['{"uei":"example"}', 'const x={naicsCodes:[]}', '{"sam":"example"}', '{"cage_code":"example"}', '<meta name="cage" content="example">', 'NAICS: 123456', '<dt>UEI</dt><dd>AB12CD34EF56</dd>', '{"\\u0075ei":"example"}']) assert.ok(inspectText(value).length, value);
});
test('explicit restricted comparison values report rule only', () => {
  assert.deepEqual(inspectText('SYNTHETIC_PRIVATE_VALUE', ['SYNTHETIC_PRIVATE_VALUE']), ['restricted-value']);
});
test('every public text surface catches escaped synthetic leaks', async () => {
  const root = await mkdtemp(join(tmpdir(), 'kora-output-'));
  try {
    const surfaces = ['index.html','metadata.json','structured.jsonld','chunk.js','search.json','download.csv','client.js.map','graphic.svg','manifest.webmanifest','feed.xml','robots.txt','download.pdf'];
    for (const surface of surfaces) await writeFile(join(root, surface), SYNTHETIC_SENTINEL);
    const report = await verifyPublic(root);
    for (const surface of surfaces) assert.ok(report.findings.some(item => item.path === surface && item.rule === 'synthetic-sentinel'));
    assert.equal(JSON.stringify(report).includes(SYNTHETIC_SENTINEL), false);
  } finally { await rm(root, { recursive: true, force: true }); }
});
test('opaque downloads require review bound to exact bytes and changes invalidate it', async () => {
  const root = await mkdtemp(join(tmpdir(), 'kora-review-'));
  try {
    const content = 'synthetic image bytes';
    await writeFile(join(root, 'image.png'), content);
    assert.equal((await verifyPublic(root)).findings[0].rule, 'opaque-artifact-review-required');
    const reviews = { 'image.png': { sha256: createHash('sha256').update(content).digest('hex'), reviewer: 'synthetic-test', reviewedAt: '2026-09-05', textAndMetadataReviewed: true, renderedReviewed: true } };
    assert.deepEqual((await verifyPublic(root, { reviews })).findings, []);
    await writeFile(join(root, 'image.png'), content + 'changed');
    assert.equal((await verifyPublic(root, { reviews })).findings.length, 1);
  } finally { await rm(root, { recursive: true, force: true }); }
});
test('link checker resolves routes, query state, fragments and detects broken links', async () => {
  const root = await mkdtemp(join(tmpdir(), 'kora-links-'));
  try {
    await mkdir(join(root, 'government'));
    await writeFile(join(root, 'government/index.html'), '<h1 id="status">Government</h1>');
    await writeFile(join(root, 'index.html'), '<a href="/government#status">Status</a><a href="/request?type=government">Request</a><a href="/missing">Bad</a><a href="#">Empty</a><a href="/government#missing">Bad fragment</a>');
    const report = await checkLinks(root);
    assert.deepEqual(report.findings.map(item => item.rule), ['missing-target','placeholder-link','missing-fragment']);
  } finally { await rm(root, { recursive: true, force: true }); }
});
