'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { CheckCircle2, Clock3, FileEdit, Plus, Search } from 'lucide-react'
import { authoringApi } from '@/lib/api/services'
import { useT } from '@/lib/i18n'
import { PageHeader } from '@/components/workspace/PageHeader'
import { CourseWorkspaceCard } from '@/components/workspace/CourseWorkspaceCard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { apiErrorStatus } from '@/lib/api/client'
import { cn } from '@/lib/utils'

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
  const stats = [
    { label: t('courses.totalCourses'), value: authoringCourses.length, icon: Clock3, tone: 'bg-brand-soft text-primary' },
    { label: t('courses.drafts'), value: authoringCourses.filter((course) => course.status === 'DRAFT').length, icon: FileEdit, tone: 'bg-subtle text-content-secondary' },
    { label: t('courses.published'), value: authoringCourses.filter((course) => course.status === 'PUBLISHED').length, icon: CheckCircle2, tone: 'bg-success/10 text-success' },
  ]
  const accessDenied = apiErrorStatus(authoringQuery.error) === 403

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('courses.title')}
        description={t('courses.subtitle')}
        action={<Link href="/studio/new/setup"><Button><Plus size={16} /> {t('common.createCourse')}</Button></Link>}
      />

      {authoringQuery.isError && (
        <Card className="border-error/20 bg-error/5 p-4 text-sm text-error">
          {accessDenied
            ? t('courses.accessDenied')
            : t('courses.loadError')}
        </Card>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="flex items-center gap-3 p-4">
            <span className={cn('flex h-11 w-11 items-center justify-center rounded-xl', stat.tone)}><stat.icon size={18} /></span>
            <div>
              <p className="text-xl font-bold text-content">{authoringQuery.isLoading ? '…' : authoringQuery.isError ? '—' : stat.value}</p>
              <p className="text-xs text-content-secondary">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2">
          {(['ALL', 'DRAFT', 'PUBLISHED'] as const).map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={cn('rounded-full px-4 py-2 text-xs font-medium transition-colors', filter === item ? 'bg-brand-soft text-primary ring-1 ring-primary' : 'bg-surface text-content-secondary ring-1 ring-border')}
            >
              {item === 'ALL' ? t('courses.allCourses') : item === 'DRAFT' ? t('courses.drafts') : t('courses.published')}
            </button>
          ))}
        </div>
        <Input className="w-full sm:ms-auto sm:w-72" value={search} onChange={(event) => setSearch(event.target.value)} icon={<Search size={16} />} placeholder={t('courses.searchPlaceholder')} />
      </div>

      {authoringQuery.isLoading ? (
        <Card className="py-16 text-center text-sm text-content-secondary">{t('courses.loading')}</Card>
      ) : filteredAuthoring.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredAuthoring.map((course, index) => <CourseWorkspaceCard key={course.id} course={course} featured={index === 1} />)}
        </div>
      ) : !authoringQuery.isError ? (
        <Card className="py-16 text-center text-sm text-content-secondary">{t('courses.noMatch')}</Card>
      ) : null}
    </div>
  )
}
