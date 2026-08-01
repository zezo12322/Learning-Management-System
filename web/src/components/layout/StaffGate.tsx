'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldAlert } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthProvider'
import { useT } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { PageSpinner } from '@/components/ui/spinner'

/**
 * The web app is the authoring console: only instructors and admins may enter.
 * Learners use the mobile app, so a student who signs in here is shown a dead
 * end instead of an empty workspace full of actions the API will refuse.
 *
 * This is UX, not a security boundary — the backend already refuses authoring
 * calls from a student (`@Roles('admin','instructor')` on the courses routes).
 */
export function StaffGate({ children }: { children: React.ReactNode }) {
  const { roles, loading, isAuthenticated, logout } = useAuth()
  const t = useT()
  const router = useRouter()
  const isStaff = roles.includes('admin') || roles.includes('instructor')

  useEffect(() => {
    if (!loading && !isAuthenticated) router.replace('/login')
  }, [loading, isAuthenticated, router])

  if (loading || !isAuthenticated) return <PageSpinner />

  if (!isStaff) {
    const signOut = async () => {
      await logout()
      router.replace('/login')
    }
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="w-full max-w-md rounded-card border border-border bg-surface p-8 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-primary">
            <ShieldAlert size={22} />
          </span>
          <h1 className="mt-5 text-xl font-bold text-content">{t('staffOnly.title')}</h1>
          <p className="mt-2 text-sm text-content-secondary">{t('staffOnly.body')}</p>
          <Button className="mt-6" fullWidth onClick={signOut}>
            {t('staffOnly.signOut')}
          </Button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
