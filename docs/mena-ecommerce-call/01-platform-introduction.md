# Attachment 2 — Platform Introduction (1 page)

> **Formatting note (delete before submission):** target = exactly 1 page (A4, 10–11pt). Replace all `[TO FILL: …]` placeholders. The link is mandatory.

---

## OptimaTech LMS — an Arabic-first digital marketplace for skills and professional learning services

**Platform link:** `[TO FILL: public production URL]` · **Operated by:** `[TO FILL: legal entity name]`, registered in Egypt (`[TO FILL: registration no.]`) · **Contact:** `[TO FILL: authorized signatory, email]`

### What the platform does

OptimaTech LMS is a **service-focused e-commerce platform**: a multi-seller digital marketplace where **training providers, professional instructors, and knowledge SMEs (the sellers)** publish, market, and sell courses and structured learning programmes to **learners and businesses (the buyers)** across web, Android, and iOS. The platform provides the full marketplace transaction cycle in line with the call's platform definition:

| Marketplace function | How OptimaTech delivers it |
|---|---|
| **Product listing** | Public catalog with categories, search, ratings & reviews, "popular / recommended / continue-learning" discovery rails; a 5-step self-service Course Builder through which sellers create, structure, price, and publish their offerings (with a quality gate before publishing) |
| **Ordering** | Instant enrollment flow for free content; checkout-initiated orders for paid courses, missions (project-based programmes), and subscription plans (monthly/quarterly/yearly tiers modelled in the data layer) |
| **Payment processing** | Integrated online card payments via **Paymob unified checkout** (Egypt's leading PSP), with server-to-server webhook confirmation secured by HMAC-SHA512 signature verification, automatic fulfilment (enrollment) on successful payment, and full payment records incl. refund status; data model already supports **Fawry and InstaPay** as additional local rails |
| **Order management** | Per-order payment items, payment status lifecycle (pending → completed/failed/refunded), immutable financial records retained for audit even after account deletion, learner order history and certificates |
| **Customer support & trust** | Ratings/reviews, completion certificates, attendance (QR/manual) for blended offline/online sessions, role-based admin console |

### Technology & security (built to scale cross-border)

A modular monorepo: **Flutter** mobile app (Arabic/English, RTL), **Next.js** web platform, **NestJS** API (25+ modules), serverless Firebase functions, and **PostgreSQL** (26-table schema) — deployed on cloud infrastructure (Railway + Cloudflare edge + Firebase). Engineering highlights relevant to trust and readiness: role-based access control with object-level authorization, **AES-256-GCM encryption of sensitive personal data**, DRM-style protected video delivery (AES-128 HLS, expiring signed URLs, per-session forensic watermarking), queue-based asynchronous processing for horizontal scalability, and an independently reviewed security posture (no critical/high vulnerabilities confirmed in a 2026 multi-agent security audit).

### Value proposition & differentiation

1. **Arabic-first, mobile-first UX** designed for MENA learners and sellers — an underserved segment on global platforms.
2. **Local payment rails** (Paymob today; Fawry/InstaPay modelled) vs. global platforms' card-only checkout — unlocking the region's large non-credit-card majority.
3. **Sellers as SMEs:** the platform is built to onboard independent trainers, freelancers, and training SMEs and give them e-commerce capabilities (storefront, payments, analytics) they could not build alone — directly aligned with the programme's goal of maximizing SME participation in digital trade.
4. **Beyond video:** project-based "missions" with rubric assessment, quizzes with server-enforced anti-cheating, and verifiable certificates — supporting employability outcomes, not just content consumption.

### Traction snapshot

`[TO FILL: 2–3 lines — registered users, active sellers/SMEs, courses published, transactions processed, growth % over last fiscal year — must match Attachment 4 exactly.]`

### Where we are going

From an Egypt-anchored marketplace to a **regional Arabic-language skills-commerce platform** serving Jordan, Tunisia, and Morocco, with EU-market readiness (GDPR-aligned data practices) — detailed in our technical proposal (Attachment 5).
