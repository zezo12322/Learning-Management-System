'use client'

import { useState } from 'react'
import { Sparkles, AlertCircle } from 'lucide-react'
import {
  generateAsset,
  STUDIO_ACTIONS,
  TutorError,
  type StudioKind,
  type TutorCitation,
} from '@/lib/ai/tutor'
import { useT } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

function msLabel(ms: number): string {
  const total = Math.floor(ms / 1000)
  const minutes = Math.floor(total / 60)
  const seconds = total % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function AiCourseStudio({
  courseId,
  videoId,
  videoTitle,
}: {
  courseId: string
  videoId: string
  videoTitle?: string
}) {
  const t = useT()
  const [busy, setBusy] = useState<StudioKind | null>(null)
  const [result, setResult] = useState<{ kind: StudioKind; text: string; citations: TutorCitation[] } | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function run(kind: StudioKind) {
    if (busy) return
    setError(null)
    setResult(null)
    setBusy(kind)
    try {
      const res = await generateAsset({ courseId, videoId, kind })
      setResult({ kind, text: res.answer, citations: res.citations })
    } catch (e) {
      const te = e as TutorError
      // The three failure messages were English literals in this component.
      setError(
        te.code === 'VIDEO_NOT_READY'
          ? t('ai.error.videoNotReady')
          : te.code === 'AI_NOT_CONFIGURED'
            ? t('ai.error.notConfigured')
            : te.message || t('ai.error.generationFailed'),
      )
    } finally {
      setBusy(null)
    }
  }

  const activeAction = result && STUDIO_ACTIONS.find((action) => action.kind === result.kind)

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles size={16} className="text-primary" aria-hidden />
          <h2 className="text-sm font-semibold text-content">
            {videoTitle
              ? t('ai.studio.generateFrom').replace('{name}', videoTitle)
              : t('ai.studio.generateFromLesson')}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {STUDIO_ACTIONS.map((action) => (
            <Button
              key={action.kind}
              size="sm"
              variant="outline"
              loading={busy === action.kind}
              disabled={Boolean(busy)}
              onClick={() => void run(action.kind)}
            >
              {t(action.labelKey)}
            </Button>
          ))}
        </div>
        <p className="mt-2 text-xs text-content-muted">{t('ai.studio.draftDisclaimer')}</p>
      </Card>

      {/* Both outcomes are announced: generation takes seconds, and neither the
          result nor the failure was reachable without seeing the screen. */}
      <div aria-live="polite">
        {error && (
          <div role="alert" className="flex items-start gap-2 rounded-input bg-error-soft px-3 py-2.5 text-xs text-error">
            <AlertCircle size={14} className="mt-0.5 shrink-0" aria-hidden />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <Card className="p-4">
            <p className="mb-2 text-sm font-semibold text-content">
              {activeAction ? t(activeAction.labelKey) : t('ai.studio.resultReady')}
            </p>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-content-secondary">
              {result.text}
            </p>
            {result.citations.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {result.citations.map((citation, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-info-soft px-2 py-0.5 text-[11px] font-medium text-info"
                    title={citation.videoTitle}
                  >
                    {t('ai.studio.citationAt').replace('{time}', citation.label || msLabel(citation.startMs))}
                  </span>
                ))}
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}
