/**
 * Database Schema Types
 * Type definitions for Ponder database tables
 */

export interface Listing {
  id: string;
  seller: `0x${string}`;
  nftContract: `0x${string}`;
  tokenId: bigint;
  price: bigint;
  currency: `0x${string}`;
  status: ListingStatus;
  createdAt: bigint;
  updatedAt: bigint;
}

export enum ListingStatus {
  ACTIVE = "ACTIVE",
  SOLD = "SOLD",
  CANCELLED = "CANCELLED",
}

export interface Offer {
  id: string;
  listingId: string;
  buyer: `0x${string}`;
  price: bigint;
  status: OfferStatus;
  createdAt: bigint;
  updatedAt: bigint;
}

export enum OfferStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export interface NFT {
  id: string;
  contract: `0x${string}`;
  tokenId: bigint;
  owner: `0x${string}`;
  updatedAt: bigint;
}

export interface Account {
  id: `0x${string}`;
  listingsCount: bigint;
  salesCount: bigint;
  purchasesCount: bigint;
  totalVolume: bigint;
}
