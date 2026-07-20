/**
 * Call a Firebase callable Cloud Function over its HTTPS endpoint directly,
 * using the callable protocol ({ data } -> { result } / { error }).
 *
 * We avoid the `firebase/functions` SDK on purpose: its Node build pulls in
 * `undici`, whose private-class-field syntax breaks the Next.js webpack build.
 * The only callable we invoke (registerStudent) needs no auth token, so a plain
 * POST is sufficient.
 */
export async function callCloudFunction<T>(
  name: string,
  region: string,
  data: unknown
): Promise<T> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  if (!projectId) throw new Error('Firebase project id is not configured')

  const url = `https://${region}-${projectId}.cloudfunctions.net/${name}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  })

  const json = (await res.json().catch(() => ({}))) as {
    result?: T
    error?: { message?: string }
  }
  if (!res.ok || json?.error) {
    throw new Error(json?.error?.message || 'The request could not be completed')
  }
  return json.result as T
}
