# Operations: Deployment, Monitoring & Rollback

Operational runbook for the OptimaTech LMS production stack (KAN-60).

## 1. Deploy targets

| Component | Platform | Build → Deploy | Health / liveness |
|-----------|----------|----------------|-------------------|
| `backend/` (NestJS API) | Railway | `npm run build` → `npm run start:prod` | `GET /api/v1/health` |
| `web/` (Next.js, OpenNext) | Cloudflare Workers | `npm run deploy` (`opennextjs-cloudflare build && … deploy`) | Worker `optima-lms-web` |
| `functions/` (Firebase) | Firebase Functions | `firebase deploy --only functions` | Firebase console |

Railway deploy config lives in `backend/railway.json` (Railpack build, `start:prod`,
healthcheck `/api/v1/health`, `restartPolicyType: ON_FAILURE`, max 5 retries).
Cloudflare config lives in `web/wrangler.jsonc` (worker `optima-lms-web`,
observability logs + traces enabled).

### CI / CD pipelines

| Workflow | Trigger | What it does |
|---|---|---|
| `.github/workflows/ci.yml` | every PR + push to `main` | Per-package lint / type-check / build / test. On a PR only the packages the diff touches run; `main` always runs everything. Backend publishes a coverage summary + artifact. The aggregate **`CI`** job is the one to require in branch protection — the package jobs are skipped (not passed) on unrelated PRs, which would otherwise stall a required check. |
| `.github/workflows/security.yml` | every PR + push to `main` + weekly (Mon 06:00 UTC) | Secret scan (gitleaks — **blocking** on PRs over the commits the PR adds, informational full-history sweep otherwise; see §5), dependency review of what a PR adds, and `npm audit` per package. |
| `.github/workflows/deploy-web.yml` | **manual only** (`workflow_dispatch`) | Reproducible Cloudflare deploy of `web/`, replacing `npm run deploy` from a laptop. Runs in the `production` GitHub Environment, then health-checks the result. |
| `.github/workflows/build-apk.yml` | **manual** + `v*` tags | Signed, obfuscated Android release build (APK / AAB) plus the de-obfuscation symbols. See `docs/MOBILE_RELEASE.md`. |
| `.github/dependabot.yml` | weekly (Mon) | Grouped dependency PRs for the three npm packages, Flutter `pub`, and the GitHub Actions themselves. |

`backend/` deploys are intentionally **not** in a workflow — Railway already deploys
from `main`, and a second path would double-deploy.

**Audit gate:** `npm audit` blocks only on **critical**. The measured baseline was
0 critical but 25-28 **high** per package (mostly transitive dev tooling), so
gating on `high` would fail every PR on pre-existing debt. Raise the threshold in
`security.yml` once Dependabot has worked the backlog down.

**One-time setup to finish the CD half:**
1. Create the **`production`** environment (Settings → Environments) and add
   required reviewers — that is the manual approval gate.
2. Add secrets `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`,
   `NEXT_PUBLIC_FIREBASE_API_KEY`; add variables `NEXT_PUBLIC_API_URL`, the other
   `NEXT_PUBLIC_FIREBASE_*` values, and optionally `WEB_HEALTH_URL` to enable the
   post-deploy check. The workflow fails fast with the exact missing names.
3. Require the **`CI`** and **`Security`** checks on `main` in branch protection.

## 2. Monitoring

### Health endpoint
`GET /api/v1/health` → `{ status, timestamp, uptime, env }`. Dependency-free by
design (liveness only) so a transient DB/Redis blip never flaps the Railway
healthcheck. Point an external uptime monitor (e.g. UptimeRobot / Better Stack)
at this URL for a 1-minute liveness check.

