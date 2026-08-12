'use client'

import { BookOpen, Bell, ClipboardList, MessageCircle, Megaphone, Settings } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export type NotificationCategory =
  | 'ANNOUNCEMENT'
  | 'ASSIGNMENT'
  | 'COURSE'
  | 'DISCUSSION'
  | 'SYSTEM'

export interface AppNotification {
  id: string
  category: NotificationCategory
  title: string
  body: string
  createdAt: string
  read: boolean
}

/** Icon + tint per category, mirroring the Figma "Categories" legend. */
export const CATEGORY_STYLE: Record<NotificationCategory, { icon: LucideIcon; tile: string }> = {
  ANNOUNCEMENT: { icon: Megaphone, tile: 'bg-warning-soft text-warning' },
  ASSIGNMENT: { icon: ClipboardList, tile: 'bg-success-soft text-success' },
  COURSE: { icon: BookOpen, tile: 'bg-secondary/10 text-secondary' },
  DISCUSSION: { icon: MessageCircle, tile: 'bg-brand-soft text-on-brand-soft' },
  SYSTEM: { icon: Settings, tile: 'bg-subtle text-content-secondary' },
}

export const NOTIFICATION_ICON = Bell

/**
 * One notification (Figma "15. notifications"): category icon tile, bold title
 * with relative time, body copy, and a blue dot while unread.
 */
export function NotificationRow({
  notification,
  timeLabel,
  onRead,
}: {
  notification: AppNotification
  timeLabel: string
  onRead?: (id: string) => void
}) {
  const { icon: Icon, tile } = CATEGORY_STYLE[notification.category]
  return (
    <Card
      hover
      role={onRead ? 'button' : undefined}
      tabIndex={onRead ? 0 : undefined}
      onClick={onRead ? () => onRead(notification.id) : undefined}
      onKeyDown={
        onRead
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') onRead(notification.id)
            }
          : undefined
      }
      className={cn('flex gap-3 p-4', onRead && 'cursor-pointer')}
    >
      <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', tile)}>
        <Icon size={18} strokeWidth={1.9} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p
            className={cn(
              'truncate text-sm',
              notification.read ? 'font-medium text-content-secondary' : 'font-bold text-content',
            )}
          >
            {notification.title}
          </p>
          <span className="shrink-0 text-[11px] text-content-muted">{timeLabel}</span>
        </div>
        <p className="mt-1 text-xs leading-5 text-content-secondary">{notification.body}</p>
      </div>
      {!notification.read && (
        <span className="mt-1 h-2 w-2 shrink-0 self-center rounded-full bg-primary" />
      )}
    </Card>
  )
}
