"use client";

import type { PageSection } from "@/core/types/lib/page-builder";
import { HeroSectionComponent } from "./sections/HeroSection";
import { TextContentSectionComponent } from "./sections/TextContentSection";
import { CardListSectionComponent } from "./sections/CardListSection";
import { CTABannerSectionComponent } from "./sections/CTABannerSection";
import { VideoSectionComponent } from "./sections/VideoSection";
import { StatsSectionComponent } from "./sections/StatsSection";
import { FeaturesSectionComponent } from "./sections/FeaturesSection";
import { getSectionWrapperStyles } from "./utils/section-styles";
import { useTranslations } from "next-intl";

interface SectionRendererProps {
  section: PageSection;
}

export function SectionRenderer({ section }: SectionRendererProps) {
  const t = useTranslations("ui.sectionRenderer");
  const wrapperStyles = getSectionWrapperStyles(section);

  const renderSectionContent = () => {
    switch (section.type) {
      case "hero":
        return <HeroSectionComponent section={section} />;

      case "text-content":
        return <TextContentSectionComponent section={section} />;

      case "card-list":
        return <CardListSectionComponent section={section} />;

      case "cta-banner":
        return <CTABannerSectionComponent section={section} />;

      case "video":
        return <VideoSectionComponent section={section} />;

      case "stats":
        return <StatsSectionComponent section={section} />;

      case "features":
        return <FeaturesSectionComponent section={section} />;

      // Add more section types here as you build them
      case "image-grid":
      case "accordion":
      case "form":
      case "testimonials":
      case "timeline":
      case "team":
      case "contact":
      case "map":
      case "carousel":
      case "tabs":
      case "pricing":
      case "custom":
        return (
          <div className="py-12 text-center text-gray-500">
            <p>{t("notImplemented", { type: section.type })}</p>
            <p className="mt-2 text-sm">{t("comingSoon")}</p>
          </div>
        );

      default:
        return (
          <div className="py-12 text-center text-red-500">
            <p>{t("unknownType")}</p>
          </div>
        );
    }
  };

  return (
    <section
      id={section.seo?.anchor}
      aria-label={section.seo?.ariaLabel}
      className={wrapperStyles}
      style={
        section.layout?.background ? getBackgroundStyles(section.layout.background) : undefined
      }
    >
      {renderSectionContent()}
    </section>
  );
}

function getBackgroundStyles(background: NonNullable<PageSection["layout"]>["background"]) {
  const styles: React.CSSProperties = {};

  if (background?.color) {
    styles.backgroundColor = background.color;
  }

  if (background?.image) {
    styles.backgroundImage = `url(${background.image})`;
    styles.backgroundSize = "cover";
    styles.backgroundPosition = "center";
  }

  if (background?.gradient) {
    const { from, to, direction = "to-right" } = background.gradient;
    styles.backgroundImage = `linear-gradient(${direction.replace("to-", "to ")}, ${from}, ${to})`;
  }

  return styles;
}
