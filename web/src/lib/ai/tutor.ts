import { AxiosError } from 'axios'
import { apiClient } from '@/lib/api/client'
import { QUIZ_JSON_PROMPT } from '@/lib/ai/quizParse'

// Client for the AI tutor. Talks to the NestJS backend's /ai endpoints — never
// to the AI RAG service directly.
//
// Why the backend and not a Next.js route: the backend verifies the Firebase ID
// token properly, checks course access / enrollment before spending an AI call,
// derives courseId from the lecture itself, and holds the AI service's internal
// API key. It is also the only path that agrees with the identifiers the backend
// used when it INGESTED the lecture (POST /v1/ingest/video), so retrieval
// actually finds the transcript.
//
// The backend passes the RAG service's response body straight through, so the
// snake_case shape below is the AI service's own contract.

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
  /** Lecture id. The backend resolves the course from it, so no courseId here. */
  lectureId: string
  message: string
  sessionId?: string
  playbackMs?: number
}

/** Whether the tutor UI should be shown. A client-visible on/off flag only —
 *  the AI service URL and key live in the backend, never in this bundle. */
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

// The shared apiClient allows 20s, which is fine for CRUD but not for a RAG
// answer: retrieval plus generation regularly runs longer, and aborting at 20s
// would surface every slow-but-successful answer as a connection failure.
const AI_TIMEOUT_MS = 90_000

interface BackendErrorBody {
  statusCode?: number
  message?: string | string[]
}

/** Map a backend failure onto a stable code the UI can branch on. The backend
 *  emits Nest's `{ statusCode, message }`; anything else (network, CORS, an
 *  HTML error page) has no response at all. */
export function toTutorError(error: unknown): TutorError {
  if (error instanceof TutorError) return error

  const axiosError = error as AxiosError<BackendErrorBody>
  if (!axiosError?.isAxiosError) {
    return new TutorError('AI_ERROR', 'The AI tutor could not answer right now.')
  }

  const status = axiosError.response?.status
  const raw = axiosError.response?.data?.message
  const detail = Array.isArray(raw) ? raw.join('; ') : raw

  if (status === undefined) {
    // A timeout also has no response, but it means the request DID reach the
    // server and took too long — telling the user to check their connection
    // would send them chasing the wrong problem.
    if (axiosError.code === 'ECONNABORTED' || axiosError.code === 'ETIMEDOUT') {
      return new TutorError('AI_TIMEOUT', 'The AI took too long to answer. Try again.')
    }
    return new TutorError('AI_UNREACHABLE', 'Could not reach the server. Check your connection.')
  }
  if (status === 401) {
    return new TutorError('UNAUTHENTICATED', 'Sign in required.')
  }
  if (status === 403) {
    return new TutorError(
      'NOT_ENROLLED',
      detail || 'You need access to this course to use the AI tutor.',
    )
  }
  if (status === 404) {
    return new TutorError('LECTURE_NOT_FOUND', detail || 'This lecture no longer exists.')
  }
  if (status === 429) {
    return new TutorError('RATE_LIMITED', 'Too many requests. Wait a moment and try again.')
  }
  // The backend turns every AI-service failure into a 500 with a fixed message,
  // so it cannot distinguish "not indexed yet" from "service down" — see the
  // ingest status endpoint for that signal.
  if (status >= 500) {
    return new TutorError('AI_UNAVAILABLE', 'The AI service is unavailable right now.')
  }
  return new TutorError('AI_ERROR', detail || 'The AI tutor could not answer right now.')
}

interface RagChatResponse {
  session_id?: string
  answer?: string
  grounded?: boolean
  scope_used?: string
  citations?: Array<{
    video_id?: string
    video_title?: string
    start_ms?: number
    end_ms?: number
    label?: string
  }>
  follow_up_suggestions?: string[]
}

export async function askTutor(input: AskTutorInput): Promise<TutorAnswer> {
  // The backend forwards sessionId verbatim and the RAG service requires one,
  // so mint it here on the first turn and thread it through afterwards.
  const sessionId = input.sessionId || crypto.randomUUID()

  let data: RagChatResponse
  try {
    const res = await apiClient.post<RagChatResponse>(
      `/ai/lectures/${encodeURIComponent(input.lectureId)}/chat`,
      {
        message: input.message,
        playbackMs: input.playbackMs ?? 0,
        sessionId,
      },
      { timeout: AI_TIMEOUT_MS },
    )
    data = res.data ?? {}
  } catch (error) {
    throw toTutorError(error)
  }

  return {
    sessionId: data.session_id || sessionId,
    answer: data.answer ?? '',
    grounded: data.grounded ?? false,
    scopeUsed: data.scope_used ?? '',
    citations: (data.citations ?? []).map((c) => ({
      videoId: c.video_id ?? '',
      videoTitle: c.video_title ?? '',
      startMs: c.start_ms ?? 0,
      endMs: c.end_ms ?? 0,
      label: c.label ?? '',
    })),
    followUpSuggestions: data.follow_up_suggestions ?? [],
  }
}

// --- Ingest status / retry --------------------------------------------------
// A lecture must be transcribed and indexed before the tutor can ground an
// answer in it. `GET /ai/lectures/:id/status` reports where that job stands;
// retry re-runs ingestion and is restricted to admin / the owning instructor.

/** The backend returns `{ status: 'UNKNOWN' }` when the lecture has no AI job,
 *  otherwise it passes through the AI service's job record — whose full shape is
 *  owned by that service, so only `status` is relied on here. */
export interface AiIngestStatus {
  status: string
  raw: Record<string, unknown>
}

export async function getAiIngestStatus(lectureId: string): Promise<AiIngestStatus> {
  try {
    const res = await apiClient.get<Record<string, unknown>>(
      `/ai/lectures/${encodeURIComponent(lectureId)}/status`,
    )
    const body = res.data ?? {}
    const status = body.status
    return {
      status: typeof status === 'string' && status ? status : 'UNKNOWN',
      raw: body,
    }
  } catch (error) {
    throw toTutorError(error)
  }
}

export async function retryAiIngest(lectureId: string): Promise<{ aiJobId?: string }> {
  try {
    const res = await apiClient.post<{ success?: boolean; aiJobId?: string }>(
      `/ai/lectures/${encodeURIComponent(lectureId)}/retry`,
      {},
    )
    return { aiJobId: res.data?.aiJobId }
  } catch (error) {
    throw toTutorError(error)
  }
}

// --- AI Course Studio (generation) -----------------------------------------
// The AI service has NO dedicated generation endpoint — only the RAG chat. So
// Studio actions are targeted prompts sent to the SAME chat endpoint, grounded
// in a chosen (ingested) lecture's transcript. No AI-service change. Output is
// free text (a quiz is prose, not structured JSON).

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
  // The quiz answer is parsed into real questions and saved through the quiz
  // authoring API, so it asks for JSON rather than prose. See quizParse.ts.
  QUIZ: QUIZ_JSON_PROMPT,
  LESSON_PLAN:
    "Using only this video's transcript, produce a short lesson plan: objectives, key topics in order, and one suggested activity.",
}

export async function generateAsset(input: {
  lectureId: string
  kind: StudioKind
}): Promise<TutorAnswer> {
  return askTutor({
    lectureId: input.lectureId,
    message: KIND_PROMPTS[input.kind],
  })
}
