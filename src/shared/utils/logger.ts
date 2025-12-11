/**
 * Logger utility - Only logs in development
 */

// Evaluate at runtime to support testing with different NODE_ENV values
const isDevelopment = () => process.env.NODE_ENV === "development";

export const logger = {
  log: (...args: unknown[]) => {
    if (isDevelopment()) {
      console.log(...args);
    }
  },
  info: (...args: unknown[]) => {
    if (isDevelopment()) {
      console.info(...args);
    }
  },
  warn: (...args: unknown[]) => {
    console.warn(...args); // Always show warnings
  },
  error: (...args: unknown[]) => {
    console.error(...args); // Always show errors
  },
  debug: (...args: unknown[]) => {
    if (isDevelopment()) {
      console.debug(...args);
    }
  },
};
