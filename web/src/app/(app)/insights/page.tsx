'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, BarChart3, Layers3, Users } from 'lucide-react'
import { authoringApi } from '@/lib/api/services'
import { apiErrorStatus } from '@/lib/api/client'
import { useT } from '@/lib/i18n'
import { PageHeader } from '@/components/workspace/PageHeader'
import { StatusPill, type StatusTone } from '@/components/workspace/StatusPill'
import { Card } from '@/components/ui/card'
import type { AuthoringCourse } from '@/lib/types'

const statusMeta: Record<AuthoringCourse['status'], { labelKey: string; tone: StatusTone }> = {
  DRAFT: { labelKey: 'courses.status.draft', tone: 'neutral' },
  IN_REVIEW: { labelKey: 'courses.status.inReview', tone: 'warning' },
  PUBLISHED: { labelKey: 'courses.status.published', tone: 'success' },
  ARCHIVED: { labelKey: 'courses.status.archived', tone: 'neutral' },
}

export default function InsightsIndexPage() {
  const t = useT()
  const query = useQuery({ queryKey: ['authoring-courses'], queryFn: authoringApi.list })
  const courses = query.data ?? []
  const accessDenied = apiErrorStatus(query.error) === 403

  return (
    <div className="space-y-6">
      <PageHeader title={t('insights.title')} description={t('insights.listSubtitle')} />

      {query.isError && (
        <Card className="border-error/20 bg-error/5 p-4 text-sm text-error">
          {accessDenied ? t('insights.accessDenied') : t('insights.loadError')}
        </Card>
      )}

      {query.isLoading ? (
        <Card className="py-16 text-center text-sm text-content-secondary">{t('insights.loading')}</Card>
      ) : courses.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <Link key={course.id} href={`/insights/${course.id}`} className="block h-full">
              <Card hover className="flex h-full flex-col p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-primary">
                    <BarChart3 size={18} />
                  </span>
                  <StatusPill tone={statusMeta[course.status].tone}>{t(statusMeta[course.status].labelKey)}</StatusPill>
                </div>
                <h3 className="mt-4 line-clamp-1 text-base font-semibold text-content">{course.title}</h3>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-content-muted">
                  <span className="inline-flex items-center gap-1"><Layers3 size={13} /> {course.lessonCount} {t('courses.card.lessons')}</span>
                  <span className="inline-flex items-center gap-1"><Users size={13} /> {course.students}</span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                  {t('insights.viewReport')} <ArrowRight size={13} />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      ) : !query.isError ? (
        <Card className="py-16 text-center text-sm text-content-secondary">{t('insights.empty')}</Card>
      ) : null}
    </div>
  )
}
