// Domain types mirrored from backend/API_DOCUMENTATION.md

export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
export type EnrollmentStatus = 'ACTIVE' | 'COMPLETED' | 'DROPPED'
export type LectureType = 'VIDEO' | 'READING' | 'INTERACTIVE' | 'QUIZ'
export type Role = 'student' | 'instructor' | 'admin'

export interface Category {
  id: string
  name: string
  description?: string
}

export interface AuthorRef {
  name: string
  avatar?: string | null
}

/** Course card (catalog / popular / recommended / search). */
export interface CourseCard {
  id: string
  title: string
  description?: string
  price: number // minor units (cents)
  language?: string
  level: CourseLevel
  thumbnail?: string | null
  avgRating?: number
  ratingCount?: number
  tags?: string[]
  category?: { name: string }
  author?: AuthorRef
}

export interface Lecture {
  id: string
  title: string
  type: LectureType
  duration: number // seconds
  order: number
  isFreePreview: boolean
  content?: string | null
  videoUrl?: string | null
  transcriptUrl?: string | null
}

export interface Section {
  id: string
  title: string
  order: number
  lectures: Lecture[]
}

export interface RatingSummary {
  average: number
  count: number
  distribution: Record<string, number>
}

export interface Curriculum {
  id: string
  title: string
  description?: string
  language?: string
  sections: Section[]
  ratingSummary: RatingSummary
}

export interface ContinueLearningItem {
  enrollmentId: string
  status: EnrollmentStatus
  enrolledAt: string
  completedAt: string | null
  course: CourseCard
  totalLessons: number
  completedLessons: number
  percentage: number
}

export interface Enrollment {
  id: string
  status: EnrollmentStatus
  completedAt?: string | null
  alreadyEnrolled?: boolean
  reactivated?: boolean
}

export interface CourseProgress {
  totalLectures: number
  completedLectures: number
  overallPercentage: number
  sections: {
    sectionId: string
    sectionTitle: string
    totalLectures: number
    completedLectures: number
    percentage: number
  }[]
}

export interface Review {
  rating: number
  review: string
  createdAt: string
  updatedAt?: string
  user: { name: string; avatar?: string | null }
}

export interface UserProfile {
  bio?: string
  company?: string
  phone?: string
  preferences?: Record<string, unknown>
}

export interface Me {
  uid: string
  email: string
  name: string
  avatar?: string | null
  profile?: UserProfile
  roles: Role[]
}

export type CourseLifecycleStatus = 'DRAFT' | 'IN_REVIEW' | 'PUBLISHED' | 'ARCHIVED'
export type UploadAssetState = 'QUEUED' | 'UPLOADING' | 'PROCESSING' | 'READY' | 'ERROR'

export interface AuthoringCourse {
  id: string
  title: string
  description: string
  category: string
  level: CourseLevel
  language: string
  status: CourseLifecycleStatus
  progress: number
  lessonCount: number
  durationMinutes: number
  students: number
  updatedAt: string
  price?: number
  tags?: string[]
  thumbnail?: string | null
  categoryId?: string
  sections?: AuthoringSection[]
}

export interface AuthoringSection {
  id: string
  title: string
  order: number
  lectures: Lecture[]
}

export interface UploadAsset {
  id: string
  name: string
  sizeLabel: string
  state: UploadAssetState
  progress: number
  mimeType: string
  lectureId?: string
}

export interface SignedUpload {
  uploadUrl: string
  downloadUrl: string
  storagePath: string
}

export type UploadEntityType = 'COURSE_THUMBNAIL' | 'LECTURE_VIDEO' | 'LECTURE_TRANSCRIPT'

export interface AIAvailability {
  available: boolean
  reason?: 'NOT_CONFIGURED' | 'UNREACHABLE'
  provider?: string
}

// ── Quizzes (authoring) ──────────────────────────────────────────────
export interface QuizOption {
  id?: string
  text: string
  isCorrect: boolean
}

export interface QuizQuestion {
  id: string
  questionText: string
  points: number
  explanation?: string
  order: number
  options: QuizOption[]
}

export interface QuizSettings {
  passingScore: number
  maxAttempts: number
  timeLimitMinutes?: number
}

export interface Quiz extends QuizSettings {
  id: string
  lectureId: string
  questions: QuizQuestion[]
}
