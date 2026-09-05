# PRODUCT_REQUIREMENTS.md

**Product:** Kora Business Solutions Website  
**Brand:** KORA | Business Solutions  
**Status:** DRAFT 
**Version:** 0.2  
**Last Updated:** 2026-09-04  
**Primary Platforms:** Responsive Web (desktop, tablet, mobile browsers)  
**Mobile Web:** First-class, intentionally designed experience  
**Native iOS/Android Apps:** Not required for the initial website release; retained as planned/possible future product platforms and must not be architecturally blocked  
**Authority:** Explicit current user direction, then `01_AI_ENGINEERING_CONSTITUTION.md`, then `02_AI_PROJECT_OPERATING_PROTOCOL.md`

---

## 1. Purpose

This document defines the product requirements for a complete, highly responsive, visually rich, non-traditional corporate website for **Kora Business Solutions**.

The website must position Kora as a **business-orchestration and solutions company** spanning approved sourcing, procurement, supply/distribution, medical and invasive technologies, IoT and connected systems, business services, technology enablement, logistics/trade coordination, government/public-sector participation, supplier relationships, and strategic partnerships. It must not present Kora as a conventional IT company, logistics company, staffing company, distributor, or government contractor with a narrow single-category identity.

The website must be capable of operating without paid SaaS dependencies or required runtime integrations with external systems. It must be buildable and deployable using open-source software and self-hostable infrastructure.

The initial delivery is web-first, but the product architecture must remain compatible with future Kora iOS and Android applications that may consume Kora business workflows and first-party data. The public website must not become a web-only architectural dead end.

This document is intended to become the authoritative source for product requirements. Detailed architecture, data model, security design, testing plan, and design-system implementation may later be split into their own authoritative documents if the project grows enough to justify that separation.

---

## 2. Source Basis and Decision Status

### 2.1 Hard constraints from the current product direction

The following are current hard requirements:

1. The site must include a complete homepage and supporting pages.
2. Navigation and calls to action must correctly interlink all public pages.
3. The experience must be intentionally designed for desktop, tablet, and mobile; mobile must not be a compressed desktop layout.
4. The design must be contemporary, rich, editorial, premium, and interaction-aware.
5. Kora must not be presented as a traditional IT or generic technology company.
6. The site must use open-source platform technologies.
7. The site must not depend on paid services.
8. The site must not require runtime integrations with external SaaS systems.
9. Stock imagery may be seeded from free sources such as Unsplash, Pexels, or Pixabay, subject to the media rules in this document.
10. Accessibility, performance, security, privacy, maintainability, and responsive behavior are product requirements rather than post-launch enhancements.
11. The Government experience must be a dedicated first-level destination designed for federal, state, local, and other public-sector procurement visitors.
12. Public-facing Government content must use the approved status statement **`Government Registered Supplier`** and must not expose Kora's UEI, CAGE, NAICS, SAM identifiers, or equivalent registration identifiers.
13. Government registration/classification data may be retained and used internally to map approved capabilities, support contracting workflows, and validate content, provided it is not serialized or exposed to public clients.
14. Public external contact channels must use approved Kora role-based contact information rather than personal employee addresses.
15. Initial website delivery is responsive-web-first; future native mobile applications must not be architecturally blocked.

### 2.2 Current approved positioning

The site shall use the following positioning unless later superseded by an explicit approved product decision:

**Core idea:** `Requirement → Connection → Execution`

**Primary proposition:** Kora connects customer requirements with approved products, suppliers, medical and invasive technologies, IoT and connected systems, service providers, operational capabilities, logistics resources, technology enablement, government procurement pathways, and business partners capable of producing an outcome.

**Primary homepage concept:** `What do you need solved?`

**Primary conversion:** `Start a Requirement`

**Secondary conversion actions:**

- Submit a government/public-sector RFQ, RFP, RFI, RFC, fixed-price/FFP, solicitation, contract, subcontract, or related opportunity inquiry.
- Submit supplier interest/capability information.
- Submit a teaming, subcontracting, or strategic-partner inquiry.
- Send a general, procurement, or contracts inquiry through the approved Kora contact channel.

**Supporting engagement actions:**

- Explore Kora capabilities.
- Review the dedicated Government & Public Sector experience.
- Explore products/sourcing categories.
- Read relevant insights.

### 2.3 Approved public business information

The following values are approved by current user direction for public website use unless later changed:

- **Business name:** Kora Business Solutions
- **General inquiries:** `info@korasb.com`
- **Procurement / sourcing / supplier inquiries:** `procurement@korasb.com`
- **Contracts / government contracting / teaming inquiries:** `contracts@korasb.com`
- **Public phone:** `609-469-6366`
- **Public business location:** `Princeton, New Jersey 08540`
- **Public government status statement:** `Government Registered Supplier`

The following content must still be verified/approved before production publication:

- Detailed service/capability descriptions.
- Medical and invasive technology claims, categories, regulatory statements, and product descriptions.
- IoT and connected-systems capability descriptions.
- Approved geographic coverage statements.
- Approved supplier/partner statements.
- Government capability mappings derived from Kora's internal registrations/classifications.
- Capability statement document content.
- Any claim of manufacturer authorization, certification, set-aside status, contract vehicle, award, past performance, or agency relationship.
- Privacy-policy details beyond the approved general contact channel.

### 2.4 Government disclosure boundary

Kora may maintain UEI, CAGE, NAICS, SAM registration data and related classification information internally for legitimate operational, contracting, qualification, and content-governance purposes.

Those identifiers must **not** be exposed on the public website, including public HTML, metadata, JSON/JSON-LD, client-side JavaScript bundles, downloadable public data files, search indexes, or other public assets.

The public site shall instead translate approved internal government registration/classification data into clear, factual capability descriptions under the public status statement **`Government Registered Supplier`**.

Any capability statement or other file hosted for public download on the website is subject to the same non-disclosure rule. If Kora later approves a separate direct/offline artifact containing additional registration details, that distribution decision is outside the current public-website requirements and must be recorded separately.

---

## 3. Product Vision

Create a digital presence that makes Kora understandable within seconds while preserving the breadth of what the company can do.

The site should answer three questions quickly:

1. **What is Kora?**  
   A business-solutions company that connects customer requirements to practical execution paths.

2. **What can Kora help with?**  
   Approved sourcing, procurement, supply/distribution, medical and invasive technologies, IoT and connected systems, business services, technology enablement, logistics/trade coordination, supplier relationships, government/public-sector requirements, contracting participation, and teaming.

3. **What should I do next?**  
   Describe the requirement to Kora through a structured first-party intake experience or contact the appropriate Kora role-based channel.

---

## 4. Product Goals

### G-001 — Communicate differentiated positioning

Within the first viewport, visitors must understand that Kora solves and coordinates business requirements rather than selling a narrow class of IT services.

### G-002 — Convert ambiguous needs into structured inquiries

Visitors must be able to start with a broad need and be guided into an appropriate structured request without understanding Kora's internal organizational structure.

### G-003 — Establish factual credibility

The site must present verified business capabilities, the approved `Government Registered Supplier` status, supplier/partner pathways, and operating principles without unsupported claims, fake metrics, fake testimonials, fabricated customer logos, or public disclosure of internal government registration identifiers.

### G-004 — Serve multiple audiences without fragmenting the brand

The same site must support commercial buyers, public-sector buyers, suppliers, manufacturers, teaming partners, and general visitors while maintaining one coherent Kora identity.

### G-005 — Be fast despite rich UI

The visual experience must use motion, interactive elements, editorial layouts, and layered composition selectively while maintaining strong Core Web Vitals and low JavaScript dependence.

### G-006 — Operate independently

Core functionality must continue to work without Google Analytics, HubSpot, Salesforce, Mailchimp, Calendly, Typeform, reCAPTCHA, Mapbox, hosted search, Google Fonts, third-party form handlers, or any other required SaaS integration.

### G-007 — Make government acquisition engagement easy

A federal, state, local, or other public-sector visitor must be able to understand Kora's approved capability areas, confirm that Kora presents itself as a `Government Registered Supplier`, determine an appropriate acquisition/contracting path, and submit or route an opportunity with minimal friction.

---

## 5. Non-Goals

The initial website release is not intended to be:

- An e-commerce store.
- A real-time inventory system.
- A quote engine that guarantees pricing.
- A public marketplace.
- A supplier bidding platform.
- A customer portal.
- A government procurement portal.
- A CRM.
- A warehouse-management system.
- A freight-management system.
- A native iOS or Android application implementation for Release 1.
- A social network.
- A full visual CMS.
- A marketing automation platform.
- A live chat system.
- A payment-processing site.
- A repository for classified information, Controlled Unclassified Information (CUI), export-controlled information, credentials, financial account data, payment-card data, PHI, or other sensitive regulated data.
- A medical-advice, clinical-decision, diagnosis, treatment, or patient-care application.
- A public source of Kora's internal government registration identifiers.

A future Kora Opportunity Exchange, authenticated web application, and native mobile applications may be considered in later releases, but they are not part of this initial website delivery.

---

## 6. Target Audiences and Primary Jobs

### P-001 — Commercial buyer / procurement lead

**Goal:** Find a reliable path to source, supply, coordinate, or solve a business requirement.

**Primary jobs:**

- Understand what Kora can handle.
- Determine whether Kora is relevant to a specific requirement.
- Submit a sourcing, procurement, service, logistics, medical/invasive technology, IoT/connected-systems, or technology-enablement requirement.
- Find a relevant capability page.
- Contact Kora without navigating unnecessary corporate content.

### P-002 — Government/public-sector buyer

**Goal:** Determine whether Kora is a credible and relevant Government Registered Supplier for a specific procurement, solicitation, contract, or teaming need.

**Primary jobs:**

- Confirm Kora's public `Government Registered Supplier` status.
- Understand approved capabilities that are internally aligned to Kora's government registrations/classifications without requiring public access to the underlying identifiers.
- Review core products, sourcing, medical/invasive technologies, IoT/connected systems, business services, technology enablement, logistics/trade, and other approved capability areas.
- Understand supported engagement paths such as RFQ, RFP, RFI, RFC, fixed-price/FFP, solicitation, contract, subcontract, and teaming inquiries.
- Access an approved capability statement when available.
- Submit a government opportunity or requirement.
- Reach `procurement@korasb.com` or `contracts@korasb.com` based on the nature of the inquiry.

### P-003 — Supplier / manufacturer / distributor

**Goal:** Determine whether Kora may be a useful channel, sourcing, distribution, or opportunity partner.

**Primary jobs:**

- Understand supplier relationship types.
- Submit supplier capabilities.
- Indicate product/service categories and operating regions.
- Contact `procurement@korasb.com` when direct email is preferred.
- Understand that submission does not guarantee business or award.

### P-004 — Teaming / service partner

**Goal:** Explore prime/subcontract, specialist, delivery, logistics, technology, medical, IoT, or other partnership opportunities.

**Primary jobs:**

- Review partnership categories.
- Submit a teaming inquiry.
- Provide capabilities and relevant business information.
- Contact `contracts@korasb.com` when direct email is preferred.

### P-005 — General visitor / prospect

**Goal:** Understand Kora and determine whether further contact is worthwhile.

### P-006 — Kora administrator

**Goal:** Review and manage inbound inquiries without dependence on an external CRM or email automation service.

**Primary jobs:**

- Authenticate securely.
- Review new submissions.
- Search/filter submissions.
- Review the intended routing queue: GENERAL, PROCUREMENT, or CONTRACTS.
- Assign a simple status.
- Add internal notes.
- Export submissions for authorized internal use.
- Remove spam or expired data.

### P-007 — Kora contracting/procurement administrator

**Goal:** Maintain accurate internal government capability mappings and use government registration/classification information operationally without exposing internal identifiers publicly.

**Primary jobs:**

- Maintain or reference approved internal government registration/classification data.
- Map internal classifications to approved public capability descriptions.
- Review government inquiries and acquisition type.
- Ensure public content does not expose restricted public-disclosure fields.

---

## 7. Product and UX Principles

1. **Lead with the visitor's requirement, not Kora's org chart.**
2. **Use plain language before industry terminology.**
3. **Progressively disclose complexity.**
4. **Never force a visitor to choose a precise service category before they understand it.**
5. **Use motion to explain relationships or state changes, never only as decoration.**
6. **Provide keyboard, touch, and screen-reader equivalents for every interactive behavior.**
7. **Prefer verified facts over marketing superlatives.**
8. **Prefer fewer strong pages over many thin SEO pages.**
9. **No dark patterns, fake urgency, forced signups, or inaccessible carousels.**
10. **The site must feel premium because of composition, typography, information design, and interaction quality—not because of heavy 3D, video, or oversized JavaScript bundles.**
11. **Mobile interactions must prioritize thumb reach, short reading blocks, obvious back/close actions, and fast task completion.**
12. **No runtime feature may depend on a paid or externally hosted service.**

---

## 8. Platform Scope and Responsive Requirements

### 8.1 Supported web classes

The product must support:

- Mobile browsers from 320 CSS px viewport width and above.
- Modern tablets in portrait and landscape.
- Laptop and desktop widths through large displays.
- Keyboard-only desktop use.
- Touch-only mobile/tablet use.
- Screen readers and browser zoom/text scaling.

### 8.2 Responsive reference ranges

