'use client'

import { CheckCircle2, FileText, Send } from 'lucide-react'
import type { MySubmission } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/** Letter grade for a percentage, matching the A/A-/B+ scale shown in Figma. */
export function gradeLetter(percentage: number): string {
  if (percentage >= 93) return 'A+'
  if (percentage >= 88) return 'A'
  if (percentage >= 83) return 'A-'
  if (percentage >= 78) return 'B+'
  if (percentage >= 73) return 'B'
  if (percentage >= 68) return 'B-'
  if (percentage >= 60) return 'C'
  return 'D'
}

function formatDateTime(value: string, locale: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

/**
 * One row of the Assignments list (Figma "13. Assignments"): state icon tile,
 * title + course, submitted timestamp, points, a state badge and — once
 * graded — the score and letter grade.
 */
export function AssignmentCard({
  submission,
  locale,
}: {
  submission: MySubmission
  locale: string
}) {
  const t = useT()
  const graded = submission.status === 'GRADED' && submission.totalScore != null
  const percentage =
    graded && submission.maxPoints
      ? Math.round((submission.totalScore as number) * 100 / submission.maxPoints)
      : null

  const Icon = graded ? CheckCircle2 : submission.status === 'PENDING' ? Send : FileText
  const tone =
    submission.status === 'GRADED'
      ? 'success'
      : submission.status === 'REJECTED'
        ? 'warning'
        : submission.status === 'RETURNED'
          ? 'warning'
          : 'info'
  const tileTone =
    tone === 'success' ? 'bg-success/10 text-success' : tone === 'warning' ? 'bg-warning/10 text-warning' : 'bg-brand-soft text-primary'

  return (
    <Card hover className="flex gap-3 p-4">
      <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', tileTone)}>
        <Icon size={20} strokeWidth={1.9} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="truncate text-sm font-bold text-content">{submission.title}</h3>
          <Badge tone={tone}>{t(`assignments.status.${submission.status}`, submission.status)}</Badge>
        </div>

        <div className="mt-1 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <p className="text-xs text-content-secondary">
            {submission.difficulty
              ? t(`difficulty.${submission.difficulty}`, submission.difficulty)
              : t('assignments.mission')}
          </p>
          {submission.maxPoints != null && (
            <p className="text-xs font-semibold text-content-secondary">
              {t('assignments.points').replace('{n}', String(submission.maxPoints))}
            </p>
          )}
        </div>

        {submission.submittedAt && (
          <p className="mt-1.5 text-xs text-content-muted">
            {t('assignments.submittedOn')} {formatDateTime(submission.submittedAt, locale)}
          </p>
        )}

        {graded && (
          <p className="mt-2 text-xs font-bold text-success">
            {t('assignments.score')}: {submission.totalScore}/{submission.maxPoints}
            {percentage != null && ` · ${gradeLetter(percentage)}`}
          </p>
        )}

        {submission.feedback && (
          <p className="mt-2 rounded-input bg-subtle p-2.5 text-xs leading-5 text-content-secondary">
            {submission.feedback}
          </p>
        )}
      </div>
    </Card>
  )
}
