import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Create a system message to define the bot's behavior
    const systemMessage = {
      role: "system",
      content: `You are a helpful career counsellor bot. Your goal is to provide personalized career guidance, 
      resume tips, and interview preparation advice. Be supportive, professional, and provide actionable advice.
      Focus on helping users identify their strengths, explore career options, and develop professional skills.`,
    }

    // Add the system message to the beginning of the messages array
    const messagesWithSystem = [systemMessage, ...messages]

    const result = streamText({
      model: openai("gpt-4o"),
      messages: messagesWithSystem,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response(JSON.stringify({ error: "Failed to process chat request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
