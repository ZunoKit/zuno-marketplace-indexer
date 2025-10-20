/**
 * Ponder Type Definitions
 * Type declarations for Ponder virtual modules
 * These modules are generated at runtime by Ponder
 */

declare module "ponder:registry" {
  export const ponder: {
    on: (eventName: string, handler: (params: any) => Promise<void>) => void;
  };
}

declare module "ponder:schema" {
  export const listing: any;
  export const offer: any;
  export const account: any;
  export const nft: any;
  export const transferEvent: any;
  export const approvalEvent: any;
}
