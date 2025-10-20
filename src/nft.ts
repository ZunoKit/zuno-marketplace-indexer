/**
 * NFT Event Handlers (ERC721)
 * Handles Transfer, Approval, and ApprovalForAll events
 */

import { ponder } from "ponder:registry";
import { nft, transferEvent, approvalEvent } from "ponder:schema";
import { createId } from "./utils/helpers";

/**
 * Handle NFT Transfer event
 */
ponder.on("ERC721:Transfer", async ({ event, context }) => {
  const { from, to, tokenId } = event.args;
  const contract = event.log.address;

  const nftId = createId(contract, tokenId);

  // Update NFT ownership
  await context.db
    .insert(nft)
    .values({
      id: nftId,
      contract,
      tokenId,
      owner: to,
      updatedAt: event.block.timestamp,
      chainId: context.network.chainId,
    })
    .onConflictDoUpdate((_row: any) => ({
      owner: to,
      updatedAt: event.block.timestamp,
    }));

  // Record transfer event for audit trail
  await context.db.insert(transferEvent).values({
    id: createId(event.transaction.hash, event.log.logIndex),
    contract,
    tokenId,
    from,
    to,
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
    transactionHash: event.transaction.hash,
    chainId: context.network.chainId,
  });
});

/**
 * Handle NFT Approval event
 */
ponder.on("ERC721:Approval", async ({ event, context }) => {
  const { owner, approved, tokenId } = event.args;
  const contract = event.log.address;

  // Record approval event
  await context.db.insert(approvalEvent).values({
    id: createId(event.transaction.hash, event.log.logIndex),
    contract,
    owner,
    approved,
    tokenId,
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
    transactionHash: event.transaction.hash,
    chainId: context.network.chainId,
  });
});

/**
 * Handle NFT ApprovalForAll event
 */
ponder.on("ERC721:ApprovalForAll", async ({ event, context }) => {
  const { owner, operator, approved } = event.args;
  const contract = event.log.address;

  // Record approval for all event
  // Note: Using tokenId 0 as a sentinel for ApprovalForAll
  await context.db.insert(approvalEvent).values({
    id: createId(event.transaction.hash, event.log.logIndex),
    contract,
    owner,
    approved: operator,
    tokenId: 0n,
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
    transactionHash: event.transaction.hash,
    chainId: context.network.chainId,
  });
});
