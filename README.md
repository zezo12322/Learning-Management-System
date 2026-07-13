# 🎓 OptimaTech LMS

منصة التعلم والتطوير المهني — **Learning Management System**

## 🏗️ هيكل المشروع (Monorepo)

المشروع عبارة عن نظام متكامل (Modular Monolith) يتكون من الطبقات التالية:

```
lms/
├── mobile/          # Flutter (iOS + Android)
├── web/             # Next.js (Web Platform)
├── backend/         # NestJS (Backend API - 21 Modules)
├── functions/       # Firebase Cloud Functions (Auth triggers, Admin Tasks)
├── dataconnect/     # Firebase Data Connect (PostgreSQL Schema & GraphQL)
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🚀 تشغيل البيئة المحلية

### المتطلبات
- Docker Desktop
- Flutter SDK 3.x
- Node.js 20+ / 22+
- npm / pnpm

### الخطوات

#### 1. إعداد متغيرات البيئة
```bash
cp .env.example .env
# عدّل .env وأضف قيمك الحقيقية
```

#### 2. تشغيل قواعد البيانات والخدمات (PostgreSQL + Redis)
```bash
docker compose up -d postgres redis
```

#### 3. إنشاء كود Data Connect SDKs (مهم جداً)
نظراً لأن ملفات الـ SDK الناتجة عن Data Connect يتم تجاهلها من Git (لتجنب التضارب)، **يجب** إنشاء الكود محلياً قبل تشغيل المنصة:
```bash
firebase dataconnect:sdk:generate
```

#### 4. إعداد وتشغيل الـ API (NestJS Backend)
للبدء بتشغيل الباك إند، تأكد أولاً أنك قمت بنسخ ملف `.env.example` إلى `.env` ووضع المتغيرات الصحيحة.
- إذا كنت تستخدم **Firebase Live/Production** (لا تستخدم محاكي Firebase)، يجب وضع مسار الـ Service Account Key الخاص بـ Firebase في `.env`.
- إذا كنت تستخدم **Firebase Emulators**، سيتصل تلقائياً بالمحاكي المفتوح.

لتشغيل الخادم:
```bash
cd backend && npm install && npm run dev
```

#### 5. تشغيل الـ Web
```bash
cd web && npm install && npm run dev
```

#### 6. تشغيل الـ Mobile (Flutter)
```bash
cd mobile && flutter pub get && flutter run
```

> **📱 لاختبار التطبيق على هاتف حقيقي (Physical Device):**
> 1. تأكد أن الهاتف والكمبيوتر متصلان على نفس شبكة الـ WiFi.
> 2. افتح ملف `mobile/lib/core/utils/constants.dart`.
> 3. لا يمكن للهاتف التعرف على كلمة `localhost`، لذلك يجب استبدالها بـ **عنوان الـ IP المحلي لجهازك** (مثال: `192.168.1.100`).
> ```dart
>   static String get localhost {
>     return '192.168.1.100'; // استبدل هذا برقم الـ IP الخاص بجهاز الكمبيوتر
>   }
> ```
> 4. تأكد أيضاً من ضبط `useLocalBackend = true;` إذا كنت تشغل الـ NestJS محلياً، أو `useFirebaseEmulators = true;` إذا كنت تستخدم محاكي Firebase.

#### أو تشغيل كل شيء مع Docker
```bash
docker compose up -d
# مع أدوات الإدارة (pgAdmin + Redis Commander)
docker compose --profile tools up -d
```

## 🛠️ البنية التحتية والخدمات الخلفية (Backend & Firebase)

لقد تم بناء الخدمات الخلفية بشكل قوي لتكون قابلة للتوسع وآمنة:

### 1. `backend/` (NestJS API)
يحتوي الباك إند على **21 Feature Module** مقسمة كالتالي:
- **Identity & Access**: `AdminModule`, `UsersModule`
- **Course Content**: `CoursesModule`, `SectionsModule`, `LecturesModule`
- **Assessment**: `QuizzesModule` (مع auto-grading عبر cron jobs), `MissionsModule`, `RubricModule`, `TemplatesModule`, `SubmissionsModule`
- **Engagement**: `EnrollmentModule`, `CatalogModule`, `RatingsModule`, `ProgressModule` (يعمل عبر `BullMQ`), `CompletionModule`
- **Media Pipeline**: `UploadsModule` (Signed URLs), `TranscodingModule` (تحويل الفيديوهات إلى AES-128 HLS عبر `BullMQ`), `StreamingModule` (تأمين بث الفيديو مع Watermarking).

### 2. `functions/` (Firebase Cloud Functions)
دوال تعمل بدون خوادم (Serverless) مكتوبة بـ Node.js لمعالجة مهام محددة:
- `syncClaims`: تعمل تلقائياً عند تسجيل مستخدم جديد (OAuth) لإنشاء سجل في PostgreSQL وإضافة الصلاحيات (Roles) للـ Token.
- `registerStudent`: واجهة برمجة (Callable) لتسجيل الطلاب بشكل آمن وتشفير بياناتهم الحساسة (مثل National ID) باستخدام AES-256-GCM.
- `changeUserRole`: واجهة للمشرف لتغيير صلاحيات المستخدمين (RBAC).
- `cleanupUserData`: تعمل عند حذف المستخدم لمسح بياناته بشكل تسلسلي من قاعدة البيانات وStorage.

### 3. `dataconnect/` (Firebase Data Connect & PostgreSQL)
تعتمد المنصة على **Firebase Data Connect** للتعامل مع قاعدة بيانات **PostgreSQL** عن طريق **GraphQL**.
- يحتوي النظام على 26 جدول (Schema) تغطي المستخدمين، الدورات، الاختبارات، المدفوعات، والاشتراكات.
- عمليات الـ API (Queries & Mutations) مقسمة في مجلد `dataconnect/default/` (مثل `courses.gql`, `missions.gql`, `users.gql`).
- يتم استدعاء هذه العمليات من NestJS Backend بصفة مشرف (Admin)، أو مباشرة من الواجهات الأمامية وفقاً للصلاحيات.

### 4. قواعد توجيه البيانات (SDK vs. REST API)
تعتمد المنصة على معمارية هجينة (Hybrid Architecture) لضمان أعلى أداء:
- **استخدم FDC Client SDK مباشرة:** لجميع عمليات القراءة الخاصة بالطلاب (مثل تصفح الكورسات، المنهج، التقدم). هذا يضمن استجابة فورية (Zero Middleman Latency) وأمان تام عبر صلاحيات `@auth(level: USER)`.
- **استخدم NestJS REST API:** لجميع عمليات التأليف (Authoring) الخاصة بالمعلمين، رفع الملفات، تحويل الفيديوهات (Transcoding)، والصلاحيات المعقدة (RBAC) التي تتطلب صلاحيات Admin لتخطي قيود Data Connect.

## 🔥 إعداد Firebase

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. أنشئ مشروع جديد باسم `optimatech-lms`
3. فعّل: **Authentication** (Email/Password + Google) + **Storage** + **Data Connect** (PostgreSQL)
4. للـ Flutter:
   ```bash
   cd mobile
   dart pub global activate flutterfire_cli
   flutterfire configure --project=YOUR_FIREBASE_PROJECT_ID
   ```
5. للـ Web: أضف credentials في `.env`
6. لنشر أو تحديث Schema الخاصة بـ Data Connect:
   ```bash
   firebase deploy --only dataconnect
   ```

## 🌐 URLs المحلية

| Service | URL |
|---------|-----|
| Web App | http://localhost:3000 |
| API | http://localhost:3001/api/v1 |
| API Docs (Swagger) | http://localhost:3001/api/docs |
| pgAdmin | http://localhost:5050 |
| Redis Commander | http://localhost:8081 |

## 📊 Stack التقني

| الطبقة (Layer) | الإطار الأساسي (Framework) | أهم المكتبات والتقنيات (Key Libraries) |
|--------|---------|-------------------------|
| **Mobile App** | Flutter (Dart 3.x) | `flutter_bloc` (State), `dio` + `retrofit` (Networking), `hive` (Local Storage), `skeletonizer` |
| **Web Platform** | Next.js 14.1 (React 18) | `zustand` (State), `react-query` (Data Fetching), `tailwind` + `radix-ui` (UI), `next-auth` |
| **Backend API** | NestJS 11 (TypeScript) | `bullmq` (Background Jobs), `ffmpeg` (Video HLS Transcoding), Firebase Admin SDK |
| **Cloud Functions** | Node.js 22 (CommonJS) | `firebase-functions`, `@upstash/ratelimit` (Redis), `zod` (Validation) |
| **Database** | PostgreSQL | Firebase Data Connect (GraphQL), Redis (for BullMQ & Rate Limiting) |
| **Auth & Storage** | Firebase | Firebase Auth (ID Tokens/Custom Claims), Firebase Storage (AES-128 HLS) |
