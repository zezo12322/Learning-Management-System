'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, ChevronDown, ChevronUp, Plus, Save, Target, Trash2 } from 'lucide-react'
import { missionsApi, rubricApi } from '@/lib/api/services'
import { apiErrorMessage, apiErrorStatus } from '@/lib/api/client'
import { useAuth } from '@/lib/auth/AuthProvider'
import { useT } from '@/lib/i18n'
import type { MissionDifficulty, RubricCriterion } from '@/lib/types'
import { PageHeader } from '@/components/workspace/PageHeader'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PageSpinner } from '@/components/ui/spinner'

const DIFFICULTIES: MissionDifficulty[] = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']

const selectClass =
  'mt-2 w-full rounded-input border border-border bg-surface px-3 py-3 text-sm text-content outline-none focus:border-primary'

/**
 * Edit one assignment and the rubric it is graded against.
 *
 * The rubric matters more than it looks: `POST /submissions/:id/grade` validates
 * every score against the mission's own criteria and rejects anything that is
 * not one of them, so an assignment with no rubric can only ever receive written
 * feedback — no points.
 */
export default function TeachingAssignmentDetailPage() {
  const t = useT()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { missionId } = useParams<{ missionId: string }>()
  const { roles } = useAuth()
  const canAuthor = roles.includes('admin') || roles.includes('instructor')

  const mission = useQuery({
    queryKey: ['mission', missionId],
    queryFn: () => missionsApi.get(missionId),
    enabled: canAuthor,
  })

  const [title, setTitle] = useState('')
  const [scenario, setScenario] = useState('')
  const [duration, setDuration] = useState('60')
  const [difficulty, setDifficulty] = useState<MissionDifficulty>('INTERMEDIATE')
  const [skills, setSkills] = useState('')
  const [detailError, setDetailError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const [criterionName, setCriterionName] = useState('')
  const [criterionDescription, setCriterionDescription] = useState('')
  const [criterionPoints, setCriterionPoints] = useState('10')
  const [rubricError, setRubricError] = useState<string | null>(null)
  const [confirmDeleteMission, setConfirmDeleteMission] = useState(false)

  // Seed the form from the server copy once it lands, and again whenever a save
  // refetches it, so the inputs never drift from what is stored.
  useEffect(() => {
    if (!mission.data) return
    setTitle(mission.data.title)
    setScenario(mission.data.scenario)
    setDuration(String(mission.data.durationMinutes))
    setDifficulty(mission.data.difficulty)
    setSkills(mission.data.skills.join(', '))
  }, [mission.data])

  const flash = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(null), 1800)
  }

  const saveDetails = useMutation({
    mutationFn: () =>
      missionsApi.update(missionId, {
        title: title.trim(),
        scenarioDescription: scenario.trim(),
        durationMinutes: Number(duration),
        difficulty,
        skillsTested: skills.split(',').map((skill) => skill.trim()).filter(Boolean),
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['mission', missionId] })
      await queryClient.invalidateQueries({ queryKey: ['authored-missions'] })
      setDetailError(null)
      flash(t('teaching.assignments.saved'))
    },
    onError: (error) => setDetailError(apiErrorMessage(error, t('teaching.assignments.saveError'))),
  })

  const addCriterion = useMutation({
    mutationFn: () =>
      rubricApi.create(missionId, {
        criterionName: criterionName.trim(),
        description: criterionDescription.trim() || undefined,
        maxPoints: Number(criterionPoints),
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['mission', missionId] })
      setCriterionName('')
      setCriterionDescription('')
      setCriterionPoints('10')
      setRubricError(null)
      flash(t('teaching.rubric.added'))
    },
    onError: (error) => setRubricError(apiErrorMessage(error, t('teaching.rubric.addError'))),
  })

  const removeCriterion = useMutation({
    mutationFn: (criterionId: string) => rubricApi.remove(missionId, criterionId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['mission', missionId] })
      setRubricError(null)
      flash(t('teaching.rubric.removed'))
    },
    onError: (error) => setRubricError(apiErrorMessage(error, t('teaching.rubric.removeError'))),
  })

  const reorderCriteria = useMutation({
    mutationFn: (orderedIds: string[]) => rubricApi.reorder(missionId, orderedIds),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['mission', missionId] }),
    onError: (error) => {
      setRubricError(apiErrorMessage(error, t('teaching.rubric.reorderError')))
      void queryClient.invalidateQueries({ queryKey: ['mission', missionId] })
    },
  })

  const deleteMission = useMutation({
    mutationFn: () => missionsApi.remove(missionId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['authored-missions'] })
      router.replace('/teaching/assignments')
    },
    onError: (error) => setDetailError(apiErrorMessage(error, t('teaching.assignments.deleteError'))),
  })

  if (!canAuthor) {
    return (
      <div className="space-y-6">
        <PageHeader title={t('teaching.assignments.title')} />
        <Card className="border-error bg-error-soft p-6 text-sm text-error">
          {t('teaching.assignments.accessDenied')}
        </Card>
      </div>
    )
  }

  if (mission.isError) {
    const denied = apiErrorStatus(mission.error) === 403
    return (
      <div className="space-y-6">
        <PageHeader title={t('teaching.assignments.title')} />
        <Card className="border-error bg-error-soft p-6 text-sm text-error">
          {denied ? t('teaching.assignments.notOwner') : t('teaching.assignments.loadError')}
        </Card>
        <Link href="/teaching/assignments" className="inline-flex">
          <Button variant="outline" size="sm">
            <ArrowLeft size={15} className="rtl:rotate-180" /> {t('teaching.assignments.backToList')}
          </Button>
        </Link>
      </div>
    )
  }

  if (!mission.data) return <PageSpinner />

  const criteria = mission.data.criteria
  const totalPoints = criteria.reduce((sum, criterion) => sum + criterion.maxPoints, 0)

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= criteria.length) return
    const next = [...criteria]
    ;[next[index], next[target]] = [next[target], next[index]]
    setRubricError(null)
    reorderCriteria.mutate(next.map((criterion: RubricCriterion) => criterion.id))
  }

  const submitCriterion = () => {
    const points = Number(criterionPoints)
    if (!criterionName.trim()) {
      setRubricError(t('teaching.rubric.nameRequired'))
      return
    }
    if (!Number.isFinite(points) || points <= 0) {
      setRubricError(t('teaching.rubric.pointsInvalid'))
      return
    }
    setRubricError(null)
    addCriterion.mutate()
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={mission.data.title}
        description={mission.data.course?.title ?? t('teaching.assignments.noCourse')}
        action={
          <div className="flex items-center gap-3">
            {notice && <span className="text-xs font-medium text-success">{notice}</span>}
            <Link href="/teaching/assignments">
              <Button variant="outline" size="sm">
                <ArrowLeft size={15} className="rtl:rotate-180" /> {t('teaching.assignments.backToList')}
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 rail:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="space-y-4 p-5 sm:p-6">
          <h2 className="text-base font-semibold text-content">{t('teaching.assignments.detailsTitle')}</h2>

          <div>
            <Label htmlFor="mission-title">{t('teaching.assignments.field.title')}</Label>
            <Input
              id="mission-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={160}
            />
          </div>

          <div>
            <Label htmlFor="mission-scenario">{t('teaching.assignments.field.brief')}</Label>
            <textarea
              id="mission-scenario"
              value={scenario}
              onChange={(event) => setScenario(event.target.value)}
              rows={6}
              className="mt-2 w-full resize-y rounded-input border border-border bg-surface px-4 py-3 text-sm leading-6 text-content outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="mission-duration">{t('teaching.assignments.field.duration')}</Label>
              <Input
                id="mission-duration"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
                inputMode="numeric"
              />
            </div>
            <div>
              <Label htmlFor="mission-difficulty">{t('teaching.assignments.field.difficulty')}</Label>
              <select
                id="mission-difficulty"
                value={difficulty}
                onChange={(event) => setDifficulty(event.target.value as MissionDifficulty)}
                className={selectClass}
              >
                {DIFFICULTIES.map((level) => (
                  <option key={level} value={level}>{t(`difficulty.${level}`, level)}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="mission-skills">{t('teaching.assignments.field.skills')}</Label>
            <Input
              id="mission-skills"
              value={skills}
              onChange={(event) => setSkills(event.target.value)}
              placeholder={t('teaching.assignments.skillsPlaceholder')}
            />
          </div>

          {detailError && <p className="rounded-input bg-error-soft px-3 py-2 text-xs text-error">{detailError}</p>}

          <div className="flex flex-wrap justify-between gap-2">
            {confirmDeleteMission ? (
              <span className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setConfirmDeleteMission(false)}
                  disabled={deleteMission.isPending}
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteMission.mutate()}
                  loading={deleteMission.isPending}
                >
                  <Trash2 size={14} /> {t('teaching.assignments.confirmDelete')}
                </Button>
              </span>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setConfirmDeleteMission(true)}>
                <Trash2 size={14} /> {t('teaching.assignments.delete')}
              </Button>
            )}
            <Button onClick={() => saveDetails.mutate()} loading={saveDetails.isPending}>
              <Save size={15} /> {t('teaching.assignments.save')}
            </Button>
          </div>
        </Card>

        <Card className="h-fit space-y-4 p-5 rail:sticky rail:top-24">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-content">{t('teaching.rubric.title')}</h2>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-content-secondary">
              <Target size={13} /> {totalPoints}
            </span>
          </div>
          <p className="text-xs leading-5 text-content-secondary">{t('teaching.rubric.hint')}</p>

          {criteria.length === 0 && (
            <p className="rounded-input bg-warning-soft px-3 py-2 text-xs leading-5 text-warning">
              {t('teaching.rubric.emptyWarning')}
            </p>
          )}

          <ul className="space-y-2">
            {criteria.map((criterion, index) => (
              <li key={criterion.id} className="rounded-input bg-subtle p-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold text-content">{criterion.name}</span>
                    {criterion.description && (
                      <span className="mt-0.5 block text-[11px] leading-5 text-content-secondary">
                        {criterion.description}
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 text-xs font-bold text-content-secondary">{criterion.maxPoints}</span>
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <button
                    onClick={() => move(index, -1)}
                    disabled={index === 0 || reorderCriteria.isPending}
                    className="rounded-lg p-1.5 text-content-muted hover:bg-surface hover:text-content disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label={`${t('builder.curriculum.moveUp')}: ${criterion.name}`}
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    onClick={() => move(index, 1)}
                    disabled={index === criteria.length - 1 || reorderCriteria.isPending}
                    className="rounded-lg p-1.5 text-content-muted hover:bg-surface hover:text-content disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label={`${t('builder.curriculum.moveDown')}: ${criterion.name}`}
                  >
                    <ChevronDown size={14} />
                  </button>
                  <button
                    onClick={() => removeCriterion.mutate(criterion.id)}
                    disabled={removeCriterion.isPending}
                    className="ms-auto rounded-lg p-1.5 text-content-muted hover:bg-error-soft hover:text-error disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label={`${t('builder.curriculum.delete')} ${criterion.name}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="space-y-2 border-t border-border pt-4">
            <div>
              <Label htmlFor="criterion-name">{t('teaching.rubric.field.name')}</Label>
              <Input
                id="criterion-name"
                value={criterionName}
                onChange={(event) => setCriterionName(event.target.value)}
                maxLength={120}
              />
            </div>
            <div>
              <Label htmlFor="criterion-description">{t('teaching.rubric.field.description')}</Label>
              <Input
                id="criterion-description"
                value={criterionDescription}
                onChange={(event) => setCriterionDescription(event.target.value)}
                maxLength={240}
              />
            </div>
            <div>
              <Label htmlFor="criterion-points">{t('teaching.rubric.field.points')}</Label>
              <Input
                id="criterion-points"
                value={criterionPoints}
                onChange={(event) => setCriterionPoints(event.target.value)}
                inputMode="numeric"
              />
            </div>
            {rubricError && <p className="rounded-input bg-error-soft px-3 py-2 text-xs text-error">{rubricError}</p>}
            <Button fullWidth size="sm" onClick={submitCriterion} loading={addCriterion.isPending}>
              <Plus size={14} /> {t('teaching.rubric.add')}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
