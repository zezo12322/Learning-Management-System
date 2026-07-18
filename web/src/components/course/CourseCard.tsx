'use client'

import Link from 'next/link'
import { Users } from 'lucide-react'
import type { CourseCard as Course } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RatingStars } from '@/components/common/RatingStars'
import { CourseThumbnail } from './CourseThumbnail'
import { SaveButton } from './SaveButton'
import { useT } from '@/lib/i18n'
import { formatCompact } from '@/lib/utils'

/** Vertical card used in grids and carousels (Popular Courses). */
export function CourseGridCard({ course }: { course: Course }) {
  const t = useT()
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
              <span className="absolute end-2 top-2 rounded-full bg-white/95 px-2 py-0.5 text-xs font-bold text-content shadow">
                <RatingStars value={course.avgRating} size={11} />
              </span>
            )}
          </div>
          <div className="space-y-2 p-3">
            <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-content">
              {course.title}
            </h3>
            <div className="flex items-center justify-between text-xs text-content-secondary">
              <span className="inline-flex items-center gap-1">
                <Users size={13} />
                {formatCompact(course.ratingCount ?? 0)} {t('common.reviews')}
              </span>
              {course.level && <Badge tone="muted">{t(`level.${course.level}`, course.level)}</Badge>}
            </div>
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
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-content-secondary">
              {course.avgRating != null && (
                <RatingStars value={course.avgRating} size={12} count={course.ratingCount} />
              )}
              {course.level && <span>{t(`level.${course.level}`, course.level)}</span>}
            </div>
          </div>
          {progress != null && (
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border/70">
              <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}
