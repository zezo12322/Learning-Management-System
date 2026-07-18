'use client'

import { Bookmark } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toggleSavedCourse, useIsCourseSaved } from '@/lib/saved'

/**
 * Bookmark toggle for a course. Safe to render inside a <Link> (a course card):
 * it stops the click from bubbling so saving never triggers navigation.
 */
export function SaveButton({
  courseId,
  className,
  size = 16,
}: {
  courseId: string
  className?: string
  size?: number
}) {
  const saved = useIsCourseSaved(courseId)

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? 'إزالة من المحفوظات' : 'حفظ الدورة'}
      title={saved ? 'إزالة من المحفوظات' : 'حفظ الدورة'}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleSavedCourse(courseId)
      }}
      className={cn(
        'inline-flex items-center justify-center rounded-full p-1.5 transition-colors',
        'bg-white/95 text-content shadow hover:bg-white',
        saved && 'text-primary',
        className,
      )}
    >
      <Bookmark size={size} fill={saved ? 'currentColor' : 'none'} />
    </button>
  )
}
