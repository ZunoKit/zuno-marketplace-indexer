/**
 * Event Type Definitions
 * Type-safe event arguments for all marketplace events
 */

import type { Address, Hash } from "./index";

// ============================================================================
// Collection Events
// ============================================================================

export interface ERC721CollectionCreatedEvent {
  collectionAddress: Address;
  creator: Address;
  name: string;
  symbol: string;
  maxSupply: bigint;
}

export interface ERC1155CollectionCreatedEvent {
  collectionAddress: Address;
  creator: Address;
  uri: string;
}

// ============================================================================
// NFT Transfer Events
// ============================================================================

export interface TransferEvent {
  from: Address;
  to: Address;
  tokenId: bigint;
}

export interface TransferSingleEvent {
  operator: Address;
  from: Address;
  to: Address;
  id: bigint;
  value: bigint;
}

export interface TransferBatchEvent {
  operator: Address;
  from: Address;
  to: Address;
  ids: bigint[];
  values: bigint[];
}

// ============================================================================
// Marketplace Trading Events
// ============================================================================

export interface NFTListedEvent {
  listingId: Hash;
  nftContract: Address;
  tokenId: bigint;
  seller: Address;
  price: bigint;
  paymentToken: Address;
  expiresAt: bigint;
}

export interface NFTUnlistedEvent {
  listingId: Hash;
  seller: Address;
}

export interface NFTPurchasedEvent {
  listingId: Hash;
  nftContract: Address;
  tokenId: bigint;
  seller: Address;
  buyer: Address;
  price: bigint;
  paymentToken: Address;
  platformFee: bigint;
  royaltyFee: bigint;
  royaltyRecipient: Address;
}

export interface OrderFulfilledEvent {
  orderHash: Hash;
  buyer: Address;
  seller: Address;
  nftContract: Address;
  tokenId: bigint;
  price: bigint;
  paymentToken: Address;
}

export interface OrderCreatedEvent {
  orderHash: Hash;
  maker: Address;
  taker: Address;
  nftContract: Address;
  tokenId: bigint;
  price: bigint;
  paymentToken: Address;
  expirationTime: bigint;
}

export interface OrderCancelledEvent {
  orderHash: Hash;
  maker: Address;
}

// ============================================================================
// Auction Events
// ============================================================================

export interface AuctionCreatedEvent {
  auctionId: Hash | bigint;
  nftContract: Address;
  tokenId: bigint;
  seller: Address;
  startingPrice: bigint;
  reservePrice?: bigint;
  duration?: bigint;
  startTime?: bigint;
  endTime: bigint;
}

export interface BidPlacedEvent {
  auctionId: bigint | Hash;
  bidder: Address;
  bidAmount: bigint;
  timestamp?: bigint;
}

export interface AuctionFinalizedEvent {
  auctionId: Hash | bigint;
  winner: Address;
  finalPrice: bigint;
}

export interface AuctionEndedEvent {
  auctionId: bigint;
  winner: Address;
  winningBid: bigint;
  settled: boolean;
}

export interface AuctionCancelledEvent {
  auctionId: bigint;
  seller: Address;
}

// ============================================================================
// Offer Events
// ============================================================================

export interface OfferCreatedEvent {
  offerId: Hash;
  nftContract: Address;
  tokenId: bigint;
  offerer: Address;
  nftOwner?: Address;
  offerPrice: bigint;
  paymentToken?: Address;
  expirationTime: bigint;
}

export interface OfferMadeEvent {
  offerId: Hash;
  nftContract: Address;
  tokenId: bigint;
  offerer: Address;
  offerAmount: bigint;
  paymentToken: Address;
  expirationTime: bigint;
}

export interface OfferAcceptedEvent {
  offerId: Hash;
  nftContract: Address;
  tokenId: bigint;
  offerer: Address;
  seller: Address;
  offerPrice: bigint;
  offerAmount?: bigint;
  paymentToken?: Address;
}

export interface OfferCancelledEvent {
  offerId: Hash;
  offerer: Address;
}

// ============================================================================
// Fee & Royalty Events
// ============================================================================

export interface RoyaltyPaidEvent {
  nftContract: Address;
  tokenId: bigint;
  recipient: Address;
  amount: bigint;
}

export interface PlatformFeeUpdatedEvent {
  newFeePercentage: bigint;
  updatedBy: Address;
}

// ============================================================================
// Bundle Events
// ============================================================================

export interface BundleCreatedEvent {
  bundleId: bigint;
  creator: Address;
  nftContracts: Address[];
  tokenIds: bigint[];
  price: bigint;
}

export interface BundlePurchasedEvent {
  bundleId: bigint;
  buyer: Address;
  seller: Address;
  price: bigint;
}

// ============================================================================
// Event Union Type
// ============================================================================

export type MarketplaceEvent =
  | { type: "ERC721CollectionCreated"; args: ERC721CollectionCreatedEvent }
  | { type: "ERC1155CollectionCreated"; args: ERC1155CollectionCreatedEvent }
  | { type: "Transfer"; args: TransferEvent }
  | { type: "TransferSingle"; args: TransferSingleEvent }
  | { type: "TransferBatch"; args: TransferBatchEvent }
  | { type: "NFTListed"; args: NFTListedEvent }
  | { type: "NFTUnlisted"; args: NFTUnlistedEvent }
  | { type: "NFTPurchased"; args: NFTPurchasedEvent }
  | { type: "OrderFulfilled"; args: OrderFulfilledEvent }
  | { type: "OrderCreated"; args: OrderCreatedEvent }
  | { type: "OrderCancelled"; args: OrderCancelledEvent }
  | { type: "AuctionCreated"; args: AuctionCreatedEvent }
  | { type: "BidPlaced"; args: BidPlacedEvent }
  | { type: "AuctionEnded"; args: AuctionEndedEvent }
  | { type: "AuctionCancelled"; args: AuctionCancelledEvent }
  | { type: "OfferMade"; args: OfferMadeEvent }
  | { type: "OfferAccepted"; args: OfferAcceptedEvent }
  | { type: "OfferCancelled"; args: OfferCancelledEvent }
  | { type: "RoyaltyPaid"; args: RoyaltyPaidEvent }
  | { type: "PlatformFeeUpdated"; args: PlatformFeeUpdatedEvent }
  | { type: "BundleCreated"; args: BundleCreatedEvent }
  | { type: "BundlePurchased"; args: BundlePurchasedEvent };

// ============================================================================
// Event Handler Context
// ============================================================================

export interface EventContext<TEvent> {
  event: {
    args: TEvent;
    block: {
      number: bigint;
      timestamp: bigint;
      hash: Hash;
    };
    transaction: {
      hash: Hash;
      from: Address;
      to: Address | null;
      value?: bigint;
      transactionIndex: number;
    };
    log: {
      address: Address;
      logIndex: number;
      topics: string[];
    };
  };
  network: {
    chainId: number;
    name: string;
  };
  db: any;
}
