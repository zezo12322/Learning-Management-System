'use client'

import { useParams } from 'next/navigation'
import { useT } from '@/lib/i18n'
import { PageHeader } from '@/components/workspace/PageHeader'
import { CourseUploadWorkspace } from '@/components/uploads/CourseUploadWorkspace'

export default function MediaPage() {
  const t = useT()
  const { courseId } = useParams<{ courseId: string }>()
  return (
    <div className="space-y-6">
      <PageHeader title={t('builder.media.title')} description={t('builder.media.subtitle')} />
      <CourseUploadWorkspace courseId={courseId} />
    </div>
  )
}
