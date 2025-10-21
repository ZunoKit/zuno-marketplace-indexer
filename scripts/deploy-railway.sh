#!/bin/bash

# Railway Deployment Script
# This script helps deploy the Zuno Marketplace Indexer to Railway

set -e  # Exit on error

echo "🚀 Zuno Marketplace Indexer - Railway Deployment"
echo "=================================================="
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found!"
    echo "📦 Install it with: npm install -g @railway/cli"
    echo "🔗 Or visit: https://docs.railway.app/develop/cli"
    exit 1
fi

echo "✅ Railway CLI found"
echo ""

# Check if logged in
if ! railway whoami &> /dev/null; then
    echo "🔐 Please login to Railway..."
    railway login
fi

echo "✅ Logged in to Railway"
echo ""

# Check environment
if [ -z "$RAILWAY_ENVIRONMENT" ]; then
    echo "📋 Available environments:"
    railway environment
    echo ""
    read -p "Enter environment name (or press Enter for 'production'): " env_name
    env_name=${env_name:-production}
else
    env_name=$RAILWAY_ENVIRONMENT
fi

echo "🎯 Deploying to environment: $env_name"
echo ""

# Confirm deployment
read -p "⚠️  This will deploy to Railway. Continue? (y/N): " confirm
if [[ ! $confirm =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled"
    exit 0
fi

echo ""
echo "📦 Building project..."
pnpm install
pnpm typecheck

echo ""
echo "🚀 Deploying to Railway..."
railway up --environment $env_name

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📊 View logs:"
echo "   railway logs --environment $env_name"
echo ""
echo "🌐 Open dashboard:"
echo "   railway open --environment $env_name"
echo ""
