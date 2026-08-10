'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { useAnnounce } from '@/components/builder/BuilderAnnouncer'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/**
 * Move up / move down, for real.
 *
 * Reordering used to be a lie in two directions: decorative GripVertical handles
 * that nothing listened to, and the only working controls hidden behind
 * `hidden sm:flex` so a phone could not reorder at all — while pressing "move
 * up" on the first item silently did nothing.
 *
 * The buttons are visible at every breakpoint and state their own limits at the
 * bounds — but via `aria-disabled`, never the native `disabled` attribute. The
 * button the instructor activates is the button its own result invalidates:
 * moving a section up to position 1 would disable the focused control, so the
 * browser drops focus to <body> and they lose their place in a long curriculum
 * list. aria-disabled keeps the control focusable and announced; the click is
 * guarded, and the refusal is spoken through the builder's live region.
 *
 * ChevronUp/ChevronDown are vertical, so they must NOT be flipped in RTL.
 */
export function ReorderControls({
  name,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  className,
}: {
  name: string
  onMoveUp: () => void
  onMoveDown: () => void
  isFirst: boolean
  isLast: boolean
  className?: string
}) {
  const t = useT()
  const announce = useAnnounce()
  const button =
    'rounded-lg p-2 text-content-secondary transition-colors hover:bg-subtle hover:text-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 aria-disabled:cursor-not-allowed aria-disabled:opacity-40 aria-disabled:hover:bg-transparent aria-disabled:hover:text-content-secondary'

  return (
    <div className={cn('flex shrink-0 items-center gap-0.5', className)}>
      <button
        type="button"
        onClick={() => {
          if (isFirst) {
            announce(t('builder.curriculum.atTop'))
            return
          }
          onMoveUp()
        }}
        aria-disabled={isFirst ? true : undefined}
        aria-label={t('builder.curriculum.moveUpNamed').replace('{name}', name)}
        title={isFirst ? t('builder.curriculum.atTop') : undefined}
        className={button}
      >
        <ChevronUp size={15} aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => {
          if (isLast) {
            announce(t('builder.curriculum.atBottom'))
            return
          }
          onMoveDown()
        }}
        aria-disabled={isLast ? true : undefined}
        aria-label={t('builder.curriculum.moveDownNamed').replace('{name}', name)}
        title={isLast ? t('builder.curriculum.atBottom') : undefined}
        className={button}
      >
        <ChevronDown size={15} aria-hidden />
      </button>
    </div>
  )
}
