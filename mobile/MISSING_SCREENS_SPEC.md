# Mobile — Missing MVP Screens: Implementation Specs (for Codex)

These are hand-off specs for the mobile (Flutter) screens still missing against the
MVP statement (*a training platform to display + watch courses, AI-powered*). They are
written to be implemented by a Flutter-capable agent/engineer (Codex) who **can compile,
run `flutter analyze`, and run `dart run build_runner build`** — capabilities the authoring
environment did not have.

**Reference implementation already in this branch:** the **Forgot Password** screen
(`features/auth/.../forgot_password_cubit/`, `features/auth/.../views/forgot_password_view.dart`,
plus wiring in `get_it_service.dart`, `on_generate_route.dart`, `log_in_form.dart`,
`firebase_auth_service.dart`, `auth_repository[_impl].dart`, `assets/translations/{en,ar}.json`).
Mirror its structure and conventions.

---

## 0. Conventions every screen MUST follow

- **Clean architecture per feature:** `features/<feature>/{data/{datasources,models,repositories}, domain/{entities,repositories,usecases?}, presentation/{manager (cubit+state), views, widgets}}`.
- **State management:** `flutter_bloc` Cubit. Prefer **freezed** for state (run `build_runner`) to match the codebase — e.g. `log_in_state.dart` + `.freezed.dart`. (The Forgot Password screen used a plain hand-written state only because the authoring env had no codegen; you should use freezed for consistency.)
- **DI:** register datasource → repository → (usecases) → cubit in `core/services/get_it_service.dart` using `getIt.registerLazySingleton`/`registerFactory` (cubits are `registerFactory`).
- **Routing:** add `static const String routeName = '/kebab-name';` to each view and a `case` in `core/helper_function/on_generate_route.dart`.
- **Networking:** use `ApiService` (`core/network/api_service.dart`). Before each authed call, attach the Firebase ID token exactly like `CourseLearningRemoteDataSourceImpl._setAuthToken()` (`FirebaseAuth.instance.currentUser!.getIdToken()` → `apiService.setAuthToken(token)`). Base URL + `/api/v1` prefix handling already matches the existing datasources — call paths WITHOUT the `/api/v1` prefix (e.g. `apiService.get('/lectures/$id')`), matching `course_learning_remote_datasource.dart`.
- **Errors:** throw `CustomExceptions` in datasources; map to `Either<Failure, T>` (dartz) in repositories (`ServerFailure` etc.), as in `auth_repository_impl.dart`.
- **Localization:** all user-facing strings via `easy_localization` `'key.path'.tr()`. Add keys to **both** `assets/translations/en.json` and `ar.json` (keep key sets identical). Namespaces per screen below.
- **UI kit / sizing:** reuse `core/widgets/*` (`CustomTextField`, `PrimaryButton`, `SectionLabel`, `AppErrorWidget`, etc.), `buildSnackBar`, `flutter_screenutil` (`.w/.h/.r/.sp`), `Gap`, and the `context.theme` / `context.textTheme` extensions (`core/utils/extension.dart`). Support light + dark via `AppTheme`.
- **Acceptance for every screen:** `flutter analyze` clean, `flutter build` (or at least `flutter test`/compile) passes, en/ar key parity, works in both LTR/RTL and light/dark.

---

## 1. Quiz / Assessment taking  🟡 (partially backend-blocked)

**Goal:** an enrolled student opens a `QUIZ`-type lecture and takes the quiz: intro → answer questions → submit → result.

**Backend endpoints (exist, NestJS, prefix `/api/v1`):**
- `GET /courses/:courseId/quizzes/:quizId/questions` — student-safe questions (no correct-answer flags). Shape: `{ id, timeLimitMinutes?, questions: [{ id, questionText, points, options: [{ id, text }] }] }`.
- `POST /courses/:courseId/quizzes/:quizId/attempts` — start attempt → returns `attemptId` (+ maybe `expiresAt`).
- `POST /courses/:courseId/quizzes/:quizId/attempts/:attemptId/answers` — submit an answer `{ questionId, optionId }` (confirm DTO in `quizzes` module).
- `POST /courses/:courseId/quizzes/:quizId/attempts/:attemptId/finish` — finish → returns grade/result payload.
- `POST /courses/:courseId/quizzes/:quizId/attempts/:attemptId/heartbeat` — optional session keep-alive (for timed quizzes).

**⚠️ BLOCKER — quizId discovery:** there is **no** student-facing endpoint that returns a lecture's `quizId` (`GET /courses/:courseId/quizzes/:quizId` is admin/instructor + ownership only). So the taking flow can be fully built, but reaching it from a `QUIZ` lecture requires one of:
  1. **Preferred:** a new backend endpoint, e.g. `GET /courses/:courseId/lectures/:lectureId/quiz` (enrolled-student access) returning the `quizId` (or the full take payload); **or**
  2. include `quizId` in the existing `GET /lectures/:lectureId` response for `QUIZ`-type lectures.
  Coordinate this with the backend before wiring the entry point. Until then, build the screen to accept a `quizId` argument and wire the entry point behind that endpoint. (This is the same blocker the web app hit.)

