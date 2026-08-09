import * as React from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg' | 'icon'

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-600 active:bg-primary-700 shadow-sm disabled:bg-primary-300',
  secondary: 'bg-secondary text-white hover:bg-secondary-600 disabled:opacity-60',
  outline:
    'border border-border bg-surface text-content hover:bg-background disabled:opacity-60',
  ghost: 'text-content hover:bg-background disabled:opacity-60',
  danger: 'bg-error text-white hover:opacity-90 disabled:opacity-60',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-[52px] px-6 text-base gap-2',
  icon: 'h-11 w-11',
}

const base =
  'inline-flex items-center justify-center rounded-btn font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed'

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
