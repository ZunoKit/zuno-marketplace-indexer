/**
 * Generated Ponder Configuration
 * 
 * ⚠️  AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * 
 * This file is generated from Zuno Marketplace ABIs API.
 * To regenerate: pnpm generate-config
 * 
 * Generated: 2025-10-22T10:34:18.471Z
 * Chains: 1
 * Contracts: 7
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
      maxRequestsPerSecond: 50,
      disableCache: true,
    }
  },

  contracts: {
    offermanager_anvil: {
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
      address: "0x68b1d87f95878fe05b998f19b66f4baba5de1aed"
    },
    advancedlistingmanager_anvil: {
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
      address: "0xc6e7df5e7b4f2a278906862b61205850344d4e7d"
    },
    collectionfactoryregistry_anvil: {
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
      address: "0x959922be3caee4b8cd9a407cc3ac1c251c2007b1"
    },
    erc1155collectionfactory_anvil: {
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
      address: "0x0b306bf915c4d645ff596e518faf3f9669b97016"
    },
    erc721collectionfactory_anvil: {
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
      address: "0x9a676e781a523b5d0c0e43731313a708cb607508"
    },
    erc1155nftexchange_anvil: {
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
      address: "0xa51c1fc2f0d1a1b8494ed1fe312d7c3a78ed91c0"
    },
    erc721nftexchange_anvil: {
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
      address: "0x610178da211fef7d417bc0e6fed39f05609ad788"
    }
  },
});
