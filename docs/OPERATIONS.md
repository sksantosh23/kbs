# Operations runbook

This is a deployable topology and rehearsal procedure. The approved production topology is Cloudflare Free → Kora-controlled DigitalOcean NYC3 Linux Droplet → Caddy → systemd → Astro/Node 24 → private SQLite. Production provisioning, DNS, TLS issuance, staff provisioning and restore rehearsal have not been performed by writing these files. Operational and backup/recovery contact is `support@korasb.com`; no credentials or account identifiers belong in this document. See PROJECT_PLAN §§9/12 and PRD REL-001–005, §40.22–24.

## Runtime and build

One Node 24 application, Astro Node standalone, one local durable SQLite database, and a same-origin Caddy reverse proxy. The validated Release 1 baseline is Linux → Caddy → Astro/Node → private SQLite → restricted backups; containerization is optional and Docker evidence is not a Release 1 blocker. No horizontal replicas or shared/network filesystem SQLite deployment is assumed. The application image runs as UID/GID 1000 (`node`); application files are immutable in operation. Mount a restricted writable directory at `/data`, owned by that identity, and keep backups elsewhere. Use a read-only root filesystem plus a small `/tmp` tmpfs when supported. Publish only Caddy ports 80/443; app:4321 must be private.

```sh
npm ci
npm run build
node scripts/verify-public.mjs dist/client
node scripts/check-links.mjs dist/client
node --test tests/security/*.test.mjs
docker build -t kora:RELEASE .
```

Replace `RELEASE` with the reviewed version identifier. The Docker build also runs the public checks. Pin reviewed Node/Caddy image digests for each release; moving major tags are development scaffolding. Keep the lockfile and review package licenses/advisories before publication. The image requires `package-lock.json` and the completed application build. CLI maintenance is performed from a matching restricted full release checkout with its locked dependencies; copied TypeScript scripts alone are not a standalone maintenance runtime.

Set runtime `KORA_DB_PATH=/data/kora.sqlite`, `KORA_ORIGIN` to the approved HTTPS origin, and `KORA_PRODUCTION=1`. Set `KORA_INQUIRY_RETENTION_MONTHS=24` and `KORA_SPAM_RETENTION_DAYS=30` unless the approved policy specifies other values. Set `KORA_RETENTION_APPROVED=1` only after the operator approves the configured retention policy. Normal inquiries target 24 months and spam 30 days; values remain configurable. Purging deletes inquiry content and cascading internal notes, retires idempotency attempts, and retains only minimum non-sensitive audit metadata. Exports must be treated as managed working files and removed under the approved rotation; backups age out under the approved backup rotation. Inject configuration through restricted deployment tooling; never print environment or credentials in logs. Provision/recover admin credentials using the local `scripts/admin.ts` procedure after reviewing its usage, never public signup or emailed reset. Do not use production identities in test fixtures.

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

### Approved edge and host

Q07 is closed as a topology decision. The execution sequence remains: provision the Kora-controlled DigitalOcean NYC3 Linux Droplet; configure Cloudflare Free DNS for `korasb.com`; issue and verify TLS; restrict the origin firewall to required administration and Cloudflare ingress; keep Node bound to `127.0.0.1:4321`; apply production filesystem ownership/permissions; configure encrypted off-host backups with separate key control; complete staging acceptance, security hardening and a mandatory restore rehearsal. The operational and recovery contact is `support@korasb.com`. None of these steps has been performed by this documentation update.

Business owner approves exact capabilities/categories, Government source mapping attestations, medical/IoT copy, public claims and media rights; no actual registration identifier is needed in a public build. Privacy authority approves retention, audit/deletion/export/backup handling, incident responsibilities and notice wording. Hosting owner approves canonical domain, durable storage, encryption/key custody, TLS, budget, staff recovery and monitoring. Complete actual browser/device/accessibility/performance/security tests, dependency review, HTTP disclosure checks and restore drill. No release approval is inferred from a passing build.

Implementation references checked: [Astro Node standalone adapter](https://docs.astro.build/en/guides/integrations-guide/node/) and [Caddy file matching](https://caddyserver.com/docs/caddyfile/matchers#file). Verify behavior against the locked deployed versions during rehearsal.

### Node + systemd + Caddy option

For a non-container Release 1 host, install the reviewed checkout at `/srv/kora/app`, create a dedicated unprivileged `kora` service account, and provide `/etc/kora/kora.env` (mode 0600) from protected deployment tooling. Set `KORA_DB_PATH=/data/kora.sqlite`, `KORA_ORIGIN`, `KORA_PRODUCTION=1`, `KORA_RETENTION_APPROVED=1`, `KORA_INQUIRY_RETENTION_MONTHS=24`, and `KORA_SPAM_RETENTION_DAYS=30` there. Install `deploy/kora.service`, run `systemctl enable --now kora`, and verify the private listener on `127.0.0.1:4321`. Use a systemd-specific Caddy site that reverse proxies to `127.0.0.1:4321` while retaining the headers and private-route rules in `deploy/Caddyfile`. This path is the accepted Release 1 deployment baseline; Docker remains optional evidence.
