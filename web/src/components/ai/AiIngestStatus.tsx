'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AlertCircle, CheckCircle2, Loader2, RefreshCw } from 'lucide-react'
import { getAiIngestStatus, retryAiIngest, TutorError } from '@/lib/ai/tutor'
import { Button } from '@/components/ui/button'

// A lecture is only answerable once the AI service has transcribed and indexed
// it. Without this, a not-yet-indexed lecture just produces a generic failure
// from the chat call — the backend collapses every AI-service error into one
// 500, so the status endpoint is the only way to tell "still processing" from
// "actually broken".

/** Statuses the AI service is known to report. Anything unrecognised is shown
 *  verbatim rather than mapped, so a new upstream status is not silently
 *  rendered as an error. */
const READY = new Set(['COMPLETED', 'COMPLETE', 'SUCCEEDED', 'SUCCESS', 'READY', 'INDEXED'])
const FAILED = new Set(['FAILED', 'FAILURE', 'ERROR', 'CANCELLED', 'CANCELED'])
const WORKING = new Set(['PENDING', 'QUEUED', 'RUNNING', 'PROCESSING', 'IN_PROGRESS', 'STARTED'])

export function AiIngestStatus({
  lectureId,
  canRetry,
}: {
  lectureId: string
  canRetry: boolean
}) {
  const queryClient = useQueryClient()
  const queryKey = ['ai-ingest-status', lectureId]

  const status = useQuery({
    queryKey,
    queryFn: () => getAiIngestStatus(lectureId),
    enabled: !!lectureId,
    // Poll while the job is still moving; stop once it settles.
    refetchInterval: (query) => {
      const s = query.state.data?.status
      return s && WORKING.has(s) ? 10_000 : false
    },
  })

  const retry = useMutation({
    mutationFn: () => retryAiIngest(lectureId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  })

  if (status.isPending) {
    return (
      <p className="flex items-center gap-1.5 text-xs text-content-muted">
        <Loader2 size={13} className="animate-spin" />
        Checking indexing status…
      </p>
    )
  }

  if (status.isError) {
    const err = status.error as TutorError
    return (
      <p className="flex items-center gap-1.5 text-xs text-content-muted">
        <AlertCircle size={13} />
        Could not read indexing status ({err.code}).
      </p>
    )
  }

  const value = status.data?.status ?? 'UNKNOWN'
  const isReady = READY.has(value)
  const isFailed = FAILED.has(value)
  const isWorking = WORKING.has(value)

  return (
    <div className="flex flex-wrap items-center gap-2">
      {isReady ? (
        <p className="flex items-center gap-1.5 text-xs text-success">
          <CheckCircle2 size={13} />
          Indexed — the tutor can answer from this lesson.
        </p>
      ) : isWorking ? (
        <p className="flex items-center gap-1.5 text-xs text-content-secondary">
          <Loader2 size={13} className="animate-spin" />
          Still indexing ({value.toLowerCase()}). Answers will be ungrounded until it finishes.
        </p>
      ) : isFailed ? (
        <p className="flex items-center gap-1.5 text-xs text-error">
          <AlertCircle size={13} />
          Indexing {value.toLowerCase()} — re-run it to enable grounded answers.
        </p>
      ) : value === 'UNKNOWN' ? (
        <p className="flex items-center gap-1.5 text-xs text-content-muted">
          <AlertCircle size={13} />
          Not indexed yet. The tutor has no transcript to ground answers in.
        </p>
      ) : (
        <p className="flex items-center gap-1.5 text-xs text-content-secondary">
          <AlertCircle size={13} />
          Indexing status: {value}
        </p>
      )}

      {canRetry && !isReady && !isWorking && (
        <Button
          size="sm"
          variant="outline"
          loading={retry.isPending}
          onClick={() => retry.mutate()}
        >
          <RefreshCw size={13} className="mr-1.5" />
          Re-run indexing
        </Button>
      )}

      {retry.isError && (
        <span className="text-xs text-error">
          {(retry.error as TutorError).message}
        </span>
      )}
      {retry.isSuccess && !isWorking && (
        <span className="text-xs text-content-secondary">Re-indexing queued.</span>
      )}
    </div>
  )
}
