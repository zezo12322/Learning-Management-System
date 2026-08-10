'use client'

import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { authoringApi } from '@/lib/api/services'

/**
 * Watch server-side transcoding until it finishes.
 *
 * `authoringApi.transcodeStatus` has been implemented in services.ts all along
 * with zero callers anywhere in the app, which is why PROCESSING was terminal in
 * the UI: a video sat at "Transcoding" forever until the instructor guessed to
 * reload the page.
 *
 * Polling starts at 5s and backs off to 30s, and stops entirely when no lecture
 * is processing.
 */

const FIRST_DELAY = 5000
const MAX_DELAY = 30000

/** The status payload is untyped at the client boundary, so read it tolerantly. */
function statusOf(payload: unknown): string {
  if (!payload || typeof payload !== 'object') return ''
  const raw = payload as Record<string, unknown>
  const nested = raw.transcode as Record<string, unknown> | undefined
  const value = raw.status ?? raw.state ?? nested?.status ?? nested?.state
  return typeof value === 'string' ? value.toUpperCase() : ''
}

function isReady(payload: unknown): boolean {
  const status = statusOf(payload)
  return status === 'READY' || status === 'COMPLETE' || status === 'COMPLETED' || status === 'SUCCEEDED'
}

export function useTranscodePolling(courseId: string, lectureIds: string[]) {
  const queryClient = useQueryClient()
  const [readyLectureIds, setReadyLectureIds] = useState<string[]>([])
  // A stable dependency: the array identity changes on every render, the ids do not.
  const key = lectureIds.join(',')

  useEffect(() => {
    const ids = key ? key.split(',') : []
    if (!courseId || ids.length === 0) return

    let cancelled = false
    let delay = FIRST_DELAY
    let timer: number | undefined

    const tick = async () => {
      const finished: string[] = []
      for (const lectureId of ids) {
        try {
          const payload = await authoringApi.transcodeStatus(courseId, lectureId)
          if (isReady(payload)) finished.push(lectureId)
        } catch {
          // A single failed poll is not a failed transcode; keep waiting.
        }
      }
      if (cancelled) return
      if (finished.length) {
        setReadyLectureIds((current) => Array.from(new Set([...current, ...finished])))
        await queryClient.invalidateQueries({ queryKey: ['authoring-course', courseId] })
        if (cancelled) return
      }
      delay = Math.min(Math.round(delay * 1.5), MAX_DELAY)
      timer = window.setTimeout(() => void tick(), delay)
    }

    timer = window.setTimeout(() => void tick(), delay)
    return () => {
      cancelled = true
      if (timer) window.clearTimeout(timer)
    }
  }, [courseId, key, queryClient])

  return { readyLectureIds }
}
