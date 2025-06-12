#!/bin/bash

echo "🚀 Starting PathPilot Deployment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Build and start services
echo "📦 Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check if services are running
echo "🔍 Checking service status..."

# Check frontend
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Frontend is running at http://localhost:3000"
else
    echo "❌ Frontend is not responding"
fi

# Check backend
if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "✅ Backend is running at http://localhost:5000"
else
    echo "❌ Backend is not responding"
fi

echo "🎉 Deployment complete!"
echo ""
echo "📱 Access your application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5000"
echo ""
echo "📋 Useful commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart services: docker-compose restart" 