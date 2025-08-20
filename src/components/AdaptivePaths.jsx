import React, { useState, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { PiggyBank, Wrench, Users, TrendingUp } from 'lucide-react'
import { track, EVENTS } from '../utils/analytics'

const AdaptivePaths = () => {
  const [selectedPath, setSelectedPath] = useState(null)
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const paths = [
    {
      id: 'saver',
      title: 'Saver',
      subtitle: 'Cut my bills',
      icon: PiggyBank,
      color: 'from-green-400 to-green-600',
      glowColor: 'rgba(34, 197, 94, 0.4)',
      description: 'Reduce monthly expenses through collective buying power',
      benefit: 'Save $200+ monthly on bills and subscriptions'
    },
    {
      id: 'builder',
      title: 'Builder',
      subtitle: 'Grow my business',
      icon: Wrench,
      color: 'from-blue-400 to-blue-600',
      glowColor: 'rgba(59, 130, 246, 0.4)',
      description: 'Access resources, mentorship, and business opportunities',
      benefit: 'Connect with partners and scale your venture'
    },
    {
      id: 'brotherhood',
      title: 'Brotherhood / Sisterhood',
      subtitle: 'Marriage + belonging',
      icon: Users,
      color: 'from-pink-400 to-pink-600',
      glowColor: 'rgba(236, 72, 153, 0.4)',
      description: 'Find meaningful relationships and community connections',
      benefit: 'Build lasting relationships and find your life partner'
    },
    {
      id: 'investor',
      title: 'Investor',
      subtitle: 'Legacy & deals',
      icon: TrendingUp,
      color: 'from-purple-400 to-purple-600',
      glowColor: 'rgba(147, 51, 234, 0.4)',
      description: 'Participate in legacy projects and wealth building',
      benefit: 'Generate passive income and build generational wealth'
    }
  ]

  const handlePathClick = (path) => {
    if (selectedPath === path.id) {
      // If already selected, scroll to waitlist with preselected role
      track(EVENTS.LANE_SELECTED, { value: path.id })
      const waitlistSection = document.getElementById('waitlist')
      if (waitlistSection) {
        // Trigger role preselection
        const event = new CustomEvent('preselectRole', { detail: path.id })
        window.dispatchEvent(event)
        waitlistSection.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      setSelectedPath(path.id)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { 
      y: 60, 
      opacity: 0, 
      scale: 0.8,
      rotateY: -15
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <section id="paths" ref={ref} className="section-padding">
      <div className="container-fluid">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={controls}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-fluid-h2 font-bold mb-6">
            <span className="gradient-text">Pick Your Path</span>
          </h2>
          <p className="text-fluid-body text-navy-600 dark:text-navy-400 max-w-3xl mx-auto">
            OS313 adapts to you. Select your primary focus and we'll customize your experience.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {paths.map((path, index) => (
            <motion.div
              key={path.id}
              variants={cardVariants}
              whileHover={{ 
                y: -15, 
                scale: 1.05,
                boxShadow: `0 25px 50px ${path.glowColor}`,
                transition: { type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.95 }}
              className={`group relative premium-card bg-white/90 dark:bg-navy-800/90 p-8 cursor-pointer backdrop-blur-glass overflow-hidden ${
                selectedPath === path.id 
                  ? 'ring-2 ring-primary-500 shadow-glow-lg' 
                  : ''
              }`}
              onClick={() => handlePathClick(path)}
            >
              {/* Background gradient overlay */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-0 transition-opacity duration-500 ${
                  selectedPath === path.id ? 'opacity-10' : 'group-hover:opacity-5'
                }`}
                initial={{ scale: 0, rotate: 45 }}
                whileHover={{ scale: 1.2, rotate: 0 }}
                transition={{ duration: 0.5 }}
              />

              {/* Front Side */}
              <motion.div 
                className={`transition-opacity duration-500 ${
                  selectedPath === path.id ? 'opacity-0' : 'opacity-100'
                }`}
                animate={selectedPath === path.id ? { rotateY: 180 } : { rotateY: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${path.color} flex items-center justify-center mb-6 shadow-glow relative z-10`}
                  whileHover={{ 
                    rotate: [0, -10, 10, 0], 
                    scale: 1.1 
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <path.icon className="w-10 h-10 text-white" />
                </motion.div>
                
                <h3 className="text-fluid-h3 font-bold mb-3 text-navy-900 dark:text-navy-50 relative z-10">
                  {path.title}
                </h3>
                
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-4 relative z-10">
                  {path.subtitle}
                </p>
                
                <p className="text-navy-600 dark:text-navy-400 text-sm leading-relaxed relative z-10">
                  {path.description}
                </p>
              </motion.div>

              {/* Back Side */}
              <motion.div 
                className={`absolute inset-0 p-8 flex flex-col items-center justify-center transition-opacity duration-500 ${
                  selectedPath === path.id ? 'opacity-100' : 'opacity-0'
                }`}
                animate={selectedPath === path.id ? { rotateY: 0 } : { rotateY: -180 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${path.color} flex items-center justify-center mb-6 shadow-glow`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <p className="text-navy-900 dark:text-navy-50 font-semibold mb-6 text-center">
                  {path.benefit}
                </p>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-gradient-to-r ${path.color} hover:shadow-glow text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300`}
                >
                  Join as {path.title}
                </motion.button>
              </motion.div>

              {/* Selection indicator */}
              <motion.div
                className="absolute top-4 right-4 text-primary-500"
                animate={{ 
                  opacity: selectedPath === path.id ? 1 : 0,
                  scale: selectedPath === path.id ? 1 : 0,
                  rotate: selectedPath === path.id ? 360 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>

              {/* Floating particles */}
              <motion.div
                className="absolute top-2 left-2 w-2 h-2 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100"
                animate={{ 
                  y: [0, -15, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AdaptivePaths
