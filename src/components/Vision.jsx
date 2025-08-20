import React, { useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { PiggyBank, Wrench, Heart, Gem } from 'lucide-react'

const Vision = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const visionCards = [
    {
      icon: PiggyBank,
      title: 'Save',
      description: 'Slash your bills. Telecom, electricity, insurance, subscriptions. Alone you\'re a customer. Together you\'re a force.',
      color: 'from-green-400 to-green-600',
      glowColor: 'rgba(34, 197, 94, 0.3)'
    },
    {
      icon: Wrench,
      title: 'Build',
      description: 'Turn ideas into income. Shared tools, mentorship, and clients inside the network.',
      color: 'from-blue-400 to-blue-600',
      glowColor: 'rgba(59, 130, 246, 0.3)'
    },
    {
      icon: Heart,
      title: 'Belong',
      description: 'Find your brotherhood. Find your sisterhood. Find your partner.',
      color: 'from-pink-400 to-pink-600',
      glowColor: 'rgba(236, 72, 153, 0.3)'
    },
    {
      icon: Gem,
      title: 'Invest',
      description: 'Community capital → real ventures: franchises, equipment, housing, halal finance.',
      color: 'from-purple-400 to-purple-600',
      glowColor: 'rgba(147, 51, 234, 0.3)'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { 
      y: 60, 
      opacity: 0, 
      scale: 0.8,
      rotateX: 45
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  }

  const titleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    }
  }

  return (
    <section id="vision" ref={ref} className="section-padding">
      <div className="container-fluid">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <h2 className="text-fluid-h2 font-bold mb-6">
            <span className="gradient-text">Why We Exist</span>
          </h2>
          <p className="text-fluid-body text-navy-600 dark:text-navy-400 max-w-3xl mx-auto">
            OS313 isn't just a platform—it's a movement that aligns your values with your goals
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {visionCards.map((card, index) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              whileHover={{ 
                y: -15, 
                scale: 1.05,
                boxShadow: `0 20px 40px ${card.glowColor}`,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group premium-card bg-white/90 dark:bg-navy-800/90 p-8 backdrop-blur-glass relative overflow-hidden"
            >
              {/* Background Gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                initial={{ scale: 0, rotate: 45 }}
                whileHover={{ scale: 1.5, rotate: 0 }}
                transition={{ duration: 0.5 }}
              />
              
              <motion.div 
                className={`relative w-20 h-20 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center mb-6 shadow-glow`}
                whileHover={{ 
                  rotate: [0, -10, 10, 0], 
                  scale: 1.1 
                }}
                transition={{ duration: 0.5 }}
              >
                <card.icon className="w-10 h-10 text-white relative z-10" />
              </motion.div>
              
              <h3 className="text-fluid-h3 font-bold mb-4 text-navy-900 dark:text-navy-50 relative z-10">
                {card.title}
              </h3>
              
              <p className="text-navy-600 dark:text-navy-400 leading-relaxed relative z-10">
                {card.description}
              </p>

              {/* Floating particles */}
              <motion.div
                className="absolute top-4 right-4 w-2 h-2 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100"
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Vision
