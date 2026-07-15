'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { ArrowUp, BookOpenCheck, ChevronDown, Send, Settings2 } from 'lucide-react'
import { aiApi, getAIAvailability, type AIChatMessage } from '@/lib/ai/contract'
import { PageHeader } from '@/components/workspace/PageHeader'
import { ChatMessage } from '@/components/builder/ChatMessage'
import { StatusPill } from '@/components/workspace/StatusPill'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const initialMessages: AIChatMessage[] = [
  {
    role: 'assistant',
    content: 'The course defines user interviews as a primary research method and links the preparation checklist to lesson three.',
    citations: [{ sourceId: 'lesson-3', label: 'Course outline · Lesson 3' }],
  },
  { role: 'user', content: 'Create five quiz questions from module two.' },
]

export default function AITutorPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const availability = getAIAvailability()
  const [messages, setMessages] = useState<AIChatMessage[]>(initialMessages)
  const [input, setInput] = useState('')

  const chat = useMutation({
    mutationFn: (content: string) => aiApi.chat({ courseId, messages: [...messages, { role: 'user', content }], sourceIds: ['course', 'transcripts', 'resources'] }),
    onSuccess: (response) => setMessages((current) => [...current, { role: 'assistant', content: response.content, citations: response.citations }]),
  })

  const send = () => {
    const content = input.trim()
    if (!content || !availability.available) return
    setMessages((current) => [...current, { role: 'user', content }])
    setInput('')
    chat.mutate(content)
  }

  const suggestions = ['Summarize module 2', 'Create a practice question', 'Explain the rubric']

  return (
    <div className="space-y-6">
      <PageHeader title="AI Tutor test" description="Test grounded responses and recovery states before learners can access the tutor." />

      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 xl:grid-cols-[minmax(0,1fr)_316px]">
        <Card className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div><h2 className="text-base font-semibold text-content">Tutor sandbox</h2><p className="mt-1 text-[10px] text-content-muted">Preview-only conversation</p></div>
            <StatusPill tone={availability.available ? 'success' : 'warning'}>{availability.available ? 'Provider connected' : 'Provider unavailable'}</StatusPill>
          </div>

          <div className="mt-5 min-h-[500px] space-y-3 rounded-card bg-subtle p-3 sm:p-4">
            {messages.map((message, index) => <ChatMessage key={`${message.role}-${index}`} role={message.role} content={message.content} citations={message.citations} />)}
            {!availability.available && (
              <ChatMessage unavailable role="assistant" content="Connect an AI provider and implement the chat API contract to enable grounded responses." />
            )}
            {chat.isPending && <ChatMessage role="assistant" content="Grounding in selected course sources…" />}
            {chat.isError && <ChatMessage unavailable role="assistant" content={chat.error instanceof Error ? chat.error.message : 'The tutor request failed.'} />}
          </div>

          <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
            {suggestions.map((suggestion) => (
              <button key={suggestion} onClick={() => setInput(suggestion)} className="shrink-0 rounded-full border border-border bg-surface px-3 py-2 text-[11px] font-medium text-content-secondary hover:border-primary hover:bg-brand-soft hover:text-primary">{suggestion}</button>
            ))}
          </div>

          <div className={cn('mt-3 flex min-h-14 items-center gap-2 rounded-card border bg-surface px-3', availability.available ? 'border-border focus-within:border-primary' : 'border-border opacity-70')}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => { if (event.key === 'Enter') send() }}
              disabled={!availability.available || chat.isPending}
              placeholder={availability.available ? 'Ask about this course…' : 'AI chat needs a configured provider'}
              className="h-12 min-w-0 flex-1 bg-transparent text-sm text-content outline-none placeholder:text-content-muted disabled:cursor-not-allowed"
            />
            <button onClick={send} disabled={!availability.available || !input.trim() || chat.isPending} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white disabled:bg-subtle disabled:text-content-muted" aria-label="Send message">
              {chat.isPending ? <ArrowUp size={16} className="animate-pulse" /> : <Send size={16} />}
            </button>
          </div>
        </Card>

        <Card className="h-fit p-4 sm:p-5 xl:sticky xl:top-24">
          <div className="flex items-center gap-2"><Settings2 size={17} className="text-primary" /><h2 className="text-base font-semibold text-content">Test settings</h2></div>
          <p className="mt-2 text-[11px] leading-5 text-content-secondary">Control grounding, behavior, and learner-visible recovery.</p>

          <div className="mt-5 space-y-2">
            {[
              ['Tutor mode', 'Course Q&A'],
              ['Tone', 'Supportive'],
              ['Answer length', 'Concise'],
              ['Citations', 'Required'],
            ].map(([label, value]) => (
              <button key={label} className="flex w-full items-center justify-between rounded-input bg-subtle px-3 py-3 text-left">
                <span><span className="block text-[9px] text-content-muted">{label}</span><span className="mt-1 block text-xs font-semibold text-content">{value}</span></span>
                <ChevronDown size={14} className="text-content-muted" />
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-input bg-brand-soft p-4">
            <p className="flex items-center gap-2 text-xs font-semibold text-primary"><BookOpenCheck size={15} /> Grounding sources</p>
            <div className="mt-3 space-y-2 text-[10px] text-content-secondary"><p>✓ Course outline</p><p>✓ 8 lesson transcripts</p><p>✓ 3 resources</p></div>
          </div>

          <div className="mt-4 rounded-input bg-error/5 p-4">
            <p className="text-xs font-semibold text-error">{availability.available ? 'Provider connected' : 'Provider not configured'}</p>
            <p className="mt-2 text-[10px] leading-4 text-content-secondary">{availability.available ? 'Live tutor requests are enabled.' : 'The disabled composer and honest recovery state remain visible until the AI contract exists.'}</p>
          </div>

          <div className="mt-4 rounded-input bg-secondary/10 p-4">
            <p className="text-xs font-semibold text-secondary">Pre-launch checks</p>
            <div className="mt-3 space-y-2 text-[10px] text-content-secondary">{['Citations resolve','No-source refusal','Error recovery','Instructor approval'].map((check) => <label key={check} className="flex items-center gap-2"><input type="checkbox" className="h-3.5 w-3.5 rounded border-border text-primary" />{check}</label>)}</div>
          </div>
        </Card>
      </div>
    </div>
  )
}
