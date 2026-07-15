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
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
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
  isDemoMode: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
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

const demoMe: Me = {
  uid: 'demo-instructor',
  email: 'zeyad@optima.demo',
  name: 'Zeyad Elshreef',
  roles: ['instructor'],
  profile: { company: 'Optima Learning' },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [me, setMe] = useState<Me | null>(null)
  const [loading, setLoading] = useState(true)
  const [demoAuthenticated, setDemoAuthenticated] = useState(firebaseConfigured ? false : true)

  useEffect(() => {
    if (!firebaseConfigured) {
      setMe(demoMe)
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

  const login = async (email: string, password: string) => {
    if (!firebaseConfigured) {
      setDemoAuthenticated(true)
      setMe({ ...demoMe, email: email || demoMe.email })
      return
    }
    await signInWithEmailAndPassword(getFirebaseAuth(), email, password)
  }

  const loginWithGoogle = async () => {
    if (!firebaseConfigured) {
      setDemoAuthenticated(true)
      setMe(demoMe)
      return
    }
    await signInWithPopup(getFirebaseAuth(), googleProvider)
  }

  const register = async (data: {
    name: string
    email: string
    password: string
    nationalId: string
  }) => {
    if (!firebaseConfigured) {
      setDemoAuthenticated(true)
      setMe({ ...demoMe, name: data.name, email: data.email })
      return
    }
    // registerStudent is deployed to europe-west3 (see backend/API_DOCUMENTATION §22).
    await callCloudFunction('registerStudent', 'europe-west3', data)
    // Account created but not signed in — sign in now.
    await signInWithEmailAndPassword(getFirebaseAuth(), data.email, data.password)
  }

  const logout = async () => {
    if (!firebaseConfigured) {
      setDemoAuthenticated(false)
      setMe(null)
      return
    }
    await fbSignOut(getFirebaseAuth())
    setMe(null)
  }

  const refreshMe = async () => {
    if (!firebaseConfigured) {
      setMe(demoMe)
      return
    }
    if (getFirebaseAuth().currentUser) setMe(await meApi.get())
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      firebaseUser,
      me,
      roles: me?.roles ?? [],
      loading,
      isDemoMode: !firebaseConfigured,
      isAuthenticated: firebaseConfigured ? Boolean(firebaseUser) : demoAuthenticated,
      login,
      loginWithGoogle,
      register,
      logout,
      refreshMe,
    }),
    [firebaseUser, me, loading, demoAuthenticated]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}
