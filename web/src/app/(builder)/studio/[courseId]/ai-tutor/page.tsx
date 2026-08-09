'use client'

import { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useT } from '@/lib/i18n'
import { catalogApi } from '@/lib/api/services'
import { isAiTutorEnabled } from '@/lib/ai/tutor'
import { PageHeader } from '@/components/workspace/PageHeader'
import { AIUnavailable } from '@/components/workspace/AIUnavailable'
import { AiTutorChat } from '@/components/ai/AiTutorChat'
import { Card } from '@/components/ui/card'
import { PageSpinner } from '@/components/ui/spinner'

export default function AITutorPage() {
  const t = useT()
  const { courseId } = useParams<{ courseId: string }>()
  const enabled = isAiTutorEnabled()

  // "new" is a placeholder id until the setup step creates the course.
  const isNew = courseId === 'new'
  const curriculum = useQuery({
    queryKey: ['curriculum', courseId],
    queryFn: () => catalogApi.curriculum(courseId),
    enabled: enabled && !!courseId && !isNew,
  })

  // Only VIDEO lectures can be tutored (the tutor is grounded in transcripts).
  const videoLectures = useMemo(
    () =>
      (curriculum.data?.sections ?? [])
        .flatMap((s) => s.lectures)
        .filter((l) => l.type === 'VIDEO'),
    [curriculum.data],
  )

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const active = videoLectures.find((l) => l.id === selectedId) ?? videoLectures[0] ?? null

  return (
    <div className="space-y-5">
      <PageHeader title={t('aiTutor.title', 'AI Tutor')} description={t('aiTutor.description', 'Ask questions grounded in a lesson video transcript.')} />

      {!enabled ? (
        <AIUnavailable />
      ) : isNew ? (
        <Card className="p-6 text-sm text-content-secondary">
          {t('aiTutor.needsCourse', 'Save your course details first. The tutor answers from lessons that belong to a saved course.')}
        </Card>
      ) : curriculum.isLoading ? (
        <PageSpinner />
      ) : videoLectures.length === 0 ? (
        <Card className="p-6 text-sm text-content-secondary">
          {t('aiTutor.noVideoLectures', 'Add a video lecture to this course to use the AI tutor. Tutoring is grounded in video transcripts.')}
        </Card>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="ai-tutor-lesson" className="text-sm font-medium text-content">
              {t('aiTutor.lessonLabel', 'Lesson')}
            </label>
            <select
              id="ai-tutor-lesson"
              value={active?.id ?? ''}
              onChange={(e) => setSelectedId(e.target.value)}
              className="rounded-input border border-border bg-background px-3 py-2 text-sm text-content"
            >
              {videoLectures.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.title}
                </option>
              ))}
            </select>
          </div>

          {active && (
            <AiTutorChat
              key={active.id}
              courseId={courseId}
              videoId={active.id}
              videoTitle={active.title}
            />
          )}
        </div>
      )}
    </div>
  )
}
