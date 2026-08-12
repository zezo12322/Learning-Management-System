import { authoringApi } from '@/lib/api/services'
import type { UploadEntityType, UploadErrorCode } from '@/lib/types'

export type UploadPhase = 'SIGNING' | 'UPLOADING' | 'CONFIRMING' | 'PROCESSING' | 'READY' | 'ERROR'

export interface UploadProgress {
  loaded: number
  total: number
}

/** The backend's own THUMBNAIL/VIDEO ceiling, stated once. */
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024 * 1024

/**
 * A failed upload, as a code rather than an English sentence.
 *
 * This module used to throw three hard-coded English strings straight into the
 * UI, so the two locales showed the same English text and one shared message had
 * to describe every file in the queue.
 */
export class UploadError extends Error {
  constructor(public code: UploadErrorCode) {
    super(code)
    this.name = 'UploadError'
  }
}

/** Code → dictionary key, so the message is translated at render time. */
export const UPLOAD_ERROR_KEYS: Record<UploadErrorCode, string> = {
  UNSUPPORTED_TYPE: 'uploads.error.unsupportedType',
  NO_LECTURE: 'uploads.error.selectLectureFirst',
  STORAGE_REJECTED: 'uploads.error.storageRejected',
  NETWORK: 'uploads.error.network',
  TOO_LARGE: 'uploads.error.tooLarge',
  CANCELLED: 'uploads.cancelled',
}

/**
 * Narrow any thrown value to a code. Anything that is not one of ours came from
 * the signing/confirm round trip, which is a rejected request from the caller's
 * point of view.
 */
export function uploadErrorCodeOf(error: unknown): UploadErrorCode {
  if (error instanceof UploadError) return error.code
  return 'STORAGE_REJECTED'
}

function entityTypeFor(file: File): UploadEntityType {
  if (file.type.startsWith('video/')) return 'LECTURE_VIDEO'
  if (file.type.startsWith('image/')) return 'COURSE_THUMBNAIL'
  if (file.type === 'application/pdf') return 'LECTURE_TRANSCRIPT'
  throw new UploadError('UNSUPPORTED_TYPE')
}

/**
 * PUT the bytes with XMLHttpRequest.
 *
 * `fetch` exposes no upload events, which is why progress was faked at a fixed
 * 8/52/78/100 and a 3 GB video sat at exactly 52% with no way to cancel. XHR
 * gives real `upload.onprogress` bytes and a working abort.
 */
function putWithProgress({
  url,
  file,
  signal,
  onProgress,
}: {
  url: string
  file: File
  signal?: AbortSignal
  onProgress?: (progress: UploadProgress) => void
}): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new UploadError('CANCELLED'))
      return
    }

    const xhr = new XMLHttpRequest()
    const abort = () => xhr.abort()

    xhr.open('PUT', url, true)
    xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream')
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress?.({ loaded: event.loaded, total: event.total })
    }
    xhr.onload = () => {
      signal?.removeEventListener('abort', abort)
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress?.({ loaded: file.size, total: file.size })
        resolve()
      } else {
        reject(new UploadError('STORAGE_REJECTED'))
      }
    }
    xhr.onerror = () => {
      signal?.removeEventListener('abort', abort)
      reject(new UploadError('NETWORK'))
    }
    xhr.ontimeout = () => {
      signal?.removeEventListener('abort', abort)
      reject(new UploadError('NETWORK'))
    }
    xhr.onabort = () => {
      signal?.removeEventListener('abort', abort)
      reject(new UploadError('CANCELLED'))
    }

    signal?.addEventListener('abort', abort, { once: true })
    xhr.send(file)
  })
}

export async function uploadCourseAsset({
  courseId,
  lectureId,
  file,
  signal,
  onPhase,
  onProgress,
}: {
  courseId: string
  lectureId?: string
  file: File
  signal?: AbortSignal
  onPhase?: (phase: UploadPhase) => void
  onProgress?: (progress: UploadProgress) => void
}) {
  try {
    if (file.size > MAX_UPLOAD_BYTES) throw new UploadError('TOO_LARGE')

    const entityType = entityTypeFor(file)
    if (entityType !== 'COURSE_THUMBNAIL' && !lectureId) {
      throw new UploadError('NO_LECTURE')
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
    await putWithProgress({ url: signed.uploadUrl, file, signal, onProgress })

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
