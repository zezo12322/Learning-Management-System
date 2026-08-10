'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { CheckCircle2, Clock3, FileEdit, LibraryBig, Plus, Search } from 'lucide-react'
import { authoringApi } from '@/lib/api/services'
import { useT } from '@/lib/i18n'
import { PageHeader } from '@/components/workspace/PageHeader'
import { CourseWorkspaceCard } from '@/components/workspace/CourseWorkspaceCard'
import { StatCard, type StatTone } from '@/components/student/StatCard'
import { FilterChips } from '@/components/student/FilterChips'
import { EmptyState } from '@/components/student/EmptyState'
import { buttonClasses } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { apiErrorStatus } from '@/lib/api/client'

type Filter = 'ALL' | 'DRAFT' | 'PUBLISHED'

export default function CoursesPage() {
  const t = useT()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('ALL')
  const authoringQuery = useQuery({
    queryKey: ['authoring-courses'],
    queryFn: authoringApi.list,
  })
  const authoringCourses = useMemo(() => authoringQuery.data ?? [], [authoringQuery.data])
  const normalizedSearch = search.trim().toLowerCase()
  const filteredAuthoring = useMemo(
    () => authoringCourses.filter((course) =>
      (filter === 'ALL' || course.status === filter) && course.title.toLowerCase().includes(normalizedSearch)
    ),
    [authoringCourses, filter, normalizedSearch]
  )
  const draftCount = authoringCourses.filter((course) => course.status === 'DRAFT').length
  const publishedCount = authoringCourses.filter((course) => course.status === 'PUBLISHED').length
  // `tone` instead of a raw class string, so these tiles cannot drift away from
  // the tinted-square treatment every other stat in the product uses.
  const stats: { label: string; value: number; icon: typeof Clock3; tone: StatTone }[] = [
    { label: t('courses.totalCourses'), value: authoringCourses.length, icon: Clock3, tone: 'primary' },
    { label: t('courses.drafts'), value: draftCount, icon: FileEdit, tone: 'secondary' },
    { label: t('courses.published'), value: publishedCount, icon: CheckCircle2, tone: 'success' },
  ]
  const accessDenied = apiErrorStatus(authoringQuery.error) === 403

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('courses.manageTitle')}
        description={t('courses.manageSubtitle')}
        action={
          // buttonClasses on the anchor, not <Link><Button>: a <button> inside
          // an <a> is invalid HTML and adds a dead second focus stop.
          <Link href="/studio/new/setup" className={buttonClasses()}>
            <Plus size={16} aria-hidden /> {t('common.createCourse')}
          </Link>
        }
      />

      {authoringQuery.isError && (
        <Card className="border-error bg-error-soft p-4 text-sm text-error">
          {accessDenied
            ? t('courses.accessDenied')
            : t('courses.loadError')}
        </Card>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        {/* A skeleton while the counts are unknown, rather than an ellipsis
            standing in for a number. */}
        {authoringQuery.isLoading
          ? stats.map((stat) => <Skeleton key={stat.label} className="h-32 rounded-card" />)
          : stats.map((stat) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                value={authoringQuery.isError ? '—' : stat.value}
                label={stat.label}
                tone={stat.tone}
              />
            ))}
      </div>

      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        {/* FilterChips carries aria-pressed; the bare buttons this replaces
            announced nothing about which view was active. */}
        <FilterChips<Filter>
          items={[
            { value: 'ALL', label: t('courses.allCourses'), count: authoringCourses.length },
            { value: 'DRAFT', label: t('courses.drafts'), count: draftCount },
            { value: 'PUBLISHED', label: t('courses.published'), count: publishedCount },
          ]}
          value={filter}
          onChange={setFilter}
          className="sm:flex-1"
        />
        <Input className="w-full sm:ms-auto sm:w-72" value={search} onChange={(event) => setSearch(event.target.value)} icon={<Search size={16} />} placeholder={t('courses.searchPlaceholder')} />
      </div>

      {authoringQuery.isLoading ? (
        <Card className="py-16 text-center text-sm text-content-secondary">{t('courses.loading')}</Card>
      ) : filteredAuthoring.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {/* No `featured` flag: it highlighted whichever course happened to
              land second in the list, so its meaning changed the moment a
              filter or a search term was applied. */}
          {filteredAuthoring.map((course) => <CourseWorkspaceCard key={course.id} course={course} />)}
        </div>
      ) : !authoringQuery.isError ? (
        <Card>
          {authoringCourses.length === 0 ? (
            <EmptyState
              // h2: the nearest preceding heading on this page is PageHeader's
              // h1, and there is no h2 for the results region, so EmptyState's
              // default h3 skipped a level.
              headingLevel="h2"
              icon={LibraryBig}
              title={t('courses.emptyTitle')}
              description={t('courses.emptyHint')}
              actionLabel={t('common.createCourse')}
              actionHref="/studio/new/setup"
            />
          ) : (
            <EmptyState
              headingLevel="h2"
              icon={Search}
              title={t('courses.noMatchTitle')}
              description={t('courses.noMatchHint')}
            />
          )}
        </Card>
      ) : null}
    </div>
  )
}
