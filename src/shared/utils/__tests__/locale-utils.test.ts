import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  spanishSpeakingCountries,
  europeanCountries,
  americanCountries,
  detectBrowserLanguage,
  getDefaultLocale,
  getFlagForLanguage,
  shouldShowFlags,
} from "../locale-utils";

describe("locale-utils", () => {
  describe("constants", () => {
    it("exports Spanish-speaking countries", () => {
      expect(spanishSpeakingCountries).toContain("MX");
      expect(spanishSpeakingCountries).toContain("ES");
      expect(spanishSpeakingCountries).toContain("AR");
      expect(spanishSpeakingCountries.length).toBeGreaterThan(15);
    });

    it("exports European countries", () => {
      expect(europeanCountries).toContain("ES");
      expect(europeanCountries).toContain("FR");
      expect(europeanCountries).toContain("DE");
      expect(europeanCountries).toContain("GB");
    });

    it("exports American countries", () => {
      expect(americanCountries).toContain("US");
      expect(americanCountries).toContain("CA");
      expect(americanCountries).toContain("MX");
      expect(americanCountries).toContain("BR");
    });
  });

  describe("detectBrowserLanguage", () => {
    let originalWindow: typeof window;
    let originalNavigator: Navigator;

    beforeEach(() => {
      originalWindow = globalThis.window;
      originalNavigator = globalThis.navigator;
    });

    afterEach(() => {
      globalThis.window = originalWindow;
      globalThis.navigator = originalNavigator;
    });

    it("returns 'en' when window is undefined (SSR)", () => {
      vi.stubGlobal("window", undefined);
      expect(detectBrowserLanguage()).toBe("en");
    });

    it("detects Spanish from navigator.language", () => {
      vi.stubGlobal("navigator", {
        language: "es-MX",
        languages: ["es-MX", "en-US"],
      });

      expect(detectBrowserLanguage()).toBe("es");
    });

    it("detects Spanish from navigator.languages array", () => {
      vi.stubGlobal("navigator", {
        language: "en-US",
        languages: ["en-US", "es-ES"],
      });

      expect(detectBrowserLanguage()).toBe("es");
    });

    it("returns 'en' when no Spanish is detected", () => {
      vi.stubGlobal("navigator", {
        language: "en-US",
        languages: ["en-US", "fr-FR"],
      });

      expect(detectBrowserLanguage()).toBe("en");
    });

    it("handles case-insensitive language codes", () => {
      vi.stubGlobal("navigator", {
        language: "ES-MX",
        languages: ["ES-MX"],
      });

      expect(detectBrowserLanguage()).toBe("es");
    });

    it("handles empty languages array", () => {
      vi.stubGlobal("navigator", {
        language: "en-US",
        languages: [],
      });

      expect(detectBrowserLanguage()).toBe("en");
    });
  });

  describe("getDefaultLocale", () => {
    let originalWindow: typeof window;
    let originalNavigator: Navigator;

    beforeEach(() => {
      originalWindow = globalThis.window;
      originalNavigator = globalThis.navigator;
    });

    afterEach(() => {
      globalThis.window = originalWindow;
      globalThis.navigator = originalNavigator;
    });

    it("returns 'es' when browser language is Spanish", () => {
      vi.stubGlobal("navigator", {
        language: "es-MX",
        languages: ["es-MX"],
      });

      expect(getDefaultLocale(null)).toBe("es");
      expect(getDefaultLocale("US")).toBe("es");
    });

    it("returns 'es' for Spanish-speaking countries", () => {
      vi.stubGlobal("navigator", {
        language: "en-US",
        languages: ["en-US"],
      });

      expect(getDefaultLocale("MX")).toBe("es");
      expect(getDefaultLocale("ES")).toBe("es");
      expect(getDefaultLocale("AR")).toBe("es");
    });

    it("returns 'en' for non-Spanish-speaking countries", () => {
      vi.stubGlobal("navigator", {
        language: "en-US",
        languages: ["en-US"],
      });

      expect(getDefaultLocale("US")).toBe("en");
      expect(getDefaultLocale("GB")).toBe("en");
      expect(getDefaultLocale("FR")).toBe("en");
    });

    it("returns 'en' when country is null and browser is not Spanish", () => {
      vi.stubGlobal("navigator", {
        language: "en-US",
        languages: ["en-US"],
      });

      expect(getDefaultLocale(null)).toBe("en");
    });

    it("handles case-insensitive country codes", () => {
      vi.stubGlobal("navigator", {
        language: "en-US",
        languages: ["en-US"],
      });

      expect(getDefaultLocale("mx")).toBe("es");
      expect(getDefaultLocale("MX")).toBe("es");
    });
  });

  describe("getFlagForLanguage", () => {
    describe("Spanish flags", () => {
      it("returns Spain flag for European countries", () => {
        expect(getFlagForLanguage("es", "ES")).toBe("🇪🇸");
        expect(getFlagForLanguage("es", "FR")).toBe("🇪🇸");
        expect(getFlagForLanguage("es", "DE")).toBe("🇪🇸");
      });

      it("returns Mexico flag for American countries", () => {
        expect(getFlagForLanguage("es", "MX")).toBe("🇲🇽");
        expect(getFlagForLanguage("es", "US")).toBe("🇲🇽");
        expect(getFlagForLanguage("es", "BR")).toBe("🇲🇽");
      });

      it("returns Mexico flag when country is null", () => {
        expect(getFlagForLanguage("es", null)).toBe("🇲🇽");
      });

      it("returns empty string for non-European, non-American countries", () => {
        expect(getFlagForLanguage("es", "JP")).toBe("");
        expect(getFlagForLanguage("es", "AU")).toBe("");
      });
    });

    describe("English flags", () => {
      it("returns UK flag for European countries", () => {
        expect(getFlagForLanguage("en", "GB")).toBe("🇬🇧");
        expect(getFlagForLanguage("en", "FR")).toBe("🇬🇧");
        expect(getFlagForLanguage("en", "DE")).toBe("🇬🇧");
      });

      it("returns US flag for American countries", () => {
        expect(getFlagForLanguage("en", "US")).toBe("🇺🇸");
        expect(getFlagForLanguage("en", "CA")).toBe("🇺🇸");
        expect(getFlagForLanguage("en", "MX")).toBe("🇺🇸");
      });

      it("returns US flag when country is null", () => {
        expect(getFlagForLanguage("en", null)).toBe("🇺🇸");
      });

      it("returns empty string for non-European, non-American countries", () => {
        expect(getFlagForLanguage("en", "JP")).toBe("");
        expect(getFlagForLanguage("en", "AU")).toBe("");
      });
    });

    it("handles case-insensitive country codes", () => {
      expect(getFlagForLanguage("es", "mx")).toBe("🇲🇽");
      expect(getFlagForLanguage("en", "us")).toBe("🇺🇸");
    });
  });

  describe("shouldShowFlags", () => {
    it("returns true by default when country is null", () => {
      expect(shouldShowFlags(null)).toBe(true);
    });

    it("returns true for European countries", () => {
      expect(shouldShowFlags("ES")).toBe(true);
      expect(shouldShowFlags("FR")).toBe(true);
      expect(shouldShowFlags("DE")).toBe(true);
      expect(shouldShowFlags("GB")).toBe(true);
    });

    it("returns true for American countries", () => {
      expect(shouldShowFlags("US")).toBe(true);
      expect(shouldShowFlags("MX")).toBe(true);
      expect(shouldShowFlags("CA")).toBe(true);
      expect(shouldShowFlags("BR")).toBe(true);
    });

    it("returns false for non-European, non-American countries", () => {
      expect(shouldShowFlags("JP")).toBe(false);
      expect(shouldShowFlags("CN")).toBe(false);
      expect(shouldShowFlags("AU")).toBe(false);
      expect(shouldShowFlags("IN")).toBe(false);
    });

    it("handles case-insensitive country codes", () => {
      expect(shouldShowFlags("mx")).toBe(true);
      expect(shouldShowFlags("jp")).toBe(false);
    });
  });
});
