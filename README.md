# Zuno Marketplace Indexer

Production-ready Ponder indexer for multi-chain NFT marketplace with dynamic configuration from API.

## 🎯 Features

- ✅ **Dynamic Configuration**: Fetch networks, contracts, and ABIs from external API
- ✅ **Multi-Chain Support**: Index events across multiple blockchain networks
- ✅ **Type-Safe**: Full TypeScript support with strict typing
- ✅ **Production Ready**: Comprehensive logging with Sentry integration
- ✅ **Caching**: In-memory caching for API responses
- ✅ **Validation**: Robust validation for all configuration data
- ✅ **Clean Architecture**: Modular, maintainable, and extensible codebase

## 📋 Prerequisites

- Node.js >= 18.0.0
- PostgreSQL database
- pnpm (recommended) or npm

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment

```bash
cp .env.sample .env
```

Edit `.env` with your configuration:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ponder

# API Configuration
API_BASE_URL=https://your-api.com
API_TIMEOUT=30000

# Logging (optional)
NODE_ENV=development
SENTRY_DSN=https://your-sentry-dsn
```

### 3. Generate Configuration

Fetch configuration from API and generate files:

```bash
pnpm generate:config
```

This will:

- Fetch networks, contracts, and ABIs from your API
- Generate `ponder.config.ts`
- Generate ABI files in `abis/` directory

### 4. Start Development Server

```bash
pnpm dev
```

Visit `http://localhost:42069/graphql` to explore the GraphQL API.

## 📂 Project Structure

```
zuno-marketplace-indexer/
├── src/
│   ├── types/                 # TypeScript type definitions
│   │   ├── api.types.ts       # API response types
│   │   ├── config.types.ts    # Ponder config types
│   │   └── schema.types.ts    # Database schema types
│   │
│   ├── services/
│   │   ├── api.service.ts     # Type-safe API client
│   │   └── cache.service.ts   # Caching layer
│   │
│   ├── config/
│   │   ├── loader.ts          # Fetch & validate config
│   │   ├── generator.ts       # Generate ponder.config.ts
│   │   ├── validator.ts       # Config validation
│   │   └── cli.ts             # CLI script
│   │
│   ├── marketplace.ts         # Marketplace event handlers
│   ├── nft.ts                 # NFT (ERC721) event handlers
│   ├── token.ts               # Token (ERC20) event handlers
│   │
│   └── utils/
│       ├── logger.ts          # Logging utility
│       ├── sentry.ts          # Error tracking
│       └── helpers.ts         # Helper functions
│
├── abis/                      # Generated ABI files (from API)
├── ponder.config.ts           # Generated Ponder config (from API)
├── ponder.schema.ts           # Database schema definition
└── package.json
```

## 🔧 API Integration

The indexer expects your API to provide three endpoints:

### GET `/api/networks`

Returns network configurations:

```json
{
  "success": true,
  "data": [
    {
      "id": "eth-mainnet",
      "name": "mainnet",
      "chainId": 1,
      "rpcUrl": "https://eth-mainnet.g.alchemy.com/v2/...",
      "startBlock": 18000000
    }
  ]
}
```

### GET `/api/contracts`

Returns contract configurations:

```json
{
  "success": true,
  "data": [
    {
      "id": "marketplace-eth",
      "name": "Marketplace",
      "network": "mainnet",
      "address": "0x...",
      "abiName": "Marketplace",
      "startBlock": 18000000
    }
  ]
}
```

### GET `/api/abis/full`

Returns ABI definitions:

```json
{
  "success": true,
  "data": [
    {
      "id": "marketplace-abi",
      "name": "Marketplace",
      "abi": [...],
      "version": "1.0.0"
    }
  ]
}
```

## 📊 Database Schema

### Tables

- **listing**: Marketplace listings (ACTIVE, SOLD, CANCELLED)
- **offer**: Offers on listings (PENDING, ACCEPTED, REJECTED)
- **nft**: NFT ownership tracking
- **account**: User statistics (listings, sales, purchases, volume)
- **transfer_event**: NFT transfer audit trail
- **approval_event**: NFT approval events

## 🛠️ Development

### Generate Config

```bash
pnpm generate:config
```

### Start Dev Server

```bash
pnpm dev
```

### Start Production Server

```bash
pnpm start
```

### Type Generation

```bash
pnpm codegen
```

## 📝 Scripts

| Script            | Description                              |
| ----------------- | ---------------------------------------- |
| `generate:config` | Fetch config from API and generate files |
| `dev`             | Start development server with hot reload |
| `start`           | Start production indexing server         |
| `serve`           | Start GraphQL API server only            |
| `codegen`         | Generate TypeScript types from schema    |

## 🔍 Logging

### Development

Console logging with colored output and emojis for easy debugging.

### Production

- Structured JSON logging for log aggregation
- Sentry integration for error tracking
- Automatic error capture and reporting

Set `NODE_ENV=production` and configure `SENTRY_DSN` to enable Sentry.

## 🚀 Deployment

### Railway

Project includes `railway.toml` for easy deployment:

```bash
railway up
```

### Docker

```bash
docker build -t zuno-indexer .
docker run -e DATABASE_URL=... -e API_BASE_URL=... zuno-indexer
```

## 🤝 Contributing

1. Follow the coding standards (see `cursor_rules`)
2. Use conventional commits
3. Add tests for new features
4. Update documentation

## 📄 License

MIT © 2025 Zuno
