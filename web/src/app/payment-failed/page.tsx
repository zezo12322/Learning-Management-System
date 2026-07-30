'use client'

import Link from 'next/link'
import { XCircle } from 'lucide-react'
import { useT } from '@/lib/i18n'

// Landing page for the Paymob browser redirect: the backend `/payments/callback`
// sends the user to `${FRONTEND_URL}/payment-failed` when the gateway reports a
// declined or aborted transaction. No enrollment is activated in that case.
export default function PaymentFailedPage() {
  const t = useT()

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-10 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-error/10 text-error">
          <XCircle size={34} strokeWidth={2.2} />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-content">{t('payment.failed.title')}</h1>
        <p className="mt-3 text-sm leading-6 text-content-secondary">{t('payment.failed.body')}</p>
        <p className="mt-2 text-xs leading-5 text-content-secondary">{t('payment.failed.hint')}</p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/catalog"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-btn bg-primary px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-600 active:bg-primary-700"
          >
            {t('payment.failed.cta')}
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-btn border border-border bg-surface px-5 text-sm font-semibold text-content transition-colors hover:bg-background"
          >
            {t('payment.backToDashboard')}
          </Link>
        </div>
      </div>
    </main>
  )
}
