'use client'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Bell, CheckCheck, Search } from 'lucide-react'
import { fetchNotifications, relativeTime } from '@/lib/notifications'
import type { NotificationCategory } from '@/components/student/NotificationRow'
import { useI18n } from '@/lib/i18n'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { PageHeader } from '@/components/workspace/PageHeader'
import { TabBar } from '@/components/student/FilterChips'
import { EmptyState } from '@/components/student/EmptyState'
import { NotificationRow } from '@/components/student/NotificationRow'

type Tab = 'ALL' | 'UNREAD' | NotificationCategory

/**
 * Notifications (Figma "15. notifications"): search, category tabs with counts,
 * mark-all-read, unread dots and the empty state. See `lib/notifications.ts` for
 * why the feed is currently empty.
 */
export default function NotificationsPage() {
  const { t, locale } = useI18n()
  const [tab, setTab] = useState<Tab>('ALL')
  const [search, setSearch] = useState('')
  /** Read state is tracked locally until the backend exposes read receipts. */
  const [readIds, setReadIds] = useState<string[]>([])

  const query = useQuery({ queryKey: ['notifications'], queryFn: fetchNotifications })
  const items = useMemo(
    () => (query.data ?? []).map((item) => ({ ...item, read: item.read || readIds.includes(item.id) })),
    [query.data, readIds],
  )

  const counts = useMemo(
    () => ({
      all: items.length,
      unread: items.filter((item) => !item.read).length,
      ANNOUNCEMENT: items.filter((item) => item.category === 'ANNOUNCEMENT').length,
      ASSIGNMENT: items.filter((item) => item.category === 'ASSIGNMENT').length,
      COURSE: items.filter((item) => item.category === 'COURSE').length,
      DISCUSSION: items.filter((item) => item.category === 'DISCUSSION').length,
      SYSTEM: items.filter((item) => item.category === 'SYSTEM').length,
    }),
    [items],
  )

  const visible = useMemo(() => {
    const needle = search.trim().toLowerCase()
    return items.filter((item) => {
      const matchesTab =
        tab === 'ALL' ? true : tab === 'UNREAD' ? !item.read : item.category === tab
      const matchesSearch =
        !needle ||
        item.title.toLowerCase().includes(needle) ||
        item.body.toLowerCase().includes(needle)
      return matchesTab && matchesSearch
    })
  }, [items, tab, search])

  const markAllRead = () => setReadIds(items.map((item) => item.id))

  return (
    <div className="space-y-5">
      <PageHeader title={t('notifications.title')} description={t('notifications.subtitle')} />

      <Input
        icon={<Search size={18} />}
        placeholder={t('notifications.searchPlaceholder')}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        aria-label={t('notifications.searchPlaceholder')}
      />

      {query.isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-24 rounded-card" />
          ))}
        </div>
      ) : query.isError ? (
        <Card className="border-error bg-error-soft p-4 text-sm text-error">
          {t('notifications.loadError')}
        </Card>
      ) : items.length ? (
        <>
          <TabBar
            items={[
              { value: 'ALL' as Tab, label: `${t('notifications.tab.all')} (${counts.all})` },
              { value: 'UNREAD' as Tab, label: `${t('notifications.tab.unread')} (${counts.unread})` },
              {
                value: 'ANNOUNCEMENT' as Tab,
                label: `${t('notifications.category.ANNOUNCEMENT')} (${counts.ANNOUNCEMENT})`,
              },
              {
                value: 'ASSIGNMENT' as Tab,
                label: `${t('notifications.category.ASSIGNMENT')} (${counts.ASSIGNMENT})`,
              },
              { value: 'COURSE' as Tab, label: `${t('notifications.category.COURSE')} (${counts.COURSE})` },
              {
                value: 'DISCUSSION' as Tab,
                label: `${t('notifications.category.DISCUSSION')} (${counts.DISCUSSION})`,
              },
              { value: 'SYSTEM' as Tab, label: `${t('notifications.category.SYSTEM')} (${counts.SYSTEM})` },
            ]}
            value={tab}
            onChange={setTab}
          />

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={markAllRead}
              disabled={counts.unread === 0}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary disabled:opacity-40"
            >
              <CheckCheck size={15} /> {t('notifications.markAllRead')}
            </button>
            <span className="text-xs text-content-muted">
              {t('notifications.unreadCount').replace('{n}', String(counts.unread))}
            </span>
          </div>

          {visible.length ? (
            <div className="space-y-2.5">
              {visible.map((notification) => (
                <NotificationRow
                  key={notification.id}
                  notification={notification}
                  timeLabel={relativeTime(notification.createdAt, locale)}
                  onRead={(id) => setReadIds((current) => (current.includes(id) ? current : [...current, id]))}
                />
              ))}
              <p className="pt-2 text-center text-xs text-content-muted">
                {t('notifications.endOfList')}
              </p>
            </div>
          ) : (
            <Card>
              <EmptyState
                icon={Search}
                title={t('notifications.noMatch')}
                description={t('notifications.noMatchHint')}
              />
            </Card>
          )}
        </>
      ) : (
        <Card>
          <EmptyState
            icon={Bell}
            title={t('notifications.empty')}
            description={t('notifications.emptyHint')}
            actionLabel={t('student.browseCourses')}
            actionHref="/catalog"
          />
        </Card>
      )}
    </div>
  )
}
