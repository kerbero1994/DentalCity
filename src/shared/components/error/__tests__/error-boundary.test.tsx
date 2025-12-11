import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorBoundary, withErrorBoundary } from "../error-boundary";

// Mock logger
vi.mock("@/shared/utils/logger", () => ({
  logger: {
    error: vi.fn(),
    log: vi.fn(),
    warn: vi.fn(),
  },
}));

// Component that throws an error
function ThrowError({ shouldThrow = true }: { shouldThrow?: boolean }) {
  if (shouldThrow) {
    throw new Error("Test error");
  }
  return <div>No error</div>;
}

// Component that works fine
function WorkingComponent() {
  return <div>Working component</div>;
}

describe("ErrorBoundary", () => {
  // Suppress console.error for expected errors in tests
  const originalError = console.error;

  beforeEach(() => {
    console.error = vi.fn();
    vi.clearAllMocks();
  });

  afterEach(() => {
    console.error = originalError;
  });

  describe("rendering", () => {
    it("renders children when there is no error", () => {
      render(
        <ErrorBoundary>
          <WorkingComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText("Working component")).toBeInTheDocument();
    });

    it("renders default fallback UI when child throws error", () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText("Algo salió mal")).toBeInTheDocument();
      expect(
        screen.getByText("Ha ocurrido un error inesperado. Por favor, intenta recargar la página.")
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /recargar/i })).toBeInTheDocument();
    });

    it("renders custom fallback when provided", () => {
      const customFallback = <div>Custom error message</div>;

      render(
        <ErrorBoundary fallback={customFallback}>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText("Custom error message")).toBeInTheDocument();
      expect(screen.queryByText("Algo salió mal")).not.toBeInTheDocument();
    });
  });

  describe("error handling", () => {
    it("calls onError callback when error occurs", () => {
      const onError = vi.fn();

      render(
        <ErrorBoundary onError={onError}>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String),
        })
      );
    });

    it("logs error to logger", async () => {
      const { logger } = await import("@/shared/utils/logger");

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(logger.error).toHaveBeenCalledWith(
        "ErrorBoundary caught an error:",
        expect.objectContaining({
          message: "Test error",
        })
      );
    });

    it("captures error message correctly", () => {
      const onError = vi.fn();

      render(
        <ErrorBoundary onError={onError}>
          <ThrowError />
        </ErrorBoundary>
      );

      const [error] = onError.mock.calls[0];
      expect(error.message).toBe("Test error");
    });
  });

  describe("reload button", () => {
    it("calls window.location.reload when reload button is clicked", () => {
      const reloadMock = vi.fn();
      const originalLocation = window.location;

      // @ts-expect-error - mocking location
      delete window.location;
      window.location = { ...originalLocation, reload: reloadMock };

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const reloadButton = screen.getByRole("button", { name: /recargar/i });
      fireEvent.click(reloadButton);

      expect(reloadMock).toHaveBeenCalledTimes(1);

      window.location = originalLocation;
    });
  });

  describe("state management", () => {
    it("updates hasError state when error occurs", () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      // Error UI should be shown
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("captures error in state", () => {
      const onError = vi.fn();

      render(
        <ErrorBoundary onError={onError}>
          <ThrowError />
        </ErrorBoundary>
      );

      // The error should be passed to onError
      expect(onError.mock.calls[0][0]).toBeInstanceOf(Error);
    });
  });
});

describe("withErrorBoundary HOC", () => {
  const originalError = console.error;

  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });

  it("wraps component with error boundary", () => {
    const WrappedComponent = withErrorBoundary(WorkingComponent);

    render(<WrappedComponent />);

    expect(screen.getByText("Working component")).toBeInTheDocument();
  });

  it("shows fallback when wrapped component throws", () => {
    const WrappedComponent = withErrorBoundary(ThrowError);

    render(<WrappedComponent />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("uses custom fallback when provided", () => {
    const customFallback = <div>HOC custom fallback</div>;
    const WrappedComponent = withErrorBoundary(ThrowError, customFallback);

    render(<WrappedComponent />);

    expect(screen.getByText("HOC custom fallback")).toBeInTheDocument();
  });

  it("passes props to wrapped component", () => {
    function PropsComponent({ message }: { message: string }) {
      return <div>{message}</div>;
    }

    const WrappedComponent = withErrorBoundary(PropsComponent);

    render(<WrappedComponent message="Hello from props" />);

    expect(screen.getByText("Hello from props")).toBeInTheDocument();
  });
});
