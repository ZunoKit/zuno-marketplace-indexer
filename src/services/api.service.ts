/**
 * API Service
 * Type-safe HTTP client for external API
 */

import type {
  NetworkResponse,
  ContractResponse,
  ABIResponse,
  APIResponse,
} from "../types/api.types";
import { logger } from "../utils/logger";
import { retry, getEnv, getEnvNumber } from "../utils/helpers";
import { cacheService } from "./cache.service";

class APIService {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = getEnv("API_BASE_URL");
    this.timeout = getEnvNumber("API_TIMEOUT", 30000);

    logger.info("API service initialized", {
      baseURL: this.baseURL,
      timeout: this.timeout,
    });
  }

  /**
   * Fetch networks configuration
   */
  async fetchNetworks(): Promise<NetworkResponse[]> {
    const cacheKey = "api:networks";
    const cached = cacheService.get<NetworkResponse[]>(cacheKey);

    if (cached) {
      logger.info("Using cached networks", { count: cached.length });
      return cached;
    }

    logger.info("Fetching networks from API");

    const data = await this.request<NetworkResponse[]>("/api/networks");

    cacheService.set(cacheKey, data);

    logger.info("Networks fetched successfully", { count: data.length });

    return data;
  }

  /**
   * Fetch contracts configuration
   */
  async fetchContracts(): Promise<ContractResponse[]> {
    const cacheKey = "api:contracts";
    const cached = cacheService.get<ContractResponse[]>(cacheKey);

    if (cached) {
      logger.info("Using cached contracts", { count: cached.length });
      return cached;
    }

    logger.info("Fetching contracts from API");

    const data = await this.request<ContractResponse[]>("/api/contracts");

    cacheService.set(cacheKey, data);

    logger.info("Contracts fetched successfully", { count: data.length });

    return data;
  }

  /**
   * Fetch ABIs
   */
  async fetchABIs(): Promise<ABIResponse[]> {
    const cacheKey = "api:abis";
    const cached = cacheService.get<ABIResponse[]>(cacheKey);

    if (cached) {
      logger.info("Using cached ABIs", { count: cached.length });
      return cached;
    }

    logger.info("Fetching ABIs from API");

    const data = await this.request<ABIResponse[]>("/api/abis/full");

    cacheService.set(cacheKey, data);

    logger.info("ABIs fetched successfully", { count: data.length });

    return data;
  }

  /**
   * Fetch all configuration data
   */
  async fetchAll(): Promise<{
    networks: NetworkResponse[];
    contracts: ContractResponse[];
    abis: ABIResponse[];
  }> {
    logger.info("Fetching all configuration data");

    const [networks, contracts, abis] = await Promise.all([
      this.fetchNetworks(),
      this.fetchContracts(),
      this.fetchABIs(),
    ]);

    logger.info("All configuration data fetched", {
      networks: networks.length,
      contracts: contracts.length,
      abis: abis.length,
    });

    return { networks, contracts, abis };
  }

  /**
   * Generic HTTP request with retry logic
   */
  private async request<T>(endpoint: string): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    return retry(
      async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
          const response = await fetch(url, {
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
              "User-Agent": "zuno-marketplace-indexer/1.0.0",
            },
          });

          clearTimeout(timeoutId);

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const json = (await response.json()) as APIResponse<T>;

          if (!json.success || !json.data) {
            throw new Error(
              json.error?.message || "API returned unsuccessful response"
            );
          }

          return json.data;
        } catch (error) {
          clearTimeout(timeoutId);

          if (error instanceof Error) {
            if (error.name === "AbortError") {
              throw new Error(`Request timeout after ${this.timeout}ms`);
            }
          }

          throw error;
        }
      },
      {
        maxRetries: 3,
        delay: 1000,
        backoffMultiplier: 2,
        onRetry: (attempt, error) => {
          logger.warn(`API request retry`, {
            endpoint,
            attempt,
            error: error instanceof Error ? error.message : String(error),
          });
        },
      }
    );
  }
}

// Singleton instance
export const apiService = new APIService();
