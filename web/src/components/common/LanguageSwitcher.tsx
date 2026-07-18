'use client'

import { Languages } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/** Toggles the app language (and RTL/LTR direction). */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { t, toggleLocale } = useI18n()
  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-input px-2.5 py-1.5 text-xs font-semibold text-content-secondary hover:bg-surface-hover hover:text-content',
        className,
      )}
      aria-label={t('lang.switchTo')}
      title={t('lang.switchTo')}
    >
      <Languages size={15} />
      {t('lang.switchTo')}
    </button>
  )
}
