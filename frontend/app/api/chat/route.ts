import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const userMessage = body.message || ''
    
    // Get backend URL from environment
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'
    
    console.log('Attempting to connect to backend:', backendUrl)
    
    try {
      // Try to connect to the actual backend with correct endpoint
      const response = await fetch(`${backendUrl}/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          user_id: 'frontend_user',
          conversation_history: body.conversation_history || []
        }),
        signal: AbortSignal.timeout(10000) // 10 second timeout
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Backend response received:', data)
        
        // Backend returns {message: response}, frontend expects {response: response}
        return NextResponse.json({
          response: data.message || data.response || "I received your message but couldn't generate a proper response.",
          status: 'connected'
        })
      } else {
        console.log('Backend responded with error:', response.status)
        throw new Error(`Backend error: ${response.status}`)
      }
      
    } catch (backendError) {
      console.log('Backend connection failed:', backendError)
      
      // Return error message if backend is unavailable
      return NextResponse.json({
        response: "Sorry, I'm currently unable to connect to the backend service. Please try again later or check if the backend server is running.",
        status: 'backend_unavailable'
      })
    }

  } catch (error) {
    console.error('Chat API Error:', error)
    
    return NextResponse.json({
      response: "I'm experiencing technical difficulties. Please try again in a moment.",
      status: 'error'
    })
  }
}
