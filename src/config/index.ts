/**
 * Configuration Module
 * Single source of truth for application configuration
 */

// ============================================================================
// Application
// ============================================================================

export const APP = {
  NAME: "Zuno Marketplace Indexer",
  VERSION: "1.0.0",
} as const;

// ============================================================================
// API
// ============================================================================

export const API = {
  PORT: 42069,
  PAGINATION_LIMIT: 20,
  PAGINATION_MAX: 100,
  TIMEOUT: 30000,
  CACHE_TTL: 5 * 60 * 1000,
} as const;

// ============================================================================
// Blockchain
// ============================================================================

export const CHAIN = {
  MAX_RPC_REQ_PER_SEC: 50,
} as const;

export const CHAIN_IDS = {
  ETHEREUM: 1,
  SEPOLIA: 11155111,
  POLYGON: 137,
  BASE: 8453,
  OPTIMISM: 10,
  ARBITRUM: 42161,
  ANVIL: 31337,
} as const;

// ============================================================================
// NFT Standards
// ============================================================================

export const ERC165_IDS = {
  ERC721: "0x80ac58cd",
  ERC1155: "0xd9b67a26",
  ERC2981: "0x2a55205a", // Royalty
} as const;

// ============================================================================
// Marketplace
// ============================================================================

export const MARKETPLACE = {
  DEFAULT_ROYALTY_BPS: 250, // 2.5%
  DEFAULT_PLATFORM_BPS: 250, // 2.5%
  BPS_DIVISOR: 10000,
} as const;

// ============================================================================
// Events
// ============================================================================

export const EVENT = {
  // Collections
  ERC721_CREATED: "ERC721CollectionCreated",
  ERC1155_CREATED: "ERC1155CollectionCreated",

  // Trading
  NFT_LISTED: "NFTListed",
  NFT_PURCHASED: "NFTPurchased",
  NFT_SOLD: "NFTSold",
  LISTING_CANCELLED: "ListingCancelled",
  LISTING_UPDATED: "ListingUpdated",

  // Orders
  ORDER_CREATED: "OrderCreated",
  ORDER_FULFILLED: "OrderFulfilled",
  ORDER_CANCELLED: "OrderCancelled",

  // Offers
  OFFER_CREATED: "OfferCreated",
  OFFER_ACCEPTED: "OfferAccepted",
  OFFER_CANCELLED: "OfferCancelled",

  // Auctions
  AUCTION_CREATED: "AuctionCreated",

  // Transfers
  TRANSFER: "Transfer",
  TRANSFER_SINGLE: "TransferSingle",
  TRANSFER_BATCH: "TransferBatch",
} as const;

// ============================================================================
// Retry
// ============================================================================

export const RETRY = {
  MAX_ATTEMPTS: 3,
  INITIAL_DELAY: 1000,
  MAX_DELAY: 10000,
  BACKOFF: 2,
} as const;


// ============================================================================
// Constants
// ============================================================================

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as const;
