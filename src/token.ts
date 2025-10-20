/**
 * Token Event Handlers (ERC20)
 * Handles Transfer and Approval events for payment tokens
 */

import { ponder } from "ponder:registry";
import { logger } from "./utils/logger";

/**
 * Handle ERC20 Transfer event
 * Note: This is primarily for tracking payment token movements
 * related to marketplace transactions
 */
ponder.on("ERC20:Transfer", async ({ event, context }) => {
  const { from, to, value } = event.args;
  const token = event.log.address;

  // Log large transfers (potential marketplace payments)
  if (value > 1000000000000000000n) {
    // > 1 token (assuming 18 decimals)
    logger.debug("Large ERC20 transfer detected", {
      token,
      from,
      to,
      value: value.toString(),
      txHash: event.transaction.hash,
    });
  }

  // You can add custom logic here to track payment token balances
  // or correlate with marketplace sales if needed
});

/**
 * Handle ERC20 Approval event
 * Tracks when users approve the marketplace to spend their tokens
 */
ponder.on("ERC20:Approval", async ({ event, context }) => {
  const { owner, spender, value } = event.args;
  const token = event.log.address;

  // Log approvals to marketplace contract
  logger.debug("ERC20 approval", {
    token,
    owner,
    spender,
    value: value.toString(),
  });

  // You can add custom logic here to track approvals
  // or create a table for tracking approved amounts
});
