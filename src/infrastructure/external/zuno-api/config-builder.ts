/**
 * Configuration Builder Service
 * Builds dynamic Ponder configuration from Zuno Marketplace API
 * Implements Builder pattern for complex configuration assembly
 */

import type { ApiAbiDetail, ApiContract, ApiNetwork, Result } from "../../../shared/types";
import { sanitizeConfigKey } from "../../../shared/utils/helpers";
import { discoverIndexedContracts, matchesDiscoveredContract } from "../../../shared/utils/handler-discovery";
import { getZunoApiClient } from "./client";

export interface ChainConfig {
  id: number;
  rpc: string;
  ws?: string;
  maxRpcRequestsPerSecond?: number;
}

export interface ContractConfig {
  abi: any[];
  address: string | Record<string, string>;
  network: string | Record<string, { address: string; startBlock?: number }>;
  startBlock?: number | string;
  filter?: {
    event?: string | string[];
    args?: Record<string, any>;
  };
}

export interface PonderConfig {
  chains: Record<string, ChainConfig>;
  contracts: Record<string, ContractConfig>;
}

export class ConfigBuilderService {
  private static instance: ConfigBuilderService;
  private apiClient = getZunoApiClient();
  private config: Partial<PonderConfig> = {};

  private constructor() {}

  /**
   * Get singleton instance
   */
  public static getInstance(): ConfigBuilderService {
    if (!ConfigBuilderService.instance) {
      ConfigBuilderService.instance = new ConfigBuilderService();
    }
    return ConfigBuilderService.instance;
  }

  /**
   * Reset configuration builder
   */
  reset(): this {
    this.config = {};
    return this;
  }

  /**
   * Build chain configuration from networks
   */
  buildChainConfig(networks: ApiNetwork[]): Record<string, ChainConfig> {
    const chains: Record<string, ChainConfig> = {};

    for (const network of networks) {
      if (!network.isActive) continue;

      const chainKey = sanitizeConfigKey(network.slug);
      const envRpcKey = `PONDER_RPC_URL_${network.chainId}`;
      const envWsKey = `PONDER_WS_URL_${network.chainId}`;
      const rpcUrl = process.env[envRpcKey];

      // Skip if no RPC URL configured
      if (!rpcUrl) {
        console.warn(`[ConfigBuilder] No RPC URL configured for ${network.name} (${envRpcKey})`);
        continue;
      }

      chains[chainKey] = {
        id: network.chainId,
        rpc: rpcUrl,
        ws: process.env[envWsKey],
        maxRpcRequestsPerSecond: 50,
      };
    }

    return chains;
  }

  /**
   * Group contracts by ABI ID for efficient configuration
   */
  private groupContractsByAbi(contracts: ApiContract[]): Map<string, ApiContract[]> {
    const grouped = new Map<string, ApiContract[]>();

    for (const contract of contracts) {
      const existing = grouped.get(contract.abiId) || [];
      existing.push(contract);
      grouped.set(contract.abiId, existing);
    }

    return grouped;
  }

  /**
   * Parse deployed date to block number or use 0 for development
   */
  private parseStartBlock(deployedAt: string): number | string {
    // Use block 0 for development to avoid "Block not found" errors
    // In production with real chains, you can use "latest" or specific block
    return 0;
  }

  /**
   * Build contract configuration
   */
  async buildContractConfig(
    contracts: ApiContract[],
    networks: ApiNetwork[],
    abis: Map<string, ApiAbiDetail>
  ): Promise<Record<string, ContractConfig>> {
    const contractConfigs: Record<string, ContractConfig> = {};
    const grouped = this.groupContractsByAbi(contracts);

    for (const [abiId, contractGroup] of grouped.entries()) {
      const abi = abis.get(abiId);
      if (!abi) {
        console.warn(`[ConfigBuilder] ABI not found for ${abiId}, skipping contracts`);
        continue;
      }

      // Check if this is a multi-chain contract
      const uniqueAddresses = new Set(contractGroup.map(c => c.address.toLowerCase()));
      const isMultiChain = contractGroup.length > 1 && uniqueAddresses.size > 1;

      if (isMultiChain) {
        // Multi-chain configuration
        const networkMapping: Record<string, { address: string; startBlock?: number }> = {};

        for (const contract of contractGroup) {
          const network = networks.find(n => n.id === contract.networkId);
          if (!network) continue;

          networkMapping[sanitizeConfigKey(network.slug)] = {
            address: contract.address,
            startBlock: this.parseStartBlock(contract.deployedAt) as any,
          };
        }

        if (Object.keys(networkMapping).length === 0) continue;

        const configKey = sanitizeConfigKey(abi.contractName);
        contractConfigs[configKey] = {
          abi: abi.abi,
          address: '', // Not used in multi-chain
          network: networkMapping,
        };
      } else {
        // Single contract configuration
        for (const contract of contractGroup) {
          const network = networks.find(n => n.id === contract.networkId);
          if (!network) continue;

          const configKey = sanitizeConfigKey(
            `${abi.contractName}_${network.slug}_${contract.address.slice(0, 6)}`
          );
          
          contractConfigs[configKey] = {
            abi: abi.abi,
            address: contract.address,
            network: sanitizeConfigKey(network.slug),
            startBlock: this.parseStartBlock(contract.deployedAt) as any,
          };
        }
      }
    }

    return contractConfigs;
  }

