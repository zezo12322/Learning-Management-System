'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import {
  Award,
  BookOpen,
  Bot,
  Bookmark,
  BarChart3,
  Bell,
  ClipboardList,
  Home,
  UploadCloud,
  UserRound,
  UserPlus,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  Plus,
} from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthProvider'
import { canTeach as canTeachRoles } from '@/lib/auth/routeAccess'
import { useRouteGuard } from '@/lib/auth/useRouteGuard'
import { authoringApi } from '@/lib/api/services'
import { PageSpinner } from '@/components/ui/spinner'
import { Avatar } from '@/components/ui/avatar'
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  label: string
  icon: typeof Home
}

/** The student experience — mirrors the Flutter app's tabs and screens. */
const LEARNER_NAV: NavItem[] = [
  { href: '/home', label: 'nav.home', icon: Home },
  { href: '/learning', label: 'nav.myLearning', icon: BookOpen },
  { href: '/catalog', label: 'nav.catalog', icon: LibraryBig },
  { href: '/assignments', label: 'nav.assignments', icon: ClipboardList },
  { href: '/certificates', label: 'nav.certificates', icon: Award },
  { href: '/saved', label: 'nav.saved', icon: Bookmark },
  { href: '/profile', label: 'nav.profile', icon: UserRound },
]

/** Authoring / management surfaces, shown only to instructors and admins. */
const TEACHING_NAV: NavItem[] = [
  { href: '/dashboard', label: 'nav.overview', icon: LayoutDashboard },
  { href: '/courses', label: 'nav.courses', icon: LibraryBig },
  { href: '/students', label: 'nav.students', icon: UserPlus },
  { href: '/insights', label: 'nav.insights', icon: BarChart3 },
  { href: '/uploads', label: 'nav.uploads', icon: UploadCloud },
]

function isActive(pathname: string, href: string) {
  if (href.startsWith('/studio/')) return pathname.includes(href.split('/').at(-1) ?? '')
  return pathname === href || pathname.startsWith(href + '/')
}

