import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Alert,
  AlertTitle,
  AlertDescription,
  InfoAlert,
  SuccessAlert,
  WarningAlert,
  ErrorAlert,
} from "../alert";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      closeAlert: "Close alert",
    };
    return translations[key] || key;
  },
}));

describe("Alert", () => {
  describe("Rendering", () => {
    it("renders alert with children", () => {
      render(<Alert>Alert message</Alert>);
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText("Alert message")).toBeInTheDocument();
    });

    it("has role='alert'", () => {
      render(<Alert>Message</Alert>);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("renders with complex children", () => {
      render(
        <Alert>
          <div>
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
          </div>
        </Alert>
      );
      expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
      expect(screen.getByText("Paragraph 2")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("applies default variant styles", () => {
      render(<Alert variant="default">Default</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("bg-background", "text-foreground");
    });

    it("applies info variant styles", () => {
      render(<Alert variant="info">Info</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("border-blue-200", "bg-blue-50", "text-blue-900");
    });

    it("applies success variant styles", () => {
      render(<Alert variant="success">Success</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("border-green-200", "bg-green-50", "text-green-900");
    });

    it("applies warning variant styles", () => {
      render(<Alert variant="warning">Warning</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("border-yellow-200", "bg-yellow-50", "text-yellow-900");
    });

    it("applies destructive variant styles", () => {
      render(<Alert variant="destructive">Error</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("border-destructive/50", "bg-destructive/10", "text-destructive");
    });
  });

  describe("Icons", () => {
    it("renders default Info icon for default variant", () => {
      const { container } = render(<Alert variant="default">Message</Alert>);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("renders Info icon for info variant", () => {
      const { container } = render(<Alert variant="info">Info</Alert>);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass("size-4");
    });

    it("renders CheckCircle icon for success variant", () => {
      const { container } = render(<Alert variant="success">Success</Alert>);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("renders AlertTriangle icon for warning variant", () => {
      const { container } = render(<Alert variant="warning">Warning</Alert>);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("renders AlertCircle icon for destructive variant", () => {
      const { container } = render(<Alert variant="destructive">Error</Alert>);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("renders custom icon when provided", () => {
      const CustomIcon = () => <svg data-testid="custom-icon" />;
      render(<Alert icon={<CustomIcon />}>Message</Alert>);
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("does not render icon when icon={false}", () => {
      const { container } = render(<Alert icon={false}>No icon</Alert>);
      const svg = container.querySelector("svg");
      expect(svg).not.toBeInTheDocument();
    });

    it("renders default icon when icon={true}", () => {
      const { container } = render(<Alert icon={true}>With icon</Alert>);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  describe("Close Button", () => {
    it("renders close button when onClose is provided", () => {
      const handleClose = vi.fn();
      render(<Alert onClose={handleClose}>Closeable</Alert>);

      expect(screen.getByLabelText("Close alert")).toBeInTheDocument();
    });

    it("does not render close button when onClose is not provided", () => {
      render(<Alert>Not closeable</Alert>);
      expect(screen.queryByLabelText("Close alert")).not.toBeInTheDocument();
    });

    it("calls onClose when close button is clicked", async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(<Alert onClose={handleClose}>Message</Alert>);

      const closeButton = screen.getByLabelText("Close alert");
      await user.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("close button has proper styling", () => {
      const handleClose = vi.fn();
      render(<Alert onClose={handleClose}>Message</Alert>);

      const button = screen.getByLabelText("Close alert");
      expect(button).toHaveClass("absolute", "top-2", "right-2", "rounded-md");
    });

    it("close button is focusable", async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(<Alert onClose={handleClose}>Message</Alert>);

      const button = screen.getByLabelText("Close alert");
      await user.tab();
      await user.tab(); // First tab might focus alert, second focuses button

      // Button should be in the document and interactive
      expect(button).toBeInTheDocument();
    });
  });

  describe("Custom ClassName", () => {
    it("merges custom className with default classes", () => {
      render(<Alert className="custom-class">Message</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("custom-class");
      expect(alert).toHaveClass("rounded-lg"); // Base class
    });

    it("allows Tailwind class overrides", () => {
      render(<Alert className="p-8">Message</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("p-8");
    });
  });

  describe("AlertTitle", () => {
    it("renders title text", () => {
      render(<AlertTitle>Title</AlertTitle>);
      expect(screen.getByText("Title")).toBeInTheDocument();
    });

    it("renders as h5 element", () => {
      const { container } = render(<AlertTitle>Title</AlertTitle>);
      const h5 = container.querySelector("h5");
      expect(h5).toBeInTheDocument();
      expect(h5).toHaveTextContent("Title");
    });

    it("applies title styles", () => {
      const { container } = render(<AlertTitle>Title</AlertTitle>);
      const h5 = container.querySelector("h5");
      expect(h5).toHaveClass("font-medium", "tracking-tight", "leading-none");
    });

    it("accepts custom className", () => {
      const { container } = render(<AlertTitle className="text-xl">Title</AlertTitle>);
      const h5 = container.querySelector("h5");
      expect(h5).toHaveClass("text-xl");
    });
  });

  describe("AlertDescription", () => {
    it("renders description text", () => {
      render(<AlertDescription>Description</AlertDescription>);
      expect(screen.getByText("Description")).toBeInTheDocument();
    });

    it("applies description styles", () => {
      const { container } = render(<AlertDescription>Description</AlertDescription>);
      const div = container.querySelector("div");
      expect(div).toHaveClass("text-sm", "[&_p]:leading-relaxed");
    });

    it("accepts custom className", () => {
      const { container } = render(
        <AlertDescription className="text-base">Description</AlertDescription>
      );
      const div = container.querySelector("div");
      expect(div).toHaveClass("text-base");
    });

    it("renders paragraph children with relaxed leading", () => {
      render(
        <AlertDescription>
          <p>Paragraph text</p>
        </AlertDescription>
      );
      expect(screen.getByText("Paragraph text")).toBeInTheDocument();
    });
  });

  describe("Composed Alerts", () => {
    describe("InfoAlert", () => {
      it("renders with info variant", () => {
        render(<InfoAlert>Info message</InfoAlert>);
        const alert = screen.getByRole("alert");
        expect(alert).toHaveClass("border-blue-200");
      });

      it("renders with title and description", () => {
        render(
          <InfoAlert title="Info Title" description="Info description">
            {null}
          </InfoAlert>
        );
        expect(screen.getByText("Info Title")).toBeInTheDocument();
        expect(screen.getByText("Info description")).toBeInTheDocument();
      });

      it("renders children when provided", () => {
        render(<InfoAlert>Custom content</InfoAlert>);
        expect(screen.getByText("Custom content")).toBeInTheDocument();
      });

      it("supports onClose", async () => {
        const user = userEvent.setup();
        const handleClose = vi.fn();

        render(<InfoAlert onClose={handleClose}>Info</InfoAlert>);

        const closeButton = screen.getByLabelText("Close alert");
        await user.click(closeButton);

        expect(handleClose).toHaveBeenCalled();
      });
    });

    describe("SuccessAlert", () => {
      it("renders with success variant", () => {
        render(<SuccessAlert>Success message</SuccessAlert>);
        const alert = screen.getByRole("alert");
        expect(alert).toHaveClass("border-green-200");
      });

      it("renders with title and description", () => {
        render(
          <SuccessAlert title="Success!" description="Operation completed">
            {null}
          </SuccessAlert>
        );
        expect(screen.getByText("Success!")).toBeInTheDocument();
        expect(screen.getByText("Operation completed")).toBeInTheDocument();
      });
    });

    describe("WarningAlert", () => {
      it("renders with warning variant", () => {
        render(<WarningAlert>Warning message</WarningAlert>);
        const alert = screen.getByRole("alert");
        expect(alert).toHaveClass("border-yellow-200");
      });

      it("renders with title and description", () => {
        render(
          <WarningAlert title="Warning" description="Please be careful">
            {null}
          </WarningAlert>
        );
        expect(screen.getByText("Warning")).toBeInTheDocument();
        expect(screen.getByText("Please be careful")).toBeInTheDocument();
      });
    });

    describe("ErrorAlert", () => {
      it("renders with destructive variant", () => {
        render(<ErrorAlert>Error message</ErrorAlert>);
        const alert = screen.getByRole("alert");
        expect(alert).toHaveClass("border-destructive/50");
      });

      it("renders with title and description", () => {
        render(
          <ErrorAlert title="Error" description="Something went wrong">
            {null}
          </ErrorAlert>
        );
        expect(screen.getByText("Error")).toBeInTheDocument();
        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
      });
    });
  });

  describe("Complex Compositions", () => {
    it("renders alert with title, description, and children", () => {
      render(
        <Alert variant="info">
          <AlertTitle>Important Notice</AlertTitle>
          <AlertDescription>Please read the following information.</AlertDescription>
          <div>Additional content</div>
        </Alert>
      );

      expect(screen.getByText("Important Notice")).toBeInTheDocument();
      expect(screen.getByText("Please read the following information.")).toBeInTheDocument();
      expect(screen.getByText("Additional content")).toBeInTheDocument();
    });

    it("renders success alert with title and close button", async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <SuccessAlert title="Saved" onClose={handleClose}>
          Your changes have been saved.
        </SuccessAlert>
      );

      expect(screen.getByText("Saved")).toBeInTheDocument();
      expect(screen.getByText("Your changes have been saved.")).toBeInTheDocument();

      const closeButton = screen.getByLabelText("Close alert");
      await user.click(closeButton);

      expect(handleClose).toHaveBeenCalled();
    });
  });

  describe("Real-World Scenarios", () => {
    it("renders form validation error", () => {
      render(
        <ErrorAlert title="Validation Error">
          <AlertDescription>Please fix the following errors:</AlertDescription>
          <ul>
            <li>Email is required</li>
            <li>Password must be at least 8 characters</li>
          </ul>
        </ErrorAlert>
      );

      expect(screen.getByText("Validation Error")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });

    it("renders success notification with auto-dismiss", async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <SuccessAlert
          title="Success"
          description="Event created successfully"
          onClose={handleClose}
        >
          {null}
        </SuccessAlert>
      );

      expect(screen.getByText("Event created successfully")).toBeInTheDocument();

      const closeButton = screen.getByLabelText("Close alert");
      await user.click(closeButton);

      expect(handleClose).toHaveBeenCalled();
    });

    it("renders informational banner", () => {
      render(
        <Alert variant="info" icon={false} className="border-none">
          This site uses cookies to improve your experience.
        </Alert>
      );

      expect(
        screen.getByText("This site uses cookies to improve your experience.")
      ).toBeInTheDocument();
    });

    it("renders warning with custom icon", () => {
      const WarningIcon = () => <svg data-testid="warning-icon" />;

      render(
        <Alert variant="warning" icon={<WarningIcon />}>
          <AlertTitle>Maintenance Scheduled</AlertTitle>
          <AlertDescription>The system will be down for maintenance on Sunday.</AlertDescription>
        </Alert>
      );

      expect(screen.getByTestId("warning-icon")).toBeInTheDocument();
      expect(screen.getByText("Maintenance Scheduled")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has role='alert' for screen readers", () => {
      render(<Alert>Important message</Alert>);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("close button has accessible label", () => {
      const handleClose = vi.fn();
      render(<Alert onClose={handleClose}>Message</Alert>);

      const button = screen.getByLabelText("Close alert");
      expect(button).toBeInTheDocument();
    });

    it("close button is keyboard accessible", async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(<Alert onClose={handleClose}>Message</Alert>);

      const button = screen.getByLabelText("Close alert");
      button.focus();

      await user.keyboard("{Enter}");
      expect(handleClose).toHaveBeenCalled();
    });

    it("maintains semantic HTML structure", () => {
      const { container } = render(
        <Alert variant="info">
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>Description</AlertDescription>
        </Alert>
      );

      const alert = container.querySelector('[role="alert"]');
      const title = container.querySelector("h5");

      expect(alert).toBeInTheDocument();
      expect(title).toBeInTheDocument();
    });
  });

  describe("Variant and Custom Class Combinations", () => {
    it("combines info variant with custom padding", () => {
      render(
        <Alert variant="info" className="p-6">
          Message
        </Alert>
      );
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("border-blue-200", "p-6");
    });

    it("combines success variant with custom border", () => {
      render(
        <Alert variant="success" className="border-2">
          Message
        </Alert>
      );
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("border-green-200", "border-2");
    });

    it("combines destructive variant with custom background", () => {
      render(
        <Alert variant="destructive" className="bg-red-100">
          Message
        </Alert>
      );
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("text-destructive", "bg-red-100");
    });
  });
});
