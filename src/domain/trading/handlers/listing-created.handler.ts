/**
 * Listing Created Handler
 * Handles NFT listing creation events
 */

import { ListingStatus, TokenType } from "../../../shared/types";
import type { NFTListedEvent } from "../../../shared/types/events";
import { getEventLogger } from "../../../infrastructure/logging/event-logger";
import { detectTokenTypeWithCache } from "../../../shared/utils/token-detector";
import { AccountRepository } from "../../account/repository";
import { ListingRepository } from "../../../repositories/listing.repository";
import { EventLogRepository } from "../../../repositories/event-log.repository";

const logger = getEventLogger();

/**
 * Handle NFT listing creation
 */
export async function handleListingCreated({
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

    // Detect token type (with cache) - auto-detect ERC721 vs ERC1155
    const detectedType = await detectTokenTypeWithCache(context, args.nftContract);
    const tokenType = detectedType === "ERC721" ? TokenType.ERC721
                    : detectedType === "ERC1155" ? TokenType.ERC1155
                    : TokenType.ERC721; // fallback

    // Create listing
    await listingRepo.createListing({
      orderHash: args.listingId,
      maker: args.seller,
      taker: null, // Open to anyone
      collection: args.nftContract,
      tokenId: args.tokenId.toString(),
      tokenType,
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
