'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { CheckCircle2, Clock3, FileEdit, MessageSquare, Plus, Search } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthProvider'
import { authoringApi, catalogApi } from '@/lib/api/services'
import { PageHeader } from '@/components/workspace/PageHeader'
import { CourseWorkspaceCard } from '@/components/workspace/CourseWorkspaceCard'
import { CourseGridCard } from '@/components/course/CourseCard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type Filter = 'ALL' | 'DRAFT' | 'PUBLISHED'

export default function CoursesPage() {
  const { isDemoMode } = useAuth()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('ALL')
  const catalogQuery = useQuery({ queryKey: ['catalog'], queryFn: catalogApi.list })
  const authoringQuery = useQuery({
    queryKey: ['authoring-courses'],
    queryFn: authoringApi.list,
    enabled: !isDemoMode,
  })
  const catalogCourses = useMemo(() => catalogQuery.data ?? [], [catalogQuery.data])
  const authoringCourses = useMemo(() => authoringQuery.data ?? [], [authoringQuery.data])
  const normalizedSearch = search.trim().toLowerCase()
  const filteredCatalog = useMemo(
    () => catalogCourses.filter((course) => course.title.toLowerCase().includes(normalizedSearch)),
    [catalogCourses, normalizedSearch]
  )
  const filteredAuthoring = useMemo(
    () => authoringCourses.filter((course) =>
      (filter === 'ALL' || course.status === filter) && course.title.toLowerCase().includes(normalizedSearch)
    ),
    [authoringCourses, filter, normalizedSearch]
  )
  const activeQuery = isDemoMode ? catalogQuery : authoringQuery
  const categoryCount = new Set(catalogCourses.map((course) => course.category?.name).filter(Boolean)).size
  const reviewCount = catalogCourses.reduce((total, course) => total + (course.ratingCount ?? 0), 0)
  const stats = isDemoMode
    ? [
        { label: 'Database courses', value: catalogCourses.length, icon: Clock3, tone: 'bg-brand-soft text-primary' },
        { label: 'Categories', value: categoryCount, icon: FileEdit, tone: 'bg-subtle text-content-secondary' },
        { label: 'Learner reviews', value: reviewCount, icon: MessageSquare, tone: 'bg-success/10 text-success' },
      ]
    : [
        { label: 'Total courses', value: authoringCourses.length, icon: Clock3, tone: 'bg-brand-soft text-primary' },
        { label: 'Drafts', value: authoringCourses.filter((course) => course.status === 'DRAFT').length, icon: FileEdit, tone: 'bg-subtle text-content-secondary' },
        { label: 'Published', value: authoringCourses.filter((course) => course.status === 'PUBLISHED').length, icon: CheckCircle2, tone: 'bg-success/10 text-success' },
      ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Courses"
        description={isDemoMode ? 'Published courses loaded directly from the connected database.' : 'Create, organize, and publish your database-backed courses.'}
        action={isDemoMode
          ? <Button disabled title="Firebase Web authentication is required"><Plus size={16} /> Create course</Button>
          : <Link href="/studio/new/setup"><Button><Plus size={16} /> Create course</Button></Link>}
      />

      {activeQuery.isError && (
        <Card className="border-error/20 bg-error/5 p-4 text-sm text-error">
          Could not load courses from the API. No local course data is being substituted.
        </Card>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="flex items-center gap-3 p-4">
            <span className={cn('flex h-11 w-11 items-center justify-center rounded-xl', stat.tone)}><stat.icon size={18} /></span>
            <div>
              <p className="text-xl font-bold text-content">{activeQuery.isLoading ? '…' : activeQuery.isError ? 'Unavailable' : stat.value}</p>
              <p className="text-xs text-content-secondary">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        {!isDemoMode && (
          <div className="flex flex-wrap gap-2">
            {(['ALL', 'DRAFT', 'PUBLISHED'] as const).map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={cn('rounded-full px-4 py-2 text-xs font-medium transition-colors', filter === item ? 'bg-brand-soft text-primary ring-1 ring-primary' : 'bg-surface text-content-secondary ring-1 ring-border')}
              >
                {item === 'ALL' ? 'All courses' : item === 'DRAFT' ? 'Drafts' : 'Published'}
              </button>
            ))}
          </div>
        )}
        <Input className="w-full sm:ms-auto sm:w-72" value={search} onChange={(event) => setSearch(event.target.value)} icon={<Search size={16} />} placeholder="Search database courses…" />
      </div>

      {activeQuery.isLoading ? (
        <Card className="py-16 text-center text-sm text-content-secondary">Loading courses from the API…</Card>
      ) : isDemoMode ? (
        filteredCatalog.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredCatalog.map((course) => <CourseGridCard key={course.id} course={course} />)}
          </div>
        ) : !activeQuery.isError ? <Card className="py-16 text-center text-sm text-content-secondary">No database courses match this view.</Card> : null
      ) : filteredAuthoring.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredAuthoring.map((course, index) => <CourseWorkspaceCard key={course.id} course={course} featured={index === 1} />)}
        </div>
      ) : !activeQuery.isError ? (
        <Card className="py-16 text-center text-sm text-content-secondary">No instructor courses match this view.</Card>
      ) : null}
    </div>
  )
}
