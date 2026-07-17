'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { BookOpen, Search, Star, UserRound } from 'lucide-react'
import { catalogApi, coursesApi } from '@/lib/api/services'
import { PageHeader } from '@/components/workspace/PageHeader'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { StatusPill } from '@/components/workspace/StatusPill'

export default function CatalogPage() {
  const [search, setSearch] = useState('')
  const catalog = useQuery({ queryKey: ['catalog'], queryFn: catalogApi.list })
  const serverSearch = useQuery({
    queryKey: ['course-search', search.trim()],
    queryFn: () => coursesApi.search(search.trim()),
    enabled: search.trim().length > 0,
  })
  const popular = useQuery({ queryKey: ['popular-courses'], queryFn: () => coursesApi.popular(6) })
  const recommended = useQuery({ queryKey: ['recommended-courses'], queryFn: () => coursesApi.recommended(6) })
  const continueLearning = useQuery({ queryKey: ['continue-learning'], queryFn: coursesApi.continueLearning })
  const courses = useMemo(() => catalog.data ?? [], [catalog.data])
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return courses
    return serverSearch.data ?? []
  }, [courses, search, serverSearch.data])
  const featured = recommended.data?.length ? recommended.data : (popular.data ?? [])

  return (
    <div className="space-y-6">
      <PageHeader title="Course catalog" description="Browse published learning experiences available to learners." />
      <Input icon={<Search size={17} />} placeholder="Search the catalog…" className="max-w-xl" value={search} onChange={(event) => setSearch(event.target.value)} />
      {catalog.isError && <Card className="border-error/20 bg-error/10 p-4 text-sm text-error">The live catalog could not be reached.</Card>}
      {!search && continueLearning.data?.length ? (
        <Card className="p-5">
          <div className="flex items-center justify-between"><h2 className="text-base font-semibold text-content">Continue learning</h2><span className="text-xs text-content-muted">Synced from your enrollments</span></div>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {continueLearning.data.slice(0, 3).map((item) => (
              <Link key={item.enrollmentId} href={`/learn/${item.course.id}`} className="rounded-input bg-subtle p-4">
                <p className="text-sm font-semibold text-content">{item.course.title}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border"><div className="h-full rounded-full bg-primary" style={{ width: `${item.percentage}%` }} /></div>
                <p className="mt-2 text-[11px] text-content-secondary">{item.completedLessons}/{item.totalLessons} lessons · {item.percentage}%</p>
              </Link>
            ))}
          </div>
        </Card>
      ) : null}
      {!search && featured.length ? (
        <div>
          <h2 className="mb-3 text-base font-semibold text-content">{recommended.data?.length ? 'Recommended for you' : 'Popular courses'}</h2>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {featured.slice(0, 3).map((course) => <Link key={course.id} href={`/catalog/${course.id}`} className="rounded-input border border-border bg-surface p-4 text-sm font-semibold text-content transition-colors hover:border-primary">{course.title}<span className="mt-1 block text-[11px] font-normal text-content-secondary">{course.category?.name ?? course.level.toLowerCase()}</span></Link>)}
          </div>
        </div>
      ) : null}
      <h2 className="text-base font-semibold text-content">{search ? 'Search results' : 'All courses'}</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((course, index) => (
          <Link key={course.id} href={`/catalog/${course.id}`}>
            <Card hover className="h-full overflow-hidden">
              {course.thumbnail ? (
                <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${course.thumbnail})` }} />
              ) : (
                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-primary-500 to-primary-800 text-3xl font-bold text-white">
                  {course.title.split(/\s+/).slice(0, 2).map((word) => word[0]).join('').toUpperCase() || index + 1}
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center justify-between"><StatusPill tone="success">{course.level.toLowerCase()}</StatusPill><span className="inline-flex items-center gap-1 text-xs font-semibold text-content"><Star size={13} className="fill-warning text-warning" /> {course.avgRating?.toFixed(1) ?? 'New'}</span></div>
                <h2 className="mt-4 text-base font-semibold text-content">{course.title}</h2>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-content-secondary">{course.description || 'Open the course to view its full curriculum.'}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-content-muted"><span className="inline-flex items-center gap-1"><BookOpen size={13} /> {course.category?.name ?? 'Course'}</span><span className="inline-flex items-center gap-1"><UserRound size={13} /> {course.author?.name ?? 'Instructor'}</span></div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      {!catalog.isLoading && !serverSearch.isFetching && filtered.length === 0 && <Card className="p-8 text-center text-sm text-content-secondary">No published courses match this search.</Card>}
    </div>
  )
}
