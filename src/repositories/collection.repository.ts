/**
 * Collection Repository
 * Handles all database operations for NFT collections
 */

import * as schema from "ponder:schema";
import type { Address, Collection, Result, Timestamp } from "../core/types";
import { generateCollectionId, normalizeAddress } from "../core/utils/helpers";
import { BaseRepository, type DatabaseContext } from "./base.repository";

export class CollectionRepository extends BaseRepository<Collection> {
  constructor(context: DatabaseContext) {
    super(context, "collection");
  }

  protected getTable() {
    return schema.collection;
  }

  /**
   * Find collection by address and chain ID
   */
  async findByAddressAndChain(
    address: Address,
    chainId: number
  ): Promise<Result<Collection | null>> {
    try {
      const collectionId = generateCollectionId(chainId, address);
      return this.findById(collectionId);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Find by address and chain failed')
      };
    }
  }

  /**
   * Update collection stats after trade
   */
  async incrementTradeStats(
    collectionId: string,
    volume: bigint,
    tradeTimestamp: Timestamp
  ): Promise<Result<boolean>> {
    try {
      const result = await this.findById(collectionId);

      if (!result.success || !result.data) {
        return {
          success: false,
          error: new Error('Collection not found')
        };
      }

      const collection = result.data;
      const currentVolume = BigInt(collection.totalVolume);
      const newVolume = currentVolume + volume;

      await this.db
        .update(schema.collection, { id: collectionId })
        .set({
          totalTrades: collection.totalTrades + 1,
          totalVolume: newVolume.toString(),
          lastTradeAt: tradeTimestamp,
        });

      return { success: true, data: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Increment trade stats failed')
      };
    }
  }

  /**
   * Update floor price
   */
  async updateFloorPrice(collectionId: string, price: string): Promise<Result<boolean>> {
    try {
      const result = await this.findById(collectionId);

      if (!result.success || !result.data) {
        return {
          success: false,
          error: new Error('Collection not found')
        };
      }

      const collection = result.data;
      const currentFloor = collection.floorPrice ? BigInt(collection.floorPrice) : null;
      const newPrice = BigInt(price);

      // Update if no floor price or new price is lower
      if (!currentFloor || newPrice < currentFloor) {
        await this.db
          .update(schema.collection, { id: collectionId })
          .set({ floorPrice: price });
      }

      return { success: true, data: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Update floor price failed')
      };
    }
  }

  /**
   * Update supply metrics
   */
  async updateSupplyMetrics(
    collectionId: string,
    minted: number = 0,
    burned: number = 0
  ): Promise<Result<boolean>> {
    try {
      const result = await this.findById(collectionId);

      if (!result.success || !result.data) {
        return {
          success: false,
          error: new Error('Collection not found')
        };
      }

      const collection = result.data;
      const currentSupply = BigInt(collection.totalSupply);
      const currentMinted = BigInt(collection.totalMinted);
      const currentBurned = BigInt(collection.totalBurned);

      const newSupply = currentSupply + BigInt(minted) - BigInt(burned);
      const newMinted = currentMinted + BigInt(minted);
      const newBurned = currentBurned + BigInt(burned);

      await this.db
        .update(schema.collection, { id: collectionId })
        .set({
          totalSupply: newSupply.toString(),
          totalMinted: newMinted.toString(),
          totalBurned: newBurned.toString(),
        });

      return { success: true, data: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Update supply metrics failed')
      };
    }
  }

  /**
   * Get collections by creator
   */
  async findByCreator(creator: Address): Promise<Result<Collection[]>> {
    try {
      const results = await this.db
        .select()
        .from(schema.collection)
        .where((c: any) => c.creator.equals(normalizeAddress(creator)))
        .execute();

      return { success: true, data: results };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Find by creator failed')
      };
    }
  }

  /**
   * Get top collections by volume
   */
  async getTopByVolume(limit: number = 10, chainId?: number): Promise<Result<Collection[]>> {
    try {
      let query = this.db
        .select()
        .from(schema.collection);

      if (chainId) {
        query = query.where((c: any) => c.chainId.equals(chainId));
      }

      const results = await query
        .orderBy((c: any) => c.totalVolume, "desc")
        .limit(limit)
        .execute();

      return { success: true, data: results };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Get top by volume failed')
      };
    }
  }
}
