'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthProvider'
import { useRouteGuard } from '@/lib/auth/useRouteGuard'
import { TosAcceptanceGate } from '@/components/tos/TosAcceptanceGate'
import { authoringApi } from '@/lib/api/services'
import { useCourseReadiness } from '@/lib/builder/readiness'
import { useT } from '@/lib/i18n'
import type { CourseLifecycleStatus } from '@/lib/types'
import { BlockedHint } from '@/components/builder/BlockedHint'
import { BuilderAnnouncerProvider } from '@/components/builder/BuilderAnnouncer'
import { StatusPill, courseStatusOf } from '@/components/workspace/StatusPill'
import { Button, buttonClasses } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { PageSpinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

const STEPS = [
  { key: 'setup', label: 'Setup', description: 'Course details' },
  { key: 'curriculum', label: 'Curriculum', description: 'Sections & lessons' },
  { key: 'media', label: 'Media', description: 'Uploads & processing' },
  { key: 'ai-studio', label: 'AI tools', description: 'Studio & tutor' },
  { key: 'preview', label: 'Preview', description: 'Review & publish' },
]

const PUBLISH_BLOCKED_ID = 'builder-publish-blocked'
const LOCKED_HINT_ID = 'builder-step-locked'

/**
 * Which step a URL is on, matched on path SEGMENTS.
 *
 * `pathname.includes('/setup')` mis-highlighted the rail for any course whose id
 * contained a step name (e.g. /studio/media-101/curriculum highlighted Media).
 */
function activeStep(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  // The AI step owns two routes; ai-tutor keeps the AI entry highlighted.
  if (segments.includes('ai-tutor')) return STEPS.findIndex((step) => step.key === 'ai-studio')
  const index = STEPS.findIndex((step) => segments.includes(step.key))
  return index < 0 ? 0 : index
}

/**
 * Lets the setup step tell the shell it is holding unsaved edits, so rail
 * navigation can ask before throwing them away. Calling the hook outside the
 * shell is a no-op, so a builder form can still be rendered elsewhere.
 */
const DirtyContext = createContext<((dirty: boolean) => void) | null>(null)

export function useBuilderDirty(): (dirty: boolean) => void {
  const setDirty = useContext(DirtyContext)
  return setDirty ?? noopDirty
}

function noopDirty() {
  /* rendered outside the builder shell */
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
  // One readiness engine for the whole builder, so the header button and the
  // step marks agree with the publish button on the preview step.
  const readiness = useCourseReadiness(courseId)
  const status: CourseLifecycleStatus = course.data?.status ?? 'DRAFT'
  const statusMeta = courseStatusOf(status)

  const [dirty, setDirtyState] = useState(false)
  const [pendingHref, setPendingHref] = useState<string | null>(null)
  const stayButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  /** The rail link that opened the dialog, so cancelling returns focus to it. */
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const setDirty = useCallback((next: boolean) => setDirtyState(next), [])

  // A step change means the guarded form is gone; nothing is pending any more.
  useEffect(() => {
    setDirtyState(false)
    setPendingHref(null)
  }, [pathname])

  useEffect(() => {
    if (pendingHref) stayButtonRef.current?.focus()
  }, [pendingHref])

  /**
   * Dismiss the dialog and put focus back where it came from. Without this,
   * cancelling dropped the user at the top of the document instead of the rail
   * link they activated (WCAG 2.4.3).
   */
  const cancelPending = useCallback(() => {
    setPendingHref(null)
    const target = returnFocusRef.current
    returnFocusRef.current = null
    // After the overlay unmounts, or the focus() lands on a removed node.
    requestAnimationFrame(() => target?.focus())
  }, [])

  /**
   * The modal contract: Escape closes, and Tab cycles inside the dialog instead
   * of walking out into the header, the step rail and the form behind it — all
   * of which `aria-modal="true"` has already declared unavailable. Bound to the
   * document (capture) so it keeps working wherever focus currently is.
   */
  useEffect(() => {
    if (!pendingHref) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        cancelPending()
        return
      }
      if (event.key !== 'Tab') return
      const root = dialogRef.current
      if (!root) return
      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const current = document.activeElement as HTMLElement | null
      const inside = current ? root.contains(current) : false
      if (event.shiftKey ? current === first || !inside : current === last || !inside) {
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
      }
    }
    document.addEventListener('keydown', onKeyDown, true)
    return () => document.removeEventListener('keydown', onKeyDown, true)
  }, [pendingHref, cancelPending])

  const nextHref = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean)
    if (segments.includes('ai-studio')) return `/studio/${courseId}/ai-tutor`
    if (segments.includes('ai-tutor')) return `/studio/${courseId}/preview`
    const next = STEPS[Math.min(active + 1, STEPS.length - 1)]
    return `/studio/${courseId}/${next.key}`
  }, [active, courseId, pathname])

  /**
   * Every required check names the step that fixes it, so a step counts as
   * finished exactly when its own required checks pass. Preview is finished once
   * the course is actually published; the AI step is optional and never marked.
   */
  const stepComplete = useCallback(
    (key: string) => {
      if (key === 'preview') return status === 'PUBLISHED'
      const own = readiness.checks.filter(
        (check) => check.severity === 'required' && check.href === `/studio/${courseId}/${key}`
      )
      return own.length > 0 && own.every((check) => check.state === 'complete')
    },
    [courseId, readiness.checks, status]
  )

  const firstBlocked = readiness.checks.find(
    (check) => check.severity === 'required' && check.state !== 'complete'
  )

  if (blocked) return <PageSpinner />

  // Navigation is no longer gated on curriculum completeness. Authoring is
  // iterative: an instructor who added a placeholder section to outline later was
  // teleported out of the upload screen with no stated reason. Only the steps
  // that cannot exist without a saved course stay locked — publishing is what
  // the checklist gates, not moving around.
  const stepLocked = (index: number) => isNew && index > 0

  const guardNavigation = (href: string) => (event: React.MouseEvent) => {
    if (!dirty) return
    event.preventDefault()
    // Remembered here, not read back off document.activeElement later: this is
    // the element the user actually activated.
    returnFocusRef.current = event.currentTarget as HTMLElement
    setPendingHref(href)
  }

  const leavePending = () => {
    const href = pendingHref
    setPendingHref(null)
    setDirtyState(false)
    if (href) router.push(href)
  }

  return (
    <BuilderAnnouncerProvider>
      <DirtyContext.Provider value={setDirty}>
        <div className="min-h-screen bg-background">
          {/* The builder is a separate shell, so it needs the acceptance gate of
              its own — otherwise an instructor could author a course on a direct
              /studio link without ever being asked. */}
          <TosAcceptanceGate />
          {/* Everything behind the unsaved-changes dialog. `aria-modal` alone
              told assistive tech the rest of the page was unavailable while Tab
              could still walk into it, so the shell is hidden from the a11y tree
              for as long as the dialog is open. */}
          <div aria-hidden={pendingHref ? true : undefined}>
          <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-border bg-surface px-4 sm:px-7">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <Link
                href="/courses"
                aria-label={t('builder.shell.homeLink')}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary font-bold text-white"
              >
                O
              </Link>
              <Link href="/courses" className="hidden items-center gap-1 text-xs font-medium text-content-secondary sm:flex">
                <ArrowLeft size={15} className="rtl:rotate-180" aria-hidden /> {t('builder.shell.backToCourses', 'Courses')}
              </Link>
              <span className="hidden h-7 w-px bg-border sm:block" />
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-content">
                  {isNew
                    ? t('builder.shell.newCourse', 'New course')
                    : course.data?.title ?? (course.isLoading ? t('builder.shell.loadingCourse', 'Loading course…') : t('builder.shell.courseFallback', 'Course'))}
                </p>
                {/* StatusPill is the single source of truth for lifecycle
                    status; this header used to keep a private label map. */}
                <StatusPill tone={statusMeta.tone} className="mt-0.5">{t(statusMeta.labelKey)}</StatusPill>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {active === 4 ? (
                // This button never published anything — it scrolls to the real
                // publish button — so it says so, and it is gated on the same
                // canPublish as that button instead of a third, looser rule.
                <Button
                  size="sm"
                  disabled={!readiness.canPublish}
                  aria-describedby={readiness.canPublish ? undefined : PUBLISH_BLOCKED_ID}
                  onClick={() => document.getElementById('publish-course')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                >
                  {t('builder.shell.jumpToPublish')} <ArrowRight size={15} className="rtl:rotate-180" aria-hidden />
                </Button>
              ) : isNew ? (
                // Nothing exists to continue to yet; saving the setup is what
                // moves on, and the strip below says so in text.
                <Button size="sm" disabled aria-describedby={LOCKED_HINT_ID}>
                  {t('builder.shell.continue', 'Continue')} <ArrowRight size={15} className="rtl:rotate-180" aria-hidden />
                </Button>
              ) : (
                <Link href={nextHref} onClick={guardNavigation(nextHref)} className={buttonClasses({ size: 'sm' })}>
                  {t('builder.shell.continue', 'Continue')} <ArrowRight size={15} className="rtl:rotate-180" aria-hidden />
                </Link>
              )}
            </div>
          </header>

          {/* One visible reason, at full width and at every breakpoint, so the
              buttons and locked steps that reference it are never described by a
              display:none element. */}
          {isNew && (
            <div className="border-b border-border bg-surface px-4 py-2 sm:px-7">
              <BlockedHint id={LOCKED_HINT_ID} reason={t('builder.shell.stepLockedReason')} />
            </div>
          )}

          {active === 4 && !readiness.canPublish && firstBlocked && (
            <div className="border-b border-border bg-surface px-4 py-2 sm:px-7">
              <BlockedHint
                id={PUBLISH_BLOCKED_ID}
                reason={`${t('builder.shell.publishBlockedReason')} ${t('builder.shell.publishBlockedItem').replace('{item}', firstBlocked.label)}`}
                href={firstBlocked.href}
                linkLabel={t('builder.readiness.fixIn').replace('{step}', firstBlocked.stepLabel ?? '')}
              />
            </div>
          )}

          <div className="border-b border-border bg-surface px-4 py-3 lg:hidden">
            <nav aria-label={t('builder.shell.navLabel')} className="no-scrollbar flex gap-2 overflow-x-auto">
              {STEPS.map((step, index) => {
                const label = `${index + 1}. ${t(`builder.shell.step.${step.key}`, step.label)}`
                const complete = stepComplete(step.key)
                if (stepLocked(index)) {
                  return (
                    <button
                      key={step.key}
                      type="button"
                      aria-disabled="true"
                      aria-describedby={LOCKED_HINT_ID}
                      onClick={(event) => event.preventDefault()}
                      // No `opacity-*` on a muted token: stacking them put this
                      // chip's step NAME at 2.2:1. `aria-disabled` +
                      // cursor-not-allowed + the locked hint state the state.
                      className="shrink-0 cursor-not-allowed rounded-full bg-subtle px-3 py-1.5 text-[11px] font-medium text-content-secondary"
                    >
                      {label}
                    </button>
                  )
                }
                const href = `/studio/${courseId}/${step.key}`
                return (
                  <Link
                    key={step.key}
                    href={href}
                    onClick={guardNavigation(href)}
                    aria-current={index === active ? 'step' : undefined}
                    className={cn(
                      'shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium',
                      index === active
                        ? 'bg-primary text-white'
                        : complete
                          ? 'bg-success-soft text-success'
                          : 'bg-subtle text-content-secondary'
                    )}
                  >
                    {complete && index !== active ? '✓ ' : ''}{label}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)]">
            {/* border-e, not border-r: this is the only structural border in the
                mirrored two-column builder, and `border-r` drew it on the
                outside edge of the viewport in Arabic. The rail scrolls, because
                at browser zoom its lowest steps used to clip unreachably. */}
            <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] flex-col overflow-y-auto border-e border-border bg-surface px-5 py-8 lg:flex">
              {/* tracking is Latin-only: 0.05em disconnects Arabic joins. */}
              <p className="text-[10px] font-semibold text-content-secondary ltr:tracking-wider">{t('builder.shell.eyebrow', 'COURSE BUILDER')}</p>
              <h2 className="mt-6 text-xl font-bold text-content">{t('builder.shell.heading', 'Create your course')}</h2>
              <p className="mt-3 text-xs leading-5 text-content-secondary">{t('builder.shell.subheading', 'Complete the required steps before publishing.')}</p>

              <p className="mt-5 text-[11px] font-medium text-content-secondary">
                {t('builder.shell.stepOf').replace('{n}', String(active + 1)).replace('{total}', String(STEPS.length))}
              </p>
              <Progress
                value={((active + 1) / STEPS.length) * 100}
                label={t('builder.shell.stepProgressLabel')}
                className="mt-2"
              />

              <nav aria-label={t('builder.shell.navLabel')} className="mt-6 space-y-2">
                {STEPS.map((step, index) => {
                  const selected = index === active
                  const complete = stepComplete(step.key)
                  const locked = stepLocked(index)
                  const content = (
                    <>
                      <span className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-semibold',
                        selected ? 'bg-primary text-white' : complete ? 'bg-success-soft text-success' : 'bg-subtle text-content-secondary'
                      )}>
                        {complete && !selected ? <Check size={15} aria-hidden /> : index + 1}
                      </span>
                      <span className="min-w-0 text-start">
                        <span className={cn('block text-xs font-semibold', selected ? 'text-on-brand-soft' : 'text-content')}>{t(`builder.shell.step.${step.key}`, step.label)}</span>
                        <span className="block text-[10px] text-content-secondary">
                          {complete || selected || locked || step.key === 'ai-studio'
                            ? t(`builder.shell.stepDesc.${step.key}`, step.description)
                            : t('builder.shell.stepIncomplete')}
                        </span>
                      </span>
                    </>
                  )

                  if (locked) {
                    // A real focusable control that states why it cannot be
                    // used: this was a <span aria-disabled>, unfocusable and
                    // silent, with its reason hidden in a title attribute.
                    return (
                      <button
                        key={step.key}
                        type="button"
                        aria-disabled="true"
                        aria-describedby={LOCKED_HINT_ID}
                        onClick={(event) => event.preventDefault()}
                        // No `opacity-60` here either: it dropped the step
                        // description — which `aria-describedby` implies is
                        // meant to be read — to 1.96:1 in dark.
                        className="flex w-full cursor-not-allowed items-center gap-3 rounded-input px-2.5 py-3"
                      >
                        {content}
                      </button>
                    )
                  }

                  const href = `/studio/${courseId}/${step.key}`
                  return (
                    <Link
                      key={step.key}
                      href={href}
                      onClick={guardNavigation(href)}
                      aria-current={selected ? 'step' : undefined}
                      className={cn('flex items-center gap-3 rounded-input px-2.5 py-3 transition-colors', selected ? 'bg-brand-soft' : 'hover:bg-subtle')}
                    >
                      {content}
                    </Link>
                  )
                })}
              </nav>
            </aside>

            <main className="min-w-0 px-4 py-7 sm:px-6 lg:px-8 xl:px-10">
              <div className="mx-auto w-full max-w-[1440px]">{children}</div>
            </main>
          </div>
          </div>

          {pendingHref && (
            // The backdrop dismisses, like every other modal scrim. Escape and
            // the Tab trap live on a document listener (see the effect above),
            // not on the Card: bound to the Card's onKeyDown they stopped working
            // the moment focus left the dialog — which, untrapped, it could.
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-stage/70 px-4"
              onClick={cancelPending}
            >
              <Card
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="builder-unsaved-title"
                aria-describedby="builder-unsaved-body"
                className="w-full max-w-sm p-5"
                onClick={(event) => event.stopPropagation()}
              >
                <h2 id="builder-unsaved-title" className="text-base font-semibold text-content">{t('builder.shell.unsavedTitle')}</h2>
                <p id="builder-unsaved-body" className="mt-2 text-xs leading-5 text-content-secondary">{t('builder.shell.unsavedBody')}</p>
                <div className="mt-5 flex flex-wrap justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={leavePending}>{t('builder.shell.leaveAnyway')}</Button>
                  <Button ref={stayButtonRef} size="sm" onClick={cancelPending}>{t('builder.shell.stayHere')}</Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </DirtyContext.Provider>
    </BuilderAnnouncerProvider>
  )
}
