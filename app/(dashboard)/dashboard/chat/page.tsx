'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot, User, Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-context'
import { chatService, type ChatMessage } from '@/data'
import { aiService } from '@/lib/ai'

export default function ChatPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [aiModel, setAiModel] = useState<'OpenAI' | 'Local'>('Local')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (user) {
      const history = chatService.getHistory(user.id)
      setMessages(history)
      
      // Add welcome message if no history
      if (history.length === 0) {
        const welcomeMessage = chatService.addMessage(user.id, {
          userId: user.id,
          content: "Hi! I'm your OS313 assistant. I can help you with savings, communities, matrimonial features, and business networking. What would you like to know?",
          isUser: false
        })
        setMessages([welcomeMessage])
      }
    }
  }, [user])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !user || isLoading) return

    const userMessage = chatService.addMessage(user.id, {
      userId: user.id,
      content: inputMessage,
      isUser: true
    })

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Convert to AI format
      const aiMessages = messages.concat(userMessage).map(msg => ({
        role: msg.isUser ? 'user' as const : 'assistant' as const,
        content: msg.content
      }))

      const response = await aiService.chat(aiMessages)
      setAiModel(response.model)

      const assistantMessage = chatService.addMessage(user.id, {
        userId: user.id,
        content: response.content,
        isUser: false
      })

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error getting AI response:', error)
      const errorMessage = chatService.addMessage(user.id, {
        userId: user.id,
        content: "Sorry, I'm having trouble responding right now. Please try again.",
        isUser: false
      })
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
            AI Assistant
          </h1>
          <p className="text-navy-600 dark:text-navy-400">
            Get help with OS313 features and find what you need
          </p>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-navy-600 dark:text-navy-400">Model:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            aiModel === 'OpenAI' 
              ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
              : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
          }`}>
            {aiModel}
          </span>
        </div>
      </div>

      {/* Chat Messages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 dashboard-card p-6 overflow-hidden flex flex-col"
      >
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-3xl ${
                message.isUser ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.isUser 
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-navy-700 text-navy-600 dark:text-navy-300'
                }`}>
                  {message.isUser ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                
                <div className={`px-4 py-3 rounded-2xl ${
                  message.isUser
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-navy-700 text-navy-900 dark:text-navy-100'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <div className={`text-xs mt-2 opacity-70 ${
                    message.isUser ? 'text-primary-100' : 'text-navy-500 dark:text-navy-400'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-navy-700 text-navy-600 dark:text-navy-300 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-gray-100 dark:bg-navy-700 px-4 py-3 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-navy-400 dark:bg-navy-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-navy-400 dark:bg-navy-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-navy-400 dark:bg-navy-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-navy-500 dark:text-navy-400">Thinking...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-navy-600 pt-4 mt-4">
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about OS313..."
                rows={1}
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-navy-600 rounded-xl bg-white dark:bg-navy-700 text-navy-900 dark:text-navy-100 placeholder-navy-500 dark:placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
              <div className="absolute right-3 top-3 text-navy-400 dark:text-navy-500">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            
            <motion.button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              whileHover={!isLoading ? { scale: 1.05 } : {}}
              whileTap={!isLoading ? { scale: 0.95 } : {}}
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white p-3 rounded-xl transition-all duration-200 shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>
          </div>
          
          <div className="flex items-center justify-between mt-2 text-xs text-navy-500 dark:text-navy-400">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>Powered by {aiModel === 'OpenAI' ? 'OpenAI GPT' : 'Local AI'}</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
