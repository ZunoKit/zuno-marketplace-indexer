#!/usr/bin/env node
/**
 * Config Generation CLI
 * Command-line tool to fetch and generate Ponder configuration
 */

import { loadConfig } from "./loader";
import { generateConfig } from "./generator";
import { logger } from "../utils/logger";

async function main(): Promise<void> {
  const startTime = Date.now();

  try {
    logger.info("🚀 Starting configuration generation");
    logger.info("━".repeat(50));

    // Load configuration from API
    logger.info("📡 Fetching configuration from API...");
    const config = await loadConfig();

    // Generate files
    logger.info("📝 Generating configuration files...");
    await generateConfig(config);

    const duration = Date.now() - startTime;

    logger.info("━".repeat(50));
    logger.info(`✅ Configuration generated successfully in ${duration}ms`);
    logger.info("");
    logger.info("Generated files:");
    logger.info("  - ponder.config.ts");
    logger.info(`  - abis/ (${config.abis.length} files)`);
    logger.info("");
    logger.info("Next steps:");
    logger.info("  1. Review generated files");
    logger.info("  2. Run: pnpm dev");
    logger.info("");

    process.exit(0);
  } catch (error) {
    logger.error("❌ Configuration generation failed", error);

    if (error instanceof Error) {
      logger.error("Error details:", undefined, {
        message: error.message,
        stack: error.stack,
      });
    }

    process.exit(1);
  }
}

// Run CLI
main();
