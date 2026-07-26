'use client'

/**
 * Maps a lecture id → its quiz id, cached in localStorage.
 *
 * Bridge until the backend exposes a "get quiz by lecture" endpoint: a quiz is
 * attached to a lecture (one-to-one), but the only way to read a quiz over REST
 * is by its quiz id, which the curriculum response does not include. We learn
 * the id when the quiz is created and cache it so the editor can be re-opened.
 * (Per-device only — the proper fix is GET /courses/:id/lectures/:lid/quiz.)
 */
const KEY = 'optima.lectureQuiz'

function readMap(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, string>) : {}
  } catch {
    return {}
  }
}

export function getCachedQuizId(lectureId: string): string | null {
  return readMap()[lectureId] ?? null
}

export function setCachedQuizId(lectureId: string, quizId: string): void {
  if (typeof window === 'undefined') return
  try {
    const map = readMap()
    map[lectureId] = quizId
    window.localStorage.setItem(KEY, JSON.stringify(map))
  } catch {
    /* storage unavailable — non-fatal */
  }
}
