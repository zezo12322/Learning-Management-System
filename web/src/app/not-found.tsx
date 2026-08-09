'use client'

import Link from 'next/link'
import { useT } from '@/lib/i18n'
import { buttonClasses } from '@/components/ui/button'

/**
 * 404 page. Without this, an unmatched URL falls back to the framework default:
 * an unstyled page outside the app shell, in English, with no way back in.
 */
export default function NotFound() {
  const t = useT()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-2xl font-bold text-primary">
        404
      </span>
      <h1 className="text-xl font-bold text-content">{t('notFound.title')}</h1>
      <p className="max-w-md text-sm text-content-secondary">{t('notFound.body')}</p>
      <Link href="/home" className={buttonClasses({ className: 'mt-2' })}>
        {t('notFound.cta')}
      </Link>
    </div>
  )
}
