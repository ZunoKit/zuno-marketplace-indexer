import { index, onchainTable } from "ponder";

/**
 * Zuno Marketplace Indexer Schema
 * Tracks all marketplace events, transactions, and contract state
 */

// ============================================================================
// Core Tables
// ============================================================================

/**
 * Indexed contracts registry
 */
export const indexedContract = onchainTable("indexed_contract", (t) => ({
  id: t.text().primaryKey(), // Contract address
  name: t.text().notNull(),
  address: t.hex().notNull(),
  chainId: t.integer().notNull(),
  abiId: t.text().notNull(),
  contractType: t.text(), // e.g., "marketplace", "factory", "collection"
  isActive: t.boolean().notNull().default(true),
  deployedAt: t.bigint(), // Block number
  firstIndexedAt: t.bigint().notNull(), // Timestamp
  lastIndexedAt: t.bigint().notNull(), // Timestamp
}), (table) => ({
  addressIdx: index().on(table.address),
  chainIdx: index().on(table.chainId),
  typeIdx: index().on(table.contractType),
}));

/**
 * Users/Accounts participating in the marketplace
 */
export const account = onchainTable("account", (t) => ({
  address: t.hex().primaryKey(),
  
  // Activity stats
  totalTrades: t.integer().notNull().default(0),
  totalVolume: t.text().notNull().default("0"), // BigInt as string
  makerTrades: t.integer().notNull().default(0),
  takerTrades: t.integer().notNull().default(0),
  
  // NFT stats
  nftsMinted: t.integer().notNull().default(0),
  nftsOwned: t.integer().notNull().default(0),
  collectionsCreated: t.integer().notNull().default(0),
  
  // Fee & rewards
  totalFeesEarned: t.text().notNull().default("0"),
  totalFeesPaid: t.text().notNull().default("0"),
  
  // Timestamps
  firstSeenAt: t.bigint().notNull(),
  lastActiveAt: t.bigint().notNull(),
}));

// ============================================================================
// Marketplace Tables
// ============================================================================

/**
 * Marketplace listings (orders)
 */
export const listing = onchainTable("listing", (t) => ({
  id: t.text().primaryKey(), // Order ID or hash
  
  // Order details
  orderHash: t.hex().notNull(),
  maker: t.hex().notNull(),
  taker: t.hex(), // Null if open to anyone
  
  // Asset details
  collection: t.hex().notNull(),
  tokenId: t.text().notNull(), // BigInt as string
  tokenType: t.text().notNull(), // "ERC721" or "ERC1155"
  amount: t.text().notNull().default("1"), // For ERC1155
  
  // Pricing
  price: t.text().notNull(), // BigInt as string
  paymentToken: t.hex().notNull(), // Address of payment token (ETH = 0x0)
  
  // Status
  status: t.text().notNull(), // "active", "filled", "cancelled", "expired"
  fillPercent: t.integer().notNull().default(0), // 0-100 for partial fills
  
  // Timestamps & blocks
  createdAt: t.bigint().notNull(),
  expiresAt: t.bigint(),
  filledAt: t.bigint(),
  cancelledAt: t.bigint(),
  
  blockNumber: t.bigint().notNull(),
  transactionHash: t.hex().notNull(),
  logIndex: t.integer().notNull(),
  chainId: t.integer().notNull(),
}), (table) => ({
  makerIdx: index().on(table.maker),
  takerIdx: index().on(table.taker),
  collectionIdx: index().on(table.collection),
  statusIdx: index().on(table.status),
  chainIdx: index().on(table.chainId),
}));

/**
 * Trade/Sale executions
 */
