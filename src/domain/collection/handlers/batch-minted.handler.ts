/**
 * Batch Minted Handler
 * Handles batch NFT minting events from collections
 *
 * Event Flow (v3.0):
 * 1. Validate event data with Zod schema
 * 2. Store event in event table (source of truth)
 * 3. Update account and collection aggregates (projections)
 *
 * @module domain/collection/handlers/batch-minted
 */

import * as schema from "ponder:schema";
import { getEventLogger } from "@/infrastructure/logging/event-logger";
import { normalizeAddress } from "@/shared/utils/helpers";
import {
  AccountRepository,
  CollectionRepository,
  EventRepository,
} from "@/repositories";
import {
  validateEventData,
  type BatchMintedData,
} from "@/shared/schemas/event.schemas";

const logger = getEventLogger();

/**
 * BatchMinted event structure
 */
interface BatchMintedEvent {
  to: `0x${string}`;
  tokenIds: bigint[];
  amounts: bigint[];
}

/**
 * Handle batch NFT minting event
 */
export async function handleBatchMinted({
  event,
  context,
}: {
  event: any;
  context: any;
}) {
  const args = event.args as BatchMintedEvent;
  const contractAddress = event.log.address;

  logger.logEventStart(
    "BatchMinted",
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
    const eventRepo = new EventRepository({
      db: context.db,
      network: context.network,
    });

    // Prepare event data
    const eventData: BatchMintedData = {
      tokenIds: args.tokenIds.map((id) => id.toString()),
      recipient: args.to,
      count: args.tokenIds.length,
    };

    // Validate with Zod schema
    const validatedData = validateEventData("batch_minted", eventData);

    // Create event record (source of truth)
    const eventResult = await eventRepo.createEvent({
      eventType: "batch_minted",
      category: "mint",
      actor: args.to,
      collection: contractAddress,
      data: validatedData,
      contractName: "NFTCollection",
      event,
    });

    if (!eventResult.success) {
      throw new Error(`Failed to create event: ${eventResult.error?.message}`);
    }

    // Get or create minter account
    await accountRepo.getOrCreate(args.to, event.block.timestamp);

    // Update collection statistics
    const collectionId = `${context.network.chainId}:${contractAddress}`;
    const collectionResult = await collectionRepo.findById(collectionId);

    if (collectionResult.success && collectionResult.data) {
      const collection = collectionResult.data;
      const totalMinted = BigInt(args.tokenIds.length);
      const newTotalMinted = BigInt(collection.totalMinted) + totalMinted;
      const newTotalSupply = BigInt(collection.totalSupply) + totalMinted;

      await context.db.update(schema.collection, { id: collectionId }).set({
        totalMinted: newTotalMinted.toString(),
        totalSupply: newTotalSupply.toString(),
        lastMintAt: event.block.timestamp,
      });
    }

    // Update account mint statistics
    await accountRepo.incrementMints(args.to, args.tokenIds.length);

    logger.logEventSuccess("BatchMinted", {
      collection: contractAddress,
      to: args.to,
      count: args.tokenIds.length,
      tokenIds: args.tokenIds.map((id) => id.toString()),
    });
  } catch (error) {
    logger.logEventError("BatchMinted", error as Error, { args });
    throw error;
  }
}
