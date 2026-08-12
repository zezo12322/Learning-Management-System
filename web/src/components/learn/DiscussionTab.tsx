'use client'

import { MessagesSquare } from 'lucide-react'
import { useT } from '@/lib/i18n'
import { Card } from '@/components/ui/card'
import { EmptyState } from '@/components/student/EmptyState'

/**
 * Discussion tab (Figma "11. discussion").
 *
 * There is no discussions module in the backend — no threads, replies, votes or
 * view counts — so there is nothing to read or post against. Rather than ship a
 * question box that silently drops what a learner types, the tab states that the
 * feature is not available yet. Wiring it up later means replacing this file;
 * the tab, its route and its translations already exist.
 *
 * Tracked in web/BACKEND_INTEGRATION_GAPS.md.
 */
export function DiscussionTab() {
  const t = useT()
  return (
    <Card>
      <EmptyState
        icon={MessagesSquare}
        title={t('learn.discussion.unavailable')}
        description={t('learn.discussion.unavailableHint')}
      />
    </Card>
  )
}
