/**
 * Handler Wrapper
 * Wraps event handlers with error handling, retry logic, and metrics
 */

import type { ErrorContext } from "./error-handler";
import { getErrorHandler } from "./error-handler";
import { getEventLogger } from "./event-logger";
import { getMetrics, MetricNames } from "./metrics";

const errorHandler = getErrorHandler();
const logger = getEventLogger();
const metrics = getMetrics();

export type EventHandler<TEvent = any, TContext = any> = (args: {
  event: TEvent;
  context: TContext;
}) => Promise<void>;

/**
 * Wrap handler with error handling, retry logic, and metrics
 */
export function wrapHandler<TEvent = any, TContext = any>(
  eventName: string,
  handler: EventHandler<TEvent, TContext>
): EventHandler<TEvent, TContext> {
  return async ({ event, context }: { event: any; context: any }) => {
    const startTime = Date.now();
    const blockNumber = event.block.number;
    const transactionHash = event.transaction.hash;

    // Build error context
    const errorContext: ErrorContext = {
      eventName,
      blockNumber,
      transactionHash,
      attempt: 1,
      contractAddress: event.log.address,
      logIndex: event.log.logIndex,
    };

    try {
      // Execute handler with retry logic
      const result = await errorHandler.withRetry(
        () => handler({ event, context }),
        errorContext,
        {
          maxRetries: 3,
          retryDelayMs: 1000,
          backoffMultiplier: 2,
        }
      );

      const processingTime = Date.now() - startTime;

      if (result.success) {
        // Record success metrics
        metrics.increment(MetricNames.EVENTS_PROCESSED);
        metrics.histogram(MetricNames.EVENT_PROCESSING_TIME, processingTime);
        metrics.gauge(MetricNames.CURRENT_BLOCK, Number(blockNumber));

        logger.logMetric(`${eventName} Processing Time`, processingTime, "ms");
      } else {
        // Record failure metrics
        metrics.increment(MetricNames.EVENTS_FAILED);
        metrics.gauge(
          `${eventName}.failed_count`,
          metrics.getCounter(MetricNames.EVENTS_FAILED)
        );

        logger.logEventError(eventName, result.error, errorContext);
      }
    } catch (error) {
      // Unexpected error (shouldn't happen with error handler, but just in case)
      const processingTime = Date.now() - startTime;

      metrics.increment(MetricNames.EVENTS_FAILED);
      logger.logEventError(eventName, error as Error, errorContext);

      // Log to event log repository for debugging
      console.error(
        `[HandlerWrapper] Unexpected error in ${eventName}:`,
        error
      );
    }
  };
}

/**
 * Batch wrap multiple handlers
 */
export function wrapHandlers<T extends Record<string, EventHandler>>(
  handlers: T
): T {
  const wrapped: any = {};

  for (const [name, handler] of Object.entries(handlers)) {
    wrapped[name] = wrapHandler(name, handler);
  }

  return wrapped;
}

/**
 * Create monitored handler (simpler version without retry)
 */
export function monitoredHandler<TEvent = any, TContext = any>(
  eventName: string,
  handler: EventHandler<TEvent, TContext>
): EventHandler<TEvent, TContext> {
  return async ({ event, context }: { event: any; context: any }) => {
    const startTime = Date.now();

    try {
      await handler({ event, context });

      const processingTime = Date.now() - startTime;
      metrics.increment(MetricNames.EVENTS_PROCESSED);
      metrics.histogram(MetricNames.EVENT_PROCESSING_TIME, processingTime);
    } catch (error) {
      const processingTime = Date.now() - startTime;
      metrics.increment(MetricNames.EVENTS_FAILED);

      logger.logEventError(eventName, error as Error, {
        eventName,
        blockNumber: event.block.number,
        transactionHash: event.transaction.hash,
        attempt: 1,
        processingTime,
      });

      throw error; // Re-throw to let Ponder handle it
    }
  };
}
