/**
 * Event Validation Schemas
 *
 * Zod schemas for type-safe event data validation.
 * Each event type has its own schema defining the structure of the JSONB data field.
 *
 * Benefits:
 * - Runtime type validation
 * - Auto-generated TypeScript types
 * - Self-documenting event structures
 * - Prevents invalid data from being stored
 *
 * @module schemas/event
 */

import { z } from "zod";

// ============================================================================
// Base Schemas & Helpers
// ============================================================================

/**
 * Ethereum address schema
 */
const AddressSchema = z.custom<`0x${string}`>((val) => {
  return typeof val === "string" && /^0x[a-fA-F0-9]{40}$/.test(val);
});

/**
 * BigInt as string schema (for prices, amounts, etc.)
 */
const BigIntStringSchema = z.string().regex(/^\d+$/);

/**
 * Unix timestamp (bigint)
 */
const TimestampSchema = z.bigint();

// ============================================================================
// Auction Event Schemas
// ============================================================================

/**
 * Auction Created Event Data
 */
export const AuctionCreatedDataSchema = z.object({
  auctionId: AddressSchema,
  auctionType: z.enum(["english", "dutch"]),
  startPrice: BigIntStringSchema,
  reservePrice: BigIntStringSchema.optional(),
  endPrice: BigIntStringSchema.optional(), // Dutch auctions
  priceDecrement: BigIntStringSchema.optional(), // Dutch auctions
  startTime: TimestampSchema,
  endTime: TimestampSchema,
  paymentToken: AddressSchema.optional(),
});

export type AuctionCreatedData = z.infer<typeof AuctionCreatedDataSchema>;

/**
 * Bid Placed Event Data
 */
export const BidPlacedDataSchema = z.object({
  auctionId: AddressSchema,
  bidAmount: BigIntStringSchema,
  previousBid: BigIntStringSchema.optional(),
  previousBidder: AddressSchema.optional(),
  isWinning: z.boolean().default(true),
});

export type BidPlacedData = z.infer<typeof BidPlacedDataSchema>;

/**
 * Auction Settled Event Data
 */
export const AuctionSettledDataSchema = z.object({
  auctionId: AddressSchema,
  winner: AddressSchema,
  finalPrice: BigIntStringSchema,
  totalBids: z.number(),
});

export type AuctionSettledData = z.infer<typeof AuctionSettledDataSchema>;

/**
 * Auction Cancelled Event Data
 */
export const AuctionCancelledDataSchema = z.object({
  auctionId: AddressSchema,
  reason: z.string().optional(),
});

export type AuctionCancelledData = z.infer<typeof AuctionCancelledDataSchema>;

// ============================================================================
// Offer Event Schemas
// ============================================================================

/**
 * Offer Created Event Data
 */
export const OfferCreatedDataSchema = z.object({
  offerId: AddressSchema,
  offerType: z.enum(["nft", "collection"]),
  amount: BigIntStringSchema,
  paymentToken: AddressSchema,
  expiresAt: TimestampSchema,
});

export type OfferCreatedData = z.infer<typeof OfferCreatedDataSchema>;

/**
 * Offer Accepted Event Data
 */
export const OfferAcceptedDataSchema = z.object({
  offerId: AddressSchema,
  acceptedBy: AddressSchema,
  amount: BigIntStringSchema,
});

export type OfferAcceptedData = z.infer<typeof OfferAcceptedDataSchema>;

/**
 * Offer Cancelled Event Data
 */
export const OfferCancelledDataSchema = z.object({
  offerId: AddressSchema,
  reason: z.string().optional(),
});

export type OfferCancelledData = z.infer<typeof OfferCancelledDataSchema>;

// ============================================================================
// Listing Event Schemas
// ============================================================================

/**
 * Listing Created Event Data
 */
export const ListingCreatedDataSchema = z.object({
  listingId: z.string(),
  orderHash: AddressSchema.optional(),
  price: BigIntStringSchema,
  paymentToken: AddressSchema,
  expiresAt: TimestampSchema.optional(),
  amount: z.string().default("1"), // ERC1155 amount
});

export type ListingCreatedData = z.infer<typeof ListingCreatedDataSchema>;

/**
 * Listing Cancelled Event Data
 */
export const ListingCancelledDataSchema = z.object({
  listingId: z.string(),
  reason: z.string().optional(),
});

export type ListingCancelledData = z.infer<typeof ListingCancelledDataSchema>;

/**
 * Listing Filled Event Data
 */
export const ListingFilledDataSchema = z.object({
  listingId: z.string(),
  buyer: AddressSchema,
  price: BigIntStringSchema,
  amount: z.string().default("1"),
});

export type ListingFilledData = z.infer<typeof ListingFilledDataSchema>;

