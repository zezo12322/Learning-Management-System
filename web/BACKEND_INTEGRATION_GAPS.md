# Web ↔ Backend integration status

Audited against the supplied API documentation and the backend currently present on `main`.
The older `origin/MVP-Back-End-Development` commit `6f2cfd0` does not contain all discovery handlers that are already present on `main`.

> **Note (beta review):** items 2 and 4 below are resolved and kept only as history —
> instructor analytics now has `GET /courses/:courseId/overview`, and the assignment
> loop is connected end to end. That work did add three server-side changes, the
> only ones this integration has made: a `MyAssignments` Data Connect query plus
> `GET /me/assignments` (a learner had no way to discover an assignment at all),
> `mission { id }` added to `MySubmissions` and the two pending-submission queries,
> and `course { id }` added to `GetMissionForEnrollment` so the parent-course gate
> in `EnrollmentService.enrollInMission` actually runs.

## Connected from the web

- Firebase bearer authentication and `/me`, `/me/sync`, `/me/profile`
- Published catalog and authenticated course curriculum
- Categories, server search, popular, recommended, and continue-learning feeds
- Instructor course list, course detail, create, update, and publish status
- Section create/update/delete/reorder; lecture create/update/delete/reorder
- Enrollment, progress, ratings, signed uploads, upload confirmation, and transcoding status
- Per-course instructor analytics (`GET /courses/:courseId/overview`)
- Assignments end to end: authoring (`/missions`), rubric (`/missions/:id/rubric`),
  the learner feed (`GET /me/assignments`), submitting
  (`POST /missions/:missionId/submissions`), and grading
  (`GET /submissions/pending`, `POST /submissions/:id/grade`)
- Web dev/production server uses port `5173`; the backend keeps port `3000`

## Backend work still required

1. **AI chat and generation API**
   - There is no NestJS AI module or REST route for chat, course generation, tutor messages, streaming responses, conversation history, or usage limits.
   - The web keeps AI behind the optional `NEXT_PUBLIC_AI_API_URL` contract until these endpoints exist.

2. ~~**Dashboard analytics**~~ — **resolved.** `GET /courses/:courseId/overview` supplies
   enrollments, progress, completion, ratings and submission counts per course.
   `(app)/dashboard` sums it across the caller's own courses; `/courses` still does not
   return student totals, so the dashboard fans out one overview request per course and
   caps that fan-out, saying how many courses a figure covers when the cap bites. A single
   `GET /me/teaching/summary` would replace the fan-out.

3. **Notifications**
   - There are no notification list, unread-count, read-state, or preference endpoints.
   - `(app)/notifications` therefore renders the designed shell and its empty state. `src/lib/notifications.ts::fetchNotifications` is the only seam to change once `GET /notifications` exists — the Flutter app keeps the same shell in `NotificationsCubit.load()`.

4. ~~**Student-visible assignments**~~ — **resolved**, by adding the endpoint this entry
   asked for. `GET /me/assignments` lists every mission on a course the caller is
   enrolled in, with its rubric and their own attempts, so `(app)/assignments` now shows
   the design's "To do" state and can submit. Two limits remain, both in the API rather
   than the web:
   - **No due dates.** `Mission` has `durationMinutes` but no deadline column, so the
     screen shows expected effort instead of a due date.
   - **The deliverable is a link, not an upload.** `POST /uploads/signed-url` is
     instructor/admin-only, so a learner has no storage path to write to and
     `POST /missions/:missionId/submissions` takes a `fileUrl`. The submit form asks for
     a link to the work and validates it; a learner-scoped upload entity
     (`SUBMISSION_FILE`) would let them attach a file directly.
   - Assignments not attached to a course cannot be listed — no enrollment could entitle
     anyone to them — so the authoring form requires a course and says why.

5. **Certificates**
   - There is no certificates endpoint. `(app)/certificates` projects a certificate from each COMPLETED enrollment and uses the enrollment id as the credential reference; "Download PDF" prints the certificate sheet client-side.
   - A real endpoint would supply the issued date, credential id and a signed PDF/verification URL.

6. **Course discussions**
   - There is no discussions module: no threads, replies, votes or view counts. The Discussion tab on `(app)/learn/[courseId]` states this rather than shipping a question box that drops what a learner types. Replacing `components/learn/DiscussionTab.tsx` is the whole job once endpoints exist.

7. **Lecture notes**
   - No notes endpoint. `lib/notes.ts` keeps notes per account in the browser, behind one module so a future `GET/POST /lectures/:id/notes` changes only that file.

8. **Lecture attachments**
   - The only per-lecture file the API exposes is `transcriptUrl`. The design's "Helpful links" block on the Resources tab has no data source and is omitted.

9. **Learning aggregates**
   - No watch-time, streak, or per-lecture recency aggregate exists, so the Home screen's "Hours learned", "Day streak" and "Recent lessons" blocks from the design are substituted with values that can be derived from `GET /courses/continue-learning` (courses enrolled, lessons completed, certificates, in progress).

10. **Catalog list fields**
   - The public catalog list does not include `description` or `language`; those fields are available only from the curriculum response.
   - Adding them to the catalog query would avoid an authenticated detail request just to render catalog metadata.

11. **User directory**
   - The backend exposes self-service `/me` endpoints only; there is no admin/instructor endpoint for listing, searching, or viewing other users.
   - The web profile page is therefore connected to the signed-in database user, but a real users-management page cannot be implemented yet.

12. **Upload history**
   - Signed upload and confirmation endpoints exist, but there is no endpoint that lists upload jobs or stored files across a course.
   - The web can show media already attached to authenticated course lectures plus uploads made in the current browser session; a complete persistent upload-history view requires a backend list endpoint.

## Contracts the web now follows

- Course status: `DRAFT | PUBLISHED | ARCHIVED` (`IN_REVIEW` is demo-only UI state).
- Lecture type: `VIDEO | READING | INTERACTIVE | QUIZ`.
- Section reorder uses `PUT /courses/:courseId/sections/reorder`.
- Signed uploads use `entityType`, `filename`, `contentType`, `courseId`, optional `lectureId`, then confirm with `storagePath`.
- Upload types supported by the backend contract: course thumbnail image, lecture video, and PDF transcript.
- Video confirmation enqueues transcoding automatically; the explicit transcode route is used only as a retry with `sourcePath`.

## Runtime requirements

- Backend: `http://localhost:3000/api/v1`
- Web: `http://localhost:5173`
- Firebase web environment variables are required to send a valid ID token.
- The backend additionally needs its Firebase Admin, Data Connect, storage, Redis/transcoding, and database configuration before all connected flows can be exercised end to end.
