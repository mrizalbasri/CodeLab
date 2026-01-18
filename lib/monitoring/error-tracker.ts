// Simple error tracking - tidak mengubah tampilan web
import { getLogger } from "./logger.js";

interface ErrorReport {
  id: string;
  message: string;
  stack?: string;
  url: string;
  timestamp: string;
  context?: Record<string, any>;
}

class ErrorTracker {
  private errors: ErrorReport[] = [];
  private logger = getLogger();

  constructor() {
    if (typeof window !== "undefined") {
      this.setupGlobalHandlers();
    }
  }

  private setupGlobalHandlers() {
    // Unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      this.captureError(new Error(event.reason), {
        type: "unhandled_promise_rejection",
      });
    });

    // Global errors
    window.addEventListener("error", (event) => {
      this.captureError(new Error(event.message), {
        type: "global_error",
        filename: event.filename,
        lineno: event.lineno,
      });
    });
  }

  captureError(error: Error, context?: Record<string, any>) {
    const errorReport: ErrorReport = {
      id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      message: error.message,
      stack: error.stack,
      url: typeof window !== "undefined" ? window.location.href : "unknown",
      timestamp: new Date().toISOString(),
      context,
    };

    this.errors.push(errorReport);
    
    // Log to console
    this.logger.error("Error captured", error, context);

    // Keep only recent errors
    if (this.errors.length > 50) {
      this.errors = this.errors.slice(-50);
    }
  }

  getErrors(): ErrorReport[] {
    return [...this.errors];
  }
}

// Singleton instance
let errorTracker: ErrorTracker | null = null;

export function getErrorTracker(): ErrorTracker {
  if (!errorTracker) {
    errorTracker = new ErrorTracker();
  }
  return errorTracker;
}

// Convenience function
export function captureError(error: Error, context?: Record<string, any>) {
  getErrorTracker().captureError(error, context);
}