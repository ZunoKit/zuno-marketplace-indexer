import { index, onchainTable } from "ponder";

/**
 * Zuno Marketplace Indexer Schema v3.0
 *
 * Event-First Architecture - Production-Grade Design
 *
 * Philosophy:
 * - Events are the single source of truth (Event Sourcing pattern)
 * - Aggregates (account, collection, token, trade) are projections from events
 * - No dedicated tables for transient marketplace states (auctions, offers, listings)
 * - All marketplace activities stored as events with JSON metadata
 * - Optimized for scalability, maintainability, and query performance
 *
 * Benefits:
 * - Add new event types without schema migrations
 * - Complete audit trail for all activities
 * - Flexible data model with JSON fields
 * - Reduced table count (19 → 6 tables = 68% reduction)
 * - Future-proof architecture
 *
 * @version 3.0.0
 * @author Zuno Team
 */

// ============================================================================
// Event Store - Single Source of Truth
// ============================================================================

/**
 * Event - All blockchain events indexed here
 *
 * This is the CORE table. Every marketplace activity is recorded as an event:
 *
 * **Auction Events:**
 * - auction_created, auction_settled, auction_cancelled, bid_placed
 *
 * **Offer Events:**
 * - offer_created, offer_accepted, offer_cancelled
 *
 * **Listing Events:**
 * - listing_created, listing_cancelled, listing_filled
 *
 * **Trade Events:**
 * - nft_purchased, bundle_purchased
 *
 * **Mint Events:**
 * - nft_minted, batch_minted
 *
 * **Collection Events:**
 * - collection_created
 *
 * **Dynamic JSON Data Examples:**
 * ```json
 * // Auction Created
 * {
 *   "auctionId": "0x123...",
 *   "auctionType": "english",
 *   "startPrice": "1000000000000000000",
 *   "reservePrice": "2000000000000000000",
 *   "startTime": 1234567890,
 *   "endTime": 1234654321
 * }
 *
 * // Bid Placed
 * {
 *   "auctionId": "0x123...",
 *   "bidAmount": "1500000000000000000",
 *   "previousBid": "1200000000000000000",
 *   "isWinning": true
 * }
 *
 * // Offer Created
 * {
 *   "offerId": "0xabc...",
 *   "offerType": "nft",
 *   "amount": "500000000000000000",
 *   "expiresAt": 1234567890
 * }
 * ```
 *
 * **Query Examples:**
 *
 * Get active auctions:
 * ```sql
 * SELECT * FROM event
 * WHERE eventType = 'auction_created'
 *   AND NOT EXISTS (
 *     SELECT 1 FROM event e2
 *     WHERE e2.eventType IN ('auction_settled', 'auction_cancelled')
 *       AND JSON_EXTRACT(e2.data, '$.auctionId') = JSON_EXTRACT(event.data, '$.auctionId')
 *   )
 * ```
 *
 * Get user's bid history:
 * ```sql
 * SELECT * FROM event
 * WHERE eventType = 'bid_placed'
 *   AND actor = '0x...'
 * ORDER BY blockTimestamp DESC
 * ```
 */
export const event = onchainTable("event", (t) => ({
  id: t.text().primaryKey(), // tx_hash:log_index

  // Event classification
  eventType: t.text().notNull(), // Specific event name (e.g., "auction_created")
  category: t.text().notNull(), // Event group: "auction" | "offer" | "trade" | "mint" | "collection"

  // Participants
  actor: t.hex().notNull(), // Primary actor (seller, buyer, minter, bidder)
  counterparty: t.hex(), // Secondary actor (if applicable)

  // Asset reference
  collection: t.hex(), // NFT collection address
  tokenId: t.text(), // Token ID (if specific NFT)

  // Event-specific data as JSON string
  // Flexible schema - each event type has its own structure
  data: t.jsonb().notNull(),
  // Contract context
  contractAddress: t.hex().notNull(), // Contract that emitted the event
  contractName: t.text(), // Human-readable name

  // Blockchain data
  blockNumber: t.bigint().notNull(),
  blockTimestamp: t.bigint().notNull(),
  transactionHash: t.hex().notNull(),
  logIndex: t.integer().notNull(),
  chainId: t.integer().notNull(),

  // Processing metadata
  processedAt: t.bigint().notNull(), // When indexer processed this
  version: t.text().notNull().default("3.0"), // Schema version
}), (table) => ({
  // Core indexes
  eventTypeIdx: index().on(table.eventType),
  categoryIdx: index().on(table.category),
  actorIdx: index().on(table.actor),
  counterpartyIdx: index().on(table.counterparty),
  collectionIdx: index().on(table.collection),
  timestampIdx: index().on(table.blockTimestamp),
  txHashIdx: index().on(table.transactionHash),
  chainIdx: index().on(table.chainId),

  // Composite indexes for common queries
  actorTimestampIdx: index().on(table.actor, table.blockTimestamp),
  collectionTimestampIdx: index().on(table.collection, table.blockTimestamp),
  categoryEventTypeIdx: index().on(table.category, table.eventType),
  collectionTokenIdx: index().on(table.collection, table.tokenId),
}));

