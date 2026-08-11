'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ClipboardList, Clock, Plus, Target } from 'lucide-react'
import { authoringApi, coursesApi, missionsApi } from '@/lib/api/services'
import { apiErrorMessage, apiErrorStatus } from '@/lib/api/client'
import { useAuth } from '@/lib/auth/AuthProvider'
import { useT } from '@/lib/i18n'
import type { MissionDifficulty } from '@/lib/types'
import { PageHeader } from '@/components/workspace/PageHeader'
import { StatusPill } from '@/components/workspace/StatusPill'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const DIFFICULTIES: MissionDifficulty[] = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']

const selectClass =
  'mt-2 w-full rounded-input border border-border bg-surface px-3 py-3 text-sm text-content outline-none focus:border-primary'

/**
 * Assignment authoring. Nothing in the web app could create an assignment
 * before, so the mission endpoints, the rubric endpoints and the grading queue
 * all had no way in — an instructor could not set work, and a learner therefore
 * had none to do.
 */
export default function TeachingAssignmentsPage() {
  const t = useT()
  const queryClient = useQueryClient()
  const { roles } = useAuth()
  const canAuthor = roles.includes('admin') || roles.includes('instructor')

  const [composing, setComposing] = useState(false)
  const [title, setTitle] = useState('')
  const [scenario, setScenario] = useState('')
  const [duration, setDuration] = useState('60')
  const [difficulty, setDifficulty] = useState<MissionDifficulty>('INTERMEDIATE')
  const [skills, setSkills] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [courseId, setCourseId] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  const missions = useQuery({
    queryKey: ['authored-missions'],
    queryFn: missionsApi.list,
    enabled: canAuthor,
  })
  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: coursesApi.categories,
    enabled: canAuthor,
  })
  const courses = useQuery({
    queryKey: ['authoring-courses'],
    queryFn: authoringApi.list,
    enabled: canAuthor,
  })

  const create = useMutation({
    mutationFn: () =>
      missionsApi.create({
        title: title.trim(),
        scenarioDescription: scenario.trim(),
        durationMinutes: Number(duration),
        categoryId,
        difficulty,
        skillsTested: skills
          .split(',')
          .map((skill) => skill.trim())
          .filter(Boolean),
        courseId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['authored-missions'] })
      setComposing(false)
      setTitle('')
      setScenario('')
      setDuration('60')
      setDifficulty('INTERMEDIATE')
      setSkills('')
      setFormError(null)
    },
    onError: (error) => setFormError(apiErrorMessage(error, t('teaching.assignments.createError'))),
  })

  const items = useMemo(() => missions.data ?? [], [missions.data])
  const courseOptions = courses.data ?? []

  const submit = () => {
    const skillList = skills.split(',').map((skill) => skill.trim()).filter(Boolean)
    if (!title.trim() || !scenario.trim() || !categoryId || !skillList.length) {
      setFormError(t('teaching.assignments.missingFields'))
      return
    }
    // A mission with no parent course reaches nobody: GET /me/assignments lists
    // assignments through the learner's course enrollment, so an unattached one
    // would exist and be gradeable while being invisible to every student.
    if (!courseId) {
      setFormError(t('teaching.assignments.courseRequired'))
      return
    }
    if (!Number.isFinite(Number(duration)) || Number(duration) < 1) {
      setFormError(t('teaching.assignments.durationInvalid'))
      return
    }
    setFormError(null)
    create.mutate()
  }

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

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('teaching.assignments.title')}
        description={t('teaching.assignments.subtitle')}
        action={
          <Button onClick={() => setComposing(!composing)}>
            <Plus size={16} /> {t('teaching.assignments.new')}
          </Button>
        }
      />

      {composing && (
        <Card className="max-w-2xl space-y-4 p-5 sm:p-6">
          <h2 className="text-base font-semibold text-content">{t('teaching.assignments.newTitle')}</h2>

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
              rows={5}
              className="mt-2 w-full resize-y rounded-input border border-border bg-surface px-4 py-3 text-sm leading-6 text-content outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <p className="mt-1.5 text-[11px] text-content-muted">{t('teaching.assignments.briefHint')}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="mission-course">{t('teaching.assignments.field.course')}</Label>
              <select
                id="mission-course"
                value={courseId}
                onChange={(event) => setCourseId(event.target.value)}
                className={selectClass}
              >
                <option value="">{t('teaching.assignments.pickCourse')}</option>
                {courseOptions.map((course) => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
              <p className="mt-1.5 text-[11px] leading-5 text-content-muted">
                {t('teaching.assignments.courseHint')}
              </p>
            </div>
            <div>
              <Label htmlFor="mission-category">{t('teaching.assignments.field.category')}</Label>
              <select
                id="mission-category"
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
                className={selectClass}
              >
                <option value="">{t('teaching.assignments.pickCategory')}</option>
                {(categories.data ?? []).map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
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

          {formError && <p className="rounded-input bg-error-soft px-3 py-2 text-xs text-error">{formError}</p>}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setComposing(false)} disabled={create.isPending}>
              {t('common.cancel')}
            </Button>
            <Button onClick={submit} loading={create.isPending}>
              {t('teaching.assignments.create')}
            </Button>
          </div>
        </Card>
      )}

      {missions.isError && (
        <Card className="border-error bg-error-soft p-4 text-sm text-error">
          {apiErrorStatus(missions.error) === 403
            ? t('teaching.assignments.accessDenied')
            : t('teaching.assignments.loadError')}
        </Card>
      )}

      {missions.isPending ? (
        <Card className="py-16 text-center text-sm text-content-secondary">
          {t('teaching.assignments.loading')}
        </Card>
      ) : items.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((mission) => (
            <Link key={mission.id} href={`/teaching/assignments/${mission.id}`} className="block h-full">
              <Card hover className="flex h-full flex-col p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-on-brand-soft">
                    <ClipboardList size={18} />
                  </span>
                  {/* A rubric is what makes a submission gradeable, so its
                      absence is the state worth surfacing on the card. */}
                  <StatusPill tone={mission.criteria.length ? 'success' : 'warning'}>
                    {mission.criteria.length
                      ? t('teaching.assignments.criteriaN').replace('{n}', String(mission.criteria.length))
                      : t('teaching.assignments.noRubric')}
                  </StatusPill>
                </div>
                <h3 className="mt-4 line-clamp-2 text-base font-semibold text-content">{mission.title}</h3>
                <p className="mt-1 text-xs text-content-secondary">
                  {mission.course?.title ?? t('teaching.assignments.noCourse')}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-content-muted">
                  <span>{t(`difficulty.${mission.difficulty}`, mission.difficulty)}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} /> {mission.durationMinutes} {t('quizTake.min')}
                  </span>
                  {mission.criteria.length > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <Target size={12} />{' '}
                      {t('assignments.points').replace(
                        '{n}',
                        String(mission.criteria.reduce((sum, criterion) => sum + criterion.maxPoints, 0)),
                      )}
                    </span>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : !missions.isError ? (
        <Card className="py-16 text-center">
          <ClipboardList className="mx-auto text-content-muted" />
          <p className="mt-3 text-sm font-semibold text-content">{t('teaching.assignments.empty')}</p>
          <p className="mt-1 text-xs text-content-secondary">{t('teaching.assignments.emptyHint')}</p>
        </Card>
      ) : null}
    </div>
  )
}
