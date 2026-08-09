import Link from 'next/link'
import { ChevronRight, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * A label/value line from the profile's "User Information" card
 * (Figma "16. Student profile"): tinted icon, label on the start edge, value on
 * the end edge.
 */
export function InfoRow({
  icon: Icon,
  label,
  value,
  className,
}: {
  icon: LucideIcon
  label: string
  value: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-3 px-4 py-3.5', className)}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-primary">
        <Icon size={17} strokeWidth={1.9} />
      </span>
      <span className="shrink-0 text-sm font-semibold text-content">{label}</span>
      <span className="ms-auto min-w-0 truncate text-end text-sm text-content-secondary">{value}</span>
    </div>
  )
}

/**
 * A tappable settings line (Account settings, Notification preferences, …) with
 * a trailing chevron. Renders as a link, a button, or plain text depending on
 * which handler is supplied.
 */
export function SettingsRow({
  icon: Icon,
  label,
  href,
  onClick,
  danger,
}: {
  icon: LucideIcon
  label: string
  href?: string
  onClick?: () => void
  danger?: boolean
}) {
  const content = (
    <>
      <Icon size={17} strokeWidth={1.9} className={danger ? 'text-error' : 'text-content-secondary'} />
      <span className={cn('flex-1 text-start text-sm font-medium', danger ? 'text-error' : 'text-content')}>
        {label}
      </span>
      <ChevronRight size={16} className="text-content-muted rtl:rotate-180" />
    </>
  )
  const classes =
    'flex w-full items-center gap-3 px-4 py-3.5 transition-colors hover:bg-subtle'

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  )
}
