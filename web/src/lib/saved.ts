'use client'

import { useSyncExternalStore } from 'react'

/**
 * Saved / bookmarked courses — a small client-side store persisted to
 * localStorage. Self-contained (no backend endpoint exists for bookmarks yet):
 * IDs are kept locally and resolved to course objects from the public catalog.
 *
 * Uses useSyncExternalStore so every SaveButton and the Saved page stay in sync
 * (and across browser tabs via the `storage` event) without a global state lib.
 */
const KEY = 'optima.savedCourses'

let cache: string[] | null = null
const listeners = new Set<() => void>()

function read(): string[] {
  if (typeof window === 'undefined') return []
  if (cache) return cache
  try {
    const raw = window.localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : []
    cache = Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : []
  } catch {
    cache = []
  }
  return cache
}

function write(next: string[]): void {
  cache = next
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* storage may be unavailable (private mode / quota) — keep the in-memory copy */
  }
  listeners.forEach((l) => l())
}

export function getSavedCourseIds(): string[] {
  return read()
}

export function isCourseSaved(id: string): boolean {
  return read().includes(id)
}

/** Add or remove a course id; returns the new saved state. */
export function toggleSavedCourse(id: string): boolean {
  const current = read()
  const exists = current.includes(id)
  write(exists ? current.filter((x) => x !== id) : [id, ...current])
  return !exists
}

export function clearSavedCourses(): void {
  write([])
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null // force re-read from the other tab's write
      listener()
    }
  }
  if (typeof window !== 'undefined') window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    if (typeof window !== 'undefined') window.removeEventListener('storage', onStorage)
  }
}

/** Reactive list of saved course ids. */
export function useSavedCourseIds(): string[] {
  return useSyncExternalStore(subscribe, getSavedCourseIds, () => [])
}

/** Reactive saved-state for a single course. */
export function useIsCourseSaved(id: string): boolean {
  return useSyncExternalStore(
    subscribe,
    () => isCourseSaved(id),
    () => false,
  )
}
