import { access } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const run=promisify(execFile);
for (const path of ['dist/client','dist/server']) await access(path);
await run(process.execPath,['scripts/verify-public.mjs','dist/client'],{stdio:'inherit'});
await run(process.execPath,['scripts/check-links.mjs','dist/client'],{stdio:'inherit'});
await run(process.execPath,['--experimental-strip-types','--test','tests/operations/cli.test.mjs'],{stdio:'inherit'});
console.log('Release checks passed for generated public output and links.');
