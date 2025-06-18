'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from '@/contexts/AuthContext'
import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'
import ChatMessage from "@/components/chat-message"
import TypingIndicator from "@/components/typing-indicator"

interface Message {
  id: string
  content: string
  role: 'user' | 'bot'
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      content: "Hi there! I\'m your AI Career Counsellor. How can I help with your career journey today?",
      role: "bot",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()
  const router = useRouter()

  // Pre-built prompts
  const prebuiltPrompts = [
    "Can you review my resume?",
    "How do I prepare for interviews?",
    "Tips for a career change",
    "How to start a job search?",
  ]

  // Handler for clicking a pre-built prompt (auto-submit)
  const handlePromptClick = (prompt: string) => {
    setInput(prompt)
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent
      handleSubmit(fakeEvent)
    }, 0)
  }

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    if (!user) {
      router.push('/login')
      return
    }

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content: input,
      role: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login')
          return
        }
        throw new Error('Failed to send message')
      }

      const data = await response.json()
      const botMessage: Message = {
        id: uuidv4(),
        content: data.response,
        role: "bot",
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = { id: uuidv4(), content: 'Sorry, I encountered an error. Please try again.', role: 'bot' }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  if (!user) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold mb-4">Please login to chat</h2>
        <Button onClick={() => router.push('/login')}>
          Login
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen pt-16 md:pt-20">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.2),transparent_40%)]"></div>
      </div>

      <div className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col h-[calc(100vh-12rem)] bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 shadow-[0_0_25px_rgba(59,130,246,0.15)]"
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
            <h1 className="text-xl font-semibold text-white">Career Counsellor Bot</h1>
            <p className="text-sm text-blue-300">Online and ready to help with your career questions</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow p-4 overflow-y-auto bg-gray-900/30 scrollbar-thin">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </AnimatePresence>

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Pre-built Prompts */}
          <div className="flex flex-wrap gap-2 px-4 pb-2 pt-2 bg-gray-900/70 border-t border-b border-gray-800">
            {prebuiltPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                className="px-3 py-1 rounded-full bg-blue-700/80 text-white text-sm hover:bg-blue-800 transition"
                onClick={() => handlePromptClick(prompt)}
                disabled={isTyping}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800 bg-gray-900/70 backdrop-blur-sm">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about career advice, resume tips, or interview preparation..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-[0_0_10px_rgba(79,70,229,0.3)] hover:shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all duration-300"
              >
                <Send className="w-5 h-5" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
} 