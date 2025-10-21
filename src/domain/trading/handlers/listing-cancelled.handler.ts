/**
 * Listing Cancelled Handler
 */

import { ListingStatus } from "../../../shared/types";
import type { NFTUnlistedEvent } from "../../../shared/types/events";
import { getEventLogger } from "../../../infrastructure/logging/event-logger";
import { ListingRepository } from "../../../repositories/listing.repository";
import { EventLogRepository } from "../../../repositories/event-log.repository";

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
    const listingRepo = new ListingRepository({
      db: context.db,
      network: context.network,
    });
    const eventLogRepo = new EventLogRepository({
      db: context.db,
      network: context.network,
    });

    // Log the event
    await eventLogRepo.createFromEvent(
      "NFTUnlisted",
      contractAddress,
      null,
      args,
      {
        block: event.block,
        transaction: event.transaction,
        log: event.log,
      }
    );

    // Update listing status to cancelled
    await listingRepo.updateStatus(
      args.listingId,
      ListingStatus.CANCELLED,
      event.block.timestamp
    );

    logger.logEventSuccess("NFTUnlisted", {
      listingId: args.listingId,
      seller: args.seller,
    });
  } catch (error) {
    logger.logEventError("NFTUnlisted", error as Error, { args });
    throw error;
  }
}
