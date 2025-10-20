/**
 * Config Generator
 * Generates ponder.config.ts and ABI files from API data
 */

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import type { APIConfig } from "../types/api.types";
import { logger } from "../utils/logger";

/**
 * Generate all configuration files
 */
export async function generateConfig(config: APIConfig): Promise<void> {
  logger.info("Starting config generation");

  try {
    await Promise.all([
      generateABIFiles(config.abis),
      generatePonderConfig(config),
    ]);

    logger.info("Config generation completed successfully");
  } catch (error) {
    logger.error("Failed to generate config", error);
    throw error;
  }
}

/**
 * Generate ABI files in abis/ directory
 */
async function generateABIFiles(abis: APIConfig["abis"]): Promise<void> {
  const abisDir = join(process.cwd(), "abis");

  // Create abis directory if it doesn't exist
  await mkdir(abisDir, { recursive: true });

  logger.info("Generating ABI files", { count: abis.length });

  for (const abi of abis) {
    const fileName = `${abi.name}.ts`;
    const filePath = join(abisDir, fileName);

    // Format ABI as TypeScript const with proper typing
    const content = `/**
 * ${abi.name} ABI
 * ${abi.version ? `Version: ${abi.version}` : "Auto-generated from API"}
 */

export const ${abi.name}ABI = ${JSON.stringify(abi.abi, null, 2)} as const;
`;

    await writeFile(filePath, content, "utf-8");

    logger.debug("Generated ABI file", { file: fileName });
  }

  logger.info("ABI files generated", { count: abis.length });
}

/**
 * Generate ponder.config.ts
 */
async function generatePonderConfig(config: APIConfig): Promise<void> {
  logger.info("Generating ponder.config.ts");

  // Generate imports for ABIs
  const abiImports = config.abis
    .map((abi) => `import { ${abi.name}ABI } from "./abis/${abi.name}";`)
    .join("\n");

  // Generate networks configuration
  const networksConfig = config.networks
    .map((network) => {
      return `    ${network.name}: {
      chainId: ${network.chainId},
      transport: http("${network.rpcUrl}"),
    }`;
    })
    .join(",\n");

  // Generate contracts configuration
  const contractsConfig = config.contracts
    .map((contract) => {
      const maxBlockRange = contract.maxBlockRange
        ? `\n      maxBlockRange: ${contract.maxBlockRange},`
        : "";

      return `    ${contract.name}: {
      abi: ${contract.abiName}ABI,
      network: "${contract.network}",
      address: "${contract.address}",
      startBlock: ${contract.startBlock},${maxBlockRange}
    }`;
    })
    .join(",\n");

  // Generate full config file
  const content = `/**
 * Ponder Configuration
 * Auto-generated from API - DO NOT EDIT MANUALLY
 * Generated at: ${new Date().toISOString()}
 */

import { createConfig } from "ponder";
import { http } from "viem";

// Import ABIs
${abiImports}

export default createConfig({
  networks: {
${networksConfig}
  },
  contracts: {
${contractsConfig}
  },
});
`;

  const configPath = join(process.cwd(), "ponder.config.ts");
  await writeFile(configPath, content, "utf-8");

  logger.info("ponder.config.ts generated", {
    networks: config.networks.length,
    contracts: config.contracts.length,
  });
}
