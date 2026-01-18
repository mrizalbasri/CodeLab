// Simple logger utility
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 100;

  private log(level: LogLevel, message: string, ...data: any[]) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      data: data.length > 0 ? data : undefined,
    };

    this.logs.push(entry);

    // Keep only recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Console output
    const consoleMethod = console[level] || console.log;
    consoleMethod(`[${level.toUpperCase()}] ${message}`, ...data);
  }

  debug(message: string, ...data: any[]) {
    this.log('debug', message, ...data);
  }

  info(message: string, ...data: any[]) {
    this.log('info', message, ...data);
  }

  warn(message: string, ...data: any[]) {
    this.log('warn', message, ...data);
  }

  error(message: string, ...data: any[]) {
    this.log('error', message, ...data);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }
}

// Singleton instance
let logger: Logger | null = null;

export function getLogger(): Logger {
  if (!logger) {
    logger = new Logger();
  }
  return logger;
}