'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Plus, MessageSquare, UserPlus, UserMinus } from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-context'
import { communityService, postService, type Community, type Post } from '@/data'

export default function CommunitiesPage() {
  const { user } = useAuth()
  const [communities, setCommunities] = useState<Community[]>([])
  const [myFeed, setMyFeed] = useState<Post[]>([])
  const [newPost, setNewPost] = useState('')
  const [selectedCommunity, setSelectedCommunity] = useState<string>('')
  const [isPosting, setIsPosting] = useState(false)

  useEffect(() => {
    setCommunities(communityService.getAll())
    if (user) {
      setMyFeed(postService.getMyFeed(user.id))
    }
  }, [user])

  const handleJoinLeave = (communityId: string, isJoined: boolean) => {
    if (isJoined) {
      communityService.leave(communityId)
    } else {
      communityService.join(communityId)
    }
    setCommunities(communityService.getAll())
    if (user) {
      setMyFeed(postService.getMyFeed(user.id))
    }
  }

  const handlePost = async () => {
    if (!newPost.trim() || !selectedCommunity || !user) return
    
    setIsPosting(true)
    try {
      const post = postService.create({
        communityId: selectedCommunity,
        authorId: user.id,
        authorName: user.email.split('@')[0],
        content: newPost
      })
      
      setMyFeed(postService.getMyFeed(user.id))
      setNewPost('')
      setSelectedCommunity('')
    } catch (error) {
      console.error('Error posting:', error)
    } finally {
      setIsPosting(false)
    }
  }

  const joinedCommunities = communities.filter(c => c.isJoined)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
          Communities
        </h1>
        <p className="text-navy-600 dark:text-navy-400">
          Connect with like-minded people and build meaningful relationships
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Communities List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-4"
        >
          <h2 className="text-lg font-semibold text-navy-900 dark:text-navy-100">
            Browse Communities
          </h2>
          
          {communities.map((community) => (
            <motion.div
              key={community.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              className="dashboard-card p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <h3 className="text-lg font-semibold text-navy-900 dark:text-navy-100">
                      {community.name}
                    </h3>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-navy-300 text-xs rounded-full">
                      {community.category}
                    </span>
                  </div>
                  
                  <p className="text-navy-600 dark:text-navy-400 mb-3">
                    {community.description}
                  </p>
                  
                  <div className="text-sm text-navy-500 dark:text-navy-500">
                    {community.memberCount} members
                  </div>
                </div>
                
                <motion.button
                  onClick={() => handleJoinLeave(community.id, community.isJoined)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    community.isJoined
                      ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30'
                      : 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/30'
                  }`}
                >
                  {community.isJoined ? (
                    <>
                      <UserMinus className="w-4 h-4 mr-2" />
                      Leave
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Join
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* My Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-semibold text-navy-900 dark:text-navy-100">
            My Feed
          </h2>
          
          {/* Post Creation */}
          {joinedCommunities.length > 0 && (
            <div className="dashboard-card p-4">
              <div className="space-y-3">
                <select
                  value={selectedCommunity}
                  onChange={(e) => setSelectedCommunity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-700 text-navy-900 dark:text-navy-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                >
                  <option value="">Select community...</option>
                  {joinedCommunities.map((community) => (
                    <option key={community.id} value={community.id}>
                      {community.name}
                    </option>
                  ))}
                </select>
                
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share something with your community..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-700 text-navy-900 dark:text-navy-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
                
                <motion.button
                  onClick={handlePost}
                  disabled={!newPost.trim() || !selectedCommunity || isPosting}
                  whileHover={!isPosting ? { scale: 1.02 } : {}}
                  whileTap={!isPosting ? { scale: 0.98 } : {}}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 shadow-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm"
                >
                  {isPosting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  {isPosting ? 'Posting...' : 'Post'}
                </motion.button>
              </div>
            </div>
          )}
          
          {/* Feed Posts */}
          <div className="space-y-3">
            {myFeed.length === 0 ? (
              <div className="dashboard-card p-6 text-center">
                <MessageSquare className="w-12 h-12 text-navy-400 dark:text-navy-500 mx-auto mb-3" />
                <p className="text-navy-600 dark:text-navy-400">
                  {joinedCommunities.length === 0 
                    ? 'Join communities to see posts in your feed'
                    : 'No posts yet. Be the first to share something!'
                  }
                </p>
              </div>
            ) : (
              myFeed.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="dashboard-card p-4"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {post.authorName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-navy-900 dark:text-navy-100 text-sm">
                          {post.authorName}
                        </span>
                        <span className="text-xs text-navy-500 dark:text-navy-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-navy-700 dark:text-navy-300 text-sm">
                        {post.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
