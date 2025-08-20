import React, { useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { User, DollarSign, Users, TrendingUp, Gem, MessageCircle } from 'lucide-react'

const Timeline = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const stages = [
    {
      stage: 0,
      title: 'Identity',
      description: 'Define who you are',
      icon: User,
      color: 'from-gray-400 to-gray-600'
    },
    {
      stage: 1,
      title: 'Survival',
      description: 'Stabilize your life (bills)',
      icon: DollarSign,
      color: 'from-green-400 to-green-600'
    },
    {
      stage: 2,
      title: 'Belonging',
      description: 'Find your tribe',
      icon: Users,
      color: 'from-blue-400 to-blue-600'
    },
    {
      stage: 3,
      title: 'Growth',
      description: 'Build your future',
      icon: TrendingUp,
      color: 'from-purple-400 to-purple-600'
    },
    {
      stage: 4,
      title: 'Wealth',
      description: 'Turn surplus into impact',
      icon: Gem,
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      stage: 5,
      title: 'Feedback',
      description: 'Shape what comes next',
      icon: MessageCircle,
      color: 'from-pink-400 to-pink-600'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  const stageVariants = {
    hidden: { 
      y: 50, 
      opacity: 0, 
      scale: 0.8 
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        delay: 0.5,
        duration: 2,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section id="journey" ref={ref} className="section-padding bg-gradient-to-b from-navy-50/50 to-transparent dark:from-navy-800/30 dark:to-transparent">
      <div className="container-fluid">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={controls}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-fluid-h2 font-bold mb-6">
            <span className="gradient-text">Your Journey</span>
          </h2>
          <p className="text-fluid-body text-navy-600 dark:text-navy-400 max-w-3xl mx-auto">
            A gamified progression system that grows with you at every stage of life
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div 
            variants={lineVariants}
            initial="hidden"
            animate={controls}
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400 transform -translate-y-1/2 rounded-full shadow-glow origin-left"
          />
          
          {/* Timeline stages */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8"
          >
            {stages.map((stage, index) => (
              <motion.div
                key={stage.stage}
                variants={stageVariants}
                whileHover={{ 
                  y: -15, 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Stage number */}
                <motion.div 
                  className="absolute -top-3 -left-3 w-8 h-8 bg-primary-500 text-white text-sm font-bold rounded-full flex items-center justify-center z-20 shadow-glow"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  {stage.stage}
                </motion.div>
                
                {/* Icon container */}
                <motion.div 
                  className={`relative w-24 h-24 rounded-2xl bg-gradient-to-r ${stage.color} flex items-center justify-center mb-6 shadow-glow z-10 premium-card`}
                  whileHover={{ 
                    rotate: [0, -5, 5, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <stage.icon className="w-12 h-12 text-white" />
                  
                  {/* Floating particles */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-3 h-3 bg-white/50 rounded-full"
                    animate={{ 
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                </motion.div>
                
                {/* Content */}
                <motion.h3 
                  className="text-xl font-bold mb-3 text-navy-900 dark:text-navy-50"
                  whileHover={{ scale: 1.05 }}
                >
                  {stage.title}
                </motion.h3>
                
                <motion.p 
                  className="text-sm text-navy-600 dark:text-navy-400 leading-relaxed"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                >
                  {stage.description}
                </motion.p>

                {/* Progress indicator */}
                <motion.div
                  className="mt-4 w-full h-2 bg-navy-200 dark:bg-navy-700 rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className={`h-full bg-gradient-to-r ${stage.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(index + 1) * 16.67}%` }}
                    transition={{ delay: 1 + index * 0.2, duration: 1 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Timeline