The design system may use framework-specific breakpoints internally, but behavior must be intentionally evaluated at approximately:

- 320–479 px: compact mobile.
- 480–767 px: large mobile.
- 768–1023 px: tablet.
- 1024–1279 px: compact desktop/laptop.
- 1280–1535 px: standard desktop.
- 1536 px and above: large desktop.

### 8.3 Responsive behavior rules

- No page may require horizontal scrolling at 320 CSS px except a deliberately scrollable component with an accessible non-scroll alternative.
- Core actions must remain reachable with text zoomed to 200%.
- Touch targets should be at least 44 × 44 CSS px where practical.
- Desktop hover behavior must always have a focus/tap equivalent.
- Dense visual diagrams must transform into simpler ordered content on mobile instead of merely shrinking.
- Multi-column editorial sections must collapse according to content priority, not DOM accident.
- Sticky elements must not obscure content or keyboard focus.
- The primary mobile CTA may use a sticky bottom action only when it does not interfere with browser controls, form keyboards, or accessibility.
- The mobile menu must be a full-height accessible drawer/sheet with focus trapping and explicit close behavior.
- Orientation changes must not lose user input or navigation state.

### 8.4 Initial delivery and native mobile readiness

Release 1 is a deliberate responsive web product. Separate native iOS and Android applications are not required for the initial website release.

However, the architecture must remain **web-first, not web-only**:

- Core domain semantics, inquiry types, status models, validation rules, and routing concepts must not be encoded only in presentation templates.
- First-party server/data boundaries must be designed so future authorized native clients can consume equivalent business workflows without rewriting the entire domain model.
- Public-web-specific navigation, layout, motion, and browser behavior may remain platform-specific.
- No native mobile application should be created merely to duplicate static corporate pages.
- Future native applications become appropriate when Kora introduces operational workflows such as opportunity notifications, requirement status, supplier responses, document capture, secure messaging, quotes, or authenticated account experiences.

### 8.5 Future platform evolution

The anticipated direction is:

1. **Release 1:** Public responsive website + first-party intake + internal inquiry operations.
2. **Future web application:** Authenticated operational workflows if approved.
3. **Future iOS/Android:** Native operational experiences when mobile-specific value justifies them.

This evolution is directional, not a committed release schedule.

---

## 9. Information Architecture and Route Inventory

All routes below are part of the initial public website unless marked internal.

| Route | Page | Primary audience | Primary action |
|---|---|---|---|
| `/` | Homepage | All | Start a Requirement |
| `/what-we-do` | Capabilities overview | Buyers | Explore capabilities |
| `/what-we-do/sourcing-procurement` | Sourcing & Procurement | Buyers | Start sourcing requirement |
| `/what-we-do/supply-distribution` | Supply & Distribution | Buyers | Start supply requirement |
| `/what-we-do/medical-invasive-technologies` | Medical & Invasive Technologies | Buyers / public sector | Discuss approved medical technology requirement |
| `/what-we-do/iot-connected-systems` | IoT & Connected Systems | Buyers / public sector | Discuss IoT requirement |
| `/what-we-do/business-services` | Business Services | Buyers | Discuss service requirement |
| `/what-we-do/technology-enablement` | Technology Enablement | Buyers | Discuss enablement requirement |
| `/what-we-do/logistics-trade` | Logistics & Trade Coordination | Buyers | Start logistics requirement |
| `/products` | Product sourcing directory | Buyers | Request product sourcing |
| `/government` | Government & Public Sector | Federal/state/local/public-sector buyers | Submit government opportunity / route procurement or contracts inquiry |
| `/government/contracting` | Government Contracting & Engagement | Public-sector buyers/partners | Review acquisition/contracting paths |
| `/partners` | Partner overview | Suppliers/partners | Choose partnership path |
| `/partners/suppliers` | Supplier relationships | Suppliers | Submit supplier profile |
| `/partners/teaming` | Teaming & delivery partners | Partners | Submit teaming inquiry |
| `/about` | About Kora | All | Understand company / contact |
| `/insights` | Insights index | All | Read an insight |
| `/insights/[slug]` | Insight article | All | Related content / requirement CTA |
| `/contact` | Contact | All | Choose contact channel / send general inquiry |
| `/request` | Start a Requirement | Buyers | Submit requirement |
| `/privacy` | Privacy | All | Understand data handling |
| `/accessibility` | Accessibility statement | All | Understand accessibility support |
| `/404` | Not found | All | Recover navigation |
| `/admin/login` | Admin login | Kora staff | Authenticate |
| `/admin/inquiries` | Inquiry inbox | Kora staff | Review submissions |
| `/admin/inquiries/[id]` | Inquiry detail | Kora staff | Manage submission |

### 9.1 Route growth rule

New SEO or capability routes must not be created unless they contain unique, useful content and a clear user purpose. Thin pages created only to target keywords are prohibited.

### 9.2 Government route prominence

`/government` is a first-level navigation destination and must not be buried only under `What We Do`.

The `/government` page must itself contain enough information for a federal, state, local, or other public-sector visitor to understand Kora's public supplier status, major approved capability areas, acquisition/contracting engagement options, and next-step contact pathways without requiring the visitor to read the rest of the corporate website.

---

## 10. Global Navigation and Interlinking Requirements

### FEATURE F-001 — Global site shell

**Objective:** Give every visitor an obvious, consistent path to core content and the primary requirement flow.

#### User stories

- **US-001:** As a first-time visitor, I want to understand the major areas of Kora from any page so I can decide where to go next.
- **US-002:** As a mobile visitor, I want a simple navigation drawer so I can navigate without precision tapping or nested hover menus.
- **US-003:** As a keyboard user, I want to reach every navigation item and submenu without a mouse.

#### Functional requirements

- **FR-001.1:** Every public page must include a global header and footer.
- **FR-001.2:** The brand mark in the header must link to `/`.
- **FR-001.3:** Desktop primary navigation must contain: `What We Do`, `Products`, `Government`, `Partners`, `Insights`, `About`.
- **FR-001.4:** A visually distinct `Start a Requirement` action must link to `/request`.
- **FR-001.5:** `What We Do` may open an accessible mega-menu on desktop.
- **FR-001.6:** The mega-menu must expose the approved capability routes—including sourcing/procurement, supply/distribution, medical & invasive technologies, IoT & connected systems, business services, technology enablement, and logistics/trade—and a link to `/what-we-do`.
- **FR-001.7:** Mobile navigation must use a menu button with an accessible name, expanded state, focus management, and Escape-key dismissal where a hardware keyboard is available.
- **FR-001.8:** Deep content pages must use breadcrumbs where they improve orientation.
- **FR-001.9:** The footer must include the major navigation groups, approved business name, role-based contact channels, privacy, accessibility, Government, and contact/request links.
- **FR-001.10:** No public navigation item may lead to a placeholder or broken route.
- **FR-001.11:** Internal admin routes must never appear in public navigation.
- **FR-001.12:** Internal and outbound links must have visually/semantically distinguishable behavior where needed.

#### Acceptance criteria

- All public routes are reachable from the global navigation, footer, a parent route, or contextual internal link.
- There are no orphan public pages.
- Automated internal-link checks report zero broken internal links before release.
- Navigation is fully operable by keyboard and touch.
- The mobile drawer does not allow focus to escape behind it while open.

---

## 11. Homepage Requirements

### FEATURE F-002 — Homepage narrative and conversion

**Objective:** Explain Kora quickly, differentiate the company, and route visitors toward the correct next action.

#### User stories

- **US-004:** As a new visitor, I want to understand Kora within a few seconds.
- **US-005:** As a buyer with an unclear requirement, I want to start by describing what I need instead of decoding service categories.
- **US-006:** As a public-sector buyer, I want a direct path to the dedicated Government page and its procurement/contracting actions without reading the entire homepage.
- **US-007:** As a supplier, I want to see that Kora has a supplier pathway.

#### Required sections

1. Hero.
2. Requirement launcher.
3. Capability system.
4. How Kora works.
5. Government/public-sector trust and engagement section.
6. Supplier/partner section.
7. Selected insights.
8. Final conversion section.
9. Global footer.

#### Functional requirements

- **FR-002.1:** The hero must use a concise headline centered on the customer's requirement, with `What do you need solved?` as the current seed direction.
- **FR-002.2:** The hero must include one primary CTA to `/request` and one secondary CTA to `/what-we-do`.
- **FR-002.3:** A Government shortcut must link to `/government` without visually competing with the primary CTA.
- **FR-002.4:** The hero must not use generic claims such as "leading innovative technology solutions" as its primary message.
- **FR-002.5:** The homepage must contain an interactive or visually connected capability representation that communicates the relationship among sourcing, supply, medical and invasive technologies, IoT and connected systems, business services, technology enablement, logistics/trade, and partnerships.
- **FR-002.6:** The rich visual representation must degrade to a clear ordered list/card treatment when motion is reduced, JavaScript is unavailable, or the viewport is too small.
- **FR-002.7:** The requirement launcher must allow visitors to select a high-level requirement type and deep-link into `/request` with that selection prefilled.
- **FR-002.8:** The requirement launcher options must include at minimum: Product/Sourcing, Medical & Invasive Technologies, IoT & Connected Systems, Service, Logistics, Technology Enablement, Government/Public Sector, Other.
- **FR-002.9:** The "How Kora works" sequence must describe a simple workflow such as `Requirement → Discover → Qualify → Coordinate → Deliver`.
- **FR-002.10:** The Government section must use the approved public status statement `Government Registered Supplier`, summarize approved public-sector capabilities, link to `/government`, and must not expose Kora's internal government registration identifiers.
- **FR-002.11:** The Government section should provide direct contextual paths to `Submit Government Requirement`, `Contact Procurement`, and `Contact Contracts` without publishing personal email addresses.
- **FR-002.12:** The partner section must link to `/partners/suppliers` and `/partners/teaming`.
- **FR-002.13:** Insights preview must display only published articles and link to `/insights`.
- **FR-002.14:** The final CTA must return the visitor to `/request`.

#### Acceptance criteria

- Primary CTA is visible without scrolling on common mobile and desktop viewport heights.
- No section requires animation to be understandable.
- Homepage text avoids unsupported metrics, customer logos, awards, certifications, or government-identifier disclosure.
- All homepage CTAs resolve to valid destinations.
- The Government section can be understood without exposing UEI, CAGE, NAICS, SAM identifiers, or equivalent internal registration fields.
- The homepage remains usable with JavaScript disabled, except for explicitly enhanced interactions that have functional HTML fallbacks.

---

## 12. Requirement Intake Requirements

### FEATURE F-003 — Start a Requirement

**Objective:** Convert ambiguous buyer needs into complete, structured first-party inquiries with minimal friction.

#### User stories

- **US-008:** As a buyer, I want to describe a requirement without knowing which Kora division handles it.
- **US-009:** As a mobile user, I want one clear step at a time rather than a long form.
- **US-010:** As a user who makes a validation mistake, I want a specific explanation and to retain everything I already entered.
- **US-011:** As a privacy-conscious user, I want to know what data will be stored and why before I submit.
- **US-012:** As Kora staff, I want submitted requests stored inside Kora's own system without a third-party form processor.

### 12.1 Intake state model

Public flow states:

`START → TYPE_SELECTED → DETAILS → CONTACT → REVIEW → SUBMITTING → SUCCESS`

Recoverable states:

`VALIDATION_ERROR`, `RATE_LIMITED`, `SERVER_ERROR`

Admin lifecycle after successful submission:

`NEW → IN_REVIEW → CONTACTED → CLOSED`

Alternate terminal state:

`SPAM`

### 12.2 Requirement types and conditional fields

#### Product / sourcing

Required:

- Requirement title or product/category.
- Description/specification summary.
- Quantity or quantity range if known.
- Required-by date or timing expectation if known.
- Delivery city/region/country if relevant.

Optional:

- Manufacturer/brand preference.
- Equivalent/substitution permitted: Yes / No / Unsure.
- Additional notes.

#### Medical & invasive technologies

Required:

- Business/procurement requirement summary.
- Product/technology category or use context when known.
- Quantity or scope when known.
- Required-by date/timing when known.
- Delivery/work location when relevant.

Optional:

- Manufacturer/brand preference.
- Model/reference number when already known.
- Equivalent/substitution permitted: Yes / No / Unsure.
- Regulatory or facility constraints described at a non-sensitive business level.

The public intake must not request patient information, PHI, clinical records, medical diagnosis details, implant recipient data, credentials, or other regulated sensitive information.

#### IoT & connected systems

Required:

- Business objective or operational problem.
- Device/system context.
- Desired outcome.
- Target timing if known.

Optional:

- Environment type.
- Approximate device/endpoint count.
- Connectivity constraints described at a non-sensitive business level.
- Integration goals.

The public website must not request passwords, API keys, network credentials, private IP inventories, security secrets, or sensitive architecture diagrams.

#### Service

Required:

- Service need summary.
- Work location or remote applicability if known.
- Desired start/timing.

Optional:

- Duration.
- Staffing/capacity estimate.
- Additional constraints.

#### Logistics / trade coordination

Required:

- Shipment/coordination summary.
- Origin region if known.
- Destination region if known.
- Desired timing.

Optional:

- Cargo type.
- Estimated dimensions/weight.
- Preferred mode if known.
- Trade-coordination notes.

#### Technology enablement

Required:

