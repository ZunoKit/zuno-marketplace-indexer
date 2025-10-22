/**
 * Listing Cancelled Handler
 * Handles NFT listing cancellation events
 *
 * Event Flow (v3.0):
 * 1. Validate event data with Zod schema
 * 2. Store event in event table (source of truth)
 * 3. Update account aggregate (projection)
 *
 * @module domain/trading/handlers/listing-cancelled
 */

import type { NFTUnlistedEvent } from "@/shared/types/events";
import { getEventLogger } from "@/infrastructure/logging/event-logger";
import { AccountRepository, EventRepository } from "@/repositories";
import {
  validateEventData,
  type ListingCancelledData,
} from "@/shared/schemas/event.schemas";

const logger = getEventLogger();

/**
 * Handle listing cancellation
 */
export async function handleListingCancelled({
  event,
  context,
}: {
  event: any;
  context: any;
}) {
  const args = event.args as NFTUnlistedEvent;
  const contractAddress = event.log.address;

  logger.logEventStart(
    "NFTUnlisted",
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
    const eventData: ListingCancelledData = {
      listingId: args.listingId,
      reason: "User cancelled", // Default reason
    };

    // Validate with Zod schema
    const validatedData = validateEventData("listing_cancelled", eventData);

    // Create event record (source of truth)
    const eventResult = await eventRepo.createEvent({
      eventType: "listing_cancelled",
      category: "listing",
      actor: args.seller,
      data: validatedData,
      contractName: "Marketplace",
      event,
    });

    if (!eventResult.success) {
      throw new Error(`Failed to create event: ${eventResult.error?.message}`);
    }

    // Update account aggregate (projection)
    await accountRepo.getOrCreate(args.seller, event.block.timestamp);
    await accountRepo.updateActivity(args.seller, event.block.timestamp);

    // Note: In v3.0 schema, listing status is derived from events:
    // Active listings = listing_created events WITHOUT listing_cancelled/listing_filled events
    // Query example:
    // SELECT * FROM event WHERE eventType = 'listing_created'
    //   AND NOT EXISTS (SELECT 1 FROM event e2
    //     WHERE e2.eventType IN ('listing_cancelled', 'listing_filled')
    //     AND JSON_EXTRACT(e2.data, '$.listingId') = JSON_EXTRACT(event.data, '$.listingId'))

    logger.logEventSuccess("NFTUnlisted", {
      listingId: args.listingId,
      seller: args.seller,
    });
  } catch (error) {
    logger.logEventError("NFTUnlisted", error as Error, { args });
    throw error;
  }
}
