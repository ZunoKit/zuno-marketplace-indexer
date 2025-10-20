/**
 * Sentry Error Tracking
 * Only active in production environment
 */

interface SentryOptions {
  tags?: Record<string, string>;
  extra?: Record<string, unknown>;
}

let sentryInitialized = false;

/**
 * Initialize Sentry (lazy loading)
 * Only runs in production
 */
function initSentry(): void {
  if (sentryInitialized) return;

  const dsn = process.env.SENTRY_DSN;
  const environment = process.env.NODE_ENV || "unknown";

  if (!dsn) {
    console.warn("SENTRY_DSN not configured, error tracking disabled");
    return;
  }

  // Note: Install @sentry/node when needed
  // import * as Sentry from '@sentry/node';
  // Sentry.init({
  //   dsn,
  //   environment,
  //   tracesSampleRate: 0.1,
  //   beforeSend(event) {
  //     // Filter sensitive data
  //     if (event.request?.headers) {
  //       delete event.request.headers.authorization;
  //       delete event.request.headers.cookie;
  //     }
  //     return event;
  //   },
  // });

  sentryInitialized = true;
  console.log(`Sentry initialized for environment: ${environment}`);
}

/**
 * Capture exception to Sentry
 */
export function captureException(error: Error, options?: SentryOptions): void {
  if (process.env.NODE_ENV !== "production") {
    return; // Sentry disabled in non-production
  }

  initSentry();

  // Note: Actual Sentry implementation
  // import * as Sentry from '@sentry/node';
  // Sentry.captureException(error, {
  //   tags: options?.tags,
  //   extra: options?.extra,
  // });

  // Fallback: Log to console if Sentry not available
  console.error("[Sentry]", error, options);
}

/**
 * Capture message to Sentry
 */
export function captureMessage(message: string, options?: SentryOptions): void {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  initSentry();

  // Note: Actual Sentry implementation
  // import * as Sentry from '@sentry/node';
  // Sentry.captureMessage(message, {
  //   tags: options?.tags,
  //   extra: options?.extra,
  // });

  console.log("[Sentry]", message, options);
}
