'use client'

import { useParams } from 'next/navigation'
import { useT } from '@/lib/i18n'
import { AiCourseStudio } from '@/components/ai/AiCourseStudio'
import { AiStepScaffold } from '@/components/ai/AiStepScaffold'

export default function AIStudioPage() {
  const t = useT()
  const { courseId } = useParams<{ courseId: string }>()

  return (
    <AiStepScaffold
      courseId={courseId}
      tab="studio"
      title={t('aiStudio.title')}
      description={t('aiStudio.description')}
    >
      {(lecture) => (
        <AiCourseStudio
          key={lecture.id}
          courseId={courseId}
          videoId={lecture.id}
          videoTitle={lecture.title}
        />
      )}
    </AiStepScaffold>
  )
}
