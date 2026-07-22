# Attachment 5 — Technical Proposal for Expansion (max 2 pages)

> **Formatting note (delete before submission):** hard limit = **2 pages**. This document carries **35% of the score** — the largest single weight. Scored sub-criteria: quality of market analysis; clarity/feasibility of objectives; strength of action plan (activities, sequencing, priorities); coverage of cross-border logistics, payments/interoperability, SME onboarding, digital tools/upgrades; innovation & scalability. Fill placeholders, then cut to fit 2 pages — tables compress well.

---

## Expansion proposal: from Egypt-anchored marketplace to regional Arabic skills-commerce platform

### 1. Market analysis

**The opportunity.** MENA's e-learning and digital-skills market is growing rapidly, driven by a young population (over half under 30), accelerating freelancing/remote-work adoption, and persistent skills gaps — while Arabic-language content remains a small fraction of global online-learning supply. `[TO FILL: 1–2 sourced market-size/growth figures — e.g. regional e-learning market value & CAGR; cite source and year.]` Sellers of learning services in the region — independent trainers, training centres, and knowledge SMEs — largely lack the digital storefront, payment, and content-protection infrastructure to sell online; global platforms (Udemy, Coursera) offer weak Arabic UX, no local payment rails, and revenue-share terms unfavourable to small regional sellers. Regional players (e.g. Almentor, Edraak) are predominantly **content libraries or MOOC-style**, not open multi-seller marketplaces. **Our positioning:** the Arabic-first, mobile-first, locally-payable *marketplace* where any qualified regional seller can run a learning-services business.

**Target markets (sequenced).**

| Market | Why | Entry mode | Key requirements |
|---|---|---|---|
| **Egypt (deepen)** | Home market; `[TO FILL: current traction]`; large informal training sector to formalize | Direct — scale seller onboarding beyond `[TO FILL: current regions]` incl. women- and youth-led SMEs | Additional local rails (Fawry, InstaPay — already modelled in our data layer); e-invoicing alignment |
| **Jordan (Y1)** | Shared language/curricula; strong freelancer economy; programme country | Remote-first: onboard Jordanian sellers + buyers; BSO partnerships for seller recruitment | JOD pricing & local PSP integration; alignment with Jordan e-commerce/e-transactions rules |
| **Tunisia (Y1–Y2)** | Programme country; Arabic/French bilingual demand; ICT-skills exporter | Remote-first + partner-led seller cohorts | French UI; TND pricing; local payment partner `[TO FILL: shortlist]` |
| **Morocco (Y2)** | Largest Maghreb market; programme country | Partner-led after Tunisia playbook validated | French UI (shared with Tunisia); MAD pricing; local PSP |
| **GCC & EU diaspora (Y2, revenue layer)** | Higher purchasing power; Arabic-speaking communities; EU market access per programme objective | Cross-border digital sales (no physical presence) | Multi-currency card acquiring; **GDPR alignment**; EU VAT-on-digital-services assessment |

**Demand validation:** `[TO FILL: any concrete signals — waitlists, seller inquiries from target countries, organic foreign users/traffic %, pilot partners.]`

### 2. Expansion objectives (24 months)

1. **O1 — Regional reach:** operate in `[3]` new country markets (Jordan, Tunisia, Morocco) with localized pricing, payments, and compliance.
2. **O2 — SME participation:** onboard `[TO FILL: N]` new seller SMEs/freelance trainers (≥ `[30]%` women- or youth-led), each with a digital storefront and online payments.
3. **O3 — Cross-border transactions:** reach `[TO FILL: N]%` of transaction volume from outside Egypt.
4. **O4 — Platform capability:** ship the upgrade roadmap below (multi-currency payments, interoperability APIs, GDPR-aligned data governance, seller analytics).
5. **O5 — Users:** grow active buyers to `[TO FILL: N]` (`[TO FILL]%` growth), tracked per market.

### 3. Action plan