- Business objective/problem.
- Desired outcome.
- Target timing if known.

Optional:

- Current environment summary.
- Integration constraints described in plain text.

The public website must not request credentials, secrets, API keys, private network details, or other sensitive access information.

#### Government / public sector

Required:

- Agency/organization.
- Requirement/opportunity summary.
- Acquisition/opportunity type.
- Response/due date if applicable.

Supported acquisition/opportunity type options must include at minimum:

- RFQ.
- RFP.
- RFI.
- RFC or other agency-defined request/communication type.
- Fixed-price / FFP opportunity.
- Solicitation.
- Contract requirement.
- Subcontracting opportunity.
- Teaming opportunity.
- Other public-sector requirement.

Optional:

- Solicitation/RFQ/RFP/RFI/RFC/notice number.
- Public solicitation URL.
- Set-aside/category information if already known and appropriate to share.
- Contract/vehicle reference if relevant.
- Additional non-sensitive instructions.

The form must not reveal or prefill Kora's internal UEI, CAGE, NAICS, SAM identifiers, or equivalent registration data.

#### Other

Required:

- Plain-language description.

### 12.3 Contact fields

Required for all request types:

- Contact name.
- Email address.
- Requirement summary/details.

Optional unless business rules are later changed:

- Organization.
- Job title.
- Phone.
- Preferred contact method.

### 12.4 Routing rules

Each successful inquiry must be assigned an internal routing queue:

- `GENERAL`
- `PROCUREMENT`
- `CONTRACTS`

Default routing:

- Product/sourcing → `PROCUREMENT`
- Medical & invasive technologies procurement → `PROCUREMENT`
- Supplier inquiry → `PROCUREMENT`
- General IoT/technology/business-service/logistics inquiry → `GENERAL` unless the user selects a procurement/contracting context
- Government RFQ/RFI/product-sourcing inquiry → `PROCUREMENT`
- Government RFP/RFC/FFP/contract/subcontract/team/contract-administration inquiry → `CONTRACTS`
- Teaming inquiry → `CONTRACTS`
- General contact → `GENERAL`

Routing is an internal operational classification and does not require external email automation.

### 12.5 Functional requirements

- **FR-003.1:** The form must use progressive disclosure and conditional fields based on requirement type.
- **FR-003.2:** Mobile should generally present one logical group per step.
- **FR-003.3:** Desktop may show a compact progress panel and current step together, but must preserve the same semantic order.
- **FR-003.4:** Query-string or route state from homepage launchers must preselect the appropriate requirement type.
- **FR-003.5:** Every required field must have server-side validation even if client-side validation exists.
- **FR-003.6:** Validation messages must identify the problem and how to fix it.
- **FR-003.7:** On validation failure, valid prior values must be preserved.
- **FR-003.8:** Submission must use a first-party endpoint only.
- **FR-003.9:** Successful submissions must be stored in the site's first-party database.
- **FR-003.10:** Successful submissions must receive a non-guessable public reference ID suitable for follow-up.
- **FR-003.11:** The success screen must state that submission was received and must not promise a response time unless Kora approves a service-level commitment.
- **FR-003.12:** Double-click/double-tap or retry must not create accidental duplicate records when an idempotency token is available.
- **FR-003.13:** No file uploads are permitted in Release 1.
- **FR-003.14:** The interface must warn users not to submit classified, CUI, export-controlled data, passwords, financial account data, payment-card data, PHI, SSNs, or other sensitive regulated data.
- **FR-003.15:** The privacy notice must be linked immediately before submission.
- **FR-003.16:** The form must include local anti-abuse controls without external CAPTCHA.
- **FR-003.17:** Anti-abuse controls must include at minimum a honeypot, server-side rate limiting, CSRF protection where applicable, input length limits, and a minimum-interaction-time heuristic.
- **FR-003.18:** Error responses must not reveal framework stack traces, database details, secrets, or internal file paths.
- **FR-003.19:** Free-form content must be output-encoded wherever later displayed in admin interfaces.
- **FR-003.20:** No free-form form content may be written to ordinary application logs.
- **FR-003.21:** Every successful submission must be assigned one internal routing queue according to approved routing rules.
- **FR-003.22:** Public Government intake must not display or serialize Kora's UEI, CAGE, NAICS, SAM identifiers, or equivalent internal registration data.
- **FR-003.23:** Medical/invasive-technology forms must not collect PHI or patient-specific clinical data.
- **FR-003.24:** IoT/technology forms must not collect credentials, secret keys, or sensitive network-access information.

#### Acceptance criteria

- User can complete and submit each requirement type on a 320 px viewport.
- Keyboard-only users can complete the full flow.
- Screen reader receives step, error, and success announcements.
- Server rejects malformed or oversized input even when client-side validation is bypassed.
- Repeated rapid requests are rate-limited without using an external CAPTCHA service.
- Successful inquiry appears in the internal inquiry inbox with the correct inquiry type and routing queue.
- Government intake contains no Kora registration identifiers in public markup or client-delivered data.

---

## 13. Capabilities Requirements

### FEATURE F-004 — What We Do

**Objective:** Explain Kora's capabilities without presenting the company as a collection of unrelated services.

#### User stories

- **US-013:** As a buyer, I want to explore a capability in detail before submitting a request.
- **US-014:** As a visitor, I want to understand how capabilities connect rather than seeing a generic grid of equal service cards.

#### Functional requirements

- **FR-004.1:** `/what-we-do` must act as a structured overview and routing page, not duplicate each child page in full.
- **FR-004.2:** The page must organize capabilities around customer outcomes and operating verbs such as Source, Supply, Enable, Operate, Move, Connect, and Partner.
- **FR-004.3:** Each capability must link to a dedicated route where sufficient unique content exists.
- **FR-004.4:** Child capability pages must share a consistent template while allowing distinct content.
- **FR-004.5:** Every capability page must include: clear definition, typical requirement examples, Kora's role, process, related capabilities, and a contextual CTA to `/request` with a preselected type where applicable.
- **FR-004.6:** Technology Enablement must be represented as one business capability and must not visually or verbally redefine Kora as an IT consulting company.
- **FR-004.7:** Medical & Invasive Technologies must be represented as an approved sourcing/solutions capability without making unverified clinical, regulatory, manufacturer-authorization, patient-outcome, or medical-advice claims.
- **FR-004.8:** IoT & Connected Systems must focus on business/operational outcomes and connected-system enablement without implying unsupported proprietary products, certifications, security guarantees, or managed-service capabilities.
- **FR-004.9:** Logistics & Trade Coordination copy must not imply Kora owns assets, fleets, warehouses, customs licenses, or global offices unless verified.
- **FR-004.10:** Supply & Distribution copy must not imply items are in stock unless inventory is explicitly verified.
- **FR-004.11:** Capability pages must contextually link to relevant product categories, Government use cases, or partner opportunities where logically related.
- **FR-004.12:** Public capability content used on `/government` must be traceable internally to approved Kora government classification/registration mappings without exposing those identifiers.

#### Required capability routes

1. `/what-we-do/sourcing-procurement`
2. `/what-we-do/supply-distribution`
3. `/what-we-do/medical-invasive-technologies`
4. `/what-we-do/iot-connected-systems`
5. `/what-we-do/business-services`
6. `/what-we-do/technology-enablement`
7. `/what-we-do/logistics-trade`

---

## 14. Product Sourcing Directory Requirements

### FEATURE F-005 — Products

**Objective:** Help buyers discover categories Kora can source without creating false e-commerce or inventory expectations.

#### User stories

- **US-015:** As a buyer, I want to search or browse sourcing categories to see whether my need fits Kora.
- **US-016:** As a buyer whose category is not listed, I want a clear path to ask anyway.

#### Functional requirements

- **FR-005.1:** `/products` must be a sourcing-capability directory, not a shopping cart.
- **FR-005.2:** The page must clearly state that displayed categories describe sourcing capability and do not guarantee current inventory, price, lead time, or manufacturer authorization.
- **FR-005.3:** Categories must be data-driven from local content files.
- **FR-005.4:** Initial seed categories may include Industrial, Scientific & Laboratory, Medical Technologies, Medical & Invasive Technology categories approved by Kora, IoT & Connected Devices, Facilities, Janitorial, Technology Hardware, Electronics, Machinery, Safety, Packaging, General Merchandise, Agricultural, and Specialized Procurement.
- **FR-005.5:** Category names must be reviewed against actual Kora capabilities before release.
- **FR-005.6:** Search/filter must operate locally in the browser or from a locally built index; it must not call hosted search APIs.
- **FR-005.7:** Search must support keyboard input, clear/reset, zero-results state, and screen-reader status messaging.
- **FR-005.8:** Zero results must show `Tell us what you need` and route to `/request?type=product`.
- **FR-005.9:** No public price, stock quantity, SKU availability, or delivery guarantee may appear unless a future approved system can support it accurately.
- **FR-005.10:** Individual product/category detail pages may be added only when there is enough unique, useful content to justify them.

---

## 15. Government and Public-Sector Requirements

### FEATURE F-006 — Government & Public Sector

**Objective:** Provide a dedicated, factual, procurement-oriented Government experience that helps federal, state, local, and other public-sector visitors quickly understand what Kora can provide as a `Government Registered Supplier` and how to engage Kora for an opportunity.

#### User stories

- **US-017:** As a federal, state, local, or other public-sector procurement professional, I want to quickly understand Kora's approved capabilities that are internally aligned to its government registrations/classifications so I can evaluate fit without needing Kora's registration identifiers displayed publicly.
- **US-018:** As a government buyer, I want clear paths for RFQ, RFP, RFI, RFC, fixed-price/FFP, solicitation, contract, subcontract, or other requirement types so I can send Kora the opportunity efficiently.
- **US-019:** As a prime contractor or teaming partner, I want to understand Kora's approved capability areas and reach the contracts contact so I can evaluate subcontracting or teaming fit.
- **US-030:** As Kora contracting staff, I want public Government content to remain traceable to internal classification/registration records while ensuring restricted public-disclosure fields never reach the public site.

#### Required Government page content

The `/government` page must contain, in a procurement-friendly hierarchy:

1. `Government Registered Supplier` status statement.
2. Kora Business Solutions name and Princeton, New Jersey 08540 location.
3. Concise statement of Government/public-sector support.
4. Approved core capability areas.
5. Approved products and supply categories.
6. Medical & Invasive Technologies capability summary where approved.
7. IoT & Connected Systems / Technology Enablement capability summary where approved.
8. Sourcing & Procurement capability summary.
9. Business Services capability summary.
10. Logistics & Trade Coordination capability summary.
11. Government engagement/acquisition paths.
12. `How to Engage Kora` process.
13. Direct `Contact Procurement` and `Contact Contracts` actions.
14. Structured `Submit Government Requirement` action.
15. Approved capability statement download when one exists.
16. Optional link to `/government/contracting` for deeper contracting/teaming information.

#### Functional requirements

- **FR-006.1:** `/government` must be a dedicated first-level navigation destination and must prioritize factual procurement information over promotional storytelling.
- **FR-006.2:** The page must identify Kora publicly as **`Government Registered Supplier`**.
- **FR-006.3:** The page must not display Kora's UEI, CAGE/NCAGE, NAICS numbers, SAM identifiers, or equivalent government registration identifiers.
- **FR-006.4:** Internal UEI, CAGE, NAICS, SAM, registration-status, and classification data may be maintained and used server-side or in restricted internal workflows for verification, capability mapping, contracting administration, and content governance.
- **FR-006.5:** Public Government capability descriptions must be traceable to approved internal capability/classification mappings or another approved authoritative source.
- **FR-006.6:** Internal government registration/classification data must not be included in public HTML, JSON/JSON-LD, metadata, client-side JavaScript, public search indexes, static content payloads, or downloadable public data files.
- **FR-006.7:** `/government` must clearly explain Kora's approved capability areas in procurement language understandable to federal, state, local, and other public-sector buyers.
- **FR-006.8:** The page must provide explicit engagement paths for RFQ, RFP, RFI, RFC or equivalent agency request, fixed-price/FFP opportunity, solicitation, contract requirement, subcontracting, teaming, and other public-sector requirements where applicable.
- **FR-006.9:** `Submit Government Requirement` must route to `/request?type=government`.
- **FR-006.10:** `Contact Procurement` must use the approved public channel `procurement@korasb.com`.
- **FR-006.11:** `Contact Contracts` must use the approved public channel `contracts@korasb.com`.
- **FR-006.12:** Direct email actions must use standard `mailto:` behavior and must not require an external SaaS integration.
- **FR-006.13:** `/government/contracting` must provide deeper guidance on acquisition/contracting engagement, opportunity types, supplier/subcontract/teaming contexts, and the appropriate Kora contact path without exposing internal registration identifiers.
- **FR-006.14:** A capability statement download may be provided only when a current approved file exists.
- **FR-006.15:** Capability statement generation must be static/build-time or manually authored; it must not depend on a paid PDF-generation service.
- **FR-006.16:** Any capability statement hosted for public download on the website must follow the same non-disclosure rule and must not contain Kora's UEI, CAGE, NAICS numbers, SAM identifiers, or equivalent restricted registration fields. A future separately distributed non-website artifact requires its own explicit approval and decision record.
- **FR-006.17:** The page must be printable with a clean print stylesheet.
- **FR-006.18:** The page must not display government seals, agency logos, badges, or marks in a way that implies endorsement.
- **FR-006.19:** The page must not claim a contract vehicle, set-aside status, certification, award, agency relationship, past performance, or manufacturer authorization unless that claim is explicitly approved and current.
- **FR-006.20:** Public business location must use the approved value `Princeton, New Jersey 08540`; a more specific street/residential address must not be inferred from registration data.
- **FR-006.21:** The page must provide enough information for a public-sector visitor to understand Kora's main approved capabilities and select a next action without requiring navigation to unrelated corporate pages.
- **FR-006.22:** Government inquiry copy must not promise eligibility, award, pricing, acceptance, contract participation, or response time beyond what Kora can factually support.