**Files to create** (`features/quiz/`):
- `data/models/`: `take_quiz_model.dart`, `take_question_model.dart`, `take_option_model.dart`, `quiz_attempt_model.dart`, `quiz_result_model.dart` (manual `fromJson` or json_serializable — you can run build_runner).
- `data/datasources/quiz_remote_datasource.dart` (+ impl): the 5 calls above via `ApiService` + `_setAuthToken()`.
- `data/repositories/quiz_repository_impl.dart`; `domain/repositories/quiz_repository.dart`; `domain/entities/*`.
- `presentation/manager/quiz_cubit.dart` + `quiz_state.dart` (freezed): phases `intro / inProgress / submitting / result / failure`, current index, selected answers, timer.
- `presentation/views/quiz_view.dart` (`routeName = '/quiz'`, takes `courseId` + `quizId` as args) + widgets (`quiz_intro`, `question_card`, `option_tile`, `quiz_progress_bar`, `quiz_result`).

**Files to modify:** `get_it_service.dart` (register), `on_generate_route.dart` (route with args — see `CourseLearningView` arg-passing pattern), and the `QUIZ`-lecture tap handler in `course_learning`/`course_details` curriculum tiles to navigate here (behind the discovery endpoint).

**Translations namespace:** `quiz.*` (e.g. `quiz.start`, `quiz.question_of` (`{}/{}`), `quiz.submit`, `quiz.next`, `quiz.previous`, `quiz.result_title`, `quiz.score` (`{}/{}`), `quiz.passed`, `quiz.failed`, `quiz.retake`, `quiz.time_left`).

---

## 2. Notifications  🟡 (backend-blocked → shell now)

**Goal:** a notifications list screen (opened from the existing `notification_button` in the app header).

**Backend status:** there is **no notifications endpoint** in the NestJS backend (same gap as web). `firebase_messaging` IS already a dependency and configured. So:
- **Now (shell):** build the screen + empty/`AppErrorWidget` states + a local list fed by FCM foreground messages (and/or a local Hive store of received pushes). No server history.
- **Later:** swap the datasource to a real `GET /notifications` (+ mark-read) endpoint when the backend adds it. Design the repository interface so only the datasource changes.

**Files to create** (`features/notifications/`): standard slice — `notification_entity/model`, `notifications_remote_datasource` (stub/FCM+Hive for now), `notifications_repository[_impl]`, `notifications_cubit`+`state` (freezed: `loading/loaded/empty/error`), `notifications_view.dart` (`routeName = '/notifications'`) + `notification_tile` widget.

**Files to modify:** `get_it_service.dart`, `on_generate_route.dart`, and the header `notification_button.dart` (`core/widgets/app_header/notification_button.dart`) `onPressed` → navigate to `/notifications`. Consider registering an FCM `onMessage`/`onMessageOpenedApp` handler in `main.dart` to populate the local store.

**Translations namespace:** `notifications.*` (`notifications.title`, `notifications.empty`, `notifications.empty_hint`, `notifications.mark_all_read`, `notifications.today`, `notifications.earlier`).

---

## 3. AI Tutor  🔴 (backend-blocked → UI shell only)

**Goal:** the "AI-powered" pillar's mobile presence — an AI tutor chat opened while watching a lecture.

**Backend status:** the AI service (`optimatech_ai_service`, separate repo) has the RAG layer **stubbed** — `POST /v1/rag/chat` returns a hardcoded "not implemented" response, and mobile would reach it only via a NestJS proxy that does not exist yet. So build a **UI shell** now:
- A chat UI (message list + input) that clearly shows a **"Coming soon"** state (mirror the web's `AIUnavailable` intent), OR a functional chat wired behind a feature flag / `AI_API_URL`-style config that is disabled by default.
- Structure it so that when the backend chat endpoint exists, only the datasource + a config flag flip it on.

**Files to create** (`features/ai_tutor/`): `ai_tutor_view.dart` (`routeName = '/ai-tutor'`, optional `courseId`/`videoId`/`lectureId` args for scope), a `chat_message` entity, `ai_tutor_cubit`+`state` (freezed: `idle/sending/streaming/error/unavailable`), a `chat_bubble` + `chat_input` widget, and an `ai_tutor_remote_datasource` interface (impl throws `unavailable` for now).

**Files to modify:** `get_it_service.dart`, `on_generate_route.dart`, and an entry point — e.g. an "Ask AI" action in the `course_learning` lesson bottom bar / app bar.

**Translations namespace:** `ai_tutor.*` (`ai_tutor.title`, `ai_tutor.coming_soon`, `ai_tutor.coming_soon_body`, `ai_tutor.input_hint`, `ai_tutor.send`, `ai_tutor.disclaimer`).

**Contract to target (when backend is ready), from the AI service schema:**
- Request: `{ userId, tenantId, courseId, videoId, message, playbackMs? }`.
- Response: `{ answer, grounded, scopeUsed, citations: [{ startMs, endMs, videoTitle, label }] }` — render citations as tappable timestamps that seek the lecture video.

---

## Suggested order
1. **Quiz** (most user value; taking flow is fully buildable — only the entry-point discovery needs a backend endpoint).
2. **Notifications** (shell; low effort; unblocks the header button).
3. **AI Tutor** (shell; unblocks the MVP's AI pillar visually; full function waits on the AI service RAG + a NestJS proxy).

## Cross-cutting backend asks (raise with the backend team)
- `GET /courses/:courseId/lectures/:lectureId/quiz` (enrolled students) → returns `quizId` / take payload. **Blocks quiz entry point.**
- `GET /notifications` (+ mark-read). **Blocks real notifications.**
- A NestJS proxy to the AI service `/v1/rag/chat` (with Firebase auth → internal API key), **after** the AI service's RAG layer is implemented. **Blocks AI tutor.**
