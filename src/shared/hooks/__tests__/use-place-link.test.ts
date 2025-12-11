import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { parsePlaceLink, usePlaceLink } from "../use-place-link";

describe("parsePlaceLink", () => {
  describe("with explicit URLs", () => {
    it("extracts URL from text", () => {
      const result = parsePlaceLink("Visit us at https://maps.google.com/place123");
      expect(result).toEqual({
        label: "Visit us at",
        url: "https://maps.google.com/place123",
      });
    });

    it("handles https URLs", () => {
      const result = parsePlaceLink("Location: https://www.google.com/maps");
      expect(result).toEqual({
        label: "Location:",
        url: "https://www.google.com/maps",
      });
    });

    it("handles http URLs", () => {
      const result = parsePlaceLink("Map: http://example.com/map");
      expect(result).toEqual({
        label: "Map:",
        url: "http://example.com/map",
      });
    });

    it("uses URL as label if no other text", () => {
      const result = parsePlaceLink("https://maps.google.com");
      expect(result).toEqual({
        label: "https://maps.google.com",
        url: "https://maps.google.com",
      });
    });

    it("handles multiple URLs (uses first)", () => {
      const result = parsePlaceLink("https://first.com text https://second.com");
      expect(result?.url).toBe("https://first.com");
    });
  });

  describe("without explicit URLs - desktop", () => {
    beforeEach(() => {
      // Mock desktop user agent
      Object.defineProperty(window.navigator, "userAgent", {
        value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        configurable: true,
      });
    });

    it("creates Google Maps search link", () => {
      const result = parsePlaceLink("SITIMM-CEFORMA - La Moderna");
      expect(result?.label).toBe("SITIMM-CEFORMA - La Moderna");
      expect(result?.url).toContain("https://www.google.com/maps/search/?api=1&query=");
      expect(result?.url).toContain(encodeURIComponent("SITIMM-CEFORMA - La Moderna"));
    });

    it("encodes special characters in query", () => {
      const result = parsePlaceLink("Place & Location #123");
      expect(result?.url).toContain(encodeURIComponent("Place & Location #123"));
    });
  });

  describe("without explicit URLs - mobile iOS", () => {
    beforeEach(() => {
      Object.defineProperty(window.navigator, "userAgent", {
        value: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15",
        configurable: true,
      });
    });

    it("creates Apple Maps deep link", () => {
      const result = parsePlaceLink("Test Location");
      expect(result?.url).toContain("maps://maps.apple.com/?q=");
      expect(result?.url).toContain(encodeURIComponent("Test Location"));
    });
  });

  describe("without explicit URLs - mobile Android", () => {
    beforeEach(() => {
      Object.defineProperty(window.navigator, "userAgent", {
        value: "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36",
        configurable: true,
      });
    });

    it("creates Android Maps intent", () => {
      const result = parsePlaceLink("Test Location");
      expect(result?.url).toContain("geo:0,0?q=");
      expect(result?.url).toContain(encodeURIComponent("Test Location"));
    });
  });

  describe("edge cases", () => {
    it("returns null for null input", () => {
      expect(parsePlaceLink(null)).toBeNull();
    });

    it("returns null for undefined input", () => {
      expect(parsePlaceLink(undefined)).toBeNull();
    });

    it("returns null for empty string", () => {
      expect(parsePlaceLink("")).toBeNull();
    });

    it("handles whitespace-only string", () => {
      // Whitespace-only strings are processed (creates a map link)
      // This is the current behavior - whitespace is preserved in the URL
      const result = parsePlaceLink("   ");
      expect(result).not.toBeNull();
      expect(result?.label).toBe("   ");
    });

    it("trims whitespace", () => {
      const result = parsePlaceLink("  Test Location  ");
      expect(result?.label).toBe("Test Location");
    });

    it("uses raw value as fallback label", () => {
      const result = parsePlaceLink("Location");
      expect(result?.label).toBe("Location");
    });
  });
});

