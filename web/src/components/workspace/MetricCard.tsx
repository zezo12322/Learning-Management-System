import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { StatusPill, type StatusTone } from '@/components/workspace/StatusPill'

export function MetricCard({
  icon: Icon,
  label,
  value,
  change,
  tone = 'success',
}: {
  icon: LucideIcon
  label: string
  value: string
  change: string
  tone?: StatusTone
}) {
  return (
    <Card className="min-h-[210px] p-4 sm:p-5">
      <div className="flex h-16 items-center justify-between rounded-input bg-success/10 px-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-content-secondary">
          <Icon size={18} />
        </span>
        <StatusPill tone={tone}>Live</StatusPill>
      </div>
      <p className="mt-4 text-sm font-semibold text-content">{label}</p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-content-secondary">{value}</p>
      <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-success">
        <ArrowUpRight size={13} /> {change}
      </p>
    </Card>
  )
}
