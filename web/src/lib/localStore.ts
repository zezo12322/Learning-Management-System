'use client'

import { useSyncExternalStore } from 'react'

/**
 * Per-account localStorage, for the handful of features the backend has no
 * endpoint for yet (bookmarks, lecture notes, the lecture→quiz id bridge).
 *
 * Every key is namespaced by Firebase uid. Browsers are shared — a family
 * laptop, a lab machine, a demo device — and an unscoped key means the next
 * person to sign in inherits the previous account's bookmarks and notes. The
 * uid is not a secret, and this is not a security boundary (anyone with the
 * device can read localStorage either way); it is what stops one account's data
 * from being *shown* under another account.
 */

const listeners = new Set<() => void>()
const cache = new Map<string, unknown>()

/** The signed-in uid, set by AuthProvider. `null` while signed out. */
let currentUid: string | null = null

function notify(): void {
  listeners.forEach((listener) => listener())
}

/**
 * Point the stores at an account. Called by AuthProvider on every auth change;
 * passing `null` on sign-out drops the in-memory cache so nothing from the
 * previous session is served to the next one.
 */
export function setStoreUid(uid: string | null): void {
  if (uid === currentUid) return
  currentUid = uid
  cache.clear()
  notify()
}

function storageKey(name: string): string | null {
  if (!currentUid) return null
  return `optima.${name}.${currentUid}`
}

export function readStore<T>(name: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  const key = storageKey(name)
  if (!key) return fallback
  if (cache.has(key)) return cache.get(key) as T
  let value = fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (raw) {
      const parsed: unknown = JSON.parse(raw)
      // Shape is validated by the caller's `isValid`; here we only guard the
      // coarse type so a hand-edited key cannot crash a render.
      if (parsed !== null && typeof parsed === typeof fallback) value = parsed as T
    }
  } catch {
    /* unreadable or malformed — fall back to the default */
  }
  cache.set(key, value)
  return value
}

export function writeStore<T>(name: string, value: T): void {
  const key = storageKey(name)
  if (!key || typeof window === 'undefined') return
  cache.set(key, value)
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* quota or private mode — the in-memory copy still serves this session */
  }
  notify()
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  const onStorage = (event: StorageEvent) => {
    if (event.key?.startsWith('optima.')) {
      cache.delete(event.key)
      listener()
    }
  }
  if (typeof window !== 'undefined') window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    if (typeof window !== 'undefined') window.removeEventListener('storage', onStorage)
  }
}

/** Reactive read of a per-account store, kept in sync across tabs. */
export function useStore<T>(name: string, fallback: T): T {
  return useSyncExternalStore(
    subscribe,
    () => readStore(name, fallback),
    () => fallback,
  )
}
