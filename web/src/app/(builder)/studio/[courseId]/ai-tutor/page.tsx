'use client'

import { useParams } from 'next/navigation'
import { useT } from '@/lib/i18n'
import { AiStepScaffold } from '@/components/ai/AiStepScaffold'
import { AiTutorChat } from '@/components/ai/AiTutorChat'

export default function AITutorPage() {
  const t = useT()
  const { courseId } = useParams<{ courseId: string }>()

  return (
    <AiStepScaffold
      courseId={courseId}
      tab="tutor"
      title={t('aiTutor.title')}
      description={t('aiTutor.description')}
    >
      {(lecture) => (
        <AiTutorChat
          key={lecture.id}
          courseId={courseId}
          videoId={lecture.id}
          videoTitle={lecture.title}
        />
      )}
    </AiStepScaffold>
  )
}
