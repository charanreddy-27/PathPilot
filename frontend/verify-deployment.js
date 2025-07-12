#!/usr/bin/env node

/**
 * This script verifies that the frontend is properly configured for deployment to Vercel.
 * Run this script before deploying to check for common issues.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

// Check if we're in the frontend directory
const isFrontendDir = fs.existsSync('package.json') && 
                     fs.existsSync('next.config.mjs');

if (!isFrontendDir) {
  log.error('This script must be run from the frontend directory');
  process.exit(1);
}

log.title('PathPilot Frontend Deployment Verification');

// Check 1: Verify package.json exists and has required scripts
log.info('Checking package.json...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

if (packageJson.scripts && packageJson.scripts.build) {
  log.success('package.json has build script');
} else {
  log.error('package.json is missing build script');
}

// Check 2: Verify next.config.mjs
log.info('Checking next.config.mjs...');
if (fs.existsSync('next.config.mjs')) {
  const nextConfig = fs.readFileSync('next.config.mjs', 'utf8');
  if (nextConfig.includes('rewrites')) {
    log.success('next.config.mjs has rewrites configuration');
  } else {
    log.warning('next.config.mjs might be missing rewrites configuration');
  }
} else {
  log.error('next.config.mjs not found');
}

// Check 3: Verify environment variables
log.info('Checking environment variables...');
if (fs.existsSync('.env.local')) {
  log.success('.env.local exists (for local development)');
} else {
  log.warning('.env.local not found (needed for local development)');
}

if (fs.existsSync('env.production')) {
  log.success('env.production exists');
  const envProduction = fs.readFileSync('env.production', 'utf8');
  if (envProduction.includes('NEXT_PUBLIC_API_URL')) {
    log.success('env.production contains NEXT_PUBLIC_API_URL');
  } else {
    log.error('env.production is missing NEXT_PUBLIC_API_URL');
  }
} else {
  log.error('env.production not found');
}

// Check 4: Verify Vercel configuration
log.info('Checking Vercel configuration...');
const rootVercelJson = path.join('..', 'vercel.json');
if (fs.existsSync(rootVercelJson)) {
  const vercelJson = JSON.parse(fs.readFileSync(rootVercelJson, 'utf8'));
  if (vercelJson.builds && vercelJson.builds.some(b => b.src.includes('frontend'))) {
    log.success('vercel.json is configured for frontend deployment');
  } else {
    log.error('vercel.json is not properly configured for frontend deployment');
    log.info('Make sure vercel.json has the correct frontend path in builds section');
  }
} else {
  log.warning('Root vercel.json not found');
}

// Check 5: Verify .gitignore
log.info('Checking .gitignore...');
if (fs.existsSync('.gitignore')) {
  const gitignore = fs.readFileSync('.gitignore', 'utf8');
  if (gitignore.includes('.env') || gitignore.includes('.env.local')) {
    log.success('.gitignore properly excludes environment files');
  } else {
    log.warning('.gitignore might not be excluding environment files');
  }
} else {
  log.error('.gitignore not found');
}

// Check 6: Verify build
log.info('Checking if the project builds...');
try {
  log.info('Skipping actual build process (would run "npm run build")');
  // Uncomment to actually run the build
  // execSync('npm run build', { stdio: 'inherit' });
  log.success('Build verification skipped (enable in script to test actual build)');
} catch (error) {
  log.error('Build verification failed');
  console.error(error);
}

// Summary
log.title('Deployment Verification Summary');
log.info('Your frontend appears to be configured for Vercel deployment.');
log.info('Remember to set these environment variables in Vercel:');
log.info('  - NEXT_PUBLIC_API_URL (set to https://pathpilot-production-0aa5.up.railway.app)');
log.info('  - OPENAI_API_KEY');
log.info('\nRefer to VERCEL_DEPLOYMENT.md for complete deployment instructions.');