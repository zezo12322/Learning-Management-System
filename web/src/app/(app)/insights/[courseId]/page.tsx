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
import { useT } from '@/lib/i18n'
import { PageHeader } from '@/components/workspace/PageHeader'
import { MetricCard } from '@/components/workspace/MetricCard'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { formatCompact, formatDuration } from '@/lib/utils'

export default function CourseInsightsPage() {
  const t = useT()
  const { courseId } = useParams<{ courseId: string }>()
  const overview = useQuery({
    queryKey: ['course-overview', courseId],
    queryFn: () => analyticsApi.courseOverview(courseId),
  })

  if (overview.isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-16 w-full rounded-card" />
        <div className="grid gap-4 md:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[210px] rounded-card" />
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-card" />
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

  const data = overview.data!
  const durationMinutes = Math.round(data.content.totalDurationSeconds / 60)
  const metricState = 'live' as const

  const enrollmentRows: Array<{ key: string; label: string; value: number }> = [
    { key: 'ACTIVE', label: t('insights.enroll.active'), value: data.enrollments.byStatus.ACTIVE },
    { key: 'COMPLETED', label: t('insights.enroll.completed'), value: data.enrollments.byStatus.COMPLETED },
    { key: 'DROPPED', label: t('insights.enroll.dropped'), value: data.enrollments.byStatus.DROPPED },
    { key: 'SUSPENDED', label: t('insights.enroll.suspended'), value: data.enrollments.byStatus.SUSPENDED },
  ]
  const submissionRows: Array<{ key: string; label: string; value: number }> = [
    { key: 'PENDING', label: t('insights.sub.pending'), value: data.assignments.submissions.byStatus.PENDING },
    { key: 'GRADED', label: t('insights.sub.graded'), value: data.assignments.submissions.byStatus.GRADED },
    { key: 'RETURNED', label: t('insights.sub.returned'), value: data.assignments.submissions.byStatus.RETURNED },
    { key: 'REJECTED', label: t('insights.sub.rejected'), value: data.assignments.submissions.byStatus.REJECTED },
  ]
  const ratingLevels = [5, 4, 3, 2, 1] as const
  const maxRatingCount = Math.max(1, ...ratingLevels.map((n) => data.ratings.distribution[n]))

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
          state={metricState}
        />
        <MetricCard
          icon={GraduationCap}
          label={t('insights.metric.activeLearners')}
          value={formatCompact(data.progress.activeLearners)}
          detail={t('insights.metric.activeLearnersDetail')}
          state={metricState}
        />
        <MetricCard
          icon={TrendingUp}
          label={t('insights.metric.avgCompletion')}
          value={`${data.progress.averageCompletionPercent}%`}
          detail={t('insights.metric.avgCompletionDetail')}
          state={metricState}
        />
        <MetricCard
          icon={Award}
          label={t('insights.metric.completionRate')}
          value={`${data.progress.completionRatePercent}%`}
          detail={t('insights.metric.completionRateDetail').replace(
            '{n}',
            formatCompact(data.progress.fullyCompletedLearners),
          )}
          state={metricState}
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
            <Fact label={t('insights.content.duration')} value={formatDuration(durationMinutes)} />
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
          {data.ratings.count > 0 ? (
            <>
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-content">{data.ratings.average.toFixed(1)}</span>
                <span className="text-xs text-content-secondary">
                  {t('insights.ratings.count').replace('{n}', formatCompact(data.ratings.count))}
                </span>
              </div>
              <div className="space-y-2">
                {ratingLevels.map((n) => {
                  const count = data.ratings.distribution[n]
                  return (
                    <div key={n} className="flex items-center gap-3">
                      <span className="inline-flex w-8 items-center gap-1 text-xs text-content-secondary">
                        {n} <Star size={11} className="fill-content-muted text-content-muted" />
                      </span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-subtle">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${(count / maxRatingCount) * 100}%` }}
                        />
                      </div>
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
  rows: Array<{ key: string; label: string; value: number }>
  total: number
  emptyLabel: string
}) {
  if (total <= 0) {
    return <p className="py-6 text-center text-sm text-content-secondary">{emptyLabel}</p>
  }
  return (
    <div className="space-y-3">
      {rows.map((row) => {
        const pct = total > 0 ? Math.round((row.value / total) * 100) : 0
        return (
          <div key={row.key}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-content-secondary">{row.label}</span>
              <span className="font-semibold text-content">
                {row.value} <span className="text-content-muted">({pct}%)</span>
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-subtle">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
            </div>
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
