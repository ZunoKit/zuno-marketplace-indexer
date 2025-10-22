/**
 * Auction Created Handler
 *
 * Handles AuctionCreated events from auction contracts.
 * Creates event record with JSONB data and updates account aggregate.
 *
 * Event Flow:
 * 1. Validate event data with Zod schema
 * 2. Store event in event table (source of truth)
 * 3. Update account aggregate (projection)
 *
 * @module domain/auction/handlers/auction-created
 */

import { getEventLogger } from "@/infrastructure/logging/event-logger";
import { AccountRepository, EventRepository } from "@/repositories";
import { validateEventData, type AuctionCreatedData } from "@/shared/schemas/event.schemas";

const logger = getEventLogger();

/**
 * Raw event args from blockchain
 */
interface AuctionCreatedEventArgs {
  auctionId: `0x${string}`;
  nftContract: `0x${string}`;
  tokenId: bigint;
  seller: `0x${string}`;
  startPrice: bigint;
  reservePrice: bigint;
  startTime: bigint;
  endTime: bigint;
  auctionType: bigint; // 0 = English, 1 = Dutch
  endPrice?: bigint; // Dutch auction only
  priceDecrement?: bigint; // Dutch auction only
}

/**
 * Handle Auction Created Event
 *
 * **New Architecture:**
 * - No dedicated `auction` table - event table is source of truth
 * - Query auction state by filtering events
 * - Active auctions = auction_created events WITHOUT auction_settled/cancelled events
 *
 * @param event Ponder event object
 * @param context Ponder context object
 *
 * @example Query active auctions from events:
 * ```typescript
 * const activeAuctions = await eventRepo.queryEvents({
 *   eventType: "auction_created",
 *   category: "auction"
 * });
 *
 * // Filter out settled/cancelled
 * const stillActive = activeAuctions.filter(auction => {
 *   const auctionId = auction.data.auctionId;
 *   const settled = await eventRepo.queryByJsonField("auctionId", auctionId, {
 *     eventType: "auction_settled"
 *   });
 *   return settled.length === 0;
 * });
 * ```
 */
export async function handleAuctionCreated({
  event,
  context,
}: {
  event: any;
  context: any;
}) {
  const args = event.args as AuctionCreatedEventArgs;
  const contractAddress = event.log.address;

  logger.logEventStart(
    "AuctionCreated",
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

    // Determine auction type
    const auctionType = Number(args.auctionType) === 0 ? "english" : "dutch";

    // Prepare event data
    const eventData: AuctionCreatedData = {
      auctionId: args.auctionId,
      auctionType,
      startPrice: args.startPrice.toString(),
      reservePrice: args.reservePrice.toString(),
      endPrice: args.endPrice?.toString(),
      priceDecrement: args.priceDecrement?.toString(),
      startTime: args.startTime,
      endTime: args.endTime,
    };

    // Validate with Zod schema
    const validatedData = validateEventData("auction_created", eventData);

    // Create event record (source of truth)
    const eventResult = await eventRepo.createEvent({
      eventType: "auction_created",
      category: "auction",
      actor: args.seller,
      collection: args.nftContract,
      tokenId: args.tokenId.toString(),
      data: validatedData,
      contractName: "AuctionManager",
      event,
    });

    if (!eventResult.success) {
      throw new Error(`Failed to create event: ${eventResult.error?.message}`);
    }

    // Update account aggregate (projection)
    await accountRepo.getOrCreate(args.seller, event.block.timestamp);
    await accountRepo.updateActivity(args.seller, event.block.timestamp);

    logger.logEventSuccess("AuctionCreated", {
      auctionId: args.auctionId,
      seller: args.seller,
      auctionType,
      startPrice: args.startPrice.toString(),
    });
  } catch (error) {
    logger.logEventError("AuctionCreated", error as Error, {
      args,
      contractAddress,
    });
    throw error;
  }
}
