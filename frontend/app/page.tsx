"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Briefcase, GraduationCap, MessageSquare, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import ParticleBackground from "@/components/particle-background"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_40%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(86,155,228,0.3),transparent_40%)]"></div>
        </div>

        {/* Animated Neon Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-blue-500/20 opacity-20 animate-pulse"></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-purple-500/20 opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-cyan-500/20 opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="container relative z-10 px-4 mx-auto">
          <div className="flex flex-col items-center max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  Career Counsellor
                </span>{" "}
                <span className="relative">
                  Chatbot
                  <span className="absolute -inset-1 rounded-lg blur-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-30 group-hover:opacity-100 transition duration-1000"></span>
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="mb-8 text-xl text-gray-300 md:text-2xl">
                My personal project using AI to provide career guidance, resume tips, and interview preparation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
            >
              <Link href="/chat">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-[0_0_15px_rgba(79,70,229,0.5)] hover:shadow-[0_0_25px_rgba(79,70,229,0.7)] transition-all duration-300"
                >
                  Try the Chatbot <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg border-blue-500 text-blue-400 hover:bg-blue-950/30 hover:text-blue-300 hover:border-blue-400 transition-all duration-300"
                >
                  About the Project
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-950/50 backdrop-blur-sm relative overflow-hidden">
        {/* Neon Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>

        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-white md:text-4xl">
            <span className="relative inline-block">
              Key Features
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></span>
            </span>
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-6 transition-all duration-300 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-900/50 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-blue-400">Career Path Guidance</h3>
              <p className="text-gray-400">
                Discover the right career path based on your skills, interests, and educational background.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-6 transition-all duration-300 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-900/50 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-purple-400">Resume Enhancement</h3>
              <p className="text-gray-400">
                Get personalized tips to improve your resume and stand out to potential employers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-6 transition-all duration-300 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-cyan-900/50 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-cyan-400">Interview Preparation</h3>
              <p className="text-gray-400">
                Practice with simulated interviews and receive feedback to improve your performance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Showcase */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(120,119,198,0.2),transparent_40%)]"></div>
        </div>

        <div className="container px-4 mx-auto relative z-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  About This Project
                </span>
              </h2>
              <p className="mb-4 text-lg text-gray-300">
                This Career Counsellor Chatbot is my personal project that combines my passion for technology and
                helping others navigate their career paths.
              </p>
              <p className="mb-6 text-lg text-gray-300">
                Built with React, Next.js, and AI technologies, this project demonstrates how artificial intelligence
                can provide personalized career guidance in an interactive and engaging way.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-3 py-1 text-sm bg-blue-900/30 text-blue-400 rounded-full border border-blue-800">
                  React
                </span>
                <span className="px-3 py-1 text-sm bg-purple-900/30 text-purple-400 rounded-full border border-purple-800">
                  Next.js
                </span>
                <span className="px-3 py-1 text-sm bg-cyan-900/30 text-cyan-400 rounded-full border border-cyan-800">
                  Tailwind CSS
                </span>
                <span className="px-3 py-1 text-sm bg-green-900/30 text-green-400 rounded-full border border-green-800">
                  Framer Motion
                </span>
                <span className="px-3 py-1 text-sm bg-pink-900/30 text-pink-400 rounded-full border border-pink-800">
                  AI Integration
                </span>
              </div>

              <Link href="/about">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all duration-300">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
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

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1000')] bg-cover bg-center opacity-10"></div>

        {/* Animated Neon Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>

        <div className="container px-4 mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-3xl font-bold md:text-4xl text-white">Ready to Try the Chatbot?</h2>
            <p className="mb-8 text-xl max-w-2xl mx-auto text-gray-300">
              Experience how AI can provide personalized career guidance and support your professional development.
            </p>
            <Link href="/chat">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-[0_0_15px_rgba(79,70,229,0.5)] hover:shadow-[0_0_25px_rgba(79,70,229,0.7)] transition-all duration-300"
              >
                Start Chatting <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
