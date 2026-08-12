'use client'

import { readStore, useStore, writeStore } from './localStore'

/**
 * Saved / bookmarked courses — kept in this browser because the backend has no
 * bookmarks endpoint. IDs are stored locally and resolved to course objects
 * from the public catalog.
 *
 * Storage goes through `localStore`, so the key is namespaced by Firebase uid:
 * bookmarks used to live under one flat `optima.savedCourses` key, which meant
 * they survived sign-out and showed up under whoever signed in next on a shared
 * device.
 */
const STORE = 'savedCourses'
/** Pre-namespacing key, removed once so old bookmarks do not linger forever. */
const LEGACY_KEY = 'optima.savedCourses'

function clean(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === 'string') : []
}

export function getSavedCourseIds(): string[] {
  return clean(readStore<string[]>(STORE, []))
}

export function isCourseSaved(id: string): boolean {
  return getSavedCourseIds().includes(id)
}

/** Add or remove a course id; returns the new saved state. */
export function toggleSavedCourse(id: string): boolean {
  const current = getSavedCourseIds()
  const exists = current.includes(id)
  writeStore(STORE, exists ? current.filter((entry) => entry !== id) : [id, ...current])
  return !exists
}

export function clearSavedCourses(): void {
  writeStore(STORE, [])
}

/** Reactive list of saved course ids. */
export function useSavedCourseIds(): string[] {
  return clean(useStore<string[]>(STORE, []))
}

/** Reactive saved-state for a single course. */
export function useIsCourseSaved(id: string): boolean {
  return useSavedCourseIds().includes(id)
}

/** Drop the pre-namespacing key. Safe to call repeatedly. */
export function dropLegacySavedCourses(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(LEGACY_KEY)
  } catch {
    /* storage unavailable — nothing to clean up */
  }
}
