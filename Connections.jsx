import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import {
  Search,
  Users,
  UserPlus,
  UserCheck,
  UserX,
  Star,
  MessageSquare,
  Filter,
  GraduationCap
} from 'lucide-react'

const Connections = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const connections = [
    {
      id: 1,
      name: 'Aarav Sharma',
      year: 3,
      branch: 'CSE',
      role: 'student',
      rating: 4.8,
      mutualConnections: 12,
      status: 'connected',
      avatar: '/api/placeholder/40/40',
      skills: ['React', 'Node.js', 'Python'],
      isOnline: true
    },
    {
      id: 2,
      name: 'Priya Patel',
      year: 4,
      branch: 'ECE',
      role: 'student',
      rating: 4.9,
      mutualConnections: 8,
      status: 'pending',
      avatar: '/api/placeholder/40/40',
      skills: ['ML', 'Python', 'Data Science'],
      isOnline: false
    },
    {
      id: 3,
      name: 'Rahul Kumar',
      year: 2,
      branch: 'ME',
      role: 'student',
      rating: 4.6,
      mutualConnections: 5,
      status: 'connected',
      avatar: '/api/placeholder/40/40',
      skills: ['CAD', 'SolidWorks', 'Thermodynamics'],
      isOnline: true
    },
    {
      id: 4,
      name: 'Dr. Sharma',
      role: 'teacher',
      department: 'Computer Science',
      rating: 4.9,
      mutualConnections: 3,
      status: 'connected',
      avatar: '/api/placeholder/40/40',
      skills: ['Algorithms', 'DBMS', 'OS'],
      isOnline: false
    }
  ]

  const filteredConnections = connections.filter(connection => {
    const matchesSearch = connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    
    if (activeTab === 'all') return matchesSearch
    if (activeTab === 'connected') return matchesSearch && connection.status === 'connected'
    if (activeTab === 'pending') return matchesSearch && connection.status === 'pending'
    if (activeTab === 'teachers') return matchesSearch && connection.role === 'teacher'
    
    return matchesSearch
  })

  const tabs = [
    { id: 'all', name: 'All Connections', count: connections.length },
    { id: 'connected', name: 'Connected', count: connections.filter(c => c.status === 'connected').length },
    { id: 'pending', name: 'Pending', count: connections.filter(c => c.status === 'pending').length },
    { id: 'teachers', name: 'Teachers', count: connections.filter(c => c.role === 'teacher').length },
  ]

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Connections
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Build your professional network at NIT Hamirpur
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-800 border-blue-500 shadow-lg'
                  : 'bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {tab.name}
              </span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-400">
                {tab.count}
              </span>
            </motion.button>
          ))}
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
              placeholder="Search connections by name or skills..."
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

        {/* Connections Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredConnections.map((connection, index) => (
            <motion.div
              key={connection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {connection.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {connection.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {connection.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {connection.role === 'teacher' ? (
                        <>
                          <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {connection.department}
                          </span>
                        </>
                      ) : (
                        <>
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Year {connection.year} • {connection.branch}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">
                    {connection.rating}
                  </span>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 mb-4">
                {connection.skills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {connection.skills.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                    +{connection.skills.length - 3}
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>{connection.mutualConnections} mutual connections</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {connection.status === 'connected' ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      <UserCheck className="w-4 h-4" />
                    </motion.button>
                  </>
                ) : connection.status === 'pending' ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                      Accept
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                      Decline
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <UserPlus className="w-4 h-4" />
                    Connect
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredConnections.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No connections found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or explore suggested connections
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Connections