// ============================================================================
// Trade Event Schemas
// ============================================================================

/**
 * NFT Purchased Event Data
 */
export const NFTPurchasedDataSchema = z.object({
  price: BigIntStringSchema,
  paymentToken: AddressSchema,
  makerFee: BigIntStringSchema.default("0"),
  takerFee: BigIntStringSchema.default("0"),
  royaltyFee: BigIntStringSchema.default("0"),
  royaltyRecipient: AddressSchema.optional(),
  amount: z.string().default("1"), // ERC1155
});

export type NFTPurchasedData = z.infer<typeof NFTPurchasedDataSchema>;

/**
 * Bundle Purchased Event Data
 */
export const BundlePurchasedDataSchema = z.object({
  bundleId: z.string(),
  items: z.array(
    z.object({
      collection: AddressSchema,
      tokenId: z.string(),
      amount: z.string(),
    })
  ),
  totalPrice: BigIntStringSchema,
  paymentToken: AddressSchema,
});

export type BundlePurchasedData = z.infer<typeof BundlePurchasedDataSchema>;

// ============================================================================
// Mint Event Schemas
// ============================================================================

/**
 * NFT Minted Event Data
 */
export const NFTMintedDataSchema = z.object({
  tokenId: z.string(),
  recipient: AddressSchema,
  mintPrice: BigIntStringSchema.optional(),
  tokenUri: z.string().optional(),
  amount: z.number().default(1), // ERC1155
});

export type NFTMintedData = z.infer<typeof NFTMintedDataSchema>;

/**
 * Batch Minted Event Data
 */
export const BatchMintedDataSchema = z.object({
  tokenIds: z.array(z.string()),
  recipient: AddressSchema,
  mintPrice: BigIntStringSchema.optional(),
  count: z.number(),
});

export type BatchMintedData = z.infer<typeof BatchMintedDataSchema>;

// ============================================================================
// Collection Event Schemas
// ============================================================================

/**
 * Collection Created Event Data
 */
export const CollectionCreatedDataSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  tokenType: z.enum(["ERC721", "ERC1155"]),
  maxSupply: z.string().optional(),
  royaltyFee: z.number().optional(),
  royaltyRecipient: AddressSchema.optional(),
});

export type CollectionCreatedData = z.infer<typeof CollectionCreatedDataSchema>;

// ============================================================================
// Schema Registry
// ============================================================================

/**
 * Map event types to their validation schemas
 *
 * Usage:
 * ```typescript
 * const schema = EVENT_SCHEMAS["auction_created"];
 * const validData = schema.parse(eventData);
 * ```
 */
export const EVENT_SCHEMAS = {
  // Auction events
  auction_created: AuctionCreatedDataSchema,
  bid_placed: BidPlacedDataSchema,
  auction_settled: AuctionSettledDataSchema,
  auction_cancelled: AuctionCancelledDataSchema,

  // Offer events
  offer_created: OfferCreatedDataSchema,
  offer_accepted: OfferAcceptedDataSchema,
  offer_cancelled: OfferCancelledDataSchema,

  // Listing events
  listing_created: ListingCreatedDataSchema,
  listing_cancelled: ListingCancelledDataSchema,
  listing_filled: ListingFilledDataSchema,

  // Trade events
  nft_purchased: NFTPurchasedDataSchema,
  bundle_purchased: BundlePurchasedDataSchema,

  // Mint events
  nft_minted: NFTMintedDataSchema,
  batch_minted: BatchMintedDataSchema,

  // Collection events
  collection_created: CollectionCreatedDataSchema,
} as const;

export type EventType = keyof typeof EVENT_SCHEMAS;

/**
 * Validate event data against its schema
 *
 * @param eventType Event type
 * @param data Event data to validate
 * @returns Validated and typed data
 * @throws ZodError if validation fails
 *
 * @example
 * ```typescript
 * const validData = validateEventData("auction_created", rawData);
 * ```
 */
export function validateEventData<T extends EventType>(
  eventType: T,
  data: unknown
): any {
  const schema = EVENT_SCHEMAS[eventType];
  return schema.parse(data);
}

/**
 * Safe validation that returns result instead of throwing
 *
 * @param eventType Event type
 * @param data Event data to validate
 * @returns Success/failure result
 *
 * @example
 * ```typescript
 * const result = safeValidateEventData("auction_created", rawData);
 * if (result.success) {
 *   // Use validated data
 * } else {
 *   // Handle validation error
 * }
 * ```
 */
export function safeValidateEventData<T extends EventType>(
  eventType: T,
  data: unknown
): { success: true; data: any } | { success: false; error: z.ZodError } {
  const schema = EVENT_SCHEMAS[eventType];
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, error: result.error };
  }
}
