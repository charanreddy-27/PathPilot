import OpenAI from 'openai'

// Allow longer responses
export const maxDuration = 30

// Mock responses for common career questions
const MOCK_RESPONSES: Record<string, string> = {
  default: "I'm a career counselor bot that can help with career advice, resume tips, and interview preparation. How can I assist you today?",
  tech: "Transitioning to a tech career typically involves: 1) Identifying your target role, 2) Learning relevant skills through courses or bootcamps, 3) Building projects for your portfolio, 4) Networking with professionals, and 5) Applying for entry-level positions or internships. What specific tech role interests you?",
  resume: "To improve your resume: 1) Use a clean, professional template, 2) Include quantifiable achievements, 3) Tailor it to each job application, 4) Use action verbs, 5) Keep it concise (1-2 pages), and 6) Proofread carefully. Would you like more specific advice for your situation?",
  interview: "For interview preparation: 1) Research the company thoroughly, 2) Practice common questions, 3) Prepare your own questions, 4) Use the STAR method for behavioral questions, 5) Dress professionally, and 6) Follow up with a thank-you note. Is there a specific type of interview you're preparing for?",
  skills: "To identify which skills to develop, consider: 1) Job postings in your target field, 2) Industry trends, 3) Informational interviews with professionals, and 4) Your existing transferable skills. What career path are you considering?",
}

// Function to generate mock responses
function getMockResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("tech") || lowerMessage.includes("transition") || lowerMessage.includes("change career")) {
    return MOCK_RESPONSES.tech;
  } else if (lowerMessage.includes("resume") || lowerMessage.includes("cv")) {
    return MOCK_RESPONSES.resume;
  } else if (lowerMessage.includes("interview")) {
    return MOCK_RESPONSES.interview;
  } else if (lowerMessage.includes("skill")) {
    return MOCK_RESPONSES.skills;
  }
  
  return MOCK_RESPONSES.default;
}

export async function POST(req: Request) {
  try {
    console.log("Chat API called")
    
    // Parse the request body with error handling
    let userMessage = "";
    try {
      const body = await req.json();
      const messages = body.messages;
      
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        console.error("Invalid messages format:", body);
        return new Response(
          JSON.stringify({ message: "I couldn't understand your message. Please try again." }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
      
      // Get the last user message
      userMessage = messages[messages.length - 1].content || "";
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return new Response(
        JSON.stringify({ message: "There was an issue processing your message. Please try again." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    
    // Check if OPENAI_API_KEY is set
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.log("OPENAI_API_KEY is not set, using mock response")
      // Return a mock response
      return new Response(
        JSON.stringify({ 
          message: getMockResponse(userMessage)
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      )
    }
    
    console.log("Using OpenAI API")

    // Create a system message to define the bot's behavior
    const systemMessage = {
      role: "system" as const,
      content: `You are a helpful career counsellor bot. Your goal is to provide personalized career guidance, 
      resume tips, and interview preparation advice. Be supportive, professional, and provide actionable advice.
      Focus on helping users identify their strengths, explore career options, and develop professional skills.`,
    }

    // Add the system message to the beginning of the messages array
    const messagesWithSystem = [
      systemMessage, 
      { role: "user" as const, content: userMessage }
    ];

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: apiKey,
    })

    console.log("Calling OpenAI API with model: gpt-4o")
    
    try {
      // Create a chat completion (non-streaming)
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: messagesWithSystem,
        stream: false,
      })

      console.log("Response received, returning to client")
      
      // Return the response content
      return new Response(
        JSON.stringify({ 
          message: response.choices[0].message.content 
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      )
    } catch (error) {
      console.error("OpenAI API error:", error);
      
      // Return a mock response as fallback
      return new Response(
        JSON.stringify({ 
          message: getMockResponse(userMessage)
        }),
        { 
          status: 200, 
          headers: { "Content-Type": "application/json" } 
        }
      );
    }
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response(
      JSON.stringify({ 
        message: "I'm having trouble connecting right now. Please try again in a moment."
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
