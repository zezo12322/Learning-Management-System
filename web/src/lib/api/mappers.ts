// Pure, side-effect-free transforms from raw API payloads to domain types.
// Kept separate from `services.ts` (which imports the axios client + Firebase)
// so these can be unit-tested in isolation with no network/browser deps.

import type {
  AuthoringCourse,
  CourseCard,
  CourseLevel,
  CourseOverview,
  AuthoringSection,
  Lecture,
  LectureType,
  Me,
  Role,
} from '@/lib/types'

type JsonObject = Record<string, unknown>

export const objectValue = (value: unknown): JsonObject =>
  value && typeof value === 'object' && !Array.isArray(value) ? (value as JsonObject) : {}

export const stringValue = (value: unknown, fallback = '') =>
  typeof value === 'string' ? value : fallback

export const numberValue = (value: unknown, fallback = 0) =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback

export const arrayValue = (value: unknown): unknown[] => (Array.isArray(value) ? value : [])

export function mutationEntity(payload: unknown, keys: string[]): JsonObject {
  const root = objectValue(payload)
  for (const key of keys) {
    const candidate = objectValue(root[key])
    if (Object.keys(candidate).length) return candidate
  }
  return root
}

export function mapLecture(value: unknown, index: number): Lecture {
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

export function mapSection(value: unknown, index: number): AuthoringSection {
  const raw = objectValue(value)
  const lectures = raw.adminLectures ?? raw.publishedLectures ?? raw.lectures
  return {
    id: stringValue(raw.id),
    title: stringValue(raw.title, 'Untitled section'),
    order: numberValue(raw.order, index + 1),
    lectures: arrayValue(lectures).map(mapLecture),
  }
}

export function mapCourseCard(value: unknown): CourseCard {
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

export function mapAuthoringCourse(value: unknown): AuthoringCourse {
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

export function mapMe(value: unknown): Me | null {
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

/**
 * Maps the raw GET /courses/:courseId/overview payload into CourseOverview,
 * defaulting every branch so a partial/empty response never throws in the UI.
 */
export function mapCourseOverview(value: unknown): CourseOverview {
  const raw = objectValue(value)
  const course = objectValue(raw.course)
  const category = objectValue(course.category)
  const author = objectValue(course.author)
  const content = objectValue(raw.content)
  const lecturesByType = objectValue(content.lecturesByType)
  const assignments = objectValue(raw.assignments)
  const submissions = objectValue(assignments.submissions)
  const submissionByStatus = objectValue(submissions.byStatus)
  const enrollments = objectValue(raw.enrollments)
  const enrollmentByStatus = objectValue(enrollments.byStatus)
  const progress = objectValue(raw.progress)
  const ratings = objectValue(raw.ratings)
  const distribution = objectValue(ratings.distribution)

  return {
    course: {
      id: stringValue(course.id),
      title: stringValue(course.title, 'Untitled course'),
      description: typeof course.description === 'string' ? course.description : null,
      price: numberValue(course.price),
      status: stringValue(course.status, 'DRAFT'),
      language: stringValue(course.language),
      level: stringValue(course.level, 'BEGINNER'),
      thumbnail: typeof course.thumbnail === 'string' ? course.thumbnail : null,
      tags: arrayValue(course.tags).filter((tag): tag is string => typeof tag === 'string'),
      category: stringValue(category.name)
        ? { id: stringValue(category.id), name: stringValue(category.name) }
        : null,
      author: stringValue(author.name)
        ? {
            id: stringValue(author.id),
            name: stringValue(author.name),
            email: stringValue(author.email),
            avatar: typeof author.avatar === 'string' ? author.avatar : null,
          }
        : null,
      createdAt: stringValue(course.createdAt),
      updatedAt: stringValue(course.updatedAt),
    },
    instructors: arrayValue(raw.instructors).map((item) => {
      const i = objectValue(item)
      return {
        id: stringValue(i.id),
        name: stringValue(i.name),
        email: stringValue(i.email),
        avatar: typeof i.avatar === 'string' ? i.avatar : null,
      }
    }),
    content: {
      totalSections: numberValue(content.totalSections),
      totalLectures: numberValue(content.totalLectures),
      lecturesByType: {
        VIDEO: numberValue(lecturesByType.VIDEO),
        READING: numberValue(lecturesByType.READING),
        INTERACTIVE: numberValue(lecturesByType.INTERACTIVE),
        QUIZ: numberValue(lecturesByType.QUIZ),
      },
      totalQuizzes: numberValue(content.totalQuizzes),
      totalDurationSeconds: numberValue(content.totalDurationSeconds),
    },
    assignments: {
      total: numberValue(assignments.total),
      submissions: {
        total: numberValue(submissions.total),
        byStatus: {
          PENDING: numberValue(submissionByStatus.PENDING),
          GRADED: numberValue(submissionByStatus.GRADED),
          RETURNED: numberValue(submissionByStatus.RETURNED),
          REJECTED: numberValue(submissionByStatus.REJECTED),
        },
      },
    },
    enrollments: {
      total: numberValue(enrollments.total),
      byStatus: {
        ACTIVE: numberValue(enrollmentByStatus.ACTIVE),
        COMPLETED: numberValue(enrollmentByStatus.COMPLETED),
        DROPPED: numberValue(enrollmentByStatus.DROPPED),
        SUSPENDED: numberValue(enrollmentByStatus.SUSPENDED),
      },
    },
    progress: {
      activeLearners: numberValue(progress.activeLearners),
      averageCompletionPercent: numberValue(progress.averageCompletionPercent),
      fullyCompletedLearners: numberValue(progress.fullyCompletedLearners),
      completionRatePercent: numberValue(progress.completionRatePercent),
    },
    ratings: {
      average: numberValue(ratings.average),
      count: numberValue(ratings.count),
      distribution: {
        1: numberValue(distribution['1']),
        2: numberValue(distribution['2']),
        3: numberValue(distribution['3']),
        4: numberValue(distribution['4']),
        5: numberValue(distribution['5']),
      },
    },
  }
}
