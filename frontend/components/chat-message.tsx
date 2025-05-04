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
              isUser ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-700"
            }`}
          >
            {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </div>
        </div>

        <div
          className={`p-3 rounded-lg ${
            isUser ? "bg-blue-600 text-white rounded-tr-none" : "bg-white border border-gray-200 rounded-tl-none"
          }`}
        >
          <p className={isUser ? "text-white" : "text-gray-800"}>{message.content}</p>
        </div>
      </div>
    </motion.div>
  )
}
