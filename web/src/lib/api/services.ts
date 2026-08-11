import { apiBaseUrl, apiClient } from './client'
import { safeLinkUrl } from '@/lib/safeUrl'
import type {
  AuthoredMission,
  Category,
  Certificate,
  ContinueLearningItem,
  CourseLevel,
  MissionDifficulty,
  MyAssignment,
  MySubmission,
  PendingSubmission,
  RubricCriterion,
  SubmissionStatus,
  CourseProgress,
  Curriculum,
  Enrollment,
  LectureType,
  RatingSummary,
  Review,
  SignedUpload,
  UploadEntityType,
  Quiz,
  QuizOption,
  QuizQuestion,
  QuizResult,
  QuizSettings,
  TakeQuestion,
  TakeQuiz,
} from '@/lib/types'
import {
  arrayValue,
  mapAuthoringCourse,
  mapCourseCard,
  mapCourseOverview,
  mapLecture,
  mapMe,
  mapSection,
  mutationEntity,
  numberValue,
  objectValue,
  stringValue,
} from './mappers'

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

// Instructor course-overview analytics (KAN-51). Consumes the backend
// aggregation at GET /courses/:courseId/overview (owner/admin-scoped).
export const analyticsApi = {
  courseOverview: (courseId: string) =>
    apiClient.get(`/courses/${courseId}/overview`).then((response) => mapCourseOverview(response.data)),
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

// ── Assignments (student view of mission submissions) ────────────────
function mapSubmission(value: unknown): MySubmission {
  const raw = objectValue(value)
  const mission = objectValue(raw.mission)
  const scores = arrayValue(
    raw.missionSubmissionScores_on_submission ?? raw.scores,
  ).map((entry) => {
    const rawScore = objectValue(entry)
    const criterion = objectValue(rawScore.criterion)
    return {
      criterionName: stringValue(criterion.criterionName ?? rawScore.criterionId),
      score: numberValue(rawScore.score),
      maxPoints: numberValue(criterion.maxPoints),
    }
  })
  const graded = scores.length > 0
  return {
    id: stringValue(raw.id),
    missionId: stringValue(mission.id ?? raw.missionId),
    title: stringValue(mission.title ?? raw.title, 'Assignment'),
    difficulty: stringValue(mission.difficulty) || undefined,
    fileUrl: stringValue(raw.fileUrl),
    status: (stringValue(raw.status, 'PENDING') as SubmissionStatus) || 'PENDING',
    feedback: typeof raw.feedback === 'string' ? raw.feedback : null,
    submittedAt: stringValue(raw.submittedAt),
    attemptNumber: numberValue(raw.attemptNumber, 1),
    scores,
    totalScore: graded ? scores.reduce((sum, entry) => sum + entry.score, 0) : null,
    maxPoints: graded ? scores.reduce((sum, entry) => sum + entry.maxPoints, 0) : null,
  }
}

export function mapRubricCriterion(value: unknown, index = 0): RubricCriterion {
  const raw = objectValue(value)
  return {
    id: stringValue(raw.id),
    name: stringValue(raw.criterionName ?? raw.name, 'Criterion'),
    description: stringValue(raw.description) || undefined,
    maxPoints: numberValue(raw.maxPoints),
    order: numberValue(raw.order, index + 1),
  }
}

function mapMyAssignment(value: unknown): MyAssignment {
  const raw = objectValue(value)
  const course = objectValue(raw.course)
  const criteria = arrayValue(raw.criteria).map(mapRubricCriterion)
  const attempts = arrayValue(raw.mySubmissions).map((entry) => {
    const rawAttempt = objectValue(entry)
    return {
      id: stringValue(rawAttempt.id),
      status: (stringValue(rawAttempt.status, 'PENDING') as SubmissionStatus) || 'PENDING',
      submittedAt: stringValue(rawAttempt.submittedAt),
      attemptNumber: numberValue(rawAttempt.attemptNumber, 1),
      feedback: typeof rawAttempt.feedback === 'string' ? rawAttempt.feedback : null,
    }
  })
  // The mission enrollment is a separate record from the course enrollment, and
  // the API refuses a submission without an ACTIVE one — so the UI has to know
  // whether it must join the assignment first.
  const enrollment = objectValue(arrayValue(raw.myMissionEnrollments)[0])
  return {
    id: stringValue(raw.id),
    title: stringValue(raw.title, 'Assignment'),
    scenario: stringValue(raw.scenarioDescription),
    durationMinutes: numberValue(raw.durationMinutes),
    difficulty: stringValue(raw.difficulty, 'INTERMEDIATE'),
    skills: arrayValue(raw.skillsTested).filter((skill): skill is string => typeof skill === 'string'),
    createdAt: stringValue(raw.createdAt),
    course: stringValue(course.id) ? { id: stringValue(course.id), title: stringValue(course.title) } : null,
    criteria,
    totalPoints: criteria.reduce((sum, criterion) => sum + criterion.maxPoints, 0),
    attempts,
    missionEnrollmentStatus: stringValue(enrollment.status) || null,
  }
}

export const submissionsApi = {
  /** The signed-in student's own assignment submissions, newest first. */
  mine: () =>
    apiClient.get('/me/submissions').then((response) => arrayValue(response.data).map(mapSubmission)),

  /**
   * Assignments open to the signed-in learner (API_DOCUMENTATION §16). Every
   * mission on a course they are enrolled in, with its rubric and their own
   * attempts — the only way a learner can obtain a `missionId`, since the
   * mission-authoring routes are owner-only.
   */
  myAssignments: () =>
    apiClient.get('/me/assignments').then((response) => arrayValue(response.data).map(mapMyAssignment)),

  /**
   * Hand in an assignment.
   *
   * `fileUrl` is a link, not an upload: `POST /uploads/signed-url` is
   * instructor/admin-only, so there is no learner-facing storage path in this
   * API. The submit form asks for a link to the work and validates it before it
   * is sent.
   */
  submit: (missionId: string, fileUrl: string) =>
    apiClient
      .post(`/missions/${missionId}/submissions`, { fileUrl })
      .then((response) =>
        stringValue(
          mutationEntity(response.data, [
            'missionSubmission_insert',
            'missionSubmissionInsert',
            'submission',
          ]).id,
        ),
      ),
}

// ── Grading (instructor) ─────────────────────────────────────────────
function mapPendingSubmission(value: unknown): PendingSubmission {
  const raw = objectValue(value)
  const mission = objectValue(raw.mission)
  const course = objectValue(mission.course)
  const student = objectValue(raw.student)
  return {
    id: stringValue(raw.id),
    missionId: stringValue(mission.id),
    missionTitle: stringValue(mission.title, 'Assignment'),
    difficulty: stringValue(mission.difficulty) || undefined,
    courseTitle: stringValue(course.title) || undefined,
    studentName: stringValue(student.name, 'Learner'),
    studentEmail: stringValue(student.email),
    fileUrl: stringValue(raw.fileUrl),
    submittedAt: stringValue(raw.submittedAt),
    attemptNumber: numberValue(raw.attemptNumber, 1),
  }
}

export const gradingApi = {
  /** Submissions awaiting a grade, scoped server-side to missions I own. */
  pending: () =>
    apiClient
      .get('/submissions/pending')
      .then((response) => arrayValue(response.data).map(mapPendingSubmission)),

  /**
   * Grade a submission. Both fields are optional server-side, but the server
   * rejects a score above its criterion's `maxPoints` and any criterion that
   * does not belong to the mission — so the form only offers the mission's own
   * rubric and caps each input.
   */
  grade: (submissionId: string, payload: { feedback?: string; scores?: { criterionId: string; score: number }[] }) =>
    apiClient.post(`/submissions/${submissionId}/grade`, payload).then((response) => response.data),
}

// ── Assignment authoring (missions) ──────────────────────────────────
export type MissionWritePayload = {
  title: string
  scenarioDescription: string
  durationMinutes: number
  categoryId: string
  difficulty: MissionDifficulty
  skillsTested: string[]
  courseId?: string
}

function mapAuthoredMission(value: unknown): AuthoredMission {
  const raw = objectValue(value)
  const category = objectValue(raw.category)
  const course = objectValue(raw.course)
  return {
    id: stringValue(raw.id),
    title: stringValue(raw.title, 'Untitled assignment'),
    scenario: stringValue(raw.scenarioDescription),
    durationMinutes: numberValue(raw.durationMinutes),
    difficulty: (stringValue(raw.difficulty, 'INTERMEDIATE') as MissionDifficulty) || 'INTERMEDIATE',
    skills: arrayValue(raw.skillsTested).filter((skill): skill is string => typeof skill === 'string'),
    categoryId: stringValue(category.id) || undefined,
    categoryName: stringValue(category.name) || undefined,
    course: stringValue(course.id) ? { id: stringValue(course.id), title: stringValue(course.title) } : null,
    criteria: arrayValue(raw.criteria).map(mapRubricCriterion),
    updatedAt: stringValue(raw.updatedAt),
  }
}

export const missionsApi = {
  /** Assignments I authored. */
  list: () =>
    apiClient.get('/missions').then((response) => arrayValue(response.data).map(mapAuthoredMission)),
  get: (missionId: string) =>
    apiClient.get(`/missions/${missionId}`).then((response) => mapAuthoredMission(response.data)),
  create: (payload: MissionWritePayload) =>
    apiClient.post('/missions', payload).then((response) =>
      stringValue(
        mutationEntity(response.data, ['mission_insert', 'missionInsert', 'mission']).id,
      ),
    ),
  update: (missionId: string, payload: Partial<MissionWritePayload>) =>
    apiClient.patch(`/missions/${missionId}`, payload).then((response) => response.data),
  remove: (missionId: string) =>
    apiClient.delete(`/missions/${missionId}`).then((response) => response.data),
}

export const rubricApi = {
  create: (missionId: string, payload: { criterionName: string; description?: string; maxPoints: number }) =>
    apiClient.post(`/missions/${missionId}/rubric`, payload).then((response) => response.data),
  update: (
    missionId: string,
    criterionId: string,
    payload: { criterionName?: string; description?: string; maxPoints?: number },
  ) =>
    apiClient
      .patch(`/missions/${missionId}/rubric/${criterionId}`, payload)
      .then((response) => response.data),
  remove: (missionId: string, criterionId: string) =>
    apiClient.delete(`/missions/${missionId}/rubric/${criterionId}`).then((response) => response.data),
  reorder: (missionId: string, orderedIds: string[]) =>
    apiClient.put(`/missions/${missionId}/rubric/reorder`, { orderedIds }).then((response) => response.data),
}

// ── Certificates ─────────────────────────────────────────────────────
/**
 * Completion certificates. There is no certificates endpoint yet (see
 * web/BACKEND_INTEGRATION_GAPS.md), so a certificate is projected from a
 * COMPLETED enrollment: the enrollment is the server's own record that this
 * learner finished this course, and its id is the credential reference.
 */
export function certificatesFromEnrollments(items: ContinueLearningItem[]): Certificate[] {
  return items
    .filter((item) => item.status === 'COMPLETED' && item.completedAt)
    .sort((a, b) => (b.completedAt ?? '').localeCompare(a.completedAt ?? ''))
    .map((item) => ({
      enrollmentId: item.enrollmentId,
      course: item.course,
      completedAt: item.completedAt as string,
      totalLessons: item.totalLessons,
      credentialId: `CERT-${item.enrollmentId.replace(/-/g, '').slice(0, 12).toUpperCase()}`,
    }))
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

  /**
   * Join an assignment. Idempotent and reactivating, like the course variant —
   * and required before the API will accept a submission, which is why the
   * submit flow calls it first when no ACTIVE mission enrollment exists.
   */
  enrollInMission: (missionId: string) =>
    apiClient.post(`/missions/${missionId}/enroll`).then((response) => response.data),
}

// ── Payments (Paymob hosted checkout) ────────────────────────────────
export type CheckoutItem = {
  targetType: 'COURSE' | 'MISSION' | 'SUBSCRIPTION'
  courseId?: string
  missionId?: string
  subscriptionTierId?: string
}

/**
 * Paymob's full billing block. The backend substitutes its placeholder set only
 * when `billingData` is absent *entirely* (`body.billingData || {…}` in
 * payments.controller.ts) — it does not fill in individual missing fields. So a
 * partial object is worse than none: it reaches Paymob with `street`,
 * `phone_number`, `city` and the rest undefined and the intention is rejected.
 * Every field is therefore required here, and the helper below either produces
 * a complete block or nothing at all.
 */
export type CheckoutBillingData = {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  apartment: string
  floor: string
  street: string
  building: string
  shipping_method: string
  postal_code: string
  city: string
  state: string
  country: string
}

/**
 * Build a complete billing block from the signed-in profile, or `undefined` so
 * the backend applies its own placeholders. Never returns a partial object —
 * see CheckoutBillingData.
 */
export function checkoutBillingFromMe(
  me: { name?: string; email?: string; profile?: { phone?: string } } | null,
): CheckoutBillingData | undefined {
  const email = me?.email?.trim()
  if (!email) return undefined
  const parts = (me?.name ?? '').trim().split(/\s+/).filter(Boolean)
  return {
    first_name: parts[0] || 'Customer',
    last_name: parts.slice(1).join(' ') || 'Name',
    email,
    phone_number: me?.profile?.phone?.trim() || '+201000000000',
    // Paymob requires the address block to be present; the LMS collects none of
    // it, so these carry the same 'NA' the backend would have used.
    apartment: 'NA',
    floor: 'NA',
    street: 'NA',
    building: 'NA',
    shipping_method: 'NA',
    postal_code: 'NA',
    city: 'Cairo',
    state: 'NA',
    country: 'EG',
  }
}

export const paymentsApi = {
  /**
   * Start a Paymob checkout and return the hosted-checkout URL to navigate to
   * (API_DOCUMENTATION §24.1). The endpoint is token-authenticated, so it
   * answers with JSON instead of a 302 — a browser navigation straight to it
   * would arrive unauthenticated, and following a redirect from XHR trips CORS.
   *
   * Prices are resolved server-side from the course row; nothing sent from here
   * influences the amount charged. `returnUrl` is the origin the payment
   * callback bounces back to, which then appends /payment-success | /payment-failed.
   *
   * Returns null when the response carries no usable URL, so the caller can
   * report a failure rather than navigate somewhere unintended.
   */
  checkout: (payload: {
    items: CheckoutItem[]
    billingData?: CheckoutBillingData
    returnUrl?: string
  }): Promise<string | null> =>
    apiClient
      .post('/payments/checkout', payload)
      .then((response) => safeLinkUrl(stringValue(objectValue(response.data).checkoutUrl))),
}

export const lecturesApi = {
  /**
   * Full lecture content, including the signed `transcriptUrl`. The curriculum
   * response deliberately omits it, so this is the only way to reach a lesson's
   * attachments. Access-gated server-side (free preview, course owner/admin, or
   * an ACTIVE/COMPLETED enrollment).
   */
  content: (lectureId: string) =>
    apiClient.get(`/lectures/${lectureId}`).then((response) => {
      const raw = objectValue(response.data)
      return {
        id: stringValue(raw.id),
        title: stringValue(raw.title),
        transcriptUrl: stringValue(raw.transcriptUrl) || null,
        courseId: stringValue(objectValue(objectValue(raw.section).course).id) || null,
      }
    }),
}

export const progressApi = {
  course: (courseId: string) =>
    apiClient.get<CourseProgress>(`/courses/${courseId}/progress`).then((response) => response.data),
  lecture: (lectureId: string) =>
    apiClient
      .get<{ lastWatchedSecond: number; watchedSeconds: number | null; completedAt: string | null }>(`/lectures/${lectureId}/progress`)
      .then((response) => response.data),
  heartbeat: (lectureId: string, lastWatchedSecond: number, watchedSeconds?: number) =>
    apiClient.post(`/lectures/${lectureId}/progress`, { lastWatchedSecond, watchedSeconds }).then((response) => response.data),
}

// ── Secure video streaming (AES-128 HLS) ─────────────────────────────
/**
 * Playback is a guarded handshake (API_DOCUMENTATION §19): the manifest and the
 * AES key are served by our API behind Firebase auth, while the segments are
 * pre-signed GCS URLs on a different host that must NOT receive the token.
 * `LecturePlayer` wires that split; these helpers only expose the URLs and the
 * forensic watermark.
 */
export const streamingApi = {
  manifestUrl: (lectureId: string) => `${apiBaseUrl()}/lectures/${lectureId}/stream/manifest`,
  watermark: (lectureId: string) =>
    apiClient
      .get<{ text: string; expiresAt: string }>(`/lectures/${lectureId}/stream/watermark`)
      .then((response) => response.data),
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
  /**
   * Soft-delete a lesson. Sections had delete and reorder from the start while
   * lessons had neither, so an instructor who added the wrong lesson — or added
   * them out of order — had no way back even though the API supported both.
   */
  deleteLecture: (courseId: string, sectionId: string, lectureId: string) =>
    apiClient
      .delete(`/courses/${courseId}/sections/${sectionId}/lectures/${lectureId}`)
      .then((response) => response.data),
  reorderLectures: (courseId: string, sectionId: string, orderedIds: string[]) =>
    apiClient
      .put(`/courses/${courseId}/sections/${sectionId}/lectures/reorder`, { orderedIds })
      .then((response) => response.data),
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

  /**
   * Resolve the quiz attached to a lecture. Student-accessible (the service
   * gates on enrollment), and the only way a learner can reach a quiz at all —
   * the curriculum response carries no quiz id.
   */
  forLecture: (courseId: string, lectureId: string) =>
    apiClient
      .get(`/courses/${courseId}/lectures/${lectureId}/quiz`)
      .then((response) => {
        const raw = objectValue(response.data)
        const quiz = objectValue(raw.quiz ?? raw.courseQuiz ?? raw)
        const id = stringValue(quiz.id)
        if (!id) return null
        return {
          id,
          passingScore: numberValue(quiz.passingScore, 70),
          maxAttempts: numberValue(quiz.maxAttempts, 0),
          timeLimitMinutes: quiz.timeLimitMinutes == null ? undefined : numberValue(quiz.timeLimitMinutes),
        }
      }),

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

  // ── taking (student / preview) ──
  /** Student-safe view: questions + options with NO correct-answer flags. */
  getForTaking: (courseId: string, quizId: string): Promise<TakeQuiz> =>
    apiClient.get(`/courses/${courseId}/quizzes/${quizId}/questions`).then((response) => {
      const raw = objectValue(response.data)
      return {
        id: stringValue(raw.id),
        timeLimitMinutes:
          typeof raw.timeLimitMinutes === 'number' ? raw.timeLimitMinutes : undefined,
        questions: arrayValue(raw.takeQuestions ?? raw.questions).map(
          (q): TakeQuestion => {
            const rawQ = objectValue(q)
            return {
              id: stringValue(rawQ.id),
              questionText: stringValue(rawQ.questionText),
              points: numberValue(rawQ.points, 1),
              options: arrayValue(rawQ.takeOptions ?? rawQ.options).map((o) => {
                const rawO = objectValue(o)
                return { id: stringValue(rawO.id), text: stringValue(rawO.text) }
              }),
            }
          },
        ),
      }
    }),

  startAttempt: (courseId: string, quizId: string): Promise<string> =>
    apiClient
      .post(`/courses/${courseId}/quizzes/${quizId}/attempts`)
      .then((response) =>
        stringValue(
          mutationEntity(response.data, ['quizAttempt_insert', 'quizAttemptInsert', 'attempt']).id,
        ),
      ),

  submitAnswer: (
    courseId: string,
    quizId: string,
    attemptId: string,
    body: { questionId: string; selectedOptionId: string },
  ) =>
    apiClient
      .post(`/courses/${courseId}/quizzes/${quizId}/attempts/${attemptId}/answers`, body)
      .then((response) => response.data),

  finishAttempt: (courseId: string, quizId: string, attemptId: string): Promise<QuizResult> =>
    apiClient
      .post(`/courses/${courseId}/quizzes/${quizId}/attempts/${attemptId}/finish`)
      .then((response) => quizResultOf(response.data) ?? EMPTY_QUIZ_RESULT),

  /**
   * Session heartbeat (API_DOCUMENTATION §11.2). The server owns the clock: it
   * answers with the authoritative `remainingSeconds` derived from the attempt's
   * own `startedAt`, and once the limit is up it auto-grades and returns the
   * result with `active: false`.
   *
   * The take screen leans on this instead of trusting a client tick counter,
   * which reset to the full limit on reload and ran slow in a background tab.
   */
  attemptHeartbeat: (
    courseId: string,
    quizId: string,
    attemptId: string,
  ): Promise<{ active: boolean; remainingSeconds: number | null; result: QuizResult | null }> =>
    apiClient
      .post(`/courses/${courseId}/quizzes/${quizId}/attempts/${attemptId}/heartbeat`)
      .then((response) => {
        const raw = objectValue(response.data)
        return {
          active: raw.active !== false,
          remainingSeconds:
            typeof raw.remainingSeconds === 'number' ? Math.max(0, raw.remainingSeconds) : null,
          result: quizResultOf(raw),
        }
      }),
}

const EMPTY_QUIZ_RESULT: QuizResult = {
  score: 0,
  passed: false,
  totalQuestions: 0,
  correctCount: 0,
  answeredCount: 0,
}

/**
 * Read a graded result out of a payload, or `null` when the payload is not a
 * result at all.
 *
 * `totalQuestions` is the tell: every grading path in the backend reports it,
 * and no other response on this route carries it. That matters because the same
 * shape arrives three ways — a normal `finish`, a heartbeat that timed out, and
 * the body of the `410 Gone` thrown when an answer lands after the limit. The
 * 410 in particular used to surface as a generic "try again" even though the
 * attempt *had* been graded, leaving the learner staring at an error instead of
 * their score.
 */
export function quizResultOf(value: unknown): QuizResult | null {
  const raw = objectValue(value)
  if (typeof raw.totalQuestions !== 'number') return null
  return {
    score: numberValue(raw.score),
    passed: Boolean(raw.passed),
    totalQuestions: numberValue(raw.totalQuestions),
    correctCount: numberValue(raw.correctCount),
    answeredCount: numberValue(raw.answeredCount),
  }
}

/** The graded result carried by a `410 Gone` (session timed out, auto-graded). */
export function quizResultFromError(error: unknown): QuizResult | null {
  if (typeof error !== 'object' || !error || !('response' in error)) return null
  const response = objectValue((error as { response?: unknown }).response)
  if (numberValue(response.status) !== 410) return null
  return quizResultOf(response.data)
}
