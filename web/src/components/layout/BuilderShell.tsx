'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight, Check, HelpCircle, Save } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthProvider'
import { useRouteGuard } from '@/lib/auth/useRouteGuard'
import { authoringApi } from '@/lib/api/services'
import { Button } from '@/components/ui/button'
import { PageSpinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

const STEPS = [
  { key: 'setup', label: 'Setup', description: 'Course details' },
  { key: 'curriculum', label: 'Curriculum', description: 'Sections & lessons' },
  { key: 'media', label: 'Media', description: 'Uploads & processing' },
  { key: 'ai-studio', label: 'AI tools', description: 'Studio & tutor' },
  { key: 'preview', label: 'Preview', description: 'Review & publish' },
]

function activeStep(pathname: string) {
  if (pathname.includes('/ai-tutor')) return 3
  const index = STEPS.findIndex((step) => pathname.includes(`/${step.key}`))
  return index < 0 ? 0 : index
}

export function BuilderShell({ courseId, children }: { courseId: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  // The course builder is instructor/admin only. This shell used to check
  // authentication and nothing else, which left the whole (builder) route
  // group open to any signed-in learner.
  const { blocked } = useRouteGuard()
  const [saved, setSaved] = useState('All changes saved')
  const active = activeStep(pathname)
  const course = useQuery({
    queryKey: ['authoring-course', courseId],
    queryFn: () => authoringApi.get(courseId),
    enabled: courseId !== 'new' && isAuthenticated,
  })
  const sections = course.data?.sections ?? []
  const curriculumReady = sections.length > 0 &&
    sections.every((section) => Boolean(section.title.trim())) &&
    sections.every((section) => section.lectures.length > 0)
  const canContinue = active !== 1 || curriculumReady

  useEffect(() => {
    if (courseId !== 'new' && course.data && active > 1 && !curriculumReady) {
      router.replace(`/studio/${courseId}/curriculum`)
    }
  }, [active, course.data, courseId, curriculumReady, router])

  const nextHref = useMemo(() => {
    if (pathname.includes('/ai-studio')) return `/studio/${courseId}/ai-tutor`
    if (pathname.includes('/ai-tutor')) return `/studio/${courseId}/preview`
    const next = STEPS[Math.min(active + 1, STEPS.length - 1)]
    return `/studio/${courseId}/${next.key}`
  }, [active, courseId, pathname])

  if (blocked) return <PageSpinner />

  const saveDraft = () => {
    setSaved('Saved just now')
    window.setTimeout(() => setSaved('All changes saved'), 1800)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-border bg-surface px-4 sm:px-7">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Link href="/courses" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary font-bold text-white">O</Link>
          <Link href="/courses" className="hidden items-center gap-1 text-xs font-medium text-content-secondary sm:flex"><ArrowLeft size={15} /> Courses</Link>
          <span className="hidden h-7 w-px bg-border sm:block" />
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-content">{courseId === 'new' ? 'New course' : course.data?.title ?? (course.isLoading ? 'Loading course…' : 'Course')}</p>
            <p className="text-[10px] text-content-muted">{course.data?.status ?? 'DRAFT'} · {saved}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={saveDraft}><Save size={15} /> <span className="hidden sm:inline">Save draft</span></Button>
          {active === 4 ? (
            <Button
              size="sm"
              disabled={!curriculumReady}
              title={!curriculumReady ? 'Add at least one lesson to every section before publishing' : undefined}
              onClick={() => document.getElementById('publish-course')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            >
              Publish course <ArrowRight size={15} />
            </Button>
          ) : !canContinue ? (
            <Button size="sm" disabled title="Add at least one lesson to every section to continue">
              Continue <ArrowRight size={15} />
            </Button>
          ) : (
            <Link href={nextHref}><Button size="sm">Continue <ArrowRight size={15} /></Button></Link>
          )}
        </div>
      </header>

      <div className="border-b border-border bg-surface px-4 py-3 lg:hidden">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {STEPS.map((step, index) => (
            index > 1 && !curriculumReady ? (
              <span
                key={step.key}
                aria-disabled="true"
                className="shrink-0 cursor-not-allowed rounded-full bg-subtle px-3 py-1.5 text-[11px] font-medium text-content-muted opacity-60"
              >
                {index + 1}. {step.label}
              </span>
            ) : (
              <Link
                key={step.key}
                href={`/studio/${courseId}/${step.key}`}
                className={cn(
                  'shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium',
                  index === active ? 'bg-primary text-white' : index < active ? 'bg-success/10 text-success' : 'bg-subtle text-content-secondary'
                )}
              >
                {index < active ? '✓ ' : `${index + 1}. `}{step.label}
              </Link>
            )
          ))}
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] flex-col border-r border-border bg-surface px-6 py-8 lg:flex">
          <p className="text-[10px] font-semibold tracking-wider text-content-muted">COURSE BUILDER</p>
          <h2 className="mt-6 text-xl font-bold text-content">Create your course</h2>
          <p className="mt-3 text-xs leading-5 text-content-secondary">Complete the required steps before publishing.</p>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-subtle">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((active + 1) / STEPS.length) * 100}%` }} />
          </div>

          <nav className="mt-6 space-y-2">
            {STEPS.map((step, index) => {
              const selected = index === active
              const complete = index < active
              const locked = index > 1 && !curriculumReady
              const content = (
                <>
                  <span className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-semibold',
                    selected ? 'bg-primary text-white' : complete ? 'bg-success/10 text-success' : 'bg-subtle text-content-secondary'
                  )}>
                    {complete ? <Check size={15} /> : index + 1}
                  </span>
                  <span>
                    <span className={cn('block text-xs font-semibold', selected ? 'text-primary' : 'text-content')}>{step.label}</span>
                    <span className="block text-[10px] text-content-muted">{step.description}</span>
                  </span>
                </>
              )

              if (locked) {
                return (
                  <span
                    key={step.key}
                    aria-disabled="true"
                    className="flex cursor-not-allowed items-center gap-3 rounded-input px-2.5 py-3 opacity-50"
                  >
                    {content}
                  </span>
                )
              }

              return (
                <Link
                  key={step.key}
                  href={`/studio/${courseId}/${step.key}`}
                  className={cn('flex items-center gap-3 rounded-input px-2.5 py-3 transition-colors', selected ? 'bg-brand-soft' : 'hover:bg-subtle')}
                >
                  {content}
                </Link>
              )
            })}
          </nav>

          <div className="mt-auto rounded-input bg-subtle p-4">
            <p className="flex items-center gap-2 text-xs font-semibold text-content"><HelpCircle size={15} /> Need a hand?</p>
            <p className="mt-2 text-[10px] leading-4 text-content-secondary">Use a template or review the course-builder guide.</p>
            <button className="mt-2 text-[10px] font-semibold text-primary">View course guide →</button>
          </div>
        </aside>

        <main className="min-w-0 px-4 py-7 sm:px-6 lg:px-8 xl:px-10">
          <div className="mx-auto w-full max-w-[1120px]">{children}</div>
        </main>
      </div>
    </div>
  )
}
