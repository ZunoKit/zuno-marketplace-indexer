#!/bin/bash

# Railway Environment Variables Setup Script
# Helps you set all required environment variables on Railway

set -e

echo "🔧 Railway Environment Variables Setup"
echo "======================================"
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found!"
    echo "📦 Install it: npm install -g @railway/cli"
    exit 1
fi

# Check if logged in
if ! railway whoami &> /dev/null; then
    echo "🔐 Please login to Railway..."
    railway login
fi

echo "✅ Connected to Railway"
echo ""

# Function to set variable
set_var() {
    local key=$1
    local description=$2
    local default=$3

    echo "📌 $description"
    if [ -n "$default" ]; then
        read -p "   $key [$default]: " value
        value=${value:-$default}
    else
        read -p "   $key (required): " value
        while [ -z "$value" ]; do
            echo "   ⚠️  This variable is required!"
            read -p "   $key: " value
        done
    fi

    railway variables set "$key=$value"
    echo "   ✅ Set $key"
    echo ""
}

echo "🎯 Core Configuration"
echo "--------------------"

set_var "NODE_ENV" "Node environment" "production"
set_var "ZUNO_API_URL" "Zuno API base URL" "https://zuno-marketplace-abis.vercel.app/api"
set_var "ZUNO_API_KEY" "Zuno API key" ""

echo ""
echo "🌐 RPC Endpoints"
echo "----------------"
echo "ℹ️  Enter RPC URLs for chains you want to index"
echo "   Skip (press Enter) for chains you don't need"
echo ""

# Ethereum Mainnet
read -p "🔗 Ethereum Mainnet RPC (Chain 1) [skip]: " eth_rpc
[ -n "$eth_rpc" ] && railway variables set "PONDER_RPC_URL_1=$eth_rpc"

# Polygon
read -p "🔗 Polygon RPC (Chain 137) [skip]: " polygon_rpc
[ -n "$polygon_rpc" ] && railway variables set "PONDER_RPC_URL_137=$polygon_rpc"

# Base
read -p "🔗 Base RPC (Chain 8453) [skip]: " base_rpc
[ -n "$base_rpc" ] && railway variables set "PONDER_RPC_URL_8453=$base_rpc"

# Optimism
read -p "🔗 Optimism RPC (Chain 10) [skip]: " op_rpc
[ -n "$op_rpc" ] && railway variables set "PONDER_RPC_URL_10=$op_rpc"

# Arbitrum
read -p "🔗 Arbitrum RPC (Chain 42161) [skip]: " arb_rpc
[ -n "$arb_rpc" ] && railway variables set "PONDER_RPC_URL_42161=$arb_rpc"

echo ""
echo "⚙️  Optional Settings"
echo "--------------------"

set_var "VERBOSE_LOGGING" "Enable verbose logging" "false"
set_var "ENABLE_METRICS" "Enable metrics tracking" "true"

echo ""
echo "✅ Environment variables configured!"
echo ""
echo "📋 View all variables:"
echo "   railway variables"
echo ""
echo "🚀 Ready to deploy:"
echo "   railway up"
echo ""
