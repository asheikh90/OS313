import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const Stories = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const testimonials = [
    {
      name: 'Ahmad Hassan',
      role: 'Small Business Owner',
      content: 'Saved $120/mo on internet and phone.',
      rating: 5,
      path: 'Saver',
      color: 'from-green-400 to-green-600'
    },
    {
      name: 'Fatima Al-Zahra',
      role: 'Marketing Professional',
      content: 'Met my business partner here.',
      rating: 5,
      path: 'Builder',
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Omar Abdullah',
      role: 'Software Engineer',
      content: 'I was introduced to my wife through a private intro.',
      rating: 5,
      path: 'Brotherhood',
      color: 'from-pink-400 to-pink-600'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const testimonialVariants = {
    enter: {
      x: 300,
      opacity: 0,
      scale: 0.8,
      rotateY: 45
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    exit: {
      x: -300,
      opacity: 0,
      scale: 0.8,
      rotateY: -45,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <section id="stories" ref={ref} className="section-padding">
      <div className="container-fluid">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={controls}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-fluid-h2 font-bold mb-6">
            <span className="gradient-text">Community Stories</span>
          </h2>
          <p className="text-fluid-body text-navy-600 dark:text-navy-400 max-w-3xl mx-auto">
            Real people, real results. See how OS313 is transforming lives across our community.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="relative max-w-4xl mx-auto"
        >
          {/* Background network effect */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="network-dot"
                style={{
                  top: `${20 + (i * 15) % 60}%`,
                  left: `${15 + (i * 20) % 70}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + (i % 2),
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}
          </div>

          {/* Testimonial Card */}
          <div className="relative premium-card bg-white/90 dark:bg-navy-800/90 p-12 backdrop-blur-glass overflow-hidden">
            {/* Background gradient */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${testimonials[currentTestimonial].color} opacity-5`}
              key={currentTestimonial}
              initial={{ scale: 0, rotate: 45 }}
              animate={{ scale: 1.2, rotate: 0 }}
              transition={{ duration: 0.8 }}
            />

            {/* Quote decoration */}
            <motion.div
              className="absolute top-8 left-8 text-6xl text-primary-400/20"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Quote className="w-16 h-16" />
            </motion.div>

            <div className="relative z-10 text-center">
              {/* Stars */}
              <motion.div 
                className="flex justify-center mb-8"
                key={`stars-${currentTestimonial}`}
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Star className="w-8 h-8 text-yellow-400 fill-current mx-1" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Quote */}
              <div className="relative h-32 flex items-center justify-center mb-8">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={currentTestimonial}
                    variants={testimonialVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="text-2xl md:text-3xl text-navy-700 dark:text-navy-300 italic leading-relaxed font-light"
                  >
                    "{testimonials[currentTestimonial].content}"
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Author */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`author-${currentTestimonial}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <motion.h4 
                    className="text-xl font-bold text-navy-900 dark:text-navy-50 mb-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    {testimonials[currentTestimonial].name}
                  </motion.h4>
                  
                  <p className="text-navy-600 dark:text-navy-400 mb-4">
                    {testimonials[currentTestimonial].role}
                  </p>
                  
                  <motion.span 
                    className={`inline-block px-4 py-2 bg-gradient-to-r ${testimonials[currentTestimonial].color} text-white rounded-full text-sm font-medium shadow-glow`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {testimonials[currentTestimonial].path}
                  </motion.span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12 relative z-10">
              <motion.button
                onClick={prevTestimonial}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full glass-panel dark:glass-panel-dark hover:shadow-glow transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6 text-navy-600 dark:text-navy-400" />
              </motion.button>

              {/* Dots */}
              <div className="flex space-x-3">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? 'bg-primary-500 shadow-glow'
                        : 'bg-navy-300 dark:bg-navy-600 hover:bg-primary-400'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextTestimonial}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full glass-panel dark:glass-panel-dark hover:shadow-glow transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6 text-navy-600 dark:text-navy-400" />
              </motion.button>
            </div>
          </div>

          {/* Floating elements */}
          <motion.div
            className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-full blur-2xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-primary-600/20 to-primary-400/20 rounded-full blur-2xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 4 }}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default Stories
