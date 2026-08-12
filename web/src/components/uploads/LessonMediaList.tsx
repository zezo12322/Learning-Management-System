'use client'

import { CheckCircle2, UploadCloud } from 'lucide-react'
import type { Lecture } from '@/lib/types'
import { useT } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { StatusPill } from '@/components/workspace/StatusPill'
import { cn } from '@/lib/utils'

/**
 * Which lessons still need a video — on the one screen that can actually do
 * something about it. The preview step already performed this calculation and
 * then showed it where no upload control exists.
 */
export function LessonMediaList({
  lectures,
  onPick,
  className,
}: {
  /** VIDEO lessons only; the caller decides what counts as one. */
  lectures: Lecture[]
  onPick: (lectureId: string) => void
  className?: string
}) {
  const t = useT()
  if (lectures.length === 0) return null

  const missing = lectures.filter((lecture) => !lecture.videoUrl)

  return (
    <Card className={cn('p-4 sm:p-5', className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-content">{t('uploads.lessonsNeedingVideo')}</h2>
        <StatusPill tone={missing.length ? 'warning' : 'success'}>
          {t('builder.readiness.videosReady')
            .replace('{done}', String(lectures.length - missing.length))
            .replace('{total}', String(lectures.length))}
        </StatusPill>
      </div>

      {missing.length === 0 ? (
        <p className="mt-3 flex items-center gap-2 text-xs text-success">
          <CheckCircle2 size={14} aria-hidden /> {t('uploads.allVideosReady')}
        </p>
      ) : (
        <ul role="list" className="mt-3 divide-y divide-border">
          {lectures.map((lecture) => {
            const ready = Boolean(lecture.videoUrl)
            return (
              <li key={lecture.id} className="flex items-center gap-3 py-3">
                <span className="min-w-0 flex-1 truncate text-xs font-medium text-content">{lecture.title}</span>
                <StatusPill tone={ready ? 'success' : 'warning'} className="shrink-0">
                  {ready ? t('uploads.state.ready') : t('uploads.noVideoYet')}
                </StatusPill>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  onClick={() => onPick(lecture.id)}
                  // BOTH branches name the lesson. The ready branch used the bare
                  // 'uploads.replaceVideo', so a course where several lessons
                  // already had video exposed N buttons all called "Replace the
                  // video" — the only distinguishing text sat in a sibling span a
                  // button list does not read (WCAG 2.4.6).
                  aria-label={
                    ready
                      ? t('uploads.replaceVideoForLesson').replace('{name}', lecture.title)
                      : t('uploads.uploadForLesson').replace('{name}', lecture.title)
                  }
                >
                  <UploadCloud size={13} aria-hidden /> {ready ? t('uploads.replaceVideo') : t('uploads.chooseFiles')}
                </Button>
              </li>
            )
          })}
        </ul>
      )}
    </Card>
  )
}
