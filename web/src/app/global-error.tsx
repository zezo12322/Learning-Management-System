'use client'

// Root error boundary — catches errors thrown in the root layout itself, which
// the per-segment error.tsx cannot. It replaces the whole document, so it must
// render its own <html>/<body>.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body
        style={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          padding: '1.5rem',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>
          Something went wrong
        </h2>
        <p style={{ color: '#64748b', maxWidth: '28rem', fontSize: '0.875rem' }}>
          An unexpected error occurred while loading the app. Please try again.
        </p>
        <button
          onClick={reset}
          style={{
            borderRadius: '0.5rem',
            background: '#4f46e5',
            color: '#fff',
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
