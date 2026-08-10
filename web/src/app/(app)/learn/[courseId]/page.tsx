'use client'

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, BookOpen, ClipboardList, FileText, Lock } from 'lucide-react'
import { catalogApi, enrollmentApi, progressApi } from '@/lib/api/services'
import { useT } from '@/lib/i18n'
import { formatSecondsLocalized } from '@/lib/i18n/format'
import { Card } from '@/components/ui/card'
import { Button, buttonClasses } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PageSpinner } from '@/components/ui/spinner'
import { TabList, TabPanel } from '@/components/ui/tabs'
import { Announcer, useAnnouncer } from '@/components/ui/live-region'
import { SaveButton } from '@/components/course/SaveButton'
import { LecturePlayer } from '@/components/learn/LecturePlayer'
import {
  EMPTY_NOTE_DRAFT,
  NotesTab,
  hasNoteDraftText,
  type NoteDraft,
} from '@/components/learn/NotesTab'
import { ResourcesTab } from '@/components/learn/ResourcesTab'
import { DiscussionTab } from '@/components/learn/DiscussionTab'
import { CurriculumPanel, MEDIA_ANCHOR } from '@/components/learn/CurriculumPanel'
import { LessonNav } from '@/components/learn/LessonNav'
import { resolveLessonId } from '@/lib/learn/nextLesson'
import { useIsDesktop } from '@/lib/useMediaQuery'

type Tab = 'CURRICULUM' | 'NOTES' | 'RESOURCES' | 'DISCUSSION'

const TABS: readonly Tab[] = ['CURRICULUM', 'NOTES', 'RESOURCES', 'DISCUSSION']

/** Read `?tab=notes` back into a Tab, ignoring anything unrecognised. */
function parseTab(value: string | null): Tab | null {
  const upper = value?.toUpperCase() as Tab | undefined
  return upper && TABS.includes(upper) ? upper : null
}

export default function LearnPage() {
  // useSearchParams needs a Suspense boundary during static prerender — same
  // pattern as app/(app)/catalog/page.tsx.
  return (
    <Suspense fallback={<PageSpinner />}>
      <LearnView />
    </Suspense>
  )
}

/**
 * Course learning screen (Figma "8. Course Learning" + tabs 9–11), rebuilt as a
 * work column plus a persistent context rail.
 *
 * From the `rail` screen the lesson list is a sticky column beside the video
 * instead of a tab that unmounts Notes, and the stage is height-capped so both
 * fit on screen at once. Below it the page is the single stack the phone layout
 * always was, with the curriculum as the default tab.
 *
 * Completion is not an action here — the server awards it from watch time
 * reported by the player.
 */
