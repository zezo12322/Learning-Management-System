'use client'

import * as React from 'react'

/**
 * A polite live region. Mount one per surface and feed it from useAnnouncer, so
 * outcomes that are otherwise conveyed only visually (saved, published,
 * uploaded, reordered) reach assistive tech.
 *
 * It is visually hidden but not `hidden`/`display:none` — a display-none live
 * region is never announced.
 */
export function Announcer({ message }: { message: string }) {
  return (
    <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
      {message}
    </p>
  )
}

/** Zero-width space: invisible, but it changes the text node. */
const NUDGE = '\u200B'

/**
 * Holds the current announcement.
 *
 * Announcing the same string twice in a row appends a zero-width space, because
 * a live region whose text does not change is not re-read — so "Saved" twice
 * would be announced once.
 */
export function useAnnouncer(): { message: string; announce: (message: string) => void } {
  const [message, setMessage] = React.useState('')

  const announce = React.useCallback((next: string) => {
    setMessage((current) => (current === next ? `${next}${NUDGE}` : next))
  }, [])

  return { message, announce }
}
