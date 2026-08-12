'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertCircle, FileText, Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthProvider'
import { useT } from '@/lib/i18n'
import { parseTosContent, type TosBlock, type TosInline } from '@/lib/tos/tosContent'
import { Button } from '@/components/ui/button'

function Inline({ parts }: { parts: TosInline[] }) {
  return (
    <>
      {parts.map((part, index) =>
        part.href ? (
          <a
            key={index}
            href={part.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:no-underline"
          >
            {part.text}
          </a>
        ) : part.bold ? (
          <strong key={index} className="font-semibold text-content">
            {part.text}
          </strong>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </>
  )
}

function Block({ block }: { block: TosBlock }) {
  if (block.kind === 'heading') {
    const Tag = block.level === 2 ? 'h2' : 'h3'
    return (
      <Tag className={block.level === 2 ? 'text-base font-semibold text-content' : 'text-sm font-semibold text-content'}>
        <Inline parts={block.content} />
      </Tag>
    )
  }
  if (block.kind === 'list') {
    const Tag = block.ordered ? 'ol' : 'ul'
    return (
      <Tag className={block.ordered ? 'list-decimal space-y-1 ps-5' : 'list-disc space-y-1 ps-5'}>
        {block.items.map((item, index) => (
          <li key={index}>
            <Inline parts={item} />
          </li>
        ))}
      </Tag>
    )
  }
  return (
    <p>
      <Inline parts={block.content} />
    </p>
  )
}

/**
 * Blocks the app until the signed-in user accepts the current terms.
 *
 * Renders nothing at all unless acceptance is actually outstanding, so the
 * ordinary case costs a single boolean. It is deliberately not dismissable and
 * has no "later" — the whole point is that continued use implies agreement — but
 * it does offer sign-out, so nobody is trapped in a modal they will not accept.
 *
 * The counterpart server-side guard exists (TosGuard) but is applied to nothing
 * yet, because the Flutter app has no acceptance flow and gating shared
 * endpoints would lock mobile users out with no way to recover. This gate is
 * therefore the enforcement point for the web today.
 */
export function TosAcceptanceGate() {
  const { tosStatus, acceptTos, logout } = useAuth()
  const t = useT()
  const [submitting, setSubmitting] = useState(false)
  const [failed, setFailed] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const terms = tosStatus?.needsAcceptance ? tosStatus.current : null
  const open = terms !== null

  // Put focus on the document region so a screen reader starts at the terms
  // rather than at whatever the page had focused behind the gate.
  useEffect(() => {
    if (!open) return
    scrollRef.current?.focus()
  }, [open])

  /**
   * Keep Tab inside the gate. `aria-modal` already tells assistive tech the rest
   * of the page is unavailable, but it does nothing to stop the keyboard walking
   * into the app behind — which would let someone use the product without ever
   * answering. Escape deliberately does NOT close: there is no dismissing this,
   * only agreeing or signing out.
   */
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const root = dialogRef.current
      if (!root) return
      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const current = document.activeElement as HTMLElement | null
      const inside = current ? root.contains(current) : false
      if (event.shiftKey ? current === first || !inside : current === last || !inside) {
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
      }
    }
    document.addEventListener('keydown', onKeyDown, true)
    return () => document.removeEventListener('keydown', onKeyDown, true)
  }, [open])

  if (!terms) return null

  const blocks = parseTosContent(terms.contentHtml)

  const accept = async () => {
    setSubmitting(true)
    setFailed(false)
    try {
      await acceptTos()
    } catch {
      // Stay on the gate and say so: a silent failure here would look like the
      // button did nothing.
      setFailed(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tos-gate-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
      ref={dialogRef}
    >
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-xl">
        <div className="flex items-start gap-3 border-b border-border p-6">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-on-brand-soft">
            <FileText className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h1 id="tos-gate-title" className="text-lg font-semibold text-content">
              {terms.title || t('tos.title')}
            </h1>
            <p className="mt-1 text-sm text-content-muted">
              {t('tos.subtitle')}
              {terms.version ? ` · ${t('tos.version')} ${terms.version}` : ''}
            </p>
          </div>
        </div>

        <div
          ref={scrollRef}
          tabIndex={0}
          role="region"
          aria-label={t('tos.documentLabel')}
          className="flex-1 space-y-3 overflow-y-auto p-6 text-sm leading-relaxed text-content-muted"
        >
          {blocks.length > 0 ? (
            blocks.map((block, index) => <Block key={index} block={block} />)
          ) : (
            // A published version with unreadable content still has to be
            // acceptable — refusing to render would lock the account out.
            <p className="text-content-muted">{t('tos.contentUnavailable')}</p>
          )}
        </div>

        {failed ? (
          <p
            role="alert"
            className="flex items-center gap-2 border-t border-border bg-error-soft px-6 py-3 text-sm text-error"
          >
            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
            {t('tos.acceptFailed')}
          </p>
        ) : null}

        <div className="flex flex-col gap-2 border-t border-border p-6 sm:flex-row sm:justify-end">
          <Button variant="ghost" onClick={() => void logout()} disabled={submitting}>
            {t('tos.signOut')}
          </Button>
          <Button onClick={() => void accept()} disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="me-2 size-4 animate-spin" aria-hidden="true" />
                {t('tos.accepting')}
              </>
            ) : (
              t('tos.accept')
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
