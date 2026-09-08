# Kora Business Solutions — Release 1 Handoff

## A. Project

- Repository: `https://github.com/sksantosh23/kbs.git`
- Integration branch: `main`
- Handoff baseline: commit `2e42bd9` (Q07 topology absorbed); the final handoff synchronization commit is recorded in the final Git report.
- Status: implemented and verified Release 1 engineering baseline; production launch remains gated by Q05 and the documented infrastructure/recovery execution work.

## B. Source of truth (read in order)

1. [01_AI_ENGINEERING_CONSTITUTION.md](../01_AI_ENGINEERING_CONSTITUTION.md)
2. [02_AI_PROJECT_OPERATING_PROTOCOL.md](../02_AI_PROJECT_OPERATING_PROTOCOL.md)
3. [PRODUCT_REQUIREMENTS.md](../PRODUCT_REQUIREMENTS.md)
4. [PROJECT_PLAN.md](../PROJECT_PLAN.md)
5. [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md)
6. [CHANGE_REGISTER.md](../CHANGE_REGISTER.md)
7. [HUMAN_DECISIONS.md](HUMAN_DECISIONS.md)
8. [TECHNICAL_REGISTER.md](TECHNICAL_REGISTER.md)
9. [RISK_REGISTER.md](RISK_REGISTER.md)
10. [LEAN_REGISTER.md](LEAN_REGISTER.md)
11. [ARCHITECTURE.md](ARCHITECTURE.md)
12. [SECURITY.md](SECURITY.md)
13. [OPERATIONS.md](OPERATIONS.md)
14. [TESTING.md](TESTING.md)
15. [media-manifest.json](../content/media/media-manifest.json)

The three authoritative specification files remain unchanged.

## C. Implemented

Release 1 contains the KORA brand system with canonical SVG logos, locally hosted Manrope, responsive public and mobile-web surfaces, capability and Government/Public Sector pages, Start a Requirement intake, first-party SQLite inquiry persistence, admin inbox search/filter/detail/status/notes/export, CSRF protection, anti-abuse controls, admin login rate limiting, disclosure/security headers and scans, configurable retention/deletion behavior, operational admin/backup/retention CLIs, provenance-tracked local editorial media with AVIF/WebP/JPEG derivatives, accessibility/responsive browser coverage, and Node + systemd + Caddy deployment scaffolding.

## D. Verified baseline

Latest verified results before handoff documentation:

- `npm run check` — passed (61 files, 0 diagnostics)
- `npm test` — 281/281 passed
- `npm run build` — passed
- `npm run verify:media` — passed
- `npm run verify:ops` — passed
- `npm run release:check` — passed
- `npm audit --omit=dev --audit-level=high` — 0 vulnerabilities
- Playwright/axe/security/responsive suite — 14/14 passed
- Requirements traceability — 178/178

## E. Performance

Repeated local Lighthouse runs against the same production build produced median performance `0.91`, FCP `1.65s`, LCP `3.38s`, CLS `0.001`, and transfer `494 KiB`. The LCP element was the homepage hero `H1`; the editorial image is below the fold, lazy-loaded, and selected as a 640w AVIF resource. These are local lab measurements, not production field or p75 metrics. The P §33 LCP target remains a follow-up.

## F. Human decisions

- Q07 — **CLOSED**. The approved production topology and operational/backup contact are recorded below.
- Q05 — **OPEN** pending factual Government/capability content approval.
- Q06 and Q10 — closed and absorbed into privacy/operations documentation.

## G. Approved production topology

`Cloudflare Free → Kora-controlled DigitalOcean NYC3 Linux Droplet → Caddy → systemd → Astro/Node 24 → private SQLite → encrypted off-host backups`

Canonical domain: `https://korasb.com`  
Operational contact: `support@korasb.com`  
Backup/recovery contact: `support@korasb.com`  
Restore rehearsal is mandatory before launch. Docker is optional.

## H. Deferred / next work

- Q05 factual capability and Government content approval.
- DigitalOcean provisioning, Cloudflare DNS, TLS verification, firewall/origin restriction, private Node listener, production filesystem permissions, encrypted off-host backup implementation, backup key custody, staging deployment/acceptance, restore rehearsal, and final production cutover.
- Performance follow-up: investigate font/critical-rendering optimization only with measured benefit; staging/production measurement remains required.

## I. Production admin boundary

Until stronger MFA/security controls are implemented, `/admin` must not be broadly Internet-exposed without an approved compensating restriction. No credentials or network ranges are prescribed here.

## J. Important prohibitions

No public UEI, CAGE, NAICS, SAM or equivalent internal registration identifiers; no committed secrets; no runtime databases, WAL/SHM files, backups, exports or inquiry/customer data; no unsupported Government, manufacturer, certification or past-performance claims.

## K. Intentionally deferred security enhancements

Admin MFA/TOTP, additional session hardening, deeper systemd sandboxing where not already present, and broader operational monitoring remain intentionally deferred. They are not forgotten scope.

## L. Resume instructions

`READ SOURCES → CHECK HUMAN DECISIONS → CHECK CHANGE/TECHNICAL/RISK/LEAN REGISTERS → VERIFY GIT → RUN BASELINE CHECKS → CONTINUE FROM DEFERRED ITEMS`

For a new clone:

```sh
git clone https://github.com/sksantosh23/kbs.git
cd kbs
git checkout main
node --version   # Node 24.x
npm ci
npm run check
npm test
npm run build
npm run release:check
```

Copy `.env.example` to a protected local environment file. Do not copy the current runtime database or any secret-bearing file; the application initializes a new SQLite database through repository-controlled schema logic.
