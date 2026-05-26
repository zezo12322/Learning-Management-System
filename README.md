# 🎓 OptimaTech LMS

منصة التعلم والتطوير المهني — **Learning Management System**

## 🏗️ هيكل المشروع (Monorepo)

```
lms/
├── mobile/          # Flutter (iOS + Android)
├── web/             # Next.js (Web Platform)
├── api/             # NestJS (Backend API)
├── ai/              # Python FastAPI (AI Services) - قادم
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
3. فعّل: **Authentication** (Email/Password + Google) + **Firestore** + **Storage** + **Cloud Messaging**
4. للـ Flutter:
   ```bash
   cd mobile
   dart pub global activate flutterfire_cli
   flutterfire configure --project=YOUR_FIREBASE_PROJECT_ID
   ```
5. للـ Web: أضف credentials في `.env`

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
| API | NestJS + PostgreSQL + Redis |
| Auth | JWT + Firebase Auth + Google OAuth |
| AI (V2) | Python + FastAPI |

---
*KAN-8 — إعداد بيئة التطوير (Flutter + Firebase)*
