import type { QuizOption } from '@/lib/types'
import type { QuestionInput } from '@/lib/api/services'

// Turns the AI's quiz output into questions the authoring API accepts.
//
// The AI service has no structured-generation endpoint — only RAG chat — so the
// only leverage we have is the prompt. Two rules follow from that:
//
//  1. ASK for JSON (see QUIZ_JSON_PROMPT) instead of parsing prose. Regexing
//     "A) … Correct answer: B" out of free text works on the happy path and
//     silently mangles everything else — different numbering, bold markers,
//     Arabic output, a model that decides to add commentary.
//  2. Never trust the result. An LLM will still wrap JSON in prose, use a
//     different key name, or mark two answers correct. Everything below is
//     tolerant about SHAPE and strict about MEANING: a question missing a
//     single unambiguous correct answer is dropped with a reason, never
//     guessed at, because a wrong answer key silently mis-grades students.

export const MIN_OPTIONS = 2
export const MAX_OPTIONS = 8

/** Sent instead of the prose prompt for the QUIZ action. */
export const QUIZ_JSON_PROMPT = [
  "Using only this video's transcript, create 3 multiple-choice questions.",
  '',
  'Reply with JSON only — no explanation before or after, no markdown fences.',
  'Use exactly this shape:',
  '{"questions":[{"question":"...","options":["...","...","...","..."],"correctIndex":0,"explanation":"..."}]}',
  '',
  'Rules: 4 options per question; correctIndex is the 0-based index of the one',
  'correct option; explanation is one short sentence saying why it is correct;',
  'do not prefix options with letters or numbers; write in the same language as',
  'the transcript.',
].join('\n')

export interface ParsedQuizQuestion extends QuestionInput {
  options: QuizOption[]
}

export interface ParsedQuiz {
  questions: ParsedQuizQuestion[]
  /** Per-question problems that caused a drop, for display. Never silent. */
  warnings: string[]
}

/** Thrown when nothing usable could be recovered. Carries the raw text so the
 *  UI can still show what the model actually said. */
export class QuizParseError extends Error {
  constructor(
    message: string,
    public raw: string,
  ) {
    super(message)
  }
}

/** Pull the JSON out of a reply that may be fenced, prefixed with prose, or
 *  both. Scans for the first balanced {...} or [...] rather than using a greedy
 *  regex, so trailing commentary containing braces does not break it. */
export function extractJson(text: string): unknown {
  const trimmed = text.trim()
  if (!trimmed) throw new QuizParseError('The AI returned an empty reply.', text)

  // Prefer a fenced block when present — it is the least ambiguous.
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const candidates: string[] = []
  if (fence?.[1]) candidates.push(fence[1].trim())
  candidates.push(trimmed)

  for (const candidate of candidates) {
    const direct = tryParse(candidate)
    if (direct !== undefined) return direct

    const balanced = firstBalanced(candidate)
    if (balanced) {
      const parsed = tryParse(balanced)
      if (parsed !== undefined) return parsed
    }
  }

  throw new QuizParseError('The AI did not return JSON. Showing its raw reply instead.', text)
}

function tryParse(candidate: string): unknown {
  try {
    return JSON.parse(candidate)
  } catch {
    return undefined
  }
}

/** First balanced {...} or [...] substring, ignoring braces inside strings. */
function firstBalanced(text: string): string | null {
  const start = text.search(/[[{]/)
  if (start === -1) return null

  const open = text[start]
  const close = open === '{' ? '}' : ']'
  let depth = 0
  let inString = false
  let escaped = false

  for (let i = start; i < text.length; i++) {
    const char = text[i]
    if (escaped) {
      escaped = false
      continue
    }
    if (char === '\\') {
      escaped = true
      continue
    }
    if (char === '"') {
      inString = !inString
      continue
    }
    if (inString) continue
    if (char === open) depth++
    else if (char === close) {
      depth--
      if (depth === 0) return text.slice(start, i + 1)
    }
  }
  return null
}

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function pickText(raw: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = str(raw[key])
    if (value) return value
  }
  return ''
}

/** Options arrive as plain strings or as objects; normalise both, keeping any
 *  per-option correct flag so it can act as a fallback answer key. */
function readOptions(value: unknown): { texts: string[]; flagged: number[] } {
  if (!Array.isArray(value)) return { texts: [], flagged: [] }

  const texts: string[] = []
  const flagged: number[] = []

  value.forEach((entry, index) => {
    if (typeof entry === 'string') {
      texts.push(entry.trim())
      return
    }
    if (entry && typeof entry === 'object') {
      const raw = entry as Record<string, unknown>
      texts.push(pickText(raw, ['text', 'option', 'label', 'value', 'answer']))
      if (raw.isCorrect === true || raw.correct === true || raw.is_correct === true) {
        flagged.push(index)
      }
      return
    }
    texts.push('')
  })

  return { texts, flagged }
}

/** LLMs often emit "A) Paris" even when told not to. Strip the label only when
 *  EVERY option carries one — otherwise a legitimate "1. " in prose gets eaten. */
function stripOptionLabels(texts: string[]): string[] {
  const label = /^\s*(?:\(?[A-Za-z]\)?|\(?\d{1,2}\)?)\s*[.)\-:]\s+/
  if (texts.length === 0 || !texts.every((t) => label.test(t))) return texts
  const stripped = texts.map((t) => t.replace(label, '').trim())
  // Refuse if stripping emptied anything — the labels were the content.
  return stripped.every(Boolean) ? stripped : texts
}

