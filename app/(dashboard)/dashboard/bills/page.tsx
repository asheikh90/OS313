'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, Calendar, DollarSign, Trash2, Eye } from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-context'
import { billService, type Bill } from '@/data'
import { v4 as uuidv4 } from 'uuid'

export default function BillsPage() {
  const { user } = useAuth()
  const [bills, setBills] = useState<Bill[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (user) {
      setBills(billService.getByUser(user.id))
    }
  }, [user])

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || !user) return

    setIsUploading(true)
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        // Validate file type
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
        if (!allowedTypes.includes(file.type)) {
          alert(`File ${file.name} is not supported. Please upload PDF, JPG, or PNG files.`)
          continue
        }
        
        // Validate file size (25MB max)
        if (file.size > 25 * 1024 * 1024) {
          alert(`File ${file.name} is too large. Maximum size is 25MB.`)
          continue
        }
        
        // Generate unique filename
        const fileExtension = file.name.split('.').pop()
        const uniqueFilename = `${uuidv4()}.${fileExtension}`
        
        // In a real app, you'd upload to a server here
        // For demo, we'll just store the file info
        const bill = billService.create({
          userId: user.id,
          filename: uniqueFilename,
          originalName: file.name,
          fileSize: file.size,
          fileType: file.type
        })
        
        setBills(prev => [bill, ...prev])
      }
    } catch (error) {
      console.error('Error uploading files:', error)
      alert('Error uploading files. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (fileType: string) => {
    if (fileType === 'application/pdf') {
      return <FileText className="w-8 h-8 text-red-500" />
    } else if (fileType.startsWith('image/')) {
      return <FileText className="w-8 h-8 text-blue-500" />
    }
    return <FileText className="w-8 h-8 text-gray-500" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
          Bills & Documents
        </h1>
        <p className="text-navy-600 dark:text-navy-400">
          Upload and manage your bills to track expenses and find savings opportunities
        </p>
      </div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-card p-8"
      >
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
            dragActive
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-gray-300 dark:border-navy-600 hover:border-primary-400 dark:hover:border-primary-500'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-navy-400 dark:text-navy-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-navy-900 dark:text-navy-100 mb-2">
            Upload Your Bills
          </h3>
          <p className="text-navy-600 dark:text-navy-400 mb-4">
            Drag and drop files here, or click to browse
          </p>
          <p className="text-sm text-navy-500 dark:text-navy-500 mb-6">
            Supports PDF, JPG, PNG files up to 25MB
          </p>
          
          <motion.button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            whileHover={!isUploading ? { scale: 1.02 } : {}}
            whileTap={!isUploading ? { scale: 0.98 } : {}}
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
          >
            {isUploading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            ) : (
              <Upload className="w-5 h-5 mr-2" />
            )}
            {isUploading ? 'Uploading...' : 'Choose Files'}
          </motion.button>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
          />
        </div>
      </motion.div>

      {/* Bills List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="dashboard-card p-6"
      >
        <h2 className="text-lg font-semibold text-navy-900 dark:text-navy-100 mb-4">
          Uploaded Bills ({bills.length})
        </h2>
        
        {bills.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-navy-400 dark:text-navy-500 mx-auto mb-4" />
            <p className="text-navy-600 dark:text-navy-400">
              No bills uploaded yet. Upload your first bill to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bills.map((bill) => (
              <motion.div
                key={bill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                className="border border-gray-200 dark:border-navy-600 rounded-lg p-4 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getFileIcon(bill.fileType)}
                    <div>
                      <h3 className="font-medium text-navy-900 dark:text-navy-100">
                        {bill.originalName}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-navy-600 dark:text-navy-400">
                        <span>{formatFileSize(bill.fileSize)}</span>
                        <span>•</span>
                        <span>{new Date(bill.uploadedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {bill.category && (
                      <span className="px-2 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs rounded-full">
                        {bill.category}
                      </span>
                    )}
                    
                    {bill.amount && (
                      <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {bill.amount}
                      </div>
                    )}
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-navy-600 dark:text-navy-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-navy-700 rounded-lg transition-all duration-200"
                      title="View file"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-navy-600 dark:text-navy-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-navy-700 rounded-lg transition-all duration-200"
                      title="Delete file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Quick Stats */}
      {bills.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="dashboard-card p-6 text-center">
            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              {bills.length}
            </div>
            <div className="text-sm text-navy-600 dark:text-navy-400">
              Total Bills
            </div>
          </div>
          
          <div className="dashboard-card p-6 text-center">
            <Calendar className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              {bills.filter(b => new Date(b.uploadedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
            </div>
            <div className="text-sm text-navy-600 dark:text-navy-400">
              This Month
            </div>
          </div>
          
          <div className="dashboard-card p-6 text-center">
            <DollarSign className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              $0
            </div>
            <div className="text-sm text-navy-600 dark:text-navy-400">
              Potential Savings
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
