# Internal — Eligibility & Readiness Assessment (do not submit)

Honest self-assessment against the call's published criteria, grounded in the actual state of the codebase (verified 22 July 2026 on `main`). Use this to decide effort allocation before the 20 August deadline.

## 1. Eligibility screen (pass/fail — mandatory)

| Requirement | Status | Action |
|---|---|---|
| Legally registered/licensed in EG/JO/TN/MA **and privately owned** | ⚠️ **To confirm** | Confirm which legal entity applies and its legal form. If the platform is operated under a non-profit/NGO structure, "privately owned" is ambiguous — **ask via the Q&A channel before 31 July** (digitaltrademena@giz.de / portal) rather than risk a pass/fail rejection on 20 August. |
| Demonstrated year-over-year growth | ⚠️ **Evidence needed** | Compile FY-over-FY numbers (users, sellers, transactions, revenue). If paid transactions only recently launched, growth can be shown on users/sellers/listings — but be consistent; credibility is scored. |
| Cross-border activity **OR** clear expansion plan | ✅ Covered | Attachment 5 provides the expansion plan (an explicit alternative allowed by the call). Any existing foreign users/sellers strengthen this — quantify if they exist. |
| Complete application + all attachments | ☐ In progress | This folder + registration certificate + portal form. |

## 2. Positioning: is an LMS an "e-commerce platform" for this call?

**Yes, if framed correctly — with residual risk.** The call defines a platform as a digital marketplace enabling *multiple sellers and buyers* to transact (listing, ordering, payment, order management) and explicitly allows **service-focused** platforms. Our marketplace mechanics genuinely exist in code: multi-instructor courses (`CourseInstructor` join table), self-service authoring/publishing (web Course Builder), catalog/search/ratings, Paymob checkout + HMAC-verified webhook + auto-fulfilment, payment/refund lifecycle, subscription tiers. **Frame the application as "digital marketplace for learning services sold by SMEs/freelance trainers", never as "an LMS/edtech tool".** Residual risk: evaluators may still read "LMS" as single-seller software. Mitigations: (a) lead every document with the multi-seller marketplace framing; (b) make seller counts prominent in past performance; (c) optionally confirm scope via Q&A before 31 July ("are multi-seller marketplaces for digital/learning services in scope?").

## 3. Platform gaps to close before submission (evaluators open the link)

"Platform maturity and usability (based on link provided)" is scored under criterion A. Priority order:

| # | Gap (evidence in code) | Why it matters for the call | Effort |
|---|---|---|---|
| 1 | **Paid-enrollment gating not enforced** — free enrollment path ignores price (`backend/src/enrollment/enrollment.service.ts:16-18` explicitly notes gating is not enforced) | An "e-commerce platform" where paid products can be obtained free undermines the entire application if evaluators test it | S–M |
| 2 | **Checkout amount is client-supplied** (`backend/src/payments/payments.controller.ts:33` — `body.amountCents || 10000`; item prices from request body). Server must derive price from the course/mission record | Payment-integrity basics; also a real revenue-loss bug | S–M |
| 3 | **Webhook HMAC weaknesses:** `verifyHmac` returns `true` when `PAYMOB_HMAC_SECRET` is unset (`payments.service.ts:120-127`); `INTENTION`-type webhook events skip HMAC entirely (`payments.controller.ts:74-81`) | Unverified webhooks can trigger fulfilment; must be fail-closed in production | S |
| 4 | **Public production URL** with seeded, real catalog content (AR + EN), working signup → browse → checkout demo path | The link is a mandatory part of Attachment 2 and is scored | M |
| 5 | **Web i18n inconsistency** (mixed AR/EN, `dir="ltr"` on Arabic content — per 2026 project report) | Usability is scored; evaluators are likely non-Arabic speakers → ensure the EN experience is clean | M |
| 6 | Mobile secure-video bypass (`corsproxy.io` + sample MP4 fallback — per project report) must not reach the demo build | Contradicts the "secure delivery" claims in Attachment 2 | M |
| 7 | No CI/CD (no `.github/workflows`) | Not directly scored, but supports "team capacity & governance" narrative; cheap credibility | S |

Items 1–4 are the must-do set; 5–7 strengthen but don't block.

## 4. Scoring self-assessment (be honest, then improve the weak rows)

| Criterion | Weight | Current position | Strengthen by |
|---|---|---|---|
| A. Platform overview & value proposition | 15% | **Strong** — differentiated (Arabic-first, local rails, security), real marketplace mechanics | Fixing §3 items 1–5 before evaluators click the link |
| B. Team capacity & governance | 15% | **Unknown to this repo** — template awaiting real CVs | Concrete scaling/e-commerce experience; name the programme counterpart |
| C. Past performance & traction | 25% | ⚠️ **Highest risk** — payments shipped recently, so transaction history may be thin | Lead with strongest verified growth metrics (users/sellers/listings); attach evidence; never inflate — consistency is scored |
| D. Expansion strategy & technical proposal | 35% | **Strong draft** — sequenced, feasibility-grounded, covers all scored dimensions | Fill market-size sources, name partner shortlists, set real KPI numbers |
| E. Cross-border readiness & impact | 10% | **Moderate** — architecture ready (multi-gateway schema, edge delivery, AR/EN), but current operations are Egypt-only + EGP-hardcoded (`payments.service.ts:43`) | Quantify any existing foreign users; emphasize SME-impact model |

## 5. Technical assistance to request (mapped to the call's pillars)

- **Functional:** technical audit; regional PSP/e-invoicing API integration advisory; UX & scalability benchmarking; peer exchange with regional platforms on interoperability.
- **Governance & compliance:** GDPR-alignment (policies, consent, cross-border data transfers); e-commerce regulations for JO/TN/MA; VAT on cross-border digital services; dispute resolution.
- **Market growth:** SME/seller onboarding roadmap (incl. women- & youth-led outreach); per-market digital-marketing mentorship; B2B matchmaking (BSOs, payment providers, buyers); exposure visits.

## 6. Timeline back-plan

| Date | Action |
|---|---|
| by 29 Jul | Entity/eligibility question submitted via Q&A (deadline 31 Jul); registration certificate located |
| by 05 Aug | Metrics compiled + evidence pack; team page filled; engineering fixes §3 items 1–3 merged |
| by 12 Aug | Production URL polished (item 4–5); all placeholders resolved; internal review of consistency across attachments |
| by 15 Aug | PDFs generated (respect 1/1/1/2-page limits); portal form completed by authorized signatory |
| **by 18 Aug** | **Submit** (2-day buffer before 20 Aug deadline); archive submission receipt |
