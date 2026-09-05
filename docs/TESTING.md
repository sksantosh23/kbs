# Test evidence and release checklist

Authority: PROJECT_PLAN §10/10.1/15.7; PRODUCT_REQUIREMENTS §§39–40. The Orchestrator maintains integrated execution evidence and traceability. This document defines commands and remaining release verification, not a claim that all tests have run.

## Available standalone checks

```sh
node --test tests/security/*.test.mjs
node scripts/verify-public.mjs dist/client
node scripts/check-links.mjs dist/client
```

`tests/security/public-artifacts.test.mjs` exercises warning false positives, prohibited properties/associated identifiers, escaped keys, explicitly supplied synthetic values, all textual artifact surfaces plus downloads, report non-disclosure, opaque-file review/hash invalidation, links/queries/fragments and missing/placeholder links. On 2026-09-05, Node v24.20.0 directly executed this suite: six tests passed. This is synthetic utility evidence only; built site checks must run against the final integrated build. See SECURITY.md for optional restricted comparison and opaque artifact reviews.

The link checker reads built HTML `href`, `src`, and `action`; resolves static files/routes and fragment IDs; rejects empty/placeholder links. Its narrow dynamic allowlist corresponds to `/request`, `/contact`, `/partners/suppliers`, `/partners/teaming`, `/api/inquiries`, `/admin/login`, `/admin/logout`, `/admin/export`, `/admin/inquiries`, `/admin/inquiries/[id]`, `/health`. These are runtime targets, not proof that handlers work. Query aliases, runtime status codes, sitemap/SEO uniqueness, CSS URLs, srcset and JavaScript-generated links require separate integration/browser/content checks. Absolute same-origin links require `SITE_URL` to match the actual build origin.

## Required release evidence

| Area | Required evidence before release |
|---|---|
| Domain and integration | All 11 inquiry variants and Government acquisition queue rules, schema boundaries, forward-only status transitions, real SQLite commit/rollback, retry/idempotency/concurrency, notes/audit/deletion and filtered CSV |
| Browser journeys | PRD §39.4's 14 journeys, plus Service/Logistics/Technology/Other, database failure and lost-response retry; no false receipt or lost current-page input |
| Security | Bypass/private action/export tests, auth rate limits/session revocation, cookie attributes, CSRF, SQL injection, stored/reflected XSS, CSV formula controls, headers/CSP, log inspection, dependency advisories/licenses |
| Publication | All built files and actual synthetic public HTTP responses scanned; metadata/JSON-LD/search/maps/downloads included; approved public schemas/import review; visual document/image inspection; no private routes in sitemap/index |
| Accessibility | Automated axe on representative public/admin routes; no unresolved serious/critical findings; keyboard, focus return/trap, live errors/search/success, screen reader, 200% zoom, 320px reflow, contrast, reduced motion |
| Devices | Exact current stable Chromium/Firefox versions, actual Safari/macOS and Safari/iPhone, Chrome/Android; tablet portrait/landscape. Playwright WebKit does not establish actual Safari evidence |
| Performance | Lab results for home, request, Government, medical/IoT and an approved article if one exists; JS/CSS/font/image and mobile transfer budgets. No fabricated field p75 or shipping dummy article for testing |
| Content | All planned routes; exact contacts/status, relevant contextual links, no placeholders/drafts/unsupported claims, Government mapping/content approval, media provenance and print |
| Operations | Actual HTTPS proxy rehearsal, database-outage static resilience, storage failures, tested consistent backup and isolated restore including deletion reconciliation, rollback and named monitoring owner |
| Privacy | Notice reconciled to actual collection/storage/cookies/logs, approved retention/export/audit/backup policy, named sensitive-submission procedure operator |

Browser, axe, responsive, keyboard, reduced-motion, 200% zoom, security-header and local performance checks have been executed with Playwright (14/14 passing) against the production build. The final Lighthouse lab run against the production build reports performance, accessibility, best-practices and SEO scores of 1.00, FCP/LCP 1.2s, TBT 0ms and CLS 0.005. Container/Caddy validation remains blocked by the unavailable Docker-compatible runtime (OPS-001). Restore rehearsal and production-device/field validation remain release work. Record later results with command, runtime/browser version, revision, date, result and material limits in the project evidence register. A build or unit-test pass alone does not satisfy any unexecuted release gate.