export const trade = onchainTable("trade", (t) => ({
  id: t.text().primaryKey(), // tx_hash + log_index
  
  // Trade participants
  maker: t.hex().notNull(),
  taker: t.hex().notNull(),
  
  // Asset traded
  collection: t.hex().notNull(),
  tokenId: t.text().notNull(),
  tokenType: t.text().notNull(),
  amount: t.text().notNull().default("1"),
  
  // Pricing & fees
  price: t.text().notNull(), // Total price
  paymentToken: t.hex().notNull(),
  makerFee: t.text().notNull().default("0"),
  takerFee: t.text().notNull().default("0"),
  royaltyFee: t.text().notNull().default("0"),
  royaltyRecipient: t.hex(),
  
  // Order reference
  orderHash: t.hex(),
  listingId: t.text(),
  
  // Metadata
  tradeType: t.text().notNull(), // "sale", "offer_accepted", "auction_won"
  
  // Block data
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
  blockIdx: index().on(table.blockNumber),
  timestampIdx: index().on(table.blockTimestamp),
  chainIdx: index().on(table.chainId),
}));

/**
 * Collection/NFT information
 */
export const collection = onchainTable("collection", (t) => ({
  id: t.text().primaryKey(), // chainId:address
  
  address: t.hex().notNull(),
  chainId: t.integer().notNull(),
  
  // Collection metadata
  name: t.text(),
  symbol: t.text(),
  tokenType: t.text().notNull(), // "ERC721" or "ERC1155"
  creator: t.hex(),
  owner: t.hex(),
  
  // Settings
  royaltyFee: t.integer().default(0), // Basis points
  royaltyRecipient: t.hex(),
  maxSupply: t.text(), // BigInt as string
  
  // Stats
  totalSupply: t.text().notNull().default("0"),
  totalMinted: t.text().notNull().default("0"),
  totalBurned: t.text().notNull().default("0"),
  totalTrades: t.integer().notNull().default(0),
  totalVolume: t.text().notNull().default("0"),
  floorPrice: t.text(),
  
  // Status
  isVerified: t.boolean().notNull().default(false),
  isActive: t.boolean().notNull().default(true),
  
  // Timestamps
  createdAt: t.bigint().notNull(),
  lastTradeAt: t.bigint(),
  
  blockNumber: t.bigint().notNull(),
  transactionHash: t.hex().notNull(),
}), (table) => ({
  addressIdx: index().on(table.address),
  chainIdx: index().on(table.chainId),
  creatorIdx: index().on(table.creator),
  typeIdx: index().on(table.tokenType),
}));

/**
 * Individual NFT tokens
 */
export const token = onchainTable("token", (t) => ({
  id: t.text().primaryKey(), // chainId:collection:tokenId
  
  collection: t.hex().notNull(),
  tokenId: t.text().notNull(),
  chainId: t.integer().notNull(),
  
  // Ownership
  owner: t.hex().notNull(),
  minter: t.hex(),
  
  // Metadata
  tokenUri: t.text(),
  metadataUri: t.text(),
  
  // ERC1155 specific
  totalSupply: t.text().default("1"), // For ERC1155
  
  // Trading stats
  tradeCount: t.integer().notNull().default(0),
  lastSalePrice: t.text(),
  lastSaleToken: t.hex(),
  
  // Status
  isBurned: t.boolean().notNull().default(false),
  
  // Timestamps
  mintedAt: t.bigint().notNull(),
  lastTransferAt: t.bigint().notNull(),
  lastTradeAt: t.bigint(),
  
  blockNumber: t.bigint().notNull(),
  transactionHash: t.hex().notNull(),
}), (table) => ({
  collectionIdx: index().on(table.collection),
  ownerIdx: index().on(table.owner),
  minterIdx: index().on(table.minter),
  collectionTokenIdx: index().on(table.collection, table.tokenId),
  chainIdx: index().on(table.chainId),
}));

// ============================================================================
// Event Log Tables
// ============================================================================

/**
 * Raw event logs for all tracked events
 */
