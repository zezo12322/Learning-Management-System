'use client'

import { Star } from 'lucide-react'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/**
 * A course's score, with the meaning stated in text rather than carried by the
 * star glyph.
 *
 * The visible content is deliberately terse ("★ 4.7 (120)") because it sits in a
 * 2-line card overlay, but on its own that announces "4.7 (120)" with an
 * unlabelled icon supplying the only clue that either number is a rating — and
 * neither number says what it measures. The star is therefore decorative and an
 * sr-only sentence carries the full statement.
 */
export function RatingStars({
  value,
  size = 14,
  showValue = true,
  count,
  className,
}: {
  value: number
  size?: number
  showValue?: boolean
  count?: number
  className?: string
}) {
  const t = useT()
  const summary =
    count != null
      ? t('common.ratingSummary')
          .replace('{value}', value.toFixed(1))
          .replace('{n}', String(count))
      : t('common.ratingSummaryNoCount').replace('{value}', value.toFixed(1))

  return (
    <span className={cn('inline-flex items-center gap-1 text-warning', className)}>
      <Star size={size} className="fill-warning text-warning" aria-hidden />
      <span className="sr-only">{summary}</span>
      {showValue && (
        <span aria-hidden className="font-semibold text-content">
          {value.toFixed(1)}
        </span>
      )}
      {count != null && (
        <span aria-hidden className="text-xs font-normal text-content-secondary">
          ({count})
        </span>
      )}
    </span>
  )
}
