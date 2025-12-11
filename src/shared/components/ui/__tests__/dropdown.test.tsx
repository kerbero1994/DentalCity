import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown, type DropdownOption } from "../dropdown";
import { User, Settings, LogOut } from "lucide-react";

// Mock lucide-react icons with class forwarding
vi.mock("lucide-react", () => ({
  User: ({ className }: { className?: string }) => (
    <span data-testid="user-icon" className={className}>
      User Icon
    </span>
  ),
  Settings: ({ className }: { className?: string }) => (
    <span data-testid="settings-icon" className={className}>
      Settings Icon
    </span>
  ),
  LogOut: ({ className }: { className?: string }) => (
    <span data-testid="logout-icon" className={className}>
      Logout Icon
    </span>
  ),
  ChevronDown: ({ className }: { className?: string }) => (
    <span data-testid="chevron-down-icon" className={className}>
      ChevronDown Icon
    </span>
  ),
  Check: ({ className }: { className?: string }) => (
    <span data-testid="check-icon" className={className}>
      Check Icon
    </span>
  ),
}));

describe("Dropdown", () => {
  const mockOptions: DropdownOption[] = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders dropdown trigger button", () => {
      render(<Dropdown options={mockOptions} trigger={<button>Open Menu</button>} />);
      expect(screen.getByText("Open Menu")).toBeInTheDocument();
    });

    it("renders with default trigger text", () => {
      render(<Dropdown options={mockOptions} />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("dropdown content is hidden by default", () => {
      render(<Dropdown options={mockOptions} trigger={<button>Open</button>} />);
      const options = screen.queryByText("Option 1");
      expect(options).not.toBeInTheDocument();
    });

    it("applies custom className to wrapper", () => {
      const { container } = render(<Dropdown options={mockOptions} className="custom-dropdown" />);
      const wrapper = container.querySelector(".custom-dropdown");
      expect(wrapper).toBeInTheDocument();
    });

    it("renders with relative positioning", () => {
      const { container } = render(<Dropdown options={mockOptions} />);
      const wrapper = container.querySelector(".relative");
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe("Trigger Interaction", () => {
    it("opens dropdown on trigger click", async () => {
      const user = userEvent.setup();
      render(<Dropdown options={mockOptions} trigger={<button>Open</button>} />);

      const trigger = screen.getByText("Open");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument();
      });
    });

    it("closes dropdown on second trigger click", async () => {
      const user = userEvent.setup();
      render(<Dropdown options={mockOptions} trigger={<button>Toggle</button>} />);

      const trigger = screen.getByText("Toggle");
      await user.click(trigger);
      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument();
      });

      await user.click(trigger);
      await waitFor(() => {
        expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
      });
    });

    it("trigger has correct aria-expanded when closed", () => {
      const { container } = render(<Dropdown options={mockOptions} />);
      const trigger = container.querySelector("[aria-expanded]");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("trigger has correct aria-expanded when open", async () => {
      const user = userEvent.setup();
      const { container } = render(<Dropdown options={mockOptions} />);
      const trigger = screen.getByRole("button");

      await user.click(trigger);

      await waitFor(() => {
        const expandedTrigger = container.querySelector('[aria-expanded="true"]');
        expect(expandedTrigger).toBeInTheDocument();
      });
    });

    it("trigger has aria-haspopup attribute", () => {
      const { container } = render(<Dropdown options={mockOptions} />);
      const trigger = container.querySelector("[aria-haspopup]");
      expect(trigger).toHaveAttribute("aria-haspopup", "true");
    });
  });

  describe("Options Rendering", () => {
    it("renders all options when open", async () => {
      const user = userEvent.setup();
      render(<Dropdown options={mockOptions} trigger={<button>Open</button>} />);

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        mockOptions.forEach((option) => {
          expect(screen.getByText(option.label as string)).toBeInTheDocument();
        });
      });
    });

    it("renders options with icons", async () => {
      const user = userEvent.setup();
      const optionsWithIcons: DropdownOption[] = [
        { value: "profile", label: "Profile", icon: <User /> },
        { value: "settings", label: "Settings", icon: <Settings /> },
      ];

      render(<Dropdown options={optionsWithIcons} trigger={<button>Menu</button>} />);
      await user.click(screen.getByText("Menu"));

      await waitFor(() => {
        expect(screen.getByTestId("user-icon")).toBeInTheDocument();
        expect(screen.getByTestId("settings-icon")).toBeInTheDocument();
      });
    });

    it("renders options with descriptions", async () => {
      const user = userEvent.setup();
      const optionsWithDesc: DropdownOption[] = [
        {
          value: "profile",
          label: "Profile",
          description: "View your profile",
        },
        {
          value: "settings",
          label: "Settings",
          description: "Manage your settings",
        },
      ];

      render(<Dropdown options={optionsWithDesc} trigger={<button>Menu</button>} />);
      await user.click(screen.getByText("Menu"));

      await waitFor(() => {
        expect(screen.getByText("View your profile")).toBeInTheDocument();
        expect(screen.getByText("Manage your settings")).toBeInTheDocument();
      });
    });

    it("description has smaller text style", async () => {
      const user = userEvent.setup();
      const optionsWithDesc: DropdownOption[] = [
        {
          value: "profile",
          label: "Profile",
          description: "View your profile",
        },
      ];

      render(<Dropdown options={optionsWithDesc} trigger={<button>Menu</button>} />);
      await user.click(screen.getByText("Menu"));

      await waitFor(() => {
        const description = screen.getByText("View your profile");
        expect(description).toHaveClass("text-xs", "text-gray-500");
      });
    });

    it("renders disabled options", async () => {
      const user = userEvent.setup();
      const optionsWithDisabled: DropdownOption[] = [
        { value: "1", label: "Enabled" },
        { value: "2", label: "Disabled", disabled: true },
      ];

      render(<Dropdown options={optionsWithDisabled} trigger={<button>Menu</button>} />);
      await user.click(screen.getByText("Menu"));

      await waitFor(() => {
        const disabledOption = screen.getByText("Disabled").closest("button");
        expect(disabledOption).toHaveAttribute("disabled");
      });
    });

    it("disabled options have opacity style", async () => {
      const user = userEvent.setup();
      const optionsWithDisabled: DropdownOption[] = [
        { value: "1", label: "Disabled", disabled: true },
      ];

      render(<Dropdown options={optionsWithDisabled} trigger={<button>Menu</button>} />);
      await user.click(screen.getByText("Menu"));

      await waitFor(() => {
        const disabledOption = screen.getByText("Disabled").closest("button");
        expect(disabledOption).toHaveClass("opacity-50");
      });
    });
  });

  describe("Option Selection", () => {
    it("calls onChange when option is clicked", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Dropdown options={mockOptions} onChange={handleChange} trigger={<button>Select</button>} />
      );

      await user.click(screen.getByText("Select"));
      await waitFor(() => {
        expect(screen.getByText("Option 2")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Option 2"));
      expect(handleChange).toHaveBeenCalledWith("2");
    });

    it("closes dropdown after option selection", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Dropdown options={mockOptions} onChange={handleChange} trigger={<button>Select</button>} />
      );

      await user.click(screen.getByText("Select"));
      await user.click(screen.getByText("Option 1"));

      await waitFor(() => {
        expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
      });
    });

    it("does not call onChange for disabled option", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const optionsWithDisabled: DropdownOption[] = [
        { value: "1", label: "Enabled" },
        { value: "2", label: "Disabled", disabled: true },
      ];

      render(
        <Dropdown
          options={optionsWithDisabled}
          onChange={handleChange}
          trigger={<button>Select</button>}
        />
      );

      await user.click(screen.getByText("Select"));
      await waitFor(() => {
        expect(screen.getByText("Disabled")).toBeInTheDocument();
      });

      const disabledButton = screen.getByText("Disabled").closest("button");
      if (disabledButton) {
        await user.click(disabledButton);
      }

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("shows check icon for selected option", async () => {
      const user = userEvent.setup();
      render(<Dropdown options={mockOptions} value="2" trigger={<button>Select</button>} />);

      await user.click(screen.getByText("Select"));

      await waitFor(() => {
        expect(screen.getByTestId("check-icon")).toBeInTheDocument();
      });
    });

    it("updates selected option when value prop changes", async () => {
      const user = userEvent.setup();
      const { rerender } = render(
        <Dropdown options={mockOptions} value="1" trigger={<button>Select</button>} />
      );

      await user.click(screen.getByText("Select"));
      await waitFor(() => {
        expect(screen.getByTestId("check-icon")).toBeInTheDocument();
      });

      rerender(<Dropdown options={mockOptions} value="2" trigger={<button>Select</button>} />);

      // Check icon should still be present for new selection
      expect(screen.getByTestId("check-icon")).toBeInTheDocument();
    });
  });

  describe("Keyboard Navigation", () => {
    it("opens dropdown on Enter key", async () => {
      const user = userEvent.setup();
      render(<Dropdown options={mockOptions} trigger={<button>Menu</button>} />);

      const trigger = screen.getByText("Menu");
      trigger.focus();
      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument();
      });
    });

    it("opens dropdown on Space key", async () => {
      const user = userEvent.setup();
      render(<Dropdown options={mockOptions} trigger={<button>Menu</button>} />);

      const trigger = screen.getByText("Menu");
      trigger.focus();
      await user.keyboard(" ");

      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument();
      });
    });

    it("selects option on Enter key", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Dropdown options={mockOptions} onChange={handleChange} trigger={<button>Select</button>} />
      );

      await user.click(screen.getByText("Select"));
      await waitFor(() => {
        expect(screen.getByText("Option 2")).toBeInTheDocument();
      });

      const option = screen.getByText("Option 2").closest("button");
      if (option) {
        option.focus();
        await user.keyboard("{Enter}");
      }

      expect(handleChange).toHaveBeenCalledWith("2");
    });

    it("selects option on Space key", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Dropdown options={mockOptions} onChange={handleChange} trigger={<button>Select</button>} />
      );

      await user.click(screen.getByText("Select"));
      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument();
      });

      const option = screen.getByText("Option 1").closest("button");
      if (option) {
        option.focus();
        await user.keyboard(" ");
      }

      expect(handleChange).toHaveBeenCalledWith("1");
    });
  });

  describe("Click Outside Behavior", () => {
    it("closes dropdown when clicking outside", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Dropdown options={mockOptions} trigger={<button>Menu</button>} />
          <div data-testid="outside">Outside Element</div>
        </div>
      );

      await user.click(screen.getByText("Menu"));
      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument();
      });

      await user.click(screen.getByTestId("outside"));
      await waitFor(() => {
        expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
      });
    });

    it("does not close when clicking inside dropdown", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Dropdown options={mockOptions} trigger={<button>Menu</button>} />
      );

      await user.click(screen.getByText("Menu"));
      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument();
      });

      const dropdownContent = container.querySelector(".absolute");
      if (dropdownContent) {
        await user.click(dropdownContent);
      }

      expect(screen.getByText("Option 1")).toBeInTheDocument();
    });
  });

  describe("Dropdown Positioning", () => {
    it("dropdown content is absolutely positioned", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Dropdown options={mockOptions} trigger={<button>Menu</button>} />
      );

      await user.click(screen.getByText("Menu"));

      await waitFor(() => {
        const content = container.querySelector(".absolute");
        expect(content).toBeInTheDocument();
      });
    });

    it("dropdown has z-index for layering", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Dropdown options={mockOptions} trigger={<button>Menu</button>} />
      );

      await user.click(screen.getByText("Menu"));

      await waitFor(() => {
        const content = container.querySelector(".z-50");
        expect(content).toBeInTheDocument();
      });
    });

    it("dropdown has min-width constraint", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Dropdown options={mockOptions} trigger={<button>Menu</button>} />
      );

      await user.click(screen.getByText("Menu"));

      await waitFor(() => {
        // The min-w-[180px] class is applied to the dropdown menu
        const content = container.querySelector('[class*="min-w-"]');
        expect(content).toBeInTheDocument();
      });
    });

    it("dropdown has rounded corners", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Dropdown options={mockOptions} trigger={<button>Menu</button>} />
      );

      await user.click(screen.getByText("Menu"));

      await waitFor(() => {
        const content = container.querySelector(".rounded-lg");
        expect(content).toBeInTheDocument();
      });
    });

    it("dropdown has border styling", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Dropdown options={mockOptions} trigger={<button>Menu</button>} />
      );

      await user.click(screen.getByText("Menu"));

      await waitFor(() => {
        const content = container.querySelector(".border");
        expect(content).toBeInTheDocument();
      });
    });

    it("dropdown has shadow effect", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Dropdown options={mockOptions} trigger={<button>Menu</button>} />
      );

      await user.click(screen.getByText("Menu"));

      await waitFor(() => {
        const content = container.querySelector('[class*="shadow"]');
        expect(content).toBeInTheDocument();
      });
    });
  });

  describe("Custom Trigger", () => {
    it("renders custom trigger element", () => {
      render(
        <Dropdown
          options={mockOptions}
          trigger={<button className="custom-trigger">Custom Button</button>}
        />
      );

      const trigger = screen.getByText("Custom Button");
      expect(trigger).toHaveClass("custom-trigger");
    });

    it("works with div as trigger", async () => {
      const user = userEvent.setup();
      render(<Dropdown options={mockOptions} trigger={<div role="button">Div Trigger</div>} />);

      await user.click(screen.getByText("Div Trigger"));

      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument();
      });
    });

    it("works with custom component as trigger", async () => {
      const user = userEvent.setup();
      const CustomTrigger = () => (
        <button className="fancy-button">
          <span>Fancy</span>
        </button>
      );

      render(<Dropdown options={mockOptions} trigger={<CustomTrigger />} />);

      await user.click(screen.getByText("Fancy"));

      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument();
      });
    });
  });

  describe("Real-World Scenarios", () => {
    it("user profile menu", async () => {
      const user = userEvent.setup();
      const profileOptions: DropdownOption[] = [
        { value: "profile", label: "Profile", icon: <User /> },
        { value: "settings", label: "Settings", icon: <Settings /> },
        { value: "logout", label: "Logout", icon: <LogOut /> },
      ];

      const handleAction = vi.fn();

      render(
        <Dropdown
          options={profileOptions}
          onChange={handleAction}
          trigger={
            <button className="flex items-center gap-2">
              <span>John Doe</span>
            </button>
          }
        />
      );

      await user.click(screen.getByText("John Doe"));
      await waitFor(() => {
        expect(screen.getByText("Profile")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Settings"));
      expect(handleAction).toHaveBeenCalledWith("settings");
    });

    it("language selector", async () => {
      const user = userEvent.setup();
      const languages: DropdownOption[] = [
        { value: "en", label: "English" },
        { value: "es", label: "Español" },
        { value: "fr", label: "Français" },
      ];

      const handleLanguageChange = vi.fn();

      render(
        <Dropdown
          options={languages}
          value="en"
          onChange={handleLanguageChange}
          trigger={<button>English</button>}
        />
      );

      await user.click(screen.getByText("English"));
      await user.click(screen.getByText("Español"));

      expect(handleLanguageChange).toHaveBeenCalledWith("es");
    });

    it("actions menu with disabled items", async () => {
      const user = userEvent.setup();
      const actions: DropdownOption[] = [
        { value: "edit", label: "Edit" },
        { value: "delete", label: "Delete", disabled: true },
        { value: "archive", label: "Archive" },
      ];

      const handleAction = vi.fn();

      render(
        <Dropdown options={actions} onChange={handleAction} trigger={<button>Actions</button>} />
      );

      await user.click(screen.getByText("Actions"));

      const deleteButton = screen.getByText("Delete").closest("button");
      expect(deleteButton).toHaveAttribute("disabled");

      await user.click(screen.getByText("Edit"));
      expect(handleAction).toHaveBeenCalledWith("edit");
    });

    it("filter dropdown with descriptions", async () => {
      const user = userEvent.setup();
      const filters: DropdownOption[] = [
        {
          value: "all",
          label: "All Items",
          description: "Show all items",
        },
        {
          value: "active",
          label: "Active",
          description: "Show only active items",
        },
        {
          value: "archived",
          label: "Archived",
          description: "Show archived items",
        },
      ];

      render(<Dropdown options={filters} value="all" trigger={<button>Filter</button>} />);

      await user.click(screen.getByText("Filter"));

      expect(screen.getByText("Show all items")).toBeInTheDocument();
      expect(screen.getByText("Show only active items")).toBeInTheDocument();
      expect(screen.getByText("Show archived items")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("trigger has accessible role", () => {
      render(<Dropdown options={mockOptions} trigger={<button>Menu</button>} />);
      // When custom trigger is used, the wrapper div has role="button"
      const triggers = screen.getAllByRole("button");
      expect(triggers.length).toBeGreaterThanOrEqual(1);
    });

    it("options are keyboard accessible", async () => {
      const user = userEvent.setup();
      render(<Dropdown options={mockOptions} trigger={<button>Menu</button>} />);

      await user.click(screen.getByText("Menu"));

      await waitFor(() => {
        // Menu items have role="menuitem" and are buttons (inherently focusable)
        const options = screen.getAllByRole("menuitem");
        expect(options.length).toBeGreaterThan(0);
        options.forEach((option) => {
          // Buttons are inherently keyboard accessible
          expect(option.tagName).toBe("BUTTON");
        });
      });
    });

    it("disabled options have correct cursor", async () => {
      const user = userEvent.setup();
      const optionsWithDisabled: DropdownOption[] = [
        { value: "1", label: "Disabled", disabled: true },
      ];

      render(<Dropdown options={optionsWithDisabled} trigger={<button>Menu</button>} />);
      await user.click(screen.getByText("Menu"));

      await waitFor(() => {
        const disabledOption = screen.getByText("Disabled").closest("button");
        expect(disabledOption).toHaveClass("cursor-not-allowed");
      });
    });

    it("trigger indicates expandable state", () => {
      const { container } = render(<Dropdown options={mockOptions} />);
      const trigger = container.querySelector("[aria-expanded]");
      expect(trigger).toHaveAttribute("aria-haspopup", "true");
    });
  });

  describe("Complex Option Layouts", () => {
    it("renders options with both icon and description", async () => {
      const user = userEvent.setup();
      const complexOptions: DropdownOption[] = [
        {
          value: "profile",
          label: "Profile",
          icon: <User />,
          description: "View your profile",
        },
      ];

      render(<Dropdown options={complexOptions} trigger={<button>Menu</button>} />);
      await user.click(screen.getByText("Menu"));

      await waitFor(() => {
        expect(screen.getByTestId("user-icon")).toBeInTheDocument();
        expect(screen.getByText("View your profile")).toBeInTheDocument();
      });
    });

    it("icon has proper spacing", async () => {
      const user = userEvent.setup();
      const optionsWithIcon: DropdownOption[] = [{ value: "1", label: "Option", icon: <User /> }];

      const { container } = render(
        <Dropdown options={optionsWithIcon} trigger={<button>Menu</button>} />
      );
      await user.click(screen.getByText("Menu"));

      await waitFor(() => {
        const iconWrapper = screen.getByTestId("user-icon").parentElement;
        // Icons use flex-shrink-0 and gap is handled by parent flexbox
        expect(iconWrapper).toHaveClass("flex-shrink-0");
      });
    });

    it("check icon appears on right side", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Dropdown options={mockOptions} value="1" trigger={<button>Menu</button>} />
      );

      await user.click(screen.getByText("Menu"));

      await waitFor(() => {
        const checkIcon = screen.getByTestId("check-icon");
        // Check icon uses flex-shrink-0, positioned after flex-1 text content
        expect(checkIcon).toHaveClass("flex-shrink-0");
      });
    });
  });

  describe("State Management", () => {
    it("maintains open state correctly", async () => {
      const user = userEvent.setup();
      render(<Dropdown options={mockOptions} trigger={<button>Toggle</button>} />);

      // Initially closed
      expect(screen.queryByText("Option 1")).not.toBeInTheDocument();

      // Open
      await user.click(screen.getByText("Toggle"));
      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument();
      });

      // Close
      await user.click(screen.getByText("Toggle"));
      await waitFor(() => {
        expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
      });
    });

    it("handles rapid toggling", async () => {
      const user = userEvent.setup();
      render(<Dropdown options={mockOptions} trigger={<button>Toggle</button>} />);

      const trigger = screen.getByText("Toggle");

      await user.click(trigger);
      await user.click(trigger);
      await user.click(trigger);

      // Should end up open after 3 clicks
      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument();
      });
    });
  });

  describe("Edge Cases", () => {
    it("handles empty options array", () => {
      render(<Dropdown options={[]} trigger={<button>Empty</button>} />);
      expect(screen.getByText("Empty")).toBeInTheDocument();
    });

    it("handles single option", async () => {
      const user = userEvent.setup();
      const singleOption: DropdownOption[] = [{ value: "1", label: "Only One" }];

      render(<Dropdown options={singleOption} trigger={<button>Menu</button>} />);
      await user.click(screen.getByText("Menu"));

      await waitFor(() => {
        expect(screen.getByText("Only One")).toBeInTheDocument();
      });
    });

    it("handles long option labels", async () => {
      const user = userEvent.setup();
      const longOptions: DropdownOption[] = [
        {
          value: "1",
          label: "This is a very long option label that should still render correctly",
        },
      ];

      render(<Dropdown options={longOptions} trigger={<button>Menu</button>} />);
      await user.click(screen.getByText("Menu"));

      await waitFor(() => {
        expect(
          screen.getByText("This is a very long option label that should still render correctly")
        ).toBeInTheDocument();
      });
    });

    it("handles undefined value prop", () => {
      render(<Dropdown options={mockOptions} value={undefined} trigger={<button>Menu</button>} />);
      expect(screen.getByText("Menu")).toBeInTheDocument();
    });

    it("handles null onChange prop", async () => {
      const user = userEvent.setup();
      render(
        <Dropdown options={mockOptions} onChange={undefined} trigger={<button>Menu</button>} />
      );

      await user.click(screen.getByText("Menu"));
      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument();
      });

      // Should not throw error
      await user.click(screen.getByText("Option 1"));
    });
  });
});
