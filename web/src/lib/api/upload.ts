import { authoringApi } from '@/lib/api/services'

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
    onPhase?.('SIGNING')
    const signed = await authoringApi.signedUpload({
      fileName: file.name,
      contentType: file.type || 'application/octet-stream',
      size: file.size,
      courseId,
    })
    const uploadUrl = signed.uploadUrl ?? signed.signedUrl
    if (!uploadUrl) throw new Error('The upload service did not return a signed URL.')

    onPhase?.('UPLOADING')
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type || 'application/octet-stream', ...(signed.headers ?? {}) },
      body: file,
    })
    if (!uploadResponse.ok) throw new Error('The file could not be uploaded to storage.')

    onPhase?.('CONFIRMING')
    const confirmed = await authoringApi.confirmUpload({
      uploadId: signed.uploadId,
      objectPath: signed.objectPath,
    })

    if (lectureId && file.type.startsWith('video/')) {
      onPhase?.('PROCESSING')
      await authoringApi.startTranscode(courseId, lectureId)
    } else {
      onPhase?.('READY')
    }

    return confirmed
  } catch (error) {
    onPhase?.('ERROR')
    throw error
  }
}
