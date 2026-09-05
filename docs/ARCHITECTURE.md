# Architecture and ownership

Implementation authorized 2026-09-05. One Astro/Node application, prerender public pages, server-render intake/admin. TypeScript core has no Astro imports. SQLite is private persistent storage using Node24 node:sqlite. No external runtime service.

## Dependency direction

Presentation src/ui and public components → HTTP pages/controllers → src/application services → src/domain rules and persistence interfaces → src/server SQLite adapter. Authentication/session src/server/auth.ts is independent of presentation. Restricted Government data is a separate server-only concern; public content receives only approved public descriptions/IDs, never internal records. No native app/API proliferation.

## Single-writer ownership / packets

| Task / owner | Exact scope | Dependencies/contracts | Requirements / acceptance / verification | Prohibited / handoff |
|---|---|---|---|---|
| T-FOUNDATION + T-INTAKE-ADMIN / Orchestrator | package/config, src/server/**, src/application/**, src/ui/**, request/contact/supplier/teaming forms, admin/API, middleware, integration/E2E tests, registers | domain exports below; SiteLayout title/description + slot | F-003/007/010/012, SEC; durable intake, session protected inbox, idempotent retry; unit/integration/E2E | No scope additions/actual secrets; integrate with evidence |
| T-DOMAIN / domain | src/domain/**, tests/domain/** only | PRD §12/16/19/29; plan §5 | 11 validated variants, routing/status; exhaustive Vitest | No controllers/DB/config edits; handoff contract/files/tests |
| T-PUBLIC / public_ui | src/components/**, layouts/**, styles/**, content/**, public/brand/**; all public static pages except form routes | SiteLayout props title/description; form route links | F-001/002/004/005/006/008/009/011/014/015; routes, keyboard/mobile/reduced motion | No domain/admin/package changes; no fabricated approved content |
| T-OPSQA / ops_qa | scripts/verify-public.mjs, check-links.mjs; deploy/**, Dockerfile/.dockerignore; docs/OPERATIONS,SECURITY,TESTING; tests/security/** | dist/client; dist/server/entry.mjs; Node24 | SEC-013, REL, P §39/40; runnable disclosure/link verification, truthful deployment/testing docs | No app/config/register edits; no credential searches |

All consume unchanged source specifications and approved plan. QA/security/accessibility/performance review is assigned when foundational writers finish. Shared workspace (protected empty .git, no worktree support); strict ownership, Orchestrator serializes shared edits. Do not initialize protected .git without appropriate permissions.

## Domain contract

src/domain/inquiry.ts exports InquiryType, Queue, Status, validateInquiry(flat input), ValidatedInquiry (type/contact_name/email/organization?/phone?/subject/details/structured_data), deriveQueue, canTransition, inquiryTypes, statuses, typeLabels, inquiryFields. Field names are stable task communication; HTTP strips only transport fields (attempt/website trap) before domain validation. Client queue is rejected.

## Persistence/security decisions

Private SQLite path KORA_DB_PATH, default ./var/kora.sqlite; never public web root. WAL, foreign keys, bounded statements/transactions. Persist attempts before form submit; bind nonce to browser cookie and expiry. Successful attempt binding survives restart and retries. Admin credentials use native scrypt with independent salt; raw passwords never logged or passed as CLI flags. Opaque session tokens hashed in DB, idle/absolute expiry, secure cookies in production, origin/CSRF protections and local rate limits. Production proxy must strip spoofed address headers.

Exact constraints and evidence will be updated after tests. Current official references checked: https://docs.astro.build/en/guides/integrations-guide/node/ and https://nodejs.org/api/sqlite.html ; dependency pins remain package-lock.json authority. Node native SQLite avoids a separate binary driver; test its actual runtime rather than assuming maturity from latest online docs.
