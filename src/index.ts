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

// Offer handlers
import {
  handleOfferAccepted,
  handleOfferCancelled,
  handleOfferCreated,
} from "./handlers/offer.handler";

// Auction handlers
import {
  handleAuctionCreated
} from "./handlers/auction.handler";

const logger = getEventLogger();
const metrics = getMetrics();
const errorHandler = getErrorHandler();

// ============================================================================
// Collection Factory Events
// ============================================================================

// ERC721 Collection Factory
ponder.on(
  "erc721collectionfactory_anvil_0x0dcd:ERC721CollectionCreated",
  wrapHandler("ERC721CollectionCreated", handleERC721CollectionCreated)
);

// ERC1155 Collection Factory
ponder.on(
  "erc1155collectionfactory_anvil_0x9a67:ERC1155CollectionCreated",
  wrapHandler("ERC1155CollectionCreated", handleERC1155CollectionCreated)
);

// Collection Factory Registry
ponder.on(
  "collectionfactoryregistry_anvil_0x0b30:ERC721CollectionCreated",
  wrapHandler("ERC721CollectionCreated", handleERC721CollectionCreated)
);

ponder.on(
  "collectionfactoryregistry_anvil_0x0b30:ERC1155CollectionCreated",
  wrapHandler("ERC1155CollectionCreated", handleERC1155CollectionCreated)
);

// ============================================================================
// Marketplace Trading Events
// ============================================================================

// AdvancedListingManager Events
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

// ERC721 NFTExchange Events
ponder.on(
  "erc721nftexchange_anvil_0x8a79:NFTListed",
  wrapHandler("NFTListed", handleNFTListed)
);

ponder.on(
  "erc721nftexchange_anvil_0x8a79:ListingCancelled",
  wrapHandler("ListingCancelled", handleNFTUnlisted)
);

ponder.on(
  "erc721nftexchange_anvil_0x8a79:NFTSold",
  wrapHandler("NFTSold", handleNFTPurchased)
);

// ERC1155 NFTExchange Events  
ponder.on(
  "erc1155nftexchange_anvil_0xb7f8:NFTListed",
  wrapHandler("NFTListed", handleNFTListed)
);

ponder.on(
  "erc1155nftexchange_anvil_0xb7f8:ListingCancelled",
  wrapHandler("ListingCancelled", handleNFTUnlisted)
);

ponder.on(
  "erc1155nftexchange_anvil_0xb7f8:NFTSold",
  wrapHandler("NFTSold", handleNFTPurchased)
);

// ============================================================================
// Offer Events
// ============================================================================

ponder.on(
  "offermanager_anvil_0x9a9f:OfferCreated",
  wrapHandler("OfferCreated", handleOfferCreated)
);

ponder.on(
  "offermanager_anvil_0x9a9f:OfferAccepted",
  wrapHandler("OfferAccepted", handleOfferAccepted)
);

ponder.on(
  "offermanager_anvil_0x9a9f:OfferCancelled",
  wrapHandler("OfferCancelled", handleOfferCancelled)
);

// ============================================================================
// Auction Events
// ============================================================================

ponder.on(
  "advancedlistingmanager_anvil_0x3aa5:AuctionCreated",
  wrapHandler("AuctionCreated", handleAuctionCreated)
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

📊 Registered Event Handlers (17 events):
  • Collection (4): ERC721/ERC1155 Created (Factory + Registry)
  • Trading (10): Listings, Purchases, Orders (3 contracts)
  • Offers (3): Created, Accepted, Cancelled
  • Auctions (1): AuctionCreated

🔧 Features Enabled:
  • ✅ Error handling with retry logic (3 attempts)
  • ✅ Metrics tracking and monitoring
  • ✅ Event logging (verbose: ${logger ? "enabled" : "disabled"})
  • ✅ Failed event recovery

📡 Contracts Monitored (6 active):
  • ERC721CollectionFactory: 0x0dcd...
  • ERC1155CollectionFactory: 0x9a67...
  • CollectionFactoryRegistry: 0x0b30...
  • AdvancedListingManager: 0x3aa5...
  • ERC721NFTExchange: 0x8a79...
  • ERC1155NFTExchange: 0xb7f8...
  • OfferManager: 0x9a9f...

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
