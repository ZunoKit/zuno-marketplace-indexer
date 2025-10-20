/**
 * Base Repository
 * Abstract base class implementing common database operations
 * Following Repository pattern for data access abstraction
 */

import type { Address, Result, Timestamp } from "../core/types";

export interface BaseEntity {
  id?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface DatabaseContext {
  db: any; // Ponder DB instance
  network: {
    chainId: number;
    name: string;
  };
}

export abstract class BaseRepository<T extends BaseEntity> {
  protected context: DatabaseContext;
  protected tableName: string;

  constructor(context: DatabaseContext, tableName: string) {
    this.context = context;
    this.tableName = tableName;
  }

  /**
   * Get database instance
   */
  protected get db() {
    return this.context.db;
  }

  /**
   * Get current chain ID
   */
  protected get chainId(): number {
    return this.context.network.chainId;
  }

  /**
   * Create a new entity
   */
  async create(entity: Partial<T>): Promise<Result<T>> {
    try {
      const table = this.getTable();
      await this.db.insert(table).values(entity);
      return { success: true, data: entity as T };
    } catch (error) {
      console.error(`[${this.tableName}Repository] Create error:`, error);
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Create failed')
      };
    }
  }

  /**
   * Find entity by ID
   */
  async findById(id: string): Promise<Result<T | null>> {
    try {
      const table = this.getTable();
      const results = await this.db
        .select()
        .from(table)
        .where((q: any) => q.id.equals(id))
        .limit(1)
        .execute();

      return {
        success: true,
        data: results.length > 0 ? results[0] : null
      };
    } catch (error) {
      console.error(`[${this.tableName}Repository] FindById error:`, error);
      return {
        success: false,
        error: error instanceof Error ? error : new Error('FindById failed')
      };
    }
  }

  /**
   * Find entity by address
   */
  async findByAddress(address: Address): Promise<Result<T | null>> {
    try {
      const table = this.getTable();
      const results = await this.db
        .select()
        .from(table)
        .where((q: any) => q.address.equals(address))
        .limit(1)
        .execute();

      return {
        success: true,
        data: results.length > 0 ? results[0] : null
      };
    } catch (error) {
      console.error(`[${this.tableName}Repository] FindByAddress error:`, error);
      return {
        success: false,
        error: error instanceof Error ? error : new Error('FindByAddress failed')
      };
    }
  }

  /**
   * Update entity
   */
  async update(id: string, data: Partial<T>): Promise<Result<T>> {
    try {
      const table = this.getTable();
      await this.db
        .update(table, { id })
        .set(data);

      // Return updated entity
      const result = await this.findById(id);
      if (result.success && result.data) {
        return { success: true, data: result.data };
      }

      return {
        success: false,
        error: new Error('Entity not found after update')
      };
    } catch (error) {
      console.error(`[${this.tableName}Repository] Update error:`, error);
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Update failed')
      };
    }
  }

  /**
   * Delete entity
   */
  async delete(id: string): Promise<Result<boolean>> {
    try {
      const table = this.getTable();
      await this.db
        .delete(table)
        .where((q: any) => q.id.equals(id));

      return { success: true, data: true };
    } catch (error) {
      console.error(`[${this.tableName}Repository] Delete error:`, error);
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Delete failed')
      };
    }
  }

  /**
   * Find all entities with optional filters
   */
  async findAll(filters?: Record<string, any>): Promise<Result<T[]>> {
    try {
      const table = this.getTable();
      let query = this.db.select().from(table);

      // Apply filters if provided
      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          query = query.where((q: any) => q[key].equals(value));
        }
      }

      const results = await query.execute();
      return { success: true, data: results };
    } catch (error) {
      console.error(`[${this.tableName}Repository] FindAll error:`, error);
      return {
        success: false,
        error: error instanceof Error ? error : new Error('FindAll failed')
      };
    }
  }

  /**
   * Count entities
   */
  async count(filters?: Record<string, any>): Promise<Result<number>> {
    try {
      const result = await this.findAll(filters);
      if (!result.success) {
        return result;
      }
      return { success: true, data: result.data.length };
    } catch (error) {
      console.error(`[${this.tableName}Repository] Count error:`, error);
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Count failed')
      };
    }
  }

  /**
   * Check if entity exists
   */
  async exists(id: string): Promise<Result<boolean>> {
    const result = await this.findById(id);
    if (!result.success) {
      return result;
    }
    return { success: true, data: result.data !== null };
  }

  /**
   * Get table reference - must be implemented by child classes
   */
  protected abstract getTable(): any;

  /**
   * Upsert entity (insert or update)
   */
  async upsert(id: string, data: Partial<T>): Promise<Result<T>> {
    const existsResult = await this.exists(id);
    
    if (!existsResult.success) {
      return existsResult;
    }

    if (existsResult.data) {
      return this.update(id, data);
    } else {
      return this.create({ ...data, id } as Partial<T>);
    }
  }
}