describe("usePlaceLink", () => {
  let windowOpenSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.useFakeTimers();
    windowOpenSpy = vi.spyOn(window, "open").mockImplementation(() => null);
  });

  afterEach(() => {
    windowOpenSpy.mockRestore();
    vi.useRealTimers();
  });

  describe("hook return values", () => {
    it("returns parsed data", () => {
      const { result } = renderHook(() => usePlaceLink("https://maps.google.com"));

      expect(result.current.data).toEqual({
        label: "https://maps.google.com",
        url: "https://maps.google.com",
      });
    });

    it("returns hasLink true when data exists", () => {
      const { result } = renderHook(() => usePlaceLink("Test Location"));

      expect(result.current.hasLink).toBe(true);
    });

    it("returns hasLink false when no data", () => {
      const { result } = renderHook(() => usePlaceLink(null));

      expect(result.current.hasLink).toBe(false);
    });

    it("returns open function", () => {
      const { result } = renderHook(() => usePlaceLink("Test"));

      expect(typeof result.current.open).toBe("function");
    });

    it("updates when raw value changes", () => {
      const { result, rerender } = renderHook(({ raw }) => usePlaceLink(raw), {
        initialProps: { raw: "Location 1" },
      });

      expect(result.current.data?.label).toBe("Location 1");

      rerender({ raw: "Location 2" });

      expect(result.current.data?.label).toBe("Location 2");
    });
  });

  describe("open function", () => {
    it("does nothing when no data", () => {
      const { result } = renderHook(() => usePlaceLink(null));

      act(() => {
        result.current.open();
      });

      expect(windowOpenSpy).not.toHaveBeenCalled();
    });

    it("opens regular URL in new tab", () => {
      const { result } = renderHook(() => usePlaceLink("https://maps.google.com"));

      act(() => {
        result.current.open();
      });

      expect(windowOpenSpy).toHaveBeenCalledWith(
        "https://maps.google.com",
        "_blank",
        "noopener,noreferrer"
      );
    });

    it("handles Apple Maps deep link with fallback", () => {
      Object.defineProperty(window.navigator, "userAgent", {
        value: "iPhone",
        configurable: true,
      });

      const { result } = renderHook(() => usePlaceLink("Test Location"));

      // Mock location.href setter
      const hrefSpy = vi.fn();
      Object.defineProperty(window, "location", {
        value: { href: "" },
        writable: true,
        configurable: true,
      });
      Object.defineProperty(window.location, "href", {
        set: hrefSpy,
        configurable: true,
      });

      act(() => {
        result.current.open();
      });

      // Should try deep link
      expect(hrefSpy).toHaveBeenCalledWith(expect.stringContaining("maps://"));

      // Execute fallback after timeout
      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(windowOpenSpy).toHaveBeenCalledWith(
        expect.stringContaining("https://www.google.com/maps/search"),
        "_blank",
        "noopener,noreferrer"
      );
    });

    it("handles Android Maps intent with fallback", () => {
      Object.defineProperty(window.navigator, "userAgent", {
        value: "Android",
        configurable: true,
      });

      const { result } = renderHook(() => usePlaceLink("Test Location"));

      const hrefSpy = vi.fn();
      Object.defineProperty(window, "location", {
        value: { href: "" },
        writable: true,
        configurable: true,
      });
      Object.defineProperty(window.location, "href", {
        set: hrefSpy,
        configurable: true,
      });

      act(() => {
        result.current.open();
      });

      expect(hrefSpy).toHaveBeenCalledWith(expect.stringContaining("geo:"));

      // Execute fallback after timeout
      act(() => {
        vi.advanceTimersByTime(2000);
      });
    });
  });

  describe("memoization", () => {
    it("memoizes data based on raw value", () => {
      const { result, rerender } = renderHook(({ raw }) => usePlaceLink(raw), {
        initialProps: { raw: "Test" },
      });

      const firstData = result.current.data;

      // Rerender with same value
      rerender({ raw: "Test" });

      expect(result.current.data).toBe(firstData);
    });

    it("recalculates when raw value changes", () => {
      const { result, rerender } = renderHook(({ raw }) => usePlaceLink(raw), {
        initialProps: { raw: "Test 1" },
      });

      const firstData = result.current.data;

      rerender({ raw: "Test 2" });

      expect(result.current.data).not.toBe(firstData);
    });

    it("memoizes open function", () => {
      const { result, rerender } = renderHook(({ raw }) => usePlaceLink(raw), {
        initialProps: { raw: "Test" },
      });

      const firstOpen = result.current.open;

      rerender({ raw: "Test" });

      expect(result.current.open).toBe(firstOpen);
    });
  });
});
