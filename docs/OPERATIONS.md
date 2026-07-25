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

## 2. Monitoring

### Health endpoint
`GET /api/v1/health` → `{ status, timestamp, uptime, env }`. Dependency-free by
design (liveness only) so a transient DB/Redis blip never flaps the Railway
healthcheck. Point an external uptime monitor (e.g. UptimeRobot / Better Stack)
at this URL for a 1-minute liveness check.

### Backend logs (structured)
Two global hooks emit one greppable line per request/error (see
`backend/src/main.ts`):

- **`LoggingInterceptor`** (`[HTTP]` context) — success path:
  `GET /api/v1/courses 200 +42ms` (method, path, status, latency).
- **`AllExceptionsFilter`** (`[ExceptionFilter]` context) — failures:
  - `5xx` → `error` level **with stack trace** (the primary incident signal).
  - `4xx` → `warn` level, one concise line, no stack.

View them in the Railway dashboard → service → **Logs**, or `railway logs`.
Grep for `[ExceptionFilter]` to isolate errors, or `-> 5` for server errors.

> **Adding an APM later (optional):** wire an error tracker (e.g. Sentry) inside
> `AllExceptionsFilter.catch` — it already receives every unhandled exception in
> one place. Initialize the SDK in `main.ts` and no-op when its DSN env var is
> unset (same pattern as `functions/src/utils/mailer.ts`), so local/dev runs are
> unaffected.

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
   and Railway logs are clean of `[ExceptionFilter] … -> 5xx`.

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
```

## 4. Incident runbook (quick)

1. **Detect** — uptime monitor alert, or `[ExceptionFilter] … -> 5xx` spike in
   Railway logs / Cloudflare observability.
2. **Assess** — is it backend, web, or a shared dependency (DB/Redis/Firebase)?
   Check `/api/v1/health` and the error stack in logs.
3. **Mitigate** — if the last deploy caused it, **roll back** the affected
   component (§3). Rollback is faster than forward-fixing under pressure.
4. **Verify** — health `200`, error lines gone, key flows (login, catalog,
   enroll) work.
5. **Follow up** — capture the stack trace, open a ticket, fix forward, redeploy.
