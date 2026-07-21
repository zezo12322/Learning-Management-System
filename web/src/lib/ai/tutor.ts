import { getFirebaseAuth } from '@/lib/firebase'

// Client for the AI tutor. Talks ONLY to our own /api/ai/chat proxy (never the
// AI service directly), matching the RAG service's real response shape.

export interface TutorCitation {
  videoId: string
  videoTitle: string
  startMs: number
  endMs: number
  label: string
}

export interface TutorAnswer {
  sessionId: string
  answer: string
  grounded: boolean
  scopeUsed: string
  citations: TutorCitation[]
  followUpSuggestions: string[]
}

export interface AskTutorInput {
  courseId: string
  videoId: string
  message: string
  sessionId?: string
  playbackMs?: number
}

/** Whether the tutor UI should be shown. Actual URL/key live server-side; this
 *  is only a client-visible on/off flag so we don't render chat when AI is off. */
export function isAiTutorEnabled(): boolean {
  return process.env.NEXT_PUBLIC_AI_ENABLED === 'true'
}

export class TutorError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message)
  }
}

// --- AI Course Studio (generation) -----------------------------------------
// The AI service has NO dedicated generation endpoint — only the RAG /chat.
// So Studio actions are implemented as targeted prompts sent to the SAME chat
// endpoint, grounded in a chosen (ingested) video's transcript. No AI-service
// change. Output is free text (e.g. a quiz is text, not structured JSON).

export type StudioKind = 'SUMMARY' | 'OUTCOMES' | 'QUIZ' | 'LESSON_PLAN'

export const STUDIO_ACTIONS: { kind: StudioKind; label: string }[] = [
  { kind: 'SUMMARY', label: 'Lesson summary' },
  { kind: 'OUTCOMES', label: 'Learning outcomes' },
  { kind: 'QUIZ', label: 'Quiz questions' },
  { kind: 'LESSON_PLAN', label: 'Lesson plan' },
]

const KIND_PROMPTS: Record<StudioKind, string> = {
  SUMMARY:
    "Using only this video's transcript, write a concise summary (5-8 sentences) of what this lesson covers.",
  OUTCOMES:
    "Using only this video's transcript, list 5 clear learning outcomes as bullet points, each starting with an action verb.",
  QUIZ:
    "Using only this video's transcript, create 3 multiple-choice questions. For each, give the question, four options labelled A-D, and state the correct answer.",
  LESSON_PLAN:
    "Using only this video's transcript, produce a short lesson plan: objectives, key topics in order, and one suggested activity.",
}

export async function generateAsset(input: {
  courseId: string
  videoId: string
  kind: StudioKind
}): Promise<TutorAnswer> {
  return askTutor({
    courseId: input.courseId,
    videoId: input.videoId,
    message: KIND_PROMPTS[input.kind],
  })
}

export async function askTutor(input: AskTutorInput): Promise<TutorAnswer> {
  const token = await getFirebaseAuth().currentUser?.getIdToken()

  const res = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      courseId: input.courseId,
      videoId: input.videoId,
      message: input.message,
      sessionId: input.sessionId,
      playbackMs: input.playbackMs ?? 0,
    }),
  })

  const data: unknown = await res.json().catch(() => ({}))

  if (!res.ok) {
    const err = (data as { error?: { code?: string; message?: string } }).error
    throw new TutorError(
      err?.code || 'AI_ERROR',
      err?.message || 'The AI tutor could not answer right now.',
    )
  }

  const d = data as {
    session_id: string
    answer: string
    grounded: boolean
    scope_used: string
    citations?: Array<{
      video_id: string
      video_title: string
      start_ms: number
      end_ms: number
      label: string
    }>
    follow_up_suggestions?: string[]
  }

  return {
    sessionId: d.session_id,
    answer: d.answer,
    grounded: d.grounded,
    scopeUsed: d.scope_used,
    citations: (d.citations ?? []).map((c) => ({
      videoId: c.video_id,
      videoTitle: c.video_title,
      startMs: c.start_ms,
      endMs: c.end_ms,
      label: c.label,
    })),
    followUpSuggestions: d.follow_up_suggestions ?? [],
  }
}
