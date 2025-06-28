"use client"

import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Send, Sparkles, Bot, User, MessageSquare } from "lucide-react"
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
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        <div className={`flex-shrink-0 flex items-start mt-1 ${isUser ? "ml-3" : "mr-3"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
              isUser
                ? "bg-primary/10 text-primary border border-primary/10 shadow-elegant-sm"
                : "bg-accent/30 text-accent-foreground border border-accent/10 shadow-elegant-sm"
            }`}
          >
            {isUser ? <User className="w-4 h-4" strokeWidth={2} /> : <Bot className="w-4 h-4" strokeWidth={2} />}
          </div>
        </div>

        <div
          className={`p-3 rounded-2xl text-sm md:text-base ${
            isUser
              ? "bg-primary text-primary-foreground rounded-br-none shadow-elegant-sm"
              : "bg-card/80 text-card-foreground rounded-bl-none border border-border/30 shadow-elegant-sm"
          }`}
        >
          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
          
          {/* Message time - could be implemented with actual timestamps */}
          <div className={`text-xs mt-1 opacity-50 text-right ${isUser ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
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
      <div className="flex max-w-[85%] md:max-w-[75%] flex-row">
        <div className="flex-shrink-0 flex items-start mt-1 mr-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-accent/30 text-accent-foreground border border-accent/10 shadow-elegant-sm">
            <Bot className="w-4 h-4" strokeWidth={2} />
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-card/80 border border-border/30 text-card-foreground rounded-bl-none shadow-elegant-sm">
          <div className="flex items-center space-x-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary/60"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 1.5,
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
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex-grow container mx-auto px-4 py-8 max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col h-[calc(100vh-8rem)] bg-background/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-border/20 shadow-elegant w-full"
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-border/20 bg-card/50">
            <div className="flex items-center">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 border border-primary/10 mr-3 shadow-elegant-sm">
                <MessageSquare className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-lg font-medium tracking-wide text-foreground">Career Counselor</h1>
                <div className="flex items-center text-xs text-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                  Online and ready to assist
                </div>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-grow overflow-y-auto scrollbar-thin p-4 bg-gradient-to-b from-transparent to-background/5">
            <div className="w-full max-w-full">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </AnimatePresence>

              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Suggested Prompts */}
          <div className="px-4 py-3 bg-card/30 border-t border-border/20">
            <div className="flex items-center mb-2">
              <Sparkles className="h-4 w-4 text-primary/80 mr-2" strokeWidth={1.5} />
              <span className="text-sm text-muted-foreground">Suggested questions</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {prebuiltPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handlePromptClick(prompt)}
                  className="px-3 py-1.5 text-xs rounded-full bg-accent/20 text-accent-foreground hover:bg-accent/30 transition-colors border border-accent/5 shadow-elegant-sm"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-card/40 border-t border-border/20">
            <form onSubmit={handleSubmit} className="flex items-end gap-2 w-full">
              <div className="flex-grow relative w-full">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full rounded-xl border border-border/30 bg-background/60 p-3 pr-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none min-h-[48px] max-h-[200px] shadow-elegant-sm"
                  style={{ height: "auto" }}
                  rows={1}
                />
                <div className="absolute right-3 bottom-3 text-xs text-muted-foreground">
                  <kbd className="px-1.5 py-0.5 rounded border border-border/30 bg-accent/20 text-accent-foreground text-[10px]">⏎</kbd>
                </div>
              </div>
              <Button 
                type="submit" 
                size="icon" 
                className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant-sm flex-shrink-0"
                disabled={!input.trim()}
              >
                <Send className="h-5 w-5" strokeWidth={1.5} />
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}