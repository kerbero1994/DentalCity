"use client";

import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from "lucide-react";
import { useTranslations } from "next-intl";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
        success:
          "border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950 dark:text-green-100 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
        warning:
          "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-100 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400",
        destructive:
          "border-destructive/50 bg-destructive/10 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type AlertProps = {
  children: ReactNode;
  icon?: ReactNode | boolean;
  className?: string;
  onClose?: () => void;
} & VariantProps<typeof alertVariants>;

export function Alert({ children, icon, className, variant, onClose }: AlertProps) {
  const t = useTranslations("ui.alert");

  const getDefaultIcon = () => {
    if (icon === false) return null;
    if (icon && icon !== true) return icon;

    const iconMap = {
      default: <Info className="size-4" />,
      info: <Info className="size-4" />,
      success: <CheckCircle2 className="size-4" />,
      warning: <AlertTriangle className="size-4" />,
      destructive: <AlertCircle className="size-4" />,
    };

    return iconMap[variant || "default"];
  };

  const iconElement = getDefaultIcon();

  return (
    <div role="alert" className={cn(alertVariants({ variant }), className)}>
      {iconElement}
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="focus:ring-ring absolute top-2 right-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none"
          aria-label={t("closeAlert")}
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

export function AlertTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h5 className={cn("mb-1 leading-none font-medium tracking-tight", className)}>{children}</h5>
  );
}

export function AlertDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("text-sm [&_p]:leading-relaxed", className)}>{children}</div>;
}

// Composed Alert variants
type ComposedAlertProps = Omit<AlertProps, "variant" | "icon"> & {
  title?: ReactNode;
  description?: ReactNode;
};

export function InfoAlert({ title, description, children, ...props }: ComposedAlertProps) {
  return (
    <Alert variant="info" {...props}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
      {children}
    </Alert>
  );
}

export function SuccessAlert({ title, description, children, ...props }: ComposedAlertProps) {
  return (
    <Alert variant="success" {...props}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
      {children}
    </Alert>
  );
}

export function WarningAlert({ title, description, children, ...props }: ComposedAlertProps) {
  return (
    <Alert variant="warning" {...props}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
      {children}
    </Alert>
  );
}

export function ErrorAlert({ title, description, children, ...props }: ComposedAlertProps) {
  return (
    <Alert variant="destructive" {...props}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
      {children}
    </Alert>
  );
}
