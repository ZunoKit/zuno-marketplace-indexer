# Architecture Documentation

## 🏗️ System Overview

Zuno Marketplace Indexer is a production-grade blockchain indexer built with **Ponder** framework. It dynamically fetches configuration from an external API and indexes NFT marketplace events across multiple chains.

## 🎯 Core Architecture

```
┌─────────────────┐
│   External API  │
│  /api/networks  │
│  /api/contracts │
│  /api/abis/full │
└────────┬────────┘
         │
         ↓ Fetch & Validate
┌─────────────────────────────────┐
│     Config Generation Layer     │
│  ┌──────────┐  ┌──────────────┐│
│  │ Loader   │→ │  Validator   ││
│  └──────────┘  └──────┬───────┘│
│                       ↓         │
│              ┌─────────────────┐│
│              │   Generator     ││
│              └────────┬────────┘│
└───────────────────────┼─────────┘
                        ↓
         ┌──────────────────────────┐
         │  ponder.config.ts        │
         │  abis/*.ts               │
         └──────────┬───────────────┘
                    ↓
┌───────────────────────────────────────┐
│          Ponder Indexer               │
│  ┌─────────────────────────────────┐ │
│  │   Event Handlers                │ │
│  │  - marketplace.ts               │ │
│  │  - nft.ts                       │ │
│  │  - token.ts                     │ │
│  └─────────────┬───────────────────┘ │
│                ↓                      │
│  ┌─────────────────────────────────┐ │
│  │   ponder.schema.ts              │ │
│  │  (Database Tables)              │ │
│  └─────────────┬───────────────────┘ │
└────────────────┼───────────────────────┘
                 ↓
         ┌──────────────┐
         │  PostgreSQL  │
         └──────────────┘
```

## 📦 Module Breakdown

### 1. **Types Layer** (`src/types/`)

Defines TypeScript interfaces for type safety across the application.

- **`api.types.ts`**: API response structures
- **`config.types.ts`**: Ponder configuration types
- **`schema.types.ts`**: Database schema types

### 2. **Services Layer** (`src/services/`)

Handles external integrations and cross-cutting concerns.

#### `api.service.ts`

- Fetches configuration from external API
- Implements retry logic with exponential backoff
- Type-safe HTTP client with timeout handling
- Integrates with cache service

#### `cache.service.ts`

- In-memory caching with TTL
- Automatic cleanup of expired entries
- Configurable enable/disable via environment
- Reduces API calls and improves performance

### 3. **Config Layer** (`src/config/`)

Manages dynamic configuration generation.

#### `loader.ts`

- Orchestrates API calls
- Validates fetched data
- Returns typed configuration object

#### `validator.ts`

- Validates networks (chainId, RPC URLs)
- Validates contracts (addresses, network references)
- Validates ABIs (structure, completeness)
- Returns detailed error messages

#### `generator.ts`

- Generates `abis/*.ts` files from API data
- Generates `ponder.config.ts` with proper imports
- Creates type-safe, properly formatted code
- Adds timestamps and metadata

#### `cli.ts`

- Command-line interface for config generation
- Provides user feedback and progress
- Handles errors gracefully

### 4. **Event Handlers** (`src/`)

Process blockchain events and update database.

#### `marketplace.ts`

Handles marketplace-specific events:

- **ListingCreated**: Create new listing, update seller stats
- **ListingCancelled**: Mark listing as cancelled
- **ListingSold**: Update listing status, update buyer/seller stats
- **OfferCreated**: Record new offer
- **OfferAccepted**: Accept offer, mark listing as sold
- **OfferRejected**: Reject offer

#### `nft.ts`

Handles ERC721 NFT events:

- **Transfer**: Update NFT ownership, record transfer event
- **Approval**: Record approval events
- **ApprovalForAll**: Record operator approvals

#### `token.ts`

Handles ERC20 token events:

- **Transfer**: Track payment token movements
- **Approval**: Track marketplace approvals

### 5. **Utilities** (`src/utils/`)

Reusable helper functions and services.

#### `logger.ts`

- **Development**: Colored console logs with emojis
- **Production**: Structured JSON logs + Sentry integration
- Automatic error capture in production
- Contextual logging with metadata

#### `sentry.ts`

- Lazy initialization (production only)
- Error tracking and monitoring
- Filters sensitive data from reports
- Configurable via `SENTRY_DSN`

#### `helpers.ts`

