"use client"

import { motion } from "framer-motion"
import { Bot } from "lucide-react"

export default function TypingIndicator() {
  return (
    <div className="flex mb-4 justify-start">
      <div className="flex max-w-[80%] flex-row">
        <div className="flex-shrink-0 flex items-start mr-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-900/50 text-purple-400 border border-purple-700 shadow-[0_0_10px_rgba(139,92,246,0.3)]">
            <Bot className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3 rounded-lg bg-gray-800/80 border border-gray-700 text-gray-200 rounded-tl-none">
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-purple-400"
                animate={{
                  y: ["0%", "-50%", "0%"],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
