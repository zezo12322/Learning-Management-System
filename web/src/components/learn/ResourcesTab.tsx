'use client'

import { Download, FileText, FolderOpen } from 'lucide-react'
import type { Section } from '@/lib/types'
import { useT } from '@/lib/i18n'
import { Card } from '@/components/ui/card'
import { EmptyState } from '@/components/student/EmptyState'
import { fileExtension, fileNameFromUrl, safeLinkUrl } from '@/lib/safeUrl'
import { cn } from '@/lib/utils'

const EXTENSION_TONE: Record<string, string> = {
  PDF: 'bg-error/10 text-error',
  DOC: 'bg-secondary/10 text-secondary',
  DOCX: 'bg-secondary/10 text-secondary',
  PPT: 'bg-warning/10 text-warning',
  PPTX: 'bg-warning/10 text-warning',
  ZIP: 'bg-brand-soft text-primary',
  JPG: 'bg-success/10 text-success',
  JPEG: 'bg-success/10 text-success',
  PNG: 'bg-success/10 text-success',
}

/**
 * Resources tab (Figma "10. resources").
 *
 * The only per-lecture file the API exposes is the transcript
 * (`Lecture.transcriptUrl`, uploaded as `LECTURE_TRANSCRIPT`), so that is what
 * this lists. There is no attachments endpoint, so the design's "Helpful Links"
 * block has no data source and is left out rather than filled with placeholders.
 *
 * Every href is sanitised: the URL comes from instructor-supplied data.
 */
export function ResourcesTab({ sections }: { sections: Section[] }) {
  const t = useT()

  const files = sections.flatMap((section) =>
    section.lectures
      .map((lecture) => {
        const href = safeLinkUrl(lecture.transcriptUrl)
        if (!href) return null
        return {
          id: lecture.id,
          href,
          lectureTitle: lecture.title,
          sectionTitle: section.title,
          name: fileNameFromUrl(href, lecture.title),
          extension: fileExtension(href) || 'FILE',
        }
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null),
  )

  if (!files.length) {
    return (
      <Card>
        <EmptyState
          icon={FolderOpen}
          title={t('learn.resources.empty')}
          description={t('learn.resources.emptyHint')}
        />
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-content">{t('learn.resources.title')}</h3>
        <span className="text-xs text-content-secondary">
          {t('learn.resources.count').replace('{n}', String(files.length))}
        </span>
      </div>

      <Card className="divide-y divide-border">
        {files.map((file) => (
          <div key={file.id} className="flex items-center gap-3 p-3">
            <span
              className={cn(
                'flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl text-[9px] font-bold',
                EXTENSION_TONE[file.extension] ?? 'bg-subtle text-content-secondary',
              )}
            >
              <FileText size={16} strokeWidth={1.8} />
              {file.extension}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-content">{file.name}</span>
              <span className="mt-0.5 block truncate text-[11px] text-content-secondary">
                {file.lectureTitle} · {file.sectionTitle}
              </span>
            </span>
            <a
              href={file.href}
              target="_blank"
              rel="noopener noreferrer"
              download
              aria-label={`${t('learn.resources.download')} ${file.name}`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border text-content-secondary transition-colors hover:border-primary hover:text-primary"
            >
              <Download size={17} />
            </a>
          </div>
        ))}
      </Card>
    </div>
  )
}
