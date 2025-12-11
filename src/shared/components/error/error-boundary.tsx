"use client";

import { Component, type ReactNode } from "react";
import { logger } from "@/shared/utils/logger";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch JavaScript errors in child components
 * Prevents entire app from crashing when a component fails
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error without exposing sensitive stack traces in production
    logger.error("ErrorBoundary caught an error:", {
      message: error.message,
      componentStack: errorInfo.componentStack,
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Return custom fallback or default error UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-950"
        >
          <svg
            className="h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-red-800 dark:text-red-200">
              Algo salió mal
            </h2>
            <p className="mt-1 text-sm text-red-600 dark:text-red-300">
              Ha ocurrido un error inesperado. Por favor, intenta recargar la página.
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Recargar página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * HOC to wrap components with error boundary
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}
