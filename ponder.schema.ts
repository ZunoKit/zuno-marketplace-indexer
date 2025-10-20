/**
 * Ponder Database Schema
 * Defines all database tables for the marketplace indexer
 */

import { onchainTable, index } from "ponder";

/**
 * Marketplace Listings
 */
export const listing = onchainTable(
  "listing",
  (t) => ({
    id: t.text().primaryKey(),
    seller: t.hex().notNull(),
    nftContract: t.hex().notNull(),
    tokenId: t.bigint().notNull(),
    price: t.bigint().notNull(),
    currency: t.hex().notNull(),
    status: t.text().notNull(), // 'ACTIVE' | 'SOLD' | 'CANCELLED'
    createdAt: t.bigint().notNull(),
    updatedAt: t.bigint().notNull(),
    chainId: t.integer().notNull(),
  }),
  (table) => ({
    sellerIdx: index().on(table.seller),
    nftIdx: index().on(table.nftContract, table.tokenId),
    statusIdx: index().on(table.status),
    chainIdx: index().on(table.chainId),
  })
);

/**
 * Offers on Listings
 */
export const offer = onchainTable(
  "offer",
  (t) => ({
    id: t.text().primaryKey(),
    listingId: t.text().notNull(),
    buyer: t.hex().notNull(),
    price: t.bigint().notNull(),
    status: t.text().notNull(), // 'PENDING' | 'ACCEPTED' | 'REJECTED'
    createdAt: t.bigint().notNull(),
    updatedAt: t.bigint().notNull(),
    chainId: t.integer().notNull(),
  }),
  (table) => ({
    listingIdx: index().on(table.listingId),
    buyerIdx: index().on(table.buyer),
    statusIdx: index().on(table.status),
    chainIdx: index().on(table.chainId),
  })
);

/**
 * NFT Ownership Tracking
 */
export const nft = onchainTable(
  "nft",
  (t) => ({
    id: t.text().primaryKey(), // contract-tokenId
    contract: t.hex().notNull(),
    tokenId: t.bigint().notNull(),
    owner: t.hex().notNull(),
    updatedAt: t.bigint().notNull(),
    chainId: t.integer().notNull(),
  }),
  (table) => ({
    ownerIdx: index().on(table.owner),
    contractIdx: index().on(table.contract),
    chainIdx: index().on(table.chainId),
  })
);

/**
 * User Account Statistics
 */
export const account = onchainTable(
  "account",
  (t) => ({
    id: t.hex().primaryKey(), // wallet address
    listingsCount: t.bigint().notNull().default(0n),
    salesCount: t.bigint().notNull().default(0n),
    purchasesCount: t.bigint().notNull().default(0n),
    totalVolume: t.bigint().notNull().default(0n),
    chainId: t.integer().notNull(),
  }),
  (table) => ({
    volumeIdx: index().on(table.totalVolume),
    chainIdx: index().on(table.chainId),
  })
);

/**
 * Transfer Events (for audit trail)
 */
export const transferEvent = onchainTable(
  "transfer_event",
  (t) => ({
    id: t.text().primaryKey(),
    contract: t.hex().notNull(),
    tokenId: t.bigint().notNull(),
    from: t.hex().notNull(),
    to: t.hex().notNull(),
    blockNumber: t.bigint().notNull(),
    timestamp: t.bigint().notNull(),
    transactionHash: t.hex().notNull(),
    chainId: t.integer().notNull(),
  }),
  (table) => ({
    contractIdx: index().on(table.contract),
    fromIdx: index().on(table.from),
    toIdx: index().on(table.to),
    blockIdx: index().on(table.blockNumber),
    chainIdx: index().on(table.chainId),
  })
);

/**
 * Approval Events
 */
export const approvalEvent = onchainTable(
  "approval_event",
  (t) => ({
    id: t.text().primaryKey(),
    contract: t.hex().notNull(),
    owner: t.hex().notNull(),
    approved: t.hex().notNull(),
    tokenId: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    timestamp: t.bigint().notNull(),
    transactionHash: t.hex().notNull(),
    chainId: t.integer().notNull(),
  }),
  (table) => ({
    ownerIdx: index().on(table.owner),
    approvedIdx: index().on(table.approved),
    blockIdx: index().on(table.blockNumber),
    chainIdx: index().on(table.chainId),
  })
);
