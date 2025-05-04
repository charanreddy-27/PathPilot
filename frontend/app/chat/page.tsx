"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import ChatMessage from "@/components/chat-message"
import TypingIndicator from "@/components/typing-indicator"

// Types for our chat messages
type MessageRole = "user" | "bot"

interface Message {
  id: string
  content: string
  role: MessageRole
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm your AI Career Counsellor. How can I help with your career journey today?",
      role: "bot",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate API call to get bot response
    setTimeout(() => {
      const botResponses: { [key: string]: string } = {
        resume:
          "I'd be happy to help with your resume! To provide the best advice, could you tell me about your current experience, education, and the type of job you're targeting?",
        interview:
          "Preparing for interviews is crucial! What type of role are you interviewing for? I can provide industry-specific tips and common questions you might encounter.",
        "career change":
          "Considering a career change is a significant step! What's your current field, and what area are you interested in transitioning to? I can help identify transferable skills and suggest learning paths.",
        "job search":
          "Looking for a new job can be challenging. What industry and role are you targeting? I can provide strategies to optimize your job search and stand out to employers.",
      }

      // Check if any keywords match
      const keyword = Object.keys(botResponses).find((key) => input.toLowerCase().includes(key))

      const responseText = keyword
        ? botResponses[keyword]
        : "Thanks for sharing that. To provide personalized career guidance, could you tell me more about your current situation, skills, and career goals?"

      const botMessage: Message = {
        id: Date.now().toString(),
        content: responseText,
        role: "bot",
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen pt-16 md:pt-20">
      <div className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <h1 className="text-xl font-semibold">Career Counsellor Bot</h1>
            <p className="text-sm text-blue-100">Online and ready to help with your career questions</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </AnimatePresence>

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about career advice, resume tips, or interview preparation..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Button type="submit" disabled={!input.trim() || isTyping} className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-5 h-5" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