### Backend logs
Two global hooks (registered as `APP_INTERCEPTOR` / `APP_FILTER` providers in
`backend/src/app.module.ts`) emit one line per request/error. Both log the path
with the **query string stripped** — query values carry credentials (the HLS
`?kt=` content-key token, Paymob's `?hmac=` signature).

- **`LoggingInterceptor`** (`[HTTP]` context) — one line per completed request:
  `GET /api/v1/courses -> 200 +42ms` (method, path, status, latency). Liveness
  probes (`/api/v1/health`) are skipped so they don't bury real traffic. A
  handler that builds its own 5xx instead of throwing (the `@Res()` payment
  routes) never reaches the filter, so those are logged here at `error` level.
- **`AllExceptionsFilter`** (`[ExceptionFilter]` context) — thrown failures:
  - `5xx` → `error` level **with stack trace** (the primary incident signal).
  - `4xx` → `warn` level, one concise line, no stack. The line carries the real
    reason (validation field errors included), read off the response body.

View them in the Railway dashboard → service → **Logs**, or `railway logs`.
To isolate errors, grep the level/context (`[ExceptionFilter]`) or the status
arrow — the literal text is `-> 500`, so grep **`-> 5`** (not `-> 5xx`).

> **These are plain text lines, not JSON.** A drain can grep them but cannot
> aggregate by field (no error-rate-per-route, no p95 latency), and there is no
> request-correlation id, so an `[ExceptionFilter]` stack cannot be tied back to
> its `[HTTP]` access line. Both are worth adding when this graduates from
> "greppable" to real observability: a JSON log format plus an `x-request-id`
> middleware echoed in the response header.

> **Adding an APM later (optional):** wire an error tracker (e.g. Sentry) inside
> `AllExceptionsFilter.catch` — it already receives every unhandled exception in
> one place, and it resolves through DI so a client can be injected. No-op when
> its DSN env var is unset (same pattern as `functions/src/utils/mailer.ts`), so
> local/dev runs are unaffected.

### Web (Cloudflare)
`observability` is enabled in `wrangler.jsonc` (100% head sampling for logs, 1%
for traces). View in the Cloudflare dashboard → Workers & Pages →
`optima-lms-web` → **Observability / Logs**, or tail live with
`npx wrangler tail optima-lms-web`.

## 3. Rollback

### Backend (Railway)
Railway retains previous deployments and supports one-click rollback.

1. Railway dashboard → the backend service → **Deployments**.
2. Find the last known-good deployment (green, pre-incident).
3. **⋯ → Rollback to this deployment** (redeploys that exact image; no rebuild).
4. Confirm recovery: `curl https://<api-host>/api/v1/health` returns `200`,
   and Railway logs are clean of `[ExceptionFilter] … -> 5` server errors.

CLI alternative: `railway redeploy` (re-runs current) or roll back from the
dashboard; Railway does not roll back via a single CLI flag, so prefer the
Deployments UI for a precise target.

### Web (Cloudflare Workers)
Workers keeps a version history.

```bash
cd web
npx wrangler deployments list          # find the last good <version-id>
npx wrangler rollback --message "revert to <version-id>" <version-id>
```

`wrangler rollback` with no id rolls back to the immediately previous version.
Verify by loading the app and checking `wrangler tail optima-lms-web`.

### Firebase Functions
```bash
cd functions
# Functions have no built-in version rollback — redeploy the previous known-good
# commit:
git checkout <good-commit> -- src && npm run build && firebase deploy --only functions

# IMPORTANT: `git checkout <commit> -- src` also STAGES the reverted files. Undo
# that once the fix is deployed, or the next commit silently re-ships the
# rolled-back code:
git restore --staged --worktree src
```

## 4. Incident runbook (quick)

1. **Detect** — uptime monitor alert, or a `[ExceptionFilter] … -> 5` spike in
   Railway logs / Cloudflare observability.
2. **Assess** — is it backend, web, or a shared dependency (DB/Redis/Firebase)?
   Check `/api/v1/health` and the error stack in logs.
3. **Mitigate** — if the last deploy caused it, **roll back** the affected
   component (§3). Rollback is faster than forward-fixing under pressure.
4. **Verify** — health `200`, error lines gone, key flows (login, catalog,
   enroll) work.
5. **Follow up** — capture the stack trace, open a ticket, fix forward, redeploy.

## 5. Open security item: committed service-account key

The first run of the secret scan (`.github/workflows/security.yml`) found a
**Firebase Admin SDK service-account private key committed to git history**.

| | |
|---|---|
| File | `backend/firebase-service-account.json` |
| Commits | `f930c7d` ("nestjs init", 2026-06-19) and `6e4e39b` |
| Identity | `firebase-adminsdk-fbsvc@learning-management-syst-3cc3a.iam.gserviceaccount.com` |
| Project | `learning-management-syst-3cc3a` |

It is **no longer in the working tree** and `.gitignore` now covers
`**/firebase-service-account*.json` — but git history is permanent, so anyone who
can read the repository (or clone it, or read it if it ever becomes public) can
still extract the key. An Admin SDK key **bypasses Firebase Security Rules**: it
grants full read/write on the database and Storage and can mint tokens for any
user.

### Remediation, in order
1. **Rotate the key first.** Google Cloud Console → IAM & Admin → Service
   Accounts → that account → Keys → delete the leaked key, then create a new one
   and update `GOOGLE_APPLICATION_CREDENTIALS` / the Railway variable. Rotation is
   the only step that actually revokes access — the leaked copy may already have
   been cloned, so purging history alone fixes nothing.
2. **Check for abuse.** Review Cloud Audit Logs for that service account around
   and after 2026-06-19.
3. **Then purge from history** (optional but recommended), e.g.
   `git filter-repo --invert-paths --path backend/firebase-service-account.json`,
   followed by a force-push and a re-clone by every contributor. Coordinate this —
   it rewrites every commit hash.
4. **Re-run the Security workflow.** Once the key is gone from history the
   full-history sweep goes clean, and the `secrets` job can be made blocking in
   all events by deleting its `continue-on-error` line.

Reviewed non-findings (Firebase *client* config, which is public by design; test
fixtures; a README badge) are allowlisted by fingerprint in `.gitleaksignore`,
each with a stated reason. The service-account key is deliberately **not**
allowlisted so it keeps showing up until it is genuinely dealt with.
