/**
 * NFT Minted Handler
 * Handles single NFT minting events from collections
 */

import * as schema from "ponder:schema";
import { getEventLogger } from "@/infrastructure/logging/event-logger";
import {
  generateTokenId,
  normalizeAddress,
} from "@/shared/utils/helpers";
import {
  AccountRepository,
  CollectionRepository,
  EventRepository,
  TokenRepository,
} from "@/repositories";
import {
  validateEventData,
  type NFTMintedData,
} from "@/shared/schemas/event.schemas";

const logger = getEventLogger();

/**
 * Minted event structure
 */
interface MintedEvent {
  to: `0x${string}`;
  tokenId: bigint;
  amount: bigint;
}

/**
 * Handle NFT minting event
 */
export async function handleNFTMinted({
  event,
  context,
}: {
  event: any;
  context: any;
}) {
  const args = event.args as MintedEvent;
  const contractAddress = event.log.address;

  logger.logEventStart(
    "Minted",
    contractAddress,
    event.block.number,
    event.transaction.hash
  );

  try {
    // Initialize repositories
    const accountRepo = new AccountRepository({
      db: context.db,
      network: context.network,
    });
    const collectionRepo = new CollectionRepository({
      db: context.db,
      network: context.network,
    });
    const tokenRepo = new TokenRepository({
      db: context.db,
      network: context.network,
    });
    const eventRepo = new EventRepository({
      db: context.db,
      network: context.network,
    });

    // Prepare event data
    const eventData: NFTMintedData = {
      tokenId: args.tokenId.toString(),
      recipient: args.to,
      amount: Number(args.amount),
    };

    // Validate with Zod schema
    const validatedData = validateEventData("nft_minted", eventData);

    // Create event record (source of truth)
    const eventResult = await eventRepo.createEvent({
      eventType: "nft_minted",
      category: "mint",
      actor: args.to,
      collection: contractAddress,
      tokenId: args.tokenId.toString(),
      data: validatedData,
      contractName: "NFTCollection",
      event,
    });

    if (!eventResult.success) {
      throw new Error(`Failed to create event: ${eventResult.error?.message}`);
    }

    // Get or create minter account
    await accountRepo.getOrCreate(args.to, event.block.timestamp);

    // Determine token type by checking collection
    const collectionId = `${context.network.chainId}:${contractAddress}`;
    const collectionResult = await collectionRepo.findById(collectionId);

    let tokenType = "ERC721"; // Default
    if (collectionResult.success && collectionResult.data) {
      tokenType = collectionResult.data.tokenType;
    }

    // Create token record
    const tokenId = generateTokenId(
      context.network.chainId,
      contractAddress,
      args.tokenId.toString()
    );

    const tokenExists = await tokenRepo.findById(tokenId);

    if (!tokenExists.success || !tokenExists.data) {
      // Create new token with mint tracking
      await context.db.insert(schema.token).values({
        id: tokenId,
        collection: normalizeAddress(contractAddress),
        tokenId: args.tokenId.toString(),
        chainId: context.network.chainId,
        owner: normalizeAddress(args.to),
        minter: normalizeAddress(args.to),
        tokenUri: null,
        metadataUri: null,
        totalSupply: args.amount.toString(),
        tradeCount: 0,
        lastSalePrice: null,
        lastSaleToken: null,
        isBurned: false,
        mintedAt: event.block.timestamp,
        lastTransferAt: event.block.timestamp,
        lastSaleTimestamp: null,
        mintBlockNumber: event.block.number,
        mintTxHash: event.transaction.hash,
      });

      // Token created successfully
    }

    // Update collection statistics
    if (collectionResult.success && collectionResult.data) {
      const collection = collectionResult.data;
      const newTotalMinted = BigInt(collection.totalMinted) + args.amount;
      const newTotalSupply = BigInt(collection.totalSupply) + args.amount;

      await context.db.update(schema.collection, { id: collectionId }).set({
        totalMinted: newTotalMinted.toString(),
        totalSupply: newTotalSupply.toString(),
        lastMintAt: event.block.timestamp,
      });
    }

    // Update account mint statistics
    await accountRepo.incrementMints(args.to, Number(args.amount));

    logger.logEventSuccess("Minted", {
      collection: contractAddress,
      tokenId: args.tokenId.toString(),
      to: args.to,
      amount: args.amount.toString(),
    });
  } catch (error) {
    logger.logEventError("Minted", error as Error, { args });
    throw error;
  }
}
