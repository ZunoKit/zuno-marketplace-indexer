/**
 * Offer Domain
 * Handles NFT offer events
 */

import { ponder } from "ponder:registry";
import { wrapHandler } from "../../infrastructure/monitoring/handler-wrapper";
import { handleOfferCreated } from "./handlers/offer-created.handler";
import { handleOfferAccepted } from "./handlers/offer-accepted.handler";
import { handleOfferCancelled } from "./handlers/offer-cancelled.handler";

/**
 * Register all offer event handlers
 */
export function registerOfferHandlers() {
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
}
