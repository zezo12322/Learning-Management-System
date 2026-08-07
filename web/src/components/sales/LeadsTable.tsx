'use client'

import { AlertTriangle, BadgeCheck, MessageSquare, UserCheck } from 'lucide-react'
import type { LeadSummary } from '@/lib/api/sales'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/**
 * Colour carries meaning, not decoration: green is progress, amber needs a
 * person, grey is closed. A rep scanning fifty rows should be able to find the
 * ones that need them without reading a single word.
 */
const STAGE_TONE: Record<string, string> = {
  NEW: 'bg-slate-100 text-slate-700',
  ENGAGED: 'bg-sky-100 text-sky-800',
  QUALIFYING: 'bg-sky-100 text-sky-800',
  QUALIFIED: 'bg-emerald-100 text-emerald-800',
  DEMO_BOOKED: 'bg-emerald-100 text-emerald-800',
  PROPOSAL_SENT: 'bg-emerald-100 text-emerald-800',
  WON: 'bg-emerald-600 text-white',
  LOST: 'bg-slate-200 text-slate-600',
  UNQUALIFIED: 'bg-slate-200 text-slate-600',
  NURTURE: 'bg-amber-100 text-amber-800',
}

function scoreTone(score: number): string {
  if (score >= 70) return 'text-emerald-700'
  if (score >= 40) return 'text-amber-700'
  return 'text-slate-500'
}

function relativeTime(iso: string | null, locale: string): string {
  if (!iso) return '—'
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return '—'
  const minutes = Math.round((then - Date.now()) / 60000)
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  const absolute = Math.abs(minutes)
  if (absolute < 60) return formatter.format(minutes, 'minute')
  if (absolute < 60 * 24) return formatter.format(Math.round(minutes / 60), 'hour')
  return formatter.format(Math.round(minutes / (60 * 24)), 'day')
}

export function LeadsTable({
  leads,
  selectedId,
  onSelect,
}: {
  leads: LeadSummary[]
  selectedId: string | null
  onSelect: (leadId: string) => void
}) {
  const { t, locale } = useI18n()

  if (leads.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
        {t('sales.leads.empty')}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full min-w-[720px] text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3 text-start">{t('sales.leads.lead')}</th>
            <th className="px-4 py-3 text-start">{t('sales.leads.stage')}</th>
            <th className="px-4 py-3 text-start">{t('sales.leads.score')}</th>
            <th className="px-4 py-3 text-start">{t('sales.leads.channel')}</th>
            <th className="px-4 py-3 text-start">{t('sales.leads.lastActivity')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {leads.map((lead) => (
            <tr
              key={lead.id}
              onClick={() => onSelect(lead.id)}
              className={cn(
                'cursor-pointer transition hover:bg-slate-50',
                selectedId === lead.id && 'bg-sky-50 hover:bg-sky-50',
              )}
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-2 font-medium text-slate-900">
                  {lead.full_name || lead.phone_e164 || t('sales.leads.unnamed')}
                  {lead.human_takeover && (
                    <UserCheck
                      className="h-4 w-4 text-amber-600"
                      aria-label={t('sales.leads.humanOwned')}
                    />
                  )}
                  {lead.opted_out && (
                    <AlertTriangle
                      className="h-4 w-4 text-rose-600"
                      aria-label={t('sales.leads.optedOut')}
                    />
                  )}
                  {lead.marketing_opt_in && !lead.opted_out && (
                    <BadgeCheck
                      className="h-4 w-4 text-emerald-600"
                      aria-label={t('sales.leads.optedIn')}
                    />
                  )}
                </div>
                <div className="text-xs text-slate-500">
                  {lead.company_name
                    ? `${lead.company_name} · ${lead.segment}`
                    : lead.segment}
                </div>
              </td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    'inline-block rounded-full px-2 py-0.5 text-xs font-medium',
                    STAGE_TONE[lead.stage] ?? 'bg-slate-100 text-slate-700',
                  )}
                >
                  {t(`sales.stage.${lead.stage}`)}
                </span>
              </td>
              <td className={cn('px-4 py-3 font-semibold', scoreTone(lead.score))}>
                {lead.score}
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-1 text-xs text-slate-600">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {lead.source_channel ?? '—'}
                </span>
                {lead.source_campaign && (
                  <div className="truncate text-xs text-slate-400" title={lead.source_campaign}>
                    {lead.source_campaign}
                  </div>
                )}
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">
                {relativeTime(lead.last_inbound_at ?? lead.updated_at, locale)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
