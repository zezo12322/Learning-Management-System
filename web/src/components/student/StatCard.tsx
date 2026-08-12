import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type StatTone = 'primary' | 'secondary' | 'success' | 'warning'

const toneClasses: Record<StatTone, { tile: string; note: string; card: string }> = {
  primary: { tile: 'bg-brand-soft text-on-brand-soft', note: 'text-primary', card: 'bg-primary/[0.04]' },
  secondary: { tile: 'bg-secondary/10 text-secondary', note: 'text-secondary', card: 'bg-secondary/[0.05]' },
  success: { tile: 'bg-success-soft text-success', note: 'text-success', card: 'bg-success/[0.05]' },
  warning: { tile: 'bg-warning-soft text-warning', note: 'text-warning', card: 'bg-warning/[0.06]' },
}

/**
 * The stat tile used by the student Home header and the profile's Learning
 * Statistics row (Figma "5. home" / "16. Student profile"): tinted icon square,
 * large value, label, and an optional coloured note underneath.
 */
export function StatCard({
  icon: Icon,
  value,
  label,
  note,
  tone = 'primary',
  tinted,
  className,
}: {
  icon: LucideIcon
  value: string | number
  label: string
  note?: string
  tone?: StatTone
  /** Fill the card with a wash of the tone colour (profile variant). */
  tinted?: boolean
  className?: string
}) {
  const tones = toneClasses[tone]
  return (
    <div
      className={cn(
        'rounded-card border border-border bg-surface p-4 shadow-card',
        tinted && tones.card,
        className,
      )}
    >
      <span className={cn('flex h-10 w-10 items-center justify-center rounded-xl', tones.tile)}>
        <Icon size={18} strokeWidth={2} />
      </span>
      <p className="mt-3 text-2xl font-bold leading-tight text-content">{value}</p>
      <p className="mt-0.5 text-xs text-content-secondary">{label}</p>
      {note && <p className={cn('mt-2 text-[11px] font-semibold', tones.note)}>{note}</p>}
    </div>
  )
}
