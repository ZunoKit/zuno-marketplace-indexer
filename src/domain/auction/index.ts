/**
 * Auction Domain
 * Handles NFT auction events
 */

import { ponder } from "ponder:registry";
import { wrapHandler } from "../../infrastructure/monitoring/handler-wrapper";
import { handleAuctionCreated } from "./handlers/auction-created.handler";

/**
 * Register all auction event handlers
 */
export function registerAuctionHandlers() {
  ponder.on(
    "advancedlistingmanager_anvil:AuctionCreated",
    wrapHandler("AuctionCreated", handleAuctionCreated)
  );
}
