/**
 * Listing Repository
 * Handles all database operations for marketplace listings/orders
 */

import * as schema from "ponder:schema";
import type { Address, Result } from "../shared/types";
import { ListingStatus } from "../shared/types";
import { normalizeAddress } from "../shared/utils/helpers";
import { BaseRepository, type DatabaseContext } from "../shared/base/base.repository";

export interface Listing {
  id: string;
  orderHash: `0x${string}`;
  maker: Address;
  taker: Address | null;
  collection: Address;
  tokenId: string;
  tokenType: string;
  amount: string;
  price: string;
  paymentToken: Address;
  status: ListingStatus;
  fillPercent: number;
  createdAt: bigint;
  expiresAt: bigint | null;
  filledAt: bigint | null;
  cancelledAt: bigint | null;
  blockNumber: bigint;
  transactionHash: `0x${string}`;
  logIndex: number;
  chainId: number;
}

export class ListingRepository extends BaseRepository<Listing> {
  constructor(context: DatabaseContext) {
    super(context, "listing");
  }

  protected getTable() {
    return schema.listing;
  }

  /**
   * Create listing
   */
  async createListing(listing: Omit<Listing, 'id'>): Promise<Result<Listing>> {
    try {
      // Generate listing ID from order hash
      const id = listing.orderHash;

      const normalizedListing: Partial<Listing> = {
        id,
        orderHash: listing.orderHash,
        maker: normalizeAddress(listing.maker),
        taker: listing.taker ? normalizeAddress(listing.taker) : null,
        collection: normalizeAddress(listing.collection),
        tokenId: listing.tokenId,
        tokenType: listing.tokenType,
        amount: listing.amount,
        price: listing.price,
        paymentToken: normalizeAddress(listing.paymentToken),
        status: listing.status,
        fillPercent: listing.fillPercent,
        createdAt: listing.createdAt,
        expiresAt: listing.expiresAt,
        filledAt: listing.filledAt,
        cancelledAt: listing.cancelledAt,
        blockNumber: listing.blockNumber,
        transactionHash: listing.transactionHash,
        logIndex: listing.logIndex,
        chainId: listing.chainId,
      };

      return this.create(normalizedListing);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Create listing failed')
      };
    }
  }

  /**
   * Update listing status
   */
  async updateStatus(
    listingId: string,
    status: ListingStatus,
    timestamp: bigint
  ): Promise<Result<boolean>> {
    try {
      const updates: any = { status };

      if (status === ListingStatus.FILLED) {
        updates.filledAt = timestamp;
        updates.fillPercent = 100;
      } else if (status === ListingStatus.CANCELLED) {
        updates.cancelledAt = timestamp;
      }

      await this.db
        .update(schema.listing, { id: listingId })
        .set(updates);

      return { success: true, data: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Update status failed')
      };
    }
  }

  /**
   * Update fill percentage (for partial fills)
   */
  async updateFillPercent(listingId: string, fillPercent: number): Promise<Result<boolean>> {
    try {
      const status = fillPercent >= 100 ? ListingStatus.FILLED : ListingStatus.ACTIVE;

      await this.db
        .update(schema.listing, { id: listingId })
        .set({ fillPercent, status });

      return { success: true, data: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Update fill percent failed')
      };
    }
  }

  /**
   * Get active listings
   */
  async getActiveListings(limit: number = 100): Promise<Result<Listing[]>> {
    try {
      const results = await this.db
        .select()
        .from(schema.listing)
        .where((l: any) => l.status.equals(ListingStatus.ACTIVE))
        .orderBy((l: any) => l.createdAt, "desc")
        .limit(limit)
        .execute();

      return { success: true, data: results };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Get active listings failed')
      };
    }
  }

  /**
   * Get listings by collection
   */
  async findByCollection(
    collection: Address,
    status?: ListingStatus,
    limit: number = 100
  ): Promise<Result<Listing[]>> {
    try {
      let query = this.db
        .select()
        .from(schema.listing)
        .where((l: any) => l.collection.equals(normalizeAddress(collection)));

      if (status) {
        query = query.where((l: any) => l.status.equals(status));
      }

      const results = await query
        .orderBy((l: any) => l.createdAt, "desc")
        .limit(limit)
        .execute();

      return { success: true, data: results };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Find by collection failed')
      };
    }
  }

  /**
   * Get listings by maker
   */
  async findByMaker(
    maker: Address,
    status?: ListingStatus,
    limit: number = 100
  ): Promise<Result<Listing[]>> {
    try {
      let query = this.db
        .select()
        .from(schema.listing)
        .where((l: any) => l.maker.equals(normalizeAddress(maker)));

      if (status) {
        query = query.where((l: any) => l.status.equals(status));
      }

      const results = await query
        .orderBy((l: any) => l.createdAt, "desc")
        .limit(limit)
        .execute();

      return { success: true, data: results };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Find by maker failed')
      };
    }
  }

  /**
   * Get listings by token
   */
  async findByToken(
    collection: Address,
    tokenId: string,
    status?: ListingStatus
  ): Promise<Result<Listing[]>> {
    try {
      let query = this.db
        .select()
        .from(schema.listing)
        .where((l: any) =>
          l.collection.equals(normalizeAddress(collection)) &&
          l.tokenId.equals(tokenId)
        );

      if (status) {
        query = query.where((l: any) => l.status.equals(status));
      }

      const results = await query
        .orderBy((l: any) => l.createdAt, "desc")
        .execute();

      return { success: true, data: results };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Find by token failed')
      };
    }
  }

  /**
   * Expire old listings
   */
  async expireOldListings(currentTimestamp: bigint): Promise<Result<number>> {
    try {
      const expiredListings = await this.db
        .select()
        .from(schema.listing)
        .where((l: any) =>
          l.status.equals(ListingStatus.ACTIVE) &&
          l.expiresAt.lte(currentTimestamp)
        )
        .execute();

      // Update each expired listing
      for (const listing of expiredListings) {
        await this.updateStatus(listing.id, ListingStatus.EXPIRED, currentTimestamp);
      }

      return { success: true, data: expiredListings.length };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Expire old listings failed')
      };
    }
  }
}
