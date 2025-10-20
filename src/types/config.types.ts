/**
 * Ponder Configuration Types
 * Type-safe configuration for Ponder indexer
 */

import type {
  NetworkResponse,
  ContractResponse,
  ABIResponse,
} from "./api.types";

export interface PonderNetwork {
  chainId: number;
  transport: unknown;
}

export interface PonderContract {
  abi: readonly unknown[];
  network: string;
  address: `0x${string}`;
  startBlock: number;
  maxBlockRange?: number;
}

export interface PonderConfig {
  networks: Record<string, PonderNetwork>;
  contracts: Record<string, PonderContract>;
}

export interface GeneratedConfig {
  config: PonderConfig;
  imports: string[];
  timestamp: number;
}

export interface ConfigValidationError {
  field: string;
  message: string;
  value?: unknown;
}

export interface ConfigValidationResult {
  valid: boolean;
  errors: ConfigValidationError[];
}

export interface CachedConfig {
  networks: NetworkResponse[];
  contracts: ContractResponse[];
  abis: ABIResponse[];
  cachedAt: number;
  expiresAt: number;
}
