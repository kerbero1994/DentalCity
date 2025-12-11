import Image from "next/image";
import type { FeaturesSection } from "@/core/types/lib/page-builder";
import { cn } from "@/lib/utils";
import {
  getContentContainerClass,
  getGridColumnsClass,
  getGapClass,
} from "../utils/section-styles";

interface FeaturesSectionProps {
  section: FeaturesSection;
}

export function FeaturesSectionComponent({ section }: FeaturesSectionProps) {
  const { content, features } = section;
  const layout = features.layout || "grid";

  if (layout === "alternating") {
    return <FeaturesAlternating content={content} features={features} />;
  }

  return <FeaturesGrid content={content} features={features} />;
}

function FeaturesGrid({
  content,
  features,
}: {
  content: FeaturesSection["content"];
  features: FeaturesSection["features"];
}) {
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

      {/* Features Grid */}
      <div className={cn("grid", getGridColumnsClass(features.columns), getGapClass("large"))}>
        {features.items.map((feature, index) => (
          <div key={feature.id || index} className="space-y-4">
            {feature.icon && <div className="text-primary text-4xl">{feature.icon}</div>}

            {feature.image && (
              <div className="relative h-48 w-full overflow-hidden rounded-lg">
                <Image
                  src={feature.image.src}
                  alt={feature.image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <h3 className="text-xl font-bold">{feature.title}</h3>

            {feature.description && <p className="opacity-80">{feature.description}</p>}

            {feature.items && feature.items.length > 0 && (
              <ul className="space-y-2">
                {feature.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturesAlternating({
  content,
  features,
}: {
  content: FeaturesSection["content"];
  features: FeaturesSection["features"];
}) {
  return (
    <div className={getContentContainerClass()}>
      {/* Header */}
      {(content?.eyebrow || content?.title || content?.description) && (
        <div className="mb-16 space-y-4 text-center">
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

      {/* Alternating Features */}
      <div className="space-y-20">
        {features.items.map((feature, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={feature.id || index}
              className={cn(
                "grid items-center gap-8 lg:grid-cols-2 lg:gap-12",
                !isEven && "lg:grid-flow-dense"
              )}
            >
              {/* Content */}
              <div className={cn("space-y-4", !isEven && "lg:col-start-2")}>
                {feature.icon && <div className="text-primary text-4xl">{feature.icon}</div>}

                <h3 className="text-2xl font-bold md:text-3xl">{feature.title}</h3>

                {feature.description && <p className="text-lg opacity-80">{feature.description}</p>}

                {feature.items && feature.items.length > 0 && (
                  <ul className="space-y-3">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-primary mt-1 text-lg">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Image */}
              {feature.image && (
                <div
                  className={cn(
                    "relative h-80 overflow-hidden rounded-2xl",
                    !isEven && "lg:col-start-1"
                  )}
                >
                  <Image
                    src={feature.image.src}
                    alt={feature.image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
