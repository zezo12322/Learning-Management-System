# Optima LMS — Figma Design Reference (all 18 screens)

> Captured visually from Figma via MCP. **Working file (higher rate limit):**
> `IxoBwTDvW4IWxjWL7cr2Wh` — page `0:1 "📱 mobile Screens"`.
> (Original `qnz5RQhgOGf6fuB5g6W8Of` is under the OptimaTech team = View seat, low MCP limit.)
> Design is mobile-first; the **web** adapts to RTL + responsive (sidebar desktop / bottom-nav mobile).
> Figma placeholder brand = "Learnova" → replace with **OptimaTech**. Content shown in EN → build in AR.

## Design system (confirmed)
- Primary indigo `#4F46E5`, Secondary sky `#0EA5E9`, Success `#22C55E`, Warning `#F59E0B`, Error `#EF4444`.
- Surface `#FFFFFF`, Background `#F8FAFC`, Border `#E2E8F0`, Text `#0F172A`/`#64748B`. Dark variants in `globals.css`.
- Radii: button 12, input 14, card 20. Cards: white, thin border, subtle shadow. Gradient course thumbnails.

## Screens (node id → key elements)

| # | node | Screen | Key UI |
|---|------|--------|--------|
| 1 | 201:3 | Splash | Logo + tagline "Learn. Grow. Succeed." + 3D hero + loading bar |
| 2 | 201:4 | Onboarding | 3 slides (Learn Anywhere / Track Your Progress / Get Certified), Skip, dots, Next |
| 3 | 201:5 | Login | Hero illustration, email+password (icons, show/hide), remember me, forgot, Login, Google, Register link |
| 4 | 201:6 | Sign-up | Full name, email, phone, password, confirm password, agree-to-terms, Create Account, Login link. **Backend needs nationalId (14 digits) instead of phone** |
| 5 | 201:7 | Home | Greeting+avatar, search, 4 stat cards, Continue Learning (progress card), Popular Courses (rating badge), Recommended, Top Instructors, Recent Lessons, bottom nav |
| 5.1 | 201:8 | Home (variant) | Same as Home |
| 6 | 201:9 | Courses | "My Courses", search, filter chips (All/In Progress/Completed/Popular/New), category row, sort dropdown, count, course list rows (thumb, title, instructor, rating, level, lessons, progress, status badge, bookmark), pagination |
| 7 | 201:10 | Course details | Gradient hero (back/bookmark/share, category, title, desc, rating, students, play), instructor card (Top Instructor, View Profile), 4 stat tiles (duration/lessons/level/certificate), curriculum (lock/complete/Now Playing), reviews, "You Might Also Like", sticky price + Enroll bar |
| 8 | 201:11 | Course Learning | Video player (progress, CC, cast, fullscreen), lesson title + meta + Save, tabs (Curriculum/Notes/Resources/Discussion), curriculum list (complete/lock/Now Playing), "About this lesson", Previous / Mark Complete / Next |
| 9 | 201:12 | Course Notes | (Notes tab) stats (total/last edited/highlights), search, Add New Note, note cards (timestamp badge, title, body, lesson ref, star highlight, Edit/Delete) |
| 10 | 201:13 | Resources | (Resources tab) downloadable files (type icon PDF/DOC/PPT/ZIP/JPG, size, download), View All, Helpful Links (external) |
| 11 | 201:14 | Discussion | (Discussion tab) Ask a Question box + Post, filter (All/Unanswered/Answered), sort, discussion cards (avatar, role badge, time, question, replies, views, answered badge), FAB |
| 12 | 201:15 | Quiz Experience | 4 steps: Intro (info: questions/time/pass/attempts, Start) → Question (progress, timer, options radio, Study Tip, Prev/Next) → Review (All/Correct/Incorrect tabs, per-question status, See Results) → Result (score ring, passed, score/time/accuracy/performance tiles, Review Answers, Retake) |
| 13 | 201:16 | Assignments | tabs (All/Submitted/Graded), assignment cards (icon, title, course, points, due, submitted time, score+grade), status badges (Available/Submitted/Graded), empty state |
| 14 | 201:17 | Certificates | list (thumb, title, completed date, Verified badge) + detail (certificate image, completion date/duration/credential ID, Download PDF, Share) + empty state |
| 15 | 201:18 | Notifications | tabs (All/Unread/Announcements), categories (Announcements/Assignments/Courses/Discussions/System), notification rows (icon, title, body, time, unread dot), Mark all read, filter sheet, empty state |
| 16 | 201:2 | Student Profile | profile card (avatar+online, name, role badge, joined), 4 stats (enrolled/hours/assessments/certificates), User Information (name/email/phone/location/DOB, Edit), Learning Statistics, Certificates, Completed Courses, Settings (account/notifications/privacy/help/logout) |

## Web build status vs design

### Student area — built to the design
| Figma | Web route | Notes |
|---|---|---|
| 5 · Home (`201:7`) | `/home` | Greeting, search → catalog, 4 stat tiles, Continue Learning, Popular, Recommended, Top Instructors |
| 6 · Courses (`201:9`) | `/learning` | Search, state chips, category strip, sort, count, progress rows, pagination |
| 7 · Course details (`201:10`) | `/courses/[id]` | Pre-existing |
| 13 · Assignments (`201:16`) | `/assignments` | All / Submitted / Graded tabs, state badges, score + letter grade, empty state |
| 14 · Certificates (`201:17`) | `/certificates`, `/certificates/[enrollmentId]` | List, certificate sheet, credential info, download (print) + share, empty state |
| 15 · Notifications (`201:18`) | `/notifications` | Search, category tabs, mark-all-read, unread dots, empty state |
| 16 · Student profile (`201:2`) | `/profile` | Header + 4 stats, User Information (inline edit), Learning Statistics, Certificates, Completed Courses, Settings |

Shared pieces live in `src/components/student/` (`StatCard`, `SectionHeader`, `FilterChips`/`TabBar`,
`EmptyState`, `ContinueLearningCard`, `AssignmentCard`, `CertificateArtwork`, `NotificationRow`,
`InfoRow`/`SettingsRow`). Navigation is role-aware: every account gets the learner nav, and
instructors/admins additionally get a "Teaching" group (`AppShell`).

### Still to refine
- Course Learning tabs (Notes / Resources / Discussion — screens 9–11) and prev/next + "About this lesson".
- Quiz experience (screen 12) — `/quiz/...` exists but does not yet follow the 4-step Intro → Question → Review → Result flow.
- Splash / Onboarding (screens 1–2) — intentionally skipped on web.

### Design elements the backend cannot supply yet
- **Home** "Hours learned" and "Day streak" tiles → no watch-time or streak aggregate; the web shows *Lessons completed* and *In progress* instead.
- **Home** "Recent Lessons" → no per-lecture recency feed.
- **Assignments** "Available" state → `GET /missions` returns missions the caller *authored*, so a student cannot list assignments open to them; only their own submissions (`GET /me/submissions`) are listable.
- **Certificates** → no certificates endpoint; certificates are projected from COMPLETED enrollments and the enrollment id is the credential reference.
- **Notifications** → no notifications endpoint (the Flutter app ships the same empty shell); the screen renders its designed empty state and `lib/notifications.ts` is the single seam to wire `GET /notifications`.
