#!/bin/bash

# Portal Authentication Debug Script
# This script helps debug login issues on both local and production environments

echo "=========================================="
echo "Team 8092 Portal Authentication Debugger"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env exists
if [ -f .env ]; then
    echo -e "${GREEN}✓${NC} Found .env file"
    source .env
    echo "  Local password: $PUBLIC_PORTAL_PASS"
else
    echo -e "${RED}✗${NC} .env file not found"
    exit 1
fi

echo ""
echo "=========================================="
echo "Step 1: Testing Local Development"
echo "=========================================="

# Run local tests
echo "Running Playwright tests locally..."
npm run test:portal

echo ""
echo "=========================================="
echo "Step 2: Checking Vercel Environment"
echo "=========================================="

# Check if logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}!${NC} Not logged in to Vercel"
    echo "Please run: vercel login"
    echo ""
else
    echo -e "${GREEN}✓${NC} Logged in to Vercel"
    echo "User: $(vercel whoami)"
    echo ""

    # Get Vercel environment variables
    echo "Fetching Vercel environment variables..."
    vercel env ls

    echo ""
    echo "To check PORTAL_PASS value on Vercel:"
    echo "  vercel env pull .env.vercel"
    echo ""
fi

echo ""
echo "=========================================="
echo "Step 3: Testing Production"
echo "=========================================="

read -p "Do you want to test production deployment? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Running tests against production..."
    npm run test:production
fi

echo ""
echo "=========================================="
echo "Debug Complete"
echo "=========================================="
echo ""
echo "If login fails on production:"
echo "1. Check that PORTAL_PASS is set in Vercel: https://vercel.com/dashboard"
echo "2. Verify the password matches your .env file"
echo "3. Redeploy after setting environment variables"
echo ""
echo "Useful commands:"
echo "  vercel env add PUBLIC_PORTAL_PASS        - Add/update password"
echo "  vercel env pull                          - Pull current env vars"
echo "  vercel --prod                            - Deploy to production"
echo ""
echo "Note: The environment variable must be named PUBLIC_PORTAL_PASS (not PORTAL_PASS)"
echo "      This is required for Astro to expose it to client-side code."
