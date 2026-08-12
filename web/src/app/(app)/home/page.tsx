'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import {
  Award,
  BadgeCheck,
  Bell,
  BookOpen,
  CircleDashed,
  ClipboardList,
  GraduationCap,
  Search,
} from 'lucide-react'
import { catalogApi, coursesApi } from '@/lib/api/services'
import { useI18n } from '@/lib/i18n'
import { useAuth } from '@/lib/auth/AuthProvider'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { CourseGridCard, CourseListRow } from '@/components/course/CourseCard'
import { RatingStars } from '@/components/common/RatingStars'
import { StatCard } from '@/components/student/StatCard'
import { SectionHeader } from '@/components/student/SectionHeader'
import { ContinueLearningCard } from '@/components/student/ContinueLearningCard'
import { EmptyState } from '@/components/student/EmptyState'
import type { AuthorRef, CourseCard } from '@/lib/types'

/** Morning / afternoon / evening, so the greeting matches the Figma header. */
function greetingKey(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'student.goodMorning'
  if (hour < 18) return 'student.goodAfternoon'
  return 'student.goodEvening'
}

/** Highest-rated authors across the catalog — the "Top Instructors" strip. */
function topInstructors(courses: CourseCard[]): { author: AuthorRef; rating: number; courses: number }[] {
  const byName = new Map<string, { author: AuthorRef; total: number; weight: number; courses: number }>()
  for (const course of courses) {
    const name = course.author?.name
    if (!name) continue
    const entry = byName.get(name) ?? { author: course.author as AuthorRef, total: 0, weight: 0, courses: 0 }
    entry.courses += 1
    if (course.avgRating != null && course.ratingCount) {
      entry.total += course.avgRating * course.ratingCount
      entry.weight += course.ratingCount
    }
    byName.set(name, entry)
  }
  return Array.from(byName.values())
    .map((entry) => ({
      author: entry.author,
      rating: entry.weight ? entry.total / entry.weight : 0,
      courses: entry.courses,
    }))
    .sort((a, b) => b.rating - a.rating || b.courses - a.courses)
    .slice(0, 4)
}

