'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import {
  ArrowLeft,
  Award,
  BookOpen,
  ClipboardList,
  GraduationCap,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react'
import { analyticsApi } from '@/lib/api/services'
import { apiErrorStatus } from '@/lib/api/client'
import { useAuth } from '@/lib/auth/AuthProvider'
import { useT } from '@/lib/i18n'
import { PageHeader } from '@/components/workspace/PageHeader'
import { MetricCard } from '@/components/workspace/MetricCard'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { formatCompact, formatDuration } from '@/lib/utils'

const ENROLLMENT_STATUSES = ['ACTIVE', 'COMPLETED', 'DROPPED', 'SUSPENDED'] as const
const SUBMISSION_STATUSES = ['PENDING', 'GRADED', 'RETURNED', 'REJECTED'] as const
const RATING_LEVELS = [5, 4, 3, 2, 1] as const

export default function CourseInsightsPage() {
  const t = useT()
  const { courseId } = useParams<{ courseId: string }>()
  const { roles } = useAuth()
  const canViewInsights = roles.includes('admin') || roles.includes('instructor')
  const overview = useQuery({
    queryKey: ['course-overview', courseId],
    queryFn: () => analyticsApi.courseOverview(courseId),
    enabled: canViewInsights,
    // This report aggregates every progress/enrollment/rating row for the course
    // server-side, and the figures barely move minute to minute — so keep it
    // fresh for 5 minutes rather than inheriting the global 60s.
    staleTime: 5 * 60 * 1000,
  })

  if (!canViewInsights) {
    return (
      <div className="space-y-6">
        <PageHeader title={t('insights.title')} />
        <Card className="border-error/20 bg-error/5 p-6 text-sm text-error">
          {t('insights.accessDenied')}
        </Card>
      </div>
    )
  }

  if (overview.isError) {
    const denied = apiErrorStatus(overview.error) === 403
    return (
      <div className="space-y-6">
        <PageHeader title={t('insights.title')} />
        <Card className="border-error/20 bg-error/5 p-6 text-sm text-error">
          {denied ? t('insights.accessDenied') : t('insights.loadError')}
        </Card>
        <Link href="/insights" className="inline-flex">
          <Button variant="outline" size="sm">
            <ArrowLeft size={15} /> {t('insights.backToList')}
          </Button>
        </Link>
      </div>
    )
  }

  // Guard on the data itself, not `isLoading`: react-query pauses a query while
  // the browser is offline, which reports pending-but-not-fetching — so
  // `isLoading` is false with `data` still undefined.
  const data = overview.data
  if (!data) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-16 w-full rounded-card" />
        {/* Same breakpoints as the real KPI grid below, so data arriving does not
            reflow the layout. */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[210px] rounded-card" />
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-card" />
      </div>
    )
  }

  const enrollmentRows = ENROLLMENT_STATUSES.map((status) => ({
    label: t(`insights.enroll.${status.toLowerCase()}`),
    value: data.enrollments.byStatus[status],
  }))
  const submissionRows = SUBMISSION_STATUSES.map((status) => ({
    label: t(`insights.sub.${status.toLowerCase()}`),
    value: data.assignments.submissions.byStatus[status],
  }))
  // Derive from the distribution rows, not `ratings.average`/`count`: those come
  // from a best-effort denormalised cache that can lag behind the rows, so a
  // headline of "0.0 from 3 ratings" could sit above three filled bars. Prefer
  // the cache when it is populated, fall back to the rows when it is not.
  const ratingTotal = RATING_LEVELS.reduce((sum, n) => sum + data.ratings.distribution[n], 0)
  const ratingAverage =
    data.ratings.average > 0
      ? data.ratings.average
      : ratingTotal > 0
        ? RATING_LEVELS.reduce((sum, n) => sum + n * data.ratings.distribution[n], 0) / ratingTotal
        : 0
  const maxRatingCount = Math.max(1, ...RATING_LEVELS.map((n) => data.ratings.distribution[n]))

  return (
    <div className="space-y-6">
      <PageHeader
        title={data.course.title}
        description={t('insights.subtitle')}
        action={
          <Link href="/insights">
            <Button variant="outline" size="sm">
              <ArrowLeft size={15} /> {t('insights.backToList')}
            </Button>
          </Link>
        }
      />

      {/* Headline KPIs */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={Users}
          label={t('insights.metric.enrolled')}
          value={formatCompact(data.enrollments.total)}
          detail={t('insights.metric.enrolledDetail')}
        />
        <MetricCard
          icon={GraduationCap}
          label={t('insights.metric.activeLearners')}
          value={formatCompact(data.progress.activeLearners)}
          detail={t('insights.metric.activeLearnersDetail')}
        />
        <MetricCard
          icon={TrendingUp}
          label={t('insights.metric.avgCompletion')}
          value={`${data.progress.averageCompletionPercent}%`}
          detail={t('insights.metric.avgCompletionDetail')}
        />
        <MetricCard
          icon={Award}
          label={t('insights.metric.completionRate')}
          value={`${data.progress.completionRatePercent}%`}
          detail={t('insights.metric.completionRateDetail').replace(
            '{n}',
            formatCompact(data.progress.fullyCompletedLearners),
          )}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Enrollment breakdown */}
        <Card className="p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Users size={18} className="text-primary" />
            <h2 className="text-lg font-semibold text-content">{t('insights.enroll.title')}</h2>
          </div>
          <StatBars rows={enrollmentRows} total={data.enrollments.total} emptyLabel={t('insights.enroll.empty')} />
        </Card>

        {/* Assignments / submissions */}
        <Card className="p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <ClipboardList size={18} className="text-primary" />
            <h2 className="text-lg font-semibold text-content">{t('insights.sub.title')}</h2>
          </div>
          <p className="mb-3 text-xs text-content-secondary">
            {t('insights.sub.summary')
              .replace('{missions}', formatCompact(data.assignments.total))
              .replace('{total}', formatCompact(data.assignments.submissions.total))}
          </p>
          <StatBars
            rows={submissionRows}
            total={data.assignments.submissions.total}
            emptyLabel={t('insights.sub.empty')}
          />
        </Card>

        {/* Content summary */}
        <Card className="p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <BookOpen size={18} className="text-primary" />
            <h2 className="text-lg font-semibold text-content">{t('insights.content.title')}</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Fact label={t('insights.content.sections')} value={formatCompact(data.content.totalSections)} />
            <Fact label={t('insights.content.lectures')} value={formatCompact(data.content.totalLectures)} />
            <Fact label={t('insights.content.quizzes')} value={formatCompact(data.content.totalQuizzes)} />
            <Fact
              label={t('insights.content.duration')}
              value={formatDuration(Math.round(data.content.totalDurationSeconds / 60))}
            />
            <Fact label={t('insights.content.videos')} value={formatCompact(data.content.lecturesByType.VIDEO)} />
            <Fact label={t('insights.content.readings')} value={formatCompact(data.content.lecturesByType.READING)} />
          </div>
        </Card>

        {/* Ratings */}
        <Card className="p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Star size={18} className="text-primary" />
            <h2 className="text-lg font-semibold text-content">{t('insights.ratings.title')}</h2>
          </div>
          {ratingTotal > 0 ? (
            <>
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-content">{ratingAverage.toFixed(1)}</span>
                <span className="text-xs text-content-secondary">
                  {t('insights.ratings.count').replace(
                    '{n}',
                    formatCompact(data.ratings.count || ratingTotal),
                  )}
                </span>
              </div>
              <div className="space-y-2">
                {RATING_LEVELS.map((n) => {
                  const count = data.ratings.distribution[n]
                  return (
                    <div key={n} className="flex items-center gap-3">
                      <span className="inline-flex w-8 items-center gap-1 text-xs text-content-secondary">
                        {n} <Star size={11} className="fill-content-muted text-content-muted" />
                      </span>
                      {/* Scaled to the busiest bucket so small distributions stay readable. */}
                      <Progress value={(count / maxRatingCount) * 100} className="flex-1" />
                      <span className="w-8 text-end text-xs text-content-secondary">{count}</span>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <p className="py-6 text-center text-sm text-content-secondary">{t('insights.ratings.empty')}</p>
          )}
        </Card>
      </div>
    </div>
  )
}

function StatBars({
  rows,
  total,
  emptyLabel,
}: {
  rows: Array<{ label: string; value: number }>
  total: number
  emptyLabel: string
}) {
  if (total <= 0) {
    return <p className="py-6 text-center text-sm text-content-secondary">{emptyLabel}</p>
  }
  return (
    <div className="space-y-3">
      {rows.map((row) => {
        const pct = Math.round((row.value / total) * 100)
        return (
          <div key={row.label}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-content-secondary">{row.label}</span>
              <span className="font-semibold text-content">
                {row.value} <span className="text-content-muted">({pct}%)</span>
              </span>
            </div>
            <Progress value={pct} />
          </div>
        )
      })}
    </div>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-input bg-subtle p-3">
      <p className="text-lg font-bold text-content">{value}</p>
      <p className="mt-0.5 text-[11px] text-content-secondary">{label}</p>
    </div>
  )
}
