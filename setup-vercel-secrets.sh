#!/bin/bash

# Setup script for Vercel deployment secrets
# This script helps set up the required secrets for GitHub Actions CI/CD

echo "Setting up Vercel deployment secrets for GitHub Actions"
echo "====================================================="

echo "Project Name: 8092.tr"
echo "Target: https://www.8092.tr"
echo ""

# Instructions for creating Vercel token
echo "Step 1: Create Vercel Token"
echo "---------------------------"
echo "1. Go to https://vercel.com/account/tokens"
echo "2. Click 'Create Token'"
echo "3. Name it 'GitHub Actions Deployment'"
echo "4. Copy the token"
echo ""

# Instructions for setting up GitHub secrets
echo "Step 2: Set up GitHub Repository Secrets"
echo "----------------------------------------"
echo "Go to your GitHub repository: https://github.com/GOAT-8092/website"
echo "Navigate to: Settings > Secrets and variables > Actions"
echo ""
echo "Add the following secret:"
echo "1. VERCEL_TOKEN: Your Vercel token from Step 1"
echo ""

# Alternative method using gh CLI
echo "Step 3: Alternative - Use GitHub CLI (gh)"
echo "----------------------------------------"
echo "If you have GitHub CLI installed, you can set the secret with:"
echo ""
echo "gh secret set VERCEL_TOKEN --body 'your-vercel-token-here'"
echo ""

echo "Setup complete! Your CI/CD pipeline will deploy to Vercel on every push to main branch."
echo "Make sure to configure the secrets in GitHub repository settings."
echo ""
echo "The workflow will deploy to your existing project: 8092.tr"