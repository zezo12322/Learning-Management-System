import { cn } from '@/lib/utils'

export function Progress({
  value,
  className,
  tone = 'primary',
}: {
  value: number
  className?: string
  tone?: 'primary' | 'success'
}) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-border/70', className)}>
      <div
        className={cn('h-full rounded-full transition-all', tone === 'success' ? 'bg-success' : 'bg-primary')}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
