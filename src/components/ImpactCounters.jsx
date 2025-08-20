import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Users, DollarSign, TrendingUp } from 'lucide-react'

const ImpactCounters = () => {
  const [counts, setCounts] = useState({ members: 0, savings: 0, businesses: 0 })
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })

  const targets = {
    members: 1000,
    savings: 58420,
    businesses: 147
  }

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
      animateCounters()
    }
  }, [isInView, controls])

  const animateCounters = () => {
    const duration = 2500
    const steps = 60
    const stepDuration = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = Math.min(step / steps, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      setCounts({
        members: Math.floor(targets.members * easeOutQuart),
        savings: Math.floor(targets.savings * easeOutQuart),
        businesses: Math.floor(targets.businesses * easeOutQuart)
      })

      if (step >= steps) {
        clearInterval(timer)
        setCounts(targets)
      }
    }, stepDuration)
  }

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toLocaleString()
  }

  const counters = [
    {
      icon: Users,
      label: 'Members in Motion',
      value: counts.members,
      suffix: '+',
      color: 'from-blue-400 to-blue-600',
      delay: 0
    },
    {
      icon: DollarSign,
      label: 'Monthly Savings Unlocked',
      value: counts.savings,
      prefix: '$',
      suffix: '+',
      color: 'from-green-400 to-green-600',
      delay: 0.2
    },
    {
      icon: TrendingUp,
      label: 'Businesses Boosted',
      value: counts.businesses,
      suffix: '+',
      color: 'from-purple-400 to-purple-600',
      delay: 0.4
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
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

  return (
    <section ref={ref} className="section-padding bg-gradient-to-b from-navy-50/50 to-transparent dark:from-navy-800/30 dark:to-transparent">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="container-fluid"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {counters.map((counter, index) => (
            <motion.div
              key={counter.label}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="text-center premium-card bg-white/80 dark:bg-navy-800/80 p-8 backdrop-blur-glass"
            >
              <motion.div 
                className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${counter.color} flex items-center justify-center mx-auto mb-6 shadow-glow`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <counter.icon className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.div 
                className="text-4xl sm:text-5xl font-bold text-navy-900 dark:text-navy-50 mb-3"
                animate={isInView ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, delay: counter.delay }}
              >
                {counter.prefix}{formatNumber(counter.value)}{counter.suffix}
              </motion.div>
              
              <div className="text-navy-600 dark:text-navy-300 font-medium text-lg">
                {counter.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default ImpactCounters
