'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AlertTriangle, FileCheck2, Loader2, RefreshCw, UploadCloud } from 'lucide-react'
import type { UploadAsset, UploadAssetState } from '@/lib/types'
import { authoringApi } from '@/lib/api/services'
import { useCourseReadiness } from '@/lib/builder/readiness'
import { useTranscodePolling } from '@/lib/builder/useTranscodePolling'
import { useUploadQueue } from '@/lib/builder/useUploadQueue'
import { useT } from '@/lib/i18n'
import { useAnnounce } from '@/components/builder/BuilderAnnouncer'
import { FormField, SelectField } from '@/components/builder/FormField'
import { ReadinessPanel } from '@/components/builder/ReadinessPanel'
import { StudioStepLayout } from '@/components/builder/StudioStepLayout'
import { UploadFileRow } from '@/components/builder/UploadFileRow'
import { LessonMediaList } from '@/components/uploads/LessonMediaList'
import { StatusPill } from '@/components/workspace/StatusPill'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function CourseUploadWorkspace({ courseId }: { courseId: string }) {
  const t = useT()
  const announce = useAnnounce()
  const inputRef = useRef<HTMLInputElement>(null)
  const [lectureId, setLectureId] = useState('')
  const [dragging, setDragging] = useState(false)
  // An image dropped here replaces the course cover, which the visible "Attach
  // to lesson" control flatly contradicts — so it is confirmed, never silent.
  const [pendingCoverFiles, setPendingCoverFiles] = useState<File[] | null>(null)
  const cancelCoverRef = useRef<HTMLButtonElement>(null)
  // Focus the non-destructive choice when the confirmation appears, mirroring
  // BuilderShell's stayButtonRef. An alertdialog that never receives focus tells
  // a screen-reader user nothing about where the pending decision lives.
  useEffect(() => {
    if (pendingCoverFiles) cancelCoverRef.current?.focus()
  }, [pendingCoverFiles])
  const course = useQuery({
    queryKey: ['authoring-course', courseId],
    queryFn: () => authoringApi.get(courseId),
    enabled: Boolean(courseId),
  })
  const readiness = useCourseReadiness(courseId)
  const lectures = useMemo(() => course.data?.sections?.flatMap((section) => section.lectures) ?? [], [course.data])
  const sectionByLecture = useMemo(() => new Map(
    (course.data?.sections ?? []).flatMap((section) => section.lectures.map((lecture) => [lecture.id, section.id] as const))
  ), [course.data?.sections])

  const queue = useUploadQueue({
    courseId,
    onUploaded: async ({ file, lectureId: uploadedLectureId }) => {
      if (!file.type.startsWith('video/') || !uploadedLectureId) return
      const sectionId = sectionByLecture.get(uploadedLectureId)
      if (!sectionId) return
      await authoringApi.updateLecture(courseId, sectionId, uploadedLectureId, { type: 'VIDEO' })
    },
  })

  // Transcoding runs on the server, so PROCESSING is resolved by polling the
  // status endpoint rather than by the instructor reloading the page.
  const processingLectureIds = useMemo(
    () => Array.from(new Set(
      queue.assets
        .filter((asset) => asset.state === 'PROCESSING' && asset.lectureId)
        .map((asset) => asset.lectureId as string)
    )),
    [queue.assets]
  )
  useTranscodePolling(courseId, processingLectureIds)

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
    // stored-video asset supersedes the session asset, so the same lecture isn't
    // shown twice — one row transcoding, one row ready.
    const lecturesWithStoredVideo = new Set(
      lectures.filter((lecture) => lecture.videoUrl).map((lecture) => lecture.id)
    )
    const liveSession = queue.assets.filter(
      (asset) => !(asset.lectureId && asset.mimeType?.startsWith('video/') && lecturesWithStoredVideo.has(asset.lectureId))
    )
    return [...liveSession, ...storedAssets]
  }, [queue.assets, storedAssets, lectures])

  useEffect(() => {
    setLectureId('')
    setPendingCoverFiles(null)
  }, [courseId])

  useEffect(() => {
    if (!lectureId && lectures[0]) setLectureId(lectures[0].id)
  }, [lectureId, lectures])

  // Every state change an instructor would otherwise only see reaches the live
  // region once.
  const announcedStates = useRef(new Map<string, UploadAssetState>())
  useEffect(() => {
    queue.assets.forEach((asset) => {
      const previous = announcedStates.current.get(asset.id)
      if (previous === asset.state) return
      announcedStates.current.set(asset.id, asset.state)
      // The bytes are stored at PROCESSING for a video and at READY for anything
      // else, so "uploaded" is announced once, whichever way the file lands.
      if (asset.state === 'PROCESSING' || (asset.state === 'READY' && previous !== 'PROCESSING')) {
        announce(t('uploads.announce.uploadComplete').replace('{name}', asset.name))
      }
      if (asset.state === 'ERROR') {
        announce(asset.errorCode === 'CANCELLED'
          ? t('uploads.cancelled')
          : t('uploads.announce.uploadFailed').replace('{name}', asset.name))
      }
    })
  }, [announce, queue.assets, t])

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return
    const picked = Array.from(files)
    if (picked.some((file) => file.type.startsWith('image/'))) {
      setPendingCoverFiles(picked)
      return
    }
    queue.enqueue(picked, lectureId || undefined)
  }

  const pickForLecture = (id: string) => {
    setLectureId(id)
    inputRef.current?.click()
  }

  const counts = (state: UploadAssetState) => assets.filter((asset) => asset.state === state).length
  const videoLectures = useMemo(() => lectures.filter((lecture) => lecture.type === 'VIDEO'), [lectures])

  return (
    <StudioStepLayout
      railLabel={t('builder.readiness.title')}
      rail={
        <div className="space-y-5">
          <ReadinessPanel
            title={t('builder.readiness.title')}
            score={readiness.score}
            checks={readiness.checks}
          />
          <Card className="h-fit p-5">
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
                  <span className="inline-flex items-center gap-2 text-xs text-content-secondary"><Icon size={14} aria-hidden /> {t(labelKey)}</span>
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
      }
    >
      <div className="space-y-5">
        <Card className="p-4 sm:p-5">
          {course.isError && <div role="alert" className="mb-4 rounded-input bg-error-soft p-3 text-xs text-error">{t('uploads.courseLoadError')}</div>}

          <div
            role="group"
            aria-label={t('uploads.dropZoneLabel')}
            onDragOver={(event) => { event.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => { event.preventDefault(); setDragging(false); handleFiles(event.dataTransfer.files) }}
            className={cn(
              'flex min-h-48 flex-col items-center justify-center rounded-card border border-dashed border-primary bg-brand-soft p-6 text-center',
              // The drag state used to be signalled by `bg-primary-100` alone —
              // the literal hex #e0e7ff, and colour as the only cue. The ring
              // plus the heading text change say it twice.
              dragging && 'ring-2 ring-primary'
            )}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-primary"><UploadCloud size={23} aria-hidden /></span>
            <h2 className="mt-4 text-base font-semibold text-content">
              {dragging ? t('uploads.draggingNow') : t('uploads.dropHere')}
            </h2>
            <p className="mt-1 text-xs text-content-secondary">
              {t('uploads.acceptedTypes')} · {t('uploads.maxSize')}
            </p>
            <Button variant="outline" className="mt-4" disabled={course.isLoading || course.isError} onClick={() => inputRef.current?.click()}>
              {t('uploads.chooseFiles')}
            </Button>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept="video/*,image/*,.pdf"
              className="hidden"
              onChange={(event) => { handleFiles(event.target.files); event.target.value = '' }}
            />
            <p className="mt-4 max-w-md text-[11px] leading-5 text-content-secondary">{t('uploads.coverReplaceWarning')}</p>
          </div>

          {pendingCoverFiles && (
            // role="alertdialog", not role="alert": this is a pending decision,
            // not an announcement. As a bare assertive live region it fired the
            // warning AND both button labels at the user as one interruption,
            // re-announced on every child re-render, and moved focus nowhere — so
            // nothing said a decision was waiting or where it lived. Focus goes
            // to Cancel (the non-destructive choice) via cancelCoverRef.
            <div
              role="alertdialog"
              aria-labelledby="uploads-cover-replace-title"
              aria-describedby="uploads-cover-replace-title"
              className="mt-4 rounded-input border border-warning bg-warning-soft p-4"
            >
              <p id="uploads-cover-replace-title" className="flex items-start gap-2 text-xs font-medium text-content">
                <AlertTriangle size={14} className="mt-0.5 shrink-0 text-warning" aria-hidden />
                {t('uploads.coverReplaceWarning')}
              </p>
              <div className="mt-3 flex flex-wrap justify-end gap-2">
                <Button ref={cancelCoverRef} variant="outline" size="sm" onClick={() => setPendingCoverFiles(null)}>{t('common.cancel')}</Button>
                <Button
                  size="sm"
                  onClick={() => {
                    queue.enqueue(pendingCoverFiles, lectureId || undefined)
                    setPendingCoverFiles(null)
                  }}
                >
                  {t('uploads.replaceCoverConfirm')}
                </Button>
              </div>
            </div>
          )}

          <div className="mt-4 rounded-input bg-subtle p-3">
            <FormField id={`media-lecture-${courseId}`} label={t('uploads.attachTo')}>
              {(field) => (
                <SelectField
                  id={field.id}
                  describedBy={field['aria-describedby']}
                  value={lectureId}
                  onChange={(event) => setLectureId(event.target.value)}
                  disabled={lectures.length === 0}
                  className="h-10 text-xs"
                >
                  <option value="">{t('uploads.selectLecture')}</option>
                  {lectures.map((lecture) => <option key={lecture.id} value={lecture.id}>{lecture.title}</option>)}
                </SelectField>
              )}
            </FormField>
            {!course.isLoading && lectures.length === 0 && <p className="mt-2 text-[11px] text-warning">{t('uploads.createLectureFirst')}</p>}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-content">{t('uploads.courseMedia')}</h2>
            <span className="text-[11px] text-content-muted">{assets.length} {t('uploads.files')}</span>
          </div>
          <div className="mt-3 space-y-3">
            {assets.map((asset) => {
              const session = queue.assets.some((queued) => queued.id === asset.id)
              return (
                <UploadFileRow
                  key={asset.id}
                  asset={asset}
                  onRetry={session && asset.state === 'ERROR' ? () => queue.retry(asset.id) : undefined}
                  onCancel={session ? () => queue.cancel(asset.id) : undefined}
                  onRemove={session ? () => queue.remove(asset.id) : undefined}
                />
              )
            })}
            {!assets.length && <div className="rounded-input border border-dashed border-border p-6 text-center text-xs text-content-secondary">{t('uploads.noMedia')}</div>}
          </div>
        </Card>

        <LessonMediaList lectures={videoLectures} onPick={pickForLecture} />
      </div>
    </StudioStepLayout>
  )
}
