'use client'

import Link from 'next/link'
import { AlertCircle, CheckCircle2, ChevronRight, Info } from 'lucide-react'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export type ReadinessState = 'complete' | 'missing' | 'partial' | 'optional' | 'unknown'

/**
 * One row of the publish checklist.
 *
 * `detail` is ADDITIONAL text, never a replacement for the verdict: the previous
 * component let `value` take the verdict's place, so "Optional — off" rendered
 * in warning amber with a blocker's icon and no pass/fail word at all — meaning
 * carried by colour on the component whose whole job is stating state.
 */
export interface ReadinessCheck {
  id: string
  label: string
  state: ReadinessState
  detail?: string
  severity: 'required' | 'optional'
  href?: string
  /**
   * Name of the step `href` leads to, so the row can say which step fixes it.
   * The engine fills it in; the row keeps no knowledge of step ids.
   */
  stepLabel?: string
}

const VERDICT_KEY: Record<ReadinessState, string> = {
  complete: 'common.complete',
  missing: 'common.missing',
  partial: 'common.partial',
  optional: 'common.optional',
  unknown: 'builder.readiness.quizUnknown',
}

export function ReadinessItem({ check }: { check: ReadinessCheck }) {
  const t = useT()
  const complete = check.state === 'complete'
  // An optional item must never wear the blocker's colour, and an unknown state
  // is not a failure either — both are informational.
  const informational = !complete && (check.severity === 'optional' || check.state === 'unknown')
  const blocking = !complete && !informational

  const Icon = complete ? CheckCircle2 : informational ? Info : AlertCircle
  const iconClass = complete ? 'text-success' : informational ? 'text-info' : 'text-warning'

  const verdict = t(VERDICT_KEY[check.state])
  const caption = blocking
    ? t('builder.readiness.blocksPublish')
    : check.severity === 'optional'
      ? t('builder.readiness.optionalNote')
      : null

  const body = (
    <>
      <Icon size={15} className={cn('mt-0.5 shrink-0', iconClass)} aria-hidden />
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium text-content">{check.label}</span>
        <span className={cn('mt-0.5 block text-[11px] font-semibold', iconClass)}>
          {verdict}
          {check.detail ? ` · ${check.detail}` : ''}
        </span>
        {caption && <span className="mt-0.5 block text-[10px] text-content-secondary">{caption}</span>}
        {check.href && check.stepLabel && (
          <span className="mt-1 block text-[11px] font-semibold text-primary">
            {t('builder.readiness.fixIn').replace('{step}', check.stepLabel)}
          </span>
        )}
      </span>
      {check.href && (
        <ChevronRight
          size={15}
          className="mt-0.5 shrink-0 text-content-secondary rtl:rotate-180"
          aria-hidden
        />
      )}
    </>
  )

  const shell = 'flex w-full items-start gap-2.5 rounded-xl bg-subtle px-3 py-3 text-start'

  return (
    <li>
      {check.href ? (
        // With an href the row is a real link, so the checklist stops being a
        // dead-end report: every unfinished item leads to the step that fixes it.
        <Link
          href={check.href}
          className={cn(
            shell,
            'transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40'
          )}
        >
          {body}
        </Link>
      ) : (
        <div className={shell}>{body}</div>
      )}
    </li>
  )
}
