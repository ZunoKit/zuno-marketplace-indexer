/**
 * Offer Event Handlers
 * Handles NFT offer creation, acceptance, and cancellation
 */

import { ListingStatus, TokenType, TradeType } from "../core/types";
import type {
  OfferAcceptedEvent,
  OfferCancelledEvent,
  OfferCreatedEvent,
} from "../core/types/events";
import { getEventLogger } from "../core/utils/event-logger";
import { generateCollectionId, generateTokenId } from "../core/utils/helpers";
import { AccountRepository } from "../repositories/account.repository";
import { CollectionRepository } from "../repositories/collection.repository";
import { EventLogRepository } from "../repositories/event-log.repository";
import { ListingRepository } from "../repositories/listing.repository";
import { TokenRepository } from "../repositories/token.repository";
import { TradeRepository } from "../repositories/trade.repository";

const logger = getEventLogger();

/**
 * Offer Created Handler
 */
export async function handleOfferCreated({
  event,
  context,
}: {
  event: any;
  context: any;
}) {
  const args = event.args as OfferCreatedEvent;
  const contractAddress = event.log.address;

  logger.logEventStart(
    "OfferCreated",
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
      "OfferCreated",
      contractAddress,
      null,
      args,
      {
        block: event.block,
        transaction: event.transaction,
        log: event.log,
      }
    );

    // Get or create offerer account
    await accountRepo.getOrCreate(args.offerer, event.block.timestamp);

    // Create offer as a listing
    await listingRepo.createListing({
      orderHash: args.offerId,
      maker: args.offerer,
      taker: args.nftOwner || null,
      collection: args.nftContract,
      tokenId: args.tokenId.toString(),
      tokenType: TokenType.ERC721, // TODO: Detect from contract
      amount: "1",
      price: args.offerPrice.toString(),
      paymentToken: args.paymentToken || "0x0000000000000000000000000000000000000000",
      status: ListingStatus.ACTIVE,
      fillPercent: 0,
      createdAt: event.block.timestamp,
      expiresAt: args.expirationTime,
      filledAt: null,
      cancelledAt: null,
      blockNumber: event.block.number,
      transactionHash: event.transaction.hash,
      logIndex: event.log.logIndex,
      chainId: context.network.chainId,
    });

    logger.logEventSuccess("OfferCreated", {
      offerId: args.offerId,
      offerer: args.offerer,
      price: args.offerPrice.toString(),
    });
  } catch (error) {
    logger.logEventError("OfferCreated", error as Error, { args });
    throw error;
  }
}

/**
 * Offer Accepted Handler
 */
export async function handleOfferAccepted({
  event,
  context,
}: {
  event: any;
  context: any;
}) {
  const args = event.args as OfferAcceptedEvent;
  const contractAddress = event.log.address;

  logger.logEventStart(
    "OfferAccepted",
    contractAddress,
    event.block.number,
    event.transaction.hash
  );

  try {
    const tradeRepo = new TradeRepository({
      db: context.db,
      network: context.network,
    });
    const listingRepo = new ListingRepository({
      db: context.db,
      network: context.network,
    });
    const accountRepo = new AccountRepository({
      db: context.db,
      network: context.network,
    });
    const collectionRepo = new CollectionRepository({
      db: context.db,
      network: context.network,
    });
    const tokenRepo = new TokenRepository({
      db: context.db,
      network: context.network,
    });
    const eventLogRepo = new EventLogRepository({
      db: context.db,
      network: context.network,
    });

    // Log the event
    await eventLogRepo.createFromEvent(
      "OfferAccepted",
      contractAddress,
      null,
      args,
      {
        block: event.block,
        transaction: event.transaction,
        log: event.log,
      }
    );

    // Get or create accounts
    await Promise.all([
      accountRepo.getOrCreate(args.offerer, event.block.timestamp),
      accountRepo.getOrCreate(args.seller, event.block.timestamp),
    ]);

    // Create trade record
    await tradeRepo.createTrade({
      maker: args.offerer, // Offer maker
      taker: args.seller, // NFT seller who accepted
      collection: args.nftContract,
      tokenId: args.tokenId.toString(),
      tokenType: TokenType.ERC721,
      amount: "1",
      price: args.offerPrice.toString(),
      paymentToken: args.paymentToken || "0x0000000000000000000000000000000000000000",
      makerFee: "0",
      takerFee: "0",
      royaltyFee: "0",
      royaltyRecipient: null,
      orderHash: args.offerId,
      listingId: args.offerId,
      tradeType: TradeType.OFFER_ACCEPTED,
      blockNumber: event.block.number,
      blockTimestamp: event.block.timestamp,
      transactionHash: event.transaction.hash,
      logIndex: event.log.logIndex,
      chainId: context.network.chainId,
    });

    // Update offer status
    await listingRepo.updateStatus(
      args.offerId,
      ListingStatus.FILLED,
      event.block.timestamp
    );

    // Update account trade statistics
    const volume = BigInt(args.offerPrice);
    await Promise.all([
      accountRepo.incrementTrades(args.offerer, true, volume), // Buyer
      accountRepo.incrementTrades(args.seller, false, volume), // Seller
    ]);

    // Update collection statistics
    const collectionId = generateCollectionId(
      context.network.chainId,
      args.nftContract
    );
    await collectionRepo.incrementTradeStats(
      collectionId,
      volume,
      event.block.timestamp
    );

    // Update token last sale info
    const tokenId = generateTokenId(
      context.network.chainId,
      args.nftContract,
      args.tokenId.toString()
    );
    await tokenRepo.updateAfterTrade(
      tokenId,
      args.offerPrice.toString(),
      args.paymentToken || "0x0000000000000000000000000000000000000000",
      event.block.timestamp
    );

    logger.logEventSuccess("OfferAccepted", {
      offerId: args.offerId,
      offerer: args.offerer,
      seller: args.seller,
      price: args.offerPrice.toString(),
    });
    logger.logMetric("Offer Volume", args.offerPrice, "wei");
  } catch (error) {
    logger.logEventError("OfferAccepted", error as Error, { args });
    throw error;
  }
}

/**
 * Offer Cancelled Handler
 */
export async function handleOfferCancelled({
  event,
  context,
}: {
  event: any;
  context: any;
}) {
  const args = event.args as OfferCancelledEvent;
  const contractAddress = event.log.address;

  logger.logEventStart(
    "OfferCancelled",
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
      "OfferCancelled",
      contractAddress,
      null,
      args,
      {
        block: event.block,
        transaction: event.transaction,
        log: event.log,
      }
    );

    // Update offer status to cancelled
    await listingRepo.updateStatus(
      args.offerId,
      ListingStatus.CANCELLED,
      event.block.timestamp
    );

    logger.logEventSuccess("OfferCancelled", {
      offerId: args.offerId,
      offerer: args.offerer,
    });
  } catch (error) {
    logger.logEventError("OfferCancelled", error as Error, { args });
    throw error;
  }
}

