'use client'

import { useState } from 'react'
import { Sparkles, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react'
import {
  generateAsset,
  STUDIO_ACTIONS,
  toTutorError,
  type StudioKind,
  type TutorCitation,
} from '@/lib/ai/tutor'
import { parseGeneratedQuiz, QuizParseError, type ParsedQuiz } from '@/lib/ai/quizParse'
import { AiQuizImport } from '@/components/ai/AiQuizImport'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface StudioResult {
  kind: StudioKind
  text: string
  citations: TutorCitation[]
  /** Set for the QUIZ action when the reply parsed into saveable questions. */
  quiz: ParsedQuiz | null
  /** Set when QUIZ was asked for but the reply could not be structured. */
  quizParseError: string | null
}

export function AiCourseStudio({
  courseId,
  lectureId,
  lectureTitle,
  quizLectures,
}: {
  courseId: string
  lectureId: string
  lectureTitle?: string
  quizLectures: { id: string; title: string }[]
}) {
  const [busy, setBusy] = useState<StudioKind | null>(null)
  const [result, setResult] = useState<StudioResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showRaw, setShowRaw] = useState(false)

  async function run(kind: StudioKind) {
    if (busy) return
    setError(null)
    setResult(null)
    setShowRaw(false)
    setBusy(kind)
    try {
      const res = await generateAsset({ lectureId, kind })

      // Only the quiz action is structured. The others are prose by design —
      // there is no generation endpoint, just the RAG chat (see quizParse.ts).
      let quiz: ParsedQuiz | null = null
      let quizParseError: string | null = null
      if (kind === 'QUIZ') {
        try {
          quiz = parseGeneratedQuiz(res.answer)
        } catch (parseError) {
          // Never discard the model's output because we could not structure it:
          // the instructor can still read it and enter questions by hand.
          quizParseError =
            parseError instanceof QuizParseError
              ? parseError.message
              : 'The quiz could not be read as structured questions.'
        }
      }

      setResult({ kind, text: res.answer, citations: res.citations, quiz, quizParseError })
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

      {/* Structured quiz: preview, select, and save into a real quiz. */}
      {result?.quiz && (
        <>
          <AiQuizImport
            courseId={courseId}
            questions={result.quiz.questions}
            warnings={result.quiz.warnings}
            quizLectures={quizLectures}
          />
          <button
            type="button"
            onClick={() => setShowRaw((v) => !v)}
            className="flex items-center gap-1 text-xs font-semibold text-content-secondary hover:text-content"
          >
            {showRaw ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
            {showRaw ? 'Hide' : 'Show'} the raw AI reply
          </button>
          {showRaw && (
            <Card className="p-4">
              <pre className="overflow-x-auto whitespace-pre-wrap text-xs text-content-secondary">
                {result.text}
              </pre>
            </Card>
          )}
        </>
      )}

      {/* Prose result, or a quiz we could not structure — shown either way. */}
      {result && !result.quiz && (
        <Card className="p-4">
          <p className="mb-2 text-sm font-semibold text-content">{activeLabel}</p>
          {result.quizParseError && (
            <div className="mb-3 flex items-start gap-2 rounded-input bg-warning/10 px-3 py-2 text-xs text-content-secondary">
              <AlertCircle size={13} className="mt-0.5 shrink-0" />
              <span>
                {result.quizParseError} You can still copy the questions into the quiz editor by
                hand, or generate again.
              </span>
            </div>
          )}
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
