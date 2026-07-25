'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, BarChart3 } from 'lucide-react'
import { authoringApi } from '@/lib/api/services'
import { apiErrorStatus } from '@/lib/api/client'
import { useAuth } from '@/lib/auth/AuthProvider'
import { useT } from '@/lib/i18n'
import { PageHeader } from '@/components/workspace/PageHeader'
import { StatusPill, courseStatusOf } from '@/components/workspace/StatusPill'
import { Card } from '@/components/ui/card'

export default function InsightsIndexPage() {
  const t = useT()
  const { roles } = useAuth()
  // Mirror /students: the nav entry is already role-gated, but the route is
  // reachable by URL. Blocking here avoids a guaranteed 403 round-trip (which
  // also forces a token refresh in the API client's retry interceptor).
  const canViewInsights = roles.includes('admin') || roles.includes('instructor')
  const query = useQuery({
    queryKey: ['authoring-courses'],
    queryFn: authoringApi.list,
    enabled: canViewInsights,
  })
  const courses = query.data ?? []

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

  return (
    <div className="space-y-6">
      <PageHeader title={t('insights.title')} description={t('insights.listSubtitle')} />

      {query.isError && (
        <Card className="border-error/20 bg-error/5 p-4 text-sm text-error">
          {apiErrorStatus(query.error) === 403 ? t('insights.accessDenied') : t('insights.loadError')}
        </Card>
      )}

      {/* `isPending`, not `isLoading`: a query paused while offline is pending but
          not fetching, so `isLoading` is false with no data to render. */}
      {query.isPending ? (
        <Card className="py-16 text-center text-sm text-content-secondary">{t('insights.loading')}</Card>
      ) : courses.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => {
            const status = courseStatusOf(course.status)
            return (
              <Link key={course.id} href={`/insights/${course.id}`} className="block h-full">
                <Card hover className="flex h-full flex-col p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-primary">
                      <BarChart3 size={18} />
                    </span>
                    <StatusPill tone={status.tone}>{t(status.labelKey)}</StatusPill>
                  </div>
                  <h3 className="mt-4 line-clamp-1 text-base font-semibold text-content">{course.title}</h3>
                  {/* Deliberately no lesson/student counts here: the course-list
                      endpoint does not return them, so they would always read 0.
                      The real figures are on the report itself. */}
                  <p className="mt-1 text-xs text-content-secondary">{course.category}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                    {t('insights.viewReport')} <ArrowRight size={13} />
                  </span>
                </Card>
              </Link>
            )
          })}
        </div>
      ) : !query.isError ? (
        <Card className="py-16 text-center text-sm text-content-secondary">{t('insights.empty')}</Card>
      ) : null}
    </div>
  )
}
