'use client'

import { useMutation } from '@tanstack/react-query'
import { Bot, Send, User, Wrench } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { salesApi } from '@/lib/api/sales'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type Turn = {
  role: 'user' | 'agent'
  text: string
  tools?: Array<{ tool: string; ok: boolean }>
  citations?: Array<{ title?: string; doc_type?: string }>
  handoff?: { reason: string; urgency: string } | null
}

/**
 * Talk to the agent from the admin UI, with no Meta connection.
 *
 * Runs the real inbound path on the `WEB` channel rather than a mock, so what
 * gets tested here is what a customer would get — including which tools fired and
 * what the answer was grounded in. That visibility is the whole point: it turns
 * "the bot said something odd" into "it found nothing in the knowledge base".
 */
export function AgentPlayground() {
  const { t } = useI18n()
  const [draft, setDraft] = useState('')
  const [turns, setTurns] = useState<Turn[]>([])

  // A fresh session per mount, so a reload starts a clean conversation instead of
  // resuming one the tester has forgotten the shape of.
  const sessionId = useMemo(
    () => `playground-${Math.random().toString(36).slice(2, 10)}`,
    [],
  )

  const chat = useMutation({
    mutationFn: (message: string) => salesApi.previewChat(sessionId, message),
    onSuccess: (reply) => {
      setTurns((current) => [
        ...current,
        {
          role: 'agent',
          text: reply.reply,
          tools: reply.tool_calls,
          citations: reply.citations,
          handoff: reply.handoff,
        },
      ])
    },
  })

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const message = draft.trim()
    if (!message) return
    setTurns((current) => [...current, { role: 'user', text: message }])
    setDraft('')
    chat.mutate(message)
  }

  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">
          {t('sales.playground.title')}
        </h3>
        <Badge tone="muted">{t('sales.playground.channelWeb')}</Badge>
      </div>
      <p className="mb-3 text-xs text-slate-500">{t('sales.playground.hint')}</p>

      <div className="max-h-[420px] min-h-[160px] space-y-2 overflow-y-auto rounded-md bg-slate-50 p-3">
        {turns.length === 0 && (
          <p className="text-sm text-slate-500">{t('sales.playground.empty')}</p>
        )}
        {turns.map((turn, index) => (
          <div
            key={index}
            className={cn('flex', turn.role === 'user' ? 'justify-end' : 'justify-start')}
          >
            <div
              className={cn(
                'max-w-[85%] rounded-lg px-3 py-2 text-sm',
                turn.role === 'user'
                  ? 'bg-sky-600 text-white'
                  : 'bg-white text-slate-900 shadow-sm',
              )}
            >
              <div className="mb-1 flex items-center gap-1 text-[11px] opacity-70">
                {turn.role === 'user' ? (
                  <User className="h-3 w-3" />
                ) : (
                  <Bot className="h-3 w-3" />
                )}
                {turn.role === 'user'
                  ? t('sales.playground.you')
                  : t('sales.playground.agent')}
              </div>
              <p className="whitespace-pre-wrap break-words">{turn.text}</p>

              {(turn.tools?.length || turn.citations?.length) && (
                <div className="mt-2 flex flex-wrap gap-1 text-[11px]">
                  {turn.citations?.map((citation, i) => (
                    <span key={`c-${i}`} className="rounded bg-slate-100 px-1 text-slate-600">
                      {citation.title ?? citation.doc_type}
                    </span>
                  ))}
                  {turn.tools?.map((call, i) => (
                    <span
                      key={`t-${i}`}
                      className={cn(
                        'inline-flex items-center gap-0.5 rounded px-1',
                        call.ok ? 'bg-slate-100 text-slate-600' : 'bg-rose-100 text-rose-700',
                      )}
                    >
                      <Wrench className="h-2.5 w-2.5" />
                      {call.tool}
                    </span>
                  ))}
                </div>
              )}

              {turn.handoff && (
                <p className="mt-2 rounded bg-amber-50 px-2 py-1 text-[11px] text-amber-800">
                  {t('sales.playground.handoff')}: {turn.handoff.reason} (
                  {turn.handoff.urgency})
                </p>
              )}
            </div>
          </div>
        ))}
        {chat.isPending && (
          <p className="text-xs text-slate-500">{t('sales.playground.thinking')}</p>
        )}
      </div>

      <form className="mt-3 flex gap-2" onSubmit={submit}>
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={t('sales.playground.placeholder')}
          maxLength={2000}
        />
        <Button type="submit" disabled={chat.isPending || !draft.trim()}>
          <Send className="me-1 h-4 w-4" />
          {t('sales.detail.send')}
        </Button>
      </form>

      {chat.isError && (
        <p className="mt-2 text-xs text-rose-700">{t('sales.playground.failed')}</p>
      )}
    </Card>
  )
}
