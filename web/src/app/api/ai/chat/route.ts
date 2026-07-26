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

const AI_BASE = process.env.AI_API_BASE_URL
const AI_KEY = process.env.AI_INTERNAL_API_KEY
const AI_TENANT_ID = process.env.AI_TENANT_ID || '00000000-0000-5000-8000-000000000001'

/** Best-effort uid extraction from the Firebase ID token (payload claim).
 *  NOTE: not cryptographically verified here — see hardening TODO below. */
function uidFromBearer(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null
  const parts = authHeader.slice(7).split('.')
  if (parts.length < 2) return null
  try {
    let b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const pad = b64.length % 4
    if (pad) b64 += '='.repeat(4 - pad)
    const claims = JSON.parse(atob(b64))
    return claims.user_id || claims.sub || null
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  if (!AI_BASE || !AI_KEY) {
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

  // TODO(security): verify the Firebase ID token (via firebase-admin or the
  // NestJS backend) instead of trusting the token payload / a client uid.
  const uid = uidFromBearer(req.headers.get('authorization')) || body.userId
  if (!uid) {
    return NextResponse.json(
      { error: { code: 'UNAUTHENTICATED', message: 'Sign in required.' } },
      { status: 401 },
    )
  }

  const payload = {
    request_id: crypto.randomUUID(),
    tenant_id: AI_TENANT_ID,
    user_id: await uuidV5(String(uid)),
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
