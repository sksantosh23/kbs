# Security and publication boundary

Scope: PRD SEC-001–014, BR-007/020–024/026–028; PROJECT_PLAN §§8, 10.1. This is a threat model and verification procedure, not certification or release approval.

Assets are inquiries, contact information, internal notes, credentials/sessions, publication integrity, and any separately controlled Government source records. Boundaries are anonymous browser → application, authenticated browser → private operations, application → SQLite, authoring/build → public artifacts, and live storage → restricted backup. All staff have the same authorized application role; routing queues do not grant permissions.

Threats and required evidence:

| Threat | Control and required validation |
|---|---|
| Spam/brute force | Server size/enum validation, local rate limiting, honeypot, accessible timing retry; test shared-network and fast users |
| Injection/XSS | Prepared SQL and output encoding; submit stored/reflected payloads through actual forms/admin |
| CSRF/session theft | Same-origin checks, CSRF tokens where applicable, Secure/HttpOnly/SameSite cookies, bounded session expiry/revocation; negative requests on every mutation |
| Private-data access/cache | Authorize every detail/action/export; no-store/noindex, no static generation or indexing; unauthenticated and wrong-session probes |
| CSV formula execution | Neutralize user-controlled cells; verify export and authorization together |
| Build disclosure | Public schemas/import boundaries plus complete artifact and HTTP-response verification below |
| Logs/backups | No bodies, cookies, passwords, raw search queries, restricted values or free text in logs; restricted storage, encrypted backups, tested restore/deletion |
| Supply chain | Locked dependencies, local runtime assets, reviewed licenses/advisories and CSP; repeat before release |

## Runnable Government publication gate

Run after each build:

```sh
node scripts/verify-public.mjs dist/client
node scripts/check-links.mjs dist/client
node --test tests/security/*.test.mjs
```

The verifier recursively inspects every file in the supplied output root, rejects symlinks/empty output, and detects restricted property names, identifier-associated values, escaped textual identifiers and a test-only sentinel. HTML includes metadata and inline JSON-LD; JS, maps, search JSON, feeds, SVG and downloads are included. Generic visitor warnings about credentials, PHI and identifiers are permitted. Reports contain only asset paths and rule IDs; never matched values.

When an authorized operator needs exact-value comparisons, set `PUBLIC_RESTRICTED_VALUES_FILE` to an explicitly supplied private JSON array of nonempty strings (minimum three characters). No actual identifiers are necessary for development or synthetic tests. Never discover values by searching secrets, put them in command arguments, commit the file, or put it under public/build directories. Use an internal runner with restricted output access. This gate does not inspect visitor submissions and is not a DLP feature.

Raster images, PDFs, archives and other opaque files block verification until inspected. Extract all text and metadata using an appropriate local format tool, scan that extraction with `inspectText`, and visually inspect all rendered pages/images. An authorized reviewer may supply `PUBLIC_ARTIFACT_REVIEWS_FILE` pointing to a JSON object keyed by public relative path, with `sha256`, `reviewer`, `reviewedAt`, `textAndMetadataReviewed: true`, and `renderedReviewed: true`. Record only non-sensitive review evidence. Changed bytes invalidate the attestation. Fonts are exempt from visual-document attestation but their raw bytes are scanned and license/provenance review is still required. Avoid opaque public files when review cannot be completed.

Automation is defense in depth: pattern matching cannot identify arbitrary unlabeled, encrypted, compressed or deliberately obfuscated values. Review public-schema/import boundaries, visually inspect SVG/documents/images, and compare authorized values inside the internal boundary when needed. Build scans cannot establish server-response safety: capture all real public GET responses and safe synthetic form success/error responses in a private temporary directory, scan them with this verifier, then delete the captures under the test retention procedure. Include any existing public API payloads; do not create an API for testing. Never capture live visitor submissions. Private exports are tested separately for authorization and caching.

## Operational privacy

Staff encountering unsolicited sensitive information must stop copying/exporting it, notify the designated operator using only the reference and a non-sensitive description, and follow the approved deletion/preservation decision. Delete associated notes, address existing exports, and prevent backup restoration from reintroducing deleted data. Keep only justified minimal audit metadata. No automatic classification, quarantine, SaaS or notification integration is introduced. Privacy/security operator, final retention/audit/backup policy, and incident responsibilities require approval before production.

Production uses HTTPS and first-party assets only. The supplied Caddy policy must be reconciled with generated inline styles/scripts and JSON-LD: prefer external assets or exact reviewed hashes/nonces; do not silently broaden to unsafe script execution. Confirm headers on both static and dynamic HTTP responses. Direct Node access must be private. Public solicitation links must not trigger server fetches. No production security test or dependency-advisory result is implied by this document.
