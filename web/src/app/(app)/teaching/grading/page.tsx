'use client'

import { useMemo, useState } from 'react'
import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import { CheckCircle2, ExternalLink, GraduationCap, Target, UserRound } from 'lucide-react'
import { gradingApi, missionsApi } from '@/lib/api/services'
import { apiErrorMessage, apiErrorStatus } from '@/lib/api/client'
import { useAuth } from '@/lib/auth/AuthProvider'
import { useI18n } from '@/lib/i18n'
import { safeLinkUrl } from '@/lib/safeUrl'
import type { RubricCriterion } from '@/lib/types'
import { PageHeader } from '@/components/workspace/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'

function formatDateTime(value: string, locale: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

/**
 * The grading queue: submissions waiting on a grade, and the rubric form that
 * closes each one.
 *
 * `GET /submissions/pending` is already scoped server-side to missions the caller
 * owns, so this page shows exactly the work that is theirs to mark. Scores are
 * validated against the mission's own criteria server-side — a score above a
 * criterion's `maxPoints`, or a criterion from another mission, is a 400 — so the
 * form only offers the real rubric and caps each field at its own maximum.
 */
export default function GradingPage() {
  const { t, locale } = useI18n()
  const queryClient = useQueryClient()
  const { roles } = useAuth()
  const canGrade = roles.includes('admin') || roles.includes('instructor')

  const [openId, setOpenId] = useState<string | null>(null)
  const [scores, setScores] = useState<Record<string, string>>({})
  const [feedback, setFeedback] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const pending = useQuery({
    queryKey: ['pending-submissions'],
    queryFn: gradingApi.pending,
    enabled: canGrade,
  })
  const items = useMemo(() => pending.data ?? [], [pending.data])

  // One fetch per distinct mission in the queue: the rubric lives on the mission
  // and the queue rows only carry its id.
  const missionIds = useMemo(
    () => [...new Set(items.map((item) => item.missionId).filter(Boolean))],
    [items],
  )
  const missionQueries = useQueries({
    queries: missionIds.map((id) => ({
      queryKey: ['mission', id],
      queryFn: () => missionsApi.get(id),
      staleTime: 5 * 60 * 1000,
    })),
  })
  const rubrics = useMemo(() => {
    const byMission = new Map<string, RubricCriterion[]>()
    missionIds.forEach((id, index) => {
      const data = missionQueries[index]?.data
      if (data) byMission.set(id, data.criteria)
    })
    return byMission
  }, [missionIds, missionQueries])

  const grade = useMutation({
    mutationFn: ({ submissionId, missionId }: { submissionId: string; missionId: string }) => {
      const criteria = rubrics.get(missionId) ?? []
      const scored = criteria
        .filter((criterion) => scores[criterion.id]?.trim())
        .map((criterion) => ({ criterionId: criterion.id, score: Number(scores[criterion.id]) }))
      return gradingApi.grade(submissionId, {
        feedback: feedback.trim() || undefined,
        scores: scored.length ? scored : undefined,
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['pending-submissions'] })
      setOpenId(null)
      setScores({})
      setFeedback('')
      setFormError(null)
      setNotice(t('teaching.grading.graded'))
      window.setTimeout(() => setNotice(null), 1800)
    },
    onError: (error) => setFormError(apiErrorMessage(error, t('teaching.grading.error'))),
  })

  const open = (submissionId: string) => {
    setOpenId(submissionId)
    setScores({})
    setFeedback('')
    setFormError(null)
  }

  const submitGrade = (submissionId: string, missionId: string) => {
    const criteria = rubrics.get(missionId) ?? []
    for (const criterion of criteria) {
      const raw = scores[criterion.id]?.trim()
      if (!raw) continue
      const value = Number(raw)
      if (!Number.isFinite(value) || value < 0 || value > criterion.maxPoints) {
        setFormError(
          t('teaching.grading.scoreRange')
            .replace('{name}', criterion.name)
            .replace('{max}', String(criterion.maxPoints)),
        )
        return
      }
    }
    const hasScore = criteria.some((criterion) => scores[criterion.id]?.trim())
    if (!hasScore && !feedback.trim()) {
      setFormError(t('teaching.grading.needSomething'))
      return
    }
    setFormError(null)
    grade.mutate({ submissionId, missionId })
  }

  if (!canGrade) {
    return (
      <div className="space-y-6">
        <PageHeader title={t('teaching.grading.title')} />
        <Card className="border-error bg-error-soft p-6 text-sm text-error">
          {t('teaching.grading.accessDenied')}
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('teaching.grading.title')}
        description={t('teaching.grading.subtitle')}
        action={notice ? <span className="text-xs font-medium text-success">{notice}</span> : undefined}
      />

      {pending.isError && (
        <Card className="border-error bg-error-soft p-4 text-sm text-error">
          {apiErrorStatus(pending.error) === 403
            ? t('teaching.grading.accessDenied')
            : t('teaching.grading.loadError')}
        </Card>
      )}

      {pending.isPending ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-24 rounded-card" />
          ))}
        </div>
      ) : items.length ? (
        <div className="space-y-3">
          {items.map((submission) => {
            const criteria = rubrics.get(submission.missionId) ?? []
            const link = safeLinkUrl(submission.fileUrl)
            const isOpen = openId === submission.id
            const maxTotal = criteria.reduce((sum, criterion) => sum + criterion.maxPoints, 0)
            return (
              <Card key={submission.id} className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold text-content">{submission.missionTitle}</h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-content-secondary">
                      <span className="inline-flex items-center gap-1">
                        <UserRound size={12} /> {submission.studentName}
                      </span>
                      {submission.courseTitle && <span className="truncate">{submission.courseTitle}</span>}
                      <span>
                        {t('assignments.attemptN').replace('{n}', String(submission.attemptNumber))}
                      </span>
                      <span className="text-content-muted">
                        {formatDateTime(submission.submittedAt, locale)}
                      </span>
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {link && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-input border border-border px-2.5 py-1.5 text-[11px] font-semibold text-primary hover:bg-brand-soft"
                      >
                        <ExternalLink size={12} /> {t('teaching.grading.openWork')}
                      </a>
                    )}
                    {maxTotal > 0 && (
                      <Badge tone="muted">
                        <Target size={11} /> {maxTotal}
                      </Badge>
                    )}
                  </div>
                </div>

                {isOpen ? (
                  <div className="mt-4 space-y-3 border-t border-border pt-4">
                    {criteria.length ? (
                      <div className="space-y-2">
                        {criteria.map((criterion) => (
                          <div key={criterion.id} className="flex items-end gap-3">
                            <div className="min-w-0 flex-1">
                              <Label htmlFor={`score-${submission.id}-${criterion.id}`}>
                                {criterion.name}
                              </Label>
                              {criterion.description && (
                                <p className="mt-0.5 text-[11px] leading-5 text-content-secondary">
                                  {criterion.description}
                                </p>
                              )}
                            </div>
                            <div className="w-28 shrink-0">
                              <Input
                                id={`score-${submission.id}-${criterion.id}`}
                                value={scores[criterion.id] ?? ''}
                                onChange={(event) =>
                                  setScores((prev) => ({ ...prev, [criterion.id]: event.target.value }))
                                }
                                placeholder={`0–${criterion.maxPoints}`}
                                inputMode="numeric"
                                aria-label={`${criterion.name} (0–${criterion.maxPoints})`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Honest about the limit rather than showing an empty box:
                      // points require criteria, and only the author can add them.
                      <p className="rounded-input bg-warning-soft px-3 py-2 text-xs leading-5 text-warning">
                        {t('teaching.grading.noRubric')}
                      </p>
                    )}

                    <div>
                      <Label htmlFor={`feedback-${submission.id}`}>{t('teaching.grading.feedback')}</Label>
                      <textarea
                        id={`feedback-${submission.id}`}
                        value={feedback}
                        onChange={(event) => setFeedback(event.target.value)}
                        rows={4}
                        className="mt-2 w-full resize-y rounded-input border border-border bg-surface px-4 py-3 text-sm leading-6 text-content outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    {formError && (
                      <p className="rounded-input bg-error-soft px-3 py-2 text-xs text-error">{formError}</p>
                    )}
                    <p className="text-[11px] leading-5 text-content-muted">
                      {t('teaching.grading.completesNote')}
                    </p>

                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setOpenId(null)}
                        disabled={grade.isPending}
                      >
                        {t('common.cancel')}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => submitGrade(submission.id, submission.missionId)}
                        loading={grade.isPending}
                      >
                        <CheckCircle2 size={14} /> {t('teaching.grading.submit')}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" className="mt-3" onClick={() => open(submission.id)}>
                    <GraduationCap size={14} /> {t('teaching.grading.grade')}
                  </Button>
                )}
              </Card>
            )
          })}
        </div>
      ) : !pending.isError ? (
        <Card className="py-16 text-center">
          <CheckCircle2 className="mx-auto text-success" />
          <p className="mt-3 text-sm font-semibold text-content">{t('teaching.grading.empty')}</p>
          <p className="mt-1 text-xs text-content-secondary">{t('teaching.grading.emptyHint')}</p>
        </Card>
      ) : null}
    </div>
  )
}
