/**
 * Listing Created Handler
 * Handles NFT listing creation events
 */

import type { NFTListedEvent } from "@/shared/types/events";
import { getEventLogger } from "@/infrastructure/logging/event-logger";
import { detectTokenTypeWithCache } from "@/shared/utils/token-detector";
import { AccountRepository, EventRepository } from "@/repositories";
import {
  validateEventData,
  type ListingCreatedData,
} from "@/shared/schemas/event.schemas";

const logger = getEventLogger();

/**
 * Handle NFT listing creation
 */
export async function handleListingCreated({
  event,
  context,
}: {
  event: any;
  context: any;
}) {
  const args = event.args as NFTListedEvent;
  const contractAddress = event.log.address;

  logger.logEventStart(
    "NFTListed",
    contractAddress,
    event.block.number,
    event.transaction.hash
  );

  try {
    const accountRepo = new AccountRepository({
      db: context.db,
      network: context.network,
    });
    const eventRepo = new EventRepository({
      db: context.db,
      network: context.network,
    });

    // Prepare event data
    const eventData: ListingCreatedData = {
      listingId: args.listingId,
      price: args.price.toString(),
      paymentToken: args.paymentToken,
      expiresAt: args.expiresAt,
      amount: "1", // Default for single NFT listing
    };

    // Validate with Zod schema
    const validatedData = validateEventData("listing_created", eventData);

    // Create event record (source of truth)
    const eventResult = await eventRepo.createEvent({
      eventType: "listing_created",
      category: "listing",
      actor: args.seller,
      collection: args.nftContract,
      tokenId: args.tokenId.toString(),
      data: validatedData,
      contractName: "Marketplace",
      event,
    });

    if (!eventResult.success) {
      throw new Error(`Failed to create event: ${eventResult.error?.message}`);
    }

    // Get or create seller account
    await accountRepo.getOrCreate(args.seller, event.block.timestamp);

    // Update account aggregate (projection)
    await accountRepo.getOrCreate(args.seller, event.block.timestamp);
    await accountRepo.updateActivity(args.seller, event.block.timestamp);
    
    logger.logEventSuccess("NFTListed", {
      listingId: args.listingId,
      seller: args.seller,
      price: args.price.toString(),
    });
  } catch (error) {
    logger.logEventError("NFTListed", error as Error, { args });
    throw error;
  }
}
