/**
 * Error Handler Utility
 * Centralized error handling with retry logic and dead letter queue
 */

import type { Result } from "../../shared/types";

export interface RetryOptions {
  maxRetries: number;
  retryDelayMs: number;
  backoffMultiplier: number;
  retryableErrors?: string[];
}

export interface ErrorContext {
  eventName: string;
  blockNumber: bigint;
  transactionHash: string;
  attempt: number;
  [key: string]: any;
}

export class EventProcessingError extends Error {
  constructor(
    message: string,
    public readonly context: ErrorContext,
    public readonly originalError?: Error
  ) {
    super(message);
    this.name = 'EventProcessingError';
  }
}

export class RetryableError extends Error {
  constructor(message: string, public readonly retryAfterMs?: number) {
    super(message);
    this.name = 'RetryableError';
  }
}

export class FatalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FatalError';
  }
}

export class ErrorHandler {
  private static instance: ErrorHandler;
  private failedEvents: Map<string, { context: ErrorContext; error: Error; retries: number }>;
  private readonly defaultRetryOptions: RetryOptions = {
    maxRetries: 3,
    retryDelayMs: 1000,
    backoffMultiplier: 2,
    retryableErrors: [
      'ECONNRESET',
      'ETIMEDOUT',
      'ENOTFOUND',
      'Database connection error',
      'Transaction timeout',
    ],
  };

  private constructor() {
    this.failedEvents = new Map();
  }

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  /**
   * Check if error is retryable
   */
  isRetryable(error: Error): boolean {
    if (error instanceof RetryableError) {
      return true;
    }

    if (error instanceof FatalError) {
      return false;
    }

    // Check if error message matches retryable patterns
    const errorMessage = error.message.toLowerCase();
    return this.defaultRetryOptions.retryableErrors!.some(pattern =>
      errorMessage.includes(pattern.toLowerCase())
    );
  }

  /**
   * Execute function with retry logic
   */
  async withRetry<T>(
    fn: () => Promise<T>,
    context: ErrorContext,
    options?: Partial<RetryOptions>
  ): Promise<Result<T>> {
    const opts = { ...this.defaultRetryOptions, ...options };
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= opts.maxRetries; attempt++) {
      try {
        const result = await fn();

        // Remove from failed events if successful
        const eventKey = `${context.transactionHash}:${context.eventName}`;
        this.failedEvents.delete(eventKey);

        return { success: true, data: result };
      } catch (error) {
        lastError = error as Error;

        // Check if error is retryable
        if (!this.isRetryable(lastError)) {
          console.error(
            `[ErrorHandler] Fatal error in ${context.eventName} at block ${context.blockNumber}:`,
            lastError
          );
          return {
            success: false,
            error: new FatalError(`Fatal error: ${lastError.message}`)
          };
        }

        // Log retry attempt
        console.warn(
          `[ErrorHandler] Retry ${attempt}/${opts.maxRetries} for ${context.eventName} at block ${context.blockNumber}:`,
          lastError.message
        );

        // Calculate delay with exponential backoff
        if (attempt < opts.maxRetries) {
          const delay = opts.retryDelayMs * Math.pow(opts.backoffMultiplier, attempt - 1);
          await this.sleep(delay);
        }
      }
    }

    // All retries exhausted
    const eventKey = `${context.transactionHash}:${context.eventName}`;
    this.failedEvents.set(eventKey, {
      context,
      error: lastError!,
      retries: opts.maxRetries,
    });

    console.error(
      `[ErrorHandler] Max retries exhausted for ${context.eventName} at block ${context.blockNumber}`
    );

    return {
      success: false,
      error: new EventProcessingError(
        `Failed after ${opts.maxRetries} retries: ${lastError!.message}`,
        context,
        lastError!
      )
    };
  }

  /**
   * Get all failed events
   */
  getFailedEvents(): Array<{ context: ErrorContext; error: Error; retries: number }> {
    return Array.from(this.failedEvents.values());
  }

  /**
   * Get failed event by key
   */
  getFailedEvent(eventKey: string) {
    return this.failedEvents.get(eventKey);
  }

  /**
   * Retry all failed events
   */
  async retryFailedEvents(
    retryFn: (context: ErrorContext) => Promise<void>
  ): Promise<{ succeeded: number; failed: number }> {
    const failedEvents = Array.from(this.failedEvents.entries());
    let succeeded = 0;
    let failed = 0;

    console.log(`[ErrorHandler] Retrying ${failedEvents.length} failed events...`);

    for (const [eventKey, { context }] of failedEvents) {
      try {
        await retryFn(context);
        this.failedEvents.delete(eventKey);
        succeeded++;
      } catch (error) {
        console.error(`[ErrorHandler] Retry failed for ${eventKey}:`, error);
        failed++;
      }
    }

    console.log(
      `[ErrorHandler] Retry complete: ${succeeded} succeeded, ${failed} failed`
    );

    return { succeeded, failed };
  }

  /**
   * Clear failed events
   */
  clearFailedEvents(): void {
    this.failedEvents.clear();
  }

  /**
   * Get failed events count
   */
  getFailedEventsCount(): number {
    return this.failedEvents.size;
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Safe execution wrapper (catch and log, don't throw)
   */
  async safeExecute<T>(
    fn: () => Promise<T>,
    context: ErrorContext,
    fallbackValue?: T
  ): Promise<T | undefined> {
    try {
      return await fn();
    } catch (error) {
      console.error(
        `[ErrorHandler] Error in ${context.eventName} at block ${context.blockNumber}:`,
        error
      );

      // Store in failed events
      const eventKey = `${context.transactionHash}:${context.eventName}`;
      this.failedEvents.set(eventKey, {
        context,
        error: error as Error,
        retries: 0,
      });

      return fallbackValue;
    }
  }

  /**
   * Validate and sanitize event data
   */
  validateEventData(data: any, requiredFields: string[]): Result<void> {
    const missingFields = requiredFields.filter(field => !(field in data));

    if (missingFields.length > 0) {
      return {
        success: false,
        error: new Error(`Missing required fields: ${missingFields.join(', ')}`)
      };
    }

    return { success: true, data: undefined };
  }
}

// Export singleton getter
export function getErrorHandler(): ErrorHandler {
  return ErrorHandler.getInstance();
}
