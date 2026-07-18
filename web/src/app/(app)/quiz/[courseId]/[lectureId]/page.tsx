'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Check, Plus, Trash2, X } from 'lucide-react'
import { quizApi, type QuestionInput } from '@/lib/api/services'
import { apiErrorMessage } from '@/lib/api/client'
import { getCachedQuizId, setCachedQuizId } from '@/lib/quizCache'
import type { Quiz, QuizQuestion, QuizSettings } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageSpinner } from '@/components/ui/spinner'

export default function QuizEditorPage() {
  const params = useParams<{ courseId: string; lectureId: string }>()
  const courseId = params.courseId
  const lectureId = params.lectureId
  const qc = useQueryClient()

  const [ready, setReady] = useState(false)
  const [quizId, setQuizId] = useState<string | null>(null)

  useEffect(() => {
    setQuizId(getCachedQuizId(lectureId))
    setReady(true)
  }, [lectureId])

  const quizQuery = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: () => quizApi.get(courseId, quizId as string),
    enabled: ready && !!quizId,
  })

  const createQuiz = useMutation({
    mutationFn: (settings: QuizSettings) => quizApi.create(courseId, lectureId, settings),
    onSuccess: (newId) => {
      if (newId) {
        setCachedQuizId(lectureId, newId)
        setQuizId(newId)
      }
    },
  })

  const invalidate = () => qc.invalidateQueries({ queryKey: ['quiz', quizId] })

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href={`/studio/${courseId}/curriculum`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-content-secondary hover:text-content"
      >
        <ArrowLeft size={15} /> Back to curriculum
      </Link>

      <div>
        <h1 className="text-title-md font-bold text-content">Quiz editor</h1>
        <p className="text-sm text-content-secondary">
          Build the quiz for this lesson — settings, questions and answer options.
        </p>
      </div>

      {!ready ? (
        <PageSpinner />
      ) : !quizId ? (
        <CreateQuizForm
          pending={createQuiz.isPending}
          error={createQuiz.isError ? apiErrorMessage(createQuiz.error, 'Could not create the quiz.') : null}
          onCreate={(settings) => createQuiz.mutate(settings)}
        />
      ) : quizQuery.isLoading ? (
        <PageSpinner />
      ) : quizQuery.isError || !quizQuery.data ? (
        <Card className="space-y-3 p-6 text-center">
          <p className="text-sm text-content-secondary">
            {apiErrorMessage(quizQuery.error, 'This quiz could not be loaded.')}
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setQuizId(null)
              createQuiz.reset()
            }}
          >
            Start over
          </Button>
        </Card>
      ) : (
        <QuizBody
          quiz={quizQuery.data}
          courseId={courseId}
          onChanged={invalidate}
        />
      )}
    </div>
  )
}

/* ── Create quiz (settings only) ─────────────────────────────────────── */
function CreateQuizForm({
  onCreate,
  pending,
  error,
}: {
  onCreate: (settings: QuizSettings) => void
  pending: boolean
  error: string | null
}) {
  const [passingScore, setPassingScore] = useState(60)
  const [maxAttempts, setMaxAttempts] = useState(3)
  const [timeLimit, setTimeLimit] = useState('')

  return (
    <Card className="space-y-4 p-6">
      <div>
        <h2 className="text-base font-semibold text-content">Create the quiz</h2>
        <p className="text-xs text-content-secondary">Set the grading rules, then add questions.</p>
      </div>
      <SettingsFields
        passingScore={passingScore}
        maxAttempts={maxAttempts}
        timeLimit={timeLimit}
        setPassingScore={setPassingScore}
        setMaxAttempts={setMaxAttempts}
        setTimeLimit={setTimeLimit}
      />
      {error && <p className="text-sm text-error">{error}</p>}
      <Button
        loading={pending}
        onClick={() =>
          onCreate({
            passingScore,
            maxAttempts,
            timeLimitMinutes: timeLimit ? Number(timeLimit) : undefined,
          })
        }
      >
        Create quiz
      </Button>
    </Card>
  )
}

