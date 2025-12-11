import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CardListSection } from "@/core/types/lib/page-builder";
import { cn } from "@/lib/utils";
import {
  getContentContainerClass,
  getGridColumnsClass,
  getGapClass,
} from "../utils/section-styles";

interface CardListSectionProps {
  section: CardListSection;
}

export function CardListSectionComponent({ section }: CardListSectionProps) {
  const { content, cardList } = section;
  const variant = cardList.variant || "default";

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

      {/* Cards Grid */}
      <div className={cn("grid", getGridColumnsClass(cardList.columns), getGapClass())}>
        {cardList.cards.map((card, index) => (
          <article key={card.id || index} className={cn("group", getCardVariantClass(variant))}>
            {/* Image */}
            {card.image && (
              <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}

            {/* Content */}
            <div className="space-y-4 p-6">
              {/* Icon & Badge */}
              <div className="flex items-center justify-between">
                {card.icon && <span className="text-3xl">{card.icon}</span>}
                {card.badge && (
                  <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold">
                    {card.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold">{card.title}</h3>

              {/* Description */}
              {card.description && <p className="opacity-80">{card.description}</p>}

              {/* Link */}
              {card.link && (
                <Link
                  href={card.link.href}
                  className="text-primary inline-flex items-center gap-2 font-semibold transition-all hover:gap-3"
                >
                  {card.link.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function getCardVariantClass(variant: "default" | "elevated" | "outlined" | "minimal"): string {
  const variants = {
    default: "bg-white dark:bg-gray-800 rounded-xl overflow-hidden",
    elevated:
      "bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow",
    outlined:
      "border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-primary transition-colors",
    minimal:
      "rounded-xl overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
  };

  return variants[variant];
}
