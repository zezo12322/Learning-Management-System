'use client'

import { useT } from '@/lib/i18n'
import { formatSecondsLocalized } from '@/lib/i18n/format'
import { cn } from '@/lib/utils'

/**
 * The factual manifest that sits directly above the publish button, so the last
 * thing an instructor reads before the most consequential action in the product
 * is what actually goes live — not a percentage.
 */
export function PublishSummary({
  lessonCount,
  totalSeconds,
  readyVideos,
  totalVideos,
  hasCover,
  className,
}: {
  lessonCount: number
  totalSeconds: number
  readyVideos: number
  totalVideos: number
  hasCover: boolean
  className?: string
}) {
  const t = useT()
  const rows: { key: string; label: string; value: string }[] = [
    {
      key: 'lessons',
      label: t('builder.publish.summaryLessons'),
      value: String(lessonCount),
    },
    {
      key: 'duration',
      label: t('builder.publish.summaryDuration'),
      value: formatSecondsLocalized(totalSeconds, t),
    },
    {
      key: 'videos',
      label: t('builder.publish.summaryVideos'),
      value: t('builder.readiness.videosReady')
        .replace('{done}', String(readyVideos))
        .replace('{total}', String(totalVideos)),
    },
    {
      key: 'cover',
      label: t('builder.publish.summaryCover'),
      value: hasCover ? t('builder.publish.coverPresent') : t('builder.publish.coverMissing'),
    },
  ]

  return (
    <div className={cn('rounded-input bg-subtle p-4', className)}>
      <h3 className="text-xs font-semibold text-content">{t('builder.publish.summaryTitle')}</h3>
      <dl className="mt-3 space-y-2">
        {rows.map((row) => (
          <div key={row.key} className="flex items-baseline justify-between gap-3 text-[11px]">
            <dt className="text-content-secondary">{row.label}</dt>
            <dd className="text-end font-semibold text-content">{row.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-[10px] leading-5 text-content-secondary">
        {t('builder.publish.willBeVisible')}
      </p>
    </div>
  )
}
