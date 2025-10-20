/**
 * Cache Service
 * In-memory caching with TTL support
 */

import { logger } from "../utils/logger";
import { getEnvNumber, getEnvBoolean } from "../utils/helpers";

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

class CacheService {
  private cache: Map<string, CacheEntry<unknown>>;
  private enabled: boolean;
  private defaultTTL: number;

  constructor() {
    this.cache = new Map();
    this.enabled = getEnvBoolean("ENABLE_CACHE", true);
    this.defaultTTL = getEnvNumber("CACHE_TTL", 3600000); // 1 hour default

    if (this.enabled) {
      logger.info("Cache service initialized", { ttl: this.defaultTTL });
      this.startCleanupTimer();
    } else {
      logger.info("Cache service disabled");
    }
  }

  /**
   * Get cached value
   */
  get<T>(key: string): T | null {
    if (!this.enabled) {
      return null;
    }

    const entry = this.cache.get(key);

    if (!entry) {
      logger.debug("Cache miss", { key });
      return null;
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      logger.debug("Cache expired", { key });
      this.cache.delete(key);
      return null;
    }

    logger.debug("Cache hit", { key });
    return entry.data as T;
  }

  /**
   * Set cached value
   */
  set<T>(key: string, data: T, ttl?: number): void {
    if (!this.enabled) {
      return;
    }

    const expiresAt = Date.now() + (ttl ?? this.defaultTTL);

    this.cache.set(key, {
      data,
      expiresAt,
    });

    logger.debug("Cache set", { key, ttl: ttl ?? this.defaultTTL });
  }

  /**
   * Delete cached value
   */
  delete(key: string): boolean {
    if (!this.enabled) {
      return false;
    }

    const deleted = this.cache.delete(key);

    if (deleted) {
      logger.debug("Cache deleted", { key });
    }

    return deleted;
  }

  /**
   * Clear all cache
   */
  clear(): void {
    const size = this.cache.size;
    this.cache.clear();
    logger.info("Cache cleared", { clearedEntries: size });
  }

  /**
   * Get cache statistics
   */
  stats(): { size: number; enabled: boolean } {
    return {
      size: this.cache.size,
      enabled: this.enabled,
    };
  }

  /**
   * Cleanup expired entries periodically
   */
  private startCleanupTimer(): void {
    const cleanupInterval = 300000; // 5 minutes

    setInterval(() => {
      const now = Date.now();
      let cleaned = 0;

      for (const [key, entry] of this.cache.entries()) {
        if (now > entry.expiresAt) {
          this.cache.delete(key);
          cleaned++;
        }
      }

      if (cleaned > 0) {
        logger.debug("Cache cleanup completed", { cleanedEntries: cleaned });
      }
    }, cleanupInterval);
  }
}

// Singleton instance
export const cacheService = new CacheService();
