'use client'

import { useT } from '@/lib/i18n'
import type { ReadinessCheck } from '@/components/builder/ReadinessItem'
import { ReadinessList } from '@/components/builder/ReadinessList'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

/**
 * The studio's persistent context rail: one readiness card, shown identically on
 * setup, curriculum, media and preview. It replaces three hand-rolled cards that
 * each computed their own idea of "ready" and disagreed with one another.
 */
export function ReadinessPanel({
  title,
  score,
  checks,
  footer,
  className,
}: {
  title: string
  score: number
  checks: ReadinessCheck[]
  footer?: React.ReactNode
  className?: string
}) {
  const t = useT()
  const complete = score === 100
  return (
    <Card className={cn('h-fit p-5', className)}>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-base font-semibold text-content">{title}</h2>
        {/* The number stays visible text beside the bar — Progress renders none. */}
        <span className={cn('text-sm font-bold', complete ? 'text-success' : 'text-primary')}>
          {t('common.percentComplete').replace('{n}', String(score))}
        </span>
      </div>
      <Progress
        value={score}
        label={t('builder.readiness.title')}
        tone={complete ? 'success' : 'primary'}
        className="mt-3 h-1.5"
      />
      <div className="mt-4">
        <ReadinessList checks={checks} />
      </div>
      {footer && <div className="mt-5">{footer}</div>}
    </Card>
  )
}
