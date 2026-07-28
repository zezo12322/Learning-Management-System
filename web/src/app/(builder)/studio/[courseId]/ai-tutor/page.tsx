'use client'

import { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useT } from '@/lib/i18n'
import { catalogApi } from '@/lib/api/services'
import { useAuth } from '@/lib/auth/AuthProvider'
import { isAiTutorEnabled } from '@/lib/ai/tutor'
import { PageHeader } from '@/components/workspace/PageHeader'
import { AIUnavailable } from '@/components/workspace/AIUnavailable'
import { AiTutorChat } from '@/components/ai/AiTutorChat'
import { AiIngestStatus } from '@/components/ai/AiIngestStatus'
import { Card } from '@/components/ui/card'
import { PageSpinner } from '@/components/ui/spinner'

export default function AITutorPage() {
  const t = useT()
  const { courseId } = useParams<{ courseId: string }>()
  const { roles } = useAuth()
  const enabled = isAiTutorEnabled()
  // Re-running ingestion is admin / owning-instructor only on the backend, so
  // don't offer a button that would just 403.
  const canRetryIngest = roles.includes('admin') || roles.includes('instructor')

  const curriculum = useQuery({
    queryKey: ['curriculum', courseId],
    queryFn: () => catalogApi.curriculum(courseId),
    enabled: enabled && !!courseId,
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
      <PageHeader title={t('aiTutor.title')} description={t('aiTutor.description')} />

      {!enabled ? (
        <AIUnavailable />
      ) : curriculum.isLoading ? (
        <PageSpinner />
      ) : videoLectures.length === 0 ? (
        <Card className="p-6 text-sm text-content-secondary">
          Add a video lecture to this course to use the AI tutor. Tutoring is grounded in video
          transcripts.
        </Card>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-sm font-medium text-content">Lesson:</label>
            <select
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
            <>
              <AiIngestStatus key={`status-${active.id}`} lectureId={active.id} canRetry={canRetryIngest} />
              <AiTutorChat key={active.id} lectureId={active.id} lectureTitle={active.title} />
            </>
          )}
        </div>
      )}
    </div>
  )
}
