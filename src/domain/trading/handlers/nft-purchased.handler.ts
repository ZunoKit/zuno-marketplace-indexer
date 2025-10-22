/**
 * NFT Purchased Handler
 * Handles NFT purchase/sale events
 */

import type { NFTPurchasedEvent } from "@/shared/types/events";
import { getEventLogger } from "@/infrastructure/logging/event-logger";
import { generateCollectionId, generateTokenId } from "@/shared/utils/helpers";
import { getTokenTypeOrDefault } from "@/shared/utils/token-detector";
import {
  AccountRepository,
  CollectionRepository,
  EventRepository,
  TokenRepository,
  TradeRepository,
} from "@/repositories";
import {
  validateEventData,
  type NFTPurchasedData,
} from "@/shared/schemas/event.schemas";

const logger = getEventLogger();

/**
 * Handle NFT purchase/sale
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
    const eventRepo = new EventRepository({
      db: context.db,
      network: context.network,
    });

    // Prepare event data
    const eventData: NFTPurchasedData = {
      price: args.price.toString(),
      paymentToken: args.paymentToken,
      makerFee: "0",
      takerFee: args.platformFee.toString(),
      royaltyFee: args.royaltyFee.toString(),
      royaltyRecipient: args.royaltyRecipient,
      amount: "1", // Default for single NFT purchase
    };

    // Validate with Zod schema
    const validatedData = validateEventData("nft_purchased", eventData);

    // Create event record (source of truth)
    const eventResult = await eventRepo.createEvent({
      eventType: "nft_purchased",
      category: "trade",
      actor: args.seller,
      counterparty: args.buyer,
      collection: args.nftContract,
      tokenId: args.tokenId.toString(),
      data: validatedData,
      contractName: "Marketplace",
      event,
    });

    if (!eventResult.success) {
      throw new Error(`Failed to create event: ${eventResult.error?.message}`);
    }

    // Get or create accounts
    await Promise.all([
      accountRepo.getOrCreate(args.seller, event.block.timestamp),
      accountRepo.getOrCreate(args.buyer, event.block.timestamp),
    ]);

    // Get token type from cache (already detected in listing handler)
    const detectedType = getTokenTypeOrDefault(context, args.nftContract);
    const tokenType =
      detectedType === "ERC721"
        ? "ERC721"
        : detectedType === "ERC1155"
        ? "ERC1155"
        : "ERC721"; // fallback

    // Create trade record (projection from event)
    await tradeRepo.createTrade({
      maker: args.seller,
      taker: args.buyer,
      collection: args.nftContract,
      tokenId: args.tokenId.toString(),
      tokenType,
      amount: "1",
      price: args.price.toString(),
      paymentToken: args.paymentToken,
      makerFee: "0", // Seller typically doesn't pay
      takerFee: args.platformFee.toString(),
      royaltyFee: args.royaltyFee.toString(),
      royaltyRecipient: args.royaltyRecipient,
      tradeType: "sale",
      sourceEventId: eventResult.data.id,
      blockNumber: event.block.number,
      blockTimestamp: event.block.timestamp,
      transactionHash: event.transaction.hash,
      logIndex: event.log.logIndex,
      chainId: context.network.chainId,
    });

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

    // Update account activity
    await Promise.all([
      accountRepo.updateActivity(args.seller, event.block.timestamp),
      accountRepo.updateActivity(args.buyer, event.block.timestamp),
    ]);

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
