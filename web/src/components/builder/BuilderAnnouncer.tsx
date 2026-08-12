'use client'

import { createContext, useContext, useMemo } from 'react'
import { Announcer, useAnnouncer } from '@/components/ui/live-region'

/**
 * The studio's live region, mounted once by BuilderShell.
 *
 * Saving, publishing, reordering and uploading were all conveyed only visually
 * (a green word that fades after 1.6s), so none of them reached assistive tech.
 * Every transient outcome in the builder routes through useAnnounce().
 */
const AnnounceContext = createContext<((message: string) => void) | null>(null)

export function BuilderAnnouncerProvider({ children }: { children: React.ReactNode }) {
  const { message, announce } = useAnnouncer()
  const value = useMemo(() => announce, [announce])
  return (
    <AnnounceContext.Provider value={value}>
      {children}
      <Announcer message={message} />
    </AnnounceContext.Provider>
  )
}

/**
 * Announce a transient outcome. Safe to call outside the provider (it becomes a
 * no-op), so a builder component can also be rendered on a plain page.
 */
export function useAnnounce(): (message: string) => void {
  const announce = useContext(AnnounceContext)
  return announce ?? noop
}

function noop() {
  /* no live region on this surface */
}
