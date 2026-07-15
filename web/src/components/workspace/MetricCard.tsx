import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { StatusPill, type StatusTone } from '@/components/workspace/StatusPill'

const states: Record<'live' | 'loading' | 'error', { label: string; tone: StatusTone }> = {
  live: { label: 'Live API', tone: 'success' },
  loading: { label: 'Loading', tone: 'info' },
  error: { label: 'API error', tone: 'danger' },
}

export function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  state = 'live',
}: {
  icon: LucideIcon
  label: string
  value: string
  detail: string
  state?: keyof typeof states
}) {
  const status = states[state]
  return (
    <Card className="min-h-[210px] p-4 sm:p-5">
      <div className="flex h-16 items-center justify-between rounded-input bg-success/10 px-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-content-secondary">
          <Icon size={18} />
        </span>
        <StatusPill tone={status.tone}>{status.label}</StatusPill>
      </div>
      <p className="mt-4 text-sm font-semibold text-content">{label}</p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-content-secondary">{value}</p>
      <p className="mt-2 text-xs leading-5 text-content-secondary">{detail}</p>
    </Card>
  )
}
