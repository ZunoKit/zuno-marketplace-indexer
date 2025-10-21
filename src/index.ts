/**
 * Zuno Marketplace Event Handlers Registry
 *
 * Central registry for all blockchain event handlers.
 * Events are organized by domain for better maintainability.
 *
 * Architecture:
 * - Collection events: NFT collection creation and management
 * - Transfer events: NFT minting, burning, and transfers
 * - Trade events: Marketplace listings and sales
 * - Auction events: Auction creation and bids (future)
 * - Offer events: NFT offers (future)
 *
 * NOTE: Event handlers are currently commented out until contracts are configured.
 * Uncomment and configure based on your actual contract events after running codegen.
 */

import { ponder } from "ponder:registry";
import { getErrorHandler } from "./core/utils/error-handler";
import { getEventLogger } from "./core/utils/event-logger";
import { wrapHandler } from "./core/utils/handler-wrapper";
import { getMetrics } from "./core/utils/metrics";

// Collection handlers
import {
  handleERC1155CollectionCreated,
  handleERC721CollectionCreated,
} from "./handlers/collection.handler";

// Transfer handlers

// Trade handlers
import {
  handleNFTListed,
  handleNFTPurchased,
  handleNFTUnlisted
} from "./handlers/trade.handler";

const logger = getEventLogger();
const metrics = getMetrics();
const errorHandler = getErrorHandler();

// ============================================================================
// Collection Factory Events
// ============================================================================

ponder.on(
  "erc721collectionfactory_anvil_0x0dcd:ERC721CollectionCreated",
  wrapHandler("ERC721CollectionCreated", handleERC721CollectionCreated)
);

ponder.on(
  "erc1155collectionfactory_anvil_0x9a67:ERC1155CollectionCreated",
  wrapHandler("ERC1155CollectionCreated", handleERC1155CollectionCreated)
);

// ============================================================================
// Marketplace Trading Events
// ============================================================================

ponder.on(
  "advancedlistingmanager_anvil_0x3aa5:ListingCreated",
  wrapHandler("ListingCreated", handleNFTListed)
);

ponder.on(
  "advancedlistingmanager_anvil_0x3aa5:ListingCancelled",
  wrapHandler("ListingCancelled", handleNFTUnlisted)
);

ponder.on(
  "advancedlistingmanager_anvil_0x3aa5:ListingUpdated",
  wrapHandler("ListingUpdated", handleNFTListed)
);

ponder.on(
  "advancedlistingmanager_anvil_0x3aa5:NFTPurchased",
  wrapHandler("NFTPurchased", handleNFTPurchased)
);

// ============================================================================
// Lifecycle Hooks
// ============================================================================

/**
 * Indexer started
 */
console.log(`
╔══════════════════════════════════════════════════════════╗
║   Zuno Marketplace Indexer                               ║
║   Version: 1.0.0                                         ║
║   Environment: ${
  process.env.NODE_ENV || "development"
}                                ║
╚══════════════════════════════════════════════════════════╝

📊 Registered Event Handlers:
  • Collection: ERC721CollectionCreated, ERC1155CollectionCreated
  • Trading: ListingCreated, ListingCancelled, ListingUpdated, NFTPurchased

🔧 Features Enabled:
  • ✅ Error handling with retry logic (3 attempts)
  • ✅ Metrics tracking and monitoring
  • ✅ Event logging (verbose: ${logger ? "enabled" : "disabled"})
  • ✅ Failed event recovery

📡 Contracts Monitored:
  • ERC721CollectionFactory: 0x0dcd...
  • ERC1155CollectionFactory: 0x9a67...
  • AdvancedListingManager: 0x3aa5...

🚀 Ready to index events...
`);

// Print metrics report every 5 minutes (development only)
if (process.env.NODE_ENV !== "production") {
  setInterval(() => {
    metrics.printReport();

    const failedCount = errorHandler.getFailedEventsCount();
    if (failedCount > 0) {
      console.log(`⚠️  WARNING: ${failedCount} events failed and need retry`);
    }
  }, 5 * 60 * 1000); // 5 minutes
}
