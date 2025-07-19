FROM node:22-alpine AS frontend-base

# Install dependencies only when needed
FROM frontend-base AS frontend-deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@9.0.0

# Copy package.json and lock files for frontend
COPY frontend/package.json frontend/pnpm-lock.yaml ./frontend/
WORKDIR /app/frontend
RUN pnpm install --no-frozen-lockfile

# Build frontend
FROM frontend-base AS frontend-builder
WORKDIR /app

# Install pnpm globally in the builder stage
RUN npm install -g pnpm@9.0.0

# Copy frontend dependencies
COPY --from=frontend-deps /app/frontend/node_modules ./frontend/node_modules
COPY frontend ./frontend

# Build the frontend application
WORKDIR /app/frontend
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm run build

# Backend build
FROM python:3.11-slim AS backend
WORKDIR /app/backend

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --upgrade 'gunicorn>=20.1.0'

# Copy backend code
COPY backend .

# Final stage
FROM node:22-alpine
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@9.0.0

# Copy frontend build artifacts
COPY --from=frontend-builder /app/frontend/public ./frontend/public
COPY --from=frontend-builder /app/frontend/.next ./frontend/.next
COPY --from=frontend-builder /app/frontend/package.json ./frontend/
COPY --from=frontend-builder /app/frontend/node_modules ./frontend/node_modules

# Set environment variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copy root package.json
COPY package.json .

# Start the application
CMD ["pnpm", "start"] 