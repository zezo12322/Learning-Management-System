'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { CheckCircle2, Clock3, FileEdit, Plus, Search, SlidersHorizontal } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthProvider'
import { authoringApi } from '@/lib/api/services'
import { demoCourses } from '@/lib/demo-data'
import { PageHeader } from '@/components/workspace/PageHeader'
import { CourseWorkspaceCard } from '@/components/workspace/CourseWorkspaceCard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type Filter = 'ALL' | 'DRAFT' | 'PUBLISHED'

export default function CoursesPage() {
  const { isDemoMode } = useAuth()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('ALL')
  const query = useQuery({ queryKey: ['authoring-courses'], queryFn: authoringApi.list, enabled: !isDemoMode })
  const courses = useMemo(
    () => (isDemoMode ? demoCourses : query.data ?? []),
    [isDemoMode, query.data]
  )
  const filtered = useMemo(
    () => courses.filter((course) => (filter === 'ALL' || course.status === filter) && course.title.toLowerCase().includes(search.toLowerCase())),
    [courses, filter, search]
  )

  const stats = [
    { label: 'Total courses', value: courses.length, icon: Clock3, tone: 'bg-brand-soft text-primary' },
    { label: 'Drafts', value: courses.filter((course) => course.status === 'DRAFT').length, icon: FileEdit, tone: 'bg-subtle text-content-secondary' },
    { label: 'Published', value: courses.filter((course) => course.status === 'PUBLISHED').length, icon: CheckCircle2, tone: 'bg-success/10 text-success' },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Courses"
        description="Create, organize, and publish learning experiences."
        action={<Link href="/studio/new/setup"><Button><Plus size={16} /> Create course</Button></Link>}
      />

      {query.isError && !isDemoMode && <Card className="border-error/20 bg-error/5 p-4 text-sm text-error">Could not load instructor courses from the API.</Card>}

      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="flex items-center gap-3 p-4">
            <span className={cn('flex h-11 w-11 items-center justify-center rounded-xl', stat.tone)}><stat.icon size={18} /></span>
            <div><p className="text-xl font-bold text-content">{stat.value}</p><p className="text-xs text-content-secondary">{stat.label}</p></div>
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
              {item === 'ALL' ? 'All courses' : item === 'DRAFT' ? 'Drafts' : 'Published'}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Input className="w-full sm:w-64" value={search} onChange={(event) => setSearch(event.target.value)} icon={<Search size={16} />} placeholder="Search courses…" />
          <Button variant="outline" size="icon" aria-label="Filter courses"><SlidersHorizontal size={17} /></Button>
        </div>
      </div>

      {filtered.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((course, index) => <CourseWorkspaceCard key={course.id} course={course} featured={index === 1} />)}
        </div>
      ) : (
        <Card className="py-16 text-center text-sm text-content-secondary">No courses match this view.</Card>
      )}
    </div>
  )
}
