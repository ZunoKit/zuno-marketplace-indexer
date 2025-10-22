/**
 * ERC721 Collection Created Handler
 */

import * as schema from "ponder:schema";
import type { ERC721CollectionCreatedEvent } from "@/shared/types/events";
import { getEventLogger } from "@/infrastructure/logging/event-logger";
import { generateCollectionId, normalizeAddress } from "@/shared/utils/helpers";
import { AccountRepository, EventRepository } from "@/repositories";
import {
  validateEventData,
  type CollectionCreatedData,
} from "@/shared/schemas/event.schemas";

const logger = getEventLogger();

/**
 * Handle ERC721 collection creation
 */
export async function handleERC721Created({
  event,
  context,
}: {
  event: any;
  context: any;
}) {
  console.log("ERC721CollectionCreated", event);
  console.log("context", context);
  const args = event.args as ERC721CollectionCreatedEvent;
  const contractAddress = event.log.address;

  logger.logEventStart(
    "ERC721CollectionCreated",
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

    // Prepare event data with fallbacks since contract only emits collectionAddress and creator
    // Name and symbol need to be fetched from the contract or set as defaults
    const eventData: CollectionCreatedData = {
      name: "ERC721 Collection", // Default name - could be fetched from contract
      symbol: "ERC721", // Default symbol - could be fetched from contract
      tokenType: "ERC721",
      maxSupply: undefined, // Not available in event
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
      contractName: "ERC721CollectionFactory",
      event,
    });

    if (!eventResult.success) {
      throw new Error(`Failed to create event: ${eventResult.error?.message}`);
    }

    // Create or get account
    await accountRepo.getOrCreate(args.creator, event.block.timestamp);

    // Create collection record
    const collectionId = generateCollectionId(
      context.network.chainId,
      args.collectionAddress
    );

    await context.db.insert(schema.collection).values({
      id: collectionId,
      address: normalizeAddress(args.collectionAddress),
      chainId: context.network.chainId,
      name: args.name || null,
      symbol: args.symbol || null,
      tokenType: "ERC721",
      creator: normalizeAddress(args.creator),
      owner: normalizeAddress(args.creator),
      royaltyFee: 0,
      royaltyRecipient: null,
      maxSupply: args.maxSupply?.toString() || null,
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

    logger.logEventSuccess("ERC721CollectionCreated", {
      collection: args.collectionAddress,
      creator: args.creator,
      name: args.name,
    });
  } catch (error) {
    logger.logEventError("ERC721CollectionCreated", error as Error, { args });
    throw error;
  }
}
