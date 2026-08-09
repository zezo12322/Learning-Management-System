import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * "Section title ————— View all ›" row that separates every block on the
 * student Home and Profile screens.
 */
export function SectionHeader({
  title,
  href,
  actionLabel,
  className,
}: {
  title: string
  href?: string
  actionLabel?: string
  className?: string
}) {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <h2 className="text-lg font-bold text-content">{title}</h2>
      {href && actionLabel && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-0.5 text-sm font-semibold text-primary hover:underline"
        >
          {actionLabel}
          <ChevronRight size={16} className="rtl:rotate-180" />
        </Link>
      )}
    </div>
  )
}
