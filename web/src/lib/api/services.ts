import { apiClient } from './client'
import type {
  AuthoringCourse,
  AuthoringSection,
  Category,
  ContinueLearningItem,
  CourseCard,
  CourseLevel,
  CourseProgress,
  Curriculum,
  Enrollment,
  Lecture,
  LectureType,
  Me,
  RatingSummary,
  Review,
  Role,
  SignedUpload,
  UploadEntityType,
  Quiz,
  QuizOption,
  QuizQuestion,
  QuizSettings,
} from '@/lib/types'

type JsonObject = Record<string, unknown>

const objectValue = (value: unknown): JsonObject =>
  value && typeof value === 'object' && !Array.isArray(value) ? (value as JsonObject) : {}

const stringValue = (value: unknown, fallback = '') =>
  typeof value === 'string' ? value : fallback

const numberValue = (value: unknown, fallback = 0) =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback

const arrayValue = (value: unknown): unknown[] => (Array.isArray(value) ? value : [])

function mutationEntity(payload: unknown, keys: string[]): JsonObject {
  const root = objectValue(payload)
  for (const key of keys) {
    const candidate = objectValue(root[key])
    if (Object.keys(candidate).length) return candidate
  }
  return root
}

function mapLecture(value: unknown, index: number): Lecture {
  const raw = objectValue(value)
  return {
    id: stringValue(raw.id),
    title: stringValue(raw.title, 'Untitled lesson'),
    type: stringValue(raw.type, 'READING') as LectureType,
    duration: numberValue(raw.duration),
    order: numberValue(raw.order, index + 1),
    isFreePreview: Boolean(raw.isFreePreview),
    content: typeof raw.content === 'string' ? raw.content : null,
    videoUrl: typeof raw.videoUrl === 'string' ? raw.videoUrl : null,
    transcriptUrl: typeof raw.transcriptUrl === 'string' ? raw.transcriptUrl : null,
  }
}

function mapSection(value: unknown, index: number): AuthoringSection {
  const raw = objectValue(value)
  const lectures = raw.adminLectures ?? raw.publishedLectures ?? raw.lectures
  return {
    id: stringValue(raw.id),
    title: stringValue(raw.title, 'Untitled section'),
    order: numberValue(raw.order, index + 1),
    lectures: arrayValue(lectures).map(mapLecture),
  }
}

function mapCourseCard(value: unknown): CourseCard {
  const raw = objectValue(value)
  const category = objectValue(raw.category)
  const author = objectValue(raw.author)
  return {
    id: stringValue(raw.id),
    title: stringValue(raw.title, 'Untitled course'),
    description: stringValue(raw.description) || undefined,
    price: numberValue(raw.price),
    language: stringValue(raw.language) || undefined,
    level: stringValue(raw.level, 'BEGINNER') as CourseLevel,
    thumbnail: typeof raw.thumbnail === 'string' ? raw.thumbnail : null,
    avgRating: numberValue(raw.avgRating),
    ratingCount: numberValue(raw.ratingCount),
    tags: arrayValue(raw.tags).filter((tag): tag is string => typeof tag === 'string'),
    category: stringValue(category.name) ? { name: stringValue(category.name) } : undefined,
    author: stringValue(author.name)
      ? { name: stringValue(author.name), avatar: typeof author.avatar === 'string' ? author.avatar : null }
      : undefined,
  }
}

function mapAuthoringCourse(value: unknown): AuthoringCourse {
  const raw = objectValue(value)
  const category = objectValue(raw.category)
  const sections = arrayValue(raw.adminSections ?? raw.sections).map(mapSection)
  const lessonCount = sections.reduce((total, section) => total + section.lectures.length, 0)
  const durationMinutes = Math.ceil(
    sections.flatMap((section) => section.lectures).reduce((total, lecture) => total + lecture.duration, 0) / 60
  )
  const readiness = [raw.title, raw.description, raw.category, raw.level, raw.language]
  return {
    id: stringValue(raw.id),
    title: stringValue(raw.title, 'Untitled course'),
    description: stringValue(raw.description),
    category: stringValue(category.name, 'Uncategorized'),
    categoryId: stringValue(category.id) || undefined,
    level: stringValue(raw.level, 'BEGINNER') as CourseLevel,
    language: stringValue(raw.language, 'English'),
    status: stringValue(raw.status, 'DRAFT') as AuthoringCourse['status'],
    progress: Math.round((readiness.filter(Boolean).length / readiness.length) * 100),
    lessonCount,
    durationMinutes,
    students: numberValue(raw.students),
    updatedAt: stringValue(raw.updatedAt, 'Not available'),
    price: numberValue(raw.price),
    tags: arrayValue(raw.tags).filter((tag): tag is string => typeof tag === 'string'),
    thumbnail: typeof raw.thumbnail === 'string' ? raw.thumbnail : null,
    sections,
  }
}

