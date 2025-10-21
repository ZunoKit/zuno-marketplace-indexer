/**
 * Generated Ponder Configuration
 * 
 * ⚠️  AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * 
 * This file is generated from Zuno Marketplace ABIs API.
 * To regenerate: pnpm generate-config
 * 
 * Generated: 2025-10-21T05:18:22.429Z
 * Chains: 1
 * Contracts: 28
 */

import { createConfig } from "ponder";

export default createConfig({
  ordering: "multichain",
  
  database: {
    kind: "postgres",
    connectionString: process.env.DATABASE_URL!,
  },

  chains: {
    anvil: {
      id: 31337,
      rpc: "http://127.0.0.1:8545",
      maxRequestsPerSecond: 50
    }
  },

  contracts: {
    rolemanager_anvil_0x36c0: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "superAdmin",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "ADMIN_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "AUCTION_MANAGER_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "COLLECTION_MANAGER_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "DAO_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "DEFAULT_ADMIN_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "EMERGENCY_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "FEE_MANAGER_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "GOVERNANCE_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "MODERATOR_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "OPERATOR_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "SUPER_ADMIN_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "VALIDATOR_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "addNewRole",
          type: "function",
          inputs: [
            {
              name: "newRole",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "adminRole",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "getAccountRoles",
          type: "function",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "activeRoles",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getRoleAdmin",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "grantRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "grantRoles",
          type: "function",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            },
            {
              name: "roles",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "hasAllRoles",
          type: "function",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            },
            {
              name: "roles",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "hasAnyRole",
          type: "function",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            },
            {
              name: "roles",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "hasRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "hasRoleCache",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "renounceRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "callerConfirmation",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "revokeRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "revokeRoles",
          type: "function",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            },
            {
              name: "roles",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "roleHierarchy",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "supportsInterface",
          type: "function",
          inputs: [
            {
              name: "interfaceId",
              type: "bytes4",
              internalType: "bytes4"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "BulkRolesGranted",
          type: "event",
          inputs: [
            {
              name: "account",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "roles",
              type: "bytes32[]",
              indexed: false,
              internalType: "bytes32[]"
            }
          ],
          anonymous: false
        },
        {
          name: "BulkRolesRevoked",
          type: "event",
          inputs: [
            {
              name: "account",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "roles",
              type: "bytes32[]",
              indexed: false,
              internalType: "bytes32[]"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleAdminChanged",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "previousAdminRole",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "newAdminRole",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleGranted",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "sender",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleHierarchyUpdated",
          type: "event",
          inputs: [
            {
              name: "parentRole",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "childRole",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleManagerInitialized",
          type: "event",
          inputs: [
            {
              name: "superAdmin",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleRevoked",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "sender",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "AccessControlBadConfirmation",
          type: "error",
          inputs: []
        },
        {
          name: "AccessControlUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            },
            {
              name: "neededRole",
              type: "bytes32",
              internalType: "bytes32"
            }
          ]
        }
      ],
      address: "0x36c02da8a0983159322a80ffe9f24b1acff8b570",
      startBlock: "latest"
    },
    upgrademanager_anvil_0x809d: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "admin",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "DEFAULT_ADMIN_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "MIN_EXECUTION_DELAY",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "UPGRADE_ADMIN_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "addFeature",
          type: "function",
          inputs: [
            {
              name: "featureName",
              type: "string",
              internalType: "string"
            },
            {
              name: "implementation",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "addModule",
          type: "function",
          inputs: [
            {
              name: "moduleName",
              type: "string",
              internalType: "string"
            },
            {
              name: "implementation",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "addTokenStandard",
          type: "function",
          inputs: [
            {
              name: "standardName",
              type: "string",
              internalType: "string"
            },
            {
              name: "implementation",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "currentVersion",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "executeUpgrade",
          type: "function",
          inputs: [
            {
              name: "proposalId",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "featureEnabled",
          type: "function",
          inputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "featureList",
          type: "function",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "features",
          type: "function",
          inputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getAllFeatures",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "featureNames",
              type: "string[]",
              internalType: "string[]"
            },
            {
              name: "implementations",
              type: "address[]",
              internalType: "address[]"
            },
            {
              name: "enabled",
              type: "bool[]",
              internalType: "bool[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getAllModules",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "moduleNames",
              type: "string[]",
              internalType: "string[]"
            },
            {
              name: "implementations",
              type: "address[]",
              internalType: "address[]"
            },
            {
              name: "active",
              type: "bool[]",
              internalType: "bool[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getAllTokenStandards",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "standardNames",
              type: "string[]",
              internalType: "string[]"
            },
            {
              name: "implementations",
              type: "address[]",
              internalType: "address[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getRoleAdmin",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "grantRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "hasRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "isFeatureAvailable",
          type: "function",
          inputs: [
            {
              name: "featureName",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [
            {
              name: "available",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "moduleActive",
          type: "function",
          inputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "moduleList",
          type: "function",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "modules",
          type: "function",
          inputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "proposalCounter",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "proposeUpgrade",
          type: "function",
          inputs: [
            {
              name: "description",
              type: "string",
              internalType: "string"
            },
            {
              name: "implementation",
              type: "address",
              internalType: "address"
            },
            {
              name: "data",
              type: "bytes",
              internalType: "bytes"
            },
            {
              name: "executionDelay",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "proposalId",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "renounceRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "callerConfirmation",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "revokeRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setFeatureEnabled",
          type: "function",
          inputs: [
            {
              name: "featureName",
              type: "string",
              internalType: "string"
            },
            {
              name: "enabled",
              type: "bool",
              internalType: "bool"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setModuleActive",
          type: "function",
          inputs: [
            {
              name: "moduleName",
              type: "string",
              internalType: "string"
            },
            {
              name: "active",
              type: "bool",
              internalType: "bool"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "supportedStandards",
          type: "function",
          inputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "supportsInterface",
          type: "function",
          inputs: [
            {
              name: "interfaceId",
              type: "bytes4",
              internalType: "bytes4"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "tokenStandardImplementations",
          type: "function",
          inputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "tokenStandards",
          type: "function",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "updateVersion",
          type: "function",
          inputs: [
            {
              name: "newVersion",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "newVersionString",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "upgradeProposals",
          type: "function",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "id",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "description",
              type: "string",
              internalType: "string"
            },
            {
              name: "implementation",
              type: "address",
              internalType: "address"
            },
            {
              name: "data",
              type: "bytes",
              internalType: "bytes"
            },
            {
              name: "proposedAt",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "executionDelay",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "executed",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "proposer",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "versionString",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "FeatureAdded",
          type: "event",
          inputs: [
            {
              name: "featureName",
              type: "string",
              indexed: true,
              internalType: "string"
            },
            {
              name: "implementation",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "FeatureEnabled",
          type: "event",
          inputs: [
            {
              name: "featureName",
              type: "string",
              indexed: true,
              internalType: "string"
            },
            {
              name: "enabled",
              type: "bool",
              indexed: false,
              internalType: "bool"
            }
          ],
          anonymous: false
        },
        {
          name: "ModuleActivated",
          type: "event",
          inputs: [
            {
              name: "moduleName",
              type: "string",
              indexed: true,
              internalType: "string"
            },
            {
              name: "active",
              type: "bool",
              indexed: false,
              internalType: "bool"
            }
          ],
          anonymous: false
        },
        {
          name: "ModuleAdded",
          type: "event",
          inputs: [
            {
              name: "moduleName",
              type: "string",
              indexed: true,
              internalType: "string"
            },
            {
              name: "implementation",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleAdminChanged",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "previousAdminRole",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "newAdminRole",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleGranted",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "sender",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleRevoked",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "sender",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "TokenStandardAdded",
          type: "event",
          inputs: [
            {
              name: "standard",
              type: "string",
              indexed: true,
              internalType: "string"
            },
            {
              name: "implementation",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "UpgradeExecuted",
          type: "event",
          inputs: [
            {
              name: "proposalId",
              type: "uint256",
              indexed: true,
              internalType: "uint256"
            },
            {
              name: "executor",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "UpgradeProposed",
          type: "event",
          inputs: [
            {
              name: "proposalId",
              type: "uint256",
              indexed: true,
              internalType: "uint256"
            },
            {
              name: "proposer",
              type: "address",
              indexed: false,
              internalType: "address"
            },
            {
              name: "description",
              type: "string",
              indexed: false,
              internalType: "string"
            }
          ],
          anonymous: false
        },
        {
          name: "VersionUpdated",
          type: "event",
          inputs: [
            {
              name: "oldVersion",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "newVersion",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "versionString",
              type: "string",
              indexed: false,
              internalType: "string"
            }
          ],
          anonymous: false
        },
        {
          name: "AccessControlBadConfirmation",
          type: "error",
          inputs: []
        },
        {
          name: "AccessControlUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            },
            {
              name: "neededRole",
              type: "bytes32",
              internalType: "bytes32"
            }
          ]
        }
      ],
      address: "0x809d550fca64d94bd9f66e60752a544199cfac3d",
      startBlock: "latest"
    },
    configmanager_anvil_0x4c58: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "admin",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "CONFIG_ADMIN_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "DEFAULT_ADMIN_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "addressConfigs",
          type: "function",
          inputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "allConfigKeys",
          type: "function",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "boolConfigs",
          type: "function",
          inputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "bytes32Configs",
          type: "function",
          inputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "configExists",
          type: "function",
          inputs: [
            {
              name: "key",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "configMetadata",
          type: "function",
          inputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [
            {
              name: "category",
              type: "uint8",
              internalType: "enum ConfigManager.ConfigCategory"
            },
            {
              name: "valueType",
              type: "uint8",
              internalType: "enum ConfigManager.ConfigType"
            },
            {
              name: "description",
              type: "string",
              internalType: "string"
            },
            {
              name: "lastUpdated",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "updatedBy",
              type: "address",
              internalType: "address"
            },
            {
              name: "exists",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "configsByCategory",
          type: "function",
          inputs: [
            {
              name: "",
              type: "uint8",
              internalType: "enum ConfigManager.ConfigCategory"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getAllConfigKeys",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string[]",
              internalType: "string[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getConfigMetadata",
          type: "function",
          inputs: [
            {
              name: "key",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [
            {
              name: "category",
              type: "uint8",
              internalType: "enum ConfigManager.ConfigCategory"
            },
            {
              name: "valueType",
              type: "uint8",
              internalType: "enum ConfigManager.ConfigType"
            },
            {
              name: "description",
              type: "string",
              internalType: "string"
            },
            {
              name: "lastUpdated",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "updatedBy",
              type: "address",
              internalType: "address"
            },
            {
              name: "exists",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getConfigsByCategory",
          type: "function",
          inputs: [
            {
              name: "category",
              type: "uint8",
              internalType: "enum ConfigManager.ConfigCategory"
            }
          ],
          outputs: [
            {
              name: "keys",
              type: "string[]",
              internalType: "string[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getRoleAdmin",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "grantRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "hasRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "removeConfig",
          type: "function",
          inputs: [
            {
              name: "key",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "renounceRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "callerConfirmation",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "revokeRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setAddressConfig",
          type: "function",
          inputs: [
            {
              name: "key",
              type: "string",
              internalType: "string"
            },
            {
              name: "value",
              type: "address",
              internalType: "address"
            },
            {
              name: "category",
              type: "uint8",
              internalType: "enum ConfigManager.ConfigCategory"
            },
            {
              name: "description",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setBoolConfig",
          type: "function",
          inputs: [
            {
              name: "key",
              type: "string",
              internalType: "string"
            },
            {
              name: "value",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "category",
              type: "uint8",
              internalType: "enum ConfigManager.ConfigCategory"
            },
            {
              name: "description",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setBytes32Config",
          type: "function",
          inputs: [
            {
              name: "key",
              type: "string",
              internalType: "string"
            },
            {
              name: "value",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "category",
              type: "uint8",
              internalType: "enum ConfigManager.ConfigCategory"
            },
            {
              name: "description",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setStringConfig",
          type: "function",
          inputs: [
            {
              name: "key",
              type: "string",
              internalType: "string"
            },
            {
              name: "value",
              type: "string",
              internalType: "string"
            },
            {
              name: "category",
              type: "uint8",
              internalType: "enum ConfigManager.ConfigCategory"
            },
            {
              name: "description",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setUintConfig",
          type: "function",
          inputs: [
            {
              name: "key",
              type: "string",
              internalType: "string"
            },
            {
              name: "value",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "category",
              type: "uint8",
              internalType: "enum ConfigManager.ConfigCategory"
            },
            {
              name: "description",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "stringConfigs",
          type: "function",
          inputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "supportsInterface",
          type: "function",
          inputs: [
            {
              name: "interfaceId",
              type: "bytes4",
              internalType: "bytes4"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "uintConfigs",
          type: "function",
          inputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "ConfigRemoved",
          type: "event",
          inputs: [
            {
              name: "key",
              type: "string",
              indexed: true,
              internalType: "string"
            },
            {
              name: "removedBy",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "ConfigSet",
          type: "event",
          inputs: [
            {
              name: "key",
              type: "string",
              indexed: true,
              internalType: "string"
            },
            {
              name: "category",
              type: "uint8",
              indexed: true,
              internalType: "enum ConfigManager.ConfigCategory"
            },
            {
              name: "valueType",
              type: "uint8",
              indexed: true,
              internalType: "enum ConfigManager.ConfigType"
            },
            {
              name: "updatedBy",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleAdminChanged",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "previousAdminRole",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "newAdminRole",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleGranted",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "sender",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleRevoked",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "sender",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "AccessControlBadConfirmation",
          type: "error",
          inputs: []
        },
        {
          name: "AccessControlUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            },
            {
              name: "neededRole",
              type: "bytes32",
              internalType: "bytes32"
            }
          ]
        }
      ],
      address: "0x4c5859f0f772848b2d91f1d83e2fe57935348029",
      startBlock: "latest"
    },
    collectionregistry_anvil_0x4ed7: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "admin",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "ADMIN_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "DEFAULT_ADMIN_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getAllFactories",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "tokenTypes",
              type: "string[]",
              internalType: "string[]"
            },
            {
              name: "factories",
              type: "address[]",
              internalType: "address[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getFactory",
          type: "function",
          inputs: [
            {
              name: "tokenType",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getRoleAdmin",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "grantRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "hasRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "isRegisteredFactory",
          type: "function",
          inputs: [
            {
              name: "factory",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "isVerifiedCollection",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "registerCollection",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenType",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "registerFactory",
          type: "function",
          inputs: [
            {
              name: "tokenType",
              type: "string",
              internalType: "string"
            },
            {
              name: "factory",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "renounceRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "callerConfirmation",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "revokeRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "supportsInterface",
          type: "function",
          inputs: [
            {
              name: "interfaceId",
              type: "bytes4",
              internalType: "bytes4"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "updateFactory",
          type: "function",
          inputs: [
            {
              name: "tokenType",
              type: "string",
              internalType: "string"
            },
            {
              name: "newFactory",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "verifyCollection",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "isValid",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "tokenType",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "CollectionVerified",
          type: "event",
          inputs: [
            {
              name: "collection",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "tokenType",
              type: "string",
              indexed: false,
              internalType: "string"
            }
          ],
          anonymous: false
        },
        {
          name: "FactoryRegistered",
          type: "event",
          inputs: [
            {
              name: "tokenType",
              type: "string",
              indexed: true,
              internalType: "string"
            },
            {
              name: "factory",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "FactoryUpdated",
          type: "event",
          inputs: [
            {
              name: "tokenType",
              type: "string",
              indexed: true,
              internalType: "string"
            },
            {
              name: "oldFactory",
              type: "address",
              indexed: false,
              internalType: "address"
            },
            {
              name: "newFactory",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleAdminChanged",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "previousAdminRole",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "newAdminRole",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleGranted",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "sender",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleRevoked",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "sender",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "AccessControlBadConfirmation",
          type: "error",
          inputs: []
        },
        {
          name: "AccessControlUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            },
            {
              name: "neededRole",
              type: "bytes32",
              internalType: "bytes32"
            }
          ]
        },
        {
          name: "CollectionRegistry__CollectionNotVerified",
          type: "error",
          inputs: []
        },
        {
          name: "CollectionRegistry__FactoryAlreadyRegistered",
          type: "error",
          inputs: []
        },
        {
          name: "CollectionRegistry__FactoryNotRegistered",
          type: "error",
          inputs: []
        },
        {
          name: "CollectionRegistry__InvalidTokenType",
          type: "error",
          inputs: []
        },
        {
          name: "CollectionRegistry__ZeroAddress",
          type: "error",
          inputs: []
        }
      ],
      address: "0x4ed7c70f96b99c776995fb64377f0d4ab3b0e1c1",
      startBlock: "latest"
    },
    feeregistry_anvil_0x3228: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "admin",
              type: "address",
              internalType: "address"
            },
            {
              name: "baseFee",
              type: "address",
              internalType: "address"
            },
            {
              name: "feeManager",
              type: "address",
              internalType: "address"
            },
            {
              name: "royaltyManager",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "ADMIN_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "DEFAULT_ADMIN_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "calculateAllFees",
          type: "function",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "salePrice",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "breakdown",
              type: "tuple",
              components: [
                {
                  name: "platformFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "royaltyFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "royaltyRecipient",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "totalFees",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "sellerProceeds",
                  type: "uint256",
                  internalType: "uint256"
                }
              ],
              internalType: "struct IFeeRegistry.FeeBreakdown"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "calculatePlatformFee",
          type: "function",
          inputs: [
            {
              name: "salePrice",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "calculateRoyalty",
          type: "function",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "salePrice",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "recipient",
              type: "address",
              internalType: "address"
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getBaseFeeContract",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getFeeManagerContract",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getPlatformFeePercentage",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getRoleAdmin",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getRoyaltyManagerContract",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "grantRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "hasRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "renounceRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "callerConfirmation",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "revokeRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "supportsInterface",
          type: "function",
          inputs: [
            {
              name: "interfaceId",
              type: "bytes4",
              internalType: "bytes4"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "updateFeeContracts",
          type: "function",
          inputs: [
            {
              name: "baseFee",
              type: "address",
              internalType: "address"
            },
            {
              name: "feeManager",
              type: "address",
              internalType: "address"
            },
            {
              name: "royaltyManager",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "FeeContractsUpdated",
          type: "event",
          inputs: [
            {
              name: "baseFee",
              type: "address",
              indexed: false,
              internalType: "address"
            },
            {
              name: "feeManager",
              type: "address",
              indexed: false,
              internalType: "address"
            },
            {
              name: "royaltyManager",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleAdminChanged",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "previousAdminRole",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "newAdminRole",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleGranted",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "sender",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleRevoked",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "sender",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "AccessControlBadConfirmation",
          type: "error",
          inputs: []
        },
        {
          name: "AccessControlUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            },
            {
              name: "neededRole",
              type: "bytes32",
              internalType: "bytes32"
            }
          ]
        },
        {
          name: "FeeRegistry__ContractNotSet",
          type: "error",
          inputs: []
        },
        {
          name: "FeeRegistry__ZeroAddress",
          type: "error",
          inputs: []
        }
      ],
      address: "0x322813fd9a801c5507c9de605d63cea4f2ce6c44",
      startBlock: "latest"
    },
    adminhub_anvil_0x4a67: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "admin",
              type: "address",
              internalType: "address"
            },
            {
              name: "_exchangeRegistry",
              type: "address",
              internalType: "address"
            },
            {
              name: "_collectionRegistry",
              type: "address",
              internalType: "address"
            },
            {
              name: "_feeRegistry",
              type: "address",
              internalType: "address"
            },
            {
              name: "_auctionRegistry",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "ADMIN_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "DEFAULT_ADMIN_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "accessControl",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "auctionRegistry",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract IAuctionRegistry"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "collectionRegistry",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract ICollectionRegistry"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "configManager",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "emergencyManager",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "emergencyPause",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "exchangeRegistry",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract IExchangeRegistry"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "feeRegistry",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract IFeeRegistry"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getAllRegistries",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "exchange",
              type: "address",
              internalType: "address"
            },
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "fee",
              type: "address",
              internalType: "address"
            },
            {
              name: "auction",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getManagementContracts",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getRoleAdmin",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "grantRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "hasRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "historyTracker",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "listingValidator",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "registerAuction",
          type: "function",
          inputs: [
            {
              name: "auctionType",
              type: "uint8",
              internalType: "enum IAuctionRegistry.AuctionType"
            },
            {
              name: "auction",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "registerCollectionFactory",
          type: "function",
          inputs: [
            {
              name: "tokenType",
              type: "string",
              internalType: "string"
            },
            {
              name: "factory",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "registerExchange",
          type: "function",
          inputs: [
            {
              name: "standard",
              type: "uint8",
              internalType: "enum IExchangeRegistry.TokenStandard"
            },
            {
              name: "exchange",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "renounceRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "callerConfirmation",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "revokeRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "roleManager",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "setAdditionalContracts",
          type: "function",
          inputs: [
            {
              name: "_listingValidator",
              type: "address",
              internalType: "address"
            },
            {
              name: "_emergencyManager",
              type: "address",
              internalType: "address"
            },
            {
              name: "_accessControl",
              type: "address",
              internalType: "address"
            },
            {
              name: "_historyTracker",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setManagementContracts",
          type: "function",
          inputs: [
            {
              name: "_roleManager",
              type: "address",
              internalType: "address"
            },
            {
              name: "_upgradeManager",
              type: "address",
              internalType: "address"
            },
            {
              name: "_configManager",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "supportsInterface",
          type: "function",
          inputs: [
            {
              name: "interfaceId",
              type: "bytes4",
              internalType: "bytes4"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "updateAuctionFactory",
          type: "function",
          inputs: [
            {
              name: "factory",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "upgradeManager",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "ContractsConfigured",
          type: "event",
          inputs: [
            {
              name: "listingValidator",
              type: "address",
              indexed: false,
              internalType: "address"
            },
            {
              name: "emergencyManager",
              type: "address",
              indexed: false,
              internalType: "address"
            },
            {
              name: "accessControl",
              type: "address",
              indexed: false,
              internalType: "address"
            },
            {
              name: "historyTracker",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleAdminChanged",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "previousAdminRole",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "newAdminRole",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleGranted",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "sender",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleRevoked",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "sender",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "AccessControlBadConfirmation",
          type: "error",
          inputs: []
        },
        {
          name: "AccessControlUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            },
            {
              name: "neededRole",
              type: "bytes32",
              internalType: "bytes32"
            }
          ]
        }
      ],
      address: "0x4a679253410272dd5232b3ff7cf5dbb88f295319",
      startBlock: "latest"
    },
    auctionregistry_anvil_0xa852: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "admin",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "ADMIN_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "DEFAULT_ADMIN_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getAllAuctions",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "types",
              type: "uint8[]",
              internalType: "enum IAuctionRegistry.AuctionType[]"
            },
            {
              name: "contracts",
              type: "address[]",
              internalType: "address[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getAuctionContract",
          type: "function",
          inputs: [
            {
              name: "auctionType",
              type: "uint8",
              internalType: "enum IAuctionRegistry.AuctionType"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getAuctionFactory",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getRoleAdmin",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "grantRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "hasRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "isRegisteredAuction",
          type: "function",
          inputs: [
            {
              name: "auctionContract",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "registerAuction",
          type: "function",
          inputs: [
            {
              name: "auctionType",
              type: "uint8",
              internalType: "enum IAuctionRegistry.AuctionType"
            },
            {
              name: "auctionContract",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "renounceRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "callerConfirmation",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "revokeRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "supportsInterface",
          type: "function",
          inputs: [
            {
              name: "interfaceId",
              type: "bytes4",
              internalType: "bytes4"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "updateAuctionFactory",
          type: "function",
          inputs: [
            {
              name: "newFactory",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "AuctionFactoryUpdated",
          type: "event",
          inputs: [
            {
              name: "oldFactory",
              type: "address",
              indexed: false,
              internalType: "address"
            },
            {
              name: "newFactory",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "AuctionRegistered",
          type: "event",
          inputs: [
            {
              name: "auctionType",
              type: "uint8",
              indexed: true,
              internalType: "enum IAuctionRegistry.AuctionType"
            },
            {
              name: "auctionContract",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleAdminChanged",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "previousAdminRole",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "newAdminRole",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleGranted",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "sender",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleRevoked",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "sender",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "AccessControlBadConfirmation",
          type: "error",
          inputs: []
        },
        {
          name: "AccessControlUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            },
            {
              name: "neededRole",
              type: "bytes32",
              internalType: "bytes32"
            }
          ]
        },
        {
          name: "AuctionRegistry__AuctionAlreadyRegistered",
          type: "error",
          inputs: []
        },
        {
          name: "AuctionRegistry__AuctionNotRegistered",
          type: "error",
          inputs: []
        },
        {
          name: "AuctionRegistry__FactoryNotSet",
          type: "error",
          inputs: []
        },
        {
          name: "AuctionRegistry__ZeroAddress",
          type: "error",
          inputs: []
        }
      ],
      address: "0xa85233c63b9ee964add6f2cffe00fd84eb32338f",
      startBlock: "latest"
    },
    userhub_anvil_0x5eb3: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "_exchangeRegistry",
              type: "address",
              internalType: "address"
            },
            {
              name: "_collectionRegistry",
              type: "address",
              internalType: "address"
            },
            {
              name: "_feeRegistry",
              type: "address",
              internalType: "address"
            },
            {
              name: "_auctionRegistry",
              type: "address",
              internalType: "address"
            },
            {
              name: "_bundleManager",
              type: "address",
              internalType: "address"
            },
            {
              name: "_offerManager",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "accessControl",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "auctionRegistry",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract IAuctionRegistry"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "bundleManager",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "collectionRegistry",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract ICollectionRegistry"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "emergencyManager",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "exchangeRegistry",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract IExchangeRegistry"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "feeRegistry",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract IFeeRegistry"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getAccessControl",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getAdditionalAddresses",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "listingValidatorAddr",
              type: "address",
              internalType: "address"
            },
            {
              name: "emergencyManagerAddr",
              type: "address",
              internalType: "address"
            },
            {
              name: "accessControlAddr",
              type: "address",
              internalType: "address"
            },
            {
              name: "historyTrackerAddr",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getAllAddresses",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "erc721Exchange",
              type: "address",
              internalType: "address"
            },
            {
              name: "erc1155Exchange",
              type: "address",
              internalType: "address"
            },
            {
              name: "erc721Factory",
              type: "address",
              internalType: "address"
            },
            {
              name: "erc1155Factory",
              type: "address",
              internalType: "address"
            },
            {
              name: "englishAuction",
              type: "address",
              internalType: "address"
            },
            {
              name: "dutchAuction",
              type: "address",
              internalType: "address"
            },
            {
              name: "auctionFactory",
              type: "address",
              internalType: "address"
            },
            {
              name: "feeRegistryAddr",
              type: "address",
              internalType: "address"
            },
            {
              name: "bundleManagerAddr",
              type: "address",
              internalType: "address"
            },
            {
              name: "offerManagerAddr",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getAllRegistries",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "exchange",
              type: "address",
              internalType: "address"
            },
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "fee",
              type: "address",
              internalType: "address"
            },
            {
              name: "auction",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getAuctionFor",
          type: "function",
          inputs: [
            {
              name: "auctionType",
              type: "uint8",
              internalType: "enum IAuctionRegistry.AuctionType"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getBundleManager",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getEmergencyManager",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getExchangeFor",
          type: "function",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getFactoryFor",
          type: "function",
          inputs: [
            {
              name: "tokenType",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getFeeRegistry",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getHistoryTracker",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getListingValidator",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getOfferManager",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getSystemStatus",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "isHealthy",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "activeContracts",
              type: "address[]",
              internalType: "address[]"
            },
            {
              name: "timestamp",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "historyTracker",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "isPaused",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "listingValidator",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "offerManager",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "updateAdditionalContracts",
          type: "function",
          inputs: [
            {
              name: "_listingValidator",
              type: "address",
              internalType: "address"
            },
            {
              name: "_emergencyManager",
              type: "address",
              internalType: "address"
            },
            {
              name: "_accessControl",
              type: "address",
              internalType: "address"
            },
            {
              name: "_historyTracker",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "verifyCollection",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "UserHub__ContractNotSupported",
          type: "error",
          inputs: []
        },
        {
          name: "UserHub__ZeroAddress",
          type: "error",
          inputs: []
        }
      ],
      address: "0x5eb3bc0a489c5a8288765d2336659ebca68fcd00",
      startBlock: "latest"
    },
    advancedlistingmanager_anvil_0x3aa5: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "_accessControl",
              type: "address",
              internalType: "address"
            },
            {
              name: "_validator",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "accessControl",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract MarketplaceAccessControl"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "auctionParams",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "startingPrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "reservePrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "buyNowPrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "bidIncrement",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "duration",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "extendOnBid",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "extensionTime",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "bundles",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "bundleId",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "bundleType",
              type: "uint8",
              internalType: "enum BundleType"
            },
            {
              name: "creator",
              type: "address",
              internalType: "address"
            },
            {
              name: "name",
              type: "string",
              internalType: "string"
            },
            {
              name: "description",
              type: "string",
              internalType: "string"
            },
            {
              name: "totalPrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "createdAt",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "isActive",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "buyDutchAuction",
          type: "function",
          inputs: [
            {
              name: "listingId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [],
          stateMutability: "payable"
        },
        {
          name: "buyNow",
          type: "function",
          inputs: [
            {
              name: "listingId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [],
          stateMutability: "payable"
        },
        {
          name: "buyerStats",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "totalPurchases",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "totalSpent",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "averagePurchasePrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "totalOffers",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "acceptedOffers",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "rating",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "totalRatings",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "cancelListing",
          type: "function",
          inputs: [
            {
              name: "listingId",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "reason",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "createAuctionListing",
          type: "function",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "quantity",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "params",
              type: "tuple",
              components: [
                {
                  name: "startingPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "reservePrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "buyNowPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "bidIncrement",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "duration",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "extendOnBid",
                  type: "bool",
                  internalType: "bool"
                },
                {
                  name: "extensionTime",
                  type: "uint256",
                  internalType: "uint256"
                }
              ],
              internalType: "struct AuctionParams"
            }
          ],
          outputs: [
            {
              name: "listingId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "createDutchAuctionListing",
          type: "function",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "quantity",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "params",
              type: "tuple",
              components: [
                {
                  name: "startingPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "endingPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "duration",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "priceDropInterval",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "priceDropAmount",
                  type: "uint256",
                  internalType: "uint256"
                }
              ],
              internalType: "struct DutchAuctionParams"
            }
          ],
          outputs: [
            {
              name: "listingId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "createFixedPriceListing",
          type: "function",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "quantity",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "price",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "duration",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "acceptOffers",
              type: "bool",
              internalType: "bool"
            }
          ],
          outputs: [
            {
              name: "listingId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "dutchAuctionParams",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "startingPrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "endingPrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "duration",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "priceDropInterval",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "priceDropAmount",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "emergencyPause",
          type: "function",
          inputs: [
            {
              name: "reason",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "getAuctionParams",
          type: "function",
          inputs: [
            {
              name: "listingId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "params",
              type: "tuple",
              components: [
                {
                  name: "startingPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "reservePrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "buyNowPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "bidIncrement",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "duration",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "extendOnBid",
                  type: "bool",
                  internalType: "bool"
                },
                {
                  name: "extensionTime",
                  type: "uint256",
                  internalType: "uint256"
                }
              ],
              internalType: "struct AuctionParams"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getBuyerStats",
          type: "function",
          inputs: [
            {
              name: "buyer",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "stats",
              type: "tuple",
              components: [
                {
                  name: "totalPurchases",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "totalSpent",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "averagePurchasePrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "totalOffers",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "acceptedOffers",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "rating",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "totalRatings",
                  type: "uint256",
                  internalType: "uint256"
                }
              ],
              internalType: "struct BuyerStats"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getCurrentDutchAuctionPrice",
          type: "function",
          inputs: [
            {
              name: "listingId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "currentPrice",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getDutchAuctionParams",
          type: "function",
          inputs: [
            {
              name: "listingId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "params",
              type: "tuple",
              components: [
                {
                  name: "startingPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "endingPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "duration",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "priceDropInterval",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "priceDropAmount",
                  type: "uint256",
                  internalType: "uint256"
                }
              ],
              internalType: "struct DutchAuctionParams"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getGlobalStats",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "stats",
              type: "tuple",
              components: [
                {
                  name: "totalListings",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "activeListings",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "soldListings",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "totalVolume",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "averagePrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "totalOffers",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "acceptedOffers",
                  type: "uint256",
                  internalType: "uint256"
                }
              ],
              internalType: "struct ListingStats"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getListing",
          type: "function",
          inputs: [
            {
              name: "listingId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "listing",
              type: "tuple",
              components: [
                {
                  name: "listingId",
                  type: "bytes32",
                  internalType: "bytes32"
                },
                {
                  name: "seller",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "price",
                  type: "uint96",
                  internalType: "uint96"
                },
                {
                  name: "nftContract",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "tokenId",
                  type: "uint96",
                  internalType: "uint96"
                },
                {
                  name: "startTime",
                  type: "uint64",
                  internalType: "uint64"
                },
                {
                  name: "endTime",
                  type: "uint64",
                  internalType: "uint64"
                },
                {
                  name: "minOfferPrice",
                  type: "uint64",
                  internalType: "uint64"
                },
                {
                  name: "quantity",
                  type: "uint32",
                  internalType: "uint32"
                },
                {
                  name: "listingType",
                  type: "uint8",
                  internalType: "enum ListingType"
                },
                {
                  name: "status",
                  type: "uint8",
                  internalType: "enum ListingStatus"
                },
                {
                  name: "acceptOffers",
                  type: "bool",
                  internalType: "bool"
                },
                {
                  name: "bundleId",
                  type: "bytes32",
                  internalType: "bytes32"
                },
                {
                  name: "metadata",
                  type: "bytes",
                  internalType: "bytes"
                }
              ],
              internalType: "struct Listing"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getListingFees",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "fees",
              type: "tuple",
              components: [
                {
                  name: "baseFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "percentageFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "auctionFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "bundleFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "offerFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "feeRecipient",
                  type: "address",
                  internalType: "address"
                }
              ],
              internalType: "struct ListingFees"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getSellerStats",
          type: "function",
          inputs: [
            {
              name: "seller",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "stats",
              type: "tuple",
              components: [
                {
                  name: "totalListings",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "successfulSales",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "totalRevenue",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "averageSaleTime",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "cancelledListings",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "rating",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "totalRatings",
                  type: "uint256",
                  internalType: "uint256"
                }
              ],
              internalType: "struct SellerStats"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getTimeConstraints",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "constraints",
              type: "tuple",
              components: [
                {
                  name: "minListingDuration",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "maxListingDuration",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "minAuctionDuration",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "maxAuctionDuration",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "offerValidityPeriod",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "gracePeriod",
                  type: "uint256",
                  internalType: "uint256"
                }
              ],
              internalType: "struct TimeConstraints"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getUserListings",
          type: "function",
          inputs: [
            {
              name: "user",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "listingIds",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getUserOffers",
          type: "function",
          inputs: [
            {
              name: "user",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "offerIds",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "globalStats",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "totalListings",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "activeListings",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "soldListings",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "totalVolume",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "averagePrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "totalOffers",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "acceptedOffers",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "isContractSupported",
          type: "function",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "isSupported",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "listingFees",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "baseFee",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "percentageFee",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "auctionFee",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "bundleFee",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "offerFee",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "feeRecipient",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "listings",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "listingId",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "seller",
              type: "address",
              internalType: "address"
            },
            {
              name: "price",
              type: "uint96",
              internalType: "uint96"
            },
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint96",
              internalType: "uint96"
            },
            {
              name: "startTime",
              type: "uint64",
              internalType: "uint64"
            },
            {
              name: "endTime",
              type: "uint64",
              internalType: "uint64"
            },
            {
              name: "minOfferPrice",
              type: "uint64",
              internalType: "uint64"
            },
            {
              name: "quantity",
              type: "uint32",
              internalType: "uint32"
            },
            {
              name: "listingType",
              type: "uint8",
              internalType: "enum ListingType"
            },
            {
              name: "status",
              type: "uint8",
              internalType: "enum ListingStatus"
            },
            {
              name: "acceptOffers",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "bundleId",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "metadata",
              type: "bytes",
              internalType: "bytes"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "maxListingsPerUser",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "maxOffersPerUser",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "offers",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "offerId",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "offerType",
              type: "uint8",
              internalType: "enum OfferType"
            },
            {
              name: "status",
              type: "uint8",
              internalType: "enum OfferStatus"
            },
            {
              name: "buyer",
              type: "address",
              internalType: "address"
            },
            {
              name: "listingId",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "quantity",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "timestamp",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "expiry",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "traitRequirements",
              type: "bytes",
              internalType: "bytes"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "owner",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "paused",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "renounceOwnership",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "sellerStats",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "totalListings",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "successfulSales",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "totalRevenue",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "averageSaleTime",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "cancelledListings",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "rating",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "totalRatings",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "setSupportedContract",
          type: "function",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            },
            {
              name: "isSupported",
              type: "bool",
              internalType: "bool"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "supportedContracts",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "timeConstraints",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "minListingDuration",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "maxListingDuration",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "minAuctionDuration",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "maxAuctionDuration",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "offerValidityPeriod",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "gracePeriod",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "tokenListings",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "transferOwnership",
          type: "function",
          inputs: [
            {
              name: "newOwner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "unpause",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "updateAccessControl",
          type: "function",
          inputs: [
            {
              name: "newAccessControl",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "updateListing",
          type: "function",
          inputs: [
            {
              name: "listingId",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "newPrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "newEndTime",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "updateListingFees",
          type: "function",
          inputs: [
            {
              name: "newFees",
              type: "tuple",
              components: [
                {
                  name: "baseFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "percentageFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "auctionFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "bundleFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "offerFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "feeRecipient",
                  type: "address",
                  internalType: "address"
                }
              ],
              internalType: "struct ListingFees"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "updateTimeConstraints",
          type: "function",
          inputs: [
            {
              name: "newConstraints",
              type: "tuple",
              components: [
                {
                  name: "minListingDuration",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "maxListingDuration",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "minAuctionDuration",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "maxAuctionDuration",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "offerValidityPeriod",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "gracePeriod",
                  type: "uint256",
                  internalType: "uint256"
                }
              ],
              internalType: "struct TimeConstraints"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "updateUserLimits",
          type: "function",
          inputs: [
            {
              name: "newMaxListings",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "newMaxOffers",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "updateValidator",
          type: "function",
          inputs: [
            {
              name: "newValidator",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "userListings",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "userOffers",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "validator",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract MarketplaceValidator"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "AuctionCreated",
          type: "event",
          inputs: [
            {
              name: "listingId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "auctionType",
              type: "uint8",
              indexed: true,
              internalType: "enum ListingType"
            },
            {
              name: "seller",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "startingPrice",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "reservePrice",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "duration",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "timestamp",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "ContractPaused",
          type: "event",
          inputs: [
            {
              name: "pausedBy",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "reason",
              type: "string",
              indexed: false,
              internalType: "string"
            },
            {
              name: "timestamp",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "ContractUnpaused",
          type: "event",
          inputs: [
            {
              name: "unpausedBy",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "timestamp",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "FeeUpdated",
          type: "event",
          inputs: [
            {
              name: "feeType",
              type: "string",
              indexed: false,
              internalType: "string"
            },
            {
              name: "oldFee",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "newFee",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "updatedBy",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "timestamp",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "ListingCancelled",
          type: "event",
          inputs: [
            {
              name: "listingId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "seller",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "reason",
              type: "string",
              indexed: false,
              internalType: "string"
            },
            {
              name: "timestamp",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "ListingCreated",
          type: "event",
          inputs: [
            {
              name: "listingId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "listingType",
              type: "uint8",
              indexed: true,
              internalType: "enum ListingType"
            },
            {
              name: "seller",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "nftContract",
              type: "address",
              indexed: false,
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "quantity",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "price",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "startTime",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "endTime",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "ListingUpdated",
          type: "event",
          inputs: [
            {
              name: "listingId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "seller",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "oldPrice",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "newPrice",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "oldEndTime",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "newEndTime",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "timestamp",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "NFTPurchased",
          type: "event",
          inputs: [
            {
              name: "listingId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "buyer",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "seller",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "nftContract",
              type: "address",
              indexed: false,
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "quantity",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "price",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "fees",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "timestamp",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "OwnershipTransferred",
          type: "event",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "Paused",
          type: "event",
          inputs: [
            {
              name: "account",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "Unpaused",
          type: "event",
          inputs: [
            {
              name: "account",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "AdvancedListing__CannotBuyOwnListing",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__FeeTooHigh",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__IncorrectPayment",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__InsufficientQuantity",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__InvalidAuctionParams",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__InvalidDuration",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__InvalidDutchAuctionParams",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__InvalidParameter",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__InvalidPrice",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__InvalidTimeParams",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__ListingExpired",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__ListingNotActive",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__ListingNotFound",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__ListingNotStarted",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__MaxListingsExceeded",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__MissingRole",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__NotApproved",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__NotSeller",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__NotTokenOwner",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__PaymentFailed",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__TokenAlreadyListed",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__TransferFailed",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__UnsupportedListingType",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__UnsupportedNFTContract",
          type: "error",
          inputs: []
        },
        {
          name: "AdvancedListing__ZeroAddress",
          type: "error",
          inputs: []
        },
        {
          name: "EnforcedPause",
          type: "error",
          inputs: []
        },
        {
          name: "ExpectedPause",
          type: "error",
          inputs: []
        },
        {
          name: "OwnableInvalidOwner",
          type: "error",
          inputs: [
            {
              name: "owner",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "OwnableUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "ReentrancyGuardReentrantCall",
          type: "error",
          inputs: []
        }
      ],
      address: "0x3aa5ebb10dc797cac828524e59a333d0a371443c",
      startBlock: "latest"
    },
    offermanager_anvil_0x9a9f: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "_accessControl",
              type: "address",
              internalType: "address"
            },
            {
              name: "_feeManager",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "MAX_OFFER_DURATION",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "MIN_OFFER_DURATION",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "acceptCollectionOffer",
          type: "function",
          inputs: [
            {
              name: "offerId",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "acceptNFTOffer",
          type: "function",
          inputs: [
            {
              name: "offerId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "accessControl",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract MarketplaceAccessControl"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "activeCollectionOffers",
          type: "function",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "activeNFTOffers",
          type: "function",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "activeOfferIndex",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "activeTraitOffers",
          type: "function",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "cancelOffer",
          type: "function",
          inputs: [
            {
              name: "offerId",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "reason",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "collectionOfferIds",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "collectionOfferProgress",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "filled",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "expiration",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "createdAt",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "paymentToken",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "collectionOffers",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "offerId",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "offerer",
              type: "address",
              internalType: "address"
            },
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "quantity",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "status",
              type: "uint8",
              internalType: "enum OfferManager.OfferStatus"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "createCollectionOffer",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "paymentToken",
              type: "address",
              internalType: "address"
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "quantity",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "expiration",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "offerId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "payable"
        },
        {
          name: "createNFTOffer",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "paymentToken",
              type: "address",
              internalType: "address"
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "expiration",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "offerId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "payable"
        },
        {
          name: "createTraitOffer",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "traitType",
              type: "string",
              internalType: "string"
            },
            {
              name: "traitValue",
              type: "string",
              internalType: "string"
            },
            {
              name: "paymentToken",
              type: "address",
              internalType: "address"
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "quantity",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "expiration",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "offerId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "payable"
        },
        {
          name: "excludedTokens",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "feeManager",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract AdvancedFeeManager"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getActiveOffers",
          type: "function",
          inputs: [
            {
              name: "offerType",
              type: "uint8",
              internalType: "enum OfferManager.OfferType"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getOffersByCollection",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "offerType",
              type: "uint8",
              internalType: "enum OfferManager.OfferType"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getOffersByOfferer",
          type: "function",
          inputs: [
            {
              name: "offerer",
              type: "address",
              internalType: "address"
            },
            {
              name: "offerType",
              type: "uint8",
              internalType: "enum OfferManager.OfferType"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "nftOfferDetails",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "paymentToken",
              type: "address",
              internalType: "address"
            },
            {
              name: "acceptedBy",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "nftOfferIds",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "nftOfferTiming",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "expiration",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "createdAt",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "acceptedAt",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "nftOffers",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "offerId",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "offerer",
              type: "address",
              internalType: "address"
            },
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "status",
              type: "uint8",
              internalType: "enum OfferManager.OfferStatus"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "offerCounter",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "owner",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "pause",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "paused",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "renounceOwnership",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "totalOffersAccepted",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "totalOffersCreated",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "traitOfferDetails",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "traitType",
              type: "string",
              internalType: "string"
            },
            {
              name: "traitValue",
              type: "string",
              internalType: "string"
            },
            {
              name: "paymentToken",
              type: "address",
              internalType: "address"
            },
            {
              name: "expiration",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "createdAt",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "filled",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "traitOffers",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "offerId",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "offerer",
              type: "address",
              internalType: "address"
            },
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "quantity",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "status",
              type: "uint8",
              internalType: "enum OfferManager.OfferStatus"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "transferOwnership",
          type: "function",
          inputs: [
            {
              name: "newOwner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "unpause",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "userOffers",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "CollectionOfferFilled",
          type: "event",
          inputs: [
            {
              name: "offerId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "seller",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              indexed: true,
              internalType: "uint256"
            },
            {
              name: "amount",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "OfferAccepted",
          type: "event",
          inputs: [
            {
              name: "offerId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "accepter",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "collection",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "amount",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "OfferCancelled",
          type: "event",
          inputs: [
            {
              name: "offerId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "offerer",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "reason",
              type: "string",
              indexed: false,
              internalType: "string"
            }
          ],
          anonymous: false
        },
        {
          name: "OfferCreated",
          type: "event",
          inputs: [
            {
              name: "offerId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "offerer",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "collection",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "amount",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "offerType",
              type: "uint8",
              indexed: false,
              internalType: "enum OfferManager.OfferType"
            }
          ],
          anonymous: false
        },
        {
          name: "OfferExpired",
          type: "event",
          inputs: [
            {
              name: "offerId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "offerer",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "OwnershipTransferred",
          type: "event",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "Paused",
          type: "event",
          inputs: [
            {
              name: "account",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "TraitOfferFilled",
          type: "event",
          inputs: [
            {
              name: "offerId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "seller",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              indexed: true,
              internalType: "uint256"
            },
            {
              name: "traitType",
              type: "string",
              indexed: false,
              internalType: "string"
            },
            {
              name: "traitValue",
              type: "string",
              indexed: false,
              internalType: "string"
            }
          ],
          anonymous: false
        },
        {
          name: "Unpaused",
          type: "event",
          inputs: [
            {
              name: "account",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "EnforcedPause",
          type: "error",
          inputs: []
        },
        {
          name: "ExpectedPause",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__InvalidCollection",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__InvalidDuration",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__InvalidListing",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__InvalidOwner",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__InvalidParameters",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__InvalidPrice",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__InvalidQuantity",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__ListingExpired",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__NotTheOwner",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__TransferToSellerFailed",
          type: "error",
          inputs: []
        },
        {
          name: "OwnableInvalidOwner",
          type: "error",
          inputs: [
            {
              name: "owner",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "OwnableUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "ReentrancyGuardReentrantCall",
          type: "error",
          inputs: []
        },
        {
          name: "SafeERC20FailedOperation",
          type: "error",
          inputs: [
            {
              name: "token",
              type: "address",
              internalType: "address"
            }
          ]
        }
      ],
      address: "0x9a9f2ccfde556a7e9ff0848998aa4a0cfd8863ae",
      startBlock: "latest"
    },
    bundlemanager_anvil_0x68b1: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "_accessControl",
              type: "address",
              internalType: "address"
            },
            {
              name: "_feeManager",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "MAX_BUNDLE_DURATION",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "MAX_NFTS_PER_BUNDLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "MIN_BUNDLE_DURATION",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "accessControl",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract MarketplaceAccessControl"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "allBundles",
          type: "function",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "bundleCounter",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "bundleItems",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "tokenType",
              type: "uint8",
              internalType: "enum BundleManager.TokenType"
            },
            {
              name: "isIncluded",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "bundleMetadata",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "buyer",
              type: "address",
              internalType: "address"
            },
            {
              name: "description",
              type: "string",
              internalType: "string"
            },
            {
              name: "imageUrl",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "bundleTiming",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "startTime",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "endTime",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "createdAt",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "soldAt",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "bundles",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "bundleId",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "seller",
              type: "address",
              internalType: "address"
            },
            {
              name: "totalPrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "discountPercentage",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "paymentToken",
              type: "address",
              internalType: "address"
            },
            {
              name: "status",
              type: "uint8",
              internalType: "enum BundleManager.BundleStatus"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "cancelBundle",
          type: "function",
          inputs: [
            {
              name: "bundleId",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "reason",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "createBundle",
          type: "function",
          inputs: [
            {
              name: "items",
              type: "tuple[]",
              components: [
                {
                  name: "collection",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "tokenId",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "amount",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "tokenType",
                  type: "uint8",
                  internalType: "enum BundleManager.TokenType"
                },
                {
                  name: "isIncluded",
                  type: "bool",
                  internalType: "bool"
                }
              ],
              internalType: "struct BundleManager.BundleItem[]"
            },
            {
              name: "totalPrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "discountPercentage",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "paymentToken",
              type: "address",
              internalType: "address"
            },
            {
              name: "endTime",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "description",
              type: "string",
              internalType: "string"
            },
            {
              name: "imageUrl",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "feeManager",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract AdvancedFeeManager"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getActiveBundles",
          type: "function",
          inputs: [
            {
              name: "offset",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "limit",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getBundleBasicInfo",
          type: "function",
          inputs: [
            {
              name: "bundleId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint8",
              internalType: "enum BundleManager.BundleStatus"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getBundleMetadata",
          type: "function",
          inputs: [
            {
              name: "bundleId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "string",
              internalType: "string"
            },
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getBundlePrice",
          type: "function",
          inputs: [
            {
              name: "bundleId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getBundleSeller",
          type: "function",
          inputs: [
            {
              name: "bundleId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getBundleStatus",
          type: "function",
          inputs: [
            {
              name: "bundleId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint8",
              internalType: "enum BundleManager.BundleStatus"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getBundleTimingInfo",
          type: "function",
          inputs: [
            {
              name: "bundleId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getUserBundles",
          type: "function",
          inputs: [
            {
              name: "user",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "onERC1155BatchReceived",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256[]",
              internalType: "uint256[]"
            },
            {
              name: "",
              type: "uint256[]",
              internalType: "uint256[]"
            },
            {
              name: "",
              type: "bytes",
              internalType: "bytes"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes4",
              internalType: "bytes4"
            }
          ],
          stateMutability: "pure"
        },
        {
          name: "onERC1155Received",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "",
              type: "bytes",
              internalType: "bytes"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes4",
              internalType: "bytes4"
            }
          ],
          stateMutability: "pure"
        },
        {
          name: "owner",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "pause",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "paused",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "purchaseBundle",
          type: "function",
          inputs: [
            {
              name: "bundleId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [],
          stateMutability: "payable"
        },
        {
          name: "renounceOwnership",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "supportsInterface",
          type: "function",
          inputs: [
            {
              name: "interfaceId",
              type: "bytes4",
              internalType: "bytes4"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "totalBundlesCreated",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "totalBundlesSold",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "transferOwnership",
          type: "function",
          inputs: [
            {
              name: "newOwner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "unpause",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "updateBundlePrice",
          type: "function",
          inputs: [
            {
              name: "bundleId",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "newPrice",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "userBundles",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "BundleCancelled",
          type: "event",
          inputs: [
            {
              name: "bundleId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "seller",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "reason",
              type: "string",
              indexed: false,
              internalType: "string"
            }
          ],
          anonymous: false
        },
        {
          name: "BundleCreated",
          type: "event",
          inputs: [
            {
              name: "bundleId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "seller",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "itemCount",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "totalPrice",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "discountPercentage",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "BundleItemRemoved",
          type: "event",
          inputs: [
            {
              name: "bundleId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "collection",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "BundleSold",
          type: "event",
          inputs: [
            {
              name: "bundleId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "buyer",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "seller",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "totalPrice",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "itemCount",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "BundleUpdated",
          type: "event",
          inputs: [
            {
              name: "bundleId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "seller",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "oldPrice",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "newPrice",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "timestamp",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "OwnershipTransferred",
          type: "event",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "Paused",
          type: "event",
          inputs: [
            {
              name: "account",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "Unpaused",
          type: "event",
          inputs: [
            {
              name: "account",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "EnforcedPause",
          type: "error",
          inputs: []
        },
        {
          name: "ExpectedPause",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__AmountMustBeGreaterThanZero",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__DurationMustBeGreaterThanZero",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__InsufficientBalance",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__InsufficientPayment",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__ListingExpired",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__NFTNotActive",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__NotTheOwner",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__PriceMustBeGreaterThanZero",
          type: "error",
          inputs: []
        },
        {
          name: "OwnableInvalidOwner",
          type: "error",
          inputs: [
            {
              name: "owner",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "OwnableUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "ReentrancyGuardReentrantCall",
          type: "error",
          inputs: []
        },
        {
          name: "SafeERC20FailedOperation",
          type: "error",
          inputs: [
            {
              name: "token",
              type: "address",
              internalType: "address"
            }
          ]
        }
      ],
      address: "0x68b1d87f95878fe05b998f19b66f4baba5de1aed",
      startBlock: "latest"
    },
    exchangeregistry_anvil_0x59b6: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "admin",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "ADMIN_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "DEFAULT_ADMIN_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getAllExchanges",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "standards",
              type: "uint8[]",
              internalType: "enum IExchangeRegistry.TokenStandard[]"
            },
            {
              name: "exchanges",
              type: "address[]",
              internalType: "address[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getExchange",
          type: "function",
          inputs: [
            {
              name: "standard",
              type: "uint8",
              internalType: "enum IExchangeRegistry.TokenStandard"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getExchangeForListing",
          type: "function",
          inputs: [
            {
              name: "listingId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getExchangeForToken",
          type: "function",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getRoleAdmin",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "grantRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "hasRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "isRegisteredExchange",
          type: "function",
          inputs: [
            {
              name: "exchange",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "registerExchange",
          type: "function",
          inputs: [
            {
              name: "standard",
              type: "uint8",
              internalType: "enum IExchangeRegistry.TokenStandard"
            },
            {
              name: "exchange",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "registerListing",
          type: "function",
          inputs: [
            {
              name: "listingId",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "exchange",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "renounceRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "callerConfirmation",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "revokeRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "supportsInterface",
          type: "function",
          inputs: [
            {
              name: "interfaceId",
              type: "bytes4",
              internalType: "bytes4"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "updateExchange",
          type: "function",
          inputs: [
            {
              name: "standard",
              type: "uint8",
              internalType: "enum IExchangeRegistry.TokenStandard"
            },
            {
              name: "newExchange",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "ExchangeRegistered",
          type: "event",
          inputs: [
            {
              name: "standard",
              type: "uint8",
              indexed: true,
              internalType: "enum IExchangeRegistry.TokenStandard"
            },
            {
              name: "exchange",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "ExchangeUpdated",
          type: "event",
          inputs: [
            {
              name: "standard",
              type: "uint8",
              indexed: true,
              internalType: "enum IExchangeRegistry.TokenStandard"
            },
            {
              name: "oldExchange",
              type: "address",
              indexed: false,
              internalType: "address"
            },
            {
              name: "newExchange",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleAdminChanged",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "previousAdminRole",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "newAdminRole",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleGranted",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "sender",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleRevoked",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "sender",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "AccessControlBadConfirmation",
          type: "error",
          inputs: []
        },
        {
          name: "AccessControlUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            },
            {
              name: "neededRole",
              type: "bytes32",
              internalType: "bytes32"
            }
          ]
        },
        {
          name: "ExchangeRegistry__ExchangeAlreadyRegistered",
          type: "error",
          inputs: []
        },
        {
          name: "ExchangeRegistry__ExchangeNotRegistered",
          type: "error",
          inputs: []
        },
        {
          name: "ExchangeRegistry__InvalidTokenContract",
          type: "error",
          inputs: []
        },
        {
          name: "ExchangeRegistry__UnsupportedTokenStandard",
          type: "error",
          inputs: []
        },
        {
          name: "ExchangeRegistry__ZeroAddress",
          type: "error",
          inputs: []
        }
      ],
      address: "0x59b670e9fa9d0a427751af201d676719a970857b",
      startBlock: "latest"
    },
    listinghistorytracker_anvil_0xc6e7: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "_accessControl",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "MAX_HISTORY_ENTRIES",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "MAX_PRICE_POINTS",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "accessControl",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract MarketplaceAccessControl"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "collectionPriceHistory",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "price",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "timestamp",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "volume",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "source",
              type: "uint8",
              internalType: "enum ListingHistoryTracker.TransactionType"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "collectionStats",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "totalListings",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "totalSales",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "totalVolume",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "floorPrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "averagePrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "highestSale",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "activeListings",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "lastUpdated",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "dailyVolumes",
          type: "function",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "volume",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "transactions",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "uniqueUsers",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "averagePrice",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getCollectionPriceHistory",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "limit",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "pricePoints",
              type: "tuple[]",
              components: [
                {
                  name: "price",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "timestamp",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "volume",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "source",
                  type: "uint8",
                  internalType: "enum ListingHistoryTracker.TransactionType"
                }
              ],
              internalType: "struct ListingHistoryTracker.PricePoint[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getNFTHistory",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "limit",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "records",
              type: "tuple[]",
              components: [
                {
                  name: "listingId",
                  type: "bytes32",
                  internalType: "bytes32"
                },
                {
                  name: "seller",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "buyer",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "price",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "timestamp",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "txType",
                  type: "uint8",
                  internalType: "enum ListingHistoryTracker.TransactionType"
                },
                {
                  name: "listingType",
                  type: "uint8",
                  internalType: "uint8"
                },
                {
                  name: "isActive",
                  type: "bool",
                  internalType: "bool"
                }
              ],
              internalType: "struct ListingHistoryTracker.TransactionRecord[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "globalStats",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "totalListings",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "totalSales",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "totalVolume",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "totalUsers",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "totalCollections",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "averageSalePrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "dailyActiveUsers",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "lastUpdated",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "nftHistory",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "listingId",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "seller",
              type: "address",
              internalType: "address"
            },
            {
              name: "buyer",
              type: "address",
              internalType: "address"
            },
            {
              name: "price",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "timestamp",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "txType",
              type: "uint8",
              internalType: "enum ListingHistoryTracker.TransactionType"
            },
            {
              name: "listingType",
              type: "uint8",
              internalType: "uint8"
            },
            {
              name: "isActive",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "nftHistoryMeta",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "totalTransactions",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "totalVolume",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "lastSalePrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "lastSaleTime",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "currentOwner",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "owner",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "paused",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "recordTransaction",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "listingId",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "txType",
              type: "uint8",
              internalType: "enum ListingHistoryTracker.TransactionType"
            },
            {
              name: "user",
              type: "address",
              internalType: "address"
            },
            {
              name: "price",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "renounceOwnership",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "transferOwnership",
          type: "function",
          inputs: [
            {
              name: "newOwner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "userStats",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "totalListings",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "totalSales",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "totalPurchases",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "volumeSold",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "volumeBought",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "averageSalePrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "averagePurchasePrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "firstActivity",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "lastActivity",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "CollectionStatsUpdated",
          type: "event",
          inputs: [
            {
              name: "collection",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "totalVolume",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "floorPrice",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "averagePrice",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "OwnershipTransferred",
          type: "event",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "Paused",
          type: "event",
          inputs: [
            {
              name: "account",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "PricePointAdded",
          type: "event",
          inputs: [
            {
              name: "collection",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "price",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "timestamp",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "source",
              type: "uint8",
              indexed: false,
              internalType: "enum ListingHistoryTracker.TransactionType"
            }
          ],
          anonymous: false
        },
        {
          name: "TransactionRecorded",
          type: "event",
          inputs: [
            {
              name: "collection",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              indexed: true,
              internalType: "uint256"
            },
            {
              name: "listingId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "txType",
              type: "uint8",
              indexed: false,
              internalType: "enum ListingHistoryTracker.TransactionType"
            },
            {
              name: "user",
              type: "address",
              indexed: false,
              internalType: "address"
            },
            {
              name: "price",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "Unpaused",
          type: "event",
          inputs: [
            {
              name: "account",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "UserStatsUpdated",
          type: "event",
          inputs: [
            {
              name: "user",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "totalSales",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "totalPurchases",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "volumeTraded",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "EnforcedPause",
          type: "error",
          inputs: []
        },
        {
          name: "ExpectedPause",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__InvalidMarketplaceWallet",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__NotTheOwner",
          type: "error",
          inputs: []
        },
        {
          name: "OwnableInvalidOwner",
          type: "error",
          inputs: [
            {
              name: "owner",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "OwnableUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "ReentrancyGuardReentrantCall",
          type: "error",
          inputs: []
        }
      ],
      address: "0xc6e7df5e7b4f2a278906862b61205850344d4e7d",
      startBlock: "latest"
    },
    erc1155nftexchange_anvil_0xb7f8: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "BPS_DENOMINATOR",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "batchBuyNFT",
          type: "function",
          inputs: [
            {
              name: "m_listingIds",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          outputs: [],
          stateMutability: "payable"
        },
        {
          name: "batchCancelListing",
          type: "function",
          inputs: [
            {
              name: "m_listingIds",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "batchListNFT",
          type: "function",
          inputs: [
            {
              name: "m_contractAddress",
              type: "address",
              internalType: "address"
            },
            {
              name: "m_tokenIds",
              type: "uint256[]",
              internalType: "uint256[]"
            },
            {
              name: "m_amounts",
              type: "uint256[]",
              internalType: "uint256[]"
            },
            {
              name: "m_prices",
              type: "uint256[]",
              internalType: "uint256[]"
            },
            {
              name: "m_listingDuration",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "buyNFT",
          type: "function",
          inputs: [
            {
              name: "m_listingId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [],
          stateMutability: "payable"
        },
        {
          name: "buyNFT",
          type: "function",
          inputs: [
            {
              name: "m_listingId",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "m_amount",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [],
          stateMutability: "payable"
        },
        {
          name: "cancelListing",
          type: "function",
          inputs: [
            {
              name: "m_listingId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "contractType",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "pure"
        },
        {
          name: "get24hVolume",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getBuyerSeesPrice",
          type: "function",
          inputs: [
            {
              name: "m_listingId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getFloorDiff",
          type: "function",
          inputs: [
            {
              name: "m_listingId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "int256",
              internalType: "int256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getFloorPrice",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getGeneratedListingId",
          type: "function",
          inputs: [
            {
              name: "m_contractAddress",
              type: "address",
              internalType: "address"
            },
            {
              name: "m_tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "m_sender",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getLadderPrice",
          type: "function",
          inputs: [
            {
              name: "m_contractAddress",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getListingsByCollection",
          type: "function",
          inputs: [
            {
              name: "m_contractAddress",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getListingsBySeller",
          type: "function",
          inputs: [
            {
              name: "m_seller",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getRoyaltyInfo",
          type: "function",
          inputs: [
            {
              name: "m_contractAddress",
              type: "address",
              internalType: "address"
            },
            {
              name: "m_tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "m_salePrice",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "receiver",
              type: "address",
              internalType: "address"
            },
            {
              name: "royaltyAmount",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getTakerFee",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getTopTraitPrice",
          type: "function",
          inputs: [
            {
              name: "m_contractAddress",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "initialize",
          type: "function",
          inputs: [
            {
              name: "m_marketplaceWallet",
              type: "address",
              internalType: "address"
            },
            {
              name: "m_owner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "isActive",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "listNFT",
          type: "function",
          inputs: [
            {
              name: "m_contractAddress",
              type: "address",
              internalType: "address"
            },
            {
              name: "m_tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "m_amount",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "m_price",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "m_listingDuration",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "marketplaceWallet",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "owner",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "renounceOwnership",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "s_activeListings",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "s_listings",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "contractAddress",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "price",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "seller",
              type: "address",
              internalType: "address"
            },
            {
              name: "listingDuration",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "listingStart",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "status",
              type: "uint8",
              internalType: "enum BaseNFTExchange.ListingStatus"
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "s_listingsByCollection",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "s_listingsBySeller",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "s_marketplaceWallet",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "s_takerFee",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "supportedStandard",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "pure"
        },
        {
          name: "supportsInterface",
          type: "function",
          inputs: [
            {
              name: "interfaceId",
              type: "bytes4",
              internalType: "bytes4"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "transferOwnership",
          type: "function",
          inputs: [
            {
              name: "newOwner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "updateMarketplaceWallet",
          type: "function",
          inputs: [
            {
              name: "m_newMarketplaceWallet",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "updateTakerFee",
          type: "function",
          inputs: [
            {
              name: "m_newTakerFee",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "version",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "pure"
        },
        {
          name: "Initialized",
          type: "event",
          inputs: [
            {
              name: "version",
              type: "uint64",
              indexed: false,
              internalType: "uint64"
            }
          ],
          anonymous: false
        },
        {
          name: "ListingCancelled",
          type: "event",
          inputs: [
            {
              name: "listingId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "contractAddress",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              indexed: true,
              internalType: "uint256"
            },
            {
              name: "seller",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "MarketplaceWalletUpdated",
          type: "event",
          inputs: [
            {
              name: "oldWallet",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "newWallet",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "NFTListed",
          type: "event",
          inputs: [
            {
              name: "listingId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "contractAddress",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              indexed: true,
              internalType: "uint256"
            },
            {
              name: "seller",
              type: "address",
              indexed: false,
              internalType: "address"
            },
            {
              name: "price",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "NFTSold",
          type: "event",
          inputs: [
            {
              name: "listingId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "contractAddress",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              indexed: true,
              internalType: "uint256"
            },
            {
              name: "seller",
              type: "address",
              indexed: false,
              internalType: "address"
            },
            {
              name: "buyer",
              type: "address",
              indexed: false,
              internalType: "address"
            },
            {
              name: "price",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "OwnershipTransferred",
          type: "event",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "TakerFeeUpdated",
          type: "event",
          inputs: [
            {
              name: "oldFee",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "newFee",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "InvalidInitialization",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__AmountMustBeGreaterThanZero",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__ArrayLengthMismatch",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__DurationMustBeGreaterThanZero",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__InsufficientBalance",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__InsufficientPayment",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__InvalidMarketplaceWallet",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__InvalidTakerFee",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__ListingExpired",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__MarketplaceNotApproved",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__NFTAlreadyListed",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__NFTNotActive",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__NotTheOwner",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__PriceMustBeGreaterThanZero",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__TransferToSellerFailed",
          type: "error",
          inputs: []
        },
        {
          name: "NotInitializing",
          type: "error",
          inputs: []
        },
        {
          name: "OwnableInvalidOwner",
          type: "error",
          inputs: [
            {
              name: "owner",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "OwnableUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "PaymentDistribution__InsufficientBalance",
          type: "error",
          inputs: []
        },
        {
          name: "PaymentDistribution__InvalidAmount",
          type: "error",
          inputs: []
        },
        {
          name: "PaymentDistribution__TransferFailed",
          type: "error",
          inputs: []
        },
        {
          name: "PaymentDistribution__ZeroAddress",
          type: "error",
          inputs: []
        },
        {
          name: "ReentrancyGuardReentrantCall",
          type: "error",
          inputs: []
        }
      ],
      address: "0xb7f8bc63bbcad18155201308c8f3540b07f84f5e",
      startBlock: "latest"
    },
    erc721collectionfactory_anvil_0x0dcd: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "contractType",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "pure"
        },
        {
          name: "createERC721Collection",
          type: "function",
          inputs: [
            {
              name: "params",
              type: "tuple",
              components: [
                {
                  name: "name",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "symbol",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "owner",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "description",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "mintPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "royaltyFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "maxSupply",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "mintLimitPerWallet",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "mintStartTime",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "allowlistMintPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "publicMintPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "allowlistStageDuration",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "tokenURI",
                  type: "string",
                  internalType: "string"
                }
              ],
              internalType: "struct CollectionParams"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "erc721CollectionImplementation",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getSupportedStandards",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string[]",
              internalType: "string[]"
            }
          ],
          stateMutability: "pure"
        },
        {
          name: "getTotalCollections",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "isActive",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "pure"
        },
        {
          name: "isValidCollection",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "supportsInterface",
          type: "function",
          inputs: [
            {
              name: "interfaceId",
              type: "bytes4",
              internalType: "bytes4"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "version",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "pure"
        },
        {
          name: "ERC721CollectionCreated",
          type: "event",
          inputs: [
            {
              name: "collectionAddress",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "creator",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "ImplementationDeployed",
          type: "event",
          inputs: [
            {
              name: "implementation",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "FailedDeployment",
          type: "error",
          inputs: []
        },
        {
          name: "InsufficientBalance",
          type: "error",
          inputs: [
            {
              name: "balance",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "needed",
              type: "uint256",
              internalType: "uint256"
            }
          ]
        }
      ],
      address: "0x0dcd1bf9a1b36ce34237eeafef220932846bcd82",
      startBlock: "latest"
    },
    collectionfactoryregistry_anvil_0x0b30: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "_erc721Factory",
              type: "address",
              internalType: "address"
            },
            {
              name: "_erc1155Factory",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "contractType",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "pure"
        },
        {
          name: "createERC1155Collection",
          type: "function",
          inputs: [
            {
              name: "params",
              type: "tuple",
              components: [
                {
                  name: "name",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "symbol",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "owner",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "description",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "mintPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "royaltyFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "maxSupply",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "mintLimitPerWallet",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "mintStartTime",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "allowlistMintPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "publicMintPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "allowlistStageDuration",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "tokenURI",
                  type: "string",
                  internalType: "string"
                }
              ],
              internalType: "struct CollectionParams"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "createERC721Collection",
          type: "function",
          inputs: [
            {
              name: "params",
              type: "tuple",
              components: [
                {
                  name: "name",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "symbol",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "owner",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "description",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "mintPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "royaltyFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "maxSupply",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "mintLimitPerWallet",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "mintStartTime",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "allowlistMintPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "publicMintPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "allowlistStageDuration",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "tokenURI",
                  type: "string",
                  internalType: "string"
                }
              ],
              internalType: "struct CollectionParams"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "erc1155Factory",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract ERC1155CollectionFactory"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "erc721Factory",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract ERC721CollectionFactory"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getFactoryAddresses",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "erc721FactoryAddr",
              type: "address",
              internalType: "address"
            },
            {
              name: "erc1155FactoryAddr",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getFactoryCollectionCounts",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "erc721Count",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "erc1155Count",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getSupportedStandards",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string[]",
              internalType: "string[]"
            }
          ],
          stateMutability: "pure"
        },
        {
          name: "getTotalCollections",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "isActive",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "pure"
        },
        {
          name: "isValidCollection",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "supportsInterface",
          type: "function",
          inputs: [
            {
              name: "interfaceId",
              type: "bytes4",
              internalType: "bytes4"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "version",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "pure"
        },
        {
          name: "ERC1155CollectionCreated",
          type: "event",
          inputs: [
            {
              name: "collectionAddress",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "creator",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "ERC721CollectionCreated",
          type: "event",
          inputs: [
            {
              name: "collectionAddress",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "creator",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "FactoriesSet",
          type: "event",
          inputs: [
            {
              name: "erc721Factory",
              type: "address",
              indexed: false,
              internalType: "address"
            },
            {
              name: "erc1155Factory",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        }
      ],
      address: "0x0b306bf915c4d645ff596e518faf3f9669b97016",
      startBlock: "latest"
    },
    erc1155collectionfactory_anvil_0x9a67: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "contractType",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "pure"
        },
        {
          name: "createERC1155Collection",
          type: "function",
          inputs: [
            {
              name: "params",
              type: "tuple",
              components: [
                {
                  name: "name",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "symbol",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "owner",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "description",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "mintPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "royaltyFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "maxSupply",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "mintLimitPerWallet",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "mintStartTime",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "allowlistMintPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "publicMintPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "allowlistStageDuration",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "tokenURI",
                  type: "string",
                  internalType: "string"
                }
              ],
              internalType: "struct CollectionParams"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "erc1155CollectionImplementation",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getSupportedStandards",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string[]",
              internalType: "string[]"
            }
          ],
          stateMutability: "pure"
        },
        {
          name: "getTotalCollections",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "isActive",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "pure"
        },
        {
          name: "isValidCollection",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "supportsInterface",
          type: "function",
          inputs: [
            {
              name: "interfaceId",
              type: "bytes4",
              internalType: "bytes4"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "version",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "pure"
        },
        {
          name: "ERC1155CollectionCreated",
          type: "event",
          inputs: [
            {
              name: "collectionAddress",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "creator",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "ImplementationDeployed",
          type: "event",
          inputs: [
            {
              name: "implementation",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "FailedDeployment",
          type: "error",
          inputs: []
        },
        {
          name: "InsufficientBalance",
          type: "error",
          inputs: [
            {
              name: "balance",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "needed",
              type: "uint256",
              internalType: "uint256"
            }
          ]
        }
      ],
      address: "0x9a676e781a523b5d0c0e43731313a708cb607508",
      startBlock: "latest"
    },
    auctionfactory_anvil_0x9599: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "_marketplaceWallet",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "allAuctionIds",
          type: "function",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "auctionToContract",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "buyNow",
          type: "function",
          inputs: [
            {
              name: "auctionId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [],
          stateMutability: "payable"
        },
        {
          name: "cancelAuction",
          type: "function",
          inputs: [
            {
              name: "auctionId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "createDutchAuction",
          type: "function",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "startPrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "reservePrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "duration",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "priceDropPerHour",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "auctionId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "createEnglishAuction",
          type: "function",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "startPrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "reservePrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "duration",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "auctionId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "dutchAuction",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "implementation",
              type: "address",
              internalType: "contract DutchAuctionImplementation"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "dutchAuctionImplementation",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "englishAuction",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "implementation",
              type: "address",
              internalType: "contract EnglishAuctionImplementation"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "englishAuctionImplementation",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getAllAuctions",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "auctionIds",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getAuction",
          type: "function",
          inputs: [
            {
              name: "auctionId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "auction",
              type: "tuple",
              components: [
                {
                  name: "auctionId",
                  type: "bytes32",
                  internalType: "bytes32"
                },
                {
                  name: "nftContract",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "tokenId",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "amount",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "seller",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "startPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "reservePrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "startTime",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "endTime",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "status",
                  type: "uint8",
                  internalType: "enum AuctionStatus"
                },
                {
                  name: "auctionType",
                  type: "uint8",
                  internalType: "enum AuctionType"
                },
                {
                  name: "highestBidder",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "highestBid",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "bidCount",
                  type: "uint256",
                  internalType: "uint256"
                }
              ],
              internalType: "struct IAuction.Auction"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getAuctionContract",
          type: "function",
          inputs: [
            {
              name: "auctionId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "contractAddress",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getCurrentPrice",
          type: "function",
          inputs: [
            {
              name: "auctionId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "currentPrice",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getPendingRefund",
          type: "function",
          inputs: [
            {
              name: "auctionId",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "bidder",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "refundAmount",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getTimeToReservePrice",
          type: "function",
          inputs: [
            {
              name: "auctionId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getUserAuctions",
          type: "function",
          inputs: [
            {
              name: "user",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "auctionIds",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "isAuctionActive",
          type: "function",
          inputs: [
            {
              name: "auctionId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "isActive",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "marketplaceValidator",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract IMarketplaceValidator"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "marketplaceWallet",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "owner",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "paused",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "placeBid",
          type: "function",
          inputs: [
            {
              name: "auctionId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [],
          stateMutability: "payable"
        },
        {
          name: "renounceOwnership",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setMarketplaceValidator",
          type: "function",
          inputs: [
            {
              name: "validator",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setMarketplaceWallet",
          type: "function",
          inputs: [
            {
              name: "newWallet",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setPaused",
          type: "function",
          inputs: [
            {
              name: "paused",
              type: "bool",
              internalType: "bool"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "settleAuction",
          type: "function",
          inputs: [
            {
              name: "auctionId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "transferNFTFromSeller",
          type: "function",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "from",
              type: "address",
              internalType: "address"
            },
            {
              name: "to",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "transferOwnership",
          type: "function",
          inputs: [
            {
              name: "newOwner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "userAuctions",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "withdrawBid",
          type: "function",
          inputs: [
            {
              name: "auctionId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "AuctionCreatedViaFactory",
          type: "event",
          inputs: [
            {
              name: "auctionId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "auctionContract",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "seller",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "auctionType",
              type: "uint8",
              indexed: false,
              internalType: "enum AuctionType"
            }
          ],
          anonymous: false
        },
        {
          name: "AuctionFactoryPaused",
          type: "event",
          inputs: [
            {
              name: "isPaused",
              type: "bool",
              indexed: false,
              internalType: "bool"
            },
            {
              name: "admin",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "AuctionImplementationsDeployed",
          type: "event",
          inputs: [
            {
              name: "englishAuctionImplementation",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "dutchAuctionImplementation",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "marketplaceWallet",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "OwnershipTransferred",
          type: "event",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "Paused",
          type: "event",
          inputs: [
            {
              name: "account",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "Unpaused",
          type: "event",
          inputs: [
            {
              name: "account",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "Auction__AuctionNotFound",
          type: "error",
          inputs: []
        },
        {
          name: "Auction__NFTAlreadyInAuction",
          type: "error",
          inputs: []
        },
        {
          name: "Auction__NFTAlreadyListed",
          type: "error",
          inputs: []
        },
        {
          name: "Auction__NFTNotAvailable",
          type: "error",
          inputs: []
        },
        {
          name: "Auction__NFTTransferFailed",
          type: "error",
          inputs: []
        },
        {
          name: "Auction__NotAuctionSeller",
          type: "error",
          inputs: []
        },
        {
          name: "Auction__UnsupportedAuctionType",
          type: "error",
          inputs: []
        },
        {
          name: "Auction__ZeroAddress",
          type: "error",
          inputs: []
        },
        {
          name: "EnforcedPause",
          type: "error",
          inputs: []
        },
        {
          name: "ExpectedPause",
          type: "error",
          inputs: []
        },
        {
          name: "FailedDeployment",
          type: "error",
          inputs: []
        },
        {
          name: "InsufficientBalance",
          type: "error",
          inputs: [
            {
              name: "balance",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "needed",
              type: "uint256",
              internalType: "uint256"
            }
          ]
        },
        {
          name: "OwnableInvalidOwner",
          type: "error",
          inputs: [
            {
              name: "owner",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "OwnableUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "ReentrancyGuardReentrantCall",
          type: "error",
          inputs: []
        }
      ],
      address: "0x959922be3caee4b8cd9a407cc3ac1c251c2007b1",
      startBlock: "latest"
    },
    fee_anvil_0x0165: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "owner_",
              type: "address",
              internalType: "address"
            },
            {
              name: "royaltyFee_",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "getRoyaltyFee",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "owner",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "renounceOwnership",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "royaltyInfo",
          type: "function",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "salePrice",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "receiver",
              type: "address",
              internalType: "address"
            },
            {
              name: "royaltyAmount",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "s_royaltyFee",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "setRoyaltyFee",
          type: "function",
          inputs: [
            {
              name: "newRoyaltyFee",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "supportsInterface",
          type: "function",
          inputs: [
            {
              name: "interfaceId",
              type: "bytes4",
              internalType: "bytes4"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "transferOwnership",
          type: "function",
          inputs: [
            {
              name: "newOwner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "FeeUpdated",
          type: "event",
          inputs: [
            {
              name: "feeType",
              type: "string",
              indexed: false,
              internalType: "string"
            },
            {
              name: "newValue",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "OwnershipTransferred",
          type: "event",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "Fee__InvalidRoyaltyFee",
          type: "error",
          inputs: []
        },
        {
          name: "OwnableInvalidOwner",
          type: "error",
          inputs: [
            {
              name: "owner",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "OwnableUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ]
        }
      ],
      address: "0x0165878a594ca255338adfa4d48449f69242eb8f",
      startBlock: "latest"
    },
    advancedfeemanager_anvil_0xa513: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "_accessControl",
              type: "address",
              internalType: "address"
            },
            {
              name: "_feeRecipient",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "EMERGENCY_FEE_CAP",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "accessControl",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract MarketplaceAccessControl"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "baseFeeConfig",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "makerFee",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "takerFee",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "listingFee",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "auctionFee",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "bundleFee",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "isActive",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "batchUpdateUserVolumes",
          type: "function",
          inputs: [
            {
              name: "users",
              type: "address[]",
              internalType: "address[]"
            },
            {
              name: "volumes",
              type: "uint256[]",
              internalType: "uint256[]"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "calculateFees",
          type: "function",
          inputs: [
            {
              name: "user",
              type: "address",
              internalType: "address"
            },
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "salePrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "isMaker",
              type: "bool",
              internalType: "bool"
            }
          ],
          outputs: [
            {
              name: "finalFee",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "appliedDiscount",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "checkTierUpgradeEligibility",
          type: "function",
          inputs: [
            {
              name: "user",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "canUpgrade",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "nextTierId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "volumeNeeded",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "collectionFeeOverrides",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "makerFeeOverride",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "takerFeeOverride",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "discountBps",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "hasOverride",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "isVerified",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "setAt",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "emergencyPause",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "feeRecipient",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "feeTierConfigs",
          type: "function",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "volumeThreshold",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "discountBps",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "tierName",
              type: "string",
              internalType: "string"
            },
            {
              name: "isActive",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getAllFeeTierConfigs",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "tierConfigs",
              type: "tuple[]",
              components: [
                {
                  name: "volumeThreshold",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "discountBps",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "tierName",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "isActive",
                  type: "bool",
                  internalType: "bool"
                }
              ],
              internalType: "struct FeeTierConfig[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getBaseFeeConfig",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "config",
              type: "tuple",
              components: [
                {
                  name: "makerFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "takerFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "listingFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "auctionFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "bundleFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "isActive",
                  type: "bool",
                  internalType: "bool"
                }
              ],
              internalType: "struct FeeConfig"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getCollectionFeeOverride",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "feeOverride",
              type: "tuple",
              components: [
                {
                  name: "makerFeeOverride",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "takerFeeOverride",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "discountBps",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "hasOverride",
                  type: "bool",
                  internalType: "bool"
                },
                {
                  name: "isVerified",
                  type: "bool",
                  internalType: "bool"
                },
                {
                  name: "setAt",
                  type: "uint256",
                  internalType: "uint256"
                }
              ],
              internalType: "struct CollectionFeeOverride"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getEffectiveFeeRate",
          type: "function",
          inputs: [
            {
              name: "user",
              type: "address",
              internalType: "address"
            },
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "isMaker",
              type: "bool",
              internalType: "bool"
            }
          ],
          outputs: [
            {
              name: "effectiveRate",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getFeeTierConfig",
          type: "function",
          inputs: [
            {
              name: "tierId",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "tierConfig",
              type: "tuple",
              components: [
                {
                  name: "volumeThreshold",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "discountBps",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "tierName",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "isActive",
                  type: "bool",
                  internalType: "bool"
                }
              ],
              internalType: "struct FeeTierConfig"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getFeeTierCount",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "count",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getUserFeeTier",
          type: "function",
          inputs: [
            {
              name: "user",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "tier",
              type: "tuple",
              components: [
                {
                  name: "tierId",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "discountBps",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "lastUpdated",
                  type: "uint256",
                  internalType: "uint256"
                }
              ],
              internalType: "struct FeeTier"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getUserVIPStatus",
          type: "function",
          inputs: [
            {
              name: "user",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "vipData",
              type: "tuple",
              components: [
                {
                  name: "isVIP",
                  type: "bool",
                  internalType: "bool"
                },
                {
                  name: "vipDiscountBps",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "vipExpiryTimestamp",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "vipTier",
                  type: "string",
                  internalType: "string"
                }
              ],
              internalType: "struct VIPStatus"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getUserVolumeData",
          type: "function",
          inputs: [
            {
              name: "user",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "volumeData",
              type: "tuple",
              components: [
                {
                  name: "totalVolume",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "last30DaysVolume",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "lastTradeTimestamp",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "tradeCount",
                  type: "uint256",
                  internalType: "uint256"
                }
              ],
              internalType: "struct UserVolumeData"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "owner",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "paused",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "renounceOwnership",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setCollectionFeeOverride",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "feeOverride",
              type: "tuple",
              components: [
                {
                  name: "makerFeeOverride",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "takerFeeOverride",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "discountBps",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "hasOverride",
                  type: "bool",
                  internalType: "bool"
                },
                {
                  name: "isVerified",
                  type: "bool",
                  internalType: "bool"
                },
                {
                  name: "setAt",
                  type: "uint256",
                  internalType: "uint256"
                }
              ],
              internalType: "struct CollectionFeeOverride"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "totalMarketplaceVolume",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "transferOwnership",
          type: "function",
          inputs: [
            {
              name: "newOwner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "unpause",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "updateBaseFeeConfig",
          type: "function",
          inputs: [
            {
              name: "newConfig",
              type: "tuple",
              components: [
                {
                  name: "makerFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "takerFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "listingFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "auctionFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "bundleFee",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "isActive",
                  type: "bool",
                  internalType: "bool"
                }
              ],
              internalType: "struct FeeConfig"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "updateFeeRecipient",
          type: "function",
          inputs: [
            {
              name: "newFeeRecipient",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "updateFeeTier",
          type: "function",
          inputs: [
            {
              name: "tierId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "tierConfig",
              type: "tuple",
              components: [
                {
                  name: "volumeThreshold",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "discountBps",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "tierName",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "isActive",
                  type: "bool",
                  internalType: "bool"
                }
              ],
              internalType: "struct FeeTierConfig"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "updateUserVolume",
          type: "function",
          inputs: [
            {
              name: "user",
              type: "address",
              internalType: "address"
            },
            {
              name: "tradeVolume",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "updateVIPStatus",
          type: "function",
          inputs: [
            {
              name: "user",
              type: "address",
              internalType: "address"
            },
            {
              name: "vipData",
              type: "tuple",
              components: [
                {
                  name: "isVIP",
                  type: "bool",
                  internalType: "bool"
                },
                {
                  name: "vipDiscountBps",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "vipExpiryTimestamp",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "vipTier",
                  type: "string",
                  internalType: "string"
                }
              ],
              internalType: "struct VIPStatus"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "userFeeTiers",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "tierId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "discountBps",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "lastUpdated",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "userVolumeData",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "totalVolume",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "last30DaysVolume",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "lastTradeTimestamp",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "tradeCount",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "vipStatus",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "isVIP",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "vipDiscountBps",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "vipExpiryTimestamp",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "vipTier",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "CollectionFeeOverrideSet",
          type: "event",
          inputs: [
            {
              name: "collection",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "makerFeeOverride",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "takerFeeOverride",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "discountBps",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "isVerified",
              type: "bool",
              indexed: false,
              internalType: "bool"
            }
          ],
          anonymous: false
        },
        {
          name: "FeeConfigUpdated",
          type: "event",
          inputs: [
            {
              name: "oldMakerFee",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "newMakerFee",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "oldTakerFee",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "newTakerFee",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "updatedBy",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "FeeTierUpdated",
          type: "event",
          inputs: [
            {
              name: "user",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "oldTierId",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "newTierId",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "newDiscountBps",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "FeeUpdated",
          type: "event",
          inputs: [
            {
              name: "feeType",
              type: "string",
              indexed: false,
              internalType: "string"
            },
            {
              name: "newValue",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "FeesCalculated",
          type: "event",
          inputs: [
            {
              name: "user",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "collection",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "salePrice",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "finalMakerFee",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "finalTakerFee",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "totalDiscount",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "OwnershipTransferred",
          type: "event",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "Paused",
          type: "event",
          inputs: [
            {
              name: "account",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "Unpaused",
          type: "event",
          inputs: [
            {
              name: "account",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "UserVolumeUpdated",
          type: "event",
          inputs: [
            {
              name: "user",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "newTotalVolume",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "newLast30DaysVolume",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "tradeCount",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "VIPStatusUpdated",
          type: "event",
          inputs: [
            {
              name: "user",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "isVIP",
              type: "bool",
              indexed: false,
              internalType: "bool"
            },
            {
              name: "discountBps",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "expiryTimestamp",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "vipTier",
              type: "string",
              indexed: false,
              internalType: "string"
            }
          ],
          anonymous: false
        },
        {
          name: "EnforcedPause",
          type: "error",
          inputs: []
        },
        {
          name: "ExpectedPause",
          type: "error",
          inputs: []
        },
        {
          name: "Fee__InvalidOwner",
          type: "error",
          inputs: []
        },
        {
          name: "Fee__InvalidRoyaltyFee",
          type: "error",
          inputs: []
        },
        {
          name: "OwnableInvalidOwner",
          type: "error",
          inputs: [
            {
              name: "owner",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "OwnableUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "ReentrancyGuardReentrantCall",
          type: "error",
          inputs: []
        }
      ],
      address: "0xa513e6e4b8f2a923d98304ec87f64353c4d5c853",
      startBlock: "latest"
    },
    advancedroyaltymanager_anvil_0x2279: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "_accessControl",
              type: "address",
              internalType: "address"
            },
            {
              name: "_baseFeeContract",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "EMERGENCY_ROYALTY_CAP",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "accessControl",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract MarketplaceAccessControl"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "advancedRoyalties",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "hasAdvancedRoyalty",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "totalRoyaltyBps",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "maxRoyaltyBps",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "useERC2981",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "allowOverrides",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "lastUpdated",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "updatedBy",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "baseFeeContract",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract Fee"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "calculateAndDistributeRoyalties",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "salePrice",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "totalRoyalty",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "recipients",
              type: "address[]",
              internalType: "address[]"
            },
            {
              name: "amounts",
              type: "uint256[]",
              internalType: "uint256[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "customRoyaltyContracts",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "globalCaps",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "maxTotalRoyalty",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "maxSingleRecipient",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "maxRecipients",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "enforceGlobalCaps",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "owner",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "paused",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "renounceOwnership",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "royaltyInfo",
          type: "function",
          inputs: [
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "salePrice",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "receiver",
              type: "address",
              internalType: "address"
            },
            {
              name: "royaltyAmount",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "royaltyRecipients",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "recipient",
              type: "address",
              internalType: "address"
            },
            {
              name: "basisPoints",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "role",
              type: "string",
              internalType: "string"
            },
            {
              name: "isActive",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "setAdvancedRoyalty",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "recipients",
              type: "tuple[]",
              components: [
                {
                  name: "recipient",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "basisPoints",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "role",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "isActive",
                  type: "bool",
                  internalType: "bool"
                }
              ],
              internalType: "struct AdvancedRoyaltyManager.RoyaltyRecipient[]"
            },
            {
              name: "useERC2981",
              type: "bool",
              internalType: "bool"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "supportsInterface",
          type: "function",
          inputs: [
            {
              name: "interfaceId",
              type: "bytes4",
              internalType: "bytes4"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "totalRoyaltiesDistributed",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "transferOwnership",
          type: "function",
          inputs: [
            {
              name: "newOwner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "AdvancedRoyaltySet",
          type: "event",
          inputs: [
            {
              name: "collection",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "totalRoyaltyBps",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "recipientCount",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "updatedBy",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "CustomRoyaltyContractSet",
          type: "event",
          inputs: [
            {
              name: "collection",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "customContract",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "OwnershipTransferred",
          type: "event",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "Paused",
          type: "event",
          inputs: [
            {
              name: "account",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "RoyaltyCapsUpdated",
          type: "event",
          inputs: [
            {
              name: "maxTotalRoyalty",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "maxSingleRecipient",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "maxRecipients",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "RoyaltyDistributed",
          type: "event",
          inputs: [
            {
              name: "collection",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              indexed: true,
              internalType: "uint256"
            },
            {
              name: "salePrice",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "totalRoyalty",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "recipientCount",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "RoyaltyRecipientAdded",
          type: "event",
          inputs: [
            {
              name: "collection",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "recipient",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "basisPoints",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "role",
              type: "string",
              indexed: false,
              internalType: "string"
            }
          ],
          anonymous: false
        },
        {
          name: "RoyaltyRecipientRemoved",
          type: "event",
          inputs: [
            {
              name: "collection",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "recipient",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "Unpaused",
          type: "event",
          inputs: [
            {
              name: "account",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "EnforcedPause",
          type: "error",
          inputs: []
        },
        {
          name: "ExpectedPause",
          type: "error",
          inputs: []
        },
        {
          name: "Fee__InvalidOwner",
          type: "error",
          inputs: []
        },
        {
          name: "Fee__InvalidRoyaltyFee",
          type: "error",
          inputs: []
        },
        {
          name: "OwnableInvalidOwner",
          type: "error",
          inputs: [
            {
              name: "owner",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "OwnableUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "ReentrancyGuardReentrantCall",
          type: "error",
          inputs: []
        }
      ],
      address: "0x2279b7a0a67db372996a5fab50d91eaa73d2ebe6",
      startBlock: "latest"
    },
    collectionverifier_anvil_0x5fc8: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "_accessControl",
              type: "address",
              internalType: "address"
            },
            {
              name: "_feeRecipient",
              type: "address",
              internalType: "address"
            },
            {
              name: "_verificationFee",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "accessControl",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract MarketplaceAccessControl"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "batchVerifyCollections",
          type: "function",
          inputs: [
            {
              name: "collections",
              type: "address[]",
              internalType: "address[]"
            },
            {
              name: "verificationTiers",
              type: "string[]",
              internalType: "string[]"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "canCollectionBeListed",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "canList",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "collectionMetadata",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "name",
              type: "string",
              internalType: "string"
            },
            {
              name: "description",
              type: "string",
              internalType: "string"
            },
            {
              name: "imageUrl",
              type: "string",
              internalType: "string"
            },
            {
              name: "websiteUrl",
              type: "string",
              internalType: "string"
            },
            {
              name: "twitterUrl",
              type: "string",
              internalType: "string"
            },
            {
              name: "discordUrl",
              type: "string",
              internalType: "string"
            },
            {
              name: "creator",
              type: "address",
              internalType: "address"
            },
            {
              name: "createdAt",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "isActive",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "collectionVerifications",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "isVerified",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "status",
              type: "uint8",
              internalType: "enum CollectionVerifier.VerificationStatus"
            },
            {
              name: "verifiedBy",
              type: "address",
              internalType: "address"
            },
            {
              name: "verifiedAt",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "expiryTimestamp",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "verificationTier",
              type: "string",
              internalType: "string"
            },
            {
              name: "verificationHash",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "hasSpecialBenefits",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "emergencyPause",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "feeRecipient",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getAllVerifiedCollections",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "collections",
              type: "address[]",
              internalType: "address[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getCollectionMetadata",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "metadata",
              type: "tuple",
              components: [
                {
                  name: "name",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "description",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "imageUrl",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "websiteUrl",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "twitterUrl",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "discordUrl",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "creator",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "createdAt",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "tags",
                  type: "string[]",
                  internalType: "string[]"
                },
                {
                  name: "isActive",
                  type: "bool",
                  internalType: "bool"
                }
              ],
              internalType: "struct CollectionVerifier.CollectionMetadata"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getCollectionVerification",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "verification",
              type: "tuple",
              components: [
                {
                  name: "isVerified",
                  type: "bool",
                  internalType: "bool"
                },
                {
                  name: "status",
                  type: "uint8",
                  internalType: "enum CollectionVerifier.VerificationStatus"
                },
                {
                  name: "verifiedBy",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "verifiedAt",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "expiryTimestamp",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "verificationTier",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "verificationHash",
                  type: "bytes32",
                  internalType: "bytes32"
                },
                {
                  name: "hasSpecialBenefits",
                  type: "bool",
                  internalType: "bool"
                }
              ],
              internalType: "struct CollectionVerifier.CollectionVerification"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getPendingRequests",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "requests",
              type: "address[]",
              internalType: "address[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getVerificationRequest",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "request",
              type: "tuple",
              components: [
                {
                  name: "collection",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "requester",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "requestedAt",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "status",
                  type: "uint8",
                  internalType: "enum CollectionVerifier.VerificationStatus"
                },
                {
                  name: "submissionData",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "feePaid",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "reviewer",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "reviewNotes",
                  type: "string",
                  internalType: "string"
                }
              ],
              internalType: "struct CollectionVerifier.VerificationRequest"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getVerificationStats",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "totalVerified",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "totalRequests",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "pendingCount",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "verifiedOnlyEnabled",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getVerifiedCollectionsPaginated",
          type: "function",
          inputs: [
            {
              name: "offset",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "limit",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "collections",
              type: "address[]",
              internalType: "address[]"
            },
            {
              name: "total",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "isCollectionVerified",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "owner",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "paused",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "pendingRequestIndex",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "pendingRequests",
          type: "function",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "processVerificationRequest",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "approve",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "verificationTier",
              type: "string",
              internalType: "string"
            },
            {
              name: "reviewNotes",
              type: "string",
              internalType: "string"
            },
            {
              name: "expiryTimestamp",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "renounceOwnership",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "requestVerification",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "metadata",
              type: "tuple",
              components: [
                {
                  name: "name",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "description",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "imageUrl",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "websiteUrl",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "twitterUrl",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "discordUrl",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "creator",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "createdAt",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "tags",
                  type: "string[]",
                  internalType: "string[]"
                },
                {
                  name: "isActive",
                  type: "bool",
                  internalType: "bool"
                }
              ],
              internalType: "struct CollectionVerifier.CollectionMetadata"
            },
            {
              name: "submissionData",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [],
          stateMutability: "payable"
        },
        {
          name: "revokeVerification",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "reason",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "toggleVerifiedOnlyMode",
          type: "function",
          inputs: [
            {
              name: "enabled",
              type: "bool",
              internalType: "bool"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "totalRequestsProcessed",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "totalVerifiedCollections",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "transferOwnership",
          type: "function",
          inputs: [
            {
              name: "newOwner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "unpause",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "updateCollectionMetadata",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "metadata",
              type: "tuple",
              components: [
                {
                  name: "name",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "description",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "imageUrl",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "websiteUrl",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "twitterUrl",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "discordUrl",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "creator",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "createdAt",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "tags",
                  type: "string[]",
                  internalType: "string[]"
                },
                {
                  name: "isActive",
                  type: "bool",
                  internalType: "bool"
                }
              ],
              internalType: "struct CollectionVerifier.CollectionMetadata"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "updateFeeRecipient",
          type: "function",
          inputs: [
            {
              name: "newFeeRecipient",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "updateVerificationFee",
          type: "function",
          inputs: [
            {
              name: "newFee",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "verificationFee",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "verificationRequests",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "requester",
              type: "address",
              internalType: "address"
            },
            {
              name: "requestedAt",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "status",
              type: "uint8",
              internalType: "enum CollectionVerifier.VerificationStatus"
            },
            {
              name: "submissionData",
              type: "string",
              internalType: "string"
            },
            {
              name: "feePaid",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "reviewer",
              type: "address",
              internalType: "address"
            },
            {
              name: "reviewNotes",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "verifiedCollectionIndex",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "verifiedCollections",
          type: "function",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "verifiedOnlyMode",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "CollectionMetadataUpdated",
          type: "event",
          inputs: [
            {
              name: "collection",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "updatedBy",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "timestamp",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "CollectionVerificationRevoked",
          type: "event",
          inputs: [
            {
              name: "collection",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "revokedBy",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "reason",
              type: "string",
              indexed: false,
              internalType: "string"
            },
            {
              name: "timestamp",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "CollectionVerified",
          type: "event",
          inputs: [
            {
              name: "collection",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "verifiedBy",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "verificationTier",
              type: "string",
              indexed: false,
              internalType: "string"
            },
            {
              name: "timestamp",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "OwnershipTransferred",
          type: "event",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "Paused",
          type: "event",
          inputs: [
            {
              name: "account",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "Unpaused",
          type: "event",
          inputs: [
            {
              name: "account",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "VerificationFeeUpdated",
          type: "event",
          inputs: [
            {
              name: "oldFee",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "newFee",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "updatedBy",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "VerificationRequestProcessed",
          type: "event",
          inputs: [
            {
              name: "collection",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "reviewer",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "status",
              type: "uint8",
              indexed: false,
              internalType: "enum CollectionVerifier.VerificationStatus"
            },
            {
              name: "reviewNotes",
              type: "string",
              indexed: false,
              internalType: "string"
            }
          ],
          anonymous: false
        },
        {
          name: "VerificationRequested",
          type: "event",
          inputs: [
            {
              name: "collection",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "requester",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "feePaid",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "timestamp",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "VerifiedOnlyModeToggled",
          type: "event",
          inputs: [
            {
              name: "enabled",
              type: "bool",
              indexed: false,
              internalType: "bool"
            },
            {
              name: "toggledBy",
              type: "address",
              indexed: false,
              internalType: "address"
            },
            {
              name: "timestamp",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "Collection__AlreadyVerified",
          type: "error",
          inputs: []
        },
        {
          name: "Collection__FeeTransferFailed",
          type: "error",
          inputs: []
        },
        {
          name: "Collection__InsufficientFee",
          type: "error",
          inputs: []
        },
        {
          name: "Collection__InvalidArrayLength",
          type: "error",
          inputs: []
        },
        {
          name: "Collection__InvalidNFTContract",
          type: "error",
          inputs: []
        },
        {
          name: "Collection__InvalidRequestStatus",
          type: "error",
          inputs: []
        },
        {
          name: "Collection__NotVerified",
          type: "error",
          inputs: []
        },
        {
          name: "Collection__RequestAlreadyPending",
          type: "error",
          inputs: []
        },
        {
          name: "Collection__UnauthorizedAccess",
          type: "error",
          inputs: []
        },
        {
          name: "Collection__ZeroAddress",
          type: "error",
          inputs: []
        },
        {
          name: "EnforcedPause",
          type: "error",
          inputs: []
        },
        {
          name: "ExpectedPause",
          type: "error",
          inputs: []
        },
        {
          name: "OwnableInvalidOwner",
          type: "error",
          inputs: [
            {
              name: "owner",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "OwnableUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "ReentrancyGuardReentrantCall",
          type: "error",
          inputs: []
        }
      ],
      address: "0x5fc8d32690cc91d4c39d9d3abcbd16989f875707",
      startBlock: "latest"
    },
    erc721nftexchange_anvil_0x8a79: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "BPS_DENOMINATOR",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "batchBuyNFT",
          type: "function",
          inputs: [
            {
              name: "m_listingIds",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          outputs: [],
          stateMutability: "payable"
        },
        {
          name: "batchCancelListing",
          type: "function",
          inputs: [
            {
              name: "m_listingIds",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "batchListNFT",
          type: "function",
          inputs: [
            {
              name: "m_contractAddress",
              type: "address",
              internalType: "address"
            },
            {
              name: "m_tokenIds",
              type: "uint256[]",
              internalType: "uint256[]"
            },
            {
              name: "m_prices",
              type: "uint256[]",
              internalType: "uint256[]"
            },
            {
              name: "m_listingDuration",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "buyNFT",
          type: "function",
          inputs: [
            {
              name: "m_listingId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [],
          stateMutability: "payable"
        },
        {
          name: "cancelListing",
          type: "function",
          inputs: [
            {
              name: "m_listingId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "contractType",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "pure"
        },
        {
          name: "get24hVolume",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getBatchPriceBreakdown",
          type: "function",
          inputs: [
            {
              name: "m_listingIds",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          outputs: [
            {
              name: "totalPrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "prices",
              type: "uint256[]",
              internalType: "uint256[]"
            },
            {
              name: "royalties",
              type: "uint256[]",
              internalType: "uint256[]"
            },
            {
              name: "takerFees",
              type: "uint256[]",
              internalType: "uint256[]"
            },
            {
              name: "realityPrices",
              type: "uint256[]",
              internalType: "uint256[]"
            },
            {
              name: "currentTakerFee",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getBuyerSeesPrice",
          type: "function",
          inputs: [
            {
              name: "m_listingId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getFloorDiff",
          type: "function",
          inputs: [
            {
              name: "m_listingId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "int256",
              internalType: "int256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getFloorPrice",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getGeneratedListingId",
          type: "function",
          inputs: [
            {
              name: "m_contractAddress",
              type: "address",
              internalType: "address"
            },
            {
              name: "m_tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "m_sender",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getLadderPrice",
          type: "function",
          inputs: [
            {
              name: "m_contractAddress",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getListingsByCollection",
          type: "function",
          inputs: [
            {
              name: "m_contractAddress",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getListingsBySeller",
          type: "function",
          inputs: [
            {
              name: "m_seller",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getRoyaltyInfo",
          type: "function",
          inputs: [
            {
              name: "m_contractAddress",
              type: "address",
              internalType: "address"
            },
            {
              name: "m_tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "m_salePrice",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "receiver",
              type: "address",
              internalType: "address"
            },
            {
              name: "royaltyAmount",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getTakerFee",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getTopTraitPrice",
          type: "function",
          inputs: [
            {
              name: "m_contractAddress",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "initialize",
          type: "function",
          inputs: [
            {
              name: "m_marketplaceWallet",
              type: "address",
              internalType: "address"
            },
            {
              name: "m_owner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "isActive",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "listNFT",
          type: "function",
          inputs: [
            {
              name: "m_contractAddress",
              type: "address",
              internalType: "address"
            },
            {
              name: "m_tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "m_price",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "m_listingDuration",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "marketplaceWallet",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "owner",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "renounceOwnership",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "s_activeListings",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "s_listings",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "contractAddress",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "price",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "seller",
              type: "address",
              internalType: "address"
            },
            {
              name: "listingDuration",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "listingStart",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "status",
              type: "uint8",
              internalType: "enum BaseNFTExchange.ListingStatus"
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "s_listingsByCollection",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "s_listingsBySeller",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "s_marketplaceWallet",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "s_takerFee",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "supportedStandard",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "pure"
        },
        {
          name: "supportsInterface",
          type: "function",
          inputs: [
            {
              name: "interfaceId",
              type: "bytes4",
              internalType: "bytes4"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "transferOwnership",
          type: "function",
          inputs: [
            {
              name: "newOwner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "updateMarketplaceWallet",
          type: "function",
          inputs: [
            {
              name: "m_newMarketplaceWallet",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "updateTakerFee",
          type: "function",
          inputs: [
            {
              name: "m_newTakerFee",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "version",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string"
            }
          ],
          stateMutability: "pure"
        },
        {
          name: "Initialized",
          type: "event",
          inputs: [
            {
              name: "version",
              type: "uint64",
              indexed: false,
              internalType: "uint64"
            }
          ],
          anonymous: false
        },
        {
          name: "ListingCancelled",
          type: "event",
          inputs: [
            {
              name: "listingId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "contractAddress",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              indexed: true,
              internalType: "uint256"
            },
            {
              name: "seller",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "MarketplaceWalletUpdated",
          type: "event",
          inputs: [
            {
              name: "oldWallet",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "newWallet",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "NFTListed",
          type: "event",
          inputs: [
            {
              name: "listingId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "contractAddress",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              indexed: true,
              internalType: "uint256"
            },
            {
              name: "seller",
              type: "address",
              indexed: false,
              internalType: "address"
            },
            {
              name: "price",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "NFTSold",
          type: "event",
          inputs: [
            {
              name: "listingId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "contractAddress",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              indexed: true,
              internalType: "uint256"
            },
            {
              name: "seller",
              type: "address",
              indexed: false,
              internalType: "address"
            },
            {
              name: "buyer",
              type: "address",
              indexed: false,
              internalType: "address"
            },
            {
              name: "price",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "OwnershipTransferred",
          type: "event",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "TakerFeeUpdated",
          type: "event",
          inputs: [
            {
              name: "oldFee",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "newFee",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "InvalidInitialization",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__ArrayLengthMismatch",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__DurationMustBeGreaterThanZero",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__InsufficientPayment",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__InvalidMarketplaceWallet",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__InvalidTakerFee",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__ListingExpired",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__MarketplaceNotApproved",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__NFTAlreadyListed",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__NFTNotActive",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__NotTheOwner",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__PriceMustBeGreaterThanZero",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__TransferToSellerFailed",
          type: "error",
          inputs: []
        },
        {
          name: "NotInitializing",
          type: "error",
          inputs: []
        },
        {
          name: "OwnableInvalidOwner",
          type: "error",
          inputs: [
            {
              name: "owner",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "OwnableUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "PaymentDistribution__InsufficientBalance",
          type: "error",
          inputs: []
        },
        {
          name: "PaymentDistribution__InvalidAmount",
          type: "error",
          inputs: []
        },
        {
          name: "PaymentDistribution__TransferFailed",
          type: "error",
          inputs: []
        },
        {
          name: "PaymentDistribution__ZeroAddress",
          type: "error",
          inputs: []
        },
        {
          name: "ReentrancyGuardReentrantCall",
          type: "error",
          inputs: []
        }
      ],
      address: "0x8a791620dd6260079bf849dc5567adc3f2fdc318",
      startBlock: "latest"
    },
    marketplacetimelock_anvil_0x9fe4: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [],
          stateMutability: "nonpayable"
        },
        {
          type: "receive",
          stateMutability: "payable"
        },
        {
          name: "GRACE_PERIOD",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "MAX_TIMELOCK_DURATION",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "MIN_TIMELOCK_DURATION",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "TIMELOCK_DURATION",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "actionData",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "target",
              type: "address",
              internalType: "address"
            },
            {
              name: "data",
              type: "bytes",
              internalType: "bytes"
            },
            {
              name: "value",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "description",
              type: "string",
              internalType: "string"
            },
            {
              name: "proposer",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "cancelAction",
          type: "function",
          inputs: [
            {
              name: "actionId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "cancelledActions",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "customTimelockDuration",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "executeAction",
          type: "function",
          inputs: [
            {
              name: "actionId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "returnData",
              type: "bytes",
              internalType: "bytes"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "executedActions",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getActionData",
          type: "function",
          inputs: [
            {
              name: "actionId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "action",
              type: "tuple",
              components: [
                {
                  name: "target",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "data",
                  type: "bytes",
                  internalType: "bytes"
                },
                {
                  name: "value",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "description",
                  type: "string",
                  internalType: "string"
                },
                {
                  name: "proposer",
                  type: "address",
                  internalType: "address"
                }
              ],
              internalType: "struct MarketplaceTimelock.ActionData"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getTimeRemaining",
          type: "function",
          inputs: [
            {
              name: "actionId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "timeRemaining",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "isActionReady",
          type: "function",
          inputs: [
            {
              name: "actionId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "isReady",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "owner",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "renounceOwnership",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "scheduleAction",
          type: "function",
          inputs: [
            {
              name: "target",
              type: "address",
              internalType: "address"
            },
            {
              name: "data",
              type: "bytes",
              internalType: "bytes"
            },
            {
              name: "value",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "description",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [
            {
              name: "actionId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "scheduledActions",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "transferOwnership",
          type: "function",
          inputs: [
            {
              name: "newOwner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "updateTimelockDuration",
          type: "function",
          inputs: [
            {
              name: "newDuration",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "ActionCancelled",
          type: "event",
          inputs: [
            {
              name: "actionId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "canceller",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "ActionExecuted",
          type: "event",
          inputs: [
            {
              name: "actionId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "executor",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "returnData",
              type: "bytes",
              indexed: false,
              internalType: "bytes"
            }
          ],
          anonymous: false
        },
        {
          name: "ActionScheduled",
          type: "event",
          inputs: [
            {
              name: "actionId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "target",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "data",
              type: "bytes",
              indexed: false,
              internalType: "bytes"
            },
            {
              name: "value",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "executeTime",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "description",
              type: "string",
              indexed: false,
              internalType: "string"
            },
            {
              name: "proposer",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "OwnershipTransferred",
          type: "event",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "TimelockDurationUpdated",
          type: "event",
          inputs: [
            {
              name: "oldDuration",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "newDuration",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "updater",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "OwnableInvalidOwner",
          type: "error",
          inputs: [
            {
              name: "owner",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "OwnableUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "ReentrancyGuardReentrantCall",
          type: "error",
          inputs: []
        },
        {
          name: "Timelock__ActionAlreadyExecuted",
          type: "error",
          inputs: []
        },
        {
          name: "Timelock__ActionAlreadyScheduled",
          type: "error",
          inputs: []
        },
        {
          name: "Timelock__ActionCancelled",
          type: "error",
          inputs: []
        },
        {
          name: "Timelock__ActionNotScheduled",
          type: "error",
          inputs: []
        },
        {
          name: "Timelock__ExecutionFailed",
          type: "error",
          inputs: []
        },
        {
          name: "Timelock__GracePeriodExpired",
          type: "error",
          inputs: []
        },
        {
          name: "Timelock__InvalidTimelockDuration",
          type: "error",
          inputs: []
        },
        {
          name: "Timelock__TimelockNotExpired",
          type: "error",
          inputs: []
        },
        {
          name: "Timelock__ZeroAddress",
          type: "error",
          inputs: []
        }
      ],
      address: "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0",
      startBlock: "latest"
    },
    emergencymanager_anvil_0xe7f1: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "_marketplaceValidator",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          type: "receive",
          stateMutability: "payable"
        },
        {
          name: "EMERGENCY_PAUSE_DURATION",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "MIN_PAUSE_INTERVAL",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "batchSetContractBlacklist",
          type: "function",
          inputs: [
            {
              name: "contractAddrs",
              type: "address[]",
              internalType: "address[]"
            },
            {
              name: "isBlacklisted",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "reason",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "blacklistedContracts",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "blacklistedUsers",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "emergencyBulkResetNFTStatus",
          type: "function",
          inputs: [
            {
              name: "nftContracts",
              type: "address[]",
              internalType: "address[]"
            },
            {
              name: "tokenIds",
              type: "uint256[]",
              internalType: "uint256[]"
            },
            {
              name: "owners",
              type: "address[]",
              internalType: "address[]"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "emergencyPause",
          type: "function",
          inputs: [
            {
              name: "reason",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "emergencyResetCollection",
          type: "function",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenIds",
              type: "uint256[]",
              internalType: "uint256[]"
            },
            {
              name: "owners",
              type: "address[]",
              internalType: "address[]"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "emergencyUnpause",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "emergencyWithdraw",
          type: "function",
          inputs: [
            {
              name: "recipient",
              type: "address",
              internalType: "address payable"
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "reason",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "getPauseCooldownRemaining",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "isContractBlacklisted",
          type: "function",
          inputs: [
            {
              name: "contractAddr",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "isUserBlacklisted",
          type: "function",
          inputs: [
            {
              name: "userAddr",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "lastEmergencyPause",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "marketplaceValidator",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract MarketplaceValidator"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "owner",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "paused",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "renounceOwnership",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setContractBlacklist",
          type: "function",
          inputs: [
            {
              name: "contractAddr",
              type: "address",
              internalType: "address"
            },
            {
              name: "isBlacklisted",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "reason",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setUserBlacklist",
          type: "function",
          inputs: [
            {
              name: "userAddr",
              type: "address",
              internalType: "address"
            },
            {
              name: "isBlacklisted",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "reason",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "transferOwnership",
          type: "function",
          inputs: [
            {
              name: "newOwner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "BulkNFTStatusReset",
          type: "event",
          inputs: [
            {
              name: "nftContracts",
              type: "address[]",
              indexed: false,
              internalType: "address[]"
            },
            {
              name: "tokenIds",
              type: "uint256[]",
              indexed: false,
              internalType: "uint256[]"
            },
            {
              name: "owners",
              type: "address[]",
              indexed: false,
              internalType: "address[]"
            },
            {
              name: "count",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "ContractBlacklisted",
          type: "event",
          inputs: [
            {
              name: "contractAddress",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "isBlacklisted",
              type: "bool",
              indexed: false,
              internalType: "bool"
            },
            {
              name: "reason",
              type: "string",
              indexed: false,
              internalType: "string"
            }
          ],
          anonymous: false
        },
        {
          name: "EmergencyFundWithdrawal",
          type: "event",
          inputs: [
            {
              name: "recipient",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "amount",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "reason",
              type: "string",
              indexed: false,
              internalType: "string"
            },
            {
              name: "timestamp",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "EmergencyPauseActivated",
          type: "event",
          inputs: [
            {
              name: "activator",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "timestamp",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "reason",
              type: "string",
              indexed: false,
              internalType: "string"
            }
          ],
          anonymous: false
        },
        {
          name: "EmergencyPauseDeactivated",
          type: "event",
          inputs: [
            {
              name: "deactivator",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "timestamp",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "OwnershipTransferred",
          type: "event",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "Paused",
          type: "event",
          inputs: [
            {
              name: "account",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "Unpaused",
          type: "event",
          inputs: [
            {
              name: "account",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "UserBlacklisted",
          type: "event",
          inputs: [
            {
              name: "userAddress",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "isBlacklisted",
              type: "bool",
              indexed: false,
              internalType: "bool"
            },
            {
              name: "reason",
              type: "string",
              indexed: false,
              internalType: "string"
            }
          ],
          anonymous: false
        },
        {
          name: "EmergencyManager__ArrayLengthMismatch",
          type: "error",
          inputs: []
        },
        {
          name: "EmergencyManager__EmptyArray",
          type: "error",
          inputs: []
        },
        {
          name: "EmergencyManager__InsufficientBalance",
          type: "error",
          inputs: []
        },
        {
          name: "EmergencyManager__NoFundsToWithdraw",
          type: "error",
          inputs: []
        },
        {
          name: "EmergencyManager__PauseCooldownActive",
          type: "error",
          inputs: []
        },
        {
          name: "EmergencyManager__WithdrawalFailed",
          type: "error",
          inputs: []
        },
        {
          name: "EmergencyManager__ZeroAddress",
          type: "error",
          inputs: []
        },
        {
          name: "EnforcedPause",
          type: "error",
          inputs: []
        },
        {
          name: "ExpectedPause",
          type: "error",
          inputs: []
        },
        {
          name: "OwnableInvalidOwner",
          type: "error",
          inputs: [
            {
              name: "owner",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "OwnableUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "ReentrancyGuardReentrantCall",
          type: "error",
          inputs: []
        }
      ],
      address: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
      startBlock: "latest"
    },
    listingvalidator_anvil_0xcf7e: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "_accessControl",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "nonpayable"
        },
        {
          name: "DEFAULT_COOLDOWN",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "MAX_LISTINGS_PER_HOUR",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "MAX_QUALITY_SCORE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "MIN_AUTO_APPROVAL_SCORE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "accessControl",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract MarketplaceAccessControl"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "collectionSettings",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "minPrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "maxPrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "minDuration",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "maxDuration",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "cooldownPeriod",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "maxListingsPerUser",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "requireVerifiedCollection",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "enableQualityCheck",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "isActive",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "globalSettings",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "minPrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "maxPrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "minDuration",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "maxDuration",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "cooldownPeriod",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "maxListingsPerUser",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "requireVerifiedCollection",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "enableQualityCheck",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "isActive",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "listingQualityScores",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "owner",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "pause",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "paused",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "renounceOwnership",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setGlobalValidationSettings",
          type: "function",
          inputs: [
            {
              name: "settings",
              type: "tuple",
              components: [
                {
                  name: "minPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "maxPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "minDuration",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "maxDuration",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "cooldownPeriod",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "maxListingsPerUser",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "requireVerifiedCollection",
                  type: "bool",
                  internalType: "bool"
                },
                {
                  name: "enableQualityCheck",
                  type: "bool",
                  internalType: "bool"
                },
                {
                  name: "isActive",
                  type: "bool",
                  internalType: "bool"
                }
              ],
              internalType: "struct ListingValidator.ValidationSettings"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setValidationSettings",
          type: "function",
          inputs: [
            {
              name: "collection",
              type: "address",
              internalType: "address"
            },
            {
              name: "settings",
              type: "tuple",
              components: [
                {
                  name: "minPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "maxPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "minDuration",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "maxDuration",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "cooldownPeriod",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "maxListingsPerUser",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "requireVerifiedCollection",
                  type: "bool",
                  internalType: "bool"
                },
                {
                  name: "enableQualityCheck",
                  type: "bool",
                  internalType: "bool"
                },
                {
                  name: "isActive",
                  type: "bool",
                  internalType: "bool"
                }
              ],
              internalType: "struct ListingValidator.ValidationSettings"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "spamTrackers",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "listingsInLastHour",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "lastHourStart",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "suspiciousActivity",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "isFlagged",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "totalValidatedListings",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "transferOwnership",
          type: "function",
          inputs: [
            {
              name: "newOwner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "unpause",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "userCooldowns",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "lastListingTime",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "activeListings",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "totalListings",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "isRestricted",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "validateListing",
          type: "function",
          inputs: [
            {
              name: "listing",
              type: "tuple",
              components: [
                {
                  name: "listingId",
                  type: "bytes32",
                  internalType: "bytes32"
                },
                {
                  name: "seller",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "price",
                  type: "uint96",
                  internalType: "uint96"
                },
                {
                  name: "nftContract",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "tokenId",
                  type: "uint96",
                  internalType: "uint96"
                },
                {
                  name: "startTime",
                  type: "uint64",
                  internalType: "uint64"
                },
                {
                  name: "endTime",
                  type: "uint64",
                  internalType: "uint64"
                },
                {
                  name: "minOfferPrice",
                  type: "uint64",
                  internalType: "uint64"
                },
                {
                  name: "quantity",
                  type: "uint32",
                  internalType: "uint32"
                },
                {
                  name: "listingType",
                  type: "uint8",
                  internalType: "enum ListingType"
                },
                {
                  name: "status",
                  type: "uint8",
                  internalType: "enum ListingStatus"
                },
                {
                  name: "acceptOffers",
                  type: "bool",
                  internalType: "bool"
                },
                {
                  name: "bundleId",
                  type: "bytes32",
                  internalType: "bytes32"
                },
                {
                  name: "metadata",
                  type: "bytes",
                  internalType: "bytes"
                }
              ],
              internalType: "struct Listing"
            },
            {
              name: "user",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "result",
              type: "tuple",
              components: [
                {
                  name: "isValid",
                  type: "bool",
                  internalType: "bool"
                },
                {
                  name: "errors",
                  type: "string[]",
                  internalType: "string[]"
                },
                {
                  name: "qualityScore",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "recommendedPrice",
                  type: "uint256",
                  internalType: "uint256"
                }
              ],
              internalType: "struct ListingValidator.ValidationResult"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "validateListingUpdate",
          type: "function",
          inputs: [
            {
              name: "oldListing",
              type: "tuple",
              components: [
                {
                  name: "listingId",
                  type: "bytes32",
                  internalType: "bytes32"
                },
                {
                  name: "seller",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "price",
                  type: "uint96",
                  internalType: "uint96"
                },
                {
                  name: "nftContract",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "tokenId",
                  type: "uint96",
                  internalType: "uint96"
                },
                {
                  name: "startTime",
                  type: "uint64",
                  internalType: "uint64"
                },
                {
                  name: "endTime",
                  type: "uint64",
                  internalType: "uint64"
                },
                {
                  name: "minOfferPrice",
                  type: "uint64",
                  internalType: "uint64"
                },
                {
                  name: "quantity",
                  type: "uint32",
                  internalType: "uint32"
                },
                {
                  name: "listingType",
                  type: "uint8",
                  internalType: "enum ListingType"
                },
                {
                  name: "status",
                  type: "uint8",
                  internalType: "enum ListingStatus"
                },
                {
                  name: "acceptOffers",
                  type: "bool",
                  internalType: "bool"
                },
                {
                  name: "bundleId",
                  type: "bytes32",
                  internalType: "bytes32"
                },
                {
                  name: "metadata",
                  type: "bytes",
                  internalType: "bytes"
                }
              ],
              internalType: "struct Listing"
            },
            {
              name: "newListing",
              type: "tuple",
              components: [
                {
                  name: "listingId",
                  type: "bytes32",
                  internalType: "bytes32"
                },
                {
                  name: "seller",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "price",
                  type: "uint96",
                  internalType: "uint96"
                },
                {
                  name: "nftContract",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "tokenId",
                  type: "uint96",
                  internalType: "uint96"
                },
                {
                  name: "startTime",
                  type: "uint64",
                  internalType: "uint64"
                },
                {
                  name: "endTime",
                  type: "uint64",
                  internalType: "uint64"
                },
                {
                  name: "minOfferPrice",
                  type: "uint64",
                  internalType: "uint64"
                },
                {
                  name: "quantity",
                  type: "uint32",
                  internalType: "uint32"
                },
                {
                  name: "listingType",
                  type: "uint8",
                  internalType: "enum ListingType"
                },
                {
                  name: "status",
                  type: "uint8",
                  internalType: "enum ListingStatus"
                },
                {
                  name: "acceptOffers",
                  type: "bool",
                  internalType: "bool"
                },
                {
                  name: "bundleId",
                  type: "bytes32",
                  internalType: "bytes32"
                },
                {
                  name: "metadata",
                  type: "bytes",
                  internalType: "bytes"
                }
              ],
              internalType: "struct Listing"
            },
            {
              name: "user",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "isValid",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "ListingValidated",
          type: "event",
          inputs: [
            {
              name: "listingId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "user",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "isValid",
              type: "bool",
              indexed: false,
              internalType: "bool"
            },
            {
              name: "qualityScore",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "OwnershipTransferred",
          type: "event",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "Paused",
          type: "event",
          inputs: [
            {
              name: "account",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "SpamDetected",
          type: "event",
          inputs: [
            {
              name: "user",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "suspiciousActivity",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "reason",
              type: "string",
              indexed: false,
              internalType: "string"
            }
          ],
          anonymous: false
        },
        {
          name: "Unpaused",
          type: "event",
          inputs: [
            {
              name: "account",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "UserRestricted",
          type: "event",
          inputs: [
            {
              name: "user",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "reason",
              type: "string",
              indexed: false,
              internalType: "string"
            },
            {
              name: "restrictionEnd",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "ValidationSettingsUpdated",
          type: "event",
          inputs: [
            {
              name: "collection",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "settings",
              type: "tuple",
              indexed: false,
              components: [
                {
                  name: "minPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "maxPrice",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "minDuration",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "maxDuration",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "cooldownPeriod",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "maxListingsPerUser",
                  type: "uint256",
                  internalType: "uint256"
                },
                {
                  name: "requireVerifiedCollection",
                  type: "bool",
                  internalType: "bool"
                },
                {
                  name: "enableQualityCheck",
                  type: "bool",
                  internalType: "bool"
                },
                {
                  name: "isActive",
                  type: "bool",
                  internalType: "bool"
                }
              ],
              internalType: "struct ListingValidator.ValidationSettings"
            },
            {
              name: "updatedBy",
              type: "address",
              indexed: false,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "EnforcedPause",
          type: "error",
          inputs: []
        },
        {
          name: "ExpectedPause",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__InvalidCollection",
          type: "error",
          inputs: []
        },
        {
          name: "NFTExchange__InvalidOwner",
          type: "error",
          inputs: []
        },
        {
          name: "OwnableInvalidOwner",
          type: "error",
          inputs: [
            {
              name: "owner",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "OwnableUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "ReentrancyGuardReentrantCall",
          type: "error",
          inputs: []
        }
      ],
      address: "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9",
      startBlock: "latest"
    },
    marketplacevalidator_anvil_0xdc64: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "allAuctions",
          type: "function",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "allExchanges",
          type: "function",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "emergencyManager",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "emergencyResetNFTStatus",
          type: "function",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "owner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "getAllAuctions",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "auctions",
              type: "address[]",
              internalType: "address[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getAllExchanges",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "exchanges",
              type: "address[]",
              internalType: "address[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getNFTStatus",
          type: "function",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "owner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "status",
              type: "uint8",
              internalType: "enum IMarketplaceValidator.NFTStatus"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "isNFTAvailable",
          type: "function",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "owner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "isAvailable",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "currentStatus",
              type: "uint8",
              internalType: "enum IMarketplaceValidator.NFTStatus"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "isNFTInAuction",
          type: "function",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "owner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "inAuction",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "isNFTListed",
          type: "function",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "owner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "isListed",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "isRegisteredAuction",
          type: "function",
          inputs: [
            {
              name: "auctionAddress",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "isRegistered",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "isRegisteredExchange",
          type: "function",
          inputs: [
            {
              name: "exchangeAddress",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "isRegistered",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "owner",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "registerAuction",
          type: "function",
          inputs: [
            {
              name: "auctionAddress",
              type: "address",
              internalType: "address"
            },
            {
              name: "auctionType",
              type: "uint8",
              internalType: "uint8"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "registerExchange",
          type: "function",
          inputs: [
            {
              name: "exchangeAddress",
              type: "address",
              internalType: "address"
            },
            {
              name: "exchangeType",
              type: "uint8",
              internalType: "uint8"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "registeredAuctions",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "registeredExchanges",
          type: "function",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "renounceOwnership",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setEmergencyManager",
          type: "function",
          inputs: [
            {
              name: "_emergencyManager",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setNFTAvailable",
          type: "function",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "owner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setNFTInAuction",
          type: "function",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "owner",
              type: "address",
              internalType: "address"
            },
            {
              name: "auctionId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setNFTListed",
          type: "function",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "owner",
              type: "address",
              internalType: "address"
            },
            {
              name: "listingId",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setNFTSold",
          type: "function",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "oldOwner",
              type: "address",
              internalType: "address"
            },
            {
              name: "newOwner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "transferOwnership",
          type: "function",
          inputs: [
            {
              name: "newOwner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "AuctionRegistered",
          type: "event",
          inputs: [
            {
              name: "auctionAddress",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "auctionType",
              type: "uint8",
              indexed: true,
              internalType: "uint8"
            }
          ],
          anonymous: false
        },
        {
          name: "EmergencyManagerSet",
          type: "event",
          inputs: [
            {
              name: "emergencyManager",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "ExchangeRegistered",
          type: "event",
          inputs: [
            {
              name: "exchangeAddress",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "exchangeType",
              type: "uint8",
              indexed: true,
              internalType: "uint8"
            }
          ],
          anonymous: false
        },
        {
          name: "NFTStatusChanged",
          type: "event",
          inputs: [
            {
              name: "nftContract",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "tokenId",
              type: "uint256",
              indexed: true,
              internalType: "uint256"
            },
            {
              name: "owner",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "oldStatus",
              type: "uint8",
              indexed: false,
              internalType: "enum IMarketplaceValidator.NFTStatus"
            },
            {
              name: "newStatus",
              type: "uint8",
              indexed: false,
              internalType: "enum IMarketplaceValidator.NFTStatus"
            }
          ],
          anonymous: false
        },
        {
          name: "OwnershipTransferred",
          type: "event",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "MarketplaceValidator__AlreadyRegistered",
          type: "error",
          inputs: []
        },
        {
          name: "MarketplaceValidator__NFTNotAvailable",
          type: "error",
          inputs: []
        },
        {
          name: "MarketplaceValidator__NotAuthorized",
          type: "error",
          inputs: []
        },
        {
          name: "MarketplaceValidator__NotRegisteredContract",
          type: "error",
          inputs: []
        },
        {
          name: "MarketplaceValidator__ZeroAddress",
          type: "error",
          inputs: []
        },
        {
          name: "OwnableInvalidOwner",
          type: "error",
          inputs: [
            {
              name: "owner",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "OwnableUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "ReentrancyGuardReentrantCall",
          type: "error",
          inputs: []
        }
      ],
      address: "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9",
      startBlock: "latest"
    },
    marketplaceaccesscontrol_anvil_0x5fbd: {
      chain: "anvil",
      abi: [
        {
          type: "constructor",
          inputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "ADMIN_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "DEFAULT_ADMIN_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "EMERGENCY_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "MODERATOR_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "OPERATOR_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "PAUSER_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "VERIFIER_ROLE",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "activeRoles",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "currentRoleMembers",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getActiveRoles",
          type: "function",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "activeUserRoles",
              type: "bytes32[]",
              internalType: "bytes32[]"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getRoleAdmin",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "getRoleMemberInfo",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "current",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "maximum",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "grantRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "grantRoleSimple",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "hasPermission",
          type: "function",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            },
            {
              name: "permission",
              type: "string",
              internalType: "string"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "hasRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "maxRoleMembers",
          type: "function",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32"
            }
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "owner",
          type: "function",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "renounceOwnership",
          type: "function",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "renounceRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "callerConfirmation",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "revokeRole",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "revokeRoleSimple",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setRoleActive",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "isActive",
              type: "bool",
              internalType: "bool"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "setRoleMemberLimit",
          type: "function",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "maxMembers",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "supportsInterface",
          type: "function",
          inputs: [
            {
              name: "interfaceId",
              type: "bytes4",
              internalType: "bytes4"
            }
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool"
            }
          ],
          stateMutability: "view"
        },
        {
          name: "transferOwnership",
          type: "function",
          inputs: [
            {
              name: "newOwner",
              type: "address",
              internalType: "address"
            }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        },
        {
          name: "OwnershipTransferred",
          type: "event",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleAdminChanged",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "previousAdminRole",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "newAdminRole",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleGranted",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "sender",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleGrantedSimple",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "sender",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "timestamp",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleMemberLimitUpdated",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "oldLimit",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "newLimit",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            },
            {
              name: "updatedBy",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleRevoked",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "sender",
              type: "address",
              indexed: true,
              internalType: "address"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleRevokedSimple",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "account",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "sender",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "timestamp",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "RoleStatusChanged",
          type: "event",
          inputs: [
            {
              name: "role",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32"
            },
            {
              name: "wasActive",
              type: "bool",
              indexed: false,
              internalType: "bool"
            },
            {
              name: "isActive",
              type: "bool",
              indexed: false,
              internalType: "bool"
            },
            {
              name: "changedBy",
              type: "address",
              indexed: true,
              internalType: "address"
            },
            {
              name: "timestamp",
              type: "uint256",
              indexed: false,
              internalType: "uint256"
            }
          ],
          anonymous: false
        },
        {
          name: "AccessControlBadConfirmation",
          type: "error",
          inputs: []
        },
        {
          name: "AccessControlUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            },
            {
              name: "neededRole",
              type: "bytes32",
              internalType: "bytes32"
            }
          ]
        },
        {
          name: "MarketplaceAccessControl__CannotDeactivateAdminRole",
          type: "error",
          inputs: []
        },
        {
          name: "MarketplaceAccessControl__InvalidMemberLimit",
          type: "error",
          inputs: []
        },
        {
          name: "MarketplaceAccessControl__MemberLimitBelowCurrent",
          type: "error",
          inputs: []
        },
        {
          name: "MarketplaceAccessControl__RoleAlreadyGranted",
          type: "error",
          inputs: []
        },
        {
          name: "MarketplaceAccessControl__RoleMemberLimitExceeded",
          type: "error",
          inputs: []
        },
        {
          name: "MarketplaceAccessControl__RoleNotActive",
          type: "error",
          inputs: []
        },
        {
          name: "MarketplaceAccessControl__RoleNotGranted",
          type: "error",
          inputs: []
        },
        {
          name: "MarketplaceAccessControl__ZeroAddress",
          type: "error",
          inputs: []
        },
        {
          name: "OwnableInvalidOwner",
          type: "error",
          inputs: [
            {
              name: "owner",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "OwnableUnauthorizedAccount",
          type: "error",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address"
            }
          ]
        },
        {
          name: "ReentrancyGuardReentrantCall",
          type: "error",
          inputs: []
        }
      ],
      address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
      startBlock: "latest"
    }
  },
});
