import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Spinner,
  SpinnerWithText,
  PageSpinner,
  ButtonSpinner,
  DotsSpinner,
  PulseSpinner,
  RingSpinner,
} from "../spinner";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      loading: "Loading...",
    };
    return translations[key] || key;
  },
}));

describe("Spinner", () => {
  describe("Basic Spinner", () => {
    it("renders spinner", () => {
      const { container } = render(<Spinner />);
      const spinner = container.querySelector("svg");
      expect(spinner).toBeInTheDocument();
    });

    it("has aria-label for accessibility", () => {
      const { container } = render(<Spinner />);
      const spinner = container.querySelector("svg");
      expect(spinner).toHaveAttribute("aria-label", "Loading...");
    });

    it("accepts custom label", () => {
      const { container } = render(<Spinner label="Please wait" />);
      const spinner = container.querySelector("svg");
      expect(spinner).toHaveAttribute("aria-label", "Please wait");
    });

    it("applies animate-spin class", () => {
      const { container } = render(<Spinner />);
      const spinner = container.querySelector("svg");
      expect(spinner).toHaveClass("animate-spin");
    });
  });

  describe("Sizes", () => {
    it("renders xs size", () => {
      const { container } = render(<Spinner size="xs" />);
      const spinner = container.querySelector("svg");
      expect(spinner).toHaveClass("size-3");
    });

    it("renders sm size", () => {
      const { container } = render(<Spinner size="sm" />);
      const spinner = container.querySelector("svg");
      expect(spinner).toHaveClass("size-4");
    });

    it("renders md (default) size", () => {
      const { container } = render(<Spinner size="md" />);
      const spinner = container.querySelector("svg");
      expect(spinner).toHaveClass("size-6");
    });

    it("renders lg size", () => {
      const { container } = render(<Spinner size="lg" />);
      const spinner = container.querySelector("svg");
      expect(spinner).toHaveClass("size-8");
    });

    it("renders xl size", () => {
      const { container } = render(<Spinner size="xl" />);
      const spinner = container.querySelector("svg");
      expect(spinner).toHaveClass("size-12");
    });

    it("uses md as default size", () => {
      const { container } = render(<Spinner />);
      const spinner = container.querySelector("svg");
      expect(spinner).toHaveClass("size-6");
    });
  });

  describe("Variants", () => {
    it("applies default variant", () => {
      const { container } = render(<Spinner variant="default" />);
      const spinner = container.querySelector("svg");
      expect(spinner).toHaveClass("text-primary");
    });

    it("applies muted variant", () => {
      const { container } = render(<Spinner variant="muted" />);
      const spinner = container.querySelector("svg");
      expect(spinner).toHaveClass("text-muted-foreground");
    });

    it("applies white variant", () => {
      const { container } = render(<Spinner variant="white" />);
      const spinner = container.querySelector("svg");
      expect(spinner).toHaveClass("text-white");
    });

    it("applies current variant", () => {
      const { container } = render(<Spinner variant="current" />);
      const spinner = container.querySelector("svg");
      expect(spinner).toHaveClass("text-current");
    });
  });

  describe("Custom ClassName", () => {
    it("merges custom className", () => {
      const { container } = render(<Spinner className="custom-class" />);
      const spinner = container.querySelector("svg");
      expect(spinner).toHaveClass("custom-class");
      expect(spinner).toHaveClass("animate-spin");
    });
  });

  describe("SpinnerWithText", () => {
    it("renders spinner with text", () => {
      render(<SpinnerWithText text="Loading data..." />);
      expect(screen.getByText("Loading data...")).toBeInTheDocument();
    });

    it("renders spinner without text", () => {
      const { container } = render(<SpinnerWithText />);
      const spinner = container.querySelector("svg");
      expect(spinner).toBeInTheDocument();
      expect(screen.queryByText("Loading data...")).not.toBeInTheDocument();
    });

    it("centers content with flex", () => {
      const { container } = render(<SpinnerWithText text="Loading" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("flex", "flex-col", "items-center", "justify-center");
    });

    it("applies text styles", () => {
      render(<SpinnerWithText text="Loading" />);
      const text = screen.getByText("Loading");
      expect(text.tagName).toBe("P");
      expect(text).toHaveClass("text-muted-foreground", "text-sm");
    });

    it("forwards spinner props", () => {
      const { container } = render(<SpinnerWithText size="lg" variant="white" />);
      const spinner = container.querySelector("svg");
      expect(spinner).toHaveClass("size-8", "text-white");
    });
  });

  describe("PageSpinner", () => {
    it("renders full page spinner", () => {
      const { container } = render(<PageSpinner />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("min-h-screen", "items-center", "justify-center");
    });

    it("renders with large size", () => {
      const { container } = render(<PageSpinner />);
      const spinner = container.querySelector("svg");
      expect(spinner).toHaveClass("size-8");
    });

    it("displays optional text", () => {
      render(<PageSpinner text="Loading application..." />);
      expect(screen.getByText("Loading application...")).toBeInTheDocument();
    });

    it("renders without text", () => {
      const { container } = render(<PageSpinner />);
      const spinner = container.querySelector("svg");
      expect(spinner).toBeInTheDocument();
    });
  });

  describe("ButtonSpinner", () => {
    it("renders button-sized spinner", () => {
      const { container } = render(<ButtonSpinner />);
      const spinner = container.querySelector("svg");
      expect(spinner).toHaveClass("size-4");
    });

    it("uses current color variant", () => {
      const { container } = render(<ButtonSpinner />);
      const spinner = container.querySelector("svg");
      expect(spinner).toHaveClass("text-current");
    });

    it("accepts custom className", () => {
      const { container } = render(<ButtonSpinner className="ml-2" />);
      const spinner = container.querySelector("svg");
      expect(spinner).toHaveClass("ml-2");
    });
  });

  describe("DotsSpinner", () => {
    it("renders dots spinner", () => {
      const { container } = render(<DotsSpinner />);
      const dots = container.querySelectorAll("span");
      expect(dots).toHaveLength(3);
    });

    it("has role='status'", () => {
      const { container } = render(<DotsSpinner />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toBeInTheDocument();
    });

    it("has aria-label", () => {
      const { container } = render(<DotsSpinner />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveAttribute("aria-label", "Loading...");
    });

    it("renders small size", () => {
      const { container } = render(<DotsSpinner size="sm" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("[&>span]:size-1.5");
    });

    it("renders medium size", () => {
      const { container } = render(<DotsSpinner size="md" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("[&>span]:size-2");
    });

    it("renders large size", () => {
      const { container } = render(<DotsSpinner size="lg" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("[&>span]:size-3");
    });

    it("dots have bounce animation", () => {
      const { container } = render(<DotsSpinner />);
      const dots = container.querySelectorAll("span");
      dots.forEach((dot) => {
        expect(dot).toHaveClass("animate-bounce", "rounded-full");
      });
    });
  });

  describe("PulseSpinner", () => {
    it("renders pulse spinner", () => {
      const { container } = render(<PulseSpinner />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toBeInTheDocument();
    });

    it("has aria-label", () => {
      const { container } = render(<PulseSpinner />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveAttribute("aria-label", "Loading...");
    });

    it("renders small size", () => {
      const { container } = render(<PulseSpinner size="sm" />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveClass("size-8");
    });

    it("renders medium size", () => {
      const { container } = render(<PulseSpinner size="md" />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveClass("size-12");
    });

    it("renders large size", () => {
      const { container } = render(<PulseSpinner size="lg" />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveClass("size-16");
    });

    it("contains two circles for pulse effect", () => {
      const { container } = render(<PulseSpinner />);
      const circles = container.querySelectorAll("div > div");
      expect(circles.length).toBeGreaterThanOrEqual(2);
    });

    it("applies custom className", () => {
      const { container } = render(<PulseSpinner className="custom" />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveClass("custom");
    });
  });

  describe("RingSpinner", () => {
    it("renders ring spinner", () => {
      const { container } = render(<RingSpinner />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toBeInTheDocument();
    });

    it("has aria-label", () => {
      const { container } = render(<RingSpinner />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveAttribute("aria-label", "Loading...");
    });

    it("has screen reader text", () => {
      render(<RingSpinner />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
      const srText = screen.getByText("Loading...");
      expect(srText).toHaveClass("sr-only");
    });

    it("renders small size", () => {
      const { container } = render(<RingSpinner size="sm" />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveClass("size-6", "border-2");
    });

    it("renders medium size", () => {
      const { container } = render(<RingSpinner size="md" />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveClass("size-10", "border-3");
    });

    it("renders large size", () => {
      const { container } = render(<RingSpinner size="lg" />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveClass("size-16", "border-4");
    });

    it("has spinning animation", () => {
      const { container } = render(<RingSpinner />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveClass("animate-spin", "rounded-full");
    });

    it("applies custom className", () => {
      const { container } = render(<RingSpinner className="custom" />);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveClass("custom");
    });
  });

  describe("Real-World Usage", () => {
    it("loading button state", () => {
      const { container } = render(
        <button disabled>
          <ButtonSpinner />
          <span>Loading...</span>
        </button>
      );

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("page loading state", () => {
      render(<PageSpinner text="Cargando eventos..." />);
      expect(screen.getByText("Cargando eventos...")).toBeInTheDocument();
    });

    it("inline loading with text", () => {
      render(
        <div>
          <SpinnerWithText text="Procesando..." size="sm" />
        </div>
      );

      expect(screen.getByText("Procesando...")).toBeInTheDocument();
    });

    it("custom colored spinner", () => {
      const { container } = render(<Spinner variant="white" className="opacity-75" />);
      const spinner = container.querySelector("svg");
      expect(spinner).toHaveClass("text-white", "opacity-75");
    });
  });

  describe("Accessibility", () => {
    it("all spinners have accessible labels", () => {
      const { container: c1 } = render(<Spinner />);
      const { container: c2 } = render(<DotsSpinner />);
      const { container: c3 } = render(<PulseSpinner />);
      const { container: c4 } = render(<RingSpinner />);

      expect(c1.querySelector("svg")).toHaveAttribute("aria-label");
      expect(c2.querySelector('[role="status"]')).toHaveAttribute("aria-label");
      expect(c3.querySelector('[role="status"]')).toHaveAttribute("aria-label");
      expect(c4.querySelector('[role="status"]')).toHaveAttribute("aria-label");
    });

    it("ring spinner provides screen reader text", () => {
      render(<RingSpinner />);
      const srText = screen.getByText("Loading...");
      expect(srText).toHaveClass("sr-only");
    });
  });
});
