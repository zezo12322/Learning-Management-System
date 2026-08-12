import * as React from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg' | 'icon'

const variants: Record<Variant, string> = {
  // primary-600/700/300 are raw palette literals with no dark counterpart:
  // because dark `primary` is the LIGHTER #6366F1, hovering used to jump to a
  // darker, duller colour (the button appeared to recede), and
  // `disabled:bg-primary-300` put white on #A5B4FC at 1.85:1 in both themes.
  // The state tokens darken in both themes; disabled reads as a neutral.
  primary:
    'bg-primary text-white hover:bg-primary-hover active:bg-primary-active shadow-sm disabled:bg-subtle disabled:text-content-muted disabled:shadow-none aria-disabled:bg-subtle aria-disabled:text-content-muted aria-disabled:shadow-none aria-disabled:hover:bg-subtle',
  secondary: 'bg-secondary text-white hover:bg-secondary-600 disabled:opacity-60 aria-disabled:opacity-60',
  outline:
    'border border-border bg-surface text-content hover:bg-surface-hover disabled:opacity-60 aria-disabled:opacity-60 aria-disabled:hover:bg-surface',
  ghost: 'text-content hover:bg-surface-hover disabled:opacity-60 aria-disabled:opacity-60 aria-disabled:hover:bg-transparent',
  // text-on-status, not text-white: `error` is a dark red in light mode and a
  // light red in dark, so the legible foreground flips with the theme.
  danger: 'bg-error text-on-status hover:opacity-90 disabled:opacity-60 aria-disabled:opacity-60',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-[52px] px-6 text-base gap-2',
  icon: 'h-11 w-11',
}

// `aria-disabled:` is styled alongside `disabled:` so a caller can express an
// unavailable button WITHOUT the native attribute. That matters whenever the
// button the user activates is the button its own result disables (Previous at
// lesson one, "Move up" at position one): `disabled` removes it from the tab
// order mid-interaction, so the browser drops focus to <body> and the user
// loses their place. aria-disabled keeps it focusable and still announced.
const base =
  'inline-flex items-center justify-center rounded-btn font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed aria-disabled:cursor-not-allowed'

export interface ButtonStyleProps {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  className?: string
}

/**
 * Button styling without the <button> element, so an anchor (e.g. next/link)
 * can look like a button instead of nesting one inside it — nested interactive
 * elements are invalid HTML and add a dead keyboard focus stop.
 */
export function buttonClasses({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
}: ButtonStyleProps = {}) {
  return cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonStyleProps {
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', loading, fullWidth, children, disabled, ...props },
    ref
  ) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={buttonClasses({ variant, size, fullWidth, className })}
      {...props}
    >
      {loading && (
        <span className="me-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  )
)
Button.displayName = 'Button'
