# Release 1 launch readiness

This guide starts the current Release 1 build for local human testing. It describes the responsive web application that is in the repository. Release 1 does not include a native iOS or Android application.

## Fastest start

Use a terminal in the repository root:

```sh
cd /home/sk/projects/kbs
node --version                 # must be 24.x (less than 25)
npm ci
npm run dev
```

Open **http://127.0.0.1:4321/** in a desktop browser. No Docker container, database service, external SaaS, identity provider, API key, or environment file is required for this local start. Stop the server with `Ctrl-C`.

The first successful inquiry submission creates the local SQLite runtime file at `var/kora.sqlite`. It is local test data and is ignored by Git.

## Mobile testing

There is no separate mobile executable or mobile build. Test the responsive mobile web application at the same URL:

1. Start `npm run dev` as above.
2. Open `http://127.0.0.1:4321/` in Chrome or another current browser.
3. Enable the browser's responsive/device toolbar and test at least 375 × 812 (mobile), 768 × 1024 (tablet), and 1440 × 900 (desktop).

For a physical phone on the same reachable network, start the server with `npm run dev -- --host 0.0.0.0`, obtain the WSL address with `hostname -I`, and open `http://<that-address>:4321/` on the phone. Firewall or WSL networking may prevent physical-device access; device emulation at `127.0.0.1` is the immediately available mobile test path. No emulator, simulator, or native build is required.

## Configuration and accounts

For public human testing, no credentials and no environment variables are needed. The application defaults to:

- database: `./var/kora.sqlite`;
- local development mode and HTTP at `127.0.0.1:4321`;
- no external services.

Do not copy production-looking values from `.env.example` into a local environment unless you intentionally need to override a setting. If a local override is needed, use a protected, ignored `.env` file; never commit it or place secrets in it. `SITE_URL` only changes canonical/sitemap URLs, and `KORA_DB_PATH` changes the SQLite path. `KORA_PRODUCTION=1` and `KORA_RETENTION_APPROVED=1` are production-operation settings and are not needed for human testing.

The public inquiry journey needs no account. To test the private admin inbox locally, create a disposable local administrator in a private terminal:

```sh
npm run admin -- test-admin
```

Enter a disposable password when prompted, then visit **http://127.0.0.1:4321/admin/login**. This creates or resets only the local SQLite account. Do not use a production password or real sensitive inquiry data. There is no signup, external identity provider, or password-reset email flow.

## Dependencies and services

Required: Node.js 24.x, npm, and the repository's locked npm dependencies installed by `npm ci`. The Astro Node server is the only process needed. Docker is **not required** for human testing. Docker validation is a separate release-readiness check and is currently unavailable in the WSL environment.

## Human test order

1. **Public entry and navigation:** open `/`, use the primary requirement CTA, header/footer navigation, skip link, mobile menu, and back/forward navigation.
2. **Responsive layout:** repeat the home, Government, Products, supplier, teaming, and request journeys at mobile, tablet, and desktop widths; check for clipped or horizontally scrolling content.
3. **Inquiry intake:** submit one safe synthetic example for Product, Government, Supplier, Teaming, Service, Logistics, Technology, IoT, Medical Technology, Other, and General. Use fake names, addresses, and email addresses. Verify required fields, bounded fields, contextual fields, warnings, privacy link, confirmation reference, and the no-sensitive-data warning.
4. **Retry behavior:** after a successful submission, do not paste sensitive information into the form. If a browser/network interruption occurs, retry the same test attempt and confirm the UI does not create a second inquiry.
5. **Public content and disclosure:** review `/what-we-do`, `/government`, `/products`, `/partners/suppliers`, `/partners/teaming`, `/contact`, `/privacy`, `/accessibility`, and `/insights`; record any copy, link, metadata, or unsupported-claim issue. Preview/unapproved content must not be treated as final production approval.
6. **Admin inbox:** after creating the disposable local admin, sign in, confirm the inquiry appears with its deterministic queue, filter by type/queue/status, search by reference/contact/email, open an inquiry, add an internal note, export filtered CSV, and sign out.
7. **Admin lifecycle:** verify the available forward lifecycle controls: `NEW → IN_REVIEW → CONTACTED → CLOSED`, with `SPAM` as the alternate terminal state. Do not assume or test a reopen/reverse transition; the current build does not authorize one.
8. **Accessibility and interaction:** test keyboard-only navigation, visible focus, focus return from the mobile menu, reduced-motion preference, browser zoom to 200%, form errors, and screen-reader labels/live messages where available.

## Reporting feedback

Report feedback through the KBS GitHub repository issue process or directly to the development coordinator. Include the route, browser/version, device or viewport, exact reproduction steps, expected result, actual result, timestamp, and a screenshot or console error when useful. State whether the issue affects public web, mobile layout, inquiry submission, or admin. Never include passwords, tokens, private keys, real personal data, sensitive inquiry bodies, Government identifiers, or a real inquiry reference in an issue; use synthetic replacements.

## Current testing status and blockers

You can begin public human testing **now**. The current integrated build has passed its automated unit, build, disclosure, accessibility, responsive, browser, and Lighthouse checks. Docker is not needed to start or use the web application. Local admin testing requires the one-time disposable-account command above; it does not require human approval or an external service.

Production-only decisions remain open for later deployment: approved Government capability/content, final privacy/retention policy, hosting/domain/backup ownership, and operational handling of accidentally submitted sensitive information. They do not prevent this local Release 1 human test cut.
