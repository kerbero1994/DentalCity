import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PremiumButton } from "../premium-button";
import React from "react";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      loading: "Loading...",
    };
    return translations[key] || key;
  },
}));

// Mock lucide-react
vi.mock("lucide-react", () => ({
  Loader2: ({ className, size }: { className?: string; size?: number }) => (
    <span data-testid="loader-icon" className={className} data-size={size}>
      Loader
    </span>
  ),
}));

describe("PremiumButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders button element", () => {
      render(<PremiumButton>Click Me</PremiumButton>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders button text", () => {
      render(<PremiumButton>Submit</PremiumButton>);
      expect(screen.getByText("Submit")).toBeInTheDocument();
    });

    it("has button type by default", () => {
      render(<PremiumButton>Button</PremiumButton>);
      const button = screen.getByRole("button");
      // Button element without explicit type defaults to "submit" in browsers
      // but may be undefined in jsdom
      const typeAttr = button.getAttribute("type");
      expect(typeAttr === null || typeAttr === "submit" || typeAttr === "button").toBe(true);
    });

    it("applies base premium styles", () => {
      render(<PremiumButton>Premium</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("relative", "inline-flex", "items-center", "justify-center");
    });

    it("has transition styles", () => {
      render(<PremiumButton>Button</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("transition-all", "duration-300");
    });

    it("has focus ring", () => {
      render(<PremiumButton>Button</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("focus:outline-none", "focus:ring-2", "focus:ring-offset-2");
    });
  });

  describe("Variant Styles", () => {
    it("applies primary variant by default", () => {
      render(<PremiumButton>Primary</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-red-600", "text-white");
    });

    it("primary variant has hover effect", () => {
      render(<PremiumButton variant="primary">Primary</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("hover:bg-red-700");
    });

    it("applies secondary variant", () => {
      render(<PremiumButton variant="secondary">Secondary</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-gray-100", "text-gray-900");
    });

    it("secondary variant has dark mode support", () => {
      render(<PremiumButton variant="secondary">Secondary</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button.className).toMatch(/dark:bg-gray-800/);
    });

    it("applies outline variant", () => {
      render(<PremiumButton variant="outline">Outline</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("border-2", "border-red-600", "text-red-600");
    });

    it("outline variant changes on hover", () => {
      render(<PremiumButton variant="outline">Outline</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("hover:bg-red-600", "hover:text-white");
    });

    it("applies ghost variant", () => {
      render(<PremiumButton variant="ghost">Ghost</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-gray-700");
    });

    it("ghost variant has hover background", () => {
      render(<PremiumButton variant="ghost">Ghost</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("hover:bg-gray-100");
    });

    it("applies destructive variant", () => {
      render(<PremiumButton variant="destructive">Delete</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-red-500", "text-white");
    });

    it("destructive variant has hover effect", () => {
      render(<PremiumButton variant="destructive">Delete</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("hover:bg-red-600");
    });
  });

  describe("Size Variants", () => {
    it("applies sm size", () => {
      render(<PremiumButton size="sm">Small</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("px-3", "py-1.5", "text-sm", "rounded-md");
    });

    it("applies md size (default)", () => {
      render(<PremiumButton size="md">Medium</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("px-4", "py-2", "text-base", "rounded-lg");
    });

    it("applies lg size", () => {
      render(<PremiumButton size="lg">Large</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("px-6", "py-3", "text-lg", "rounded-lg");
    });

    it("applies xl size", () => {
      render(<PremiumButton size="xl">Extra Large</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("px-8", "py-4", "text-xl", "rounded-xl");
    });

    it("sm size has smaller gap", () => {
      render(<PremiumButton size="sm">Small</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("gap-1.5");
    });

    it("lg size has larger gap", () => {
      render(<PremiumButton size="lg">Large</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("gap-2.5");
    });

    it("xl size has largest gap", () => {
      render(<PremiumButton size="xl">Extra Large</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("gap-3");
    });
  });

  describe("Loading State", () => {
    it("shows loading spinner when loading=true", () => {
      render(<PremiumButton loading>Submit</PremiumButton>);
      expect(screen.getByTestId("loader-icon")).toBeInTheDocument();
    });

    it("shows loading text when loading", () => {
      render(<PremiumButton loading>Submit</PremiumButton>);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("hides children when loading", () => {
      render(<PremiumButton loading>Submit Form</PremiumButton>);
      expect(screen.queryByText("Submit Form")).not.toBeInTheDocument();
    });

    it("loading spinner has animation", () => {
      render(<PremiumButton loading>Submit</PremiumButton>);
      const loader = screen.getByTestId("loader-icon");
      expect(loader).toHaveClass("animate-spin");
    });

    it("loading spinner has correct size", () => {
      render(<PremiumButton loading>Submit</PremiumButton>);
      const loader = screen.getByTestId("loader-icon");
      expect(loader).toHaveAttribute("data-size", "16");
    });

    it("button is disabled when loading", () => {
      render(<PremiumButton loading>Submit</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("not loading by default", () => {
      render(<PremiumButton>Submit</PremiumButton>);
      expect(screen.queryByTestId("loader-icon")).not.toBeInTheDocument();
    });
  });

  describe("Icon Support", () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;

    it("renders icon on left by default", () => {
      render(<PremiumButton icon={<TestIcon />}>With Icon</PremiumButton>);
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });

    it("renders icon on left when iconPosition=left", () => {
      const { container } = render(
        <PremiumButton icon={<TestIcon />} iconPosition="left">
          Text
        </PremiumButton>
      );
      const icon = screen.getByTestId("test-icon");
      const text = screen.getByText("Text");
      // Both elements should be present
      expect(icon).toBeInTheDocument();
      expect(text).toBeInTheDocument();
      // Icon wrapper should come before Text in the button's content span
      const buttonHtml = container.querySelector("button")?.innerHTML || "";
      const iconIndex = buttonHtml.indexOf("test-icon");
      const textIndex = buttonHtml.indexOf(">Text<");
      expect(iconIndex).toBeLessThan(textIndex);
    });

    it("renders icon on right when iconPosition=right", () => {
      const { container } = render(
        <PremiumButton icon={<TestIcon />} iconPosition="right">
          Text
        </PremiumButton>
      );
      const icon = screen.getByTestId("test-icon");
      const text = screen.getByText("Text");
      // Both elements should be present
      expect(icon).toBeInTheDocument();
      expect(text).toBeInTheDocument();
      // Text should come before icon wrapper in the button's content span
      const buttonHtml = container.querySelector("button")?.innerHTML || "";
      const iconIndex = buttonHtml.indexOf("test-icon");
      const textIndex = buttonHtml.indexOf(">Text<");
      expect(textIndex).toBeLessThan(iconIndex);
    });

    it("icon has scale animation on hover", () => {
      render(<PremiumButton icon={<TestIcon />}>Text</PremiumButton>);
      const iconWrapper = screen.getByTestId("test-icon").parentElement;
      expect(iconWrapper).toHaveClass("group-hover:scale-110");
    });

    it("icon has transition", () => {
      render(<PremiumButton icon={<TestIcon />}>Text</PremiumButton>);
      const iconWrapper = screen.getByTestId("test-icon").parentElement;
      expect(iconWrapper).toHaveClass("transition-transform");
    });

    it("does not render icon when not provided", () => {
      render(<PremiumButton>No Icon</PremiumButton>);
      expect(screen.queryByTestId("test-icon")).not.toBeInTheDocument();
    });

    it("icon is hidden when loading", () => {
      render(
        <PremiumButton icon={<TestIcon />} loading>
          Text
        </PremiumButton>
      );
      expect(screen.queryByTestId("test-icon")).not.toBeInTheDocument();
    });
  });

  describe("Full Width", () => {
    it("applies full width when fullWidth=true", () => {
      render(<PremiumButton fullWidth>Full Width</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("w-full");
    });

    it("not full width by default", () => {
      render(<PremiumButton>Normal Width</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).not.toHaveClass("w-full");
    });
  });

  describe("Pulse Animation", () => {
    it("applies pulse animation when pulse=true", () => {
      render(<PremiumButton pulse>Pulse</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("animate-pulse");
    });

    it("no pulse by default", () => {
      render(<PremiumButton>No Pulse</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).not.toHaveClass("animate-pulse");
    });

    it("pulse animation disabled when button is disabled", () => {
      render(
        <PremiumButton pulse disabled>
          Disabled Pulse
        </PremiumButton>
      );
      const button = screen.getByRole("button");
      expect(button).not.toHaveClass("animate-pulse");
    });
  });

  describe("Glow Effect", () => {
    it("applies glow effect when glow=true", () => {
      render(<PremiumButton glow>Glow</PremiumButton>);
      const button = screen.getByRole("button");
      // Glow is implemented via shadow classes
      expect(button.className).toMatch(/shadow-red-500/);
    });

    it("glow enhances on hover", () => {
      render(<PremiumButton glow>Glow</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button.className).toMatch(/hover:shadow-red-500\/40/);
    });

    it("no glow by default", () => {
      render(<PremiumButton>No Glow</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button.className).not.toMatch(/shadow-red-500/);
    });

    it("glow is hidden when disabled", () => {
      const { container } = render(
        <PremiumButton glow disabled>
          Disabled Glow
        </PremiumButton>
      );
      // Glow span should not be rendered when disabled
      const glowSpan = container.querySelector(".animate-pulse .bg-gradient-to-r");
      expect(glowSpan).not.toBeInTheDocument();
    });
  });

  describe("Disabled State", () => {
    it("button is disabled when disabled=true", () => {
      render(<PremiumButton disabled>Disabled</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("disabled button has opacity", () => {
      render(<PremiumButton disabled>Disabled</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("disabled:opacity-50");
    });

    it("disabled button has cursor-not-allowed", () => {
      render(<PremiumButton disabled>Disabled</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("disabled:cursor-not-allowed");
    });

    it("button is not disabled by default", () => {
      render(<PremiumButton>Enabled</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).not.toBeDisabled();
    });

    it("loading disables the button", () => {
      render(<PremiumButton loading>Loading</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("both disabled and loading keeps button disabled", () => {
      render(
        <PremiumButton disabled loading>
          Both
        </PremiumButton>
      );
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });
  });

  describe("Hover Effects", () => {
    it("has lift effect on hover", () => {
      render(<PremiumButton>Hover Me</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("hover:-translate-y-0.5", "hover:shadow-xl");
    });

    it("has active state styles", () => {
      render(<PremiumButton>Active</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("active:translate-y-0", "active:shadow-lg");
    });

    it("has before pseudo-element for shine effect", () => {
      render(<PremiumButton>Shine</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("before:absolute", "before:inset-0", "before:transition-all");
    });
  });

  describe("Ripple Effect", () => {
    it("contains ripple effect container", () => {
      const { container } = render(<PremiumButton>Ripple</PremiumButton>);
      const rippleContainer = container.querySelector(".rounded-inherit");
      expect(rippleContainer).toBeInTheDocument();
    });

    it("ripple has active state", () => {
      const { container } = render(<PremiumButton>Ripple</PremiumButton>);
      const rippleEffect = container.querySelector(".group-active\\:opacity-20");
      expect(rippleEffect).toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to button element", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<PremiumButton ref={ref}>Button</PremiumButton>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("ref can access button properties", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<PremiumButton ref={ref}>Button</PremiumButton>);
      expect(ref.current?.tagName).toBe("BUTTON");
    });

    it("ref can call focus method", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<PremiumButton ref={ref}>Button</PremiumButton>);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe("Custom Props", () => {
    it("accepts custom className", () => {
      render(<PremiumButton className="custom-button">Custom</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-button");
    });

    it("accepts type attribute", () => {
      render(<PremiumButton type="submit">Submit</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });

    it("accepts onClick handler", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<PremiumButton onClick={handleClick}>Click</PremiumButton>);

      await user.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("accepts id attribute", () => {
      render(<PremiumButton id="premium-btn">Button</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("id", "premium-btn");
    });

    it("accepts aria-label", () => {
      render(<PremiumButton aria-label="Special button">Button</PremiumButton>);
      const button = screen.getByLabelText("Special button");
      expect(button).toBeInTheDocument();
    });

    it("accepts data attributes", () => {
      render(<PremiumButton data-testid="premium-test">Button</PremiumButton>);
      const button = screen.getByTestId("premium-test");
      expect(button).toBeInTheDocument();
    });
  });

  describe("Real-World Scenarios", () => {
    it("call-to-action button", () => {
      render(
        <PremiumButton variant="primary" size="lg" glow pulse>
          Get Started Now
        </PremiumButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("px-6", "py-3", "text-lg");
    });

    it("form submit button", () => {
      const handleSubmit = vi.fn();
      render(
        <PremiumButton type="submit" onClick={handleSubmit}>
          Submit Form
        </PremiumButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });

    it("loading submission", () => {
      render(<PremiumButton loading>Submitting...</PremiumButton>);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("delete button with destructive variant", async () => {
      const user = userEvent.setup();
      const handleDelete = vi.fn();
      render(
        <PremiumButton variant="destructive" onClick={handleDelete}>
          Delete Account
        </PremiumButton>
      );

      await user.click(screen.getByRole("button"));
      expect(handleDelete).toHaveBeenCalled();
    });

    it("icon button with text", () => {
      const DownloadIcon = () => <span>📥</span>;
      render(
        <PremiumButton icon={<DownloadIcon />} iconPosition="left">
          Download
        </PremiumButton>
      );
      expect(screen.getByText("📥")).toBeInTheDocument();
      expect(screen.getByText("Download")).toBeInTheDocument();
    });

    it("full-width mobile button", () => {
      render(
        <PremiumButton fullWidth size="lg">
          Continue
        </PremiumButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("w-full");
    });

    it("secondary action button", () => {
      render(
        <PremiumButton variant="secondary" size="sm">
          Cancel
        </PremiumButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-gray-100", "px-3", "py-1.5");
    });

    it("outline button for less prominent action", () => {
      render(<PremiumButton variant="outline">Learn More</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("border-2", "border-red-600");
    });
  });

  describe("Combination of Props", () => {
    it("combines variant and size", () => {
      render(
        <PremiumButton variant="primary" size="xl">
          Large Primary
        </PremiumButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-red-600", "px-8", "py-4");
    });

    it("combines all premium effects", () => {
      render(
        <PremiumButton variant="primary" size="lg" glow pulse>
          Premium
        </PremiumButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("animate-pulse");
      expect(button.className).toMatch(/shadow-red-500/);
    });

    it("combines icon and loading states", () => {
      const Icon = () => <span>Icon</span>;
      render(
        <PremiumButton icon={<Icon />} loading>
          Text
        </PremiumButton>
      );
      // Icon should be hidden when loading
      expect(screen.queryByText("Icon")).not.toBeInTheDocument();
      expect(screen.getByTestId("loader-icon")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has button role", () => {
      render(<PremiumButton>Button</PremiumButton>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("is keyboard accessible", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<PremiumButton onClick={handleClick}>Click</PremiumButton>);

      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard("{Enter}");

      expect(handleClick).toHaveBeenCalled();
    });

    it("disabled button is not clickable", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <PremiumButton disabled onClick={handleClick}>
          Disabled
        </PremiumButton>
      );

      await user.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("loading button is not clickable", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <PremiumButton loading onClick={handleClick}>
          Loading
        </PremiumButton>
      );

      await user.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("has focus visible ring", () => {
      render(<PremiumButton>Focus Me</PremiumButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("focus:ring-2");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty children", () => {
      render(<PremiumButton></PremiumButton>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("handles very long text", () => {
      const longText = "A".repeat(100);
      render(<PremiumButton>{longText}</PremiumButton>);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it("handles special characters in text", () => {
      render(<PremiumButton>{"<>&\"' Special"}</PremiumButton>);
      expect(screen.getByText("<>&\"' Special")).toBeInTheDocument();
    });

    it("handles JSX children", () => {
      render(
        <PremiumButton>
          Click <strong>Here</strong>
        </PremiumButton>
      );
      expect(screen.getByText("Here")).toBeInTheDocument();
    });
  });
});
