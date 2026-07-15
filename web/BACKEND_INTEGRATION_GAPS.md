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
- Web dev/production server uses port `8085`; the backend keeps port `3000`

## Backend work still required

1. **AI chat and generation API**
   - There is no NestJS AI module or REST route for chat, course generation, tutor messages, streaming responses, conversation history, or usage limits.
   - The web keeps AI behind the optional `NEXT_PUBLIC_AI_API_URL` contract until these endpoints exist.

2. **Dashboard analytics**
   - No instructor dashboard summary exists for students, enrollments, completion, revenue, or activity.
   - `/courses` also does not return student totals, curriculum counts, or durations, so those values cannot be populated accurately in list cards without extra calls.

3. **Notifications**
   - There are no notification list, unread-count, read-state, or preference endpoints.

4. **Catalog list fields**
   - The public catalog list does not include `description` or `language`; those fields are available only from the curriculum response.
   - Adding them to the catalog query would avoid an authenticated detail request just to render catalog metadata.

## Contracts the web now follows

- Course status: `DRAFT | PUBLISHED | ARCHIVED` (`IN_REVIEW` is demo-only UI state).
- Lecture type: `VIDEO | READING | INTERACTIVE | QUIZ`.
- Section reorder uses `PUT /courses/:courseId/sections/reorder`.
- Signed uploads use `entityType`, `filename`, `contentType`, `courseId`, optional `lectureId`, then confirm with `storagePath`.
- Upload types supported by the backend contract: course thumbnail image, lecture video, and PDF transcript.
- Video confirmation enqueues transcoding automatically; the explicit transcode route is used only as a retry with `sourcePath`.

## Runtime requirements

- Backend: `http://localhost:3000/api/v1`
- Web: `http://localhost:8085`
- Firebase web environment variables are required to send a valid ID token.
- The backend additionally needs its Firebase Admin, Data Connect, storage, Redis/transcoding, and database configuration before all connected flows can be exercised end to end.
