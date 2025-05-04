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
      className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        <div className={`flex-shrink-0 flex items-start ${isUser ? "ml-2" : "mr-2"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isUser
                ? "bg-blue-900/50 text-blue-400 border border-blue-700 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                : "bg-purple-900/50 text-purple-400 border border-purple-700 shadow-[0_0_10px_rgba(139,92,246,0.3)]"
            }`}
          >
            {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </div>
        </div>

        <div
          className={`p-3 rounded-lg ${
            isUser
              ? "bg-gradient-to-r from-blue-600/80 to-blue-700/80 text-white rounded-tr-none border border-blue-700/50"
              : "bg-gray-800/80 border border-gray-700 text-gray-200 rounded-tl-none"
          }`}
        >
          <p className={isUser ? "text-white" : "text-gray-200"}>{message.content}</p>
        </div>
      </div>
    </motion.div>
  )
}
