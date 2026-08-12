'use client'

import { BarChart3, BookOpen, Clock, Globe2 } from 'lucide-react'
import { RatingStars } from '@/components/common/RatingStars'
import { useT } from '@/lib/i18n'
import { formatSecondsLocalized, lessonCountLabel } from '@/lib/i18n/format'
import { cn } from '@/lib/utils'

/**
 * The only renderer of a course's lessons / duration / level / language /
 * rating.
 *
 * Before this existed each surface formatted the same facts its own way: the
 * catalog detail page divided seconds by 60 and printed "360 minutes" for the
 * course the next screen called "6h", and `course.level.toLowerCase()` put the
 * English word "beginner" into an Arabic page. Everything here therefore goes
 * through the shared formatters — duration via formatSecondsLocalized, counts
 * via lessonCountLabel, the level enum via `level.<ENUM>` — and nothing is
 * hand-formatted at a call site.
 *
 * Anything the caller leaves undefined or null is omitted rather than rendered
 * as a placeholder, so the row shrinks to what a surface actually knows.
 */
export function CourseMetaRow({
  lessons,
  durationSeconds,
  level,
  language,
  rating,
  ratingCount,
  className,
}: {
  lessons?: number
  durationSeconds?: number
  level?: string | null
  language?: string | null
  rating?: number | null
  ratingCount?: number | null
  className?: string
}) {
  const t = useT()

  const items: { key: string; node: React.ReactNode }[] = []

  if (rating != null) {
    items.push({
      key: 'rating',
      node: <RatingStars value={rating} size={12} count={ratingCount ?? undefined} />,
    })
  }
  if (lessons != null) {
    items.push({
      key: 'lessons',
      node: (
        <>
          <BookOpen size={13} aria-hidden="true" />
          {lessonCountLabel(lessons, t)}
        </>
      ),
    })
  }
  if (durationSeconds != null) {
    items.push({
      key: 'duration',
      node: (
        <>
          <Clock size={13} aria-hidden="true" />
          {formatSecondsLocalized(durationSeconds, t)}
        </>
      ),
    })
  }
  if (level) {
    items.push({
      key: 'level',
      node: (
        <>
          <BarChart3 size={13} aria-hidden="true" />
          {/* The enum is the key; the raw value is only the last-resort fallback
              so an unknown level never prints as an empty string. */}
          {t(`level.${level}`, level)}
        </>
      ),
    })
  }
  if (language) {
    items.push({
      key: 'language',
      node: (
        <>
          <Globe2 size={13} aria-hidden="true" />
          {/* Same fallback shape as the level above: the API stores the English
              name, so it is translated for display but still renders as-is if
              the course names a language the dictionary does not cover. */}
          {t(`courseLanguage.${language}`, language)}
        </>
      ),
    })
  }

  if (items.length === 0) return null

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-content-secondary',
        className,
      )}
    >
      {items.map((item) => (
        <span key={item.key} className="inline-flex items-center gap-1">
          {item.node}
        </span>
      ))}
    </div>
  )
}
