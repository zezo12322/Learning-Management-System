'use client'

import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Why you cannot continue, as visible text.
 *
 * The reason used to be computed and then thrown into a `title=` attribute —
 * which never appears on touch, is unreliably announced, and never fires at all
 * on a disabled button because a disabled button stops receiving pointer events.
 * The answer to "why can't I publish?" existed and was discarded.
 *
 * Give it an `id` and point the button's aria-describedby at it.
 */
export function BlockedHint({
  id,
  reason,
  href,
  linkLabel,
  className,
}: {
  id?: string
  reason: string
  href?: string
  linkLabel?: string
  className?: string
}) {
  return (
    <p id={id} className={cn('flex items-start gap-1.5 text-xs text-warning', className)}>
      <AlertCircle size={14} className="mt-0.5 shrink-0" aria-hidden />
      <span>
        {reason}
        {href && linkLabel && (
          <>
            {' '}
            <Link href={href} className="font-semibold text-primary underline">
              {linkLabel}
            </Link>
          </>
        )}
      </span>
    </p>
  )
}
