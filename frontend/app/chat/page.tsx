"use client"

import { useState, useRef, useEffect } from "react"
import { SendHorizontal, Bot, User, Loader2, Sparkles, ChevronRight, CornerDownLeft } from "lucide-react"
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

// Define suggested prompt type
type SuggestedPrompt = {
  id: string
  text: string
  icon?: React.ReactNode
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
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Suggested prompts
  const suggestedPrompts: SuggestedPrompt[] = [
    { 
      id: "career-change", 
      text: "How do I transition to a career in tech?",
      icon: <Sparkles className="w-3.5 h-3.5" />
    },
    { 
      id: "resume-tips", 
      text: "Help me improve my resume",
      icon: <Sparkles className="w-3.5 h-3.5" />
    },
    { 
      id: "interview-prep", 
      text: "How should I prepare for a job interview?",
      icon: <Sparkles className="w-3.5 h-3.5" />
    },
    { 
      id: "skill-assessment", 
      text: "What skills should I develop for my career?",
      icon: <Sparkles className="w-3.5 h-3.5" />
    },
  ]

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
    setShowSuggestions(false)

    try {
      // Send message to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          messages: [
            { role: "user", content: input }
          ] 
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      // Parse the JSON response
      const data = await response.json()
      
      // Add bot message to chat
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: data.message || "Sorry, I couldn't generate a response.",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    } catch (error) {
      console.error("Error:", error)
      toast("Failed to get a response. Please try again.", "error")

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
      setIsLoading(false)
    }
  }

  // Handle clicking a suggested prompt
  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt)
    inputRef.current?.focus()
  }

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-5rem)] pt-12 pb-4 px-4 md:px-6 bg-background">
      <div className="w-full max-w-4xl mx-auto flex flex-col flex-grow">
        {/* Chat header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-primary">
            PathPilot Chat
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Your AI career counselor is ready to guide your professional journey
          </p>
        </div>

        {/* Messages container */}
        <div 
          ref={chatContainerRef}
          className="flex-grow overflow-y-auto rounded-xl p-4 md:p-6 bg-secondary/30 backdrop-blur-sm border border-border/30 shadow-lg mb-4"
          style={{ 
            boxShadow: "0 4px 24px -8px rgba(0,0,0,0.1), 0 1px 6px -2px rgba(0,0,0,0.06)" 
          }}
        >
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[85%] md:max-w-[75%] items-start gap-3 ${
                    message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === "user"
                        ? "bg-primary/15 text-primary"
                        : "bg-purple-500/15 text-purple-400"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>

                  <div
                    className={`rounded-2xl px-4 py-3 shadow-md ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-secondary text-secondary-foreground rounded-tl-sm border border-border/50"
                    }`}
                    style={{
                      boxShadow: message.sender === "user" 
                        ? "0 2px 8px -2px rgba(147, 51, 234, 0.2)" 
                        : "0 2px 8px -2px rgba(0,0,0,0.05)"
                    }}
                  >
                    <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                    <div className="mt-1 text-[10px] opacity-60 text-right">
                      {new Intl.DateTimeFormat('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      }).format(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex max-w-[85%] md:max-w-[75%] items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-purple-500/15 text-purple-400">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="rounded-2xl px-4 py-3 bg-secondary text-secondary-foreground rounded-tl-sm shadow-md border border-border/50">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <span className="w-2 h-2 bg-purple-500 rounded-full opacity-75"></span>
                        <span className="w-2 h-2 bg-purple-500 rounded-full opacity-75"></span>
                        <span className="w-2 h-2 bg-purple-500 rounded-full opacity-75"></span>
                      </div>
                      <span className="text-xs text-muted-foreground ml-1">Thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Invisible element for auto-scrolling */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Suggested prompts */}
        {showSuggestions && messages.length <= 2 && (
          <div className="mb-4">
            <h3 className="text-sm text-muted-foreground mb-2 ml-1">Try asking about:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => handleSuggestedPrompt(prompt.text)}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-secondary/50 hover:bg-secondary text-left transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-primary/70">{prompt.icon}</span>
                    <span className="text-sm">{prompt.text}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        )}

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
                className="w-full py-6 px-4 pr-10 rounded-full border-border/50 bg-secondary/30 backdrop-blur-sm shadow-md focus-visible:ring-primary/30"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <CornerDownLeft className="w-4 h-4" />
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`rounded-full w-12 h-12 flex-shrink-0 p-0 ${
                input.trim()
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
              style={{
                boxShadow: input.trim() ? "0 4px 14px -4px rgba(147, 51, 234, 0.3)" : "none"
              }}
            >
              <SendHorizontal className="w-5 h-5" />
            </Button>
          </form>
          <div className="mt-3 text-xs text-center text-muted-foreground">
            PathPilot provides career guidance and advice based on general information.
          </div>
        </div>
      </div>
    </div>
  )
}