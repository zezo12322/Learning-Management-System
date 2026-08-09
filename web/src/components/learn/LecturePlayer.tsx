'use client'

import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AlertTriangle, Loader2, PlayCircle } from 'lucide-react'
import { isApiUrl } from '@/lib/api/client'
import { progressApi, streamingApi } from '@/lib/api/services'
import { getFirebaseAuth } from '@/lib/firebase'
import { useAuth } from '@/lib/auth/AuthProvider'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/** How often the player reports its position to the progress heartbeat. */
const HEARTBEAT_MS = 10_000
/**
 * Seconds of watch-time credit a single real second can earn. Mirrors
 * MAX_CREDITED_PLAYBACK_RATE in the backend's lecture-progress queue, which is
 * where the rule is documented; keep the two in step.
 *
 * Watching at 1.5x or 2x still completes a lecture. Beyond that the surplus is
 * not credited, and a scrubber drag credits nothing at all, because a jump
 * moves the timeline without any real time passing.
 */
const MAX_CREDITED_PLAYBACK_RATE = 2
/** How often the forensic watermark moves, so it cannot be cropped out. */
const WATERMARK_MOVE_MS = 15_000

const CORNERS = [
  'top-3 start-3',
  'top-3 end-3',
  'bottom-14 end-3',
  'bottom-14 start-3',
] as const

/**
 * Secure lecture video (API_DOCUMENTATION §19).
 *
 * The video is AES-128 HLS in a private bucket, so playback is a handshake:
 * hls.js fetches the manifest and the decryption key from our API — both need
 * the Firebase token — while the segments come from pre-signed
 * storage.googleapis.com URLs that must stay header-free. `xhrSetup` below is
 * what enforces that split; attaching the token to every request would hand the
 * caller's credentials to a third-party host.
 *
 * The token is read per request rather than captured once, because a lecture can
 * outlive the ~1h Firebase token while the key token lives 6h.
 */
