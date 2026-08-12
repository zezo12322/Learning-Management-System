'use client'

import Link from 'next/link'
import { Play } from 'lucide-react'
import { buttonClasses } from '@/components/ui/button'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/** How far the learner is, which is the only thing that changes the wording. */
export type ResumeStatus = 'ACTIVE' | 'COMPLETED' | 'NOT_STARTED'

/**
 * The one resume affordance on every enrolled surface.
 *
 * Home used to render a round play anchor, the catalog a bare text link and
 * /learning nothing at all, so "where do I carry on?" looked different on each
 * of the three screens that answer it. One icon, one accessible name derived
 * from `status`, one destination: /learn/[courseId], optionally deep-linked to
 * the lesson the caller already resolved.
 *
 * It is safe inside a card that is itself a link — the click stops bubbling, so
 * an enclosing anchor cannot swallow the navigation.
 */
export function ResumeButton({
  courseId,
  lessonId,
  status,
  variant = 'icon',
  className,
}: {
  courseId: string
  lessonId?: string | null
  status: ResumeStatus
  variant?: 'icon' | 'labelled'
  className?: string
}) {
  const t = useT()

  const label =
    status === 'NOT_STARTED'
      ? t('course.startCourse')
      : status === 'COMPLETED'
        ? t('course.review')
        : t('course.resume')

  const href = lessonId
    ? `/learn/${courseId}?lesson=${encodeURIComponent(lessonId)}`
    : `/learn/${courseId}`

  // Playback glyph: the media timeline does not mirror, so Play must NOT flip in
  // RTL (see LectureRow / LecturePlayer, which render it unflipped too). A
  // left-pointing solid triangle is the rewind glyph in every locale.
  const icon = (
    <Play
      size={variant === 'icon' ? 20 : 16}
      fill="currentColor"
      className="shrink-0"
      aria-hidden="true"
    />
  )

  const stopPropagation = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
  }

  if (variant === 'labelled') {
    return (
      <Link
        href={href}
        onClick={stopPropagation}
        title={label}
        className={buttonClasses({ size: 'sm', className })}
      >
        {icon}
        {label}
      </Link>
    )
  }

  return (
    <Link
      href={href}
      onClick={stopPropagation}
      aria-label={label}
      title={label}
      className={cn(
        // hover:bg-primary-hover, not the primary-600 literal: see button.tsx.
        'inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        className,
      )}
    >
      {icon}
    </Link>
  )
}
