"use client"

import { motion } from "framer-motion"
import { User, Bot } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "bot"
}

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
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
