# 🎨 برومبت إعادة تصميم OptimaTech LMS في Figma (ويب + موبايل)

> **طريقة الاستخدام:**
> 1. الصق **البرومبت الرئيسي (Master Prompt)** أولًا في Figma Make / Figma AI (أو أي أداة توليد تصميم) — هو اللي بيحدد الهوية ونظام التصميم وقواعد المنصة.
> 2. بعدها ابعت **دفعات الشاشات (Batches)** واحدة واحدة بالترتيب (A → H). كل دفعة لوحدها عشان الأداة متتلخبطش ومتختصرش الشاشات.
> 3. البرومبتات مكتوبة بالإنجليزي لأن أدوات التوليد بتفهمه أدق، لكن كلها بتطلب إن **المحتوى الظاهر يكون بالعربي وبـ RTL**.
>
> المصدر: الشاشات والمسارات الفعلية في `web/src/app` و `mobile/lib/features`، ونظام التصميم الحالي في `web/tailwind.config.ts` و `web/src/app/globals.css` و `web/FIGMA_SCREENS.md`.

---

## 1) البرومبت الرئيسي — Master Prompt

```text
You are a senior product designer. Redesign the complete UI of "OptimaTech LMS" — an Arabic-first
learning & professional-development platform — as ONE cohesive design system delivered for two
platforms: a responsive Web app (Next.js) and a native Mobile app (Flutter, iOS + Android).
The output will be used as the reference for a full redesign, so it must be complete, consistent
and implementation-ready (auto-layout everywhere, components with variants, named styles/variables).

## Product
- Users & roles: Student (learner), Instructor, Admin. Every account gets the learner experience;
  Instructors/Admins additionally get a "Teaching" area and a Course Builder (Studio).
- Core value: discover courses → enroll (free or paid) → watch secure HLS video lessons →
  take timed quizzes → submit assignments (missions graded with rubrics) → earn certificates.
- AI pillar: "AI Tutor" (chat with an assistant grounded in the course content, opened from the
  lesson player and as a global floating button on mobile) and "AI Studio" for instructors
  (AI-assisted course content tools). Design these as first-class, not afterthoughts.

## Language & direction
- Primary language Arabic, full RTL layout (mirrored navigation, icons with direction, progress
  bars filling right→left, chevrons flipped). Provide an English/LTR variant only for the
  design-system page and 2–3 key screens to prove the system mirrors correctly.
- Use realistic Arabic content (course titles like "أساسيات تحليل البيانات", instructor names,
  Egyptian/Arab context, prices in EGP "ج.م"). No lorem ipsum, no "Learnova" placeholder brand.
- Typography: an Arabic-first family with a matching Latin face (e.g. "IBM Plex Sans Arabic" or
  "Cairo"/"Tajawal" for Arabic + "Poppins"/"Inter" for Latin and numerals). Define a type scale:
  Display 40, Title-L 32, Title-M 24, Title-S 20, Body-L 16, Body-M 14, Label 12, Caption 11 —
  with Arabic-friendly line heights (≥1.5 for body).

## Brand & visual direction
- Brand: OptimaTech. Keep the indigo identity but make it feel more modern, premium and calm:
  Primary indigo #4F46E5 (hover #4338CA, active #3730A3), Secondary sky #0EA5E9.
  Neutrals: Background #F8FAFC, Surface #FFFFFF, Subtle #F1F5F9, Border #E2E8F0,
  Border-strong #CBD5E1, Text #0F172A / #475569 / #64748B.
  Status (text-safe, ≥4.5:1): Success #166534 on #DCFCE7, Warning #92400E on #FEF3C7,
  Error #B91C1C on #FEE2E2, Info #0369A1 on #E0F2FE.
  Brand-soft #EEF2FF with on-brand-soft #3730A3 for selected/"now playing" states.
  Media "stage" surface always dark #0B1120 (video player) in both themes.
- Full Dark mode for every screen (dark primary may lighten to #6366F1; in dark, cards separate by a
  subtle 1px ring instead of shadow). Deliver Light + Dark as Figma variable modes.
- Shape: radii — button 12–16, input 14, card 20, chips full-pill. Soft shadows in light mode.
- Course thumbnails: tasteful gradient + subject illustration/icon system (so courses without a
  cover image still look designed).
- Iconography: one outline icon set (Lucide style), 1.5–2px stroke, 20/24 sizes.
- Motion notes (annotate, don't animate): fade-in 200ms, slide-up 250ms, skeleton shimmer loaders.
- Accessibility: WCAG AA contrast for all text including 11–12px captions, 44×44 touch targets,
  visible focus rings on web, never rely on color alone for status (add icon/label).

## Platforms & frames
- Mobile frames: 390×844 (iPhone 14/15). Bottom tab bar (glass/blurred style allowed):
  الرئيسية / تعلّمي / الكتالوج / الإشعارات / حسابي, plus a floating AI-tutor button.
- Web frames: 1440×1024 desktop (main), 1920 wide (lesson player only), 834 tablet, 390 mobile-web.
  Desktop shell: right-side sidebar 260px (RTL) with learner nav
  (الرئيسية، تعلّمي، الكتالوج، التكليفات، الشهادات، المحفوظات، الملف الشخصي) and, for instructors,
  a "التدريس" group (نظرة عامة، الكورسات، تكليفات أعددتها، التصحيح، الطلاب، التحليلات، الرفع،
  AI Studio). Top bar: global search, notifications bell with unread dot, theme toggle,
  language switch, avatar menu. Mobile web uses a bottom nav instead of the sidebar.
- Lesson player on very wide screens (≥1536px) shows video + a persistent right context rail
  (curriculum/notes); below that the rail collapses into tabs under the video.

## Every screen must include its states
Default, loading (skeletons matching the layout), empty (illustration + helpful CTA), error
(with retry), and where relevant: disabled, success toast, confirmation dialog.
Some data does not exist in the backend yet — design an honest, good-looking state instead of fake
data for: notifications history, course discussions, learning streak/hours-learned, "available"
assignments for students, AI chat (show "coming soon / beta" state as well as the full chat).

## Deliverables / Figma file structure
Pages: 00 Cover · 01 Foundations (colors, type, spacing 4/8 grid, radii, shadows, icons, grids)
· 02 Components (with variants) · 03 Mobile – Student · 04 Web – Student · 05 Web – Teaching &
Studio · 06 Flows/Prototype · 07 States & Edge cases.
Use auto-layout, component properties, and token names that map to code
(e.g. color/primary, color/surface, color/content/secondary, radius/card, shadow/card).
Keep the same component across web and mobile where possible (card, chip, stat tile, progress,
course row) and only change density/layout.

Wait for my next messages: I will send the screens in batches. For each batch, design every listed
screen for BOTH Mobile and Web (Desktop) unless the batch says otherwise.
```

