'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import { AlertTriangle, Check, ExternalLink } from 'lucide-react'
import { quizApi } from '@/lib/api/services'
import { apiErrorMessage } from '@/lib/api/client'
import { getCachedQuizId, setCachedQuizId } from '@/lib/quizCache'
import type { ParsedQuizQuestion } from '@/lib/ai/quizParse'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Saves AI-generated questions into a real quiz.
//
// Two things shape this UI:
//  - A quiz attaches to a QUIZ-type lecture, but generation is grounded in a
//    VIDEO lecture. So the instructor must pick a destination, and a course with
//    no QUIZ lecture cannot receive questions at all (lectures are created in
//    the curriculum editor, not here).
//  - The questions came from a language model. Nothing is written until the
//    instructor has seen each one and confirmed, and every question is
//    individually deselectable — a plausible-looking wrong answer key would
//    otherwise mis-grade every student who takes it.

// Matches the defaults in the quiz editor's create form.
const DEFAULT_SETTINGS = { passingScore: 60, maxAttempts: 3 }

/** apiErrorMessage only reads axios response bodies, so a locally thrown
 *  invariant would be replaced by its generic fallback. Keep that message. */
function saveErrorMessage(error: unknown): string {
  const fromResponse = apiErrorMessage(error, '')
  if (fromResponse) return fromResponse

  const isAxios = (error as { isAxiosError?: boolean } | null)?.isAxiosError === true
  if (!isAxios && error instanceof Error && error.message) return error.message

  return 'The questions could not be saved.'
}

interface SaveOutcome {
  saved: number
  failed: { questionText: string; reason: string }[]
  lectureId: string
}

export function AiQuizImport({
  courseId,
  questions,
  warnings,
  quizLectures,
}: {
  courseId: string
  questions: ParsedQuizQuestion[]
  warnings: string[]
  quizLectures: { id: string; title: string }[]
}) {
  const [selected, setSelected] = useState<boolean[]>(() => questions.map(() => true))
  const [destination, setDestination] = useState(quizLectures[0]?.id ?? '')

  const chosen = questions.filter((_, i) => selected[i])

  const save = useMutation<SaveOutcome, unknown, void>({
    mutationFn: async () => {
      // Reuse the existing quiz on this lecture when we know it, otherwise
      // create the shell. getCachedQuizId is per-device (the backend has no
      // "get quiz by lecture" route yet), so a quiz created on another machine
      // is invisible here and a second shell would be attempted — the backend
      // rejects that, and the error surfaces below rather than being swallowed.
      let quizId = getCachedQuizId(destination)
      if (!quizId) {
        quizId = await quizApi.create(courseId, destination, DEFAULT_SETTINGS)
        if (!quizId) throw new Error('The quiz was created but the API returned no id.')
        setCachedQuizId(destination, quizId)
      }

      const failed: SaveOutcome['failed'] = []
      let saved = 0

      // Sequential on purpose: question order is the insertion order, and a
      // burst of writes against the same quiz is not worth the risk.
      for (const question of chosen) {
        try {
          await quizApi.createQuestion(courseId, quizId, question)
          saved++
        } catch (error) {
          failed.push({
            questionText: question.questionText,
            reason: apiErrorMessage(error, 'Could not be saved.'),
          })
        }
      }

      return { saved, failed, lectureId: destination }
    },
  })

  const outcome = save.data

  if (outcome && outcome.failed.length === 0) {
    return (
      <Card className="space-y-2 p-4">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-success">
          <Check size={15} />
          Added {outcome.saved} question{outcome.saved === 1 ? '' : 's'} to the quiz.
        </p>
        <p className="text-xs text-content-secondary">
          Review the wording and the answer key before students see it — these were drafted by a
          model from the video transcript.
        </p>
        <Link
          href={`/quiz/${courseId}/${outcome.lectureId}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Open the quiz editor <ExternalLink size={13} />
        </Link>
      </Card>
    )
  }

  return (
    <Card className="space-y-4 p-4">
      <div>
        <p className="text-sm font-semibold text-content">
          {questions.length} question{questions.length === 1 ? '' : 's'} ready to save
        </p>
        <p className="mt-0.5 text-xs text-content-muted">
          Drafted by a model. Check each answer key — a wrong one mis-grades every attempt.
        </p>
      </div>

      {warnings.length > 0 && (
        <div className="space-y-1 rounded-input bg-warning/10 px-3 py-2 text-xs text-content-secondary">
          <p className="flex items-center gap-1.5 font-semibold text-content">
            <AlertTriangle size={13} />
            Some generated questions were discarded
          </p>
          <ul className="list-inside list-disc space-y-0.5">
            {warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      <ul className="space-y-3">
        {questions.map((question, i) => (
          <li key={i} className="rounded-input border border-border p-3">
            <label className="flex cursor-pointer items-start gap-2">
              <input
                type="checkbox"
                checked={selected[i]}
                onChange={(e) =>
                  setSelected((prev) => prev.map((v, j) => (j === i ? e.target.checked : v)))
                }
                className="mt-1 shrink-0"
              />
              <span className="text-sm font-medium text-content">{question.questionText}</span>
            </label>
            <ul className="mt-2 space-y-1 ps-6">
              {question.options.map((option, j) => (
                <li
                  key={j}
                  className={
                    option.isCorrect
                      ? 'flex items-center gap-1.5 text-xs font-semibold text-success'
                      : 'text-xs text-content-secondary'
                  }
                >
                  {option.isCorrect && <Check size={12} className="shrink-0" />}
                  {option.text}
                </li>
              ))}
            </ul>
            {question.explanation && (
              <p className="mt-2 ps-6 text-xs italic text-content-muted">{question.explanation}</p>
            )}
          </li>
        ))}
      </ul>

      {quizLectures.length === 0 ? (
        <p className="rounded-input bg-warning/10 px-3 py-2 text-xs text-content-secondary">
          This course has no quiz lesson to save into. Add a <strong>QUIZ</strong> lecture in the
          curriculum first, then come back.
        </p>
      ) : (
        <div className="flex flex-wrap items-end gap-2">
          <div className="min-w-[12rem]">
            <label
              htmlFor="ai-quiz-destination"
              className="mb-1 block text-xs font-semibold text-content"
            >
              Save into
            </label>
            <select
              id="ai-quiz-destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full rounded-input border border-border bg-background px-3 py-2 text-sm text-content"
            >
              {quizLectures.map((lecture) => (
                <option key={lecture.id} value={lecture.id}>
                  {lecture.title}
                </option>
              ))}
            </select>
          </div>
          <Button
            loading={save.isPending}
            disabled={chosen.length === 0 || !destination}
            onClick={() => save.mutate()}
          >
            Save {chosen.length} question{chosen.length === 1 ? '' : 's'}
          </Button>
        </div>
      )}

      {save.isError && (
        <p className="text-xs text-error">{saveErrorMessage(save.error)}</p>
      )}

      {outcome && outcome.failed.length > 0 && (
        <div className="space-y-1 rounded-input bg-error/10 px-3 py-2 text-xs text-error">
          <p className="font-semibold">
            Saved {outcome.saved} of {outcome.saved + outcome.failed.length}. These failed:
          </p>
          <ul className="list-inside list-disc space-y-0.5">
            {outcome.failed.map((f, i) => (
              <li key={i}>
                {f.questionText} — {f.reason}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  )
}
