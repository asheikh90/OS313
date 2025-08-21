'use client'
import { useState } from 'react'
import { useAuth } from '@/lib/auth/auth-context'

export default function AuthPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [err, setErr] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr(null); setLoading(true)
    try {
      await login(email, code)
      window.location.href = '/dashboard'
    } catch (e:any) {
      setErr(e?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl glass-panel dark:glass-panel-dark p-6 space-y-4">
        <h1 className="text-xl font-semibold">Sign in</h1>
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-transparent p-3"
        />
        <input
          type="password"
          required
          placeholder="Enter code (424242)"
          value={code}
          onChange={e=>setCode(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-transparent p-3"
        />
        {err && <p className="text-red-400 text-sm">{err}</p>}
        <button disabled={loading} className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg py-3">
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        <p className="text-xs opacity-70">Dev login: any email, code <span className="font-mono">424242</span></p>
      </form>
    </main>
  )
}
