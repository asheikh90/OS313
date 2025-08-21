// AI adapter - switches between OpenAI and local fallback

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatResponse {
  content: string
  model: 'OpenAI' | 'Local'
}

// Local fallback AI - simple rules engine
const localAI = {
  async chat(messages: ChatMessage[]): Promise<ChatResponse> {
    const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || ''
    
    let response = ''
    
    // Simple pattern matching
    if (lastMessage.includes('save') || lastMessage.includes('bill') || lastMessage.includes('money')) {
      response = "Great question about savings! Upload your bills to track expenses and find group discounts. Check the Bills section to get started."
    } else if (lastMessage.includes('community') || lastMessage.includes('friend') || lastMessage.includes('network')) {
      response = "Communities are where the magic happens. Browse active groups in your area and join conversations that matter to you."
    } else if (lastMessage.includes('marriage') || lastMessage.includes('partner') || lastMessage.includes('relationship')) {
      response = "Enable matrimonial preferences in your profile to connect with compatible matches. Privacy and respect are our priorities."
    } else if (lastMessage.includes('business') || lastMessage.includes('entrepreneur') || lastMessage.includes('startup')) {
      response = "The Builder path is perfect for entrepreneurs. Join business communities and connect with mentors and potential partners."
    } else if (lastMessage.includes('help') || lastMessage.includes('how') || lastMessage.includes('what')) {
      response = "I'm here to help you navigate OS313. Try asking about savings, communities, matrimonial features, or business networking."
    } else {
      response = "I understand you're exploring OS313. What specific area interests you most: saving money, building community, or growing your business?"
    }
    
    return {
      content: response,
      model: 'Local'
    }
  }
}

// OpenAI integration
const openAI = {
  async chat(messages: ChatMessage[]): Promise<ChatResponse> {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
    
    if (!apiKey) {
      throw new Error('OpenAI API key not found')
    }
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant for OS313, a platform that helps people save money, build communities, find partners, and grow businesses. Be concise, helpful, and encouraging. Keep responses under 100 words.'
            },
            ...messages
          ],
          max_tokens: 150,
          temperature: 0.7
        })
      })
      
      if (!response.ok) {
        throw new Error('OpenAI API request failed')
      }
      
      const data = await response.json()
      
      return {
        content: data.choices[0]?.message?.content || 'Sorry, I had trouble processing that.',
        model: 'OpenAI'
      }
    } catch (error) {
      console.error('OpenAI error:', error)
      // Fallback to local AI
      return localAI.chat(messages)
    }
  }
}

// Main AI service
export const aiService = {
  async chat(messages: ChatMessage[]): Promise<ChatResponse> {
    const hasOpenAIKey = typeof window !== 'undefined' && 
      process.env.NEXT_PUBLIC_OPENAI_API_KEY
    
    if (hasOpenAIKey) {
      try {
        return await openAI.chat(messages)
      } catch (error) {
        console.warn('OpenAI failed, falling back to local AI:', error)
        return localAI.chat(messages)
      }
    } else {
      return localAI.chat(messages)
    }
  }
}
