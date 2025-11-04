#!/bin/bash

# Vercel Environment Variable Setup Script for Team Portal
# This script automates the process of setting up PUBLIC_PORTAL_PASS on Vercel

set -e

echo "========================================"
echo "Vercel Portal Environment Setup"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}Error: Vercel CLI is not installed${NC}"
    echo "Install it with: npm install -g vercel"
    exit 1
fi

echo -e "${GREEN}✓${NC} Vercel CLI found"
echo ""

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}⚠${NC} Not logged in to Vercel"
    echo "Please login first:"
    echo ""
    vercel login
    echo ""
fi

# Verify login
if ! vercel whoami &> /dev/null; then
    echo -e "${RED}✗${NC} Vercel login failed"
    exit 1
fi

echo -e "${GREEN}✓${NC} Logged in as: $(vercel whoami)"
echo ""

# Link project if not linked
if [ ! -d ".vercel" ]; then
    echo -e "${YELLOW}⚠${NC} Project not linked to Vercel"
    echo "Linking project..."
    vercel link --yes
    echo ""
fi

echo -e "${GREEN}✓${NC} Project linked"
echo ""

# Get password from .env
if [ -f ".env" ]; then
    source .env
    if [ -z "$PUBLIC_PORTAL_PASS" ]; then
        echo -e "${RED}✗${NC} PUBLIC_PORTAL_PASS not found in .env file"
        echo "Please set it in .env first"
        exit 1
    fi
    PASSWORD=$PUBLIC_PORTAL_PASS
else
    echo -e "${RED}✗${NC} .env file not found"
    echo "Please create .env file with PUBLIC_PORTAL_PASS"
    exit 1
fi

echo -e "${GREEN}✓${NC} Password found in .env: $PASSWORD"
echo ""

# Ask for confirmation
echo "This will set PUBLIC_PORTAL_PASS='$PASSWORD' on Vercel"
echo "for Production, Preview, and Development environments."
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled"
    exit 0
fi

echo ""
echo "Setting up environment variable on Vercel..."
echo ""

# Remove old variable if it exists
echo "Checking for existing PORTAL_PASS variable..."
if vercel env ls 2>&1 | grep -q "PORTAL_PASS"; then
    echo -e "${YELLOW}⚠${NC} Found old PORTAL_PASS variable. Removing..."
    vercel env rm PORTAL_PASS production --yes || true
    vercel env rm PORTAL_PASS preview --yes || true
    vercel env rm PORTAL_PASS development --yes || true
fi

# Add the new variable
echo "Adding PUBLIC_PORTAL_PASS..."

# Add to production
echo "$PASSWORD" | vercel env add PUBLIC_PORTAL_PASS production

# Add to preview
echo "$PASSWORD" | vercel env add PUBLIC_PORTAL_PASS preview

# Add to development
echo "$PASSWORD" | vercel env add PUBLIC_PORTAL_PASS development

echo ""
echo -e "${GREEN}✓${NC} Environment variable set successfully!"
echo ""

# Verify
echo "Verifying environment variables..."
echo ""
vercel env ls | grep "PUBLIC_PORTAL_PASS" || echo -e "${YELLOW}⚠${NC} Variable not found in list"

echo ""
echo "========================================"
echo "Next Steps:"
echo "========================================"
echo ""
echo "1. Deploy to production:"
echo "   vercel --prod"
echo ""
echo "2. Or push to main to trigger GitHub Actions:"
echo "   git push origin main"
echo ""
echo "3. Test the portal:"
echo "   https://www.8092.tr/portal"
echo ""
echo "4. Or run automated tests:"
echo "   npm run test:production"
echo ""
echo -e "${GREEN}Setup complete!${NC}"
