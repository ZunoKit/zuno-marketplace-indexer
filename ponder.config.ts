import { createConfig } from "ponder";
import { getConfigBuilder } from "./src/services/config/configBuilder.service";

/**
 * Zuno Marketplace Indexer Configuration
 * 
 * This configuration is dynamically generated from the Zuno Marketplace ABIs API.
 * It fetches all verified contracts and their ABIs to set up event indexing.
 * 
 * Environment Variables Required:
 * - ZUNO_API_URL: API endpoint (default: https://zuno-marketplace-abis.vercel.app/api)
 * - ZUNO_API_KEY: API key for authentication
 * - PONDER_RPC_URL_{chainId}: RPC URL for each chain
 * - PONDER_WS_URL_{chainId}: (Optional) WebSocket URL for each chain
 */

// For now, we'll use a static config for Anvil local network
// The dynamic config will be loaded when needed
export default createConfig({
  ordering: "multichain",
  
  // Database configuration
  database: {
    kind: "postgres",
    connectionString: process.env.DATABASE_URL,
  },

  // Chains configuration - Anvil local network
  chains: {
    anvil: {
      id: 31337,
      rpc: process.env.PONDER_RPC_URL_31337 || "http://127.0.0.1:8545",
      ws: process.env.PONDER_WS_URL_31337,
      maxRpcRequestsPerSecond: 100,
    },
  },

  // Contracts will be loaded dynamically
  // For initial setup, we start with empty contracts
  // Use `ponder codegen` after contracts are detected
  contracts: {},

  // Blocks configuration
  blocks: {
    // Track block data for transaction metadata
    anvil: {
      // Start from genesis block
      startBlock: 0,
      interval: 1, // Track every block
    },
  },
});

/**
 * Helper function to generate config dynamically
 * This can be called from scripts or tools to rebuild configuration
 */
export async function generateDynamicConfig() {
  console.log('[Ponder Config] Generating dynamic configuration from Zuno API...');
  
  const configBuilder = getConfigBuilder();
  const config = await configBuilder.buildConfig();
  
  console.log('[Ponder Config] Configuration generated successfully');
  console.log(`[Ponder Config] Chains: ${Object.keys(config.chains).length}`);
  console.log(`[Ponder Config] Contracts: ${Object.keys(config.contracts).length}`);
  
  return createConfig({
    ordering: "multichain",
    database: {
      kind: "postgres",
      connectionString: process.env.DATABASE_URL,
    },
    chains: config.chains,
    contracts: config.contracts,
    blocks: Object.keys(config.chains).reduce((acc, chainKey) => {
      acc[chainKey] = {
        startBlock: 0,
        interval: 1,
      };
      return acc;
    }, {} as Record<string, { startBlock: number; interval: number }>),
  });
}
