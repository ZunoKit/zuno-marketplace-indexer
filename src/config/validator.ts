/**
 * Config Validator
 * Validates configuration data from API
 */

import type {
  NetworkResponse,
  ContractResponse,
  ABIResponse,
} from "../types/api.types";
import type {
  ConfigValidationResult,
  ConfigValidationError,
} from "../types/config.types";
import { isValidAddress } from "../utils/helpers";
import { logger } from "../utils/logger";

/**
 * Validate networks configuration
 */
export function validateNetworks(
  networks: NetworkResponse[]
): ConfigValidationResult {
  const errors: ConfigValidationError[] = [];

  if (!Array.isArray(networks) || networks.length === 0) {
    errors.push({
      field: "networks",
      message: "Networks array is empty or invalid",
    });
    return { valid: false, errors };
  }

  for (const network of networks) {
    if (!network.name || typeof network.name !== "string") {
      errors.push({
        field: "network.name",
        message: "Network name is required",
        value: network,
      });
    }

    if (!network.chainId || typeof network.chainId !== "number") {
      errors.push({
        field: "network.chainId",
        message: "Network chainId must be a number",
        value: network,
      });
    }

    if (!network.rpcUrl || typeof network.rpcUrl !== "string") {
      errors.push({
        field: "network.rpcUrl",
        message: "Network RPC URL is required",
        value: network,
      });
    } else if (!network.rpcUrl.startsWith("http")) {
      errors.push({
        field: "network.rpcUrl",
        message: "Network RPC URL must start with http/https",
        value: network.rpcUrl,
      });
    }
  }

  const valid = errors.length === 0;

  if (!valid) {
    logger.error("Network validation failed", undefined, { errors });
  }

  return { valid, errors };
}

/**
 * Validate contracts configuration
 */
export function validateContracts(
  contracts: ContractResponse[],
  networks: NetworkResponse[]
): ConfigValidationResult {
  const errors: ConfigValidationError[] = [];

  if (!Array.isArray(contracts) || contracts.length === 0) {
    errors.push({
      field: "contracts",
      message: "Contracts array is empty or invalid",
    });
    return { valid: false, errors };
  }

  const networkNames = new Set(networks.map((n) => n.name));

  for (const contract of contracts) {
    if (!contract.name || typeof contract.name !== "string") {
      errors.push({
        field: "contract.name",
        message: "Contract name is required",
        value: contract,
      });
    }

    if (!contract.network || !networkNames.has(contract.network)) {
      errors.push({
        field: "contract.network",
        message: `Contract network "${contract.network}" not found in networks list`,
        value: contract,
      });
    }

    if (!contract.address || !isValidAddress(contract.address)) {
      errors.push({
        field: "contract.address",
        message: "Contract address is invalid",
        value: contract.address,
      });
    }

    if (!contract.abiName || typeof contract.abiName !== "string") {
      errors.push({
        field: "contract.abiName",
        message: "Contract abiName is required",
        value: contract,
      });
    }

    if (typeof contract.startBlock !== "number" || contract.startBlock < 0) {
      errors.push({
        field: "contract.startBlock",
        message: "Contract startBlock must be a positive number",
        value: contract.startBlock,
      });
    }
  }

  const valid = errors.length === 0;

  if (!valid) {
    logger.error("Contract validation failed", undefined, { errors });
  }

  return { valid, errors };
}

/**
 * Validate ABIs configuration
 */
export function validateABIs(abis: ABIResponse[]): ConfigValidationResult {
  const errors: ConfigValidationError[] = [];

  if (!Array.isArray(abis) || abis.length === 0) {
    errors.push({
      field: "abis",
      message: "ABIs array is empty or invalid",
    });
    return { valid: false, errors };
  }

  for (const abi of abis) {
    if (!abi.name || typeof abi.name !== "string") {
      errors.push({
        field: "abi.name",
        message: "ABI name is required",
        value: abi,
      });
    }

    if (!Array.isArray(abi.abi) || abi.abi.length === 0) {
      errors.push({
        field: "abi.abi",
        message: "ABI array is empty or invalid",
        value: abi,
      });
    }
  }

  const valid = errors.length === 0;

  if (!valid) {
    logger.error("ABI validation failed", undefined, { errors });
  }

  return { valid, errors };
}

/**
 * Validate all configuration
 */
export function validateAll(
  networks: NetworkResponse[],
  contracts: ContractResponse[],
  abis: ABIResponse[]
): ConfigValidationResult {
  const networkResult = validateNetworks(networks);
  const contractResult = validateContracts(contracts, networks);
  const abiResult = validateABIs(abis);

  const errors = [
    ...networkResult.errors,
    ...contractResult.errors,
    ...abiResult.errors,
  ];

  const valid = errors.length === 0;

  if (valid) {
    logger.info("Configuration validation passed");
  } else {
    logger.error("Configuration validation failed", undefined, {
      totalErrors: errors.length,
    });
  }

  return { valid, errors };
}
