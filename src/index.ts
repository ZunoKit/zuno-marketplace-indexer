/**
 * Zuno Marketplace Event Handlers Registry
 * Event-First Architecture with Domain-Driven Design
 *
 * @version 3.0.0
 * @architecture Event Sourcing + Domain-Driven Design
 * @schema Event-first with aggregate projections
 */

import { registerCollectionHandlers } from "@/domain/collection";
import { registerTradingHandlers } from "@/domain/trading";
import { registerAuctionHandlers } from "@/domain/auction";

import { getEventLogger } from "@/infrastructure/logging/event-logger";
import { getMetrics } from "@/infrastructure/monitoring/metrics";
import { getErrorHandler } from "@/infrastructure/monitoring/error-handler";

const logger = getEventLogger();
const metrics = getMetrics();
const errorHandler = getErrorHandler();

registerCollectionHandlers();
registerTradingHandlers();
registerAuctionHandlers();

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
