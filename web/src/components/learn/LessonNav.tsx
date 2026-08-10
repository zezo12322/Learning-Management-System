'use client'

import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import type { Lecture } from '@/lib/types'
import { useT } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Previous / Next plus the completion status line.
 *
 * One component, two placements: the curriculum rail's footer at xl (where it
 * stacks into the 340px column) and the foot of the work column below xl (where
 * it sits in a row). Only one of the two is ever mounted, so there is never a
 * duplicate pair of Previous/Next buttons or a duplicate keyboard stop.
 *
 * Completion is a status, not an action: the server awards it from watch time
 * reported by the player, so there is nothing here to press.
 */
export function LessonNav({
  previous,
  next,
  completedAt,
  onGo,
  className,
}: {
  previous: Lecture | null
  next: Lecture | null
  completedAt: string | null
  onGo: (lectureId: string) => void
  className?: string
}) {
  const t = useT()

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-2 xl:flex-col xl:items-stretch',
        className,
      )}
    >
      {/* aria-disabled, not `disabled`: stepping back to lesson one is exactly
          what makes Previous unavailable, and the native attribute would pull
          the just-pressed button out of the tab order, dropping focus to <body>.
          The click is guarded instead, so the control still refuses the action. */}
      <Button
        variant="outline"
        size="sm"
        aria-disabled={previous ? undefined : true}
        onClick={() => previous && onGo(previous.id)}
      >
        <ArrowLeft size={15} className="rtl:rotate-180" aria-hidden /> {t('learn.previous')}
      </Button>

      {completedAt ? (
        <span className="flex items-center justify-center gap-1.5 px-2 text-sm font-medium text-success">
          {t('learn.completed')}
          <CheckCircle2 size={16} aria-hidden />
        </span>
      ) : (
        <span className="px-2 text-center text-sm text-content-secondary">
          {t('learn.completeInProgress')}
        </span>
      )}

      <Button
        size="sm"
        aria-disabled={next ? undefined : true}
        onClick={() => next && onGo(next.id)}
      >
        {t('learn.next')} <ArrowRight size={15} className="rtl:rotate-180" aria-hidden />
      </Button>
    </div>
  )
}
