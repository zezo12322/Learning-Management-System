'use client'

import { useQuery } from '@tanstack/react-query'
import {
  AlertTriangle,
  BadgeCheck,
  Inbox,
  MessageSquare,
  MessageSquareDashed,
  ShieldAlert,
  UserCheck,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { AgentPlayground } from '@/components/sales/AgentPlayground'
import { KnowledgeManager } from '@/components/sales/KnowledgeManager'
import { LeadDetail } from '@/components/sales/LeadDetail'
import { LeadsTable } from '@/components/sales/LeadsTable'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { MetricCard } from '@/components/workspace/MetricCard'
import { PageHeader } from '@/components/workspace/PageHeader'
import { useAuth } from '@/lib/auth/AuthProvider'
import { type LeadFilters, type LeadStage, salesApi } from '@/lib/api/sales'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const STAGES: LeadStage[] = [
  'NEW',
  'ENGAGED',
  'QUALIFYING',
  'QUALIFIED',
  'DEMO_BOOKED',
  'PROPOSAL_SENT',
  'WON',
  'LOST',
  'UNQUALIFIED',
  'NURTURE',
]

type Tab = 'inbox' | 'knowledge' | 'playground'

export default function SalesPage() {
  const { t } = useI18n()
  const { roles } = useAuth()
  const isAdmin = roles.includes('admin')

  const [tab, setTab] = useState<Tab>('inbox')
  const [filters, setFilters] = useState<LeadFilters>({ limit: 50 })
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const statsQuery = useQuery({ queryKey: ['sales-stats'], queryFn: salesApi.stats })
  const leadsQuery = useQuery({
    queryKey: ['sales-leads', filters],
    queryFn: () => salesApi.listLeads(filters),
  })

  const stats = statsQuery.data

  return (
    <div className="space-y-6">
      <PageHeader title={t('sales.title')} description={t('sales.description')} />

      {/* Skipped sends are surfaced next to the sends. A spike here is almost
          always a misconfiguration (unapproved template, leads with no number),
          and it would otherwise be invisible. */}
      {stats && (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          <MetricCard
            icon={Users}
            label={t('sales.stats.total')}
            value={String(stats.leads_total)}
            detail={t('sales.stats.totalDetail')}
          />
          <MetricCard
            icon={BadgeCheck}
            label={t('sales.stats.qualified')}
            value={String(stats.qualified_or_better)}
            detail={t('sales.stats.qualifiedDetail')}
          />
          <MetricCard
            icon={UserCheck}
            label={t('sales.stats.awaitingHuman')}
            value={String(stats.awaiting_human)}
            detail={t('sales.stats.awaitingHumanDetail')}
            state={stats.awaiting_human > 0 ? 'error' : 'live'}
          />
          <MetricCard
            icon={MessageSquare}
            label={t('sales.stats.inbound7d')}
            value={String(stats.messages_in_last_7d)}
            detail={t('sales.stats.inbound7dDetail')}
          />
          <MetricCard
            icon={ShieldAlert}
            label={t('sales.stats.skipped7d')}
            value={String(stats.outbound_skipped_last_7d)}
            detail={t('sales.stats.skipped7dDetail')}
            state={stats.outbound_skipped_last_7d > 0 ? 'error' : 'live'}
          />
        </div>
      )}

      {stats && stats.opted_out > 0 && (
        <p className="flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-600">
          <ShieldAlert className="h-4 w-4" />
          {t('sales.stats.optedOutNote')} {stats.opted_out}
        </p>
      )}

      <div className="flex gap-2 border-b border-slate-200">
        {(['inbox', 'knowledge', 'playground'] as Tab[])
          .filter((value) => value === 'inbox' || isAdmin)
          .map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              className={cn(
                'border-b-2 px-3 py-2 text-sm font-medium transition',
                tab === value
                  ? 'border-sky-600 text-sky-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700',
              )}
            >
              {t(`sales.tab.${value}`)}
            </button>
          ))}
      </div>

      {tab === 'inbox' && (
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <div className="space-y-3">
            <Card className="flex flex-wrap items-end gap-3 p-3">
              <div className="min-w-[200px] flex-1">
                <Input
                  value={filters.q ?? ''}
                  onChange={(event) =>
                    setFilters((current) => ({
                      ...current,
                      q: event.target.value || undefined,
                    }))
                  }
                  placeholder={t('sales.filters.search')}
                />
              </div>
              <select
                value={filters.stage ?? ''}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    stage: (event.target.value || undefined) as LeadStage | undefined,
                  }))
                }
                className="rounded-md border border-slate-300 px-2 py-2 text-sm"
              >
                <option value="">{t('sales.filters.allStages')}</option>
                {STAGES.map((stage) => (
                  <option key={stage} value={stage}>
                    {t(`sales.stage.${stage}`)}
                  </option>
                ))}
              </select>
              <select
                value={filters.min_score ?? ''}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    min_score: event.target.value ? Number(event.target.value) : undefined,
                  }))
                }
                className="rounded-md border border-slate-300 px-2 py-2 text-sm"
              >
                <option value="">{t('sales.filters.anyScore')}</option>
                <option value="40">40+</option>
                <option value="70">70+</option>
              </select>
              <label className="flex items-center gap-1 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={filters.awaiting_human ?? false}
                  onChange={(event) =>
                    setFilters((current) => ({
                      ...current,
                      awaiting_human: event.target.checked || undefined,
                    }))
                  }
                />
                {t('sales.filters.awaitingHuman')}
              </label>
            </Card>

            {leadsQuery.isLoading ? (
              <Card className="flex justify-center p-8">
                <Spinner />
              </Card>
            ) : leadsQuery.isError ? (
              <Card className="flex items-center gap-2 p-6 text-sm text-rose-700">
                <AlertTriangle className="h-4 w-4" />
                {t('sales.leads.loadFailed')}
              </Card>
            ) : (
              <>
                <LeadsTable
                  leads={leadsQuery.data?.items ?? []}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
                <p className="text-xs text-slate-500">
                  {leadsQuery.data?.items.length ?? 0} / {leadsQuery.data?.total ?? 0}
                </p>
              </>
            )}
          </div>

          <div>
            {selectedId ? (
              <LeadDetail leadId={selectedId} />
            ) : (
              <Card className="flex flex-col items-center justify-center gap-2 p-10 text-center text-sm text-slate-500">
                <Inbox className="h-6 w-6 text-slate-400" />
                {t('sales.detail.selectPrompt')}
              </Card>
            )}
          </div>
        </div>
      )}

      {tab === 'knowledge' && isAdmin && <KnowledgeManager />}

      {tab === 'playground' && isAdmin && (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
          <AgentPlayground />
          <Card className="p-4">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <MessageSquareDashed className="h-4 w-4" />
              {t('sales.campaigns.title')}
            </h3>
            {stats?.top_campaigns.length ? (
              <ul className="space-y-1 text-sm">
                {stats.top_campaigns.map((row) => (
                  <li key={row.campaign} className="flex justify-between gap-2">
                    <span className="truncate text-slate-700">{row.campaign}</span>
                    <span className="font-semibold text-slate-900">{row.leads}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">{t('sales.campaigns.empty')}</p>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}
