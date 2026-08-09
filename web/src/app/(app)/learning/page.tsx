'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDashed,
  LayoutGrid,
  Search,
  Sparkles,
} from 'lucide-react'
import { coursesApi } from '@/lib/api/services'
import { useT } from '@/lib/i18n'
import type { ContinueLearningItem } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { CourseThumbnail } from '@/components/course/CourseThumbnail'
import { SaveButton } from '@/components/course/SaveButton'
import { RatingStars } from '@/components/common/RatingStars'
import { PageHeader } from '@/components/workspace/PageHeader'
import { FilterChips, type FilterChip } from '@/components/student/FilterChips'
import { EmptyState } from '@/components/student/EmptyState'
import { cn } from '@/lib/utils'

type Filter = 'ALL' | 'IN_PROGRESS' | 'COMPLETED' | 'NOT_STARTED'
type Sort = 'RECENT' | 'PROGRESS' | 'TITLE'

const PAGE_SIZE = 10

function matchesFilter(item: ContinueLearningItem, filter: Filter): boolean {
  switch (filter) {
    case 'IN_PROGRESS':
      return item.status === 'ACTIVE' && item.completedLessons > 0
    case 'NOT_STARTED':
      return item.status === 'ACTIVE' && item.completedLessons === 0
    case 'COMPLETED':
      return item.status === 'COMPLETED'
    default:
      return true
  }
}

/**
 * "My Courses" (Figma "6. Courses") — the student's enrolled courses with
 * search, state filters, a category strip, sorting, the result count and
 * pagination. Backed by GET /courses/continue-learning, which is the only feed
 * that carries per-enrollment progress.
 */
