# ربط وكيل المبيعات (Sales Agent Integration)

الوكيل خدمة مستقلة في ريبو تاني: **[OptimaLearn_Sales_Agent](https://github.com/zezo12322/OptimaLearn_Sales_Agent)**. الملف ده بيوصّف الجزء الموجود في المونوريبو ده بس.

---

## 1. إيه اللي اتضاف هنا

| المسار | الوظيفة |
|---|---|
| `backend/src/sales/` | موديول NestJS بيربط الويب بالوكيل |
| `backend/src/common/guards/internal-api-key.guard.ts` | حارس للنداءات service-to-service |
| `dataconnect/default/financials.gql` | استعلام `ListActiveSubscriptionTiers` |
| `web/src/app/(app)/sales/` | لوحة CRM للعملاء المحتملين |
| `web/src/components/sales/` | جدول العملاء، تفاصيل المحادثة، إدارة قاعدة المعرفة، تجربة الوكيل |
| `web/src/lib/api/sales.ts` | عميل الـ API |

**الموديول ده مش بيخزّن أي بيانات مبيعات.** الـ CRM كله في قاعدة بيانات الوكيل. اللي الموديول بيملكه هو **الصلاحيات**: الوكيل بيتصادق بمفتاح مشترك، والويب بيتصادق بتوكن Firebase ودور admin — وده المكان اللي بيترجم واحد للتاني.

---

## 2. المتغيرات المطلوبة

في الـ **backend**:

```bash
# عنوان خدمة الوكيل
SALES_AGENT_URL=https://sales-agent.example.com
# مفتاح الـ LMS → الوكيل (لازم يساوي INTERNAL_API_KEY في الوكيل)
SALES_AGENT_INTERNAL_API_KEY=<secret-1>
# مفتاح الوكيل → الـ LMS (لازم يساوي LMS_INTERNAL_API_KEY في الوكيل)
SALES_INTERNAL_API_KEY=<secret-2>
```

⚠️ **مفتاحين مختلفين، كل واحد لاتجاه.** خلطهم يخلّي اتجاه واحد يشتغل والتاني يرجّع 401 — وده أصعب خطأ في الإعداد يتشخّص، فاعملهم مختلفين بشكل واضح.

من غير `SALES_AGENT_URL` أو `SALES_AGENT_INTERNAL_API_KEY`، endpoints الـ CRM بترجّع **503** برسالة واضحة (مش 500 غامض). ومن غير `SALES_INTERNAL_API_KEY`، الـ guard بيرفض كل النداءات الداخلية بـ **503** — مش بيسمح بيها. حارس بيسمح بكل حاجة لما سرّه ناقص هو نفسه مفيش حارس.

---

## 3. الـ Endpoints

### للويب (admin / instructor، بتوكن Firebase)
```
GET    /api/v1/sales/leads                    قائمة العملاء + فلاتر
GET    /api/v1/sales/leads/:id                العميل + المحادثة + الـ timeline
PATCH  /api/v1/sales/leads/:id                تعديل المرحلة/المالك/الملاحظات/التحويل
POST   /api/v1/sales/leads/:id/messages       إرسال كموظف (بياخد المحادثة تلقائيًا)
POST   /api/v1/sales/leads/:id/sequences      تسجيل في خطة متابعة
DELETE /api/v1/sales/leads/:id/sequences      إيقاف الخطط
GET    /api/v1/sales/stats                    إحصائيات + الحملات
GET    /api/v1/sales/sequences                خطط المتابعة المتاحة
GET    /api/v1/sales/knowledge                مستندات قاعدة المعرفة
POST   /api/v1/sales/knowledge                إضافة مستند            (admin)
DELETE /api/v1/sales/knowledge/:id            إخراج مستند من البحث    (admin)
POST   /api/v1/sales/knowledge/seed           تنزيل المحتوى المبدئي   (admin)
POST   /api/v1/sales/preview/chat             تجربة الوكيل            (admin)
POST   /api/v1/sales/outbound/drain           تفريغ طابور الإرسال     (admin)
GET    /api/v1/sales/readiness                حالة تكاملات الوكيل     (admin)
```

### للمستخدم المسجّل (أي دور)
```
POST   /api/v1/sales/upsell/me                اقتراح ترقية مبني على استخدامه
POST   /api/v1/sales/upsell/:id/outcome       تسجيل نتيجة الاقتراح
```

الـ `uid` بيتاخد من التوكن، **مش** من الـ body — عميل يقدر يسمّي مستخدم تاني هنا يبقى قادر يقرا سجل اقتراحاته.

الردّ الشائع هو `{ "recommendation": null }` وده مقصود: الوكيل بيسكت غير لما إشارات الاستخدام تستاهل.

### للوكيل (بمفتاح داخلي)
```
GET    /api/v1/sales/internal/pricing         الباقات النشطة الحيّة
```
الكتالوج نفسه عام بالفعل (`GET /api/v1/catalog/courses`)، فالأسعار بس هي اللي محتاجة الباب ده.

---

## 4. ليه الوكيل بيقرا الأسعار بدل ما يخزّنها

وكيل بيسعّر من نسخة محفوظة من قائمة الأسعار هو وكيل بيبيع أرقام الربع اللي فات بثقة. `ListActiveSubscriptionTiers` بترجّع الباقات النشطة مرتبة بالسعر، والوكيل بينداها وقت الرد.

الاستعلام `@auth(level: NO_ACCESS)` ومسجّل في `ADMIN_OPERATIONS` — يعني الـ service account بس هو اللي بيقراه. لو احتجتوا صفحة أسعار عامة على الموقع، اعملوا operation منفصل بـ `@auth(level: PUBLIC)` و`insecureReason` صريح، بدل ما توسّعوا اللي موجود.

---

## 5. تشغيل محلي

```bash
# 1) شغّل الوكيل (في ريبوه)
cd ../OptimaLearn_Sales_Agent && docker compose up

# 2) في backend/.env
SALES_AGENT_URL=http://localhost:8000
SALES_AGENT_INTERNAL_API_KEY=dev-secret-1
SALES_INTERNAL_API_KEY=dev-secret-2

# 3) في الوكيل .env
INTERNAL_API_KEY=dev-secret-1
LMS_INTERNAL_API_KEY=dev-secret-2
LMS_API_BASE_URL=http://localhost:3000/api/v1
SALES_WEB_BASE_URL=http://localhost:3001
```

بعدها افتح `/sales` في الويب بحساب admin → تبويب **تجربة الوكيل** بيشغّل الوكيل الحقيقي بدون أي ربط بـ Meta.

---

## 6. ملاحظات على الصلاحيات

- `SalesController` كله `@Roles('admin', 'instructor')`، وعمليات قاعدة المعرفة والتجربة `admin` بس.
- إرسال رسالة كموظف عليه rate limit (20/دقيقة) — الرسالة دي بتوصل شخص حقيقي على واتساب، وانفجار منها مش بيتفرّق عن سبام من ناحية Meta.
- التعديلات اللي بتوصل عميل (إرسال، تعديل بيانات) بتتسجّل في audit log الـ LMS **و** في timeline العميل جوه الوكيل بـ `actor` = الـ uid.
- الإرسال كموظف بياخد المحادثة افتراضيًا (`take_over`)، فالوكيل يسكت — عشان مايحصلش إن موظف وموديل يجاوبوا نفس السؤال.

---

## 7. الالتزام بسياسات Meta

سياسة الرسايل كلها متطبّقة **جوه الوكيل**، مش هنا. الموديول ده مش بيتخطّاها: كل إرسال بيمر على نفس المحرّك، وأي رفض بيرجع للواجهة بحالته الأصلية (409 = العميل عمل opt-out، مثلًا) عشان الواجهة تقول الحقيقة بدل ما تقول "حصل خطأ".

عدد الإرسالات المرفوضة ظاهر في `GET /sales/stats` وفي لوحة الـ CRM كـ **"إرسال مرفوض ٧ أيام"**. ارتفاعه المفاجئ يعني إعداد غلط (قالب واتساب مش معتمد، أو عملاء بغير أرقام) — التفاصيل في `docs/SALES_AGENT.md` جوه ريبو الوكيل.
