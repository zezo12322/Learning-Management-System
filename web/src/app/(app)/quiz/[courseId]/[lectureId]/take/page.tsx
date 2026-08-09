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
import { quizApi } from '@/lib/api/services'
import { apiErrorMessage, apiErrorStatus } from '@/lib/api/client'
import { useT } from '@/lib/i18n'
import type { QuizResult, TakeQuestion } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PageSpinner } from '@/components/ui/spinner'
import { TabBar } from '@/components/student/FilterChips'
import { cn } from '@/lib/utils'

type Phase = 'intro' | 'taking' | 'review' | 'result'
type ReviewFilter = 'ALL' | 'ANSWERED' | 'UNANSWERED'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

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
  const [attemptId, setAttemptId] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [index, setIndex] = useState(0)
  const [result, setResult] = useState<QuizResult | null>(null)
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('ALL')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [remaining, setRemaining] = useState<number | null>(null)
  const [elapsed, setElapsed] = useState(0)

  const questions = useMemo<TakeQuestion[]>(() => quizQuery.data?.questions ?? [], [quizQuery.data])
  const answeredCount = Object.keys(answers).length
  const timeLimit = quizQuery.data?.timeLimitMinutes ?? quizRef.data?.timeLimitMinutes
  const passingScore = quizRef.data?.passingScore ?? 70

  const submit = useCallback(async () => {
    if (!quizId || !attemptId) return
    setBusy(true)
    setError(null)
    try {
      for (const question of questions) {
        const selected = answers[question.id]
        if (selected) {
          await quizApi.submitAnswer(courseId, quizId, attemptId, {
            questionId: question.id,
            selectedOptionId: selected,
          })
        }
      }
      setResult(await quizApi.finishAttempt(courseId, quizId, attemptId))
      setPhase('result')
    } catch (submitError) {
      setError(apiErrorMessage(submitError, t('quizTake.submitError')))
    } finally {
      setBusy(false)
    }
  }, [quizId, attemptId, questions, answers, courseId, t])

  // One ticker drives both the countdown and the elapsed time shown on the
  // result card. Auto-submit fires exactly once, when the limit runs out.
  const submitRef = useRef(submit)
  submitRef.current = submit
  useEffect(() => {
    if (phase !== 'taking' && phase !== 'review') return
    const timer = window.setInterval(() => {
      setElapsed((value) => value + 1)
      setRemaining((value) => {
        if (value === null) return null
        if (value <= 1) {
          void submitRef.current()
          return 0
        }
        return value - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [phase])

  const start = async () => {
    if (!quizId) return
    setBusy(true)
    setError(null)
    try {
      setAttemptId(await quizApi.startAttempt(courseId, quizId))
      setRemaining(timeLimit ? timeLimit * 60 : null)
      setElapsed(0)
      setIndex(0)
      setPhase('taking')
    } catch (startError) {
      setError(apiErrorMessage(startError, t('quizTake.startError')))
    } finally {
      setBusy(false)
    }
  }

  const retake = () => {
    setAnswers({})
    setAttemptId(null)
    setResult(null)
    setIndex(0)
    setRemaining(null)
    setElapsed(0)
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
            result.passed ? 'bg-success/5' : 'bg-warning/5',
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
                className={cn('flex items-start gap-3 p-4', !selected && 'bg-warning/5')}
              >
                <span
                  className={cn(
                    'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                    selected ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning',
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
          <Button fullWidth size="lg" loading={busy} onClick={submit}>
            {t('quizTake.seeResults')}
          </Button>
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
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-soft text-primary">
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
              quizRef.data?.maxAttempts
                ? t('quizTake.attemptsN').replace('{n}', String(quizRef.data.maxAttempts))
                : t('quizTake.unlimitedAttempts')
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
              onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: option.id }))}
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
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-primary">
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
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-primary">
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
