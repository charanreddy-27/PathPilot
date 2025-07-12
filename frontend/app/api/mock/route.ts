// Mock API route for frontend-only deployment
// This file provides mock responses when the backend is not available

export async function GET(request: Request) {
  // Extract the path from the request URL
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/mock', '');
  
  // Mock data for different endpoints
  const mockData: Record<string, any> = {
    '/user': {
      id: 'mock-user-id',
      name: 'Demo User',
      email: 'demo@example.com',
      profileComplete: true
    },
    '/careers': [
      { id: '1', title: 'Software Engineer', description: 'Develops software applications' },
      { id: '2', title: 'Data Scientist', description: 'Analyzes and interprets complex data' },
      { id: '3', title: 'UX Designer', description: 'Creates user-friendly interfaces' },
      { id: '4', title: 'Product Manager', description: 'Oversees product development' },
      { id: '5', title: 'DevOps Engineer', description: 'Manages deployment infrastructure' }
    ],
    '/skills': [
      { id: '1', name: 'JavaScript', category: 'Programming' },
      { id: '2', name: 'Python', category: 'Programming' },
      { id: '3', name: 'UI/UX Design', category: 'Design' },
      { id: '4', name: 'Data Analysis', category: 'Analytics' },
      { id: '5', name: 'Project Management', category: 'Management' }
    ]
  };
  
  // Default response for unknown endpoints
  const defaultResponse = { message: 'This is a mock API response for frontend-only deployment' };
  
  // Return mock data or default response
  return new Response(
    JSON.stringify(mockData[path] || defaultResponse),
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    }
  );
}

export async function POST(request: Request) {
  // For POST requests, we'll return a success response
  // In a real implementation, you would parse the request body and respond accordingly
  
  return new Response(
    JSON.stringify({ success: true, message: 'Mock POST request successful' }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    }
  );
}

export async function OPTIONS() {
  // Handle CORS preflight requests
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}