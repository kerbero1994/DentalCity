import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex w-full rounded-lg border bg-white px-3 py-2 text-sm transition-all placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
  {
    variants: {
      variant: {
        default:
          "border-gray-200 text-gray-900 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-0 dark:border-white/20 dark:bg-black/40 dark:text-white dark:placeholder:text-gray-400",
        error:
          "border-red-500 text-gray-900 focus:ring-red-500 dark:border-red-500 dark:text-white",
        success:
          "border-green-500 text-gray-900 focus:ring-green-500 dark:border-green-500 dark:text-white",
      },
      size: {
        sm: "px-2 py-1.5 text-xs",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  showCharCount?: boolean;
  maxLength?: number;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      variant,
      size,
      label,
      error,
      helperText,
      showCharCount = false,
      maxLength,
      id,
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const [charCount, setCharCount] = React.useState(
      (value || defaultValue || "").toString().length
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    React.useEffect(() => {
      if (value !== undefined) {
        setCharCount(value.toString().length);
      }
    }, [value]);

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
        <textarea
          id={inputId}
          ref={ref}
          data-slot="textarea"
          className={cn(textareaVariants({ variant: error ? "error" : variant, size, className }))}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          onChange={handleChange}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          {...props}
        />
        <div className="mt-2 flex justify-between">
          <div>
            {error && (
              <p id={errorId} className="text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
            {helperText && !error && (
              <p id={helperId} className="text-sm text-gray-500 dark:text-gray-400">
                {helperText}
              </p>
            )}
          </div>
          {showCharCount && maxLength && (
            <span
              className={cn(
                "text-xs",
                charCount > maxLength ? "text-red-600" : "text-gray-500 dark:text-gray-400"
              )}
            >
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);
TextArea.displayName = "TextArea";

export { TextArea, textareaVariants };