#### Acceptance criteria

- `Government` is visible in the primary navigation on desktop and mobile.
- A procurement visitor can identify `Government Registered Supplier`, Kora's approved capability areas, and the primary Government CTAs within the first meaningful page sections.
- The page provides clear RFQ/RFP/RFI/RFC/FFP/solicitation/contract paths.
- `procurement@korasb.com` and `contracts@korasb.com` are available as the appropriate direct contact channels.
- Public page source, metadata, structured data, and client-delivered assets contain no Kora UEI, CAGE, NAICS number, SAM identifier, or equivalent restricted public-disclosure field.
- Every published Government capability has an approved internal source/mapping.
- The page remains readable when printed or saved to PDF through the browser.

---

## 16. Partner Requirements

### FEATURE F-007 — Partners, Suppliers, and Teaming

**Objective:** Create a credible path for suppliers, manufacturers, distributors, service providers, and teaming partners to introduce capabilities to Kora.

#### User stories

- **US-020:** As a supplier, I want to understand what information Kora needs before I submit my capabilities.
- **US-021:** As a teaming partner, I want a path distinct from buyer inquiries.
- **US-022:** As Kora staff, I want supplier and teaming submissions classified separately from customer requirements.

#### Functional requirements

- **FR-007.1:** `/partners` must clearly distinguish Supplier Relationships and Teaming/Delivery Partnerships.
- **FR-007.2:** `/partners/suppliers` must describe appropriate supplier types, expected information, qualification expectations, and the fact that submission does not guarantee business.
- **FR-007.3:** Supplier form fields must include contact name, email, organization, supplier type, capabilities/categories, operating region, website if applicable, and free-form summary.
- **FR-007.4:** Supplier forms must not request bank details, tax forms, SSNs, credentials, or regulated documents.
- **FR-007.5:** `/partners/suppliers` must provide `procurement@korasb.com` as the approved direct supplier/procurement contact option.
- **FR-007.6:** `/partners/teaming` must describe prime/subcontract, specialist, regional, logistics, service, medical, IoT/technology, and delivery-partner contexts without claiming active opportunities unless such opportunities are approved for publication.
- **FR-007.7:** Teaming form fields must include contact, organization, capability summary, geographic coverage, relevant business information if voluntarily supplied, and partnership interest.
- **FR-007.8:** `/partners/teaming` must provide `contracts@korasb.com` as the approved direct teaming/contracts contact option.
- **FR-007.9:** Supplier and teaming submissions must be stored in the same first-party inquiry system with distinct inquiry types and routing queues.
- **FR-007.10:** Supplier inquiries default to the `PROCUREMENT` queue; teaming/subcontracting inquiries default to the `CONTRACTS` queue.
- **FR-007.11:** Successful submission messaging must state that Kora will review the information and must not promise selection, award, onboarding, or response time.

---

## 17. About Requirements

### FEATURE F-008 — About Kora

**Objective:** Explain Kora's operating model and identity without generic corporate filler.

#### User stories

- **US-023:** As a prospective buyer or partner, I want to understand how Kora thinks and operates.

#### Functional requirements

- **FR-008.1:** `/about` must explain Kora's positioning, operating model, and principles.
- **FR-008.2:** The page must avoid invented founding stories, employee counts, office counts, diversity claims, certifications, awards, or market reach.
- **FR-008.3:** Team/founder information may be added only from approved source content.
- **FR-008.4:** If no approved team photography exists, the page must prefer operational/abstract imagery rather than generic posed office-team stock photography.
- **FR-008.5:** The page must include a contextual path to `/request`, `/partners`, and `/government` where relevant.

---

## 18. Insights Requirements

### FEATURE F-009 — Insights

**Objective:** Provide useful, durable content that demonstrates practical understanding of sourcing, procurement, medical and invasive technologies, IoT and connected systems, business operations, government contracting, supply, logistics, and related approved topics.

#### User stories

- **US-024:** As a visitor, I want useful articles that help me understand a business problem before I contact Kora.
- **US-025:** As a search visitor, I want landing content that answers a real question rather than keyword-stuffed marketing copy.

#### Functional requirements

- **FR-009.1:** `/insights` must list only published local content entries.
- **FR-009.2:** Insight content must be authored and stored in repository-controlled Markdown/MDX or equivalent local content files.
- **FR-009.3:** Each article must have title, slug, summary, publish date, optional updated date, topic, body, SEO title, SEO description, and social image reference.
- **FR-009.4:** Articles must provide related internal links where genuinely relevant.
- **FR-009.5:** Each article should provide a low-pressure contextual CTA to `/request` or a relevant capability page.
- **FR-009.6:** Reading-time display may be calculated locally at build time.
- **FR-009.7:** No comments, subscriptions, external newsletter integration, hosted search, or third-party recommendation widgets are required.
- **FR-009.8:** Article structured data must use locally generated JSON-LD where appropriate.

---

## 19. Contact Requirements

### FEATURE F-010 — Contact

**Objective:** Provide a clear external contact-routing experience for general, procurement, and contracts inquiries, plus a simple first-party general contact form.

#### User stories

- **US-026:** As an external party, I want to choose the correct Kora contact channel so my inquiry reaches the appropriate business function.
- **US-031:** As a visitor with a general question, I want to contact Kora without choosing a capability.

#### Approved public contact channels

- **General:** `info@korasb.com`
- **Procurement:** `procurement@korasb.com`
- **Contracts:** `contracts@korasb.com`
- **Phone:** `609-469-6366`
- **Location:** `Princeton, New Jersey 08540`

#### Functional requirements

- **FR-010.1:** `/contact` must present General, Procurement, and Contracts as distinct, visually clear contact choices.
- **FR-010.2:** General must use `info@korasb.com`.
- **FR-010.3:** Procurement must use `procurement@korasb.com`.
- **FR-010.4:** Contracts must use `contracts@korasb.com`.
- **FR-010.5:** Each displayed email address must be actionable with a standard `mailto:` link and must have a clear accessible name.
- **FR-010.6:** The page must display the approved public phone `609-469-6366` using an actionable `tel:` link where supported.
- **FR-010.7:** The page must display the approved public location `Princeton, New Jersey 08540`.
- **FR-010.8:** The page must not infer or publish a more specific street/residential address from registration or other internal records.
- **FR-010.9:** The page must provide a general first-party contact form.
- **FR-010.10:** General form required fields: name, email, message.
- **FR-010.11:** General form optional fields: organization, phone, topic.
- **FR-010.12:** General contact submissions must enter the first-party inquiry inbox with type `GENERAL` and routing queue `GENERAL`.
- **FR-010.13:** Procurement-oriented CTAs elsewhere on the site must route to the structured requirement flow, supplier flow, or `procurement@korasb.com` as context requires.
- **FR-010.14:** Contracts, Government contracting, subcontracting, teaming, and contract-administration CTAs must route to the structured Government/teaming flow or `contracts@korasb.com` as context requires.
- **FR-010.15:** Privacy questions must use `info@korasb.com` unless a dedicated privacy address is later approved.
- **FR-010.16:** No embedded Google Maps or third-party map service is permitted.
- **FR-010.17:** Validation, privacy, anti-abuse, retention, and error rules from Feature F-003 also apply to the general contact form.

#### Acceptance criteria

- A visitor can distinguish General, Procurement, and Contracts without reading a long paragraph.
- Each contact action works without JavaScript.
- No personal employee email is required for public contact.
- The contact page does not depend on an external CRM, form handler, map, or scheduling service.

---

## 20. Privacy, Accessibility, and Recovery Pages

### FEATURE F-011 — Supporting trust pages

#### Functional requirements

- **FR-011.1:** `/privacy` must explain exactly what form data is collected, why, where it is stored, retention expectations, access, and deletion/contact process, using `info@korasb.com` as the public privacy contact unless a dedicated address is later approved.
- **FR-011.2:** The privacy page must not claim practices that the implementation does not perform.
- **FR-011.3:** No non-essential tracking cookies may be set in Release 1.
- **FR-011.4:** Because no advertising/analytics cookies are required, a cookie-consent banner must not be added merely by convention.
- **FR-011.5:** `/accessibility` must identify the accessibility target, scope of the statement, and `info@korasb.com` as the public accessibility-issue contact unless a dedicated address is later approved.
- **FR-011.6:** `/404` must explain that the page could not be found and provide links to Home, What We Do, Products, Government, and Start a Requirement.
- **FR-011.7:** 404 recovery must not automatically redirect users without consent.

---

## 21. Internal Inquiry Management Requirements

### FEATURE F-012 — First-party inquiry inbox

**Objective:** Make public forms operational without relying on email automation, external CRM, or third-party form processing.

#### User stories

- **US-027:** As an authorized Kora administrator, I want to review new inquiries in one place.
- **US-028:** As an administrator, I want to mark inquiry status so the team can distinguish new, reviewed, contacted, closed, and spam submissions.
- **US-029:** As an administrator, I want to export authorized inquiry data when needed.

#### Functional requirements

- **FR-012.1:** Admin routes must require authentication.
- **FR-012.2:** Authentication must be first-party; no external identity provider is required.
- **FR-012.3:** Initial administrator provisioning must occur through a local deployment/CLI procedure, not public signup.
- **FR-012.4:** Passwords must never be stored in plaintext.
- **FR-012.5:** Sessions must use secure, HttpOnly cookies and appropriate same-site protection.
- **FR-012.6:** Admin login must be rate-limited.
- **FR-012.7:** `/admin/inquiries` must list submissions newest-first with type, routing queue, date, contact, organization where present, and status.
- **FR-012.8:** Admin must be able to filter by inquiry type, routing queue, and status.
- **FR-012.9:** Admin must be able to search by reference ID, contact name, organization, or email.
- **FR-012.10:** Inquiry detail must display the submitted structured fields and free text with safe output encoding.
- **FR-012.11:** Admin may set status to `NEW`, `IN_REVIEW`, `CONTACTED`, `CLOSED`, or `SPAM`.
- **FR-012.12:** Admin may add internal notes.
- **FR-012.13:** Status changes and deletion must be auditable locally with actor, timestamp, and action type.
- **FR-012.14:** Admin may export filtered inquiry data as CSV generated locally.
- **FR-012.15:** Admin routes must use `noindex` and must not appear in sitemap.xml.
- **FR-012.16:** `robots.txt` disallow rules may be present but must never be treated as an access-control mechanism.
- **FR-012.17:** There is no password-reset email flow in Release 1; administrative recovery must use an authorized local deployment procedure.
- **FR-012.18:** Internal Government registration/classification fields, if maintained in the application or server-side configuration, must be accessible only to authorized internal workflows and must never be returned by public endpoints.
- **FR-012.19:** Government inquiry detail must show the acquisition/opportunity type and assigned routing queue so Procurement and Contracts work can be separated operationally.

#### Acceptance criteria

- Unauthenticated requests to admin inquiry routes cannot read protected data.
- Authentication failures do not disclose whether a specific username exists.
- Admin data is not cached publicly.
- Export requires an authenticated session.

---

## 22. Search and Discovery Requirements

### FEATURE F-013 — Local discovery

**Objective:** Provide useful discovery without hosted search infrastructure.

#### Functional requirements

- **FR-013.1:** Product-category search must use local data.
- **FR-013.2:** A full-site search is optional for Release 1 and should be implemented only if content volume justifies it.
- **FR-013.3:** If full-site search is implemented, the index must be generated locally at build time and served as a site asset or queried from the first-party server.
- **FR-013.4:** Search must not transmit query text to a third-party provider.
- **FR-013.5:** Search query URLs, if used, must be shareable without containing personal data.
- **FR-013.6:** Public search indexes and search results must exclude admin content and Kora's internal Government registration/classification identifiers.

---

## 23. SEO and Metadata Requirements

### FEATURE F-014 — Technical discoverability

#### Functional requirements

- **FR-014.1:** Every indexable page must have a unique `<title>` and meta description.
- **FR-014.2:** Every indexable page must define a canonical URL.
- **FR-014.3:** The site must generate `sitemap.xml` from actual indexable routes.
- **FR-014.4:** The site must provide `robots.txt`.
- **FR-014.5:** Open Graph and equivalent social metadata must be generated locally.
- **FR-014.6:** Social preview images must be locally hosted.
- **FR-014.7:** Structured data may include `Organization`, `WebSite`, `BreadcrumbList`, and `Article` where semantically appropriate.
- **FR-014.8:** `LocalBusiness` structured data must not be used unless Kora has an approved public business location that satisfies the semantics.
- **FR-014.9:** Hidden keyword stuffing, doorway pages, invisible text, and generated low-value SEO pages are prohibited.
- **FR-014.10:** All meaningful images must have appropriate alt text; decorative images must use empty alt or CSS decoration as appropriate.
- **FR-014.11:** Public metadata, structured data, canonical data, social metadata, and JSON-LD must not contain Kora's internal UEI, CAGE, NAICS, SAM identifiers, or equivalent restricted Government registration fields.

