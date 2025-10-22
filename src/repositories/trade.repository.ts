/**
 * Trade Repository
 * Handles all database operations for marketplace trades
 */

import * as schema from "ponder:schema";
import type { Address, Result } from "@/shared/types";

export interface TradeEntity {
  id: string;
  maker: Address;
  taker: Address;
  collection: Address;
  tokenId: string;
  tokenType: string;
  amount: string;
  price: string;
  paymentToken: Address;
  makerFee: string;
  takerFee: string;
  royaltyFee: string;
  royaltyRecipient: Address | null;
  tradeType: string;
  sourceEventId: string | null;
  blockNumber: bigint;
  blockTimestamp: bigint;
  transactionHash: `0x${string}`;
  logIndex: number;
  chainId: number;
}
import { normalizeAddress } from "@/shared/utils/helpers";
import {
  BaseRepository,
  type DatabaseContext,
} from "@/shared/base/base.repository";

export class TradeRepository extends BaseRepository<TradeEntity> {
  constructor(context: DatabaseContext) {
    super(context, "trade");
  }

  protected getTable() {
    return schema.trade;
  }

  /**
   * Create trade record
   */
  async createTrade(
    trade: Omit<TradeEntity, "id">
  ): Promise<Result<TradeEntity>> {
    try {
      // Generate trade ID from tx hash and log index
      const id = `${trade.transactionHash}:${trade.logIndex}`;

      const normalizedTrade: Partial<TradeEntity> = {
        id,
        maker: normalizeAddress(trade.maker),
        taker: normalizeAddress(trade.taker),
        collection: normalizeAddress(trade.collection),
        tokenId: trade.tokenId,
        tokenType: trade.tokenType,
        amount: trade.amount,
        price: trade.price,
        paymentToken: normalizeAddress(trade.paymentToken),
        makerFee: trade.makerFee,
        takerFee: trade.takerFee,
        royaltyFee: trade.royaltyFee,
        royaltyRecipient: trade.royaltyRecipient
          ? normalizeAddress(trade.royaltyRecipient)
          : null,
        tradeType: trade.tradeType,
        sourceEventId: trade.sourceEventId,
        blockNumber: trade.blockNumber,
        blockTimestamp: trade.blockTimestamp,
        transactionHash: trade.transactionHash,
        logIndex: trade.logIndex,
        chainId: trade.chainId,
      };

      return this.create(normalizedTrade);
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error : new Error("Create trade failed"),
      };
    }
  }

  /**
   * Get trades by collection
   */
  async findByCollection(
    collection: Address,
    limit: number = 100
  ): Promise<Result<TradeEntity[]>> {
    try {
      const results = await this.db
        .select()
        .from(schema.trade)
        .where((t: any) => t.collection.equals(normalizeAddress(collection)))
        .orderBy((t: any) => t.blockTimestamp, "desc")
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

  /**
   * Get trades by maker
   */
  async findByMaker(
    maker: Address,
    limit: number = 100
  ): Promise<Result<TradeEntity[]>> {
    try {
      const results = await this.db
        .select()
        .from(schema.trade)
        .where((t: any) => t.maker.equals(normalizeAddress(maker)))
        .orderBy((t: any) => t.blockTimestamp, "desc")
        .limit(limit)
        .execute();

      return { success: true, data: results };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error : new Error("Find by maker failed"),
      };
    }
  }

  /**
   * Get trades by taker
   */
  async findByTaker(
    taker: Address,
    limit: number = 100
  ): Promise<Result<TradeEntity[]>> {
    try {
      const results = await this.db
        .select()
        .from(schema.trade)
        .where((t: any) => t.taker.equals(normalizeAddress(taker)))
        .orderBy((t: any) => t.blockTimestamp, "desc")
        .limit(limit)
        .execute();

      return { success: true, data: results };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error : new Error("Find by taker failed"),
      };
    }
  }

  /**
   * Get trades by token
   */
  async findByToken(
    collection: Address,
    tokenId: string,
    limit: number = 100
  ): Promise<Result<TradeEntity[]>> {
    try {
      const results = await this.db
        .select()
        .from(schema.trade)
        .where(
          (t: any) =>
            t.collection.equals(normalizeAddress(collection)) &&
            t.tokenId.equals(tokenId)
        )
        .orderBy((t: any) => t.blockTimestamp, "desc")
        .limit(limit)
        .execute();

      return { success: true, data: results };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error : new Error("Find by token failed"),
      };
    }
  }

  /**
   * Calculate total volume for a collection
   */
  async getTotalVolumeByCollection(
    collection: Address
  ): Promise<Result<bigint>> {
    try {
      const trades = await this.findByCollection(collection, 10000); // Large limit

      if (!trades.success) {
        return trades;
      }

      const totalVolume = trades.data.reduce((sum, trade) => {
        return sum + BigInt(trade.price);
      }, BigInt(0));

      return { success: true, data: totalVolume };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error : new Error("Get total volume failed"),
      };
    }
  }

  /**
   * Get recent trades across all collections
   */
  async getRecentTrades(
    limit: number = 20,
    chainId?: number
  ): Promise<Result<TradeEntity[]>> {
    try {
      let query = this.db.select().from(schema.trade);

      if (chainId) {
        query = query.where((t: any) => t.chainId.equals(chainId));
      }

      const results = await query
        .orderBy((t: any) => t.blockTimestamp, "desc")
        .limit(limit)
        .execute();

      return { success: true, data: results };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error
            : new Error("Get recent trades failed"),
      };
    }
  }
}
