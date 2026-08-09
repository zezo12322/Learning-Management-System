# OptimaTech LMS — Web MVP Progress

> Living checklist so work survives token/session limits. Update as you go.
> Branch: `codex/web-mvp-ai-platform` · Stack: Next.js 14 (App Router) · Tailwind · React Query · Firebase Auth · Axios → NestJS REST (`/api/v1`).

## Source of truth
- **Design system** = mirrored from the Flutter mobile app (`mobile/lib/core/utils/app_colors.dart`, `app_text_styles.dart`, `app_theme.dart`) + the **Figma** *Optima LMS Design System v1.0* (`qnz5RQhgOGf6fuB5g6W8Of`, page `0:1 "📱 mobile Screens"`). Verified visually via Figma MCP on the student-tier account (rate-limited — pull a few screens per session).
- **API contract** = `backend/API_DOCUMENTATION.md` (89 REST routes, NestJS). Auth via **Firebase ID token** (`Authorization: Bearer <token>`). First call after sign-in: `POST /me/sync`. Registration = `registerStudent` callable (region `europe-west3`) — called via its HTTPS endpoint in `lib/auth/cloudFunctions.ts` (the `firebase/functions` SDK is avoided; its `undici` dep breaks the webpack build).

## Figma — DONE ✅
All 18 screens captured visually + documented in **[FIGMA_SCREENS.md](./FIGMA_SCREENS.md)** (per-screen UI breakdown).
Working file key (higher rate limit): `IxoBwTDvW4IWxjWL7cr2Wh`, page `0:1`.
Design = mobile layout; web adapts to RTL + responsive (sidebar desktop / bottom-nav mobile), brand = OptimaTech (Figma placeholder was "Learnova").

## Build notes (gotchas already solved)
- `next.config.ts` → `next.config.mjs` (Next 14 doesn't support TS config).
- Removed `@dataconnect/generated` local dep (broke `npm install`; web uses REST).
- `next.config.mjs` webpack forces Firebase's **browser** build (drops `node` export condition) to avoid the `undici` private-field parse error.
- Firebase auth is **lazy** (`getFirebaseAuth()`) so prerender never calls `getAuth` without env.

## Design tokens
- Primary `#4F46E5` (indigo), Secondary `#0EA5E9` (sky), Success `#22C55E`, Warning `#F59E0B`, Error `#EF4444`.
- Surface `#FFFFFF`, Background `#F8FAFC`, Border `#E2E8F0`, Text `#0F172A` / `#64748B`.
- Dark: primary `#6366F1`, bg `#0F172A`, surface `#1E293B`, border `#334155`.
- Radii: button 12, input 14, card 20. Font: Cairo (Arabic RTL). Full Poppins scale mapped to Tailwind text sizes.

## Status
- [x] Design tokens → `tailwind.config.ts`, `globals.css`, `lib/utils.ts`
- [x] UI primitives → `components/ui/*` (Button, Card, Input, Label, Badge, Spinner, Skeleton, Avatar)
- [x] Firebase client → `lib/firebase.ts`
- [x] API client (Firebase token) → `lib/api/client.ts`
- [x] Domain types → `lib/types.ts`
- [x] Typed API services → `lib/api/services/*`
- [x] Auth context + hooks → `lib/auth/*`
- [x] Route protection → `lib/auth/routeAccess.ts`, enforced in `AppShell`: a learner
      who opens an instructor route (`/dashboard`, `/courses`, `/students`,
      `/insights`, `/uploads`, `/studio/*`) is redirected to `/home` without the
      workspace ever painting. This is a UI guard — the NestJS API remains the
      authorization boundary and answers 403 on authoring endpoints regardless.
- [x] Auth pages → `(auth)/login`, `(auth)/register`
- [x] Home dashboard → `(app)/home`
- [x] Courses catalog → `(app)/courses`
- [x] Course details → `(app)/courses/[id]`
- [ ] Course learning (lecture player) → `(app)/learn/[courseId]`
- [x] Student home → `(app)/home` (Figma 5)
- [x] My courses (enrolled + progress) → `(app)/learning` (Figma 6)
- [x] Assignments → `(app)/assignments` (Figma 13, backed by `GET /me/submissions`)
- [x] Certificates list + detail → `(app)/certificates` (Figma 14, derived from COMPLETED enrollments)
- [x] Notifications → `(app)/notifications` (Figma 15, empty shell — no backend endpoint)
- [x] Profile → `(app)/profile` (Figma 16)
- [x] Role-aware navigation: learner nav for everyone, "Teaching" group for instructors/admins
- [ ] Quiz experience refit to the 4-step Figma flow
- [ ] Course learning Notes / Resources / Discussion tabs (Figma 9–11)

## How to run
```bash
cd web && npm install && npm run dev   # http://localhost:3000
# needs backend on :3000/api/v1 (see backend/README) and NEXT_PUBLIC_* env (see .env.local.example)
```
