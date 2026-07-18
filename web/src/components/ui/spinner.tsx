import { cn } from '@/lib/utils'

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      role="status"
      aria-label="loading"
      className={cn(
        'inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent',
        className
      )}
    />
  )
}

export function PageSpinner() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <Spinner className="h-8 w-8" />
    </div>
  )
}
