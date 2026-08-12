'use client'

import { readStore, writeStore } from '@/lib/localStore'

/**
 * Crash recovery for an in-flight quiz attempt.
 *
 * Starting an attempt is a server-side event that counts against
 * `maxAttempts`, but the answers only ever lived in React state — so a reload,
 * a crashed tab or a phone that swapped the page out lost every answer *and*
 * burned one of the learner's attempts. This keeps enough state per account to
 * walk back into the same attempt: which attempt is open, what has been
 * answered, which answers the server has already acknowledged, and when the
 * clock started.
 *
 * `startedAtMs` is the client's clock at the moment the attempt began, kept so
 * the countdown can be derived from elapsed wall time instead of counting
 * ticks. A tick counter is wrong twice over: it resets to the full limit on
 * reload, and browsers throttle timers in background tabs, which quietly hands
 * out extra minutes. The server enforces the real limit either way (it
 * auto-grades a late answer with 410) — this only keeps the displayed clock
 * honest.
 */
export interface StoredQuizAttempt {
  attemptId: string
  /** questionId → selected optionId. */
  answers: Record<string, string>
  /** Question ids whose current answer the server has accepted. */
  synced: string[]
  startedAtMs: number
}

const STORE = 'quiz-attempts'

type AttemptMap = Record<string, StoredQuizAttempt>

/**
 * Validate and narrow whatever is sitting in storage.
 *
 * localStorage is user-writable and outlives app versions, so this is the
 * boundary where a hand-edited or stale entry has to be rejected — everything
 * that gets through is fed straight back into the answer-submission loop.
 * Exported so the rules are testable without a DOM.
 */
export function sanitizeStoredAttempt(value: unknown): StoredQuizAttempt | null {
  if (!value || typeof value !== 'object') return null
  const candidate = value as Partial<StoredQuizAttempt>
  if (typeof candidate.attemptId !== 'string' || !candidate.attemptId) return null
  if (typeof candidate.startedAtMs !== 'number' || !Number.isFinite(candidate.startedAtMs)) {
    return null
  }
  // An array passes `typeof === 'object'`, and treating one as an empty answer
  // map would resume the attempt showing every question unanswered — so a
  // malformed entry is rejected outright rather than half-read.
  if (!candidate.answers || typeof candidate.answers !== 'object' || Array.isArray(candidate.answers)) {
    return null
  }
  if (!Array.isArray(candidate.synced)) return null

  // Answers must be a flat string-to-string map; anything else is dropped rather
  // than posted to the API as a question or option id.
  const answers: Record<string, string> = {}
  for (const [questionId, optionId] of Object.entries(candidate.answers)) {
    if (questionId && typeof optionId === 'string' && optionId) answers[questionId] = optionId
  }
  return {
    attemptId: candidate.attemptId,
    answers,
    // A question can only count as "already saved" if it is actually answered.
    // Otherwise a stale id would suppress the retry that answer still needs.
    synced: candidate.synced.filter((id): id is string => typeof id === 'string' && id in answers),
    startedAtMs: candidate.startedAtMs,
  }
}

export function readQuizAttempt(quizId: string): StoredQuizAttempt | null {
  if (!quizId) return null
  return sanitizeStoredAttempt(readStore<AttemptMap>(STORE, {})[quizId])
}

export function writeQuizAttempt(quizId: string, attempt: StoredQuizAttempt): void {
  if (!quizId) return
  writeStore<AttemptMap>(STORE, { ...readStore<AttemptMap>(STORE, {}), [quizId]: attempt })
}

export function clearQuizAttempt(quizId: string): void {
  if (!quizId) return
  const next = { ...readStore<AttemptMap>(STORE, {}) }
  delete next[quizId]
  writeStore<AttemptMap>(STORE, next)
}
