import type { AppNotification, NotificationCategory } from '@/components/student/NotificationRow'

export type { AppNotification, NotificationCategory }

/**
 * Notifications feed.
 *
 * The backend has no notification list, unread-count, read-state or preference
 * endpoints yet (see web/BACKEND_INTEGRATION_GAPS.md §3), and the Flutter app
 * ships the same shell — `NotificationsCubit.load()` emits `NotificationsEmpty`
 * for exactly this reason. The screen is therefore built against this function
 * and renders its designed empty state; when `GET /notifications` lands, only
 * this function needs to change:
 *
 *   return apiClient.get('/notifications').then((r) => arrayValue(r.data).map(mapNotification))
 */
export async function fetchNotifications(): Promise<AppNotification[]> {
  return []
}

/** Relative "2m ago" / "3h ago" / "2d ago" label used by the notification rows. */
export function relativeTime(iso: string, locale: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  const seconds = Math.round((date.getTime() - Date.now()) / 1000)
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31_536_000],
    ['month', 2_592_000],
    ['day', 86_400],
    ['hour', 3_600],
    ['minute', 60],
  ]
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return formatter.format(Math.round(seconds / size), unit)
  }
  return formatter.format(Math.round(seconds), 'second')
}
