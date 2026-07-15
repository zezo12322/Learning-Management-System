'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { BookOpen, Search, Star, UserRound } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthProvider'
import { catalogApi } from '@/lib/api/services'
import { demoCourses } from '@/lib/demo-data'
import type { CourseCard } from '@/lib/types'
import { PageHeader } from '@/components/workspace/PageHeader'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { StatusPill } from '@/components/workspace/StatusPill'

const demoCatalog: CourseCard[] = demoCourses
  .filter((course) => course.status === 'PUBLISHED')
  .map((course) => ({
    id: course.id,
    title: course.title,
    description: course.description,
    price: course.price ?? 0,
    language: course.language,
    level: course.level,
    avgRating: 4.8,
    ratingCount: course.students,
    category: { name: course.category },
    author: { name: 'Optima Academy' },
  }))

export default function CatalogPage() {
  const { isDemoMode } = useAuth()
  const [search, setSearch] = useState('')
  const catalog = useQuery({ queryKey: ['catalog'], queryFn: catalogApi.list, enabled: !isDemoMode })
  const courses = useMemo(() => isDemoMode ? demoCatalog : (catalog.data ?? []), [catalog.data, isDemoMode])
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return courses
    return courses.filter((course) =>
      [course.title, course.description, course.category?.name, course.author?.name]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(query))
    )
  }, [courses, search])

  return (
    <div className="space-y-6">
      <PageHeader title="Course catalog" description="Browse published learning experiences available to learners." />
      <Input icon={<Search size={17} />} placeholder="Search the catalog…" className="max-w-xl" value={search} onChange={(event) => setSearch(event.target.value)} />
      {catalog.isError && !isDemoMode && <Card className="border-error/20 bg-error/10 p-4 text-sm text-error">The catalog API could not be reached.</Card>}
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
      {!catalog.isLoading && filtered.length === 0 && <Card className="p-8 text-center text-sm text-content-secondary">No published courses match this search.</Card>}
    </div>
  )
}
