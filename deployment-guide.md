# 🚀 PathPilot Deployment Guide

## Overview
This guide will help you deploy PathPilot to production using Vercel (frontend) and Railway (backend).

## Prerequisites
- GitHub account
- Vercel account (free at vercel.com)
- Railway account (free at railway.app)
- MongoDB Atlas account (free at mongodb.com)

## Step 1: Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com](https://mongodb.com)
   - Sign up for a free account
   - Create a new cluster (free tier)

2. **Configure Database**
   - Create a database named `pathpilot`
   - Create a database user with read/write permissions
   - Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/pathpilot`)

## Step 2: Backend Deployment (Railway)

1. **Prepare Backend**
   ```bash
   # Ensure all files are committed to Git
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy to Railway**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your PathPilot repository
   - Set the root directory to `backend`

3. **Configure Environment Variables**
   In Railway dashboard, add these environment variables:
   ```
   FLASK_APP=app:create_app()
   FLASK_ENV=production
   SECRET_KEY=your-super-secret-key-here
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pathpilot
   CORS_ORIGINS=https://your-frontend-domain.vercel.app
   ```

4. **Deploy**
   - Railway will automatically detect the Python app
   - It will install dependencies from `requirements.txt`
   - The app will be available at `https://your-app-name.railway.app`

## Step 3: Frontend Deployment (Vercel)

1. **Update API URL**
   - Edit `frontend/env.production`
   - Replace `your-backend-url.railway.app` with your actual Railway URL

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project" → "Import Git Repository"
   - Select your PathPilot repository
   - Set the root directory to `frontend`
   - Add environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app`

3. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be available at `https://your-app-name.vercel.app`

## Step 4: Domain Setup (Optional)

1. **Custom Domain**
   - In Vercel: Go to your project → Settings → Domains
   - Add your custom domain
   - Update CORS_ORIGINS in Railway with your custom domain

## Step 5: Testing Production

1. **Test All Features**
   - Visit your deployed frontend URL
   - Test user registration and login
   - Test chat functionality
   - Test career recommendations
   - Verify all pages load correctly

2. **Monitor Logs**
   - Railway: View logs in the dashboard
   - Vercel: View logs in the dashboard

## Alternative Deployment Options

### Option 2: Heroku
- Frontend: Deploy to Heroku with buildpack
- Backend: Deploy to Heroku with Python buildpack
- Database: Use Heroku Postgres or MongoDB Atlas

### Option 3: DigitalOcean App Platform
- Deploy both frontend and backend to DigitalOcean
- Use managed MongoDB or external MongoDB Atlas

### Option 4: AWS/GCP/Azure
- Use containerized deployment with Docker
- Deploy to ECS, GKE, or AKS
- Use managed database services

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure CORS_ORIGINS includes your frontend domain
2. **Database Connection**: Verify MONGO_URI is correct
3. **Build Failures**: Check requirements.txt and package.json
4. **Environment Variables**: Ensure all variables are set correctly

### Support:
- Check Railway and Vercel documentation
- Review application logs for errors
- Test locally with production environment variables

## Security Considerations

1. **Environment Variables**: Never commit secrets to Git
2. **HTTPS**: Both Vercel and Railway provide HTTPS by default
3. **Rate Limiting**: Already configured in the backend
4. **Input Validation**: Already implemented
5. **JWT Security**: Tokens expire automatically

## Monitoring and Maintenance

1. **Health Checks**: Monitor `/api/health` endpoint
2. **Error Logging**: Check Railway and Vercel logs
3. **Performance**: Monitor response times
4. **Updates**: Keep dependencies updated

## Cost Estimation

- **Vercel**: Free tier (unlimited personal projects)
- **Railway**: Free tier (limited usage)
- **MongoDB Atlas**: Free tier (512MB storage)
- **Total**: $0/month for basic usage

---

🎉 **Congratulations! Your PathPilot application is now deployed and ready for users!** 