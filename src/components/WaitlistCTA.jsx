import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Mail, Check, Sparkles } from 'lucide-react'
import { track, EVENTS } from '../utils/analytics'

const WaitlistCTA = () => {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const roles = [
    { value: 'saver', label: 'Saver' },
    { value: 'builder', label: 'Builder' },
    { value: 'brotherhood', label: 'Brotherhood' },
    { value: 'sisterhood', label: 'Sisterhood' },
    { value: 'investor', label: 'Investor' }
  ]

  useEffect(() => {
    // Listen for role preselection from other components
    const handleRolePreselect = (event) => {
      setRole(event.detail)
    }

    window.addEventListener('preselectRole', handleRolePreselect)
    return () => window.removeEventListener('preselectRole', handleRolePreselect)
  }, [])

  const handleWaitlistSubmit = (e) => {
    e.preventDefault()
    if (!email) return

    // Analytics tracking
    track(EVENTS.WAITLIST_SUBMITTED, { 
      email: email.replace(/(.{2}).*(@.*)/, '$1***$2'), // Mask email for privacy
      role: role || 'unspecified'
    })

    // Simulate submission
    setIsSubmitted(true)
    setShowToast(true)

    // Hide toast after 5 seconds
    setTimeout(() => {
      setShowToast(false)
    }, 5000)

    // Reset form after 3 seconds
    setTimeout(() => {
      setEmail('')
      setRole('')
      setIsSubmitted(false)
    }, 3000)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <section id="waitlist" ref={ref} className="section-padding bg-gradient-to-b from-navy-50/50 to-transparent dark:from-navy-800/30 dark:to-transparent relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="network-dot"
            style={{
              top: `${10 + (i * 8) % 80}%`,
              left: `${5 + (i * 12) % 90}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="container-fluid text-center relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-fluid-h2 font-bold mb-6">
            This isn't a service.
            <br />
            <span className="gradient-text">It's our operating system.</span>
          </h2>
          <motion.p 
            className="text-fluid-body text-navy-600 dark:text-navy-400 mb-8"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Be one of the first 1,000.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="max-w-md mx-auto"
        >
          <motion.div
            className="premium-card bg-white/90 dark:bg-navy-800/90 p-8 backdrop-blur-glass relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Background glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/10"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <form onSubmit={handleWaitlistSubmit} className="space-y-6 relative z-10">
              {/* Email Input */}
              <motion.div 
                className="relative"
                whileFocus={{ scale: 1.02 }}
              >
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-navy-400 w-5 h-5 z-10" />
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  whileFocus={{ 
                    boxShadow: '0 0 20px rgba(17, 185, 143, 0.3)',
                    borderColor: '#11B98F'
                  }}
                  className="w-full pl-12 pr-4 py-4 border-2 border-navy-300 dark:border-navy-600 rounded-2xl bg-white/80 dark:bg-navy-700/80 text-navy-900 dark:text-navy-50 placeholder-navy-500 dark:placeholder-navy-400 focus:outline-none focus:border-primary-500 transition-all duration-300 backdrop-blur-sm"
                />
              </motion.div>

              {/* Role Select */}
              <motion.select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                whileFocus={{ 
                  boxShadow: '0 0 20px rgba(17, 185, 143, 0.3)',
                  borderColor: '#11B98F'
                }}
                className="w-full px-4 py-4 border-2 border-navy-300 dark:border-navy-600 rounded-2xl bg-white/80 dark:bg-navy-700/80 text-navy-900 dark:text-navy-50 focus:outline-none focus:border-primary-500 transition-all duration-300 backdrop-blur-sm"
              >
                <option value="">Select your path (optional)</option>
                {roles.map((roleOption) => (
                  <option key={roleOption.value} value={roleOption.value}>
                    {roleOption.label}
                  </option>
                ))}
              </motion.select>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitted}
                whileHover={!isSubmitted ? { 
                  scale: 1.05, 
                  boxShadow: '0 0 30px rgba(17, 185, 143, 0.5)' 
                } : {}}
                whileTap={!isSubmitted ? { scale: 0.95 } : {}}
                className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 relative overflow-hidden ${
                  isSubmitted
                    ? 'bg-green-500 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-glow'
                }`}
              >
                {/* Button background animation */}
                {!isSubmitted && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-700"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity 
                    }}
                    style={{ backgroundSize: '200% 200%' }}
                  />
                )}
                
                <span className="relative z-10 flex items-center justify-center">
                  {isSubmitted ? (
                    <>
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <Check className="w-6 h-6 mr-2" />
                      </motion.div>
                      Submitted!
                    </>
                  ) : (
                    <>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                      Join the Waitlist
                    </>
                  )}
                </span>
              </motion.button>
            </form>

            <motion.p 
              className="text-sm text-navy-500 dark:text-navy-400 mt-6 relative z-10"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Free to join • No commitment • Cancel anytime
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Success Toast */}
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-2xl shadow-glow z-50 premium-card"
          >
            <div className="flex items-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Check className="w-5 h-5 mr-3" />
              </motion.div>
              <div>
                <p className="font-semibold">You're on the list!</p>
                <p className="text-sm opacity-90">We'll reach out with your cohort details.</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

export default WaitlistCTA
