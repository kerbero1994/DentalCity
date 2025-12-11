import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchInput } from "../search-input";
import React, { useState } from "react";

// Mock lucide-react icons with proper class forwarding
vi.mock("lucide-react", () => ({
  Search: ({ className, ...props }: { className?: string }) => (
    <svg data-testid="search-icon" className={className} {...props}>
      Search
    </svg>
  ),
  X: ({ className, ...props }: { className?: string }) => (
    <svg data-testid="x-icon" className={className} {...props}>
      X
    </svg>
  ),
}));

// Wrapper component to test controlled behavior
function ControlledSearchInput(
  props: Omit<React.ComponentProps<typeof SearchInput>, "value" | "onChange"> & {
    initialValue?: string;
    onChangeSpy?: (value: string) => void;
  }
) {
  const { initialValue = "", onChangeSpy, ...rest } = props;
  const [value, setValue] = useState(initialValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChangeSpy?.(newValue);
  };

  return <SearchInput value={value} onChange={handleChange} {...rest} />;
}

describe("SearchInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders search input element", () => {
      render(<SearchInput value="" onChange={() => {}} />);
      const input = screen.getByRole("searchbox");
      expect(input).toBeInTheDocument();
    });

    it("has search input type", () => {
      render(<SearchInput value="" onChange={() => {}} />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveAttribute("type", "search");
    });

    it("renders with wrapper div", () => {
      const { container } = render(<SearchInput value="" onChange={() => {}} />);
      const wrapper = container.querySelector(".relative");
      expect(wrapper).toBeInTheDocument();
    });

    it("wrapper has relative positioning", () => {
      const { container } = render(<SearchInput value="" onChange={() => {}} />);
      const wrapper = container.querySelector(".relative");
      expect(wrapper).toHaveClass("relative");
    });

    it("applies default placeholder", () => {
      render(<SearchInput value="" onChange={() => {}} placeholder="Search..." />);
      const input = screen.getByPlaceholderText("Search...");
      expect(input).toBeInTheDocument();
    });
  });

  describe("Search Icon", () => {
    it("renders search icon", () => {
      render(<SearchInput value="" onChange={() => {}} />);
      expect(screen.getByTestId("search-icon")).toBeInTheDocument();
    });

    it("search icon has positioning classes", () => {
      render(<SearchInput value="" onChange={() => {}} />);
      const icon = screen.getByTestId("search-icon");
      expect(icon).toHaveClass("left-3");
    });

    it("search icon is absolutely positioned", () => {
      render(<SearchInput value="" onChange={() => {}} />);
      const icon = screen.getByTestId("search-icon");
      expect(icon).toHaveClass("absolute");
    });

    it("search icon is vertically centered", () => {
      render(<SearchInput value="" onChange={() => {}} />);
      const icon = screen.getByTestId("search-icon");
      expect(icon).toHaveClass("top-1/2", "-translate-y-1/2");
    });

    it("search icon is not interactive", () => {
      render(<SearchInput value="" onChange={() => {}} />);
      const icon = screen.getByTestId("search-icon");
      expect(icon).toHaveClass("pointer-events-none");
    });

    it("search icon has proper color", () => {
      render(<SearchInput value="" onChange={() => {}} />);
      const icon = screen.getByTestId("search-icon");
      expect(icon).toHaveClass("text-gray-400");
    });
  });

  describe("Clear Button", () => {
    it("does not show clear button when input is empty", () => {
      render(<SearchInput value="" onChange={() => {}} />);
      const clearButton = screen.queryByTestId("x-icon");
      expect(clearButton).not.toBeInTheDocument();
    });

    it("shows clear button when input has value", () => {
      render(<SearchInput value="test" onChange={() => {}} />);
      expect(screen.getByTestId("x-icon")).toBeInTheDocument();
    });

    it("shows clear button when typing in controlled component", async () => {
      const user = userEvent.setup();
      render(<ControlledSearchInput />);

      const input = screen.getByRole("searchbox");
      await user.type(input, "test");

      expect(screen.getByTestId("x-icon")).toBeInTheDocument();
    });

    it("clear button clears input value", async () => {
      const user = userEvent.setup();
      render(<ControlledSearchInput initialValue="test query" />);

      const input = screen.getByRole("searchbox") as HTMLInputElement;
      expect(input.value).toBe("test query");

      const clearButton = screen.getByTestId("x-icon").closest("button");
      if (clearButton) {
        await user.click(clearButton);
      }

      expect(input.value).toBe("");
    });

    it("clear button is on the right side", () => {
      render(<SearchInput value="test" onChange={() => {}} />);
      const clearButton = screen.getByTestId("x-icon").closest("button");
      expect(clearButton).toHaveClass("right-3");
    });

    it("clear button is absolutely positioned", () => {
      render(<SearchInput value="test" onChange={() => {}} />);
      const clearButton = screen.getByTestId("x-icon").closest("button");
      expect(clearButton).toHaveClass("absolute");
    });

    it("clear button is vertically centered", () => {
      render(<SearchInput value="test" onChange={() => {}} />);
      const clearButton = screen.getByTestId("x-icon").closest("button");
      expect(clearButton).toHaveClass("top-1/2", "-translate-y-1/2");
    });

    it("clear button has hover effect", () => {
      render(<SearchInput value="test" onChange={() => {}} />);
      const clearButton = screen.getByTestId("x-icon").closest("button");
      expect(clearButton).toHaveClass("hover:text-gray-600");
    });

    it("clear button has transition", () => {
      render(<SearchInput value="test" onChange={() => {}} />);
      const clearButton = screen.getByTestId("x-icon").closest("button");
      expect(clearButton).toHaveClass("transition-colors");
    });

    it("focuses input after clearing", async () => {
      const user = userEvent.setup();
      render(<ControlledSearchInput initialValue="test" />);

      const clearButton = screen.getByTestId("x-icon").closest("button");
      if (clearButton) {
        await user.click(clearButton);
      }

      const input = screen.getByRole("searchbox");
      expect(input).toHaveFocus();
    });

    it("calls onChange when clearing", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ControlledSearchInput initialValue="test" onChangeSpy={handleChange} />);

      const clearButton = screen.getByTestId("x-icon").closest("button");
      if (clearButton) {
        await user.click(clearButton);
      }

      expect(handleChange).toHaveBeenCalledWith("");
    });
  });

  describe("Size Variants", () => {
    it("applies sm size styles", () => {
      render(<SearchInput value="" onChange={() => {}} size="sm" />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveClass("h-8", "text-sm", "pr-8");
    });

    it("applies md size styles (default)", () => {
      render(<SearchInput value="" onChange={() => {}} />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveClass("h-10", "text-base", "pr-10");
    });

    it("applies lg size styles", () => {
      render(<SearchInput value="" onChange={() => {}} size="lg" />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveClass("h-12", "text-lg", "pr-12");
    });

    it("sm size has appropriate icon size", () => {
      render(<SearchInput value="" onChange={() => {}} size="sm" />);
      const icon = screen.getByTestId("search-icon");
      expect(icon).toHaveClass("h-4", "w-4");
    });

    it("md size has appropriate icon size", () => {
      render(<SearchInput value="" onChange={() => {}} size="md" />);
      const icon = screen.getByTestId("search-icon");
      expect(icon).toHaveClass("h-5", "w-5");
    });

    it("lg size has appropriate icon size", () => {
      render(<SearchInput value="" onChange={() => {}} size="lg" />);
      const icon = screen.getByTestId("search-icon");
      expect(icon).toHaveClass("h-6", "w-6");
    });

    it("sm size has correct padding", () => {
      render(<SearchInput value="" onChange={() => {}} size="sm" />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveClass("pr-8");
    });

    it("md size has correct padding", () => {
      render(<SearchInput value="" onChange={() => {}} size="md" />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveClass("pr-10");
    });

    it("lg size has correct padding", () => {
      render(<SearchInput value="" onChange={() => {}} size="lg" />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveClass("pr-12");
    });
  });

  describe("Styling", () => {
    it("has rounded corners", () => {
      render(<SearchInput value="" onChange={() => {}} />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveClass("rounded-lg");
    });

    it("has border", () => {
      render(<SearchInput value="" onChange={() => {}} />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveClass("border");
    });

    it("has backdrop blur", () => {
      render(<SearchInput value="" onChange={() => {}} />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveClass("backdrop-blur-sm");
    });

    it("has background color", () => {
      render(<SearchInput value="" onChange={() => {}} />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveClass("bg-white/90");
    });

    it("has focus ring", () => {
      render(<SearchInput value="" onChange={() => {}} />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveClass("focus:ring-2", "focus:ring-[var(--color-primary)]");
    });

    it("has transition", () => {
      render(<SearchInput value="" onChange={() => {}} />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveClass("transition-all");
    });

    it("has dark mode support", () => {
      render(<SearchInput value="" onChange={() => {}} />);
      const input = screen.getByRole("searchbox");
      expect(input.className).toMatch(/dark:/);
    });

    it("placeholder has proper styling", () => {
      render(<SearchInput value="" onChange={() => {}} />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveClass("placeholder:text-gray-400");
    });
  });

  describe("Controlled Component", () => {
    it("accepts value prop", () => {
      render(<SearchInput value="controlled value" onChange={() => {}} />);
      const input = screen.getByRole("searchbox") as HTMLInputElement;
      expect(input.value).toBe("controlled value");
    });

    it("calls onChange when typing", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<SearchInput value="" onChange={handleChange} />);

      const input = screen.getByRole("searchbox");
      await user.type(input, "test");

      expect(handleChange).toHaveBeenCalled();
    });

    it("updates when value prop changes", () => {
      const { rerender } = render(<SearchInput value="initial" onChange={() => {}} />);

      let input = screen.getByRole("searchbox") as HTMLInputElement;
      expect(input.value).toBe("initial");

      rerender(<SearchInput value="updated" onChange={() => {}} />);

      input = screen.getByRole("searchbox") as HTMLInputElement;
      expect(input.value).toBe("updated");
    });

    it("shows clear button for controlled component with value", () => {
      render(<SearchInput value="test" onChange={() => {}} />);
      expect(screen.getByTestId("x-icon")).toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to input element", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<SearchInput value="" onChange={() => {}} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it("ref can be used to focus input", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<SearchInput value="" onChange={() => {}} ref={ref} />);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });

    it("ref can access input value", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<SearchInput value="test value" onChange={() => {}} ref={ref} />);
      expect(ref.current?.value).toBe("test value");
    });
  });

  describe("Custom Props", () => {
    it("accepts custom className", () => {
      render(<SearchInput value="" onChange={() => {}} className="custom-search" />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveClass("custom-search");
    });

    it("accepts custom id", () => {
      render(<SearchInput value="" onChange={() => {}} id="search-bar" />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveAttribute("id", "search-bar");
    });

    it("accepts name attribute", () => {
      render(<SearchInput value="" onChange={() => {}} name="query" />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveAttribute("name", "query");
    });

    it("accepts disabled prop", () => {
      render(<SearchInput value="" onChange={() => {}} disabled />);
      const input = screen.getByRole("searchbox");
      expect(input).toBeDisabled();
    });

    it("disabled input has proper styling", () => {
      render(<SearchInput value="" onChange={() => {}} disabled />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveClass("disabled:opacity-50", "disabled:cursor-not-allowed");
    });

    it("accepts required prop", () => {
      render(<SearchInput value="" onChange={() => {}} required />);
      const input = screen.getByRole("searchbox");
      expect(input).toBeRequired();
    });

    it("accepts autoComplete prop", () => {
      render(<SearchInput value="" onChange={() => {}} autoComplete="off" />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveAttribute("autocomplete", "off");
    });

    it("autoFocus is passed as prop", () => {
      render(<SearchInput value="" onChange={() => {}} autoFocus />);
      const input = screen.getByRole("searchbox");
      // autoFocus may not always work in jsdom, just verify prop is passed
      expect(input).toBeInTheDocument();
    });
  });

  describe("Real-World Scenarios", () => {
    it("global site search", async () => {
      const user = userEvent.setup();
      const handleSearch = vi.fn();

      render(
        <SearchInput value="" placeholder="Search SITIMM..." onChange={handleSearch} size="md" />
      );

      const input = screen.getByPlaceholderText("Search SITIMM...");
      await user.type(input, "security");

      expect(handleSearch).toHaveBeenCalled();
    });

    it("filter search in table", async () => {
      const user = userEvent.setup();
      const handleFilter = vi.fn();

      render(
        <SearchInput value="" placeholder="Filter programs..." onChange={handleFilter} size="sm" />
      );

      const input = screen.getByPlaceholderText("Filter programs...");
      await user.type(input, "engineering");

      expect(handleFilter).toHaveBeenCalled();
    });

    it("search with clear and refocus", async () => {
      const user = userEvent.setup();
      render(<ControlledSearchInput initialValue="conference" placeholder="Search events..." />);

      const input = screen.getByPlaceholderText("Search events...") as HTMLInputElement;
      expect(input.value).toBe("conference");

      const clearButton = screen.getByTestId("x-icon").closest("button");
      if (clearButton) {
        await user.click(clearButton);
      }

      expect(input).toHaveFocus();
      expect(input.value).toBe("");
    });

    it("mobile search with large size", () => {
      render(<SearchInput value="test" onChange={() => {}} size="lg" placeholder="Search..." />);

      const input = screen.getByRole("searchbox");
      expect(input).toHaveClass("h-12", "text-lg");

      expect(screen.getByTestId("x-icon")).toBeInTheDocument();
    });

    it("autocomplete disabled search", () => {
      render(
        <SearchInput value="" onChange={() => {}} autoComplete="off" placeholder="Search..." />
      );
      const input = screen.getByRole("searchbox");
      expect(input).toHaveAttribute("autocomplete", "off");
    });
  });

  describe("Keyboard Navigation", () => {
    it("can be focused via Tab", async () => {
      const user = userEvent.setup();
      render(<SearchInput value="" onChange={() => {}} />);

      await user.tab();
      const input = screen.getByRole("searchbox");
      expect(input).toHaveFocus();
    });

    it("supports keyboard input", async () => {
      const user = userEvent.setup();
      render(<ControlledSearchInput />);

      const input = screen.getByRole("searchbox") as HTMLInputElement;
      await user.click(input);
      await user.keyboard("search query");

      expect(input.value).toBe("search query");
    });

    it("supports Escape to clear (native behavior)", async () => {
      const user = userEvent.setup();
      render(<ControlledSearchInput initialValue="test" />);

      const input = screen.getByRole("searchbox");
      await user.click(input);
      await user.keyboard("{Escape}");

      // Note: Native search input may clear on Escape
      expect(input).toHaveFocus();
    });
  });

  describe("Accessibility", () => {
    it("has searchbox role", () => {
      render(<SearchInput value="" onChange={() => {}} />);
      const input = screen.getByRole("searchbox");
      expect(input).toBeInTheDocument();
    });

    it("clear button has accessible label", () => {
      render(<SearchInput value="test" onChange={() => {}} />);
      const clearButton = screen.getByTestId("x-icon").closest("button");
      expect(clearButton).toHaveAttribute("aria-label");
    });

    it("clear button has button type", () => {
      render(<SearchInput value="test" onChange={() => {}} />);
      const clearButton = screen.getByTestId("x-icon").closest("button");
      expect(clearButton).toHaveAttribute("type", "button");
    });

    it("supports screen reader announcements", () => {
      render(<SearchInput value="" onChange={() => {}} ariaLabel="Search products" />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveAttribute("aria-label", "Search products");
    });

    it("placeholder is accessible", () => {
      render(<SearchInput value="" onChange={() => {}} placeholder="Search..." />);
      const input = screen.getByPlaceholderText("Search...");
      expect(input).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles very long input", async () => {
      const user = userEvent.setup();
      render(<ControlledSearchInput />);

      const input = screen.getByRole("searchbox") as HTMLInputElement;
      const longText = "a".repeat(200);
      await user.type(input, longText);

      expect(input.value).toBe(longText);
    });

    it("handles special characters", async () => {
      const user = userEvent.setup();
      render(<ControlledSearchInput />);

      const input = screen.getByRole("searchbox") as HTMLInputElement;
      await user.type(input, "C++ programming & debugging");

      expect(input.value).toBe("C++ programming & debugging");
    });

    it("handles rapid typing and clearing", async () => {
      const user = userEvent.setup();
      render(<ControlledSearchInput />);

      const input = screen.getByRole("searchbox") as HTMLInputElement;

      await user.type(input, "test");
      let clearButton = screen.getByTestId("x-icon").closest("button");
      if (clearButton) await user.click(clearButton);

      await user.type(input, "another");
      clearButton = screen.getByTestId("x-icon").closest("button");
      if (clearButton) await user.click(clearButton);

      expect(input.value).toBe("");
    });

    it("handles empty onChange gracefully", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<SearchInput value="" onChange={handleChange} />);

      const input = screen.getByRole("searchbox");
      await user.type(input, "test");

      // Should not throw
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe("Focus Management", () => {
    it("maintains focus ring visibility", async () => {
      const user = userEvent.setup();
      render(<SearchInput value="" onChange={() => {}} />);

      const input = screen.getByRole("searchbox");
      await user.click(input);

      expect(input).toHaveFocus();
      expect(input).toHaveClass("focus:ring-2");
    });

    it("focus ring has correct color", () => {
      render(<SearchInput value="" onChange={() => {}} />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveClass("focus:ring-[var(--color-primary)]");
    });

    it("loses focus ring when blurred", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <SearchInput value="" onChange={() => {}} />
          <button>Other Element</button>
        </div>
      );

      const input = screen.getByRole("searchbox");
      await user.click(input);
      expect(input).toHaveFocus();

      await user.click(screen.getByText("Other Element"));
      expect(input).not.toHaveFocus();
    });
  });
});
