'use client'

import { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useT } from '@/lib/i18n'
import { catalogApi } from '@/lib/api/services'
import { isAiTutorEnabled } from '@/lib/ai/tutor'
import { PageHeader } from '@/components/workspace/PageHeader'
import { AIUnavailable } from '@/components/workspace/AIUnavailable'
import { AiCourseStudio } from '@/components/ai/AiCourseStudio'
import { Card } from '@/components/ui/card'
import { PageSpinner } from '@/components/ui/spinner'

export default function AIStudioPage() {
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

  // Generation is grounded in a video transcript, so only VIDEO lectures apply.
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
      <PageHeader title={t('aiStudio.title', 'AI Course Studio')} description={t('aiStudio.description', 'Generate learning assets from a lesson video.')} />

      {!enabled ? (
        <AIUnavailable />
      ) : isNew ? (
        <Card className="p-6 text-sm text-content-secondary">
          {t('aiStudio.needsCourse', 'Save your course details first. AI assets are generated from lessons that belong to a saved course.')}
        </Card>
      ) : curriculum.isLoading ? (
        <PageSpinner />
      ) : videoLectures.length === 0 ? (
        <Card className="p-6 text-sm text-content-secondary">
          {t('aiStudio.noVideoLectures', 'Add a video lecture to this course to generate learning assets. Generation is grounded in the video transcript.')}
        </Card>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="ai-studio-source-video" className="text-sm font-medium text-content">
              {t('aiStudio.sourceVideoLabel', 'Source video')}
            </label>
            <select
              id="ai-studio-source-video"
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
            <AiCourseStudio
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
