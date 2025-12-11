import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge, NumberBadge, FloatingBadge } from "../badge";

describe("Badge", () => {
  describe("rendering", () => {
    it("renders children correctly", () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText("Test Badge")).toBeInTheDocument();
    });

    it("renders as span element", () => {
      const { container } = render(<Badge>Test</Badge>);
      expect(container.querySelector("span")).toBeInTheDocument();
    });
  });

  describe("variants", () => {
    it("applies default variant", () => {
      const { container } = render(<Badge>Default</Badge>);
      const badge = container.querySelector("span");
      expect(badge).toHaveClass("bg-primary/10", "text-primary");
    });

    it("applies sitimm variant", () => {
      const { container } = render(<Badge variant="sitimm">SITIMM</Badge>);
      const badge = container.querySelector("span");
      expect(badge).toHaveClass("bg-[var(--color-primary)]", "text-white");
    });

    it("applies sitimmOutline variant", () => {
      const { container } = render(<Badge variant="sitimmOutline">Outline</Badge>);
      const badge = container.querySelector("span");
      expect(badge).toHaveClass("border", "border-[var(--color-primary)]");
    });

    it("applies success variant", () => {
      const { container } = render(<Badge variant="success">Success</Badge>);
      const badge = container.querySelector("span");
      expect(badge).toHaveClass("bg-green-100", "text-green-800");
    });

    it("applies warning variant", () => {
      const { container } = render(<Badge variant="warning">Warning</Badge>);
      const badge = container.querySelector("span");
      expect(badge).toHaveClass("bg-yellow-100", "text-yellow-800");
    });

    it("applies destructive variant", () => {
      const { container } = render(<Badge variant="destructive">Error</Badge>);
      const badge = container.querySelector("span");
      expect(badge).toHaveClass("bg-destructive/10", "text-destructive");
    });
  });

  describe("sizes", () => {
    it("applies default size (md)", () => {
      const { container } = render(<Badge>Medium</Badge>);
      const badge = container.querySelector("span");
      expect(badge).toHaveClass("rounded-md", "px-2.5", "py-1", "text-sm");
    });

    it("applies small size", () => {
      const { container } = render(<Badge size="sm">Small</Badge>);
      const badge = container.querySelector("span");
      expect(badge).toHaveClass("rounded", "px-2", "py-0.5", "text-xs");
    });

    it("applies large size", () => {
      const { container } = render(<Badge size="lg">Large</Badge>);
      const badge = container.querySelector("span");
      expect(badge).toHaveClass("rounded-lg", "px-3", "py-1.5", "text-base");
    });
  });

  describe("shapes", () => {
    it("applies default shape", () => {
      const { container } = render(<Badge>Default Shape</Badge>);
      const badge = container.querySelector("span");
      // Default shape doesn't add extra classes
      expect(badge).toHaveClass("rounded-md");
    });

    it("applies pill shape", () => {
      const { container } = render(<Badge shape="pill">Pill</Badge>);
      const badge = container.querySelector("span");
      expect(badge).toHaveClass("rounded-full");
    });

    it("applies square shape", () => {
      const { container } = render(<Badge shape="square">Square</Badge>);
      const badge = container.querySelector("span");
      expect(badge).toHaveClass("rounded-none");
    });
  });

  describe("features", () => {
    it("renders with icon", () => {
      render(<Badge icon={<span data-testid="icon">🔔</span>}>With Icon</Badge>);
      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(screen.getByText("With Icon")).toBeInTheDocument();
    });

    it("renders with dot indicator", () => {
      const { container } = render(<Badge dot>With Dot</Badge>);
      const dot = container.querySelector('[aria-hidden="true"]');
      expect(dot).toBeInTheDocument();
      expect(dot).toHaveClass("rounded-full", "bg-current");
    });

    it("renders with both icon and dot", () => {
      const { container } = render(
        <Badge icon={<span>📌</span>} dot>
          Both
        </Badge>
      );
      const dots = container.querySelectorAll('[aria-hidden="true"]');
      expect(dots.length).toBeGreaterThan(0);
    });

    it("applies custom className", () => {
      const { container } = render(<Badge className="custom-class">Custom</Badge>);
      const badge = container.querySelector("span");
      expect(badge).toHaveClass("custom-class");
    });
  });

  describe("accessibility", () => {
    it("marks dot as aria-hidden", () => {
      const { container } = render(<Badge dot>Dot Badge</Badge>);
      const dot = container.querySelector(".size-1\\.5");
      expect(dot).toHaveAttribute("aria-hidden");
    });

    it("marks icon as aria-hidden", () => {
      const { container } = render(<Badge icon={<span>Icon</span>}>Icon Badge</Badge>);
      const iconWrapper = container.querySelector('[aria-hidden="true"]');
      expect(iconWrapper).toBeInTheDocument();
    });
  });
});

