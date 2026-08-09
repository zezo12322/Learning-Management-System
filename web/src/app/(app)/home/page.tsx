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
  ChevronRight,
  ClipboardList,
  GraduationCap,
  Search,
  TrendingUp,
} from 'lucide-react'
import { catalogApi, coursesApi } from '@/lib/api/services'
import { useI18n } from '@/lib/i18n'
import { useAuth } from '@/lib/auth/AuthProvider'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { CourseGridCard } from '@/components/course/CourseCard'
import { CourseThumbnail } from '@/components/course/CourseThumbnail'
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
    return {
      enrolled: items.length,
      inProgress: items.filter((item) => item.status === 'ACTIVE').length,
      lessons: items.reduce((total, item) => total + item.completedLessons, 0),
      certificates: completed.length,
    }
  }, [items])

  const active = useMemo(
    () => items.filter((item) => item.status === 'ACTIVE').sort((a, b) => b.percentage - a.percentage),
    [items],
  )
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
      {/* Greeting */}
      <div className="flex items-center gap-3">
        <Avatar src={me?.avatar} name={me?.name} size={52} online />
        <div className="min-w-0">
          <p className="text-sm text-content-secondary">{t(greetingKey())} 👋</p>
          <h1 className="truncate text-2xl font-bold text-content">{firstName}!</h1>
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
        <Card className="border-error/20 bg-error/5 p-4 text-sm text-error">
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
              note={t('student.stat.lessonsNote')}
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
              icon={TrendingUp}
              value={stats.inProgress}
              label={t('student.stat.inProgress')}
              note={t('student.stat.inProgressNote')}
              tone="warning"
            />
          </>
        )}
      </div>

      {/* Quick links. The sidebar is desktop-only and the mobile tab bar keeps
          the four tabs from the design, so Home carries the entry points to the
          remaining student screens — mirroring the Flutter home, which also
          surfaces assignments from here. */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { href: '/assignments', label: t('nav.assignments'), icon: ClipboardList },
          { href: '/certificates', label: t('nav.certificates'), icon: Award },
          { href: '/notifications', label: t('notifications.title'), icon: Bell },
        ].map((link) => (
          <Link key={link.href} href={link.href}>
            <Card hover className="flex h-full flex-col items-center gap-2 p-4 text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-primary">
                <link.icon size={18} strokeWidth={1.9} />
              </span>
              <span className="text-xs font-semibold text-content">{link.label}</span>
            </Card>
          </Link>
        ))}
      </div>

      {/* Continue learning */}
      <section className="space-y-3">
        <SectionHeader title={t('student.continueLearning')} href="/learning" actionLabel={t('student.viewAll')} />
        {enrollments.isLoading ? (
          <Skeleton className="h-32 rounded-card" />
        ) : enrollments.isError ? null : active.length ? (
          <div className="grid gap-3 xl:grid-cols-2">
            {active.slice(0, 2).map((item) => (
              <ContinueLearningCard key={item.enrollmentId} item={item} />
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
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {recommended.data.slice(0, 3).map((course) => (
              <Link key={course.id} href={`/catalog/${course.id}`}>
                <Card hover className="flex h-full items-center gap-3 p-3">
                  <CourseThumbnail
                    src={course.thumbnail}
                    seed={course.id}
                    label={course.title}
                    className="h-12 w-12 shrink-0 rounded-xl text-[10px]"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-content">{course.title}</span>
                    <span className="mt-0.5 block truncate text-[11px] text-content-secondary">
                      {[course.category?.name, t(`level.${course.level}`, course.level)]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                  </span>
                  <ChevronRight size={16} className="shrink-0 text-content-muted rtl:rotate-180" />
                </Card>
              </Link>
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
