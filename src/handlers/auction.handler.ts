/**
 * Auction Event Handlers
 * Handles auction creation, bidding, and finalization
 */

import { ListingStatus, TokenType } from "../core/types";
import type {
    AuctionCreatedEvent,
    AuctionFinalizedEvent,
    BidPlacedEvent,
} from "../core/types/events";
import { getEventLogger } from "../core/utils/event-logger";
import { AccountRepository } from "../repositories/account.repository";
import { EventLogRepository } from "../repositories/event-log.repository";
import { ListingRepository } from "../repositories/listing.repository";

const logger = getEventLogger();

/**
 * Auction Created Handler
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
    const listingRepo = new ListingRepository({
      db: context.db,
      network: context.network,
    });
    const accountRepo = new AccountRepository({
      db: context.db,
      network: context.network,
    });
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

    // Get or create seller account
    await accountRepo.getOrCreate(args.seller, event.block.timestamp);

    // Create auction as a listing
    await listingRepo.createListing({
      orderHash: (typeof args.auctionId === 'bigint' 
        ? `0x${args.auctionId.toString(16).padStart(64, '0')}` 
        : args.auctionId) as `0x${string}`,
      maker: args.seller,
      taker: null, // Open auction
      collection: args.nftContract,
      tokenId: args.tokenId.toString(),
      tokenType: TokenType.ERC721, // TODO: Detect from contract
      amount: "1",
      price: args.startingPrice.toString(),
      paymentToken: "0x0000000000000000000000000000000000000000", // Native token
      status: ListingStatus.ACTIVE,
      fillPercent: 0,
      createdAt: event.block.timestamp,
      expiresAt: args.endTime,
      filledAt: null,
      cancelledAt: null,
      blockNumber: event.block.number,
      transactionHash: event.transaction.hash,
      logIndex: event.log.logIndex,
      chainId: context.network.chainId,
    });

    logger.logEventSuccess("AuctionCreated", {
      auctionId: args.auctionId,
      seller: args.seller,
      startingPrice: args.startingPrice.toString(),
      endTime: args.endTime,
    });
  } catch (error) {
    logger.logEventError("AuctionCreated", error as Error, { args });
    throw error;
  }
}

/**
 * Bid Placed Handler (optional - for tracking bids)
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
    const accountRepo = new AccountRepository({
      db: context.db,
      network: context.network,
    });
    const eventLogRepo = new EventLogRepository({
      db: context.db,
      network: context.network,
    });

    // Log the event
    await eventLogRepo.createFromEvent(
      "BidPlaced",
      contractAddress,
      null,
      args,
      {
        block: event.block,
        transaction: event.transaction,
        log: event.log,
      }
    );

    // Get or create bidder account
    await accountRepo.getOrCreate(args.bidder, event.block.timestamp);

    logger.logEventSuccess("BidPlaced", {
      auctionId: args.auctionId,
      bidder: args.bidder,
      bidAmount: args.bidAmount.toString(),
    });
  } catch (error) {
    logger.logEventError("BidPlaced", error as Error, { args });
    throw error;
  }
}

/**
 * Auction Finalized Handler (optional - for completed auctions)
 */
export async function handleAuctionFinalized({
  event,
  context,
}: {
  event: any;
  context: any;
}) {
  const args = event.args as AuctionFinalizedEvent;
  const contractAddress = event.log.address;

  logger.logEventStart(
    "AuctionFinalized",
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
      "AuctionFinalized",
      contractAddress,
      null,
      args,
      {
        block: event.block,
        transaction: event.transaction,
        log: event.log,
      }
    );

    // Update auction status
    const auctionIdHash = typeof args.auctionId === 'bigint' 
      ? `0x${args.auctionId.toString(16).padStart(64, '0')}` 
      : args.auctionId;
    await listingRepo.updateStatus(
      auctionIdHash as `0x${string}`,
      ListingStatus.FILLED,
      event.block.timestamp
    );

    logger.logEventSuccess("AuctionFinalized", {
      auctionId: args.auctionId,
      winner: args.winner,
      finalPrice: args.finalPrice.toString(),
    });
  } catch (error) {
    logger.logEventError("AuctionFinalized", error as Error, { args });
    throw error;
  }
}

