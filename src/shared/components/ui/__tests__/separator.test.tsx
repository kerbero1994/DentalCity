import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Separator, Divider, DecorativeSeparator } from "../separator";

describe("Separator", () => {
  describe("Basic Rendering", () => {
    it("renders separator element", () => {
      const { container } = render(<Separator />);
      const separator = container.querySelector("div");
      expect(separator).toBeInTheDocument();
    });

    it("applies base separator styles", () => {
      const { container } = render(<Separator />);
      const separator = container.querySelector("div");
      expect(separator).toHaveClass("shrink-0", "bg-border");
    });

    it("is decorative by default", () => {
      const { container } = render(<Separator />);
      const separator = container.querySelector("div");
      expect(separator).toHaveAttribute("role", "none");
    });

    it("has separator role when not decorative", () => {
      const { container } = render(<Separator decorative={false} />);
      const separator = container.querySelector("div");
      expect(separator).toHaveAttribute("role", "separator");
    });
  });

  describe("Orientation", () => {
    it("renders horizontal by default", () => {
      const { container } = render(<Separator />);
      const separator = container.querySelector("div");
      expect(separator).toHaveClass("h-px", "w-full");
    });

    it("renders horizontal separator", () => {
      const { container } = render(<Separator orientation="horizontal" />);
      const separator = container.querySelector("div");
      expect(separator).toHaveClass("h-px", "w-full");
    });

    it("renders vertical separator", () => {
      const { container } = render(<Separator orientation="vertical" />);
      const separator = container.querySelector("div");
      expect(separator).toHaveClass("h-full", "w-px");
    });

    it("sets aria-orientation for non-decorative", () => {
      const { container } = render(<Separator orientation="vertical" decorative={false} />);
      const separator = container.querySelector("div");
      expect(separator).toHaveAttribute("aria-orientation", "vertical");
    });

    it("sets aria-orientation for decorative", () => {
      const { container } = render(<Separator orientation="vertical" decorative={true} />);
      const separator = container.querySelector("div");
      // The component always sets aria-orientation based on the orientation prop
      expect(separator).toHaveAttribute("aria-orientation", "vertical");
    });
  });

  describe("Spacing", () => {
    it("applies no spacing by default", () => {
      const { container } = render(<Separator spacing="none" />);
      const separator = container.querySelector("div");
      expect(separator).not.toHaveClass("my-2", "my-4", "my-6", "my-8");
    });

    it("applies sm horizontal spacing", () => {
      const { container } = render(<Separator orientation="horizontal" spacing="sm" />);
      const separator = container.querySelector("div");
      expect(separator).toHaveClass("my-2");
    });

    it("applies md horizontal spacing", () => {
      const { container } = render(<Separator orientation="horizontal" spacing="md" />);
      const separator = container.querySelector("div");
      expect(separator).toHaveClass("my-4");
    });

    it("applies lg horizontal spacing", () => {
      const { container } = render(<Separator orientation="horizontal" spacing="lg" />);
      const separator = container.querySelector("div");
      expect(separator).toHaveClass("my-6");
    });

    it("applies xl horizontal spacing", () => {
      const { container } = render(<Separator orientation="horizontal" spacing="xl" />);
      const separator = container.querySelector("div");
      expect(separator).toHaveClass("my-8");
    });

    it("applies sm vertical spacing", () => {
      const { container } = render(<Separator orientation="vertical" spacing="sm" />);
      const separator = container.querySelector("div");
      expect(separator).toHaveClass("mx-2");
    });

    it("applies md vertical spacing", () => {
      const { container } = render(<Separator orientation="vertical" spacing="md" />);
      const separator = container.querySelector("div");
      expect(separator).toHaveClass("mx-4");
    });

    it("applies lg vertical spacing", () => {
      const { container } = render(<Separator orientation="vertical" spacing="lg" />);
      const separator = container.querySelector("div");
      expect(separator).toHaveClass("mx-6");
    });

    it("applies xl vertical spacing", () => {
      const { container } = render(<Separator orientation="vertical" spacing="xl" />);
      const separator = container.querySelector("div");
      expect(separator).toHaveClass("mx-8");
    });
  });

  describe("Variants", () => {
    it("applies default variant", () => {
      const { container } = render(<Separator variant="default" />);
      const separator = container.querySelector("div");
      expect(separator).toHaveClass("bg-border");
    });

    it("applies muted variant", () => {
      const { container } = render(<Separator variant="muted" />);
      const separator = container.querySelector("div");
      expect(separator).toHaveClass("bg-muted");
    });

    it("applies primary variant", () => {
      const { container } = render(<Separator variant="primary" />);
      const separator = container.querySelector("div");
      expect(separator).toHaveClass("bg-primary/20");
    });

    it("applies gradient variant", () => {
      const { container } = render(<Separator variant="gradient" />);
      const separator = container.querySelector("div");
      expect(separator).toHaveClass("bg-gradient-to-r", "from-transparent", "to-transparent");
    });
  });

  describe("Custom ClassName", () => {
    it("merges custom className", () => {
      const { container } = render(<Separator className="custom-class" />);
      const separator = container.querySelector("div");
      expect(separator).toHaveClass("custom-class");
      expect(separator).toHaveClass("bg-border");
    });

    it("allows color overrides", () => {
      const { container } = render(<Separator className="bg-red-500" />);
      const separator = container.querySelector("div");
      expect(separator).toHaveClass("bg-red-500");
    });
  });

  describe("Divider", () => {
    it("renders divider without children as separator", () => {
      const { container } = render(<Divider />);
      const separator = container.querySelector("div");
      expect(separator).toHaveClass("bg-border");
    });

    it("renders divider with label", () => {
      render(<Divider>OR</Divider>);
      expect(screen.getByText("OR")).toBeInTheDocument();
    });

    it("label has proper styling", () => {
      render(<Divider>Label</Divider>);
      const label = screen.getByText("Label");
      expect(label).toHaveClass("text-muted-foreground", "text-xs", "font-medium");
    });

    it("renders separators on both sides of label", () => {
      const { container } = render(<Divider>Label</Divider>);
      const separators = container.querySelectorAll('[role="none"]');
      expect(separators.length).toBe(2);
    });

    it("separators have flex-1", () => {
      const { container } = render(<Divider>Label</Divider>);
      const separators = container.querySelectorAll('[role="none"]');
      separators.forEach((sep) => {
        expect(sep).toHaveClass("flex-1");
      });
    });

    it("applies horizontal layout", () => {
      const { container } = render(<Divider>Label</Divider>);
      const wrapper = container.querySelector(".flex");
      expect(wrapper).toHaveClass("items-center", "gap-4");
    });

    it("renders vertical divider", () => {
      render(<Divider orientation="vertical">Label</Divider>);
      expect(screen.getByText("Label")).toBeInTheDocument();
    });

    it("vertical divider uses vertical separators", () => {
      const { container } = render(<Divider orientation="vertical">Label</Divider>);
      const separators = container.querySelectorAll('[role="none"]');
      separators.forEach((sep) => {
        expect(sep).toHaveClass("w-px");
      });
    });

    it("accepts custom className", () => {
      const { container } = render(<Divider className="my-8">Label</Divider>);
      const wrapper = container.querySelector(".flex");
      expect(wrapper).toHaveClass("my-8");
    });
  });

  describe("DecorativeSeparator", () => {
    it("renders decorative separator", () => {
      const { container } = render(<DecorativeSeparator />);
      const wrapper = container.querySelector("div");
      expect(wrapper).toHaveClass("relative", "flex", "items-center", "justify-center");
    });

    it("applies vertical padding", () => {
      const { container } = render(<DecorativeSeparator />);
      const wrapper = container.querySelector("div");
      expect(wrapper).toHaveClass("py-8");
    });

    it("renders gradient separator", () => {
      const { container } = render(<DecorativeSeparator />);
      const separator = container.querySelector('[role="none"]');
      expect(separator).toHaveClass("bg-gradient-to-r");
    });

    it("separator is absolutely positioned", () => {
      const { container } = render(<DecorativeSeparator />);
      const separator = container.querySelector('[role="none"]');
      expect(separator).toHaveClass("absolute", "inset-x-0");
    });

    it("renders icon when provided", () => {
      render(<DecorativeSeparator icon={<span>★</span>} />);
      expect(screen.getByText("★")).toBeInTheDocument();
    });

    it("icon has proper styling", () => {
      const { container } = render(<DecorativeSeparator icon={<span>★</span>} />);
      const iconWrapper = screen.getByText("★").parentElement;
      expect(iconWrapper).toHaveClass(
        "rounded-full",
        "bg-background",
        "ring-1",
        "ring-border",
        "relative",
        "z-10"
      );
    });

    it("icon is centered", () => {
      const { container } = render(<DecorativeSeparator icon={<span>★</span>} />);
      const iconWrapper = screen.getByText("★").parentElement;
      expect(iconWrapper).toHaveClass("flex", "items-center", "justify-center");
    });

    it("icon has fixed size", () => {
      const { container } = render(<DecorativeSeparator icon={<span>★</span>} />);
      const iconWrapper = screen.getByText("★").parentElement;
      expect(iconWrapper).toHaveClass("size-8");
    });

    it("renders without icon", () => {
      const { container } = render(<DecorativeSeparator />);
      expect(container.querySelector(".size-8")).not.toBeInTheDocument();
    });

    it("accepts custom className", () => {
      const { container } = render(<DecorativeSeparator className="py-12" />);
      const wrapper = container.querySelector("div");
      expect(wrapper).toHaveClass("py-12");
    });
  });

  describe("Real-World Scenarios", () => {
    it("separates sections in a card", () => {
      const { container } = render(
        <div>
          <p>Section 1</p>
          <Separator spacing="md" />
          <p>Section 2</p>
        </div>
      );
      expect(container.querySelector('[role="none"]')).toBeInTheDocument();
    });

    it("separates form fields", () => {
      render(
        <div>
          <input placeholder="Email" />
          <Separator spacing="sm" />
          <input placeholder="Password" />
        </div>
      );
      const separators = document.querySelectorAll('[role="none"]');
      expect(separators).toHaveLength(1);
    });

    it("creates vertical menu divider", () => {
      const { container } = render(
        <div className="flex">
          <button>Action 1</button>
          <Separator orientation="vertical" spacing="sm" />
          <button>Action 2</button>
        </div>
      );
      const separator = container.querySelector('[role="none"]');
      expect(separator).toHaveClass("w-px");
    });

    it("divides authentication options", () => {
      render(
        <div>
          <button>Continue with Google</button>
          <Divider>OR</Divider>
          <button>Continue with Email</button>
        </div>
      );
      expect(screen.getByText("OR")).toBeInTheDocument();
    });

    it("section divider with icon", () => {
      render(<DecorativeSeparator icon={<span>✦</span>} />);
      expect(screen.getByText("✦")).toBeInTheDocument();
    });

    it("footer section separator", () => {
      const { container } = render(
        <footer>
          <div>Links</div>
          <Separator variant="muted" spacing="lg" />
          <div>Copyright</div>
        </footer>
      );
      expect(container.querySelector(".bg-muted")).toBeInTheDocument();
    });

    it("sidebar navigation separator", () => {
      const { container } = render(
        <nav>
          <a href="/">Home</a>
          <Separator spacing="sm" />
          <a href="/about">About</a>
          <Separator spacing="sm" />
          <a href="/contact">Contact</a>
        </nav>
      );
      const separators = container.querySelectorAll('[role="none"]');
      expect(separators).toHaveLength(2);
    });
  });

  describe("Accessibility", () => {
    it("decorative separators have role=none", () => {
      const { container } = render(<Separator decorative />);
      const separator = container.querySelector("div");
      expect(separator).toHaveAttribute("role", "none");
    });

    it("semantic separators have role=separator", () => {
      const { container } = render(<Separator decorative={false} />);
      const separator = container.querySelector("div");
      expect(separator).toHaveAttribute("role", "separator");
    });

    it("semantic separators have aria-orientation", () => {
      const { container } = render(<Separator orientation="horizontal" decorative={false} />);
      const separator = container.querySelector("div");
      expect(separator).toHaveAttribute("aria-orientation", "horizontal");
    });

    it("decorative separators have aria-orientation based on prop", () => {
      const { container } = render(<Separator orientation="horizontal" decorative />);
      const separator = container.querySelector("div");
      // The component always sets aria-orientation based on the orientation prop
      expect(separator).toHaveAttribute("aria-orientation", "horizontal");
    });
  });

  describe("Variant and Spacing Combinations", () => {
    it("combines gradient variant with lg spacing", () => {
      const { container } = render(<Separator variant="gradient" spacing="lg" />);
      const separator = container.querySelector("div");
      expect(separator).toHaveClass("bg-gradient-to-r", "my-6");
    });

    it("combines primary variant with vertical orientation", () => {
      const { container } = render(<Separator variant="primary" orientation="vertical" />);
      const separator = container.querySelector("div");
      expect(separator).toHaveClass("bg-primary/20", "w-px");
    });

    it("combines muted variant with xl spacing", () => {
      const { container } = render(<Separator variant="muted" spacing="xl" />);
      const separator = container.querySelector("div");
      expect(separator).toHaveClass("bg-muted", "my-8");
    });
  });

  describe("Layout Integration", () => {
    it("works in flex container", () => {
      const { container } = render(
        <div className="flex items-center">
          <span>Left</span>
          <Separator orientation="vertical" className="mx-2 h-4" />
          <span>Right</span>
        </div>
      );
      expect(container.querySelector(".w-px")).toBeInTheDocument();
    });

    it("works in grid layout", () => {
      const { container } = render(
        <div className="grid grid-cols-3 gap-4">
          <div>Col 1</div>
          <Separator orientation="vertical" />
          <div>Col 2</div>
        </div>
      );
      expect(container.querySelector('[role="none"]')).toBeInTheDocument();
    });

    it("works in list layout", () => {
      const { container } = render(
        <div>
          <div>Item 1</div>
          <Separator spacing="sm" />
          <div>Item 2</div>
          <Separator spacing="sm" />
          <div>Item 3</div>
        </div>
      );
      const separators = container.querySelectorAll('[role="none"]');
      expect(separators).toHaveLength(2);
    });
  });
});
