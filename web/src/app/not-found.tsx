import Link from 'next/link'

/**
 * 404 page. Without this, an unmatched URL falls back to the framework default:
 * an unstyled page outside the app shell with no way back in.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-2xl font-bold text-primary">
        404
      </span>
      <h1 className="text-xl font-bold text-content">This page does not exist</h1>
      <p className="max-w-md text-sm text-content-secondary">
        The link may be out of date, or the page may have been moved.
      </p>
      <Link
        href="/home"
        className="mt-2 rounded-btn bg-primary px-5 py-2.5 text-sm font-semibold text-white"
      >
        Go home
      </Link>
    </div>
  )
}
