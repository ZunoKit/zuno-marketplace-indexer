/**
 * Zuno Marketplace Indexer API
 *
 * Simplified API implementation to avoid complex Ponder syntax issues.
 * This demonstrates the basic structure without complex query building.
 */

import { db } from "ponder:api";
import schema from "ponder:schema";
import { Hono } from "hono";
import { getEventLogger } from "@/infrastructure/logging/event-logger";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

app.use("*", cors());
app.use("*", logger());


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
      },
    },
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
      .from(schema.event)
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
    return c.json({ error: "Failed to fetch events" }, 500);
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
