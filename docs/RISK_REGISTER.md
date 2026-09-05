# Risk Register

Updated 2026-09-05. Orchestrator owns unassigned risks. Qualitative priority; unknown probabilities are not invented. Source risk inventory PROJECT_PLAN.md §13.

| ID/category | Description/trigger | Probability / impact / priority | Requirements/components | Mitigation / contingency | Owner / status | Resolution evidence/date |
|---|---|---|---|---|---|---|
| R-008/security | Internal Government data leaks through build/client output | Low–medium / high / high | SEC-013, public output | Separate input schema, automated output checks + synthetic negatives; block publication on detection | ops_qa / MITIGATING | Pending integrated scan |
| R-003/content | Government/medical/IoT capability claims lack final sources | Certain currently / high / high | F-004/006/015 | Preview metadata and production gate; withhold release without owner approval | Orchestrator / OPEN | Q05 pending |
| R-002/performance | Rich visuals exceed budget or harm accessibility | Medium / high / high | F-002, A11Y, P §33 | Local CSS/SVG, minimal JS; browser/axe/performance review; simplify measured issue | public_ui / MITIGATING | Pending tests |
| R-005/operations | Unnoticed inquiries without notifications | Medium / medium / medium | F-012 | Staff inbox cadence; no invented SLA/notification service | Orchestrator / OPEN | Q07 pending |
| R-006/data | SQLite lost on ephemeral host or inconsistent backups | Low initial / high / high | REL, P §29 | Persistent volume, consistent backup/restore drill; no serverless ephemeral deployment | Orchestrator / MITIGATING | Pending restore test |
| R-012/privacy | Retention/export/deletion policy not final | Unknown / high / high | BR-021/022, Q06/10 | Configurable defaults and approved production policy; no production purge without signoff | Orchestrator / OPEN | Q06/10 pending |
| R-013/reliability | Retry after lost response creates duplicate; concurrent status overwrite | Plausible / high / high | FR-003.12, F-012 | Transactional idempotency, version check, restart/retry tests | Orchestrator / MITIGATING | Pending integration tests |
| R-014/delivery | Parallel agents overwrite shared contracts/files | Medium / high / high | Governance §15 | Single owners, fixed contracts, root integration; serialize shared edits | Orchestrator / MITIGATING | Ownership packets recorded |
| R-015/release | Automated checks mistaken for complete manual/device validation | Medium / high / high | P §39/40 | Exact evidence, no false COMPLETE/production claim; document remaining device checks | Orchestrator / OPEN | Pending readiness report |
