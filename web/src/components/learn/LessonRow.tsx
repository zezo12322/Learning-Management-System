'use client'

import * as React from 'react'
import { BookOpen, CheckCircle2, ClipboardList, Lock, PlayCircle } from 'lucide-react'
import type { Lecture, LectureType } from '@/lib/types'
import { useT } from '@/lib/i18n'
import { formatSecondsLocalized } from '@/lib/i18n/format'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

/**
 * A text name for the lesson type. The icon alone carried this meaning before,
 * which is nothing to anyone who cannot see it — and INTERACTIVE has no name in
 * the dictionaries, so it contributes no label rather than a guessed one.
 */
const TYPE_KEY: Partial<Record<LectureType, string>> = {
  VIDEO: 'learn.type.video',
  READING: 'learn.type.reading',
  QUIZ: 'learn.type.quiz',
}

function iconFor(type: LectureType) {
  if (type === 'VIDEO') return PlayCircle
  if (type === 'QUIZ') return ClipboardList
  return BookOpen
}

export interface LessonRowProps {
  lecture: Lecture
  /** 1-based position across the whole course, not within the section. */
  index: number
  active: boolean
  completed: boolean
  /** A lesson this learner cannot open. Never selectable, and says why. */
  locked?: boolean
  /**
   * 'stacked' is the rail default: two lines, so a 340px column still shows the
   * title. 'row' is the single-line layout used below the `rail` screen, where
   * the full page width is available.
   */
  variant?: 'row' | 'stacked'
  onSelect: () => void
}

/**
 * One lesson in the curriculum list.
 *
 * The row is a real button inside an `<li>`, so the list is a list and the
 * lessons are one keyboard stop each. `aria-current` — not the brand-soft
 * background — is what states "this is the lesson you are on"; the visible
 * "Now playing" badge is the text companion to that colour.
 *
 * The button ref is forwarded so the panel can scroll the active row into view
 * without touching the page scroll position.
 */
export const LessonRow = React.forwardRef<HTMLButtonElement, LessonRowProps>(function LessonRow(
  { lecture, index, active, completed, locked = false, variant = 'stacked', onSelect },
  ref,
) {
  const t = useT()
  const Icon = locked ? Lock : iconFor(lecture.type)
  const typeKey = TYPE_KEY[lecture.type]
  const typeLabel = typeKey ? t(typeKey) : null
  const duration = formatSecondsLocalized(lecture.duration, t)

  // A finished lesson shows a filled check in place of its number. Colour alone
  // would not carry the meaning for anyone who cannot distinguish it, so the
  // icon is labelled for assistive tech rather than left decorative.
  const marker = (className?: string) =>
    completed ? (
      <CheckCircle2
        size={16}
        className={cn('shrink-0 text-success', className)}
        role="img"
        aria-label={t('learn.lessonCompleted')}
      />
    ) : (
      <span
        // dir="ltr": the trailing full stop is a bidi-neutral character, so in
        // an Arabic page "4." resolved as ".4" — the marker is a Latin-numeral
        // ordinal in both locales and reads left-to-right in both.
        dir="ltr"
        className={cn('shrink-0 text-xs font-semibold tabular-nums text-content-muted', className)}
      >
        {index}.
      </span>
    )

  const badges = (
    <>
      {lecture.isFreePreview && <Badge tone="info">{t('common.preview')}</Badge>}
      {active && <Badge tone="primary">{t('learn.nowPlaying')}</Badge>}
    </>
  )

  return (
    <li>
      <button
        ref={ref}
        type="button"
        onClick={onSelect}
        disabled={locked}
        aria-current={active ? 'true' : undefined}
        className={cn(
          'w-full rounded-xl px-2.5 py-2 text-start text-sm transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
          active ? 'bg-brand-soft text-on-brand-soft' : 'text-content hover:bg-subtle',
          // No `opacity-70`: it dropped the locked lesson's metadata to 3.63:1
          // in dark. The Lock icon and the "Locked" label already say it.
          locked && 'cursor-not-allowed hover:bg-transparent',
        )}
      >
        {variant === 'stacked' ? (
          <>
            <span className="flex items-start gap-2">
              <Icon size={16} className="mt-0.5 shrink-0" aria-hidden />
              {marker('mt-0.5')}
              {/* dir="auto": bilingual catalogue, so an Arabic-locale learner
                  routinely sees Latin lesson titles and vice versa. Without it
                  the run is resolved against the page's base direction and
                  trailing punctuation / "(v2)" suffixes migrate to the wrong
                  end, and the clamp cuts the informative tail. */}
              <span
                dir="auto"
                className={cn(
                  'line-clamp-2 min-w-0 flex-1 font-medium',
                  completed && !active && 'text-content-secondary',
                )}
              >
                {lecture.title}
              </span>
            </span>
            <span
              className={cn(
                'mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 ps-6 text-[11px]',
                active ? 'text-on-brand-soft/85' : 'text-content-secondary',
              )}
            >
              {typeLabel && <span>{typeLabel}</span>}
              <span>{duration}</span>
              {locked && <span>{t('course.lockedLesson')}</span>}
              {badges}
            </span>
          </>
        ) : (
          <span className="flex items-center gap-2.5">
            <Icon size={17} className="shrink-0" aria-hidden />
            {marker()}
            <span
              dir="auto"
              className={cn(
                'min-w-0 flex-1 truncate',
                completed && !active && 'text-content-secondary',
              )}
            >
              {lecture.title}
            </span>
            {locked && (
              <span className="shrink-0 text-xs text-content-secondary">
                {t('course.lockedLesson')}
              </span>
            )}
            {badges}
            <span
              className={cn(
                'shrink-0 text-xs',
                active ? 'text-on-brand-soft/85' : 'text-content-secondary',
              )}
            >
              {duration}
            </span>
          </span>
        )}
      </button>
    </li>
  )
})