---

## 2) دفعات الشاشات — Screen Batches

### Batch A — Foundations & Components

```text
Batch A — Design system page and component library (no product screens yet).
1. Foundations: color variables (Light/Dark modes), type scale (Arabic + Latin specimens),
   spacing scale, radii, elevation, layout grids (mobile 4-col 16px gutter, tablet 8-col,
   desktop 12-col), iconography, illustration style for empty states, gradient thumbnails set (8).
2. Components with variants (light/dark, RTL/LTR, sizes, states hover/pressed/focus/disabled/loading):
   Button (primary, secondary, outline, ghost, danger, icon-only), Input/TextField (with icon,
   password show/hide, error, helper), National-ID input (14 digits), OTP-style code input,
   Select/Dropdown, Search bar, Checkbox, Radio, Switch, Chips/Filter chips, Tabs/Segmented tabs,
   Badge & Status pill (Draft/Published/Archived, In progress/Completed, Submitted/Graded,
   Verified, Free/Paid, Locked), Avatar (+online dot), Rating stars, Progress bar & progress ring,
   Stat tile, Section header (title + "عرض الكل"), Course card (vertical), Course row (list),
   Continue-learning card, Instructor card, Curriculum item (lecture types: video, text, quiz,
   assignment; states: locked, free preview, completed, now playing), Review card, Note card,
   Resource/file tile (PDF/DOC/PPT/ZIP/IMG), Assignment card, Certificate card,
   Notification row, Settings row, Info row, Chat bubble (user / AI with sources), Chat input,
   Empty state, Error state, Skeletons, Toast/Snackbar, Dialog/Modal, Bottom sheet,
   Mobile bottom nav (glass), Web sidebar, Top bar, Breadcrumbs, Pagination, Stepper (5 steps),
   Upload dropzone + upload progress item, Data table, Chart cards (line/bar/donut), Video player
   chrome (play, seek, speed, quality, captions, fullscreen, watermark area).
```

### Batch B — Entry: Splash, Onboarding, Auth

