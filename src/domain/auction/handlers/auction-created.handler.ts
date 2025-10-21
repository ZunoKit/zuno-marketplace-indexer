/**
 * Auction Created Handler
 */

import type { AuctionCreatedEvent } from "../../../shared/types/events";
import { getEventLogger } from "../../../infrastructure/logging/event-logger";
import { EventLogRepository } from "../../../repositories/event-log.repository";

const logger = getEventLogger();

/**
 * Handle auction creation
 */
export async function handleAuctionCreated({
  event,
  context,
}: {
  event: any;
  context: any;
}) {
  const args = event.args as AuctionCreatedEvent;
  const contractAddress = event.log.address;

  logger.logEventStart(
    "AuctionCreated",
    contractAddress,
    event.block.number,
    event.transaction.hash
  );

  try {
    const eventLogRepo = new EventLogRepository({
      db: context.db,
      network: context.network,
    });

    // Log the event
    await eventLogRepo.createFromEvent(
      "AuctionCreated",
      contractAddress,
      null,
      args,
      {
        block: event.block,
        transaction: event.transaction,
        log: event.log,
      }
    );

    logger.logEventSuccess("AuctionCreated", {
      auctionId: args.auctionId,
      seller: args.seller,
    });
  } catch (error) {
    logger.logEventError("AuctionCreated", error as Error, { args });
    throw error;
  }
}
