'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowRight, CheckCircle2, Lock, PlayCircle, FileText } from 'lucide-react'
import { catalogApi, enrollmentApi, progressApi } from '@/lib/api/services'
import { useT } from '@/lib/i18n'
import type { Lecture } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { PageSpinner } from '@/components/ui/spinner'
import { formatDuration, cn } from '@/lib/utils'

export default function LearnPage() {
  const t = useT()
  const { courseId } = useParams<{ courseId: string }>()
  const qc = useQueryClient()
  const [activeId, setActiveId] = useState<string | null>(null)

  const curriculum = useQuery({
    queryKey: ['curriculum', courseId],
    queryFn: () => catalogApi.curriculum(courseId),
  })
  const enrollment = useQuery({
    queryKey: ['enrollment', courseId],
    queryFn: () => enrollmentApi.get(courseId),
  })
  const progress = useQuery({
    queryKey: ['course-progress', courseId],
    queryFn: () => progressApi.course(courseId),
  })

  const lectures = useMemo(
    () => curriculum.data?.sections.flatMap((s) => s.lectures) ?? [],
    [curriculum.data]
  )
  const isEnrolled =
    enrollment.data?.status === 'ACTIVE' || enrollment.data?.status === 'COMPLETED'

  useEffect(() => {
    if (!activeId && lectures.length) setActiveId(lectures[0].id)
  }, [lectures, activeId])

  const active = lectures.find((l) => l.id === activeId) ?? null

  const complete = useMutation({
    mutationFn: (lectureId: string) => progressApi.markComplete(lectureId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['course-progress', courseId] })
      qc.invalidateQueries({ queryKey: ['continue-learning'] })
    },
  })

  if (curriculum.isLoading || enrollment.isLoading) return <PageSpinner />

  if (!isEnrolled) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <Lock size={40} className="text-content-secondary" />
        <p className="text-content-secondary">{t('learn.mustEnroll')}</p>
        <Link href={`/courses/${courseId}`}>
          <Button>{t('learn.goToCourse')}</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link
          href={`/courses/${courseId}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-content-secondary hover:bg-surface"
        >
          <ArrowRight size={18} />
        </Link>
        <h1 className="truncate text-title-sm font-bold text-content">{curriculum.data?.title}</h1>
      </div>

      {progress.data && (
        <Card className="p-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-content">{t('learn.yourProgress')}</span>
            <span className="font-bold text-primary">{progress.data.overallPercentage}%</span>
          </div>
          <Progress value={progress.data.overallPercentage} />
          <p className="mt-2 text-xs text-content-secondary">
            {progress.data.completedLectures} {t('learn.of')} {progress.data.totalLectures} {t('learn.lessonsComplete')}
          </p>
        </Card>
      )}

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        {/* Player area */}
        <div className="space-y-4">
          <Card className="flex aspect-video items-center justify-center bg-content/90 text-white">
            <div className="text-center">
              <PlayCircle size={56} className="mx-auto mb-2 opacity-80" />
              <p className="text-sm opacity-80">{active?.title ?? t('learn.selectLesson')}</p>
              <p className="mt-1 text-xs opacity-50">{t('learn.playerComingSoon')}</p>
            </div>
          </Card>

          {active && (
            <Card className="p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-content">{active.title}</h2>
                  <p className="text-xs text-content-secondary">
                    {formatDuration(Math.round((active.duration ?? 0) / 60))}
                  </p>
                </div>
                <Button
                  size="sm"
                  loading={complete.isPending}
                  onClick={() => complete.mutate(active.id)}
                >
                  <CheckCircle2 size={16} /> {t('learn.completeLesson')}
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Lesson list */}
        <Card className="divide-y divide-border">
          {curriculum.data?.sections.map((section) => (
            <div key={section.id} className="p-3">
              <p className="mb-1 px-1 text-sm font-semibold text-content">{section.title}</p>
              {section.lectures.map((lecture) => (
                <LessonRow
                  key={lecture.id}
                  lecture={lecture}
                  active={lecture.id === activeId}
                  onClick={() => setActiveId(lecture.id)}
                />
              ))}
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}

function LessonRow({
  lecture,
  active,
  onClick,
}: {
  lecture: Lecture
  active: boolean
  onClick: () => void
}) {
  const t = useT()
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2 rounded-lg px-2 py-2 text-start text-sm',
        active ? 'bg-primary/10 text-primary' : 'text-content hover:bg-background'
      )}
    >
      {lecture.type === 'VIDEO' ? <PlayCircle size={16} /> : <FileText size={16} />}
      <span className="flex-1 truncate">{lecture.title}</span>
      {lecture.isFreePreview && <Badge tone="info">{t('common.preview')}</Badge>}
      <span className="text-xs text-content-secondary">
        {formatDuration(Math.round((lecture.duration ?? 0) / 60))}
      </span>
    </button>
  )
}
