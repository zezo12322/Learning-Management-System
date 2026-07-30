import { describe, it, expect } from 'vitest'
// A runtime (non-type) import through the `@/` alias — guards the vitest
// resolve.alias config, without which this line fails to resolve.
import { formatCompact } from '@/lib/utils'
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

describe('test harness', () => {
  it('resolves runtime imports through the @/ path alias', () => {
    expect(formatCompact(1500)).toBeTruthy()
  })
})

describe('primitive coercion helpers', () => {
  it('objectValue returns plain objects and rejects arrays/null', () => {
    expect(objectValue({ a: 1 })).toEqual({ a: 1 })
    expect(objectValue(null)).toEqual({})
    expect(objectValue(undefined)).toEqual({})
    expect(objectValue([1, 2])).toEqual({}) // arrays are not treated as objects
    expect(objectValue('x')).toEqual({})
  })

  it('stringValue / numberValue fall back on wrong types', () => {
    expect(stringValue('hi')).toBe('hi')
    expect(stringValue(42, 'fallback')).toBe('fallback')
    expect(numberValue(3.5)).toBe(3.5)
    expect(numberValue(Number.NaN, 7)).toBe(7)
    expect(numberValue('9', 7)).toBe(7)
  })

  it('arrayValue only passes through arrays', () => {
    expect(arrayValue([1])).toEqual([1])
    expect(arrayValue('nope')).toEqual([])
    expect(arrayValue(null)).toEqual([])
  })

  it('mutationEntity picks the first non-empty keyed object, else the root', () => {
    expect(mutationEntity({ course_insert: { id: 'c1' } }, ['course_insert', 'course'])).toEqual({ id: 'c1' })
    expect(mutationEntity({ course: { id: 'c2' } }, ['course_insert', 'course'])).toEqual({ id: 'c2' })
    expect(mutationEntity({ id: 'root' }, ['missing'])).toEqual({ id: 'root' })
  })
})

describe('mapMe', () => {
  it('returns null for a null payload', () => {
    expect(mapMe(null)).toBeNull()
  })

  it('handles a fresh signup with an empty/null profile (KAN-86)', () => {
    const me = mapMe({ id: 'u1', email: 'a@b.com', name: 'Amir', profile_on_user: null })
    expect(me).not.toBeNull()
    expect(me!.uid).toBe('u1')
    expect(me!.profile?.bio).toBeUndefined()
    expect(me!.profile?.company).toBeUndefined()
    expect(me!.roles).toEqual([])
  })

  it('maps a populated profile object and extracts nested roles', () => {
    const me = mapMe({
      id: 'u2',
      email: 'z@b.com',
      name: 'Zeyad',
      avatar: 'https://cdn/a.png',
      profile_on_user: { bio: 'Founder', company: 'Optima', phone: '+20', syncedPreferences: { theme: 'dark' } },
      userRoles_on_user: [{ role: { name: 'Admin' } }, { role: { name: 'ghost' } }],
    })
    expect(me!.avatar).toBe('https://cdn/a.png')
    expect(me!.profile).toEqual({
      bio: 'Founder',
      company: 'Optima',
      phone: '+20',
      preferences: { theme: 'dark' },
    })
    // 'admin' kept (lowercased), unknown 'ghost' filtered out
    expect(me!.roles).toEqual(['admin'])
  })
})

describe('mapCourseCard', () => {
  it('applies defaults for a bare payload', () => {
    const card = mapCourseCard({})
    expect(card.title).toBe('Untitled course')
    expect(card.level).toBe('BEGINNER')
    expect(card.price).toBe(0)
    expect(card.tags).toEqual([])
    expect(card.category).toBeUndefined()
    expect(card.author).toBeUndefined()
  })

  it('maps category and author only when a name is present', () => {
    const card = mapCourseCard({
      id: 'c1',
      title: 'Flutter 101',
      price: 4900,
      category: { name: 'Mobile' },
      author: { name: 'Sara', avatar: null },
      tags: ['flutter', 123, 'dart'],
    })
    expect(card.category).toEqual({ name: 'Mobile' })
    expect(card.author).toEqual({ name: 'Sara', avatar: null })
    expect(card.tags).toEqual(['flutter', 'dart']) // non-strings dropped
  })
})

