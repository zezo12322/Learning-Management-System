'use client'

import { useEffect, useMemo } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import {
  BarChart3,
  BookOpen,
  Bookmark,
  Bot,
  Handshake,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  Plus,
  UploadCloud,
  UserPlus,
  UserRound,
} from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthProvider'
import { authoringApi } from '@/lib/api/services'
import { PageSpinner } from '@/components/ui/spinner'
import { Avatar } from '@/components/ui/avatar'
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const BASE_NAV = [
  { href: '/dashboard', label: 'nav.overview', icon: LayoutDashboard },
  { href: '/courses', label: 'nav.courses', icon: BookOpen },
  { href: '/catalog', label: 'nav.catalog', icon: LibraryBig },
  { href: '/saved', label: 'nav.saved', icon: Bookmark },
  { href: '/uploads', label: 'nav.uploads', icon: UploadCloud },
  { href: '/profile', label: 'nav.profile', icon: UserRound },
]

function isActive(pathname: string, href: string) {
  if (href.startsWith('/studio/')) return pathname.includes(href.split('/').at(-1) ?? '')
  return pathname === href || pathname.startsWith(href + '/')
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { me, roles, loading, isAuthenticated, logout } = useAuth()
  const { t } = useI18n()
  const pathname = usePathname()
  const router = useRouter()
  const authoringQuery = useQuery({
    queryKey: ['authoring-courses'],
    queryFn: authoringApi.list,
    enabled: isAuthenticated,
  })
  const firstCourseId = authoringQuery.data?.[0]?.id
  const canManageStudents = roles.includes('admin') || roles.includes('instructor')
  const nav = useMemo(() => {
    const items = [...BASE_NAV]
    // Admin/instructor management links after Courses: student registration
    // (KAN-12) and course analytics (KAN-51).
    if (canManageStudents) {
      items.splice(
        2,
        0,
        { href: '/students', label: 'nav.students', icon: UserPlus },
        { href: '/insights', label: 'nav.insights', icon: BarChart3 },
        { href: '/sales', label: 'nav.sales', icon: Handshake },
      )
    }
    if (firstCourseId) {
      items.push({ href: `/studio/${firstCourseId}/ai-studio`, label: 'nav.aiStudio', icon: Bot })
    }
    return items
  }, [firstCourseId, canManageStudents])
  const currentLabel = t(nav.find((item) => isActive(pathname, item.href))?.label ?? 'workspace.default')
  const accountName = me?.name || 'Account'
  const accountRole = roles.length
    ? roles.map((role) => role[0].toUpperCase() + role.slice(1)).join(', ')
    : 'User'
  const workspaceLabel = roles.includes('admin')
    ? t('workspace.admin')
    : roles.includes('instructor')
      ? t('workspace.instructor')
      : t('workspace.learning')
  const accountSummary = (
    <>
      <Avatar src={me?.avatar} name={accountName} size={38} />
      <span className="hidden text-left md:block">
        <span className="block text-xs font-semibold text-content">{accountName}</span>
        <span className="block text-[10px] text-content-muted">{accountRole}</span>
      </span>
    </>
  )

  useEffect(() => {
    if (!loading && !isAuthenticated) router.replace('/login')
  }, [loading, isAuthenticated, router])

  if (loading || !isAuthenticated) return <PageSpinner />

  const signOut = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] flex-col border-r border-border bg-surface px-5 py-6 lg:flex">
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-primary text-lg font-bold text-white">
            O
          </span>
          <span className="text-xl font-bold tracking-tight text-content">Optima</span>
        </Link>

        <nav className="mt-8 flex flex-1 flex-col gap-1.5">
          {nav.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex h-11 items-center gap-3 rounded-input px-3 text-sm font-medium transition-colors',
                  active
                    ? 'bg-brand-soft text-primary'
                    : 'text-content-secondary hover:bg-subtle hover:text-content'
                )}
              >
                <item.icon size={19} strokeWidth={1.8} />
                <span className="flex-1">{t(item.label)}</span>
              </Link>
            )
          })}
        </nav>

        <div className="space-y-3">
          <Link
            href="/studio/new/setup"
            className="flex h-11 items-center justify-center gap-2 rounded-input bg-primary text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-600"
          >
            <Plus size={17} /> New course
          </Link>
          <button
            onClick={signOut}
            className="flex h-10 w-full items-center gap-3 rounded-input px-3 text-sm text-content-secondary transition-colors hover:bg-subtle hover:text-error"
          >
            <LogOut size={18} /> {t('nav.signOut')}
          </button>
        </div>
      </aside>

      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-surface/95 px-4 backdrop-blur sm:px-6 lg:px-9">
          <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-bold text-white">O</span>
            <span className="font-bold text-content">Optima</span>
          </Link>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-content">{currentLabel}</p>
            <p className="mt-0.5 text-[11px] text-content-muted">{workspaceLabel}</p>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher className="hidden sm:inline-flex" />
            <Link href="/profile" className="flex items-center gap-2.5">{accountSummary}</Link>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1500px] px-4 pb-28 pt-7 sm:px-6 lg:px-9 lg:pb-12">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-surface px-1 py-1.5 lg:hidden">
        {nav.map((item) => {
          const active = isActive(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                // min-w-0 + truncate: admins/instructors get up to 9 items here,
                // and flex items default to min-width:auto, so without these the
                // labels refuse to shrink and the last tab is clipped off-screen.
                'flex min-w-0 flex-1 flex-col items-center gap-1 rounded-lg px-0.5 py-1.5 text-[10px]',
                active ? 'text-primary' : 'text-content-muted'
              )}
            >
              <item.icon size={19} className="shrink-0" />
              <span className="max-w-full truncate">{t(item.label)}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
