/**
 * NFT Transfer Event Handlers
 * Handles ERC721 and ERC1155 transfer events
 */

// import type { Context } from "ponder:registry";
import { TokenType } from "../core/types";
import type { TransferEvent, TransferSingleEvent, TransferBatchEvent } from "../core/types/events";
import { getEventLogger } from "../core/utils/event-logger";
import { generateTokenId } from "../core/utils/helpers";
import { AccountRepository } from "../repositories/account.repository";
import { CollectionRepository } from "../repositories/collection.repository";
import { EventLogRepository } from "../repositories/event-log.repository";
import { TokenRepository } from "../repositories/token.repository";

const logger = getEventLogger();
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as const;

/**
 * ERC721 Transfer Handler
 */
export async function handleTransfer(event: any, context: any) {
  const args = event.args as TransferEvent;
  const contractAddress = event.log.address;

  logger.logEventStart("Transfer", contractAddress, event.block.number, event.transaction.hash);

  try {
    // Initialize repositories
    const accountRepo = new AccountRepository({ db: context.db, network: context.network });
    const tokenRepo = new TokenRepository({ db: context.db, network: context.network });
    const collectionRepo = new CollectionRepository({ db: context.db, network: context.network });
    const eventLogRepo = new EventLogRepository({ db: context.db, network: context.network });

    // Log the event
    await eventLogRepo.createFromEvent(
      "Transfer",
      contractAddress,
      null,
      args,
      {
        block: event.block,
        transaction: event.transaction,
        log: event.log,
      }
    );

    // Check if this is a mint (from zero address)
    const isMint = args.from.toLowerCase() === ZERO_ADDRESS;

    // Check if this is a burn (to zero address)
    const isBurn = args.to.toLowerCase() === ZERO_ADDRESS;

    if (isMint) {
      // Handle mint
      logger.logInfo("Transfer", "Minting new NFT");

      // Get or create recipient account
      await accountRepo.getOrCreate(args.to, event.block.timestamp);

      // Create token
      await tokenRepo.getOrCreate(
        contractAddress,
        args.tokenId.toString(),
        args.to,
        args.to, // Minter is the same as initial owner
        event.block.timestamp,
        event.block.number,
        event.transaction.hash
      );

      // Update account NFT count
      await accountRepo.incrementNftsMinted(args.to);

      // Update collection supply
      const collectionResult = await collectionRepo.findByAddressAndChain(
        contractAddress,
        context.network.chainId
      );

      if (collectionResult.success && collectionResult.data) {
        await collectionRepo.updateSupplyMetrics(collectionResult.data.id, 1, 0);
      }
    } else if (isBurn) {
      // Handle burn
      logger.logInfo("Transfer", "Burning NFT");

      const tokenId = generateTokenId(
        context.network.chainId,
        contractAddress,
        args.tokenId.toString()
      );

      // Mark token as burned
      await tokenRepo.markAsBurned(tokenId);

      // Update from account NFT count
      await accountRepo.updateNftsOwned(args.from, -1);

      // Update collection supply
      const collectionResult = await collectionRepo.findByAddressAndChain(
        contractAddress,
        context.network.chainId
      );

      if (collectionResult.success && collectionResult.data) {
        await collectionRepo.updateSupplyMetrics(collectionResult.data.id, 0, 1);
      }
    } else {
      // Handle regular transfer
      logger.logInfo("Transfer", "Transferring NFT");

      // Get or create accounts
      await Promise.all([
        accountRepo.getOrCreate(args.from, event.block.timestamp),
        accountRepo.getOrCreate(args.to, event.block.timestamp),
      ]);

      // Update token owner
      const tokenId = generateTokenId(
        context.network.chainId,
        contractAddress,
        args.tokenId.toString()
      );

      await tokenRepo.updateOwner(tokenId, args.to, event.block.timestamp);

      // Update account NFT counts
      await Promise.all([
        accountRepo.updateNftsOwned(args.from, -1),
        accountRepo.updateNftsOwned(args.to, 1),
        accountRepo.updateActivity(args.from, event.block.timestamp),
        accountRepo.updateActivity(args.to, event.block.timestamp),
      ]);
    }

    logger.logEventSuccess("Transfer", {
      from: args.from,
      to: args.to,
      tokenId: args.tokenId.toString(),
      type: isMint ? 'mint' : isBurn ? 'burn' : 'transfer',
    });
  } catch (error) {
    logger.logEventError("Transfer", error as Error, {
      args,
      block: event.block.number.toString(),
      tx: event.transaction.hash,
    });

    // Log failed event for retry
    const eventLogRepo = new EventLogRepository({ db: context.db, network: context.network });
    await eventLogRepo.createFromEvent(
      "Transfer",
      contractAddress,
      null,
      { ...args, error: (error as Error).message },
      {
        block: event.block,
        transaction: event.transaction,
        log: event.log,
      }
    );

    throw error;
  }
}

