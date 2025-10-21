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
    "advancedlistingmanager_anvil_0x3aa5:ListingCreated",
    wrapHandler("ListingCreated", handleListingCreated)
  );

  ponder.on(
    "advancedlistingmanager_anvil_0x3aa5:ListingCancelled",
    wrapHandler("ListingCancelled", handleListingCancelled)
  );

  ponder.on(
    "advancedlistingmanager_anvil_0x3aa5:ListingUpdated",
    wrapHandler("ListingUpdated", handleListingCreated)
  );

  ponder.on(
    "advancedlistingmanager_anvil_0x3aa5:NFTPurchased",
    wrapHandler("NFTPurchased", handleNFTPurchased)
  );

  // ERC721 NFTExchange Events
  ponder.on(
    "erc721nftexchange_anvil_0x8a79:NFTListed",
    wrapHandler("NFTListed", handleListingCreated)
  );

  ponder.on(
    "erc721nftexchange_anvil_0x8a79:ListingCancelled",
    wrapHandler("ListingCancelled", handleListingCancelled)
  );

  ponder.on(
    "erc721nftexchange_anvil_0x8a79:NFTSold",
    wrapHandler("NFTSold", handleNFTPurchased)
  );

  // ERC1155 NFTExchange Events
  ponder.on(
    "erc1155nftexchange_anvil_0xb7f8:NFTListed",
    wrapHandler("NFTListed", handleListingCreated)
  );

  ponder.on(
    "erc1155nftexchange_anvil_0xb7f8:ListingCancelled",
    wrapHandler("ListingCancelled", handleListingCancelled)
  );

  ponder.on(
    "erc1155nftexchange_anvil_0xb7f8:NFTSold",
    wrapHandler("NFTSold", handleNFTPurchased)
  );
}
