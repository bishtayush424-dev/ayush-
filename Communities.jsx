import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import {
  Search,
  Users,
  Lock,
  Globe,
  Plus,
  Filter,
  BookOpen,
  Music,
  Info,
  Star,
  MessageSquare
} from 'lucide-react'

const Communities = () => {
  const { user } = useAuth()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const categories = [
    { id: 'all', name: 'All Communities', icon: Globe, color: 'gray' },
    { id: 'academics', name: 'Academics', icon: BookOpen, color: 'blue' },
    { id: 'non_academics', name: 'Non-Academics', icon: Music, color: 'green' },
    { id: 'college_info', name: 'College Info', icon: Info, color: 'purple' },
  ]

  const communities = [
    {
      id: 1,
      name: 'CSE 3rd Year - 2024 Batch',
      description: 'Official group for Computer Science 3rd Year students',
      category: 'academics',
      subCategory: 'third_year',
      members: 85,
      access: 'public',
      isJoined: true,
      isOfficial: true,
      rating: 4.8
    },
    {
      id: 2,
      name: 'NITH Cultural Club',
      description: 'For all cultural activities and events',
      category: 'non_academics',
      subCategory: 'cultural',
      members: 234,
      access: 'public',
      isJoined: false,
      isOfficial: true,
      rating: 4.9
    },
    {
      id: 3,
      name: 'Hostel 2 Discussions',
      description: 'All discussions related to Hostel 2',
      category: 'college_info',
      subCategory: 'hostel_info',
      members: 156,
      access: 'private',
      isJoined: true,
      isOfficial: false,
      rating: 4.5
    },
    {
      id: 4,
      name: 'ECE 2nd Year Projects',
      description: 'Share and collaborate on ECE projects',
      category: 'academics',
      subCategory: 'projects',
      members: 67,
      access: 'private',
      isJoined: false,
      isOfficial: false,
      rating: 4.7
    },
    {
      id: 5,
      name: 'NITH Sports Community',
      description: 'Sports activities and tournaments',
      category: 'non_academics',
      subCategory: 'sports',
      members: 189,
      access: 'public',
      isJoined: false,
      isOfficial: true,
      rating: 4.6
    },
    {
      id: 6,
      name: 'College Announcements',
      description: 'Official college announcements and notices',
      category: 'college_info',
      subCategory: 'announcements',
      members: 1200,
      access: 'public',
      isJoined: true,
      isOfficial: true,
      rating: 4.9
    }
  ]

  const filteredCommunities = communities.filter(community => {
    const matchesCategory = activeCategory === 'all' || community.category === activeCategory
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getAccessIcon = (access) => {
    return access === 'public' ? Globe : Lock
  }

  const getAccessColor = (access) => {
    return access === 'public' ? 'text-green-600' : 'text-orange-600'
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Communities
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Connect with students, share knowledge, and collaborate
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCreateModal(true)}
              className="mt-4 sm:mt-0 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Create Community
            </motion.button>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-white dark:bg-gray-800 border-blue-500 shadow-lg'
                    : 'bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Icon className={`w-5 h-5 text-${category.color}-600 dark:text-${category.color}-400`} />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {category.name}
                </span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search communities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
          >
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Filters</span>
          </motion.button>
        </motion.div>

        {/* Communities Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredCommunities.map((community, index) => {
              const AccessIcon = getAccessIcon(community.access)
              return (
                <motion.div
                  key={community.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                          {community.name}
                        </h3>
                        {community.isOfficial && (
                          <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                              Official
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {community.description}
                      </p>
                    </div>
                    <AccessIcon className={`w-5 h-5 ${getAccessColor(community.access)}`} />
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{community.members} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{community.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                        community.isJoined
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {community.isJoined ? 'Joined' : 'Join Community'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredCommunities.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No communities found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </div>

      {/* Create Community Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <CreateCommunityModal onClose={() => setShowCreateModal(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

const CreateCommunityModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'academics',
    subCategory: '',
    accessType: 'public'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle community creation
    console.log('Creating community:', formData)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Create Community
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Community Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700"
              placeholder="Enter community name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700"
              placeholder="Describe your community"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700"
              >
                <option value="academics">Academics</option>
                <option value="non_academics">Non-Academics</option>
                <option value="college_info">College Info</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Access
              </label>
              <select
                value={formData.accessType}
                onChange={(e) => setFormData({...formData, accessType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="restricted">Restricted</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Create
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default Communities