/* ── Loaded quiz: settings + questions ───────────────────────────────── */
function QuizBody({
  quiz,
  courseId,
  onChanged,
}: {
  quiz: Quiz
  courseId: string
  onChanged: () => void
}) {
  const [adding, setAdding] = useState(false)

  const updateSettings = useMutation({
    mutationFn: (settings: Partial<QuizSettings>) => quizApi.updateSettings(courseId, quiz.id, settings),
    onSuccess: onChanged,
  })
  const createQuestion = useMutation({
    mutationFn: (q: QuestionInput) => quizApi.createQuestion(courseId, quiz.id, q),
    onSuccess: () => {
      setAdding(false)
      onChanged()
    },
  })

  const [passingScore, setPassingScore] = useState(quiz.passingScore)
  const [maxAttempts, setMaxAttempts] = useState(quiz.maxAttempts)
  const [timeLimit, setTimeLimit] = useState(quiz.timeLimitMinutes ? String(quiz.timeLimitMinutes) : '')

  return (
    <div className="space-y-6">
      <Card className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-content">Settings</h2>
          <Badge tone="muted">{quiz.questions.length} questions</Badge>
        </div>
        <SettingsFields
          passingScore={passingScore}
          maxAttempts={maxAttempts}
          timeLimit={timeLimit}
          setPassingScore={setPassingScore}
          setMaxAttempts={setMaxAttempts}
          setTimeLimit={setTimeLimit}
        />
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            loading={updateSettings.isPending}
            onClick={() =>
              updateSettings.mutate({
                passingScore,
                maxAttempts,
                timeLimitMinutes: timeLimit ? Number(timeLimit) : undefined,
              })
            }
          >
            Save settings
          </Button>
          {updateSettings.isSuccess && <span className="text-xs text-success">Saved</span>}
          {updateSettings.isError && (
            <span className="text-xs text-error">
              {apiErrorMessage(updateSettings.error, 'Could not save.')}
            </span>
          )}
        </div>
      </Card>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-content">Questions</h2>
          {!adding && (
            <Button size="sm" variant="outline" onClick={() => setAdding(true)}>
              <Plus size={15} /> Add question
            </Button>
          )}
        </div>

        {quiz.questions.length === 0 && !adding && (
          <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-content-secondary">
            No questions yet. Add the first one.
          </p>
        )}

        {quiz.questions.map((question, i) => (
          <QuestionCard
            key={question.id}
            index={i}
            question={question}
            courseId={courseId}
            quizId={quiz.id}
            onChanged={onChanged}
          />
        ))}

        {adding && (
          <QuestionForm
            submitting={createQuestion.isPending}
            error={createQuestion.isError ? apiErrorMessage(createQuestion.error, 'Could not add the question.') : null}
            onCancel={() => setAdding(false)}
            onSubmit={(q) => createQuestion.mutate(q)}
          />
        )}
      </div>
    </div>
  )
}

/* ── A single question (view + edit/delete) ──────────────────────────── */
function QuestionCard({
  index,
  question,
  courseId,
  quizId,
  onChanged,
}: {
  index: number
  question: QuizQuestion
  courseId: string
  quizId: string
  onChanged: () => void
}) {
  const [editing, setEditing] = useState(false)

  const updateQuestion = useMutation({
    mutationFn: (q: QuestionInput) => quizApi.updateQuestion(courseId, quizId, question.id, q),
    onSuccess: () => {
      setEditing(false)
      onChanged()
    },
  })
  const deleteQuestion = useMutation({
    mutationFn: () => quizApi.deleteQuestion(courseId, quizId, question.id),
    onSuccess: onChanged,
  })

  if (editing) {
    return (
      <QuestionForm
        initial={question}
        submitting={updateQuestion.isPending}
        error={updateQuestion.isError ? apiErrorMessage(updateQuestion.error, 'Could not save the question.') : null}
        onCancel={() => setEditing(false)}
        onSubmit={(q) => updateQuestion.mutate(q)}
      />
    )
  }

  return (
    <Card className="space-y-3 p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-content">
          <span className="text-content-secondary">{index + 1}.</span> {question.questionText}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <Badge tone="muted">{question.points} pt</Badge>
          <button
            type="button"
            aria-label="Edit question"
            onClick={() => setEditing(true)}
            className="text-content-secondary hover:text-content"
          >
            Edit
          </button>
          <button
            type="button"
            aria-label="Delete question"
            onClick={() => deleteQuestion.mutate()}
            className="text-content-secondary hover:text-error"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
      <ul className="space-y-1.5">
        {question.options.map((option, oi) => (
          <li key={option.id ?? oi} className="flex items-center gap-2 text-sm">
            <span
              className={
                option.isCorrect
                  ? 'inline-flex h-4 w-4 items-center justify-center rounded-full bg-success text-white'
                  : 'inline-flex h-4 w-4 items-center justify-center rounded-full border border-border'
              }
            >
              {option.isCorrect && <Check size={11} />}
            </span>
            <span className={option.isCorrect ? 'text-content' : 'text-content-secondary'}>{option.text}</span>
          </li>
        ))}
      </ul>
      {question.explanation && (
        <p className="rounded-lg bg-surface-hover p-2 text-xs text-content-secondary">
          Explanation: {question.explanation}
        </p>
      )}
      {deleteQuestion.isError && (
        <p className="text-xs text-error">{apiErrorMessage(deleteQuestion.error, 'Could not delete.')}</p>
      )}
    </Card>
  )
}

