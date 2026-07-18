/**
 * Translation dictionaries for the web app. One flat-ish namespaced object per
 * locale; keys are dot-paths resolved by `t()`. English is the reference set —
 * every key present in `en` should also exist in `ar`.
 *
 * Migration note: surfaces are converted to `t(...)` incrementally. Newly
 * translated strings get a key here (both locales) rather than being hard-coded.
 */
export type Locale = 'en' | 'ar'

export const LOCALES: Locale[] = ['en', 'ar']
export const DEFAULT_LOCALE: Locale = 'en'
export const RTL_LOCALES: Locale[] = ['ar']

type Dict = Record<string, string>

const en: Dict = {
  'lang.name': 'English',
  'lang.switchTo': 'العربية',

  'nav.overview': 'Overview',
  'nav.courses': 'Courses',
  'nav.catalog': 'Catalog',
  'nav.saved': 'Saved',
  'nav.uploads': 'Uploads',
  'nav.profile': 'Profile',
  'nav.aiStudio': 'AI Studio',
  'nav.signOut': 'Sign out',

  'workspace.admin': 'Admin workspace',
  'workspace.instructor': 'Instructor workspace',
  'workspace.learning': 'Learning workspace',
  'workspace.default': 'Workspace',

  'saved.title': 'Saved courses',
  'saved.clearAll': 'Clear all',
  'saved.empty': 'No saved courses yet.',
  'saved.emptyHint': 'Tap the bookmark icon on any course to add it here.',
  'saved.gone': 'Your saved courses are no longer available in the catalog.',

  'save.add': 'Save course',
  'save.remove': 'Remove from saved',

  'common.reviews': 'reviews',
  'common.loading': 'Loading…',

  'level.BEGINNER': 'Beginner',
  'level.INTERMEDIATE': 'Intermediate',
  'level.ADVANCED': 'Advanced',

  // Auth — login
  'auth.welcomeBack': 'Welcome back',
  'auth.signInSubtitle': 'Sign in to continue building and publishing courses.',
  'auth.configError': 'Authentication configuration is unavailable. Contact the workspace administrator.',
  'auth.continueGoogle': 'Continue with Google',
  'auth.or': 'OR',
  'auth.email': 'Email address',
  'auth.password': 'Password',
  'auth.forgot': 'Forgot password?',
  'auth.rememberMe': 'Remember me',
  'auth.signIn': 'Sign in',
  'auth.newToOptima': 'New to Optima?',
  'auth.createAccount': 'Create an account',
  'auth.secureFooter': 'Secure workspace · Your course data stays private',
  'auth.togglePassword': 'Toggle password visibility',
  'auth.err.signIn': 'We could not sign you in. Check your email and password.',
  'auth.err.emailFirst': 'Enter your email address first, then request a password reset.',
  'auth.err.resetFailed': 'We could not send password reset instructions right now.',
  'auth.err.googleUnavailable': 'Google sign-in is currently unavailable.',
  'auth.notice.resetSent': 'Password reset instructions were sent if an account exists for this email.',
  'auth.val.email': 'Enter a valid email address.',
  'auth.val.passwordRequired': 'Password is required.',
  // Auth — hero panel
  'auth.hero.eyebrow': 'THE COMPLETE LMS WORKSPACE',
  'auth.hero.title1': 'Build courses faster.',
  'auth.hero.title2': 'Teach with confidence.',
  'auth.hero.subtitle': 'Create, upload, and publish structured learning experiences. AI tools will be introduced in a future release.',
  'auth.hero.footer': 'Built for instructors, reviewers, and learners.',
  'auth.value.builder.title': 'Course builder',
  'auth.value.builder.body': 'Structure sections, lessons, and resources.',
  'auth.value.video.title': 'Reliable video flow',
  'auth.value.video.body': 'Track upload and transcoding end to end.',
  'auth.value.ai.title': 'AI tools',
  'auth.value.ai.body': 'Course generation and tutor experiences are coming soon.',

  // Auth — register
  'reg.title': 'Create your account',
  'reg.subtitle': 'Join Optima and start learning or building courses.',
  'reg.fullName': 'Full name',
  'reg.nationalId': 'National ID',
  'reg.createAccount': 'Create account',
  'reg.haveAccount': 'Already have an account?',
  'reg.err.generic': 'We could not create your account.',
  'reg.val.name': 'Enter your full name.',
  'reg.val.nationalId': 'The national ID must contain 14 digits.',
  'reg.val.pwLen': 'Use at least 8 characters.',
  'reg.val.pwUpper': 'Include one uppercase letter.',
  'reg.val.pwNum': 'Include one number.',
}

