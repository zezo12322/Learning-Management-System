'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Clock,
  Gauge,
  Lightbulb,
  RefreshCw,
  Repeat,
  Target,
  Trophy,
  X,
  XCircle,
} from 'lucide-react'
import { quizApi, quizResultFromError } from '@/lib/api/services'
import { apiErrorMessage, apiErrorStatus } from '@/lib/api/client'
import { useT } from '@/lib/i18n'
import { clearQuizAttempt, readQuizAttempt, writeQuizAttempt } from '@/lib/quizAttempt'
import type { QuizResult, TakeQuestion } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PageSpinner } from '@/components/ui/spinner'
import { TabBar } from '@/components/student/FilterChips'
import { cn } from '@/lib/utils'

type Phase = 'intro' | 'taking' | 'review' | 'result'
type ReviewFilter = 'ALL' | 'ANSWERED' | 'UNANSWERED'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

/**
 * How often the attempt asks the server for the authoritative remaining time.
 * The server also auto-grades an expired attempt on this call, so this doubles
 * as the "did my time run out while this tab was asleep?" check.
 */
const HEARTBEAT_MS = 30_000

function clock(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds))
  return `${String(Math.floor(safe / 60)).padStart(2, '0')}:${String(safe % 60).padStart(2, '0')}`
}

/**
 * The learner quiz experience (Figma "12. Quiz experience"): Intro → Question →
 * Review → Result.
 *
 * The quiz id is resolved from the lecture via
 * `GET /courses/:courseId/lectures/:lectureId/quiz`. It used to come from a
 * localStorage map written by the authoring screen, which meant a learner who
 * had never opened the editor — i.e. every learner — could not open a quiz at
 * all.
 */