// ============================================================================
// Aggregate Tables - Projections from Events
// ============================================================================

/**
 * Account - User aggregate data
 *
 * Projection of user activity. Updated by event handlers.
 * All stats derived from events in the event table.
 *
 * @relationship events - event.actor = account.address
 */
export const account = onchainTable("account", (t) => ({
  address: t.hex().primaryKey(),

  // Trading statistics
  totalTrades: t.integer().notNull().default(0),
  totalVolume: t.text().notNull().default("0"), // BigInt as string
  makerTrades: t.integer().notNull().default(0), // As seller
  takerTrades: t.integer().notNull().default(0), // As buyer

  // NFT statistics
  nftsMinted: t.integer().notNull().default(0),
  nftsOwned: t.integer().notNull().default(0),
  collectionsCreated: t.integer().notNull().default(0),

  // Financial statistics
  totalFeesEarned: t.text().notNull().default("0"), // Royalties + creator fees
  totalFeesPaid: t.text().notNull().default("0"), // Trading fees paid

  // Activity timestamps
  firstSeenAt: t.bigint().notNull(),
  lastActiveAt: t.bigint().notNull(),
}), (table) => ({
  volumeIdx: index().on(table.totalVolume),
  tradesIdx: index().on(table.totalTrades),
  lastActiveIdx: index().on(table.lastActiveAt),
}));

/**
 * Collection - NFT collection aggregate
 *
 * Represents an ERC721 or ERC1155 contract.
 * Stats aggregated from mint, trade, and transfer events.
 *
 * @relationship creator -> account.address
 * @relationship owner -> account.address
 * @relationship tokens -> token.collection
 * @relationship events -> event.collection
 */
export const collection = onchainTable("collection", (t) => ({
  id: t.text().primaryKey(), // chainId:address

  address: t.hex().notNull(),
  chainId: t.integer().notNull(),

  // Metadata
  name: t.text(),
  symbol: t.text(),
  tokenType: t.text().notNull(), // "ERC721" | "ERC1155"

  // Ownership
  creator: t.hex(), // Collection creator/deployer
  owner: t.hex(), // Current owner (if transferable ownership)

  // Royalty configuration
  royaltyFee: t.integer().default(0), // Basis points (250 = 2.5%)
  royaltyRecipient: t.hex(),

  // Supply metrics
  maxSupply: t.text(), // Max supply (null = unlimited)
  totalSupply: t.text().notNull().default("0"),
  totalMinted: t.text().notNull().default("0"),
  totalBurned: t.text().notNull().default("0"),

  // Trading statistics
  totalTrades: t.integer().notNull().default(0),
  totalVolume: t.text().notNull().default("0"),
  floorPrice: t.text(), // Lowest active listing price

  // Activity timestamps
  createdAt: t.bigint().notNull(),
  lastMintAt: t.bigint(),
  lastTradeAt: t.bigint(),

  // Status
  isVerified: t.boolean().notNull().default(false),
  isActive: t.boolean().notNull().default(true),

  // Blockchain context
  deployBlockNumber: t.bigint().notNull(),
  deployTxHash: t.hex().notNull(),
}), (table) => ({
  addressIdx: index().on(table.address),
  chainIdx: index().on(table.chainId),
  creatorIdx: index().on(table.creator),
  typeIdx: index().on(table.tokenType),
  volumeIdx: index().on(table.totalVolume),
  floorPriceIdx: index().on(table.floorPrice),
  verifiedIdx: index().on(table.isVerified),
}));

/**
 * Token - Individual NFT aggregate
 *
 * Represents a single NFT (ERC721 token or ERC1155 token type).
 * Updated on mint, transfer, and trade events.
 *
 * @relationship collection -> collection.address
 * @relationship owner -> account.address
 * @relationship minter -> account.address
 * @relationship events -> event (where collection + tokenId match)
 */
