'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'

type User = { email: string } | null
type Ctx = {
  user: User
  login: (email: string, code: string) => Promise<void>
  logout: () => void
}
const AuthCtx = createContext<Ctx | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('os313_user')
      if (raw) setUser(JSON.parse(raw))
    } catch {}
  }, [])

  async function login(email: string, code: string) {
    // DUMMY RULE: any email, code must be 424242
    if (code !== '424242') throw new Error('Invalid code')
    const u = { email }
    setUser(u)
    localStorage.setItem('os313_user', JSON.stringify(u))
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('os313_user')
  }

  return <AuthCtx.Provider value={{ user, login, logout }}>{children}</AuthCtx.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

// Protect dashboard segment
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  if (!user) {
    if (typeof window !== 'undefined') window.location.href = '/auth'
    return null
  }
  return <>{children}</>
}
