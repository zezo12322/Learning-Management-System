import axios, { type InternalAxiosRequestConfig } from 'axios'
import { getFirebaseAuth } from '@/lib/firebase'

// NEXT_PUBLIC_* is inlined at build time. If it's missing we must NOT bake an
// `http://localhost` default into a shipped bundle (every call would hit the
// wrong host over plaintext and fail with no obvious cause). In production,
// surface the misconfig loudly and fall back to a same-origin relative path; in
// dev, the localhost default is convenient and expected.
function resolveApiBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL
  if (configured) return configured
  if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line no-console
    console.error(
      '[config] NEXT_PUBLIC_API_URL is not set at build time — API requests will fail. ' +
        'Set it in the deploy environment.',
    )
    return '/api/v1'
  }
  return 'http://localhost:3000/api/v1'
}

const API_BASE_URL = resolveApiBaseUrl()
const FIREBASE_AUTH_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
)

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
  },
})

// Attach the Firebase ID token on every request (backend verifies it).
apiClient.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined' && FIREBASE_AUTH_CONFIGURED) {
    const user = getFirebaseAuth().currentUser
    if (user) {
      const token = await user.getIdToken()
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _authRetry?: boolean
}

// Refresh newly assigned roles once before surfacing an authorization error.
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config as RetriableRequestConfig | undefined

    if (
      error.response?.status === 403 &&
      request &&
      !request._authRetry &&
      typeof window !== 'undefined' &&
      FIREBASE_AUTH_CONFIGURED
    ) {
      const user = getFirebaseAuth().currentUser
      if (user) {
        request._authRetry = true
        const token = await user.getIdToken(true)
        request.headers.Authorization = `Bearer ${token}`
        return apiClient.request(request)
      }
    }

    if (error.response?.status === 401 && typeof window !== 'undefined' && FIREBASE_AUTH_CONFIGURED) {
      try {
        await getFirebaseAuth().signOut()
      } catch {
        /* ignore */
      }
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

type ApiErrorPayload = {
  response?: { status?: number; data?: { message?: string | string[] } }
}

export function apiErrorStatus(error: unknown): number | undefined {
  if (typeof error === 'object' && error && 'response' in error) {
    return (error as ApiErrorPayload).response?.status
  }
  return undefined
}

/** Normalize an axios error into a human-readable message. */
export function apiErrorMessage(error: unknown, fallback = 'Something went wrong. Please try again.'): string {
  if (typeof error === 'object' && error && 'response' in error) {
    const msg = (error as ApiErrorPayload).response?.data?.message
    if (Array.isArray(msg)) return msg.join(', ')
    if (typeof msg === 'string') return msg
  }
  return fallback
}
