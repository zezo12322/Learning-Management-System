'use client'

import { Bot, Clock3 } from 'lucide-react'
import { useT } from '@/lib/i18n'
import { Card } from '@/components/ui/card'

export function AIUnavailable({ compact = false }: { compact?: boolean }) {
  const t = useT()
  if (compact) {
    return (
      <div className="rounded-input bg-brand-soft p-3">
        <p className="flex items-center gap-2 text-xs font-semibold text-primary">
          <Clock3 size={14} /> {t('ai.comingSoon')}
        </p>
        <p className="mt-1 text-[11px] leading-5 text-content-secondary">
          {t('ai.comingSoonBody')}
        </p>
      </div>
    )
  }

  return (
    <Card className="border-primary/20 bg-brand-soft p-5 sm:p-6">
      <div className="flex gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface text-primary">
          <Bot size={21} />
        </span>
        <div>
          <p className="text-base font-semibold text-content">{t('ai.title')}</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-content-secondary">
            {t('ai.body')}
          </p>
        </div>
      </div>
    </Card>
  )
}
