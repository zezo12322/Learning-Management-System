'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { BookOpenCheck, GraduationCap, Plus, Users } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthProvider'
import { authoringApi } from '@/lib/api/services'
import { demoCourses } from '@/lib/demo-data'
import { PageHeader } from '@/components/workspace/PageHeader'
import { MetricCard } from '@/components/workspace/MetricCard'
import { AIUnavailable } from '@/components/workspace/AIUnavailable'
import { StatusPill } from '@/components/workspace/StatusPill'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export default function DashboardPage() {
  const { me, isDemoMode } = useAuth()
  const coursesQuery = useQuery({
    queryKey: ['authoring-courses'],
    queryFn: authoringApi.list,
    enabled: !isDemoMode,
  })
  const courses = isDemoMode ? demoCourses : coursesQuery.data ?? []

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Good morning, ${me?.name?.split(' ')[0] ?? 'Instructor'}`}
        description="Here’s what needs your attention across courses and learners."
        action={
          <Link href="/studio/new/setup">
            <Button><Plus size={16} /> Create course</Button>
          </Link>
        }
      />

      {coursesQuery.isError && !isDemoMode && (
        <Card className="border-error/20 bg-error/5 p-4 text-sm text-error">
          The course API is unavailable. Start the NestJS backend and verify NEXT_PUBLIC_API_URL.
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard icon={BookOpenCheck} label="Published courses" value={String(courses.filter((course) => course.status === 'PUBLISHED').length)} change="+2 this month" />
        <MetricCard icon={Users} label="Active learners" value="1,284" change="+12% this week" />
        <MetricCard icon={GraduationCap} label="Completion rate" value="72%" change="+6% vs last month" />
      </div>

      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-content">Continue building</h2>
            <Link href="/courses" className="text-xs font-semibold text-primary">View all courses →</Link>
          </div>
          <div className="space-y-3">
            {courses.slice(0, 3).map((course, index) => (
              <Link
                key={course.id}
                href={`/studio/${course.id}/setup`}
                className={index === 0 ? 'flex items-center gap-4 rounded-input bg-brand-soft p-4' : 'flex items-center gap-4 rounded-input bg-subtle p-4'}
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-surface text-xs font-bold text-primary">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-content">{course.title}</span>
                  <span className="mt-1 block text-[11px] text-content-secondary">{course.lessonCount} lessons · {course.updatedAt}</span>
                  <Progress value={course.progress} className="mt-3 h-1.5" />
                </span>
                <StatusPill tone={course.status === 'PUBLISHED' ? 'success' : course.status === 'IN_REVIEW' ? 'warning' : 'info'}>
                  {course.status === 'PUBLISHED' ? 'Ready' : course.status === 'IN_REVIEW' ? 'Needs review' : 'In progress'}
                </StatusPill>
              </Link>
            ))}
          </div>
        </Card>

        <Card className="flex flex-col p-5 sm:p-6">
          <div className="rounded-input bg-brand-soft p-4">
            <p className="text-[10px] font-semibold tracking-wide text-primary">AI COURSE STUDIO</p>
            <h2 className="mt-2 text-lg font-semibold text-content">Turn course content into learning assets</h2>
            <p className="mt-2 text-xs leading-5 text-content-secondary">Outcomes, summaries, and quizzes remain reviewable.</p>
          </div>
          <div className="mt-5">
            <AIUnavailable compact />
          </div>
          <div className="mt-4 space-y-2 text-xs">
            {[
              ['Course sources', 'Ready'],
              ['Provider credentials', 'Missing'],
              ['Chat API contract', 'Missing'],
            ].map(([label, state]) => (
              <div key={label} className="flex items-center justify-between rounded-xl bg-subtle px-3 py-3">
                <span className="text-content-secondary">{label}</span>
                <span className={state === 'Ready' ? 'font-semibold text-success' : 'font-semibold text-warning'}>{state}</span>
              </div>
            ))}
          </div>
          <Link href="/studio/demo-course/ai-studio" className="mt-auto pt-4">
            <Button fullWidth>Open AI Studio</Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}
