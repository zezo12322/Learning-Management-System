'use client'

import Link from 'next/link'
import { useT } from '@/lib/i18n'

// Route-segment error boundary. Without this, any error thrown while rendering
// a page under app/ white-screens with no UI. This renders a recoverable
// fallback with a "Try again" button (Next.js calls reset() to re-render).
export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useT()
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-error-soft text-2xl">
        ⚠️
      </div>
      <h2 className="text-xl font-semibold text-content">{t('appError.title')}</h2>
      <p className="max-w-md text-sm text-content-secondary">
        {t('appError.body')}
      </p>
      <div className="mt-2 flex gap-3">
        <button
          onClick={reset}
          className="rounded-input bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          {t('appError.retry')}
        </button>
        {/* /home is valid for every role; /dashboard is instructor-only and
            would bounce a learner straight back out. */}
        <Link
          href="/home"
          className="rounded-input border border-border px-4 py-2 text-sm font-semibold text-content"
        >
          {t('appError.home')}
        </Link>
      </div>
    </div>
  )
}
