import React, { useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Smartphone, Zap, Shield, Monitor, Briefcase, Tag } from 'lucide-react'

const CollectivePower = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const services = [
    { icon: Smartphone, name: 'Phone Bills', color: 'text-blue-500', bgColor: 'from-blue-400/20 to-blue-600/20' },
    { icon: Zap, name: 'Electricity', color: 'text-yellow-500', bgColor: 'from-yellow-400/20 to-yellow-600/20' },
    { icon: Shield, name: 'Insurance', color: 'text-green-500', bgColor: 'from-green-400/20 to-green-600/20' },
    { icon: Monitor, name: 'Subscriptions', color: 'text-purple-500', bgColor: 'from-purple-400/20 to-purple-600/20' },
    { icon: Briefcase, name: 'Software', color: 'text-red-500', bgColor: 'from-red-400/20 to-red-600/20' },
  ]

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

  const serviceVariants = {
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

  const arrowVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 1,
        type: "spring",
        stiffness: 200
      }
    }
  }

  const tagVariants = {
    hidden: { 
      scale: 0, 
      opacity: 0, 
      rotateY: 180 
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        delay: 1.5,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <section id="power" ref={ref} className="section-padding bg-gradient-to-b from-navy-50/50 to-transparent dark:from-navy-800/30 dark:to-transparent">
      <div className="container-fluid">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={controls}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-fluid-h2 font-bold mb-6">
            <span className="gradient-text">Collective Buying Power</span>
          </h2>
          <p className="text-fluid-body text-navy-600 dark:text-navy-400 max-w-3xl mx-auto">
            Why pay retail when we buy wholesale as a family?
          </p>
        </motion.div>

        <div className="relative">
          {/* Network Visualization */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="flex flex-wrap justify-center items-center gap-8 mb-12"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                variants={serviceVariants}
                whileHover={{ 
                  y: -10, 
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group relative premium-card bg-white/90 dark:bg-navy-800/90 p-8 backdrop-blur-glass"
              >
                {/* Background glow */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  whileHover={{ scale: 1.1 }}
                />
                
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10"
                >
                  <service.icon className={`w-12 h-12 ${service.color} mb-4 mx-auto`} />
                </motion.div>
                
                <p className="text-sm font-medium text-navy-700 dark:text-navy-300 relative z-10">
                  {service.name}
                </p>
                
                {/* Connection Lines */}
                {index < services.length - 1 && (
                  <motion.div 
                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-primary-400 to-primary-600"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 0.6 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  />
                )}

                {/* Floating particles */}
                <motion.div
                  className="absolute -top-2 -right-2 w-3 h-3 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100"
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
            ))}
          </motion.div>

          {/* Arrow pointing to discount */}
          <motion.div
            variants={arrowVariants}
            initial="hidden"
            animate={controls}
            className="flex justify-center mb-8"
          >
            <motion.div 
              className="text-primary-500"
              animate={{ 
                y: [0, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Big Discount Tag */}
          <div className="flex justify-center">
            <motion.div
              variants={tagVariants}
              initial="hidden"
              animate={controls}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: '0 0 50px rgba(17, 185, 143, 0.4)'
              }}
              className="relative premium-card bg-gradient-to-r from-primary-500 to-primary-600 p-10 shadow-glow-lg overflow-hidden"
            >
              {/* Background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-700"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity 
                }}
                style={{ backgroundSize: '200% 200%' }}
              />
              
              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Tag className="w-20 h-20 text-white mb-6 mx-auto" />
                </motion.div>
                
                <motion.h3 
                  className="text-4xl font-bold text-white text-center mb-3"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Up to 40% Savings
                </motion.h3>
                
                <p className="text-primary-100 text-center text-lg">
                  Through pooled negotiation and switch packs
                </p>
              </div>

              {/* Floating elements */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/30 rounded-full"
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
                    duration: 3 + (i % 2),
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CollectivePower
