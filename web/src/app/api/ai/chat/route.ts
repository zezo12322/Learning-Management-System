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
 * Authorize the caller against the lecture they are asking about.
 *
 * This route holds `AI_INTERNAL_API_KEY`, which tells the RAG service "the
 * caller is already authorized" — so this handler *is* the authorization
 * boundary; nothing downstream re-checks.
 *
 * The check is bound to `videoId`, not to a course id taken from the request.
 * `GET /lectures/:id` already applies exactly the right gate server-side (free
 * preview, course owner/admin, or an ACTIVE/COMPLETED enrollment) and returns
 * the lecture's real owning course. So: fetch the lecture as the caller — if
 * the API hands it over, they may ask about it, and the course id comes from
 * the response rather than from whatever the client claimed. Checking a
 * client-supplied courseId instead would let anyone pair a course they can
 * reach with a lecture from a course they cannot.
 */
async function authorize(
  authHeader: string | null,
  videoId: string,
): Promise<{ uid: string; courseId: string } | { error: NextResponse }> {
  const unauthorized = NextResponse.json(
    { error: { code: 'UNAUTHENTICATED', message: 'Sign in required.' } },
    { status: 401 },
  )
  if (!authHeader?.startsWith('Bearer ') || !LMS_API) return { error: unauthorized }

  const base = LMS_API.replace(/\/$/, '')
  const headers = { Authorization: authHeader, Accept: 'application/json' }

  const call = async (path: string) => {
    try {
      return await fetch(`${base}${path}`, { headers, cache: 'no-store' })
    } catch {
      return null
    }
  }

  // Verified identity: /me runs firebase-admin server-side and fails closed on a
  // forged, altered or expired token.
  const me = await call('/me')
  if (!me) {
    return {
      error: NextResponse.json(
        { error: { code: 'AUTH_UNREACHABLE', message: 'Could not verify your session.' } },
        { status: 503 },
      ),
    }
  }
  if (!me.ok) return { error: unauthorized }
  const uid = ((await me.json().catch(() => null)) as { uid?: string } | null)?.uid
  if (!uid) return { error: unauthorized }

  const lecture = await call(`/lectures/${encodeURIComponent(videoId)}`)
  if (!lecture) {
    return {
      error: NextResponse.json(
        { error: { code: 'AUTH_UNREACHABLE', message: 'Could not verify your access.' } },
        { status: 503 },
      ),
    }
  }
  if (!lecture.ok) {
    return {
      error: NextResponse.json(
        {
          error: {
            code: lecture.status === 404 ? 'NOT_FOUND' : 'FORBIDDEN',
            message:
              lecture.status === 404
                ? 'That lesson does not exist.'
                : 'You do not have access to this lesson.',
          },
        },
        { status: lecture.status === 404 ? 404 : 403 },
      ),
    }
  }

  const body = (await lecture.json().catch(() => null)) as
    | { section?: { course?: { id?: string } } }
    | null
  const courseId = body?.section?.course?.id
  if (!courseId) {
    return {
      error: NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'You do not have access to this lesson.' } },
        { status: 403 },
      ),
    }
  }
  return { uid, courseId }
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
  if (!body || !body.videoId || !body.message) {
    return NextResponse.json(
      { error: { code: 'BAD_REQUEST', message: 'videoId and message are required.' } },
      { status: 400 },
    )
  }

  const auth = await authorize(req.headers.get('authorization'), String(body.videoId))
  if ('error' in auth) return auth.error

  const payload = {
    request_id: crypto.randomUUID(),
    tenant_id: AI_TENANT_ID,
    // Both derived from the verified session — never from the request body.
    user_id: await uuidV5(auth.uid),
    course_id: toUuid(auth.courseId),
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
