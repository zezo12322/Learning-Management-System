'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUp, ChevronDown, ChevronUp } from 'lucide-react'
import type { CourseProgress, Lecture, Section } from '@/lib/types'
import { useT } from '@/lib/i18n'
import { lessonCountLabel } from '@/lib/i18n/format'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { LessonRow } from '@/components/learn/LessonRow'
import { LessonNav } from '@/components/learn/LessonNav'
import { cn } from '@/lib/utils'

/** Anchor on the player wrapper in the work column, for "Back to the video". */
export const MEDIA_ANCHOR = 'learn-media'

/**
 * The persistent context rail for /learn.
 *
 * The lesson list stops being a tab that unmounts Notes and becomes navigation
 * that sits beside the video: from the `rail` screen it is a sticky column with
 * its own scroller, below that an ordinary block in the page stack (a nested
 * scroller on a phone is a scroll trap, which is why the overflow rules are
 * `rail:` only).
 *
 * The course progress bar lives here rather than in the lesson header, because
 * "where am I in the course" is exactly what this panel answers.
 */
export function CurriculumPanel({
  sections,
  lectures,
  activeId,
  completedIds,
  progress,
  onSelect,
  isDesktop,
  className,
}: {
  /** Part of the shared panel signature; the rail navigates in-page only. */
  courseId: string
  sections: Section[]
  /** The flattened, access-filtered lesson list — the source of lesson numbers. */
  lectures: Lecture[]
  activeId: string | null
  completedIds: Set<string>
  progress: CourseProgress | undefined
  onSelect: (lectureId: string) => void
  isDesktop: boolean
  className?: string
}) {
  const t = useT()
  const activeRowRef = useRef<HTMLButtonElement | null>(null)
  const listRef = useRef<HTMLElement | null>(null)
  const [collapsed, setCollapsed] = useState(false)
  /** True until the list is known to overflow — no fade before it is measured. */
  const [atScrollEnd, setAtScrollEnd] = useState(true)
  // The collapse control only exists below `rail`; above it the list is the
  // point of the rail, so it is always open however the toggle was last left.
  const open = isDesktop || !collapsed

  /** Course-wide position of each lesson, so section lists still number 1..n. */
  const indexById = useMemo(() => {
    const map = new Map<string, number>()
    lectures.forEach((lecture, index) => map.set(lecture.id, index + 1))
    return map
  }, [lectures])

  const sectionProgress = useMemo(() => {
    const map = new Map<string, { done: number; total: number }>()
    for (const section of progress?.sections ?? []) {
      map.set(section.sectionId, {
        done: section.completedLectures,
        total: section.totalLectures,
      })
    }
    return map
  }, [progress])

  const activeIndex = lectures.findIndex((lecture) => lecture.id === activeId)
  const previous = activeIndex > 0 ? lectures[activeIndex - 1] : null
  const next =
    activeIndex >= 0 && activeIndex < lectures.length - 1 ? lectures[activeIndex + 1] : null
  /** The server's completion stamp for the active lesson, from course progress. */
  const activeCompletedAt = useMemo(() => {
    if (!activeId) return null
    for (const section of progress?.sections ?? []) {
      const found = (section.lectures ?? []).find((lecture) => lecture.lectureId === activeId)
      if (found) return found.completedAt
    }
    return null
  }, [progress, activeId])

  // Keep the current lesson visible inside the rail's own scroller. `nearest`
  // scrolls the panel and never the page — from `rail` the video is already on
  // screen and moving the page under the learner would be disorienting.
  useEffect(() => {
    if (!isDesktop || !open) return
    activeRowRef.current?.scrollIntoView({ block: 'nearest' })
  }, [activeId, isDesktop, open])

  /**
   * Whether the list is scrolled to its end, which is what decides if the bottom
   * fade is shown. Measured rather than assumed: a fade that never turns off
   * promises content past the last lesson.
   */
  const updateScrollEdge = useCallback(() => {
    const el = listRef.current
    if (!el) return
    // 1px of slack: fractional scroll positions never land exactly on the end.
    setAtScrollEnd(el.scrollHeight - el.scrollTop - el.clientHeight <= 1)
  }, [])

  // Re-measure whenever the content or the box can have changed — selecting a
  // lesson scrolls the list, and the rail's height follows the viewport.
  useEffect(() => {
    updateScrollEdge()
    const el = listRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(updateScrollEdge)
    observer.observe(el)
    return () => observer.disconnect()
  }, [updateScrollEdge, sections, activeId, isDesktop, open])

  const jumpToCurrent = () => {
    // Asking for the current lesson while the list is collapsed opens it first,
    // otherwise the control would appear to do nothing.
    setCollapsed(false)
    window.requestAnimationFrame(() => {
      activeRowRef.current?.scrollIntoView({ block: 'nearest' })
      activeRowRef.current?.focus()
    })
  }

  const percent = Math.round(progress?.overallPercentage ?? 0)

  return (
    // rail:h-full so the sticky card has room to move: a sticky element can only
    // travel inside its containing block, and an auto-height <aside> is exactly
    // as tall as the card it wraps.
    <aside aria-labelledby="learn-curriculum-heading" className={cn('rail:h-full', className)}>
      <Card className="flex h-fit flex-col p-0 rail:sticky rail:top-24 rail:max-h-[calc(100vh-7rem)]">
        {/* Header — never scrolls away, so "where am I" is always answered. */}
        <div className="shrink-0 space-y-3 border-b border-border p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h2 id="learn-curriculum-heading" className="text-sm font-bold text-content">
                {t('learn.curriculum')}
              </h2>
              <p className="mt-0.5 text-xs text-content-secondary">
                {lessonCountLabel(lectures.length, t)}
              </p>
            </div>
            {!isDesktop && (
              <button
                type="button"
                onClick={() => setCollapsed((value) => !value)}
                aria-expanded={open}
                aria-controls="learn-curriculum-list"
                className="inline-flex shrink-0 items-center gap-1 rounded-btn border border-border px-2.5 py-1.5 text-xs font-semibold text-content-secondary transition-colors hover:text-content"
              >
                {open ? (
                  <ChevronUp size={14} aria-hidden />
                ) : (
                  <ChevronDown size={14} aria-hidden />
                )}
                {open ? t('learn.curriculum.hide') : t('learn.curriculum.show')}
              </button>
            )}
          </div>

          {progress && (
            <div className="space-y-1.5">
              <Progress
                label={t('learn.curriculum.progressLabel')}
                value={percent}
                tone={percent >= 100 ? 'success' : 'primary'}
              />
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs">
                <span className="font-bold text-primary">
                  {t('common.percentComplete').replace('{n}', String(percent))}
                </span>
                <span className="text-content-secondary">
                  {t('learn.curriculum.completeCount')
                    .replace('{done}', String(progress.completedLectures))
                    .replace('{total}', String(progress.totalLectures))}
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <button
              type="button"
              onClick={jumpToCurrent}
              disabled={activeIndex < 0}
              className="text-xs font-semibold text-primary hover:underline disabled:cursor-not-allowed disabled:text-content-muted disabled:no-underline"
            >
              {t('learn.curriculum.jumpToCurrent')}
            </button>
            {/* Not gated on `!isDesktop` any more. At xl the rail is the LAST
                grid column, so it is the last thing in the DOM; this anchor is
                the only way back to the player without tabbing through the whole
                active tab panel, and it pairs with the work column's
                `learn.skipToLessons` skip link. */}
            <a
              href={`#${MEDIA_ANCHOR}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-content-secondary hover:text-content"
            >
              <ArrowUp size={13} aria-hidden />
              {t('learn.backToVideo')}
            </a>
          </div>
        </div>

        {/* The list. Its own scroller from `rail` only — a nested scroller on a
            phone is a scroll trap — and hidden rather than unmounted when
            collapsed, so the toggle's aria-controls always points at something
            real. `hidden` still takes it out of the tab order and the a11y tree.

            The wrapper exists to hang the bottom fade off: the scroller cuts the
            next row mid-word, which read as a broken layout rather than as
            "there is more below". */}
        <div className={cn('relative flex min-h-0 flex-1 flex-col', !open && 'hidden')}>
          <nav
            ref={listRef}
            id="learn-curriculum-list"
            aria-label={t('learn.curriculum.navLabel')}
            onScroll={updateScrollEdge}
            className={cn(
              'min-h-0 flex-1 pb-2 rail:overflow-y-auto rail:overscroll-contain',
              !open && 'hidden',
            )}
          >
            {sections.map((section) => {
              const counts = sectionProgress.get(section.id)
              return (
                <ul key={section.id} className="px-2">
                  {/* Solid, never transparent: rows scroll underneath it. It
                      sticks from `rail` only, because that is where the scroller
                      it belongs to exists — below that the page scrolls, and
                      pinning titles to the viewport would fight the app header. */}
                  <li className="z-10 -mx-2 flex items-start justify-between gap-2 bg-surface px-4 py-2 rail:sticky rail:top-0">
                    {/* uppercase/tracking are Latin-only display treatments:
                        positive letter-spacing breaks Arabic cursive joins and
                        casing is a no-op there, so both are gated on `ltr:`. */}
                    {/* line-clamp-2, not truncate: at every rail width the real
                        section titles are longer than one line, so a single-line
                        clamp ellipsised all of them ("Getting started with
                        accessible produ…") and the wider rail did not help. */}
                    <h3
                      dir="auto"
                      className="line-clamp-2 min-w-0 text-xs font-bold text-content-secondary ltr:uppercase ltr:tracking-wide"
                    >
                      {section.title}
                    </h3>
                    {counts && (
                      <span className="shrink-0 text-[11px] font-semibold text-content-secondary">
                        {t('learn.curriculum.sectionDone')
                          .replace('{done}', String(counts.done))
                          .replace('{total}', String(counts.total))}
                      </span>
                    )}
                  </li>
                  {section.lectures.map((lecture) => {
                    const active = lecture.id === activeId
                    return (
                      <LessonRow
                        key={lecture.id}
                        ref={active ? activeRowRef : undefined}
                        lecture={lecture}
                        index={indexById.get(lecture.id) ?? 0}
                        active={active}
                        completed={completedIds.has(lecture.id)}
                        variant={isDesktop ? 'stacked' : 'row'}
                        onSelect={() => onSelect(lecture.id)}
                      />
                    )
                  })}
                </ul>
              )
            })}
          </nav>
          {/* Only while there is actually more to reach, so the panel never
              claims hidden content at the end of the list. Decorative and
              click-through: the row underneath stays reachable. */}
          {!atScrollEnd && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-8 bg-gradient-to-b from-transparent to-surface rail:block"
            />
          )}
        </div>

        {/* Footer — Previous/Next from `rail`, where it is always on screen.
            Below that the page renders one LessonNav at the foot of the work
            column instead, so the pair is never duplicated. */}
        {isDesktop && (
          <div className="shrink-0 border-t border-border p-3">
            <LessonNav
              previous={previous}
              next={next}
              completedAt={activeCompletedAt}
              onGo={onSelect}
            />
          </div>
        )}
      </Card>
    </aside>
  )
}
