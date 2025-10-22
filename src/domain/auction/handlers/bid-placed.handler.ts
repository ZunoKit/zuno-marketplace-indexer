/**
 * Bid Placed Handler
 * Handles bid placement events in auctions
 *
 * Event Flow (v3.0):
 * 1. Validate event data with Zod schema
 * 2. Store event in event table (source of truth)
 * 3. Update account aggregate (projection)
 *
 * @module domain/auction/handlers/bid-placed
 */

import { getEventLogger } from "@/infrastructure/logging/event-logger";
import { normalizeAddress } from "@/shared/utils/helpers";
import { AccountRepository, EventRepository } from "@/repositories";
import {
  validateEventData,
  type BidPlacedData,
} from "@/shared/schemas/event.schemas";

const logger = getEventLogger();

interface BidPlacedEvent {
  auctionId: `0x${string}`;
  bidder: `0x${string}`;
  bidAmount: bigint;
  previousBid?: bigint;
  previousBidder?: `0x${string}`;
}

/**
 * Handle Bid Placed Event
 *
 * **New Architecture:**
 * - No dedicated `bid` table - event table is source of truth
 * - Query bid history by filtering events
 * - Current highest bid = latest bid_placed event for auction
 *
 * @param event Ponder event object
 * @param context Ponder context object
 */
export async function handleBidPlaced({
  event,
  context,
}: {
  event: any;
  context: any;
}) {
  const args = event.args as BidPlacedEvent;
  const contractAddress = event.log.address;

  logger.logEventStart(
    "BidPlaced",
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
    const eventData: BidPlacedData = {
      auctionId: args.auctionId,
      bidAmount: args.bidAmount.toString(),
      previousBid: args.previousBid?.toString(),
      previousBidder: args.previousBidder,
      isWinning: true, // Assume this is the current winning bid
    };

    // Validate with Zod schema
    const validatedData = validateEventData("bid_placed", eventData);

    // Create event record (source of truth)
    const eventResult = await eventRepo.createEvent({
      eventType: "bid_placed",
      category: "auction",
      actor: args.bidder,
      counterparty: args.previousBidder,
      data: validatedData,
      contractName: "AuctionManager",
      event,
    });

    if (!eventResult.success) {
      throw new Error(`Failed to create event: ${eventResult.error?.message}`);
    }

    // Update account aggregate (projection)
    await accountRepo.getOrCreate(args.bidder, event.block.timestamp);
    await accountRepo.updateActivity(args.bidder, event.block.timestamp);

    // If there was a previous bidder, update their activity too
    if (args.previousBidder) {
      await accountRepo.getOrCreate(args.previousBidder, event.block.timestamp);
      await accountRepo.updateActivity(
        args.previousBidder,
        event.block.timestamp
      );
    }

    logger.logEventSuccess("BidPlaced", {
      auctionId: args.auctionId,
      bidder: args.bidder,
      bidAmount: args.bidAmount.toString(),
      previousBid: args.previousBid?.toString(),
    });
  } catch (error) {
    logger.logEventError("BidPlaced", error as Error, {
      args,
      contractAddress,
    });
    throw error;
  }
}
