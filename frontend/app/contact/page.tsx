"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen pt-16 md:pt-20">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.2),transparent_40%)]"></div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container px-4 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Get in Touch
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Have questions about my Career Counsellor Chatbot project? I'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>

        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20"></div>
              <div className="relative p-8 bg-gray-900/70 backdrop-blur-sm rounded-xl border border-gray-800">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-blue-900/50 text-blue-400 border border-blue-700 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  <Mail className="w-8 h-8" />
                </div>

                <h2 className="mb-6 text-2xl font-bold text-center text-white">Send Me a Message</h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 mb-6 text-green-400 bg-green-900/30 rounded-lg border border-green-800"
                  >
                    Thank you for your message! I'll get back to you soon.
                  </motion.div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-white placeholder-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-white placeholder-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-300">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-white placeholder-gray-400"
                      required
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2">Sending...</span>
                        <Send className="w-5 h-5 animate-pulse" />
                      </>
                    ) : (
                      <>
                        <span className="mr-2">Send Message</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            <div className="mt-12 text-center">
              <p className="text-gray-400">You can also reach me directly at:</p>
              <p className="mt-2 text-lg text-blue-400">contact@mycareerbot.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
