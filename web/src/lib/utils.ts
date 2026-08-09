import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes with conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format a number compactly, e.g. 18200 -> "18.2K". */
export function formatCompact(n: number | null | undefined): string {
  if (n == null) return '0'
  if (n < 1000) return String(n)
  if (n < 1_000_000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`
  return `${(n / 1_000_000).toFixed(1)}M`
}

/** Format minutes into "Xh Ym" / "Ym". */
export function formatDuration(minutes: number | null | undefined): string {
  if (!minutes) return '0m'
  const h = Math.floor(minutes / 60)
  const m = Math.round(minutes % 60)
  if (h && m) return `${h}h ${m}m`
  if (h) return `${h}h`
  return `${m}m`
}

/** Format an ISO date as a locale-aware long date ("May 30, 2025"). */
export function formatDate(value: string | null | undefined, locale = 'en'): string {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(date)
}

/** Format a price with optional currency. */
export function formatPrice(value: number | null | undefined, currency = 'USD'): string {
  if (value == null) return ''
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value)
  } catch {
    return `$${value}`
  }
}
