/**
 * Zuno Marketplace Indexer API
 * 
 * Provides REST and GraphQL endpoints to query indexed data
 */

import { db } from "ponder:api";
import schema from "ponder:schema";
import { Hono } from "hono";
import { client, graphql } from "ponder";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use("*", cors());

// ============================================================================
// Health & Info Routes
// ============================================================================

app.get("/", (c) => {
  return c.json({
    name: "Zuno Marketplace Indexer",
    version: "1.0.0",
    description: "Event indexer for Zuno NFT Marketplace",
    endpoints: {
      graphql: "/graphql",
      rest: {
        collections: "/api/collections",
        tokens: "/api/tokens",
        trades: "/api/trades",
        accounts: "/api/accounts",
        events: "/api/events",
        stats: "/api/stats",
      },
    },
  });
});

app.get("/health", (c) => {
  return c.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// ============================================================================
// REST API Routes
// ============================================================================

/**
 * Get collections
 * GET /api/collections?page=1&limit=20&chainId=31337
 */
app.get("/api/collections", async (c) => {
  const page = parseInt(c.req.query("page") || "1");
  const limit = parseInt(c.req.query("limit") || "20");
  const chainId = c.req.query("chainId");
  const creator = c.req.query("creator");

  const offset = (page - 1) * limit;

  let query = db.select().from(schema.collection);

  if (chainId) {
    query = query.where((q: any) => q.chainId.equals(parseInt(chainId)));
  }

  if (creator) {
    query = query.where((q: any) => q.creator.equals(creator as `0x${string}`));
  }

  const collections = await query.limit(limit).offset(offset).execute();

  return c.json({
    success: true,
    data: collections,
    pagination: {
      page,
      limit,
      total: collections.length,
    },
  });
});

/**
 * Get collection by address
 * GET /api/collections/:chainId/:address
 */
app.get("/api/collections/:chainId/:address", async (c) => {
  const chainId = parseInt(c.req.param("chainId"));
  const address = c.req.param("address").toLowerCase();

  const collection = await db
    .select()
    .from(schema.collection)
    .where((q: any) => 
      q.chainId.equals(chainId) && 
      q.address.equals(address as `0x${string}`)
    )
    .limit(1)
    .execute();

  if (collection.length === 0) {
    return c.json({ error: "Collection not found" }, 404);
  }

  return c.json({
    success: true,
    data: collection[0],
  });
});

/**
 * Get tokens
 * GET /api/tokens?collection=0x...&owner=0x...&page=1&limit=20
 */
app.get("/api/tokens", async (c) => {
  const page = parseInt(c.req.query("page") || "1");
  const limit = parseInt(c.req.query("limit") || "20");
  const collection = c.req.query("collection");
  const owner = c.req.query("owner");

  const offset = (page - 1) * limit;

  let query = db.select().from(schema.token);

  if (collection) {
    query = query.where((q: any) => q.collection.equals(collection.toLowerCase() as `0x${string}`));
  }

  if (owner) {
    query = query.where((q: any) => q.owner.equals(owner.toLowerCase() as `0x${string}`));
  }

  const tokens = await query.limit(limit).offset(offset).execute();

  return c.json({
    success: true,
    data: tokens,
    pagination: {
      page,
      limit,
      total: tokens.length,
    },
  });
});

/**
 * Get trades
 * GET /api/trades?collection=0x...&maker=0x...&taker=0x...&page=1&limit=20
 */
app.get("/api/trades", async (c) => {
  const page = parseInt(c.req.query("page") || "1");
  const limit = parseInt(c.req.query("limit") || "20");
  const collection = c.req.query("collection");
  const maker = c.req.query("maker");
  const taker = c.req.query("taker");

  const offset = (page - 1) * limit;

  let query = db.select().from(schema.trade);

  if (collection) {
    query = query.where((q: any) => q.collection.equals(collection.toLowerCase() as `0x${string}`));
  }

  if (maker) {
    query = query.where((q: any) => q.maker.equals(maker.toLowerCase() as `0x${string}`));
  }

  if (taker) {
    query = query.where((q: any) => q.taker.equals(taker.toLowerCase() as `0x${string}`));
  }

  const trades = await query
    .orderBy((t: any) => t.blockTimestamp, "desc")
    .limit(limit)
    .offset(offset)
    .execute();

  return c.json({
    success: true,
    data: trades,
    pagination: {
      page,
      limit,
      total: trades.length,
    },
  });
});

/**
 * Get account
 * GET /api/accounts/:address
 */
app.get("/api/accounts/:address", async (c) => {
  const address = c.req.param("address").toLowerCase();

  const account = await db
    .select()
    .from(schema.account)
    .where((q: any) => q.address.equals(address as `0x${string}`))
    .limit(1)
    .execute();

  if (account.length === 0) {
    return c.json({ error: "Account not found" }, 404);
  }

  return c.json({
    success: true,
    data: account[0],
  });
});

/**
 * Get events
 * GET /api/events?eventName=Transfer&contractAddress=0x...&page=1&limit=20
 */
app.get("/api/events", async (c) => {
  const page = parseInt(c.req.query("page") || "1");
  const limit = parseInt(c.req.query("limit") || "20");
  const eventName = c.req.query("eventName");
  const contractAddress = c.req.query("contractAddress");

  const offset = (page - 1) * limit;

  let query = db.select().from(schema.eventLog);

  if (eventName) {
    query = query.where((q: any) => q.eventName.equals(eventName));
  }

  if (contractAddress) {
    query = query.where((q: any) => q.contractAddress.equals(contractAddress.toLowerCase() as `0x${string}`));
  }

  const events = await query
    .orderBy((e: any) => e.blockNumber, "desc")
    .limit(limit)
    .offset(offset)
    .execute();

  return c.json({
    success: true,
    data: events,
    pagination: {
      page,
      limit,
      total: events.length,
    },
  });
});

/**
 * Get marketplace stats
 * GET /api/stats?chainId=31337
 */
app.get("/api/stats", async (c) => {
  const chainId = c.req.query("chainId");

  // Get collection count
  let collectionsQuery = db.select().from(schema.collection);
  if (chainId) {
    collectionsQuery = collectionsQuery.where((q: any) => q.chainId.equals(parseInt(chainId)));
  }
  const collections = await collectionsQuery.execute();

  // Get trade count
  let tradesQuery = db.select().from(schema.trade);
  if (chainId) {
    tradesQuery = tradesQuery.where((q: any) => q.chainId.equals(parseInt(chainId)));
  }
  const trades = await tradesQuery.execute();

  // Get account count
  const accounts = await db.select().from(schema.account).execute();

  // Calculate total volume
  const totalVolume = trades.reduce((sum, trade) => sum + BigInt(trade.price), BigInt(0));

  return c.json({
    success: true,
    data: {
      totalCollections: collections.length,
      totalTrades: trades.length,
      totalAccounts: accounts.length,
      totalVolume: totalVolume.toString(),
      activeCollections: collections.filter((c: any) => c.isActive).length,
    },
  });
});

// ============================================================================
// GraphQL & SQL Client
// ============================================================================

// SQL client for direct database queries
app.use("/sql/*", client({ db, schema }));

// GraphQL endpoint
app.use("/", graphql({ db, schema }));
app.use("/graphql", graphql({ db, schema }));

export default app;
