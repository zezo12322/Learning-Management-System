'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { MAX_UPLOAD_BYTES, uploadCourseAsset, uploadErrorCodeOf } from '@/lib/api/upload'
import { useT } from '@/lib/i18n'
import type { UploadAsset } from '@/lib/types'

/**
 * The upload queue.
 *
 * What it replaces: progress fabricated at a fixed 8/52/78/100 (so a 3 GB video
 * sat at exactly 52% with no way to cancel), unbounded concurrency (eight
 * simultaneous multi-gigabyte PUTs), ids built from `Date.now()` (which collide
 * when a whole folder is dropped at once) and one shared error string describing
 * every file in the list.
 *
 * A video stays PROCESSING when its bytes are in: transcoding happens on the
 * server, and useTranscodePolling is what resolves it to READY.
 */

export interface UploadQueue {
  assets: UploadAsset[]
  enqueue: (files: File[], lectureId?: string) => void
  retry: (id: string) => void
  cancel: (id: string) => void
  remove: (id: string) => void
}

function newId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `asset-${Math.random().toString(36).slice(2)}-${Date.now()}`
}

export function useUploadQueue({
  courseId,
  concurrency = 2,
  onUploaded,
}: {
  courseId: string
  concurrency?: number
  /**
   * Runs once a file's bytes are stored. The media step uses it to mark the
   * lecture as a VIDEO lesson, which needs the section id it alone knows.
   */
  onUploaded?: (info: { id: string; file: File; lectureId?: string }) => void | Promise<void>
}): UploadQueue {
  const t = useT()
  const queryClient = useQueryClient()
  const [assets, setAssets] = useState<UploadAsset[]>([])
  const filesRef = useRef(new Map<string, File>())
  const lecturesRef = useRef(new Map<string, string>())
  const controllersRef = useRef(new Map<string, AbortController>())
  const queueRef = useRef<string[]>([])
  const activeRef = useRef(0)
  const startRef = useRef<(id: string) => Promise<void>>()

  // Latest values, read inside the stable callbacks below.
  const latest = useRef({ courseId, onUploaded, t, queryClient })
  latest.current = { courseId, onUploaded, t, queryClient }

  const update = useCallback((id: string, patch: Partial<UploadAsset>) => {
    setAssets((current) => current.map((asset) => (asset.id === id ? { ...asset, ...patch } : asset)))
  }, [])

  const pump = useCallback(() => {
    while (activeRef.current < concurrency && queueRef.current.length > 0) {
      const id = queueRef.current.shift()
      if (!id) break
      activeRef.current += 1
      void startRef.current?.(id)
    }
  }, [concurrency])

  const start = useCallback(
    async (id: string) => {
      const file = filesRef.current.get(id)
      if (!file) {
        activeRef.current -= 1
        pump()
        return
      }
      const lectureId = lecturesRef.current.get(id)
      const controller = new AbortController()
      controllersRef.current.set(id, controller)
      update(id, {
        state: 'UPLOADING',
        progress: 0,
        transferredBytes: 0,
        totalBytes: file.size,
        errorCode: undefined,
      })

      try {
        await uploadCourseAsset({
          courseId: latest.current.courseId,
          lectureId,
          file,
          signal: controller.signal,
          onPhase: (phase) => {
            if (phase === 'PROCESSING') update(id, { state: 'PROCESSING', progress: 100 })
          },
          onProgress: ({ loaded, total }) =>
            update(id, {
              progress: total ? Math.round((loaded / total) * 100) : 0,
              transferredBytes: loaded,
              totalBytes: total,
            }),
        })

        if (!file.type.startsWith('video/')) update(id, { state: 'READY', progress: 100 })
        await latest.current.onUploaded?.({ id, file, lectureId })
        await latest.current.queryClient.invalidateQueries({
          queryKey: ['authoring-course', latest.current.courseId],
        })
      } catch (error) {
        // A per-file code, not one shared sentence — translated at render time.
        update(id, { state: 'ERROR', errorCode: uploadErrorCodeOf(error) })
      } finally {
        controllersRef.current.delete(id)
        activeRef.current -= 1
        pump()
      }
    },
    [pump, update]
  )
  startRef.current = start

  const sizeLabel = useCallback(
    (file: File) =>
      `${Math.max(1, Math.round(file.size / 1024 / 1024))} MB · ${file.type || latest.current.t('uploads.fileFallback')}`,
    []
  )

  const enqueue = useCallback(
    (files: File[], lectureId?: string) => {
      const created: UploadAsset[] = []
      files.forEach((file) => {
        const id = newId()
        filesRef.current.set(id, file)
        // An image is the course cover, so it is never attached to a lesson.
        const attachTo = file.type.startsWith('image/') ? undefined : lectureId
        if (attachTo) lecturesRef.current.set(id, attachTo)
        const tooLarge = file.size > MAX_UPLOAD_BYTES
        created.push({
          id,
          name: file.name,
          sizeLabel: sizeLabel(file),
          state: tooLarge ? 'ERROR' : 'QUEUED',
          progress: 0,
          mimeType: file.type || 'application/octet-stream',
          lectureId: attachTo,
          transferredBytes: 0,
          totalBytes: file.size,
          errorCode: tooLarge ? 'TOO_LARGE' : undefined,
        })
        if (!tooLarge) queueRef.current.push(id)
      })
      if (!created.length) return
      setAssets((current) => [...created.reverse(), ...current])
      pump()
    },
    [pump, sizeLabel]
  )

  const retry = useCallback(
    (id: string) => {
      if (!filesRef.current.has(id)) return
      update(id, { state: 'QUEUED', progress: 0, transferredBytes: 0, errorCode: undefined })
      queueRef.current.push(id)
      pump()
    },
    [pump, update]
  )

  const cancel = useCallback(
    (id: string) => {
      queueRef.current = queueRef.current.filter((queued) => queued !== id)
      controllersRef.current.get(id)?.abort()
      update(id, { state: 'ERROR', errorCode: 'CANCELLED' })
    },
    [update]
  )

  const remove = useCallback((id: string) => {
    queueRef.current = queueRef.current.filter((queued) => queued !== id)
    controllersRef.current.get(id)?.abort()
    controllersRef.current.delete(id)
    filesRef.current.delete(id)
    lecturesRef.current.delete(id)
    setAssets((current) => current.filter((asset) => asset.id !== id))
  }, [])

  // A different course is a different queue: anything still in flight belongs to
  // the course being left, so it is aborted rather than silently re-targeted.
  useEffect(() => {
    // The maps are created once and never replaced, so holding them here is safe
    // (and is what the ref-in-cleanup lint rule asks for).
    const controllers = controllersRef.current
    const files = filesRef.current
    const lecturesById = lecturesRef.current
    return () => {
      controllers.forEach((controller) => controller.abort())
      controllers.clear()
      files.clear()
      lecturesById.clear()
      queueRef.current = []
      activeRef.current = 0
      setAssets([])
    }
  }, [courseId])

  return { assets, enqueue, retry, cancel, remove }
}
