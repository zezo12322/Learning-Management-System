'use client'

import { useEffect, useState } from 'react'

/**
 * Breakpoint at which the "work column + persistent context rail" layout turns
 * on. It is the Tailwind `xl` screen, and it is deliberately the only number:
 * a rail earlier than this leaves a work column too narrow to work in.
 */
export const DESKTOP_QUERY = '(min-width: 1280px)'

/**
 * Subscribe to a CSS media query.
 *
 * Returns false during SSR and on the first client paint, then upgrades in an
 * effect — the same mount-then-correct pattern I18nProvider already uses for the
 * persisted locale. Reading `window.matchMedia` during render would make the
 * server and client markup disagree.
 *
 * Use this to *derive* behaviour that cannot be expressed in CSS (which tab set
 * exists, whether to scroll on selection). Anything that is purely visual should
 * stay a Tailwind `xl:` class, which needs no JavaScript and no re-render.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const list = window.matchMedia(query)
    // Read once on mount as well as on change: the query may already match, and
    // 'change' only fires on a later crossing.
    setMatches(list.matches)
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches)
    list.addEventListener('change', onChange)
    return () => list.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** True from `xl` (1280px) up — where the context rail appears. */
export function useIsDesktop(): boolean {
  return useMediaQuery(DESKTOP_QUERY)
}
