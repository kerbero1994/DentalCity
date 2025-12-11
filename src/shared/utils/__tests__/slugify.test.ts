import { describe, it, expect } from "vitest";
import { slugify } from "../slugify";

describe("slugify", () => {
  describe("basic functionality", () => {
    it("converts text to lowercase", () => {
      expect(slugify("HELLO WORLD")).toBe("hello-world");
      expect(slugify("Test Case")).toBe("test-case");
    });

    it("replaces spaces with hyphens", () => {
      expect(slugify("hello world")).toBe("hello-world");
      expect(slugify("one two three")).toBe("one-two-three");
    });

    it("removes special characters", () => {
      expect(slugify("hello@world!")).toBe("helloworld");
      expect(slugify("test#123$")).toBe("test123");
      expect(slugify("email@example.com")).toBe("emailexamplecom");
    });

    it("preserves numbers", () => {
      expect(slugify("test 123")).toBe("test-123");
      expect(slugify("2023 event")).toBe("2023-event");
    });
  });

  describe("unicode and diacritics", () => {
    it("removes diacritics from Spanish characters", () => {
      expect(slugify("José")).toBe("jose");
      expect(slugify("María")).toBe("maria");
      expect(slugify("Año")).toBe("ano");
      expect(slugify("Niño")).toBe("nino");
    });

    it("removes diacritics from other languages", () => {
      expect(slugify("Café")).toBe("cafe");
      expect(slugify("naïve")).toBe("naive");
      expect(slugify("Zürich")).toBe("zurich");
    });

    it("normalizes unicode characters", () => {
      expect(slugify("héllo wörld")).toBe("hello-world");
      expect(slugify("tëst çase")).toBe("test-case");
    });
  });

  describe("edge cases", () => {
    it("handles empty string", () => {
      expect(slugify("")).toBe("");
    });

    it("handles string with only spaces", () => {
      expect(slugify("   ")).toBe("");
    });

    it("handles string with only special characters", () => {
      expect(slugify("!@#$%")).toBe("");
    });

    it("trims leading and trailing spaces", () => {
      expect(slugify("  hello world  ")).toBe("hello-world");
    });

    it("replaces multiple spaces with single hyphen", () => {
      expect(slugify("hello    world")).toBe("hello-world");
      expect(slugify("too  many   spaces")).toBe("too-many-spaces");
    });

    it("replaces multiple hyphens with single hyphen", () => {
      expect(slugify("hello---world")).toBe("hello-world");
      expect(slugify("test--case")).toBe("test-case");
    });

    it("handles mixed cases", () => {
      expect(slugify("   Hello   WORLD!!!   ")).toBe("hello-world");
      expect(slugify("CamelCaseText")).toBe("camelcasetext");
    });
  });

  describe("real-world examples", () => {
    it("slugifies event titles", () => {
      expect(slugify("CURSO - TALLER: ILO")).toBe("curso-taller-ilo");
      expect(slugify("Día del Trabajador 2024")).toBe("dia-del-trabajador-2024");
    });

    it("slugifies Spanish content", () => {
      expect(slugify("Educación y Capacitación")).toBe("educacion-y-capacitacion");
      expect(slugify("Sindicato SITIMM")).toBe("sindicato-sitimm");
    });

    it("handles long text with multiple words", () => {
      const title = "Comprehensive Human Development Course: Assertive Communication";
      expect(slugify(title)).toBe("comprehensive-human-development-course-assertive-communication");
    });
  });

  describe("URL-safe output", () => {
    it("produces URL-safe strings", () => {
      const result = slugify("Test & Demo <script>");
      expect(result).toMatch(/^[a-z0-9-]*$/);
    });

    it("handles parentheses and brackets", () => {
      expect(slugify("Test (example) [2024]")).toBe("test-example-2024");
    });

    it("handles quotes", () => {
      expect(slugify('Test "quoted" text')).toBe("test-quoted-text");
      expect(slugify("It's a test")).toBe("its-a-test");
    });
  });
});
