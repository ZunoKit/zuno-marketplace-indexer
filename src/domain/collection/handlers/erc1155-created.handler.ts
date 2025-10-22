/**
 * ERC1155 Collection Created Handler
 * Handles ERC1155 collection creation events
 *
 * Event Flow (v3.0):
 * 1. Validate event data with Zod schema
 * 2. Store event in event table (source of truth)
 * 3. Create collection record (projection)
 * 4. Update account aggregate (projection)
 *
 * @module domain/collection/handlers/erc1155-created
 */

import * as schema from "ponder:schema";
import type { ERC1155CollectionCreatedEvent } from "@/shared/types/events";
import { getEventLogger } from "@/infrastructure/logging/event-logger";
import { generateCollectionId, normalizeAddress } from "@/shared/utils/helpers";
import { AccountRepository, EventRepository } from "@/repositories";
import {
  validateEventData,
  type CollectionCreatedData,
} from "@/shared/schemas/event.schemas";

const logger = getEventLogger();

/**
 * Handle ERC1155 collection creation
 */
export async function handleERC1155Created({
  event,
  context,
}: {
  event: any;
  context: any;
}) {
  const args = event.args as ERC1155CollectionCreatedEvent;
  const contractAddress = event.log.address;

  logger.logEventStart(
    "ERC1155CollectionCreated",
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
    const eventRepo = new EventRepository({
      db: context.db,
      network: context.network,
    });

    // Prepare event data
    const eventData: CollectionCreatedData = {
      name: "ERC1155 Collection", // Default name for ERC1155
      symbol: "ERC1155",
      tokenType: "ERC1155",
    };

    // Validate with Zod schema
    const validatedData = validateEventData("collection_created", eventData);

    // Create event record (source of truth)
    const eventResult = await eventRepo.createEvent({
      eventType: "collection_created",
      category: "collection",
      actor: args.creator,
      collection: args.collectionAddress,
      data: validatedData,
      contractName: "ERC1155CollectionFactory",
      event,
    });

    if (!eventResult.success) {
      throw new Error(`Failed to create event: ${eventResult.error?.message}`);
    }

    // Create collection record (projection)
    const collectionId = generateCollectionId(
      context.network.chainId,
      args.collectionAddress
    );

    await context.db.insert(schema.collection).values({
      id: collectionId,
      address: normalizeAddress(args.collectionAddress),
      chainId: context.network.chainId,
      name: "ERC1155 Collection",
      symbol: "ERC1155",
      tokenType: "ERC1155",
      creator: normalizeAddress(args.creator),
      owner: normalizeAddress(args.creator),
      royaltyFee: 0,
      royaltyRecipient: null,
      maxSupply: null, // ERC1155 can have unlimited supply
      totalSupply: "0",
      totalMinted: "0",
      totalBurned: "0",
      totalTrades: 0,
      totalVolume: "0",
      floorPrice: null,
      createdAt: event.block.timestamp,
      lastMintAt: null,
      lastTradeAt: null,
      isVerified: false,
      isActive: true,
      deployBlockNumber: event.block.number,
      deployTxHash: event.transaction.hash,
    });

    // Update account aggregate (projection)
    await accountRepo.getOrCreate(args.creator, event.block.timestamp);
    await accountRepo.incrementCollectionsCreated(args.creator);

    logger.logEventSuccess("ERC1155CollectionCreated", {
      collection: args.collectionAddress,
      creator: args.creator,
      uri: args.uri,
    });
  } catch (error) {
    logger.logEventError("ERC1155CollectionCreated", error as Error, { args });
    throw error;
  }
}
