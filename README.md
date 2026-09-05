# Kora Business Solutions

Release 1 is a first-party Astro/Node responsive website with structured inquiry intake and a private SQLite-backed inquiry inbox. Public content is independent of the database; authenticated administration runs on the same server boundary.

## Development

Requirements: Node.js 24.x and npm. Install dependencies and run the checks:

```sh
npm ci
npm run dev
npm test
npm run check
npm run build
npm run release:check
```

Playwright smoke tests use `playwright.config.ts` and require an authorized runner with Chromium system libraries:

```sh
npm run test:e2e
```

## Configuration

Copy `.env.example` to a protected local/deployment environment file. Never commit the copied file or any credential-bearing values. Runtime inquiry data belongs on persistent Kora-controlled storage, not in the public web root.

Operational procedures for admin provisioning, backup/restore, retention approval and accidentally submitted sensitive information are in [`docs/OPERATIONS.md`](docs/OPERATIONS.md). Architecture, security, testing and delivery dashboards are in `docs/`.

## Repository discipline

`main` is the integration branch and tracks the configured GitHub origin. The Repository / DevOps Custodian verifies clean status, prohibited-file checks, disclosure checks and remote parity at every integration checkpoint. The three authoritative specifications remain unchanged.
