'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/AuthProvider'
import { LEARNER_HOME, isRouteForbidden } from '@/lib/auth/routeAccess'

/**
 * The single gate every authenticated shell must run.
 *
 * It exists because the guard used to live inline in `AppShell` only, which
 * left the whole `(builder)` route group — the entire course builder — open to
 * any signed-in learner. Both shells now call this, so adding a third shell
 * cannot silently reintroduce that hole.
 *
 * Returns `blocked`, which the caller must render a spinner for instead of its
 * children: redirecting alone still paints the protected screen for a frame.
 */
export function useRouteGuard(): { blocked: boolean } {
  const { loading, isAuthenticated, rolesResolved, roles } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  const unauthenticated = !loading && !isAuthenticated
  // Wait for roles before judging: a slow /me or a failed token refresh must not
  // read as "this instructor is a learner" and bounce them out of their own
  // workspace.
  const forbidden =
    !loading && isAuthenticated && rolesResolved && isRouteForbidden(pathname, roles)

  useEffect(() => {
    if (unauthenticated) router.replace('/login')
    else if (forbidden) router.replace(LEARNER_HOME)
  }, [unauthenticated, forbidden, router])

  return { blocked: loading || !isAuthenticated || !rolesResolved || forbidden }
}
