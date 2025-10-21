/**
 * Token Type Detection Utility
 * Detects ERC721 vs ERC1155 using ERC165 interface checks
 */

import type { Address } from "../types/blockchain";
import { ERC165_IDS } from "../../config";
import type { PonderContext } from "../types/ponder";

const ERC165_ABI = [
  {
    type: "function",
    name: "supportsInterface",
    inputs: [{ name: "interfaceId", type: "bytes4" }],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
  },
] as const;

/**
 * Check if contract supports a specific interface using ERC165
 */
async function supportsInterface(
  context: PonderContext,
  contractAddress: Address,
  interfaceId: string
): Promise<boolean> {
  try {
    const result = await context.client.readContract({
      address: contractAddress,
      abi: ERC165_ABI,
      functionName: "supportsInterface",
      args: [interfaceId as `0x${string}`],
    });
    return result as boolean;
  } catch (error) {
    // Contract doesn't support ERC165 or call failed
    return false;
  }
}

/**
 * Detect token type (ERC721 or ERC1155)
 * Returns "ERC721", "ERC1155", or null if detection fails
 */
export async function detectTokenType(
  context: PonderContext,
  contractAddress: Address
): Promise<"ERC721" | "ERC1155" | null> {
  try {
    // Check ERC721 first (more common)
    const isERC721 = await supportsInterface(
      context,
      contractAddress,
      ERC165_IDS.ERC721
    );
    if (isERC721) return "ERC721";

    // Check ERC1155
    const isERC1155 = await supportsInterface(
      context,
      contractAddress,
      ERC165_IDS.ERC1155
    );
    if (isERC1155) return "ERC1155";

    return null;
  } catch (error) {
    console.warn(`Failed to detect token type for ${contractAddress}:`, error);
    return null;
  }
}

/**
 * Cache for detected token types to avoid redundant RPC calls
 */
const tokenTypeCache = new Map<string, "ERC721" | "ERC1155">();

/**
 * Detect token type with caching
 */
export async function detectTokenTypeWithCache(
  context: PonderContext,
  contractAddress: Address
): Promise<"ERC721" | "ERC1155" | null> {
  const cacheKey = `${context.network.chainId}:${contractAddress.toLowerCase()}`;

  // Check cache first
  if (tokenTypeCache.has(cacheKey)) {
    return tokenTypeCache.get(cacheKey)!;
  }

  // Detect and cache
  const tokenType = await detectTokenType(context, contractAddress);
  if (tokenType) {
    tokenTypeCache.set(cacheKey, tokenType);
  }

  return tokenType;
}

/**
 * Get token type from cache or return default
 */
export function getTokenTypeOrDefault(
  context: PonderContext,
  contractAddress: Address,
  defaultType: "ERC721" | "ERC1155" = "ERC721"
): "ERC721" | "ERC1155" {
  const cacheKey = `${context.network.chainId}:${contractAddress.toLowerCase()}`;
  return tokenTypeCache.get(cacheKey) || defaultType;
}
