import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  endAdornment?: React.ReactNode
  invalid?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, endAdornment, invalid, ...props }, ref) => (
    <div className="relative flex items-center">
      {icon && (
        <span className="pointer-events-none absolute start-3 text-content-secondary">{icon}</span>
      )}
      <input
        ref={ref}
        className={cn(
          'h-12 w-full rounded-input border bg-surface px-4 text-sm text-content transition-colors placeholder:text-content-secondary/70 focus:outline-none focus:ring-1',
          icon && 'ps-10',
          endAdornment && 'pe-10',
          invalid
            ? 'border-error focus:border-error focus:ring-error'
            : 'border-border focus:border-primary focus:ring-primary',
          className
        )}
        {...props}
      />
      {endAdornment && <span className="absolute end-3 text-content-secondary">{endAdornment}</span>}
    </div>
  )
)
Input.displayName = 'Input'
