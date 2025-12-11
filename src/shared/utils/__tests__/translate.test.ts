import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  translateText,
  translateObject,
  translateArray,
  clearTranslationCache,
} from "../translate";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("translate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear cache to prevent test contamination
    clearTranslationCache();
    // Default to production for most tests
    (process.env as any).NODE_ENV = "production";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("translateText", () => {
    it("returns original text in development mode", async () => {
      (process.env as any).NODE_ENV = "development";
      const result = await translateText("Hola mundo", "en");
      expect(result).toBe("Hola mundo");
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it("returns original text when target language is Spanish", async () => {
      const result = await translateText("Hola mundo", "es");
      expect(result).toBe("Hola mundo");
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it("returns empty string when text is empty", async () => {
      const result = await translateText("", "en");
      expect(result).toBe("");
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it("translates Spanish text to English", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ translatedText: "Hello world" }),
      });

      const result = await translateText("Hola mundo", "en");

      expect(result).toBe("Hello world");
      expect(mockFetch).toHaveBeenCalledWith(
        "https://libretranslate.com/translate",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            q: "Hola mundo",
            source: "es",
            target: "en",
            format: "text",
          }),
        })
      );
    });

    it("translates to French when specified", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ translatedText: "Bonjour monde" }),
      });

      const result = await translateText("Hola mundo", "fr");

      expect(result).toBe("Bonjour monde");
      expect(mockFetch).toHaveBeenCalledWith(
        "https://libretranslate.com/translate",
        expect.objectContaining({
          body: expect.stringContaining('"target":"fr"'),
        })
      );
    });

    it("caches translation results", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ translatedText: "Hello world" }),
      });

      // First call
      const result1 = await translateText("Hola mundo", "en");
      expect(result1).toBe("Hello world");
      expect(mockFetch).toHaveBeenCalledTimes(1);

      // Second call should use cache
      const result2 = await translateText("Hola mundo", "en");
      expect(result2).toBe("Hello world");
      expect(mockFetch).toHaveBeenCalledTimes(1); // Still only called once
    });

    it("handles API errors gracefully and returns original text", async () => {
      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: "Service Unavailable",
      });

      const result = await translateText("Hola mundo", "en");

      expect(result).toBe("Hola mundo");
      expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining("Translation failed"));

      consoleWarnSpy.mockRestore();
    });

    it("handles network errors gracefully and returns original text", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await translateText("Hola mundo", "en");

      expect(result).toBe("Hola mundo");
      expect(consoleErrorSpy).toHaveBeenCalledWith("Translation error:", expect.any(Error));

      consoleErrorSpy.mockRestore();
    });

    it("handles empty response from API", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      const result = await translateText("Hola mundo", "en");

      expect(result).toBe("Hola mundo"); // Falls back to original
    });

    it("applies delay between translations", async () => {
      vi.useFakeTimers();

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ translatedText: "Hello" }),
      });

      const promise = translateText("Hola", "en");

      // Fast-forward time
      vi.advanceTimersByTime(150);

      await promise;

      expect(mockFetch).toHaveBeenCalled();

      vi.useRealTimers();
    });

    it("handles very long text", async () => {
      const longText = "a".repeat(1000);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ translatedText: "b".repeat(1000) }),
      });

      const result = await translateText(longText, "en");

      expect(result).toBe("b".repeat(1000));
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining(longText),
        })
      );
    });

    it("handles special characters", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ translatedText: "Hello! How are you? 😊" }),
      });

      const result = await translateText("¡Hola! ¿Cómo estás? 😊", "en");

      expect(result).toBe("Hello! How are you? 😊");
    });
  });

  describe("translateObject", () => {
    it("returns original object in development mode", async () => {
      (process.env as any).NODE_ENV = "development";

      const obj = { title: "Hola", description: "Mundo" };
      const result = await translateObject(obj, ["title", "description"], "en");

      expect(result).toEqual(obj);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it("returns original object when target is Spanish", async () => {
      const obj = { title: "Hola", description: "Mundo" };
      const result = await translateObject(obj, ["title", "description"], "es");

      expect(result).toEqual(obj);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it("translates specified fields only", async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ translatedText: "Hello" }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ translatedText: "World" }),
        });

      const obj = {
        title: "Hola",
        description: "Mundo",
        id: 123,
        date: "2024-01-01",
      };

      const result = await translateObject(obj, ["title", "description"], "en");

      expect(result).toEqual({
        title: "Hello",
        description: "World",
        id: 123,
        date: "2024-01-01",
      });
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it("skips non-string fields", async () => {
      const obj = {
        title: "Hola",
        count: 42,
        active: true,
        items: ["a", "b"],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ translatedText: "Hello" }),
      });

      const result = await translateObject(obj, ["title", "count", "active"], "en");

      expect(result.title).toBe("Hello");
      expect(result.count).toBe(42);
      expect(result.active).toBe(true);
      expect(mockFetch).toHaveBeenCalledTimes(1); // Only title is string
    });

    it("skips empty string fields", async () => {
      const obj = { title: "Hola", description: "" };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ translatedText: "Hello" }),
      });

      const result = await translateObject(obj, ["title", "description"], "en");

      expect(result.title).toBe("Hello");
      expect(result.description).toBe("");
      expect(mockFetch).toHaveBeenCalledTimes(1); // Only title
    });

    it("preserves object structure", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ translatedText: "Event" }),
      });

      const obj = {
        title: "Evento",
        nested: { value: "test" },
        array: [1, 2, 3],
      };

      const result = await translateObject(obj, ["title"], "en");

      expect(result.title).toBe("Event");
      expect(result.nested).toEqual({ value: "test" });
      expect(result.array).toEqual([1, 2, 3]);
    });
  });

  describe("translateArray", () => {
    it("returns original array in development mode", async () => {
      (process.env as any).NODE_ENV = "development";

      const array = [{ title: "Hola" }, { title: "Adiós" }];

      const result = await translateArray(array, ["title"], "en");

      expect(result).toEqual(array);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it("returns original array when target is Spanish", async () => {
      const array = [{ title: "Hola" }, { title: "Adiós" }];

      const result = await translateArray(array, ["title"], "es");

      expect(result).toEqual(array);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it("translates all items in array", async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ translatedText: "Hello" }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ translatedText: "Goodbye" }),
        });

      const array = [
        { title: "Hola", id: 1 },
        { title: "Adiós", id: 2 },
      ];

      const result = await translateArray(array, ["title"], "en");

      expect(result).toEqual([
        { title: "Hello", id: 1 },
        { title: "Goodbye", id: 2 },
      ]);
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it("handles empty array", async () => {
      const result = await translateArray([], ["title"], "en");

      expect(result).toEqual([]);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it("translates multiple fields per item", async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ translatedText: "Event" }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ translatedText: "Description" }),
        });

      const array = [
        {
          title: "Evento",
          description: "Descripción",
          id: 1,
        },
      ];

      const result = await translateArray(array, ["title", "description"], "en");

      expect(result).toEqual([
        {
          title: "Event",
          description: "Description",
          id: 1,
        },
      ]);
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it("handles translation errors for individual items", async () => {
      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ translatedText: "Hello" }),
        })
        .mockResolvedValueOnce({
          ok: false,
          statusText: "Error",
        });

      const array = [{ title: "Hola" }, { title: "Adiós" }];

      const result = await translateArray(array, ["title"], "en");

      expect(result[0].title).toBe("Hello");
      expect(result[1].title).toBe("Adiós"); // Fallback to original

      consoleWarnSpy.mockRestore();
    });

    it("maintains array order", async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ translatedText: "First" }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ translatedText: "Second" }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ translatedText: "Third" }),
        });

      const array = [
        { title: "Primero", order: 1 },
        { title: "Segundo", order: 2 },
        { title: "Tercero", order: 3 },
      ];

      const result = await translateArray(array, ["title"], "en");

      expect(result[0].order).toBe(1);
      expect(result[1].order).toBe(2);
      expect(result[2].order).toBe(3);
      expect(result[0].title).toBe("First");
      expect(result[1].title).toBe("Second");
      expect(result[2].title).toBe("Third");
    });
  });
});
