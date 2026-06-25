# Data Connect e2e (emulator)

End-to-end verification of the **data layer** — the actual `dataconnect/default/*.gql`
connector operations and `schema.gql`, executed against a real Postgres instance
via the Firebase Data Connect emulator. This covers the gap that the Jest unit
tests cannot: the unit tests mock Data Connect, so they prove the NestJS service
logic; this harness proves the operations themselves (and the `@auth` gating)
behave correctly against a database.

## What it asserts (28 checks)

- **Identity / `auth.uid`** — `SyncUser` provisions the `users` row from the token's uid.
- **Role gating (C1)** — an instructor can author; a **student is blocked** from `AdminCreateCourse`.
- **Authoring** — category → course → section → lecture → quiz (one-per-lecture `@unique`) → question/options.
- **Student-safe quiz view** — `GetQuizQuestions` omits the `isCorrect` answer key.
- **Catalog + enrollment** — published course appears publicly; `EnrollInCourse` is `auth.uid`-scoped and ACTIVE.
- **Quiz attempt** — start → answer → `FinishQuizAttemptIfOpen` finalizes exactly 1 row, and a second call updates 0 (idempotency guard).
- **Mission grading (H6)** — submit (student) → `GetSubmissionForGrading` resolves mission/student → `AddCriterionScore` upsert (re-grade overwrites) → `GradeSubmission`; student sees `GRADED` with the latest score.
- **Soft-delete (H4)** — `AdminSoftDeleteSection` removes the section from `AdminGetCourse` (filtered by `deletedAt`).

## How to run

From the repo root, in one terminal:

```bash
firebase emulators:start --only dataconnect
```

Then, once "All emulators ready" prints:

```bash
cd backend
npm run test:e2e:dc
```

Exit code is `0` if all assertions pass, `1` otherwise.

## How auth works here

The emulator decodes the JWT in the `x-firebase-auth-token` header **without
verifying its signature**, so the harness mints unsigned tokens locally to
impersonate an `instructor` and a `student` — each carrying both `auth.uid`
(`sub`) and the `role` custom claim. This is emulator-only; production verifies
real Firebase ID tokens.

Override the emulator address with `DC_EMU_HOST` (default `127.0.0.1:9399`).

## Not covered here

This exercises the data layer + connector auth. It does **not** boot the NestJS
HTTP app (guards/controllers) — that path is covered by the Jest unit suite. A
full HTTP e2e would additionally require the Firebase **Auth** emulator so
`FirebaseAuthGuard.verifyIdToken` accepts emulator-minted tokens.
