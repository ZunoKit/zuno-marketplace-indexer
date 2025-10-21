/**
 * ERC1155 Collection Created Handler
 */

import * as schema from "ponder:schema";
import { TokenType } from "../../../shared/types";
import type { ERC1155CollectionCreatedEvent } from "../../../shared/types/events";
import { getEventLogger } from "../../../infrastructure/logging/event-logger";
import { generateCollectionId, normalizeAddress } from "../../../shared/utils/helpers";
import { AccountRepository } from "../../account/repository";
import { EventLogRepository } from "../../../repositories/event-log.repository";

const logger = getEventLogger();

/**
 * Handle ERC1155 collection creation
 */
export async function handleERC1155Created({
  event,
  context,
}: {
  event: any;
  context: any;
}) {
  const args = event.args as ERC1155CollectionCreatedEvent;
  const contractAddress = event.log.address;

  logger.logEventStart(
    "ERC1155CollectionCreated",
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
      "ERC1155CollectionCreated",
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
      name: null, // ERC1155 typically doesn't have name in creation event
      symbol: null,
      tokenType: TokenType.ERC1155,
      creator: normalizeAddress(args.creator),
      owner: normalizeAddress(args.creator),
      royaltyFee: 0,
      royaltyRecipient: null,
      maxSupply: null,
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

    logger.logEventSuccess("ERC1155CollectionCreated", {
      collection: args.collectionAddress,
      creator: args.creator,
      uri: args.uri,
    });
  } catch (error) {
    logger.logEventError("ERC1155CollectionCreated", error as Error, { args });
    throw error;
  }
}
