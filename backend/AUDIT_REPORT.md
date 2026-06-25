# LMS Backend — Comprehensive Audit Report

**Date:** 2026-06-25
**Scope:** `backend/` (NestJS API) + `dataconnect/` (Firebase Data Connect schema & connectors)
**Focus domains:** Courses, Sections, Quizzes, Missions/Assignments, Progress Tracking, Templates
**Build status:** `tsc --noEmit` ✅ pass · `jest` ✅ 3/3 trivial tests pass · No runtime/integration validation possible without live Firebase + Cloud SQL.

> Validation note: the backend cannot be exercised end-to-end here because it depends on a deployed Firebase Data Connect service, Cloud SQL, and live Firebase Auth. All findings below come from static analysis of the source, schema, and connector operations. Items that need confirmation against the *deployed* Postgres schema are marked **[verify]**.

---

## 0. Architecture summary

- **Stack:** NestJS 11 → Firebase Data Connect REST (`:executeQuery` / `:executeMutation`) → Cloud SQL (Postgres). No ORM; all DB access is via pre-defined named connector operations in `dataconnect/default/*.gql`.
- **Auth:** Firebase ID token verified by `FirebaseAuthGuard`; global role from Firebase **custom claims** (`role`, `admin`) read by `RolesGuard`; resource ownership enforced in the backend by `CourseAccessGuard` / `ResourceOwnershipGuard` / `AccessService`, which call RBAC resolution queries.
- **Authorization model:** **All connector operations are `@auth(level: USER)`** — Data Connect itself only checks "is authenticated", and the backend is solely responsible for ownership/role. This delegation is the source of the most serious finding (C1).
- **Implemented:** authoring (courses/sections/lectures/quiz-builder/missions/micro-lessons/rubric/templates), quiz-taking, lecture progress, course-completion trigger, uploads, admin role assignment, quiz-expiry cron.
- **Defined in schema/connectors but NOT implemented in the API:** enrollment, mission submission & grading, student course catalog/curriculum, user sync/profile, certificates, sessions/attendance, payments/subscriptions.

---

## Remediation status (updated 2026-06-25 — round 2)

### Round 2 (HIGH + MEDIUM + missing features)
Backend builds (`nest build` ✅), typechecks (`tsc` ✅), tests pass (✅). Connector/schema edits are validated for syntax balance but **require a redeploy** (`firebase deploy --only dataconnect`) + SDK regen, plus a Postgres migration for the new `CourseSection.deletedAt` column.