/* ── Add / edit question form ────────────────────────────────────────── */
type OptionDraft = { id?: string; text: string }

function QuestionForm({
  initial,
  onSubmit,
  onCancel,
  submitting,
  error,
}: {
  initial?: QuizQuestion
  onSubmit: (q: QuestionInput) => void
  onCancel: () => void
  submitting: boolean
  error: string | null
}) {
  const [text, setText] = useState(initial?.questionText ?? '')
  const [points, setPoints] = useState(initial?.points ?? 1)
  const [explanation, setExplanation] = useState(initial?.explanation ?? '')
  const [options, setOptions] = useState<OptionDraft[]>(
    initial?.options.map((o) => ({ id: o.id, text: o.text })) ?? [{ text: '' }, { text: '' }],
  )
  const [correct, setCorrect] = useState(
    Math.max(0, initial?.options.findIndex((o) => o.isCorrect) ?? 0),
  )
  const [localError, setLocalError] = useState<string | null>(null)

  const setOptionText = (i: number, value: string) =>
    setOptions((prev) => prev.map((o, idx) => (idx === i ? { ...o, text: value } : o)))

  const addOption = () => setOptions((prev) => [...prev, { text: '' }])
  const removeOption = (i: number) => {
    setOptions((prev) => prev.filter((_, idx) => idx !== i))
    setCorrect((c) => (i === c ? 0 : i < c ? c - 1 : c))
  }

  const submit = () => {
    const cleanText = text.trim()
    const filled = options.map((o) => ({ ...o, text: o.text.trim() })).filter((o) => o.text)
    if (!cleanText) return setLocalError('Enter the question text.')
    if (filled.length < 2) return setLocalError('Provide at least two answer options.')
    if (correct >= filled.length) return setLocalError('Choose which option is correct.')
    setLocalError(null)
    onSubmit({
      questionText: cleanText,
      points: Number(points) || 1,
      explanation: explanation.trim() || undefined,
      options: filled.map((o, i) => ({ id: o.id, text: o.text, isCorrect: i === correct })),
    })
  }

  return (
    <Card className="space-y-4 border-primary/40 p-4">
      <div className="space-y-1.5">
        <Label htmlFor="q-text">Question</Label>
        <Input id="q-text" value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g. What does HTTP stand for?" />
      </div>

      <div className="space-y-2">
        <Label>Answer options (select the correct one)</Label>
        {options.map((option, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="radio"
              name="correct-option"
              checked={correct === i}
              onChange={() => setCorrect(i)}
              aria-label={`Mark option ${i + 1} correct`}
              className="h-4 w-4 accent-primary"
            />
            <Input
              value={option.text}
              onChange={(e) => setOptionText(i, e.target.value)}
              placeholder={`Option ${i + 1}`}
            />
            {options.length > 2 && (
              <button
                type="button"
                aria-label={`Remove option ${i + 1}`}
                onClick={() => removeOption(i)}
                className="shrink-0 text-content-secondary hover:text-error"
              >
                <X size={15} />
              </button>
            )}
          </div>
        ))}
        <Button type="button" size="sm" variant="ghost" onClick={addOption}>
          <Plus size={14} /> Add option
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="q-points">Points</Label>
          <Input
            id="q-points"
            type="number"
            min={0}
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="q-exp">Explanation (optional)</Label>
          <Input id="q-exp" value={explanation} onChange={(e) => setExplanation(e.target.value)} />
        </div>
      </div>

      {(localError || error) && <p className="text-sm text-error">{localError ?? error}</p>}

      <div className="flex items-center gap-2">
        <Button size="sm" loading={submitting} onClick={submit}>
          {initial ? 'Save question' : 'Add question'}
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Card>
  )
}

/* ── Shared settings fields ──────────────────────────────────────────── */
function SettingsFields({
  passingScore,
  maxAttempts,
  timeLimit,
  setPassingScore,
  setMaxAttempts,
  setTimeLimit,
}: {
  passingScore: number
  maxAttempts: number
  timeLimit: string
  setPassingScore: (n: number) => void
  setMaxAttempts: (n: number) => void
  setTimeLimit: (s: string) => void
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="space-y-1.5">
        <Label htmlFor="passing">Passing score (%)</Label>
        <Input
          id="passing"
          type="number"
          min={0}
          max={100}
          value={passingScore}
          onChange={(e) => setPassingScore(Number(e.target.value))}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="attempts">Max attempts</Label>
        <Input
          id="attempts"
          type="number"
          min={1}
          value={maxAttempts}
          onChange={(e) => setMaxAttempts(Number(e.target.value))}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="time">Time limit (min, optional)</Label>
        <Input
          id="time"
          type="number"
          min={1}
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
          placeholder="—"
        />
      </div>
    </div>
  )
}
