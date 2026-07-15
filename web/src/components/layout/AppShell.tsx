'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Bell,
  BookOpen,
  Bot,
  UploadCloud,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  Plus,
  Search,
  Sparkles,
} from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthProvider'
import { PageSpinner } from '@/components/ui/spinner'
import { Avatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/catalog', label: 'Catalog', icon: LibraryBig },
  { href: '/studio/demo-course/ai-studio', label: 'AI Studio', icon: Bot },
  { href: '/studio/demo-course/media', label: 'Uploads', icon: UploadCloud, badge: '3' },
]

function isActive(pathname: string, href: string) {
  if (href.startsWith('/studio/')) return pathname.includes(href.split('/').at(-1) ?? '')
  return pathname === href || pathname.startsWith(href + '/')
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { me, loading, isAuthenticated, isDemoMode, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

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
          {NAV.map((item) => {
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
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-subtle px-2 py-0.5 text-[10px] font-semibold text-content-secondary">
                    {item.badge}
                  </span>
                )}
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
            <LogOut size={18} /> Sign out
          </button>
        </div>
      </aside>

      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-surface/95 px-4 backdrop-blur sm:px-6 lg:px-9">
          <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-bold text-white">O</span>
            <span className="font-bold text-content">Optima</span>
          </Link>

          <div className="hidden h-11 w-full max-w-md items-center gap-2 rounded-input bg-subtle px-4 text-content-muted sm:flex">
            <Search size={17} />
            <span className="text-xs">Search courses, learners, or tasks…</span>
          </div>

          <div className="flex items-center gap-3">
            {isDemoMode && (
              <span className="hidden items-center gap-1 rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-semibold text-primary sm:inline-flex">
                <Sparkles size={12} /> Demo workspace
              </span>
            )}
            <button className="relative flex h-10 w-10 items-center justify-center rounded-input bg-subtle text-content-secondary" aria-label="Notifications">
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
            </button>
            <Link href="/profile" className="flex items-center gap-2.5">
              <Avatar src={me?.avatar} name={me?.name} size={38} />
              <span className="hidden text-left md:block">
                <span className="block text-xs font-semibold text-content">{me?.name ?? 'Instructor'}</span>
                <span className="block text-[10px] text-content-muted">Instructor</span>
              </span>
            </Link>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1500px] px-4 pb-28 pt-7 sm:px-6 lg:px-9 lg:pb-12">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-surface px-1 py-1.5 lg:hidden">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 rounded-lg py-1.5 text-[10px]',
                active ? 'text-primary' : 'text-content-muted'
              )}
            >
              <item.icon size={19} />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
