import type { StatsSection } from "@/core/types/lib/page-builder";
import { cn } from "@/lib/utils";
import {
  getContentContainerClass,
  getGridColumnsClass,
  getGapClass,
} from "../utils/section-styles";

interface StatsSectionProps {
  section: StatsSection;
}

export function StatsSectionComponent({ section }: StatsSectionProps) {
  const { content, stats } = section;
  const variant = stats.variant || "default";

  return (
    <div className={getContentContainerClass()}>
      {/* Header */}
      {(content?.eyebrow || content?.title || content?.description) && (
        <div className="mb-12 space-y-4 text-center">
          {content.eyebrow && (
            <p className="text-primary text-sm font-semibold tracking-wide uppercase">
              {content.eyebrow}
            </p>
          )}
          {content.title && <h2 className="text-3xl font-bold md:text-4xl">{content.title}</h2>}
          {content.description && (
            <p className="mx-auto max-w-3xl text-lg opacity-80">{content.description}</p>
          )}
        </div>
      )}

      {/* Stats Grid */}
      <div className={cn("grid", getGridColumnsClass(stats.columns), getGapClass("large"))}>
        {stats.items.map((stat, index) => (
          <div key={stat.id || index} className={cn("text-center", getStatVariantClass(variant))}>
            {stat.icon && <div className="mb-3 text-4xl">{stat.icon}</div>}

            <div className="space-y-2">
              <div className="text-4xl font-bold md:text-5xl">
                {stat.prefix}
                {stat.value}
                {stat.suffix}
              </div>

              <div className="text-lg font-semibold">{stat.label}</div>

              {stat.description && <p className="text-sm opacity-70">{stat.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getStatVariantClass(
  variant: "default" | "card" | "minimal" | "bordered" | "cards"
): string {
  const variants = {
    default: "p-6",
    card: "rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800",
    cards: "rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800",
    bordered: "rounded-xl border-2 p-8",
    minimal: "p-4",
  };

  return variants[variant];
}