- `retry()`: Retry async functions with backoff
- `sleep()`: Promise-based delay
- `isValidAddress()`: Ethereum address validation
- `createId()`: Generate composite IDs
- `getEnv*()`: Type-safe environment variable access

### 6. **Database Schema** (`ponder.schema.ts`)

Defines PostgreSQL tables using Ponder's ORM:

- **listing**: Marketplace listings with status tracking
- **offer**: Offers on listings
- **nft**: NFT ownership tracking
- **account**: Aggregated user statistics
- **transfer_event**: Audit trail for transfers
- **approval_event**: Approval event records

All tables include:

- Indexed columns for efficient queries
- `chainId` for multi-chain support
- Timestamps for temporal queries

## 🔄 Data Flow

### Config Generation Flow

```
1. User runs: pnpm generate:config
2. CLI loads environment variables
3. API Service fetches from 3 endpoints (parallel)
4. Cache Service checks for cached responses
5. Validator validates all fetched data
6. Generator creates TypeScript files
7. Files committed to git
```

### Indexing Flow

```
1. Ponder loads ponder.config.ts
2. Connects to blockchain RPCs
3. Fetches historical events (backfill)
4. Processes events through handlers
5. Handlers update database via Ponder ORM
6. Real-time sync continues
7. GraphQL API exposes data
```

### Event Processing Flow

```
Blockchain Event
    ↓
Ponder Registry
    ↓
Event Handler (marketplace.ts, nft.ts, token.ts)
    ↓
Database Operations (insert/update)
    ↓
PostgreSQL Tables
    ↓
GraphQL API
```

## 🎨 Design Patterns

### 1. **Singleton Pattern**

Used for services that should have only one instance:

- `logger`
- `apiService`
- `cacheService`

### 2. **Repository Pattern**

Ponder's context.db acts as repository:

```typescript
await context.db.insert(listing).values({...})
await context.db.update(listing, { id }).set({...})
```

### 3. **Factory Pattern**

Generator creates files dynamically from API data:

```typescript
generateConfig(data) → [ponder.config.ts, abis/*.ts]
```

### 4. **Strategy Pattern**

Different logging strategies based on environment:

- Development: Console logs
- Production: JSON logs + Sentry

## 🔐 Security Considerations

1. **Input Validation**: All API data validated before use
2. **Type Safety**: Strict TypeScript prevents runtime errors
3. **Address Validation**: Ethereum addresses checked before storage
4. **Sensitive Data**: Filtered from Sentry reports
5. **SQL Injection**: Prevented by Ponder's ORM

## 🚀 Performance Optimizations

1. **Caching**: API responses cached with TTL
2. **Parallel Fetching**: API calls made concurrently
3. **Database Indexes**: Strategic indexes on common queries
4. **Retry Logic**: Exponential backoff for failed requests
5. **Connection Pooling**: PostgreSQL connection reuse

## 📊 Monitoring & Observability

### Development

- Console logs with colored output
- Detailed error messages
- Request/response logging

### Production

- Structured JSON logs
- Sentry error tracking
- Performance metrics
- Request timing

## 🧪 Testing Strategy

### Unit Tests (Future)

- Validators
- Helpers
- Services

### Integration Tests (Future)

- API service with mocked endpoints
- Event handlers with test fixtures
- Database operations

### E2E Tests (Future)

- Full config generation flow
- Event processing pipeline

## 📈 Scalability

### Horizontal Scaling

- Stateless design allows multiple instances
- Shared PostgreSQL database
- Ponder handles distributed indexing

### Vertical Scaling

- Efficient database queries
- Minimal memory footprint
- Optimized event processing

## 🔄 Upgrade Path

1. **Adding New Events**: Create handler in appropriate file
2. **New Contracts**: Add to API, regenerate config
3. **New Chains**: Add network to API
4. **Schema Changes**: Update ponder.schema.ts, Ponder handles migration

## 📚 Key Dependencies

| Dependency     | Purpose                       |
| -------------- | ----------------------------- |
| `@ponder/core` | Blockchain indexing framework |
| `viem`         | Ethereum interactions         |
| `typescript`   | Type safety                   |
| `tsx`          | TypeScript execution          |

## 🎯 Future Enhancements

- [ ] GraphQL custom resolvers
- [ ] API endpoints for custom queries
- [ ] Real-time WebSocket subscriptions
- [ ] Analytics dashboard
- [ ] Historical data export
- [ ] Multi-indexer coordination
