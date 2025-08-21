'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bell, Search, Moon, Sun, LogOut } from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-context'

export default function DashboardHeader() {
  const { user, logout } = useAuth()
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('os313-theme')
    const isDark = saved ? JSON.parse(saved) : false
    setDarkMode(isDark)
    
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('os313-theme', JSON.stringify(newMode))
    
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <header className="bg-white dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-navy-600 rounded-lg bg-gray-50 dark:bg-navy-700 text-navy-900 dark:text-navy-100 placeholder-navy-500 dark:placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-navy-600 dark:text-navy-300 hover:text-navy-900 dark:hover:text-navy-100 hover:bg-gray-100 dark:hover:bg-navy-700 rounded-lg transition-all duration-200"
          >
            <Bell className="w-5 h-5" />
          </motion.button>

          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-navy-600 dark:text-navy-300 hover:text-navy-900 dark:hover:text-navy-100 hover:bg-gray-100 dark:hover:bg-navy-700 rounded-lg transition-all duration-200"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm font-medium text-navy-900 dark:text-navy-100">
                {user?.email}
              </div>
              <div className="text-xs text-navy-500 dark:text-navy-400">
                Member
              </div>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          </div>

          <motion.button
            onClick={logout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-navy-600 dark:text-navy-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-navy-700 rounded-lg transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </header>
  )
}
