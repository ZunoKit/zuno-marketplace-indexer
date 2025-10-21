/**
 * Core Utility Functions
 * Pure functions without external dependencies
 */

import type { Address, Hash } from "../types/blockchain";

// ============================================================================
// ID Generation
// ============================================================================

/**
 * Generate unique ID from parts
 */
export function generateId(...parts: (string | number | bigint)[]): string {
  return parts.map(p => String(p)).join(':');
}

/**
 * Generate collection ID
 */
export function generateCollectionId(chainId: number, address: Address): string {
  return generateId(chainId, address.toLowerCase());
}

/**
 * Generate token ID
 */
export function generateTokenId(chainId: number, collection: Address, tokenId: string): string {
  return generateId(chainId, collection.toLowerCase(), tokenId);
}

/**
 * Generate trade ID
 */
export function generateTradeId(txHash: Hash, logIndex: number): string {
  return generateId(txHash, logIndex);
}

/**
 * Generate event log ID
 */
export function generateEventLogId(txHash: Hash, logIndex: number): string {
  return generateId(txHash, logIndex);
}

/**
 * Generate transaction ID
 */
export function generateTransactionId(chainId: number, txHash: Hash): string {
  return generateId(chainId, txHash);
}

// ============================================================================
// Address Utilities
// ============================================================================

/**
 * Normalize address to lowercase
 */
export function normalizeAddress(address: string): Address {
  return address.toLowerCase() as Address;
}

/**
 * Check if address is zero address
 */
export function isZeroAddress(address: string): boolean {
  return address.toLowerCase() === '0x0000000000000000000000000000000000000000';
}

/**
 * Get zero address
 */
export function getZeroAddress(): Address {
  return '0x0000000000000000000000000000000000000000';
}

// ============================================================================
// BigInt Conversions
// ============================================================================

/**
 * Safe bigint to string conversion
 */
export function bigintToString(value: bigint | undefined | null): string {
  if (value === undefined || value === null) return "0";
  return value.toString();
}

/**
 * Safe string to bigint conversion
 */
export function stringToBigint(value: string | undefined | null): bigint {
  if (!value || value === "0") return BigInt(0);
  try {
    return BigInt(value);
  } catch {
    return BigInt(0);
  }
}

// ============================================================================
// Fee Calculations
// ============================================================================

/**
 * Calculate fee from price and basis points
 */
export function calculateFee(price: bigint, basisPoints: number): bigint {
  return (price * BigInt(basisPoints)) / BigInt(10000);
}

/**
 * Calculate percentage
 */
export function calculatePercentage(part: bigint, total: bigint): number {
  if (total === BigInt(0)) return 0;
  return Number((part * BigInt(10000)) / total) / 100;
}

// ============================================================================
// Date Utilities
// ============================================================================

/**
 * Get current date string in YYYY-MM-DD format
 */
export function getCurrentDate(timestamp: bigint): string {
  const date = new Date(Number(timestamp) * 1000);
  const isoString = date.toISOString();
  const datePart = isoString.split('T')[0];
  
  if (!datePart) {
    throw new Error('Failed to extract date from ISO string');
  }
  
  return datePart;
}

/**
 * Format timestamp to ISO string
 */
export function formatTimestamp(timestamp: bigint): string {
  return new Date(Number(timestamp) * 1000).toISOString();
}

/**
 * Get unix timestamp
 */
export function getUnixTimestamp(date: Date = new Date()): bigint {
  return BigInt(Math.floor(date.getTime() / 1000));
}

// ============================================================================
// String Utilities
// ============================================================================

/**
 * Sanitize config key (remove special characters)
 */
export function sanitizeConfigKey(key: string): string {
  if (!key || typeof key !== 'string') {
    throw new Error('Invalid config key: must be a non-empty string');
  }
  
  return key
    .replace(/[^a-zA-Z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .toLowerCase();
}

/**
 * Truncate string with ellipsis
 */
export function truncateString(str: string, length: number = 20): string {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
}

/**
 * Truncate address for display
 */
export function truncateAddress(address: Address, prefixLength: number = 6, suffixLength: number = 4): string {
  if (address.length <= prefixLength + suffixLength + 2) return address;
  return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`;
}

// ============================================================================
// Array Utilities
// ============================================================================

/**
 * Chunk array into smaller arrays
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Remove duplicates from array
 */
export function uniqueArray<T>(array: T[]): T[] {
  return [...new Set(array)];
}

// ============================================================================
// Validation
// ============================================================================

/**
 * Validate Ethereum address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate transaction hash
 */
export function isValidHash(hash: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
}

/**
 * Validate chain ID
 */
export function isValidChainId(chainId: number): boolean {
  return Number.isInteger(chainId) && chainId > 0;
}

// ============================================================================
// Error Handling
// ============================================================================

/**
 * Create error with context
 */
export function createError(message: string, context?: Record<string, any>): Error {
  const error = new Error(message);
  if (context) {
    Object.assign(error, context);
  }
  return error;
}

/**
 * Safe JSON parse
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

/**
 * Safe JSON stringify
 */
export function safeJsonStringify(obj: any, fallback: string = '{}'): string {
  try {
    return JSON.stringify(obj);
  } catch {
    return fallback;
  }
}