describe('mapAuthoringCourse', () => {
  it('computes readiness %, lesson count and duration', () => {
    const course = mapAuthoringCourse({
      id: 'c1',
      title: 'T',
      description: 'D',
      category: { name: 'Cat' },
      level: 'INTERMEDIATE',
      language: 'Arabic',
      sections: [
        { id: 's1', title: 'S1', lectures: [{ id: 'l1', duration: 90 }, { id: 'l2', duration: 30 }] },
        { id: 's2', title: 'S2', lectures: [{ id: 'l3', duration: 0 }] },
      ],
    })
    expect(course.progress).toBe(100) // all 5 readiness fields present
    expect(course.lessonCount).toBe(3)
    expect(course.durationMinutes).toBe(2) // ceil((90+30+0)/60)
    expect(course.category).toBe('Cat')
  })

  it('drops to partial readiness when fields are missing', () => {
    const course = mapAuthoringCourse({ title: 'Only title' })
    expect(course.progress).toBe(20) // 1 of 5 fields
    expect(course.category).toBe('Uncategorized')
    expect(course.status).toBe('DRAFT')
  })
})

describe('mapLecture / mapSection', () => {
  it('defaults lecture type and preserves order fallback', () => {
    const lecture = mapLecture({ id: 'l1', title: 'Intro' }, 3)
    expect(lecture.type).toBe('READING')
    expect(lecture.order).toBe(4) // index + 1
    expect(lecture.isFreePreview).toBe(false)
  })

  it('reads lectures from any of the aliased keys', () => {
    const section = mapSection({ id: 's1', title: 'Basics', adminLectures: [{ id: 'l1' }] }, 0)
    expect(section.lectures).toHaveLength(1)
    expect(section.lectures[0].id).toBe('l1')
  })
})

describe('mapCourseOverview (KAN-51)', () => {
  it('never throws and zero-fills a bare payload', () => {
    const overview = mapCourseOverview({})
    expect(overview.course.title).toBe('Untitled course')
    expect(overview.enrollments.total).toBe(0)
    expect(overview.enrollments.byStatus).toEqual({ ACTIVE: 0, COMPLETED: 0, DROPPED: 0, SUSPENDED: 0 })
    expect(overview.progress.averageCompletionPercent).toBe(0)
    expect(overview.ratings.distribution).toEqual({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })
    expect(overview.instructors).toEqual([])
  })

  it('maps a full payload including nested breakdowns', () => {
    const overview = mapCourseOverview({
      course: { id: 'c1', title: 'Data 101', category: { id: 'cat1', name: 'Data' }, tags: ['sql', 7] },
      instructors: [{ id: 'i1', name: 'Lina', email: 'l@x.com', avatar: null }],
      content: {
        totalSections: 3,
        totalLectures: 12,
        lecturesByType: { VIDEO: 8, READING: 3, INTERACTIVE: 0, QUIZ: 1 },
        totalQuizzes: 1,
        totalDurationSeconds: 3600,
      },
      assignments: { total: 2, submissions: { total: 5, byStatus: { PENDING: 2, GRADED: 3, RETURNED: 0, REJECTED: 0 } } },
      enrollments: { total: 40, byStatus: { ACTIVE: 30, COMPLETED: 8, DROPPED: 2, SUSPENDED: 0 } },
      progress: { activeLearners: 38, averageCompletionPercent: 62.5, fullyCompletedLearners: 8, completionRatePercent: 21.05 },
      ratings: { average: 4.4, count: 25, distribution: { 1: 1, 2: 0, 3: 2, 4: 7, 5: 15 } },
    })
    expect(overview.course.category).toEqual({ id: 'cat1', name: 'Data' })
    expect(overview.course.tags).toEqual(['sql']) // non-string dropped
    expect(overview.instructors).toHaveLength(1)
    expect(overview.content.lecturesByType.VIDEO).toBe(8)
    expect(overview.assignments.submissions.byStatus.GRADED).toBe(3)
    expect(overview.enrollments.byStatus.ACTIVE).toBe(30)
    expect(overview.progress.completionRatePercent).toBe(21.05)
    expect(overview.ratings.distribution[5]).toBe(15)
  })
})
