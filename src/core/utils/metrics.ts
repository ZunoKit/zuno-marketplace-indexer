/**
 * Metrics & Monitoring Service
 * Tracks indexer performance and health metrics
 */

export interface MetricSnapshot {
  timestamp: number;
  value: number | bigint;
}

export interface MetricSummary {
  count: number;
  sum: number;
  avg: number;
  min: number;
  max: number;
  latest: number;
}

export class MetricsService {
  private static instance: MetricsService;
  private metrics: Map<string, MetricSnapshot[]>;
  private counters: Map<string, number>;
  private gauges: Map<string, number>;
  private histograms: Map<string, number[]>;
  private readonly maxSnapshots = 1000; // Keep last 1000 snapshots per metric

  private constructor() {
    this.metrics = new Map();
    this.counters = new Map();
    this.gauges = new Map();
    this.histograms = new Map();
  }

  public static getInstance(): MetricsService {
    if (!MetricsService.instance) {
      MetricsService.instance = new MetricsService();
    }
    return MetricsService.instance;
  }

  /**
   * Record a metric value
   */
  record(name: string, value: number | bigint): void {
    const numValue = typeof value === 'bigint' ? Number(value) : value;

    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }

    const snapshots = this.metrics.get(name)!;
    snapshots.push({
      timestamp: Date.now(),
      value: numValue,
    });

    // Keep only last N snapshots
    if (snapshots.length > this.maxSnapshots) {
      snapshots.shift();
    }
  }

  /**
   * Increment a counter
   */
  increment(name: string, delta: number = 1): void {
    const current = this.counters.get(name) || 0;
    this.counters.set(name, current + delta);
  }

  /**
   * Set a gauge value
   */
  gauge(name: string, value: number): void {
    this.gauges.set(name, value);
  }

  /**
   * Add value to histogram
   */
  histogram(name: string, value: number): void {
    if (!this.histograms.has(name)) {
      this.histograms.set(name, []);
    }

    const values = this.histograms.get(name)!;
    values.push(value);

    // Keep only last N values
    if (values.length > this.maxSnapshots) {
      values.shift();
    }
  }

  /**
   * Get metric summary
   */
  getSummary(name: string): MetricSummary | null {
    const snapshots = this.metrics.get(name);
    if (!snapshots || snapshots.length === 0) {
      return null;
    }

    const values = snapshots.map(s => s.value as number);
    const sum = values.reduce((a, b) => a + b, 0);

    return {
      count: values.length,
      sum,
      avg: sum / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      latest: values[values.length - 1]!,
    };
  }

  /**
   * Get counter value
   */
  getCounter(name: string): number {
    return this.counters.get(name) || 0;
  }

  /**
   * Get gauge value
   */
  getGauge(name: string): number | undefined {
    return this.gauges.get(name);
  }

  /**
   * Get histogram percentile
   */
  getPercentile(name: string, percentile: number): number | null {
    const values = this.histograms.get(name);
    if (!values || values.length === 0) {
      return null;
    }

    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[index] || null;
  }

  /**
   * Get all metrics
   */
  getAllMetrics(): Record<string, any> {
    const result: Record<string, any> = {
      counters: Object.fromEntries(this.counters),
      gauges: Object.fromEntries(this.gauges),
      summaries: {},
      histograms: {},
    };

    // Add summaries
    for (const [name] of this.metrics) {
      const summary = this.getSummary(name);
      if (summary) {
        result.summaries[name] = summary;
      }
    }

    // Add histogram percentiles
    for (const [name] of this.histograms) {
      result.histograms[name] = {
        p50: this.getPercentile(name, 50),
        p90: this.getPercentile(name, 90),
        p95: this.getPercentile(name, 95),
        p99: this.getPercentile(name, 99),
      };
    }

    return result;
  }

  /**
   * Reset all metrics
   */
  reset(): void {
    this.metrics.clear();
    this.counters.clear();
    this.gauges.clear();
    this.histograms.clear();
  }

  /**
   * Reset specific metric
   */
  resetMetric(name: string): void {
    this.metrics.delete(name);
    this.counters.delete(name);
    this.gauges.delete(name);
    this.histograms.delete(name);
  }

  /**
   * Get metrics for time range
   */
  getMetricsForTimeRange(
    name: string,
    startTime: number,
    endTime: number
  ): MetricSnapshot[] {
    const snapshots = this.metrics.get(name);
    if (!snapshots) {
      return [];
    }

    return snapshots.filter(
      s => s.timestamp >= startTime && s.timestamp <= endTime
    );
  }

  /**
   * Print metrics report
   */
  printReport(): void {
    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log('║            INDEXER METRICS REPORT                        ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');

    // Counters
    if (this.counters.size > 0) {
      console.log('📊 COUNTERS:');
      for (const [name, value] of this.counters) {
        console.log(`  ${name}: ${value.toLocaleString()}`);
      }
      console.log('');
    }

    // Gauges
    if (this.gauges.size > 0) {
      console.log('📈 GAUGES:');
      for (const [name, value] of this.gauges) {
        console.log(`  ${name}: ${value.toLocaleString()}`);
      }
      console.log('');
    }

    // Summaries
    console.log('📉 SUMMARIES:');
    for (const [name] of this.metrics) {
      const summary = this.getSummary(name);
      if (summary) {
        console.log(`  ${name}:`);
        console.log(`    Count: ${summary.count}`);
        console.log(`    Avg:   ${summary.avg.toFixed(2)}`);
        console.log(`    Min:   ${summary.min}`);
        console.log(`    Max:   ${summary.max}`);
        console.log(`    Latest: ${summary.latest}`);
      }
    }

    console.log('\n══════════════════════════════════════════════════════════\n');
  }
}

// Export singleton getter
export function getMetrics(): MetricsService {
  return MetricsService.getInstance();
}

// Predefined metric names
export const MetricNames = {
  // Event processing
  EVENTS_PROCESSED: 'events.processed',
  EVENTS_FAILED: 'events.failed',
  EVENT_PROCESSING_TIME: 'events.processing_time_ms',

  // Database operations
  DB_OPERATIONS: 'db.operations',
  DB_ERRORS: 'db.errors',
  DB_QUERY_TIME: 'db.query_time_ms',

  // Block indexing
  BLOCKS_INDEXED: 'blocks.indexed',
  CURRENT_BLOCK: 'blocks.current',
  INDEXING_LAG: 'blocks.lag',

  // Collections
  COLLECTIONS_CREATED: 'collections.created',
  COLLECTIONS_TOTAL: 'collections.total',

  // Tokens
  TOKENS_MINTED: 'tokens.minted',
  TOKENS_TRANSFERRED: 'tokens.transferred',
  TOKENS_BURNED: 'tokens.burned',

  // Trades
  TRADES_EXECUTED: 'trades.executed',
  TRADE_VOLUME: 'trades.volume',

  // API
  API_REQUESTS: 'api.requests',
  API_ERRORS: 'api.errors',
  API_RESPONSE_TIME: 'api.response_time_ms',
} as const;
