import React, { useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import { track, EVENTS } from '../utils/analytics'

const CTA = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.5 })

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const scrollToWaitlist = () => {
    track(EVENTS.CTA_CLICK, { label: 'footer_primary' })
    document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToJourney = () => {
    track(EVENTS.CTA_CLICK, { label: 'footer_secondary' })
    document.getElementById('journey').scrollIntoView({ behavior: 'smooth' })
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
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-primary-400/30 to-primary-600/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-primary-600/30 to-primary-400/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 5 }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="container-fluid text-center relative z-10"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-fluid-h2 font-bold mb-12"
        >
          <span className="gradient-text">Start Your Journey Today</span>
        </motion.h2>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button 
            onClick={scrollToWaitlist}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 0 40px rgba(17, 185, 143, 0.5)' 
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-10 py-5 rounded-2xl text-lg font-semibold transition-all duration-300 shadow-glow premium-card overflow-hidden"
          >
            {/* Button background animation */}
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
            
            <span className="relative z-10 flex items-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="mr-3"
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
              Join the Waitlist
              <motion.div
                className="ml-3"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </span>
          </motion.button>
          
          <motion.button 
            onClick={scrollToJourney}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center px-10 py-5 rounded-2xl text-lg font-semibold border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300 glass-panel dark:glass-panel-dark premium-card"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mr-3"
            >
              <Play className="w-5 h-5" />
            </motion.div>
            See How It Works
          </motion.button>
        </motion.div>

        {/* Floating elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400 rounded-full opacity-60"
            style={{
              top: `${20 + (i * 15) % 60}%`,
              left: `${10 + (i * 20) % 80}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.7
            }}
          />
        ))}
      </motion.div>
    </section>
  )
}

export default CTA
