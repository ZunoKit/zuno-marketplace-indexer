/**
 * Ponder-specific Types
 * Type definitions for Ponder event handlers
 */

import type { Address, BlockNumber, Hash, Timestamp } from "./index";

// ============================================================================
// Ponder Context Types
// ============================================================================

export interface PonderBlock {
  number: BlockNumber;
  timestamp: Timestamp;
  hash: Hash;
}

export interface PonderTransaction {
  hash: Hash;
  from: Address;
  to: Address | null;
  value?: bigint;
  gas?: bigint;
  gasPrice?: bigint;
  transactionIndex: number;
}

export interface PonderLog {
  address: Address;
  logIndex: number;
  topics: string[];
}

export interface PonderEvent<TArgs = Record<string, any>> {
  name: string;
  args: TArgs;
  block: PonderBlock;
  transaction: PonderTransaction;
  log: PonderLog;
}

export interface PonderNetwork {
  chainId: number;
  name: string;
}

export interface PonderDB {
  insert(table: any): {
    values(data: any): Promise<void>;
  };
  update(table: any, where: any): {
    set(data: any): Promise<void>;
  };
  delete(table: any): {
    where(condition: any): Promise<void>;
  };
  select(): {
    from(table: any): {
      where?(condition: any): any;
      limit?(limit: number): any;
      offset?(offset: number): any;
      execute(): Promise<any[]>;
    };
  };
}

export interface PonderContext {
  db: PonderDB;
  network: PonderNetwork;
  client: any;
  contracts: Record<string, any>;
}

/**
 * Ponder event handler type
 */
export interface PonderEventHandler<TArgs = Record<string, any>> {
  (params: { event: PonderEvent<TArgs>; context: PonderContext }): Promise<void>;
}
