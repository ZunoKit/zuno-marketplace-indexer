/**
 * Token Repository
 * Handles all database operations for individual NFT tokens
 */

import * as schema from "ponder:schema";
import type { Address, Result, Timestamp } from "@/shared/types";

export interface TokenEntity {
  id: string;
  collection: Address;
  tokenId: string;
  chainId: number;
  owner: Address;
  minter: Address | null;
  tokenUri: string | null;
  metadataUri: string | null;
  totalSupply: string;
  tradeCount: number;
  lastSalePrice: string | null;
  lastSaleToken: Address | null;
  lastSaleTimestamp: bigint | null;
  isBurned: boolean;
  mintedAt: bigint;
  lastTransferAt: bigint;
  mintBlockNumber: bigint;
  mintTxHash: `0x${string}`;
}
import { generateTokenId, normalizeAddress } from "@/shared/utils/helpers";
import {
  BaseRepository,
  type DatabaseContext,
} from "@/shared/base/base.repository";

export class TokenRepository extends BaseRepository<TokenEntity> {
  constructor(context: DatabaseContext) {
    super(context, "token");
  }

  protected getTable() {
    return schema.token;
  }

  /**
   * Find token by collection, tokenId and chain
   */
  async findByCollectionAndTokenId(
    collection: Address,
    tokenId: string,
    chainId: number
  ): Promise<Result<TokenEntity | null>> {
    try {
      const id = generateTokenId(chainId, collection, tokenId);
      return this.findById(id);
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error
            : new Error("Find by collection and tokenId failed"),
      };
    }
  }

  /**
   * Get or create token
   */
  async getOrCreate(
    collection: Address,
    tokenId: string,
    owner: Address,
    minter: Address | null,
    timestamp: Timestamp,
    blockNumber: bigint,
    transactionHash: `0x${string}`
  ): Promise<Result<TokenEntity>> {
    const result = await this.findByCollectionAndTokenId(
      collection,
      tokenId,
      this.chainId
    );

    if (!result.success) {
      return result;
    }

    if (result.data) {
      return { success: true, data: result.data };
    }

    // Create new token
    const id = generateTokenId(this.chainId, collection, tokenId);
    const newToken: Partial<TokenEntity> = {
      id,
      collection: normalizeAddress(collection),
      tokenId,
      chainId: this.chainId,
      owner: normalizeAddress(owner),
      minter: minter ? normalizeAddress(minter) : null,
      tokenUri: null,
      metadataUri: null,
      totalSupply: "1", // Default for ERC721, will be updated for ERC1155
      tradeCount: 0,
      lastSalePrice: null,
      lastSaleToken: null,
      isBurned: false,
      mintedAt: timestamp,
      lastTransferAt: timestamp,
      lastSaleTimestamp: null,
      mintBlockNumber: blockNumber,
      mintTxHash: transactionHash,
    };

    return this.create(newToken);
  }

  /**
   * Update token owner
   */
  async updateOwner(
    tokenId: string,
    newOwner: Address,
    timestamp: Timestamp
  ): Promise<Result<boolean>> {
    try {
      await this.db.update(schema.token, { id: tokenId }).set({
        owner: normalizeAddress(newOwner),
        lastTransferAt: timestamp,
      });

      return { success: true, data: true };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error : new Error("Update owner failed"),
      };
    }
  }

  /**
   * Update token after trade
   */
  async updateAfterTrade(
    tokenId: string,
    price: string,
    paymentToken: Address,
    timestamp: Timestamp
  ): Promise<Result<boolean>> {
    try {
      const result = await this.findById(tokenId);

      if (!result.success || !result.data) {
        return {
          success: false,
          error: new Error("Token not found"),
        };
      }

      const token = result.data;

      await this.db.update(schema.token, { id: tokenId }).set({
        tradeCount: token.tradeCount + 1,
        lastSalePrice: price,
        lastSaleToken: normalizeAddress(paymentToken),
        lastSaleTimestamp: timestamp,
      });

      return { success: true, data: true };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error
            : new Error("Update after trade failed"),
      };
    }
  }

  /**
   * Mark token as burned
   */
  async markAsBurned(tokenId: string): Promise<Result<boolean>> {
    try {
      await this.db
        .update(schema.token, { id: tokenId })
        .set({ isBurned: true });

      return { success: true, data: true };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error : new Error("Mark as burned failed"),
      };
    }
  }

  /**
   * Update token supply (for ERC1155)
   */
  async updateSupply(
    tokenId: string,
    newSupply: string
  ): Promise<Result<boolean>> {
    try {
      await this.db
        .update(schema.token, { id: tokenId })
        .set({ totalSupply: newSupply });

      return { success: true, data: true };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error : new Error("Update supply failed"),
      };
    }
  }

  /**
   * Get tokens by owner
   */
  async findByOwner(
    owner: Address,
    limit: number = 100
  ): Promise<Result<TokenEntity[]>> {
    try {
      const results = await this.db
        .select()
        .from(schema.token)
        .where(
          (t: any) =>
            t.owner.equals(normalizeAddress(owner)) && t.isBurned.equals(false)
        )
        .limit(limit)
        .execute();

      return { success: true, data: results };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error : new Error("Find by owner failed"),
      };
    }
  }

  /**
   * Get tokens by collection
   */
  async findByCollection(
    collection: Address,
    limit: number = 100
  ): Promise<Result<TokenEntity[]>> {
    try {
      const results = await this.db
        .select()
        .from(schema.token)
        .where((t: any) => t.collection.equals(normalizeAddress(collection)))
        .limit(limit)
        .execute();

      return { success: true, data: results };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error
            : new Error("Find by collection failed"),
      };
    }
  }
}
