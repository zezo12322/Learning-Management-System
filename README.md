# 🎓 OptimaTech LMS

منصة التعلم والتطوير المهني — **Learning Management System**

## 🏗️ هيكل المشروع (Monorepo)

```
lms/
├── mobile/          # Flutter (iOS + Android)
├── web/             # Next.js (Web Platform)
├── api/             # NestJS (Backend API)
├── ai/              # Python FastAPI (AI Services) - قادم
├── dataconnect/     # Firebase Data Connect (GraphQL Schema)
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🚀 تشغيل البيئة المحلية

### المتطلبات
- Docker Desktop
- Flutter SDK 3.x
- Node.js 20+
- pnpm

### الخطوات

#### 1. إعداد متغيرات البيئة
```bash
cp .env.example .env
# عدّل .env وأضف قيمك الحقيقية
```

#### 2. تشغيل قواعد البيانات
```bash
docker compose up -d postgres redis
```

#### 3. تشغيل الـ API
```bash
cd api && npm install && npm run start:dev
```

#### 4. تشغيل الـ Web
```bash
cd web && npm install && npm run dev
```

#### 5. تشغيل الـ Mobile
```bash
cd mobile && flutter pub get && flutter run
```

#### أو تشغيل كل شيء مع Docker
```bash
docker compose up -d
# مع أدوات الإدارة (pgAdmin + Redis Commander)
docker compose --profile tools up -d
```

## 🔥 إعداد Firebase

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. أنشئ مشروع جديد باسم `optimatech-lms`
3. فعّل: **Authentication** (Email/Password + Google) + **Firestore** + **Storage** + **Cloud Messaging** + **Data Connect** (PostgreSQL)
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

## 💾 قاعدة البيانات (Firebase Data Connect)

تعتمد المنصة على **Firebase Data Connect** للتعامل مع قاعدة بيانات **PostgreSQL** عن طريق **GraphQL**. 
تُوفر هذه التقنية طرقًا مرنة وآمنة للوصول إلى البيانات من الواجهات الأمامية والخلفية عن طريق توليد حزم وتوابع جاهزة (Generated SDKs).

### 1. أين تكتب الجداول والعمليات؟
- **هيكل الجداول (Schema):** يتم تعريف كل جداول التطبيق في `dataconnect/schema/schema.gql`.
- **العمليات (Queries & Mutations):** تُكتب في ملفات `dataconnect/default/*.gql` (مثل `users.gql`, `courses.gql`).

### 2. أين تتولد الأكواد (Generated SDKs)؟
كلما أضفت استعلاماً (Query) أو تعديلاً (Mutation)، يُصدر Firebase Data Connect أكواداً جاهزة في مسارات مشروعك:
- **للويب (Next.js):** `web/src/dataconnect-generated/`
- **للموبايل (Flutter):** `mobile/lib/dataconnect_generated/`
- **للباك إند (NestJS):** `api/src/dataconnect-admin-generated/`

### 3. كيف تستخدم قاعدة البيانات في الكود؟

#### 👉 من الواجهة الأمامية (Web & Mobile)
لجلب البيانات أو تعديلها (وفقاً لصلاحيات المستخدم)، استخدم الدوال التي تم توليدها تلقائياً مباشرةً.
**مثال في Web (Next.js):**
```typescript
import { executeCoursesQuery } from '@/dataconnect-generated';

const courses = await executeCoursesQuery();
```

#### 👉 من الباك إند (NestJS API)
لإجراء العمليات التي تتطلب صلاحيات مشرف (Admin)، أو لإخفاء منطق أعمال معقد، يتم استخدام دوال الـ Admin المولدة في NestJS Backend.
**مثال في NestJS:**
- قم بكتابة المسارات `controllers` والمنطق `services` كالمعتاد.
- استدعِ دوال Data Connect من داخل הـ Service:
```typescript
import { Injectable } from '@nestjs/common';
import { createAdminUser } from '../dataconnect-admin-generated';

@Injectable()
export class UsersService {
  async createUser(data: any) {
    // يمكنك إضافة أي منطق خاص بالخادم هنا
    return await createAdminUser(data);
  }
}
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

| الطبقة | التقنية |
|--------|---------|
| Mobile | Flutter + Firebase |
| Web | Next.js 14 + TypeScript + Tailwind |
| API | NestJS |
| Database | PostgreSQL + Redis + Firebase Data Connect (GraphQL) |
| Auth | JWT + Firebase Auth + Google OAuth |
| AI (V2) | Python + FastAPI |

---
*KAN-8 — إعداد بيئة التطوير (Flutter + Firebase)*
