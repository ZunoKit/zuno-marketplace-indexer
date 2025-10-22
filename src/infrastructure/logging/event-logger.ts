/**
 * Event Logger Utility
 * Centralized logging for blockchain events
 */

import type { Address, Hash } from "@/shared/types";

export interface EventLoggerOptions {
  enabled: boolean;
  verbose: boolean;
  includeDetails: boolean;
}

export class EventLogger {
  private static instance: EventLogger;
  private options: EventLoggerOptions;

  private constructor(options?: Partial<EventLoggerOptions>) {
    this.options = {
      enabled: process.env.NODE_ENV !== 'production',
      verbose: process.env.VERBOSE_LOGGING === 'true',
      includeDetails: process.env.DETAILED_LOGGING === 'true',
      ...options,
    };
  }

  public static getInstance(options?: Partial<EventLoggerOptions>): EventLogger {
    if (!EventLogger.instance) {
      EventLogger.instance = new EventLogger(options);
    }
    return EventLogger.instance;
  }

  /**
   * Log event processing start
   */
  logEventStart(
    eventName: string,
    contractAddress: Address,
    blockNumber: bigint,
    txHash: Hash
  ): void {
    if (!this.options.enabled) return;

    const prefix = this.options.verbose ? '🔍' : '→';
    console.log(
      `${prefix} [${eventName}] Block ${blockNumber} | ${contractAddress.slice(0, 10)}... | ${txHash.slice(0, 10)}...`
    );
  }

  /**
   * Log event processing success
   */
  logEventSuccess(
    eventName: string,
    details?: Record<string, any>
  ): void {
    if (!this.options.enabled) return;

    const prefix = this.options.verbose ? '✅' : '✓';
    let message = `${prefix} [${eventName}] Processed successfully`;

    if (this.options.includeDetails && details) {
      message += `\n${JSON.stringify(details, null, 2)}`;
    }

    console.log(message);
  }

  /**
   * Log event processing error
   */
  logEventError(
    eventName: string,
    error: Error,
    context?: Record<string, any>
  ): void {
    if (!this.options.enabled) return;

    console.error(`❌ [${eventName}] Processing failed:`, error.message);

    if (this.options.includeDetails && context) {
      console.error('Context:', JSON.stringify(context, null, 2));
    }

    if (this.options.verbose) {
      console.error('Stack:', error.stack);
    }
  }

  /**
   * Log warning
   */
  logWarning(eventName: string, message: string, data?: any): void {
    if (!this.options.enabled) return;

    console.warn(`⚠️  [${eventName}] ${message}`);

    if (this.options.includeDetails && data) {
      console.warn('Data:', JSON.stringify(data, null, 2));
    }
  }

  /**
   * Log info
   */
  logInfo(eventName: string, message: string, data?: any): void {
    if (!this.options.enabled) return;

    console.log(`ℹ️  [${eventName}] ${message}`);

    if (this.options.includeDetails && data) {
      console.log('Data:', JSON.stringify(data, null, 2));
    }
  }

  /**
   * Log metric
   */
  logMetric(metricName: string, value: number | bigint, unit?: string): void {
    if (!this.options.enabled || !this.options.verbose) return;

    const unitStr = unit ? ` ${unit}` : '';
    console.log(`📊 [Metric] ${metricName}: ${value}${unitStr}`);
  }

  /**
   * Enable logging
   */
  enable(): void {
    this.options.enabled = true;
  }

  /**
   * Disable logging
   */
  disable(): void {
    this.options.enabled = false;
  }

  /**
   * Set verbose mode
   */
  setVerbose(verbose: boolean): void {
    this.options.verbose = verbose;
  }

  /**
   * Set detailed logging
   */
  setDetailed(detailed: boolean): void {
    this.options.includeDetails = detailed;
  }
}

// Export singleton getter
export function getEventLogger(options?: Partial<EventLoggerOptions>): EventLogger {
  return EventLogger.getInstance(options);
}
