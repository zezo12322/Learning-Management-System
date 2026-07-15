'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FileCheck2, Loader2, LockKeyhole, RefreshCw, UploadCloud } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthProvider'
import type { UploadAsset, UploadAssetState } from '@/lib/types'
import { uploadCourseAsset, type UploadPhase } from '@/lib/api/upload'
import { authoringApi } from '@/lib/api/services'
import { UploadFileRow } from '@/components/builder/UploadFileRow'
import { StatusPill } from '@/components/workspace/StatusPill'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

function phaseToState(phase: UploadPhase): { state: UploadAssetState; progress: number } {
  if (phase === 'SIGNING') return { state: 'QUEUED', progress: 8 }
  if (phase === 'UPLOADING') return { state: 'UPLOADING', progress: 52 }
  if (phase === 'CONFIRMING' || phase === 'PROCESSING') return { state: 'PROCESSING', progress: 78 }
  if (phase === 'READY') return { state: 'READY', progress: 100 }
  return { state: 'ERROR', progress: 36 }
}

export function CourseUploadWorkspace({ courseId }: { courseId: string }) {
  const { isDemoMode } = useAuth()
  const inputRef = useRef<HTMLInputElement>(null)
  const filesRef = useRef(new Map<string, File>())
  const [sessionAssets, setSessionAssets] = useState<UploadAsset[]>([])
  const [lectureId, setLectureId] = useState('')
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const course = useQuery({
    queryKey: ['authoring-course', courseId],
    queryFn: () => authoringApi.get(courseId),
    enabled: !isDemoMode && Boolean(courseId),
  })
  const lectures = useMemo(() => course.data?.sections?.flatMap((section) => section.lectures) ?? [], [course.data])
  const storedAssets = useMemo<UploadAsset[]>(() => lectures.flatMap((lecture) => {
    const result: UploadAsset[] = []
    if (lecture.videoUrl) result.push({
      id: `stored-video-${lecture.id}`,
      name: `${lecture.title} — video`,
      sizeLabel: 'Stored media · Video',
      state: 'READY',
      progress: 100,
      mimeType: 'video/*',
      lectureId: lecture.id,
    })
    if (lecture.transcriptUrl) result.push({
      id: `stored-transcript-${lecture.id}`,
      name: `${lecture.title} — transcript`,
      sizeLabel: 'Stored media · Transcript',
      state: 'READY',
      progress: 100,
      mimeType: 'application/pdf',
      lectureId: lecture.id,
    })
    return result
  }), [lectures])
  const assets = useMemo(() => [...sessionAssets, ...storedAssets], [sessionAssets, storedAssets])

  useEffect(() => {
    setLectureId('')
    setSessionAssets([])
    setError(null)
  }, [courseId])

  useEffect(() => {
    if (!lectureId && lectures[0]) setLectureId(lectures[0].id)
  }, [lectureId, lectures])

  const updateAsset = (id: string, patch: Partial<UploadAsset>) =>
    setSessionAssets((current) => current.map((asset) => asset.id === id ? { ...asset, ...patch } : asset))

  const processFile = async (file: File, existingId?: string) => {
    if (isDemoMode) {
      setError('Firebase Web authentication is required before files can be uploaded.')
      return
    }
    setError(null)
    if (file.size > 4 * 1024 * 1024 * 1024) {
      setError('Files must be 4 GB or smaller.')
      return
    }
    const id = existingId ?? `asset-${Date.now()}-${file.name}`
    filesRef.current.set(id, file)
    const pending: UploadAsset = {
      id,
      name: file.name,
      sizeLabel: `${Math.max(1, Math.round(file.size / 1024 / 1024))} MB · ${file.type || 'file'}`,
      state: 'QUEUED',
      progress: 5,
      mimeType: file.type || 'application/octet-stream',
      lectureId: file.type.startsWith('image/') ? undefined : (lectureId || undefined),
    }
    setSessionAssets((current) => existingId
      ? current.map((asset) => asset.id === id ? pending : asset)
      : [pending, ...current])

    try {
      await uploadCourseAsset({
        courseId,
        lectureId: pending.lectureId,
        file,
        onPhase: (phase) => updateAsset(id, phaseToState(phase)),
      })
    } catch (uploadError) {
      updateAsset(id, { state: 'ERROR', progress: 36 })
      setError(uploadError instanceof Error ? uploadError.message : 'The upload failed.')
    }
  }

  const pickFiles = (files: FileList | null) => {
    if (!files || isDemoMode) return
    Array.from(files).forEach((file) => void processFile(file))
  }
  const counts = (state: UploadAssetState) => assets.filter((asset) => asset.state === state).length

  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 xl:grid-cols-[minmax(0,1fr)_302px]">
      <Card className="p-4 sm:p-5">
        {isDemoMode && (
          <div className="mb-4 flex items-start gap-3 rounded-input bg-warning/10 p-4 text-sm text-warning">
            <LockKeyhole size={18} className="mt-0.5 shrink-0" />
            <div><p className="font-semibold">Upload requires an authenticated instructor</p><p className="mt-1 text-xs leading-5 text-content-secondary">The real signed-upload endpoints are connected, but Firebase Web authentication is not configured in this local environment.</p></div>
          </div>
        )}
        {course.isError && <div className="mb-4 rounded-input bg-error/10 p-3 text-xs text-error">The selected instructor course could not be loaded.</div>}
        <div
          onDragOver={(event) => { event.preventDefault(); if (!isDemoMode) setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => { event.preventDefault(); setDragging(false); pickFiles(event.dataTransfer.files) }}
          className={dragging ? 'flex min-h-48 flex-col items-center justify-center rounded-card border border-dashed border-primary bg-primary-100 p-6 text-center' : 'flex min-h-48 flex-col items-center justify-center rounded-card border border-dashed border-primary bg-brand-soft p-6 text-center'}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-primary"><UploadCloud size={23} /></span>
          <h2 className="mt-4 text-base font-semibold text-content">Drop videos and resources here</h2>
          <p className="mt-1 text-xs text-content-secondary">Video, course-cover image, or PDF transcript · up to 4 GB</p>
          <Button variant="outline" className="mt-4" disabled={isDemoMode || course.isLoading || course.isError} onClick={() => inputRef.current?.click()}>Choose files</Button>
          <input ref={inputRef} type="file" multiple accept="video/*,image/*,.pdf" disabled={isDemoMode} className="hidden" onChange={(event) => pickFiles(event.target.files)} />
        </div>

        {!isDemoMode && (
          <div className="mt-4 rounded-input bg-subtle p-3">
            <label className="text-xs font-semibold text-content" htmlFor={`media-lecture-${courseId}`}>Attach videos and transcripts to</label>
            <select id={`media-lecture-${courseId}`} value={lectureId} onChange={(event) => setLectureId(event.target.value)} className="mt-2 w-full rounded-input border border-border bg-surface px-3 py-2 text-xs text-content outline-none focus:border-primary">
              <option value="">Select a lecture</option>
              {lectures.map((lecture) => <option key={lecture.id} value={lecture.id}>{lecture.title}</option>)}
            </select>
            {!course.isLoading && lectures.length === 0 && <p className="mt-2 text-[11px] text-warning">Create a lecture before uploading video or transcript media. Course-cover images can still be uploaded.</p>}
          </div>
        )}
        {error && <div className="mt-4 rounded-input bg-error/10 px-3 py-2 text-xs text-error">{error}</div>}

        <div className="mt-6 flex items-center justify-between"><h2 className="text-sm font-semibold text-content">Course media</h2><span className="text-[11px] text-content-muted">{assets.length} files</span></div>
        <div className="mt-3 space-y-3">
          {assets.map((asset) => (
            <UploadFileRow
              key={asset.id}
              asset={asset}
              onRetry={asset.state === 'ERROR' && filesRef.current.has(asset.id)
                ? () => { const file = filesRef.current.get(asset.id); if (file) void processFile(file, asset.id) }
                : undefined}
            />
          ))}
          {!assets.length && <div className="rounded-input border border-dashed border-border p-6 text-center text-xs text-content-secondary">No media is attached to this course.</div>}
        </div>
      </Card>

      <Card className="h-fit p-5 xl:sticky xl:top-24">
        <h2 className="text-base font-semibold text-content">Media readiness</h2>
        <p className="mt-2 text-xs leading-5 text-content-secondary">Only ready media can be attached to a published lesson.</p>
        <div className="mt-5 space-y-2">
          {[
            ['READY', 'Ready', 'success', FileCheck2],
            ['UPLOADING', 'Uploading', 'brand', UploadCloud],
            ['PROCESSING', 'Processing', 'info', Loader2],
            ['ERROR', 'Failed', 'danger', RefreshCw],
          ].map(([state, label, tone, Icon]) => (
            <div key={String(state)} className="flex items-center justify-between rounded-input bg-subtle px-3 py-3">
              <span className="inline-flex items-center gap-2 text-xs text-content-secondary"><Icon size={14} /> {label as string}</span>
              <StatusPill tone={tone as 'success' | 'brand' | 'info' | 'danger'} dot={false}>{counts(state as UploadAssetState)}</StatusPill>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-input bg-subtle p-4">
          <p className="text-xs font-semibold text-content">Connected pipeline</p>
          <ol className="mt-3 space-y-3 text-[11px] text-content-secondary">
            {['Request a signed upload URL', 'Upload bytes to storage', 'Confirm the database reference', 'Process video until ready'].map((step, index) => (
              <li key={step} className="flex gap-2"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-surface text-[9px] font-semibold text-primary">{index + 1}</span>{step}</li>
            ))}
          </ol>
        </div>
      </Card>
    </div>
  )
}
