# Verification report

Verified on 2026-07-15 from branch `codex/web-mvp-ai-platform`.

## Passed

- Web TypeScript check: passed.
- Web ESLint: passed with no warnings.
- Web production build: passed.
- Backend NestJS build: passed.
- Backend unit tests: 25 suites and 165 tests passed.
- Core web REST calls were matched to the current NestJS controllers.
- Production web server returned HTTP 200 for dashboard, catalog, courses, setup, curriculum, media, preview, and AI Studio routes.
- Browser QA found no console errors or warnings.
- Desktop and 390px mobile layouts have no horizontal overflow after the responsive-grid fix.

## Fixed during verification

- Corrected create-section response unwrapping for `courseSection_insert`.
- Corrected create-lecture response unwrapping for `courseLecture_insert`.
- Normalized the first-enrollment mutation wrapper.
- Fixed narrow-screen overflow in dashboard and course-builder two-column grids.
- Moved the web server to port `5173`, which is allowed by the backend's default CORS configuration. The backend remains on port `3000`.

## Remaining production blockers

1. **Authenticated runtime setup is incomplete**
   - The supplied backend credentials are sufficient for Firebase Admin and the public Data Connect catalog, but the project has no registered Firebase Web App and the supplied env has no Web API key.
   - `web/.env.local` is intentionally absent, so the web remains in demo-auth mode. Redis is also unavailable locally, which blocks queue-backed flows.

2. **Backend E2E test configuration fails before tests run**
   - `npm run test:e2e` cannot transform the ESM-only `uuid` package.
   - Unit Jest config has a `transformIgnorePatterns` exception, but `test/jest-e2e.json` does not.

3. **Backend lint is not clean**
   - Read-only ESLint run reports 1,284 findings: 944 errors and 340 warnings, primarily unsafe `any` access from untyped Data Connect responses and test mocks.

4. **Production dependency audits are not clean**
   - Web: 14 findings (12 moderate, 1 high, 1 critical), including the old Next.js 14.1.0 and Firebase dependency chain.
   - Backend: 14 findings (5 moderate, 8 high, 1 critical), mainly the Firebase Admin 10 / Google Cloud / protobuf dependency chain.
   - Several fixes require breaking dependency upgrades; no automatic `npm audit fix --force` was applied.

5. **AI backend remains unavailable**
   - No AI chat, generation, streaming, conversation-history, or RAG REST API exists in the current NestJS backend.

## Local verification URLs

- Web: `http://localhost:5173`
- Backend API when configured: `http://localhost:3000/api/v1`

## Runtime validation with the supplied local credentials

- The service-account JSON is valid and the backend initializes Firebase Admin successfully.
- The backend is currently running on port `3000` with a process-only port override; the supplied env file requests `3001`, which is already occupied locally.
- `GET /api/v1/health` returns `200`.
- CORS allows `http://localhost:5173`.
- The public catalog returns four live courses from Data Connect, and the web catalog renders those four records with no console errors.
- The Firebase project currently has no registered Web App, so Firebase Web Auth configuration cannot be derived yet. Authenticated routes still need a Web App/API key and a signed-in user.
- Redis is not available on `localhost:6379`, and the local Docker daemon did not respond. Queue-backed progress and transcoding flows are therefore not end-to-end verified.
