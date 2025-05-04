"use client"

import { motion } from "framer-motion"
import { Code, Cpu, Lightbulb, MessageSquare } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pt-16 md:pt-20">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.2),transparent_40%)]"></div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_40%)]"></div>
        </div>

        <div className="container px-4 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                About My Project
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              A personal exploration into how AI can transform career guidance and professional development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Description */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>

        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-3xl font-bold text-white">
                <span className="relative">
                  Project Overview
                  <span className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></span>
                </span>
              </h2>
              <p className="mb-4 text-lg text-gray-300">
                This Career Counsellor Chatbot is my personal project that combines my interest in artificial
                intelligence with a desire to help people navigate their career paths.
              </p>
              <p className="mb-6 text-lg text-gray-300">
                I built this project to explore how conversational AI can provide personalized guidance, making career
                advice more accessible and interactive.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-900/50 text-blue-400 border border-blue-700 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400">Inspiration</h3>
                    <p className="text-gray-300">
                      The project was inspired by the challenges many face when seeking career guidance and the
                      potential for AI to provide personalized support.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-900/50 text-purple-400 border border-purple-700 shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                      <Code className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400">Development</h3>
                    <p className="text-gray-300">
                      Built with React, Next.js, and Tailwind CSS, with animations powered by Framer Motion and a focus
                      on responsive design.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30 animate-pulse"></div>
              <div className="relative bg-gray-900 p-2 rounded-2xl border border-gray-800">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Project Screenshot"
                  className="rounded-xl w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900/30 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>

        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="mb-6 text-3xl font-bold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Key Features
              </span>
            </h2>
            <p className="text-lg text-gray-300">
              Explore the capabilities of this AI-powered career guidance chatbot.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <MessageSquare className="w-6 h-6" />,
                title: "Conversational Interface",
                description: "Natural dialogue flow that makes career guidance feel like chatting with a friend.",
                color: "blue",
              },
              {
                icon: <Cpu className="w-6 h-6" />,
                title: "AI-Powered Responses",
                description: "Intelligent responses based on user input to provide relevant career advice.",
                color: "purple",
              },
              {
                icon: <Lightbulb className="w-6 h-6" />,
                title: "Personalized Guidance",
                description: "Tailored advice based on your skills, interests, and career goals.",
                color: "cyan",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`p-6 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-${feature.color}-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition-all duration-300`}
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-${feature.color}-900/50 text-${feature.color}-400 border border-${feature.color}-700 shadow-[0_0_10px_rgba(59,130,246,0.3)]`}
                >
                  {feature.icon}
                </div>
                <h3 className={`mb-3 text-xl font-semibold text-${feature.color}-400`}>{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-16 relative overflow-hidden">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="mb-6 text-3xl font-bold text-center text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Technical Details
              </span>
            </h2>

            <div className="space-y-6 mt-8">
              <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
                <h3 className="mb-3 text-xl font-semibold text-blue-400">Frontend Technologies</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 text-sm bg-blue-900/30 text-blue-400 rounded-full border border-blue-800">
                    React
                  </span>
                  <span className="px-3 py-1 text-sm bg-blue-900/30 text-blue-400 rounded-full border border-blue-800">
                    Next.js
                  </span>
                  <span className="px-3 py-1 text-sm bg-blue-900/30 text-blue-400 rounded-full border border-blue-800">
                    TypeScript
                  </span>
                  <span className="px-3 py-1 text-sm bg-blue-900/30 text-blue-400 rounded-full border border-blue-800">
                    Tailwind CSS
                  </span>
                  <span className="px-3 py-1 text-sm bg-blue-900/30 text-blue-400 rounded-full border border-blue-800">
                    Framer Motion
                  </span>
                </div>
              </div>

              <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
                <h3 className="mb-3 text-xl font-semibold text-purple-400">AI Integration</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 text-sm bg-purple-900/30 text-purple-400 rounded-full border border-purple-800">
                    Natural Language Processing
                  </span>
                  <span className="px-3 py-1 text-sm bg-purple-900/30 text-purple-400 rounded-full border border-purple-800">
                    Conversational AI
                  </span>
                  <span className="px-3 py-1 text-sm bg-purple-900/30 text-purple-400 rounded-full border border-purple-800">
                    AI SDK
                  </span>
                </div>
              </div>

              <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
                <h3 className="mb-3 text-xl font-semibold text-cyan-400">Design Elements</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 text-sm bg-cyan-900/30 text-cyan-400 rounded-full border border-cyan-800">
                    Neon Effects
                  </span>
                  <span className="px-3 py-1 text-sm bg-cyan-900/30 text-cyan-400 rounded-full border border-cyan-800">
                    Particle Animations
                  </span>
                  <span className="px-3 py-1 text-sm bg-cyan-900/30 text-cyan-400 rounded-full border border-cyan-800">
                    Glassmorphism
                  </span>
                  <span className="px-3 py-1 text-sm bg-cyan-900/30 text-cyan-400 rounded-full border border-cyan-800">
                    Responsive Design
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
