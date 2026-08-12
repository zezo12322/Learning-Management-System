'use client'

import { FileText, RefreshCw, Video, X } from 'lucide-react'
import type { UploadAsset, UploadAssetState } from '@/lib/types'
import { UPLOAD_ERROR_KEYS } from '@/lib/api/upload'
import { useT } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { StatusPill, type StatusTone } from '@/components/workspace/StatusPill'
import { cn } from '@/lib/utils'

const stateView: Record<UploadAssetState, { labelKey: string; tone: StatusTone; border: string }> = {
  // QUEUED and READY used to share `border-border`, so "waiting" and "done"
  // looked identical at a glance.
  QUEUED: { labelKey: 'uploads.state.waiting', tone: 'neutral', border: 'border-dashed border-border' },
  UPLOADING: { labelKey: 'uploads.state.uploading', tone: 'brand', border: 'border-primary' },
  PROCESSING: { labelKey: 'uploads.state.transcoding', tone: 'info', border: 'border-secondary' },
  READY: { labelKey: 'uploads.state.ready', tone: 'success', border: 'border-success' },
  ERROR: { labelKey: 'uploads.state.failed', tone: 'danger', border: 'border-error' },
}

function bytesLabel(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`
  if (bytes >= 1024 * 1024) return `${Math.round(bytes / 1024 / 1024)} MB`
  return `${Math.max(1, Math.round(bytes / 1024))} KB`
}

export function UploadFileRow({
  asset,
  onRetry,
  onCancel,
  onRemove,
}: {
  asset: UploadAsset
  onRetry?: () => void
  onCancel?: () => void
  onRemove?: () => void
}) {
  const t = useT()
  const view = stateView[asset.state]
  const cancelled = asset.errorCode === 'CANCELLED'
  const failed = asset.state === 'ERROR'
  const transcoding = asset.state === 'PROCESSING'
  const errorMessage = asset.errorCode ? t(UPLOAD_ERROR_KEYS[asset.errorCode]) : null

  const tone = asset.state === 'READY' ? 'success' : failed ? 'error' : transcoding ? 'info' : 'primary'

  return (
    <div className={cn('rounded-card border bg-surface p-3.5 sm:p-4', view.border, failed && 'bg-error-soft/60')}>
      <div className="flex items-center gap-3">
        <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', asset.state === 'READY' ? 'bg-success-soft text-success' : transcoding ? 'bg-secondary/10 text-secondary' : failed ? 'bg-error-soft text-error' : 'bg-brand-soft text-on-brand-soft')}>
          {asset.mimeType.startsWith('video/') ? <Video size={18} aria-hidden /> : <FileText size={18} aria-hidden />}
        </span>
        <span className="min-w-0 flex-1">
          {/* dir="auto": filenames are overwhelmingly Latin even in Arabic UI,
              and without it the truncation ellipsis lands on the extension. */}
          <span dir="auto" className="block truncate text-xs font-semibold text-content sm:text-sm">{asset.name}</span>
          <span className="mt-1 block text-[10px] text-content-muted">
            {asset.state === 'UPLOADING' && asset.totalBytes
              ? t('uploads.bytesOf')
                  .replace('{done}', bytesLabel(asset.transferredBytes ?? 0))
                  .replace('{total}', bytesLabel(asset.totalBytes))
              : asset.sizeLabel}
          </span>
        </span>
        {/* The pill stays whatever else is shown: when a row failed it used to
            lose its only text label, leaving colour alone to say so. */}
        <StatusPill tone={view.tone} className="shrink-0">
          {asset.state === 'UPLOADING' ? `${asset.progress}%` : cancelled ? t('uploads.cancelled') : t(view.labelKey)}
        </StatusPill>
        {failed && onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry} className="shrink-0">
            <RefreshCw size={13} aria-hidden /> {t('common.retry')}
          </Button>
        )}
        {!failed && asset.state !== 'READY' && onCancel && (
          <Button variant="ghost" size="sm" onClick={onCancel} className="shrink-0">
            <X size={13} aria-hidden /> {t('uploads.cancel')}
          </Button>
        )}
        {(failed || asset.state === 'READY') && onRemove && (
          <Button variant="ghost" size="sm" onClick={onRemove} className="shrink-0">
            {t('uploads.remove')}
          </Button>
        )}
      </div>

      <Progress
        value={asset.progress}
        // Transcoding has no measurable progress — say "unknown" instead of
        // parking the bar at a made-up 78%.
        indeterminate={transcoding}
        tone={tone}
        label={t('uploads.progressLabel').replace('{name}', asset.name)}
        className="mt-3 h-1.5"
      />

      {transcoding && <p className="mt-2 text-[10px] text-content-secondary">{t('uploads.transcodingHint')}</p>}
      {failed && errorMessage && (
        <p role="alert" className="mt-2 text-[11px] font-medium text-error">{errorMessage}</p>
      )}
    </div>
  )
}
