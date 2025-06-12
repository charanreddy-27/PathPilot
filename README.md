# PathPilot - AI Career Counselor

PathPilot is an AI-powered career counseling platform that helps users explore career paths, get personalized advice, and make informed decisions about their professional future.

## ✨ Features

- 🤖 AI-powered career guidance with intelligent responses
- 💬 Interactive chat interface with conversation history
- 🔒 Secure user authentication with JWT
- 📱 Responsive design with modern UI
- 🌐 Real-time messaging and notifications
- 📊 Career recommendations based on skills and interests
- 🔐 Protected routes and user sessions

## 🛠 Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Flask, Python 3.11, JWT Authentication
- **Database**: MongoDB with PyMongo
- **AI/ML**: Custom chat bot with keyword matching
- **Deployment**: Docker, Docker Compose
- **Authentication**: JWT with bcrypt password hashing

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)
- MongoDB (local or MongoDB Atlas)

## 🚀 Quick Start

### Option 1: Docker Deployment (Recommended)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/pathpilot.git
   cd pathpilot
   ```

2. **Set up environment variables**:
   ```bash
   # Create .env file in backend directory
   cp backend/.env.example backend/.env
   # Edit the .env file with your configuration
   ```

3. **Deploy with Docker**:
   ```bash
   # Make deploy script executable (Linux/Mac)
   chmod +x deploy.sh
   
   # Run deployment
   ./deploy.sh
   ```

4. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Option 2: Local Development

1. **Backend Setup**:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   
   # Set environment variables
   export FLASK_APP=app
   export FLASK_ENV=development
   export SECRET_KEY=your-secret-key
   export MONGO_URI=mongodb://localhost:27017/pathpilot
   
   # Start backend
   flask run
   ```

2. **Frontend Setup**:
   ```bash
   cd frontend
   npm install --legacy-peer-deps
   
   # Set environment variables
   export NEXT_PUBLIC_API_URL=http://localhost:5000/api
   
   # Start frontend
   npm run dev
   ```

3. **Database Setup**:
   - Install MongoDB locally, or
   - Use MongoDB Atlas (free tier available)

## 🔧 Configuration

### Environment Variables

**Backend (.env)**:
```env
FLASK_APP=app
FLASK_ENV=production
SECRET_KEY=your-secret-key-here
MONGO_URI=mongodb://localhost:27017/pathpilot
JWT_SECRET_KEY=your-jwt-secret-key-here
CORS_ORIGINS=http://localhost:3000
API_PREFIX=/api
```

**Frontend (.env.local)**:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📁 Project Structure

```
pathpilot/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   ├── contexts/            # React contexts (Auth)
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility libraries
│   ├── middleware.ts        # Route protection
│   └── public/              # Static files
├── backend/                 # Flask backend application
│   ├── app/                # Application package
│   │   ├── routes/         # API routes
│   │   ├── models/         # Data models
│   │   ├── utils/          # Utility functions
│   │   └── __init__.py     # App factory
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile          # Backend container
├── docker-compose.yml      # Multi-container setup
└── README.md              # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Chat
- `POST /api/chat` - Send a message to the chatbot
- `GET /api/chat/history` - Get chat history

### Career Recommendations
- `POST /api/career-recommendations` - Get career recommendations

### Health Check
- `GET /api/health` - API health status

## 🚀 Deployment Options

### 1. Vercel (Frontend) + Railway (Backend)

**Frontend (Vercel)**:
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

**Backend (Railway)**:
1. Create new project on Railway
2. Connect your GitHub repository
3. Set environment variables
4. Deploy automatically

### 2. Docker Deployment

```bash
# Production deployment
docker-compose -f docker-compose.yml up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 3. Manual Deployment

**Frontend**:
```bash
cd frontend
npm run build
npm start
```

**Backend**:
```bash
cd backend
pip install -r requirements.txt
gunicorn --bind 0.0.0.0:5000 app:create_app()
```

## 🧪 Testing

1. **Register a new account** at http://localhost:3000/register
2. **Login** with your credentials
3. **Test the chat interface** by sending messages
4. **Verify protected routes** work correctly
5. **Check responsive design** on different screen sizes

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API endpoints
- CORS configuration
- Rate limiting
- Input validation
- Error handling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Flask team for the robust backend framework
- MongoDB team for the excellent database
- All contributors who have helped shape this project

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/yourusername/pathpilot/issues) page
2. Create a new issue with detailed information
3. Contact the development team

---

**Made with ❤️ by the PathPilot Team**