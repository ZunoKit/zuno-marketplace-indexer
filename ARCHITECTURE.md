# Architecture Documentation

## 🏗️ Tổng quan kiến trúc

Project sử dụng **Clean Architecture** (Hexagonal Architecture) với sự phân tách rõ ràng giữa các layer:

```
┌─────────────────────────────────────────────────┐
│             PRESENTATION LAYER                   │
│  ┌────────────────┐      ┌────────────────┐    │
│  │  REST API      │      │   GraphQL      │    │
│  │  (Hono)        │      │   (Ponder)     │    │
│  └────────────────┘      └────────────────┘    │
└────────────────┬──────────────────┬─────────────┘
                 │                  │
┌────────────────▼──────────────────▼─────────────┐
│           APPLICATION LAYER                      │
│  ┌────────────────┐      ┌────────────────┐    │
│  │ Event Handlers │      │   Services     │    │
│  └────────────────┘      └────────────────┘    │
└────────────────┬──────────────────┬─────────────┘
                 │                  │
┌────────────────▼──────────────────▼─────────────┐
│              DOMAIN LAYER                        │
│  ┌────────────────┐      ┌────────────────┐    │
│  │    Types       │      │    Utils       │    │
│  │  (Entities)    │      │  (Helpers)     │    │
│  └────────────────┘      └────────────────┘    │
└────────────────┬──────────────────┬─────────────┘
                 │                  │
┌────────────────▼──────────────────▼─────────────┐
│         INFRASTRUCTURE LAYER                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────┐ │
│  │Repositories │  │  Services   │  │   API   │ │
│  │ (Database)  │  │  (External) │  │ Client  │ │
│  └─────────────┘  └─────────────┘  └─────────┘ │
└─────────────────────────────────────────────────┘
```

## 📂 Cấu trúc thư mục

```
zuno-marketplace-indexer/
│
├── src/
│   │
│   ├── core/                          # DOMAIN LAYER
│   │   ├── types/
│   │   │   └── index.ts              # Core domain types & interfaces
│   │   └── utils/
│   │       └── helpers.ts            # Pure utility functions
│   │
│   ├── services/                      # APPLICATION LAYER
│   │   ├── api/
│   │   │   └── zunoApiClient.service.ts    # External API client
│   │   └── config/
│   │       └── configBuilder.service.ts    # Configuration builder
│   │
│   ├── repositories/                  # INFRASTRUCTURE LAYER
│   │   ├── base.repository.ts        # Abstract base repository
│   │   └── account.repository.ts     # Account data access
│   │
│   ├── handlers/                      # APPLICATION LAYER
│   │   ├── collection.handler.ts     # Collection event handlers
│   │   ├── token.handler.ts          # Token event handlers (TODO)
│   │   └── trade.handler.ts          # Trade event handlers (TODO)
│   │
│   ├── api/                           # PRESENTATION LAYER
│   │   └── index.ts                  # REST & GraphQL API server
│   │
│   └── index.ts                      # Event handler registry
│
├── ponder.config.ts                  # Ponder configuration
├── ponder.schema.ts                  # Database schema
├── package.json
├── README.md
├── ARCHITECTURE.md                   # This file
└── DEPLOYMENT.md                     # Deployment guide
```

## 🎯 Design Patterns

### 1. Repository Pattern

**Mục đích**: Trừu tượng hóa data access layer, tách biệt business logic khỏi database operations.

**Implementation**:

```typescript
// Base Repository (Abstract)
export abstract class BaseRepository<T> {
  async create(entity: T): Promise<Result<T>>
  async findById(id: string): Promise<Result<T | null>>
  async update(id: string, data: Partial<T>): Promise<Result<T>>
  async delete(id: string): Promise<Result<boolean>>
}

// Concrete Repository
export class AccountRepository extends BaseRepository<Account> {
  // Specific business methods
  async getOrCreate(address: Address, timestamp: Timestamp)
  async incrementTrades(address: Address, isMaker: boolean, volume: bigint)
}
```

**Lợi ích**:
- Dễ test (mock repository)
- Tái sử dụng code
- Centralized data access logic

### 2. Singleton Pattern

**Mục đích**: Đảm bảo chỉ có một instance của service trong toàn bộ application.

**Implementation**:

```typescript
export class ZunoApiClientService {
  private static instance: ZunoApiClientService;
  
  private constructor() {}
  
  public static getInstance(): ZunoApiClientService {
    if (!ZunoApiClientService.instance) {
      ZunoApiClientService.instance = new ZunoApiClientService();
    }
    return ZunoApiClientService.instance;
  }
}
```

**Sử dụng ở**:
- `ZunoApiClientService` - API client
- `ConfigBuilderService` - Config builder

**Lợi ích**:
- Tiết kiệm memory
- Shared state (cache)
- Thread-safe initialization

### 3. Builder Pattern

**Mục đích**: Xây dựng complex objects step-by-step.

**Implementation**:

```typescript
export class ConfigBuilderService {
  private config: Partial<PonderConfig> = {};
  
  reset(): this
  buildChainConfig(networks: ApiNetwork[]): Record<string, ChainConfig>
  buildContractConfig(...): Promise<Record<string, ContractConfig>>
  build(): Promise<Result<PonderConfig>>
}
```

**Lợi ích**:
- Flexible construction process
- Readable code
- Immutable objects

### 4. Strategy Pattern

