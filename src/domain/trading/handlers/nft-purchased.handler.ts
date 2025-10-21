/**
 * NFT Purchased Handler
 * Handles NFT purchase/sale events
 */

import { ListingStatus, TokenType, TradeType } from "../../../shared/types";
import type { NFTPurchasedEvent } from "../../../shared/types/events";
import { getEventLogger } from "../../../infrastructure/logging/event-logger";
import { generateCollectionId, generateTokenId } from "../../../shared/utils/helpers";
import { getTokenTypeOrDefault } from "../../../shared/utils/token-detector";
import { AccountRepository } from "../../account/repository";
import { CollectionRepository } from "../../../repositories/collection.repository";
import { EventLogRepository } from "../../../repositories/event-log.repository";
import { ListingRepository } from "../../../repositories/listing.repository";
import { TokenRepository } from "../../../repositories/token.repository";
import { TradeRepository } from "../../../repositories/trade.repository";

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

    // Get token type from cache (already detected in listing handler)
    const detectedType = getTokenTypeOrDefault(context, args.nftContract);
    const tokenType = detectedType === "ERC721" ? TokenType.ERC721
                    : detectedType === "ERC1155" ? TokenType.ERC1155
                    : TokenType.ERC721; // fallback

    // Create trade record
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
