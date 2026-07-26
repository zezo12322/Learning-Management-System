import { authoringApi } from '@/lib/api/services'
import type { UploadEntityType } from '@/lib/types'

export type UploadPhase = 'SIGNING' | 'UPLOADING' | 'CONFIRMING' | 'PROCESSING' | 'READY' | 'ERROR'

export async function uploadCourseAsset({
  courseId,
  lectureId,
  file,
  onPhase,
}: {
  courseId: string
  lectureId?: string
  file: File
  onPhase?: (phase: UploadPhase) => void
}) {
  try {
    const entityType: UploadEntityType = file.type.startsWith('video/')
      ? 'LECTURE_VIDEO'
      : file.type.startsWith('image/')
        ? 'COURSE_THUMBNAIL'
        : file.type === 'application/pdf'
          ? 'LECTURE_TRANSCRIPT'
          : (() => {
              throw new Error('The backend currently accepts images, videos, and PDF transcripts only.')
            })()

    if (entityType !== 'COURSE_THUMBNAIL' && !lectureId) {
      throw new Error('Choose a lecture before uploading video or transcript media.')
    }

    onPhase?.('SIGNING')
    const signed = await authoringApi.signedUpload({
      entityType,
      filename: file.name,
      contentType: file.type || 'application/octet-stream',
      courseId,
      lectureId,
    })

    onPhase?.('UPLOADING')
    const uploadResponse = await fetch(signed.uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type || 'application/octet-stream' },
      body: file,
    })
    if (!uploadResponse.ok) throw new Error('The file could not be uploaded to storage.')

    onPhase?.('CONFIRMING')
    const confirmed = await authoringApi.confirmUpload({
      entityType,
      courseId,
      lectureId,
      storagePath: signed.storagePath,
    })

    if (entityType === 'LECTURE_VIDEO') {
      onPhase?.('PROCESSING')
      if (confirmed.transcode?.status === 'enqueue_failed' && lectureId) {
        await authoringApi.startTranscode(courseId, lectureId, signed.storagePath)
      }
    } else {
      onPhase?.('READY')
    }

    return confirmed
  } catch (error) {
    onPhase?.('ERROR')
    throw error
  }
}
