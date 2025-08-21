// Local-first data layer - easily replaceable with real DB later

export interface User {
  id: string
  email: string
  createdAt: string
}

export interface Profile {
  id: string
  userId: string
  name: string
  age?: number
  location?: string
  bio?: string
  networkingEnabled: boolean
  matrimonialEnabled: boolean
  matrimonialPreferences?: {
    ageRange: [number, number]
    location?: string
    education?: string
    profession?: string
  }
  createdAt: string
  updatedAt: string
}

export interface Community {
  id: string
  name: string
  description: string
  memberCount: number
  category: string
  isJoined: boolean
  createdAt: string
}

export interface Post {
  id: string
  communityId: string
  authorId: string
  authorName: string
  content: string
  createdAt: string
}

export interface Bill {
  id: string
  userId: string
  filename: string
  originalName: string
  fileSize: number
  fileType: string
  category?: string
  amount?: number
  dueDate?: string
  uploadedAt: string
}

export interface ChatMessage {
  id: string
  userId: string
  content: string
  isUser: boolean
  timestamp: string
}

// Local storage keys
const STORAGE_KEYS = {
  PROFILE: 'os313-profile',
  COMMUNITIES: 'os313-communities',
  POSTS: 'os313-posts',
  BILLS: 'os313-bills',
  CHAT_HISTORY: 'os313-chat-history'
}

// Profile operations
export const profileService = {
  get: (userId: string): Profile | null => {
    const profiles = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE) || '{}')
    return profiles[userId] || null
  },

  save: (profile: Profile): void => {
    const profiles = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE) || '{}')
    profiles[profile.userId] = profile
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profiles))
  },

  create: (userId: string, data: Partial<Profile>): Profile => {
    const profile: Profile = {
      id: `profile_${Date.now()}`,
      userId,
      name: '',
      networkingEnabled: false,
      matrimonialEnabled: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data
    }
    profileService.save(profile)
    return profile
  }
}

// Community operations
export const communityService = {
  getAll: (): Community[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.COMMUNITIES)
    if (stored) {
      return JSON.parse(stored)
    }
    
    // Seed data
    const seedCommunities: Community[] = [
      {
        id: 'comm_1',
        name: 'Tech Entrepreneurs',
        description: 'Building the future of technology',
        memberCount: 247,
        category: 'Business',
        isJoined: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 'comm_2',
        name: 'Young Professionals',
        description: 'Networking for career growth',
        memberCount: 189,
        category: 'Professional',
        isJoined: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'comm_3',
        name: 'Marriage & Family',
        description: 'Building strong relationships',
        memberCount: 156,
        category: 'Personal',
        isJoined: false,
        createdAt: new Date().toISOString()
      }
    ]
    
    localStorage.setItem(STORAGE_KEYS.COMMUNITIES, JSON.stringify(seedCommunities))
    return seedCommunities
  },

  join: (communityId: string): void => {
    const communities = communityService.getAll()
    const updated = communities.map(c => 
      c.id === communityId ? { ...c, isJoined: true, memberCount: c.memberCount + 1 } : c
    )
    localStorage.setItem(STORAGE_KEYS.COMMUNITIES, JSON.stringify(updated))
  },

  leave: (communityId: string): void => {
    const communities = communityService.getAll()
    const updated = communities.map(c => 
      c.id === communityId ? { ...c, isJoined: false, memberCount: Math.max(0, c.memberCount - 1) } : c
    )
    localStorage.setItem(STORAGE_KEYS.COMMUNITIES, JSON.stringify(updated))
  }
}

// Post operations
export const postService = {
  getByCommunity: (communityId: string): Post[] => {
    const posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS) || '[]')
    return posts.filter((p: Post) => p.communityId === communityId)
  },

  getMyFeed: (userId: string): Post[] => {
    const communities = communityService.getAll().filter(c => c.isJoined)
    const posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS) || '[]')
    const communityIds = communities.map(c => c.id)
    return posts.filter((p: Post) => communityIds.includes(p.communityId))
  },

  create: (post: Omit<Post, 'id' | 'createdAt'>): Post => {
    const newPost: Post = {
      ...post,
      id: `post_${Date.now()}`,
      createdAt: new Date().toISOString()
    }
    
    const posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS) || '[]')
    posts.unshift(newPost)
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
    
    return newPost
  }
}

// Bill operations
export const billService = {
  getByUser: (userId: string): Bill[] => {
    const bills = JSON.parse(localStorage.getItem(STORAGE_KEYS.BILLS) || '[]')
    return bills.filter((b: Bill) => b.userId === userId)
  },

  create: (bill: Omit<Bill, 'id' | 'uploadedAt'>): Bill => {
    const newBill: Bill = {
      ...bill,
      id: `bill_${Date.now()}`,
      uploadedAt: new Date().toISOString()
    }
    
    const bills = JSON.parse(localStorage.getItem(STORAGE_KEYS.BILLS) || '[]')
    bills.unshift(newBill)
    localStorage.setItem(STORAGE_KEYS.BILLS, JSON.stringify(bills))
    
    return newBill
  }
}

// Chat operations
export const chatService = {
  getHistory: (userId: string): ChatMessage[] => {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY) || '{}')
    return history[userId] || []
  },

  addMessage: (userId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>): ChatMessage => {
    const newMessage: ChatMessage = {
      ...message,
      id: `msg_${Date.now()}`,
      timestamp: new Date().toISOString()
    }
    
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY) || '{}')
    if (!history[userId]) {
      history[userId] = []
    }
    
    history[userId].push(newMessage)
    localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(history))
    
    return newMessage
  }
}
