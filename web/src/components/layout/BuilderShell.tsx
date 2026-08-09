'use client'

import { useEffect, useMemo } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthProvider'
import { useRouteGuard } from '@/lib/auth/useRouteGuard'
import { authoringApi } from '@/lib/api/services'
import { useT } from '@/lib/i18n'
import type { CourseLifecycleStatus } from '@/lib/types'
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

const STATUS_LABELS: Record<CourseLifecycleStatus, string> = {
  DRAFT: 'Draft',
  IN_REVIEW: 'Needs review',
  PUBLISHED: 'Published',
  ARCHIVED: 'Archived',
}

function activeStep(pathname: string) {
  if (pathname.includes('/ai-tutor')) return 3
  const index = STEPS.findIndex((step) => pathname.includes(`/${step.key}`))
  return index < 0 ? 0 : index
}

export function BuilderShell({ courseId, children }: { courseId: string; children: React.ReactNode }) {
  const t = useT()
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  // The course builder is instructor/admin only. This shell used to check
  // authentication and nothing else, which left the whole (builder) route
  // group open to any signed-in learner.
  const { blocked } = useRouteGuard()
  const active = activeStep(pathname)
  // "new" is a placeholder id until the setup step creates the course, so every
  // course-scoped request and every step past setup has to wait for a real id.
  const isNew = courseId === 'new'
  const course = useQuery({
    queryKey: ['authoring-course', courseId],
    queryFn: () => authoringApi.get(courseId),
    enabled: !isNew && isAuthenticated,
  })
  const sections = course.data?.sections ?? []
  const curriculumReady = sections.length > 0 &&
    sections.every((section) => Boolean(section.title.trim())) &&
    sections.every((section) => section.lectures.length > 0)
  const canContinue = !isNew && (active !== 1 || curriculumReady)
  const status: CourseLifecycleStatus = course.data?.status ?? 'DRAFT'

  useEffect(() => {
    if (!isNew && course.data && active > 1 && !curriculumReady) {
      router.replace(`/studio/${courseId}/curriculum`)
    }
  }, [active, course.data, courseId, curriculumReady, isNew, router])

  const nextHref = useMemo(() => {
    if (pathname.includes('/ai-studio')) return `/studio/${courseId}/ai-tutor`
    if (pathname.includes('/ai-tutor')) return `/studio/${courseId}/preview`
    const next = STEPS[Math.min(active + 1, STEPS.length - 1)]
    return `/studio/${courseId}/${next.key}`
  }, [active, courseId, pathname])

  if (blocked) return <PageSpinner />

  const stepLocked = (index: number) => (isNew ? index > 0 : index > 1 && !curriculumReady)
  const continueBlockedReason = isNew
    ? t('builder.shell.saveSetupFirst', 'Save your course details first')
    : t('builder.shell.continueBlocked', 'Add at least one lesson to every section to continue')

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-border bg-surface px-4 sm:px-7">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Link href="/courses" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary font-bold text-white">O</Link>
          <Link href="/courses" className="hidden items-center gap-1 text-xs font-medium text-content-secondary sm:flex">
            <ArrowLeft size={15} className="rtl:rotate-180" /> {t('builder.shell.backToCourses', 'Courses')}
          </Link>
          <span className="hidden h-7 w-px bg-border sm:block" />
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-content">
              {isNew
                ? t('builder.shell.newCourse', 'New course')
                : course.data?.title ?? (course.isLoading ? t('builder.shell.loadingCourse', 'Loading course…') : t('builder.shell.courseFallback', 'Course'))}
            </p>
            <p className="text-[10px] text-content-muted">{t(`builder.shell.status.${status}`, STATUS_LABELS[status])}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {active === 4 ? (
            <Button
              size="sm"
              disabled={!curriculumReady}
              title={!curriculumReady ? t('builder.shell.publishBlocked', 'Add at least one lesson to every section before publishing') : undefined}
              onClick={() => document.getElementById('publish-course')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            >
              {t('builder.shell.publishCourse', 'Publish course')} <ArrowRight size={15} className="rtl:rotate-180" />
            </Button>
          ) : !canContinue ? (
            <Button size="sm" disabled title={continueBlockedReason}>
              {t('builder.shell.continue', 'Continue')} <ArrowRight size={15} className="rtl:rotate-180" />
            </Button>
          ) : (
            <Link href={nextHref}>
              <Button size="sm">{t('builder.shell.continue', 'Continue')} <ArrowRight size={15} className="rtl:rotate-180" /></Button>
            </Link>
          )}
        </div>
      </header>

      <div className="border-b border-border bg-surface px-4 py-3 lg:hidden">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {STEPS.map((step, index) => (
            stepLocked(index) ? (
              <span
                key={step.key}
                aria-disabled="true"
                className="shrink-0 cursor-not-allowed rounded-full bg-subtle px-3 py-1.5 text-[11px] font-medium text-content-muted opacity-60"
              >
                {index + 1}. {t(`builder.shell.step.${step.key}`, step.label)}
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
                {index < active ? '✓ ' : `${index + 1}. `}{t(`builder.shell.step.${step.key}`, step.label)}
              </Link>
            )
          ))}
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] flex-col border-r border-border bg-surface px-6 py-8 lg:flex">
          <p className="text-[10px] font-semibold tracking-wider text-content-muted">{t('builder.shell.eyebrow', 'COURSE BUILDER')}</p>
          <h2 className="mt-6 text-xl font-bold text-content">{t('builder.shell.heading', 'Create your course')}</h2>
          <p className="mt-3 text-xs leading-5 text-content-secondary">{t('builder.shell.subheading', 'Complete the required steps before publishing.')}</p>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-subtle">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((active + 1) / STEPS.length) * 100}%` }} />
          </div>

          <nav className="mt-6 space-y-2">
            {STEPS.map((step, index) => {
              const selected = index === active
              const complete = index < active
              const locked = stepLocked(index)
              const content = (
                <>
                  <span className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-semibold',
                    selected ? 'bg-primary text-white' : complete ? 'bg-success/10 text-success' : 'bg-subtle text-content-secondary'
                  )}>
                    {complete ? <Check size={15} /> : index + 1}
                  </span>
                  <span>
                    <span className={cn('block text-xs font-semibold', selected ? 'text-primary' : 'text-content')}>{t(`builder.shell.step.${step.key}`, step.label)}</span>
                    <span className="block text-[10px] text-content-muted">{t(`builder.shell.stepDesc.${step.key}`, step.description)}</span>
                  </span>
                </>
              )

              if (locked) {
                return (
                  <span
                    key={step.key}
                    aria-disabled="true"
                    title={isNew ? t('builder.shell.saveSetupFirst', 'Save your course details first') : undefined}
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
        </aside>

        <main className="min-w-0 px-4 py-7 sm:px-6 lg:px-8 xl:px-10">
          <div className="mx-auto w-full max-w-[1120px]">{children}</div>
        </main>
      </div>
    </div>
  )
}
