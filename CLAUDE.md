# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Zuno Marketplace Indexer** is an enterprise-grade blockchain event indexer for the Zuno NFT Marketplace, built on [Ponder](https://ponder.sh). It tracks and indexes marketplace events across multiple EVM chains (Ethereum, Polygon, Base, Arbitrum, etc.) in real-time using a Domain-Driven Design architecture.

**Key Technologies:**

- **Ponder 0.14.3** - Blockchain indexing framework
- **TypeScript 5.3** with strict mode
- **PostgreSQL** (via PGlite embedded or external)
- **Hono** - High-performance API server
- **Viem** - Ethereum library

## Commands

### Development

```bash
pnpm dev                 # Start development server with hot reload
pnpm start              # Start production server
pnpm serve              # Serve built indexer
```

### Build & Configuration

```bash
pnpm generate-config    # Fetch ABIs from Zuno API and generate ponder.config.ts
pnpm codegen            # Generate TypeScript types from schema
pnpm build              # Full build (generate-config + codegen)
```

### Code Quality

```bash
pnpm typecheck          # TypeScript type checking
pnpm lint               # ESLint (ponder preset)
```

### Database

```bash
pnpm db                 # Database management commands (Ponder CLI)
```

## Architecture Overview

### Domain-Driven Design Structure

The codebase follows strict DDD principles with clear domain boundaries:

```
src/
├── domain/              # Core business logic organized by domain
│   ├── account/        # User account management
│   ├── auction/        # Auction lifecycle (create, bid, settle)
│   ├── bundle/         # Bundle creation, purchase, dissolution
│   ├── collection/     # NFT collection creation & minting
│   ├── offer/          # Offer creation, acceptance, cancellation
│   └── trading/        # Marketplace listings & purchases
├── repositories/       # Data access layer (Repository pattern)
├── infrastructure/     # Cross-cutting concerns
│   ├── external/       # External API clients (Zuno API)
│   ├── logging/        # Event logging
│   └── monitoring/     # Error handling, metrics, handler wrapping
├── shared/            # Shared types, utilities, helpers
├── api/               # REST API endpoints (Hono)
└── index.ts           # Main entry - registers all domain handlers
```

### Event Handler Pattern

**Every domain handler follows this Event-First structure:**

1. **Handler Registration** (`src/domain/{domain}/index.ts`)

   - Uses `ponder.on()` to register event listeners
   - Wraps handlers with `wrapHandler()` for automatic error handling, retry logic, and metrics

2. **Handler Implementation** (`src/domain/{domain}/handlers/*.handler.ts`)
   - **Event-First Pattern**: Store event first, then update projections
   - Validates event data with Zod schemas
   - Uses EventRepository as single source of truth
   - Updates aggregate projections (account, collection, token, trade)

**Example handler structure (v3.0):**

```typescript
export async function handleEventName({
  event,
  context,
}: {
  event: any;
  context: any;
}) {
  const args = event.args as EventType;

  // 1. Initialize repositories
  const eventRepo = new EventRepository({
    db: context.db,
    network: context.network,
  });
  const accountRepo = new AccountRepository({
    db: context.db,
    network: context.network,
  });

  // 2. Prepare and validate event data
  const eventData: EventDataType = {
    /* transform args to event data */
  };
  const validatedData = validateEventData("event_type", eventData);

  // 3. Store event (source of truth)
  const eventResult = await eventRepo.createEvent({
    eventType: "event_name",
    category: "category",
    actor: args.actor,
    collection: args.collection,
    tokenId: args.tokenId?.toString(),
    data: validatedData,
    contractName: "ContractName",
    event,
  });

  // 4. Update aggregate projections
  await accountRepo.getOrCreate(args.actor, event.block.timestamp);
  await accountRepo.updateActivity(args.actor, event.block.timestamp);

  // 5. Update domain-specific aggregations
  // (collection stats, token metadata, trade records, etc.)
}
```

### Repository Pattern

**Base Repository** (`src/shared/base/base.repository.ts`):

- Provides CRUD operations: `create()`, `findById()`, `update()`, `delete()`, `findAll()`
- Uses `Result<T>` type for error handling (no exceptions)
- All repositories extend `BaseRepository<EntityType>`

**Specialized Repositories** (`src/repositories/*.repository.ts`):

- Implement domain-specific queries
- Example: `AccountRepository.incrementTrades()`, `CollectionRepository.updateFloorPrice()`

### Infrastructure Layer

**Handler Wrapper** (`src/infrastructure/monitoring/handler-wrapper.ts`):

- Wraps all event handlers automatically
- Provides retry logic (3 attempts with exponential backoff)
- Records metrics (processing time, success/failure counts)
- Logs errors with full context (block, tx, event data)

**Error Handler** (`src/infrastructure/monitoring/error-handler.ts`):

