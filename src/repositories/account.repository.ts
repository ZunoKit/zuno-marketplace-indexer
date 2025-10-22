/**
 * Account Repository
 * Handles all database operations for user accounts
 */

import * as schema from "ponder:schema";
import type { Address, Result, Timestamp } from "@/shared/types";
import { normalizeAddress } from "@/shared/utils/helpers";
import { BaseRepository, type DatabaseContext, type BaseEntity } from "@/shared/base/base.repository";

// Extend Account to include BaseEntity fields
export interface AccountEntity extends BaseEntity {
  address: Address;
  totalTrades: number;
  totalVolume: string;
  makerTrades: number;
  takerTrades: number;
  nftsMinted: number;
  nftsOwned: number;
  collectionsCreated: number;
  totalFeesEarned: string;
  totalFeesPaid: string;
  firstSeenAt: Timestamp;
  lastActiveAt: Timestamp;
}

export class AccountRepository extends BaseRepository<AccountEntity> {
  constructor(context: DatabaseContext) {
    super(context, "account");
  }

  protected getTable() {
    return schema.account;
  }

  /**
   * Get or create account
   */
  async getOrCreate(address: Address, timestamp: Timestamp): Promise<Result<AccountEntity>> {
    const normalized = normalizeAddress(address);
    const existingResult = await this.findByAddress(normalized);

    if (!existingResult.success) {
      return existingResult;
    }

    if (existingResult.data) {
      return { success: true, data: existingResult.data };
    }

    // Create new account
    const newAccount: Partial<AccountEntity> = {
      address: normalized,
      totalTrades: 0,
      totalVolume: "0",
      makerTrades: 0,
      takerTrades: 0,
      nftsMinted: 0,
      nftsOwned: 0,
      collectionsCreated: 0,
      totalFeesEarned: "0",
      totalFeesPaid: "0",
      firstSeenAt: timestamp,
      lastActiveAt: timestamp,
    };

    return this.create(newAccount);
  }

  /**
   * Update account activity timestamp
   */
  async updateActivity(address: Address, timestamp: Timestamp): Promise<Result<boolean>> {
    try {
      const normalized = normalizeAddress(address);
      await this.db
        .update(schema.account, { address: normalized })
        .set({ lastActiveAt: timestamp });

      return { success: true, data: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Update activity failed')
      };
    }
  }

  /**
   * Increment trade statistics
   */
  async incrementTrades(
    address: Address,
    isMaker: boolean,
    volume: bigint
  ): Promise<Result<boolean>> {
    try {
      const normalized = normalizeAddress(address);
      const accountResult = await this.findByAddress(normalized);

      if (!accountResult.success || !accountResult.data) {
        return {
          success: false,
          error: new Error('Account not found')
        };
      }

      const account = accountResult.data;
      const currentVolume = BigInt(account.totalVolume);
      const newVolume = currentVolume + volume;

      await this.db
        .update(schema.account, { address: normalized })
        .set({
          totalTrades: account.totalTrades + 1,
          totalVolume: newVolume.toString(),
          makerTrades: isMaker ? account.makerTrades + 1 : account.makerTrades,
          takerTrades: !isMaker ? account.takerTrades + 1 : account.takerTrades,
        });

      return { success: true, data: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Increment trades failed')
      };
    }
  }

  /**
   * Increment NFT mint count
   */
  async incrementMints(address: Address, count: number = 1): Promise<Result<boolean>> {
    try {
      const normalized = normalizeAddress(address);
      const accountResult = await this.findByAddress(normalized);


      if (!accountResult.success || !accountResult.data) {
        return {
          success: false,
          error: new Error('Account not found')
        };
      }

      const account = accountResult.data;

      await this.db
        .update(schema.account, { address: normalized })
        .set({
          nftsMinted: account.nftsMinted + count,
          nftsOwned: account.nftsOwned + count,
        });

      return { success: true, data: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Increment NFTs minted failed')
      };
    }
  }

  /**
   * Update NFTs owned count
   */
  async updateNftsOwned(address: Address, delta: number): Promise<Result<boolean>> {
    try {
      const normalized = normalizeAddress(address);
      const accountResult = await this.findByAddress(normalized);

      if (!accountResult.success || !accountResult.data) {
        return {
          success: false,
          error: new Error('Account not found')
        };
      }

      const account = accountResult.data;
      const newCount = Math.max(0, account.nftsOwned + delta);

      await this.db
        .update(schema.account, { address: normalized })
        .set({
          nftsOwned: newCount,
        });

      return { success: true, data: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Update NFTs owned failed')
      };
    }
  }

  /**
   * Increment collections created
   */
  async incrementCollectionsCreated(address: Address): Promise<Result<boolean>> {
    try {
      const normalized = normalizeAddress(address);
      const accountResult = await this.findByAddress(normalized);

      if (!accountResult.success || !accountResult.data) {
        return {
          success: false,
          error: new Error('Account not found')
        };
      }

      const account = accountResult.data;

      await this.db
        .update(schema.account, { address: normalized })
        .set({
          collectionsCreated: account.collectionsCreated + 1,
        });

      return { success: true, data: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Increment collections created failed')
      };
    }
  }

  /**
   * Get top traders by volume
   */
  async getTopTraders(limit: number = 10): Promise<Result<AccountEntity[]>> {
    try {
      const results = await this.db
        .select()
        .from(schema.account)
        .orderBy((a: any) => a.totalVolume, "desc")
        .limit(limit)
        .execute();

      return { success: true, data: results };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Get top traders failed')
      };
    }
  }
}