---

## 24. Brand Guidelines

### 24.1 Brand architecture

**Primary digital brand:** `KORA`  
**Descriptor:** `Business Solutions`  
**Business/legal name where required:** `Kora Business Solutions`

`KORASB` may remain part of the domain/technical identity but should not be the dominant public wordmark unless a later approved decision changes the brand architecture.

### 24.2 Brand concept

The brand should visually express **connection, convergence, pathways, coordination, movement, and execution**.

The logo and site must avoid common category clichés:

- Globes.
- Gears.
- Trucks.
- Generic cloud icons.
- Circuit-board heads.
- AI brain imagery.
- Random node-network spheres.
- Handshake clip art.
- Generic shield/security symbols.

### 24.3 Logo system requirements

The final logo system must include:

1. Primary horizontal lockup: symbol + `KORA` + optional `Business Solutions` descriptor.
2. Symbol-only mark for favicon/avatar/small UI.
3. Monochrome dark version.
4. Monochrome light/reversed version.
5. SVG source as the authoritative digital master.
6. Raster export only where required by a platform.

The symbol should be a custom geometric mark based on an abstract **K/path/convergence** concept.

Logo rules:

- Do not use stock artwork as the logo.
- Do not use a stock icon with minor modifications.
- Core logo must work in one color.
- The logo must remain recognizable at favicon scale.
- Logo animations, if used, must be separate presentation behavior; the underlying mark must remain static and usable.
- The homepage logo link must have accessible name `Kora Business Solutions`.

### 24.4 Color system

Initial brand token proposal:

| Token | Value | Intended use |
|---|---:|---|
| `kora-ink` | `#101111` | Primary dark background/text |
| `kora-paper` | `#FAF9F5` | Primary light surface |
| `kora-stone` | `#F1EFE8` | Secondary warm surface |
| `kora-signal` | `#FF5A36` | Signature CTA/accent |
| `kora-graphite` | `#252725` | Secondary dark text/surface |
| `kora-mist` | `#D9DBD5` | Borders/subtle surfaces |
| `kora-sage` | `#B9D8B0` | Controlled secondary accent |

Rules:

- `kora-signal` must not be used for small body text on `kora-paper` because the contrast is insufficient for normal text.
- `kora-signal` may be used as a filled control with dark text when contrast passes.
- Brand colors must not replace semantic error/success/warning colors.
- All foreground/background combinations must be verified against the project's WCAG target before release.
- Gradients may be used sparingly as spatial/atmospheric accents, not as the core logo.

### 24.5 Typography

Preferred open-source direction:

- Display: `Space Grotesk` or equivalent OFL-compatible geometric sans, served locally.
- Body/UI: `Inter` or equivalent OFL-compatible highly readable sans, served locally.

Requirements:

- No Google Fonts or external font CDN runtime requests.
- Fonts must be vendored into the project and served from the site's own origin.
- Use only required weights/styles or variable fonts with appropriate subsetting.
- Body text should generally be at least 16 CSS px equivalent on mobile.
- Display typography may be large/editorial but must not cause clipping at narrow widths or 200% zoom.
- Line length for long reading should generally stay near 45–80 characters.

### 24.6 Layout

- Use a fluid grid with a constrained reading/content width.
- Favor editorial asymmetry on large screens while preserving logical reading order.
- Use deliberate negative space rather than filling every area with cards.
- Cards should be used only when they represent independent units or interactions.
- Avoid a homepage composed entirely of repeated equal-size rounded rectangles.
- Section transitions may alternate light/dark surfaces to create pacing.

### 24.7 Component visual language

Components should feel precise and operational:

- Crisp borders.
- Controlled radii rather than excessive pill shapes.
- Layered panels where they communicate hierarchy.
- Strong typographic labels.
- Visible focus states.
- Small functional iconography.
- Data/credential blocks with high information density and low decoration.

### 24.8 Motion

Motion must:

- Explain connection, hierarchy, progress, or state change.
- Prefer transform/opacity animations.
- Avoid scroll hijacking.
- Avoid blocking navigation.
- Respect `prefers-reduced-motion`.
- Stop or simplify when the page is not active where practical.
- Avoid continuous decorative loops that consume CPU/battery without value.
- Have tap/focus equivalents for hover-revealed content.

Recommended timing ranges:

- Micro-interaction: approximately 120–220 ms.
- Component transition: approximately 180–350 ms.
- Section/diagram choreography: approximately 300–700 ms where justified.

### 24.9 Voice and content style

Kora's voice should be:

- Direct.
- Competent.
- Specific.
- Practical.
- Confident without exaggeration.
- Buyer-oriented.

Prefer verbs such as:

- Source.
- Supply.
- Coordinate.
- Qualify.
- Connect.
- Deliver.
- Enable.
- Operate.
- Solve.

Avoid unsupported or generic claims such as:

- "Industry-leading."
- "World-class."
- "Best-in-class."
- "Revolutionary."
- "Cutting-edge" unless tied to a specific verifiable capability.
- "Global offices" unless actually true.
- "24/7 support" unless actually staffed.
- "Guaranteed" unless contractually supportable.

### 24.10 Government voice

Government content must be especially factual and acquisition-oriented.

Public Government content must:
- Use the approved statement `Government Registered Supplier`.
- Explain approved capabilities in plain procurement language.
- Avoid exposing Kora's UEI, CAGE, NAICS, SAM identifiers, or equivalent registration identifiers in page content, source, metadata, structured data, client bundles, search indexes, or public downloads.
- Avoid implying certification, set-aside status, contract vehicle, award, eligibility, agency endorsement, or manufacturer authorization unless separately verified and approved.
- Route procurement inquiries to `procurement@korasb.com` and contracts/teaming inquiries to `contracts@korasb.com`.

Internal classification/registration data may be used to validate and map public capability content but is not itself public website content.

---

## 25. Business Rules

### BR-001 — Evidence-based claims

No customer, partner, certification, award, revenue, employee-count, delivery-volume, geographic-reach, response-time, past-performance, contract-vehicle, government-status, manufacturer-authorization, or performance claim may be published without an approved source.

### BR-002 — No implied inventory

Product/category pages represent sourcing capability unless specifically stated otherwise. The site must not imply that an item is currently stocked.

### BR-003 — No e-commerce behavior

No cart, checkout, payment, live pricing, order status, or SKU-level availability is part of Release 1.

### BR-004 — Government registration and capability mapping

Kora may maintain current government registration/classification data internally, including UEI, CAGE, NAICS, SAM-related information, or equivalent records. Public Government capability descriptions must be backed by an approved internal mapping or another authoritative source.

### BR-005 — Legal/business-name accuracy

Business/entity references must use the approved name `Kora Business Solutions` unless a later approved legal artifact requires a different exact form. Brand contexts may use `KORA` according to the brand architecture.

### BR-006 — First-party submission storage

Public form data must not be sent to a third-party form processor, CRM, email automation system, analytics vendor, or advertising platform.

### BR-007 — Data minimization

Forms may collect only information required to understand and respond to the inquiry.

### BR-008 — Prohibited sensitive data

The site must instruct visitors not to provide classified information, CUI, export-controlled data, passwords, access tokens, SSNs, payment-card data, bank data, PHI, patient-specific clinical information, or other regulated/sensitive information.

### BR-009 — No public document upload in Release 1

No visitor file uploads are accepted in Release 1 due to avoidable malware, content-security, privacy, and controlled-information risk.

### BR-010 — Supplier submission is not qualification

Submitting supplier information does not mean the supplier is approved, qualified, onboarded, selected, or guaranteed business.

### BR-011 — Teaming inquiry is not award participation

Submitting a teaming inquiry does not create a partnership, subcontract, exclusivity arrangement, or award commitment.

### BR-012 — No external runtime dependency

Core page rendering, navigation, search, form submission, admin access, fonts, icons, and images must function without runtime calls to external SaaS platforms.

### BR-013 — No external tracking

Release 1 must not include Google Analytics, Meta Pixel, ad pixels, third-party session replay, externally hosted analytics, or marketing automation scripts.

### BR-014 — No unnecessary cookie banner

Do not implement a consent banner if the deployed site sets no non-essential cookies or similar tracking storage.

### BR-015 — Link integrity

No CTA may be published unless its target route, file, approved `mailto:`/`tel:` action, or approved external destination exists.

### BR-016 — Approved public contact information

Public contact information must be centrally managed and use:

- General: `info@korasb.com`
- Procurement: `procurement@korasb.com`
- Contracts: `contracts@korasb.com`
- Phone: `609-469-6366`
- Location: `Princeton, New Jersey 08540`

Personal employee email addresses must not be used as general public contact channels unless explicitly approved for a specific purpose.

### BR-017 — Image rights

Seed images must comply with the media-source rules in this document and must not imply endorsement by depicted people, companies, agencies, or brands.

### BR-018 — No agency endorsement implication

Government seals, badges, agency marks, flags used as endorsements, or official imagery must not be used in a way that implies Government endorsement of Kora.

### BR-019 — Article publication state

Draft insights must not be included in the index, sitemap, search index, related-content lists, or RSS if added later.

### BR-020 — Admin privacy

Admin pages and inquiry data are confidential internal content and must never be publicly cached, indexed, or exposed through static generation.

### BR-021 — Retention

Initial default inquiry retention target is 24 months after submission, subject to final privacy/business approval. Spam may be deleted after 30 days. Retention values must be configurable and documented.

### BR-022 — Deletion consistency

Deleting an inquiry must also remove associated internal notes and audit references as required by the approved data-retention design, while preserving only the minimum security/audit data that has a defined purpose.

### BR-023 — No hidden sensitive data in logs

Form bodies, passwords, session tokens, government internal registration fields, and free-form inquiry text must never be written to standard application or reverse-proxy logs.

### BR-024 — Content ownership

All production content, Government capability mappings, contact information, and brand assets must have an identified owner/source in the repository or project documentation.

### BR-025 — Accessibility parity

No content or action may be available only through hover, color, animation, pointer position, or drag gesture.

### BR-026 — Public Government disclosure

The public website must identify Kora as `Government Registered Supplier` and must not expose Kora's UEI, CAGE, NAICS numbers, SAM identifiers, or equivalent internal registration identifiers.

The restriction applies to rendered pages, HTML source, metadata, JSON/JSON-LD, client-side bundles, public content APIs, local search indexes, and downloadable public data assets.

### BR-027 — Internal Government use permitted

Government identifiers/classifications may be stored and used internally for contracting, qualification, capability mapping, content validation, and administrative workflows. Internal use does not authorize public disclosure.

### BR-028 — Public downloadable artifacts follow the disclosure boundary

Any capability statement, PDF, CSV, JSON, or other artifact downloadable from the public website must follow BR-026 and must not expose Kora's UEI, CAGE, NAICS numbers, SAM identifiers, or equivalent restricted registration fields.

A separately distributed direct/offline artifact may be governed by a future explicit Kora decision, but it is outside the current public-website requirements.

### BR-029 — Contact routing

Inquiry routing must follow business context:

- General/privacy/accessibility → GENERAL / `info@korasb.com`
- Sourcing/procurement/suppliers/RFQ-oriented requests → PROCUREMENT / `procurement@korasb.com`
- Government contracts/RFP/RFC/FFP/subcontracting/teaming/contract-administration → CONTRACTS / `contracts@korasb.com`

The first-party inbox may apply routing internally without sending automated email.

### BR-030 — Medical and invasive technology claims

Medical/invasive technology content must be business/procurement oriented. The site must not provide medical advice, patient-specific guidance, treatment recommendations, clinical-decision support, or unverified regulatory/authorization claims.

### BR-031 — Medical data minimization

Public forms must not request or intentionally collect PHI, patient records, implant-recipient data, diagnosis details, or other patient-specific clinical information.

### BR-032 — IoT/security claim restraint

IoT and connected-systems content must not promise security, interoperability, compliance, certification, uptime, managed monitoring, or proprietary technology unless explicitly verified and approved.

### BR-033 — Future native-platform compatibility

Release 1 implementation may be web-specific at the presentation layer but must not couple core business semantics so tightly to web templates that future approved iOS/Android operational clients require a complete domain rewrite.

---

## 26. Seed Image and Media Instructions

### 26.1 General direction

Kora's visual system should not depend on stock photography to explain the brand. The strongest brand moments—hero, connector/path motif, process visualization, capability relationships—should be created from typography, layout, CSS, SVG, and custom graphic composition.

Stock photography should act as editorial evidence of environments and activity, not as a substitute for brand identity or evidence that Kora owns a depicted facility, product, fleet, laboratory, device, or government asset.

### 26.2 Approved seed sources

Free standard content may be manually sourced from:

1. **Pexels** — free standard content under the Pexels terms applicable at selection time.
2. **Unsplash** — free standard library content under the Unsplash terms applicable at selection time.
3. **Pixabay** — free content under the Pixabay terms applicable at selection time.

**Paid/Plus/premium content is excluded.**

The license and source terms for each selected asset must be rechecked at download/approval time rather than assumed permanently from this PRD.

### 26.3 No runtime image-provider integration

