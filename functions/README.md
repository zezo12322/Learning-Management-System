# OptimaTech LMS - Firebase Backend Functions

This directory contains the **Firebase Cloud Functions (v2)** for the OptimaTech Learning Management System. 

> **Architectural Note:** This is **NOT** the primary backend API for the platform. The core business logic (video streaming, AI chat proxy, instructor authoring, heavy compute, payments) lives in the `backend/` folder (a NestJS server). These Firebase Functions are exclusively used as **microservices** for isolated triggers and Firebase-native tasks, specifically:
> 1. Authentication lifecycle triggers (cleaning up DB rows when a Firebase Auth user is deleted).
> 2. Admin-only custom claim manipulation (changing a user's role).
> 3. Secure student registration (passing through Firebase Auth).

## 🚀 Technology Stack
- **Firebase Functions v2**: Next-generation Cloud Functions utilizing Google Cloud Run, offering improved concurrency, better performance, and seamless Secret Manager integration.
- **TypeScript**: 100% strictly typed codebase to catch edge cases, prevent runtime crashes, and enforce strong contract definitions.
- **Data Connect SDK**: Utilizes the strongly-typed, auto-generated `@dataconnect/admin-generated` SDK for interacting with the backend PostgreSQL database.
- **Zod**: Edge-level data schema validation to ensure incoming client payloads are structurally sound before execution.
- **Upstash Redis**: Used for sophisticated sliding-window rate limiting on callable endpoints to mitigate brute force and DDoS attacks.
- **Jest**: Comprehensive unit testing framework verifying all internal utility scripts and security schemas.

## 📂 Directory Structure

```text
functions/
├── src/
│   ├── callables/          # Direct HTTP endpoints callable from client apps (e.g. userMgmt)
│   ├── triggers/           # Background event triggers (e.g. onCreate, onDelete)
│   ├── config/             # Environment setup and Firebase initialization
│   ├── schemas/            # Zod validation structures (e.g. registrationSchema)
│   ├── utils/              # Shared logic (Encryption, RBAC, Rate Limiting)
│   └── functionTests/      # Isolated Jest unit tests
├── lib/                    # (Ignored) Compiled JS output for deployment
├── dataconnect-*           # Auto-generated SQL query SDKs
├── package.json            # Dependencies and scripts
├── tsconfig.json           # Strict TypeScript compiler options
└── jest.config.js          # Unit testing configuration
```

## 🛡️ Security Architecture

1. **Role-Based Access Control (RBAC)**: All sensitive callable functions (`changeUserRole`) strictly verify that the incoming user possesses an `admin` Custom Auth Claim using `authUtils.ts`.
2. **Rate Limiting**: Protected endpoints (`registerStudent`) are throttled via `Upstash Redis` to prevent abuse.
3. **Payload Validation**: Incoming API calls must pass strict `Zod` checks (e.g., strong passwords, 14-digit National IDs, valid enum roles).
4. **Data Encryption**: Sensitive PII (like National IDs) is symmetrically encrypted at rest using AES-256-GCM before being stored in the database. Keys are injected securely via Google Secret Manager.

## 💻 Developer Guide

### Prerequisites
Make sure you have installed the project dependencies and the Firebase CLI.

> **⚠️ CRITICAL SETUP STEP:** The auto-generated Firebase Data Connect SDKs are intentionally **ignored** by Git to prevent merge conflicts. Before you build or deploy these functions, you **must** generate the SDK locally!

```bash
# 1. Generate the SDKs
cd ../dataconnect
firebase dataconnect:sdk:generate
cd ../functions

# 2. Install dependencies
npm install
```

### Useful Commands

| Command | Description |
|---|---|
| `npm run build` | Compiles the TypeScript codebase (`src/`) into vanilla JavaScript (`lib/`). |
| `npm run test` | Executes the Jest unit testing suite against schemas and utilities. |
| `npm run lint` | Runs ESLint to verify code quality and style guidelines. |
| `npm run serve` | Compiles the code and spins up the local Firebase Emulator Suite. |
| `npm run deploy`| Deploys exclusively the cloud functions to the live production environment. |

### Adding a New Function
1. Create your logic inside `src/callables` or `src/triggers`.
2. Import and export it from the central `src/index.ts` file.
3. If it requires an input payload, define a strict schema in `src/schemas`.
4. If it's a sensitive operation, wrap it in the `requireRole` middleware and `RateLimiter.checkLimit`.
5. Run `npm run test` and `npm run build` to verify everything compiles cleanly before deploying.
