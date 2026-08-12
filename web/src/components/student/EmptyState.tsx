import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { buttonClasses } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * The shared empty state from the Assignments / Certificates / Notifications
 * screens: a soft brand-tinted illustration disc, headline, supporting copy and
 * a single primary action.
 *
 * `headingLevel` exists because the heading has to fit the OUTLINE of the page it
 * lands on. It defaults to h3 (what every existing caller relies on), but a page
 * whose nearest preceding heading is the h1 must pass 'h2' or the outline skips a
 * level — WCAG 1.3.1 / 2.4.10.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  headingLevel: Heading = 'h3',
  className,
}: {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  headingLevel?: 'h2' | 'h3' | 'h4'
  className?: string
}) {
  return (
    <div className={cn('flex flex-col items-center px-6 py-14 text-center', className)}>
      <span className="relative flex h-28 w-28 items-center justify-center rounded-full bg-brand-soft">
        <span className="absolute inset-3 rounded-full bg-primary/10" />
        <Icon size={44} className="relative text-primary" strokeWidth={1.5} />
      </span>
      <Heading className="mt-6 text-lg font-bold text-content">{title}</Heading>
      <p className="mt-2 max-w-sm text-sm leading-6 text-content-secondary">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className={buttonClasses({ className: 'mt-6' })}>
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
