/**
 * Collection Event Handlers
 * Handles all collection-related events (ERC721/ERC1155 creation)
 */

import type { Context } from "ponder:registry";
import * as schema from "ponder:schema";
import { TokenType } from "../core/types";
import { generateCollectionId, normalizeAddress } from "../core/utils/helpers";
import { AccountRepository } from "../repositories/account.repository";

export async function handleERC721CollectionCreated(event: any, context: Context<any, any>) {
  console.log('[Handler] ERC721CollectionCreated:', event.args);

  const { collectionAddress, creator } = event.args as {
    collectionAddress: `0x${string}`;
    creator: `0x${string}`;
  };

  // Initialize repository
  const accountRepo = new AccountRepository({
    db: context.db,
    network: context.network
  });

  // Create or get account
  await accountRepo.getOrCreate(creator, event.block.timestamp);

  // Create collection record
  const collectionId = generateCollectionId(context.network.chainId, collectionAddress);
  
  await context.db.insert(schema.collection).values({
    id: collectionId,
    address: normalizeAddress(collectionAddress),
    chainId: context.network.chainId,
    name: null,
    symbol: null,
    tokenType: TokenType.ERC721,
    creator: normalizeAddress(creator),
    owner: normalizeAddress(creator),
    royaltyFee: 0,
    royaltyRecipient: null,
    maxSupply: null,
    totalSupply: "0",
    totalMinted: "0",
    totalBurned: "0",
    totalTrades: 0,
    totalVolume: "0",
    floorPrice: null,
    isVerified: false,
    isActive: true,
    createdAt: event.block.timestamp,
    lastTradeAt: null,
    blockNumber: event.block.number,
    transactionHash: event.transaction.hash,
  });

  // Update account collections created
  await accountRepo.incrementCollectionsCreated(creator);
}

export async function handleERC1155CollectionCreated(event: any, context: Context<any, any>) {
  console.log('[Handler] ERC1155CollectionCreated:', event.args);

  const { collectionAddress, creator } = event.args as {
    collectionAddress: `0x${string}`;
    creator: `0x${string}`;
  };

  // Initialize repository
  const accountRepo = new AccountRepository({
    db: context.db,
    network: context.network
  });

  // Create or get account
  await accountRepo.getOrCreate(creator, event.block.timestamp);

  // Create collection record
  const collectionId = generateCollectionId(context.network.chainId, collectionAddress);
  
  await context.db.insert(schema.collection).values({
    id: collectionId,
    address: normalizeAddress(collectionAddress),
    chainId: context.network.chainId,
    name: null,
    symbol: null,
    tokenType: TokenType.ERC1155,
    creator: normalizeAddress(creator),
    owner: normalizeAddress(creator),
    royaltyFee: 0,
    royaltyRecipient: null,
    maxSupply: null,
    totalSupply: "0",
    totalMinted: "0",
    totalBurned: "0",
    totalTrades: 0,
    totalVolume: "0",
    floorPrice: null,
    isVerified: false,
    isActive: true,
    createdAt: event.block.timestamp,
    lastTradeAt: null,
    blockNumber: event.block.number,
    transactionHash: event.transaction.hash,
  });

  // Update account collections created
  await accountRepo.incrementCollectionsCreated(creator);
}

