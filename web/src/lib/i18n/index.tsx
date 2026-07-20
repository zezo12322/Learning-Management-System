'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_LOCALE,
  LOCALES,
  RTL_LOCALES,
  dictionaries,
  type Locale,
} from './dictionaries'

const STORAGE_KEY = 'optima.locale'

interface I18nContextValue {
  locale: Locale
  dir: 'rtl' | 'ltr'
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: (key: string, fallback?: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as string[]).includes(value)
}

function dirFor(locale: Locale): 'rtl' | 'ltr' {
  return RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr'
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  // Read the persisted choice after mount (avoids SSR/client hydration mismatch).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (isLocale(stored)) setLocaleState(stored)
    } catch {
      /* ignore */
    }
  }, [])

  // Keep <html lang/dir> in sync so RTL and screen readers work app-wide.
  useEffect(() => {
    const root = document.documentElement
    root.lang = locale
    root.dir = dirFor(locale)
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'en' ? 'ar' : 'en')
  }, [locale, setLocale])

  const t = useCallback(
    (key: string, fallback?: string) => {
      const table = dictionaries[locale]
      return table[key] ?? dictionaries[DEFAULT_LOCALE][key] ?? fallback ?? key
    },
    [locale],
  )

  const value = useMemo<I18nContextValue>(
    () => ({ locale, dir: dirFor(locale), setLocale, toggleLocale, t }),
    [locale, setLocale, toggleLocale, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within <I18nProvider>')
  }
  return ctx
}

/** Convenience hook returning just the translate function. */
export function useT() {
  return useI18n().t
}

export type { Locale }
