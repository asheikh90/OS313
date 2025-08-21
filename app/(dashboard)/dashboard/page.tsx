'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, DollarSign, TrendingUp, MessageCircle } from 'lucide-react'

const stats = [
  {
    name: 'Communities Joined',
    value: '3',
    change: '+2 this month',
    icon: Users,
    color: 'text-blue-600 dark:text-blue-400'
  },
  {
    name: 'Monthly Savings',
    value: '$127',
    change: '+$23 vs last month',
    icon: DollarSign,
    color: 'text-green-600 dark:text-green-400'
  },
  {
    name: 'Profile Views',
    value: '12',
    change: '+4 this week',
    icon: TrendingUp,
    color: 'text-purple-600 dark:text-purple-400'
  },
  {
    name: 'Messages',
    value: '8',
    change: '3 unread',
    icon: MessageCircle,
    color: 'text-pink-600 dark:text-pink-400'
  }
]

const recentActivity = [
  {
    id: 1,
    type: 'community',
    message: 'You joined the "Tech Entrepreneurs" community',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'savings',
    message: 'New bill uploaded: Internet Service',
    time: '1 day ago'
  },
  {
    id: 3,
    type: 'profile',
    message: 'Your profile was viewed by 3 people',
    time: '2 days ago'
  }
]

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
          Dashboard Overview
        </h1>
        <p className="text-navy-600 dark:text-navy-400">
          Welcome back! Here's what's happening with your OS313 journey.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="dashboard-card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-navy-600 dark:text-navy-400">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-navy-900 dark:text-navy-100">
                  {stat.value}
                </p>
                <p className="text-xs text-navy-500 dark:text-navy-500 mt-1">
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-gray-50 dark:bg-navy-700 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="dashboard-card p-6"
      >
        <h2 className="text-lg font-semibold text-navy-900 dark:text-navy-100 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-navy-900 dark:text-navy-100">
                  {activity.message}
                </p>
                <p className="text-xs text-navy-500 dark:text-navy-500 mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="dashboard-card p-6"
      >
        <h2 className="text-lg font-semibold text-navy-900 dark:text-navy-100 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 text-left border border-gray-200 dark:border-navy-600 rounded-xl hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200"
          >
            <h3 className="font-medium text-navy-900 dark:text-navy-100">
              Update Profile
            </h3>
            <p className="text-sm text-navy-600 dark:text-navy-400 mt-1">
              Keep your information current
            </p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 text-left border border-gray-200 dark:border-navy-600 rounded-xl hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200"
          >
            <h3 className="font-medium text-navy-900 dark:text-navy-100">
              Upload Bills
            </h3>
            <p className="text-sm text-navy-600 dark:text-navy-400 mt-1">
              Track your expenses
            </p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 text-left border border-gray-200 dark:border-navy-600 rounded-xl hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200"
          >
            <h3 className="font-medium text-navy-900 dark:text-navy-100">
              Browse Communities
            </h3>
            <p className="text-sm text-navy-600 dark:text-navy-400 mt-1">
              Find your tribe
            </p>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
