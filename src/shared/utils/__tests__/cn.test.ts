import { describe, it, expect } from "vitest";
import { cn } from "../cn";

describe("cn (className utility)", () => {
  describe("basic functionality", () => {
    it("joins multiple class names", () => {
      expect(cn("foo", "bar")).toBe("foo bar");
      expect(cn("a", "b", "c")).toBe("a b c");
    });

    it("handles single class name", () => {
      expect(cn("foo")).toBe("foo");
    });

    it("handles empty arguments", () => {
      expect(cn()).toBe("");
    });
  });

  describe("filtering falsy values", () => {
    it("filters out null values", () => {
      expect(cn("foo", null, "bar")).toBe("foo bar");
      expect(cn(null, "test")).toBe("test");
    });

    it("filters out undefined values", () => {
      expect(cn("foo", undefined, "bar")).toBe("foo bar");
      expect(cn(undefined, "test")).toBe("test");
    });

    it("filters out false values", () => {
      expect(cn("foo", false, "bar")).toBe("foo bar");
      expect(cn(false, "test")).toBe("test");
    });

    it("filters out empty strings", () => {
      expect(cn("foo", "", "bar")).toBe("foo bar");
    });

    it("handles mixed falsy values", () => {
      expect(cn("foo", null, undefined, false, "", "bar")).toBe("foo bar");
    });
  });

  describe("conditional class names", () => {
    it("applies classes conditionally", () => {
      const isActive = true;
      expect(cn("base", isActive && "active")).toBe("base active");

      const isDisabled = false;
      expect(cn("base", isDisabled && "disabled")).toBe("base");
    });

    it("handles complex conditions", () => {
      const variant = "primary";
      const size = "large";

      expect(
        cn("button", variant === "primary" && "button-primary", size === "large" && "button-large")
      ).toBe("button button-primary button-large");
    });
  });

  describe("real-world use cases", () => {
    it("combines base classes with conditional modifiers", () => {
      const isActive = true;
      const isDisabled = false;
      const hasError = false;

      expect(
        cn(
          "btn",
          "btn-base",
          isActive && "btn-active",
          isDisabled && "btn-disabled",
          hasError && "btn-error"
        )
      ).toBe("btn btn-base btn-active");
    });

    it("works with Tailwind CSS classes", () => {
      const isPrimary = true;
      const isLarge = true;

      expect(
        cn("px-4 py-2", "rounded", isPrimary && "bg-blue-500 text-white", isLarge && "text-lg")
      ).toBe("px-4 py-2 rounded bg-blue-500 text-white text-lg");
    });

    it("handles button variants", () => {
      const variant: "primary" | "secondary" = "secondary";
      const size: "sm" | "md" | "lg" = "md";

      expect(
        cn(
          "button",
          // @ts-expect-error - Testing runtime behavior with literal types
          variant === "primary" && "bg-primary",
          variant === "secondary" && "bg-secondary",
          // @ts-expect-error - Testing runtime behavior with literal types
          size === "sm" && "text-sm",
          size === "md" && "text-base",
          // @ts-expect-error - Testing runtime behavior with literal types
          size === "lg" && "text-lg"
        )
      ).toBe("button bg-secondary text-base");
    });
  });

  describe("edge cases", () => {
    it("handles all falsy values", () => {
      expect(cn(null, undefined, false, "")).toBe("");
    });

    it("handles duplicate class names", () => {
      expect(cn("foo", "foo", "bar")).toBe("foo foo bar");
    });

    it("handles very long class lists", () => {
      const classes = Array(50).fill("class").join(" ");
      expect(cn(...Array(50).fill("class"))).toBe(classes);
    });

    it("preserves class order", () => {
      expect(cn("first", "second", "third")).toBe("first second third");
    });
  });

  describe("type safety", () => {
    it("accepts string arguments", () => {
      expect(cn("a", "b")).toBe("a b");
    });

    it("accepts null", () => {
      expect(cn("a", null, "b")).toBe("a b");
    });

    it("accepts undefined", () => {
      expect(cn("a", undefined, "b")).toBe("a b");
    });

    it("accepts false", () => {
      expect(cn("a", false, "b")).toBe("a b");
    });

    it("accepts mixed types", () => {
      expect(cn("a", null, "b", false, "c", undefined, "d")).toBe("a b c d");
    });
  });
});
