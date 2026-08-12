'use client'

import { useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import {
  ArrowLeft,
  Award,
  BarChart3,
  Clock,
  Globe2,
  Lock,
  MessageSquare,
  PlayCircle,
  Sparkles,
} from 'lucide-react'
import { catalogApi, enrollmentApi, progressApi, ratingsApi } from '@/lib/api/services'
import { useT } from '@/lib/i18n'
import { formatSecondsLocalized, lessonCountLabel } from '@/lib/i18n/format'
import { nextLessonId } from '@/lib/learn/nextLesson'
import type { CourseCard } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { RatingStars } from '@/components/common/RatingStars'
import { CourseMetaRow } from '@/components/course/CourseMetaRow'
import { EnrollCta } from '@/components/course/EnrollCta'
import { formatCompact, formatPrice, cn } from '@/lib/utils'

export default function CourseDetailsPage() {
  const t = useT()
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const curriculum = useQuery({
    queryKey: ['curriculum', id],
    queryFn: () => catalogApi.curriculum(id),
  })
  const catalog = useQuery({ queryKey: ['catalog'], queryFn: catalogApi.list })
  const reviews = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => ratingsApi.list(id, 5),
  })
  const enrollment = useQuery({
    queryKey: ['enrollment', id],
    queryFn: () => enrollmentApi.get(id),
  })

  const meta: CourseCard | undefined = useMemo(
    () => catalog.data?.find((c) => c.id === id),
    [catalog.data, id]
  )

  const lectures = useMemo(
    () => curriculum.data?.sections.flatMap((s) => s.lectures) ?? [],
    [curriculum.data]
  )
  const totalLessons = lectures.length
  const totalSeconds = lectures.reduce((s, l) => s + (l.duration ?? 0), 0)
  const freePreviewCount = lectures.filter((l) => l.isFreePreview).length
  const isEnrolled = enrollment.data?.status === 'ACTIVE' || enrollment.data?.status === 'COMPLETED'
  const summary = curriculum.data?.ratingSummary
  const language = curriculum.data?.language || meta?.language || null

  // Only an enrolled learner has progress to resume, and only then is the
  // request worth making. It is the same query key /learn uses, so arriving
  // there from the CTA reuses this cache entry.
  const progress = useQuery({
    queryKey: ['course-progress', id],
    queryFn: () => progressApi.course(id),
    enabled: isEnrolled,
  })
  /**
   * The lesson "Resume" should open — the first one the server has not marked
   * complete. Without this the CTA promised to continue the course and dropped
   * the learner back on lesson one.
   */
  const resumeLessonId = useMemo(
    () => nextLessonId(lectures, progress.data),
    [lectures, progress.data]
  )

  if (curriculum.isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-56 w-full rounded-card" />
        <Skeleton className="h-24 w-full rounded-card" />
        <Skeleton className="h-64 w-full rounded-card" />
      </div>
    )
  }

  if (curriculum.isError) {
    return <p className="py-12 text-center text-content-secondary">{t('courseDetail.loadError')}</p>
  }

  const cta = (
    <EnrollCta
      courseId={id}
      price={meta?.price ?? 0}
      isEnrolled={isEnrolled}
      percentage={progress.data?.overallPercentage}
      nextLessonId={resumeLessonId}
      fullWidth
    />
  )
  const priceLabel =
    meta && meta.price > 0 ? formatPrice(meta.price / 100) : t('course.free')

  return (
    <div className="space-y-6">
      {/* Hero */}
      {/* Painted from tokens: `.gradient-primary` now reads per-theme stops, and
          the chips/body use on-stage rather than literal white alphas. Before
          this the hero was a fixed high-luminance indigo slab — the single
          brightest element on an otherwise #0F172A dark page. */}
      <div className="gradient-primary relative overflow-hidden rounded-card p-6 text-on-stage">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-on-stage/20 hover:bg-on-stage/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-stage/60"
          aria-label={t('courseDetail.back')}
        >
          <ArrowLeft size={18} className="rtl:rotate-180" aria-hidden />
        </button>
        {meta?.category?.name && (
          <span dir="auto" className="mb-2 inline-block rounded-full bg-on-stage/20 px-3 py-1 text-xs font-semibold">
            {meta.category.name}
          </span>
        )}
        <h1 dir="auto" className="text-title-md font-bold">{curriculum.data?.title}</h1>
        {meta?.description && (
          <p dir="auto" className="mt-2 max-w-2xl text-sm text-on-stage/85">{meta.description}</p>
        )}
      </div>

      {/* Work column + persistent context rail. The work column is declared
          first in the DOM, so the grid places it at the start side in both
          locales and the keyboard order already matches the visual one. */}
      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 rail:grid-cols-[minmax(0,1fr)_340px] rail-wide:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-6">
          {/* Instructor + the course's facts. The four stat tiles that used to
              sit here repeated what the rail now states, and repeated it in a
              second format. */}
          <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            {meta?.author?.name ? (
              <div className="flex items-center gap-3">
                <Avatar src={meta.author.avatar} name={meta.author.name} size={48} />
                <div>
                  <p className="font-semibold text-content">{meta.author.name}</p>
                  <p className="text-xs text-content-secondary">{t('courseDetail.instructor')}</p>
                </div>
              </div>
            ) : null}
            <CourseMetaRow
              lessons={totalLessons}
              durationSeconds={totalSeconds}
              level={meta?.level}
              language={language}
              rating={summary && summary.count > 0 ? summary.average : null}
              ratingCount={summary?.count ?? null}
            />
          </Card>

          {/* Curriculum */}
          <section>
            <h2 className="mb-3 text-title-sm font-bold text-content">{t('courseDetail.curriculum')}</h2>
            <Card className="divide-y divide-border">
              {curriculum.data?.sections.map((section) => (
                <div key={section.id} className="p-4">
                  <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <p className="text-sm font-semibold text-content">{section.title}</p>
                    <p className="text-xs text-content-secondary">
                      {lessonCountLabel(section.lectures.length, t)}
                    </p>
                  </div>
                  <ul className="space-y-1">
                    {section.lectures.map((lecture, idx) => {
                      const locked = !isEnrolled && !lecture.isFreePreview
                      return (
                        <li
                          key={lecture.id}
                          className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg px-2 py-2 text-sm"
                        >
                          <span className="text-content-secondary" aria-hidden="true">
                            {locked ? (
                              <Lock size={16} />
                            ) : (
                              <PlayCircle size={16} className="text-primary" />
                            )}
                          </span>
                          <span className={cn('min-w-0 flex-1', locked ? 'text-content-secondary' : 'text-content')}>
                            {idx + 1}. {lecture.title}
                          </span>
                          {/* The padlock alone was the only thing saying "you
                              cannot open this" — meaning carried by an icon and
                              a grey tint, and nothing else. */}
                          {locked && (
                            <span className="text-xs text-content-secondary">{t('course.lockedLesson')}</span>
                          )}
                          {lecture.isFreePreview && !isEnrolled && (
                            <Badge tone="info">{t('common.preview')}</Badge>
                          )}
                          <span className="text-xs text-content-secondary">
                            {formatSecondsLocalized(lecture.duration, t)}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </Card>
          </section>

          {/* Reviews */}
          {reviews.data && reviews.data.length > 0 && (
            <section>
              <h2 className="mb-3 text-title-sm font-bold text-content">
                {t('courseDetail.reviews')} {summary?.count ? `(${formatCompact(summary.count)})` : ''}
              </h2>
              <div className="space-y-3">
                {reviews.data.map((r, i) => (
                  <Card key={i} className="p-4">
                    <div className="mb-1 flex items-center gap-2">
                      <Avatar src={r.user.avatar} name={r.user.name} size={32} />
                      <span className="text-sm font-semibold text-content">{r.user.name}</span>
                      <RatingStars value={r.rating} size={12} showValue={false} className="ms-auto" />
                    </div>
                    {r.review && <p className="text-sm text-content-secondary">{r.review}</p>}
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* The rail: price, the decision, and what the decision buys. It stays
            beside the work column at xl and simply stacks below it under that. */}
        {/* tabIndex={0}: from xl this is a height-capped scroller whose only
            focusable child (EnrollCta) sits at the very top, so on a 720px-tall
            laptop — or at 200% zoom — the "What's included" facts below it
            scrolled out of keyboard reach (WCAG 2.1.1). `aria-labelledby`
            already names it, so it is a legitimate named scroll region. */}
        <aside
          aria-labelledby="course-included-heading"
          tabIndex={0}
          className="rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rail:sticky rail:top-24 rail:max-h-[calc(100vh-7rem)] rail:self-start rail:overflow-y-auto rail:overscroll-contain"
        >
          <Card className="p-5">
            {/* Below xl the bar at the foot of the page owns the price and the
                CTA, so they are not stated twice on one screen. */}
            <div className="hidden rail:block">
              <p className="text-2xl font-bold text-content">{priceLabel}</p>
              <div className="mt-4">{cta}</div>
              <div className="my-5 border-t border-border" />
            </div>

            <h2 id="course-included-heading" className="text-title-sm font-bold text-content">
              {t('course.whatYouGet')}
            </h2>
            <ul role="list" className="mt-3 space-y-2.5 text-sm">
              <IncludedFact
                icon={<Clock size={15} />}
                label={t('course.totalDuration')}
                value={formatSecondsLocalized(totalSeconds, t)}
              />
              <IncludedFact
                icon={<PlayCircle size={15} />}
                label={t('course.lessonsLabel')}
                value={String(totalLessons)}
              />
              {meta?.level && (
                <IncludedFact
                  icon={<BarChart3 size={15} />}
                  label={t('course.levelLabel')}
                  value={t(`level.${meta.level}`, meta.level)}
                />
              )}
              {language && (
                <IncludedFact
                  icon={<Globe2 size={15} />}
                  label={t('course.languageLabel')}
                  value={t(`courseLanguage.${language}`, language)}
                />
              )}
              <IncludedNote
                icon={<Sparkles size={15} />}
                text={
                  freePreviewCount > 0
                    ? t('course.freePreviewLessons').replace('{n}', String(freePreviewCount))
                    : t('course.noFreePreview')
                }
              />
              <IncludedNote icon={<Award size={15} />} text={t('course.includesCertificate')} />
              <IncludedNote
                icon={<MessageSquare size={15} />}
                text={t('course.reviewsCount').replace('{n}', formatCompact(summary?.count ?? 0))}
              />
            </ul>
          </Card>
        </aside>
      </div>

      {/* Below xl the rail is far down a stacked page, so the decision stays
          reachable in a bar pinned to the foot of the content column. It sticks
          inside the column rather than to the viewport, so it needs no copy of
          the shell's sidebar width — and at xl it is gone entirely because the
          rail already holds the CTA. */}
      <div className="sticky bottom-16 z-20 -mx-4 border-t border-border bg-surface/95 p-4 backdrop-blur sm:-mx-6 lg:bottom-0 lg:-mx-9 rail:hidden">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <p className="text-xl font-bold text-content">{priceLabel}</p>
          <div className="min-w-[200px] flex-1 sm:max-w-xs">{cta}</div>
        </div>
      </div>
    </div>
  )
}

/** A labelled fact in the rail: "Total length · 6h 15m". */
function IncludedFact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <li className="flex items-center justify-between gap-3">
      <span className="inline-flex items-center gap-2 text-content-secondary">
        <span aria-hidden="true">{icon}</span>
        {label}
      </span>
      <span className="text-end font-semibold text-content">{value}</span>
    </li>
  )
}

/** A rail line that is already a full statement and needs no label. */
function IncludedNote({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-center gap-2 text-content-secondary">
      <span aria-hidden="true">{icon}</span>
      {text}
    </li>
  )
}
