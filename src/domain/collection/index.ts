/**
 * Collection Domain
 * Handles NFT collection creation and minting events
 */

import { ponder } from "ponder:registry";
import { wrapHandler } from "@/infrastructure/monitoring/handler-wrapper";
import { handleERC721Created } from "./handlers/erc721-created.handler";
import { handleERC1155Created } from "./handlers/erc1155-created.handler";
import { handleNFTMinted } from "./handlers/nft-minted.handler";
import { handleBatchMinted } from "./handlers/batch-minted.handler";

/**
 * Register all collection event handlers
 */
export function registerCollectionHandlers() {
  // ============================================================================
  // Collection Creation Events
  // ============================================================================

  // ERC721 Collection Factory
  ponder.on(
    "erc721collectionfactory_anvil:ERC721CollectionCreated",
    wrapHandler("ERC721CollectionCreated", handleERC721Created)
  );

  // ERC1155 Collection Factory
  ponder.on(
    "erc1155collectionfactory_anvil:ERC1155CollectionCreated",
    wrapHandler("ERC1155CollectionCreated", handleERC1155Created)
  );

  // Collection Factory Registry
  ponder.on(
    "collectionfactoryregistry_anvil:ERC721CollectionCreated",
    wrapHandler("ERC721CollectionCreated", handleERC721Created)
  );

  ponder.on(
    "collectionfactoryregistry_anvil:ERC1155CollectionCreated",
    wrapHandler("ERC1155CollectionCreated", handleERC1155Created)
  );

  // ============================================================================
  // Minting Events (from individual collection contracts)
  // ============================================================================

  // Note: Mint events are emitted from individual collection contracts
  // These need to be registered dynamically as collections are created
  // For now, we'll register them for known collection patterns

  // // ERC721 Mint events
  // ponder.on(
  //   "erc721collectionfactory_anvil:",
  //   wrapHandler("Minted", handleNFTMinted)
  // );

  // ERC1155 Batch mint events
  // ponder.on(
  //   "erc1155collectionfactory_anvil:BatchMinted",
  //   wrapHandler("BatchMinted", handleBatchMinted)
  // );
}
