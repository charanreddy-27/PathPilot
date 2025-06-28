"use client"

import { motion } from "framer-motion"
import { Bot } from "lucide-react"

export default function TypingIndicator() {
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
