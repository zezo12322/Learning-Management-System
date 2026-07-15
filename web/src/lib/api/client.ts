import axios from 'axios'
import { getFirebaseAuth } from '@/lib/firebase'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'
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

// Global error handling: sign out on 401.
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
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
  response?: { data?: { message?: string | string[] } }
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
