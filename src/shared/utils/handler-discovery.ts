/**
 * Handler Discovery Utility
 * Auto-discovers contracts that have event handlers
 */

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Extract contract names from handler registration code
 */
function extractContractNamesFromFile(filePath: string): Set<string> {
  const contractNames = new Set<string>();

  try {
    const content = readFileSync(filePath, 'utf-8');

    // Match ponder.on("contractName:EventName", ...)
    const regex = /ponder\.on\(\s*["']([^:]+):/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      const fullContractName = match[1]; // e.g., "erc721collectionfactory_anvil_0x0dcd"

      // Extract base contract name (remove network suffix and address)
      // "erc721collectionfactory_anvil_0x0dcd" -> "erc721collectionfactory"
      const baseName = fullContractName?.split('_')[0];

      if (baseName) {
        contractNames.add(baseName);
      }
    }
  } catch (error) {
    console.warn(`[HandlerDiscovery] Failed to read ${filePath}:`, error);
  }

  return contractNames;
}

/**
 * Scan domain directory to discover all contracts with handlers
 */
export function discoverIndexedContracts(domainPath?: string): string[] {
  const baseDir = domainPath || join(process.cwd(), 'src', 'domain');

  if (!existsSync(baseDir)) {
    console.warn(`[HandlerDiscovery] Domain directory not found: ${baseDir}`);
    return [];
  }

  const allContractNames = new Set<string>();

  try {
    // Read all domain directories
    const domains = readdirSync(baseDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    console.log(`[HandlerDiscovery] Scanning ${domains.length} domains: ${domains.join(', ')}`);

    for (const domain of domains) {
      const domainIndexPath = join(baseDir, domain, 'index.ts');

      // Check if domain has index.ts
      if (!existsSync(domainIndexPath)) {
        console.warn(`[HandlerDiscovery] No index.ts found in ${domain}, skipping`);
        continue;
      }

      // Extract contract names from domain index file
      const contractNames = extractContractNamesFromFile(domainIndexPath);

      if (contractNames.size > 0) {
        console.log(`[HandlerDiscovery] ${domain}: found ${contractNames.size} contracts: ${[...contractNames].join(', ')}`);
        contractNames.forEach(name => allContractNames.add(name));
      }
    }

    const result = Array.from(allContractNames).sort();
    console.log(`[HandlerDiscovery] Total discovered: ${result.length} unique contracts`);

    return result;
  } catch (error) {
    console.error('[HandlerDiscovery] Failed to discover handlers:', error);
    return [];
  }
}

/**
 * Check if a contract name matches any discovered handlers
 */
export function matchesDiscoveredContract(
  contractName: string,
  discoveredContracts: string[]
): boolean {
  // Normalize contract name: lowercase, remove special chars
  const normalized = contractName.toLowerCase().replace(/[^a-z0-9]/g, '');

  return discoveredContracts.some(discovered =>
    normalized.includes(discovered.toLowerCase())
  );
}
