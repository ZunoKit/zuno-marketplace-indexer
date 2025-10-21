/**
 * Zuno Marketplace Event Handlers Registry
 * Domain-Driven Architecture
 *
 * @version 2.0.0
 * @architecture Domain-Driven Design
 */

import { registerCollectionHandlers } from './domain/collection';
import { registerTradingHandlers } from './domain/trading';
import { registerOfferHandlers } from './domain/offer';
import { registerAuctionHandlers } from './domain/auction';

import { getEventLogger } from "./infrastructure/logging/event-logger";
import { getMetrics } from "./infrastructure/monitoring/metrics";
import { getErrorHandler } from "./infrastructure/monitoring/error-handler";

const logger = getEventLogger();
const metrics = getMetrics();
const errorHandler = getErrorHandler();

// ============================================================================
// Startup Banner
// ============================================================================

console.log(`
╔══════════════════════════════════════════════════════════╗
║   Zuno Marketplace Indexer v2.0                          ║
║   Domain-Driven Architecture                             ║
╚══════════════════════════════════════════════════════════╝

🚀 Registering event handlers...
`);

// ============================================================================
// Register All Domain Handlers
// ============================================================================

registerCollectionHandlers();
registerTradingHandlers();
registerOfferHandlers();
registerAuctionHandlers();

// ============================================================================
// Startup Summary
// ============================================================================

console.log(`
✅ All event handlers registered successfully!

📊 Registered Domains:
  • Collection Domain: ✅ (4 events)
  • Trading Domain: ✅ (10 events)
  • Offer Domain: ✅ (3 events)
  • Auction Domain: ✅ (1 event)

🔧 Features:
  • ✅ Error handling with retry (3 attempts)
  • ✅ Metrics tracking and monitoring
  • ✅ Event logging (verbose mode)
  • ✅ Token type auto-detection
  • ✅ Failed event recovery

📡 Contracts Monitored (7 active):
  • ERC721CollectionFactory
  • ERC1155CollectionFactory
  • CollectionFactoryRegistry
  • AdvancedListingManager
  • ERC721NFTExchange
  • ERC1155NFTExchange
  • OfferManager

🚀 Ready to index events...
`);

// ============================================================================
// Development Monitoring
// ============================================================================

// Print metrics report every 5 minutes (development only)
if (process.env.NODE_ENV !== "production") {
  setInterval(() => {
    metrics.printReport();

    const failedCount = errorHandler.getFailedEventsCount();
    if (failedCount > 0) {
      console.log(`⚠️  WARNING: ${failedCount} events failed and need retry`);
    }
  }, 5 * 60 * 1000);
}
