'use client'

import { Bookmark } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toggleSavedCourse, useIsCourseSaved } from '@/lib/saved'
import { useT } from '@/lib/i18n'

/**
 * Bookmark toggle for a course. Safe to render inside a <Link> (a course card):
 * it stops the click from bubbling so saving never triggers navigation.
 *
 * Two shapes, because the button appears both over a thumbnail and on a plain
 * card. `overlay` is the default so the existing card callers keep their look,
 * but it is now built from theme tokens: the previous `bg-white/95 text-content`
 * painted near-white text on a near-white pill in dark mode, where
 * --color-text-primary is #F8FAFC — the bookmark simply vanished on /learning,
 * Home's popular grid, /saved and the /learn header.
 */
export function SaveButton({
  courseId,
  variant = 'overlay',
  showLabel = false,
  size = 16,
  className,
}: {
  courseId: string
  variant?: 'overlay' | 'inline'
  showLabel?: boolean
  size?: number
  className?: string
}) {
  const saved = useIsCourseSaved(courseId)
  const t = useT()
  const label = saved ? t('save.remove') : t('save.add')

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleSavedCourse(courseId)
      }}
      className={cn(
        'inline-flex items-center justify-center rounded-full text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        showLabel ? 'h-9 gap-1.5 px-3' : 'p-1.5',
        variant === 'overlay'
          ? // Readable over any thumbnail in both themes: the card surface at
            // 90% with a blur behind it, never a literal white.
            'bg-surface/90 text-content-secondary shadow-card ring-1 ring-border backdrop-blur hover:text-primary'
          : 'border border-border bg-surface text-content-secondary hover:bg-subtle hover:text-primary',
        saved && 'text-primary',
        className,
      )}
    >
      <Bookmark size={size} fill={saved ? 'currentColor' : 'none'} aria-hidden="true" />
      {showLabel && <span>{label}</span>}
    </button>
  )
}
