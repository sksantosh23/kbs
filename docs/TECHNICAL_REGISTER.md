# Technical Register

Dashboard/index, Orchestrator-owned. Updated 2026-09-05. Canonical technical detail: ARCHITECTURE.md; product semantics PROJECT_PLAN.md §5 and PRD. Verification status is recorded per decision.

| ID/date | Context/options | Decision/reason | Trade-offs/consequences | Requirements/reference | Status |
|---|---|---|---|---|---|
| TD-001 / 2026-09-05 | Content-first app; static-only vs SPA vs Astro hybrid | Astro + Node adapter; prerender content and server forms/admin | Single deploy; public content independent of DB | P §28; ARCHITECTURE.md | Verified build |
| TD-002 / 2026-09-05 | Durable first-party store; SQLite vs hosted DB | Node24 built-in SQLite, transactions/prepared queries | No native add-on dependency; one local writer, runtime API must be tested | P §29; ARCHITECTURE.md | Implementing |
| TD-003 / 2026-09-05 | Small interactions; Preact vs native enhancement | Native HTML/forms/scripts; no island framework until needed | Less client dependency; explicit focus/wizard code | P §28 allows lightweight islands only when justified | Recorded |
| TD-004 / 2026-09-05 | Auth/session; external vs first-party | Native scrypt and opaque hashed persistent sessions, CLI recovery | Uniform admin, no email reset/RBAC | F-012, SEC-005; ARCHITECTURE.md | Implementing |
| TD-005 / 2026-09-05 | Content accuracy vs fabricated launch copy | Preview only for unapproved content, fail release approval gate | Engineering usable; production remains blocked Q05 | BR-001/024; release:check | Implementing |
| TD-006 / 2026-09-05 | Public disclosure and link integrity | Recursive artifact verifier and route-aware link checker with synthetic negatives | Text checks do not replace visual opaque-asset review or live HTTP capture | SEC-013, P §39; scripts/tests/security | Verified scripts/tests; integration pending |
| TD-007 / 2026-09-05 | Browser security defaults and private cache isolation | Same-origin CSP/security headers in Astro middleware; no-store for admin/API | Inline styles remain required by current Astro components; CSP must be exercised against deployed output | SEC-007/010, FR-012.20 | Implementing |
| TD-008 / 2026-09-05 | Repository integrity was previously treated as a general Orchestrator task; dedicated ownership is required for parallel delivery and remote synchronization | Ops/QA specialist is designated Repository / DevOps Custodian, accountable for Git hygiene, secret/prohibited-data checks, branch/worktree coordination and GitHub parity; Orchestrator retains integration authority | Adds a clear operational owner without application-feature scope; parity is reverified at each checkpoint | Constitution/Protocol delivery governance; repository requirement; PROJECT_PLAN.md | Verified; `main`/`origin/main` parity and clean tree evidence 2026-09-05 |

Dependencies: package.json/lockfile authoritative pins. Constraints: no SaaS, no public uploads, no public identifiers, no native Release 1. Technical debt: none accepted; unfinished features are Lean work, not debt.
