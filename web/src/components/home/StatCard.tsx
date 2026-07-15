import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function StatCard({
  icon,
  value,
  label,
  tone = 'primary',
}: {
  icon: React.ReactNode
  value: string | number
  label: string
  tone?: 'primary' | 'secondary' | 'success' | 'warning'
}) {
  const toneClass = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
  }[tone]

  return (
    <Card className="p-4">
      <span className={cn('mb-3 flex h-10 w-10 items-center justify-center rounded-xl', toneClass)}>
        {icon}
      </span>
      <p className="text-2xl font-bold text-content">{value}</p>
      <p className="text-xs text-content-secondary">{label}</p>
    </Card>
  )
}
