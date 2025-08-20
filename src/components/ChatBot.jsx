import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { track, EVENTS } from '../utils/analytics'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hi! I\'m here to help you find your perfect path in OS313. What interests you most?',
      timestamp: new Date()
    }
  ])

  const quickReplies = [
    'Save',
    'Build', 
    'Belong',
    'Invest'
  ]

  const handleOpen = () => {
    setIsOpen(true)
    track(EVENTS.CHATBOT_OPENED)
  }

  const handleClose = () => {
    setIsOpen(false)
    track(EVENTS.CHATBOT_CLOSED)
  }

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setMessage('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        content: 'Thanks for your interest! I\'ll connect you with the right onboarding flow. This feature will be fully integrated soon.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  const handleQuickReply = (reply) => {
    setMessage(reply)
    handleSendMessage()
  }

  const buttonVariants = {
    closed: { scale: 1, rotate: 0 },
    open: { scale: 1.1, rotate: 180 }
  }

  const windowVariants = {
    closed: { 
      opacity: 0, 
      scale: 0.8, 
      y: 20,
      transition: { duration: 0.2 }
    },
    open: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 300 }
    }
  }

  return (
    <>
      {/* Chat Widget Button */}
      <motion.button
        onClick={isOpen ? handleClose : handleOpen}
        variants={buttonVariants}
        animate={isOpen ? "open" : "closed"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 premium-card overflow-hidden"
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
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <MessageCircle className="w-6 h-6" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={windowVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed bottom-24 right-6 z-50 w-80 h-96 premium-card bg-white/95 dark:bg-navy-800/95 backdrop-blur-glass flex flex-col overflow-hidden"
          >
            {/* Header */}
            <motion.div 
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 relative overflow-hidden"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {/* Header background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-700"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity 
                }}
                style={{ backgroundSize: '200% 200%' }}
              />
              
              <div className="relative z-10 flex items-center">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="mr-3"
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                <div>
                  <h3 className="font-bold">OS313 Guide</h3>
                  <p className="text-sm opacity-90">(coming soon)</p>
                </div>
              </div>
            </motion.div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-transparent to-primary-50/20 dark:to-primary-900/10">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`max-w-xs p-3 rounded-2xl shadow-sm ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                        : 'glass-panel dark:glass-panel-dark text-navy-900 dark:text-navy-50'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </motion.div>
                </motion.div>
              ))}

              {/* Quick Replies */}
              {messages.length === 1 && (
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-xs text-navy-500 dark:text-navy-400 font-medium">Quick options:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickReplies.map((reply, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleQuickReply(reply)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="p-3 text-sm glass-panel dark:glass-panel-dark hover:shadow-glow rounded-xl transition-all duration-300 text-center font-medium"
                      >
                        {reply}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <motion.div 
              className="p-4 border-t border-white/10 dark:border-white/5 glass-panel dark:glass-panel-dark"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex space-x-2">
                <motion.input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  whileFocus={{ 
                    boxShadow: '0 0 15px rgba(17, 185, 143, 0.3)',
                    borderColor: '#11B98F'
                  }}
                  className="flex-1 p-3 border border-navy-300 dark:border-navy-600 rounded-xl bg-white/80 dark:bg-navy-700/80 text-navy-900 dark:text-navy-50 text-sm focus:outline-none focus:border-primary-500 transition-all duration-300 backdrop-blur-sm"
                />
                <motion.button
                  onClick={handleSendMessage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl transition-all duration-300 shadow-glow"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot
