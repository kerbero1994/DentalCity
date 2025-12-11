import { cn } from "@/shared/utils/cn";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  centered?: boolean;
}

export default function Container({
  children,
  className,
  size = "lg",
  centered = true,
}: ContainerProps) {
  const sizes = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-7xl",
    xl: "max-w-[90rem]",
    full: "max-w-full",
  };

  return (
    <div className={cn("container-responsive", sizes[size], centered && "mx-auto", className)}>
      {children}
    </div>
  );
}