```text
Batch B — Entry & authentication.
- Splash (mobile only): logo, tagline "تعلّم. تطوّر. انجح.", subtle loading indicator.
- Onboarding (mobile only): 3 slides — "تعلّم في أي مكان" / "تابع تقدمك" / "احصل على شهادتك";
  skip, dots, next/start.
- Login (mobile + web split layout with brand illustration panel on desktop): email, password
  (show/hide), remember me, forgot password link, primary login, "Continue with Google",
  link to register. States: invalid credentials, loading, account disabled.
- Register: full name, email, National ID (14 digits, with privacy note that it is encrypted),
  password + confirm with strength meter, accept Terms & Privacy checkbox (links), create account,
  link to login. Inline validation errors in Arabic.
- Forgot password: email → "check your inbox" success state.
- Terms of Service / Privacy acceptance modal (scrollable legal text, must scroll to accept).
```

### Batch C — Discover: Home, Catalog, Course Details

```text
Batch C — Student discovery.
- Home: greeting with name + avatar, search, 4 stat tiles (enrolled courses, lessons completed,
  in progress, certificates — plus an optional "day streak" tile with a "coming soon" variant),
  Continue Learning (large card with progress + resume), Popular courses (horizontal carousel with
  rating badge), Recommended for you, Top instructors, Recent lessons. Mobile + Web.
- Catalog: search, category chips/strip, filters (level, price free/paid, rating, duration,
  language) as side panel on desktop and bottom sheet on mobile, sort dropdown, results count,
  grid of course cards, pagination / infinite scroll, no-results state.
- Course details: gradient/cover hero (category, title, short description, rating, students,
  preview-play button, bookmark, share, back), instructor card (bio, "View profile"),
  4 stat tiles (duration, lessons, level, certificate), "What you'll learn", requirements,
  curriculum accordion by sections (free-preview lessons playable, others locked), reviews with
  rating breakdown + write review, "You might also like". Sticky enroll bar: price (or "مجاني"),
  Enroll / Go to course / Continue. Variants: not enrolled, enrolled, completed, paid course.
- Saved / Wishlist: saved courses list with remove, empty state.
```

### Batch D — Learn: Player, Notes, Resources, Discussion, AI Tutor

```text
Batch D — The learning experience (most important screens; design them with extra care).
- Course learning / Lesson player:
  Mobile: video at top (dark stage), lesson title + meta + save, tabs below
  (المنهج / الملاحظات / الموارد / النقاش / المساعد الذكي), Previous / Mark complete / Next bar.
  Web desktop 1440: video + tabs below; Web wide 1920: video + persistent curriculum/notes rail.
  Include: secure-video watermark placement (user email faint overlay), buffering, error
  "video unavailable", locked lesson, text-lesson (article reader) variant, completion toast,
  course progress indicator in header.
- Notes tab: counters (total, last edited, highlighted), search, add note bound to video
  timestamp, note cards (timestamp badge → seek, title, body, lesson ref, star, edit/delete).
- Resources tab: downloadable files with type icon, size, download; empty state.
- Discussion tab: ask-a-question box, filters (All / Unanswered / Answered), question cards
  (avatar, role badge instructor/student, time, replies, answered badge) — plus an honest
  "النقاشات قريبًا" unavailable state since the backend has no discussions yet.
- AI Tutor: chat panel (side panel on web, bottom sheet + full screen on mobile) grounded in the
  current lesson: suggested prompts ("لخّص الدرس", "اشرح هذه النقطة", "اختبرني"), AI answers with
  cited sources (lesson + timestamp chips), typing indicator, copy/feedback actions,
  rate-limit / error / "beta – coming soon" states, disclaimer line.
- Global AI floating button (mobile) opening the chatbot bottom sheet from any screen.
```

### Batch E — Assess: Quiz, Assignments, Certificates

```text
Batch E — Assessment & achievement.
- Quiz experience, 4 steps: Intro (questions count, time limit, passing score, attempts left,
  rules, Start) → Question (progress, countdown timer that turns warning/red under 1 min,
  single-choice options, flag for review, Prev/Next, question navigator grid) →
  Review before submit (All / Answered / Unanswered / Flagged) → Result (score ring, passed/failed,
  score, time taken, accuracy, review answers with correct/incorrect, retake if attempts remain).
  States: time expired auto-submit dialog, connection lost, already finished.
- Assignments (student): tabs All / Submitted / Graded, assignment cards (course, points, due date,
  submitted at, score + grade), submission screen (instructions, rubric preview, text + file
  upload, submit, confirmation), graded view with rubric scores and instructor feedback.
- Certificates: list (thumbnail, course, completion date, Verified badge), certificate detail
  (A4 landscape certificate artwork with OptimaTech branding, learner name in Arabic, course,
  date, credential ID, QR/verification URL), Download PDF, Share, empty state.
```

