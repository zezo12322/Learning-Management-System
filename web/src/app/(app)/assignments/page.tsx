'use client'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ClipboardList, Search } from 'lucide-react'
import { submissionsApi } from '@/lib/api/services'
import { apiErrorStatus } from '@/lib/api/client'
import { useI18n } from '@/lib/i18n'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { PageHeader } from '@/components/workspace/PageHeader'
import { TabBar } from '@/components/student/FilterChips'
import { EmptyState } from '@/components/student/EmptyState'
import { AssignmentCard } from '@/components/student/AssignmentCard'

type Tab = 'ALL' | 'SUBMITTED' | 'GRADED'

/**
 * Assignments (Figma "13. Assignments") — All / Submitted / Graded tabs over
 * the student's own mission submissions (GET /me/submissions).
 *
 * Scope note: the backend exposes no student-facing "assignments open to me"
 * feed (GET /missions returns missions the caller *authored*), so the design's
 * "Available" state cannot be listed yet. See web/BACKEND_INTEGRATION_GAPS.md.
 */
export default function AssignmentsPage() {
  const { t, locale } = useI18n()
  const [tab, setTab] = useState<Tab>('ALL')
  const [search, setSearch] = useState('')

  const submissions = useQuery({ queryKey: ['my-submissions'], queryFn: submissionsApi.mine })
  const items = useMemo(() => submissions.data ?? [], [submissions.data])

  const counts = useMemo(
    () => ({
      all: items.length,
      submitted: items.filter((item) => item.status !== 'GRADED').length,
      graded: items.filter((item) => item.status === 'GRADED').length,
    }),
    [items],
  )

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase()
    return items.filter((item) => {
      const matchesTab =
        tab === 'ALL' || (tab === 'GRADED' ? item.status === 'GRADED' : item.status !== 'GRADED')
      return matchesTab && (!query || item.title.toLowerCase().includes(query))
    })
  }, [items, tab, search])

  const forbidden = apiErrorStatus(submissions.error) === 403

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
          { value: 'ALL', label: `${t('assignments.tab.all')} (${counts.all})` },
          { value: 'SUBMITTED', label: `${t('assignments.tab.submitted')} (${counts.submitted})` },
          { value: 'GRADED', label: `${t('assignments.tab.graded')} (${counts.graded})` },
        ]}
        value={tab}
        onChange={setTab}
      />

      {submissions.isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-28 rounded-card" />
          ))}
        </div>
      ) : submissions.isError ? (
        <Card className="border-error/20 bg-error/5 p-4 text-sm text-error">
          {forbidden ? t('assignments.accessDenied') : t('assignments.loadError')}
        </Card>
      ) : visible.length ? (
        <div className="space-y-3">
          {visible.map((submission) => (
            <AssignmentCard key={submission.id} submission={submission} locale={locale} />
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
