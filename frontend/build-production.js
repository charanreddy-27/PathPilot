#!/usr/bin/env node

/**
 * This script is used to build the frontend for production deployment.
 * It handles common issues that might occur during the build process.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes for better readability
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

const log = {
  info: (msg) => console.log(`${colors.cyan}${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`)
};

// Ensure we're in the frontend directory
const isFrontendDir = fs.existsSync('package.json') && fs.existsSync('next.config.mjs');
if (!isFrontendDir) {
  log.error('This script must be run from the frontend directory');
  process.exit(1);
}

log.title('PathPilot Frontend Production Build');

// Step 1: Clean previous build artifacts
log.info('Cleaning previous build artifacts...');
try {
  if (fs.existsSync('.next')) {
    execSync('pnpm run clean', { stdio: 'inherit' });
  }
  log.success('Cleaned previous build artifacts');
} catch (error) {
  log.warning('Could not clean previous build artifacts, continuing anyway');
}

// Step 2: Verify environment variables
log.info('Verifying environment variables...');
const requiredEnvVars = ['NEXT_PUBLIC_API_URL'];
const missingEnvVars = [];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar] && !fs.existsSync('.env') && !fs.existsSync('.env.local')) {
    missingEnvVars.push(envVar);
  }
});

if (missingEnvVars.length > 0) {
  log.warning(`Missing environment variables: ${missingEnvVars.join(', ')}`);
  log.info('Creating .env file with default values...');
  
  // Create a basic .env file with default values
  fs.writeFileSync('.env', 'NEXT_PUBLIC_API_URL=https://pathpilot-production-0aa5.up.railway.app\n');
  log.success('Created .env file with default values');
}

// Step 3: Install dependencies
log.info('Installing dependencies...');
try {
  execSync('pnpm install --no-frozen-lockfile', { stdio: 'inherit' });
  log.success('Installed dependencies');
} catch (error) {
  log.error('Failed to install dependencies');
  process.exit(1);
}

// Step 4: Build the application
log.info('Building the application...');
try {
  execSync('pnpm run build', { stdio: 'inherit' });
  log.success('Built the application');
} catch (error) {
  log.error('Failed to build the application');
  process.exit(1);
}

log.title('Build Completed Successfully');
log.info('The frontend is ready for deployment.'); 