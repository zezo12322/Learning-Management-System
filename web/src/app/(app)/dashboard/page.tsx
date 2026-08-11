'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { useQueries, useQuery } from '@tanstack/react-query'
import { BookOpenCheck, Plus, Star, Users } from 'lucide-react'
import { analyticsApi, authoringApi } from '@/lib/api/services'
import { useT } from '@/lib/i18n'
import { PageHeader } from '@/components/workspace/PageHeader'
import { MetricCard } from '@/components/workspace/MetricCard'
import { AIUnavailable } from '@/components/workspace/AIUnavailable'
import { StatusPill, courseStatusOf } from '@/components/workspace/StatusPill'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

/**
 * How many of the instructor's courses get a per-course analytics request.
 *
 * Learner and rating totals come from `GET /courses/:id/overview`, one call per
 * course, so an instructor with a large catalogue would otherwise fan out
 * dozens of requests to draw three numbers. When the cap bites, the metric
 * detail line says how many courses the figure covers rather than presenting a
 * partial sum as the whole.
 */
const MAX_OVERVIEW_FETCH = 12

export default function DashboardPage() {
  const t = useT()
  // The instructor's own courses — not the public catalog. Reading the catalog
  // here meant every metric on this page reported the whole platform's numbers,
  // so an instructor with one course saw thousands of students that were not
  // theirs.
  const coursesQuery = useQuery({
    queryKey: ['authoring-courses'],
    queryFn: authoringApi.list,
  })
  const courses = useMemo(() => coursesQuery.data ?? [], [coursesQuery.data])
  const firstCourse = courses[0]

  const measured = useMemo(() => courses.slice(0, MAX_OVERVIEW_FETCH), [courses])
  const overviews = useQueries({
    queries: measured.map((course) => ({
      queryKey: ['course-overview', course.id],
      queryFn: () => analyticsApi.courseOverview(course.id),
      // Same key and freshness as the insights report, so opening one after the
      // other reuses a single fetch.
      staleTime: 5 * 60 * 1000,
    })),
  })

  const totals = useMemo(() => {
    const loaded = overviews.flatMap((query) => (query.data ? [query.data] : []))
    const reviews = loaded.reduce((sum, item) => sum + item.ratings.count, 0)
    const weighted = loaded.reduce((sum, item) => sum + item.ratings.average * item.ratings.count, 0)
    return {
      covered: loaded.length,
      learners: loaded.reduce((sum, item) => sum + item.enrollments.total, 0),
      reviews,
      // Weighted by rating count: averaging the per-course averages would let a
      // course with a single 5-star review outweigh one with two hundred.
      rating: reviews ? weighted / reviews : null,
    }
  }, [overviews])

  const published = courses.filter((course) => course.status === 'PUBLISHED').length
  const overviewsPending = overviews.some((query) => query.isPending)
  const overviewsFailed = overviews.length > 0 && overviews.every((query) => query.isError)
  const partial = totals.covered > 0 && totals.covered < courses.length

  const coursesState = coursesQuery.isError ? 'error' : coursesQuery.isPending ? 'loading' : 'live'
  const analyticsState = overviewsFailed
    ? 'error'
    : coursesQuery.isPending || overviewsPending
      ? 'loading'
      : 'live'

  /** `—` on failure, `…` while loading, so a metric never shows a stale zero. */
  const show = (state: 'live' | 'loading' | 'error', value: string) =>
    state === 'error' ? '—' : state === 'loading' ? '…' : value
  /** Names how much of the catalogue a summed figure actually covers. */
  const coverage = (fallbackKey: string) =>
    partial
      ? t('dashboard.metric.coveredDetail')
          .replace('{n}', String(totals.covered))
          .replace('{total}', String(courses.length))
      : t(fallbackKey)

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('dashboard.title')}
        description={t('dashboard.subtitle')}
        action={<Link href="/studio/new/setup"><Button><Plus size={16} /> {t('common.createCourse')}</Button></Link>}
      />

      {coursesQuery.isError && (
        <Card className="border-error bg-error-soft p-4 text-sm text-error">
          {t('dashboard.loadError')}
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          icon={BookOpenCheck}
          label={t('dashboard.metric.published')}
          value={show(coursesState, String(published))}
          detail={
            coursesQuery.isError
              ? t('dashboard.metric.unavailable')
              : t('dashboard.metric.publishedDetail').replace('{total}', String(courses.length))
          }
          state={coursesState}
        />
        <MetricCard
          icon={Users}
          label={t('dashboard.metric.learners')}
          value={show(analyticsState, totals.learners.toLocaleString())}
          detail={
            overviewsFailed
              ? t('dashboard.metric.unavailable')
              : coverage('dashboard.metric.learnersDetail')
          }
          state={analyticsState}
        />
        <MetricCard
          icon={Star}
          label={t('dashboard.metric.rating')}
          value={show(
            analyticsState,
            totals.rating == null ? t('dashboard.metric.notRated') : totals.rating.toFixed(1),
          )}
          detail={
            overviewsFailed
              ? t('dashboard.metric.unavailable')
              : totals.rating == null
                ? t('dashboard.metric.noRatings')
                : t('dashboard.metric.ratingDetail').replace('{n}', String(totals.reviews))
          }
          state={analyticsState}
        />
      </div>

      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 rail:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-content">{t('dashboard.myCoursesTitle')}</h2>
              <p className="mt-1 text-xs text-content-secondary">{t('dashboard.myCoursesSubtitle')}</p>
            </div>
            <Link href="/courses" className="shrink-0 text-xs font-semibold text-primary">{t('dashboard.viewAllCourses')} →</Link>
          </div>

          {coursesQuery.isPending ? (
            <div className="rounded-input bg-subtle p-5 text-sm text-content-secondary">{t('dashboard.loadingCourses')}</div>
          ) : courses.length ? (
            <div className="space-y-3">
              {courses.slice(0, 3).map((course, index) => {
                const initials = course.title
                  .split(/\s+/)
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((word) => word[0]?.toUpperCase())
                  .join('')
                // The real lifecycle status. This row used to print "Published"
                // on every course, including drafts.
                const status = courseStatusOf(course.status)
                const overview = overviews[index]?.data
                return (
                  <Link
                    key={course.id}
                    href={`/insights/${course.id}`}
                    className={index === 0 ? 'flex items-center gap-4 rounded-input bg-brand-soft p-4' : 'flex items-center gap-4 rounded-input bg-subtle p-4'}
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-surface text-xs font-bold text-primary">
                      {initials}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-content">{course.title}</span>
                      <span className="mt-1 block text-[11px] text-content-secondary">
                        {[course.category, course.level].filter(Boolean).join(' · ')}
                      </span>
                      <span className="mt-2 block text-[11px] text-content-muted">
                        {overview
                          ? `${overview.enrollments.total} ${t('dashboard.learnersLabel')} · ${
                              overview.ratings.count
                                ? `${overview.ratings.average.toFixed(1)} ${t('dashboard.ratingLabel')}`
                                : t('dashboard.noRatingsYet')
                            }`
                          : t('dashboard.metric.updating')}
                      </span>
                    </span>
                    <StatusPill tone={status.tone}>{t(status.labelKey)}</StatusPill>
                  </Link>
                )
              })}
            </div>
          ) : !coursesQuery.isError ? (
            <div className="rounded-input border border-dashed border-border p-8 text-center">
              <p className="text-sm font-semibold text-content">{t('dashboard.noCourses')}</p>
              <p className="mt-1 text-xs text-content-secondary">{t('dashboard.noCoursesHint')}</p>
            </div>
          ) : null}
        </Card>

        <Card className="flex flex-col p-5 sm:p-6">
          <div className="rounded-input bg-brand-soft p-4">
            <p className="text-[10px] font-semibold text-on-brand-soft ltr:tracking-wide">{t('dashboard.aiStudioEyebrow')}</p>
            <h2 className="mt-2 text-lg font-semibold text-content">{t('dashboard.aiStudioTitle')}</h2>
            <p className="mt-2 text-xs leading-5 text-content-secondary">{t('dashboard.aiStudioBody')}</p>
          </div>
          <div className="mt-5"><AIUnavailable compact /></div>

          {firstCourse ? (
            <Link href={`/studio/${firstCourse.id}/ai-studio`} className="mt-auto pt-5">
              <Button fullWidth>{t('common.open')} {firstCourse.title}</Button>
            </Link>
          ) : (
            <div className="mt-auto pt-5">
              <Button fullWidth disabled>
                {coursesQuery.isPending ? t('dashboard.loadingCoursesBtn') : t('dashboard.noCourseAvailable')}
              </Button>
              <p className="mt-2 text-center text-[11px] leading-4 text-content-muted">
                {coursesQuery.isError
                  ? t('dashboard.coursesLoadError')
                  : t('dashboard.createBeforeAi')}
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