function LearnView() {
  const t = useT()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { courseId } = useParams<{ courseId: string }>()
  const isDesktop = useIsDesktop()
  const { message, announce } = useAnnouncer()

  const [activeId, setActiveId] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>(() => parseTab(searchParams.get('tab')) ?? 'CURRICULUM')
  /** Live playback position for the active lecture, reported by the player. */
  const [position, setPosition] = useState(0)
  /**
   * The note editor's state lives here, not in NotesTab: switching tabs unmounts
   * the panel, and a half-written note used to disappear with it.
   */
  const [noteDraft, setNoteDraft] = useState<NoteDraft>(EMPTY_NOTE_DRAFT)

  const curriculum = useQuery({
    queryKey: ['curriculum', courseId],
    queryFn: () => catalogApi.curriculum(courseId),
  })
  const enrollment = useQuery({
    queryKey: ['enrollment', courseId],
    queryFn: () => enrollmentApi.get(courseId),
  })
  const progress = useQuery({
    queryKey: ['course-progress', courseId],
    queryFn: () => progressApi.course(courseId),
  })

  const allSections = useMemo(() => curriculum.data?.sections ?? [], [curriculum.data])
  /**
   * Lecture ids the server has marked complete. Built from the course-progress
   * response so the curriculum list can show at a glance which lessons are done
   * — before this, that was only visible by opening each one.
   */
  const completedIds = useMemo(
    () =>
      new Set(
        (progress.data?.sections ?? []).flatMap((section) =>
          (section.lectures ?? []).filter((l) => l.completedAt).map((l) => l.lectureId),
        ),
      ),
    [progress.data],
  )
  const isEnrolled =
    enrollment.data?.status === 'ACTIVE' || enrollment.data?.status === 'COMPLETED'

  // Without an enrollment the screen is limited to the lessons the instructor
  // marked as free previews — the lecture and stream endpoints open exactly
  // those to any signed-in user, so this is a real preview, not a teaser.
  const sections = useMemo(
    () =>
      isEnrolled
        ? allSections
        : allSections
            .map((section) => ({
              ...section,
              lectures: section.lectures.filter((lecture) => lecture.isFreePreview),
            }))
            .filter((section) => section.lectures.length > 0),
    [allSections, isEnrolled],
  )
  const lectures = useMemo(() => sections.flatMap((section) => section.lectures), [sections])
  const previewOnly = !isEnrolled && lectures.length > 0

  const mediaRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  /** Set by a lesson pick below xl, consumed once the new lesson has rendered. */
  const scrollOnSelect = useRef(false)
  /** Whether the resume position has already been resolved for this course. */
  const resolved = useRef(false)

  const requestedLesson = searchParams.get('lesson')

  /**
   * Land on where the learner left off — the first lesson with no `completedAt`
   * — rather than lesson one, unless a `?lesson=` deep link asks for a specific
   * lesson that they can actually open. The same effect re-resolves when the
   * visible lesson list changes underneath the selection (an enrolment
   * resolving, for instance, widens a preview list).
   */
  useEffect(() => {
    if (!lectures.length) return
    if (activeId && lectures.some((lecture) => lecture.id === activeId)) return
    // Wait for progress on the very first resolve, otherwise "resume" would
    // always mean lesson one.
    if (!resolved.current && progress.isLoading) return
    const next = resolveLessonId(activeId ?? requestedLesson, lectures, progress.data)
    if (!next) return
    const first = !resolved.current
    resolved.current = true
    setActiveId(next)
    const index = lectures.findIndex((lecture) => lecture.id === next)
    if (first && index > 0) {
      announce(t('learn.resumingAtLesson').replace('{n}', String(index + 1)))
    }
  }, [lectures, activeId, requestedLesson, progress.isLoading, progress.data, announce, t])

  /**
   * Keep `?lesson=` and `?tab=` in step with what is on screen, so the URL is
   * shareable and the browser Back button steps through lessons. `scroll: false`
   * because the learner is already looking at the thing that changed.
   */
  useEffect(() => {
    if (!activeId) return
    const params = new URLSearchParams(searchParams.toString())
    params.set('lesson', activeId)
    params.set('tab', tab.toLowerCase())
    const query = params.toString()
    if (query === searchParams.toString()) return
    router.replace(`${pathname}?${query}`, { scroll: false })
  }, [activeId, tab, pathname, router, searchParams])

  // From `rail` the curriculum is the column, so it is not a tab. If the viewport grows
  // while the Curriculum tab is open, move to Notes rather than leaving an
  // empty panel behind a tab that no longer exists.
  useEffect(() => {
    if (isDesktop && tab === 'CURRICULUM') setTab('NOTES')
  }, [isDesktop, tab])

  /**
   * Below xl the video is off screen when the lesson list is in view, so a pick
   * scrolls the stage into view and moves focus to the lesson heading. At xl
   * both are already visible and scrolling the page would be disorienting — the
   * rail scrolls its own active row instead (see CurriculumPanel).
   */
  useEffect(() => {
    if (!scrollOnSelect.current) return
    scrollOnSelect.current = false
    mediaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // preventScroll, so focus does not jump ahead of the smooth scroll.
    headingRef.current?.focus({ preventScroll: true })
  }, [activeId])

  const selectLesson = useCallback(
    (lectureId: string) => {
      if (lectureId === activeId) return
      scrollOnSelect.current = !isDesktop
      setActiveId(lectureId)
      // Announce EVERY selection, not just the initial resume. At xl picking a
      // lesson swaps the player, the h1, the duration and the About block with
      // no scroll and no focus move, so the change was conveyed only visually
      // plus an aria-current flip on the pressed button.
      const index = lectures.findIndex((lecture) => lecture.id === lectureId)
      if (index < 0) return
      announce(
        t('learn.nowPlayingLesson')
          .replace('{n}', String(index + 1))
          .replace('{title}', lectures[index].title),
      )
    },
    [activeId, isDesktop, lectures, announce, t],
  )

  const activeIndex = lectures.findIndex((lecture) => lecture.id === activeId)
  const active = activeIndex >= 0 ? lectures[activeIndex] : null
  const previous = activeIndex > 0 ? lectures[activeIndex - 1] : null
  const next =
    activeIndex >= 0 && activeIndex < lectures.length - 1 ? lectures[activeIndex + 1] : null

  // Resume where this lecture was left off, and know whether it is already done.
  const lectureState = useQuery({
    queryKey: ['lecture-progress', activeId],
    queryFn: () => progressApi.lecture(activeId as string),
    enabled: Boolean(activeId) && isEnrolled,
  })

  // Reset the reported position when the lecture changes, so one lesson's
  // progress can never be written against another.
  useEffect(() => {
    setPosition(0)
  }, [activeId])

  const storedSecond = lectureState.data?.lastWatchedSecond ?? 0
  /** Watch time already banked server-side, which seeds the player's accumulator. */
  const storedWatchedSeconds = lectureState.data?.watchedSeconds ?? 0
  /**
   * Never send a position behind what the server already has. The sync write
   * re-derives completion from the position it receives and overwrites
   * `completedAt` — so posting a stale value would rewind the saved place and
   * un-complete a lecture the heartbeat had already finished.
   */
  const furthestSecond = Math.max(position, storedSecond)

  const tabItems = useMemo(() => {
    const items: { value: Tab; label: string }[] = [
      { value: 'NOTES', label: t('learn.tab.notes') },
      { value: 'RESOURCES', label: t('learn.tab.resources') },
      { value: 'DISCUSSION', label: t('learn.tab.discussion') },
    ]
    // The curriculum is a tab only below xl, where there is no room for a rail.
    return isDesktop
      ? items
      : [{ value: 'CURRICULUM' as Tab, label: t('learn.tab.curriculum') }, ...items]
  }, [isDesktop, t])

  if (curriculum.isLoading || enrollment.isLoading) return <PageSpinner />

  // A failed lookup is not a negative answer: locking an enrolled learner out
  // of a lesson they paid for because a request dropped is the worse failure.
  if (enrollment.isError || curriculum.isError) {
    return (
      <Card className="mx-auto max-w-lg space-y-3 p-8 text-center">
        <p className="text-sm text-error">{t('learn.loadError')}</p>
        <Button
          variant="outline"
          onClick={() => {
            void enrollment.refetch()
            void curriculum.refetch()
          }}
        >
          {t('learn.player.retry')}
        </Button>
      </Card>
    )
  }

  if (!isEnrolled && lectures.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <Lock size={40} className="text-content-secondary" />
        <p className="text-content-secondary">{t('learn.mustEnroll')}</p>
        {/* buttonClasses on the anchor, not <Link><Button>: a <button> inside
            an <a> is invalid HTML and adds a dead second focus stop. */}
        <Link href={`/courses/${courseId}`} className={buttonClasses()}>
          {t('learn.goToCourse')}
        </Link>
      </div>
    )
  }

  const completedAt = lectureState.data?.completedAt ?? null
  const lessonNumber = activeIndex + 1
  /**
   * Whether the learner has reached the point where completion becomes possible.
   * Only drives the explanatory hint below — nothing here can grant completion,
   * which the server derives from position and credited watch time together.
   */
  const duration = active?.duration ?? 0
  const canComplete = duration > 0 && furthestSecond >= duration * 0.9
  const draftKept = tab !== 'NOTES' && hasNoteDraftText(noteDraft)

  const panel = (
    <CurriculumPanel
      courseId={courseId}
      sections={sections}
      lectures={lectures}
      activeId={activeId}
      completedIds={completedIds}
      progress={progress.data}
      onSelect={selectLesson}
      isDesktop={isDesktop}
    />
  )

  return (
    <div className="mx-auto max-w-[1400px] space-y-4">
      <Announcer message={message} />

      {previewOnly && (
        <Card className="flex flex-wrap items-center justify-between gap-3 bg-brand-soft p-4">
          <p className="text-sm font-semibold text-on-brand-soft">{t('learn.previewOnly')}</p>
          <Link href={`/courses/${courseId}`} className={buttonClasses({ size: 'sm' })}>
            {t('learn.enrollForFull')}
          </Link>
        </Card>
      )}

      {/* Work column first in the DOM: grid tracks follow inline direction, so
          it lands on the start side in both locales with no order-* and no
          directional utility, and keyboard order already matches the visuals. */}
      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 rail:grid-cols-[minmax(0,1fr)_340px] rail-wide:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-4">
          {/* The lesson list is visually at the top of the rail, level with the
              video, but it is the LAST grid column and therefore the last thing
              in the DOM: reaching it by keyboard means traversing the player,
              the tab row and the whole active panel (Discussion's thread, Notes'
              per-note buttons). This is the escape hatch; CurriculumPanel's
              "Back to the video" anchor is the return trip. */}
          <a
            href="#learn-curriculum-list"
            className="sr-only rounded-btn bg-surface px-3 py-2 text-xs font-semibold text-primary ring-2 ring-primary/40 focus:not-sr-only focus:absolute focus:z-20"
          >
            {t('learn.skipToLessons')}
          </a>
          {/* Player. The stage is height-capped at xl so the lesson list is on
              screen with the video — a full-height player is why it never was.
              tabIndex=-1 so the rail's "Back to the video" link moves focus
              here as well as the viewport. */}
          {/* A real focus target: CurriculumPanel's "Back to the video" anchor
              points here, and fragment navigation moves focus to a tabindex="-1"
              target. `focus:outline-none` alone left the user on an invisible,
              unstyled container (WCAG 2.4.7) — this matches the <h1> below. */}
          <div
            id={MEDIA_ANCHOR}
            ref={mediaRef}
            tabIndex={-1}
            className="scroll-mt-24 rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            {active?.type === 'VIDEO' ? (
              <LecturePlayer
                key={active.id}
                lectureId={active.id}
                title={active.title}
                posterSeed={active.id}
                resumeAtSecond={storedSecond}
                watchedSecondsSoFar={storedWatchedSeconds}
                onPosition={setPosition}
                onEnded={() => next && selectLesson(next.id)}
                className="rail:max-h-[min(58vh,640px)]"
              />
            ) : active?.type === 'READING' ? (
              <Card className="p-6">
                <div className="mb-3 flex items-center gap-2 text-primary">
                  <FileText size={18} aria-hidden />
                  <h2 className="font-semibold">{t('learn.reading')}</h2>
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-content-secondary">
                  {active.content?.trim() ? active.content : t('learn.readingEmpty')}
                </p>
              </Card>
            ) : active?.type === 'QUIZ' ? (
              <Card className="flex flex-col items-center gap-3 p-10 text-center">
                <ClipboardList size={40} className="text-primary" aria-hidden />
                <h2 className="text-base font-bold text-content">{active.title}</h2>
                <p className="text-sm text-content-secondary">{t('learn.quizIntro')}</p>
                <Link href={`/quiz/${courseId}/${active.id}/take`} className={buttonClasses()}>
                  {t('learn.openQuiz')}
                </Link>
              </Card>
            ) : active ? (
              <Card className="flex aspect-video flex-col items-center justify-center gap-2 p-8 text-center">
                <BookOpen size={36} className="text-content-muted" aria-hidden />
                <h2 className="text-base font-bold text-content">{active.title}</h2>
                <p className="text-sm text-content-secondary">{t('learn.unsupportedType')}</p>
              </Card>
            ) : (
              // The stage tokens, not bg-content/text-white: this card used to be
              // white text on a white card in dark mode.
              <Card className="flex aspect-video flex-col items-center justify-center gap-2 bg-stage p-8 text-center text-on-stage rail:max-h-[min(58vh,640px)]">
                <p className="text-sm font-semibold">{t('learn.selectLesson')}</p>
                <p className="text-xs text-on-stage-muted">{t('learn.selectLessonHint')}</p>
              </Card>
            )}
          </div>

          {/* Lesson header. The course progress bar moved out of here and into
              the rail, which is where "where am I in the course" belongs. */}
          <Card className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Link
                  href={`/courses/${courseId}`}
                  className="inline-flex max-w-full items-center gap-1 text-xs font-semibold text-content-secondary hover:text-content"
                >
                  <ArrowLeft size={13} className="rtl:rotate-180" aria-hidden />
                  <span className="truncate">{curriculum.data?.title}</span>
                </Link>
                {active && (
                  <p className="mt-1.5 text-[11px] font-bold text-content-secondary ltr:uppercase ltr:tracking-wide">
                    {t('learn.lessonHeadingLabel')}
                  </p>
                )}
                <h1
                  ref={headingRef}
                  tabIndex={-1}
                  className="mt-0.5 break-words text-xl font-bold text-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  {/* Number and title are separate runs, the same split
                      LessonRow makes. As one interpolated string in an Arabic
                      page the leading "4." was a weak digit followed by a
                      neutral full stop, so bidi resolved it against the Latin
                      title and rendered "…in practice .4". */}
                  {active ? (
                    <>
                      <span dir="ltr">{lessonNumber}.</span>{' '}
                      <span dir="auto">{active.title}</span>
                    </>
                  ) : (
                    t('learn.selectLesson')
                  )}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-content-secondary">
                  {active && <span>{formatSecondsLocalized(active.duration, t)}</span>}
                  <span>
                    {t('learn.lessonOf')
                      .replace('{n}', String(Math.max(1, lessonNumber)))
                      .replace('{total}', String(lectures.length))}
                  </span>
                  <Badge tone={completedAt ? 'success' : 'primary'}>
                    {completedAt ? t('student.completed') : t('student.inProgress')}
                  </Badge>
                </div>
                {active && !previewOnly && !completedAt && !canComplete && (
                  <p className="mt-2 text-xs text-content-secondary">
                    {duration > 0 ? t('learn.completeHint') : t('learn.completeNoDuration')}
                  </p>
                )}
              </div>
              {/* variant="inline" — the overlay pill assumes an image behind it
                  and is unreadable on a plain surface card. */}
              <SaveButton
                courseId={courseId}
                variant="inline"
                showLabel={isDesktop}
                className="shrink-0"
              />
            </div>

            {active?.content?.trim() && active.type !== 'READING' && (
              <div className="mt-4 border-t border-border pt-3">
                <h2 className="text-sm font-bold text-content">{t('learn.aboutLesson')}</h2>
                <p className="mt-1.5 whitespace-pre-wrap text-xs leading-5 text-content-secondary">
                  {active.content}
                </p>
              </div>
            )}
          </Card>

          {/* A draft outlives a tab switch now, so say so — and give the learner
              a way to throw it away on purpose. */}
          {draftKept && (
            <Card className="flex flex-wrap items-center justify-between gap-3 p-3">
              <p className="text-xs text-content-secondary">{t('learn.notes.draftKept')}</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setTab('NOTES')}>
                  {t('learn.tab.notes')}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setNoteDraft(EMPTY_NOTE_DRAFT)}
                  className="text-error"
                >
                  {t('learn.notes.draftDiscard')}
                </Button>
              </div>
            </Card>
          )}

          <TabList
            items={tabItems}
            value={tab}
            onChange={setTab}
            idBase="learn"
            ariaLabel={t('learn.tabsLabel')}
          />

          <TabPanel tab="NOTES" activeTab={tab} idBase="learn">
            <NotesTab
              lectureId={activeId}
              lectureTitle={active?.title ?? ''}
              lectureIds={lectures.map((lecture) => lecture.id)}
              currentSecond={furthestSecond}
              draft={noteDraft}
              onDraftChange={setNoteDraft}
            />
          </TabPanel>

          {/* Mounted only while its tab is active: ResourcesTab fans out one
              GET /lectures/:id per lecture, so it must never load eagerly. */}
          <TabPanel tab="RESOURCES" activeTab={tab} idBase="learn">
            <ResourcesTab sections={sections} />
          </TabPanel>

          <TabPanel tab="DISCUSSION" activeTab={tab} idBase="learn">
            <DiscussionTab />
          </TabPanel>

          {/* Below xl the rail is behind the Curriculum tab, so Previous/Next
              lives at the foot of the work column. At xl it is in the rail
              footer instead — never both. */}
          {!isDesktop && (
            <Card className="p-3">
              <LessonNav
                previous={previous}
                next={next}
                completedAt={completedAt}
                onGo={selectLesson}
              />
            </Card>
          )}
        </div>

        {/* The rail. At xl it is always present; below xl the same single
            instance is the Curriculum tab's panel, so the list is never
            duplicated in the DOM. */}
        <div className="min-w-0">
          {isDesktop ? (
            panel
          ) : (
            <TabPanel tab="CURRICULUM" activeTab={tab} idBase="learn">
              {panel}
            </TabPanel>
          )}
        </div>
      </div>
    </div>
  )
}
