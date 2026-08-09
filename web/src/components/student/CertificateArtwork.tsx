import { Award } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * The printable certificate artwork from Figma "14. certificates": a white
 * sheet with two blue corner wedges, the completion wording, the learner's
 * name, the course title, the completion date and a gold seal.
 *
 * `compact` renders the same sheet at list-thumbnail scale (text is scaled with
 * container-relative sizes so a single markup tree serves both).
 */
export function CertificateArtwork({
  learnerName,
  courseTitle,
  completedOn,
  issuerName,
  compact,
  className,
}: {
  learnerName: string
  courseTitle: string
  completedOn?: string
  issuerName?: string
  compact?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative isolate aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-white',
        className,
      )}
    >
      {/* Corner wedges */}
      <span
        aria-hidden
        className="absolute -start-px -top-px h-[38%] w-[30%] bg-gradient-to-br from-primary-500 to-secondary-500"
        style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
      />
      <span
        aria-hidden
        className="absolute -bottom-px -end-px h-[38%] w-[30%] bg-gradient-to-tl from-primary-500 to-secondary-500"
        style={{ clipPath: 'polygon(100% 100%, 100% 0, 0 100%)' }}
      />

      <div
        className={cn(
          'relative flex h-full flex-col items-center justify-center text-center text-slate-900',
          compact ? 'px-2 py-1.5' : 'px-8 py-4 sm:px-12',
        )}
      >
        <p
          className={cn(
            'font-bold uppercase tracking-[0.18em]',
            compact ? 'text-[7px]' : 'text-base sm:text-xl',
          )}
        >
          Certificate
        </p>
        <p
          className={cn(
            'uppercase tracking-[0.24em] text-slate-500',
            compact ? 'mt-px text-[4px]' : 'text-[8px] sm:text-[10px]',
          )}
        >
          of Completion
        </p>

        {!compact && <p className="mt-2.5 text-[10px] italic text-slate-500">This is to certify that</p>}

        <p
          className={cn(
            'font-bold text-slate-900',
            compact ? 'mt-1 max-w-full truncate text-[7px]' : 'mt-1 line-clamp-1 max-w-full text-lg sm:text-2xl',
          )}
        >
          {learnerName}
        </p>

        {!compact && (
          <p className="mt-2 text-[10px] text-slate-500">has successfully completed the course</p>
        )}

        <p
          className={cn(
            'font-semibold text-slate-700',
            compact ? 'mt-px line-clamp-1 max-w-full text-[5px]' : 'mt-0.5 line-clamp-2 max-w-full text-xs sm:text-sm',
          )}
        >
          {courseTitle}
        </p>

        <span
          className={cn(
            'flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-white shadow',
            compact ? 'mt-1 h-3.5 w-3.5' : 'mt-3 h-9 w-9',
          )}
        >
          <Award size={compact ? 9 : 20} strokeWidth={1.8} />
        </span>

        {!compact && (completedOn || issuerName) && (
          <div className="mt-3 flex w-full max-w-sm items-end justify-between gap-6 text-[9px] text-slate-500">
            <span className="flex-1 border-t border-slate-300 pt-1">{completedOn ?? ''}</span>
            <span className="flex-1 border-t border-slate-300 pt-1">{issuerName ?? ''}</span>
          </div>
        )}
      </div>
    </div>
  )
}
