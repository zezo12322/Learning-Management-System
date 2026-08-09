'use client'

import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FilterChip<T extends string> {
  value: T
  label: string
  icon?: LucideIcon
  count?: number
}

/**
 * Horizontally scrolling pill filters (Figma "6. Courses": All / In Progress /
 * Completed / Popular / New). The active chip is filled with the brand colour.
 */
export function FilterChips<T extends string>({
  items,
  value,
  onChange,
  className,
}: {
  items: FilterChip<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
}) {
  return (
    <div className={cn('no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 py-0.5', className)}>
      {items.map((item) => {
        const active = item.value === value
        return (
          <button
            key={item.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(item.value)}
            className={cn(
              'inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-xs font-semibold transition-colors',
              active
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface text-content-secondary ring-1 ring-border hover:text-content',
            )}
          >
            {item.icon && <item.icon size={14} />}
            {item.label}
            {item.count != null && (
              <span className={cn('text-[11px] font-bold', active ? 'text-white/80' : 'text-content-muted')}>
                ({item.count})
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

/**
 * Underlined tab row (Figma "13. Assignments" and "15. Notifications":
 * All / Submitted / Graded).
 */
export function TabBar<T extends string>({
  items,
  value,
  onChange,
  className,
}: {
  items: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  className?: string
}) {
  return (
    <div className={cn('no-scrollbar flex gap-1 overflow-x-auto border-b border-border', className)}>
      {items.map((item) => {
        const active = item.value === value
        return (
          <button
            key={item.value}
            type="button"
            aria-current={active ? 'page' : undefined}
            onClick={() => onChange(item.value)}
            className={cn(
              '-mb-px shrink-0 border-b-2 px-4 pb-3 pt-2 text-sm font-semibold transition-colors',
              active
                ? 'border-primary text-primary'
                : 'border-transparent text-content-secondary hover:text-content',
            )}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
