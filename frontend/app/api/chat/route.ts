import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const userMessage = body.message || ''
    
    // Get backend URL from environment
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'
    
    console.log('Backend URL:', backendUrl)
    console.log('Full endpoint URL:', `${backendUrl}/chat/message`)
    console.log('Environment variables:', {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL
    })
    
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
      
    } catch (backendError: any) {
      console.log('Backend connection failed with detailed error:', {
        error: backendError,
        message: backendError?.message || 'Unknown error',
        name: backendError?.name || 'Unknown',
        cause: backendError?.cause || 'No cause specified',
        backendUrl: backendUrl,
        fullUrl: `${backendUrl}/chat/message`
      })
      
      // Return error message if backend is unavailable
      return NextResponse.json({
        response: `Sorry, I'm currently unable to connect to the backend service at ${backendUrl}. Please check if the backend server is running and accessible.`,
        status: 'backend_unavailable',
        error: backendError?.message || 'Connection failed',
        backendUrl: backendUrl
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
