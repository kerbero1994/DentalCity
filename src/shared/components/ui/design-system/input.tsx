import { cn } from "@/shared/utils/cn";
import { InputHTMLAttributes, forwardRef, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: "default" | "filled";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, error, helperText, leftIcon, rightIcon, variant = "default", id, ...props },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const variants = {
      default: "border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900",
      filled: "border-0 bg-gray-100 dark:bg-gray-800",
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">{leftIcon}</div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-lg px-4 py-2.5 text-base",
              "text-gray-900 dark:text-white",
              "placeholder:text-gray-400 dark:placeholder:text-gray-500",
              "focus:ring-primary/50 focus:border-primary focus:ring-2 focus:outline-none",
              "transition-colors duration-200",
              "disabled:cursor-not-allowed disabled:opacity-50",
              variants[variant],
              error ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" : "",
              leftIcon ? "pl-10" : "",
              rightIcon ? "pr-10" : "",
              className
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error ? inputId + "-error" : helperText ? inputId + "-helper" : undefined
            }
            {...props}
          />
          {rightIcon && (
            <div className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={inputId + "-error"} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={inputId + "-helper"} className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