/**
 * ERC1155 TransferSingle Handler
 */
export async function handleTransferSingle(event: any, context: any) {
  const args = event.args as TransferSingleEvent;
  const contractAddress = event.log.address;

  logger.logEventStart("TransferSingle", contractAddress, event.block.number, event.transaction.hash);

  try {
    // Initialize repositories
    const accountRepo = new AccountRepository({ db: context.db, network: context.network });
    const tokenRepo = new TokenRepository({ db: context.db, network: context.network });
    const eventLogRepo = new EventLogRepository({ db: context.db, network: context.network });

    // Log the event
    await eventLogRepo.createFromEvent(
      "TransferSingle",
      contractAddress,
      null,
      args,
      {
        block: event.block,
        transaction: event.transaction,
        log: event.log,
      }
    );

    const isMint = args.from.toLowerCase() === ZERO_ADDRESS;
    const isBurn = args.to.toLowerCase() === ZERO_ADDRESS;

    if (isMint) {
      // Handle mint
      await accountRepo.getOrCreate(args.to, event.block.timestamp);

      const tokenResult = await tokenRepo.getOrCreate(
        contractAddress,
        args.id.toString(),
        args.to,
        args.to,
        event.block.timestamp,
        event.block.number,
        event.transaction.hash
      );

      // Update supply for ERC1155
      if (tokenResult.success && tokenResult.data) {
        const currentSupply = BigInt(tokenResult.data.totalSupply);
        const newSupply = currentSupply + args.value;
        await tokenRepo.updateSupply(tokenResult.data.id, newSupply.toString());
      }

      await accountRepo.incrementNftsMinted(args.to, Number(args.value));
    } else if (isBurn) {
      // Handle burn
      const tokenId = generateTokenId(
        context.network.chainId,
        contractAddress,
        args.id.toString()
      );

      const tokenResult = await tokenRepo.findById(tokenId);
      if (tokenResult.success && tokenResult.data) {
        const currentSupply = BigInt(tokenResult.data.totalSupply);
        const newSupply = currentSupply - args.value;

        if (newSupply <= 0n) {
          await tokenRepo.markAsBurned(tokenId);
        } else {
          await tokenRepo.updateSupply(tokenId, newSupply.toString());
        }
      }

      await accountRepo.updateNftsOwned(args.from, -Number(args.value));
    } else {
      // Handle transfer
      await Promise.all([
        accountRepo.getOrCreate(args.from, event.block.timestamp),
        accountRepo.getOrCreate(args.to, event.block.timestamp),
      ]);

      const tokenId = generateTokenId(
        context.network.chainId,
        contractAddress,
        args.id.toString()
      );

      await tokenRepo.updateOwner(tokenId, args.to, event.block.timestamp);
    }

    logger.logEventSuccess("TransferSingle", {
      operator: args.operator,
      from: args.from,
      to: args.to,
      id: args.id.toString(),
      value: args.value.toString(),
    });
  } catch (error) {
    logger.logEventError("TransferSingle", error as Error, { args });
    throw error;
  }
}

/**
 * ERC1155 TransferBatch Handler
 */
export async function handleTransferBatch(event: any, context: any) {
  const args = event.args as TransferBatchEvent;
  const contractAddress = event.log.address;

  logger.logEventStart("TransferBatch", contractAddress, event.block.number, event.transaction.hash);

  try {
    // Log the event
    const eventLogRepo = new EventLogRepository({ db: context.db, network: context.network });
    await eventLogRepo.createFromEvent(
      "TransferBatch",
      contractAddress,
      null,
      args,
      {
        block: event.block,
        transaction: event.transaction,
        log: event.log,
      }
    );

    // Process each token in the batch
    for (let i = 0; i < args.ids.length; i++) {
      const id = args.ids[i];
      const value = args.values[i];

      if (!id || value === undefined) continue;

      // Create a synthetic TransferSingle event for each token
      await handleTransferSingle(
        {
          args: {
            operator: args.operator,
            from: args.from,
            to: args.to,
            id,
            value,
          },
          block: event.block,
          transaction: event.transaction,
          log: { ...event.log, logIndex: event.log.logIndex + i },
        },
        context
      );
    }

    logger.logEventSuccess("TransferBatch", {
      operator: args.operator,
      from: args.from,
      to: args.to,
      count: args.ids.length,
    });
  } catch (error) {
    logger.logEventError("TransferBatch", error as Error, { args });
    throw error;
  }
}
