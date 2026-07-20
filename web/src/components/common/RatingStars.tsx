import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  return (
    <span className={cn('inline-flex items-center gap-1 text-warning', className)}>
      <Star size={size} className="fill-warning text-warning" />
      {showValue && <span className="font-semibold text-content">{value.toFixed(1)}</span>}
      {count != null && <span className="text-xs font-normal text-content-secondary">({count})</span>}
    </span>
  )
}
