import OpenAI from 'openai'

// Allow longer responses
export const maxDuration = 30

// Mock responses for common career questions with variations
const MOCK_RESPONSES: Record<string, string[]> = {
  default: [
    "I'm a career counselor bot that can help with career advice, resume tips, and interview preparation. How can I assist you today?",
    "I'd be happy to help with your career questions. What specific area are you looking for guidance on?",
    "I can provide advice on job searching, resume building, interview preparation, and career transitions. What would you like to know more about?"
  ],
  tech: [
    "Transitioning to a tech career typically involves: 1) Identifying your target role, 2) Learning relevant skills through courses or bootcamps, 3) Building projects for your portfolio, 4) Networking with professionals, and 5) Applying for entry-level positions or internships. What specific tech role interests you?",
    "For a career in tech, focus on developing both technical and soft skills. Technical skills vary by role (programming languages, data analysis, etc.), while soft skills like problem-solving and communication are universally valued. Would you like specific advice for frontend development or data science?",
    "Tech careers offer many paths. Start by exploring roles that match your interests and existing skills. Then acquire necessary technical skills through courses, bootcamps, or self-study. Building projects demonstrates your abilities to employers. Which tech area interests you most?"
  ],
  resume: [
    "To improve your resume: 1) Use a clean, professional template, 2) Include quantifiable achievements, 3) Tailor it to each job application, 4) Use action verbs, 5) Keep it concise (1-2 pages), and 6) Proofread carefully. Would you like more specific advice for your situation?",
    "For a standout resume, highlight relevant skills and achievements using metrics when possible. Customize each application to match job descriptions by using similar keywords. Include a concise professional summary and ensure consistent formatting throughout. Would you like resume tips specific to a particular industry?",
    "Effective resumes showcase your impact, not just responsibilities. Use strong action verbs and quantify results (e.g., 'Increased sales by 20%'). For technical roles, list relevant technologies and projects. Keep design clean and scannable with bullet points. Should I provide tips for a specific section of your resume?"
  ],
  frontend: [
    "For a frontend development resume: 1) Showcase your projects with links to live demos or GitHub, 2) List your tech stack (HTML, CSS, JavaScript, React, etc.), 3) Highlight responsive design skills, 4) Include any UI/UX knowledge, 5) Mention version control experience, and 6) Demonstrate problem-solving abilities with specific examples.",
    "Frontend developers should emphasize their portfolio in their resume. Include projects demonstrating your HTML/CSS/JavaScript skills, framework experience (React, Vue, Angular), and responsive design capabilities. Also highlight soft skills like collaboration and attention to detail.",
    "A strong frontend resume needs: technical skills section (HTML, CSS, JavaScript, frameworks), project portfolio with visual examples, version control experience, responsive design capabilities, and any performance optimization knowledge. Consider including a GitHub link and any UI/UX understanding."
  ],
  datascience: [
    "For a data science resume: 1) Highlight your technical skills (Python, R, SQL), 2) Showcase data analysis projects with measurable outcomes, 3) List relevant tools and libraries (Pandas, NumPy, TensorFlow), 4) Include statistical knowledge and machine learning experience, 5) Demonstrate communication skills for explaining complex findings, and 6) Add relevant certifications.",
    "Data science resumes should emphasize technical skills (programming languages, statistics, machine learning), projects with measurable impact, visualization abilities, domain knowledge, and communication skills. Include GitHub links to showcase your code and analysis methodology.",
    "Effective data science resumes balance technical expertise with business impact. Include your proficiency with tools (Python, R, SQL, visualization libraries), statistical methods, machine learning algorithms, and big data technologies. Highlight how your analyses led to actionable insights or business improvements."
  ],
  interview: [
    "For interview preparation: 1) Research the company thoroughly, 2) Practice common questions, 3) Prepare your own questions, 4) Use the STAR method for behavioral questions, 5) Dress professionally, and 6) Follow up with a thank-you note. Is there a specific type of interview you're preparing for?",
    "Interview success comes from preparation. Study the company and role, practice answering technical and behavioral questions, prepare examples of your achievements, and have thoughtful questions ready for the interviewer. Mock interviews with feedback can be especially helpful. What type of role are you interviewing for?",
    "To ace interviews: 1) Understand the company's products, culture, and challenges, 2) Review the job description to anticipate questions, 3) Prepare stories demonstrating your skills and experience, 4) Practice explaining complex concepts simply, and 5) Plan questions that show your interest and research. Would you like specific interview tips for a particular industry?"
  ],
  skills: [
    "To identify which skills to develop, consider: 1) Job postings in your target field, 2) Industry trends, 3) Informational interviews with professionals, and 4) Your existing transferable skills. What career path are you considering?",
    "Skill development should be strategic. Analyze job descriptions for your target roles, follow industry leaders and publications to spot trends, and assess your current strengths and gaps. Both technical and soft skills matter in most fields. Which career area are you focusing on?",
    "For career advancement, develop a mix of technical, soft, and industry-specific skills. Technical skills vary by field, soft skills like communication are universally valuable, and industry knowledge shows commitment. Regular skill audits help you stay relevant. What specific career are you interested in?"
  ],
  elaboration: [
    "For frontend development and data science careers, here are specific resume tips:\n\nFrontend Development:\n1) Showcase your portfolio with links to live projects\n2) List specific technologies (HTML5, CSS3, JavaScript, React/Angular/Vue)\n3) Highlight responsive design experience\n4) Include any UI/UX knowledge\n5) Mention performance optimization skills\n6) Add version control experience (Git)\n7) Describe collaborative development experience\n\nData Science:\n1) List programming languages (Python, R, SQL)\n2) Detail machine learning and statistical modeling experience\n3) Showcase data visualization skills\n4) Include experience with data processing tools\n5) Highlight domain knowledge in relevant industries\n6) Mention any published research or kaggle competitions\n7) Describe projects with measurable business impact\n\nFor both fields, tailor your resume to each job application by matching keywords from the job description.",
    "When combining frontend development and data science on your resume:\n\n1) Create a skills section organized by category:\n   - Programming: JavaScript, Python, HTML/CSS, SQL\n   - Frontend: React, responsive design, UI/UX principles\n   - Data: Machine learning, statistical analysis, data visualization\n   - Tools: Git, Jupyter, VS Code, Docker\n\n2) For projects, highlight those that combine both skills:\n   - Data visualization dashboards you've built\n   - Web applications with analytical components\n   - Interactive data exploration tools\n\n3) Emphasize your unique value as someone who can bridge technical data work with user-facing implementations\n\n4) Include metrics when possible (e.g., improved dashboard performance by 40%)",
    "For a resume targeting both frontend and data science roles:\n\n1) Create separate sections for each specialty or a combined technical skills section\n2) For frontend: emphasize JS frameworks, responsive design, and UI/UX principles\n3) For data science: highlight Python/R skills, statistical analysis, and machine learning\n4) Feature projects that demonstrate both skill sets, like interactive data visualizations\n5) Include GitHub links to showcase your code quality\n6) Mention any relevant certifications in either field\n7) Emphasize soft skills valued in both areas: problem-solving, attention to detail, and communication\n\nConsider having slightly different versions of your resume depending on which direction you're leaning for a specific application."
  ]
}

