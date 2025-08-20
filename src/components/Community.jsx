import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const Community = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: 'Marcus Johnson',
      role: 'Small Business Owner',
      content: 'Saved me $120/month on internet and found my business partner through the Builder network.',
      rating: 5,
      path: 'Builder'
    },
    {
      name: 'Sarah Williams',
      role: 'Marketing Professional',
      content: 'The collective buying power is real. Cut my phone bill in half and discovered amazing investment opportunities.',
      rating: 5,
      path: 'Saver'
    },
    {
      name: 'David Chen',
      role: 'Software Engineer',
      content: 'Met my wife through the Brotherhood network. Blueprint313 changed my entire life trajectory.',
      rating: 5,
      path: 'Brotherhood'
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Real Estate Investor',
      content: 'The legacy projects have generated consistent passive income. This platform is the future.',
      rating: 5,
      path: 'Investor'
    },
    {
      name: 'James Thompson',
      role: 'Consultant',
      content: 'From cutting expenses to building wealth, Blueprint313 covers every aspect of financial growth.',
      rating: 5,
      path: 'Saver'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="community" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Community Stories</span>
          </h2>
          <p className="text-xl text-navy-600 dark:text-navy-400 max-w-3xl mx-auto">
            Real people, real results. See how Blueprint313 is transforming lives across our community.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Background network effect */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-primary-400 rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-1/4 left-3/4 w-2 h-2 bg-primary-400 rounded-full animate-pulse delay-700"></div>
          </div>

          {/* Testimonial Card */}
          <div className="relative bg-white dark:bg-navy-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="text-center">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-navy-700 dark:text-navy-300 mb-8 italic leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center">
                <h4 className="text-lg font-bold text-navy-900 dark:text-white mb-1">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-navy-600 dark:text-navy-400 mb-2">
                  {testimonials[currentTestimonial].role}
                </p>
                <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                  {testimonials[currentTestimonial].path}
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-navy-100 dark:bg-navy-700 hover:bg-navy-200 dark:hover:bg-navy-600 transition-colors duration-200"
              >
                <ChevronLeft className="w-6 h-6 text-navy-600 dark:text-navy-400" />
              </button>

              {/* Dots */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === currentTestimonial
                        ? 'bg-primary-500'
                        : 'bg-navy-300 dark:bg-navy-600'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-navy-100 dark:bg-navy-700 hover:bg-navy-200 dark:hover:bg-navy-600 transition-colors duration-200"
              >
                <ChevronRight className="w-6 h-6 text-navy-600 dark:text-navy-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Community
