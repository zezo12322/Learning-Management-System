'use client'

import Link from 'next/link'
import type { CourseCard as Course } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { RatingStars } from '@/components/common/RatingStars'
import { CourseThumbnail } from './CourseThumbnail'
import { CourseMetaRow } from './CourseMetaRow'
import { SaveButton } from './SaveButton'
import { useT } from '@/lib/i18n'

/** Vertical card used in grids and carousels (Popular Courses). */
export function CourseGridCard({ course }: { course: Course }) {
  return (
    <div className="relative">
      {/* Sibling of the link (not nested) so the bookmark button is valid markup */}
      <SaveButton courseId={course.id} className="absolute start-2 top-2 z-10" />
      <Link href={`/courses/${course.id}`} className="block">
        <Card hover className="group overflow-hidden">
          <div className="relative">
            <CourseThumbnail
              src={course.thumbnail}
              seed={course.id}
              label={course.title}
              className="h-32 w-full"
            />
            {course.avgRating != null && (
              // Tokens, not `bg-white/95 text-content`: in dark mode
              // --color-text-primary is near-white, so the score used to vanish
              // into the pill and a card reading "4.7 ★" read just "★". The
              // review count sits with the score it counts.
              <span className="absolute end-2 top-2 rounded-full bg-surface/90 px-2 py-0.5 text-xs font-bold text-content ring-1 ring-border backdrop-blur">
                <RatingStars value={course.avgRating} size={11} count={course.ratingCount} />
              </span>
            )}
          </div>
          <div className="space-y-2 p-3">
            <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-content">
              {course.title}
            </h3>
            <CourseMetaRow level={course.level} />
          </div>
        </Card>
      </Link>
    </div>
  )
}

/** Horizontal row used in the Courses catalog list. */
export function CourseListRow({
  course,
  progress,
  statusBadge,
}: {
  course: Course
  progress?: number
  statusBadge?: { label: string; tone: 'primary' | 'success' | 'warning' | 'info' }
}) {
  const t = useT()
  const percentage = progress == null ? null : Math.round(progress)
  return (
    <Link href={`/courses/${course.id}`} className="block">
      <Card hover className="flex gap-3 p-3">
        <CourseThumbnail
          src={course.thumbnail}
          seed={course.id}
          label={course.title}
          className="h-24 w-24 shrink-0 rounded-xl"
        />
        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <div className="space-y-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="line-clamp-2 text-sm font-semibold text-content">{course.title}</h3>
              {statusBadge && <Badge tone={statusBadge.tone}>{statusBadge.label}</Badge>}
            </div>
            {course.author?.name && (
              <p className="text-xs text-content-secondary">{course.author.name}</p>
            )}
            <CourseMetaRow
              level={course.level}
              rating={course.avgRating ?? null}
              ratingCount={course.ratingCount ?? null}
            />
          </div>
          {percentage != null && (
            // The shared progressbar, with the number spelled out beside it:
            // the bar this replaces was an unlabelled pair of divs, so the only
            // statement of progress was its width.
            <div className="mt-2 flex items-center gap-2">
              <Progress
                label={t('common.progressLabel')}
                value={percentage}
                className="h-1.5 flex-1"
              />
              <span className="shrink-0 text-[11px] font-semibold text-primary">
                {t('common.percentComplete').replace('{n}', String(percentage))}
              </span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}
