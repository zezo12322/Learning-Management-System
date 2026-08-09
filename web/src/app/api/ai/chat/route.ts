import { NextRequest, NextResponse } from 'next/server'
import { toUuid, uuidV5 } from '@/lib/ai/ids'

// Server-side proxy that adapts the web app to the existing AI RAG service
// (POST /v1/rag/chat). It keeps the internal API key on the server (never in the
// browser bundle), and maps LMS identifiers to the service's UUID contract.
//
// Server env (NOT NEXT_PUBLIC — stays server-side):
//   AI_API_BASE_URL     e.g. https://ai.optimatech.app
//   AI_INTERNAL_API_KEY the X-Internal-Api-Key the service expects
//   AI_TENANT_ID        a UUID identifying this LMS tenant (optional; has default)
//   LMS_API_BASE_URL    the NestJS API, used to authenticate the caller
//                       (falls back to NEXT_PUBLIC_API_URL)

const AI_BASE = process.env.AI_API_BASE_URL
const AI_KEY = process.env.AI_INTERNAL_API_KEY
const AI_TENANT_ID = process.env.AI_TENANT_ID || '00000000-0000-5000-8000-000000000001'
const LMS_API = process.env.LMS_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL

/**
 * Resolve the caller from their Firebase ID token by asking the NestJS API, and
 * confirm they may actually study this course.
 *
 * This route holds `AI_INTERNAL_API_KEY`, which tells the RAG service "the
 * caller is already authorized" — so this handler *is* the authorization
 * boundary; nothing downstream re-checks. It previously base64-decoded the JWT
 * payload without verifying the signature and fell back to a `userId` taken
 * straight from the request body, which meant an anonymous request could drive
 * the internal-key relay and pull transcript-grounded answers out of courses the
 * caller had never enrolled in.
 *
 * Verification is delegated rather than reimplemented: the backend already runs
 * firebase-admin, and `GET /me` fails closed on a forged, expired or altered
 * token. `GET /courses/:id/enrollment` then answers whether this learner may
 * study the course — the same gate the streaming endpoints apply.
 */
async function authorize(
  authHeader: string | null,
  courseId: string,
): Promise<{ uid: string } | { error: NextResponse }> {
  const unauthorized = NextResponse.json(
    { error: { code: 'UNAUTHENTICATED', message: 'Sign in required.' } },
    { status: 401 },
  )
  if (!authHeader?.startsWith('Bearer ') || !LMS_API) {
    return { error: unauthorized }
  }

  const base = LMS_API.replace(/\/$/, '')
  const headers = { Authorization: authHeader, Accept: 'application/json' }

  let me: Response
  try {
    me = await fetch(`${base}/me`, { headers, cache: 'no-store' })
  } catch {
    return {
      error: NextResponse.json(
        { error: { code: 'AUTH_UNREACHABLE', message: 'Could not verify your session.' } },
        { status: 503 },
      ),
    }
  }
  if (!me.ok) return { error: unauthorized }

  const profile = (await me.json().catch(() => null)) as { uid?: string; roles?: string[] } | null
  const uid = profile?.uid
  if (!uid) return { error: unauthorized }

  // Instructors and admins are gated by the backend on their own courses; for
  // everyone else an active enrollment is required, so a learner cannot mine a
  // course they have not paid for.
  const roles = Array.isArray(profile?.roles) ? profile.roles : []
  if (roles.includes('admin') || roles.includes('instructor')) return { uid }

  let enrollment: Response
  try {
    enrollment = await fetch(`${base}/courses/${encodeURIComponent(courseId)}/enrollment`, {
      headers,
      cache: 'no-store',
    })
  } catch {
    return {
      error: NextResponse.json(
        { error: { code: 'AUTH_UNREACHABLE', message: 'Could not verify your enrollment.' } },
        { status: 503 },
      ),
    }
  }

  const status = enrollment.ok
    ? ((await enrollment.json().catch(() => null)) as { status?: string } | null)?.status
    : undefined
  if (status !== 'ACTIVE' && status !== 'COMPLETED') {
    return {
      error: NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'You are not enrolled in this course.' } },
        { status: 403 },
      ),
    }
  }
  return { uid }
}

export async function POST(req: NextRequest) {
  if (!AI_BASE || !AI_KEY) {
    return NextResponse.json(
      { error: { code: 'AI_NOT_CONFIGURED', message: 'AI service is not configured.' } },
      { status: 503 },
    )
  }
  if (!LMS_API) {
    // Without the API there is no way to authenticate the caller, and this route
    // must never proxy an unauthenticated request.
    return NextResponse.json(
      { error: { code: 'AI_NOT_CONFIGURED', message: 'AI service is not configured.' } },
      { status: 503 },
    )
  }

  const body = await req.json().catch(() => null)
  if (!body || !body.courseId || !body.videoId || !body.message) {
    return NextResponse.json(
      { error: { code: 'BAD_REQUEST', message: 'courseId, videoId and message are required.' } },
      { status: 400 },
    )
  }

  const auth = await authorize(req.headers.get('authorization'), String(body.courseId))
  if ('error' in auth) return auth.error

  const payload = {
    request_id: crypto.randomUUID(),
    tenant_id: AI_TENANT_ID,
    // Derived from the verified uid — never from the request body.
    user_id: await uuidV5(auth.uid),
    course_id: toUuid(String(body.courseId)),
    video_id: toUuid(String(body.videoId)),
    session_id: body.sessionId ? toUuid(String(body.sessionId)) : crypto.randomUUID(),
    playback_ms:
      typeof body.playbackMs === 'number' && Number.isFinite(body.playbackMs)
        ? Math.max(0, Math.floor(body.playbackMs))
        : 0,
    message: String(body.message).slice(0, 2000),
  }

  let upstream: Response
  try {
    upstream = await fetch(`${AI_BASE.replace(/\/$/, '')}/v1/rag/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Api-Key': AI_KEY,
      },
      body: JSON.stringify(payload),
    })
  } catch {
    return NextResponse.json(
      { error: { code: 'AI_UNREACHABLE', message: 'Could not reach the AI service.' } },
      { status: 502 },
    )
  }

  const data = await upstream.json().catch(() => ({}))
  // Pass the upstream body + status straight through (it already carries
  // session_id, answer, grounded, citations, and any error envelope).
  return NextResponse.json(data, { status: upstream.status })
}
