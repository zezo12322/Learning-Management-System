'use client'

import { Suspense, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { BookOpen, Search, UserRound } from 'lucide-react'
import { catalogApi, coursesApi } from '@/lib/api/services'
import { useT } from '@/lib/i18n'
import { PageHeader } from '@/components/workspace/PageHeader'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CourseThumbnail } from '@/components/course/CourseThumbnail'
import { CourseMetaRow } from '@/components/course/CourseMetaRow'
import { EnrolledCourseRow } from '@/components/student/EnrolledCourseRow'
import { SectionHeader } from '@/components/student/SectionHeader'

export default function CatalogPage() {
  // useSearchParams needs a Suspense boundary during static prerender.
  return (
    <Suspense fallback={null}>
      <CatalogView />
    </Suspense>
  )
}

function CatalogView() {
  const t = useT()
  // The student Home search box submits into the catalog as ?q=…
  const initialQuery = useSearchParams().get('q') ?? ''
  const [search, setSearch] = useState(initialQuery)
  const catalog = useQuery({ queryKey: ['catalog'], queryFn: catalogApi.list })
  const serverSearch = useQuery({
    queryKey: ['course-search', search.trim()],
    queryFn: () => coursesApi.search(search.trim()),
    enabled: search.trim().length > 0,
  })
  const popular = useQuery({ queryKey: ['popular-courses', 6], queryFn: () => coursesApi.popular(6) })
  const recommended = useQuery({ queryKey: ['recommended-courses', 6], queryFn: () => coursesApi.recommended(6) })
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
      <PageHeader title={t('catalog.title')} description={t('catalog.subtitle')} />
      <Input icon={<Search size={17} />} placeholder={t('catalog.searchPlaceholder')} className="max-w-xl" value={search} onChange={(event) => setSearch(event.target.value)} />
      {catalog.isError && <Card className="border-error bg-error-soft p-4 text-sm text-error">{t('catalog.reachError')}</Card>}

      {/* The learner's own courses, rendered by the same EnrolledCourseRow that
          /home and /learning use. The block this replaces printed the raw
          percentage — "33.33333333333333%" — and was the fourth divergent
          Continue-Learning implementation in the product. */}
      {!search && continueLearning.data?.length ? (
        <section className="space-y-3">
          <SectionHeader
            title={t('catalog.enrolledStripTitle')}
            href="/learning"
            actionLabel={t('catalog.viewMyCourses')}
          />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {continueLearning.data.slice(0, 3).map((item) => (
              <EnrolledCourseRow key={item.enrollmentId} item={item} density="compact" />
            ))}
          </div>
        </section>
      ) : null}

      {!search && featured.length ? (
        <section className="space-y-3">
          <SectionHeader title={recommended.data?.length ? t('catalog.recommended') : t('catalog.popular')} />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {featured.slice(0, 3).map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="rounded-input border border-border bg-surface p-4 transition-colors hover:border-primary"
              >
                <p className="text-sm font-semibold text-content">{course.title}</p>
                <p className="mt-1 text-[11px] text-content-secondary">{course.category?.name ?? t('catalog.courseFallback')}</p>
                <CourseMetaRow
                  className="mt-2"
                  level={course.level}
                  rating={course.avgRating ?? null}
                  ratingCount={course.ratingCount ?? null}
                />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <h2 className="text-base font-semibold text-content">{search ? t('catalog.searchResults') : t('catalog.allCourses')}</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filtered.map((course) => (
          <Link key={course.id} href={`/courses/${course.id}`}>
            <Card hover className="flex h-full flex-col overflow-hidden">
              {/* The shared thumbnail: it uses the real image when the URL is a
                  usable one and falls back to a deterministic brand gradient,
                  which is what the hand-rolled background-image div here never
                  managed to do safely. */}
              <CourseThumbnail
                src={course.thumbnail}
                seed={course.id}
                label={course.title}
                className="h-40 w-full"
              />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-semibold text-content">{course.title}</h3>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-content-secondary">{course.description || t('catalog.noDescription')}</p>
                <CourseMetaRow
                  className="mt-3"
                  level={course.level}
                  rating={course.avgRating ?? null}
                  ratingCount={course.ratingCount ?? null}
                />
                <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-[11px] text-content-muted">
                  <span className="inline-flex items-center gap-1">
                    <BookOpen size={13} aria-hidden="true" />
                    {course.category?.name ?? t('catalog.courseFallback')}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <UserRound size={13} aria-hidden="true" />
                    {course.author?.name ?? t('catalog.instructorFallback')}
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      {!catalog.isLoading && !serverSearch.isFetching && filtered.length === 0 && <Card className="p-8 text-center text-sm text-content-secondary">{t('catalog.noResults')}</Card>}
    </div>
  )
}
