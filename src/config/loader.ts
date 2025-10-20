/**
 * Config Loader
 * Fetches and validates configuration from API
 */

import type { APIConfig } from "../types/api.types";
import { apiService } from "../services/api.service";
import { validateAll } from "./validator";
import { logger } from "../utils/logger";

/**
 * Load and validate configuration from API
 */
export async function loadConfig(): Promise<APIConfig> {
  logger.info("Loading configuration from API");

  try {
    // Fetch all data from API
    const config = await apiService.fetchAll();

    // Validate configuration
    const validationResult = validateAll(
      config.networks,
      config.contracts,
      config.abis
    );

    if (!validationResult.valid) {
      const errorMessages = validationResult.errors
        .map((e) => `${e.field}: ${e.message}`)
        .join("\n");

      throw new Error(`Configuration validation failed:\n${errorMessages}`);
    }

    logger.info("Configuration loaded and validated successfully", {
      networks: config.networks.length,
      contracts: config.contracts.length,
      abis: config.abis.length,
    });

    return config;
  } catch (error) {
    logger.error("Failed to load configuration", error);
    throw error;
  }
}
