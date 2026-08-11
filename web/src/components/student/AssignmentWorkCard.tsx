'use client'

import { useState } from 'react'
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Clock,
  ExternalLink,
  Link2,
  Send,
  Target,
} from 'lucide-react'
import { useT } from '@/lib/i18n'
import { safeLinkUrl } from '@/lib/safeUrl'
import type { MyAssignment, MySubmission } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

function formatDateTime(value: string, locale: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

/**
 * One assignment as a learner sees it: what it asks for, what it is marked on,
 * every attempt they have made, and — the part that did not exist before — a way
 * to hand work in.
 *
 * The deliverable is a **link**, not a file upload. `POST /uploads/signed-url` is
 * instructor/admin-only, so this API has no learner-facing storage path;
 * `POST /missions/:id/submissions` takes a `fileUrl`. Pretending otherwise with
 * a file picker would mean uploading somewhere we cannot write.
 */
export function AssignmentWorkCard({
  assignment,
  submissions,
  locale,
  onSubmit,
  submitting,
  error,
}: {
  assignment: MyAssignment
  /** Graded detail for this assignment's attempts, from GET /me/submissions. */
  submissions: MySubmission[]
  locale: string
  onSubmit: (fileUrl: string) => void
  submitting: boolean
  error: string | null
}) {
  const t = useT()
  const [open, setOpen] = useState(false)
  const [composing, setComposing] = useState(false)
  const [fileUrl, setFileUrl] = useState('')
  const [linkError, setLinkError] = useState<string | null>(null)

  const latest = assignment.attempts[0]
  const graded = submissions.find((submission) => submission.status === 'GRADED')
  const state = graded ? 'GRADED' : latest ? latest.status : 'AVAILABLE'
  const tone =
    state === 'GRADED' ? 'success' : state === 'AVAILABLE' ? 'info' : state === 'PENDING' ? 'info' : 'warning'
  const Icon = state === 'GRADED' ? CheckCircle2 : state === 'AVAILABLE' ? ClipboardList : Send
  const tileTone =
    tone === 'success'
      ? 'bg-success-soft text-success'
      : tone === 'warning'
        ? 'bg-warning-soft text-warning'
        : 'bg-brand-soft text-on-brand-soft'

  const send = () => {
    const safe = safeLinkUrl(fileUrl)
    // Absolute http(s) only: a relative path would resolve against whatever host
    // opens it later, and the instructor opens these from their own machine.
    if (!safe || !/^https?:\/\//i.test(safe)) {
      setLinkError(t('assignments.submit.invalidLink'))
      return
    }
    setLinkError(null)
    onSubmit(safe)
  }

  return (
    <Card className="p-4">
      <div className="flex gap-3">
        <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', tileTone)}>
          <Icon size={20} strokeWidth={1.9} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="truncate text-sm font-bold text-content">{assignment.title}</h3>
            <Badge tone={tone}>{t(`assignments.state.${state}`, state)}</Badge>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-content-secondary">
            {assignment.course && <span className="truncate">{assignment.course.title}</span>}
            <span>{t(`difficulty.${assignment.difficulty}`, assignment.difficulty)}</span>
            {assignment.durationMinutes > 0 && (
              <span className="inline-flex items-center gap-1">
                <Clock size={12} /> {assignment.durationMinutes} {t('quizTake.min')}
              </span>
            )}
            {assignment.totalPoints > 0 && (
              <span className="inline-flex items-center gap-1 font-semibold">
                <Target size={12} /> {t('assignments.points').replace('{n}', String(assignment.totalPoints))}
              </span>
            )}
          </div>

          {graded && graded.totalScore != null && (
            <p className="mt-2 text-xs font-bold text-success">
              {t('assignments.score')}: {graded.totalScore}/{graded.maxPoints}
            </p>
          )}
          {graded?.feedback && (
            <p className="mt-2 rounded-input bg-subtle p-2.5 text-xs leading-5 text-content-secondary">
              {graded.feedback}
            </p>
          )}

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary"
          >
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {open ? t('assignments.hideDetails') : t('assignments.showDetails')}
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-4 space-y-4 border-t border-border pt-4">
          {assignment.scenario && (
            <div>
              <p className="text-xs font-bold text-content">{t('assignments.brief')}</p>
              <p className="mt-1 whitespace-pre-line text-xs leading-6 text-content-secondary">
                {assignment.scenario}
              </p>
            </div>
          )}

          {assignment.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {assignment.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-subtle px-2.5 py-1 text-[11px] text-content-secondary">
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* The rubric before submitting, not after — a learner should know what
              they are marked on while there is still time to act on it. */}
          {assignment.criteria.length > 0 && (
            <div>
              <p className="text-xs font-bold text-content">{t('assignments.rubric')}</p>
              <ul className="mt-2 space-y-1.5">
                {assignment.criteria.map((criterion) => (
                  <li
                    key={criterion.id}
                    className="flex items-start justify-between gap-3 rounded-input bg-subtle px-3 py-2"
                  >
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-content">{criterion.name}</span>
                      {criterion.description && (
                        <span className="mt-0.5 block text-[11px] leading-5 text-content-secondary">
                          {criterion.description}
                        </span>
                      )}
                    </span>
                    <span className="shrink-0 text-xs font-bold text-content-secondary">
                      {criterion.maxPoints}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {assignment.attempts.length > 0 && (
            <div>
              <p className="text-xs font-bold text-content">{t('assignments.yourAttempts')}</p>
              <ul className="mt-2 space-y-1.5">
                {assignment.attempts.map((attempt) => {
                  const detail = submissions.find((submission) => submission.id === attempt.id)
                  const link = safeLinkUrl(detail?.fileUrl)
                  return (
                    <li
                      key={attempt.id}
                      className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-input bg-subtle px-3 py-2 text-[11px]"
                    >
                      <span className="text-content-secondary">
                        {t('assignments.attemptN').replace('{n}', String(attempt.attemptNumber))} ·{' '}
                        {formatDateTime(attempt.submittedAt, locale)}
                      </span>
                      <span className="flex items-center gap-2">
                        {link && (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-semibold text-primary"
                          >
                            <ExternalLink size={11} /> {t('assignments.openWork')}
                          </a>
                        )}
                        <Badge tone={attempt.status === 'GRADED' ? 'success' : 'info'}>
                          {t(`assignments.status.${attempt.status}`, attempt.status)}
                        </Badge>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {composing ? (
            <div className="space-y-3 rounded-input bg-subtle p-3">
              <div>
                <label
                  htmlFor={`work-${assignment.id}`}
                  className="text-xs font-semibold text-content"
                >
                  {t('assignments.submit.linkLabel')}
                </label>
                <Input
                  id={`work-${assignment.id}`}
                  value={fileUrl}
                  onChange={(event) => setFileUrl(event.target.value)}
                  placeholder="https://drive.google.com/…"
                  icon={<Link2 size={16} />}
                  className="mt-2"
                  invalid={Boolean(linkError)}
                  inputMode="url"
                />
                <p className="mt-1.5 text-[11px] leading-5 text-content-muted">
                  {t('assignments.submit.linkHint')}
                </p>
              </div>
              {(linkError || error) && (
                <p className="rounded-input bg-error-soft px-3 py-2 text-xs text-error">{linkError || error}</p>
              )}
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setComposing(false)
                    setLinkError(null)
                  }}
                  disabled={submitting}
                >
                  {t('common.cancel')}
                </Button>
                <Button size="sm" onClick={send} loading={submitting}>
                  <Send size={14} /> {t('assignments.submit.action')}
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant={latest ? 'outline' : 'primary'}
              size="sm"
              onClick={() => {
                setFileUrl('')
                setLinkError(null)
                setComposing(true)
              }}
            >
              <Send size={14} />{' '}
              {latest ? t('assignments.submit.again') : t('assignments.submit.action')}
            </Button>
          )}
        </div>
      )}
    </Card>
  )
}
