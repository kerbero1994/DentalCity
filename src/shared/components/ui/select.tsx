import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const selectVariants = cva(
  "flex w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-sm transition-all disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
  {
    variants: {
      variant: {
        default:
          "border-gray-200 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-0 dark:border-white/20 dark:bg-black/40 dark:text-white dark:placeholder:text-gray-400",
        error:
          "border-red-500 text-gray-900 focus:ring-red-500 dark:border-red-500 dark:text-white",
        success:
          "border-green-500 text-gray-900 focus:ring-green-500 dark:border-green-500 dark:text-white",
      },
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, size, label, error, helperText, options, icon, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              {icon}
            </div>
          )}
          <select
            id={inputId}
            ref={ref}
            className={cn(
              selectVariants({ variant: error ? "error" : variant, size, className }),
              icon && "pl-10",
              "cursor-pointer appearance-none pr-10"
            )}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        </div>
        {error && (
          <p id={errorId} className="mt-2 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select, selectVariants };
