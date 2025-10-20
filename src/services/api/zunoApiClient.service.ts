/**
 * Zuno API Client Service
 * Fetches contract metadata, ABIs, and network information
 * Implements Singleton pattern for efficient resource usage
 */

import type { AbiItem, ApiAbiDetail, ApiContract, ApiNetwork, PaginatedResult, Result } from "../../core/types";

interface ApiResponse<T> {
  success: boolean;
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
  meta: {
    timestamp: string;
    version: string;
  };
}

interface AbiFullResponse {
  success: boolean;
  data: ApiAbiDetail[];
  meta: {
    timestamp: string;
    version: string;
  };
}

export class ZunoApiClientService {
  private static instance: ZunoApiClientService;
  private baseUrl: string;
  private apiKey: string;
  private cache: Map<string, { data: any; timestamp: number }>;
  private cacheTTL: number = 5 * 60 * 1000; // 5 minutes

  private constructor(baseUrl?: string, apiKey?: string) {
    this.baseUrl = baseUrl || process.env.ZUNO_API_URL || 'https://zuno-marketplace-abis.vercel.app/api';
    this.apiKey = apiKey || process.env.ZUNO_API_KEY || '';
    this.cache = new Map();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): ZunoApiClientService {
    if (!ZunoApiClientService.instance) {
      ZunoApiClientService.instance = new ZunoApiClientService();
    }
    return ZunoApiClientService.instance;
  }

  /**
   * Generic fetch with error handling and caching
   */
  private async fetch<T>(endpoint: string, useCache: boolean = true): Promise<Result<T>> {
    const cacheKey = endpoint;

    // Check cache
    if (useCache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      if (Date.now() - cached.timestamp < this.cacheTTL) {
        return { success: true, data: cached.data as T };
      }
    }

    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.apiKey) {
      headers['x-api-key'] = this.apiKey;
    }

    try {
      const response = await fetch(url, { headers });

      if (!response.ok) {
        return {
          success: false,
          error: new Error(`API request failed: ${response.status} ${response.statusText}`)
        };
      }

      const data = await response.json() as T;

      // Cache the result
      if (useCache) {
        this.cache.set(cacheKey, { data, timestamp: Date.now() });
      }

      return { success: true, data };
    } catch (error) {
      console.error(`[ZunoApiClient] Error fetching ${endpoint}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Unknown error')
      };
    }
  }

  /**
   * Clear cache
   */
  public clearCache(): void {
    this.cache.clear();
  }

  /**
   * Fetch all active networks
   */
  async getNetworks(): Promise<Result<ApiNetwork[]>> {
    const result = await this.fetch<ApiResponse<ApiNetwork>>('/networks?limit=100');
    
    if (!result.success) {
      return result;
    }

    const activeNetworks = result.data.data.data.filter(n => n.isActive);
    return { success: true, data: activeNetworks };
  }

  /**
   * Fetch network by chain ID
   */
  async getNetworkByChainId(chainId: number): Promise<Result<ApiNetwork | null>> {
    const result = await this.getNetworks();
    
    if (!result.success) {
      return result;
    }

    const network = result.data.find(n => n.chainId === chainId) || null;
    return { success: true, data: network };
  }

  /**
   * Fetch contracts (paginated)
   */
  async getContracts(page: number = 1, limit: number = 100): Promise<Result<PaginatedResult<ApiContract>>> {
    const result = await this.fetch<ApiResponse<ApiContract>>(
      `/contracts?page=${page}&limit=${limit}`,
      false // Don't cache paginated results
    );
    
    if (!result.success) {
      return result;
    }

    return {
      success: true,
      data: {
        data: result.data.data.data,
        pagination: result.data.data.pagination
      }
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
  async getContractsByNetwork(networkId: string): Promise<Result<ApiContract[]>> {
    const result = await this.getAllContracts();
    
    if (!result.success) {
      return result;
    }

    const filtered = result.data.filter(c => c.networkId === networkId);
    return { success: true, data: filtered };
  }

  /**
   * Fetch full ABI details by ID
   */
  async getAbiById(abiId: string): Promise<Result<ApiAbiDetail | null>> {
    const result = await this.fetch<AbiFullResponse>(`/abis/full?abiId=${abiId}`);
    
    if (!result.success) {
      return result;
    }

    const abi = result.data.data[0] || null;
    return { success: true, data: abi };
  }

  /**
   * Fetch multiple ABIs by IDs (parallel)
   */
  async getAbisByIds(abiIds: string[]): Promise<Result<Map<string, ApiAbiDetail>>> {
    const abiMap = new Map<string, ApiAbiDetail>();

    // Fetch ABIs in parallel
    const promises = abiIds.map(id => this.getAbiById(id));
    const results = await Promise.allSettled(promises);

    results.forEach((result, index) => {
      const abiId = abiIds[index];
      
      if (!abiId) {
        console.warn(`[ZunoApiClient] Invalid ABI ID at index ${index}`);
        return;
      }
      
      if (result.status === 'fulfilled' && result.value.success && result.value.data) {
        abiMap.set(abiId, result.value.data);
      }
    });

    return { success: true, data: abiMap };
  }

  /**
   * Get contract with full ABI
   */
  async getContractWithAbi(contractAddress: string): Promise<Result<{
    contract: ApiContract;
    abi: ApiAbiDetail;
  } | null>> {
    const contractsResult = await this.getAllContracts();
    
    if (!contractsResult.success) {
      return contractsResult;
    }

    const contract = contractsResult.data.find(
      c => c.address.toLowerCase() === contractAddress.toLowerCase()
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
        abi: abiResult.data
      }
    };
  }

  /**
   * Extract events from ABI
   */
  extractEvents(abi: AbiItem[]): AbiItem[] {
    return abi.filter(item => item.type === 'event');
  }

  /**
   * Check if ABI has specific event
   */
  hasEvent(abi: AbiItem[], eventName: string): boolean {
    return this.extractEvents(abi).some(event => event.name === eventName);
  }

  /**
   * Get event by name from ABI
   */
  getEvent(abi: AbiItem[], eventName: string): AbiItem | null {
    const events = this.extractEvents(abi);
    const found = events.find(event => event.name === eventName);
    return found || null;
  }

  /**
   * Get all event names from ABI
   */
  getEventNames(abi: AbiItem[]): string[] {
    return this.extractEvents(abi)
      .map(event => event.name)
      .filter((name): name is string => typeof name === 'string' && name.length > 0);
  }
}

// Export singleton getter
export function getZunoApiClient(): ZunoApiClientService {
  return ZunoApiClientService.getInstance();
}

