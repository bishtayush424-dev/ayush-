import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import {
  Send,
  Paperclip,
  Smile,
  Search,
  MoreVertical,
  Phone,
  Video,
  Info,
  Users,
  Clock
} from 'lucide-react'

const Chat = () => {
  const { user } = useAuth()
  const [activeChat, setActiveChat] = useState(null)
  const [message, setMessage] = useState('')
  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'CSE 3rd Year Group',
      type: 'group',
      lastMessage: 'Hey everyone! Anyone working on the DBMS project?',
      timestamp: '2:30 PM',
      unread: 3,
      isOnline: true,
      members: 45
    },
    {
      id: 2,
      name: 'Aarav Sharma',
      type: 'personal',
      lastMessage: 'Thanks for the help with the assignment!',
      timestamp: '1:15 PM',
      unread: 0,
      isOnline: true
    },
    {
      id: 3,
      name: 'Dr. Verma',
      type: 'personal',
      lastMessage: 'Please submit your project proposals by Friday',
      timestamp: '11:45 AM',
      unread: 1,
      isOnline: false
    },
    {
      id: 4,
      name: 'NITH Cultural Club',
      type: 'group',
      lastMessage: 'Meeting tomorrow at 4 PM in the auditorium',
      timestamp: 'Yesterday',
      unread: 0,
      isOnline: true,
      members: 234
    }
  ])

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Aarav Sharma',
      content: 'Hey! How are you doing?',
      timestamp: '2:25 PM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'You',
      content: "I'm good! Just working on the ML project. How about you?",
      timestamp: '2:26 PM',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Aarav Sharma',
      content: 'Same here. Stuck on the gradient descent implementation. Any tips?',
      timestamp: '2:28 PM',
      isOwn: false
    },
    {
      id: 4,
      sender: 'You',
      content: 'Sure! I can share my implementation. The key is to adjust the learning rate properly.',
      timestamp: '2:30 PM',
      isOwn: true
    }
  ])

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (message.trim() === '') return

    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    }

    setMessages([...messages, newMessage])
    setMessage('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Messages
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Connect and collaborate with your network
          </p>
        </motion.div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="flex h-[600px]">
            {/* Chat List */}
            <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
              {/* Search */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Chat List */}
              <div className="overflow-y-auto h-[536px]">
                {chats.map((chat) => (
                  <motion.div
                    key={chat.id}
                    whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                    className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors duration-200 ${
                      activeChat?.id === chat.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                    onClick={() => setActiveChat(chat)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {chat.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {chat.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                            {chat.name}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {chat.timestamp}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {chat.lastMessage}
                          </p>
                          {chat.unread > 0 && (
                            <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                        {chat.type === 'group' && (
                          <div className="flex items-center gap-1 mt-1">
                            <Users className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {chat.members} members
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {activeChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {activeChat.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {activeChat.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {activeChat.name}
                        </h3>
                        {activeChat.type === 'group' ? (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {activeChat.members} members • {activeChat.isOnline ? 'Online' : 'Offline'}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {activeChat.isOnline ? 'Online' : 'Last seen recently'}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                        <Phone className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                        <Video className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                        <Info className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md rounded-2xl p-4 ${
                            msg.isOwn
                              ? 'bg-blue-600 text-white rounded-br-none'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                          }`}
                        >
                          {!msg.isOwn && (
                            <p className="text-xs font-medium mb-1 opacity-80">
                              {msg.sender}
                            </p>
                          )}
                          <p className="text-sm">{msg.content}</p>
                          <p className={`text-xs mt-1 ${
                            msg.isOwn ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {msg.timestamp}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                        <Smile className="w-5 h-5" />
                      </button>
                      <div className="flex-1">
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type a message..."
                          rows="1"
                          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={sendMessage}
                        disabled={!message.trim()}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        <Send className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Select a chat to start messaging
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Choose from your existing conversations or start a new one
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat