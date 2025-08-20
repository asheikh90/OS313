import React, { useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

const FaithPulse = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.5 })

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section ref={ref} className="section-padding">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="container-fluid text-center"
      >
        <div className="relative max-w-4xl mx-auto">
          {/* Decorative elements */}
          <motion.div 
            className="absolute -top-8 -left-8 w-16 h-16 border-l-2 border-t-2 border-primary-400 opacity-30 rounded-tl-2xl"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div 
            className="absolute -bottom-8 -right-8 w-16 h-16 border-r-2 border-b-2 border-primary-400 opacity-30 rounded-br-2xl"
            animate={{ 
              rotate: [0, -5, 5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          />
          
          {/* Background glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-primary-600/10 rounded-3xl blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <motion.blockquote 
            className="relative text-fluid-h3 font-light italic text-navy-700 dark:text-navy-300 leading-relaxed premium-card bg-white/80 dark:bg-navy-800/80 p-12 backdrop-blur-glass"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              "For some, faith is the center. For others, it's still unfolding.
            </motion.span>
            <br />
            <motion.span 
              className="gradient-text font-medium"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity 
              }}
            >
              Wherever you are, OS313 adapts to you.
            </motion.span>
            <span>"</span>
          </motion.blockquote>
          
          <motion.div 
            className="mt-8 w-32 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />

          {/* Floating quote marks */}
          <motion.div
            className="absolute top-4 left-4 text-6xl text-primary-400/20 font-serif"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            "
          </motion.div>
          <motion.div
            className="absolute bottom-4 right-4 text-6xl text-primary-400/20 font-serif rotate-180"
            animate={{ 
              y: [0, 10, 0],
              rotate: [180, 185, 180]
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          >
            "
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default FaithPulse
