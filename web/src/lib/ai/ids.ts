// ID helpers for adapting LMS identifiers to the AI service's UUID contract.
// The AI RAG service requires every id (tenant/user/course/video/session/request)
// to be a canonical UUID. LMS course/lecture ids are 32-char hex (a UUID without
// dashes); the Firebase uid is not a UUID at all — so we normalise / derive here.
// Runs on both the Node and Cloudflare (Workers) runtimes: uses Web Crypto only.

/** Insert dashes into a bare 32-hex id to make a canonical UUID. Pass through
 *  anything already in UUID form (or not hex — returned unchanged). */
export function toUuid(id: string): string {
  const s = id.replace(/-/g, '').toLowerCase()
  if (/^[0-9a-f]{32}$/.test(s)) {
    return `${s.slice(0, 8)}-${s.slice(8, 12)}-${s.slice(12, 16)}-${s.slice(16, 20)}-${s.slice(20)}`
  }
  return id
}

function uuidToBytes(uuid: string): Uint8Array {
  const hex = uuid.replace(/-/g, '')
  const bytes = new Uint8Array(16)
  for (let i = 0; i < 16; i++) bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16)
  return bytes
}

function bytesToUuid(b: Uint8Array): string {
  const h = Array.from(b.slice(0, 16))
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('')
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`
}

// RFC-4122 URL namespace — a stable, well-known namespace for derived ids.
const URL_NAMESPACE = '6ba7b811-9dad-11d1-80b4-00c04fd430c8'

/** Deterministic UUIDv5 (SHA-1) of `name` within `namespace`. Same input →
 *  same UUID, so a Firebase uid maps to one stable user_id for session scoping. */
export async function uuidV5(name: string, namespace: string = URL_NAMESPACE): Promise<string> {
  const ns = uuidToBytes(namespace)
  const nameBytes = new TextEncoder().encode(name)
  const data = new Uint8Array(ns.length + nameBytes.length)
  data.set(ns, 0)
  data.set(nameBytes, ns.length)
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-1', data))
  digest[6] = (digest[6] & 0x0f) | 0x50 // version 5
  digest[8] = (digest[8] & 0x3f) | 0x80 // RFC-4122 variant
  return bytesToUuid(digest)
}
