'use client'

import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ClipboardList, Search } from 'lucide-react'
import { enrollmentApi, submissionsApi } from '@/lib/api/services'
import { apiErrorMessage, apiErrorStatus } from '@/lib/api/client'
import { useI18n } from '@/lib/i18n'
import type { MySubmission } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { PageHeader } from '@/components/workspace/PageHeader'
import { TabBar } from '@/components/student/FilterChips'
import { EmptyState } from '@/components/student/EmptyState'
import { AssignmentWorkCard } from '@/components/student/AssignmentWorkCard'

type Tab = 'ALL' | 'AVAILABLE' | 'SUBMITTED' | 'GRADED'

/**
 * Assignments (Figma "13. Assignments") — the learner's full loop: what is open
 * to them, what they are marked on, handing work in, and the grade that comes
 * back.
 *
 * Two endpoints, because each knows something the other does not.
 * `GET /me/assignments` lists the assignments themselves with their rubric (a
 * learner had no way to see one before — the authoring routes are owner-only, so
 * the design's "Available" state could not be built and the screen could only
 * ever show an empty list). `GET /me/submissions` carries the graded detail:
 * per-criterion scores and instructor feedback.
 */
export default function AssignmentsPage() {
  const { t, locale } = useI18n()
  const queryClient = useQueryClient()
  const [tab, setTab] = useState<Tab>('ALL')
  const [search, setSearch] = useState('')
  const [submittingId, setSubmittingId] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<{ missionId: string; message: string } | null>(null)

  const assignments = useQuery({
    queryKey: ['my-assignments'],
    queryFn: submissionsApi.myAssignments,
  })
  const submissions = useQuery({ queryKey: ['my-submissions'], queryFn: submissionsApi.mine })

  const items = useMemo(() => assignments.data ?? [], [assignments.data])
  const submissionsByMission = useMemo(() => {
    const grouped = new Map<string, MySubmission[]>()
    for (const submission of submissions.data ?? []) {
      const list = grouped.get(submission.missionId) ?? []
      list.push(submission)
      grouped.set(submission.missionId, list)
    }
    return grouped
  }, [submissions.data])

  const submit = useMutation({
    mutationFn: async ({ assignmentId, fileUrl }: { assignmentId: string; fileUrl: string }) => {
      const assignment = items.find((item) => item.id === assignmentId)
      // The API refuses a submission without an ACTIVE mission enrollment, and
      // joining an assignment is not something a learner should have to know to
      // do first — so do it for them when it is missing.
      if (assignment?.missionEnrollmentStatus !== 'ACTIVE') {
        await enrollmentApi.enrollInMission(assignmentId)
      }
      return submissionsApi.submit(assignmentId, fileUrl)
    },
    onMutate: ({ assignmentId }) => {
      setSubmittingId(assignmentId)
      setSubmitError(null)
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['my-assignments'] }),
        queryClient.invalidateQueries({ queryKey: ['my-submissions'] }),
      ])
    },
    onError: (error, variables) => {
      setSubmitError({
        missionId: variables.assignmentId,
        message: apiErrorMessage(error, t('assignments.submit.failed')),
      })
    },
    onSettled: () => setSubmittingId(null),
  })

  const counts = useMemo(() => {
    const stateOf = (assignmentId: string) => {
      const assignment = items.find((item) => item.id === assignmentId)
      if (!assignment?.attempts.length) return 'AVAILABLE'
      return assignment.attempts.some((attempt) => attempt.status === 'GRADED') ? 'GRADED' : 'SUBMITTED'
    }
    return {
      all: items.length,
      available: items.filter((item) => stateOf(item.id) === 'AVAILABLE').length,
      submitted: items.filter((item) => stateOf(item.id) === 'SUBMITTED').length,
      graded: items.filter((item) => stateOf(item.id) === 'GRADED').length,
    }
  }, [items])

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase()
    return items.filter((item) => {
      const gradedAttempt = item.attempts.some((attempt) => attempt.status === 'GRADED')
      const matchesTab =
        tab === 'ALL'
          ? true
          : tab === 'AVAILABLE'
            ? item.attempts.length === 0
            : tab === 'GRADED'
              ? gradedAttempt
              : item.attempts.length > 0 && !gradedAttempt
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        (item.course?.title ?? '').toLowerCase().includes(query)
      return matchesTab && matchesSearch
    })
  }, [items, tab, search])

  const forbidden = apiErrorStatus(assignments.error) === 403

  return (
    <div className="space-y-5">
      <PageHeader title={t('assignments.title')} description={t('assignments.subtitle')} />

      <Input
        icon={<Search size={18} />}
        placeholder={t('assignments.searchPlaceholder')}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        aria-label={t('assignments.searchPlaceholder')}
      />

      <TabBar
        items={[
          { value: 'ALL' as Tab, label: `${t('assignments.tab.all')} (${counts.all})` },
          { value: 'AVAILABLE' as Tab, label: `${t('assignments.tab.available')} (${counts.available})` },
          { value: 'SUBMITTED' as Tab, label: `${t('assignments.tab.submitted')} (${counts.submitted})` },
          { value: 'GRADED' as Tab, label: `${t('assignments.tab.graded')} (${counts.graded})` },
        ]}
        value={tab}
        onChange={setTab}
      />

      {assignments.isPending ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-28 rounded-card" />
          ))}
        </div>
      ) : assignments.isError ? (
        <Card className="border-error bg-error-soft p-4 text-sm text-error">
          {forbidden ? t('assignments.accessDenied') : t('assignments.loadError')}
        </Card>
      ) : visible.length ? (
        <div className="space-y-3">
          {visible.map((assignment) => (
            <AssignmentWorkCard
              key={assignment.id}
              assignment={assignment}
              submissions={submissionsByMission.get(assignment.id) ?? []}
              locale={locale}
              submitting={submittingId === assignment.id}
              error={submitError?.missionId === assignment.id ? submitError.message : null}
              onSubmit={(fileUrl) => submit.mutate({ assignmentId: assignment.id, fileUrl })}
            />
          ))}
        </div>
      ) : (
        <Card>
          <EmptyState
            icon={ClipboardList}
            title={items.length ? t('assignments.noMatch') : t('assignments.empty')}
            description={items.length ? t('assignments.noMatchHint') : t('assignments.emptyHint')}
            actionLabel={items.length ? undefined : t('assignments.goToCourses')}
            actionHref={items.length ? undefined : '/learning'}
          />
        </Card>
      )}
    </div>
  )
}
