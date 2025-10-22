/**
 * Repository Index
 *
 * Central export point for all repositories.
 * Simplifies imports across the codebase.
 *
 * @module repositories
 */

export { AccountRepository, type AccountEntity } from "./account.repository";
export {
  CollectionRepository,
  type CollectionEntity,
} from "./collection.repository";
export { TokenRepository, type TokenEntity } from "./token.repository";
export { TradeRepository, type TradeEntity } from "./trade.repository";
export {
  EventRepository,
  type EventEntity,
  type EventData,
  type EventCategory,
  type EventFilters,
} from "./event.repository";

// Re-export base repository for custom repositories
export {
  BaseRepository,
  type DatabaseContext,
  type BaseEntity,
} from "@/shared/base/base.repository";
