'use client'

import { useState } from 'react'
import { Sparkles, AlertCircle } from 'lucide-react'
import {
  generateAsset,
  STUDIO_ACTIONS,
  toTutorError,
  type StudioKind,
  type TutorCitation,
} from '@/lib/ai/tutor'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function AiCourseStudio({
  lectureId,
  lectureTitle,
}: {
  lectureId: string
  lectureTitle?: string
}) {
  const [busy, setBusy] = useState<StudioKind | null>(null)
  const [result, setResult] = useState<{ kind: StudioKind; text: string; citations: TutorCitation[] } | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function run(kind: StudioKind) {
    if (busy) return
    setError(null)
    setResult(null)
    setBusy(kind)
    try {
      const res = await generateAsset({ lectureId, kind })
      setResult({ kind, text: res.answer, citations: res.citations })
    } catch (e) {
      // toTutorError already produces a user-facing message per status code.
      setError(toTutorError(e).message)
    } finally {
      setBusy(null)
    }
  }

  const activeLabel = result && STUDIO_ACTIONS.find((a) => a.kind === result.kind)?.label

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles size={16} className="text-primary" />
          <p className="text-sm font-semibold text-content">
            Generate from{lectureTitle ? `: ${lectureTitle}` : ' this lesson'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {STUDIO_ACTIONS.map((a) => (
            <Button
              key={a.kind}
              size="sm"
              variant="outline"
              loading={busy === a.kind}
              disabled={!!busy}
              onClick={() => void run(a.kind)}
            >
              {a.label}
            </Button>
          ))}
        </div>
        <p className="mt-2 text-xs text-content-muted">
          Grounded in the selected video&apos;s transcript. Output is a draft — review before use.
        </p>
      </Card>

      {error && (
        <div className="flex items-start gap-2 rounded-input bg-error/10 px-3 py-2.5 text-xs text-error">
          <AlertCircle size={14} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <Card className="p-4">
          <p className="mb-2 text-sm font-semibold text-content">{activeLabel}</p>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-content-secondary">
            {result.text}
          </p>
          {result.citations.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {result.citations.map((c, i) => (
                <span
                  key={i}
                  className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary"
                  title={c.videoTitle}
                >
                  {c.label}
                </span>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
