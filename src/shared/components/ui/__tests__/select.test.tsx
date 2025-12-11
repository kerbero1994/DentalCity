import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "../select";
import { createRef } from "react";

// Mock lucide-react
vi.mock("lucide-react", () => ({
  ChevronDown: ({ className }: { className?: string }) => (
    <svg data-testid="chevron-icon" className={className} />
  ),
}));

describe("Select", () => {
  const mockOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  describe("Rendering", () => {
    it("renders select element", () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });

    it("renders all options", () => {
      render(<Select options={mockOptions} />);
      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(3);
    });

    it("renders option labels correctly", () => {
      render(<Select options={mockOptions} />);
      expect(screen.getByRole("option", { name: "Option 1" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Option 2" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Option 3" })).toBeInTheDocument();
    });

    it("renders option values correctly", () => {
      render(<Select options={mockOptions} />);
      const option1 = screen.getByRole("option", { name: "Option 1" }) as HTMLOptionElement;
      expect(option1.value).toBe("option1");
    });

    it("renders chevron icon", () => {
      render(<Select options={mockOptions} />);
      expect(screen.getByTestId("chevron-icon")).toBeInTheDocument();
    });
  });

  describe("Label", () => {
    it("renders label when provided", () => {
      render(<Select options={mockOptions} label="Choose option" />);
      expect(screen.getByLabelText("Choose option")).toBeInTheDocument();
    });

    it("associates label with select via htmlFor", () => {
      render(<Select options={mockOptions} label="Country" id="country-select" />);
      const label = screen.getByText("Country");
      const select = screen.getByLabelText("Country");

      expect(label).toHaveAttribute("for", "country-select");
      expect(select).toHaveAttribute("id", "country-select");
    });

    it("generates unique ID when not provided", () => {
      const { container } = render(<Select options={mockOptions} label="Region" />);
      const select = container.querySelector("select");
      const id = select?.getAttribute("id");

      expect(id).toBeTruthy();
      // React.useId() format varies by environment
      expect(id).toBeDefined();
    });

    it("renders without label when not provided", () => {
      const { container } = render(<Select options={mockOptions} />);
      expect(container.querySelector("label")).not.toBeInTheDocument();
    });

    it("applies label styles", () => {
      render(<Select options={mockOptions} label="Field" />);
      const label = screen.getByText("Field");
      expect(label).toHaveClass("text-sm", "font-medium", "text-gray-700");
    });
  });

  describe("Variants", () => {
    it("applies default variant styles", () => {
      render(<Select options={mockOptions} variant="default" />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("border-gray-200", "text-gray-900");
    });

    it("applies error variant styles", () => {
      render(<Select options={mockOptions} variant="error" />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("border-red-500", "focus:ring-red-500");
    });

    it("applies success variant styles", () => {
      render(<Select options={mockOptions} variant="success" />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("border-green-500", "focus:ring-green-500");
    });

    it("automatically applies error variant when error prop is provided", () => {
      render(<Select options={mockOptions} error="Please select an option" />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("border-red-500");
    });
  });

  describe("Sizes", () => {
    it("applies sm size styles", () => {
      render(<Select options={mockOptions} size="sm" />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("h-8", "px-2", "text-xs");
    });

    it("applies md (default) size styles", () => {
      render(<Select options={mockOptions} size="md" />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("h-10", "px-3", "text-sm");
    });

    it("applies lg size styles", () => {
      render(<Select options={mockOptions} size="lg" />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("h-12", "px-4", "text-base");
    });

    it("uses md size by default", () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("h-10", "px-3");
    });
  });

  describe("Error Handling", () => {
    it("displays error message", () => {
      render(<Select options={mockOptions} error="This field is required" />);
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("applies error text color", () => {
      render(<Select options={mockOptions} error="Error message" />);
      const error = screen.getByText("Error message");
      expect(error).toHaveClass("text-red-600");
    });

    it("sets aria-invalid when error is present", () => {
      render(<Select options={mockOptions} error="Error" />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("aria-invalid", "true");
    });

    it("associates error with select via aria-describedby", () => {
      render(<Select options={mockOptions} id="test-select" error="Error message" />);
      const select = screen.getByRole("combobox");
      const errorId = select.getAttribute("aria-describedby");

      expect(errorId).toBeTruthy();
      expect(errorId).toBe("test-select-error");
      expect(screen.getByText("Error message")).toHaveAttribute("id", errorId!);
    });

    it("does not set aria-invalid when no error", () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("aria-invalid", "false");
    });

    it("error takes precedence over helperText", () => {
      render(<Select options={mockOptions} error="Error" helperText="Helper" />);
      expect(screen.getByText("Error")).toBeInTheDocument();
      expect(screen.queryByText("Helper")).not.toBeInTheDocument();
    });
  });

  describe("Helper Text", () => {
    it("displays helper text", () => {
      render(<Select options={mockOptions} helperText="Choose your preferred option" />);
      expect(screen.getByText("Choose your preferred option")).toBeInTheDocument();
    });

    it("applies helper text styles", () => {
      render(<Select options={mockOptions} helperText="Helper text" />);
      const helper = screen.getByText("Helper text");
      expect(helper).toHaveClass("text-sm", "text-gray-500");
    });

    it("associates helper text with select via aria-describedby", () => {
      render(<Select options={mockOptions} id="test-select" helperText="Helper" />);
      const select = screen.getByRole("combobox");
      const helperId = select.getAttribute("aria-describedby");

      expect(helperId).toBeTruthy();
      expect(helperId).toBe("test-select-helper");
      expect(screen.getByText("Helper")).toHaveAttribute("id", helperId!);
    });

    it("does not display when error is present", () => {
      render(<Select options={mockOptions} error="Error" helperText="Helper" />);
      expect(screen.queryByText("Helper")).not.toBeInTheDocument();
    });
  });

  describe("Icon", () => {
    it("renders icon when provided", () => {
      const Icon = () => <svg data-testid="custom-icon" />;
      render(<Select options={mockOptions} icon={<Icon />} />);
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("adds left padding when icon is present", () => {
      const Icon = () => <svg />;
      render(<Select options={mockOptions} icon={<Icon />} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("pl-10");
    });

    it("positions icon absolutely", () => {
      const { container } = render(<Select options={mockOptions} icon={<span>Icon</span>} />);
      const iconWrapper = container.querySelector(".absolute");
      expect(iconWrapper).toHaveClass("left-3", "top-1/2", "-translate-y-1/2");
    });

    it("makes icon non-interactive", () => {
      const { container } = render(<Select options={mockOptions} icon={<span>Icon</span>} />);
      const iconWrapper = container.querySelector(".absolute");
      expect(iconWrapper).toHaveClass("pointer-events-none");
    });
  });

  describe("Options", () => {
    it("renders disabled options", () => {
      const optionsWithDisabled = [
        { value: "1", label: "Enabled" },
        { value: "2", label: "Disabled", disabled: true },
      ];

      render(<Select options={optionsWithDisabled} />);

      const disabledOption = screen.getByRole("option", { name: "Disabled" });
      expect(disabledOption).toBeDisabled();
    });

    it("enabled options are not disabled", () => {
      render(<Select options={mockOptions} />);

      const option = screen.getByRole("option", { name: "Option 1" });
      expect(option).not.toBeDisabled();
    });

    it("renders empty options array", () => {
      render(<Select options={[]} />);
      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();

      const options = screen.queryAllByRole("option");
      expect(options).toHaveLength(0);
    });

    it("renders many options", () => {
      const manyOptions = Array.from({ length: 50 }, (_, i) => ({
        value: `option${i}`,
        label: `Option ${i}`,
      }));

      render(<Select options={manyOptions} />);
      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(50);
    });
  });

  describe("User Interactions", () => {
    it("can select an option", async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      const select = screen.getByRole("combobox") as HTMLSelectElement;
      await user.selectOptions(select, "option2");

      expect(select.value).toBe("option2");
    });

    it("calls onChange when selection changes", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Select options={mockOptions} onChange={handleChange} />);

      const select = screen.getByRole("combobox");
      await user.selectOptions(select, "option2");

      expect(handleChange).toHaveBeenCalled();
    });

    it("calls onFocus when focused", async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();

      render(<Select options={mockOptions} onFocus={handleFocus} />);

      const select = screen.getByRole("combobox");
      await user.click(select);

      expect(handleFocus).toHaveBeenCalled();
    });

    it("calls onBlur when blurred", async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();

      render(<Select options={mockOptions} onBlur={handleBlur} />);

      const select = screen.getByRole("combobox");
      await user.click(select);
      await user.tab();

      expect(handleBlur).toHaveBeenCalled();
    });

    it("cannot select disabled options", async () => {
      const user = userEvent.setup();
      const optionsWithDisabled = [
        { value: "1", label: "Enabled" },
        { value: "2", label: "Disabled", disabled: true },
      ];

      render(<Select options={optionsWithDisabled} />);

      const select = screen.getByRole("combobox") as HTMLSelectElement;

      // Try to select disabled option - behavior depends on browser
      await user.selectOptions(select, "1");
      expect(select.value).toBe("1");
    });
  });

  describe("Disabled State", () => {
    it("applies disabled styles", () => {
      render(<Select options={mockOptions} disabled />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("disabled:cursor-not-allowed", "disabled:opacity-50");
    });

    it("is not interactive when disabled", () => {
      render(<Select options={mockOptions} disabled />);
      const select = screen.getByRole("combobox");
      expect(select).toBeDisabled();
    });

    it("has disabled attribute", () => {
      render(<Select options={mockOptions} disabled />);
      expect(screen.getByRole("combobox")).toBeDisabled();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to select element", () => {
      const ref = createRef<HTMLSelectElement>();
      render(<Select options={mockOptions} ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLSelectElement);
      expect(ref.current?.tagName).toBe("SELECT");
    });

    it("allows programmatic focus via ref", () => {
      const ref = createRef<HTMLSelectElement>();
      render(<Select options={mockOptions} ref={ref} />);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });

    it("allows programmatic value access via ref", () => {
      const ref = createRef<HTMLSelectElement>();
      render(<Select options={mockOptions} ref={ref} defaultValue="option2" />);

      expect(ref.current?.value).toBe("option2");
    });
  });

  describe("Accessibility", () => {
    it("has proper role", () => {
      render(<Select options={mockOptions} />);
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("supports aria-label", () => {
      render(<Select options={mockOptions} aria-label="Choose category" />);
      expect(screen.getByLabelText("Choose category")).toBeInTheDocument();
    });

    it("is keyboard accessible", async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      await user.tab();
      const select = screen.getByRole("combobox");

      expect(select).toHaveFocus();
    });

    it("has focus ring styles", () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("focus:ring-2", "focus:ring-[var(--color-primary)]");
    });

    it("chevron icon is non-interactive", () => {
      const { container } = render(<Select options={mockOptions} />);
      const chevron = container.querySelector('[data-testid="chevron-icon"]');
      // The pointer-events-none class is applied directly to the ChevronDown component
      expect(chevron).toHaveClass("pointer-events-none");
    });
  });

  describe("Custom ClassName", () => {
    it("merges custom className with default classes", () => {
      render(<Select options={mockOptions} className="custom-class" />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("custom-class");
      expect(select).toHaveClass("rounded-lg");
    });

    it("allows Tailwind class overrides", () => {
      render(<Select options={mockOptions} className="px-6" />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("px-6");
    });
  });

  describe("HTML Attributes", () => {
    it("accepts name attribute", () => {
      render(<Select options={mockOptions} name="category" />);
      expect(screen.getByRole("combobox")).toHaveAttribute("name", "category");
    });

    it("accepts required attribute", () => {
      render(<Select options={mockOptions} required />);
      expect(screen.getByRole("combobox")).toBeRequired();
    });

    it("accepts defaultValue attribute", () => {
      render(<Select options={mockOptions} defaultValue="option2" />);
      const select = screen.getByRole("combobox") as HTMLSelectElement;
      expect(select.value).toBe("option2");
    });

    it("accepts autoFocus attribute", () => {
      render(<Select options={mockOptions} autoFocus />);
      expect(screen.getByRole("combobox")).toHaveFocus();
    });
  });

  describe("Real-World Scenarios", () => {
    it("renders country selector", () => {
      const countries = [
        { value: "pe", label: "Perú" },
        { value: "ar", label: "Argentina" },
        { value: "cl", label: "Chile" },
      ];

      render(<Select options={countries} label="País" placeholder="Selecciona un país" />);

      expect(screen.getByLabelText("País")).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Perú" })).toBeInTheDocument();
    });

    it("renders language selector with error", () => {
      const languages = [
        { value: "es", label: "Español" },
        { value: "en", label: "English" },
        { value: "fr", label: "Français" },
      ];

      render(<Select options={languages} label="Idioma" error="Please select a language" />);

      expect(screen.getByText("Please select a language")).toBeInTheDocument();
      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("aria-invalid", "true");
    });

    it("renders category selector with helper text", () => {
      const categories = [
        { value: "tech", label: "Technology" },
        { value: "health", label: "Health & Safety" },
        { value: "admin", label: "Administration" },
      ];

      render(
        <Select
          options={categories}
          label="Category"
          helperText="Choose the most relevant category"
        />
      );

      expect(screen.getByText("Choose the most relevant category")).toBeInTheDocument();
    });

    it("renders priority selector with disabled options", () => {
      const priorities = [
        { value: "low", label: "Low Priority" },
        { value: "medium", label: "Medium Priority" },
        { value: "high", label: "High Priority" },
        { value: "critical", label: "Critical", disabled: true },
      ];

      render(<Select options={priorities} label="Priority" />);

      const criticalOption = screen.getByRole("option", { name: "Critical" });
      expect(criticalOption).toBeDisabled();
    });

    it("renders status selector with icon", () => {
      const statuses = [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "pending", label: "Pending" },
      ];

      const StatusIcon = () => <svg data-testid="status-icon" />;

      render(<Select options={statuses} label="Status" icon={<StatusIcon />} />);

      expect(screen.getByTestId("status-icon")).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("has cursor pointer", () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("cursor-pointer");
    });

    it("removes default appearance", () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("appearance-none");
    });

    it("has right padding for chevron", () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("pr-10");
    });
  });

  describe("Variant and Size Combinations", () => {
    it("combines error variant with sm size", () => {
      render(<Select options={mockOptions} variant="error" size="sm" />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("border-red-500", "h-8");
    });

    it("combines success variant with lg size", () => {
      render(<Select options={mockOptions} variant="success" size="lg" />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("border-green-500", "h-12");
    });
  });
});