/** Resolve the correct option index from whichever form the model used.
 *  Returns -1 when it cannot be established unambiguously. */
function resolveCorrectIndex(
  raw: Record<string, unknown>,
  texts: string[],
  flagged: number[],
): number {
  for (const key of ['correctIndex', 'correct_index', 'answerIndex', 'answer_index']) {
    const value = raw[key]
    if (typeof value === 'number' && Number.isInteger(value)) return value
    // A numeric string is common enough to accept.
    if (typeof value === 'string' && /^\d+$/.test(value.trim())) return Number(value.trim())
  }

  for (const key of ['answer', 'correctAnswer', 'correct_answer', 'correct', 'correctOption']) {
    const value = str(raw[key])
    if (!value) continue

    // A bare letter: "B" / "b)" / "(C)". Only when it is in range, so a
    // one-letter option text is not mistaken for a label.
    const letter = value.match(/^\(?([A-Za-z])\)?[.):]?$/)
    if (letter) {
      const index = letter[1].toUpperCase().charCodeAt(0) - 65
      if (index >= 0 && index < texts.length) return index
    }

    // Otherwise match the option text itself.
    const exact = texts.findIndex((t) => t.toLowerCase() === value.toLowerCase())
    if (exact !== -1) return exact
  }

  // Per-option flags, but only if exactly one was set.
  if (flagged.length === 1) return flagged[0]

  return -1
}

function readQuestionList(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload
  if (payload && typeof payload === 'object') {
    const raw = payload as Record<string, unknown>
    for (const key of ['questions', 'items', 'quiz', 'data', 'mcqs']) {
      if (Array.isArray(raw[key])) return raw[key] as unknown[]
    }
    // A single question object, unwrapped.
    if (Array.isArray(raw.options)) return [raw]
  }
  return []
}

/**
 * Parse an AI reply into saveable questions.
 *
 * Invalid questions are dropped with a warning rather than failing the batch —
 * losing one of three questions is better than losing all three. Throws only
 * when nothing at all survives.
 */
export function parseGeneratedQuiz(text: string): ParsedQuiz {
  const payload = extractJson(text)
  const list = readQuestionList(payload)

  if (list.length === 0) {
    throw new QuizParseError('The AI reply contained no questions.', text)
  }

  const questions: ParsedQuizQuestion[] = []
  const warnings: string[] = []

  list.forEach((entry, index) => {
    const label = `Question ${index + 1}`
    if (!entry || typeof entry !== 'object') {
      warnings.push(`${label}: not an object — skipped.`)
      return
    }
    const raw = entry as Record<string, unknown>

    const questionText = pickText(raw, ['question', 'questionText', 'text', 'prompt', 'q'])
    if (!questionText) {
      warnings.push(`${label}: no question text — skipped.`)
      return
    }

    const { texts, flagged } = readOptions(raw.options ?? raw.choices ?? raw.answers)
    const optionTexts = stripOptionLabels(texts)

    if (optionTexts.length < MIN_OPTIONS) {
      warnings.push(`${label}: needs at least ${MIN_OPTIONS} options — skipped.`)
      return
    }
    if (optionTexts.length > MAX_OPTIONS) {
      warnings.push(`${label}: more than ${MAX_OPTIONS} options — skipped.`)
      return
    }
    if (optionTexts.some((t) => !t)) {
      warnings.push(`${label}: an option was empty — skipped.`)
      return
    }
    const lowered = optionTexts.map((t) => t.toLowerCase())
    if (new Set(lowered).size !== lowered.length) {
      warnings.push(`${label}: duplicate options — skipped.`)
      return
    }

    const correctIndex = resolveCorrectIndex(raw, optionTexts, flagged)
    if (correctIndex < 0 || correctIndex >= optionTexts.length) {
      // Deliberately not guessed: a wrong key mis-grades every student.
      warnings.push(`${label}: could not tell which option is correct — skipped.`)
      return
    }

    const points = typeof raw.points === 'number' && raw.points > 0 ? raw.points : 1
    const explanation = pickText(raw, ['explanation', 'rationale', 'why', 'reason'])

    questions.push({
      questionText,
      points,
      ...(explanation ? { explanation } : {}),
      options: optionTexts.map((text, i) => ({ text, isCorrect: i === correctIndex })),
    })
  })

  if (questions.length === 0) {
    throw new QuizParseError(
      warnings.length
        ? `No usable questions. ${warnings.join(' ')}`
        : 'No usable questions in the AI reply.',
      text,
    )
  }

  return { questions, warnings }
}