export const eventLog = onchainTable("event_log", (t) => ({
  id: t.text().primaryKey(), // tx_hash:log_index
  
  // Event identification
  eventName: t.text().notNull(),
  contractAddress: t.hex().notNull(),
  contractName: t.text(),
  
  // Event data (JSON serialized)
  eventData: t.text().notNull(), // JSON string of event args
  
  // Block data
  blockNumber: t.bigint().notNull(),
  blockTimestamp: t.bigint().notNull(),
  transactionHash: t.hex().notNull(),
  transactionIndex: t.integer().notNull(),
  logIndex: t.integer().notNull(),
  chainId: t.integer().notNull(),
  
  // Transaction details
  from: t.hex().notNull(),
  to: t.hex(),
  gasUsed: t.text(),
  
  // Processing status
  processed: t.boolean().notNull().default(true),
  processingError: t.text(),
}), (table) => ({
  eventIdx: index().on(table.eventName),
  contractIdx: index().on(table.contractAddress),
  blockIdx: index().on(table.blockNumber),
  timestampIdx: index().on(table.blockTimestamp),
  txIdx: index().on(table.transactionHash),
  chainIdx: index().on(table.chainId),
}));

/**
 * Transaction summary
 */
export const transaction = onchainTable("transaction", (t) => ({
  id: t.text().primaryKey(), // chainId:tx_hash
  
  hash: t.hex().notNull(),
  chainId: t.integer().notNull(),
  
  // Transaction details
  from: t.hex().notNull(),
  to: t.hex(),
  value: t.text().notNull(), // ETH value
  gasUsed: t.text().notNull(),
  gasPrice: t.text().notNull(),
  
  // Block data
  blockNumber: t.bigint().notNull(),
  blockTimestamp: t.bigint().notNull(),
  transactionIndex: t.integer().notNull(),
  
  // Events in this transaction
  eventCount: t.integer().notNull().default(0),
  eventNames: t.text(), // Comma-separated event names
  
  // Status
  status: t.text().notNull(), // "success" or "reverted"
}), (table) => ({
  hashIdx: index().on(table.hash),
  fromIdx: index().on(table.from),
  toIdx: index().on(table.to),
  blockIdx: index().on(table.blockNumber),
  timestampIdx: index().on(table.blockTimestamp),
  chainIdx: index().on(table.chainId),
}));

// ============================================================================
// Analytics & Aggregation Tables
// ============================================================================

/**
 * Daily statistics per collection
 */
export const dailyCollectionStats = onchainTable("daily_collection_stats", (t) => ({
  id: t.text().primaryKey(), // chainId:collection:date
  
  collection: t.hex().notNull(),
  chainId: t.integer().notNull(),
  date: t.text().notNull(), // YYYY-MM-DD
  
  // Volume stats
  volume: t.text().notNull().default("0"),
  trades: t.integer().notNull().default(0),
  
  // Unique users
  uniqueBuyers: t.integer().notNull().default(0),
  uniqueSellers: t.integer().notNull().default(0),
  
  // Price stats
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
 * Global marketplace statistics
 */
export const marketplaceStats = onchainTable("marketplace_stats", (t) => ({
  id: t.text().primaryKey(), // chainId:date
  
  chainId: t.integer().notNull(),
  date: t.text().notNull(), // YYYY-MM-DD or "all-time"
  
  // Volume metrics
  totalVolume: t.text().notNull().default("0"),
  totalTrades: t.integer().notNull().default(0),
  totalFees: t.text().notNull().default("0"),
  
  // Collection metrics
  activeCollections: t.integer().notNull().default(0),
  newCollections: t.integer().notNull().default(0),
  
  // User metrics
  activeUsers: t.integer().notNull().default(0),
  newUsers: t.integer().notNull().default(0),
  
  // Listing metrics
  activeListings: t.integer().notNull().default(0),
  newListings: t.integer().notNull().default(0),
  
  // Updated timestamp
  lastUpdatedAt: t.bigint().notNull(),
}), (table) => ({
  chainDateIdx: index().on(table.chainId, table.date),
  dateIdx: index().on(table.date),
}));
