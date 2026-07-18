'use client'

import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { useT } from '@/lib/i18n'

export function ReadinessItem({ label, complete, value }: { label: string; complete: boolean; value?: string }) {
  const t = useT()
  return (
    <div className="flex items-center justify-between rounded-xl bg-subtle px-3 py-3 text-xs">
      <span className="text-content-secondary">{label}</span>
      <span className={complete ? 'inline-flex items-center gap-1 font-semibold text-success' : 'inline-flex items-center gap-1 font-semibold text-warning'}>
        {complete ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
        {value ?? (complete ? t('common.complete') : t('common.missing'))}
      </span>
    </div>
  )
}