const ar: Dict = {
  'lang.name': 'العربية',
  'lang.switchTo': 'English',

  'nav.overview': 'الرئيسية',
  'nav.courses': 'دوراتي',
  'nav.catalog': 'الكتالوج',
  'nav.saved': 'المحفوظة',
  'nav.uploads': 'الرفع',
  'nav.profile': 'الملف الشخصي',
  'nav.aiStudio': 'استوديو الذكاء',
  'nav.signOut': 'تسجيل الخروج',

  'workspace.admin': 'مساحة الإدارة',
  'workspace.instructor': 'مساحة المدرّب',
  'workspace.learning': 'مساحة التعلّم',
  'workspace.default': 'مساحة العمل',

  'saved.title': 'الدورات المحفوظة',
  'saved.clearAll': 'مسح الكل',
  'saved.empty': 'لا توجد دورات محفوظة بعد.',
  'saved.emptyHint': 'اضغط على أيقونة الحفظ على أي دورة لإضافتها هنا.',
  'saved.gone': 'الدورات المحفوظة لم تعد متاحة في الكتالوج.',

  'save.add': 'حفظ الدورة',
  'save.remove': 'إزالة من المحفوظات',

  'common.reviews': 'تقييم',
  'common.loading': 'جارٍ التحميل…',

  'level.BEGINNER': 'مبتدئ',
  'level.INTERMEDIATE': 'متوسط',
  'level.ADVANCED': 'متقدم',

  // Auth — login
  'auth.welcomeBack': 'مرحبًا بعودتك',
  'auth.signInSubtitle': 'سجّل الدخول لمتابعة بناء ونشر الدورات.',
  'auth.configError': 'إعدادات المصادقة غير متاحة. تواصل مع مسؤول المنصّة.',
  'auth.continueGoogle': 'المتابعة عبر Google',
  'auth.or': 'أو',
  'auth.email': 'البريد الإلكتروني',
  'auth.password': 'كلمة المرور',
  'auth.forgot': 'نسيت كلمة المرور؟',
  'auth.rememberMe': 'تذكّرني',
  'auth.signIn': 'تسجيل الدخول',
  'auth.newToOptima': 'جديد على Optima؟',
  'auth.createAccount': 'أنشئ حسابًا',
  'auth.secureFooter': 'مساحة آمنة · بيانات دوراتك تبقى خاصة',
  'auth.togglePassword': 'إظهار/إخفاء كلمة المرور',
  'auth.err.signIn': 'تعذّر تسجيل دخولك. تأكّد من البريد وكلمة المرور.',
  'auth.err.emailFirst': 'أدخل بريدك الإلكتروني أولًا ثم اطلب إعادة تعيين كلمة المرور.',
  'auth.err.resetFailed': 'تعذّر إرسال تعليمات إعادة التعيين الآن.',
  'auth.err.googleUnavailable': 'تسجيل الدخول عبر Google غير متاح حاليًا.',
  'auth.notice.resetSent': 'تم إرسال تعليمات إعادة التعيين إذا كان هناك حساب لهذا البريد.',
  'auth.val.email': 'أدخل بريدًا إلكترونيًا صحيحًا.',
  'auth.val.passwordRequired': 'كلمة المرور مطلوبة.',
  // Auth — hero panel
  'auth.hero.eyebrow': 'مساحة عمل LMS المتكاملة',
  'auth.hero.title1': 'ابنِ الدورات أسرع.',
  'auth.hero.title2': 'وعلّم بثقة.',
  'auth.hero.subtitle': 'أنشئ وارفع وانشر تجارب تعليمية منظّمة. أدوات الذكاء الاصطناعي قادمة في إصدار لاحق.',
  'auth.hero.footer': 'مصمّمة للمدرّبين والمراجعين والمتعلّمين.',
  'auth.value.builder.title': 'مُنشئ الدورات',
  'auth.value.builder.body': 'رتّب الأقسام والدروس والموارد.',
  'auth.value.video.title': 'تدفّق فيديو موثوق',
  'auth.value.video.body': 'تابِع الرفع والترميز من البداية للنهاية.',
  'auth.value.ai.title': 'أدوات الذكاء الاصطناعي',
  'auth.value.ai.body': 'توليد الدورات وتجارب المدرّس قادمة قريبًا.',

  // Auth — register
  'reg.title': 'أنشئ حسابك',
  'reg.subtitle': 'انضمّ إلى Optima وابدأ التعلّم أو بناء الدورات.',
  'reg.fullName': 'الاسم الكامل',
  'reg.nationalId': 'الرقم القومي',
  'reg.createAccount': 'إنشاء الحساب',
  'reg.haveAccount': 'لديك حساب بالفعل؟',
  'reg.err.generic': 'تعذّر إنشاء حسابك.',
  'reg.val.name': 'أدخل اسمك الكامل.',
  'reg.val.nationalId': 'الرقم القومي يجب أن يتكوّن من 14 رقمًا.',
  'reg.val.pwLen': 'استخدم 8 أحرف على الأقل.',
  'reg.val.pwUpper': 'أضِف حرفًا كبيرًا واحدًا على الأقل.',
  'reg.val.pwNum': 'أضِف رقمًا واحدًا على الأقل.',
}

export const dictionaries: Record<Locale, Dict> = { en, ar }
