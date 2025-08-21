'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Key, ArrowRight } from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const success = await login(email, code)
      if (success) {
        router.push('/dashboard')
      } else {
        setError('Invalid code. Use 424242 for demo access.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-navy-900 flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-primary-600/5 dark:from-primary-500/10 dark:to-primary-600/10"></div>
        <motion.div
          animate={{ 
            background: [
              'radial-gradient(circle at 20% 80%, rgba(17, 185, 143, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(14, 165, 164, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(17, 185, 143, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <motion.span 
              className="text-3xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              OS313
            </motion.span>
          </Link>
          <h1 className="text-2xl font-bold text-navy-900 dark:text-navy-50 mt-4 mb-2">
            Welcome Back
          </h1>
          <p className="text-navy-600 dark:text-navy-400">
            Enter your credentials to access the dashboard
          </p>
        </div>

        <motion.div
          className="dashboard-card p-8"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-navy-300 dark:border-navy-600 rounded-xl bg-white/80 dark:bg-navy-700/80 text-navy-900 dark:text-navy-50 placeholder-navy-500 dark:placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">
                Access Code
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-400 w-5 h-5" />
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-navy-300 dark:border-navy-600 rounded-xl bg-white/80 dark:bg-navy-700/80 text-navy-900 dark:text-navy-50 placeholder-navy-500 dark:placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="424242"
                />
              </div>
              <p className="text-xs text-navy-500 dark:text-navy-400 mt-1">
                Demo code: 424242
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 shadow-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              href="/"
              className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
            >
              ← Back to homepage
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
