'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Accessible tabs.
 *
 * The visuals are the underlined tab row the app already uses (TabBar in
 * components/student/FilterChips.tsx), but the semantics are the real thing:
 * role="tablist"/"tab"/"tabpanel", a roving tabindex so the whole row is one
 * keyboard stop, and each tab wired to its panel with aria-controls /
 * aria-labelledby.
 *
 * Arrow keys are direction-aware. Direction is read from the rendered element
 * rather than from the locale, so the row behaves correctly wherever it is
 * mounted: ArrowLeft moves to the PREVIOUS tab in LTR and to the NEXT tab in
 * RTL, which is what "left" means visually in each direction.
 */
export function TabList<T extends string>({
  items,
  value,
  onChange,
  idBase,
  ariaLabel,
  className,
}: {
  items: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
  idBase: string
  ariaLabel: string
  className?: string
}) {
  const listRef = React.useRef<HTMLDivElement | null>(null)
  const tabRefs = React.useRef(new Map<T, HTMLButtonElement | null>())

  const select = (index: number) => {
    const item = items[index]
    if (!item) return
    onChange(item.value)
    // Focus follows selection, which is the expected behaviour for tabs that
    // switch on arrow keys.
    tabRefs.current.get(item.value)?.focus()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const index = items.findIndex((item) => item.value === value)
    if (index < 0 || items.length === 0) return

    const rtl =
      typeof window !== 'undefined' && listRef.current
        ? window.getComputedStyle(listRef.current).direction === 'rtl'
        : false
    const forwardKey = rtl ? 'ArrowLeft' : 'ArrowRight'
    const backwardKey = rtl ? 'ArrowRight' : 'ArrowLeft'

    let next: number | null = null
    if (event.key === forwardKey) next = (index + 1) % items.length
    else if (event.key === backwardKey) next = (index - 1 + items.length) % items.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = items.length - 1
    if (next === null) return

    event.preventDefault()
    select(next)
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      className={cn('no-scrollbar flex gap-1 overflow-x-auto border-b border-border', className)}
    >
      {items.map((item) => {
        const active = item.value === value
        return (
          <button
            key={item.value}
            ref={(node) => {
              tabRefs.current.set(item.value, node)
            }}
            type="button"
            id={`${idBase}-tab-${item.value}`}
            role="tab"
            aria-selected={active}
            // Only while active: TabPanel renders null when inactive, so on an
            // inactive tab this would be a broken IDREF (axe
            // `aria-valid-attr-value`) that some screen readers report as a dead
            // relationship. Panels cannot simply stay mounted — ResourcesTab
            // fans out one request per lecture and must load lazily.
            aria-controls={active ? `${idBase}-panel-${item.value}` : undefined}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(item.value)}
            className={cn(
              '-mb-px shrink-0 border-b-2 px-4 pb-3 pt-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
              active
                ? 'border-primary text-primary'
                : 'border-transparent text-content-secondary hover:text-content'
            )}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

/**
 * The panel for one tab. Renders nothing when it is not the active tab, so a
 * hidden panel keeps neither DOM ids nor keyboard stops.
 */
export function TabPanel({
  tab,
  activeTab,
  idBase,
  className,
  children,
}: {
  tab: string
  activeTab: string
  idBase: string
  className?: string
  children: React.ReactNode
}) {
  if (tab !== activeTab) return null
  return (
    <div
      id={`${idBase}-panel-${tab}`}
      role="tabpanel"
      aria-labelledby={`${idBase}-tab-${tab}`}
      tabIndex={0}
      className={cn(
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        className
      )}
    >
      {children}
    </div>
  )
}