describe("NumberBadge", () => {
  it("renders numeric value", () => {
    render(<NumberBadge value={42} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders string value", () => {
    render(<NumberBadge value="99+" />);
    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("applies tabular-nums class", () => {
    const { container } = render(<NumberBadge value={123} />);
    const badge = container.querySelector("span");
    expect(badge).toHaveClass("tabular-nums");
  });

  it("accepts variant prop", () => {
    const { container } = render(<NumberBadge value={5} variant="sitimm" />);
    const badge = container.querySelector("span");
    expect(badge).toHaveClass("bg-[var(--color-primary)]");
  });

  it("accepts size prop", () => {
    const { container } = render(<NumberBadge value={10} size="lg" />);
    const badge = container.querySelector("span");
    expect(badge).toHaveClass("text-base");
  });

  it("accepts custom className", () => {
    const { container } = render(<NumberBadge value={7} className="custom-number" />);
    const badge = container.querySelector("span");
    expect(badge).toHaveClass("custom-number", "tabular-nums");
  });
});

describe("FloatingBadge", () => {
  it("renders children correctly", () => {
    render(<FloatingBadge>Floating</FloatingBadge>);
    expect(screen.getByText("Floating")).toBeInTheDocument();
  });

  it("applies absolute positioning", () => {
    const { container } = render(<FloatingBadge>Float</FloatingBadge>);
    const badge = container.querySelector("span");
    expect(badge).toHaveClass("absolute");
  });

  describe("positions", () => {
    it("applies top-right position by default", () => {
      const { container } = render(<FloatingBadge>Top Right</FloatingBadge>);
      const badge = container.querySelector("span");
      expect(badge).toHaveClass("right-4", "top-4");
    });

    it("applies top-left position", () => {
      const { container } = render(<FloatingBadge position="top-left">Top Left</FloatingBadge>);
      const badge = container.querySelector("span");
      expect(badge).toHaveClass("left-4", "top-4");
    });

    it("applies bottom-right position", () => {
      const { container } = render(
        <FloatingBadge position="bottom-right">Bottom Right</FloatingBadge>
      );
      const badge = container.querySelector("span");
      expect(badge).toHaveClass("bottom-4", "right-4");
    });

    it("applies bottom-left position", () => {
      const { container } = render(
        <FloatingBadge position="bottom-left">Bottom Left</FloatingBadge>
      );
      const badge = container.querySelector("span");
      expect(badge).toHaveClass("bottom-4", "left-4");
    });
  });

  it("accepts badge variant props", () => {
    const { container } = render(<FloatingBadge variant="success">Success</FloatingBadge>);
    const badge = container.querySelector("span");
    expect(badge).toHaveClass("bg-green-100");
  });

  it("accepts badge size props", () => {
    const { container } = render(<FloatingBadge size="lg">Large</FloatingBadge>);
    const badge = container.querySelector("span");
    expect(badge).toHaveClass("text-base");
  });

  it("combines position with custom className", () => {
    const { container } = render(
      <FloatingBadge position="bottom-right" className="z-50">
        Custom
      </FloatingBadge>
    );
    const badge = container.querySelector("span");
    expect(badge).toHaveClass("absolute", "bottom-4", "right-4", "z-50");
  });
});

describe("Badge combinations", () => {
  it("combines all props correctly", () => {
    const { container } = render(
      <Badge variant="sitimm" size="lg" shape="pill" dot icon={<span>✓</span>} className="custom">
        Complete
      </Badge>
    );
    const badge = container.querySelector("span");

    expect(badge).toHaveClass(
      "bg-[var(--color-primary)]", // variant
      "text-base", // size
      "rounded-full", // shape
      "custom" // custom className
    );
    expect(screen.getByText("Complete")).toBeInTheDocument();
  });
});