- **H1 — Lecture content gating:** ✅ `GET /lectures/:lectureId` now returns full content only to the course owner/admin, an ACTIVE enrollee, or for `isFreePreview` lectures.
- **H2 — Private storage:** ✅ Uploads are private by default; thumbnails stay public, premium video/transcript/templates store storage *paths* and are served via short-lived **signed read URLs** (`resolveReadUrl`). *Note: micro-lesson `assetUrl` is admin-supplied (not a backend upload) so it's unchanged; legacy public URLs already in the DB pass through.*
- **H3 — confirmUpload IDOR:** ✅ Lecture uploads now verify the `lectureId` belongs to the authorized `courseId`.
- **H4 — Section deletion:** ✅ Switched to **soft-delete** (`CourseSection.deletedAt` + `AdminSoftDeleteSection`); all section list queries filter `deletedAt: null`. Eliminates the FK/orphan hazard. *(quiz/option hard-deletes with children — see "Remaining".)*
- **H5 — Enrollment:** ✅ New `EnrollmentModule` (`POST /courses/:id/enroll`, `/missions/:id/enroll`, status GETs) with existence/published checks and reactivation instead of duplicate rows.
- **H6 — Submissions & grading:** ✅ New `SubmissionsModule` — student submit (enrollment-gated), `GET /me/submissions`, instructor `GET /submissions/pending`, `POST /submissions/:id/grade` (mission-ownership authorized, scores validated against rubric `maxPoints`, criterion scoring is now an upsert). Wires corrected mission completion (`markMissionEnrollmentCompleted` looks up the *student's* enrollment, fixing the old auth.uid bug).
- **M1** ✅ lecture-update type validation now merges with the persisted record. **M3** ✅ grading ignores answers to soft-deleted questions. **M4** ✅ `getQuizForTaking` is enrollment/owner gated. **M5** ✅ mission update re-checks target-course ownership. **M6** ✅ template `title` validated via DTO. **M7** ✅ upstream DC/SQL error bodies no longer returned to clients. **M8** ✅ CORS restricted to `CORS_ORIGINS` env + global rate limiting (`@nestjs/throttler`, 100/60s). **M9** ✅ new `UsersModule` (`POST /me/sync`, `GET /me`, `PATCH /me/profile`) for provisioning.
- **Bonus — Catalog:** ✅ new `CatalogModule` (`GET /catalog/courses` public discovery, `GET /catalog/courses/:id/curriculum`) so students can browse/enroll.

**Required follow-up by you:** (1) `firebase deploy --only dataconnect` + regenerate SDKs (connector ops added/changed: `GetCourseForEnrollment`, `GetMissionForEnrollment`, `GetSubmissionForGrading`, `GetEnrollmentForUserMission`, `AdminSoftDeleteSection`, `AddCriterionScore`→upsert, `GradeSubmission` updatedAt, section list filters). (2) Apply the `course_sections.deletedAt` column migration. (3) Set `CORS_ORIGINS` for prod. (4) `npm install` already added `@nestjs/throttler` to package.json — commit the lockfile.

**Remaining / deferred (documented, not yet applied):**
- **M2** race conditions (duplicate in-progress attempts, non-atomic question+options/reorder) — needs DB partial-unique index + Data Connect transactions.
- **DB constraints/indexes** (§5): enrollment uniqueness, polymorphic "exactly-one" CHECKs, FK/filter indexes — need careful migrations.
- **Quiz/option hard-delete with children** (rest of H4) — `AdminDeleteQuiz`/`AdminDeleteQuizOption` can still hit FK issues if children/attempt-answers exist; soft-delete conflicts with the `lecture @unique` constraint, so deferred for a dedicated pass.
- **GetPendingSubmissions** is staff-gated but not scoped to the instructor's own missions (cross-instructor visibility).
- **Mission `attemptNumber`** stays 1 (no increment logic). **Paid-course payment gating** on enrollment deferred (payments unimplemented). **Certificates / sessions / payments** modules still absent.

---

### Round 1 (CRITICAL)

- **C1 — Connector authorization:** ✅ *Code applied.* All privileged operations (`Admin*` plus `GradeSubmission`, `AddCriterionScore`, `GetPendingSubmissions`, `GetCourseInstructors`, `GetQuestionOptions`) now carry `@auth(expr: "auth.token.role == 'admin' || auth.token.role == 'instructor'")`, blocking plain students from calling them directly from the client SDK. Student/public/ownership-resolution ops remain `USER`/`PUBLIC`. **Requires deploy:** `firebase deploy --only dataconnect` + SDK regeneration. Per-instructor (A-vs-B) row-level ownership still enforced by the backend guards (by design, per chosen approach).
- **C2 — Leaked service-account key:** ⚠️ *Partially applied.* `git rm --cached backend/firebase-service-account.json` staged (file untracked, kept locally; no code referenced it directly — only via `GOOGLE_APPLICATION_CREDENTIALS`). **Still required by you:** (1) rotate the key in GCP IAM, (2) commit the untracking, (3) scrub it from git history and force-push (it is already pushed to `origin`).

---

## 1. CRITICAL severity

### C1 — All privileged mutations are callable directly from the client, bypassing every backend ownership check
**Where:** `dataconnect/default/*.gql` (all ops `@auth(level: USER)`), `dataconnect/default/connector.yaml` (generates a **JavaScript SDK into `web/`**).
**Root cause:** Authorization (ownership + role) lives only in the NestJS guards. The Data Connect connector exposes operations such as `AdminUpdateCourse`, `AdminDeleteCourse`, `AdminUpdateCourseStatus`, `AdminDeleteQuiz`, `GradeSubmission`, `AdminCreateCategory`, `AdminDeprecateSubscriptionTier`, etc. with only `@auth(level: USER)`. Because the same connector is compiled into a browser SDK shipped to the web app, **any authenticated user (a "student") can call these mutations directly from the browser**, skipping the backend entirely. Example: a student calls `AdminDeleteCourse(courseId)` or `AdminUpdateCourse` against *any* course id, or `GradeSubmission` to grade their own submission.
**Impact:** Complete break of the authorization model — privilege escalation, cross-tenant data tampering/destruction, grade tampering.
**Fix:**
- Add **row-level authorization** in the connector operations instead of relying on the backend. Data Connect supports `@auth(level: ...)` plus per-operation ownership filters / `@check` CEL expressions. Scope every admin mutation to the owner (e.g. require `authorId == auth.uid` or an instructor link, or gate on a custom claim `request.auth.token.role in ['admin','instructor']`).
- Alternatively, **do not generate/deploy a client connector with these operations**; route 100% of writes through the backend and lock the connector down so only the service account can call admin ops. Split connectors: a `public` connector (student-safe ops) and an `admin` connector reachable only with service credentials.
- Until fixed, treat the platform as having no effective authorization.

### C2 — Firebase **service-account private key committed to git**
**Where:** `backend/firebase-service-account.json` — `git ls-files` shows it is **tracked** (committed in `f930c7d "nestjs init"`), and it contains a real `private_key`. `.gitignore` lists it, but gitignore does not untrack an already-committed file.
**Impact:** Anyone with repo access (or any leak of history) gets full Firebase Admin credentials — mint tokens, impersonate any user, full DB/storage access. This is a confirmed secret exposure.
**Fix (do all):**
1. **Revoke/rotate** the service-account key in Google Cloud IAM immediately.
2. `git rm --cached backend/firebase-service-account.json` and commit; scrub history (`git filter-repo` / BFG) since the key persists in history.
3. Load credentials from a secret manager / env-mounted file in deployment; never from a repo file.
4. Audit for other secrets — `backend/.env` exists locally (correctly gitignored and not tracked — good).

---

## 2. HIGH severity

### H1 — Lecture content is served to any authenticated user regardless of enrollment or free-preview
**Where:** `lectures.controller.ts` `GET /lectures/:lectureId` → `LecturesService.getContent` → `GetLectureContent` (returns `videoUrl`, `content`, `transcriptUrl`).
**Root cause:** No enrollment check, no `isFreePreview` gate, no role/ownership guard. Any logged-in user can fetch full paid content (including the signed/public storage URLs) for any lecture id.
**Impact:** Paid course content leak / revenue loss.
**Fix:** Gate by enrollment (`GetUserEnrollmentForCourse` ACTIVE) OR `isFreePreview == true` OR caller is course owner/admin. Strip `videoUrl`/`transcriptUrl`/`content` for non-entitled users.

### H2 — Uploaded content (videos, transcripts, templates) is made world-readable
**Where:** `firebase.service.ts` `uploadFile()` calls `file.makePublic()`; download URLs are unauthenticated `https://storage.googleapis.com/...`.
**Root cause:** All uploaded objects are public. Paths include random UUIDs (unguessable) but the URLs are persistent and shareable; once known, content is freely distributable.
**Impact:** No access control on premium media. Combined with H1, paid videos are effectively ungated.
**Fix:** Keep objects private; serve via short-lived V4 signed **read** URLs minted per entitled request, or via a backend streaming proxy that checks enrollment.

### H3 — Cross-course lecture tampering via `confirmUpload` (IDOR write)
**Where:** `uploads.service.ts` `confirmUpload()`.
**Root cause:** Authorization checks only `assertCourseAccess(dto.courseId)` and that `storagePath` starts with `courses/{courseId}/`. But the `lectureId` written by `AdminUpdateLecture` is taken straight from the DTO and is **never verified to belong to `dto.courseId`**. An instructor who owns course A uploads a file under their own course prefix, then confirms with `lectureId` of a lecture in course B → `AdminUpdateLecture` overwrites the foreign lecture's `videoUrl`/`transcriptUrl`.
**Impact:** Authenticated instructor can vandalize/replace media on lectures they don't own.
**Fix:** Resolve the lecture's owning course (`GetLectureContent`) and assert it equals `dto.courseId` (and that the caller owns it) before the mutation — same pattern already used in `LecturesService.move()`.

### H4 — Hard-deleting a parent row with existing children will fail / orphan data **[verify]**
**Where:** `sections.service.ts delete()` (soft-deletes child lectures, then `AdminDeleteSection` *hard* delete); `quizzes.service.ts deleteQuiz()` (`courseQuiz_delete` with existing `quiz_questions`); `deleteOption()` (`quizOption_delete` while `quiz_attempt_answers` reference it).
**Root cause:** Schema relations are required (non-null) FKs with no declared `ON DELETE` behavior. Deleting a parent that still has child rows raises a Postgres FK violation (Data Connect does not cascade by default). The section-delete flow is also internally inconsistent: it **soft-deletes** lectures (rows remain) then **hard-deletes** the section — the soft-deleted lectures (and their `lecture_progress` rows) become orphaned references.
**Impact:** Section/quiz/option deletion likely throws at runtime; if cascade *is* configured, it silently hard-deletes "soft-deleted" lectures and breaks `lecture_progress`/`quiz_attempt_answers` integrity.
**Fix:** Decide one deletion strategy per entity. Recommended: give `CourseSection`, `CourseQuiz`, `QuizOption` a `deletedAt` and soft-delete consistently; or explicitly delete children in dependency order within a transaction. Add `deletedAt` filtering to the queries that list them. Confirm actual FK `ON DELETE` rules against the deployed schema.

### H5 — Quiz-taking is unreachable: enrollment cannot be created through the API
**Where:** `quizzes.service.ts startAttempt()` requires an ACTIVE `Enrollment`, but there is **no enrollment endpoint** in the backend (`EnrollInCourse`/`EnrollInMission` exist only in `learning.gql`).
**Root cause:** Missing module. The student must already be enrolled, but nothing in the API enrolls them.
**Impact:** End-to-end student flow (enroll → learn → quiz → complete) is broken; quizzes can never be started unless enrollment is created out-of-band (or directly via the client connector — see C1).
**Fix:** Implement an Enrollment module (`POST /courses/:courseId/enroll`, mission equivalent) with duplicate-prevention and, where relevant, payment/eligibility checks.

### H6 — Mission submission & grading workflow is entirely unimplemented
**Where:** `missions.gql` defines `SubmitMission`, `GradeSubmission`, `AddCriterionScore`, `MySubmissions`, `GetPendingSubmissions`; `CompletionService.checkMissionCompletion()` exists — but **no controller/service calls any of them**, and `checkMissionCompletion` is dead code.
**Root cause:** Module never built. "Missions/Assignments" is an in-scope domain, yet the core assignment loop (student submits → instructor grades against rubric → completion/certificate) has no API.
**Impact:** A primary in-scope feature is non-functional.
**Fix:** Implement a Submissions module: student submit (with attempt-number handling, file validation, enrollment check), instructor grading (`GradeSubmission` + per-criterion `AddCriterionScore` validated against `RubricCriterion.maxPoints`), wire `checkMissionCompletion` after grading, ownership-guard the grading endpoints.

---

## 3. MEDIUM severity

### M1 — `PATCH lecture` over-eager type/content validation rejects valid updates
**Where:** `lectures.service.ts update()` → `validateTypeContent(dto.type, dto.videoUrl, dto.content)`.
**Root cause:** When a client PATCHes only `type: VIDEO` (or only `content`), validation inspects the *incoming* DTO only. A lecture that already has a `videoUrl` but re-sends `type` without `videoUrl` is wrongly rejected with "VIDEO lectures require a videoUrl".
**Fix:** Merge with the existing record before validating, or only validate the fields actually present.

### M2 — Race conditions / non-atomic multi-step operations
- **`startAttempt` TOCTOU:** checks "in-progress exists" and "attempts < maxAttempts", then inserts. Two concurrent requests can both pass and create duplicate in-progress attempts / exceed `maxAttempts`. No DB uniqueness on `(user, quiz, in-progress)`.
- **`createQuestion`:** inserts the question then `Promise.all` of option inserts as separate REST calls — partial failure leaves a question with missing/zero options. Not transactional.
- **`updateQuestion` option diff:** insert/update/delete as N independent calls — partial failure leaves inconsistent option sets, possibly with **zero correct options** (the "≥1 correct" check is validated in app code, not enforceable mid-failure).
- **Reorder / re-normalize (`OrderingService.applyOrder`):** `Promise.all` of one mutation per item — partial failure produces duplicate/!contiguous `order` values; no transaction.
**Fix:** Use Data Connect multi-step mutations (single operation) or transactions for question+options and reorder batches; add a DB partial-unique index to prevent >1 open attempt per (user, quiz).

### M3 — Grading denominator vs. answers inconsistency (score can exceed 100%)
**Where:** `quizzes.service.ts autoGrade()`. Denominator = points of **non-deleted** questions (`GetQuizQuestionPoints` filters `deletedAt: null`). Numerator iterates **all** stored answers (`GetAttemptAnswersWithCorrect` has **no `deletedAt` filter**).
**Root cause:** If a question is soft-deleted after a student answered it, its points count in `earnedPoints` but not in `totalPoints` → `score > 100`, and pass/fail skew.
**Fix:** Exclude answers to soft-deleted questions in the numerator (filter in the query or in code), and snapshot the question set at attempt start.

### M4 — `getQuizForTaking` leaks quiz content to any authenticated user
**Where:** `GET /courses/:courseId/quizzes/:quizId/questions` — no enrollment/ownership guard.
**Root cause:** Answer-key is stripped (good, fixes the old C2), but full question/option text for any quiz is readable by anyone.
**Fix:** Require ACTIVE enrollment or ownership.

### M5 — Mission `courseId` can be reassigned to a course the caller doesn't own
**Where:** `missions.service.ts update()` — unlike `create()`, it does not re-run `assertCourseAccess(dto.courseId)`.
**Impact:** An instructor owning a mission can attach it to / detach it from arbitrary courses, including ones they don't own (affects downstream ownership resolution via `GetMyMissionAccess`).
**Fix:** Re-assert course access whenever `dto.courseId` is present on update.

### M6 — Template `title` is unvalidated and can crash the handler
**Where:** `templates.controller.ts upload()` uses `@Body('title') title: string` (raw), bypassing `CreateTemplateDto` (which is **dead code**). `templates.service.ts` then calls `title.replace(...)`.
**Impact:** Missing/empty `title` → `TypeError` (500) or empty filenames; no length/content validation. (Multipart bodies also bypass the global `ValidationPipe` whitelist.)
**Fix:** Validate `title` via a DTO; reject empty; enforce max length.

### M7 — Error responses leak upstream Data Connect / SQL details
**Where:** `dataconnect.service.ts` — `Data Connect operation "X" failed: ${errorBody}` and `... returned errors: ${JSON.stringify(result.errors)}` are thrown as the client-facing message.
**Impact:** Information disclosure (schema field names, constraint names, internal messages).
**Fix:** Log full detail server-side; return a generic message + correlation id to clients.

### M8 — CORS fully open; no rate limiting / throttling
**Where:** `main.ts` `app.enableCors()` (all origins); no `@nestjs/throttler` anywhere.
**Impact:** Any origin can call the API with a token; quiz attempts, uploads, role checks, and the expiry-sensitive endpoints are unthrottled.
**Fix:** Restrict CORS to known frontends; add throttling (esp. auth-adjacent and attempt endpoints).

### M9 — No User provisioning → course/mission creation may fail FK on first use
**Where:** `AdminCreateCourse`/`AdminCreateMission` set `authorId_expr/createdById_expr = auth.uid`, which FKs to `users.uid`. `SyncUser` exists in `users.gql` but there is **no backend endpoint** to create the `User` row.
**Impact:** A brand-new authenticated user with no `users` row hits an FK violation when creating a course/mission, unless the user is synced through the client connector (C1) out-of-band.
**Fix:** Implement user sync (call `SyncUser` on first authenticated request / a `POST /me/sync`), or ensure provisioning on sign-up.

---

## 4. LOW severity

- **L1 — `RolesGuard` makes every user a `student`** (`if (!roles.includes('student')) roles.push('student')`). `@Roles('student')` is therefore meaningless and any future student-only restriction won't actually restrict. Document or remove.
- **L2 — Progress can be recorded for any lecture without enrollment** (`PUT /lectures/:lectureId/progress` has no enrollment/existence check). Lets users mark arbitrary lectures complete; pollutes completion logic.
- **L3 — Empty strings pass validation** — `@IsString()` on titles/names allows `""` (sections, lectures, quizzes, criteria, missions). Add `@IsNotEmpty()` / `@MaxLength()`.
- **L4 — No upper bounds** on `points` (question), `maxPoints` (criterion), `durationMinutes`, `price` — allows absurd values.
- **L5 — `MissionSubmission.updatedAt` never updated** by `GradeSubmission` (no `updatedAt_expr`); `MySubmissions` orders by `updatedAt DESC` → effectively insertion order. (Tied to H6.)
- **L6 — `app.controller.spec.ts` reference** and global prefix: health route is `GET /api/v1/health` (global prefix applies). Fine, just note for monitoring config.
- **L7 — `enableImplicitConversion: true`** can coerce unexpected types in query/param contexts; low risk here since most inputs are body DTOs, but be aware with numeric params.
- **L8 — Dead code:** `CreateTemplateDto` (unused), `CompletionService.checkMissionCompletion` (never called).

---

## 5. Database schema & data-integrity concerns

1. **Polymorphic columns lack "exactly-one" enforcement** — `Enrollment(course, mission)`, `Certificate(course, mission)`, `PaymentItem(course, mission, subscriptionTier)` are all nullable with a `targetType` discriminator, but nothing enforces that exactly the matching FK is set (and others null). Add DB `CHECK` constraints or application-layer validation.
2. **No uniqueness on `Enrollment`** — duplicate ACTIVE enrollments per `(user, course)` / `(user, mission)` are possible. Add a unique constraint; the completion logic and "first enrollment" lookups (`enrollments?.[0]`) assume one.
3. **`CourseSection` has no `deletedAt`** but is hard-deleted amid soft-deleted children (H4). Inconsistent lifecycle model across curriculum entities.
4. **FK `ON DELETE` semantics undefined/unverified** (H4) — the whole delete strategy depends on these.
5. **Indexing [verify]** — high-frequency filters (`quiz_attempts.completedAt IS NULL` for the cron sweep, `quiz_attempts.userId+quizId`, `lecture_progress.userId`, `enrollments.userId+courseId`, `missionSubmissions.status`, `*.deletedAt`) need indexes. Data Connect does not auto-index arbitrary FK/filter columns; without them these become full scans as data grows.
6. **`request.time` for `updatedAt`** — only set where the mutation explicitly passes `updatedAt_expr`. Several mutations omit it (e.g. `GradeSubmission`, some order updates), so `updatedAt` drifts from reality.
7. **No optimistic-concurrency / version column** on editable entities — concurrent edits last-write-wins silently.
8. **Score storage** — `MissionSubmissionScore` keyed by `(submission, criterion)` is good; but no aggregate/total or pass-threshold is stored or computed anywhere (H6 gap).

---

## 6. Missing functionality an LMS needs at this stage

| Area | Missing capability |
|---|---|
| **Enrollment** | Enroll/unenroll endpoints; duplicate prevention; capacity; eligibility (H5). |
| **Missions/Assignments** | Submit, list-my-submissions, instructor grading + per-criterion scoring, mission completion wiring (H6). |
| **Course catalog (student)** | `ListPublishedCourses`, `GetCourseCurriculum`, `GetLectureContent` (gated) — public/student discovery endpoints. |
| **Users** | User sync on first login, `GetMe`, profile update (M9). |
| **Certificates** | Issuance on completion (KAN-116 comment promises certificates; only enrollment status is set — no `Certificate` row is ever created), `MyCertificates`, public verify. |
| **Sessions/Attendance** | Scheduling, check-in (schema + gql exist, no API). |
| **Payments/Subscriptions** | Gateway webhooks to move `Payment` PENDING→COMPLETED; entitlement granting; nothing transitions payment state today. |
| **Quiz results** | No endpoint to fetch a student's graded attempt history/results detail for review. |
| **Pagination & filtering** | No list endpoint paginates (`AdminListMyCourses`, `AdminListMyMissions`, submissions, attempts) — unbounded result sets. |
| **Search** | No course/mission search/filter for discovery. |
| **Soft-delete restore / audit** | No restore, no audit log of who changed/deleted what. |
| **Idempotency** | No idempotency keys on create/payment endpoints. |

---

## 7. Performance & scalability

- **P1 — Whole-course-tree refetch on every curriculum mutation.** `AdminGetCourse` (deeply nested: sections→lectures) is re-queried on each section/lecture create, delete, and reorder just to compute the next `order` or re-normalize. O(course size) per write; expensive for large courses.
- **P2 — Reorder/re-normalize = N round-trips.** `applyOrder` fires one mutation per item via `Promise.all`. Large sections/quizzes mean dozens of concurrent FDC calls per reorder (latency, rate-limit risk, partial-failure inconsistency — see M2).
- **P3 — Expiry cron scans all open attempts every minute.** `GetExpiredAttempts` returns **every** in-progress attempt platform-wide (no time filter, no pagination), filtered in memory. Grows linearly with concurrency; also **runs on every replica** (acknowledged in `quiz-expiry.task.ts`) → duplicated work and double-grading risk without a distributed lock.
- **P4 — No connection pooling concerns at the app layer** (HTTP to FDC), but no caching of hot reads (e.g., quiz settings, course access) → repeated identical queries within a single logical operation (e.g., `autoGrade` calls `GetQuizAttemptById`, `GetQuizSettings`, `GetQuizQuestionPoints` separately).
- **P5 — Missing indexes** (see §5.5) will dominate at scale.

---

## 8. Test-coverage gaps

- Only **2 trivial unit tests** exist (`app.controller` health, `firebase.service` defined). The `test/app.e2e-spec.ts` is the Nest default.
- **Zero coverage** of: guards (`FirebaseAuthGuard`, `RolesGuard`, `CourseAccessGuard`, `ResourceOwnershipGuard`), `AccessService`, `OrderingService`, grading math (`autoGrade`), enrollment/max-attempt logic, completion triggers, file-validation pipe, uploads authorization, the expiry cron.
- No contract/integration tests against a Data Connect emulator; no negative/authorization tests (the most important given C1/H1/H3).
- **Recommended priority tests:** grading correctness & edge cases (M3), ownership guards (deny paths), max-attempts/in-progress race, file-validation pipe (spoofed types), reorder membership validation, completion-trigger transitions.

---

## 9. Architectural & consistency concerns

- **A1 — Authorization in the wrong layer (C1).** Security depends on clients never using the connector directly, which is false given the generated web SDK. Authorization must be enforced at the data layer (connector `@auth`/CEL) or the connector must be locked to the service account.
- **A2 — Service-credential ("admin") path bypasses ownership entirely** (`executeMutationAsAdmin`). Currently only the cron uses it, but the helper is general — any future misuse silently bypasses all checks. Keep it tightly scoped and audited.
- **A3 — No transactions** across multi-write operations (question+options, reorder, delete+renormalize, section+lectures). Each is a sequence of independent REST calls (M2, H4).
- **A4 — Mixed deletion strategies** (hard vs soft) across sibling entities with no documented rule (H4, §5.3).
- **A5 — Completion logic is best-effort & swallowed.** Triggers are wrapped in `try/catch {}` that silently drop errors — a failed completion update is invisible. Acceptable as "non-critical" only if there's a reconciliation job (there isn't).
- **A6 — Heavy reliance on `?? []` / optional chaining** masks "not found" vs "empty"; some flows return `null`/empty instead of 404 (e.g., `getContent` returns `null`), pushing error handling to clients.
- **A7 — `@Roles` at controller + per-route is duplicated/uneven** (e.g., `LecturesController` repeats `@Roles` per method while others set it at class level) — works, but inconsistent and easy to get wrong on a new route.

---

## 10. Suggested remediation order

1. **C2** rotate + purge the committed service-account key (do first; it's a live credential leak).
2. **C1** move authorization into the connector (or lock the connector to the service account and route all writes through the backend).
3. **H1/H2/H3** content-access gating + private storage + fix the confirmUpload IDOR.
4. **H4** settle the deletion strategy (soft-delete consistently) and verify FK behavior.
5. **H5/H6/M9** implement enrollment, submission/grading, and user sync to make the in-scope student flows actually work.
6. **M-series** validation/race/score/CORS/error-leak fixes.
7. **DB constraints + indexes** (§5), then **performance** (§7) and **tests** (§8).

---

### Appendix — files reviewed
Schema: `dataconnect/schema/schema.gql`. Connectors: `admin, courses, quizzes, missions, learning, rbac, users, sessions, instructor, certificates, financials .gql`. Backend: all of `backend/src/**` (controllers, services, DTOs, guards, decorators, pipes, services, modules, `main.ts`, `firebase/*`, tasks) and `package.json`/`tsconfig.json`. Build (`tsc`), unit tests (`jest`) executed.