function NavLink({ item, active, t }: { item: NavItem; active: boolean; t: (key: string) => string }) {
  return (
    <Link
      href={item.href}
      className={cn(
        'group flex h-11 items-center gap-3 rounded-input px-3 text-sm font-medium transition-colors',
        active
          ? 'bg-brand-soft text-primary'
          : 'text-content-secondary hover:bg-subtle hover:text-content',
      )}
    >
      <item.icon size={19} strokeWidth={1.8} />
      <span className="flex-1">{t(item.label)}</span>
    </Link>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { me, roles, isAuthenticated, logout } = useAuth()
  const { t } = useI18n()
  const pathname = usePathname()
  const router = useRouter()
  const canTeach = canTeachRoles(roles)
  // Shared with BuilderShell so every authenticated surface is gated the same
  // way — see useRouteGuard for why it lives in one place.
  const { blocked } = useRouteGuard()
  const authoringQuery = useQuery({
    queryKey: ['authoring-courses'],
    queryFn: authoringApi.list,
    enabled: isAuthenticated && canTeach,
  })
  const firstCourseId = authoringQuery.data?.[0]?.id

  const teachingNav = useMemo(() => {
    if (!canTeach) return []
    const items = [...TEACHING_NAV]
    if (firstCourseId) {
      items.push({ href: `/studio/${firstCourseId}/ai-studio`, label: 'nav.aiStudio', icon: Bot })
    }
    return items
  }, [canTeach, firstCourseId])

  const allNav = useMemo(() => [...LEARNER_NAV, ...teachingNav], [teachingNav])

  /** Mobile tab bar — the four student tabs from the Figma bottom nav, plus
   *  the instructor overview when the account can teach. */
  const bottomNav = useMemo(() => {
    const tabs = LEARNER_NAV.filter((item) =>
      ['/home', '/learning', '/saved', '/profile'].includes(item.href),
    )
    return canTeach ? [TEACHING_NAV[0], ...tabs] : tabs
  }, [canTeach])

  const currentLabel = t(allNav.find((item) => isActive(pathname, item.href))?.label ?? 'workspace.default')
  const accountName = me?.name || 'Account'
  const accountRole = roles.length
    ? roles.map((role) => role[0].toUpperCase() + role.slice(1)).join(', ')
    : 'User'
  const workspaceLabel = roles.includes('admin')
    ? t('workspace.admin')
    : roles.includes('instructor')
      ? t('workspace.instructor')
      : t('workspace.learning')

  // Hold the spinner while the guard redirects, so a protected screen never
  // paints for the wrong role — not even for a frame.
  if (blocked) return <PageSpinner />

  const signOut = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 start-0 z-40 hidden w-[260px] flex-col border-e border-border bg-surface px-5 py-6 lg:flex">
        <Link href="/home" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-primary text-lg font-bold text-white">
            O
          </span>
          <span className="text-xl font-bold tracking-tight text-content">Optima</span>
        </Link>

        <nav className="no-scrollbar mt-8 flex flex-1 flex-col gap-1.5 overflow-y-auto">
          {LEARNER_NAV.map((item) => (
            <NavLink key={item.href} item={item} active={isActive(pathname, item.href)} t={t} />
          ))}

          {teachingNav.length > 0 && (
            <>
              <p className="mt-5 px-3 text-[10px] font-bold uppercase tracking-wider text-content-muted">
                {t('nav.teaching')}
              </p>
              {teachingNav.map((item) => (
                <NavLink key={item.href} item={item} active={isActive(pathname, item.href)} t={t} />
              ))}
            </>
          )}
        </nav>

        <div className="space-y-3 pt-4">
          {canTeach && (
            <Link
              href="/studio/new/setup"
              className="flex h-11 items-center justify-center gap-2 rounded-input bg-primary text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-600"
            >
              <Plus size={17} /> {t('common.createCourse')}
            </Link>
          )}
          <button
            onClick={signOut}
            className="flex h-10 w-full items-center gap-3 rounded-input px-3 text-sm text-content-secondary transition-colors hover:bg-subtle hover:text-error"
          >
            <LogOut size={18} /> {t('nav.signOut')}
          </button>
        </div>
      </aside>

      <div className="lg:ps-[260px]">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-surface/95 px-4 backdrop-blur sm:px-6 lg:px-9">
          <Link href="/home" className="flex items-center gap-2 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-bold text-white">O</span>
            <span className="font-bold text-content">Optima</span>
          </Link>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-content">{currentLabel}</p>
            <p className="mt-0.5 text-[11px] text-content-muted">{workspaceLabel}</p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Visible at every width — an Arabic-first audience needs the
                language toggle on phones too, not only from sm: up. */}
            <LanguageSwitcher className="shrink-0 px-2 sm:px-2.5" />
            <Link
              href="/notifications"
              aria-label={t('notifications.title')}
              title={t('notifications.title')}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full transition-colors',
                isActive(pathname, '/notifications')
                  ? 'bg-brand-soft text-primary'
                  : 'text-content-secondary hover:bg-subtle hover:text-content',
              )}
            >
              <Bell size={19} />
            </Link>
            <Link href="/profile" className="flex items-center gap-2.5">
              <Avatar src={me?.avatar} name={accountName} size={38} />
              <span className="hidden text-start md:block">
                <span className="block text-xs font-semibold text-content">{accountName}</span>
                <span className="block text-[10px] text-content-muted">{accountRole}</span>
              </span>
            </Link>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1500px] px-4 pb-28 pt-7 sm:px-6 lg:px-9 lg:pb-12">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-surface px-1 py-1.5 lg:hidden">
        {bottomNav.map((item) => {
          const active = isActive(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex min-w-0 flex-1 flex-col items-center gap-1 rounded-lg px-0.5 py-1.5 text-[10px]',
                active ? 'text-primary' : 'text-content-muted',
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
