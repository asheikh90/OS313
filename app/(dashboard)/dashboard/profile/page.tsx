'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Heart, Users, MapPin, Briefcase } from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-context'
import { profileService, type Profile } from '@/data'

export default function ProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [potentialMatches, setPotentialMatches] = useState<any[]>([])

  useEffect(() => {
    if (user) {
      let userProfile = profileService.get(user.id)
      if (!userProfile) {
        userProfile = profileService.create(user.id, {
          name: user.email.split('@')[0]
        })
      }
      setProfile(userProfile)
      setIsLoading(false)
      
      // Generate potential matches if matrimonial is enabled
      if (userProfile.matrimonialEnabled) {
        generateMatches(userProfile)
      }
    }
  }, [user])

  const generateMatches = (userProfile: Profile) => {
    // Simple scoring algorithm for demo
    const demoMatches = [
      {
        id: 'match_1',
        name: 'Sarah A.',
        age: 28,
        location: 'New York',
        profession: 'Software Engineer',
        score: 92,
        commonInterests: ['Technology', 'Travel', 'Reading']
      },
      {
        id: 'match_2',
        name: 'Ahmed K.',
        age: 31,
        location: 'California',
        profession: 'Product Manager',
        score: 87,
        commonInterests: ['Business', 'Fitness', 'Cooking']
      },
      {
        id: 'match_3',
        name: 'Fatima M.',
        age: 26,
        location: 'Texas',
        profession: 'Marketing Specialist',
        score: 84,
        commonInterests: ['Art', 'Community Service', 'Music']
      }
    ]
    
    setPotentialMatches(demoMatches)
  }

  const handleSave = async () => {
    if (!profile || !user) return
    
    setIsSaving(true)
    try {
      const updatedProfile = {
        ...profile,
        updatedAt: new Date().toISOString()
      }
      profileService.save(updatedProfile)
      setProfile(updatedProfile)
      
      // Regenerate matches if matrimonial was just enabled
      if (updatedProfile.matrimonialEnabled) {
        generateMatches(updatedProfile)
      } else {
        setPotentialMatches([])
      }
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const updateProfile = (updates: Partial<Profile>) => {
    if (profile) {
      setProfile({ ...profile, ...updates })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
          Profile Settings
        </h1>
        <p className="text-navy-600 dark:text-navy-400">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 dashboard-card p-6"
        >
          <h2 className="text-lg font-semibold text-navy-900 dark:text-navy-100 mb-4">
            Basic Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => updateProfile({ name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-700 text-navy-900 dark:text-navy-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={profile.age || ''}
                  onChange={(e) => updateProfile({ age: parseInt(e.target.value) || undefined })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-700 text-navy-900 dark:text-navy-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={profile.location || ''}
                  onChange={(e) => updateProfile({ location: e.target.value })}
                  placeholder="City, State"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-700 text-navy-900 dark:text-navy-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">
                Bio
              </label>
              <textarea
                value={profile.bio || ''}
                onChange={(e) => updateProfile({ bio: e.target.value })}
                rows={3}
                placeholder="Tell us about yourself..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-700 text-navy-900 dark:text-navy-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>

        {/* Feature Toggles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="dashboard-card p-6"
        >
          <h2 className="text-lg font-semibold text-navy-900 dark:text-navy-100 mb-4">
            Features
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="font-medium text-navy-900 dark:text-navy-100">
                    Networking
                  </div>
                  <div className="text-sm text-navy-600 dark:text-navy-400">
                    Professional connections
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.networkingEnabled}
                  onChange={(e) => updateProfile({ networkingEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                <div>
                  <div className="font-medium text-navy-900 dark:text-navy-100">
                    Matrimonial
                  </div>
                  <div className="text-sm text-navy-600 dark:text-navy-400">
                    Find your life partner
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.matrimonialEnabled}
                  onChange={(e) => updateProfile({ matrimonialEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Matrimonial Preferences */}
      {profile.matrimonialEnabled && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="dashboard-card p-6"
        >
          <h2 className="text-lg font-semibold text-navy-900 dark:text-navy-100 mb-4">
            Matrimonial Preferences
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">
                Age Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={profile.matrimonialPreferences?.ageRange?.[0] || 25}
                  onChange={(e) => updateProfile({
                    matrimonialPreferences: {
                      ...profile.matrimonialPreferences,
                      ageRange: [parseInt(e.target.value), profile.matrimonialPreferences?.ageRange?.[1] || 35]
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-700 text-navy-900 dark:text-navy-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <span className="flex items-center text-navy-600 dark:text-navy-400">to</span>
                <input
                  type="number"
                  value={profile.matrimonialPreferences?.ageRange?.[1] || 35}
                  onChange={(e) => updateProfile({
                    matrimonialPreferences: {
                      ...profile.matrimonialPreferences,
                      ageRange: [profile.matrimonialPreferences?.ageRange?.[0] || 25, parseInt(e.target.value)]
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-700 text-navy-900 dark:text-navy-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">
                Preferred Location
              </label>
              <input
                type="text"
                value={profile.matrimonialPreferences?.location || ''}
                onChange={(e) => updateProfile({
                  matrimonialPreferences: {
                    ...profile.matrimonialPreferences,
                    location: e.target.value
                  }
                })}
                placeholder="Any location"
                className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-700 text-navy-900 dark:text-navy-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">
                Education
              </label>
              <select
                value={profile.matrimonialPreferences?.education || ''}
                onChange={(e) => updateProfile({
                  matrimonialPreferences: {
                    ...profile.matrimonialPreferences,
                    education: e.target.value
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-700 text-navy-900 dark:text-navy-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Any</option>
                <option value="high-school">High School</option>
                <option value="bachelors">Bachelor's</option>
                <option value="masters">Master's</option>
                <option value="phd">PhD</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">
                Profession
              </label>
              <input
                type="text"
                value={profile.matrimonialPreferences?.profession || ''}
                onChange={(e) => updateProfile({
                  matrimonialPreferences: {
                    ...profile.matrimonialPreferences,
                    profession: e.target.value
                  }
                })}
                placeholder="Any profession"
                className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-700 text-navy-900 dark:text-navy-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Potential Matches */}
      {profile.matrimonialEnabled && potentialMatches.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="dashboard-card p-6"
        >
          <h2 className="text-lg font-semibold text-navy-900 dark:text-navy-100 mb-4">
            Potential Matches
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {potentialMatches.map((match) => (
              <div key={match.id} className="border border-gray-200 dark:border-navy-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-navy-900 dark:text-navy-100">
                    {match.name}
                  </h3>
                  <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                    {match.score}% match
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-navy-600 dark:text-navy-400">
                  <div className="flex items-center space-x-2">
                    <span>Age: {match.age}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{match.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4" />
                    <span>{match.profession}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="text-xs text-navy-500 dark:text-navy-500 mb-1">
                    Common interests:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {match.commonInterests.map((interest: string) => (
                      <span
                        key={interest}
                        className="px-2 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-sm text-navy-500 dark:text-navy-500 text-center">
            This is a preview. Full matching features coming soon.
          </div>
        </motion.div>
      )}

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-end"
      >
        <motion.button
          onClick={handleSave}
          disabled={isSaving}
          whileHover={!isSaving ? { scale: 1.02 } : {}}
          whileTap={!isSaving ? { scale: 0.98 } : {}}
          className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {isSaving ? 'Saving...' : 'Save Profile'}
        </motion.button>
      </motion.div>
    </div>
  )
}
