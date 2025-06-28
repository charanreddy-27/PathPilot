"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    // Create particles
    const particles: Particle[] = []
    const particleCount = Math.min(Math.floor(window.innerWidth / 15), 80)

    // More subtle, tech-savvy colors
    const colors = [
      "rgba(59, 130, 246, 0.4)", // blue
      "rgba(139, 92, 246, 0.4)", // purple
      "rgba(16, 185, 129, 0.3)", // green
      "rgba(99, 102, 241, 0.4)", // indigo
    ]

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5, // Smaller particles
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2, // Varied opacity for depth
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    // Create a mouse effect
    let mouseX = 0
    let mouseY = 0
    let mouseRadius = 100

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Add subtle gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgba(10, 10, 18, 1)")
      gradient.addColorStop(1, "rgba(23, 23, 42, 1)")
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
          p.speedX -= dx * force * 0.02
          p.speedY -= dy * force * 0.02
        }

        // Add some natural movement with slight drift
        p.speedX += (Math.random() - 0.5) * 0.01
        p.speedY += (Math.random() - 0.5) * 0.01

        // Limit max speed
        const maxSpeed = 0.5
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

        // Connect particles with subtle lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2))

          if (distance < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(150, 150, 255, ${0.03 * (1 - distance / 120)})`
            ctx.lineWidth = 0.3
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
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

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}
