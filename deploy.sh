#!/bin/bash

# PathPilot Deployment Script
# This script handles deployment for both development and production environments

set -e  # Exit on any error

echo "🚀 PathPilot Deployment Script"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_success "Docker and Docker Compose are installed"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_warning "Node.js is not installed. Frontend development will not be available."
        return 1
    fi
    
    print_success "Node.js is installed"
    return 0
}

# Check if Python is installed
check_python() {
    if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
        print_warning "Python is not installed. Backend development will not be available."
        return 1
    fi
    
    print_success "Python is installed"
    return 0
}

# Setup environment variables
setup_env() {
    print_status "Setting up environment variables..."
    
    # Backend environment
    if [ ! -f "backend/.env" ]; then
        cat > backend/.env << EOF
FLASK_APP=app:create_app()
FLASK_ENV=production
SECRET_KEY=pathpilot-secret-key-$(date +%s)
MONGO_URI=mongodb://localhost:27017/pathpilot
JWT_SECRET_KEY=pathpilot-jwt-secret-$(date +%s)
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
API_PREFIX=/api
EOF
        print_success "Created backend/.env file"
    else
        print_status "Backend .env file already exists"
    fi
    
    # Frontend environment
    if [ ! -f "frontend/.env.local" ]; then
        cat > frontend/.env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:5000/api
EOF
        print_success "Created frontend/.env.local file"
    else
        print_status "Frontend .env.local file already exists"
    fi
}

# Build and start with Docker
deploy_docker() {
    print_status "Deploying with Docker..."
    
    # Stop existing containers
    print_status "Stopping existing containers..."
    docker-compose down 2>/dev/null || true
    
    # Build and start containers
    print_status "Building and starting containers..."
    docker-compose up --build -d
    
    print_success "Docker deployment completed!"
    print_status "Frontend: http://localhost:3000"
    print_status "Backend API: http://localhost:5000"
    print_status "View logs: docker-compose logs -f"
}

# Setup development environment
setup_dev() {
    print_status "Setting up development environment..."
    
    # Backend setup
    if [ -d "backend" ]; then
        print_status "Setting up backend..."
        cd backend
        
        # Create virtual environment
        if [ ! -d "venv" ]; then
            python3 -m venv venv 2>/dev/null || python -m venv venv
            print_success "Created Python virtual environment"
        fi
        
        # Activate virtual environment and install dependencies
        source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null
        pip install -r requirements.txt
        print_success "Backend dependencies installed"
        
        cd ..
    fi
    
    # Frontend setup
    if [ -d "frontend" ]; then
        print_status "Setting up frontend..."
        cd frontend
        
        # Install dependencies
        npm install --legacy-peer-deps
        print_success "Frontend dependencies installed"
        
        cd ..
    fi
}

# Start development servers
start_dev() {
    print_status "Starting development servers..."
    
    # Start backend in background
    if [ -d "backend" ]; then
        print_status "Starting backend server..."
        cd backend
        source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null
        export FLASK_APP=app:create_app()
        export FLASK_ENV=development
        export SECRET_KEY=dev-secret-key
        export MONGO_URI=mongodb://localhost:27017/pathpilot
        export CORS_ORIGINS=http://localhost:3000,http://localhost:3001
        flask run &
        BACKEND_PID=$!
        cd ..
        print_success "Backend started on http://localhost:5000"
    fi
    
    # Start frontend in background
    if [ -d "frontend" ]; then
        print_status "Starting frontend server..."
        cd frontend
        npm run dev &
        FRONTEND_PID=$!
        cd ..
        print_success "Frontend started on http://localhost:3000"
    fi
    
    print_success "Development servers started!"
    print_status "Press Ctrl+C to stop all servers"
    
    # Wait for user to stop
    trap "cleanup_dev" INT
    wait
}

# Cleanup development servers
cleanup_dev() {
    print_status "Stopping development servers..."
    
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
    fi
    
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
    fi
    
    print_success "Development servers stopped"
    exit 0
}

# Health check
health_check() {
    print_status "Performing health check..."
    
    # Check backend
    if curl -s http://localhost:5000/api/health > /dev/null; then
        print_success "Backend is healthy"
    else
        print_error "Backend health check failed"
        return 1
    fi
    
    # Check frontend
    if curl -s http://localhost:3000 > /dev/null; then
        print_success "Frontend is healthy"
    else
        print_warning "Frontend health check failed (might be starting up)"
    fi
    
    print_success "Health check completed"
}

# Main deployment function
main() {
    local mode=${1:-docker}
    
    case $mode in
        "docker")
            check_docker
            setup_env
            deploy_docker
            sleep 10
            health_check
            ;;
        "dev")
            check_node
            check_python
            setup_env
            setup_dev
            start_dev
            ;;
        "setup")
            check_node
            check_python
            setup_env
            setup_dev
            print_success "Development environment setup completed!"
            ;;
        "health")
            health_check
            ;;
        *)
            echo "Usage: $0 [docker|dev|setup|health]"
            echo "  docker  - Deploy with Docker (default)"
            echo "  dev     - Start development servers"
            echo "  setup   - Setup development environment only"
            echo "  health  - Perform health check"
            exit 1
            ;;
    esac
}

# Run main function with arguments
main "$@" 