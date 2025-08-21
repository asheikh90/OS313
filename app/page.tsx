'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ImpactCounters from '@/components/ImpactCounters'
import Vision from '@/components/Vision'
import CollectivePower from '@/components/CollectivePower'
import AdaptivePaths from '@/components/AdaptivePaths'
import FaithPulse from '@/components/FaithPulse'
import Timeline from '@/components/Timeline'
import Stories from '@/components/Stories'
import WaitlistCTA from '@/components/WaitlistCTA'
import CTA from '@/components/CTA'
import ChatBot from '@/components/ChatBot'
import { track } from '@/utils/analytics'

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('os313-theme')
      return saved ? JSON.parse(saved) : false
    }
    return false
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    localStorage.setItem('os313-theme', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.8
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-navy-900 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <motion.span 
            className="gradient-text text-2xl font-bold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            OS313
          </motion.span>
        </motion.div>
      </div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        className="min-h-screen bg-white dark:bg-navy-900 text-navy-900 dark:text-navy-50 transition-colors duration-500"
      >
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

        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Hero />
        <ImpactCounters />
        <Vision />
        <CollectivePower />
        <AdaptivePaths />
        <FaithPulse />
        <Timeline />
        <Stories />
        <WaitlistCTA />
        <CTA />
        <ChatBot />
      </motion.div>
    </AnimatePresence>
  )
}