export const token = onchainTable("token", (t) => ({
  id: t.text().primaryKey(), // chainId:collection:tokenId

  collection: t.hex().notNull(),
  tokenId: t.text().notNull(),
  chainId: t.integer().notNull(),

  // Ownership
  owner: t.hex().notNull(), // Current owner
  minter: t.hex(), // Original minter

  // Metadata
  tokenUri: t.text(),
  metadataUri: t.text(),

  // ERC1155 supply
  totalSupply: t.text().default("1"), // ERC1155 can have > 1 supply

  // Trading history
  tradeCount: t.integer().notNull().default(0),
  lastSalePrice: t.text(),
  lastSaleToken: t.hex(), // Payment token used in last sale
  lastSaleTimestamp: t.bigint(),

  // Status
  isBurned: t.boolean().notNull().default(false),

  // Timestamps
  mintedAt: t.bigint().notNull(),
  lastTransferAt: t.bigint().notNull(),

  // Mint transaction
  mintBlockNumber: t.bigint().notNull(),
  mintTxHash: t.hex().notNull(),
}), (table) => ({
  collectionIdx: index().on(table.collection),
  ownerIdx: index().on(table.owner),
  minterIdx: index().on(table.minter),
  collectionTokenIdx: index().on(table.collection, table.tokenId),
  chainIdx: index().on(table.chainId),
  lastSalePriceIdx: index().on(table.lastSalePrice),
}));

/**
 * Trade - Completed trade aggregate
 *
 * Records all completed NFT trades for analytics.
 * Derived from trade-related events (purchases, auction settlements, offer acceptances).
 *
 * @relationship maker -> account.address
 * @relationship taker -> account.address
 * @relationship collection -> collection.address
 * @relationship token -> token.id
 * @relationship sourceEvent -> event.id
 */
export const trade = onchainTable("trade", (t) => ({
  id: t.text().primaryKey(), // tx_hash:log_index

  // Participants
  maker: t.hex().notNull(), // Seller
  taker: t.hex().notNull(), // Buyer

  // Asset
  collection: t.hex().notNull(),
  tokenId: t.text().notNull(),
  tokenType: t.text().notNull(), // "ERC721" | "ERC1155"
  amount: t.text().notNull().default("1"), // ERC1155 amount

  // Pricing
  price: t.text().notNull(), // Total price
  paymentToken: t.hex().notNull(), // Payment token (0x0 = native token)

  // Fees
  makerFee: t.text().notNull().default("0"),
  takerFee: t.text().notNull().default("0"),
  royaltyFee: t.text().notNull().default("0"),
  royaltyRecipient: t.hex(),

  // Trade context
  tradeType: t.text().notNull(), // "sale" | "auction" | "offer" | "bundle"
  sourceEventId: t.text(), // Reference to source event

  // Blockchain context
  blockNumber: t.bigint().notNull(),
  blockTimestamp: t.bigint().notNull(),
  transactionHash: t.hex().notNull(),
  logIndex: t.integer().notNull(),
  chainId: t.integer().notNull(),
}), (table) => ({
  makerIdx: index().on(table.maker),
  takerIdx: index().on(table.taker),
  collectionIdx: index().on(table.collection),
  tokenIdx: index().on(table.collection, table.tokenId),
  priceIdx: index().on(table.price),
  timestampIdx: index().on(table.blockTimestamp),
  tradeTypeIdx: index().on(table.tradeType),
  chainIdx: index().on(table.chainId),
  collectionTimestampIdx: index().on(table.collection, table.blockTimestamp),
}));

// ============================================================================
// Analytics Tables
// ============================================================================

/**
 * Daily Collection Statistics
 *
 * Time-series aggregation for analytics dashboards.
 * Updated by event handlers or background jobs.
 */
export const dailyCollectionStats = onchainTable("daily_collection_stats", (t) => ({
  id: t.text().primaryKey(), // chainId:collection:YYYY-MM-DD

  collection: t.hex().notNull(),
  chainId: t.integer().notNull(),
  date: t.text().notNull(), // YYYY-MM-DD

  // Volume metrics
  volume: t.text().notNull().default("0"),
  trades: t.integer().notNull().default(0),

  // Participants
  uniqueBuyers: t.integer().notNull().default(0),
  uniqueSellers: t.integer().notNull().default(0),

  // Price metrics
  floorPrice: t.text(),
  avgPrice: t.text(),
  maxPrice: t.text(),

  // Supply changes
  minted: t.integer().notNull().default(0),
  burned: t.integer().notNull().default(0),
}), (table) => ({
  collectionIdx: index().on(table.collection),
  dateIdx: index().on(table.date),
  collectionDateIdx: index().on(table.collection, table.date),
  chainIdx: index().on(table.chainId),
}));

/**
 * Schema Version - Migration tracking
 */
export const schemaVersion = onchainTable("schema_version", (t) => ({
  version: t.text().primaryKey(),
  appliedAt: t.bigint().notNull(),
  description: t.text(),
}));
