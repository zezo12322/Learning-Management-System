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
    /** Per-lecture completion, so a curriculum list can mark finished lessons. */
    lectures: { lectureId: string; completedAt: string | null }[]
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

/** Instructor course-overview analytics (GET /courses/:courseId/overview). */
export interface CourseOverview {
  course: {
    id: string
    title: string
    description: string | null
    price: number
    status: string
    language: string
    level: string
    thumbnail: string | null
    tags: string[]
    category: { id: string; name: string } | null
    author: { id: string; name: string; email: string; avatar: string | null } | null
    createdAt: string
    updatedAt: string
  }
  instructors: Array<{ id: string; name: string; email: string; avatar: string | null }>
  content: {
    totalSections: number
    totalLectures: number
    lecturesByType: { VIDEO: number; READING: number; INTERACTIVE: number; QUIZ: number }
    totalQuizzes: number
    totalDurationSeconds: number
  }
  assignments: {
    total: number
    submissions: {
      total: number
      byStatus: { PENDING: number; GRADED: number; RETURNED: number; REJECTED: number }
    }
  }
  enrollments: {
    total: number
    byStatus: { ACTIVE: number; COMPLETED: number; DROPPED: number; SUSPENDED: number }
  }
  progress: {
    activeLearners: number
    averageCompletionPercent: number
    fullyCompletedLearners: number
    completionRatePercent: number
  }
  ratings: {
    average: number
    count: number
    distribution: { 1: number; 2: number; 3: number; 4: number; 5: number }
  }
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

/**
 * Why a queued upload failed. A code rather than a sentence, so one shared
 * error string cannot describe every file and so the message is translated at
 * render time. `CANCELLED` is a user action, not a fault: it is reported as
 * state 'ERROR' with this code, which keeps UploadAssetState unchanged for the
 * exhaustive maps that already switch on it.
 */
export type UploadErrorCode =
  | 'UNSUPPORTED_TYPE'
  | 'NO_LECTURE'
  | 'STORAGE_REJECTED'
  | 'NETWORK'
  | 'TOO_LARGE'
  | 'CANCELLED'

export interface UploadAsset {
  id: string
  name: string
  sizeLabel: string
  state: UploadAssetState
  progress: number
  mimeType: string
  lectureId?: string
  /** Real byte counters from XHR upload.onprogress (absent for stored assets). */
  transferredBytes?: number
  totalBytes?: number
  /** Set only while `state` is 'ERROR'. */
  errorCode?: UploadErrorCode
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

// ── Quizzes (taking) ─────────────────────────────────────────────────
export interface TakeOption {
  id: string
  text: string
}

export interface TakeQuestion {
  id: string
  questionText: string
  points: number
  options: TakeOption[]
}

export interface TakeQuiz {
  id: string
  timeLimitMinutes?: number
  questions: TakeQuestion[]
}

export interface QuizResult {
  score: number
  passed: boolean
  totalQuestions: number
  correctCount: number
  answeredCount: number
}

// ── Assignments (mission submissions) ────────────────────────────────
export type SubmissionStatus = 'PENDING' | 'GRADED' | 'RETURNED' | 'REJECTED'

/**
 * One row of GET /me/submissions — the student's own assignment work.
 * Shape follows the `MySubmissions` Data Connect query
 * (dataconnect/default/missions.gql): the mission is embedded and the rubric
 * scores arrive per criterion, so the totals below are summed client-side.
 */
export interface MySubmission {
  id: string
  /** The mission this answers — needed to group attempts by assignment. */
  missionId: string
  title: string
  difficulty?: string
  fileUrl: string
  status: SubmissionStatus
  feedback?: string | null
  submittedAt: string
  attemptNumber: number
  /** Per-criterion rubric scores (empty until an instructor grades it). */
  scores: { criterionName: string; score: number; maxPoints: number }[]
  /** Sum of `scores`, or null when the submission has not been graded. */
  totalScore: number | null
  /** Sum of the rubric's `maxPoints`, or null when no rubric was scored. */
  maxPoints: number | null
}

export type MissionDifficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'

/** One rubric criterion an assignment is marked against. */
export interface RubricCriterion {
  id: string
  name: string
  description?: string
  maxPoints: number
  order: number
}

/**
 * One row of GET /me/assignments — an assignment open to the signed-in learner,
 * with the rubric it will be marked against and their own attempts so far.
 */
export interface MyAssignment {
  id: string
  title: string
  scenario: string
  durationMinutes: number
  difficulty: string
  skills: string[]
  createdAt: string
  course: { id: string; title: string } | null
  criteria: RubricCriterion[]
  /** Sum of the rubric's `maxPoints`; 0 when the author set no rubric. */
  totalPoints: number
  attempts: Array<{
    id: string
    status: SubmissionStatus
    submittedAt: string
    attemptNumber: number
    feedback?: string | null
  }>
  /**
   * The learner's enrollment in this mission, which is separate from the course
   * enrollment and is what the API requires before accepting a submission.
   * `null` means they have not joined the assignment yet.
   */
  missionEnrollmentStatus: string | null
}

/** An assignment as its author manages it (GET /missions, GET /missions/:id). */
export interface AuthoredMission {
  id: string
  title: string
  scenario: string
  durationMinutes: number
  difficulty: MissionDifficulty
  skills: string[]
  categoryId?: string
  categoryName?: string
  course: { id: string; title: string } | null
  criteria: RubricCriterion[]
  updatedAt: string
}

/** One row of the instructor's grading queue (GET /submissions/pending). */
export interface PendingSubmission {
  id: string
  missionId: string
  missionTitle: string
  difficulty?: string
  courseTitle?: string
  studentName: string
  studentEmail: string
  fileUrl: string
  submittedAt: string
  attemptNumber: number
}

// ── Certificates ─────────────────────────────────────────────────────
/**
 * A completion certificate. The backend has no certificates endpoint yet, so
 * these are derived from COMPLETED enrollments — the enrollment id doubles as
 * the credential reference because it is the stable server-side identifier for
 * "this learner finished this course".
 */
export interface Certificate {
  enrollmentId: string
  course: CourseCard
  completedAt: string
  totalLessons: number
  credentialId: string
}
