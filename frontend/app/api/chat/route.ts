import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    console.log("Chat API called")
    
    // Check if OPENAI_API_KEY is set
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not set")
      return new Response(
        JSON.stringify({ 
          error: "OpenAI API key is not configured. Please add OPENAI_API_KEY to environment variables." 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      )
    }
    
    const { messages } = await req.json()
    console.log("Received messages:", JSON.stringify(messages).slice(0, 100) + "...")

    // Create a system message to define the bot's behavior
    const systemMessage = {
      role: "system",
      content: `You are a helpful career counsellor bot. Your goal is to provide personalized career guidance, 
      resume tips, and interview preparation advice. Be supportive, professional, and provide actionable advice.
      Focus on helping users identify their strengths, explore career options, and develop professional skills.`,
    }

    // Add the system message to the beginning of the messages array
    const messagesWithSystem = [systemMessage, ...messages]

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    console.log("Calling OpenAI API with model: gpt-4o")
    
    // Create a chat completion
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messagesWithSystem,
      stream: true,
    })

    // Convert the response to a readable stream
    const stream = OpenAIStream(response)

    console.log("Stream response created, returning to client")
    
    // Return a streaming response
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response(
      JSON.stringify({ 
        error: "Failed to process chat request", 
        details: error instanceof Error ? error.message : String(error) 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