| Phase | Activities (priority order) | Output / KPI |
|---|---|---|
| **P1 — Foundation (M1–M6)** | 1. Production-harden commerce core: enforce paid-enrollment gating end-to-end, activate subscription billing (tiers already modelled), automate CI/CD & monitoring. 2. **Payments interoperability:** add Fawry + InstaPay (Egypt depth); integrate one regional/multi-currency PSP `[TO FILL: e.g. HyperPay/Telr/PayTabs — request programme advisory]`; currency engine EGP→JOD/TND/MAD/USD/EUR. 3. **Compliance pack:** privacy policy & consent flows aligned to GDPR principles (building on existing AES-256-GCM PII encryption); per-country e-commerce compliance matrix `[programme advisory requested]`. 4. Full EN localization of web (AR/EN mobile already shipped); FR groundwork. | Paid flows enforced; ≥3 payment methods live; multi-currency checkout; privacy pack published; `[N]` SMEs onboarded |
| **P2 — First cross-border markets (M6–M12)** | 1. Jordan + Tunisia go-live: local pricing, PSP, tax/invoicing setup. 2. **SME onboarding engine:** structured seller-recruitment cohorts with BSOs/incubators `[TO FILL: named partners]`; seller academy (how to package, price, market courses); dedicated onboarding support incl. women-/youth-led outreach. 3. **Seller payouts & settlement** for cross-border sellers `[programme advisory on cross-border settlement requested]`. 4. Digital-marketing engine per market (SEO, performance, social) `[programme mentorship requested]`. | 2 markets live; `[N]` sellers in each; first cross-border settlement executed; CAC/conversion baselines |
| **P3 — Scale & EU-readiness (M12–M24)** | 1. Morocco launch (FR UI reused). 2. B2B channel: white-label/team plans for corporate & BSO training. 3. **Interoperability APIs:** public seller API + e-invoicing integration; certificate-verification API for employers. 4. AI-assisted discovery (recommendations) & seller analytics dashboards. 5. EU market entry assessment: GDPR audit, EU VAT OSS for digital services, EU buyer pilot via diaspora campaigns. | 3rd market live; `[N]` B2B accounts; API partners; EU pilot revenue `[TO FILL]` |

**Feasibility grounding:** the platform already runs a webhook-verified Paymob checkout with automated fulfilment, a 26-table PostgreSQL schema that models multi-gateway payments (Fawry/Paymob/InstaPay), subscriptions, and multi-instructor courses, queue-based async processing for scale, and independently audited security (no critical/high findings, 2026). P1 is therefore hardening + configuration, not green-field builds — realistic within the timeline with the requested technical assistance.

### 4. Cross-border enablement dimensions (per call)

- **Digital delivery ("logistics" for services):** global edge CDN + adaptive HLS streaming = instant cross-border fulfilment; no physical logistics dependency, but certificate verification and QR attendance support blended delivery.
- **Payments & interoperability:** multi-gateway architecture (above) + programme-facilitated peer exchange on regional gateway/e-invoicing integration.
- **SME onboarding & growth:** cohort model with BSOs; measurable pipeline from outreach → activated seller → first sale.
- **Innovation & scalability:** replicable "market-entry kit" (localization + PSP + compliance checklist per country) — a model other regional platforms can adopt, aligned with the programme's replicability objective.

### 5. Technical assistance requested from the programme

1. **Functional:** technical audit; advisory on regional PSP APIs & e-invoicing interoperability; UX/scalability benchmarking. 2. **Governance & compliance:** GDPR-alignment review (policies, consent, data transfers); per-country e-commerce regulatory guidance (JO/TN/MA); VAT on cross-border digital services. 3. **Market growth:** SME-onboarding roadmap design (incl. women/youth outreach); digital-marketing mentorship per market; B2B matchmaking with BSOs, payment & content partners; peer exchange with successful regional platforms.

**Success metrics we commit to reporting (per call's measures):** newly onboarded SMEs; SMEs benefiting from upgrades; active users; new markets accessed; new tools/technologies integrated; compliance improvements — baseline and quarterly thereafter.
