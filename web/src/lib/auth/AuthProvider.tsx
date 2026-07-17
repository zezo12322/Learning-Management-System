'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut as fbSignOut,
  type User as FirebaseUser,
} from 'firebase/auth'
import { getFirebaseAuth, googleProvider } from '@/lib/firebase'
import { meApi } from '@/lib/api/services'
import { callCloudFunction } from '@/lib/auth/cloudFunctions'
import type { Me, Role } from '@/lib/types'

interface AuthContextValue {
  firebaseUser: FirebaseUser | null
  me: Me | null
  roles: Role[]
  loading: boolean
  configurationError: boolean
  isAuthenticated: boolean
  login: (email: string, password: string, remember?: boolean) => Promise<void>
  loginWithGoogle: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  register: (data: {
    name: string
    email: string
    password: string
    nationalId: string
  }) => Promise<void>
  logout: () => Promise<void>
  refreshMe: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

const firebaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [me, setMe] = useState<Me | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!firebaseConfigured) {
      setLoading(false)
      return
    }

    const unsub = onAuthStateChanged(getFirebaseAuth(), async (user) => {
      setFirebaseUser(user)
      if (user) {
        try {
          // Provision the row (idempotent) then load profile + roles.
          await meApi.sync({ email: user.email ?? '', name: user.displayName ?? 'مستخدم', avatar: user.photoURL ?? undefined })
          setMe(await meApi.get())
        } catch {
          setMe(null)
        }
      } else {
        setMe(null)
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const login = async (email: string, password: string, remember = true) => {
    if (!firebaseConfigured) {
      throw new Error('Firebase Web authentication is not configured.')
    }
    const auth = getFirebaseAuth()
    await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence)
    await signInWithEmailAndPassword(auth, email, password)
  }

  const loginWithGoogle = async () => {
    if (!firebaseConfigured) {
      throw new Error('Firebase Web authentication is not configured.')
    }
    await signInWithRedirect(getFirebaseAuth(), googleProvider)
  }

  const resetPassword = async (email: string) => {
    if (!firebaseConfigured) {
      throw new Error('Firebase Web authentication is not configured.')
    }
    await sendPasswordResetEmail(getFirebaseAuth(), email)
  }

  const register = async (data: {
    name: string
    email: string
    password: string
    nationalId: string
  }) => {
    if (!firebaseConfigured) {
      throw new Error('Firebase Web authentication is not configured.')
    }
    // registerStudent is deployed to europe-west3 (see backend/API_DOCUMENTATION §22).
    await callCloudFunction('registerStudent', 'europe-west3', data)
    // Account created but not signed in — sign in now.
    await signInWithEmailAndPassword(getFirebaseAuth(), data.email, data.password)
  }

  const logout = async () => {
    if (!firebaseConfigured) return
    await fbSignOut(getFirebaseAuth())
    setMe(null)
  }

  const refreshMe = async () => {
    if (!firebaseConfigured) return
    if (getFirebaseAuth().currentUser) setMe(await meApi.get())
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      firebaseUser,
      me,
      roles: me?.roles ?? [],
      loading,
      configurationError: !firebaseConfigured,
      isAuthenticated: Boolean(firebaseUser),
      login,
      loginWithGoogle,
      resetPassword,
      register,
      logout,
      refreshMe,
    }),
    [firebaseUser, me, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}
