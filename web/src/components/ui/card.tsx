import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Ref-forwarding, so a caller can focus or trap focus inside a Card that is
 * acting as a dialog (see BuilderShell's unsaved-changes prompt).
 *
 * `shadow-card` / `shadow-card-hover` are variable-driven: on a dark page a
 * 12%-alpha indigo drop shadow is invisible, so in dark mode the hover shadow
 * resolves to a primary ring instead (see globals.css).
 */
export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }
>(function Card({ className, hover, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-card border border-border bg-surface shadow-card',
        hover && 'transition-shadow hover:shadow-card-hover',
        className
      )}
      {...props}
    />
  )
})

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1 p-5', className)} {...props} />
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-title-sm text-content', className)} {...props} />
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-5 pt-0', className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-center p-5 pt-0', className)} {...props} />
}