export default function TakeQuizPage() {
  const t = useT()
  const { courseId, lectureId } = useParams<{ courseId: string; lectureId: string }>()

  const quizRef = useQuery({
    queryKey: ['lecture-quiz', courseId, lectureId],
    queryFn: () => quizApi.forLecture(courseId, lectureId),
    retry: false,
  })
  const quizId = quizRef.data?.id ?? null

  const quizQuery = useQuery({
    queryKey: ['take-quiz', quizId],
    queryFn: () => quizApi.getForTaking(courseId, quizId as string),
    enabled: Boolean(quizId),
  })

  const [phase, setPhase] = useState<Phase>('intro')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [index, setIndex] = useState(0)
  const [result, setResult] = useState<QuizResult | null>(null)
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('ALL')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [remaining, setRemaining] = useState<number | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const [resumed, setResumed] = useState(false)
  /** Answers the server has not acknowledged yet — retried on submit. */
  const [unsyncedCount, setUnsyncedCount] = useState(0)

  const questions = useMemo<TakeQuestion[]>(() => quizQuery.data?.questions ?? [], [quizQuery.data])
  const answeredCount = Object.keys(answers).length
  const timeLimit = quizQuery.data?.timeLimitMinutes ?? quizRef.data?.timeLimitMinutes
  const passingScore = quizRef.data?.passingScore ?? 70

  /**
   * The attempt lives in refs, not state, because every async callback below
   * needs the *current* value: a stale closure here would post an answer to a
   * finished attempt or lose one the learner just changed. State mirrors only
   * what the UI draws.
   */
  const attemptRef = useRef<{ attemptId: string; startedAtMs: number } | null>(null)
  const answersRef = useRef<Record<string, string>>({})
  const syncedRef = useRef<Set<string>>(new Set())
  /** Wall-clock deadline from the server's heartbeat; null = no time limit. */
  const deadlineRef = useRef<number | null>(null)
  // Submission must happen exactly once per attempt: the countdown fires it,
  // and the Review button can fire it too.
  const submittedRef = useRef(false)

  const countUnsynced = () =>
    Object.keys(answersRef.current).filter((id) => !syncedRef.current.has(id)).length

  /** Snapshot the attempt so a reload can walk straight back into it. */
  const persist = useCallback(() => {
    const attempt = attemptRef.current
    if (!quizId || !attempt) return
    writeQuizAttempt(quizId, {
      attemptId: attempt.attemptId,
      startedAtMs: attempt.startedAtMs,
      answers: answersRef.current,
      synced: [...syncedRef.current],
    })
  }, [quizId])

  /** The attempt is over: show the score and stop tracking it locally. */
  const finalize = useCallback(
    (graded: QuizResult) => {
      submittedRef.current = true
      deadlineRef.current = null
      if (quizId) clearQuizAttempt(quizId)
      setResult(graded)
      setPhase('result')
    },
    [quizId],
  )

  /**
   * Send one answer the moment it is picked. `SubmitQuizAnswer` is an upsert, so
   * re-sending or changing an answer is safe, and the server holds the work even
   * if this browser never comes back. Before this, answers were batched to the
   * very end — one refresh mid-quiz lost every one of them while the attempt
   * itself had already been counted against `maxAttempts`.
   */
  const pushAnswer = useCallback(
    async (questionId: string, optionId: string) => {
      const attempt = attemptRef.current
      if (!quizId || !attempt) return
      try {
        await quizApi.submitAnswer(courseId, quizId, attempt.attemptId, {
          questionId,
          selectedOptionId: optionId,
        })
        // Only mark it synced if this is still the chosen option — the learner
        // may have changed their mind while the request was in flight.
        if (answersRef.current[questionId] === optionId) {
          syncedRef.current.add(questionId)
          persist()
        }
      } catch (pushError) {
        // The limit ran out and the server graded the attempt for us.
        const graded = quizResultFromError(pushError)
        if (graded) {
          finalize(graded)
          return
        }
        /* stays unsynced — retried when the learner submits */
      } finally {
        setUnsyncedCount(countUnsynced())
      }
    },
    [courseId, quizId, persist, finalize],
  )

  const select = (questionId: string, optionId: string) => {
    if (submittedRef.current) return
    answersRef.current = { ...answersRef.current, [questionId]: optionId }
    // A changed answer needs re-sending, so it stops counting as acknowledged.
    syncedRef.current.delete(questionId)
    setAnswers(answersRef.current)
    setUnsyncedCount(countUnsynced())
    persist()
    void pushAnswer(questionId, optionId)
  }

  const submit = useCallback(async () => {
    const attempt = attemptRef.current
    if (!quizId || !attempt || submittedRef.current) return
    submittedRef.current = true
    setBusy(true)
    setError(null)
    try {
      // Only the answers the server never acknowledged; the rest went out as
      // they were picked.
      for (const [questionId, optionId] of Object.entries(answersRef.current)) {
        if (syncedRef.current.has(questionId)) continue
        await quizApi.submitAnswer(courseId, quizId, attempt.attemptId, {
          questionId,
          selectedOptionId: optionId,
        })
        syncedRef.current.add(questionId)
      }
      persist()
      setUnsyncedCount(0)
      finalize(await quizApi.finishAttempt(courseId, quizId, attempt.attemptId))
    } catch (submitError) {
      const graded = quizResultFromError(submitError)
      if (graded) {
        finalize(graded)
        return
      }
      if (apiErrorStatus(submitError) === 400) {
        // Already finished server-side — a timeout graded it and this response
        // carries no score. Retrying can never succeed, so say so and point the
        // learner at the course rather than looping on the button.
        clearQuizAttempt(quizId)
        setError(t('quizTake.alreadyFinished'))
        return
      }
      // Recoverable: let the learner try again. Nothing was lost — every answer
      // is already on the server or still queued for retry.
      submittedRef.current = false
      setUnsyncedCount(countUnsynced())
      setError(apiErrorMessage(submitError, t('quizTake.submitError')))
    } finally {
      setBusy(false)
    }
  }, [quizId, courseId, persist, finalize, t])

  const submitRef = useRef(submit)
  submitRef.current = submit

  // Walk back into an attempt this browser already started. Runs once the
  // questions are loaded so the restored answers have something to attach to.
  const resumeCheckedRef = useRef(false)
  useEffect(() => {
    if (resumeCheckedRef.current || !quizId || !quizQuery.data) return
    resumeCheckedRef.current = true
    const stored = readQuizAttempt(quizId)
    if (!stored) return
    attemptRef.current = { attemptId: stored.attemptId, startedAtMs: stored.startedAtMs }
    answersRef.current = stored.answers
    syncedRef.current = new Set(stored.synced)
    setAnswers(stored.answers)
    setUnsyncedCount(countUnsynced())
    // A guess until the first heartbeat replaces it with the server's own count.
    deadlineRef.current = timeLimit ? stored.startedAtMs + timeLimit * 60_000 : null
    setResumed(true)
    setPhase('taking')
  }, [quizId, quizQuery.data, timeLimit])

  /**
   * The clock. `remaining` comes from the server's heartbeat and is interpolated
   * locally between beats; `elapsed` is measured from the attempt's own start.
   * Neither is a tick counter any more — one reset itself to the full limit on
   * reload, and both ran slow in a background tab, quietly handing out extra
   * time.
   */
  useEffect(() => {
    if ((phase !== 'taking' && phase !== 'review') || result) return
    const attempt = attemptRef.current
    if (!attempt || !quizId) return
    let cancelled = false

    const beat = async () => {
      try {
        const status = await quizApi.attemptHeartbeat(courseId, quizId, attempt.attemptId)
        if (cancelled) return
        if (!status.active) {
          if (status.result) finalize(status.result)
          else {
            clearQuizAttempt(quizId)
            setError(t('quizTake.alreadyFinished'))
          }
          return
        }
        if (status.remainingSeconds !== null) {
          deadlineRef.current = Date.now() + status.remainingSeconds * 1000
          setRemaining(status.remainingSeconds)
        }
      } catch {
        /* keep the local clock — the server still enforces the real limit */
      }
    }

    void beat()
    const beatTimer = window.setInterval(() => void beat(), HEARTBEAT_MS)
    const tick = window.setInterval(() => {
      setElapsed(Math.max(0, Math.floor((Date.now() - attempt.startedAtMs) / 1000)))
      if (deadlineRef.current === null) return
      const left = Math.max(0, Math.round((deadlineRef.current - Date.now()) / 1000))
      setRemaining(left)
      if (left === 0) void submitRef.current()
    }, 1000)

    return () => {
      cancelled = true
      window.clearInterval(beatTimer)
      window.clearInterval(tick)
    }
  }, [phase, result, quizId, courseId, finalize, t])

  const start = async () => {
    if (!quizId) return
    setBusy(true)
    setError(null)
    try {
      const newAttemptId = await quizApi.startAttempt(courseId, quizId)
      const startedAtMs = Date.now()
      attemptRef.current = { attemptId: newAttemptId, startedAtMs }
      answersRef.current = {}
      syncedRef.current = new Set()
      submittedRef.current = false
      deadlineRef.current = timeLimit ? startedAtMs + timeLimit * 60_000 : null
      persist()
      setAnswers({})
      setUnsyncedCount(0)
      setRemaining(timeLimit ? timeLimit * 60 : null)
      setElapsed(0)
      setIndex(0)
      setResumed(false)
      setPhase('taking')
    } catch (startError) {
      setError(apiErrorMessage(startError, t('quizTake.startError')))
    } finally {
      setBusy(false)
    }
  }

  const retake = () => {
    if (quizId) clearQuizAttempt(quizId)
    attemptRef.current = null
    answersRef.current = {}
    syncedRef.current = new Set()
    deadlineRef.current = null
    submittedRef.current = false
    setAnswers({})
    setUnsyncedCount(0)
    setResult(null)
    setIndex(0)
    setRemaining(null)
    setElapsed(0)
    setResumed(false)
    setError(null)
    setPhase('intro')
  }

  const backHref = `/learn/${courseId}`

  if (quizRef.isLoading || (quizId && quizQuery.isLoading)) return <PageSpinner />

  if (quizRef.isError || !quizId) {
    const forbidden = apiErrorStatus(quizRef.error) === 403
    return (
      <Card className="mx-auto max-w-lg space-y-2 p-8 text-center">
        <ClipboardList size={36} className="mx-auto text-content-muted" />
        <h1 className="text-base font-bold text-content">
          {forbidden ? t('quizTake.notEnrolled') : t('quizTake.notAvailable')}
        </h1>
        <p className="text-sm text-content-secondary">
          {forbidden ? t('quizTake.notEnrolledBody') : t('quizTake.notAvailableBody')}
        </p>
        <Link href={backHref} className="inline-block pt-2">
          <Button variant="outline">{t('quizTake.backToCourse')}</Button>
        </Link>
      </Card>
    )
  }

  if (quizQuery.isError || !quizQuery.data) {
    return (
      <Card className="mx-auto max-w-lg p-8 text-center text-sm text-content-secondary">
        {apiErrorMessage(quizQuery.error, t('quizTake.loadError'))}
      </Card>
    )
  }

  // ── 4. Result ──────────────────────────────────────────────────────
  if (phase === 'result' && result) {
    const percentage = Math.round(result.score)
    const accuracy = result.totalQuestions
      ? Math.round((result.correctCount / result.totalQuestions) * 100)
      : 0
    return (
      <div className="mx-auto max-w-lg space-y-4">
        <Card className="p-8 text-center">
          <ScoreRing value={percentage} passed={result.passed} />
          <h1 className={cn('mt-4 text-lg font-bold', result.passed ? 'text-success' : 'text-warning')}>
            {result.passed ? t('quizTake.greatJob') : t('quizTake.keepPracticing')}
          </h1>
          <p className="mt-1 text-sm text-content-secondary">
            {t('quizTake.scoredOutOf')
              .replace('{correct}', String(result.correctCount))
              .replace('{total}', String(result.totalQuestions))}
          </p>
          <p className="mt-1 text-sm font-semibold text-content">
            {result.passed ? t('quizTake.youPassed') : t('quizTake.notPassed')}
          </p>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <StatTile icon={Target} label={t('quizTake.score')} value={`${result.correctCount}/${result.totalQuestions}`} />
          <StatTile icon={Clock} label={t('quizTake.timeTaken')} value={clock(elapsed)} />
          <StatTile icon={Gauge} label={t('quizTake.accuracy')} value={`${accuracy}%`} />
          <StatTile
            icon={Trophy}
            label={t('quizTake.passingScore')}
            value={`${passingScore}%`}
          />
        </div>

        <Card
          className={cn(
            'flex items-start gap-3 p-4',
            result.passed ? 'bg-success-soft' : 'bg-warning-soft',
          )}
        >
          <Trophy size={20} className={cn('mt-0.5 shrink-0', result.passed ? 'text-success' : 'text-warning')} />
          <div>
            <p className="text-sm font-bold text-content">
              {result.passed ? t('quizTake.keepItUp') : t('quizTake.reviewAndRetry')}
            </p>
            <p className="mt-0.5 text-xs leading-5 text-content-secondary">
              {result.passed ? t('quizTake.keepItUpBody') : t('quizTake.reviewAndRetryBody')}
            </p>
          </div>
        </Card>

        <div className="space-y-2">
          <Button fullWidth size="lg" onClick={() => setPhase('review')}>
            {t('quizTake.reviewAnswers')}
          </Button>
          <Button fullWidth size="lg" variant="outline" onClick={retake}>
            <Repeat size={16} /> {t('quizTake.retake')}
          </Button>
          <Link href={backHref} className="block">
            <Button fullWidth variant="ghost">
              {t('quizTake.backToCourse')}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // ── 3. Review ──────────────────────────────────────────────────────
  if (phase === 'review') {
    const rows = questions.filter((question) =>
      reviewFilter === 'ALL'
        ? true
        : reviewFilter === 'ANSWERED'
          ? Boolean(answers[question.id])
          : !answers[question.id],
    )
    const submitted = Boolean(result)
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPhase(submitted ? 'result' : 'taking')}
            aria-label={t('quizTake.back')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-content-secondary"
          >
            <ArrowLeft size={16} className="rtl:rotate-180" />
          </button>
          <h1 className="text-lg font-bold text-content">{t('quizTake.reviewYourAnswers')}</h1>
        </div>

        <TabBar
          items={[
            { value: 'ALL' as ReviewFilter, label: `${t('quizTake.all')} (${questions.length})` },
            { value: 'ANSWERED' as ReviewFilter, label: `${t('quizTake.answered')} (${answeredCount})` },
            {
              value: 'UNANSWERED' as ReviewFilter,
              label: `${t('quizTake.unanswered')} (${questions.length - answeredCount})`,
            },
          ]}
          value={reviewFilter}
          onChange={setReviewFilter}
        />

        <div className="space-y-2.5">
          {rows.map((question) => {
            const selected = answers[question.id]
            const optionIndex = question.options.findIndex((option) => option.id === selected)
            return (
              <Card
                key={question.id}
                className={cn('flex items-start gap-3 p-4', !selected && 'bg-warning-soft')}
              >
                <span
                  className={cn(
                    'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                    selected ? 'bg-success-soft text-success' : 'bg-warning-soft text-warning',
                  )}
                >
                  {selected ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-content">
                    {questions.indexOf(question) + 1}. {question.questionText}
                  </p>
                  <p
                    className={cn(
                      'mt-1 text-xs font-semibold',
                      selected ? 'text-success' : 'text-warning',
                    )}
                  >
                    {selected
                      ? `${t('quizTake.yourAnswer')}: ${LETTERS[optionIndex] ?? ''} — ${question.options[optionIndex]?.text ?? ''}`
                      : t('quizTake.noAnswer')}
                  </p>
                </div>
                {!submitted && (
                  <button
                    type="button"
                    onClick={() => {
                      setIndex(questions.indexOf(question))
                      setPhase('taking')
                    }}
                    className="shrink-0 text-xs font-semibold text-primary"
                  >
                    {t('quizTake.goToQuestion')}
                  </button>
                )}
              </Card>
            )
          })}
        </div>

        {error && <p className="text-center text-sm text-error">{error}</p>}

        {!submitted && (
          <>
            {unsyncedCount > 0 && (
              <p className="text-center text-xs text-content-secondary">
                {t('quizTake.pendingSync').replace('{n}', String(unsyncedCount))}
              </p>
            )}
            <Button fullWidth size="lg" loading={busy} onClick={submit}>
              {t('quizTake.seeResults')}
            </Button>
          </>
        )}
      </div>
    )
  }

  // ── 1. Intro ───────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div className="mx-auto max-w-lg space-y-4">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-content-secondary hover:text-content"
        >
          <ArrowLeft size={15} className="rtl:rotate-180" /> {t('quizTake.backToCourse')}
        </Link>

        <Card className="p-6 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-soft text-on-brand-soft">
            <ClipboardList size={30} strokeWidth={1.7} />
          </span>
          <h1 className="mt-4 text-xl font-bold text-content">{t('quizTake.title')}</h1>
          <p className="mt-1.5 text-sm text-content-secondary">{t('quizTake.introBody')}</p>
        </Card>

        <Card className="divide-y divide-border">
          <IntroRow
            icon={ClipboardList}
            title={`${questions.length} ${questions.length === 1 ? t('quizTake.question') : t('quizTake.questions')}`}
            subtitle={t('quizTake.multipleChoice')}
          />
          <IntroRow
            icon={Clock}
            title={timeLimit ? `${timeLimit} ${t('quizTake.min')}` : t('quizTake.noTimeLimit')}
            subtitle={t('quizTake.estimatedTime')}
          />
          <IntroRow
            icon={Target}
            title={`${passingScore}%`}
            subtitle={t('quizTake.passingScore')}
          />
          <IntroRow
            icon={RefreshCw}
            title={
              !quizRef.data?.maxAttempts
                ? t('quizTake.unlimitedAttempts')
                : quizRef.data.maxAttempts === 1
                  ? t('quizTake.attemptsOne')
                  : t('quizTake.attemptsN').replace('{n}', String(quizRef.data.maxAttempts))
            }
            subtitle={t('quizTake.keepImproving')}
          />
        </Card>

        {error && <p className="text-center text-sm text-error">{error}</p>}

        <Button fullWidth size="lg" loading={busy} onClick={start} disabled={!questions.length}>
          {t('quizTake.startQuiz')} <ArrowRight size={17} className="rtl:rotate-180" />
        </Button>
        {!questions.length && (
          <p className="text-center text-xs text-content-secondary">{t('quizTake.noQuestions')}</p>
        )}
      </div>
    )
  }

  // ── 2. Question ────────────────────────────────────────────────────
  const question = questions[index]
  const progressPercent = ((index + 1) / questions.length) * 100

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center gap-3">
        <Link
          href={backHref}
          aria-label={t('quizTake.exit')}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-content-secondary"
        >
          <X size={16} />
        </Link>
        <p className="flex-1 text-center text-sm font-semibold text-content">
          {t('quizTake.questionOf')
            .replace('{n}', String(index + 1))
            .replace('{total}', String(questions.length))}
        </p>
        <span className="w-16 text-end font-mono text-sm font-semibold text-content-secondary">
          {remaining === null ? clock(elapsed) : clock(remaining)}
        </span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/70">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {resumed && (
        <Card className="flex items-start gap-2.5 bg-brand-soft/60 p-3.5">
          <RefreshCw size={16} className="mt-0.5 shrink-0 text-primary" />
          <p className="text-xs leading-5 text-content-secondary">{t('quizTake.resumed')}</p>
        </Card>
      )}

      <h1 className="text-lg font-bold leading-7 text-content">{question.questionText}</h1>

      <div
        role="radiogroup"
        aria-label={question.questionText}
        className="space-y-2.5"
      >
        {question.options.map((option, optionIndex) => {
          const selected = answers[question.id] === option.id
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => select(question.id, option.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-card border p-4 text-start text-sm transition-colors',
                selected
                  ? 'border-primary bg-brand-soft text-content'
                  : 'border-border bg-surface text-content-secondary hover:border-primary/40',
              )}
            >
              <span
                className={cn(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
                  selected ? 'border-primary' : 'border-border-strong',
                )}
              >
                {selected && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
              </span>
              <span className="shrink-0 font-bold text-content-muted">{LETTERS[optionIndex]}</span>
              <span className="flex-1">{option.text}</span>
            </button>
          )
        })}
      </div>

      <Card className="flex items-start gap-2.5 bg-brand-soft/60 p-3.5">
        <Lightbulb size={17} className="mt-0.5 shrink-0 text-primary" />
        <div>
          <p className="text-xs font-bold text-content">{t('quizTake.studyTip')}</p>
          <p className="mt-0.5 text-xs leading-5 text-content-secondary">{t('quizTake.studyTipBody')}</p>
        </div>
      </Card>

      {error && <p className="text-center text-sm text-error">{error}</p>}

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          fullWidth
          disabled={index === 0}
          onClick={() => setIndex((value) => Math.max(0, value - 1))}
        >
          <ArrowLeft size={16} className="rtl:rotate-180" /> {t('quizTake.previous')}
        </Button>
        {index < questions.length - 1 ? (
          <Button fullWidth onClick={() => setIndex((value) => value + 1)}>
            {t('quizTake.next')} <ArrowRight size={16} className="rtl:rotate-180" />
          </Button>
        ) : (
          <Button fullWidth onClick={() => setPhase('review')}>
            {t('quizTake.reviewAnswers')}
          </Button>
        )}
      </div>

      <p className="text-center text-xs text-content-secondary">
        {answeredCount}/{questions.length} {t('quizTake.answered')}
      </p>
      {/* Saving is silent when it works; only a backlog is worth a word, so the
          learner knows an offline moment did not throw their answers away. */}
      {unsyncedCount > 0 && (
        <p className="text-center text-xs text-warning">
          {t('quizTake.pendingSync').replace('{n}', String(unsyncedCount))}
        </p>
      )}
    </div>
  )
}

function IntroRow({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof Clock
  title: string
  subtitle: string
}) {
  return (
    <div className="flex items-center gap-3 p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-on-brand-soft">
        <Icon size={18} strokeWidth={1.9} />
      </span>
      <span>
        <span className="block text-sm font-bold text-content">{title}</span>
        <span className="block text-xs text-content-secondary">{subtitle}</span>
      </span>
    </div>
  )
}

function StatTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock
  label: string
  value: string
}) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-on-brand-soft">
        <Icon size={18} strokeWidth={1.9} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-xs text-content-secondary">{label}</span>
        <span className="block truncate text-base font-bold text-content">{value}</span>
      </span>
    </Card>
  )
}

/** The circular score gauge from the result screen. */
function ScoreRing({ value, passed }: { value: number; passed: boolean }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const filled = Math.max(0, Math.min(100, value))
  return (
    <div className="relative mx-auto h-32 w-32">
      <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          strokeWidth="10"
          className="stroke-border/70"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (filled / 100) * circumference}
          className={passed ? 'stroke-success' : 'stroke-warning'}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-content">
        {filled}%
      </span>
    </div>
  )
}
