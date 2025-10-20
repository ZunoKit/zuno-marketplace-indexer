/**
 * API Response Types
 * Type definitions for external API responses
 */

export interface NetworkResponse {
  id: string;
  name: string;
  chainId: number;
  rpcUrl: string;
  blockExplorerUrl?: string;
  startBlock?: number;
}

export interface ContractResponse {
  id: string;
  name: string;
  network: string;
  address: `0x${string}`;
  abiName: string;
  startBlock: number;
  maxBlockRange?: number;
}

export interface ABIResponse {
  id: string;
  name: string;
  abi: readonly unknown[];
  version?: string;
}

export interface APIConfig {
  networks: NetworkResponse[];
  contracts: ContractResponse[];
  abis: ABIResponse[];
}

export interface APIError {
  code: string;
  message: string;
  details?: unknown;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
  timestamp: number;
}