function mapMe(value: unknown): Me | null {
  if (!value) return null
  const raw = objectValue(value)
  const profile = objectValue(raw.profile_on_user ?? raw.profile)
  const roleRows = arrayValue(raw.userRoles_on_user ?? raw.roles)
  const roles = roleRows
    .map((item) => {
      if (typeof item === 'string') return item.toLowerCase()
      return stringValue(objectValue(objectValue(item).role).name).toLowerCase()
    })
    .filter((role): role is Role => ['student', 'instructor', 'admin'].includes(role))
  return {
    uid: stringValue(raw.id ?? raw.uid),
    email: stringValue(raw.email),
    name: stringValue(raw.name),
    avatar: typeof raw.avatar === 'string' ? raw.avatar : null,
    profile: {
      bio: stringValue(profile.bio) || undefined,
      company: stringValue(profile.company) || undefined,
      phone: stringValue(profile.phone) || undefined,
      preferences: objectValue(profile.syncedPreferences ?? profile.preferences),
    },
    roles,
  }
}

export const meApi = {
  get: () => apiClient.get('/me').then((response) => mapMe(response.data)),
  sync: (payload: { email: string; name: string; avatar?: string }) =>
    apiClient.post('/me/sync', payload).then((response) => mapMe(response.data)),
  updateProfile: (payload: {
    bio?: string
    company?: string
    phone?: string
    preferences?: Record<string, unknown>
  }) => apiClient.patch('/me/profile', payload).then((response) => response.data),
}

export const catalogApi = {
  list: () => apiClient.get('/catalog/courses').then((response) => arrayValue(response.data).map(mapCourseCard)),
  curriculum: (courseId: string) =>
    apiClient.get(`/catalog/courses/${courseId}/curriculum`).then((response) => {
      const raw = objectValue(response.data)
      const summary = objectValue(raw.ratingSummary)
      return {
        id: stringValue(raw.id),
        title: stringValue(raw.title, 'Untitled course'),
        description: stringValue(raw.description) || undefined,
        language: stringValue(raw.language) || undefined,
        sections: arrayValue(raw.publishedSections ?? raw.sections).map(mapSection),
        ratingSummary: {
          average: numberValue(summary.average),
          count: numberValue(summary.count),
          distribution: objectValue(summary.distribution) as Record<string, number>,
        },
      } satisfies Curriculum
    }),
}

export const coursesApi = {
  categories: () =>
    apiClient.get('/courses/categories').then((response) =>
      arrayValue(response.data).map((value): Category => {
        const raw = objectValue(value)
        return {
          id: stringValue(raw.id),
          name: stringValue(raw.name, 'Unnamed category'),
          description: stringValue(raw.description) || undefined,
        }
      })
    ),
  popular: (limit = 10) =>
    apiClient.get('/courses/popular', { params: { limit } }).then((response) =>
      arrayValue(response.data).map(mapCourseCard)
    ),
  recommended: (limit = 10) =>
    apiClient.get('/courses/recommended', { params: { limit } }).then((response) =>
      arrayValue(response.data).map(mapCourseCard)
    ),
  continueLearning: () =>
    apiClient.get('/courses/continue-learning').then((response) =>
      arrayValue(response.data).map((value): ContinueLearningItem => {
        const raw = objectValue(value)
        return {
          enrollmentId: stringValue(raw.enrollmentId),
          status: stringValue(raw.status, 'ACTIVE') as ContinueLearningItem['status'],
          enrolledAt: stringValue(raw.enrolledAt),
          completedAt: typeof raw.completedAt === 'string' ? raw.completedAt : null,
          course: mapCourseCard(raw.course),
          totalLessons: numberValue(raw.totalLessons),
          completedLessons: numberValue(raw.completedLessons),
          percentage: numberValue(raw.percentage),
        }
      })
    ),
  search: (query: string) =>
    apiClient.get('/courses/search', { params: { q: query } }).then((response) =>
      arrayValue(response.data).map(mapCourseCard)
    ),
}

