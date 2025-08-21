'use client'
import { RequireAuth } from '@/lib/auth/auth-context'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <RequireAuth>{children}</RequireAuth>
}
