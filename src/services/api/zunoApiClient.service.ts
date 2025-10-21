/**
 * Zuno API Client Service
 *
 * Enterprise-grade HTTP client for Zuno Marketplace ABIs API
 * Features: Singleton pattern, caching, error handling, type safety
 */

import type {
  AbiItem,
  ApiAbiDetail,
  ApiContract,
  ApiNetwork,
  PaginatedResult,
  Result,
} from "../../core/types";

// ============================================================================
// API Response Types
// ============================================================================

interface BaseApiResponse {
  success: boolean;
  meta: {
    timestamp: string;
    version: string;
  };
}

interface PaginatedApiResponse<T> extends BaseApiResponse {
  data: {
    data: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

interface SingleApiResponse<T> extends BaseApiResponse {
  data: T;
}

// ============================================================================
// Configuration Types
// ============================================================================

interface ApiClientConfig {
  baseUrl: string;
  apiKey: string;
  cacheTTL: number;
  timeout: number;
}

export class ZunoApiClientService {
  private static instance: ZunoApiClientService;
  private readonly config: ApiClientConfig;
  private readonly cache = new Map<
    string,
    { data: unknown; timestamp: number }
  >();

  private constructor(config?: Partial<ApiClientConfig>) {
    this.config = {
      baseUrl:
        process.env.ZUNO_API_URL ||
        "https://zuno-marketplace-abis.vercel.app/api",
      apiKey: process.env.ZUNO_API_KEY || "",
      cacheTTL: 5 * 60 * 1000, // 5 minutes
      timeout: 30000, // 30 seconds
      ...config,
    };

    if (!this.config.apiKey) {
      console.warn(
        "[ZunoApiClient] No API key provided. Some endpoints may fail."
      );
    }
  }

  /**
   * Get singleton instance
   */
  public static getInstance(
    config?: Partial<ApiClientConfig>
  ): ZunoApiClientService {
    if (!ZunoApiClientService.instance) {
      ZunoApiClientService.instance = new ZunoApiClientService(config);
    }
    return ZunoApiClientService.instance;
  }

  /**
   * Generic HTTP client with error handling and caching
   */
  private async fetchApi<T>(
    endpoint: string,
    options: {
      useCache?: boolean;
      timeout?: number;
    } = {}
  ): Promise<Result<T>> {
    const { useCache = true, timeout = this.config.timeout } = options;
    const cacheKey = endpoint;

    // Check cache first
    if (useCache) {
      const cached = this.getCachedData<T>(cacheKey);
      if (cached) {
        return { success: true, data: cached };
      }
    }

    const url = `${this.config.baseUrl}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await globalThis.fetch(url, {
        headers: this.buildHeaders(),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[ZunoApiClient] HTTP ${response.status}:`, errorText);

        return {
          success: false,
          error: new Error(`HTTP ${response.status}: ${response.statusText}`),
        };
      }

      const data = (await response.json()) as T;

      // Cache successful responses
      if (useCache) {
        this.setCachedData(cacheKey, data);
      }

      return { success: true, data };
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === "AbortError") {
        return {
          success: false,
          error: new Error(`Request timeout after ${timeout}ms`),
        };
      }

