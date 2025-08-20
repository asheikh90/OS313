import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { ArrowDown, Play } from 'lucide-react'
import { track, EVENTS } from '../utils/analytics'

const Hero = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const scrollToWaitlist = () => {
    track(EVENTS.CTA_CLICK, { label: 'hero_primary' })
    document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToJourney = () => {
    track(EVENTS.CTA_CLICK, { label: 'hero_secondary' })
    document.getElementById('journey').scrollIntoView({ behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding">
      {/* Enhanced Constellation Background */}
      <div className="absolute inset-0 opacity-30">
        {/* Animated Network Dots */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="network-dot"
            style={{
              top: `${20 + (i * 7) % 60}%`,
              left: `${15 + (i * 11) % 70}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
        
        {/* SVG Constellation Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="constellation-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(17, 185, 143)" stopOpacity="0.6" />
              <stop offset="50%" stopColor="rgb(14, 165, 164)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="rgb(17, 185, 143)" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {[
            { x1: "25%", y1: "25%", x2: "75%", y2: "33%" },
            { x1: "75%", y1: "33%", x2: "33%", y2: "75%" },
            { x1: "33%", y1: "75%", x2: "75%", y2: "75%" },
            { x1: "16%", y1: "50%", x2: "25%", y2: "25%" },
            { x1: "75%", y1: "75%", x2: "84%", y2: "83%" },
          ].map((line, i) => (
            <motion.line
              key={i}
              className="constellation-line"
              {...line}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2, delay: i * 0.3 }}
            />
          ))}
        </svg>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10 text-center container-fluid"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-fluid-h1 font-bold mb-6 leading-tight"
        >
          <motion.span 
            className="gradient-text block"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            One Ummah.
          </motion.span>
          <motion.span 
            className="text-navy-900 dark:text-navy-50 block"
            variants={itemVariants}
          >
            One Operating System.
          </motion.span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-fluid-body mb-12 max-w-4xl mx-auto leading-relaxed text-navy-600 dark:text-navy-300"
        >
          We pool our power — cutting bills, funding businesses, building marriages, and shaping legacy. 
          OS313 isn't an app. It's our future.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button 
            onClick={scrollToWaitlist}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 0 30px rgba(17, 185, 143, 0.5)' 
            }}
            whileTap={{ scale: 0.95 }}
            className="group bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 shadow-glow premium-card"
          >
            Join the Waitlist
            <motion.div
              className="inline-block ml-2"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.button>
          
          <motion.button 
            onClick={scrollToJourney}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center px-8 py-4 rounded-2xl text-lg font-semibold border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300 glass-panel dark:glass-panel-dark"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mr-2"
            >
              <Play className="w-5 h-5" />
            </motion.div>
            See How It Works
          </motion.button>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-br from-primary-600/20 to-primary-400/20 rounded-full blur-xl"
        />
      </motion.div>
    </section>
  )
}

export default Hero
