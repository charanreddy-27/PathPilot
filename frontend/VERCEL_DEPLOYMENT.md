# Deploying PathPilot Frontend to Vercel

This guide provides instructions for deploying the PathPilot frontend to Vercel.

## Prerequisites

- A GitHub account
- A Vercel account (you can sign up at [vercel.com](https://vercel.com) using your GitHub account)
- Your OpenAI API key for the chat functionality

## Deployment Steps

### 1. Push Your Code to GitHub

Make sure your code is pushed to a GitHub repository.

### 2. Connect to Vercel

1. Log in to your Vercel account
2. Click on "Add New" → "Project"
3. Import your GitHub repository
4. Select the PathPilot repository

### 3. Configure Project Settings

1. Vercel will automatically detect your Next.js project
2. Set the following configuration:
   - **Framework Preset**: Next.js (should be auto-detected)
   - **Root Directory**: `frontend` (since your Next.js app is in the frontend folder)
   - **Build Command**: Leave as default (Vercel will use the build command from your package.json)
   - **Output Directory**: Leave as default (.next)

### 4. Configure Environment Variables

1. Click on "Environment Variables" section
2. Add the following variables:
   - **NEXT_PUBLIC_API_URL**: 
     - Use `https://pathpilot-production-0aa5.up.railway.app` (the deployed backend URL)
   - **OPENAI_API_KEY**: Your OpenAI API key for the chat functionality

### 5. Deploy

1. Click on "Deploy"
2. Vercel will build and deploy your application
3. Once deployment is complete, Vercel will provide you with a URL to access your application

## Post-Deployment

### Testing Your Frontend

1. Visit the provided URL to ensure your application is working correctly
2. Test the chat functionality (which should work since it uses OpenAI directly)
3. Note any features that require the backend and are not functioning

### Backend Connection

The backend is already deployed at `https://pathpilot-production-0aa5.up.railway.app`. The frontend is configured to connect to this backend URL.

## Important Notes

- The chat functionality will work independently as it uses OpenAI directly
- All features requiring backend data should now work as the backend is deployed and connected
- Never commit your API keys to your repository
- If you encounter any issues with the backend connection, verify that the backend is running at `https://pathpilot-production-0aa5.up.railway.app`

## Troubleshooting Deployment Issues

### pnpm Version Compatibility

If you encounter issues with pnpm version compatibility:

1. The project is configured to use pnpm v9.0.0 via the `packageManager` field in package.json
2. Vercel's build process is configured to use this version via the `installCommand` in vercel.json
3. If you still encounter issues, you can manually set the pnpm version in Vercel's project settings

### Node.js Version

The project is configured to use Node.js v18 via the `.nvmrc` and `.node-version` files. This version is compatible with Next.js 15 and React 19.

### Dependency Issues

If you encounter dependency issues:

1. The project uses the `--legacy-peer-deps` flag to handle peer dependency conflicts
2. The `.npmrc` file is configured to use `legacy-peer-deps=true` and other settings to help with dependency resolution
3. If you still encounter issues, you may need to downgrade React to v18 for better compatibility