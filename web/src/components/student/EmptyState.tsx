import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { buttonClasses } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * The shared empty state from the Assignments / Certificates / Notifications
 * screens: a soft brand-tinted illustration disc, headline, supporting copy and
 * a single primary action.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  className,
}: {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  className?: string
}) {
  return (
    <div className={cn('flex flex-col items-center px-6 py-14 text-center', className)}>
      <span className="relative flex h-28 w-28 items-center justify-center rounded-full bg-brand-soft">
        <span className="absolute inset-3 rounded-full bg-primary/10" />
        <Icon size={44} className="relative text-primary" strokeWidth={1.5} />
      </span>
      <h3 className="mt-6 text-lg font-bold text-content">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-content-secondary">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className={buttonClasses({ className: 'mt-6' })}>
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
