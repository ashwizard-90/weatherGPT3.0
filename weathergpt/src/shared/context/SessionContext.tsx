import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { DashboardRole, SignupData } from '../types/user'
import { EMPTY_SIGNUP_DATA } from '../types/user'

export interface StoredUser extends SignupData {
  id: string
  createdAt: string
}

interface SessionContextValue {
  profile: SignupData
  setProfile: (data: SignupData) => void
  /** Which dashboard is currently being viewed. Lets a signed-up user preview
   *  other role dashboards from the sidebar. Administrator is NOT in this list. */
  activeDashboard: DashboardRole
  setActiveDashboard: (role: DashboardRole) => void
  isAdminAuthenticated: boolean
  adminLogin: (username: string, password: string) => boolean
  adminLogout: () => void
  users: StoredUser[]
  clearProfile: () => void
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined)

// Admin credentials are checked client-side for demo; in production they must be
// verified server-side via a backend endpoint. Values can be injected via env.
const ADMIN_USER = (import.meta as unknown as { env: Record<string, string | undefined> }).env?.VITE_ADMIN_USERNAME ?? 'admin'
const ADMIN_PASS = (import.meta as unknown as { env: Record<string, string | undefined> }).env?.VITE_ADMIN_PASSWORD ?? 'WeatherGPT@2024'

const USERS_KEY = 'weathergpt.users'
const PROFILE_KEY = 'weathergpt.profile'

export function SessionProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<SignupData>(() => {
    try {
      const s = localStorage.getItem(PROFILE_KEY)
      if (s) return JSON.parse(s) as SignupData
    } catch { /* ignore */ }
    return EMPTY_SIGNUP_DATA
  })
  const [activeDashboard, setActiveDashboard] = useState<DashboardRole>('citizen')
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [users, setUsers] = useState<StoredUser[]>(() => {
    try {
      const s = localStorage.getItem(USERS_KEY)
      if (s) return JSON.parse(s) as StoredUser[]
    } catch { /* ignore */ }
    return []
  })

  const setProfile = (data: SignupData) => {
    setProfileState(data)
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(data))
      // admin board stores every completed signup
      if (data.fullName && data.mobileNumber) {
        const entry: StoredUser = { ...data, id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, createdAt: new Date().toISOString() }
        setUsers((prev) => {
          const next = [...prev, entry]
          localStorage.setItem(USERS_KEY, JSON.stringify(next))
          return next
        })
      }
    } catch { /* ignore */ }
  }

  const clearProfile = () => {
    setProfileState(EMPTY_SIGNUP_DATA)
    try { localStorage.removeItem(PROFILE_KEY) } catch { /* ignore */ }
  }

  useEffect(() => {
    try { localStorage.setItem(USERS_KEY, JSON.stringify(users)) } catch { /* ignore */ }
  }, [users])

  const adminLogin = (username: string, password: string) => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setIsAdminAuthenticated(true)
      return true
    }
    return false
  }
  const adminLogout = () => setIsAdminAuthenticated(false)

  const value = useMemo(
    () => ({ profile, setProfile, activeDashboard, setActiveDashboard, isAdminAuthenticated, adminLogin, adminLogout, users, clearProfile }),
    [profile, activeDashboard, isAdminAuthenticated, users],
  )

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession must be used within a SessionProvider')
  return ctx
}
