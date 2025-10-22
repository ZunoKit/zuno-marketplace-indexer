/**
 * Trading Domain
 * Handles NFT trading events (listings, purchases, cancellations)
 */

import { ponder } from "ponder:registry";
import { wrapHandler } from "../../infrastructure/monitoring/handler-wrapper";
import { handleListingCreated } from "./handlers/listing-created.handler";
import { handleListingCancelled } from "./handlers/listing-cancelled.handler";
import { handleNFTPurchased } from "./handlers/nft-purchased.handler";

/**
 * Register all trading event handlers
 */
export function registerTradingHandlers() {
  // AdvancedListingManager Events
  ponder.on(
    "advancedlistingmanager_anvil:ListingCreated",
    wrapHandler("ListingCreated", handleListingCreated)
  );

  ponder.on(
    "advancedlistingmanager_anvil:ListingCancelled",
    wrapHandler("ListingCancelled", handleListingCancelled)
  );

  ponder.on(
    "advancedlistingmanager_anvil:ListingUpdated",
    wrapHandler("ListingUpdated", handleListingCreated)
  );

  ponder.on(
    "advancedlistingmanager_anvil:NFTPurchased",
    wrapHandler("NFTPurchased", handleNFTPurchased)
  );

  // ERC721 NFTExchange Events
  ponder.on(
    "erc721nftexchange_anvil:NFTListed",
    wrapHandler("NFTListed", handleListingCreated)
  );

  ponder.on(
    "erc721nftexchange_anvil:ListingCancelled",
    wrapHandler("ListingCancelled", handleListingCancelled)
  );

  ponder.on(
    "erc721nftexchange_anvil:NFTSold",
    wrapHandler("NFTSold", handleNFTPurchased)
  );

  // ERC1155 NFTExchange Events
  ponder.on(
    "erc1155nftexchange_anvil:NFTListed",
    wrapHandler("NFTListed", handleListingCreated)
  );

  ponder.on(
    "erc1155nftexchange_anvil:ListingCancelled",
    wrapHandler("ListingCancelled", handleListingCancelled)
  );

  ponder.on(
    "erc1155nftexchange_anvil:NFTSold",
    wrapHandler("NFTSold", handleNFTPurchased)
  );
}
