"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Compass, GraduationCap, LineChart, CheckCircle, Star, TrendingUp, Award, Sparkles, Bot } from "lucide-react"
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

  // Subtle elegant particle background effect - optimized for performance
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

    // Create particles - further reduced count for better performance
    const particles: Particle[] = []
    const particleCount = Math.min(Math.floor(window.innerWidth / 70), 20) // Slightly more particles

    // Elegant, subtle colors - updated to purple theme
    const colors = [
      "rgba(147, 51, 234, 0.15)", // purple-600
      "rgba(192, 38, 211, 0.12)", // fuchsia-600
      "rgba(168, 85, 247, 0.14)", // purple-500
    ]

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5, // Slightly larger particles
        speedX: (Math.random() - 0.5) * 0.12,
        speedY: (Math.random() - 0.5) * 0.12,
        opacity: Math.random() * 0.25 + 0.1, // Higher opacity for visibility
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    // Create a mouse effect
    let mouseX = 0
    let mouseY = 0
    let mouseRadius = 80 // Larger interaction radius

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop - optimized
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Add subtle gradient background - updated to purple theme with more depth
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgba(30, 20, 40, 1)") // dark purple
      gradient.addColorStop(0.4, "rgba(44, 31, 60, 0.98)") // medium purple
      gradient.addColorStop(0.8, "rgba(35, 25, 50, 0.95)") // medium-dark purple
      gradient.addColorStop(1, "rgba(30, 20, 40, 1)") // dark purple
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles - with optimized calculations
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Calculate distance to mouse - only when needed
        if (Math.abs(mouseX - p.x) < mouseRadius && Math.abs(mouseY - p.y) < mouseRadius) {
          const dx = mouseX - p.x
          const dy = mouseY - p.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Mouse interaction - gentle push away from mouse
          if (distance < mouseRadius) {
            const force = (mouseRadius - distance) / mouseRadius
            p.speedX -= dx * force * 0.004
            p.speedY -= dy * force * 0.004
          }
        }

        // Add some natural movement with slight drift - reduced randomness
        if (i % 2 === 0) { // Only apply to half the particles
          p.speedX += (Math.random() - 0.5) * 0.002
          p.speedY += (Math.random() - 0.5) * 0.002
        }

        // Move particles
        p.x += p.speedX
        p.y += p.speedY

        // Wrap around edges
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

        // Connect particles - much more selective connections
        if (i % 5 === 0) { // Process more particles for connections
          for (let j = i + 1; j < Math.min(i + 5, particles.length); j += 1) { // More connections
            const p2 = particles[j]
            const dx = p.x - p2.x
            const dy = p.y - p2.y
            
            // Use square distance for performance (avoid sqrt)
            const squareDist = dx * dx + dy * dy
            if (squareDist < 6400) { // 80^2 - larger connection distance
              ctx.beginPath()
              // Updated connection color to match purple theme
              ctx.strokeStyle = `rgba(216, 180, 254, ${0.015 * (1 - squareDist / 6400)})`
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

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }

  return (
    <>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
      
      {/* Decorative grid pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(147,51,234,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,51,234,0.03)_1px,transparent_1px)] bg-[size:40px_40px] -z-5 opacity-30"></div>
      
      <div className="relative z-10 w-full">
        {/* Hero Section - enhanced */}
        <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 sm:px-8 w-full">
          <div className="w-full max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="flex items-center justify-center mb-8"
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/40 to-purple-500/40 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="relative w-20 h-20 bg-primary/15 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(147,51,234,0.2)] border border-primary/20">
                  <Compass className="w-10 h-10 text-primary" strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight px-4 leading-tight"
            >
              <div className="relative inline-block">
                <span className="text-gradient relative z-10">PathPilot</span>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-xl opacity-50 rounded-full"></div>
              </div>
              <span className="block mt-4 text-3xl md:text-5xl font-medium text-foreground/90">Your AI Career Navigator</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed px-4"
            >
              Navigate your professional journey with personalized guidance from our advanced AI career counselor. Get tailored advice, skill recommendations, and career insights.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-5 justify-center px-4 mb-12"
            >
              <Link href="/chat" className="w-full sm:w-auto group">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_4px_20px_-4px_rgba(147,51,234,0.5)] hover:shadow-[0_8px_30px_-4px_rgba(147,51,234,0.6)] rounded-full px-8 py-6 w-full sm:w-auto text-base font-medium relative overflow-hidden">
                  <span className="relative z-10">Start Your Journey</span>
                  <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-primary/30 text-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 rounded-full px-8 py-6 w-full sm:w-auto text-base font-medium backdrop-blur-sm group relative overflow-hidden">
                <span className="relative z-10">Learn More</span>
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </motion.div>

            {/* Feature highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            >
              {[
                { icon: <Sparkles className="w-5 h-5" />, text: "AI-Powered Advice" },
                { icon: <CheckCircle className="w-5 h-5" />, text: "Personalized Path" },
                { icon: <TrendingUp className="w-5 h-5" />, text: "Skill Analysis" },
                { icon: <Award className="w-5 h-5" />, text: "Career Insights" },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  className="flex flex-col items-center p-3 rounded-xl bg-primary/5 border border-primary/10 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/20 transition-colors group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (i * 0.1), duration: 0.4 }}
                >
                  <div className="text-primary mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <p className="text-sm font-medium">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center">
              <span className="text-muted-foreground text-sm mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border border-primary/30 rounded-full flex justify-center">
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
                  className="w-1.5 h-1.5 rounded-full bg-primary mt-2"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section - enhanced */}
        <section className="py-20 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                custom={0}
                className="inline-block mb-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
              >
                Explore Features
              </motion.div>
              <motion.h2 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                custom={1}
                className="text-4xl font-bold mb-4"
              >
                How <span className="text-primary">PathPilot</span> Guides Your Career
              </motion.h2>
              <motion.p 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                custom={2}
                className="text-muted-foreground max-w-2xl mx-auto text-lg"
              >
                Our advanced AI provides tailored guidance to help you navigate your career journey with confidence and clarity.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <GraduationCap className="w-6 h-6" />,
                  title: "Skill Development",
                  description: "Identify key skills needed for your dream role and get personalized learning paths to acquire them efficiently."
                },
                {
                  icon: <LineChart className="w-6 h-6" />,
                  title: "Career Trajectory",
                  description: "Visualize potential career paths based on your experience, skills, and goals with AI-powered projections."
                },
                {
                  icon: <Star className="w-6 h-6" />,
                  title: "Interview Preparation",
                  description: "Practice with AI-simulated interviews tailored to specific roles and receive feedback to improve your performance."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                  custom={index + 3}
                  className="bg-secondary/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)] group hover:shadow-[0_8px_30px_-8px_rgba(147,51,234,0.2)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                  
                  <div className="relative">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 text-primary group-hover:bg-primary/15 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                    
                    <div className="mt-6 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-medium mr-1">Learn more</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial/Demo Section */}
        <section className="py-20 px-4 sm:px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                custom={0}
              >
                <div className="inline-block mb-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                  Real Conversations
                </div>
                <h2 className="text-3xl font-bold mb-5">Experience AI-Powered Career Guidance</h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  PathPilot provides personalized advice based on your unique skills, experience, and career goals. Start a conversation today and discover your optimal path.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    "Get tailored career recommendations",
                    "Identify skill gaps and learning opportunities",
                    "Prepare for interviews with expert guidance",
                    "Explore salary insights and negotiation strategies"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="text-primary"><CheckCircle className="w-5 h-5" /></div>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
                <Link href="/chat" className="group">
                  <Button className="rounded-full px-6 py-5 relative overflow-hidden">
                    <span className="relative z-10">Start a Conversation</span>
                    <ArrowRight className="ml-2 h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                custom={1}
                className="relative"
              >
                <div className="absolute -inset-1.5 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-2xl blur-lg opacity-30"></div>
                <div className="relative bg-secondary/50 backdrop-blur-md border border-border/50 rounded-xl p-5 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">PathPilot AI</p>
                      <p className="text-xs text-muted-foreground">Career Advisor</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-4">
                    <div className="bg-primary/5 rounded-lg p-3 rounded-tl-sm">
                      <p className="text-sm">Hello! I'm PathPilot, your AI career counselor. How can I help with your career journey today?</p>
                    </div>
                    
                    <div className="bg-primary/5 rounded-lg p-3 rounded-tl-sm">
                      <p className="text-sm">I can help you identify skills to develop, prepare for interviews, or explore new career paths based on your experience.</p>
                    </div>
                    
                    <div className="bg-primary text-primary-foreground rounded-lg p-3 rounded-tr-sm ml-auto">
                      <p className="text-sm">I want to transition from marketing to UX design. What skills should I focus on?</p>
                    </div>
                    
                    <div className="bg-primary/5 rounded-lg p-3 rounded-tl-sm">
                      <p className="text-sm">Great choice! For a marketing to UX transition, focus on: UI/UX tools like Figma, user research methods, information architecture, and building a portfolio showcasing your process. Your marketing background gives you valuable user psychology insights!</p>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-border/30 flex">
                    <input 
                      type="text" 
                      placeholder="Ask about your career..." 
                      className="bg-transparent border-none flex-grow focus:outline-none text-sm"
                      disabled
                    />
                    <Button size="sm" variant="ghost" className="text-primary">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 relative">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-30 -z-10"></div>
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl opacity-30 -z-10"></div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            custom={0}
            className="max-w-4xl mx-auto text-center bg-gradient-to-b from-primary/5 to-primary/10 rounded-2xl p-12 border border-primary/20 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-bl from-primary/10 to-transparent rounded-full"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Navigate Your Career Path?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Get personalized guidance, skill recommendations, and career insights tailored just for you.
            </p>
            <Link href="/chat" className="group">
              <Button size="lg" className="rounded-full px-8 py-6 text-lg shadow-[0_4px_20px_-4px_rgba(147,51,234,0.5)] hover:shadow-[0_8px_30px_-4px_rgba(147,51,234,0.6)] relative overflow-hidden">
                <span className="relative z-10">Start Your Journey Now</span>
                <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
          </motion.div>
        </section>
      </div>
    </>
  )
}
