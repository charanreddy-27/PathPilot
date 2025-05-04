"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Briefcase, GraduationCap, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_40%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(86,155,228,0.3),transparent_40%)]"></div>
        </div>

        <div className="container relative z-10 px-4 mx-auto">
          <div className="flex flex-col items-center max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
                Navigate Your Career Path With AI Guidance
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="mb-8 text-xl text-gray-600 md:text-2xl">
                Get personalized career advice, resume tips, and interview preparation from our AI career counsellor.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
            >
              <Link href="/chat">
                <Button size="lg" className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700">
                  Talk to the Career Bot <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900 md:text-4xl">
            How Our Career Bot Helps You
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-6 transition-all duration-300 bg-white rounded-xl shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Career Path Guidance</h3>
              <p className="text-gray-600">
                Discover the right career path based on your skills, interests, and educational background.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-6 transition-all duration-300 bg-white rounded-xl shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Resume Enhancement</h3>
              <p className="text-gray-600">
                Get personalized tips to improve your resume and stand out to potential employers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="p-6 transition-all duration-300 bg-white rounded-xl shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Interview Preparation</h3>
              <p className="text-gray-600">
                Practice with simulated interviews and receive feedback to improve your performance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Take the Next Step in Your Career?</h2>
            <p className="mb-8 text-xl max-w-2xl mx-auto">
              Our AI career counsellor is available 24/7 to provide personalized guidance and support.
            </p>
            <Link href="/chat">
              <Button size="lg" className="px-8 py-6 text-lg bg-white text-blue-600 hover:bg-gray-100">
                Start Chatting Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
