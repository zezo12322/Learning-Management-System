'use client'

import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import type { ContinueLearningItem } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CourseThumbnail } from '@/components/course/CourseThumbnail'
import { CourseMetaRow } from '@/components/course/CourseMetaRow'
import { SaveButton } from '@/components/course/SaveButton'
import { ResumeButton, type ResumeStatus } from './ResumeButton'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/**
 * The learner's own course, rendered identically wherever it appears (/home,
 * /learning, the enrolled strip on /catalog) instead of three divergent blocks
 * with three different progress bars.
 *
 * The Card is deliberately NOT a link. The title is the anchor, and the resume
 * and save buttons are its siblings, so no interactive element nests inside
 * another and the exact percentage is always readable rather than being implied
 * by bar width and hue.
 *
 * `density='compact'` drops the author and the meta row and switches resume to
 * its labelled form — the shape the /catalog strip needs.
 */
export function EnrolledCourseRow({
  item,
  density = 'comfortable',
  className,
}: {
  item: ContinueLearningItem
  density?: 'comfortable' | 'compact'
  className?: string
}) {
  const t = useT()
  const percentage = Math.round(item.percentage)
  const done = item.status === 'COMPLETED'
  const started = item.completedLessons > 0
  const comfortable = density === 'comfortable'

  const status: ResumeStatus = done ? 'COMPLETED' : started ? 'ACTIVE' : 'NOT_STARTED'
  const statusLabel = done
    ? t('student.completed')
    : started
      ? t('student.inProgress')
      : t('learning.filter.notStarted')

  return (
    <Card hover className={cn('relative flex gap-3 p-3', className)}>
      <CourseThumbnail
        src={item.course.thumbnail}
        seed={item.course.id}
        label={item.course.title}
        className={cn(
          'shrink-0 rounded-xl',
          comfortable ? 'h-24 w-24 sm:h-28 sm:w-32' : 'h-16 w-16',
        )}
      />

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
        <div className="space-y-1 pe-10">
          <Badge tone={done ? 'success' : started ? 'primary' : 'muted'}>{statusLabel}</Badge>
          <h3 className="text-sm font-bold">
            <Link
              href={`/courses/${item.course.id}`}
              dir="auto"
              className="line-clamp-2 text-content hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {item.course.title}
            </Link>
          </h3>
          {comfortable && item.course.author?.name && (
            <p dir="auto" className="truncate text-xs text-content-secondary">{item.course.author.name}</p>
          )}
          {comfortable && (
            <CourseMetaRow
              lessons={item.totalLessons}
              level={item.course.level}
              rating={item.course.avgRating ?? null}
              ratingCount={item.course.ratingCount ?? null}
            />
          )}
        </div>

        {/* A sibling of the title link, never nested inside it — and placed
            between the title and the resume button so the tab order matches
            what the eye sees: title, bookmark, resume. It is out of flow, so
            the column's `gap-2` does not shift it away from `top-3`. */}
        <SaveButton courseId={item.course.id} className="absolute end-3 top-3 z-10" />

        <div className="flex items-end gap-3">
          <div className="min-w-0 flex-1 space-y-1.5">
            <Progress
              label={t('common.progressLabel')}
              value={percentage}
              tone={done ? 'success' : 'primary'}
              className="h-1.5"
            />
            {/* The number is always spelled out: bar width plus hue was the only
                progress signal this row used to carry. */}
            <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-content-secondary">
              <span className={cn('font-bold', done ? 'text-success' : 'text-primary')}>
                {t('common.percentComplete').replace('{n}', String(percentage))}
              </span>
              <span className="inline-flex items-center gap-1">
                <BookOpen size={12} aria-hidden="true" />
                {t('student.lessonsProgress')
                  .replace('{done}', String(item.completedLessons))
                  .replace('{total}', String(item.totalLessons))}
              </span>
            </p>
          </div>

          <ResumeButton
            courseId={item.course.id}
            status={status}
            variant={comfortable ? 'icon' : 'labelled'}
          />
        </div>
      </div>
    </Card>
  )
}