export default function MyLearningPage() {
  const t = useT()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('ALL')
  const [category, setCategory] = useState<string>('ALL')
  const [sort, setSort] = useState<Sort>('RECENT')
  const [page, setPage] = useState(1)

  const enrollments = useQuery({ queryKey: ['continue-learning'], queryFn: coursesApi.continueLearning })
  const items = useMemo(() => enrollments.data ?? [], [enrollments.data])

  const categories = useMemo(() => {
    const names = new Set<string>()
    for (const item of items) if (item.course.category?.name) names.add(item.course.category.name)
    return Array.from(names).sort()
  }, [items])

  const filters: FilterChip<Filter>[] = [
    { value: 'ALL', label: t('learning.filter.all'), icon: CheckCircle2, count: items.length },
    {
      value: 'IN_PROGRESS',
      label: t('learning.filter.inProgress'),
      icon: CircleDashed,
      count: items.filter((item) => matchesFilter(item, 'IN_PROGRESS')).length,
    },
    {
      value: 'COMPLETED',
      label: t('learning.filter.completed'),
      icon: CheckCircle2,
      count: items.filter((item) => matchesFilter(item, 'COMPLETED')).length,
    },
    {
      value: 'NOT_STARTED',
      label: t('learning.filter.notStarted'),
      icon: Sparkles,
      count: items.filter((item) => matchesFilter(item, 'NOT_STARTED')).length,
    },
  ]

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase()
    const rows = items.filter(
      (item) =>
        matchesFilter(item, filter) &&
        (category === 'ALL' || item.course.category?.name === category) &&
        (!query ||
          item.course.title.toLowerCase().includes(query) ||
          (item.course.author?.name ?? '').toLowerCase().includes(query)),
    )
    const sorted = [...rows]
    if (sort === 'PROGRESS') sorted.sort((a, b) => b.percentage - a.percentage)
    else if (sort === 'TITLE') sorted.sort((a, b) => a.course.title.localeCompare(b.course.title))
    else sorted.sort((a, b) => (b.enrolledAt ?? '').localeCompare(a.enrolledAt ?? ''))
    return sorted
  }, [items, filter, category, search, sort])

  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE))
  // Snap back when a filter change makes the current page unreachable.
  useEffect(() => {
    setPage((current) => Math.min(current, pageCount))
  }, [pageCount])
  const pageItems = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="space-y-5">
      <PageHeader title={t('learning.title')} description={t('learning.subtitle')} />

      <Input
        icon={<Search size={18} />}
        placeholder={t('student.searchPlaceholder')}
        value={search}
        onChange={(event) => {
          setSearch(event.target.value)
          setPage(1)
        }}
        aria-label={t('student.searchPlaceholder')}
      />

      <FilterChips
        items={filters}
        value={filter}
        onChange={(next) => {
          setFilter(next)
          setPage(1)
        }}
      />

      {categories.length > 1 && (
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-content">{t('learning.categories')}</h2>
          <div className="no-scrollbar -mx-1 flex gap-2.5 overflow-x-auto px-1 py-0.5">
            {['ALL', ...categories].map((name) => {
              const active = category === name
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setCategory(name)
                    setPage(1)
                  }}
                  className={cn(
                    'flex h-20 w-24 shrink-0 flex-col items-center justify-center gap-1.5 rounded-card border text-[11px] font-semibold transition-colors',
                    active
                      ? 'border-primary bg-brand-soft text-primary'
                      : 'border-border bg-surface text-content-secondary hover:text-content',
                  )}
                >
                  <LayoutGrid size={20} strokeWidth={1.8} />
                  <span className="max-w-[80px] truncate px-1">
                    {name === 'ALL' ? t('learning.filter.all') : name}
                  </span>
                </button>
              )
            })}
          </div>
        </section>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-xs text-content-secondary">
          {t('learning.sortBy')}
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as Sort)}
            className="h-10 rounded-input border border-border bg-surface px-3 text-xs font-semibold text-content outline-none focus:border-primary"
          >
            <option value="RECENT">{t('learning.sort.recent')}</option>
            <option value="PROGRESS">{t('learning.sort.progress')}</option>
            <option value="TITLE">{t('learning.sort.title')}</option>
          </select>
        </label>
        <p className="text-xs font-semibold text-content-secondary">
          {t('learning.courseCount').replace('{n}', String(visible.length))}
        </p>
      </div>

      {enrollments.isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-28 rounded-card" />
          ))}
        </div>
      ) : enrollments.isError ? (
        <Card className="border-error/20 bg-error/5 p-4 text-sm text-error">{t('learning.loadError')}</Card>
      ) : pageItems.length ? (
        <div className="space-y-3">
          {pageItems.map((item) => {
            const percentage = Math.round(item.percentage)
            const done = item.status === 'COMPLETED'
            const started = item.completedLessons > 0
            return (
              <div key={item.enrollmentId} className="relative">
                <SaveButton courseId={item.course.id} className="absolute end-3 top-3 z-10" />
                <Link href={`/courses/${item.course.id}`} className="block">
                  <Card hover className="flex gap-3 p-3">
                    <CourseThumbnail
                      src={item.course.thumbnail}
                      seed={item.course.id}
                      label={item.course.title}
                      className="h-24 w-24 shrink-0 rounded-xl sm:h-28 sm:w-32"
                    />
                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 pe-10">
                      <div className="space-y-1">
                        <h3 className="line-clamp-2 text-sm font-bold text-content">{item.course.title}</h3>
                        {item.course.author?.name && (
                          <p className="truncate text-xs text-content-secondary">{item.course.author.name}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-content-secondary">
                          {item.course.avgRating != null && (
                            <RatingStars value={item.course.avgRating} size={12} count={item.course.ratingCount} />
                          )}
                          <span>{t(`level.${item.course.level}`, item.course.level)}</span>
                          <span>
                            {t('learning.lessons').replace('{n}', String(item.totalLessons))}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border/70">
                          <div
                            className={cn('h-full rounded-full', done ? 'bg-success' : 'bg-primary')}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <Badge tone={done ? 'success' : started ? 'primary' : 'muted'}>
                          {done
                            ? t('student.completed')
                            : started
                              ? t('student.inProgress')
                              : t('learning.filter.notStarted')}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            )
          })}
        </div>
      ) : items.length ? (
        <Card>
          <EmptyState
            icon={Search}
            title={t('learning.noMatch')}
            description={t('learning.noMatchHint')}
          />
        </Card>
      ) : (
        <Card>
          <EmptyState
            icon={BookOpen}
            title={t('student.noEnrollments')}
            description={t('student.noEnrollmentsHint')}
            actionLabel={t('student.browseCourses')}
            actionHref="/catalog"
          />
        </Card>
      )}

      {pageCount > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-content-secondary">
            {t('learning.showing')
              .replace('{from}', String((page - 1) * PAGE_SIZE + 1))
              .replace('{to}', String(Math.min(page * PAGE_SIZE, visible.length)))
              .replace('{total}', String(visible.length))}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
              aria-label={t('learning.previousPage')}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-content-secondary disabled:opacity-40"
            >
              <ChevronLeft size={16} className="rtl:rotate-180" />
            </button>
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-current={page === index + 1 ? 'page' : undefined}
                onClick={() => setPage(index + 1)}
                className={cn(
                  'h-9 w-9 rounded-full text-xs font-bold transition-colors',
                  page === index + 1
                    ? 'bg-primary text-white'
                    : 'border border-border text-content-secondary hover:text-content',
                )}
              >
                {index + 1}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
              disabled={page === pageCount}
              aria-label={t('learning.nextPage')}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-content-secondary disabled:opacity-40"
            >
              <ChevronRight size={16} className="rtl:rotate-180" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