- Do not call Unsplash, Pexels, or Pixabay APIs at runtime.
- Do not hotlink remote stock images in production.
- Download the approved image into the project repository or deployment asset store.
- Optimize and serve it from Kora's own origin.
- Record provenance locally.

### 26.4 Image provenance record

Each seed image must have a record in a local file such as `content/media/media-manifest.json` containing:

- Local asset path.
- Source platform.
- Original source-page URL.
- Creator/photographer name if available.
- Download date.
- License name/version or license-page URL at time of download.
- Intended page/section.
- Approval status.
- Notes about visible people, brands, property, medical equipment, government property, or other rights/representation concerns.

Credit may be displayed voluntarily when appropriate even when not legally required.

### 26.5 Media legal/safety review

Reject or replace a stock image when:

- A visible brand/logo could imply endorsement.
- A recognizable person is used in a way that could imply they work for, endorse, or are a customer/patient of Kora.
- A government building, uniform, seal, badge, or official could imply agency endorsement.
- A medical device/procedure image could imply Kora manufactures, clinically uses, endorses, or has regulatory authorization for the depicted product when that is not approved.
- A screen contains readable confidential/personal data.
- The image contains protected artwork prominently.
- The image creates a misleading representation of an asset Kora does not own.
- Rights/release status is ambiguous for the intended commercial use.

Prefer operational environments with no identifiable individuals or with people shown incidentally/non-identifiably.

### 26.6 Seed image search matrix

The following phrases are instructions for manual source discovery, not runtime API queries.

| Section/Page | Suggested search phrases | Preferred composition | Avoid |
|---|---|---|---|
| Homepage capability/editorial section | `industrial supply detail`, `warehouse materials abstract`, `cargo port aerial minimal`, `manufacturing close up`, `connected systems abstract` | Strong geometry, negative space, systems/process feel | Posed executives, generic laptops, handshake images |
| Sourcing & Procurement | `quality inspection materials`, `industrial components close up`, `supplier warehouse shelves` | Detail-oriented, tangible products, hands optional but not identifiable | Brand-heavy packaging, fake clipboard staging |
| Supply & Distribution | `warehouse distribution pallets clean`, `industrial distribution center abstract` | Scale, order, movement | Claims implying Kora owns the facility |
| Medical & Invasive Technologies | `medical technology equipment detail`, `medical instrument abstract`, `clinical device close up no brand`, `medical supply sterile detail` | Precise, clean, technical, non-patient-specific | Graphic procedures, identifiable patients, brand-dominant devices, implied clinical endorsement |
| IoT & Connected Systems | `industrial sensors close up`, `connected equipment abstract`, `smart facility sensor`, `industrial telemetry device` | Physical connected systems, infrastructure, operational context | Consumer smart-home clichés, hacker screens, unverified proprietary products |
| Business Services | `operations planning workspace detail`, `process coordination documents neutral` | Human activity without corporate-stock cliché | Large smiling office teams |
| Technology Enablement | `industrial digital interface abstract`, `data infrastructure detail`, `automation equipment` | Technology supporting operations | AI robot heads, neon hacker visuals, generic code screens |
| Logistics & Trade | `container port aerial geometric`, `freight containers detail`, `cargo terminal infrastructure` | Movement/path/geometry | Branded carriers, Kora ownership implication |
| Government | `public infrastructure neutral`, `industrial public sector supply`, `civic infrastructure abstract` | Factual, institutional, restrained | Agency seals, registration-number imagery, famous officials, endorsement cues |
| Suppliers | `manufacturing line close up`, `industrial components supplier`, `packaging production` | Maker/manufacturer perspective | Trademark-dominant products |
| Teaming | `operations collaboration plans`, `field team equipment neutral` | Cooperation without fake-corporate staging | Handshakes, posed boardrooms |
| About | `business operations abstract architecture`, `industrial detail editorial` | Brand/operating model | Fake employee portraits |
| Insights | Topic-specific editorial images | Relevant, uncluttered, crop-friendly | Generic unrelated stock |

### 26.7 Technical image requirements

- Prefer original source files at least 2400 px wide for major editorial placements where available.
- Generate modern local derivatives such as AVIF and WebP.
- Preserve a JPEG/PNG fallback only where required.
- Use responsive `srcset`/`sizes`.
- Width/height or aspect-ratio must be known to prevent layout shift.
- Lazy-load below-the-fold imagery.
- Use high fetch priority only for a genuine above-the-fold hero image if one exists.
- Meaningful images must use semantic `<img>`/`<picture>` with useful alt text.
- Decorative atmospheric imagery must use empty alt or CSS background treatment as appropriate.
- Avoid auto-playing background video in Release 1 unless later justified by measured value and performance evidence.

---

## 27. Reference Materials

### 27.1 Internal authoritative references

1. `01_AI_ENGINEERING_CONSTITUTION.md` — project engineering/product quality principles and definition of done.
2. `02_AI_PROJECT_OPERATING_PROTOCOL.md` — requirement discipline, lightweight web protocol, accessibility, security, testing, traceability, documentation, and release controls.
3. Current approved Kora product direction dated 2026-09-04, including:
   - `Requirement → Connection → Execution`.
   - `Start a Requirement` as the primary conversion.
   - Kora is not a traditional IT/technology company.
   - Dedicated Government & Public Sector page.
   - Public status wording `Government Registered Supplier`.
   - No public website disclosure of Kora UEI/CAGE/NAICS/SAM identifiers.
   - Internal government classification/workflow use is permitted.
   - Approved public contacts: `info@korasb.com`, `procurement@korasb.com`, `contracts@korasb.com`, `609-469-6366`, `Princeton, New Jersey 08540`.
   - Medical & Invasive Technologies and IoT & Connected Systems are capability areas requiring approved content.
   - Responsive-web-first initial delivery with future native mobile compatibility.

### 27.2 External technical/reference sources

The following are implementation references, not product authorities. Licenses must be rechecked when dependencies are actually locked.

- Astro project: `https://github.com/withastro/astro`
- Tailwind CSS: `https://github.com/tailwindlabs/tailwindcss`
- Motion: `https://motion.dev/`
- W3C Web Content Accessibility Guidelines (WCAG) 2.2: `https://www.w3.org/TR/WCAG22/`
- MDN Web Docs: `https://developer.mozilla.org/`

### 27.3 External media-license references

- Pexels License/terms: `https://www.pexels.com/license/`
- Unsplash License guidance: `https://help.unsplash.com/en/collections/1463188-unsplash-license`
- Pixabay Content License summary: `https://pixabay.com/service/license-summary/`

The project's media manifest must record the source/license state of each selected asset at download time.

---

## 28. Open-Source Technology and Deployment Constraints

This section constrains implementation; the detailed architecture should later be maintained in `ARCHITECTURE.md` if created.

### 28.1 Baseline technology decision

The preferred baseline is:

- **Astro** for content-first rendering, static generation, and server-rendered routes where needed.
- **TypeScript** for application logic.
- **Tailwind CSS** for design tokens/utilities, using only the open-source framework, not commercial Tailwind UI templates.
- **Preact or lightweight React-compatible islands** only where meaningful client interactivity is required.
- **Motion** or native Web Animations API for purposeful interaction/motion.
- **SQLite** for Release 1 first-party inquiry storage, with a migration path defined if scale requires PostgreSQL later.
- **Local Markdown/MDX/data files** for public content; no hosted CMS required.
- **Local SVG or open-source icon set** for icons.
- **Self-hosted WOFF2 fonts** with compatible open licenses.
- **Vitest** or equivalent open-source unit/component testing.
- **Playwright** for browser/end-to-end testing.
- **axe-core** for automated accessibility checks.
- **Lighthouse CI** or equivalent locally runnable performance checks.
- **Docker/OCI-compatible container** or standard Node deployment for portable self-hosting.
- **Caddy or Nginx** may be used as an open-source reverse proxy in deployment.

### 28.2 Architectural rationale

Astro is preferred over a full client-heavy application framework because this site is primarily content-driven, with a limited number of app-like interactions. This aligns with the project's lightweight-web principle: server/static HTML by default, progressive enhancement, minimal client JavaScript, optimized assets, and small dependency count.

The Release 1 presentation layer may be Astro-specific, but core inquiry models, routing rules, validation semantics, and first-party persistence boundaries must remain separable enough to support future approved web-app or native iOS/Android clients without rewriting business rules from scratch.

### 28.3 Prohibited required dependencies

The production site must not require:

- Google Fonts.
- Google Analytics.
- Google Tag Manager.
- Meta/Facebook Pixel.
- Hotjar or session-replay SaaS.
- HubSpot forms or CRM widgets.
- Salesforce forms/widgets.
- Mailchimp forms.
- Typeform.
- Calendly.
- reCAPTCHA/hCaptcha/Turnstile or another external CAPTCHA in Release 1.
- Algolia or another hosted search service.
- Google Maps/Mapbox embeds.
- Remote icon CDNs.
- Third-party JavaScript CDNs.
- Unsplash/Pexels/Pixabay runtime APIs.
- Externally hosted CMS.
- External authentication provider.
- External email delivery provider as a required component.

Outbound ordinary hyperlinks to public websites are not considered a system integration, but they must not be necessary for the core site to function.

---

## 29. Data Requirements

### 29.1 Data entities

#### Inquiry

Minimum fields:

- `id` — internal identifier.
- `public_reference` — non-guessable visitor-facing reference.
- `type` — PRODUCT, MEDICAL_TECHNOLOGY, IOT_CONNECTED_SYSTEMS, SERVICE, LOGISTICS, TECHNOLOGY, GOVERNMENT, OTHER, SUPPLIER, TEAMING, GENERAL.
- `routing_queue` — GENERAL, PROCUREMENT, CONTRACTS.
- `status` — NEW, IN_REVIEW, CONTACTED, CLOSED, SPAM.
- `contact_name`.
- `email`.
- `organization` optional.
- `phone` optional.
- `subject/title`.
- `details`.
- `structured_data` — validated type-specific fields.
- `created_at`.
- `updated_at`.
- `retention_until` where the final retention model uses explicit dates.

#### AdminUser

Minimum fields:

- `id`.
- `username`.
- `password_hash`.
- `active`.
- `created_at`.
- `last_login_at` optional.

No public user account entity is required.

#### InquiryNote

- `id`.
- `inquiry_id`.
- `admin_user_id`.
- `note`.
- `created_at`.

#### AuditEvent

- `id`.
- `admin_user_id`.
- `action`.
- `target_type`.
- `target_id`.
- `metadata` limited to non-sensitive action context.
- `created_at`.

#### GovernmentCapabilityMapping — internal-only

This record may be implemented as restricted server-side configuration, repository data excluded from public bundles, or an internal datastore. It is not a public content entity.

Minimum conceptual fields:

- `id`.
- `registration_status` or internal status reference.
- `classification_type` — e.g., NAICS or other internal classification family.
- `classification_code` — internal-only value.
- `internal_registration_reference` — internal-only reference where needed.
- `public_capability_id` — reference to an approved public capability.
- `approved_for_public_description` — boolean.
- `source_owner`.
- `verified_at`.
- `notes` — internal, non-public.

UEI, CAGE, SAM registration data, or other identifiers may be stored in an internal registration profile where operationally necessary, but they must never be serialized to public content or client payloads.

### 29.2 Validation

- All public input must have explicit maximum lengths.
- Email must be syntactically validated but must not require external verification.
- URLs must be normalized/validated when accepted.
- Dates must be validated and stored consistently.
- Enums must reject unknown values.
- Structured data must be validated against the selected inquiry type.
- Routing queue must be server-derived or validated against approved business rules; the client must not be trusted to assign privileged routing semantics.
- Government internal classification fields must never be accepted from ordinary public content payloads as authoritative Kora registration data.

### 29.3 Data storage

- Inquiry data must be stored only on Kora-controlled/self-hosted infrastructure.
- Database file/storage must not be inside a public web root.
- Internal Government registration/classification data must be stored only in server-side/internal locations excluded from public static generation and client bundles.
- Backups must be possible without exposing plaintext through public routes.
- Production backup/restore procedures must be documented before launch.

---

## 30. Security Requirements

### SEC-001 — Input security

All public input must be validated server-side, bounded by size, and safely encoded on output.

### SEC-002 — Injection prevention

Database access must use parameterized queries/prepared statements. String concatenation for SQL construction with user input is prohibited.

### SEC-003 — CSRF

State-changing browser requests must use appropriate same-site/cookie and CSRF defenses according to the final architecture.

### SEC-004 — XSS

Free-form input must never be rendered as trusted HTML. Markdown or rich-text input is not required for public forms.

### SEC-005 — Authentication

Admin authentication must use a modern password-hashing approach available in the selected open-source stack and secure session management.

### SEC-006 — Brute-force protection

Admin login and public forms must be locally rate-limited.

### SEC-007 — Headers

Production responses should set appropriate security headers, including a Content Security Policy compatible with local assets, frame restrictions, MIME sniffing protection, referrer policy, and other current best practices determined in `SECURITY.md`.

### SEC-008 — External content

The site must not require remote third-party scripts, which simplifies CSP and reduces supply-chain/privacy risk.

### SEC-009 — Secrets

Secrets must be injected through deployment environment/configuration and never committed to source control.

### SEC-010 — Admin caching

Protected admin responses must not be publicly cached.

### SEC-011 — Sensitive data prohibition

