/**
 * Logger Utility
 * Development: Console logging
 * Production: Sentry integration
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isProduction: boolean;

  constructor() {
    this.isProduction = process.env.NODE_ENV === "production";
  }

  debug(message: string, context?: LogContext): void {
    this.log("debug", message, context);
  }

  info(message: string, context?: LogContext): void {
    this.log("info", message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.log("warn", message, context);
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    this.log("error", message, {
      ...context,
      error: this.serializeError(error),
    });

    // Send to Sentry in production
    if (this.isProduction && error instanceof Error) {
      this.captureException(error, context);
    }
  }

  private log(level: LogLevel, message: string, context?: LogContext): void {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      level: level.toUpperCase(),
      message,
      ...context,
    };

    // Console logging (always enabled in dev, structured in production)
    if (!this.isProduction) {
      this.consoleLog(level, message, context);
    } else {
      // Structured JSON logging for production
      console.log(JSON.stringify(logData));
    }
  }

  private consoleLog(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): void {
    const emoji = {
      debug: "🔍",
      info: "ℹ️",
      warn: "⚠️",
      error: "❌",
    }[level];

    const style = {
      debug: "\x1b[36m", // Cyan
      info: "\x1b[32m", // Green
      warn: "\x1b[33m", // Yellow
      error: "\x1b[31m", // Red
    }[level];

    const reset = "\x1b[0m";
    const contextStr = context ? ` ${JSON.stringify(context, null, 2)}` : "";

    console.log(
      `${style}${emoji} [${level.toUpperCase()}]${reset} ${message}${contextStr}`
    );
  }

  private serializeError(error: unknown): Record<string, unknown> {
    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
        stack: error.stack,
        cause: error.cause,
      };
    }
    return { error: String(error) };
  }

  private captureException(error: Error, context?: LogContext): void {
    // Sentry integration (only in production)
    // Dynamic import to avoid loading in development
    void import("./sentry.js")
      .then((sentry) => {
        sentry.captureException(error, {
          tags: {
            environment: process.env.NODE_ENV || "unknown",
          },
          extra: context,
        });
      })
      .catch((err) => {
        console.error("Failed to send error to Sentry:", err);
      });
  }
}

// Singleton instance
export const logger = new Logger();
