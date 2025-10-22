/**
 * Event Repository
 *
 * Core repository for event sourcing pattern.
 * Handles all event storage and querying with JSON data support.
 *
 * @module repositories/event
 */

import * as schema from "ponder:schema";
import type { Address, Result, Timestamp } from "@/shared/types";
import { normalizeAddress } from "@/shared/utils/helpers";
import {
  BaseRepository,
  type DatabaseContext,
  type BaseEntity,
} from "@/shared/base/base.repository";

// ============================================================================
// Types & Interfaces
// ============================================================================

/**
 * Event categories for classification
 */
export type EventCategory =
  | "auction"
  | "offer"
  | "trade"
  | "mint"
  | "collection"
  | "listing";

/**
 * Event entity matching schema
 */
export interface EventEntity extends BaseEntity {
  id: string;
  eventType: string;
  category: EventCategory;
  actor: Address;
  counterparty?: Address;
  collection?: Address;
  tokenId?: string;
  data: EventData; // JSONB object (not string!)
  contractAddress: Address;
  contractName?: string;
  blockNumber: bigint;
  blockTimestamp: bigint;
  transactionHash: `0x${string}`;
  logIndex: number;
  chainId: number;
  processedAt: bigint;
  version: string;
}

/**
 * Event data type - flexible JSON structure
 */
export type EventData = Record<string, any>;

/**
 * Query filters for events
 */
export interface EventFilters {
  eventType?: string;
  category?: EventCategory;
  actor?: Address;
  collection?: Address;
  tokenId?: string;
  fromTimestamp?: bigint;
  toTimestamp?: bigint;
  chainId?: number;
}

// ============================================================================
// Event Repository
// ============================================================================

export class EventRepository extends BaseRepository<EventEntity> {
  constructor(context: DatabaseContext) {
    super(context, "event");
  }

  protected getTable() {
    return schema.event;
  }

