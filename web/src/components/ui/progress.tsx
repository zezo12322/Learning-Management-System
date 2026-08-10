import * as React from 'react'
import { cn } from '@/lib/utils'

type Tone = 'primary' | 'success' | 'info' | 'warning' | 'error'

const tones: Record<Tone, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  info: 'bg-info',
  warning: 'bg-warning',
  error: 'bg-error',
}

/**
 * The one progress bar in the product.
 *
 * The root is the ARIA progressbar, so callers never need to reach into the
 * internal DOM (`[&>div]:bg-*`) to recolour the fill — pass `tone` instead.
 *
 * It renders no visible number: callers print their own percentage text beside
 * it, which keeps the number readable at any width and lets each surface word
 * it (e.g. "40% complete") in its own locale.
 *
 * `label` is optional, and its absence is enforced rather than merely documented:
 * with no label the bar is `aria-hidden` and carries no ARIA role at all. An
 * unnamed `role="progressbar"` is a WCAG 4.1.2 failure (axe
 * `aria-progressbar-name`), so a decorative bar must stay out of the
 * accessibility tree instead of entering it anonymously.
 *
 * Fill direction follows inline direction: the fill is a block child of the
 * track, so it grows from the start side in LTR and from the right in RTL with
 * no directional utility.
 */
export function Progress({
  value,
  label,
  tone = 'primary',
  indeterminate = false,
  className,
}: {
  value: number
  label?: string
  tone?: Tone
  indeterminate?: boolean
  className?: string
}) {
  const raw = Number.isFinite(value) ? value : 0
  const pct = Math.max(0, Math.min(100, raw))
  const a11y: React.AriaAttributes & { role?: string } = label
    ? {
        role: 'progressbar',
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        // Omitted while indeterminate — that is how "unknown progress" is stated.
        'aria-valuenow': indeterminate ? undefined : Math.round(pct),
        'aria-label': label,
      }
    : { 'aria-hidden': true }
  return (
    <div
      {...a11y}
      // bg-track, not `bg-border/70`, which measured 1.09:1 against a light card
      // and 1.28:1 against a dark one — the track was invisible in both themes,
      // so a bar at low percentage read as a floating dash with no scale.
      className={cn('h-2 w-full overflow-hidden rounded-full bg-track', className)}
    >
      <div
        className={cn(
          'h-full rounded-full transition-all',
          tones[tone],
          indeterminate && 'w-2/5 animate-pulse'
        )}
        style={indeterminate ? undefined : { width: `${pct}%` }}
      />
    </div>
  )
}
