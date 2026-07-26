import { cn } from '@/lib/utils'

export type StatusTone = 'neutral' | 'brand' | 'info' | 'success' | 'warning' | 'danger'

const tones: Record<StatusTone, string> = {
  neutral: 'bg-subtle text-content-secondary',
  brand: 'bg-brand-soft text-primary',
  info: 'bg-secondary/10 text-secondary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-error/10 text-error',
}

export function StatusPill({
  children,
  tone = 'neutral',
  dot = true,
  className,
}: {
  children: React.ReactNode
  tone?: StatusTone
  dot?: boolean
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium', tones[tone], className)}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}