export function LecturePlayer({
  lectureId,
  title,
  posterSeed,
  resumeAtSecond = 0,
  onEnded,
  onPosition,
}: {
  lectureId: string
  title: string
  posterSeed?: string
  resumeAtSecond?: number
  onEnded?: () => void
  /** Live playback position, so the page can stamp notes and complete lessons. */
  onPosition?: (seconds: number) => void
}) {
  const t = useT()
  const { firebaseUser } = useAuth()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [state, setState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [errorKey, setErrorKey] = useState<string>('learn.player.error')
  const [started, setStarted] = useState(false)
  const [corner, setCorner] = useState(0)
  // Captured once per lecture: a background refetch of the resume position must
  // not tear down and restart a stream the learner is watching.
  const resumeRef = useRef(resumeAtSecond)
  const positionRef = useRef(onPosition)
  positionRef.current = onPosition

  // Only fetched once playback is requested — an unwatched lecture should not
  // mint a forensic watermark session.
  // Keyed by uid as well as lecture: the watermark carries the viewer's email,
  // so it must never be replayed from cache for a different account. gcTime 0
  // drops the forensic token as soon as the player unmounts.
  const watermark = useQuery({
    queryKey: ['stream-watermark', firebaseUser?.uid, lectureId],
    queryFn: () => streamingApi.watermark(lectureId),
    enabled: started && Boolean(firebaseUser),
    staleTime: 5 * 60_000,
    gcTime: 0,
    retry: false,
  })

  useEffect(() => {
    if (!started) return
    const video = videoRef.current
    if (!video) return

    let disposed = false
    let hls: import('hls.js').default | null = null
    setState('loading')

    const attachToken = async (xhr: XMLHttpRequest, url: string) => {
      if (!isApiUrl(url)) return
      const user = getFirebaseAuth().currentUser
      if (!user) return
      // Read at request time so hls.js picks up a refreshed token mid-lecture.
      const token = await user.getIdToken()
      xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    }

    const run = async () => {
      const { default: Hls } = await import('hls.js')
      if (disposed) return

      const manifestUrl = streamingApi.manifestUrl(lectureId)
      if (!Hls.isSupported()) {
        // Native HLS cannot add headers to the key request, so the encrypted
        // stream simply will not play there.
        setErrorKey('learn.player.unsupported')
        setState('error')
        return
      }

      hls = new Hls({ xhrSetup: attachToken })
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (disposed) return
        setState('ready')
        if (resumeRef.current > 0) video.currentTime = resumeRef.current
        void video.play().catch(() => {
          /* autoplay may be blocked — the native controls still work */
        })
      })
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (disposed || !data.fatal) return
        const status = data.response?.code
        setErrorKey(
          status === 403
            ? 'learn.player.forbidden'
            : status === 404 || status === 400
              ? 'learn.player.notPackaged'
              : 'learn.player.error',
        )
        setState('error')
        hls?.destroy()
      })
      hls.loadSource(manifestUrl)
      hls.attachMedia(video)
    }

    void run()
    return () => {
      disposed = true
      hls?.destroy()
    }
  }, [started, lectureId])

  // Report the furthest position AND the time actually spent playing.
  // Completion is derived server-side from both, so the client never asserts it.
  //
  // Each tick credits the distance the timeline moved, capped at what real
  // elapsed time allows. One rule covers both ways of cheating the old
  // position-only check: at 8x the timeline outruns the clock and only the
  // capped share counts, and a scrubber drag moves the timeline while no real
  // time passes, so it credits nothing.
  //
  // The accumulator starts at the resume position, because a lecture watched
  // over two sittings has to be able to finish. That is also its limit: the
  // credit is not persisted, so reloading re-seeds it from wherever the stored
  // position sits. Closing that needs a watched-seconds column on
  // LectureProgress — see the note in the PR.
  useEffect(() => {
    if (state !== 'ready') return
    const video = videoRef.current
    if (!video) return
    let furthest = resumeRef.current
    let credited = resumeRef.current
    let prevTime = video.currentTime
    let prevAt = Date.now()

    const timer = window.setInterval(() => {
      const now = Date.now()
      const currentTime = video.currentTime
      const timelineDelta = currentTime - prevTime
      const realDelta = (now - prevAt) / 1000
      prevTime = currentTime
      prevAt = now

      if (!video.paused && timelineDelta > 0) {
        credited += Math.min(timelineDelta, realDelta * MAX_CREDITED_PLAYBACK_RATE)
      }

      const position = Math.floor(currentTime)
      positionRef.current?.(position)
      if (position <= furthest || video.paused) return
      furthest = position
      void progressApi.heartbeat(lectureId, position, Math.floor(credited)).catch(() => {
        /* a dropped heartbeat is not worth interrupting playback for */
      })
    }, HEARTBEAT_MS)
    return () => window.clearInterval(timer)
  }, [state, lectureId])

  useEffect(() => {
    if (!watermark.data?.text) return
    const timer = window.setInterval(
      () => setCorner((current) => (current + 1) % CORNERS.length),
      WATERMARK_MOVE_MS,
    )
    return () => window.clearInterval(timer)
  }, [watermark.data?.text])

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-card bg-slate-950">
      <video
        ref={videoRef}
        controls={started && state === 'ready'}
        playsInline
        controlsList="nodownload"
        onContextMenu={(event) => event.preventDefault()}
        onEnded={onEnded}
        onPause={(event) => onPosition?.(Math.floor(event.currentTarget.currentTime))}
        onSeeked={(event) => onPosition?.(Math.floor(event.currentTarget.currentTime))}
        className={cn('h-full w-full', started && state === 'ready' ? 'block' : 'hidden')}
      />

      {!started && (
        <button
          type="button"
          onClick={() => setStarted(true)}
          aria-label={t('learn.player.play')}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary-800 to-slate-950 text-white transition-opacity hover:opacity-95"
          data-seed={posterSeed}
        >
          <PlayCircle size={64} strokeWidth={1.4} className="opacity-90" />
          <span className="max-w-md px-6 text-center text-sm font-semibold">{title}</span>
        </button>
      )}

      {started && state === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/80">
          <Loader2 size={32} className="animate-spin" />
          <span className="text-xs">{t('learn.player.loading')}</span>
        </div>
      )}

      {started && state === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center text-white/85">
          <AlertTriangle size={32} className="text-warning" />
          <p className="text-sm font-semibold">{t(errorKey)}</p>
          <button
            type="button"
            onClick={() => {
              setState('idle')
              setStarted(false)
            }}
            className="rounded-btn border border-white/30 px-4 py-2 text-xs font-semibold hover:bg-white/10"
          >
            {t('learn.player.retry')}
          </button>
        </div>
      )}

      {/* Forensic watermark — traces a screen recording back to this account. */}
      {started && watermark.data?.text && (
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute select-none rounded bg-black/25 px-2 py-1 text-[10px] font-medium text-white/60 transition-all duration-700',
            CORNERS[corner],
          )}
        >
          {watermark.data.text}
        </span>
      )}
    </div>
  )
}
