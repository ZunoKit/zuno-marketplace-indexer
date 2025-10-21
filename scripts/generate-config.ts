#!/usr/bin/env tsx
/**
 * Dynamic Ponder Configuration Generator
 *
 * Generates Ponder configuration from Zuno Marketplace ABIs API
 *
 * @author Zuno Team
 * @version 1.0.0
 */

// Load environment variables from .env files
import { config } from "dotenv";
config({ path: [".env.local", ".env"] });

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { getConfigBuilder } from "../src/services/config/configBuilder.service";

// ============================================================================
// Constants
// ============================================================================

const CONFIG_FILE_NAME = "ponder.config.ts";
const GENERATION_TIMESTAMP = new Date().toISOString();

// ============================================================================
// Main Function
// ============================================================================

async function generateConfig(): Promise<void> {
  console.log("🚀 Generating dynamic Ponder configuration...\n");

  try {
    // Validate environment
    validateEnvironment();

    // Build configuration from API
    const configBuilder = getConfigBuilder();
    const result = await configBuilder.build();

    if (!result.success) {
      console.error("❌ Configuration build failed:", result.error.message);
      process.exit(1);
    }

    const config = result.data;

    // Generate TypeScript config file
    const configContent = generateConfigFileContent(config);

    // Write configuration file
    const configPath = join(process.cwd(), CONFIG_FILE_NAME);
    writeFileSync(configPath, configContent, "utf8");

    // Display results
    displayResults(configPath, config);
    displayNextSteps();
  } catch (error) {
    console.error("❌ Configuration generation failed:");
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

function validateEnvironment(): void {
  const requiredEnvVars = ["ZUNO_API_URL", "ZUNO_API_KEY"];
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.warn(`⚠️  Missing environment variables: ${missing.join(", ")}`);
    console.warn("Some features may not work correctly.");
  }
}

/**
 * Serialize value to TypeScript code string
 */
function serializeValue(value: any, indent: number = 0): string {
  const spaces = '  '.repeat(indent);
  
  if (value === null || value === undefined) {
    return 'undefined';
  }
  
  if (typeof value === 'string') {
    return `"${value}"`;
  }
  
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    
    const items = value.map(item => 
      `${spaces}  ${serializeValue(item, indent + 1)}`
    ).join(',\n');
    
    return `[\n${items}\n${spaces}]`;
  }
  
  if (typeof value === 'object') {
    const entries = Object.entries(value);
    if (entries.length === 0) return '{}';
    
    const props = entries.map(([key, val]) => 
      `${spaces}  ${key}: ${serializeValue(val, indent + 1)}`
    ).join(',\n');
    
    return `{\n${props}\n${spaces}}`;
  }
  
  return String(value);
}

/**
 * Generate chains configuration as TypeScript code
 */
function generateChainsConfig(chains: Record<string, any>): string {
  const entries = Object.entries(chains);
  if (entries.length === 0) return '{}';
  
  const chainsCode = entries.map(([name, chain]) => {
    const props = [`      id: ${chain.id}`];
    
    // Handle RPC URL - check if it's an env var or a string
    if (typeof chain.rpc === 'string') {
      if (chain.rpc.includes('process.env')) {
        props.push(`      rpc: ${chain.rpc}`);
      } else {
        props.push(`      rpc: "${chain.rpc}"`);
      }
    } else {
      props.push(`      rpc: ${chain.rpc}`);
    }
    
    // Add WebSocket if exists
    if (chain.ws) {
      if (typeof chain.ws === 'string' && chain.ws.includes('process.env')) {
        props.push(`      ws: ${chain.ws}`);
      } else if (chain.ws !== 'undefined') {
        props.push(`      ws: ${chain.ws}`);
      }
    }
    
    // Use maxRequestsPerSecond (not maxRpcRequestsPerSecond)
    props.push(`      maxRequestsPerSecond: ${chain.maxRpcRequestsPerSecond || 100}`);
    
    return `    ${name}: {\n${props.join(',\n')}\n    }`;
  }).join(',\n');
  
  return `{\n${chainsCode}\n  }`;
}

/**
 * Generate contracts configuration as TypeScript code  
 */
function generateContractsConfig(contracts: Record<string, any>): string {
  const entries = Object.entries(contracts);
  if (entries.length === 0) return '{}';
  
  const contractsCode = entries.map(([name, contract]) => {
    const parts = [
      `      chain: ${serializeValue(contract.network, 3)}`,
      `      abi: ${serializeValue(contract.abi, 3)}`,
      `      address: ${serializeValue(contract.address, 3)}`
    ];
    
    if (contract.startBlock) {
      parts.push(`      startBlock: ${serializeValue(contract.startBlock, 3)}`);
    }
    
    if (contract.filter) {
      parts.push(`      filter: ${serializeValue(contract.filter, 3)}`);
    }
    
    return `    ${name}: {\n${parts.join(',\n')}\n    }`;
  }).join(',\n');
  
  return `{\n${contractsCode}\n  }`;
}

/**
 * Generate complete configuration file content
 */
function generateConfigFileContent(config: any): string {
  const chainsConfig = generateChainsConfig(config.chains);
  const contractsConfig = generateContractsConfig(config.contracts);
  
  return `/**
 * Generated Ponder Configuration
 * 
 * ⚠️  AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * 
 * This file is generated from Zuno Marketplace ABIs API.
 * To regenerate: pnpm generate-config
 * 
 * Generated: ${GENERATION_TIMESTAMP}
 * Chains: ${Object.keys(config.chains).length}
 * Contracts: ${Object.keys(config.contracts).length}
 */

import { createConfig } from "ponder";

export default createConfig({
  ordering: "multichain",
  
  database: {
    kind: "postgres",
    connectionString: process.env.DATABASE_URL!,
  },

  chains: ${chainsConfig},

  contracts: ${contractsConfig},
});
`;
}

function displayResults(configPath: string, config: any): void {
  console.log("✅ Configuration generated successfully!");
  console.log(`📄 File: ${configPath}`);
  console.log(`🔗 Chains: ${Object.keys(config.chains).length}`);
  console.log(`📋 Contracts: ${Object.keys(config.contracts).length}`);

  console.log("\n📊 Configuration Summary:");

  // Display chains
  if (Object.keys(config.chains).length > 0) {
    console.log("\n🔗 Chains:");
    Object.entries(config.chains).forEach(([name, chain]: [string, any]) => {
      console.log(`  • ${name} (ID: ${chain.id})`);
    });
  }

  // Display contracts
  if (Object.keys(config.contracts).length > 0) {
    console.log("\n📋 Contracts:");
    Object.entries(config.contracts).forEach(
      ([name, contract]: [string, any]) => {
        const networkInfo =
          typeof contract.network === "string"
            ? contract.network
            : Object.keys(contract.network).join(", ");
        console.log(`  • ${name} (${networkInfo})`);
      }
    );
  }
}

function displayNextSteps(): void {
  console.log("\n🎯 Next Steps:");
  console.log("1. Update event handlers in src/index.ts");
  console.log("2. Run: pnpm codegen");
  console.log("3. Run: pnpm dev");
}

// ============================================================================
// Execution
// ============================================================================

// Run if called directly
generateConfig();

export { generateConfig };

