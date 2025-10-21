#!/usr/bin/env tsx
/**
 * Generate Event Handlers
 * 
 * This script analyzes ABIs from Zuno API and generates event handler
 * registrations for src/index.ts
 * 
 * Usage:
 *   pnpm tsx scripts/generate-handlers.ts
 */

import { getZunoApiClient } from '../src/services/api/zunoApiClient.service';
import { getConfigBuilder } from '../src/services/config/configBuilder.service';

interface EventInfo {
  contractName: string;
  eventName: string;
  configKey: string;
  signature: string;
}

async function generateHandlers() {
  console.log('🎯 Generating event handlers...\n');

  try {
    const apiClient = getZunoApiClient();
    const configBuilder = getConfigBuilder();

    // Get configuration
    const configResult = await configBuilder.build();
    if (!configResult.success) {
      throw configResult.error;
    }

    // Get all contracts and ABIs
    const contractsResult = await apiClient.getAllContracts();
    if (!contractsResult.success) {
      throw contractsResult.error;
    }

    const contracts = contractsResult.data;
    const uniqueAbiIds = [...new Set(contracts.map(c => c.abiId))];
    
    const abisResult = await apiClient.getAbisByIds(uniqueAbiIds);
    if (!abisResult.success) {
      throw abisResult.error;
    }

    const abis = abisResult.data;

    // Extract events from all ABIs
    const events: EventInfo[] = [];
    
    for (const [abiId, abi] of abis.entries()) {
      const abiEvents = apiClient.extractEvents(abi.abi);
      
      for (const event of abiEvents) {
        if (!event.name) continue;

        // Find contracts using this ABI
        const contractsWithAbi = contracts.filter(c => c.abiId === abiId);
        
        for (const contract of contractsWithAbi) {
          const configKey = `${abi.contractName}_${contract.networkId}_${contract.address.slice(0, 6)}`;
          
          events.push({
            contractName: abi.contractName,
            eventName: event.name,
            configKey,
            signature: `${event.name}(${event.inputs?.map(i => i.type).join(',') || ''})`
          });
        }
      }
    }

    // Group events by type for better organization
    const eventsByType = new Map<string, EventInfo[]>();
    
    events.forEach(event => {
      const category = categorizeEvent(event.eventName);
      if (!eventsByType.has(category)) {
        eventsByType.set(category, []);
      }
      eventsByType.get(category)!.push(event);
    });

    // Generate handler registrations
    let handlerCode = `/**
 * Generated Event Handler Registrations
 * 
 * This code should be added to src/index.ts
 * Generated at: ${new Date().toISOString()}
 */

import { ponder } from "ponder:registry";
import { wrapHandler } from "./core/utils/handler-wrapper";

// Import handlers
import {
  handleERC721CollectionCreated,
  handleERC1155CollectionCreated
} from "./handlers/collection.handler";

import {
  handleTransfer,
  handleTransferSingle,
  handleTransferBatch,
} from "./handlers/transfer.handler";

import {
  handleNFTListed,
  handleNFTUnlisted,
  handleNFTPurchased,
  handleOrderFulfilled,
  handleOrderCreated,
  handleOrderCancelled,
} from "./handlers/trade.handler";

// ============================================================================
// Generated Event Handlers
// ============================================================================

`;

    // Generate handlers by category
    for (const [category, categoryEvents] of eventsByType.entries()) {
      handlerCode += `\n// ${category} Events\n`;
      
      const uniqueEvents = new Map<string, EventInfo>();
      categoryEvents.forEach(event => {
        const key = `${event.configKey}:${event.eventName}`;
        uniqueEvents.set(key, event);
      });

      for (const event of uniqueEvents.values()) {
        const handlerName = getHandlerName(event.eventName);
        if (handlerName) {
          handlerCode += `ponder.on("${event.configKey}:${event.eventName}", wrapHandler("${event.eventName}", ${handlerName}));\n`;
        } else {
          handlerCode += `// TODO: Implement handler for ${event.eventName}\n`;
          handlerCode += `// ponder.on("${event.configKey}:${event.eventName}", wrapHandler("${event.eventName}", handle${event.eventName}));\n`;
        }
      }
    }

    console.log('✅ Event handlers generated!');
    console.log(`📊 Total events: ${events.length}`);
    console.log(`📋 Categories: ${eventsByType.size}`);
    
    console.log('\n📊 Events by category:');
    for (const [category, categoryEvents] of eventsByType.entries()) {
      console.log(`  • ${category}: ${categoryEvents.length} events`);
    }

    console.log('\n📄 Generated handler code:');
    console.log('─'.repeat(80));
    console.log(handlerCode);
    console.log('─'.repeat(80));

    console.log('\n🎯 Next steps:');
    console.log('1. Copy the generated code to src/index.ts');
    console.log('2. Implement missing event handlers');
    console.log('3. Run: pnpm codegen');
    console.log('4. Run: pnpm dev');

  } catch (error) {
    console.error('❌ Error generating handlers:', error);
    process.exit(1);
  }
}

function categorizeEvent(eventName: string): string {
  const name = eventName.toLowerCase();
  
  if (name.includes('transfer') || name.includes('mint') || name.includes('burn')) {
    return 'NFT Transfers';
  }
  
  if (name.includes('list') || name.includes('order') || name.includes('trade') || 
      name.includes('sale') || name.includes('purchase') || name.includes('fulfill')) {
    return 'Marketplace Trading';
  }
  
  if (name.includes('collection') || name.includes('create')) {
    return 'Collection Management';
  }
  
  if (name.includes('role') || name.includes('admin') || name.includes('access')) {
    return 'Access Control';
  }
  
  if (name.includes('auction') || name.includes('bid')) {
    return 'Auctions';
  }
  
  if (name.includes('offer')) {
    return 'Offers';
  }
  
  return 'Other Events';
}

function getHandlerName(eventName: string): string | null {
  const handlers: Record<string, string> = {
    'Transfer': 'handleTransfer',
    'TransferSingle': 'handleTransferSingle', 
    'TransferBatch': 'handleTransferBatch',
    'ERC721CollectionCreated': 'handleERC721CollectionCreated',
    'ERC1155CollectionCreated': 'handleERC1155CollectionCreated',
    'NFTListed': 'handleNFTListed',
    'NFTUnlisted': 'handleNFTUnlisted',
    'NFTPurchased': 'handleNFTPurchased',
    'OrderFulfilled': 'handleOrderFulfilled',
    'OrderCreated': 'handleOrderCreated',
    'OrderCancelled': 'handleOrderCancelled',
  };
  
  return handlers[eventName] || null;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateHandlers();
}

export { generateHandlers };