// Function to generate mock responses with context awareness
function getMockResponse(message: string, previousMessages: any[] = []): string {
  const lowerMessage = message.toLowerCase();
  let responseCategory = 'default';
  
  // Check for specific keywords to determine response category
  if (lowerMessage.includes("tech") || lowerMessage.includes("transition") || lowerMessage.includes("change career")) {
    responseCategory = 'tech';
  } else if (lowerMessage.includes("resume") || lowerMessage.includes("cv")) {
    // Check for more specific resume categories
    if (lowerMessage.includes("frontend") || lowerMessage.includes("front-end") || lowerMessage.includes("front end")) {
      responseCategory = 'frontend';
    } else if (lowerMessage.includes("data science") || lowerMessage.includes("datascience") || lowerMessage.includes("data analyst")) {
      responseCategory = 'datascience';
    } else {
      responseCategory = 'resume';
    }
  } else if (lowerMessage.includes("interview")) {
    responseCategory = 'interview';
  } else if (lowerMessage.includes("skill")) {
    responseCategory = 'skills';
  } else if (lowerMessage.includes("more") || lowerMessage.includes("elaborate") || lowerMessage.includes("detail")) {
    // Check previous messages for context to elaborate on
    const prevMessageContent = previousMessages.length > 0 ? 
      previousMessages[previousMessages.length - 1].content.toLowerCase() : '';
    
    if (prevMessageContent.includes("resume") && 
        (prevMessageContent.includes("frontend") || prevMessageContent.includes("data science"))) {
      responseCategory = 'elaboration';
    }
  }
  
  // Select a random response from the appropriate category
  const responses = MOCK_RESPONSES[responseCategory] || MOCK_RESPONSES.default;
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

export async function POST(req: Request) {
  try {
    console.log("Chat API called")
    
    // Parse the request body with error handling
    let userMessage = "";
    let previousMessages: any[] = [];
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
      
      // Get previous messages for context (excluding the last one which is the current user message)
      previousMessages = messages.length > 1 ? messages.slice(0, -1) : [];
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return new Response(
        JSON.stringify({ message: "There was an issue processing your message. Please try again." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    
    // Create conversation history array for API calls
    const conversationHistory = previousMessages.concat([{
      role: "user",
      content: userMessage
    }]);
    
    // First try to use the backend API
    const backendApiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://pathpilot-production-0aa5.up.railway.app';
    if (backendApiUrl) {
      try {
        console.log("Trying to use backend API at:", backendApiUrl);
        
        // Construct the correct endpoint URL - try both with and without /api prefix
        let apiEndpoint = `${backendApiUrl}/chat/message`;
        
        // If the URL already contains /api, don't add it again
        if (!backendApiUrl.includes('/api')) {
          apiEndpoint = `${backendApiUrl}/api/chat/message`;
        }
        
        console.log("API endpoint:", apiEndpoint);
        
        const backendResponse = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            message: userMessage,
            messages: conversationHistory,
            user_id: "frontend-user" // You can use a more specific ID if needed
          }),
          cache: 'no-store',
        });
        
        if (backendResponse.ok) {
          const data = await backendResponse.json();
          console.log("Backend API response:", data);
          
          // Handle different response formats
          const responseMessage = data.message || data.response || data.reply || data.answer || "No response from backend";
          
          return new Response(
            JSON.stringify({ message: responseMessage }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        } else {
          console.log("Backend API failed with status:", backendResponse.status);
          const errorText = await backendResponse.text();
          console.log("Response text:", errorText);
          
          // Try alternative endpoint if the first one failed
          try {
            const altEndpoint = apiEndpoint.includes('/api') 
              ? apiEndpoint.replace('/api', '') 
              : `${backendApiUrl}/api/chat/message`;
              
            console.log("Trying alternative endpoint:", altEndpoint);
            
            const altResponse = await fetch(altEndpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ 
                message: userMessage,
                user_id: "frontend-user"
              }),
              cache: 'no-store',
            });
            
            if (altResponse.ok) {
              const altData = await altResponse.json();
              console.log("Alternative endpoint response:", altData);
              
              // Handle different response formats
              const responseMessage = altData.message || altData.response || altData.reply || "No response from backend";
              
              return new Response(
                JSON.stringify({ message: responseMessage }),
                { status: 200, headers: { "Content-Type": "application/json" } }
              );
            } else {
              console.log("Alternative endpoint failed with status:", altResponse.status);
            }
          } catch (altError) {
            console.error("Alternative endpoint error:", altError);
          }
        }
      } catch (backendError) {
        console.error("Backend API error:", backendError);
        // Continue to fallback options
      }
    }
    
    // Check if OPENAI_API_KEY is set as fallback
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.log("OPENAI_API_KEY is not set, using mock response")
      // Return a mock response with context awareness
      return new Response(
        JSON.stringify({ 
          message: getMockResponse(userMessage, previousMessages)
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
      
      // Return a mock response as fallback with context awareness
      return new Response(
        JSON.stringify({ 
          message: getMockResponse(userMessage, previousMessages)
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
