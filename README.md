# Kora Business Solutions

Release 1 is a first-party Astro/Node responsive website with structured inquiry intake and a private SQLite-backed inquiry inbox. Public content is independent of the database; authenticated administration runs on the same server boundary.

## Development and local testing

Requirements: Node.js 24.x and npm. From a fresh clone:

```sh
npm ci
npm run check
npm test
npm run build
npm run release:check
npm run verify:ops
npm run verify:media
npm run dev
```

Copy `.env.example` to a protected local `.env` (never commit it), adjust only local paths/values, then use `npm run dev` for development at `http://127.0.0.1:4321`. To exercise the production-style server locally, run `npm run build` followed by `npm start`; the same URL serves the built application. Node 24 is required.

Provision a local administrator only when testing private operations: `npm run admin -- <username>`. The CLI prompts for a hidden password and confirmation. Use isolated local database state; never place credentials in source control.

Playwright smoke tests use `playwright.config.ts` and require an authorized runner with Chromium system libraries:

```sh
npm run test:e2e
```

## Configuration

Copy `.env.example` to a protected local/deployment environment file. Never commit the copied file or any credential-bearing values. Runtime inquiry data belongs on persistent Kora-controlled storage, not in the public web root. `KORA_RETENTION_APPROVED=1` is required only for an explicitly approved retention run; the default local targets are 24 months and 30 days.

Operational procedures for admin provisioning, backup/restore, retention approval and accidentally submitted sensitive information are in [`docs/OPERATIONS.md`](docs/OPERATIONS.md). Architecture, security, testing and delivery dashboards are in `docs/`.

## Repository discipline

`main` is the integration branch and tracks the configured GitHub origin. The Repository / DevOps Custodian verifies clean status, prohibited-file checks, disclosure checks and remote parity at every integration checkpoint. The three authoritative specifications remain unchanged.
