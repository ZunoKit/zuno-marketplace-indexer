#!/usr/bin/env tsx
/**
 * Dynamic Ponder Configuration Generator
 *
 * Generates Ponder configuration from Zuno Marketplace ABIs API
 *
 * @author Zuno Team
 * @version 1.0.0
 */

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { getConfigBuilder } from "../src/services/config/configBuilder.service";

// ============================================================================
// Constants
// ============================================================================

const CONFIG_FILE_NAME = "ponder.config.generated.ts";
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

function generateConfigFileContent(config: any): string {
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

  chains: ${JSON.stringify(config.chains, null, 2)},

  contracts: ${JSON.stringify(config.contracts, null, 2)},
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
  console.log("1. Copy ponder.config.generated.ts to ponder.config.ts");
  console.log("2. Update event handlers in src/index.ts");
  console.log("3. Run: pnpm codegen");
  console.log("4. Run: pnpm dev");
  console.log(
    "\n💡 Tip: Use pnpm generate-handlers to auto-generate event handlers"
  );
}

// ============================================================================
// Execution
// ============================================================================

// Run if called directly
generateConfig();

export { generateConfig };