export const enrollmentApi = {
  enroll: (courseId: string) =>
    apiClient.post(`/courses/${courseId}/enroll`).then((response): Enrollment => {
      const raw = objectValue(response.data)
      const inserted = objectValue(raw.enrollment_insert ?? raw.enrollmentInsert)
      return {
        id: stringValue(raw.id ?? inserted.id),
        status: stringValue(raw.status, 'ACTIVE') as Enrollment['status'],
        completedAt: typeof raw.completedAt === 'string' ? raw.completedAt : null,
        alreadyEnrolled: Boolean(raw.alreadyEnrolled),
        reactivated: Boolean(raw.reactivated),
      }
    }),
  get: (courseId: string) =>
    apiClient.get<Enrollment | null>(`/courses/${courseId}/enrollment`).then((response) => response.data),
}

export const progressApi = {
  course: (courseId: string) =>
    apiClient.get<CourseProgress>(`/courses/${courseId}/progress`).then((response) => response.data),
  lecture: (lectureId: string) =>
    apiClient
      .get<{ lastWatchedSecond: number; completedAt: string | null }>(`/lectures/${lectureId}/progress`)
      .then((response) => response.data),
  heartbeat: (lectureId: string, lastWatchedSecond: number, watchedSeconds?: number) =>
    apiClient.post(`/lectures/${lectureId}/progress`, { lastWatchedSecond, watchedSeconds }).then((response) => response.data),
  markComplete: (lectureId: string, lastWatchedSecond = 0) =>
    apiClient.put(`/lectures/${lectureId}/progress`, { lastWatchedSecond, completed: true }).then((response) => response.data),
}

export const ratingsApi = {
  summary: (courseId: string) =>
    apiClient.get<RatingSummary>(`/courses/${courseId}/ratings/summary`).then((response) => response.data),
  list: (courseId: string, limit = 20, offset = 0) =>
    apiClient.get<Review[]>(`/courses/${courseId}/ratings`, { params: { limit, offset } }).then((response) => response.data),
}

export type CourseWritePayload = {
  title: string
  description?: string
  price: number
  language: string
  level: CourseLevel
  categoryId: string
  tags: string[]
  thumbnail?: string
}

