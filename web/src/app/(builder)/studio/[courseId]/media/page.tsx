'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useT } from '@/lib/i18n'
import { PageHeader } from '@/components/workspace/PageHeader'
import { CourseUploadWorkspace } from '@/components/uploads/CourseUploadWorkspace'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function MediaPage() {
  const t = useT()
  const { courseId } = useParams<{ courseId: string }>()
  // "new" is a placeholder id until the setup step creates the course; signed
  // uploads are authorised against a real course, so there is nothing to show.
  const isNew = courseId === 'new'

  return (
    <div className="space-y-6">
      <PageHeader title={t('builder.media.title')} description={t('builder.media.subtitle')} />
      {isNew ? (
        <Card className="p-6">
          <h2 className="text-base font-semibold text-content">{t('builder.media.needsCourseTitle', 'Save your course details first')}</h2>
          <p className="mt-2 max-w-lg text-xs leading-5 text-content-secondary">
            {t('builder.media.needsCourseBody', 'Uploads are attached to a saved course. Complete the setup step and save it, then upload your media here.')}
          </p>
          <Link href="/studio/new/setup" className="mt-5 inline-block">
            <Button>{t('builder.media.goToSetup', 'Go to course setup')}</Button>
          </Link>
        </Card>
      ) : (
        <CourseUploadWorkspace courseId={courseId} />
      )}
    </div>
  )
}
