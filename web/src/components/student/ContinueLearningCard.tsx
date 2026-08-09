'use client'

import Link from 'next/link'
import { BookOpen, Play } from 'lucide-react'
import type { ContinueLearningItem } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CourseThumbnail } from '@/components/course/CourseThumbnail'
import { useT } from '@/lib/i18n'

/**
 * The wide "Continue Learning" card from the student Home screen: thumbnail,
 * In-Progress badge, title, progress bar with percentage, lesson counter and a
 * round resume button.
 */
export function ContinueLearningCard({ item }: { item: ContinueLearningItem }) {
  const t = useT()
  const percentage = Math.round(item.percentage)
  const done = item.status === 'COMPLETED'

  return (
    <Card hover className="flex flex-col gap-4 overflow-hidden p-3 sm:flex-row sm:items-center sm:p-4">
      <CourseThumbnail
        src={item.course.thumbnail}
        seed={item.course.id}
        label={item.course.title}
        className="h-32 w-full shrink-0 rounded-xl sm:h-24 sm:w-40"
      />

      <div className="min-w-0 flex-1">
        <Badge tone={done ? 'success' : 'primary'}>
          {done ? t('student.completed') : t('student.inProgress')}
        </Badge>
        <h3 className="mt-2 truncate text-base font-bold text-content">{item.course.title}</h3>

        <div className="mt-3 flex items-center gap-3">
          <Progress value={percentage} tone={done ? 'success' : 'primary'} className="h-2 flex-1" />
          <span className="shrink-0 text-sm font-bold text-primary">{percentage}%</span>
        </div>

        <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-content-secondary">
          <BookOpen size={13} />
          {t('student.lessonsProgress')
            .replace('{done}', String(item.completedLessons))
            .replace('{total}', String(item.totalLessons))}
        </p>
      </div>

      <Link
        href={`/learn/${item.course.id}`}
        aria-label={t('student.resume')}
        title={t('student.resume')}
        className="flex h-12 w-12 shrink-0 items-center justify-center self-end rounded-full bg-primary text-white shadow-sm transition-colors hover:bg-primary-600 sm:self-center"
      >
        <Play size={20} fill="currentColor" className="ms-0.5 rtl:me-0.5 rtl:ms-0 rtl:rotate-180" />
      </Link>
    </Card>
  )
}