export const authoringApi = {
  list: () => apiClient.get('/courses').then((response) => arrayValue(response.data).map(mapAuthoringCourse)),
  get: (courseId: string) =>
    apiClient.get(`/courses/${courseId}`).then((response) => mapAuthoringCourse(response.data)),
  create: (payload: CourseWritePayload) =>
    apiClient.post('/courses', payload).then((response) =>
      mapAuthoringCourse(mutationEntity(response.data, ['course_insert', 'courseInsert', 'course']))
    ),
  update: (courseId: string, payload: Partial<CourseWritePayload>) =>
    apiClient.patch(`/courses/${courseId}`, payload).then((response) =>
      mapAuthoringCourse(mutationEntity(response.data, ['course_update', 'courseUpdate', 'course']))
    ),
  setStatus: (courseId: string, status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED') =>
    apiClient.patch(`/courses/${courseId}/status`, { status }).then((response) => response.data),
  curriculum: (courseId: string) =>
    apiClient.get(`/courses/${courseId}`).then((response) => mapAuthoringCourse(response.data).sections ?? []),
  createSection: (courseId: string, payload: { title: string }) =>
    apiClient.post(`/courses/${courseId}/sections`, payload).then((response) =>
      mapSection(mutationEntity(response.data, ['courseSection_insert', 'courseSectionInsert', 'section_insert', 'sectionInsert', 'section']), 0)
    ),
  updateSection: (courseId: string, sectionId: string, payload: { title: string }) =>
    apiClient.patch(`/courses/${courseId}/sections/${sectionId}`, payload).then((response) => response.data),
  deleteSection: (courseId: string, sectionId: string) =>
    apiClient.delete(`/courses/${courseId}/sections/${sectionId}`).then((response) => response.data),
  reorderSections: (courseId: string, orderedIds: string[]) =>
    apiClient.put(`/courses/${courseId}/sections/reorder`, { orderedIds }).then((response) => response.data),
  createLecture: (
    courseId: string,
    sectionId: string,
    payload: { title: string; type: LectureType; duration?: number; isFreePreview?: boolean; content?: string }
  ) => apiClient.post(`/courses/${courseId}/sections/${sectionId}/lectures`, payload).then((response) =>
    mapLecture(mutationEntity(response.data, ['courseLecture_insert', 'courseLectureInsert', 'lecture_insert', 'lectureInsert', 'lecture']), 0)
  ),
  updateLecture: (courseId: string, sectionId: string, lectureId: string, payload: Record<string, unknown>) =>
    apiClient.patch(`/courses/${courseId}/sections/${sectionId}/lectures/${lectureId}`, payload).then((response) => response.data),
  signedUpload: (payload: {
    entityType: UploadEntityType
    courseId: string
    lectureId?: string
    filename: string
    contentType: string
  }) => apiClient.post<SignedUpload>('/uploads/signed-url', payload).then((response) => response.data),
  confirmUpload: (payload: {
    entityType: UploadEntityType
    courseId: string
    lectureId?: string
    storagePath: string
  }) => apiClient.post<{ downloadUrl: string; storagePath: string; transcode?: { status?: string } }>('/uploads/confirm', payload).then((response) => response.data),
  startTranscode: (courseId: string, lectureId: string, sourcePath: string) =>
    apiClient.post(`/courses/${courseId}/lectures/${lectureId}/video/transcode`, { sourcePath }).then((response) => response.data),
  transcodeStatus: (courseId: string, lectureId: string) =>
    apiClient.get(`/courses/${courseId}/lectures/${lectureId}/video/transcode/status`).then((response) => response.data),
}

// ── Quiz authoring ───────────────────────────────────────────────────
function mapQuizOption(value: unknown): QuizOption {
  const raw = objectValue(value)
  return {
    id: stringValue(raw.id) || undefined,
    text: stringValue(raw.text),
    isCorrect: Boolean(raw.isCorrect),
  }
}

function mapQuizQuestion(value: unknown, index: number): QuizQuestion {
  const raw = objectValue(value)
  return {
    id: stringValue(raw.id),
    questionText: stringValue(raw.questionText),
    points: numberValue(raw.points, 1),
    explanation: stringValue(raw.explanation) || undefined,
    order: numberValue(raw.order, index + 1),
    options: arrayValue(raw.adminOptions ?? raw.options).map(mapQuizOption),
  }
}

function mapQuiz(value: unknown): Quiz {
  const raw = objectValue(value)
  return {
    id: stringValue(raw.id),
    lectureId: stringValue(objectValue(raw.lecture).id),
    passingScore: numberValue(raw.passingScore),
    maxAttempts: numberValue(raw.maxAttempts, 1),
    timeLimitMinutes:
      typeof raw.timeLimitMinutes === 'number' ? raw.timeLimitMinutes : undefined,
    questions: arrayValue(raw.adminQuestions ?? raw.questions).map(mapQuizQuestion),
  }
}

export interface QuestionInput {
  questionText: string
  points?: number
  explanation?: string
  options: QuizOption[]
}

export const quizApi = {
  /** Load a quiz (settings + questions + options) by id — authoring view. */
  get: (courseId: string, quizId: string) =>
    apiClient
      .get(`/courses/${courseId}/quizzes/${quizId}`)
      .then((response) => mapQuiz(response.data)),

  /** Create the quiz shell on a QUIZ-type lecture; returns the new quiz id. */
  create: (courseId: string, lectureId: string, settings: QuizSettings) =>
    apiClient
      .post(`/courses/${courseId}/lectures/${lectureId}/quiz`, settings)
      .then((response) =>
        stringValue(
          mutationEntity(response.data, [
            'courseQuiz_insert',
            'courseQuizInsert',
            'quiz_insert',
            'quiz',
          ]).id,
        ),
      ),

  updateSettings: (courseId: string, quizId: string, settings: Partial<QuizSettings>) =>
    apiClient
      .patch(`/courses/${courseId}/quizzes/${quizId}`, settings)
      .then((response) => response.data),

  createQuestion: (courseId: string, quizId: string, question: QuestionInput) =>
    apiClient
      .post(`/courses/${courseId}/quizzes/${quizId}/questions`, question)
      .then((response) => response.data),

  updateQuestion: (
    courseId: string,
    quizId: string,
    questionId: string,
    question: Partial<QuestionInput>,
  ) =>
    apiClient
      .patch(
        `/courses/${courseId}/quizzes/${quizId}/questions/${questionId}`,
        question,
      )
      .then((response) => response.data),

  deleteQuestion: (courseId: string, quizId: string, questionId: string) =>
    apiClient
      .delete(`/courses/${courseId}/quizzes/${quizId}/questions/${questionId}`)
      .then((response) => response.data),
}
