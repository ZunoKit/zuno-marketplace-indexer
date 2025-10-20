/**
 * Marketplace Event Handlers
 * Handles all marketplace-related events (ListingCreated, ListingSold, etc.)
 */

import { ponder } from "ponder:registry";
import { listing, offer, account } from "ponder:schema";

/**
 * Handle ListingCreated event
 */
ponder.on("Marketplace:ListingCreated", async ({ event, context }) => {
  const { seller, nftContract, tokenId, price, currency, listingId } =
    event.args;

  // Create listing
  await context.db.insert(listing).values({
    id: listingId.toString(),
    seller,
    nftContract,
    tokenId,
    price,
    currency,
    status: "ACTIVE",
    createdAt: event.block.timestamp,
    updatedAt: event.block.timestamp,
    chainId: context.network.chainId,
  });

  // Update seller account stats
  await context.db
    .insert(account)
    .values({
      id: seller,
      listingsCount: 1n,
      salesCount: 0n,
      purchasesCount: 0n,
      totalVolume: 0n,
      chainId: context.network.chainId,
    })
    .onConflictDoUpdate((row: any) => ({
      listingsCount: row.listingsCount + 1n,
    }));
});

/**
 * Handle ListingCancelled event
 */
ponder.on("Marketplace:ListingCancelled", async ({ event, context }) => {
  const { listingId } = event.args;

  await context.db.update(listing, { id: listingId.toString() }).set({
    status: "CANCELLED",
    updatedAt: event.block.timestamp,
  });
});

/**
 * Handle ListingSold event
 */
ponder.on("Marketplace:ListingSold", async ({ event, context }) => {
  const { listingId, buyer, seller, price } = event.args;

  // Update listing status
  await context.db.update(listing, { id: listingId.toString() }).set({
    status: "SOLD",
    updatedAt: event.block.timestamp,
  });

  // Update seller stats
  await context.db
    .insert(account)
    .values({
      id: seller,
      listingsCount: 0n,
      salesCount: 1n,
      purchasesCount: 0n,
      totalVolume: price,
      chainId: context.network.chainId,
    })
    .onConflictDoUpdate((row: any) => ({
      salesCount: row.salesCount + 1n,
      totalVolume: row.totalVolume + price,
    }));

  // Update buyer stats
  await context.db
    .insert(account)
    .values({
      id: buyer,
      listingsCount: 0n,
      salesCount: 0n,
      purchasesCount: 1n,
      totalVolume: price,
      chainId: context.network.chainId,
    })
    .onConflictDoUpdate((row: any) => ({
      purchasesCount: row.purchasesCount + 1n,
      totalVolume: row.totalVolume + price,
    }));
});

/**
 * Handle OfferCreated event
 */
ponder.on("Marketplace:OfferCreated", async ({ event, context }) => {
  const { offerId, listingId, buyer, price } = event.args;

  await context.db.insert(offer).values({
    id: offerId.toString(),
    listingId: listingId.toString(),
    buyer,
    price,
    status: "PENDING",
    createdAt: event.block.timestamp,
    updatedAt: event.block.timestamp,
    chainId: context.network.chainId,
  });
});

/**
 * Handle OfferAccepted event
 */
ponder.on("Marketplace:OfferAccepted", async ({ event, context }) => {
  const { offerId, listingId } = event.args;

  // Update offer status
  await context.db.update(offer, { id: offerId.toString() }).set({
    status: "ACCEPTED",
    updatedAt: event.block.timestamp,
  });

  // Update listing status
  await context.db.update(listing, { id: listingId.toString() }).set({
    status: "SOLD",
    updatedAt: event.block.timestamp,
  });
});

/**
 * Handle OfferRejected event
 */
ponder.on("Marketplace:OfferRejected", async ({ event, context }) => {
  const { offerId } = event.args;

  await context.db.update(offer, { id: offerId.toString() }).set({
    status: "REJECTED",
    updatedAt: event.block.timestamp,
  });
});
;
