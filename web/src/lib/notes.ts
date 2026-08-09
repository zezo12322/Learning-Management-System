'use client'

import { readStore, useStore, writeStore } from './localStore'

/**
 * Lecture notes.
 *
 * The backend has no notes endpoint (there is no notes module under
 * backend/src), so notes are kept per account in this browser. Everything goes
 * through one module so wiring a future `GET/POST /lectures/:id/notes` means
 * changing these functions and nothing else.
 */
export interface LectureNote {
  id: string
  lectureId: string
  lectureTitle: string
  title: string
  body: string
  /** Playback position the note was taken at, in seconds. */
  atSecond: number
  starred: boolean
  createdAt: string
  updatedAt: string
}

const STORE = 'notes'

type NoteMap = Record<string, LectureNote[]>

function isNote(value: unknown): value is LectureNote {
  if (!value || typeof value !== 'object') return false
  const note = value as Record<string, unknown>
  return typeof note.id === 'string' && typeof note.title === 'string' && typeof note.body === 'string'
}

function readAll(): NoteMap {
  const raw = readStore<NoteMap>(STORE, {})
  const clean: NoteMap = {}
  for (const [lectureId, notes] of Object.entries(raw)) {
    if (Array.isArray(notes)) clean[lectureId] = notes.filter(isNote)
  }
  return clean
}

/** Every note for a course's lectures, newest first. */
export function useCourseNotes(lectureIds: string[]): LectureNote[] {
  const all = useStore<NoteMap>(STORE, {})
  const wanted = new Set(lectureIds)
  return Object.entries(all)
    .filter(([lectureId]) => wanted.has(lectureId))
    .flatMap(([, notes]) => (Array.isArray(notes) ? notes.filter(isNote) : []))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

export function addNote(
  input: Omit<LectureNote, 'id' | 'createdAt' | 'updatedAt' | 'starred'> & { starred?: boolean },
): LectureNote {
  const now = new Date().toISOString()
  const note: LectureNote = {
    ...input,
    starred: input.starred ?? false,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  }
  const all = readAll()
  writeStore(STORE, { ...all, [note.lectureId]: [note, ...(all[note.lectureId] ?? [])] })
  return note
}

export function updateNote(
  lectureId: string,
  noteId: string,
  patch: Partial<Pick<LectureNote, 'title' | 'body' | 'starred'>>,
): void {
  const all = readAll()
  const notes = all[lectureId] ?? []
  writeStore(STORE, {
    ...all,
    [lectureId]: notes.map((note) =>
      note.id === noteId ? { ...note, ...patch, updatedAt: new Date().toISOString() } : note,
    ),
  })
}

export function deleteNote(lectureId: string, noteId: string): void {
  const all = readAll()
  const notes = (all[lectureId] ?? []).filter((note) => note.id !== noteId)
  const next = { ...all }
  if (notes.length) next[lectureId] = notes
  else delete next[lectureId]
  writeStore(STORE, next)
}
