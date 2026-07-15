import { AlertTriangle, Bot, UserRound } from 'lucide-react'
import type { AICitation } from '@/lib/ai/contract'
import { cn } from '@/lib/utils'

export function ChatMessage({
  role,
  content,
  citations,
  unavailable = false,
}: {
  role: 'assistant' | 'user'
  content: string
  citations?: AICitation[]
  unavailable?: boolean
}) {
  const user = role === 'user'
  return (
    <div className={cn('flex gap-3', user && 'flex-row-reverse')}>
      <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', unavailable ? 'bg-error/10 text-error' : user ? 'bg-surface text-primary ring-1 ring-border' : 'bg-brand-soft text-primary')}>
        {unavailable ? <AlertTriangle size={16} /> : user ? <UserRound size={16} /> : <Bot size={16} />}
      </span>
      <div className={cn('max-w-[88%] rounded-card border px-4 py-3', user ? 'border-primary bg-primary text-white' : unavailable ? 'border-error bg-error/5' : 'border-border bg-surface')}>
        <p className={cn('text-xs font-semibold', user ? 'text-white' : unavailable ? 'text-error' : 'text-content')}>
          {user ? 'You' : unavailable ? 'AI unavailable' : 'Optima AI'}
        </p>
        <p className={cn('mt-1.5 text-xs leading-5', user ? 'text-white/90' : 'text-content-secondary')}>{content}</p>
        {citations?.map((citation) => (
          <span key={citation.sourceId} className="mt-2 inline-flex rounded-full bg-subtle px-2.5 py-1 text-[10px] font-medium text-content-secondary">
            {citation.label}
          </span>
        ))}
      </div>
    </div>
  )
}
