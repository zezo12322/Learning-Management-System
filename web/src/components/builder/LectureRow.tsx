'use client'

import Link from 'next/link'
import { FileText, ListChecks, Pencil, Play } from 'lucide-react'
import type { Lecture } from '@/lib/types'
import { useT } from '@/lib/i18n'
import { formatSecondsLocalized } from '@/lib/i18n/format'
import { StatusPill, type StatusTone } from '@/components/workspace/StatusPill'
import { cn } from '@/lib/utils'

type Readiness = 'ready' | 'missing' | 'unknown'

function iconFor(type: Lecture['type']) {
  if (type === 'VIDEO') return Play
  if (type === 'QUIZ') return ListChecks
  return FileText
}

/**
 * One lesson row, shared by the curriculum step, the media step's per-lesson
 * list and the preview step.
 *
 * The status pill ALWAYS carries a text verdict. It used to print the bare word
 * "Quiz" in warning amber for every quiz — a lesson type rendered as a failure —
 * because `content: ''` is what createLecture writes for any non-reading type.
 *
 * `children` is the slot for an inline editor, so the form that edits a lesson
 * lives inside that lesson's own list item.
 */
export function LectureRow({
  lecture,
  index,
  density = 'compact',
  readiness,
  onEdit,
  reorder,
  quizHref,
  children,
  className,
}: {
  lecture: Lecture
  index: number
  density?: 'compact' | 'comfortable'
  readiness: Readiness
  onEdit?: () => void
  reorder?: React.ReactNode
  quizHref?: string
  children?: React.ReactNode
  className?: string
}) {
  const t = useT()
  const Icon = iconFor(lecture.type)
  const comfortable = density === 'comfortable'

  const verdict: { label: string; tone: StatusTone } =
    readiness === 'ready'
      ? { label: t('builder.curriculum.filter.ready'), tone: 'success' }
      : readiness === 'missing'
        ? lecture.type === 'VIDEO'
          ? { label: t('builder.curriculum.filter.needsMedia'), tone: 'warning' }
          : { label: t('builder.curriculum.filter.needsContent'), tone: 'warning' }
        : { label: t('builder.curriculum.statusUnknown'), tone: 'info' }

  const typeLabel = t(`builder.curriculum.type.${lecture.type}`, lecture.type)

  return (
    <li className={cn('bg-surface', className)}>
      <div className={cn('flex items-center gap-3 px-3 sm:px-4', comfortable ? 'py-4' : 'py-3')}>
        {reorder}
        <span
          className={cn(
            'flex shrink-0 items-center justify-center rounded-xl',
            comfortable ? 'h-9 w-9' : 'h-8 w-8',
            lecture.type === 'VIDEO'
              ? 'bg-secondary/10 text-secondary'
              : 'bg-subtle text-content-secondary'
          )}
        >
          <Icon size={comfortable ? 14 : 13} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline gap-1.5">
            <span className="shrink-0 text-[10px] font-semibold tabular-nums text-content-muted">
              {index}.
            </span>
            <span dir="auto" className="min-w-0 truncate text-xs font-semibold text-content">
              {lecture.title}
            </span>
          </span>
          <span className="mt-1 block text-[10px] text-content-muted">
            {typeLabel} · {formatSecondsLocalized(lecture.duration, t)}
          </span>
        </span>
        {quizHref && (
          <Link
            href={quizHref}
            className="inline-flex shrink-0 items-center gap-1 rounded-input border border-border px-2.5 py-1 text-[11px] font-semibold text-primary hover:bg-brand-soft"
          >
            <ListChecks size={13} aria-hidden /> {t('builder.curriculum.manageQuiz')}
          </Link>
        )}
        <StatusPill tone={verdict.tone} className="shrink-0">
          {verdict.label}
        </StatusPill>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            aria-label={`${t('builder.curriculum.editLesson')} — ${lecture.title}`}
            className="shrink-0 rounded-lg p-2 text-content-secondary transition-colors hover:bg-subtle hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <Pencil size={15} aria-hidden />
          </button>
        )}
      </div>
      {children}
    </li>
  )
}
