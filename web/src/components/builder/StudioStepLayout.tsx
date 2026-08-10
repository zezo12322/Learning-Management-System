'use client'

import { cn } from '@/lib/utils'

/**
 * The rail law, declared once for the whole studio.
 *
 * Every step used to hand-roll its own two-column grid at a slightly different
 * width (336px / 302px / 334px / 302px). One layout replaces all four.
 *
 * The rail appears at xl and nowhere earlier: BuilderShell already spends 260px
 * on its step rail from lg, so a second rail at 1024px would leave a work column
 * of roughly 430px. Below xl this is the ordinary single stack, and the rail is
 * plain page flow — a nested scroller on a phone is a scroll trap.
 *
 * Grid column tracks follow inline direction, so declaring the work column first
 * in the DOM puts it on the start side in both locales: no `order-*`, no
 * directional utilities, and keyboard order already matches visual order.
 *
 * top-[88px] clears BuilderShell's 72px sticky header plus breathing room.
 *
 * `railLabel` makes the height-capped rail a NAMED, focusable scroll region.
 * From xl the rail is `max-h` + `overflow-y-auto`, so any of its content that
 * overflows is unreachable by keyboard unless the region itself can take focus
 * (WCAG 2.1.1) — which bites hardest at 200% zoom, where the 100vh cap shrinks
 * while the text reflows taller. Steps whose rail is nothing but static copy
 * (the AI step) would strand entirely; the readiness rails only escape it
 * because their rows happen to be links. Always pass it.
 */
export function StudioStepLayout({
  children,
  rail,
  railLabel,
  className,
}: {
  children: React.ReactNode
  rail?: React.ReactNode
  railLabel?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_380px]',
        className
      )}
    >
      <div className="min-w-0">{children}</div>
      {rail && (
        <div
          role={railLabel ? 'region' : undefined}
          aria-label={railLabel}
          tabIndex={railLabel ? 0 : undefined}
          className="min-w-0 rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 xl:sticky xl:top-[88px] xl:max-h-[calc(100vh-104px)] xl:overflow-y-auto xl:overscroll-contain"
        >
          {rail}
        </div>
      )}
    </div>
  )
}