  /**
   * Create event from blockchain event
   *
   * @param params Event creation parameters
   * @returns Result with created event
   *
   * @example
   * ```typescript
   * await eventRepo.createEvent({
   *   eventType: "auction_created",
   *   category: "auction",
   *   actor: seller,
   *   data: {
   *     auctionId: "0x123...",
   *     auctionType: "english",
   *     startPrice: "1000000000000000000",
   *     reservePrice: "2000000000000000000"
   *   },
   *   event: blockchainEvent,
   *   context: ponderContext
   * });
   * ```
   */
  async createEvent(params: {
    eventType: string;
    category: EventCategory;
    actor: Address;
    counterparty?: Address;
    collection?: Address;
    tokenId?: string;
    data: EventData;
    contractName?: string;
    event: any; // Ponder event object
  }): Promise<Result<EventEntity>> {
    try {
      const {
        eventType,
        category,
        actor,
        counterparty,
        collection,
        tokenId,
        data,
        contractName,
        event,
      } = params;

      const eventEntity: Partial<EventEntity> = {
        id: `${event.transaction.hash}:${event.log.logIndex}`,
        eventType,
        category,
        actor: normalizeAddress(actor),
        counterparty: counterparty ? normalizeAddress(counterparty) : undefined,
        collection: collection ? normalizeAddress(collection) : undefined,
        tokenId,
        data: data, // JSONB - store as object directly!
        contractAddress: normalizeAddress(event.log.address),
        contractName,
        blockNumber: event.block.number,
        blockTimestamp: event.block.timestamp,
        transactionHash: event.transaction.hash,
        logIndex: event.log.logIndex,
        chainId: this.chainId,
        processedAt: BigInt(Math.floor(Date.now() / 1000)),
        version: "3.0",
      };

      return await this.create(eventEntity);
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error : new Error("Create event failed"),
      };
    }
  }

  /**
   * Query events with filters
   *
   * @param filters Event filters
   * @param options Query options (limit, offset, orderBy)
   * @returns Result with filtered events
   *
   * @example
   * ```typescript
   * // Get all auction events for a user
   * const result = await eventRepo.queryEvents({
   *   category: "auction",
   *   actor: "0x123...",
   *   fromTimestamp: startTime
   * }, { limit: 50 });
   * ```
   */
  async queryEvents(
    filters: EventFilters,
    options?: {
      limit?: number;
      offset?: number;
      orderBy?: "asc" | "desc";
    }
  ): Promise<Result<EventEntity[]>> {
    try {
      let query = this.db.select().from(schema.event);

      // Apply filters
      if (filters.eventType) {
        query = query.where((e: any) => e.eventType.equals(filters.eventType));
      }
      if (filters.category) {
        query = query.where((e: any) => e.category.equals(filters.category));
      }
      if (filters.actor) {
        query = query.where((e: any) =>
          e.actor.equals(normalizeAddress(filters.actor!))
        );
      }
      if (filters.collection) {
        query = query.where((e: any) =>
          e.collection.equals(normalizeAddress(filters.collection!))
        );
      }
      if (filters.tokenId) {
        query = query.where((e: any) => e.tokenId.equals(filters.tokenId));
      }
      if (filters.fromTimestamp) {
        query = query.where((e: any) =>
          e.blockTimestamp.gte(filters.fromTimestamp)
        );
      }
      if (filters.toTimestamp) {
        query = query.where((e: any) =>
          e.blockTimestamp.lte(filters.toTimestamp)
        );
      }
      if (filters.chainId) {
        query = query.where((e: any) => e.chainId.equals(filters.chainId));
      }

      // Apply ordering
      if (options?.orderBy) {
        query = query.orderBy((e: any) => e.blockTimestamp, options.orderBy);
      } else {
        query = query.orderBy((e: any) => e.blockTimestamp, "desc");
      }

      // Apply pagination
      if (options?.limit) {
        query = query.limit(options.limit);
      }
      if (options?.offset) {
        query = query.offset(options.offset);
      }

      const results = await query.execute();
      return { success: true, data: results };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error : new Error("Query events failed"),
      };
    }
  }

  /**
   * Get latest event of specific type
   *
   * @param eventType Event type to find
   * @param additionalFilters Additional filters
   * @returns Result with latest event or null
   *
   * @example
   * ```typescript
   * // Get latest bid for an auction
   * const latestBid = await eventRepo.getLatestEvent("bid_placed", {
   *   collection: auctionCollection,
   *   tokenId: auctionTokenId
   * });
   * ```
   */
  async getLatestEvent(
    eventType: string,
    additionalFilters?: Partial<EventFilters>
  ): Promise<Result<EventEntity | null>> {
    const filters: EventFilters = {
      eventType,
      ...additionalFilters,
    };

    const result = await this.queryEvents(filters, {
      limit: 1,
      orderBy: "desc",
    });

    if (!result.success) {
      return result;
    }

    return {
      success: true,
      data: result.data.length > 0 ? result.data[0]! : null,
    };
  }

  /**
   * Get typed event data
   *
   * Since data is JSONB, it's already an object - no parsing needed!
   *
   * @param event Event entity
   * @returns Typed event data object
   */
  getEventData<T = EventData>(event: EventEntity): T {
    return event.data as T;
  }

  /**
   * Query events by JSON field values
   *
   * JSONB allows querying into the JSON structure!
   *
   * @param jsonPath JSON path to query (e.g., "auctionId", "bidAmount")
   * @param value Value to match
   * @param filters Additional filters
   * @returns Result with matching events
   *
   * @example
   * ```typescript
   * // Find all events for specific auction
   * const auctionEvents = await eventRepo.queryByJsonField(
   *   "auctionId",
   *   "0x123...",
   *   { category: "auction" }
   * );
   * ```
   */
  async queryByJsonField(
    jsonPath: string,
    value: any,
    filters?: Partial<EventFilters>
  ): Promise<Result<EventEntity[]>> {
    try {
      // Note: Actual JSONB query implementation depends on Ponder's query builder
      // This is a simplified version - may need adjustment based on Ponder's SQL builder
      let query = this.db.select().from(schema.event);

      // Apply base filters first
      if (filters) {
        if (filters.eventType) {
          query = query.where((e: any) =>
            e.eventType.equals(filters.eventType)
          );
        }
        if (filters.category) {
          query = query.where((e: any) => e.category.equals(filters.category));
        }
        if (filters.actor) {
          query = query.where((e: any) =>
            e.actor.equals(normalizeAddress(filters.actor!))
          );
        }
      }

      const results = await query.execute();

      // Filter by JSON field in memory (fallback if JSONB query not supported)
      const filtered = results.filter((event: any) => {
        const data = event.data;
        return data && data[jsonPath] === value;
      });

      return { success: true, data: filtered };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error
            : new Error("Query by JSON field failed"),
      };
    }
  }

  /**
   * Get event count by type
   *
   * @param eventType Event type to count
   * @param filters Additional filters
   * @returns Result with count
   */
  async countByType(
    eventType: string,
    filters?: Partial<EventFilters>
  ): Promise<Result<number>> {
    const result = await this.queryEvents({ eventType, ...filters });

    if (!result.success) {
      return result;
    }

    return { success: true, data: result.data.length };
  }

  /**
   * Get user activity timeline
   *
   * @param userAddress User address
   * @param limit Max events to return
   * @returns Result with user events
   *
   * @example
   * ```typescript
   * const timeline = await eventRepo.getUserTimeline("0x123...", 100);
   * ```
   */
  async getUserTimeline(
    userAddress: Address,
    limit: number = 50
  ): Promise<Result<EventEntity[]>> {
    return await this.queryEvents(
      { actor: userAddress },
      { limit, orderBy: "desc" }
    );
  }

  /**
   * Get collection activity
   *
   * @param collectionAddress Collection address
   * @param limit Max events to return
   * @returns Result with collection events
   *
   * @example
   * ```typescript
   * const activity = await eventRepo.getCollectionActivity("0xabc...", 100);
   * ```
   */
  async getCollectionActivity(
    collectionAddress: Address,
    limit: number = 50
  ): Promise<Result<EventEntity[]>> {
    return await this.queryEvents(
      { collection: collectionAddress },
      { limit, orderBy: "desc" }
    );
  }

  /**
   * Check if event exists
   *
   * @param txHash Transaction hash
   * @param logIndex Log index
   * @returns Result with boolean
   */
  async eventExists(
    txHash: `0x${string}`,
    logIndex: number
  ): Promise<Result<boolean>> {
    const id = `${txHash}:${logIndex}`;
    return await this.exists(id);
  }
}
