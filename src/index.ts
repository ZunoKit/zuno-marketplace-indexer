/**
 * Zuno Marketplace Event Handlers Registry
 * 
 * This file registers all event handlers for the marketplace contracts.
 * Handlers are organized by domain (collections, tokens, trades)
 */

import { ponder } from "ponder:registry";
import {
  handleERC1155CollectionCreated,
  handleERC721CollectionCreated
} from "./handlers/collection.handler";

// ============================================================================
// Collection Factory Events
// ============================================================================

/**
 * ERC721 Collection Created
 * Emitted when a new ERC721 collection is created via the factory
 */
ponder.on("*:ERC721CollectionCreated", handleERC721CollectionCreated);

/**
 * ERC1155 Collection Created
 * Emitted when a new ERC1155 collection is created via the factory
 */
ponder.on("*:ERC1155CollectionCreated", handleERC1155CollectionCreated);

// ============================================================================
// NFT Transfer Events (To be implemented)
// ============================================================================

// TODO: Implement Transfer event handler
// ponder.on("*:Transfer", handleTransfer);

// TODO: Implement TransferSingle event handler (ERC1155)
// ponder.on("*:TransferSingle", handleTransferSingle);

// TODO: Implement TransferBatch event handler (ERC1155)
// ponder.on("*:TransferBatch", handleTransferBatch);

// ============================================================================
// Marketplace Trading Events (To be implemented)
// ============================================================================

// TODO: Implement OrderFulfilled event handler
// ponder.on("*:OrderFulfilled", handleOrderFulfilled);

// TODO: Implement OrderCreated event handler
// ponder.on("*:OrderCreated", handleOrderCreated);

// TODO: Implement OrderCancelled event handler
// ponder.on("*:OrderCancelled", handleOrderCancelled);

// ============================================================================
// Catch-all Event Logger
// ============================================================================

/**
 * Catch-all handler to log all events
 * Useful for discovering new event types and debugging
 */
ponder.on("*:*", async ({ event, context }) => {
  // Log all events for monitoring
  const eventSignature = event.log.topics[0];
  console.log(`[Event] ${eventSignature} from ${event.log.address} at block ${event.block.number}`);
  
  // TODO: Store in event_log table for analysis
});
