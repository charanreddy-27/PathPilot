"use client"

import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { SendHorizontal, Bot, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

// Define message type
type Message = {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatPage() {
  // State for messages and input
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm PathPilot, your AI career counselor. How can I help with your career journey today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus input on load and prevent auto-scrolling to bottom
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
    // Prevent auto-scroll to bottom on page load
    window.scrollTo(0, 0)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Don't send empty messages
    if (!input.trim()) return

    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulate API call for now - replace with actual API call when backend is ready
      setTimeout(() => {
        // Add bot response to chat
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: "I'm here to help with your career journey. What specific aspect of your career would you like guidance on today?",
            sender: "bot",
            timestamp: new Date(),
          },
        ])
        setIsLoading(false)
      }, 1000)

      // Uncomment this when API is ready
      /*
      // Send message to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      // Add bot response to chat
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: data.response || "I'm having trouble processing that right now. Please try again.",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
      */
    } catch (error) {
      console.error("Error:", error)
      toast("Failed to get a response. Please try again.")

      // Add error message from bot
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "I'm having trouble connecting right now. Please try again in a moment.",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    } finally {
      // setIsLoading(false) // Uncomment when using real API
    }
  }

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-5rem)] pt-16 pb-4 px-4 md:px-6">
      <div className="w-full max-w-3xl mx-auto flex flex-col flex-grow">
        {/* Chat header */}
        <div className="mb-4 text-center">
          <h1 className="text-xl md:text-2xl font-medium mb-1">PathPilot Chat</h1>
          <p className="text-muted-foreground text-sm">Your AI career counselor is ready to help</p>
        </div>

        {/* Messages container */}
        <div 
          ref={chatContainerRef}
          className="flex-grow overflow-y-auto rounded-xl p-3 md:p-4 bg-background/30 backdrop-blur-sm border border-border/30 shadow-elegant mb-4"
        >
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-[85%] md:max-w-[70%] items-start gap-2 ${
                      message.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                        message.sender === "user"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="w-3.5 h-3.5" />
                      ) : (
                        <Bot className="w-3.5 h-3.5" />
                      )}
                    </div>

                    <div
                      className={`rounded-2xl px-3 py-2 shadow-elegant-sm ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-card text-card-foreground rounded-tl-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex max-w-[85%] md:max-w-[70%] items-start gap-2">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-muted text-foreground">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="rounded-2xl px-3 py-2 bg-card text-card-foreground rounded-tl-sm shadow-elegant-sm">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Invisible element for auto-scrolling */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input form */}
        <div className="w-full">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-grow">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="w-full py-5 px-4 pr-10 rounded-full border-border/50 bg-background/30 backdrop-blur-sm shadow-elegant-sm focus-visible:ring-primary/30"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`rounded-full w-10 h-10 flex-shrink-0 p-0 ${
                input.trim()
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <SendHorizontal className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}