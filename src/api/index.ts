/**
 * Zuno Marketplace Indexer API
 *
 * Simplified API implementation to avoid complex Ponder syntax issues.
 * This demonstrates the basic structure without complex query building.
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
        status: "/api/status",
      },
    },
  });
});

app.get("/api/status", (c) => {
  return c.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// ============================================================================
// REST API Routes - Simplified Implementation
// ============================================================================

/**
 * Get collections - Simplified version
 */
app.get("/api/collections", async (c) => {
  try {
    const page = parseInt(c.req.query("page") || "1");
    const limit = Math.min(parseInt(c.req.query("limit") || "20"), 100);
    const offset = (page - 1) * limit;

    const collections = await db
      .select()
      .from(schema.collection)
      .limit(limit)
      .offset(offset)
      .execute();

    return c.json({
      success: true,
      data: collections,
      pagination: {
        page,
        limit,
        total: collections.length,
      },
    });
  } catch (error) {
    console.error("Error fetching collections:", error);
    return c.json({ error: "Failed to fetch collections" }, 500);
  }
});

/**
 * Get tokens - Simplified version
 */
app.get("/api/tokens", async (c) => {
  try {
    const page = parseInt(c.req.query("page") || "1");
    const limit = Math.min(parseInt(c.req.query("limit") || "20"), 100);
    const offset = (page - 1) * limit;

    const tokens = await db
      .select()
      .from(schema.token)
      .limit(limit)
      .offset(offset)
      .execute();

    return c.json({
      success: true,
      data: tokens,
      pagination: {
        page,
        limit,
        total: tokens.length,
      },
    });
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return c.json({ error: "Failed to fetch tokens" }, 500);
  }
});

/**
 * Get trades - Simplified version
 */
app.get("/api/trades", async (c) => {
  try {
    const page = parseInt(c.req.query("page") || "1");
    const limit = Math.min(parseInt(c.req.query("limit") || "20"), 100);
    const offset = (page - 1) * limit;

    const trades = await db
      .select()
      .from(schema.trade)
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
  } catch (error) {
    console.error("Error fetching trades:", error);
    return c.json({ error: "Failed to fetch trades" }, 500);
  }
});

/**
 * Get accounts - Simplified version
 */
app.get("/api/accounts", async (c) => {
  try {
    const page = parseInt(c.req.query("page") || "1");
    const limit = Math.min(parseInt(c.req.query("limit") || "20"), 100);
    const offset = (page - 1) * limit;

    const accounts = await db
      .select()
      .from(schema.account)
      .limit(limit)
      .offset(offset)
      .execute();

    return c.json({
      success: true,
      data: accounts,
      pagination: {
        page,
        limit,
        total: accounts.length,
      },
    });
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return c.json({ error: "Failed to fetch accounts" }, 500);
  }
});

/**
 * Get events - Simplified version
 */
app.get("/api/events", async (c) => {
  try {
    const page = parseInt(c.req.query("page") || "1");
    const limit = Math.min(parseInt(c.req.query("limit") || "20"), 100);
    const offset = (page - 1) * limit;

    const events = await db
      .select()
      .from(schema.eventLog)
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
  } catch (error) {
    console.error("Error fetching events:", error);
    return c.json({ error: "Failed to fetch events" }, 500);
  }
});

/**
 * Get stats - Simplified version
 */
app.get("/api/stats", async (c) => {
  try {
    const [collections, tokens, trades, accounts] = await Promise.all([
      db.select().from(schema.collection).execute(),
      db.select().from(schema.token).execute(),
      db.select().from(schema.trade).execute(),
      db.select().from(schema.account).execute(),
    ]);

    return c.json({
      success: true,
      data: {
        collections: collections.length,
        tokens: tokens.length,
        trades: trades.length,
        accounts: accounts.length,
        totalVolume: trades.reduce(
          (sum, trade) => sum + parseFloat(trade.price || "0"),
          0
        ),
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return c.json({ error: "Failed to fetch stats" }, 500);
  }
});

// ============================================================================
// GraphQL Integration
// ============================================================================

// GraphQL endpoint
app.get("/graphql", (c) => {
  return c.text("GraphQL endpoint available at /graphql (POST)");
});

// ============================================================================
// Export
// ============================================================================

export default app;
