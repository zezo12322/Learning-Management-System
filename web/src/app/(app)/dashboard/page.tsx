'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BookOpenCheck, MessageSquare, Plus, Star } from 'lucide-react'
import { authoringApi, catalogApi } from '@/lib/api/services'
import { useT } from '@/lib/i18n'
import { PageHeader } from '@/components/workspace/PageHeader'
import { MetricCard } from '@/components/workspace/MetricCard'
import { AIUnavailable } from '@/components/workspace/AIUnavailable'
import { StatusPill } from '@/components/workspace/StatusPill'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const t = useT()
  const catalogQuery = useQuery({ queryKey: ['catalog'], queryFn: catalogApi.list })
  const authoringQuery = useQuery({
    queryKey: ['authoring-courses'],
    queryFn: authoringApi.list,
  })
  const courses = useMemo(() => catalogQuery.data ?? [], [catalogQuery.data])
  const firstAuthoringCourse = authoringQuery.data?.[0]
  const totalReviews = useMemo(
    () => courses.reduce((total, course) => total + (course.ratingCount ?? 0), 0),
    [courses]
  )
  const averageRating = useMemo(() => {
    if (!totalReviews) return null
    const weightedTotal = courses.reduce(
      (total, course) => total + (course.avgRating ?? 0) * (course.ratingCount ?? 0),
      0
    )
    return weightedTotal / totalReviews
  }, [courses, totalReviews])
  const metricState = catalogQuery.isError ? 'error' : catalogQuery.isLoading ? 'loading' : 'live'
  const metricValue = (value: string) => catalogQuery.isError ? '—' : catalogQuery.isLoading ? '…' : value

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('dashboard.title')}
        description={t('dashboard.subtitle')}
        action={<Link href="/studio/new/setup"><Button><Plus size={16} /> {t('common.createCourse')}</Button></Link>}
      />

      {catalogQuery.isError && (
        <Card className="border-error/20 bg-error/5 p-4 text-sm text-error">
          {t('dashboard.loadError')}
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          icon={BookOpenCheck}
          label={t('dashboard.metric.published')}
          value={metricValue(String(courses.length))}
          detail={catalogQuery.isError ? t('dashboard.metric.unavailable') : t('dashboard.metric.publishedDetail')}
          state={metricState}
        />
        <MetricCard
          icon={MessageSquare}
          label={t('dashboard.metric.reviews')}
          value={metricValue(totalReviews.toLocaleString())}
          detail={catalogQuery.isError ? t('dashboard.metric.unavailable') : t('dashboard.metric.reviewsDetail')}
          state={metricState}
        />
        <MetricCard
          icon={Star}
          label={t('dashboard.metric.rating')}
          value={metricValue(averageRating == null ? t('dashboard.metric.notRated') : averageRating.toFixed(1))}
          detail={catalogQuery.isError ? t('dashboard.metric.unavailable') : averageRating == null ? t('dashboard.metric.noRatings') : t('dashboard.metric.ratingDetail')}
          state={metricState}
        />
      </div>

      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-content">{t('dashboard.catalogTitle')}</h2>
              <p className="mt-1 text-xs text-content-secondary">{t('dashboard.catalogSubtitle')}</p>
            </div>
            <Link href="/catalog" className="shrink-0 text-xs font-semibold text-primary">{t('dashboard.viewCatalog')} →</Link>
          </div>

          {catalogQuery.isLoading ? (
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
                const hasRatings = Boolean(course.ratingCount)
                return (
                  <Link
                    key={course.id}
                    href={`/catalog/${course.id}`}
                    className={index === 0 ? 'flex items-center gap-4 rounded-input bg-brand-soft p-4' : 'flex items-center gap-4 rounded-input bg-subtle p-4'}
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-surface text-xs font-bold text-primary">
                      {initials}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-content">{course.title}</span>
                      <span className="mt-1 block text-[11px] text-content-secondary">
                        {[course.category?.name, course.level].filter(Boolean).join(' · ')}
                      </span>
                      <span className="mt-2 block text-[11px] text-content-muted">
                        {hasRatings ? `${(course.avgRating ?? 0).toFixed(1)} ${t('dashboard.ratingLabel')} · ${course.ratingCount} ${t('common.reviews')}` : t('dashboard.noRatingsYet')}
                      </span>
                    </span>
                    <StatusPill tone="success">{t('common.published')}</StatusPill>
                  </Link>
                )
              })}
            </div>
          ) : !catalogQuery.isError ? (
            <div className="rounded-input border border-dashed border-border p-8 text-center">
              <p className="text-sm font-semibold text-content">{t('dashboard.noPublished')}</p>
              <p className="mt-1 text-xs text-content-secondary">{t('dashboard.noPublishedHint')}</p>
            </div>
          ) : null}
        </Card>

        <Card className="flex flex-col p-5 sm:p-6">
          <div className="rounded-input bg-brand-soft p-4">
            <p className="text-[10px] font-semibold tracking-wide text-primary">{t('dashboard.aiStudioEyebrow')}</p>
            <h2 className="mt-2 text-lg font-semibold text-content">{t('dashboard.aiStudioTitle')}</h2>
            <p className="mt-2 text-xs leading-5 text-content-secondary">{t('dashboard.aiStudioBody')}</p>
          </div>
          <div className="mt-5"><AIUnavailable compact /></div>

          {firstAuthoringCourse ? (
            <Link href={`/studio/${firstAuthoringCourse.id}/ai-studio`} className="mt-auto pt-5">
              <Button fullWidth>{t('common.open')} {firstAuthoringCourse.title}</Button>
            </Link>
          ) : (
            <div className="mt-auto pt-5">
              <Button fullWidth disabled>
                {authoringQuery.isLoading ? t('dashboard.loadingCoursesBtn') : t('dashboard.noCourseAvailable')}
              </Button>
              <p className="mt-2 text-center text-[11px] leading-4 text-content-muted">
                {authoringQuery.isError
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
