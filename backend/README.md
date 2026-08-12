# OptimaTech LMS - Backend API

This is the central backend API for the OptimaTech LMS platform, built with **NestJS 11**.

## 🏗️ Architecture

The backend is built as a **modular monolith** with 22 feature modules and 2 global modules. It connects to **Firebase Data Connect (PostgreSQL)** for data storage and **Firebase Storage** for media, using **Firebase Auth** for authentication.

### ⚖️ SDK vs. REST API (Important)
This backend is **not** intended for standard student data reads (like fetching course catalogs or curriculum). Client apps (Flutter/Web) should use the native **Firebase Data Connect SDK** for high-performance reads. 
This NestJS API should be used exclusively for **Authoring, Heavy Compute, Complex RBAC**, and **AI Proxying** operations that cannot be safely managed natively by the client.

### Key Components

- **Firebase Gateway (`FirebaseModule`)**: Wraps the Firebase Admin SDK. Generates signed URLs for storage and acts as the gateway to the Data Connect REST API, executing GraphQL operations securely.
- **Security (`CommonModule`)**: Contains 4 core guards (`FirebaseAuthGuard`, `RolesGuard`, `CourseAccessGuard`, `ResourceOwnershipGuard`) to handle Role-Based Access Control (RBAC) and IDOR prevention, along with a `FailClosedThrottlerGuard` relying on Redis.
- **Media Pipeline**: Uses a two-phase upload protocol with signed URLs (`UploadsModule`). Videos are sent to a `BullMQ` queue (`TranscodingModule`) where FFmpeg converts them to AES-128 encrypted HLS. The `StreamingModule` serves these securely with HMAC key tokens and forensic watermarking.
- **AI Integration (`AiModule`)**: Integrates with an external Python AI Service. Automatically triggers video indexing (RAG pipeline) upon transcoding completion. Provides secure, access-gated endpoints for students to chat with lecture videos, and polling endpoints for instructors to monitor AI ingestion status. Background queues handle retries and cleanup of orphaned media.
- **Background Processing & Distributed Locking**: Uses **BullMQ** (backed by Redis) for high-frequency video playback progress heartbeats (`ProgressModule`), video transcoding, and AI garbage collection (`TranscodingModule/AiCleanupProcessor`). A `RedisLockService` ensures strict concurrency control for sensitive actions like `startAttempt`.
- **Payments (`PaymentsModule`)**: Handles paywall webhooks (Paymob), strictly checking request HMAC signatures, comparing amounts, and enforcing idempotency state machines to accurately grant paid course access while rejecting free `MISSION` line items via the Entitlement Gate (`EnrollmentModule`).
- **Core Features**: 
  - Courses, Sections, Lectures (with secure preview rules and cascade deletions)
  - Quizzes and Missions (project-based assessments with rubrics, strict max attempt limits, and soft-deletes)
  - Ratings, Catalog, and progressive completion tracking with high-water marks for media.

## 🚀 Setup & Running

### Requirements
- Node.js 20+
- npm (or pnpm)
- Redis & PostgreSQL (provided via `docker-compose.yml` in the project root)
- **Firebase CLI** (`firebase-tools`)

### Initial Setup (Important)
Because auto-generated Firebase Data Connect SDKs are intentionally ignored by Git to prevent merge conflicts, you **must** generate them locally before running the backend:
```bash
cd ../dataconnect
firebase dataconnect:sdk:generate
cd ../backend
```

### Installation
```bash
npm install
```

### Running the App
```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

### Environment Variables
Check the root `.env` file for required variables like:
- `DB_HOST`, `REDIS_HOST`, `FIREBASE_PROJECT_ID`
- `AI_SERVICE_URL` (URL of the external AI python microservice)
- `INTERNAL_API_KEY` (Secret key to communicate with the AI microservice)
