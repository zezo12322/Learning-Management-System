'use client'

import Link from 'next/link'
import { ArrowRight, Clock, Layers3, Users } from 'lucide-react'
import type { AuthoringCourse } from '@/lib/types'
import { useT } from '@/lib/i18n'
import { formatMinutesLocalized, lessonCountLabel } from '@/lib/i18n/format'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { StatusPill, courseStatusOf } from '@/components/workspace/StatusPill'

/**
 * `featured` is gone: it highlighted whichever course happened to sit second in
 * an unsorted list, which told an instructor nothing. No caller passes it.
 */
export function CourseWorkspaceCard({ course }: { course: AuthoringCourse }) {
  const t = useT()
  const status = courseStatusOf(course.status)
  // Was the literal string "UX" on every course tile — untranslated, and wrong
  // for every course that is not about UX. Initials of the real title instead,
  // matching /dashboard and the studio preview header.
  const initials = course.title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('')
  return (
    <Link href={`/studio/${course.id}/setup`} className="block h-full">
      <Card hover className="h-full p-4 sm:p-5">
        <div className="flex h-20 items-center justify-between rounded-input bg-brand-soft px-4">
          {/* Decorative: the title is stated in full by the <h3> below. */}
          <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-xs font-bold text-primary">{initials}</span>
          <StatusPill tone={status.tone}>{t(status.labelKey)}</StatusPill>
        </div>
        <h3 className="mt-4 line-clamp-1 text-base font-semibold text-content">{course.title}</h3>
        <p className="mt-1 line-clamp-2 min-h-10 text-xs leading-5 text-content-secondary">{course.description}</p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-content-muted">
          <span className="inline-flex items-center gap-1"><Layers3 size={13} /> {lessonCountLabel(course.lessonCount, t)}</span>
          {/* Was `Math.round(m/60)h Xm` — bare English letters, and it rounded
              90 minutes up to "2h 30m". Same helper as every other duration. */}
          <span className="inline-flex items-center gap-1"><Clock size={13} /> {formatMinutesLocalized(course.durationMinutes, t)}</span>
          <span className="inline-flex items-center gap-1"><Users size={13} /> {course.students}</span>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <Progress value={course.progress} label={t('common.progressLabel')} className="h-1.5 flex-1" />
          <span className="text-[11px] font-semibold text-primary">{course.progress}%</span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[11px] text-content-muted">
          {t('courses.card.updated')} {course.updatedAt}
          <span className="inline-flex items-center gap-1 font-semibold text-primary">{t('common.open')} <ArrowRight size={13} className="rtl:rotate-180" aria-hidden /></span>
        </div>
      </Card>
    </Link>
  )
}
