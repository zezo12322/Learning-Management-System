'use client'

import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { authoringApi } from '@/lib/api/services'
import { useAuth } from '@/lib/auth/AuthProvider'
import { useT } from '@/lib/i18n'
import { lessonCountLabel, sectionCountLabel } from '@/lib/i18n/format'
import type { Lecture } from '@/lib/types'
import type { ReadinessCheck } from '@/components/builder/ReadinessItem'

/**
 * The ONE definition of "ready" in the course builder.
 *
 * Three screens used to disagree: setup counted the cover image (so a course
 * with no cover sat at 75% with an amber row), preview did not require it at all
 * (green row, same course), and BuilderShell gated its header button on a third
 * rule neither used — which is how "Publish course" could look enabled while
 * the real publish button was blocked. BuilderShell, setup, curriculum, media
 * and preview all read this module now.
 */

/**
 * Shortest description that tells a learner what a course covers. Shared by the
 * engine and the setup form so the form cannot pass a field the gate rejects.
 */
export const MIN_DESCRIPTION_LENGTH = 40

/**
 * Whether one lesson has the content it needs to play.
 *
 * QUIZ is deliberately 'unknown' rather than false: createLecture writes
 * `content: ''` for every non-READING type, so the old `Boolean(content)` test
 * marked every quiz permanently incomplete and painted it amber for a state the
 * curriculum screen cannot even author.
 */
export function lectureReadiness(lecture: Lecture): 'ready' | 'missing' | 'unknown' {
  if (lecture.type === 'VIDEO') return lecture.videoUrl ? 'ready' : 'missing'
  if (lecture.type === 'READING') return lecture.content?.trim() ? 'ready' : 'missing'
  return 'unknown'
}

export interface CourseReadiness {
  checks: ReadinessCheck[]
  score: number
  canPublish: boolean
  isLoading: boolean
  videoLessons: Lecture[]
  readyVideoLessons: Lecture[]
  lessonCount: number
  sectionCount: number
  totalSeconds: number
  hasCover: boolean
}

export function useCourseReadiness(courseId: string): CourseReadiness {
  const t = useT()
  const { isAuthenticated } = useAuth()
  // "new" is a placeholder id until the setup step creates the course, so there
  // is nothing to fetch and nothing is complete yet.
  const isNew = courseId === 'new'
  const course = useQuery({
    queryKey: ['authoring-course', courseId],
    queryFn: () => authoringApi.get(courseId),
    // Same cache key the step pages use, so this adds no second request; the
    // authoring endpoint needs a token, so it waits for one.
    enabled: !isNew && isAuthenticated,
  })

  return useMemo(() => {
    const data = course.data
    const sections = data?.sections ?? []
    const lectures = sections.flatMap((section) => section.lectures)
    const videoLessons = lectures.filter((lecture) => lecture.type === 'VIDEO')
    const readyVideoLessons = videoLessons.filter((lecture) => Boolean(lecture.videoUrl))
    const lessonCount = lectures.length
    const totalSeconds = lectures.reduce((sum, lecture) => sum + lecture.duration, 0)
    const hasCover = Boolean(data?.thumbnail)

    const step = (key: string) => `/studio/${courseId}/${key}`
    const stepName = (key: string) => t(`builder.shell.step.${key}`)

    const setupComplete = Boolean(
      data &&
        data.title.trim() &&
        data.description.trim().length >= MIN_DESCRIPTION_LENGTH &&
        data.categoryId &&
        data.level &&
        data.language.trim()
    )

    const sectionsWithLessons = sections.filter((section) => section.lectures.length > 0).length
    const sectionsTitled = sections.every((section) => Boolean(section.title.trim()))
    const curriculumState: ReadinessCheck['state'] = !data || sections.length === 0
      ? 'missing'
      : sectionsTitled && sectionsWithLessons === sections.length
        ? 'complete'
        : 'partial'

    const mediaState: ReadinessCheck['state'] = !data
      ? 'missing'
      : videoLessons.length === 0
        ? 'complete'
        : readyVideoLessons.length === videoLessons.length
          ? 'complete'
          : readyVideoLessons.length > 0
            ? 'partial'
            : 'missing'

    const checks: ReadinessCheck[] = [
      {
        id: 'setup',
        label: t('builder.readiness.check.setup'),
        state: setupComplete ? 'complete' : 'missing',
        severity: 'required',
        href: step('setup'),
        stepLabel: stepName('setup'),
      },
      {
        id: 'cover',
        label: t('builder.readiness.check.cover'),
        state: hasCover ? 'complete' : 'missing',
        // A signed thumbnail upload needs a real course id, so on /studio/new
        // the cover is physically impossible to satisfy — it cannot block.
        severity: isNew ? 'optional' : 'required',
        detail: isNew ? t('builder.readiness.coverNewCourse') : undefined,
        href: step('setup'),
        stepLabel: stepName('setup'),
      },
      {
        id: 'curriculum',
        label: t('builder.readiness.check.curriculum'),
        state: curriculumState,
        detail: sections.length
          ? `${sectionCountLabel(sections.length, t)} · ${lessonCountLabel(lessonCount, t)}`
          : undefined,
        severity: 'required',
        href: step('curriculum'),
        stepLabel: stepName('curriculum'),
      },
      {
        id: 'media',
        label: t('builder.readiness.check.media'),
        state: mediaState,
        detail: videoLessons.length
          ? t('builder.readiness.videosReady')
              .replace('{done}', String(readyVideoLessons.length))
              .replace('{total}', String(videoLessons.length))
          : undefined,
        severity: 'required',
        href: step('media'),
        stepLabel: stepName('media'),
      },
      {
        id: 'ai',
        label: t('builder.readiness.check.ai'),
        // Always optional: the AI step never blocks publishing, so it never
        // wears the blockers' amber warning icon.
        state: 'optional',
        severity: 'optional',
        href: step('ai-studio'),
        stepLabel: stepName('ai-studio'),
      },
    ]

    const required = checks.filter((check) => check.severity === 'required')
    const requiredComplete = required.filter((check) => check.state === 'complete')
    const score = required.length
      ? Math.round((requiredComplete.length / required.length) * 100)
      : 100

    return {
      checks,
      score,
      canPublish: Boolean(data) && requiredComplete.length === required.length,
      isLoading: course.isLoading,
      videoLessons,
      readyVideoLessons,
      lessonCount,
      sectionCount: sections.length,
      totalSeconds,
      hasCover,
    }
  }, [course.data, course.isLoading, courseId, isNew, t])
}
