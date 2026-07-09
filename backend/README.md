# OptimaTech LMS - Backend API

This is the central backend API for the OptimaTech LMS platform, built with **NestJS 11**.

## 🏗️ Architecture

The backend is built as a **modular monolith** with 21 feature modules and 2 global modules. It connects to **Firebase Data Connect (PostgreSQL)** for data storage and **Firebase Storage** for media, using **Firebase Auth** for authentication.

### Key Components

- **Firebase Gateway (`FirebaseModule`)**: Wraps the Firebase Admin SDK. Generates signed URLs for storage and acts as the gateway to the Data Connect REST API, executing GraphQL operations securely.
- **Security (`CommonModule`)**: Contains 4 core guards (`FirebaseAuthGuard`, `RolesGuard`, `CourseAccessGuard`, `ResourceOwnershipGuard`) to handle Role-Based Access Control (RBAC) and IDOR prevention.
- **Media Pipeline**: Uses a two-phase upload protocol with signed URLs (`UploadsModule`). Videos are sent to a `BullMQ` queue (`TranscodingModule`) where FFmpeg converts them to AES-128 encrypted HLS. The `StreamingModule` serves these securely with HMAC key tokens and forensic watermarking.
- **Background Processing**: Uses **BullMQ** (backed by Redis) for high-frequency video playback progress heartbeats (`ProgressModule`) and video transcoding. A cron job (`QuizzesModule`) automatically grades expired quiz attempts.
- **Core Features**: 
  - Courses, Sections, Lectures (with secure preview rules)
  - Quizzes and Missions (project-based assessments with rubrics)
  - Ratings, Catalog, and progressive completion tracking.

## 🚀 Setup & Running

### Requirements
- Node.js 20+
- npm (or pnpm)
- Redis & PostgreSQL (provided via `docker-compose.yml` in the project root)

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
Check the root `.env` file for required variables like `DB_HOST`, `REDIS_HOST`, `FIREBASE_PROJECT_ID`, etc.