### Batch F — Account: Notifications, Profile, Settings

```text
Batch F — Account.
- Notifications: tabs All / Unread / Announcements, categories (announcements, assignments,
  courses, discussions, system), rows with icon, title, body, time, unread dot, mark all read,
  filter sheet, grouped "اليوم / سابقًا", empty state (designed as the default for now).
- Profile: header card (avatar + online, name, role badge, joined date), 4 stats (enrolled,
  hours, assessments, certificates), user info with inline edit (name, email, phone, location,
  date of birth), learning statistics chart, certificates strip, completed courses.
- Settings: account, change password, notifications preferences, language (العربية / English),
  theme (Light / Dark / System), privacy & legal documents, help & support, delete account
  (danger confirmation), logout.
```

### Batch G — Teaching area & Course Builder (Web only, plus tablet)

```text
Batch G — Instructor / Admin. Web desktop 1440 (and tablet 834 for the key ones).
- Teaching overview dashboard: metrics (published courses, total learners, average rating,
  coverage), my courses list with status pills, AI Studio promo card, quick "Create course".
- Courses (instructor): table/grid with search, status filter (Draft / Published / Archived),
  learners, rating, last updated, actions.
- Course Builder "Studio" — a 5-step stepper with unsaved-changes guard and a publish gate:
  1. Setup (title, subtitle, description, category, level, language, price free/paid, cover upload,
     what-you'll-learn list), 2. Curriculum (sections & lectures with drag-and-drop reorder,
     lecture types video/text/quiz/assignment, free-preview toggle, quiz builder with questions/
     options/points/time limit, assignment+rubric builder), 3. Media (upload videos, transcoding
     status pipeline: uploading → processing → ready / failed, HLS-secured badge),
     4. AI tools (AI Studio: generate summary/quiz questions/outline from lecture content;
     AI Tutor configuration for this course), 5. Preview & publish (learner-view preview,
     checklist of blockers e.g. "section without lessons", Publish button disabled with reason).
- Set assignments (missions list + detail), Grading queue (submissions table → grading view with
  rubric scoring, feedback, final grade), Students (enroll/invite students, list, progress),
  Insights (per-course analytics: enrollments over time, completion funnel, quiz performance,
  lesson drop-off), Uploads (media library with processing status).
```

### Batch H — Payments, System pages, Prototype

```text
Batch H — Payments, system pages and prototype.
- Checkout for a paid course (order summary, price in EGP, payment method selection, terms),
  Payment success (receipt, go to course), Payment failed (reason, retry, contact support).
- 404, global error, maintenance, offline (mobile), session expired, access denied (role).
- Prototype flows wired in Figma: (1) new user: onboarding → register → home → course details →
  enroll → lesson player → quiz → result → certificate; (2) instructor: dashboard → create course →
  5 builder steps → publish. Annotate interactions and transitions.
Finally, produce a one-page "Redesign summary" frame listing what changed vs. the old design
and any assumptions you made.
```

---

## 3) ملاحظات مهمة وأنت بتراجع النتيجة

- **قيود الباك إند الحالية** (عشان التصميم ميوعدش بحاجات مش موجودة): مفيش API للإشعارات، ولا للنقاشات، ولا لساعات التعلم/الـ streak، والشهادات بتتولد من التسجيلات المكتملة، والـ AI Tutor لسه stub في `OptimaTech_AI_Service`. البرومبت بيطلب لكل واحدة منهم حالة "قريبًا" شيك جنب التصميم الكامل.
- **التسجيل** بيستخدم **الرقم القومي (14 رقم)** مش رقم الموبايل — خلي بالك منها لو الأداة رجّعت فورم فيه phone.
- **الألوان الحالية** محسوبة على تباين AA (الـ status colors الغامقة) — لو عايز تغيّر الهوية بالكامل، عدّل قسم *Brand & visual direction* في الـ Master Prompt بس، والباقي هيمشي عليه.
- لو الأداة عندها حد لطول الرسالة، ابعت الـ Master Prompt، وبعده كل Batch لوحده مع جملة: *"Follow the master prompt above."*
