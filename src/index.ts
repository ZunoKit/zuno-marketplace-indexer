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
import { getEventLogger } from "./core/utils/event-logger";
import { wrapHandler } from "./core/utils/handler-wrapper";
import { getMetrics } from "./core/utils/metrics";
import { getErrorHandler } from "./core/utils/error-handler";

// Collection handlers
import {
  handleERC1155CollectionCreated,
  handleERC721CollectionCreated,
} from "./handlers/collection.handler";

// Transfer handlers
import {
  handleTransfer,
  handleTransferSingle,
  handleTransferBatch,
} from "./handlers/transfer.handler";

// Trade handlers
import {
  handleNFTListed,
  handleNFTUnlisted,
  handleNFTPurchased,
  handleOrderFulfilled,
  handleOrderCreated,
  handleOrderCancelled,
} from "./handlers/trade.handler";

const logger = getEventLogger();
const metrics = getMetrics();
const errorHandler = getErrorHandler();

// ============================================================================
// Collection Factory Events
// ============================================================================

// Collection Factory Events
ponder.on(
  "erc721collectionfactory_anvil_0x0dcd:ERC721CollectionCreated",
  wrapHandler("ERC721CollectionCreated", handleERC721CollectionCreated)
);

ponder.on(
  "erc1155collectionfactory_anvil_0x9a67:ERC1155CollectionCreated",
  wrapHandler("ERC1155CollectionCreated", handleERC1155CollectionCreated)
);

// ============================================================================
// NFT Transfer Events (ERC721)
// ============================================================================

// NFT Transfer Events (ERC721) - Using different contract
// ponder.on(
//   "erc721collectionfactory_anvil_0x0dcd:ERC721CollectionCreated",
//   wrapHandler("ERC721CollectionCreated", handleTransfer)
// );

// ============================================================================
// NFT Transfer Events (ERC1155)
// ============================================================================

// ERC1155 Transfer Events - Using different contract
// ponder.on(
//   "erc1155collectionfactory_anvil_0x9a67:ERC1155CollectionCreated",
//   wrapHandler("ERC1155CollectionCreated", handleTransferSingle)
// );

// ============================================================================
// Marketplace Trading Events
// ============================================================================

// Marketplace Trading Events - Using advanced listing manager
ponder.on(
  "advancedlistingmanager_anvil_0x3aa5:ListingCreated",
  wrapHandler("ListingCreated", handleNFTListed)
);

// ============================================================================
// Future: Auction Events
// ============================================================================

// TODO: Implement auction handlers when auction contracts are ready
// ponder.on("YourAuction:AuctionCreated", wrapHandler("AuctionCreated", handleAuctionCreated));
// ponder.on("YourAuction:BidPlaced", wrapHandler("BidPlaced", handleBidPlaced));
// ponder.on("YourAuction:AuctionEnded", wrapHandler("AuctionEnded", handleAuctionEnded));
// ponder.on("YourAuction:AuctionCancelled", wrapHandler("AuctionCancelled", handleAuctionCancelled));

// ============================================================================
// Future: Offer Events
// ============================================================================

// TODO: Implement offer handlers when offer system is ready
// ponder.on("YourOffer:OfferMade", wrapHandler("OfferMade", handleOfferMade));
// ponder.on("YourOffer:OfferAccepted", wrapHandler("OfferAccepted", handleOfferAccepted));
// ponder.on("YourOffer:OfferCancelled", wrapHandler("OfferCancelled", handleOfferCancelled));

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

📊 Available Event Handlers:
  • Collection: ERC721CollectionCreated, ERC1155CollectionCreated
  • Transfers: Transfer, TransferSingle, TransferBatch
  • Trading: NFTListed, NFTUnlisted, NFTPurchased
  • Orders: OrderCreated, OrderFulfilled, OrderCancelled

🔧 Features Enabled:
  • ✅ Error handling with retry logic (3 attempts)
  • ✅ Metrics tracking and monitoring
  • ✅ Event logging (verbose: ${logger ? "enabled" : "disabled"})
  • ✅ Failed event recovery

⚠️  Note: Event handlers are commented out until contracts are configured.
    Configure your contracts in ponder.config.ts and uncomment handlers in src/index.ts

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
