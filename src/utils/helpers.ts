/**
 * Utility Helper Functions
 */

import { logger } from "./logger";

/**
 * Retry async function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    delay?: number;
    backoffMultiplier?: number;
    onRetry?: (attempt: number, error: unknown) => void;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    delay = 1000,
    backoffMultiplier = 2,
    onRetry,
  } = options;

  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === maxRetries) {
        break;
      }

      const waitTime = delay * Math.pow(backoffMultiplier, attempt - 1);

      if (onRetry) {
        onRetry(attempt, error);
      } else {
        logger.warn(`Retry attempt ${attempt}/${maxRetries}`, {
          waitTime,
          error: error instanceof Error ? error.message : String(error),
        });
      }

      await sleep(waitTime);
    }
  }

  throw lastError;
}

/**
 * Sleep for specified milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Validate Ethereum address
 */
export function isValidAddress(address: string): address is `0x${string}` {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Format large numbers with separators
 */
export function formatNumber(num: bigint | number): string {
  return num.toLocaleString("en-US");
}

/**
 * Safe JSON parse with fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Chunk array into smaller arrays
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Remove undefined/null values from object
 */
export function compact<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== undefined && value !== null
    )
  ) as Partial<T>;
}

/**
 * Create unique ID from multiple parts
 */
export function createId(...parts: (string | number | bigint)[]): string {
  return parts.map(String).join("-");
}

/**
 * Get environment variable with type safety
 */
export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
}

/**
 * Get numeric environment variable
 */
export function getEnvNumber(key: string, defaultValue?: number): number {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is not defined`);
  }
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error(
      `Environment variable ${key} is not a valid number: ${value}`
    );
  }
  return num;
}

/**
 * Get boolean environment variable
 */
export function getEnvBoolean(key: string, defaultValue?: boolean): boolean {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value === "true" || value === "1";
}
