'use client'

import Link from 'next/link'
import { ArrowRight, Clock, Layers3, Users } from 'lucide-react'
import type { AuthoringCourse } from '@/lib/types'
import { useT } from '@/lib/i18n'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { StatusPill, type StatusTone } from '@/components/workspace/StatusPill'

const statusMap: Record<AuthoringCourse['status'], { labelKey: string; tone: StatusTone }> = {
  DRAFT: { labelKey: 'courses.status.draft', tone: 'neutral' },
  IN_REVIEW: { labelKey: 'courses.status.inReview', tone: 'warning' },
  PUBLISHED: { labelKey: 'courses.status.published', tone: 'success' },
  ARCHIVED: { labelKey: 'courses.status.archived', tone: 'neutral' },
}

export function CourseWorkspaceCard({ course, featured = false }: { course: AuthoringCourse; featured?: boolean }) {
  const t = useT()
  const status = statusMap[course.status]
  return (
    <Link href={`/studio/${course.id}/setup`} className="block h-full">
      <Card hover className={featured ? 'h-full border-primary bg-brand-soft/40 p-4 sm:p-5' : 'h-full p-4 sm:p-5'}>
        <div className="flex h-20 items-center justify-between rounded-input bg-brand-soft px-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-xs font-bold text-primary">UX</span>
          <StatusPill tone={status.tone}>{t(status.labelKey)}</StatusPill>
        </div>
        <h3 className="mt-4 line-clamp-1 text-base font-semibold text-content">{course.title}</h3>
        <p className="mt-1 line-clamp-2 min-h-10 text-xs leading-5 text-content-secondary">{course.description}</p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-content-muted">
          <span className="inline-flex items-center gap-1"><Layers3 size={13} /> {course.lessonCount} {t('courses.card.lessons')}</span>
          <span className="inline-flex items-center gap-1"><Clock size={13} /> {Math.round(course.durationMinutes / 60)}h {course.durationMinutes % 60}m</span>
          <span className="inline-flex items-center gap-1"><Users size={13} /> {course.students}</span>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <Progress value={course.progress} className="h-1.5 flex-1" />
          <span className="text-[11px] font-semibold text-primary">{course.progress}%</span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[11px] text-content-muted">
          {t('courses.card.updated')} {course.updatedAt}
          <span className="inline-flex items-center gap-1 font-semibold text-primary">{t('common.open')} <ArrowRight size={13} /></span>
        </div>
      </Card>
    </Link>
  )
}
