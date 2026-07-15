'use client'

import { useParams } from 'next/navigation'
import { PageHeader } from '@/components/workspace/PageHeader'
import { CourseUploadWorkspace } from '@/components/uploads/CourseUploadWorkspace'

export default function MediaPage() {
  const { courseId } = useParams<{ courseId: string }>()
  return (
    <div className="space-y-6">
      <PageHeader title="Upload & processing" description="Add course files through the signed storage pipeline and track their readiness." />
      <CourseUploadWorkspace courseId={courseId} />
    </div>
  )
}
