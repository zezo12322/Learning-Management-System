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
}

export const dictionaries: Record<Locale, Dict> = { en, ar }
