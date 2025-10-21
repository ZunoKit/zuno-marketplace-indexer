/**
 * Marketplace Trade Event Handlers
 * Handles listing creation, purchases, and order fulfillment
 */

// import type { Context } from "ponder:registry";
import { ListingStatus, TokenType, TradeType } from "../core/types";
import type {
  NFTListedEvent,
  NFTUnlistedEvent,
  NFTPurchasedEvent,
  OrderFulfilledEvent,
  OrderCreatedEvent,
  OrderCancelledEvent,
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
 * NFT Listed Handler
 */
export async function handleNFTListed({
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
      "NFTListed",
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

    // Create listing
    await listingRepo.createListing({
      orderHash: args.listingId,
      maker: args.seller,
      taker: null, // Open to anyone
      collection: args.nftContract,
      tokenId: args.tokenId.toString(),
      tokenType: TokenType.ERC721, // TODO: Detect from contract
      amount: "1",
      price: args.price.toString(),
      paymentToken: args.paymentToken,
      status: ListingStatus.ACTIVE,
      fillPercent: 0,
      createdAt: event.block.timestamp,
      expiresAt: args.expiresAt,
      filledAt: null,
      cancelledAt: null,
      blockNumber: event.block.number,
      transactionHash: event.transaction.hash,
      logIndex: event.log.logIndex,
      chainId: context.network.chainId,
    });

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

/**
 * NFT Unlisted Handler
 */
export async function handleNFTUnlisted({
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

/**
 * NFT Purchased Handler
 */
export async function handleNFTPurchased({
  event,
  context,
}: {
  event: any;
  context: any;
}) {
  const args = event.args as NFTPurchasedEvent;
  const contractAddress = event.log.address;

  logger.logEventStart(
    "NFTPurchased",
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
      "NFTPurchased",
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
      accountRepo.getOrCreate(args.seller, event.block.timestamp),
      accountRepo.getOrCreate(args.buyer, event.block.timestamp),
    ]);

    // Create trade record
    await tradeRepo.createTrade({
      maker: args.seller,
      taker: args.buyer,
      collection: args.nftContract,
      tokenId: args.tokenId.toString(),
      tokenType: TokenType.ERC721, // TODO: Detect
      amount: "1",
      price: args.price.toString(),
      paymentToken: args.paymentToken,
      makerFee: "0", // Seller typically doesn't pay
      takerFee: args.platformFee.toString(),
      royaltyFee: args.royaltyFee.toString(),
      royaltyRecipient: args.royaltyRecipient,
      orderHash: args.listingId,
      listingId: args.listingId,
      tradeType: TradeType.SALE,
      blockNumber: event.block.number,
      blockTimestamp: event.block.timestamp,
      transactionHash: event.transaction.hash,
      logIndex: event.log.logIndex,
      chainId: context.network.chainId,
    });

    // Update listing status
    await listingRepo.updateStatus(
      args.listingId,
      ListingStatus.FILLED,
      event.block.timestamp
    );

    // Update account trade statistics
    const volume = BigInt(args.price);
    await Promise.all([
      accountRepo.incrementTrades(args.seller, true, volume), // Maker
      accountRepo.incrementTrades(args.buyer, false, volume), // Taker
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

    // Update collection floor price
    await collectionRepo.updateFloorPrice(collectionId, args.price.toString());

    // Update token last sale info
    const tokenId = generateTokenId(
      context.network.chainId,
      args.nftContract,
      args.tokenId.toString()
    );
    await tokenRepo.updateAfterTrade(
      tokenId,
      args.price.toString(),
      args.paymentToken,
      event.block.timestamp
    );

    logger.logEventSuccess("NFTPurchased", {
      listingId: args.listingId,
      seller: args.seller,
      buyer: args.buyer,
      price: args.price.toString(),
    });
    logger.logMetric("Trade Volume", args.price, "wei");
  } catch (error) {
    logger.logEventError("NFTPurchased", error as Error, { args });
    throw error;
  }
}

/**
 * Order Fulfilled Handler (Generic marketplace)
 */
export async function handleOrderFulfilled({
  event,
  context,
}: {
  event: any;
  context: any;
}) {
  const args = event.args as OrderFulfilledEvent;
  const contractAddress = event.log.address;

  logger.logEventStart(
    "OrderFulfilled",
    contractAddress,
    event.block.number,
    event.transaction.hash
  );

  try {
    const tradeRepo = new TradeRepository({
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
      "OrderFulfilled",
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
      accountRepo.getOrCreate(args.seller, event.block.timestamp),
      accountRepo.getOrCreate(args.buyer, event.block.timestamp),
    ]);

    // Create trade record
    await tradeRepo.createTrade({
      maker: args.seller,
      taker: args.buyer,
      collection: args.nftContract,
      tokenId: args.tokenId.toString(),
      tokenType: TokenType.ERC721,
      amount: "1",
      price: args.price.toString(),
      paymentToken: args.paymentToken,
      makerFee: "0",
      takerFee: "0",
      royaltyFee: "0",
      royaltyRecipient: null,
      orderHash: args.orderHash,
      listingId: args.orderHash,
      tradeType: TradeType.SALE,
      blockNumber: event.block.number,
      blockTimestamp: event.block.timestamp,
      transactionHash: event.transaction.hash,
      logIndex: event.log.logIndex,
      chainId: context.network.chainId,
    });

    // Update statistics
    const volume = BigInt(args.price);
    await Promise.all([
      accountRepo.incrementTrades(args.seller, true, volume),
      accountRepo.incrementTrades(args.buyer, false, volume),
    ]);

    const collectionId = generateCollectionId(
      context.network.chainId,
      args.nftContract
    );
    await collectionRepo.incrementTradeStats(
      collectionId,
      volume,
      event.block.timestamp
    );

    const tokenId = generateTokenId(
      context.network.chainId,
      args.nftContract,
      args.tokenId.toString()
    );
    await tokenRepo.updateAfterTrade(
      tokenId,
      args.price.toString(),
      args.paymentToken,
      event.block.timestamp
    );

    logger.logEventSuccess("OrderFulfilled", {
      orderHash: args.orderHash,
      seller: args.seller,
      buyer: args.buyer,
      price: args.price.toString(),
    });
  } catch (error) {
    logger.logEventError("OrderFulfilled", error as Error, { args });
    throw error;
  }
}

/**
 * Order Created Handler
 */
export async function handleOrderCreated({
  event,
  context,
}: {
  event: any;
  context: any;
}) {
  const args = event.args as OrderCreatedEvent;
  const contractAddress = event.log.address;

  logger.logEventStart(
    "OrderCreated",
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
      "OrderCreated",
      contractAddress,
      null,
      args,
      {
        block: event.block,
        transaction: event.transaction,
        log: event.log,
      }
    );

    // Get or create maker account
    await accountRepo.getOrCreate(args.maker, event.block.timestamp);

    // Create listing
    await listingRepo.createListing({
      orderHash: args.orderHash,
      maker: args.maker,
      taker: args.taker,
      collection: args.nftContract,
      tokenId: args.tokenId.toString(),
      tokenType: TokenType.ERC721,
      amount: "1",
      price: args.price.toString(),
      paymentToken: args.paymentToken,
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

    logger.logEventSuccess("OrderCreated", {
      orderHash: args.orderHash,
      maker: args.maker,
      price: args.price.toString(),
    });
  } catch (error) {
    logger.logEventError("OrderCreated", error as Error, { args });
    throw error;
  }
}

/**
 * Order Cancelled Handler
 */
export async function handleOrderCancelled({
  event,
  context,
}: {
  event: any;
  context: any;
}) {
  const args = event.args as OrderCancelledEvent;
  const contractAddress = event.log.address;

  logger.logEventStart(
    "OrderCancelled",
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
      "OrderCancelled",
      contractAddress,
      null,
      args,
      {
        block: event.block,
        transaction: event.transaction,
        log: event.log,
      }
    );

    // Update listing status
    await listingRepo.updateStatus(
      args.orderHash,
      ListingStatus.CANCELLED,
      event.block.timestamp
    );

    logger.logEventSuccess("OrderCancelled", {
      orderHash: args.orderHash,
      maker: args.maker,
    });
  } catch (error) {
    logger.logEventError("OrderCancelled", error as Error, { args });
    throw error;
  }
}
