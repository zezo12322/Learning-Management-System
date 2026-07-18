'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FileCheck2, Loader2, RefreshCw, UploadCloud } from 'lucide-react'
import type { UploadAsset, UploadAssetState } from '@/lib/types'
import { uploadCourseAsset, type UploadPhase } from '@/lib/api/upload'
import { authoringApi } from '@/lib/api/services'
import { useT } from '@/lib/i18n'
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
  const t = useT()
  const inputRef = useRef<HTMLInputElement>(null)
  const filesRef = useRef(new Map<string, File>())
  const [sessionAssets, setSessionAssets] = useState<UploadAsset[]>([])
  const [lectureId, setLectureId] = useState('')
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const course = useQuery({
    queryKey: ['authoring-course', courseId],
    queryFn: () => authoringApi.get(courseId),
    enabled: Boolean(courseId),
  })
  const lectures = useMemo(() => course.data?.sections?.flatMap((section) => section.lectures) ?? [], [course.data])
  const sectionByLecture = useMemo(() => new Map(
    (course.data?.sections ?? []).flatMap((section) => section.lectures.map((lecture) => [lecture.id, section.id] as const))
  ), [course.data?.sections])
  const storedAssets = useMemo<UploadAsset[]>(() => lectures.flatMap((lecture) => {
    const result: UploadAsset[] = []
    if (lecture.videoUrl) result.push({
      id: `stored-video-${lecture.id}`,
      name: `${lecture.title} — ${t('uploads.videoSuffix')}`,
      sizeLabel: t('uploads.storedVideo'),
      state: 'READY',
      progress: 100,
      mimeType: 'video/*',
      lectureId: lecture.id,
    })
    if (lecture.transcriptUrl) result.push({
      id: `stored-transcript-${lecture.id}`,
      name: `${lecture.title} — ${t('uploads.transcriptSuffix')}`,
      sizeLabel: t('uploads.storedTranscript'),
      state: 'READY',
      progress: 100,
      mimeType: 'application/pdf',
      lectureId: lecture.id,
    })
    return result
  }), [lectures, t])
  const assets = useMemo(() => {
    // Once a lecture's uploaded video is stored (videoUrl present), the READY
    // stored-video asset supersedes the session asset — which otherwise lingers
    // at PROCESSING since the client doesn't await transcoding. Drop the
    // superseded session video so the same lecture isn't shown twice.
    const lecturesWithStoredVideo = new Set(
      lectures.filter((lecture) => lecture.videoUrl).map((lecture) => lecture.id)
    )
    const liveSession = sessionAssets.filter(
      (asset) => !(asset.lectureId && asset.mimeType?.startsWith('video/') && lecturesWithStoredVideo.has(asset.lectureId))
    )
    return [...liveSession, ...storedAssets]
  }, [sessionAssets, storedAssets, lectures])

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
    setError(null)
    if (file.size > 4 * 1024 * 1024 * 1024) {
      setError(t('uploads.fileTooLarge'))
      return
    }
    const id = existingId ?? `asset-${Date.now()}-${file.name}`
    filesRef.current.set(id, file)
    const pending: UploadAsset = {
      id,
      name: file.name,
      sizeLabel: `${Math.max(1, Math.round(file.size / 1024 / 1024))} MB · ${file.type || t('uploads.fileFallback')}`,
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
      if (file.type.startsWith('video/') && pending.lectureId) {
        const sectionId = sectionByLecture.get(pending.lectureId)
        if (!sectionId) throw new Error(t('uploads.lessonMatchError'))
        await authoringApi.updateLecture(courseId, sectionId, pending.lectureId, { type: 'VIDEO' })
        await course.refetch()
      }
    } catch (uploadError) {
      updateAsset(id, { state: 'ERROR', progress: 36 })
      setError(uploadError instanceof Error ? uploadError.message : t('uploads.uploadFailed'))
    }
  }

  const pickFiles = (files: FileList | null) => {
    if (!files) return
    Array.from(files).forEach((file) => void processFile(file))
  }
  const counts = (state: UploadAssetState) => assets.filter((asset) => asset.state === state).length

  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 xl:grid-cols-[minmax(0,1fr)_302px]">
      <Card className="p-4 sm:p-5">
        {course.isError && <div className="mb-4 rounded-input bg-error/10 p-3 text-xs text-error">{t('uploads.courseLoadError')}</div>}
        <div
          onDragOver={(event) => { event.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => { event.preventDefault(); setDragging(false); pickFiles(event.dataTransfer.files) }}
          className={dragging ? 'flex min-h-48 flex-col items-center justify-center rounded-card border border-dashed border-primary bg-primary-100 p-6 text-center' : 'flex min-h-48 flex-col items-center justify-center rounded-card border border-dashed border-primary bg-brand-soft p-6 text-center'}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-primary"><UploadCloud size={23} /></span>
          <h2 className="mt-4 text-base font-semibold text-content">{t('uploads.dropHere')}</h2>
          <p className="mt-1 text-xs text-content-secondary">{t('uploads.dropHint')}</p>
          <Button variant="outline" className="mt-4" disabled={course.isLoading || course.isError} onClick={() => inputRef.current?.click()}>{t('uploads.chooseFiles')}</Button>
          <input ref={inputRef} type="file" multiple accept="video/*,image/*,.pdf" className="hidden" onChange={(event) => pickFiles(event.target.files)} />
        </div>

        <div className="mt-4 rounded-input bg-subtle p-3">
          <label className="text-xs font-semibold text-content" htmlFor={`media-lecture-${courseId}`}>{t('uploads.attachTo')}</label>
          <select id={`media-lecture-${courseId}`} value={lectureId} onChange={(event) => setLectureId(event.target.value)} className="mt-2 w-full rounded-input border border-border bg-surface px-3 py-2 text-xs text-content outline-none focus:border-primary">
            <option value="">{t('uploads.selectLecture')}</option>
            {lectures.map((lecture) => <option key={lecture.id} value={lecture.id}>{lecture.title}</option>)}
          </select>
          {!course.isLoading && lectures.length === 0 && <p className="mt-2 text-[11px] text-warning">{t('uploads.createLectureFirst')}</p>}
        </div>
        {error && <div className="mt-4 rounded-input bg-error/10 px-3 py-2 text-xs text-error">{error}</div>}

        <div className="mt-6 flex items-center justify-between"><h2 className="text-sm font-semibold text-content">{t('uploads.courseMedia')}</h2><span className="text-[11px] text-content-muted">{assets.length} {t('uploads.files')}</span></div>
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
          {!assets.length && <div className="rounded-input border border-dashed border-border p-6 text-center text-xs text-content-secondary">{t('uploads.noMedia')}</div>}
        </div>
      </Card>

      <Card className="h-fit p-5 xl:sticky xl:top-24">
        <h2 className="text-base font-semibold text-content">{t('uploads.readiness')}</h2>
        <p className="mt-2 text-xs leading-5 text-content-secondary">{t('uploads.readinessHint')}</p>
        <div className="mt-5 space-y-2">
          {([
            ['READY', 'uploads.state.ready', 'success', FileCheck2],
            ['UPLOADING', 'uploads.state.uploading', 'brand', UploadCloud],
            ['PROCESSING', 'uploads.state.processing', 'info', Loader2],
            ['ERROR', 'uploads.state.failed', 'danger', RefreshCw],
          ] as const).map(([state, labelKey, tone, Icon]) => (
            <div key={state} className="flex items-center justify-between rounded-input bg-subtle px-3 py-3">
              <span className="inline-flex items-center gap-2 text-xs text-content-secondary"><Icon size={14} /> {t(labelKey)}</span>
              <StatusPill tone={tone} dot={false}>{counts(state as UploadAssetState)}</StatusPill>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-input bg-subtle p-4">
          <p className="text-xs font-semibold text-content">{t('uploads.pipelineTitle')}</p>
          <ol className="mt-3 space-y-3 text-[11px] text-content-secondary">
            {['uploads.step1', 'uploads.step2', 'uploads.step3', 'uploads.step4'].map((stepKey, index) => (
              <li key={stepKey} className="flex gap-2"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-surface text-[9px] font-semibold text-primary">{index + 1}</span>{t(stepKey)}</li>
            ))}
          </ol>
        </div>
      </Card>
    </div>
  )
}
