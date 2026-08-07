'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AlertTriangle, Bot, Send, User, UserCheck, Wrench } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import {
  type LeadMessage,
  type LeadStage,
  salesApi,
} from '@/lib/api/sales'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/** Axios error shape for the two message envelopes the backend can return. */
type SendError = {
  response?: {
    data?: { error?: { message?: string }; message?: string }
  }
}

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

function MessageBubble({ message }: { message: LeadMessage }) {
  const { t } = useI18n()
  const inbound = message.direction === 'INBOUND'
  const Icon = message.author === 'HUMAN' ? UserCheck : message.author === 'LEAD' ? User : Bot

  return (
    <div className={cn('flex gap-2', inbound ? 'justify-start' : 'justify-end')}>
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-3 py-2 text-sm',
          inbound
            ? 'bg-slate-100 text-slate-900'
            : message.author === 'HUMAN'
              ? 'bg-amber-100 text-amber-950'
              : 'bg-sky-600 text-white',
        )}
      >
        <div className="mb-1 flex items-center gap-1 text-[11px] opacity-75">
          <Icon className="h-3 w-3" />
          <span>{t(`sales.author.${message.author}`)}</span>
          {message.template_name && (
            <span className="rounded bg-black/10 px-1">
              {t('sales.detail.template')}: {message.template_name}
            </span>
          )}
          {message.status === 'FAILED' && (
            <span className="font-semibold text-rose-600">
              {t('sales.detail.sendFailed')}
            </span>
          )}
        </div>
        <p className="whitespace-pre-wrap break-words">{message.text}</p>

        {/* Grounding and tool use, so an answer can be audited without
            re-running the model. */}
        {(message.citations?.length || message.tool_calls?.length) && (
          <div className="mt-2 flex flex-wrap gap-1 text-[11px] opacity-80">
            {message.citations?.map((citation, index) => (
              <span key={index} className="rounded bg-black/10 px-1">
                {citation.title ?? citation.doc_type}
              </span>
            ))}
            {message.tool_calls?.map((call, index) => (
              <span
                key={`tool-${index}`}
                className={cn(
                  'inline-flex items-center gap-0.5 rounded px-1',
                  call.ok ? 'bg-black/10' : 'bg-rose-500/30',
                )}
              >
                <Wrench className="h-2.5 w-2.5" />
                {call.tool}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function LeadDetail({ leadId }: { leadId: string }) {
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const [draft, setDraft] = useState('')

  const detailQuery = useQuery({
    queryKey: ['sales-lead', leadId],
    queryFn: () => salesApi.getLead(leadId),
  })
  const sequencesQuery = useQuery({
    queryKey: ['sales-sequences'],
    queryFn: salesApi.sequences,
  })

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ['sales-lead', leadId] })
    void queryClient.invalidateQueries({ queryKey: ['sales-leads'] })
    void queryClient.invalidateQueries({ queryKey: ['sales-stats'] })
  }

  const patch = useMutation({
    mutationFn: (body: Parameters<typeof salesApi.patchLead>[1]) =>
      salesApi.patchLead(leadId, body),
    onSuccess: invalidate,
  })
  const send = useMutation({
    mutationFn: (text: string) => salesApi.sendMessage(leadId, text),
    onSuccess: () => {
      setDraft('')
      invalidate()
    },
  })
  const enroll = useMutation({
    mutationFn: (sequenceName: string) => salesApi.enroll(leadId, sequenceName),
    onSuccess: invalidate,
  })
  const stopSequences = useMutation({
    mutationFn: () => salesApi.stopSequences(leadId),
    onSuccess: invalidate,
  })

  if (detailQuery.isLoading) {
    return (
      <Card className="flex items-center justify-center p-8">
        <Spinner />
      </Card>
    )
  }
  if (detailQuery.isError || !detailQuery.data) {
    return (
      <Card className="p-6 text-sm text-rose-700">{t('sales.detail.loadFailed')}</Card>
    )
  }

  const { lead, qualification, score_breakdown, missing_fields, messages, outbound } =
    detailQuery.data
  const sendError = send.error as SendError | null

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {lead.full_name || lead.phone_e164 || t('sales.leads.unnamed')}
            </h3>
            <p className="text-sm text-slate-500">
              {[lead.company_name, lead.phone_e164, lead.email]
                .filter(Boolean)
                .join(' · ') || t('sales.detail.noContact')}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={lead.score >= 70 ? 'success' : 'muted'}>
              {t('sales.detail.score')} {lead.score}/100
            </Badge>
            {lead.opted_out && (
              <Badge tone="warning">{t('sales.leads.optedOut')}</Badge>
            )}
            {lead.human_takeover && (
              <Badge tone="info">{t('sales.detail.humanOwned')}</Badge>
            )}
          </div>
        </div>

        {/* Why the score is what it is — a rep should never have to guess. */}
        {score_breakdown && Object.keys(score_breakdown).length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1 text-xs">
            {Object.entries(score_breakdown)
              .filter(([, value]) => value > 0)
              .map(([key, value]) => (
                <span key={key} className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-600">
                  {key} +{value}
                </span>
              ))}
          </div>
        )}

        {missing_fields.length > 0 && (
          <p className="mt-3 text-xs text-slate-500">
            {t('sales.detail.stillUnknown')}: {missing_fields.join(', ')}
          </p>
        )}

        {Object.keys(qualification).length > 0 && (
          <dl className="mt-3 grid grid-cols-1 gap-1 text-xs sm:grid-cols-2">
            {Object.entries(qualification).map(([key, value]) => (
              <div key={key} className="flex gap-1">
                <dt className="font-medium text-slate-600">{key}:</dt>
                <dd className="text-slate-800">{String(value)}</dd>
              </div>
            ))}
          </dl>
        )}
      </Card>

      <Card className="p-4">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <Label htmlFor="stage">{t('sales.detail.stage')}</Label>
            <select
              id="stage"
              value={lead.stage}
              onChange={(event) => patch.mutate({ stage: event.target.value as LeadStage })}
              className="mt-1 rounded-md border border-slate-300 px-2 py-1.5 text-sm"
            >
              {STAGES.map((stage) => (
                <option key={stage} value={stage}>
                  {t(`sales.stage.${stage}`)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="sequence">{t('sales.detail.cadence')}</Label>
            <div className="mt-1 flex gap-2">
              <select
                id="sequence"
                defaultValue=""
                onChange={(event) => {
                  if (event.target.value) enroll.mutate(event.target.value)
                }}
                disabled={lead.opted_out}
                className="rounded-md border border-slate-300 px-2 py-1.5 text-sm disabled:opacity-50"
              >
                <option value="">{t('sales.detail.pickCadence')}</option>
                {(sequencesQuery.data ?? []).map((sequence) => (
                  <option key={sequence.id} value={sequence.name}>
                    {sequence.name} ({sequence.step_count})
                  </option>
                ))}
              </select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => stopSequences.mutate()}
                disabled={stopSequences.isPending}
              >
                {t('sales.detail.stopCadence')}
              </Button>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => patch.mutate({ human_takeover: !lead.human_takeover })}
            disabled={patch.isPending}
          >
            {lead.human_takeover
              ? t('sales.detail.returnToAgent')
              : t('sales.detail.takeOver')}
          </Button>
        </div>

        {enroll.data && !enroll.data.enrolled && (
          <p className="mt-2 text-xs text-amber-700">
            {t('sales.detail.notEnrolled')}: {enroll.data.reason}
          </p>
        )}
      </Card>

      <Card className="p-4">
        <h4 className="mb-3 text-sm font-semibold text-slate-700">
          {t('sales.detail.conversation')}
        </h4>
        <div className="max-h-[420px] space-y-2 overflow-y-auto pe-1">
          {messages.length === 0 ? (
            <p className="text-sm text-slate-500">{t('sales.detail.noMessages')}</p>
          ) : (
            messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))
          )}
        </div>

        {lead.opted_out ? (
          <p className="mt-4 flex items-center gap-2 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-800">
            <AlertTriangle className="h-4 w-4" />
            {t('sales.detail.optedOutNotice')}
          </p>
        ) : (
          <form
            className="mt-4 flex gap-2"
            onSubmit={(event) => {
              event.preventDefault()
              if (draft.trim()) send.mutate(draft.trim())
            }}
          >
            <Input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={t('sales.detail.replyPlaceholder')}
              maxLength={4000}
            />
            <Button type="submit" disabled={send.isPending || !draft.trim()}>
              <Send className="me-1 h-4 w-4" />
              {t('sales.detail.send')}
            </Button>
          </form>
        )}
        {!lead.opted_out && (
          <p className="mt-1 text-xs text-slate-500">
            {t('sales.detail.takeOverHint')}
          </p>
        )}
        {sendError && (
          <p className="mt-2 text-xs text-rose-700">
            {sendError.response?.data?.error?.message ??
              sendError.response?.data?.message ??
              t('sales.detail.sendFailed')}
          </p>
        )}
      </Card>

      {outbound.length > 0 && (
        <Card className="p-4">
          <h4 className="mb-2 text-sm font-semibold text-slate-700">
            {t('sales.detail.outbound')}
          </h4>
          <ul className="space-y-1 text-xs">
            {outbound.map((row) => (
              <li key={row.id} className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    'rounded px-1.5 py-0.5 font-medium',
                    row.status === 'SENT'
                      ? 'bg-emerald-100 text-emerald-800'
                      : row.status === 'PENDING'
                        ? 'bg-sky-100 text-sky-800'
                        : 'bg-slate-100 text-slate-600',
                  )}
                >
                  {row.status}
                </span>
                <span className="text-slate-500">{row.channel}</span>
                {row.template_name && (
                  <span className="text-slate-500">{row.template_name}</span>
                )}
                {/* The reason a send did not happen is as useful as a send. */}
                {row.skip_reason && (
                  <span className="text-amber-700">{row.skip_reason}</span>
                )}
                <span className="truncate text-slate-400">{row.body}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}
