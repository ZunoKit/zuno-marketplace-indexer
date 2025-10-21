/**
 * Collection Domain
 * Handles NFT collection creation events
 */

import { ponder } from "ponder:registry";
import { wrapHandler } from "../../infrastructure/monitoring/handler-wrapper";
import { handleERC721Created } from "./handlers/erc721-created.handler";
import { handleERC1155Created } from "./handlers/erc1155-created.handler";

/**
 * Register all collection event handlers
 */
export function registerCollectionHandlers() {
  // ERC721 Collection Factory
  ponder.on(
    "erc721collectionfactory_anvil_0x0dcd:ERC721CollectionCreated",
    wrapHandler("ERC721CollectionCreated", handleERC721Created)
  );

  // ERC1155 Collection Factory
  ponder.on(
    "erc1155collectionfactory_anvil_0x9a67:ERC1155CollectionCreated",
    wrapHandler("ERC1155CollectionCreated", handleERC1155Created)
  );

  // Collection Factory Registry
  ponder.on(
    "collectionfactoryregistry_anvil_0x0b30:ERC721CollectionCreated",
    wrapHandler("ERC721CollectionCreated", handleERC721Created)
  );

  ponder.on(
    "collectionfactoryregistry_anvil_0x0b30:ERC1155CollectionCreated",
    wrapHandler("ERC1155CollectionCreated", handleERC1155Created)
  );
}
