'use client'

import { useRef, useState } from 'react'
import { Send, Sparkles, AlertCircle } from 'lucide-react'
import { askTutor, TutorError, type TutorCitation } from '@/lib/ai/tutor'
import { Button } from '@/components/ui/button'
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
    setTurns((t) => [...t, { role: 'user', content: message }])
    setLoading(true)
    try {
      const res = await askTutor({
        courseId,
        videoId,
        message,
        sessionId: sessionId.current,
      })
      sessionId.current = res.sessionId
      setTurns((t) => [
        ...t,
        {
          role: 'assistant',
          content: res.answer,
          citations: res.citations,
          grounded: res.grounded,
        },
      ])
    } catch (e) {
      const te = e as TutorError
      const msg =
        te.code === 'VIDEO_NOT_READY'
          ? 'This video is still being indexed. Try again once processing completes.'
          : te.code === 'AI_NOT_CONFIGURED'
            ? 'The AI service is not configured for this environment yet.'
            : te.message || 'Something went wrong.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-[520px] flex-col overflow-hidden rounded-input border border-border bg-surface">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Sparkles size={16} className="text-primary" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-content">AI Tutor</p>
          {videoTitle && (
            <p className="truncate text-xs text-content-secondary">Grounded in: {videoTitle}</p>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {turns.length === 0 && (
          <p className="mt-8 text-center text-sm text-content-secondary">
            Ask a question about this lesson. Answers are grounded in the video transcript, with
            timestamped citations.
          </p>
        )}
        {turns.map((turn, i) => (
          <div
            key={i}
            className={cn('flex', turn.role === 'user' ? 'justify-end' : 'justify-start')}
          >
            <div
              className={cn(
                'max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm',
                turn.role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-background text-content',
              )}
            >
              <p className="whitespace-pre-wrap">{turn.content}</p>
              {turn.role === 'assistant' && turn.citations && turn.citations.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {turn.citations.map((c, j) => (
                    <span
                      key={j}
                      className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary"
                      title={c.videoTitle}
                    >
                      {c.label || msLabel(c.startMs)}
                    </span>
                  ))}
                </div>
              )}
              {turn.role === 'assistant' && turn.grounded === false && (
                <p className="mt-1.5 text-[11px] text-content-muted">
                  Not grounded in this video&apos;s content.
                </p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-background px-3.5 py-2.5 text-sm text-content-secondary">
              Thinking…
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 border-t border-border bg-error/10 px-4 py-2 text-xs text-error">
          <AlertCircle size={14} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Composer */}
      <div className="flex items-center gap-2 border-t border-border px-3 py-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              void send()
            }
          }}
          placeholder="Ask about this lesson…"
          className="flex-1 rounded-input border border-border bg-background px-3 py-2 text-sm text-content outline-none focus:border-primary"
          disabled={loading}
        />
        <Button size="sm" onClick={() => void send()} loading={loading} disabled={!input.trim()}>
          <Send size={15} />
        </Button>
      </div>
    </div>
  )
}