The public site is not an approved channel for sensitive/regulated procurement or security information.

### SEC-012 — Dependency control

Dependencies must be minimized, license-reviewed, and vulnerability-reviewed before release.

### SEC-013 — Government identifier disclosure boundary

Internal Kora Government registration identifiers/classification values must be treated as non-public application data for this product. Public routes, static generation, metadata, structured data, search indexes, client bundles, error messages, source maps made publicly accessible, and public APIs must not disclose them.

### SEC-014 — Medical/IoT inquiry data boundaries

Public medical/invasive technology and IoT forms must reject or warn against sensitive data classes outside the approved business-intake scope, including PHI, credentials, secrets, access tokens, and sensitive network-access information.

---

## 31. Privacy Requirements

- Collect only fields required to respond to business inquiries.
- Do not collect behavioral profiles in Release 1.
- Do not sell/share form data to advertising vendors.
- Do not load advertising technology.
- Do not use third-party session replay.
- Do not record keystrokes or abandoned form text.
- Do not persist free-form draft content in localStorage by default.
- If the request flow stores local UI state, limit it to non-sensitive choices such as selected requirement category and clear it after successful submission.
- Document retention and deletion in `/privacy` based on actual implementation.
- Security logs should minimize or truncate IP information where practical while still supporting abuse prevention.

---

## 32. Accessibility Requirements

The target is **WCAG 2.2 Level AA** for public and admin web experiences unless a later requirement sets a higher target.

### A11Y-001 — Semantic structure

- Use one logical page heading hierarchy.
- Use semantic landmarks.
- Use buttons for actions and links for navigation.
- Use native form controls whenever feasible.

### A11Y-002 — Keyboard

All interactive content must be operable without a pointer.

### A11Y-003 — Focus

- Visible focus indicators are required.
- Focus order must follow logical reading order.
- Drawers/modals must manage focus correctly.
- Route changes and validation changes must not strand keyboard/screen-reader users.

### A11Y-004 — Screen readers

- Forms must have programmatic labels.
- Required state and errors must be announced.
- Dynamic search result counts and form success/failure must use appropriate live announcements.
- Icons must have accessible names only when meaningful.

### A11Y-005 — Contrast

Text, controls, focus states, icons conveying information, and graphical objects must meet applicable WCAG contrast requirements.

### A11Y-006 — Motion

Reduced-motion preferences must disable or substantially simplify non-essential motion.

### A11Y-007 — Touch and target size

Interactive targets should meet the product's 44 × 44 CSS px target where practical and must at minimum meet applicable WCAG requirements.

### A11Y-008 — Zoom/reflow

Core content/functionality must remain usable at 200% zoom and at narrow reflow widths.

### A11Y-009 — Forms

Errors must be described in text; color alone is insufficient. On failed submission, focus should move to an error summary or first invalid field using an accessible pattern.

---

## 33. Performance Requirements

The design must target strong real-world mobile performance on a mid-range device and constrained network.

### 33.1 Core Web Vitals targets

Production objective at the 75th percentile where measurable:

- **LCP:** ≤ 2.5 s.
- **INP:** ≤ 200 ms.
- **CLS:** ≤ 0.10.

### 33.2 Delivery budgets

Initial product targets, to be validated during implementation:

- Render primary content as HTML by default.
- Keep non-essential client JavaScript out of static content routes.
- Keep homepage initial JavaScript small enough that rich interactions do not block main content; large interactive packages require measured justification.
- Initial mobile page transfer should generally remain below approximately 1.5 MB for core routes, excluding an intentionally user-requested download.
- Large imagery must use responsive derivatives and modern formats.
- Local font payload must be minimized through variable fonts/subsetting and limited families.
- Below-fold images must lazy-load.
- Third-party script budget: **0 required scripts**.

### 33.3 UX performance rules

- Navigation feedback must feel immediate.
- Forms must disable or clearly indicate submission state after submit.
- Loading indicators must not appear for operations that complete instantly.
- Skeletons should be used only where content truly loads asynchronously.
- Page transitions must not delay actual navigation for visual effect.

---

## 34. Reliability and Failure Requirements

### REL-001 — Static-content resilience

Public informational pages should remain usable even if the database is unavailable, except for features that genuinely require the database.

### REL-002 — Form failure

If submission fails:

- Preserve user-entered data in the current page session.
- Display a clear retry action.
- Do not claim receipt.
- Do not generate a success reference.

### REL-003 — Admin failure

Database/admin errors must show an internal-safe message and must not expose implementation details.

### REL-004 — Missing content

If a content item referenced by a listing is missing, the build should fail or automated content validation should detect it before release rather than shipping a broken link.

### REL-005 — No external dependency cascade

Because the site must not depend on external SaaS runtime integrations, failure of unrelated third-party services must not prevent navigation, rendering, search, or form storage.

---

## 35. Content Management Requirements

### FEATURE F-015 — Repository-managed content

- Public content must be stored in source-controlled Markdown/MDX/JSON/YAML/TypeScript data as appropriate.
- Content changes must be reviewable in source control.
- No external CMS is required.
- Content schemas must validate required fields at build time.
- Public contact details, navigation, social links, Government public status wording, business name, and legal/public location values must be centralized so they are not manually duplicated across templates.
- Government public capability descriptions must reference approved public capability IDs and must be traceable to internal Government capability mappings or another approved authoritative source.
- Internal Government registration/classification records must be physically/logically separated from content that is bundled to the browser or generated into public static assets.
- Medical & Invasive Technology content must carry explicit approval/source metadata before publication.
- IoT & Connected Systems content must carry explicit approval/source metadata before publication.
- Production builds should fail on invalid required content where safe to do so.
- Draft content must be explicit and excluded from public generation.
- A build-time/static validation step should detect prohibited public Government identifier fields before release.

---

## 36. Interaction and Component Requirements

### 36.1 Required reusable components

At minimum, the UI system should support reusable versions of:

- Header.
- Desktop mega-menu.
- Mobile navigation drawer.
- Footer.
- Breadcrumbs.
- Primary/secondary/text buttons.
- CTA panel.
- Section heading.
- Capability card/panel.
- Government status/capability data card.
- Process/timeline component.
- Search/filter control.
- Form field.
- Select/radio/chip group.
- Step indicator.
- Error summary.
- Success state.
- Article card.
- Inline notice/callout.
- Admin table/list.
- Status badge.
- Empty state.
- Pagination only if result volume later justifies it.

### 36.2 Component states

Interactive components must define as applicable:

- Default.
- Hover.
- Focus-visible.
- Active/pressed.
- Selected.
- Disabled.
- Loading.
- Error.
- Success.
- Reduced-motion behavior.
- Touch behavior.

---

## 37. Page-Level Linking Rules

To ensure intentional interlinking:

- Homepage capability elements → relevant `/what-we-do/*` route.
- Homepage Medical & Invasive Technologies → `/what-we-do/medical-invasive-technologies`.
- Homepage IoT & Connected Systems → `/what-we-do/iot-connected-systems`.
- Homepage Government → `/government`.
- Homepage Supplier → `/partners/suppliers`.
- Homepage Teaming → `/partners/teaming`.
- Homepage/section CTAs → `/request` with preselected type when relevant.
- `/what-we-do` → every child capability route.
- Each child capability route → `/request` and at least one related capability.
- Medical & Invasive Technologies → `/request?type=medical` and `/government` where public-sector relevance is approved.
- IoT & Connected Systems → `/request?type=iot` and `/government` where public-sector relevance is approved.
- `/products` → `/request?type=product`.
- `/government` → `/government/contracting`, `/request?type=government`, `mailto:procurement@korasb.com`, `mailto:contracts@korasb.com`, and approved capability statement file when available.
- `/government/contracting` → `/government`, `/request?type=government`, `/partners/teaming`, and the appropriate Procurement/Contracts contact.
- `/partners` → both supplier and teaming pages.
- `/partners/suppliers` → supplier form/submission path, `/what-we-do` where relevant, and `mailto:procurement@korasb.com`.
- `/partners/teaming` → teaming form/submission path, `/government` where relevant, and `mailto:contracts@korasb.com`.
- `/insights/[slug]` → topic-relevant capability and/or `/request`.
- `/about` → `/request`, `/government`, and `/partners`.
- `/contact` → `/request` for visitors with a structured business need and direct General/Procurement/Contracts contact actions.
- `/privacy` and `/accessibility` → footer/global recovery paths and `info@korasb.com` where contact is required.

---

## 38. Error, Empty, Loading, and Success States

### 38.1 Public forms

**Empty:** Clear prompts and examples; no prefilled fake data.  
**Loading/Submitting:** Submit button disabled; visible progress text; no repeated submission.  
**Validation Error:** Inline field message plus summary for multiple errors.  
**Server Error:** Preserve input; explain that the request was not received; allow retry.  
**Success:** Show reference ID and next-step expectation without guaranteed SLA.

### 38.2 Product search

**Empty query:** Show category discovery.  
**No results:** Explain that Kora may still be able to source the item and link to request.  
**Results:** Show count and clear filters.  
**Error:** Local search should be designed so normal operation does not require a network error state after the page loads.

### 38.3 Insights

**No published insights:** Hide homepage insight preview and show a minimal intentional index state rather than placeholder articles.

### 38.4 Admin inbox

**No inquiries:** Show a calm empty state.  
**No filter results:** Provide reset filter action.  
**Database error:** Show safe error state.  
**Session expired:** Return to login after preserving only non-sensitive navigation intent.

---

## 39. Testing Requirements

Testing must originate from these requirements and actual risk.

### 39.1 Unit tests

Required for:

- Form schemas/validation.
- Inquiry type mappings.
- Routing queue rules.
- Government acquisition/opportunity type mappings.
- Reference ID generation.
- Status-transition rules.
- Search/filter logic.
- Content schema validation.
- Government public-content serialization/redaction rules.
- Security-sensitive utility functions.

### 39.2 Component tests

Required where valuable for:

- Navigation/menu state.
- Form step transitions.
- Government contact/CTA states.
- Error summary behavior.
- Search/filter state.
- Reduced-motion variants.

### 39.3 Integration tests

Required for:

- Form submission → database persistence.
- Product/supplier submission → `PROCUREMENT` routing.
- Teaming/contracts submission → `CONTRACTS` routing.
- Government opportunity-type submission → correct routing.
- Duplicate/idempotent submission behavior.
- Admin authentication → protected route.
- Admin status update → audit event.
- CSV export authorization.
- Internal Government capability mapping → approved public capability selection without identifier leakage.

### 39.4 End-to-end tests

Critical browser flows:

1. Homepage → Start a Requirement → Product request → successful submission.
2. Homepage → Medical & Invasive Technologies → structured request → successful submission.
3. Homepage → IoT & Connected Systems → structured request → successful submission.
4. Homepage → Government → review capabilities → Government RFQ/RFP/RFI/RFC/FFP/contract path → successful submission.
5. Government → Contact Procurement (`procurement@korasb.com`).
6. Government → Contact Contracts (`contracts@korasb.com`).
7. Partners → Supplier submission.
8. Partners → Teaming submission.
9. Contact → General (`info@korasb.com`) and General form submission.
10. Admin login → review new inquiry → confirm routing queue → change status.
11. Invalid form submission → accessible error recovery.
12. Mobile menu navigation across core routes.
13. Product search → zero results → request CTA.
14. 404 recovery.

### 39.5 Accessibility tests

- Automated axe checks on representative public routes and admin routes.
- Keyboard-only navigation test.
- Screen-reader spot checks on navigation, Government CTAs, form wizard, validation, and success state.
- Zoom/reflow checks.
- Reduced-motion check.
- Contrast verification.

### 39.6 Browser/device matrix

At minimum before release:

- Latest stable Chrome/Chromium.
- Latest stable Firefox.
- Latest stable Safari on macOS.
- Current Safari on iPhone-class viewport/device.
- Current Chrome on Android-class viewport/device.
- Tablet viewport in portrait and landscape.

Exact support versions should be set during implementation based on current stable browser landscape.

### 39.7 Performance tests

- Lighthouse CI or equivalent on homepage, `/request`, `/government`, a medical/IoT capability route, and an insight article.
- Bundle/asset-size review.
- Image dimension/format checks.
- Core Web Vitals lab proxies during CI and real-user evidence after launch if a self-hosted measurement strategy is later approved.

### 39.8 Security tests

- Authentication bypass attempts.
- Rate-limit behavior.
- CSRF checks where applicable.
- Stored/reflected XSS attempts through form inputs.
- SQL injection probes against public/admin query parameters.
- Session-cookie attribute verification.
- Protected-route cache-control verification.
- Content Security Policy review.
- Public-build scan confirming internal Government registration identifiers are absent from public HTML, metadata, JSON, client bundles, search indexes, public downloads, and other public assets.
- Medical form checks for PHI/sensitive-data warnings and field minimization.
- IoT form checks for credential/secret/network-access-data warnings.
- Dependency vulnerability scan using locally runnable open-source tooling where practical.

---

## 40. Acceptance Requirements for Release 1

Release 1 is acceptable only when:

