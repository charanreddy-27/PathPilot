"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Compass, ChevronRight, GraduationCap, LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"

// Particle interface for the background
interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Subtle elegant particle background effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Create particles - optimized count for performance
    const particles: Particle[] = []
    const particleCount = Math.min(Math.floor(window.innerWidth / 40), 30) // Reduced count for better performance

    // Elegant, subtle colors
    const colors = [
      "rgba(59, 130, 246, 0.12)", // blue
      "rgba(79, 70, 229, 0.1)", // indigo
      "rgba(16, 185, 129, 0.08)", // green
      "rgba(99, 102, 241, 0.09)", // indigo
    ]

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.5, // Smaller particles
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.3 + 0.1, // Lower opacity for subtlety
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    // Create a mouse effect
    let mouseX = 0
    let mouseY = 0
    let mouseRadius = 60

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Add subtle gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(17, 24, 39, 1)") // gray-900
      gradient.addColorStop(1, "rgba(31, 41, 55, 0.95)") // gray-800
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Calculate distance to mouse
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Mouse interaction - gentle push away from mouse
        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius
          p.speedX -= dx * force * 0.005
          p.speedY -= dy * force * 0.005
        }

        // Add some natural movement with slight drift
        p.speedX += (Math.random() - 0.5) * 0.003
        p.speedY += (Math.random() - 0.5) * 0.003

        // Limit max speed
        const maxSpeed = 0.2
        const currentSpeed = Math.sqrt(p.speedX * p.speedX + p.speedY * p.speedY)
        if (currentSpeed > maxSpeed) {
          p.speedX = (p.speedX / currentSpeed) * maxSpeed
          p.speedY = (p.speedY / currentSpeed) * maxSpeed
        }

        // Move particles
        p.x += p.speedX
        p.y += p.speedY

        // Wrap around edges (smoother than bouncing)
        if (p.x > canvas.width) p.x = 0
        if (p.x < 0) p.x = canvas.width
        if (p.y > canvas.height) p.y = 0
        if (p.y < 0) p.y = canvas.height

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        
        // Use the color with custom opacity
        const color = p.color.replace(/[\d\.]+\)$/g, `${p.opacity})`)
        ctx.fillStyle = color
        ctx.fill()

        // Connect particles with subtle lines - optimized to reduce connections
        if (i % 4 === 0) { // Only process every fourth particle for connections
          for (let j = i + 1; j < Math.min(i + 6, particles.length); j++) {
            const p2 = particles[j]
            const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2))

            if (distance < 70) { // Reduced connection distance
              ctx.beginPath()
              ctx.strokeStyle = `rgba(156, 163, 175, ${0.015 * (1 - distance / 70)})`
              ctx.lineWidth = 0.15
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
            }
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
      <div className="relative z-10 w-full">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 w-full">
          <div className="w-full max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center mb-8"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center shadow-elegant border border-primary/10">
                <Compass className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-medium mb-6 tracking-tight px-4"
            >
              <span className="text-primary">PathPilot</span>
              <span className="block mt-3 text-2xl md:text-4xl font-normal text-foreground/90">AI Career Counselor</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed px-4"
            >
              Navigate your professional journey with personalized guidance from our advanced AI career counselor.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center px-4"
            >
              <Link href="/chat" className="w-full sm:w-auto">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant-sm rounded-full px-8 w-full sm:w-auto">
                  Start Chatting
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-border text-muted-foreground hover:text-foreground hover:bg-background/50 rounded-full px-8 w-full sm:w-auto">
                Learn More
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center">
              <span className="text-muted-foreground text-sm mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border border-muted/50 rounded-full flex justify-center">
                <motion.div
                  animate={{ 
                    y: [0, 8, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                  className="w-1.5 h-1.5 rounded-full bg-primary/70 mt-2"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-white mb-4">How PathPilot Can Help You</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Our advanced AI provides tailored guidance to help you navigate your career journey with confidence.</p>
            </motion.div>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden" 
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: <GraduationCap className="h-8 w-8 mb-4 text-blue-500" />,
                  title: "Personalized Career Advice",
                  description: "Receive customized guidance based on your skills, experience, and career goals."
                },
                {
                  icon: <LineChart className="h-8 w-8 mb-4 text-purple-500" />,
                  title: "Market Insights",
                  description: "Get up-to-date information about industry trends, job markets, and in-demand skills."
                },
                {
                  icon: <GraduationCap className="h-8 w-8 mb-4 text-indigo-500" />,
                  title: "AI-Powered Resume Analysis",
                  description: "Optimize your resume with AI-powered recommendations and feedback."
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10"
                >
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 mb-4">{feature.description}</p>
                  <Link href="/chat">
                    <span className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                      Try it now <ChevronRight className="h-4 w-4 ml-1" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-900/50 to-indigo-900/50 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-blue-800/50"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Shape Your Career?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Get started with PathPilot today and receive personalized guidance to help you navigate your professional journey.</p>
            <Link href="/chat">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 shadow-xl font-medium rounded-full px-8">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </section>
      </div>
    </>
  )
}
