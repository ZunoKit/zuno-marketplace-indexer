/**
 * ERC721 Collection Created Handler
 */

import * as schema from "ponder:schema";
import { TokenType } from "../../../shared/types";
import type { ERC721CollectionCreatedEvent } from "../../../shared/types/events";
import { getEventLogger } from "../../../infrastructure/logging/event-logger";
import { generateCollectionId, normalizeAddress } from "../../../shared/utils/helpers";
import { AccountRepository } from "../../account/repository";
import { EventLogRepository } from "../../../repositories/event-log.repository";

const logger = getEventLogger();

/**
 * Handle ERC721 collection creation
 */
export async function handleERC721Created({
  event,
  context,
}: {
  event: any;
  context: any;
}) {
  const args = event.args as ERC721CollectionCreatedEvent;
  const contractAddress = event.log.address;

  logger.logEventStart(
    "ERC721CollectionCreated",
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
    const eventLogRepo = new EventLogRepository({
      db: context.db,
      network: context.network,
    });

    // Log the event
    await eventLogRepo.createFromEvent(
      "ERC721CollectionCreated",
      contractAddress,
      null,
      args,
      {
        block: event.block,
        transaction: event.transaction,
        log: event.log,
      }
    );

    // Create or get account
    await accountRepo.getOrCreate(args.creator, event.block.timestamp);

    // Create collection record
    const collectionId = generateCollectionId(
      context.network.chainId,
      args.collectionAddress
    );

    await context.db.insert(schema.collection).values({
      id: collectionId,
      address: normalizeAddress(args.collectionAddress),
      chainId: context.network.chainId,
      name: args.name || null,
      symbol: args.symbol || null,
      tokenType: TokenType.ERC721,
      creator: normalizeAddress(args.creator),
      owner: normalizeAddress(args.creator),
      royaltyFee: 0,
      royaltyRecipient: null,
      maxSupply: args.maxSupply?.toString() || null,
      totalSupply: "0",
      totalMinted: "0",
      totalBurned: "0",
      totalTrades: 0,
      totalVolume: "0",
      floorPrice: null,
      isVerified: false,
      isActive: true,
      createdAt: event.block.timestamp,
      lastTradeAt: null,
      blockNumber: event.block.number,
      transactionHash: event.transaction.hash,
    });

    logger.logEventSuccess("ERC721CollectionCreated", {
      collection: args.collectionAddress,
      creator: args.creator,
      name: args.name,
    });
  } catch (error) {
    logger.logEventError("ERC721CollectionCreated", error as Error, { args });
    throw error;
  }
}
