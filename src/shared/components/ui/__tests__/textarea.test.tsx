import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextArea } from "../textarea";
import { createRef } from "react";
import React from "react";

describe("TextArea", () => {
  describe("Rendering", () => {
    it("renders textarea element", () => {
      render(<TextArea />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeInTheDocument();
    });

    it("has data-slot attribute", () => {
      render(<TextArea />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("data-slot", "textarea");
    });

    it("renders with placeholder", () => {
      render(<TextArea placeholder="Enter your message" />);
      expect(screen.getByPlaceholderText("Enter your message")).toBeInTheDocument();
    });

    it("renders with default value", () => {
      render(<TextArea defaultValue="Initial text" />);
      expect(screen.getByDisplayValue("Initial text")).toBeInTheDocument();
    });

    it("is not resizable by default", () => {
      render(<TextArea />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("resize-none");
    });
  });

  describe("Label", () => {
    it("renders label when provided", () => {
      render(<TextArea label="Message" />);
      expect(screen.getByLabelText("Message")).toBeInTheDocument();
    });

    it("associates label with textarea via htmlFor", () => {
      render(<TextArea label="Comments" id="comments-textarea" />);
      const label = screen.getByText("Comments");
      const textarea = screen.getByLabelText("Comments");

      expect(label).toHaveAttribute("for", "comments-textarea");
      expect(textarea).toHaveAttribute("id", "comments-textarea");
    });

    it("generates unique ID when not provided", () => {
      const { container } = render(<TextArea label="Feedback" />);
      const textarea = container.querySelector("textarea");
      const id = textarea?.getAttribute("id");

      expect(id).toBeTruthy();
      // React.useId() format varies between React/Next.js environments
      expect(id).toBeDefined();
    });

    it("renders without label when not provided", () => {
      const { container } = render(<TextArea />);
      expect(container.querySelector("label")).not.toBeInTheDocument();
    });

    it("applies label styles", () => {
      render(<TextArea label="Field" />);
      const label = screen.getByText("Field");
      expect(label).toHaveClass("text-sm", "font-medium", "text-gray-700");
    });
  });

  describe("Variants", () => {
    it("applies default variant styles", () => {
      render(<TextArea variant="default" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("border-gray-200", "text-gray-900");
    });

    it("applies error variant styles", () => {
      render(<TextArea variant="error" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("border-red-500", "focus:ring-red-500");
    });

    it("applies success variant styles", () => {
      render(<TextArea variant="success" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("border-green-500", "focus:ring-green-500");
    });

    it("automatically applies error variant when error prop is provided", () => {
      render(<TextArea error="This field is required" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("border-red-500");
    });
  });

  describe("Sizes", () => {
    it("applies sm size styles", () => {
      render(<TextArea size="sm" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("px-2", "py-1.5", "text-xs");
    });

    it("applies md (default) size styles", () => {
      render(<TextArea size="md" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("px-3", "py-2", "text-sm");
    });

    it("applies lg size styles", () => {
      render(<TextArea size="lg" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("px-4", "py-3", "text-base");
    });

    it("uses md size by default", () => {
      render(<TextArea />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("px-3", "py-2");
    });
  });

  describe("Error Handling", () => {
    it("displays error message", () => {
      render(<TextArea error="Message is too short" />);
      expect(screen.getByText("Message is too short")).toBeInTheDocument();
    });

    it("applies error text color", () => {
      render(<TextArea error="Error message" />);
      const error = screen.getByText("Error message");
      expect(error).toHaveClass("text-red-600");
    });

    it("sets aria-invalid when error is present", () => {
      render(<TextArea error="Error" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("aria-invalid", "true");
    });

    it("associates error with textarea via aria-describedby", () => {
      render(<TextArea id="test-textarea" error="Error message" />);
      const textarea = screen.getByRole("textbox");
      const errorId = textarea.getAttribute("aria-describedby");

      expect(errorId).toBeTruthy();
      expect(errorId).toBe("test-textarea-error");
      expect(screen.getByText("Error message")).toHaveAttribute("id", errorId!);
    });

    it("does not set aria-invalid when no error", () => {
      render(<TextArea />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("aria-invalid", "false");
    });

    it("error takes precedence over helperText", () => {
      render(<TextArea error="Error" helperText="Helper" />);
      expect(screen.getByText("Error")).toBeInTheDocument();
      expect(screen.queryByText("Helper")).not.toBeInTheDocument();
    });
  });

  describe("Helper Text", () => {
    it("displays helper text", () => {
      render(<TextArea helperText="Maximum 500 characters" />);
      expect(screen.getByText("Maximum 500 characters")).toBeInTheDocument();
    });

    it("applies helper text styles", () => {
      render(<TextArea helperText="Helper text" />);
      const helper = screen.getByText("Helper text");
      expect(helper).toHaveClass("text-sm", "text-gray-500");
    });

    it("associates helper text with textarea via aria-describedby", () => {
      render(<TextArea id="test-textarea" helperText="Helper" />);
      const textarea = screen.getByRole("textbox");
      const helperId = textarea.getAttribute("aria-describedby");

      expect(helperId).toBeTruthy();
      expect(helperId).toBe("test-textarea-helper");
      expect(screen.getByText("Helper")).toHaveAttribute("id", helperId!);
    });

    it("does not display when error is present", () => {
      render(<TextArea error="Error" helperText="Helper" />);
      expect(screen.queryByText("Helper")).not.toBeInTheDocument();
    });
  });

  describe("Character Count", () => {
    it("shows character count when enabled", () => {
      render(<TextArea showCharCount maxLength={100} defaultValue="Test" />);
      expect(screen.getByText("4/100")).toBeInTheDocument();
    });

    it("updates character count on input", async () => {
      const user = userEvent.setup();
      render(<TextArea showCharCount maxLength={100} />);

      const textarea = screen.getByRole("textbox");
      await user.type(textarea, "Hello");

      expect(screen.getByText("5/100")).toBeInTheDocument();
    });

    it("shows red color when exceeding maxLength", () => {
      // Use controlled value to exceed maxLength (browser maxLength attr prevents typing beyond)
      render(<TextArea showCharCount maxLength={5} value="Hello World" onChange={() => {}} />);

      const counter = screen.getByText("11/5");
      expect(counter).toHaveClass("text-red-600");
    });

    it("does not show count without showCharCount prop", () => {
      render(<TextArea maxLength={100} defaultValue="Test" />);
      expect(screen.queryByText("4/100")).not.toBeInTheDocument();
    });

    it("does not show count without maxLength", () => {
      render(<TextArea showCharCount defaultValue="Test" />);
      expect(screen.queryByText(/\d+\/\d+/)).not.toBeInTheDocument();
    });

    it("updates count with controlled value", async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState("");
        return (
          <TextArea
            showCharCount
            maxLength={50}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      const textarea = screen.getByRole("textbox");
      await user.type(textarea, "Testing");

      expect(screen.getByText("7/50")).toBeInTheDocument();
    });
  });

  describe("User Interactions", () => {
    it("accepts user input", async () => {
      const user = userEvent.setup();
      render(<TextArea />);

      const textarea = screen.getByRole("textbox");
      await user.type(textarea, "Hello World");

      expect(textarea).toHaveValue("Hello World");
    });

    it("calls onChange when value changes", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<TextArea onChange={handleChange} />);

      const textarea = screen.getByRole("textbox");
      await user.type(textarea, "abc");

      expect(handleChange).toHaveBeenCalledTimes(3);
    });

    it("calls onFocus when focused", async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();

      render(<TextArea onFocus={handleFocus} />);

      const textarea = screen.getByRole("textbox");
      await user.click(textarea);

      expect(handleFocus).toHaveBeenCalled();
    });

    it("calls onBlur when blurred", async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();

      render(<TextArea onBlur={handleBlur} />);

      const textarea = screen.getByRole("textbox");
      await user.click(textarea);
      await user.tab();

      expect(handleBlur).toHaveBeenCalled();
    });

    it("can be cleared", async () => {
      const user = userEvent.setup();
      render(<TextArea defaultValue="Initial" />);

      const textarea = screen.getByRole("textbox");
      await user.clear(textarea);

      expect(textarea).toHaveValue("");
    });

    it("supports multiline input", async () => {
      const user = userEvent.setup();
      render(<TextArea />);

      const textarea = screen.getByRole("textbox");
      await user.type(textarea, "Line 1{Enter}Line 2{Enter}Line 3");

      expect(textarea).toHaveValue("Line 1\nLine 2\nLine 3");
    });
  });

  describe("Disabled State", () => {
    it("applies disabled styles", () => {
      render(<TextArea disabled />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("disabled:cursor-not-allowed", "disabled:opacity-50");
    });

    it("is not editable when disabled", async () => {
      const user = userEvent.setup();
      render(<TextArea disabled defaultValue="Cannot edit" />);

      const textarea = screen.getByRole("textbox");
      await user.type(textarea, "test");

      expect(textarea).toHaveValue("Cannot edit");
    });

    it("has disabled attribute", () => {
      render(<TextArea disabled />);
      expect(screen.getByRole("textbox")).toBeDisabled();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to textarea element", () => {
      const ref = createRef<HTMLTextAreaElement>();
      render(<TextArea ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
      expect(ref.current?.tagName).toBe("TEXTAREA");
    });

    it("allows programmatic focus via ref", () => {
      const ref = createRef<HTMLTextAreaElement>();
      render(<TextArea ref={ref} />);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });

    it("allows programmatic value access via ref", () => {
      const ref = createRef<HTMLTextAreaElement>();
      render(<TextArea ref={ref} defaultValue="Test" />);

      expect(ref.current?.value).toBe("Test");
    });
  });

  describe("Accessibility", () => {
    it("has proper role", () => {
      render(<TextArea />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("supports aria-label", () => {
      render(<TextArea aria-label="Feedback" />);
      expect(screen.getByLabelText("Feedback")).toBeInTheDocument();
    });

    it("is keyboard accessible", async () => {
      const user = userEvent.setup();
      render(<TextArea />);

      await user.tab();
      const textarea = screen.getByRole("textbox");

      expect(textarea).toHaveFocus();
    });

    it("has focus ring styles", () => {
      render(<TextArea />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("focus:ring-2", "focus:ring-[var(--color-primary)]");
    });
  });

  describe("Custom ClassName", () => {
    it("merges custom className with default classes", () => {
      render(<TextArea className="custom-class" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("custom-class");
      expect(textarea).toHaveClass("rounded-lg");
    });

    it("allows Tailwind class overrides", () => {
      render(<TextArea className="px-6" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("px-6");
    });
  });

  describe("HTML Attributes", () => {
    it("accepts name attribute", () => {
      render(<TextArea name="message" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("name", "message");
    });

    it("accepts required attribute", () => {
      render(<TextArea required />);
      expect(screen.getByRole("textbox")).toBeRequired();
    });

    it("accepts maxLength attribute", () => {
      render(<TextArea maxLength={500} />);
      expect(screen.getByRole("textbox")).toHaveAttribute("maxLength", "500");
    });

    it("accepts minLength attribute", () => {
      render(<TextArea minLength={10} />);
      expect(screen.getByRole("textbox")).toHaveAttribute("minLength", "10");
    });

    it("accepts rows attribute", () => {
      render(<TextArea rows={5} />);
      expect(screen.getByRole("textbox")).toHaveAttribute("rows", "5");
    });

    it("accepts cols attribute", () => {
      render(<TextArea cols={50} />);
      expect(screen.getByRole("textbox")).toHaveAttribute("cols", "50");
    });

    it("accepts autoFocus attribute", () => {
      render(<TextArea autoFocus />);
      expect(screen.getByRole("textbox")).toHaveFocus();
    });

    it("accepts readOnly attribute", () => {
      render(<TextArea readOnly defaultValue="Read only" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("readOnly");
    });
  });

  describe("Real-World Scenarios", () => {
    it("renders comment textarea with character limit", () => {
      render(
        <TextArea
          label="Comment"
          placeholder="Share your thoughts..."
          showCharCount
          maxLength={500}
          rows={4}
        />
      );

      expect(screen.getByLabelText("Comment")).toBeInTheDocument();
      expect(screen.getByText("0/500")).toBeInTheDocument();
    });

    it("renders feedback form textarea with error", () => {
      render(
        <TextArea
          label="Feedback"
          error="Feedback must be at least 10 characters"
          defaultValue="Short"
        />
      );

      expect(screen.getByText("Feedback must be at least 10 characters")).toBeInTheDocument();
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("aria-invalid", "true");
    });

    it("renders message textarea with helper text", () => {
      render(
        <TextArea
          label="Message"
          helperText="This message will be sent to the support team"
          rows={6}
        />
      );

      expect(screen.getByText("This message will be sent to the support team")).toBeInTheDocument();
    });

    it("handles controlled textarea for form", async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [value, setValue] = React.useState("");
        return (
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type your message"
          />
        );
      };

      render(<TestComponent />);
      const textarea = screen.getByRole("textbox");

      await user.type(textarea, "Controlled value");
      expect(textarea).toHaveValue("Controlled value");
    });

    it("renders bio textarea with large size", () => {
      render(
        <TextArea
          label="Bio"
          size="lg"
          rows={8}
          showCharCount
          maxLength={1000}
          placeholder="Tell us about yourself..."
        />
      );

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("px-4", "py-3", "text-base");
      expect(screen.getByText("0/1000")).toBeInTheDocument();
    });
  });

  describe("Variant and Size Combinations", () => {
    it("combines error variant with sm size", () => {
      render(<TextArea variant="error" size="sm" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("border-red-500", "px-2", "py-1.5");
    });

    it("combines success variant with lg size", () => {
      render(<TextArea variant="success" size="lg" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("border-green-500", "px-4", "py-3");
    });
  });
});
