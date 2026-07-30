'use client'

// Route-segment error boundary. Without this, any error thrown while rendering
// a page under app/ white-screens with no UI. This renders a recoverable
// fallback with a "Try again" button (Next.js calls reset() to re-render).
export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-error/10 text-2xl">
        ⚠️
      </div>
      <h2 className="text-xl font-semibold text-content">Something went wrong</h2>
      <p className="max-w-md text-sm text-content-secondary">
        An unexpected error occurred. You can try again, or go back to the
        dashboard.
      </p>
      <div className="mt-2 flex gap-3">
        <button
          onClick={reset}
          className="rounded-input bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Try again
        </button>
        <a
          href="/dashboard"
          className="rounded-input border border-border px-4 py-2 text-sm font-semibold text-content"
        >
          Go to dashboard
        </a>
      </div>
    </div>
  )
}
