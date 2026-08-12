'use client'

import { useT } from '@/lib/i18n'
import { ReadinessItem, type ReadinessCheck } from '@/components/builder/ReadinessItem'
import { cn } from '@/lib/utils'

/** The checklist itself — a real list, so its length is announced. */
export function ReadinessList({
  checks,
  className,
}: {
  checks: ReadinessCheck[]
  className?: string
}) {
  const t = useT()
  return (
    <ul role="list" aria-label={t('builder.readiness.listLabel')} className={cn('space-y-2', className)}>
      {checks.map((check) => (
        <ReadinessItem key={check.id} check={check} />
      ))}
    </ul>
  )
}
