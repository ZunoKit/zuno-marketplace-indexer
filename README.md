# Zuno Marketplace Indexer

<div align="center">

**🚀 Enterprise-grade blockchain event indexer for Zuno NFT Marketplace**

[![Built with Ponder](https://img.shields.io/badge/Built%20with-Ponder-blue)](https://ponder.sh)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

_Production-ready, scalable indexer with real-time GraphQL and REST APIs_

</div>

## 🌟 Overview

A high-performance blockchain event indexer that tracks and indexes all Zuno NFT Marketplace events across multiple chains. Built with clean architecture principles, featuring automatic configuration generation from the Zuno Marketplace ABIs API.

## 🎯 Key Features

### Core Features
- ✅ **Multi-chain Support** - Indexes events across multiple EVM chains (Ethereum, Polygon, Base, Optimism, Arbitrum & more)
- ✅ **Real-time Indexing** - Tracks all marketplace events in real-time with block reorganization handling
- ✅ **Dynamic Configuration** - Automatically fetches and generates contract ABIs and configurations from Zuno API
- ✅ **PGlite Database** - Built-in high-performance embedded PostgreSQL database (no external DB required)

### Architecture & Code Quality
- ✅ **Clean Architecture** - Follows hexagonal architecture with clear separation of concerns
- ✅ **Design Patterns** - Implements Repository, Singleton, Builder, Factory, Strategy patterns
- ✅ **Error Handling** - Comprehensive error handling with retry logic (3 attempts)
- ✅ **Event Logging** - Detailed event tracking and processing logs
- ✅ **Metrics & Monitoring** - Built-in metrics tracking for performance monitoring
- ✅ **Type Safety** - Full TypeScript with strict typing throughout

### API & Integration
- ✅ **GraphQL API** - Flexible querying with built-in GraphQL endpoint
- ✅ **REST API** - RESTful endpoints for collections, tokens, trades, accounts, and stats
- ✅ **Hono Framework** - High-performance API server with CORS and logging middleware

## 📋 Prerequisites

- **Node.js** >= 18.14
- **npm** or **pnpm** or **yarn**
- **PostgreSQL** >= 14 (optional - Ponder includes built-in PGlite)
- **Anvil** (for local development and testing)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd zuno-marketplace-indexer
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Zuno API Configuration
ZUNO_API_URL=https://zuno-marketplace-abis.vercel.app/api
ZUNO_API_KEY=your_api_key_here

# Database Configuration (optional - uses PGlite by default)
DATABASE_URL=postgresql://user:password@localhost:5432/ponder

# RPC URLs - Add your RPC endpoints for each chain you want to index
# Format: PONDER_RPC_URL_{CHAIN_ID}=<rpc_url>

# Example: Ethereum Mainnet (Chain ID: 1)
PONDER_RPC_URL_1=https://eth-mainnet.g.alchemy.com/v2/your_alchemy_key

# Example: Polygon (Chain ID: 137)
PONDER_RPC_URL_137=https://polygon-mainnet.g.alchemy.com/v2/your_alchemy_key

# Example: Base (Chain ID: 8453)
PONDER_RPC_URL_8453=https://base-mainnet.g.alchemy.com/v2/your_alchemy_key

# Optional: WebSocket URLs for faster syncing
# PONDER_WS_URL_1=wss://eth-mainnet.g.alchemy.com/v2/your_alchemy_key
```

**Note**: You can copy `.env.example` to `.env.local` and fill in your values.

### 3. Generate Configuration

```bash
npm run generate-config
```

This command:
- Fetches all contract ABIs from Zuno API
- Generates `ponder.config.generated.ts` with all configured chains and contracts
- Lists all available networks and contracts

### 4. Copy Generated Config (if needed)

If you want to customize the configuration:

```bash
cp ponder.config.generated.ts ponder.config.ts
```

Otherwise, the generated config will be used automatically.

### 5. Run the Indexer

```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm run start
```

### 6. Access the APIs

Once running, you can access:

- **GraphQL API**: http://localhost:42069/graphql
- **REST API**: http://localhost:42069/api
  - Collections: `/api/collections`
  - Tokens: `/api/tokens`
  - Trades: `/api/trades`
  - Accounts: `/api/accounts`
  - Stats: `/api/stats`

## 📚 Available Scripts

```bash
npm run dev              # Start development server with hot reload
npm run start            # Start production server
npm run codegen          # Generate TypeScript types from schema
npm run generate-config  # Generate Ponder config from Zuno API
npm run setup            # Run generate-config + codegen
npm run lint             # Run ESLint
npm run typecheck        # Run TypeScript type checking
```

### Environment Variables

```bash
# Required
ZUNO_API_URL          # Zuno API base URL
ZUNO_API_KEY          # Zuno API key

# Optional
DATABASE_URL          # PostgreSQL connection (if not using PGlite)
NODE_ENV              # Environment (development/production)

# Network RPC URLs (add as needed)
PONDER_RPC_URL_31337  # Anvil local
PONDER_RPC_URL_1      # Ethereum mainnet
PONDER_RPC_URL_137    # Polygon
PONDER_RPC_URL_8453   # Base
# ... add more networks
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Style

- Follow TypeScript strict mode
- Use ESLint configuration (`ponder` preset)
- Add JSDoc comments for public functions
- Write descriptive commit messages

## 🚂 Railway Deployment

### Quick Deploy to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add PostgreSQL
railway add --database postgres

# Setup environment variables
bash scripts/setup-railway-env.sh

# Deploy!
railway up
```

See **[RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md)** for complete deployment guide.

### Deploy Button

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/yourusername/zuno-marketplace-indexer)

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Built with [Ponder](https://ponder.sh) - The best blockchain indexing framework
- Powered by [Zuno Marketplace ABIs](https://zuno-marketplace-abis.vercel.app)
- Uses [Hono](https://hono.dev) for high-performance API server
- Database powered by [PGlite](https://pglite.dev) - Embedded PostgreSQL

## 📞 Support

- **Documentation**: [Ponder Docs](https://ponder.sh/docs)
- **Issues**: [GitHub Issues](../../issues)
- **Zuno API**: [API Documentation](https://zuno-marketplace-abis.vercel.app)

---

**Built with ❤️ by the Zuno Team**

_Version 1.0.0_
