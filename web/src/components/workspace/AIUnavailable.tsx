import Link from 'next/link'
import { AlertTriangle, Bot, CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getAIAvailability } from '@/lib/ai/contract'

export function AIUnavailable({ compact = false }: { compact?: boolean }) {
  const availability = getAIAvailability()
  if (availability.available) {
    return (
      <div className="flex items-center gap-2 rounded-input bg-success/10 px-3 py-2 text-xs font-medium text-success">
        <CheckCircle2 size={15} /> Connected to {availability.provider}
      </div>
    )
  }

  if (compact) {
    return (
      <div className="rounded-input bg-warning/10 p-3">
        <p className="flex items-center gap-2 text-xs font-semibold text-warning"><AlertTriangle size={14} /> Provider setup required</p>
        <p className="mt-1 text-[11px] leading-5 text-content-secondary">No AI provider, chat, or RAG endpoint exists in the current backend.</p>
      </div>
    )
  }

  return (
    <Card className="border-warning/25 bg-warning/10 p-4 sm:p-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface text-warning"><Bot size={19} /></span>
          <div>
            <p className="text-sm font-semibold text-warning">AI provider connection required</p>
            <p className="mt-1 max-w-3xl text-xs leading-5 text-content-secondary">
              The frontend contract is ready, but the backend currently exposes no provider, chat, or RAG endpoints. Generation stays disabled until a provider-neutral service is configured.
            </p>
          </div>
        </div>
        <Link href="/studio/demo-course/ai-studio">
          <Button variant="outline" className="whitespace-nowrap">View setup</Button>
        </Link>
      </div>
    </Card>
  )
}
