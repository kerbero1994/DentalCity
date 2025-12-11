import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";

const dropdownVariants = cva("relative inline-block text-left", {
  variants: {
    variant: {
      default: "",
      outline: "",
      ghost: "",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const dropdownTriggerVariants = cva(
  "inline-flex w-full justify-between items-center rounded-lg px-3 py-2 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-white/20 dark:bg-black/40 dark:text-gray-100 dark:hover:bg-black/60",
        outline:
          "border border-gray-200 bg-transparent text-gray-700 hover:bg-gray-50 dark:border-white/20 dark:text-gray-100 dark:hover:bg-black/20",
        ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-100",
      },
      size: {
        sm: "text-xs h-8 px-2",
        md: "text-sm h-10 px-3",
        lg: "text-base h-12 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const dropdownMenuVariants = cva(
  "absolute z-50 mt-2 rounded-lg border bg-white shadow-lg dark:bg-gray-900",
  {
    variants: {
      align: {
        left: "left-0",
        right: "right-0",
        center: "left-1/2 -translate-x-1/2",
      },
      width: {
        auto: "w-auto",
        full: "w-full",
        min: "min-w-[180px]",
      },
    },
    defaultVariants: {
      align: "left",
      width: "min",
    },
  }
);

export interface DropdownOption {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  description?: string;
  disabled?: boolean;
}

export interface DropdownProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof dropdownVariants> {
  trigger?: React.ReactNode;
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  align?: "left" | "right" | "center";
  width?: "auto" | "full" | "min";
  showCheckmark?: boolean;
  closeOnSelect?: boolean;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      className,
      variant,
      size,
      trigger,
      options,
      value,
      placeholder = "Select an option",
      onChange,
      align = "left",
      width = "min",
      showCheckmark = true,
      closeOnSelect = true,
      ...props
    },
    _ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [isOpen]);

    const handleSelect = (option: DropdownOption) => {
      if (option.disabled) return;
      onChange?.(option.value);
      if (closeOnSelect) {
        setIsOpen(false);
      }
    };

    return (
      <div
        ref={dropdownRef}
        className={cn(dropdownVariants({ variant, size, className }))}
        {...props}
      >
        {trigger ? (
          <div
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsOpen(!isOpen);
              }
            }}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            {trigger}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(dropdownTriggerVariants({ variant, size }))}
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <span className="flex items-center gap-2">
              {selectedOption?.icon}
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
              aria-hidden="true"
            />
          </button>
        )}

        {isOpen && (
          <div
            className={cn(
              dropdownMenuVariants({ align, width }),
              "border-gray-200 dark:border-gray-700"
            )}
            role="menu"
          >
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors",
                    "hover:bg-gray-50 dark:hover:bg-gray-800",
                    option.disabled && "cursor-not-allowed opacity-50",
                    value === option.value
                      ? "bg-gray-50 text-[var(--color-primary)] dark:bg-gray-800"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                  disabled={option.disabled}
                  role="menuitem"
                >
                  {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                  <span className="flex-1 text-left">
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {option.description}
                      </div>
                    )}
                  </span>
                  {showCheckmark && value === option.value && (
                    <Check className="h-4 w-4 flex-shrink-0 text-[var(--color-primary)]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);
Dropdown.displayName = "Dropdown";

export { Dropdown, dropdownVariants };