  /**
   * Build complete Ponder configuration
   */
  async build(): Promise<Result<PonderConfig>> {
    console.log('[ConfigBuilder] Fetching configuration from Zuno API...');

    // Fetch all data
    const [networksResult, contractsResult] = await Promise.all([
      this.apiClient.getNetworks(),
      this.apiClient.getAllContracts(),
    ]);

    if (!networksResult.success) {
      return { success: false, error: networksResult.error };
    }

    if (!contractsResult.success) {
      return { success: false, error: contractsResult.error };
    }

    const networks = networksResult.data;
    const contracts = contractsResult.data;

    console.log(`[ConfigBuilder] Found ${networks.length} networks and ${contracts.length} contracts`);

    // Filter contracts by active networks
    const activeNetworkIds = new Set(networks.map(n => n.id));

    // Auto-discover contracts that have event handlers
    const discoveredContracts = discoverIndexedContracts();

    if (discoveredContracts.length === 0) {
      console.warn('[ConfigBuilder] No contracts with handlers discovered. Check src/domain/*');
      return {
        success: false,
        error: new Error('No contracts with event handlers found in src/domain'),
      };
    }

    // Only include contracts that have event handlers
    const activeContracts = contracts.filter(c => {
      if (!activeNetworkIds.has(c.networkId) || !c.isVerified) return false;

      // Check if contract name matches any discovered handler
      return matchesDiscoveredContract(c.name, discoveredContracts);
    });

    console.log(`[ConfigBuilder] ${activeContracts.length} active contracts after filtering (only contracts with handlers)`);

    // Fetch ABIs
    const uniqueAbiIds = [...new Set(activeContracts.map(c => c.abiId))];
    console.log(`[ConfigBuilder] Fetching ${uniqueAbiIds.length} unique ABIs...`);

    const abisResult = await this.apiClient.getAbisByIds(uniqueAbiIds);
    
    if (!abisResult.success) {
      return { success: false, error: abisResult.error };
    }

    const abis = abisResult.data;
    console.log(`[ConfigBuilder] Fetched ${abis.size} ABIs successfully`);

    // Build configurations
    const chains = this.buildChainConfig(networks);
    const contractConfigs = await this.buildContractConfig(activeContracts, networks, abis);

    console.log('[ConfigBuilder] Configuration built successfully');
    console.log(`[ConfigBuilder] Chains: ${Object.keys(chains).join(', ')}`);
    console.log(`[ConfigBuilder] Contracts: ${Object.keys(contractConfigs).length}`);

    return {
      success: true,
      data: {
        chains,
        contracts: contractConfigs,
      }
    };
  }

  /**
   * Filter contracts by tags (e.g., only marketplace contracts)
   */
  filterContractsByTags(
    contracts: ApiContract[],
    abis: Map<string, ApiAbiDetail>,
    tags: string[]
  ): ApiContract[] {
    return contracts.filter(contract => {
      const abi = abis.get(contract.abiId);
      if (!abi) return false;
      return tags.some(tag => abi.tags.includes(tag));
    });
  }

  /**
   * Filter contracts by event presence
   */
  filterContractsByEvent(
    contracts: ApiContract[],
    abis: Map<string, ApiAbiDetail>,
    eventName: string
  ): ApiContract[] {
    return contracts.filter(contract => {
      const abi = abis.get(contract.abiId);
      if (!abi) return false;
      return this.apiClient.hasEvent(abi.abi, eventName);
    });
  }
}

// Export singleton getter
export function getConfigBuilder(): ConfigBuilderService {
  return ConfigBuilderService.getInstance();
}

