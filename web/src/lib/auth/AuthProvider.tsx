'use client'

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useQueryClient } from '@tanstack/react-query'
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
import { setStoreUid } from '@/lib/localStore'
import { callCloudFunction } from '@/lib/auth/cloudFunctions'
import type { Me, Role } from '@/lib/types'

interface AuthContextValue {
  firebaseUser: FirebaseUser | null
  me: Me | null
  roles: Role[]
  /**
   * False until the roles for the signed-in user have actually been determined.
   * Guards must wait for this: treating "not loaded yet" as "no roles" bounces
   * an instructor out of their own workspace on a slow or failed profile fetch.
   */
  rolesResolved: boolean
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

const knownRoles: Role[] = ['admin', 'instructor', 'student']

/**
 * Roles from the ID token. `null` means the token carries no `roles` claim at
 * all, which is different from an empty array: absent means "this token says
 * nothing", empty means "this account has no roles". Only the second is
 * authoritative.
 */
function readClaimRoles(value: unknown): Role[] | null {
  if (!Array.isArray(value)) return null
  return value.filter((role): role is Role => knownRoles.includes(role as Role))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [me, setMe] = useState<Me | null>(null)
  const [claimRoles, setClaimRoles] = useState<Role[] | null>(null)
  const [rolesResolved, setRolesResolved] = useState(false)
  const [loading, setLoading] = useState(true)
  const lastUid = useRef<string | null>(null)

  useEffect(() => {
    if (!firebaseConfigured) {
      setLoading(false)
      setRolesResolved(true)
      return
    }

    const unsub = onAuthStateChanged(getFirebaseAuth(), async (user) => {
      const uid = user?.uid ?? null
      // Whenever the account changes — including sign-out — drop everything
      // cached for the previous one. React Query holds the profile,
      // enrollments, submissions and grades of whoever was signed in, and
      // sign-out is a client-side navigation with no reload, so without this
      // the next account on a shared device is served the previous user's data.
      if (uid !== lastUid.current) {
        lastUid.current = uid
        queryClient.clear()
        setStoreUid(uid)
        setRolesResolved(false)
      }

      setFirebaseUser(user)
      if (user) {
        try {
          // Pick up role changes made while this browser session was active.
          const token = await user.getIdTokenResult(true)
          setClaimRoles(readClaimRoles(token.claims.roles))
          // Provision the row (idempotent) then load profile + roles.
          await meApi.sync({ email: user.email ?? '', name: user.displayName || user.email?.split('@')[0] || 'User', avatar: user.photoURL ?? undefined })
          setMe(await meApi.get())
        } catch {
          setMe(null)
        }
      } else {
        setMe(null)
        setClaimRoles(null)
      }
      setRolesResolved(true)
      setLoading(false)
    })
    return () => unsub()
  }, [queryClient])

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

  const logout = useCallback(async () => {
    if (!firebaseConfigured) return
    await fbSignOut(getFirebaseAuth())
    setMe(null)
    setClaimRoles(null)
    // onAuthStateChanged clears the caches too; doing it here as well means the
    // data is gone the moment the user asks, not one tick later.
    queryClient.clear()
    setStoreUid(null)
  }, [queryClient])

  const refreshMe = async () => {
    if (!firebaseConfigured) return
    const user = getFirebaseAuth().currentUser
    if (user) {
      const token = await user.getIdTokenResult(true)
      setClaimRoles(readClaimRoles(token.claims.roles))
      setMe(await meApi.get())
    }
  }

  /**
   * The ID token is what the API authorizes against, so when it carries a
   * `roles` claim that claim is the truth — including when it is empty, which
   * is how a revoked instructor looks. The database row is only consulted when
   * the token says nothing about roles at all, so an account whose claims have
   * not been minted yet still gets its UI.
   */
  const roles = useMemo<Role[]>(
    () => (claimRoles !== null ? claimRoles : (me?.roles ?? [])),
    [me?.roles, claimRoles],
  )

  const value = useMemo<AuthContextValue>(
    () => ({
      firebaseUser,
      me,
      roles,
      rolesResolved,
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
    [firebaseUser, me, roles, rolesResolved, loading, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}