**Mục đích**: Encapsulate algorithms và make them interchangeable.

**Implementation**:

```typescript
// Different handlers for different events
ponder.on("*:ERC721CollectionCreated", handleERC721CollectionCreated);
ponder.on("*:ERC1155CollectionCreated", handleERC1155CollectionCreated);
ponder.on("*:Transfer", handleTransfer);
```

**Lợi ích**:
- Easy to add new event handlers
- Separation of concerns
- Testable logic

### 5. Factory Pattern

**Mục đích**: Create objects without specifying exact class.

**Implementation**:

```typescript
// Repository factory in handlers
const accountRepo = new AccountRepository({ db: context.db, network: context.network });
```

## 🔄 Data Flow

### Event Processing Flow

```
Blockchain Event
      ↓
Ponder Listener
      ↓
Event Handler (src/handlers/)
      ↓
Repository (src/repositories/)
      ↓
Database (PostgreSQL)
      ↓
API (GraphQL/REST)
      ↓
Client
```

### Query Flow

```
Client Request
      ↓
API Endpoint (src/api/)
      ↓
Ponder DB Query
      ↓
PostgreSQL
      ↓
Response (JSON)
```

## 📊 Database Schema Design

### Normalized Design

- **account**: User profiles & statistics
- **collection**: NFT collections metadata
- **token**: Individual tokens
- **trade**: Trade executions
- **event_log**: Raw event data

### Denormalization Choices

- Lưu `totalVolume` và `totalTrades` trực tiếp trong `account` và `collection` để tăng tốc queries
- Trade-off: Consistency vs Performance

### Indexing Strategy

```sql
-- Primary indexes on frequently queried columns
CREATE INDEX idx_collection_creator ON collection(creator);
CREATE INDEX idx_token_owner ON token(owner);
CREATE INDEX idx_trade_timestamp ON trade(block_timestamp DESC);

-- Composite indexes for complex queries
CREATE INDEX idx_token_collection_id ON token(collection, token_id);
```

## 🔐 Security Considerations

### Input Validation

- Validate all addresses (checksum)
- Validate all numeric inputs (prevent overflow)
- Sanitize user inputs

### Error Handling

```typescript
// Always return Result<T, E> type
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };
```

### Database Security

- Use parameterized queries (Drizzle ORM)
- No direct SQL injection risk
- Limited permissions for DB user

## ⚡ Performance Optimizations

### 1. Caching Strategy

```typescript
// In-memory cache với TTL
private cache: Map<string, { data: any; timestamp: number }>;
private cacheTTL: number = 5 * 60 * 1000; // 5 minutes
```

### 2. Batch Operations

```typescript
// Fetch multiple ABIs in parallel
const promises = abiIds.map(id => this.getAbiById(id));
const results = await Promise.allSettled(promises);
```

### 3. Database Indexes

- Index all foreign keys
- Index commonly filtered columns
- Composite indexes for multi-column queries

### 4. Connection Pooling

Ponder handles connection pooling automatically.

## 🧪 Testing Strategy

### Unit Tests

```typescript
// Test pure functions
import { generateId, normalizeAddress } from './helpers';

test('generateId combines parts correctly', () => {
  expect(generateId('1', '0x123', '5')).toBe('1:0x123:5');
});
```

### Integration Tests

```typescript
// Test repositories with test database
const testContext = {
  db: testDb,
  network: { chainId: 31337, name: 'anvil' }
};
const repo = new AccountRepository(testContext);
```

### E2E Tests

```bash
# Test full event flow
1. Deploy test contracts on Anvil
2. Emit events
3. Wait for indexing
4. Query API
5. Verify results
```

## 🔄 Error Recovery

### Event Reorg Handling

Ponder automatically handles blockchain reorganizations:

```typescript
// Ponder tracks and reverts changes on reorg
// No manual handling needed
```

### Failed Event Processing

```typescript
// Log errors but continue processing
try {
  await handler(event, context);
} catch (error) {
  console.error(`Failed to process event:`, error);
  // Event marked as failed in event_log table
}
```

## 📈 Scalability Considerations

### Horizontal Scaling

- Stateless design allows multiple instances
- Share PostgreSQL database
- Use load balancer for API

### Vertical Scaling

- Increase database resources
- Optimize queries with EXPLAIN
- Add read replicas

### Data Archival

```sql
-- Archive old events
CREATE TABLE event_log_archive AS 
SELECT * FROM event_log 
WHERE block_timestamp < NOW() - INTERVAL '6 months';

DELETE FROM event_log 
WHERE block_timestamp < NOW() - INTERVAL '6 months';
```

## 🎓 Best Practices

### 1. Type Safety

```typescript
// Always use strong types
type Address = `0x${string}`;
type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };
```

### 2. Error Handling

```typescript
// Never throw errors, return Results
async function operation(): Promise<Result<Data>> {
  try {
    // ...
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
```

### 3. Immutability

```typescript
// Use readonly and const
const config: Readonly<Config> = { /* ... */ };
```

### 4. Single Responsibility

- Each class has one purpose
- Each function does one thing
- Each module handles one domain

### 5. Dependency Injection

```typescript
// Inject dependencies, don't create them
constructor(private context: DatabaseContext) {}
```

## 📚 Further Reading

- [Ponder Documentation](https://ponder.sh/docs)
- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Design Patterns](https://refactoring.guru/design-patterns)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