- Centralized error handling with retry mechanism
- Stores failed events for manual recovery
- Returns `Result<T>` objects instead of throwing

**Metrics** (`src/infrastructure/monitoring/metrics.ts`):

- Tracks: `EVENTS_PROCESSED`, `EVENTS_FAILED`, `EVENT_PROCESSING_TIME`, `CURRENT_BLOCK`
- Provides histogram, counter, and gauge metrics

## Database Schema

### Core Concepts

1. **Relationship Documentation**: All tables use JSDoc `@relationship` annotations

   ```typescript
   /**
    * @relationship maker -> account.address
    * @relationship collection -> collection.address
    */
   ```

2. **ID Generation Patterns**:

   - Chain-scoped: `{chainId}:{address}` (collections, auctions, offers, bundles)
   - Transaction-scoped: `{txHash}:{logIndex}` (trades, events, mints)
   - Composite: `{chainId}:{collection}:{tokenId}` (tokens)

3. **BigInt Storage**: All numeric values (prices, amounts) stored as strings to preserve precision

4. **Indexes**: Every table has strategic indexes on:
   - Primary relationships (addresses, IDs)
   - Query fields (status, timestamps, chain ID)
   - Composite indexes for common queries

### Schema v3.0 - Event-First Architecture

The schema has been completely redesigned with event sourcing principles:

**Core Tables (6 total - 68% reduction from v2.1):**

- **`event`** - Single source of truth for all marketplace activities
- **`account`** - User aggregate projections from events
- **`collection`** - Collection aggregate projections from events
- **`token`** - Individual NFT aggregate projections from events
- **`trade`** - Completed trade aggregate projections from events
- **`daily_collection_stats`** - Time-series analytics aggregations

**Key Benefits:**

- **Event Sourcing**: All marketplace states derived from events
- **No Transient Tables**: No dedicated auction/offer/listing tables
- **Flexible Schema**: Add new event types without migrations
- **Complete Audit Trail**: Full history of all activities
- **Query Flexibility**: Query current state by filtering events
- **Scalable**: Optimized for high-throughput event ingestion

**Event Categories:**

- `auction` - auction_created, bid_placed, auction_settled, auction_cancelled
- `offer` - offer_created, offer_accepted, offer_cancelled
- `listing` - listing_created, listing_cancelled, listing_filled
- `trade` - nft_purchased, bundle_purchased
- `mint` - nft_minted, batch_minted
- `collection` - collection_created

## Dynamic Configuration System

**Configuration Generation** (`scripts/generate-config.ts`):

1. Fetches contract ABIs and deployment info from Zuno API
2. Generates `ponder.config.ts` with all chains and contracts
3. Auto-detects available networks from environment variables (`PONDER_RPC_URL_{CHAIN_ID}`)
4. Creates network-specific contract identifiers (e.g., `erc721collectionfactory_anvil`)

**Environment Variables:**

```bash
# Required
ZUNO_API_URL=https://zuno-marketplace-abis.vercel.app/api
ZUNO_API_KEY=your_key

# Optional - uses PGlite if not provided
DATABASE_URL=postgresql://user:password@localhost:5432/ponder

# RPC URLs - Format: PONDER_RPC_URL_{CHAIN_ID}
PONDER_RPC_URL_31337=http://127.0.0.1:8545  # Anvil local
PONDER_RPC_URL_1=https://...                # Ethereum
PONDER_RPC_URL_137=https://...              # Polygon
```

## Event Registration Pattern

**Contract identifiers follow this pattern:**

```
{contractName}_{networkName}:{EventName}
```

Examples:

```typescript
ponder.on("erc721collectionfactory_anvil:ERC721CollectionCreated", handler);
ponder.on("advancedlistingmanager_ethereum:ListingCreated", handler);
```

**To add new event handlers:**

1. Create handler in `src/domain/{domain}/handlers/{event-name}.handler.ts`
2. Register in `src/domain/{domain}/index.ts`:
   ```typescript
   ponder.on(
     "contract_network:EventName",
     wrapHandler("EventName", handleEventName)
   );
   ```
3. Import and call `register{Domain}Handlers()` in `src/index.ts`

## Minting Events

**Important**: Minting events (`Minted`, `BatchMinted`) are emitted from **individual collection contracts**, not from factories. This requires dynamic contract registration:

**Current Approach** (manual):

```typescript
// In collection creation handler, note the new collection address
// Manually add to ponder.config.ts or use dynamic indexing

// In src/domain/collection/index.ts:
ponder.on(
  "YOUR_COLLECTION_ADDRESS:Minted",
  wrapHandler("Minted", handleNFTMinted)
);
```

**Recommended Approach** (dynamic):
Use Ponder's dynamic contract indexing to automatically track new collections as they're created.

## Type Safety

