"use client"
import { Award, BookOpen, Clock, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">About Our Career Counsellor Bot</h1>
            <p className="text-xl text-gray-600">
              We're on a mission to make career guidance accessible to everyone through the power of artificial
              intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Our Mission</h2>
              <p className="mb-4 text-lg text-gray-600">
                At CareerBot, we believe that everyone deserves access to high-quality career guidance, regardless of
                their background or resources.
              </p>
              <p className="mb-4 text-lg text-gray-600">
                Our AI-powered career counsellor is designed to provide personalized advice, helping students and
                professionals navigate their career paths with confidence.
              </p>
              <p className="text-lg text-gray-600">
                We're committed to continuously improving our technology to deliver the most relevant and helpful
                guidance for your unique career journey.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">10,000+</h3>
                <p className="text-gray-600">Users Helped</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">500+</h3>
                <p className="text-gray-600">Career Paths</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">24/7</h3>
                <p className="text-gray-600">Availability</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">95%</h3>
                <p className="text-gray-600">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              We're a passionate team of career experts and AI specialists dedicated to helping you succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Sarah Johnson",
                role: "Career Expert",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Michael Chen",
                role: "AI Engineer",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Priya Patel",
                role: "UX Designer",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "David Wilson",
                role: "Content Strategist",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-4 overflow-hidden rounded-xl aspect-square">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="mb-1 text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
