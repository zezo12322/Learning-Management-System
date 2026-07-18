'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react'
import { quizApi } from '@/lib/api/services'
import { apiErrorMessage } from '@/lib/api/client'
import { useT } from '@/lib/i18n'
import { getCachedQuizId } from '@/lib/quizCache'
import type { QuizResult } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageSpinner } from '@/components/ui/spinner'

type Phase = 'intro' | 'taking' | 'result'

export default function TakeQuizPage() {
  const t = useT()
  const params = useParams<{ courseId: string; lectureId: string }>()
  const courseId = params.courseId
  const lectureId = params.lectureId

  const [ready, setReady] = useState(false)
  const [quizId, setQuizId] = useState<string | null>(null)
  useEffect(() => {
    setQuizId(getCachedQuizId(lectureId))
    setReady(true)
  }, [lectureId])

  const quizQuery = useQuery({
    queryKey: ['take-quiz', quizId],
    queryFn: () => quizApi.getForTaking(courseId, quizId as string),
    enabled: ready && !!quizId,
  })

  const [phase, setPhase] = useState<Phase>('intro')
  const [attemptId, setAttemptId] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<QuizResult | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const questions = quizQuery.data?.questions ?? []
  const answeredCount = useMemo(() => Object.keys(answers).length, [answers])

  const start = async () => {
    if (!quizId) return
    setBusy(true)
    setError(null)
    try {
      const id = await quizApi.startAttempt(courseId, quizId)
      setAttemptId(id)
      setPhase('taking')
    } catch (e) {
      setError(apiErrorMessage(e, t('quizTake.startError')))
    } finally {
      setBusy(false)
    }
  }

  const submit = async () => {
    if (!quizId || !attemptId) return
    setBusy(true)
    setError(null)
    try {
      for (const q of questions) {
        const selected = answers[q.id]
        if (selected) {
          await quizApi.submitAnswer(courseId, quizId, attemptId, {
            questionId: q.id,
            selectedOptionId: selected,
          })
        }
      }
      const res = await quizApi.finishAttempt(courseId, quizId, attemptId)
      setResult(res)
      setPhase('result')
    } catch (e) {
      setError(apiErrorMessage(e, t('quizTake.submitError')))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href={`/quiz/${courseId}/${lectureId}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-content-secondary hover:text-content"
      >
        <ArrowLeft size={15} /> {t('quizTake.backToEditor')}
      </Link>

      {!ready ? (
        <PageSpinner />
      ) : !quizId ? (
        <Card className="space-y-2 p-6 text-center">
          <h1 className="text-base font-semibold text-content">{t('quizTake.notAvailable')}</h1>
          <p className="text-sm text-content-secondary">
            {t('quizTake.notAvailableBody')}
          </p>
        </Card>
      ) : quizQuery.isLoading ? (
        <PageSpinner />
      ) : quizQuery.isError || !quizQuery.data ? (
        <Card className="p-6 text-center text-sm text-content-secondary">
          {apiErrorMessage(quizQuery.error, t('quizTake.loadError'))}
        </Card>
      ) : phase === 'result' && result ? (
        <ResultView result={result} onRetake={() => {
          setAnswers({})
          setAttemptId(null)
          setResult(null)
          setPhase('intro')
        }} />
      ) : phase === 'intro' ? (
        <Card className="space-y-4 p-6 text-center">
          <h1 className="text-title-md font-bold text-content">{t('quizTake.readyToStart')}</h1>
          <p className="text-sm text-content-secondary">
            {questions.length} {questions.length === 1 ? t('quizTake.question') : t('quizTake.questions')}
            {quizQuery.data.timeLimitMinutes ? ` · ${quizQuery.data.timeLimitMinutes} ${t('quizTake.min')}` : ''}
          </p>
          {error && <p className="text-sm text-error">{error}</p>}
          <Button loading={busy} onClick={start} disabled={questions.length === 0}>
            {t('quizTake.startAttempt')}
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {questions.map((q, i) => (
            <Card key={q.id} className="space-y-3 p-4">
              <p className="text-sm font-semibold text-content">
                <span className="text-content-secondary">{i + 1}.</span> {q.questionText}
              </p>
              <div className="space-y-2">
                {q.options.map((o) => (
                  <label
                    key={o.id}
                    className={
                      answers[q.id] === o.id
                        ? 'flex cursor-pointer items-center gap-2 rounded-input border border-primary bg-brand-soft px-3 py-2 text-sm text-content'
                        : 'flex cursor-pointer items-center gap-2 rounded-input border border-border px-3 py-2 text-sm text-content-secondary hover:border-primary/40'
                    }
                  >
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      checked={answers[q.id] === o.id}
                      onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: o.id }))}
                      className="h-4 w-4 accent-primary"
                    />
                    {o.text}
                  </label>
                ))}
              </div>
            </Card>
          ))}

          {error && <p className="text-sm text-error">{error}</p>}
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary">
              {answeredCount}/{questions.length} {t('quizTake.answered')}
            </span>
            <Button loading={busy} onClick={submit}>
              {t('quizTake.submitQuiz')}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function ResultView({ result, onRetake }: { result: QuizResult; onRetake: () => void }) {
  const t = useT()
  return (
    <Card className="space-y-4 p-8 text-center">
      {result.passed ? (
        <CheckCircle2 size={48} className="mx-auto text-success" />
      ) : (
        <XCircle size={48} className="mx-auto text-error" />
      )}
      <div>
        <h1 className="text-title-md font-bold text-content">
          {result.passed ? t('quizTake.passed') : t('quizTake.notPassed')}
        </h1>
        <p className="mt-1 text-3xl font-bold text-content">{Math.round(result.score)}%</p>
      </div>
      <div className="flex justify-center gap-2">
        <Badge tone={result.passed ? 'success' : 'warning'}>
          {result.correctCount}/{result.totalQuestions} {t('quizTake.correct')}
        </Badge>
      </div>
      <Button variant="outline" onClick={onRetake}>
        {t('quizTake.retake')}
      </Button>
    </Card>
  )
}
