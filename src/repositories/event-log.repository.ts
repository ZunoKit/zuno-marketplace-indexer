/**
 * Event Log Repository
 * Handles storage and retrieval of raw blockchain events
 */

import * as schema from "ponder:schema";
import type { Address, EventLog, Result } from "../shared/types";
import { normalizeAddress } from "../shared/utils/helpers";
import { BaseRepository, type DatabaseContext } from "../shared/base/base.repository";

export class EventLogRepository extends BaseRepository<EventLog> {
  constructor(context: DatabaseContext) {
    super(context, "event_log");
  }

  protected getTable() {
    return schema.eventLog;
  }

  /**
   * Create event log from blockchain event
   */
  async createFromEvent(
    eventName: string,
    contractAddress: Address,
    contractName: string | null,
    eventData: any,
    event: {
      block: { number: bigint; timestamp: bigint };
      transaction: { hash: `0x${string}`; from: Address; to: Address | null; index: number };
      log: { index: number };
    }
  ): Promise<Result<EventLog>> {
    try {
      const id = `${event.transaction.hash}:${event.log.index}`;

      const eventLog: Partial<EventLog> = {
        id,
        eventName,
        contractAddress: normalizeAddress(contractAddress),
        contractName,
        eventData: JSON.stringify(eventData),
        blockNumber: event.block.number,
        blockTimestamp: event.block.timestamp,
        transactionHash: event.transaction.hash,
        transactionIndex: event.transaction.index,
        logIndex: event.log.index,
        chainId: this.chainId,
        from: normalizeAddress(event.transaction.from),
        to: event.transaction.to ? normalizeAddress(event.transaction.to) : null,
        gasUsed: null, // Will be updated if available
        processed: true,
        processingError: null,
      };

      return this.create(eventLog);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Create event log failed')
      };
    }
  }

  /**
   * Mark event as failed with error
   */
  async markAsFailed(eventId: string, error: string): Promise<Result<boolean>> {
    try {
      await this.db
        .update(schema.eventLog, { id: eventId })
        .set({
          processed: false,
          processingError: error,
        });

      return { success: true, data: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err : new Error('Mark as failed failed')
      };
    }
  }

  /**
   * Get failed events for retry
   */
  async getFailedEvents(limit: number = 100): Promise<Result<EventLog[]>> {
    try {
      const results = await this.db
        .select()
        .from(schema.eventLog)
        .where((e: any) => e.processed.equals(false))
        .orderBy((e: any) => e.blockNumber, "asc")
        .limit(limit)
        .execute();

      return { success: true, data: results };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Get failed events failed')
      };
    }
  }

  /**
   * Get events by contract
   */
  async findByContract(
    contractAddress: Address,
    limit: number = 100
  ): Promise<Result<EventLog[]>> {
    try {
      const results = await this.db
        .select()
        .from(schema.eventLog)
        .where((e: any) => e.contractAddress.equals(normalizeAddress(contractAddress)))
        .orderBy((e: any) => e.blockNumber, "desc")
        .limit(limit)
        .execute();

      return { success: true, data: results };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Find by contract failed')
      };
    }
  }

  /**
   * Get events by name
   */
  async findByEventName(eventName: string, limit: number = 100): Promise<Result<EventLog[]>> {
    try {
      const results = await this.db
        .select()
        .from(schema.eventLog)
        .where((e: any) => e.eventName.equals(eventName))
        .orderBy((e: any) => e.blockNumber, "desc")
        .limit(limit)
        .execute();

      return { success: true, data: results };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Find by event name failed')
      };
    }
  }

  /**
   * Get events by block range
   */
  async findByBlockRange(
    startBlock: bigint,
    endBlock: bigint
  ): Promise<Result<EventLog[]>> {
    try {
      const results = await this.db
        .select()
        .from(schema.eventLog)
        .where((e: any) =>
          e.blockNumber.gte(startBlock) &&
          e.blockNumber.lte(endBlock)
        )
        .orderBy((e: any) => e.blockNumber, "asc")
        .execute();

      return { success: true, data: results };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Find by block range failed')
      };
    }
  }
}
