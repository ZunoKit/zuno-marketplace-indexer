/**
 * Core Types & Interfaces
 * Domain types used across the application
 */

// ============================================================================
// Primitive Blockchain Types
// ============================================================================

export type Address = `0x${string}`;
export type Hash = `0x${string}`;
export type BlockNumber = bigint;
export type Timestamp = bigint;
export type ChainId = number;

// ============================================================================
// Re-export Ponder Types
// ============================================================================

export * from "./ponder";

// ============================================================================
// Common Enums
// ============================================================================

export enum TokenType {
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
}

export enum TradeType {
  SALE = "sale",
  OFFER_ACCEPTED = "offer_accepted",
  AUCTION_WON = "auction_won",
}

export enum ListingStatus {
  ACTIVE = "active",
  FILLED = "filled",
  CANCELLED = "cancelled",
  EXPIRED = "expired",
}

// ============================================================================
// Entity Types
// ============================================================================

export interface Account {
  address: Address;
  totalTrades: number;
  totalVolume: string;
  makerTrades: number;
  takerTrades: number;
  nftsMinted: number;
  nftsOwned: number;
  collectionsCreated: number;
  totalFeesEarned: string;
  totalFeesPaid: string;
  firstSeenAt: Timestamp;
  lastActiveAt: Timestamp;
}

export interface Collection {
  id: string;
  address: Address;
  chainId: ChainId;
  name: string | null;
  symbol: string | null;
  tokenType: TokenType;
  creator: Address | null;
  owner: Address | null;
  royaltyFee: number | null;
  royaltyRecipient: Address | null;
  maxSupply: string | null;
  totalSupply: string;
  totalMinted: string;
  totalBurned: string;
  totalTrades: number;
  totalVolume: string;
  floorPrice: string | null;
  isVerified: boolean;
  isActive: boolean;
  createdAt: Timestamp;
  lastTradeAt: Timestamp | null;
  blockNumber: BlockNumber;
  transactionHash: Hash;
}

export interface Token {
  id: string;
  collection: Address;
  tokenId: string;
  chainId: ChainId;
  owner: Address;
  minter: Address | null;
  tokenUri: string | null;
  metadataUri: string | null;
  totalSupply: string;
  tradeCount: number;
  lastSalePrice: string | null;
  lastSaleToken: Address | null;
  isBurned: boolean;
  mintedAt: Timestamp;
  lastTransferAt: Timestamp;
  lastTradeAt: Timestamp | null;
  blockNumber: BlockNumber;
  transactionHash: Hash;
}

export interface Trade {
  id: string;
  maker: Address;
  taker: Address;
  collection: Address;
  tokenId: string;
  tokenType: TokenType;
  amount: string;
  price: string;
  paymentToken: Address;
  makerFee: string;
  takerFee: string;
  royaltyFee: string;
  royaltyRecipient: Address | null;
  orderHash: Hash | null;
  listingId: string | null;
  tradeType: TradeType;
  blockNumber: BlockNumber;
  blockTimestamp: Timestamp;
  transactionHash: Hash;
  logIndex: number;
  chainId: ChainId;
}

export interface EventLog {
  id: string;
  eventName: string;
  contractAddress: Address;
  contractName: string | null;
  eventData: string;
  blockNumber: BlockNumber;
  blockTimestamp: Timestamp;
  transactionHash: Hash;
  transactionIndex: number;
  logIndex: number;
  chainId: ChainId;
  from: Address;
  to: Address | null;
  gasUsed: string | null;
  processed: boolean;
  processingError: string | null;
}

// ============================================================================
// Event Context Types
// ============================================================================

export interface BaseEvent {
  block: {
    number: BlockNumber;
    timestamp: Timestamp;
    hash: Hash;
  };
  transaction: {
    hash: Hash;
    from: Address;
    to: Address | null;
    value?: bigint;
    gas?: bigint;
    gasPrice?: bigint;
    transactionIndex: number;
  };
  log: {
    address: Address;
    logIndex: number;
    topics: string[];
  };
}

export interface NetworkContext {
  chainId: ChainId;
  name: string;
}

// ============================================================================
// External API Types (Zuno Marketplace ABIs API)
// ============================================================================

export interface ApiNetwork {
  id: string;
  name: string;
  slug: string;
  chainId: number;
  type: string;
  isTestnet: boolean;
  isActive: boolean;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls?: string[];
  blockExplorerUrls?: string[];
}

export interface ApiContract {
  id: string;
  address: string;
  networkId: string;
  abiId: string;
  name: string;
  type: string | null;
  isVerified: boolean;
  deployedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface AbiItem {
  type: string;
  name?: string;
  inputs?: Array<{
    name: string;
    type: string;
    internalType?: string;
    indexed?: boolean;
  }>;
  outputs?: Array<{
    name: string;
    type: string;
    internalType?: string;
  }>;
  stateMutability?: string;
  anonymous?: boolean;
}

export interface ApiAbiDetail {
  id: string;
  name: string;
  description: string;
  contractName: string;
  abi: AbiItem[];
  abiHash: string;
  version: string;
  tags: string[];
  standard: string | null;
  metadata?: {
    compiler?: string;
    compilerVersion?: string;
  };
  ipfsHash: string;
  ipfsUrl: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// Result Types
// ============================================================================

export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
  };
}
