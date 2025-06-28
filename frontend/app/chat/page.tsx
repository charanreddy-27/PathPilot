"use client"

import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Send, Sparkles, Bot, Zap, User } from "lucide-react"
import { Button } from "@/components/ui/button"

// Types for our chat messages
type MessageRole = "user" | "bot"

interface Message {
  id: string
  content: string
  role: MessageRole
}

// Chat Message Component (inline for better performance)
function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`group flex mb-6 last:mb-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex max-w-[85%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        <div className={`flex-shrink-0 flex items-start mt-1 ${isUser ? "ml-3" : "mr-3"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
              isUser
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                : "bg-purple-600/20 text-purple-400 border border-purple-500/30"
            }`}
          >
            {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </div>
        </div>

        <div
          className={`p-3 rounded-2xl text-sm md:text-base ${
            isUser
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-gray-800/70 text-gray-100 rounded-bl-none border border-gray-700/50"
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
          
          {/* Message time - could be implemented with actual timestamps */}
          <div className={`text-xs mt-1 opacity-50 text-right ${isUser ? "text-blue-200" : "text-gray-400"}`}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Typing Indicator Component (inline for better performance)
function TypingIndicator() {
  return (
    <div className="flex mb-6 justify-start">
      <div className="flex max-w-[85%] flex-row">
        <div className="flex-shrink-0 flex items-start mt-1 mr-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-600/20 text-purple-400 border border-purple-500/30">
            <Bot className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-gray-800/70 border border-gray-700/50 text-gray-100 rounded-bl-none">
          <div className="flex items-center space-x-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-purple-400/80"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm your AI Career Counselor. How can I help with your career journey today?",
      role: "bot",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Pre-built prompts
  const prebuiltPrompts = [
    "Can you review my resume?",
    "How do I prepare for technical interviews?",
    "Tips for a career change to tech",
    "Trending tech skills in 2024",
  ]

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus on input when page loads
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Handler for clicking a pre-built prompt
  const handlePromptClick = (prompt: string) => {
    setInput(prompt)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Auto-resize textarea based on content
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    e.target.style.height = "auto"
    e.target.style.height = `${e.target.scrollHeight}px`
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
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "auto"
    }

    // Simulate API call to get bot response
    setTimeout(() => {
      const botResponses: { [key: string]: string } = {
        resume:
          "I'd be happy to help with your resume! To provide the best advice, could you tell me about your current experience, education, and the type of job you're targeting?",
        interview:
          "Preparing for technical interviews is crucial! What specific technologies or roles are you interviewing for? I can provide industry-specific tips and common questions you might encounter.",
        "career change":
          "Considering a career change to tech is an exciting move! What's your current field, and what area of tech are you interested in? I can help identify transferable skills and suggest learning paths.",
        "job search":
          "Looking for a new tech job can be challenging but rewarding. What specific roles are you targeting? I can provide strategies to optimize your job search and stand out to employers.",
      }

      // Check if any keywords match
      const keyword = Object.keys(botResponses).find((key) => input.toLowerCase().includes(key))

      const responseText = keyword
        ? botResponses[keyword]
        : "Thanks for sharing that. To provide personalized career guidance, could you tell me more about your current situation, skills, and career goals? The more specific you can be, the better advice I can offer."

      const botMessage: Message = {
        id: Date.now().toString(),
        content: responseText,
        role: "bot",
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  // Handle key press (Enter to send, Shift+Enter for new line)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container mx-auto px-4 py-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col h-[calc(100vh-6rem)] bg-gray-900/30 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-800/50 shadow-lg"
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-800/50 bg-gradient-to-r from-gray-900/80 to-gray-800/80">
            <div className="flex items-center">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600/20 border border-blue-500/30 mr-3">
                <Bot className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">Career Counselor</h1>
                <div className="flex items-center text-xs text-green-400">
                  <span className="h-2 w-2 rounded-full bg-green-400 mr-1.5"></span>
                  Online and ready to assist
                </div>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent p-4 bg-gradient-to-b from-transparent to-gray-900/20">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </AnimatePresence>

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Suggested Prompts */}
          <div className="px-4 py-3 bg-gray-900/50 border-t border-gray-800/50">
            <div className="flex items-center mb-2">
              <Sparkles className="h-4 w-4 text-blue-400 mr-2" />
              <span className="text-sm text-gray-400">Suggested questions</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {prebuiltPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptClick(prompt)}
                  disabled={isTyping}
                  className="px-3 py-1.5 text-sm bg-gray-800/70 hover:bg-gray-700/70 text-gray-300 rounded-lg border border-gray-700/50 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 bg-gray-900/70 border-t border-gray-800/50">
            <div className="flex items-end space-x-2 bg-gray-800/50 rounded-lg border border-gray-700/50 transition-all focus-within:border-blue-500/50 focus-within:shadow-[0_0_10px_rgba(59,130,246,0.2)]">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyPress}
                placeholder="Ask your career questions..."
                rows={1}
                disabled={isTyping}
                className="flex-grow resize-none max-h-[150px] overflow-auto scrollbar-thin scrollbar-thumb-gray-700 m-0 w-full bg-transparent px-4 py-3 text-gray-100 focus:outline-none"
                style={{ height: "auto" }}
              />
              <div className="pr-2 pb-2">
                <Button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  size="sm"
                  className="h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
              <span>Press Enter to send, Shift+Enter for new line</span>
              <div className="flex items-center">
                <Zap className="h-3 w-3 text-blue-400 mr-1" />
                <span>Powered by AI</span>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}