- **Strict TypeScript**: All code uses strict mode with `noUncheckedIndexedAccess`
- **Event Types**: Define event arg interfaces for each handler
  ```typescript
  interface EventNameArgs {
    field1: `0x${string}`; // Use viem address types
    field2: bigint;
    field3: string;
  }
  ```
- **Result Pattern**: Repositories return `Result<T>` instead of throwing:
  ```typescript
  const result = await repo.findById(id);
  if (!result.success) {
    // Handle error: result.error
  }
  // Use data: result.data
  ```

## Ponder-Specific Concepts

1. **Schema Definition** (`ponder.schema.ts`):

   - Uses `onchainTable()` for all tables
   - Tables are immutable once created (can only add fields, not modify)
   - Migrations require database reset in development

2. **Context Object**:

   - `context.db` - Database client (Drizzle ORM)
   - `context.network` - Current network info (chainId, name)
   - `context.contracts` - Contract addresses and ABIs

3. **Event Object**:

   - `event.args` - Decoded event arguments
   - `event.block` - Block data (number, timestamp, hash)
   - `event.transaction` - Transaction data (hash, from, to, value)
   - `event.log` - Log data (address, logIndex, topics)

4. **GraphQL API**: Automatically generated from schema at `/graphql`

5. **Hot Reload**: In dev mode, changes to handlers trigger re-processing from last synced block

## Common Patterns

### Creating Activity Feed Entries

```typescript
const activityId = `${event.transaction.hash}:${event.log.logIndex}:${userAddress}`;
await context.db.insert(schema.activityFeed).values({
  id: activityId,
  user: normalizeAddress(userAddress),
  activityType: "minted" | "listed" | "sold" | "bought" | "bid" | "offer_made" | "offer_accepted",
  collection: normalizeAddress(collectionAddress),
  tokenId: tokenId.toString(),
  metadata: JSON.stringify({ price, buyer, seller, etc. }),
  blockTimestamp: event.block.timestamp,
  transactionHash: event.transaction.hash,
  chainId: context.network.chainId,
});
```

### Recording Trade Statistics

```typescript
// Update buyer and seller stats
await Promise.all([
  accountRepo.incrementTrades(seller, true, volume), // isMaker: true
  accountRepo.incrementTrades(buyer, false, volume), // isMaker: false
]);

// Update collection stats
await collectionRepo.incrementTradeStats(collectionId, volume, timestamp);
await collectionRepo.updateFloorPrice(collectionId, price);
```

### Logging Events

```typescript
const logger = getEventLogger();

// Start
logger.logEventStart("EventName", contractAddress, blockNumber, txHash);

// Success
logger.logEventSuccess("EventName", { key: "value", ... });

// Error (automatic via wrapHandler, but can be used manually)
logger.logEventError("EventName", error, { args, context });
```

## Multi-Chain Support

The indexer automatically detects and indexes all configured chains based on environment variables. Each chain has:

- Unique chain ID (e.g., 1 for Ethereum, 137 for Polygon)
- Network name used in contract identifiers (e.g., `ethereum`, `polygon`, `anvil`)
- All entities include `chainId` field for filtering

**Chain-specific queries:**

```typescript
const results = await db
  .select()
  .from(schema.collection)
  .where((c) => c.chainId.equals(137)) // Polygon only
  .execute();
```

## Development Workflow

1. **Start local Anvil** (optional, for local testing):

   ```bash
   anvil --chain-id 31337
   ```

2. **Generate config from Zuno API**:

   ```bash
   pnpm generate-config
   ```

3. **Start indexer**:

   ```bash
   pnpm dev
   ```

4. **Test APIs**:

   - GraphQL: http://localhost:42069/graphql
   - REST: http://localhost:42069/api/collections

5. **Type checking during development**:
   ```bash
   pnpm typecheck
   ```

## Troubleshooting

- **"Table not found" errors**: Run `pnpm build` to regenerate types after schema changes
- **Configuration issues**: Ensure `ZUNO_API_URL` and `ZUNO_API_KEY` are set, run `pnpm generate-config`
- **RPC errors**: Check `PONDER_RPC_URL_{CHAIN_ID}` environment variables
- **Handler errors**: Check metrics and error logs, failed events are stored for manual recovery
- **Type mismatches**: Ensure event arg interfaces match actual event signatures in contracts

## Important Notes

- **Never commit `.env.local`** - Contains sensitive API keys and RPC URLs
- **Schema is immutable in production** - Plan schema changes carefully
- **All handlers are wrapped automatically** - Don't add your own try/catch unless necessary
- **Use `normalizeAddress()`** for all addresses before storage
- **BigInt values** must be converted to strings: `amount.toString()`
- **Activity feed** should be created for all user-facing actions
- **Mint events** require special handling due to dynamic collection addresses
