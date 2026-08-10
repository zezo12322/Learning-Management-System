import * as React from 'react'
import { cn } from '@/lib/utils'

type Tone = 'primary' | 'success' | 'warning' | 'info' | 'muted'

const tones: Record<Tone, string> = {
  // brand-soft + on-brand-soft rather than `bg-primary/10 text-primary`, which
  // measured 2.95:1 in dark on a Card and 2.30:1 when the badge sat on a
  // bg-brand-soft row — i.e. the "Now playing" badge was least legible exactly
  // on the active lesson. The ring keeps it reading as a chip when the badge and
  // the row behind it share the same fill.
  primary: 'bg-brand-soft text-on-brand-soft ring-1 ring-inset ring-on-brand-soft/25',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  // `info` now uses the real info token instead of aliasing secondary.
  info: 'bg-info-soft text-info',
  muted: 'bg-background text-content-secondary',
}

export function Badge({
  className,
  tone = 'primary',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
        tones[tone],
        className
      )}
      {...props}
    />
  )
}