1. All public routes in the route inventory exist or have been explicitly removed from approved scope.
2. All public internal links pass an automated link check.
3. No placeholder links such as `#`, `javascript:void(0)`, or nonfunctional CTAs remain.
4. All forms persist to the first-party database and show accurate success/failure states.
5. Admin users can securely review form submissions and routing queues.
6. The site works at 320 px width without unintended horizontal overflow.
7. Core flows work with keyboard only.
8. Automated accessibility checks have no unresolved critical/serious issues on critical routes.
9. Reduced-motion mode is supported.
10. `/government` is a first-level navigation destination and clearly presents `Government Registered Supplier`, approved capability areas, acquisition/contracting paths, and Procurement/Contracts next actions.
11. Public website output and publicly downloadable website artifacts contain no Kora UEI, CAGE, NAICS number, SAM identifier, or equivalent restricted Government registration field.
12. Government public capability content is verified against approved internal mappings/sources.
13. Approved public contact channels are consistent across the website: `info@korasb.com`, `procurement@korasb.com`, `contracts@korasb.com`, `609-469-6366`, `Princeton, New Jersey 08540`.
14. Medical & Invasive Technology content contains no unapproved medical, clinical, regulatory, authorization, or patient-outcome claims.
15. IoT & Connected Systems content contains no unapproved security, certification, interoperability, uptime, or proprietary-technology claims.
16. No unapproved marketing claims remain.
17. No remote fonts, remote scripts, remote analytics, or required SaaS runtime calls are present.
18. Seed images are locally hosted and have provenance records.
19. Security review has no unresolved critical finding.
20. Performance targets are measured and no known critical performance regression remains.
21. Privacy page matches actual data collection and retention behavior.
22. Backup and restore for inquiry data are documented and actually exercised before production release.
23. Production configuration uses HTTPS and secure headers.
24. Admin routes are protected and excluded from indexing.
25. Future native-platform compatibility is not blocked by avoidable coupling of core inquiry/domain semantics to page templates.
26. Relevant documentation is updated and traceable.

---

## 41. Requirements Traceability Starter Matrix

| Product goal | Primary features | Key verification |
|---|---|---|
| G-001 Differentiated positioning | F-002, F-004, Brand Guidelines | Content/design review |
| G-002 Structured inquiries | F-003, F-010 | E2E form tests |
| G-003 Factual credibility | F-006, BR-001, BR-004, BR-026 | Source verification + public-build disclosure scan |
| G-004 Multi-audience support | F-001, F-004, F-006, F-007, F-010 | Navigation/journey tests |
| G-005 Rich but fast UI | F-002, Brand Motion, Performance | Lighthouse/bundle/accessibility tests |
| G-006 Independent operation | F-003, F-012, F-013, Open-Source Constraints | Network/dependency review |
| G-007 Government acquisition engagement | F-006, F-003, F-010, BR-029 | Government journey + routing E2E tests |

A dedicated `REQUIREMENTS_TRACEABILITY.md` may be created later when implementation begins.

---

## 42. Assumptions

### A-001 — Kora is primarily B2B/B2G

**Assumption:** Primary customers are businesses and public-sector organizations rather than consumer retail buyers.  
**Confidence:** High based on current positioning.  
**Impact:** No e-commerce/consumer account features.  
**Validation:** Confirm through future Product Brief.

### A-002 — Local admin inbox is acceptable

**Assumption:** Because external CRM/email integrations are prohibited, an internal self-hosted inquiry inbox is an appropriate operational requirement.  
**Confidence:** High.  
**Impact:** Adds authentication and minimal private admin UI.  
**Validation:** User review.

### A-003 — No file uploads in Release 1

**Assumption:** Security and controlled-information risk outweigh the value of public uploads for initial release.  
**Confidence:** High.  
**Impact:** Government/sourcing users enter public solicitation URLs and summaries rather than attachments.  
**Validation:** Revisit only if document intake becomes a business-critical requirement.

### A-004 — Content is source-controlled

**Assumption:** Kora does not require a nontechnical visual CMS in Release 1.  
**Confidence:** Medium.  
**Impact:** Lower complexity, fewer attack surfaces, no external CMS.  
**Validation:** Revisit if a nontechnical content-management workflow becomes necessary.

### A-005 — Government capability mappings can be maintained internally

**Assumption:** Kora can maintain an authoritative internal mapping between its current Government registrations/classifications and approved public capability descriptions.  
**Confidence:** Medium.  
**Impact:** Enables a clear Government page without public identifier disclosure.  
**Validation:** Confirm during Government content/capability review.

### A-006 — Medical and invasive technology scope requires content validation

**Assumption:** Kora's exact medical/invasive technology products, regulatory posture, manufacturer relationships, and service boundaries are not yet fully specified in this PRD.  
**Confidence:** High.  
**Impact:** The route and UX can be designed now, but detailed claims remain gated by approved source content.  
**Validation:** Approved capability source material.

---

## 43. Decisions Recorded in This PRD

### D-001 — Position Kora around requirement orchestration

**Decision:** Kora's primary website positioning is requirement-to-outcome orchestration rather than a narrow service-category identity.  
**Reason:** Better matches the breadth already described and avoids generic IT-company presentation.

### D-002 — `Start a Requirement` is the primary conversion

**Decision:** The main CTA across the site routes to a structured requirement flow.  
**Reason:** It maps directly to Kora's value proposition and reduces cognitive burden.

### D-003 — Static/server-first web architecture

**Decision:** Use Astro-based server/static rendering with progressive client islands rather than a client-heavy SPA.  
**Reason:** Aligns with content-first scope, performance, open-source constraints, and project lightweight-web principles.

### D-004 — No external SaaS runtime integrations

**Decision:** Release 1 core functionality is self-contained and first-party.  
**Reason:** Explicit product constraint.

### D-005 — Built-in inquiry operations

**Decision:** Include a minimal first-party admin inquiry inbox because form submissions otherwise have no approved operational destination.  
**Reason:** Makes the website functional under the no-external-integration rule.

### D-006 — No public uploads initially

**Decision:** Do not accept file uploads in Release 1.  
**Reason:** Reduces malware, privacy, sensitive-information, storage, and compliance risk.

### D-007 — Web-first, native-ready platform direction

**Decision:** Release 1 is a responsive web product; future iOS/Android applications remain valid planned/possible platforms and must not be architecturally blocked.  
**Reason:** Native applications should add operational mobile value rather than duplicate static website content.

### D-008 — Dedicated Government & Public Sector experience

**Decision:** `/government` is an exclusive first-level procurement-facing destination for federal, state, local, and other public-sector visitors.  
**Reason:** Government buyers need a direct, factual path to capabilities, acquisition options, and contacts.

### D-009 — Public Government status without identifier disclosure

**Decision:** Public website content uses `Government Registered Supplier`; Kora's UEI/CAGE/NAICS/SAM identifiers remain internal and are not published in pages or website-hosted public downloads.  
**Reason:** Preserves procurement credibility and capability clarity while respecting the explicit public-disclosure boundary.

### D-010 — Role-based public contact model

**Decision:** External public contact uses `info@korasb.com`, `procurement@korasb.com`, and `contracts@korasb.com` according to context.  
**Reason:** Improves routing, avoids publishing personal employee addresses, and aligns Government/supplier/team workflows.

### D-011 — Medical & Invasive Technologies and IoT & Connected Systems are explicit capabilities

**Decision:** These capability areas receive dedicated content routes and intake paths, subject to approved factual content and claim controls.  
**Reason:** They are part of Kora's current stated business positioning and must not be treated as incidental sub-bullets.

---

## 44. Known Risks

### R-001 — Broad company positioning becomes vague

**Impact:** High.  
**Probability:** Medium.  
**Mitigation:** Lead with customer requirement/outcome, use concrete examples, and maintain dedicated capability pages.

### R-002 — Rich UI harms performance

**Impact:** High.  
**Probability:** Medium.  
**Mitigation:** Static/server HTML by default, selective islands, motion budgets, no heavy 3D/video, performance CI.

### R-003 — Government capability content becomes stale or misaligned

**Impact:** High.  
**Probability:** Medium.  
**Mitigation:** Maintain internal classification/capability mappings, verification dates, source ownership, content review, and release gating.

### R-004 — Stock images imply capabilities/assets Kora does not own

**Impact:** Medium/High.  
**Probability:** Medium.  
**Mitigation:** Editorial use only, no ownership language, asset provenance review, avoid visible brands/agencies and misleading medical imagery.

### R-005 — No external notification means submissions are not noticed quickly

**Impact:** Medium.  
**Probability:** Medium.  
**Mitigation:** Internal inquiry inbox with clear NEW state and routing queues; operational procedure must define review cadence. A future notification channel requires a separate approved integration decision.

### R-006 — SQLite limits future horizontal scale

**Impact:** Medium.  
**Probability:** Low for initial website.  
**Mitigation:** Keep persistence boundary simple and document migration path to self-hosted PostgreSQL if traffic/operations justify it.

### R-007 — Broad product categories create unsupported claims

**Impact:** High.  
**Probability:** Medium.  
**Mitigation:** Treat categories as development seeds and require capability verification before publication.

### R-008 — Internal Government identifiers leak into public assets

**Impact:** High.  
**Probability:** Low/Medium if content boundaries are poorly implemented.  
**Mitigation:** Separate internal/public data models, public-build scans, deny-by-default serializers, no identifier values in public content repositories, security tests.

### R-009 — Medical/invasive technology content creates regulatory or clinical implication

**Impact:** High.  
**Probability:** Medium.  
**Mitigation:** Procurement/business framing, source approval, no medical advice, no patient data, no unverified FDA/regulatory/manufacturer claims.

### R-010 — IoT positioning creates unsupported cybersecurity or interoperability promises

**Impact:** Medium/High.  
**Probability:** Medium.  
**Mitigation:** Outcome-oriented language, no security/compliance guarantees, approved capability examples only.

### R-011 — Future native apps are blocked by web-only implementation coupling

**Impact:** Medium.  
**Probability:** Medium.  
**Mitigation:** Keep domain models, validation, routing, and persistence boundaries separable from Astro page templates; record APIs only when actual native/web-app needs justify them.

---

## 45. Deferred Candidate Features

The following are candidates, not approved Release 1 requirements:

- Kora Opportunity Exchange.
- Supplier account portal.
- Customer account portal.
- RFQ/RFP/RFI/RFC document uploads.
- Opportunity matching.
- Saved requirements.
- Real-time inventory.
- Online quoting.
- Order tracking.
- Notifications.
- Self-hosted analytics dashboard.
- Full-site search beyond product/category needs.
- Public case studies when verified material exists.
- Careers/jobs section.
- Multilingual content.
- Authenticated Government/supplier opportunity workflows.
- Native iOS and Android operational applications.
- PWA/offline installation.

Native iOS/Android applications are deferred from Release 1 implementation but are **not** rejected as a product direction. They should be considered when Kora has mobile-specific operational workflows that justify native experiences.

Deferred items must not silently enter implementation scope.

---

## 46. Definition of Ready for Implementation

This website is ready to move from requirements into UX/design/architecture when:

- This PRD is reviewed and major product direction is approved.
- Public route inventory is accepted.
- Brand direction is accepted or explicitly replaced.
- Primary inquiry types are accepted.
- Medical & Invasive Technologies and IoT & Connected Systems route/content direction is accepted.
- No-external-integration constraint remains clear.
- The dedicated Government page structure is accepted.
- The public Government disclosure boundary (`Government Registered Supplier`, no public UEI/CAGE/NAICS/SAM identifiers) is accepted.
- Internal Government capability mapping ownership/source is identified or marked as a launch blocker for final Government content.
- Approved role-based public contacts remain current.
- Security implications of the internal inquiry inbox are accepted.
- Open questions that would materially change scope are identified.

Implementation does not need every final paragraph of marketing copy before design/engineering can begin; placeholder development content may be used when clearly labeled and never shipped as unverified production truth.

---

## 47. Definition of Done

A meaningful website feature is done only when:

- The associated functional requirements are satisfied.
- Acceptance criteria pass.
- Business rules remain intact.
- Desktop/tablet/mobile behavior is correct.
- Keyboard/touch/screen-reader behavior is addressed.
- Loading, error, empty, and success states are implemented where applicable.
- Security requirements are satisfied.
- Performance is measured and acceptable.
- Appropriate unit/integration/E2E/accessibility/security tests pass.
- No obvious regression remains.
- Internal links are valid.
- Documentation is updated.
- No known release-blocking issue remains.

"Page implemented" does not equal "feature complete."

---

## 48. Recommended Next Project Artifacts

After approval of this PRD, the next highest-value artifacts are:

1. `PRODUCT_BRIEF.md` — concise product/business positioning and success model.
2. `INFORMATION_ARCHITECTURE.md` — detailed navigation, hierarchy, labels, and cross-links derived from this PRD.
3. `USER_FLOWS.md` — requirement intake, supplier, teaming, contact, admin review.
4. `SCREEN_INVENTORY.md` — desktop/mobile screen/state inventory.
5. `DESIGN_SYSTEM.md` — logo, tokens, typography, layout, components, states, motion.
6. `ARCHITECTURE.md` — Astro/server/static boundaries, database, security boundaries, deployment.
7. `DATA_MODEL.md` — finalized inquiry/admin/audit schema.
8. `SECURITY.md` — threat model and concrete controls.
9. `TESTING.md` — test plan mapped to requirement IDs.
10. `REQUIREMENTS_TRACEABILITY.md` — created when implementation work starts.

These documents should be created only as they begin providing durable project value and should not duplicate this PRD's authoritative requirements.
