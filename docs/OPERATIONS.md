# Operations runbook

This is a deployable topology and rehearsal procedure. Hosting, production rollout, staff provisioning, TLS issuance and a restore drill have not been performed by writing these files. See PROJECT_PLAN §§9/12 and PRD REL-001–005, §40.22–24.

## Runtime and build

One Node 24 application, Astro Node standalone, one local durable SQLite database, and a same-origin Caddy reverse proxy. No horizontal replicas or shared/network filesystem SQLite deployment is assumed. The application image runs as UID/GID 1000 (`node`); application files are immutable in operation. Mount a restricted writable directory at `/data`, owned by that identity, and keep backups elsewhere. Use a read-only root filesystem plus a small `/tmp` tmpfs when supported. Publish only Caddy ports 80/443; app:4321 must be private.

```sh
npm ci
npm run build
node scripts/verify-public.mjs dist/client
node scripts/check-links.mjs dist/client
node --test tests/security/*.test.mjs
docker build -t kora:RELEASE .
```

Replace `RELEASE` with the reviewed version identifier. The Docker build also runs the public checks. Pin reviewed Node/Caddy image digests for each release; moving major tags are development scaffolding. Keep the lockfile and review package licenses/advisories before publication. The image requires `package-lock.json` and the completed application build. CLI maintenance is performed from a matching restricted full release checkout with its locked dependencies; copied TypeScript scripts alone are not a standalone maintenance runtime.

Set runtime `KORA_DB_PATH=/data/kora.sqlite`, `KORA_ORIGIN` to the approved HTTPS origin, and `KORA_PRODUCTION=1`. Set `KORA_RETENTION_APPROVED=1` only after the operator approves the configured retention policy. Inject configuration through restricted deployment tooling; never print environment or credentials in logs. Provision/recover admin credentials using the local `scripts/admin.ts` procedure after reviewing its usage, never public signup or emailed reset. Do not use production identities in test fixtures.

Install `deploy/Caddyfile` with `SITE_HOST` set to the approved hostname, and place the exact release's `dist/client` at `/srv/kora/client` read-only. Caddy and app must share a private network where `app` resolves to the application. Static GET/HEAD files continue working when the Node process or database is unavailable; missing/static-independent routes go to Astro for real 404 or dynamic processing. Private/API routes always reach the app. Keep the static directory and app version synchronized during release. Persist Caddy certificate state separately; establish DNS/renewal ownership. Do not expose source, SQLite, backups or internal mappings beneath `/srv/kora/client`.

Caddy access logging is deliberately not enabled to avoid query/PII capture. Keep application/process logs restricted and allowlisted. Inspect proxy error logs for accidental request detail before production. Monitor process health, safe HTTP errors/latency, save failures, auth abuse, disk space, database availability and backup age without logging bodies/cookies/queries. `/health` is liveness, not evidence that an inquiry can commit. A named operator and review/escalation cadence remain launch requirements.

## Release, backup and recovery

1. Approve content/mappings, privacy/retention, hosting/operators and complete the release evidence in TESTING.md. Save reviewed code/image identifiers, schema version and non-sensitive test results.
2. Rehearse on isolated persistent storage with synthetic inquiries, notes/status/audit, and one deliberately deleted record. Use `scripts/backup.ts` according to its current CLI contract to produce a consistent snapshot. Do not copy a live SQLite main file without its transaction state or use an untested filesystem snapshot.
3. Store snapshots outside the web root with restrictive permissions and encrypt them using the operator's approved local tooling. Keep encryption keys separately controlled. Approve destination, schedule, retention, key custody, recovery point/time objectives and backup-age monitoring. A local unencrypted snapshot is not an approved production backup.
4. Before migration, take and verify a consistent backup; preserve the prior application artifact. Apply the release's reviewed migration procedure, start the app, verify HTTPS/static routes, synthetic form persistence, protected admin access, no-store/cookie headers, and safe 404s. Avoid real PII in deployment probes.
5. For a restore drill, stop the isolated app, restore the snapshot into a NEW private database path with correct ownership, and run SQLite integrity/foreign-key checks. Start the matching application/schema version against that path. Verify retained inquiry fields, notes, status/audit relationships, idempotency, and admin access using synthetic records.
6. Reconcile approved deletions made since the snapshot using restricted operator records before opening a restored service to staff. Reapply deletion/purge policy, verify deleted inquiries/notes do not reappear, expire restored sessions, and inspect export retention. Do not place inquiry bodies in deletion/reconciliation logs. If reconciliation cannot be established, keep the restored environment isolated.
7. Record snapshot timestamp, release/schema versions, integrity results, counts only where privately authorized, restore duration and deletion outcome. A successful backup command alone is not restore evidence. Exercise restoration before production and on the approved recurring schedule.
8. On rollback, stop writes and assess schema compatibility. Restore the matching verified snapshot only under the approved recovery decision; code rollback does not reverse migrations. Preserve any post-snapshot data as required by the approved recovery policy, without exposing it publicly. Repeat smoke and deletion checks before resuming service.

## Preproduction gates

Business owner approves exact capabilities/categories, Government source mapping attestations, medical/IoT copy, public claims and media rights; no actual registration identifier is needed in a public build. Privacy authority approves retention, audit/deletion/export/backup handling, incident responsibilities and notice wording. Hosting owner approves canonical domain, durable storage, encryption/key custody, TLS, budget, staff recovery and monitoring. Complete actual browser/device/accessibility/performance/security tests, dependency review, HTTP disclosure checks and restore drill. No release approval is inferred from a passing build.

Implementation references checked: [Astro Node standalone adapter](https://docs.astro.build/en/guides/integrations-guide/node/) and [Caddy file matching](https://caddyserver.com/docs/caddyfile/matchers#file). Verify behavior against the locked deployed versions during rehearsal.
