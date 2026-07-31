# Web ↔ Backend integration status

Audited against the supplied API documentation and the backend currently present on `main`.
The older `origin/MVP-Back-End-Development` commit `6f2cfd0` does not contain all discovery handlers that are already present on `main`.
No backend source files were changed by this integration.

## Connected from the web

- Firebase bearer authentication and `/me`, `/me/sync`, `/me/profile`
- Published catalog and authenticated course curriculum
- Categories, server search, popular, recommended, and continue-learning feeds
- Instructor course list, course detail, create, update, and publish status
- Section create/update/delete/reorder and lecture creation
- Enrollment, progress, ratings, signed uploads, upload confirmation, and transcoding status
- Web dev/production server uses port `5173`; the backend keeps port `3000`

## Backend work still required

1. ~~**AI chat API**~~ — **done.** `backend/src/ai/` now proxies the AI RAG service:
   `POST /ai/lectures/:lectureId/chat` (Firebase auth + course-access/enrollment
   check), `GET /ai/lectures/:lectureId/status`, and
   `POST /ai/lectures/:lectureId/retry` (admin / owning instructor). The web calls
   these through the shared `apiClient`; `NEXT_PUBLIC_AI_ENABLED` is now only a UI
   on/off switch, and the web holds no AI URL or key.

   Still missing on the backend:
   - **No dedicated generation endpoint.** AI Studio actions are prompt presets
     sent to the same chat route, so output is free text — a generated quiz is
     prose, not structured JSON that could be saved as a real quiz.
   - **No conversation history.** `sessionId` is passed through to the AI service
     but nothing is persisted, so a reload loses the thread.
   - **No streaming.** Answers arrive as one response; long answers just wait.
   - **No per-user usage limits** on a paid AI service.
   - The chat route collapses every AI-service failure into a single 500, so the
     client cannot tell "not indexed yet" from "service down" — which is why the
     status endpoint is polled separately.

2. **Dashboard analytics**
   - No instructor dashboard summary exists for students, enrollments, completion, revenue, or activity.
   - `/courses` also does not return student totals, curriculum counts, or durations, so those values cannot be populated accurately in list cards without extra calls.

3. **Notifications**
   - There are no notification list, unread-count, read-state, or preference endpoints.

4. **Catalog list fields**
   - The public catalog list does not include `description` or `language`; those fields are available only from the curriculum response.
   - Adding them to the catalog query would avoid an authenticated detail request just to render catalog metadata.

5. **User directory**
   - The backend exposes self-service `/me` endpoints only; there is no admin/instructor endpoint for listing, searching, or viewing other users.
   - The web profile page is therefore connected to the signed-in database user, but a real users-management page cannot be implemented yet.

6. **Upload history**
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
