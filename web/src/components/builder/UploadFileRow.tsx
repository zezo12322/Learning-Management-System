'use client'

import { FileText, RefreshCw, Video } from 'lucide-react'
import type { UploadAsset, UploadAssetState } from '@/lib/types'
import { useT } from '@/lib/i18n'
import { Progress } from '@/components/ui/progress'
import { StatusPill, type StatusTone } from '@/components/workspace/StatusPill'
import { cn } from '@/lib/utils'

const stateView: Record<UploadAssetState, { labelKey: string; tone: StatusTone; border: string }> = {
  QUEUED: { labelKey: 'uploads.state.queued', tone: 'neutral', border: 'border-border' },
  UPLOADING: { labelKey: 'uploads.state.uploading', tone: 'brand', border: 'border-primary' },
  PROCESSING: { labelKey: 'uploads.state.transcoding', tone: 'info', border: 'border-secondary' },
  READY: { labelKey: 'uploads.state.ready', tone: 'success', border: 'border-border' },
  ERROR: { labelKey: 'uploads.state.retry', tone: 'danger', border: 'border-error' },
}

export function UploadFileRow({ asset, onRetry }: { asset: UploadAsset; onRetry?: () => void }) {
  const t = useT()
  const view = stateView[asset.state]
  return (
    <div className={cn('rounded-card border bg-surface p-3.5 sm:p-4', view.border, asset.state === 'ERROR' && 'bg-error/5')}>
      <div className="flex items-center gap-3">
        <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', asset.state === 'READY' ? 'bg-success/10 text-success' : asset.state === 'PROCESSING' ? 'bg-secondary/10 text-secondary' : asset.state === 'ERROR' ? 'bg-error/10 text-error' : 'bg-brand-soft text-primary')}>
          {asset.mimeType.startsWith('video/') ? <Video size={18} /> : <FileText size={18} />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-xs font-semibold text-content sm:text-sm">{asset.name}</span>
          <span className="mt-1 block text-[10px] text-content-muted">{asset.sizeLabel}</span>
        </span>
        {asset.state === 'ERROR' && onRetry ? (
          <button onClick={onRetry} className="inline-flex items-center gap-1 text-[10px] font-semibold text-error"><RefreshCw size={12} /> {t('common.retry')}</button>
        ) : (
          <StatusPill tone={view.tone}>{asset.state === 'UPLOADING' ? `${asset.progress}%` : t(view.labelKey)}</StatusPill>
        )}
      </div>
      <Progress value={asset.progress} tone={asset.state === 'READY' ? 'success' : 'primary'} className={cn('mt-3 h-1.5', asset.state === 'PROCESSING' && '[&>div]:bg-secondary', asset.state === 'ERROR' && '[&>div]:bg-error')} />
    </div>
  )
}
