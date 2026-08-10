'use client'

import * as React from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { AuthoringSection } from '@/lib/types'
import { useT } from '@/lib/i18n'
import { formatSecondsLocalized } from '@/lib/i18n/format'
import { cn } from '@/lib/utils'

/**
 * One section: a disclosure whose button states its own expanded state and names
 * the panel it controls. The codebase had zero `aria-expanded` before this, so
 * every collapsible thing in the studio was silent about whether it was open.
 *
 * The panel element is always present (hidden when collapsed) so `aria-controls`
 * always resolves to a real element.
 */
export function SectionRow({
  section,
  index,
  expanded,
  onToggle,
  toggleRef,
  actions,
  reorder,
  children,
}: {
  section: AuthoringSection
  index: number
  expanded: boolean
  onToggle: () => void
  toggleRef?: React.Ref<HTMLButtonElement>
  actions?: React.ReactNode
  reorder?: React.ReactNode
  children?: React.ReactNode
}) {
  const t = useT()
  const panelId = `section-panel-${section.id}`
  const seconds = section.lectures.reduce((sum, lecture) => sum + lecture.duration, 0)

  return (
    <div className="overflow-hidden rounded-card border border-border bg-surface">
      <div
        className={cn(
          'flex items-center gap-2 px-3 py-4 sm:gap-3 sm:px-4',
          expanded && 'bg-brand-soft'
        )}
      >
        {reorder}
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface text-xs font-bold text-primary ring-1 ring-border">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="min-w-0 flex-1">
          {/* dir="auto" so an instructor-authored title picks its own base
              direction rather than being bidi-resolved against the page. */}
          <p dir="auto" className="truncate text-sm font-semibold text-content">{section.title}</p>
          <p className="mt-1 text-[10px] text-content-secondary">
            {t('builder.curriculum.sectionSummary')
              .replace('{lessons}', String(section.lectures.length))
              .replace('{duration}', formatSecondsLocalized(seconds, t))}
          </p>
        </div>
        {actions}
        <button
          ref={toggleRef}
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls={panelId}
          aria-label={t('builder.curriculum.toggleSectionNamed').replace('{name}', section.title)}
          className="shrink-0 rounded-lg p-2 text-primary transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          {expanded ? <ChevronUp size={17} aria-hidden /> : <ChevronDown size={17} aria-hidden />}
        </button>
      </div>

      <div id={panelId} hidden={!expanded}>
        {expanded && children}
      </div>
    </div>
  )
}
