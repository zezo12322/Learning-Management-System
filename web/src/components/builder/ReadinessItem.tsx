import { AlertCircle, CheckCircle2 } from 'lucide-react'

export function ReadinessItem({ label, complete, value }: { label: string; complete: boolean; value?: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-subtle px-3 py-3 text-xs">
      <span className="text-content-secondary">{label}</span>
      <span className={complete ? 'inline-flex items-center gap-1 font-semibold text-success' : 'inline-flex items-center gap-1 font-semibold text-warning'}>
        {complete ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
        {value ?? (complete ? 'Complete' : 'Missing')}
      </span>
    </div>
  )
}
