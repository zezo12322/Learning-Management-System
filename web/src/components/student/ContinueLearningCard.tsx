'use client'

import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import type { ContinueLearningItem } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CourseThumbnail } from '@/components/course/CourseThumbnail'
import { ResumeButton, type ResumeStatus } from './ResumeButton'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/**
 * The wide "closest to finishing" card from the student Home screen: thumbnail,
 * status badge, title, progress bar with percentage, lesson counter and the
 * shared resume button.
 *
 * The card is not a link — the title is the anchor and ResumeButton is its
 * sibling, so the two destinations (course detail vs. carry on watching) stay
 * distinct instead of the whole card pointing at one of them.
 */
export function ContinueLearningCard({
  item,
  className,
}: {
  item: ContinueLearningItem
  className?: string
}) {
  const t = useT()
  const percentage = Math.round(item.percentage)
  const done = item.status === 'COMPLETED'
  const started = item.completedLessons > 0
  const status: ResumeStatus = done ? 'COMPLETED' : started ? 'ACTIVE' : 'NOT_STARTED'

  return (
    <Card
      hover
      className={cn(
        'flex flex-col gap-4 overflow-hidden p-3 sm:flex-row sm:items-center sm:p-4',
        className,
      )}
    >
      <CourseThumbnail
        src={item.course.thumbnail}
        seed={item.course.id}
        label={item.course.title}
        className="h-32 w-full shrink-0 rounded-xl sm:h-24 sm:w-40"
      />

      <div className="min-w-0 flex-1">
        <Badge tone={done ? 'success' : 'primary'}>
          {done ? t('student.completed') : t('student.inProgress')}
        </Badge>
        <h3 className="mt-2 text-base font-bold">
          <Link
            href={`/courses/${item.course.id}`}
            className="line-clamp-2 text-content hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            {item.course.title}
          </Link>
        </h3>

        <div className="mt-3 flex items-center gap-3">
          <Progress
            label={t('common.progressLabel')}
            value={percentage}
            tone={done ? 'success' : 'primary'}
            className="h-2 flex-1"
          />
          <span className={cn('shrink-0 text-sm font-bold', done ? 'text-success' : 'text-primary')}>
            {t('common.percentComplete').replace('{n}', String(percentage))}
          </span>
        </div>

        <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-content-secondary">
          <BookOpen size={13} aria-hidden="true" />
          {t('student.lessonsProgress')
            .replace('{done}', String(item.completedLessons))
            .replace('{total}', String(item.totalLessons))}
        </p>
      </div>

      <ResumeButton
        courseId={item.course.id}
        status={status}
        className="self-end sm:self-center"
      />
    </Card>
  )
}
