/**
 * Auction Domain
 * Handles NFT auction events
 */

import { ponder } from "ponder:registry";
import { wrapHandler } from "@/infrastructure/monitoring/handler-wrapper";
import { handleAuctionCreated } from "./handlers/auction-created.handler";
import { handleAuctionSettled } from "./handlers/auction-settled.handler";
import { handleBidPlaced } from "./handlers/bid-placed.handler";

/**
 * Register all auction event handlers
 */
export function registerAuctionHandlers() {
  // Auction lifecycle events from advancedlistingmanager
  ponder.on(
    "advancedlistingmanager_anvil:AuctionCreated",
    wrapHandler("AuctionCreated", handleAuctionCreated)
  );

  // Note: These handlers are ready for when auction contracts become available
  // Uncomment when auction settlement and bidding contracts are deployed
  /*
  ponder.on(
    "auctionmanager_anvil:AuctionSettled",
    wrapHandler("AuctionSettled", handleAuctionSettled)
  );

  ponder.on(
    "auctionmanager_anvil:BidPlaced", 
    wrapHandler("BidPlaced", handleBidPlaced)
  );
  */
}