export default function StudentHomePage() {
  const { t } = useI18n()
  const { me } = useAuth()
  const router = useRouter()
  const [search, setSearch] = useState('')

  const enrollments = useQuery({ queryKey: ['continue-learning'], queryFn: coursesApi.continueLearning })
  const popular = useQuery({ queryKey: ['popular-courses', 8], queryFn: () => coursesApi.popular(8) })
  const recommended = useQuery({ queryKey: ['recommended-courses', 6], queryFn: () => coursesApi.recommended(6) })
  const catalog = useQuery({ queryKey: ['catalog'], queryFn: catalogApi.list })

  const items = useMemo(() => enrollments.data ?? [], [enrollments.data])
  const stats = useMemo(() => {
    const completed = items.filter((item) => item.status === 'COMPLETED')
    const activeItems = items.filter((item) => item.status === 'ACTIVE')
    return {
      enrolled: items.length,
      inProgress: activeItems.length,
      lessons: items.reduce((total, item) => total + item.completedLessons, 0),
      // The denominator for "lessons completed" — the figure was previously
      // reported with nothing to measure it against.
      totalLessons: items.reduce((total, item) => total + item.totalLessons, 0),
      certificates: completed.length,
      // What is actually left to watch, rather than repeating the enrolment
      // count that the first tile's note already carries.
      remaining: Math.max(
        0,
        activeItems.reduce((total, item) => total + (item.totalLessons - item.completedLessons), 0),
      ),
    }
  }, [items])

  /**
   * Ordered by how much is left, so the nearly-finished course is on top.
   * Completed enrolments follow the active ones instead of being dropped — a
   * finished course is still somewhere the learner may want to go back to.
   */
  const closest = useMemo(() => {
    const byProgress = (a: { percentage: number }, b: { percentage: number }) =>
      b.percentage - a.percentage
    return [
      ...items.filter((item) => item.status === 'ACTIVE').sort(byProgress),
      ...items.filter((item) => item.status === 'COMPLETED').sort(byProgress),
    ]
  }, [items])
  const instructors = useMemo(
    () => topInstructors(catalog.data?.length ? catalog.data : (popular.data ?? [])),
    [catalog.data, popular.data],
  )

  const firstName = (me?.name ?? '').trim().split(/\s+/)[0] || t('student.learner')
  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault()
    const query = search.trim()
    router.push(query ? `/catalog?q=${encodeURIComponent(query)}` : '/catalog')
  }

  return (
    <div className="space-y-7">
      {/* Greeting. The learner's name is data, not the page's title: the <h1>
          names the screen so the document outline does not read "Ahmed!". */}
      <div className="flex items-center gap-3">
        <Avatar src={me?.avatar} name={me?.name} size={52} online />
        <div className="min-w-0">
          <p className="truncate text-sm text-content-secondary">
            {t(greetingKey())} {firstName} 👋
          </p>
          <h1 className="text-2xl font-bold text-content">{t('student.homeTitle')}</h1>
        </div>
      </div>

      {/* Search */}
      <form onSubmit={submitSearch}>
        <Input
          icon={<Search size={18} />}
          placeholder={t('student.searchPlaceholder')}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label={t('student.searchPlaceholder')}
        />
      </form>

      {enrollments.isError && (
        <Card className="border-error bg-error-soft p-4 text-sm text-error">
          {t('learning.loadError')}
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {enrollments.isLoading || enrollments.isError ? (
          Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-[118px] rounded-card" />)
        ) : (
          <>
            <StatCard
              icon={BookOpen}
              value={stats.enrolled}
              label={t('student.stat.enrolled')}
              note={t('student.stat.enrolledNote').replace('{n}', String(stats.inProgress))}
              tone="primary"
            />
            <StatCard
              icon={GraduationCap}
              value={stats.lessons}
              label={t('student.stat.lessons')}
              note={t('student.stat.lessonsOfTotal').replace('{total}', String(stats.totalLessons))}
              tone="secondary"
            />
            <StatCard
              icon={Award}
              value={stats.certificates}
              label={t('student.stat.certificates')}
              note={t('student.stat.certificatesNote')}
              tone="success"
            />
            <StatCard
              icon={CircleDashed}
              value={stats.remaining}
              label={t('student.stat.remaining')}
              note={t('student.stat.remainingNote')}
              tone="warning"
            />
          </>
        )}
      </div>

      {/* Quick links. The sidebar is desktop-only and the mobile tab bar keeps
          the four tabs from the design, so Home carries the entry points to the
          remaining student screens — mirroring the Flutter home, which also
          surfaces assignments from here. Six columns on desktop so three cards
          stay card-sized instead of stretching to fill 1500px. */}
      <section className="space-y-3">
        <SectionHeader title={t('student.quickLinks')} />
        <div className="grid grid-cols-3 gap-3 lg:grid-cols-6">
          {[
            { href: '/assignments', label: t('nav.assignments'), icon: ClipboardList },
            { href: '/certificates', label: t('nav.certificates'), icon: Award },
            { href: '/notifications', label: t('notifications.title'), icon: Bell },
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <Card hover className="flex h-full flex-col items-center gap-2 p-4 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-on-brand-soft">
                  <link.icon size={18} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold text-content">{link.label}</span>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Closest to finishing. The list is sorted by percentage, so the heading
          states that rather than promising the most recently watched course —
          no endpoint reports last activity. */}
      <section className="space-y-3">
        <SectionHeader
          title={t('student.closestToFinishing')}
          href="/learning"
          actionLabel={t('student.viewAll')}
        />
        <p className="text-xs text-content-secondary">{t('student.closestToFinishingHint')}</p>
        {enrollments.isLoading ? (
          <Skeleton className="h-32 rounded-card" />
        ) : enrollments.isError ? null : closest.length ? (
          <div className="grid gap-3 xl:grid-cols-2 2xl:grid-cols-3">
            {/* Two cards fill one or two columns; the third only exists once
                there is a third column to put it in. */}
            {closest.slice(0, 3).map((item, index) => (
              <ContinueLearningCard
                key={item.enrollmentId}
                item={item}
                className={index === 2 ? 'hidden 2xl:flex' : undefined}
              />
            ))}
          </div>
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
      </section>

      {/* Popular courses */}
      {(popular.isLoading || (popular.data?.length ?? 0) > 0) && (
        <section className="space-y-3">
          <SectionHeader title={t('student.popularCourses')} href="/catalog" actionLabel={t('student.viewAll')} />
          {popular.isLoading ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-56 rounded-card" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
              {(popular.data ?? []).slice(0, 4).map((course) => (
                <CourseGridCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Recommended */}
      {recommended.data?.length ? (
        <section className="space-y-3">
          <SectionHeader title={t('student.recommended')} href="/catalog" actionLabel={t('student.viewAll')} />
          {/* CourseListRow points at /courses/[id] — the Figma-mapped detail
              page — instead of /catalog/[id], which is collapsing to a
              redirect. */}
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {recommended.data.slice(0, 3).map((course) => (
              <CourseListRow key={course.id} course={course} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Top instructors */}
      {instructors.length ? (
        <section className="space-y-3">
          <SectionHeader title={t('student.topInstructors')} />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {instructors.map((entry) => (
              <Card key={entry.author.name} className="flex flex-col items-center p-4 text-center">
                <span className="relative">
                  <Avatar src={entry.author.avatar} name={entry.author.name} size={64} />
                  <BadgeCheck
                    size={18}
                    className="absolute -end-0.5 -top-0.5 rounded-full bg-surface text-primary"
                  />
                </span>
                <p className="mt-3 truncate text-sm font-bold text-content">{entry.author.name}</p>
                <p className="mt-0.5 text-[11px] text-content-secondary">
                  {t('student.coursesCount').replace('{n}', String(entry.courses))}
                </p>
                {entry.rating > 0 && <RatingStars value={entry.rating} size={13} className="mt-2" />}
              </Card>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
