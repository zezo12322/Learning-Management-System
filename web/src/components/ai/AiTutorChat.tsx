'use client'

import { useRef, useState } from 'react'
import { Send, Sparkles, AlertCircle } from 'lucide-react'
import { askTutor, TutorError, type TutorCitation } from '@/lib/ai/tutor'
import { useT } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface ChatTurn {
  role: 'user' | 'assistant'
  content: string
  citations?: TutorCitation[]
  grounded?: boolean
}

function msLabel(ms: number): string {
  const total = Math.floor(ms / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function AiTutorChat({
  courseId,
  videoId,
  videoTitle,
}: {
  courseId: string
  videoId: string
  videoTitle?: string
}) {
  const t = useT()
  const [turns, setTurns] = useState<ChatTurn[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const sessionId = useRef<string | undefined>(undefined)

  async function send() {
    const message = input.trim()
    if (!message || loading) return
    setError(null)
    setInput('')
    setTurns((current) => [...current, { role: 'user', content: message }])
    setLoading(true)
    try {
      const res = await askTutor({
        courseId,
        videoId,
        message,
        sessionId: sessionId.current,
      })
      sessionId.current = res.sessionId
      setTurns((current) => [
        ...current,
        {
          role: 'assistant',
          content: res.answer,
          citations: res.citations,
          grounded: res.grounded,
        },
      ])
    } catch (e) {
      const te = e as TutorError
      setError(
        te.code === 'VIDEO_NOT_READY'
          ? t('ai.error.videoNotReady')
          : te.code === 'AI_NOT_CONFIGURED'
            ? t('ai.error.notConfigured')
            : te.message || t('ai.error.generic'),
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    // A responsive range instead of a fixed h-[520px], which cut the composer off
    // on a short laptop window and wasted half the screen on a tall one.
    <div className="flex min-h-[360px] flex-col overflow-hidden rounded-input border border-border bg-surface md:min-h-[440px] xl:max-h-[calc(100vh-320px)]">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-2 border-b border-border px-4 py-3">
        <Sparkles size={16} className="text-primary" aria-hidden />
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-content">{t('ai.tutor.heading')}</h2>
          {videoTitle && (
            <p className="truncate text-xs text-content-secondary">
              {t('ai.tutor.groundedIn').replace('{name}', videoTitle)}
            </p>
          )}
        </div>
      </div>

      {/* Messages */}
      {/* role="log" carries polite live semantics and is the correct role for an
          append-only transcript. tabIndex={0} because this is now a real scroll
          container (the box became flexible rather than a fixed h-[520px], so it
          overflows far sooner) and not one of its children is focusable — without
          it a keyboard-only user cannot scroll back through the conversation
          (WCAG 2.1.1). */}
      <div
        role="log"
        tabIndex={0}
        aria-label={t('ai.tutor.messagesLabel')}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40"
      >
        {turns.length === 0 && (
          <p className="mt-8 text-center text-sm text-content-secondary">{t('ai.tutor.emptyState')}</p>
        )}
        {turns.map((turn, i) => (
          <div key={i} className={cn('flex', turn.role === 'user' ? 'justify-end' : 'justify-start')}>
            <div
              className={cn(
                'max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm',
                turn.role === 'user'
                  ? 'bg-primary text-white'
                  // bg-background inside a bg-surface card is #0F172A on #1E293B
                  // in dark mode — the turn boundary all but disappeared.
                  : 'border border-border bg-subtle text-content',
              )}
            >
              <p className="whitespace-pre-wrap">{turn.content}</p>
              {turn.role === 'assistant' && turn.citations && turn.citations.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {turn.citations.map((c, j) => (
                    <span
                      key={j}
                      className="rounded-full bg-info-soft px-2 py-0.5 text-[11px] font-medium text-info"
                      title={c.videoTitle}
                    >
                      {t('ai.studio.citationAt').replace('{time}', c.label || msLabel(c.startMs))}
                    </span>
                  ))}
                </div>
              )}
              {turn.role === 'assistant' && turn.grounded === false && (
                <p className="mt-1.5 text-[11px] text-content-muted">{t('ai.tutor.notGrounded')}</p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-border bg-subtle px-3.5 py-2.5 text-sm text-content-secondary">
              {t('ai.tutor.thinking')}
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div role="alert" className="flex shrink-0 items-start gap-2 border-t border-border bg-error-soft px-4 py-2 text-xs text-error">
          <AlertCircle size={14} className="mt-0.5 shrink-0" aria-hidden />
          <span>{error}</span>
        </div>
      )}

      {/* Composer */}
      <div className="flex shrink-0 items-end gap-2 border-t border-border px-3 py-3">
        <div className="min-w-0 flex-1">
          <label htmlFor="ai-tutor-question" className="mb-1 block text-[11px] font-medium text-content-secondary">
            {t('ai.tutor.inputLabel')}
          </label>
          <Input
            id="ai-tutor-question"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                void send()
              }
            }}
            placeholder={t('ai.tutor.inputPlaceholder')}
            disabled={loading}
            className="h-10"
          />
        </div>
        <Button
          size="sm"
          onClick={() => void send()}
          loading={loading}
          disabled={!input.trim()}
          aria-label={t('ai.tutor.send')}
        >
          {/* The paper plane points along the reading direction, so it flips —
              but with a horizontal MIRROR, not the codebase's usual
              `rtl:rotate-180`. That idiom is only valid for glyphs symmetric
              about the horizontal axis (Arrow/Chevron/Play); Send points
              up-and-right, and a 180° rotation would aim it down-and-left. */}
          <Send size={15} className="rtl:-scale-x-100" aria-hidden />
        </Button>
      </div>
    </div>
  )
}