      console.error(`[ZunoApiClient] Request failed for ${endpoint}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error : new Error("Network error"),
      };
    }
  }

  // ============================================================================
  // Cache Management
  // ============================================================================

  private getCachedData<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > this.config.cacheTTL;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data as T;
  }

  private setCachedData(key: string, data: unknown): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  private buildHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": "zuno-marketplace-indexer/1.0.0",
    };

    if (this.config.apiKey) {
      headers["X-API-Key"] = this.config.apiKey;
    }

    return headers;
  }

  /**
   * Clear all cached data
   */
  public clearCache(): void {
    this.cache.clear();
    console.log("[ZunoApiClient] Cache cleared");
  }

  /**
   * Get cache statistics
   */
  public getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }

  // ============================================================================
  // Public API Methods
  // ============================================================================

  /**
   * Fetch all active networks
   */
  async getNetworks(): Promise<Result<ApiNetwork[]>> {
    const result = await this.fetchApi<PaginatedApiResponse<ApiNetwork>>(
      "/networks?all=true&isActive=true"
    );

    if (!result.success) {
      return result;
    }

    return { success: true, data: result.data.data.data };
  }

  /**
   * Fetch network by chain ID
   */
  async getNetworkByChainId(
    chainId: number
  ): Promise<Result<ApiNetwork | null>> {
    const result = await this.getNetworks();

    if (!result.success) {
      return result;
    }

    const network = result.data.find((n) => n.chainId === chainId) || null;
    return { success: true, data: network };
  }

  /**
   * Fetch contracts with pagination
   */
  async getContracts(
    page: number = 1,
    limit: number = 100
  ): Promise<Result<PaginatedResult<ApiContract>>> {
    const result = await this.fetchApi<PaginatedApiResponse<ApiContract>>(
      `/contracts?page=${page}&limit=${limit}`,
      { useCache: false } // Don't cache paginated results
    );

    if (!result.success) {
      return result;
    }

    return {
      success: true,
      data: {
        data: result.data.data.data,
        pagination: result.data.data.pagination,
      },
    };
  }

  /**
   * Fetch all contracts (all pages)
   */
  async getAllContracts(): Promise<Result<ApiContract[]>> {
    const allContracts: ApiContract[] = [];
    let page = 1;
    let hasNext = true;

    while (hasNext) {
      const result = await this.getContracts(page, 100);

      if (!result.success) {
        return result;
      }

      allContracts.push(...result.data.data);
      hasNext = result.data.pagination.hasNext ?? false;
      page++;
    }

    return { success: true, data: allContracts };
  }

  /**
   * Fetch contracts by network
   */
  async getContractsByNetwork(
    networkId: string
  ): Promise<Result<ApiContract[]>> {
    const result = await this.getAllContracts();

    if (!result.success) {
      return result;
    }

    const filtered = result.data.filter((c) => c.networkId === networkId);
    return { success: true, data: filtered };
  }

  /**
   * Fetch ABI details by ID
   */
  async getAbiById(abiId: string): Promise<Result<ApiAbiDetail | null>> {
    if (!abiId?.trim()) {
      return {
        success: false,
        error: new Error("ABI ID is required"),
      };
    }

    const result = await this.fetchApi<SingleApiResponse<ApiAbiDetail>>(
      `/abis/${abiId}`
    );

    if (!result.success) {
      return result;
    }

    return { success: true, data: result.data.data };
  }

  /**
   * Fetch multiple ABIs by IDs in parallel
   */
  async getAbisByIds(
    abiIds: string[]
  ): Promise<Result<Map<string, ApiAbiDetail>>> {
    if (!Array.isArray(abiIds) || abiIds.length === 0) {
      return {
        success: false,
        error: new Error("ABI IDs array is required and cannot be empty"),
      };
    }

    const validAbiIds = abiIds.filter((id) => id?.trim());
    if (validAbiIds.length === 0) {
      return {
        success: false,
        error: new Error("No valid ABI IDs provided"),
      };
    }

    const abiMap = new Map<string, ApiAbiDetail>();

    // Fetch ABIs in parallel with controlled concurrency
    const BATCH_SIZE = 10;
    const batches = this.chunkArray(validAbiIds, BATCH_SIZE);

    for (const batch of batches) {
      const promises = batch.map((id) => this.getAbiById(id));
      const results = await Promise.allSettled(promises);

      results.forEach((result, index) => {
        const abiId = batch[index]!;

        if (
          result.status === "fulfilled" &&
          result.value.success &&
          result.value.data
        ) {
          abiMap.set(abiId, result.value.data);
        } else if (result.status === "rejected") {
          console.warn(
            `[ZunoApiClient] Failed to fetch ABI ${abiId}:`,
            result.reason
          );
        }
      });
    }

    return { success: true, data: abiMap };
  }

  /**
   * Get contract with full ABI
   */
  async getContractWithAbi(contractAddress: string): Promise<
    Result<{
      contract: ApiContract;
      abi: ApiAbiDetail;
    } | null>
  > {
    if (!contractAddress?.trim()) {
      return {
        success: false,
        error: new Error("Contract address is required"),
      };
    }

    const contractsResult = await this.getAllContracts();

    if (!contractsResult.success) {
      return contractsResult;
    }

    const contract = contractsResult.data.find(
      (c) => c.address.toLowerCase() === contractAddress.toLowerCase()
    );

    if (!contract) {
      return { success: true, data: null };
    }

    const abiResult = await this.getAbiById(contract.abiId);

    if (!abiResult.success || !abiResult.data) {
      return { success: true, data: null };
    }

    return {
      success: true,
      data: {
        contract,
        abi: abiResult.data,
      },
    };
  }

  // ============================================================================
  // Utility Methods
  // ============================================================================

  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  /**
   * Extract events from ABI
   */
  extractEvents(abi: AbiItem[]): AbiItem[] {
    if (!Array.isArray(abi)) {
      console.warn("[ZunoApiClient] Invalid ABI format");
      return [];
    }
    return abi.filter((item) => item.type === "event");
  }

  /**
   * Check if ABI contains specific event
   */
  hasEvent(abi: AbiItem[], eventName: string): boolean {
    if (!eventName?.trim()) return false;
    return this.extractEvents(abi).some((event) => event.name === eventName);
  }

  /**
   * Get event definition by name
   */
  getEvent(abi: AbiItem[], eventName: string): AbiItem | null {
    if (!eventName?.trim()) return null;
    const events = this.extractEvents(abi);
    return events.find((event) => event.name === eventName) || null;
  }

  /**
   * Get all event names from ABI
   */
  getEventNames(abi: AbiItem[]): string[] {
    return this.extractEvents(abi)
      .map((event) => event.name)
      .filter(
        (name): name is string => typeof name === "string" && name.length > 0
      );
  }
}

// Export singleton getter
export function getZunoApiClient(): ZunoApiClientService {
  return ZunoApiClientService.getInstance();
}
