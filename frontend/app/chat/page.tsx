"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { SendHorizontal, Bot, User, Loader2, Sparkles } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { useToast } from "../../hooks/use-toast"

type Message = {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatPage() {
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
  const { toast } = useToast()

  const suggestedPrompts = [
    "How do I transition to a career in tech?",
    "Help me improve my resume",
    "How should I prepare for a job interview?",
    "What skills should I develop for my career?",
  ]

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    const currentInput = input
    setInput("")
    setShowSuggestions(false)
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          conversation_history: messages
            .filter(msg => msg.id !== "welcome")
            .map(msg => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text,
            })),
        }),
      })

      if (!response.ok) {
        console.log(`API Response Status: ${response.status}`)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("API Response:", data)
      
      const responseText = data.response || "I apologize, but I'm having trouble responding right now. Please try again."
      const status = data.status || 'unknown'
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, botResponse])
      
      // Show connection status to user
      if (status === 'backend_unavailable') {
        console.log("Backend service unavailable")
        toast("Backend service is currently unavailable. Please try again later.", "error")
      } else if (status === 'connected') {
        console.log("Connected to backend AI")
      } else if (status === 'error') {
        console.log("API Error occurred")
        toast("An error occurred while processing your request.", "error")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      toast("Unable to connect to the backend service. Please ensure the backend is running and try again.", "error")
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm unable to connect to the backend service right now. Please check if the backend server is running and try again.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Chat with PathPilot
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Get personalized career guidance from our AI counselor
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="h-[600px] overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "bot" && (
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                </div>

                {message.sender === "user" && (
                  <div className="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                    <span className="text-slate-600 dark:text-slate-400">PathPilot is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {showSuggestions && messages.length === 1 && (
            <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Try asking about:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(prompt)}
                    className="text-left p-3 text-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-purple-50 dark:hover:bg-slate-600 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-500 group-hover:text-purple-600" />
                      <span className="text-slate-700 dark:text-slate-300">{prompt}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-6 border-t border-slate-200 dark:border-slate-700">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your career..."
                className="flex-1 border-slate-300 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 rounded-xl"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 rounded-xl transition-all duration-200"
              >
                <SendHorizontal className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
