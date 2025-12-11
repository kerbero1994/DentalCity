import Link from "next/link";
import type { CTABannerSection } from "@/core/types/lib/page-builder";
import { cn } from "@/lib/utils";
import { getContentContainerClass } from "../utils/section-styles";

interface CTABannerSectionProps {
  section: CTABannerSection;
}

export function CTABannerSectionComponent({ section }: CTABannerSectionProps) {
  const { content, ctaBanner } = section;
  const variant = ctaBanner.variant || "default";

  return (
    <div className={cn(getContentContainerClass(), getBannerVariantClass(variant))}>
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        {/* Content */}
        <div className="flex-1 space-y-3 text-center md:text-left">
          {content?.eyebrow && (
            <p className="text-sm font-semibold tracking-wide uppercase opacity-90">
              {content.eyebrow}
            </p>
          )}
          {content?.title && <h2 className="text-3xl font-bold md:text-4xl">{content.title}</h2>}
          {content?.description && <p className="text-lg opacity-80">{content.description}</p>}
        </div>

        {/* CTAs */}
        {ctaBanner.ctas && ctaBanner.ctas.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 md:justify-end">
            {ctaBanner.ctas.map((cta, index) => (
              <Link
                key={index}
                href={cta.href}
                target={cta.target}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all",
                  getCTAVariantClass(cta.variant || "primary")
                )}
              >
                {cta.label}
                {cta.icon && <span className="text-xl">{cta.icon}</span>}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function getBannerVariantClass(variant: "default" | "gradient" | "bordered"): string {
  const variants = {
    default: "rounded-2xl bg-primary p-8 text-primary-foreground md:p-12",
    gradient:
      "rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-8 text-primary-foreground md:p-12",
    bordered: "rounded-2xl border-2 border-primary p-8 md:p-12",
  };

  return variants[variant];
}

function getCTAVariantClass(variant: "primary" | "secondary" | "outline" | "ghost"): string {
  const variants = {
    primary: "bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl",
    secondary: "bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30",
    outline: "border-2 border-current hover:bg-current/10",
    ghost: "hover:bg-current/10",
  };

  return variants[variant] || variants.primary;
}
