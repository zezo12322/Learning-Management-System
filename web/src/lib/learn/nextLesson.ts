import type { CourseProgress } from '@/lib/types'

/**
 * The single definition of "where should this learner land".
 *
 * Every Continue / Resume affordance in the product funnels into /learn, and
 * before this the screen simply opened `lectures[0]` — so a learner 60% through
 * a course was dropped back on lesson one. The per-lecture `completedAt` needed
 * to answer the question properly is already in the course-progress response,
 * so no extra request is involved.
 */

/** Lecture ids the server has marked complete, from a course-progress payload. */
function completedLectureIds(progress: CourseProgress | undefined): Set<string> {
  return new Set(
    (progress?.sections ?? []).flatMap((section) =>
      (section.lectures ?? [])
        .filter((lecture) => lecture.completedAt)
        .map((lecture) => lecture.lectureId),
    ),
  )
}

/**
 * The first lecture in `lectures` order that is not complete.
 *
 * `lectures` is the list the learner can actually open (already filtered to free
 * previews when there is no enrolment), so the answer can never point at a
 * gated lesson. Falls back to the first lecture when progress is unknown or the
 * whole course is finished — a completed course reopens at the beginning rather
 * than nowhere.
 */
export function nextLessonId(
  lectures: { id: string }[],
  progress: CourseProgress | undefined,
): string | null {
  const first = lectures[0]?.id ?? null
  if (!progress) return first
  const completed = completedLectureIds(progress)
  const resume = lectures.find((lecture) => !completed.has(lecture.id))
  return resume?.id ?? first
}

/**
 * Resolve a requested lesson (typically `?lesson=` from a resume link) against
 * the lessons this learner may open.
 *
 * The id is honoured only when it is in `lectures`; a stale or hand-edited id —
 * or a deep link into a lesson the learner has no access to — falls back to
 * where they left off instead of showing an empty player.
 */
export function resolveLessonId(
  requested: string | null,
  lectures: { id: string }[],
  progress: CourseProgress | undefined,
): string | null {
  if (requested && lectures.some((lecture) => lecture.id === requested)) return requested
  return nextLessonId(lectures, progress)
}
