import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Get backend URL from environment or use default
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'
    
    // Forward the request to the backend
    const response = await fetch(`${backendUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      // If backend is not available, return a mock response
      return NextResponse.json({
        response: "I'm currently unable to connect to my knowledge base. This is a demo message - in production, I would provide personalized career guidance based on your question. Please ensure the backend server is running to get real AI responses.",
        status: 'offline'
      })
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Chat API Error:', error)
    
    // Return a helpful offline response
    return NextResponse.json({
      response: "Hello! I'm PathPilot, your AI career counselor. I'm currently in demo mode since the backend isn't connected. In a full deployment, I would analyze your career questions and provide personalized guidance. For now, I can tell you that career development typically involves: 1) Identifying your strengths and interests, 2) Setting clear goals, 3) Developing relevant skills, 4) Building a professional network, and 5) Continuously learning and adapting. What specific aspect of your career would you like to explore?",
      status: 'demo'
    })
  }
}
