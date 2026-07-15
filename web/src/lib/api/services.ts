import { apiClient } from './client'
import type {
  Category,
  ContinueLearningItem,
  CourseCard,
  CourseProgress,
  Curriculum,
  Enrollment,
  Me,
  RatingSummary,
  Review,
  AuthoringCourse,
  AuthoringSection,
  SignedUpload,
} from '@/lib/types'

// ---- Identity ----
export const meApi = {
  get: () => apiClient.get<Me | null>('/me').then((r) => r.data),
  sync: (payload: { email: string; name: string; avatar?: string }) =>
    apiClient.post('/me/sync', payload).then((r) => r.data),
  updateProfile: (payload: {
    bio?: string
    company?: string
    phone?: string
    preferences?: Record<string, unknown>
  }) => apiClient.patch('/me/profile', payload).then((r) => r.data),
}

// ---- Discovery ----
export const catalogApi = {
  list: () => apiClient.get<CourseCard[]>('/catalog/courses').then((r) => r.data),
  curriculum: (courseId: string) =>
    apiClient.get<Curriculum>(`/catalog/courses/${courseId}/curriculum`).then((r) => r.data),
}

export const coursesApi = {
  categories: () => apiClient.get<Category[]>('/courses/categories').then((r) => r.data),
  popular: (limit = 10) =>
    apiClient.get<CourseCard[]>('/courses/popular', { params: { limit } }).then((r) => r.data),
  recommended: (limit = 10) =>
    apiClient.get<CourseCard[]>('/courses/recommended', { params: { limit } }).then((r) => r.data),
  continueLearning: () =>
    apiClient.get<ContinueLearningItem[]>('/courses/continue-learning').then((r) => r.data),
  search: (q: string) =>
    apiClient.get<CourseCard[]>('/courses/search', { params: { q } }).then((r) => r.data),
}

// ---- Enrollment ----
export const enrollmentApi = {
  enroll: (courseId: string) =>
    apiClient.post<Enrollment>(`/courses/${courseId}/enroll`).then((r) => r.data),
  get: (courseId: string) =>
    apiClient.get<Enrollment | null>(`/courses/${courseId}/enrollment`).then((r) => r.data),
}

// ---- Progress ----
export const progressApi = {
  course: (courseId: string) =>
    apiClient.get<CourseProgress>(`/courses/${courseId}/progress`).then((r) => r.data),
  lecture: (lectureId: string) =>
    apiClient
      .get<{ lastWatchedSecond: number; completedAt: string | null }>(
        `/lectures/${lectureId}/progress`
      )
      .then((r) => r.data),
  heartbeat: (lectureId: string, lastWatchedSecond: number, watchedSeconds?: number) =>
    apiClient
      .post(`/lectures/${lectureId}/progress`, { lastWatchedSecond, watchedSeconds })
      .then((r) => r.data),
  markComplete: (lectureId: string, lastWatchedSecond = 0) =>
    apiClient
      .put(`/lectures/${lectureId}/progress`, { lastWatchedSecond, completed: true })
      .then((r) => r.data),
}

// ---- Ratings ----
export const ratingsApi = {
  summary: (courseId: string) =>
    apiClient.get<RatingSummary>(`/courses/${courseId}/ratings/summary`).then((r) => r.data),
  list: (courseId: string, limit = 20, offset = 0) =>
    apiClient
      .get<Review[]>(`/courses/${courseId}/ratings`, { params: { limit, offset } })
      .then((r) => r.data),
}

// ---- Instructor authoring ----
// These paths map to the existing NestJS course/section/lecture/upload modules.
export const authoringApi = {
  list: () => apiClient.get<AuthoringCourse[]>('/courses').then((r) => r.data),
  get: (courseId: string) => apiClient.get<AuthoringCourse>(`/courses/${courseId}`).then((r) => r.data),
  create: (payload: Partial<AuthoringCourse>) =>
    apiClient.post<AuthoringCourse>('/courses', payload).then((r) => r.data),
  update: (courseId: string, payload: Partial<AuthoringCourse>) =>
    apiClient.patch<AuthoringCourse>(`/courses/${courseId}`, payload).then((r) => r.data),
  setStatus: (courseId: string, status: AuthoringCourse['status']) =>
    apiClient.patch<AuthoringCourse>(`/courses/${courseId}/status`, { status }).then((r) => r.data),
  curriculum: (courseId: string) =>
    apiClient.get<AuthoringSection[]>(`/courses/${courseId}/curriculum`).then((r) => r.data),
  createSection: (courseId: string, payload: { title: string }) =>
    apiClient.post<AuthoringSection>(`/courses/${courseId}/sections`, payload).then((r) => r.data),
  updateSection: (courseId: string, sectionId: string, payload: { title?: string; order?: number }) =>
    apiClient.patch(`/courses/${courseId}/sections/${sectionId}`, payload).then((r) => r.data),
  deleteSection: (courseId: string, sectionId: string) =>
    apiClient.delete(`/courses/${courseId}/sections/${sectionId}`).then((r) => r.data),
  reorderSections: (courseId: string, orderedIds: string[]) =>
    apiClient.patch(`/courses/${courseId}/sections/reorder`, { orderedIds }).then((r) => r.data),
  createLecture: (courseId: string, sectionId: string, payload: Record<string, unknown>) =>
    apiClient.post(`/courses/${courseId}/sections/${sectionId}/lectures`, payload).then((r) => r.data),
  updateLecture: (courseId: string, sectionId: string, lectureId: string, payload: Record<string, unknown>) =>
    apiClient.patch(`/courses/${courseId}/sections/${sectionId}/lectures/${lectureId}`, payload).then((r) => r.data),
  signedUpload: (payload: { fileName: string; contentType: string; size: number; courseId: string }) =>
    apiClient.post<SignedUpload>('/uploads/signed-url', payload).then((r) => r.data),
  confirmUpload: (payload: { uploadId: string; objectPath?: string }) =>
    apiClient.post('/uploads/confirm', payload).then((r) => r.data),
  startTranscode: (courseId: string, lectureId: string) =>
    apiClient.post(`/courses/${courseId}/lectures/${lectureId}/video/transcode`).then((r) => r.data),
  transcodeStatus: (courseId: string, lectureId: string) =>
    apiClient.get(`/courses/${courseId}/lectures/${lectureId}/video/transcode/status`).then((r) => r.data),
}
