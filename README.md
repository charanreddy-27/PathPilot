# PathPilot - AI Career Counselor

PathPilot is an AI-powered career counseling platform that helps users explore career paths, get personalized advice, and make informed decisions about their professional future.

## Features

- 🤖 AI-powered career guidance
- 💬 Interactive chat interface
- 🔒 Secure user authentication
- 📱 Responsive design
- 🌐 Modern web interface

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Flask, Python
- **Database**: MongoDB
- **AI/ML**: Rasa for conversational AI
- **Authentication**: JWT
- **Deployment**: Docker, Docker Compose

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)
- MongoDB (for local development)

## Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pathpilot.git
   cd pathpilot
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..

   # Install backend dependencies
   cd backend
   pip install -r requirements.txt
   cd ..

   # Install Rasa dependencies
   cd rasa_bot
   pip install -r requirements.txt
   cd ..
   ```

3. Set up environment variables:
   - Create `.env` files in both frontend and backend directories
   - Use the provided `.env.example` files as templates

4. Start the development servers:
   ```bash
   # Start frontend
   cd frontend
   npm run dev

   # Start backend (in a new terminal)
   cd backend
   flask run

   # Start Rasa (in a new terminal)
   cd rasa_bot
   rasa run --enable-api --cors "*"
   ```

### Docker Deployment

1. Build and start all services:
   ```bash
   docker-compose up --build
   ```

2. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Rasa API: http://localhost:5005

## Project Structure

```
pathpilot/
├── frontend/               # Next.js frontend application
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   ├── contexts/          # React contexts
│   └── public/            # Static files
├── backend/               # Flask backend application
│   ├── app/              # Application package
│   │   ├── routes/       # API routes
│   │   ├── models/       # Data models
│   │   └── utils/        # Utility functions
│   └── requirements.txt   # Python dependencies
├── rasa_bot/             # Rasa chatbot
│   ├── data/             # Training data
│   └── models/           # Trained models
└── docker-compose.yml    # Docker composition
```

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Chat Endpoints

- `POST /api/chat` - Send a message to the chatbot
- `GET /api/chat/history` - Get chat history

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Deployment

### Vercel (Frontend)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy

### Railway/Heroku (Backend)

1. Create a new project
2. Connect your GitHub repository
3. Configure environment variables
4. Deploy

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Flask team for the robust backend framework
- Rasa team for the conversational AI framework
- All contributors who have helped shape this project