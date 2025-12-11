import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { logger } from "../logger";

describe("logger", () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;
  let consoleInfoSpy: ReturnType<typeof vi.spyOn>;
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let consoleDebugSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    consoleInfoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    consoleDebugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Development Mode", () => {
    beforeEach(() => {
      (process.env as any).NODE_ENV = "development";
    });

    it("logs messages in development mode", () => {
      logger.log("Test message");
      expect(consoleLogSpy).toHaveBeenCalledWith("Test message");
    });

    it("logs info messages in development mode", () => {
      logger.info("Info message");
      expect(consoleInfoSpy).toHaveBeenCalledWith("Info message");
    });

    it("logs debug messages in development mode", () => {
      logger.debug("Debug message");
      expect(consoleDebugSpy).toHaveBeenCalledWith("Debug message");
    });

    it("logs multiple arguments", () => {
      logger.log("Message", 123, { key: "value" }, ["array"]);
      expect(consoleLogSpy).toHaveBeenCalledWith("Message", 123, { key: "value" }, ["array"]);
    });

    it("handles objects and arrays", () => {
      const obj = { foo: "bar", nested: { value: 42 } };
      const arr = [1, 2, 3];

      logger.log(obj, arr);
      expect(consoleLogSpy).toHaveBeenCalledWith(obj, arr);
    });

    it("handles undefined and null", () => {
      logger.log(undefined, null);
      expect(consoleLogSpy).toHaveBeenCalledWith(undefined, null);
    });
  });

  describe("Production Mode", () => {
    beforeEach(() => {
      (process.env as any).NODE_ENV = "production";
    });

    it("does not log messages in production mode", () => {
      logger.log("Test message");
      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it("does not log info messages in production mode", () => {
      logger.info("Info message");
      expect(consoleInfoSpy).not.toHaveBeenCalled();
    });

    it("does not log debug messages in production mode", () => {
      logger.debug("Debug message");
      expect(consoleDebugSpy).not.toHaveBeenCalled();
    });

    it("does not log even with multiple arguments", () => {
      logger.log("Message", 123, { key: "value" });
      expect(consoleLogSpy).not.toHaveBeenCalled();
    });
  });

  describe("Warnings - Always Logged", () => {
    it("logs warnings in development mode", () => {
      (process.env as any).NODE_ENV = "development";
      logger.warn("Warning message");
      expect(consoleWarnSpy).toHaveBeenCalledWith("Warning message");
    });

    it("logs warnings in production mode", () => {
      (process.env as any).NODE_ENV = "production";
      logger.warn("Warning message");
      expect(consoleWarnSpy).toHaveBeenCalledWith("Warning message");
    });

    it("logs warnings with multiple arguments", () => {
      logger.warn("Warning:", "Something went wrong", { code: 500 });
      expect(consoleWarnSpy).toHaveBeenCalledWith("Warning:", "Something went wrong", {
        code: 500,
      });
    });

    it("logs warnings in test mode", () => {
      (process.env as any).NODE_ENV = "test";
      logger.warn("Test warning");
      expect(consoleWarnSpy).toHaveBeenCalledWith("Test warning");
    });
  });

  describe("Errors - Always Logged", () => {
    it("logs errors in development mode", () => {
      (process.env as any).NODE_ENV = "development";
      logger.error("Error message");
      expect(consoleErrorSpy).toHaveBeenCalledWith("Error message");
    });

    it("logs errors in production mode", () => {
      (process.env as any).NODE_ENV = "production";
      logger.error("Error message");
      expect(consoleErrorSpy).toHaveBeenCalledWith("Error message");
    });

    it("logs error objects", () => {
      const error = new Error("Test error");
      logger.error("Error occurred:", error);
      expect(consoleErrorSpy).toHaveBeenCalledWith("Error occurred:", error);
    });

    it("logs errors with stack traces", () => {
      const error = new Error("Test error");
      error.stack = "Error: Test error\n  at ...\n  at ...";
      logger.error(error);
      expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    });

    it("logs errors in test mode", () => {
      (process.env as any).NODE_ENV = "test";
      logger.error("Test error");
      expect(consoleErrorSpy).toHaveBeenCalledWith("Test error");
    });
  });

  describe("Real-World Usage", () => {
    beforeEach(() => {
      (process.env as any).NODE_ENV = "development";
    });

    it("logs API request information", () => {
      logger.log("[API] Fetching events from", "/api/events");
      expect(consoleLogSpy).toHaveBeenCalledWith("[API] Fetching events from", "/api/events");
    });

    it("logs API errors", () => {
      const error = new Error("Network error");
      logger.error("[API] Request failed:", error);
      expect(consoleErrorSpy).toHaveBeenCalledWith("[API] Request failed:", error);
    });

    it("logs component render information", () => {
      logger.debug("[Component] EventCard rendered with id:", 123);
      expect(consoleDebugSpy).toHaveBeenCalledWith("[Component] EventCard rendered with id:", 123);
    });

    it("logs translation warnings", () => {
      logger.warn("[i18n] Missing translation for key:", "event.title");
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "[i18n] Missing translation for key:",
        "event.title"
      );
    });

    it("logs performance metrics", () => {
      logger.info("[Performance] Page load time:", 1234, "ms");
      expect(consoleInfoSpy).toHaveBeenCalledWith("[Performance] Page load time:", 1234, "ms");
    });
  });

  describe("Edge Cases", () => {
    beforeEach(() => {
      (process.env as any).NODE_ENV = "development";
    });

    it("handles empty calls", () => {
      logger.log();
      expect(consoleLogSpy).toHaveBeenCalledWith();
    });

    it("handles very long strings", () => {
      const longString = "a".repeat(10000);
      logger.log(longString);
      expect(consoleLogSpy).toHaveBeenCalledWith(longString);
    });

    it("handles circular references in objects", () => {
      const obj: Record<string, unknown> = { key: "value" };
      obj.self = obj; // Circular reference

      logger.log(obj);
      expect(consoleLogSpy).toHaveBeenCalledWith(obj);
    });

    it("handles symbols", () => {
      const sym = Symbol("test");
      logger.log(sym);
      expect(consoleLogSpy).toHaveBeenCalledWith(sym);
    });

    it("handles functions", () => {
      const fn = () => "test";
      logger.log(fn);
      expect(consoleLogSpy).toHaveBeenCalledWith(fn);
    });

    it("handles BigInt", () => {
      const bigInt = BigInt(9007199254740991);
      logger.log(bigInt);
      expect(consoleLogSpy).toHaveBeenCalledWith(bigInt);
    });
  });

  describe("Different Environments", () => {
    it("handles undefined NODE_ENV", () => {
      (process.env as any).NODE_ENV = undefined;
      logger.log("Test");
      // Should not log if NODE_ENV is undefined (not development)
      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it("handles test environment", () => {
      (process.env as any).NODE_ENV = "test";
      logger.log("Test message");
      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it("handles staging environment", () => {
      (process.env as any).NODE_ENV = "staging";
      logger.log("Staging message");
      expect(consoleLogSpy).not.toHaveBeenCalled();
    });
  });
});
