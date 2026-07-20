import { cn } from '@/lib/utils'

export function FormField({
  label,
  hint,
  children,
  className,
}: {
  label: string
  hint?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <label className={cn('block', className)}>
      <span className="mb-2 block text-xs font-medium text-content">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-[11px] text-content-muted">{hint}</span>}
    </label>
  )
}

export function SelectField({ value, children, onChange }: { value: string; children: React.ReactNode; onChange?: React.ChangeEventHandler<HTMLSelectElement> }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="h-12 w-full rounded-input border border-border bg-surface px-4 text-sm text-content outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
    >
      {children}
    </select>
  )
}
