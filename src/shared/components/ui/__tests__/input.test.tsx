import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../input";
import { createRef } from "react";

describe("Input", () => {
  describe("Rendering", () => {
    it("renders input element", () => {
      render(<Input />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("has data-slot attribute", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("data-slot", "input");
    });

    it("renders with placeholder", () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
    });

    it("renders with default value", () => {
      render(<Input defaultValue="Initial value" />);
      expect(screen.getByDisplayValue("Initial value")).toBeInTheDocument();
    });
  });

  describe("Label", () => {
    it("renders label when provided", () => {
      render(<Input label="Username" />);
      expect(screen.getByLabelText("Username")).toBeInTheDocument();
    });

    it("associates label with input via htmlFor", () => {
      render(<Input label="Email" id="email-input" />);
      const label = screen.getByText("Email");
      const input = screen.getByLabelText("Email");

      expect(label).toHaveAttribute("for", "email-input");
      expect(input).toHaveAttribute("id", "email-input");
    });

    it("generates unique ID when not provided", () => {
      const { container } = render(<Input label="Password" />);
      const input = container.querySelector("input");
      const id = input?.getAttribute("id");

      expect(id).toBeTruthy();
      // React.useId() format varies by environment
      expect(id).toBeDefined();
    });

    it("renders without label when not provided", () => {
      const { container } = render(<Input />);
      expect(container.querySelector("label")).not.toBeInTheDocument();
    });

    it("applies label styles", () => {
      render(<Input label="Field" />);
      const label = screen.getByText("Field");
      expect(label).toHaveClass("text-sm", "font-medium", "text-gray-700");
    });
  });

  describe("Variants", () => {
    it("applies default variant styles", () => {
      render(<Input variant="default" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border-gray-200", "text-gray-900");
    });

    it("applies error variant styles", () => {
      render(<Input variant="error" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border-red-500", "focus:ring-red-500");
    });

    it("applies success variant styles", () => {
      render(<Input variant="success" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border-green-500", "focus:ring-green-500");
    });

    it("automatically applies error variant when error prop is provided", () => {
      render(<Input error="This field is required" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border-red-500");
    });
  });

  describe("Sizes", () => {
    it("applies sm size styles", () => {
      render(<Input size="sm" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("h-8", "px-2", "text-xs");
    });

    it("applies md (default) size styles", () => {
      render(<Input size="md" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("h-10", "px-3", "text-sm");
    });

    it("applies lg size styles", () => {
      render(<Input size="lg" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("h-12", "px-4", "text-base");
    });

    it("uses md size by default", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("h-10", "px-3");
    });
  });

  describe("Error Handling", () => {
    it("displays error message", () => {
      render(<Input error="Invalid input" />);
      expect(screen.getByText("Invalid input")).toBeInTheDocument();
    });

    it("applies error text color", () => {
      render(<Input error="Error message" />);
      const error = screen.getByText("Error message");
      expect(error).toHaveClass("text-red-600");
    });

    it("sets aria-invalid when error is present", () => {
      render(<Input error="Error" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("associates error with input via aria-describedby", () => {
      render(<Input id="test-input" error="Error message" />);
      const input = screen.getByRole("textbox");
      const errorId = input.getAttribute("aria-describedby");

      expect(errorId).toBeTruthy();
      expect(errorId).toBe("test-input-error");
      expect(screen.getByText("Error message")).toHaveAttribute("id", errorId!);
    });

    it("does not set aria-invalid when no error", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-invalid", "false");
    });

    it("error takes precedence over helperText", () => {
      render(<Input error="Error" helperText="Helper" />);
      expect(screen.getByText("Error")).toBeInTheDocument();
      expect(screen.queryByText("Helper")).not.toBeInTheDocument();
    });
  });

  describe("Helper Text", () => {
    it("displays helper text", () => {
      render(<Input helperText="Enter your email address" />);
      expect(screen.getByText("Enter your email address")).toBeInTheDocument();
    });

    it("applies helper text styles", () => {
      render(<Input helperText="Helper text" />);
      const helper = screen.getByText("Helper text");
      expect(helper).toHaveClass("text-sm", "text-gray-500");
    });

    it("associates helper text with input via aria-describedby", () => {
      render(<Input id="test-input" helperText="Helper" />);
      const input = screen.getByRole("textbox");
      const helperId = input.getAttribute("aria-describedby");

      expect(helperId).toBeTruthy();
      expect(helperId).toBe("test-input-helper");
      expect(screen.getByText("Helper")).toHaveAttribute("id", helperId!);
    });

    it("does not display when error is present", () => {
      render(<Input error="Error" helperText="Helper" />);
      expect(screen.queryByText("Helper")).not.toBeInTheDocument();
    });
  });

  describe("Icon", () => {
    it("renders icon when provided", () => {
      const Icon = () => <svg data-testid="test-icon" />;
      render(<Input icon={<Icon />} />);
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });

    it("adds left padding when icon is present", () => {
      const Icon = () => <svg />;
      render(<Input icon={<Icon />} />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("pl-10");
    });

    it("positions icon absolutely", () => {
      const { container } = render(<Input icon={<span>Icon</span>} />);
      const iconWrapper = container.querySelector(".absolute");
      expect(iconWrapper).toHaveClass("left-3", "top-1/2", "-translate-y-1/2");
    });

    it("makes icon non-interactive", () => {
      const { container } = render(<Input icon={<span>Icon</span>} />);
      const iconWrapper = container.querySelector(".absolute");
      expect(iconWrapper).toHaveClass("pointer-events-none");
    });
  });

  describe("Input Types", () => {
    it("renders text input by default", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      // Input without explicit type attribute defaults to text behavior in browsers
      // In jsdom, it may not have the type attribute set explicitly
      const typeAttr = input.getAttribute("type");
      expect(typeAttr === null || typeAttr === "text").toBe(true);
    });

    it("renders email input", () => {
      render(<Input type="email" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "email");
    });

    it("renders password input", () => {
      render(<Input type="password" />);
      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });

    it("renders number input", () => {
      render(<Input type="number" />);
      const input = screen.getByRole("spinbutton");
      expect(input).toHaveAttribute("type", "number");
    });

    it("renders tel input", () => {
      render(<Input type="tel" />);
      const input = document.querySelector('input[type="tel"]');
      expect(input).toBeInTheDocument();
    });

    it("renders url input", () => {
      render(<Input type="url" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "url");
    });

    it("renders search input", () => {
      render(<Input type="search" />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveAttribute("type", "search");
    });
  });

  describe("User Interactions", () => {
    it("accepts user input", async () => {
      const user = userEvent.setup();
      render(<Input />);

      const input = screen.getByRole("textbox");
      await user.type(input, "Hello World");

      expect(input).toHaveValue("Hello World");
    });

    it("calls onChange when value changes", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Input onChange={handleChange} />);

      const input = screen.getByRole("textbox");
      await user.type(input, "abc");

      expect(handleChange).toHaveBeenCalledTimes(3); // Once per character
    });

    it("calls onFocus when focused", async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();

      render(<Input onFocus={handleFocus} />);

      const input = screen.getByRole("textbox");
      await user.click(input);

      expect(handleFocus).toHaveBeenCalled();
    });

    it("calls onBlur when blurred", async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();

      render(<Input onBlur={handleBlur} />);

      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.tab(); // Blur by tabbing away

      expect(handleBlur).toHaveBeenCalled();
    });

    it("can be cleared", async () => {
      const user = userEvent.setup();
      render(<Input defaultValue="Initial" />);

      const input = screen.getByRole("textbox");
      await user.clear(input);

      expect(input).toHaveValue("");
    });
  });

  describe("Disabled State", () => {
    it("applies disabled styles", () => {
      render(<Input disabled />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("disabled:cursor-not-allowed", "disabled:opacity-50");
    });

    it("is not editable when disabled", async () => {
      const user = userEvent.setup();
      render(<Input disabled defaultValue="Cannot edit" />);

      const input = screen.getByRole("textbox");
      await user.type(input, "test");

      expect(input).toHaveValue("Cannot edit");
    });

    it("has disabled attribute", () => {
      render(<Input disabled />);
      expect(screen.getByRole("textbox")).toBeDisabled();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to input element", () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.tagName).toBe("INPUT");
    });

    it("allows programmatic focus via ref", () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} />);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });

    it("allows programmatic value access via ref", () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} defaultValue="Test" />);

      expect(ref.current?.value).toBe("Test");
    });
  });

  describe("Accessibility", () => {
    it("has proper role", () => {
      render(<Input />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("supports aria-label", () => {
      render(<Input aria-label="Search" />);
      expect(screen.getByLabelText("Search")).toBeInTheDocument();
    });

    it("is keyboard accessible", async () => {
      const user = userEvent.setup();
      render(<Input />);

      await user.tab();
      const input = screen.getByRole("textbox");

      expect(input).toHaveFocus();
    });

    it("has focus ring styles", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("focus:ring-2", "focus:ring-[var(--color-primary)]");
    });
  });

  describe("Custom ClassName", () => {
    it("merges custom className with default classes", () => {
      render(<Input className="custom-class" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("custom-class");
      expect(input).toHaveClass("rounded-lg"); // Base class
    });

    it("allows Tailwind class overrides", () => {
      render(<Input className="px-6" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("px-6");
    });
  });

  describe("HTML Attributes", () => {
    it("accepts name attribute", () => {
      render(<Input name="username" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("name", "username");
    });

    it("accepts required attribute", () => {
      render(<Input required />);
      expect(screen.getByRole("textbox")).toBeRequired();
    });

    it("accepts maxLength attribute", () => {
      render(<Input maxLength={10} />);
      expect(screen.getByRole("textbox")).toHaveAttribute("maxLength", "10");
    });

    it("accepts minLength attribute", () => {
      render(<Input minLength={5} />);
      expect(screen.getByRole("textbox")).toHaveAttribute("minLength", "5");
    });

    it("accepts pattern attribute", () => {
      render(<Input pattern="[0-9]*" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("pattern", "[0-9]*");
    });

    it("accepts autoComplete attribute", () => {
      render(<Input autoComplete="email" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("autoComplete", "email");
    });

    it("accepts autoFocus attribute", () => {
      render(<Input autoFocus />);
      expect(screen.getByRole("textbox")).toHaveFocus();
    });

    it("accepts readOnly attribute", () => {
      render(<Input readOnly defaultValue="Read only" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("readOnly");
    });
  });

  describe("Real-World Scenarios", () => {
    it("renders login email field", () => {
      render(
        <Input
          type="email"
          label="Email"
          placeholder="tu@email.com"
          required
          autoComplete="email"
        />
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "email");
      expect(input).toBeRequired();
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
    });

    it("renders password field with error", () => {
      render(
        <Input type="password" label="Password" error="Password must be at least 8 characters" />
      );

      expect(screen.getByText("Password must be at least 8 characters")).toBeInTheDocument();
      const input = document.querySelector('input[type="password"]');
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("renders search input with icon", () => {
      const SearchIcon = () => <svg data-testid="search-icon" />;
      render(<Input type="search" placeholder="Search events..." icon={<SearchIcon />} />);

      expect(screen.getByRole("searchbox")).toBeInTheDocument();
      expect(screen.getByTestId("search-icon")).toBeInTheDocument();
    });

    it("renders phone number input", () => {
      render(
        <Input
          type="tel"
          label="Phone Number"
          placeholder="+34 600 000 000"
          helperText="Include country code"
        />
      );

      expect(screen.getByText("Include country code")).toBeInTheDocument();
      const input = document.querySelector('input[type="tel"]');
      expect(input).toBeInTheDocument();
    });

    it("handles controlled input", async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [value, setValue] = React.useState("");
        return (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Controlled"
          />
        );
      };

      render(<TestComponent />);
      const input = screen.getByRole("textbox");

      await user.type(input, "Controlled value");
      expect(input).toHaveValue("Controlled value");
    });
  });

  describe("Variant and Size Combinations", () => {
    it("combines error variant with sm size", () => {
      render(<Input variant="error" size="sm" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border-red-500", "h-8");
    });

    it("combines success variant with lg size", () => {
      render(<Input variant="success" size="lg" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border-green-500", "h-12");
    });
  });
});

// Import React for controlled component test
import React from "react";
