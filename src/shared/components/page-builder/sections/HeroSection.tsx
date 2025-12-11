import Image from "next/image";
import Link from "next/link";
import type { HeroSection } from "@/core/types/lib/page-builder";
import { cn } from "@/lib/utils";
import { getContentContainerClass } from "../utils/section-styles";

interface HeroSectionProps {
  section: HeroSection;
}

export function HeroSectionComponent({ section }: HeroSectionProps) {
  const { content, hero } = section;
  const variant = hero.variant || "default";

  if (variant === "split") {
    return <HeroSplit content={content} hero={hero} />;
  }

  if (variant === "centered") {
    return <HeroCentered content={content} hero={hero} />;
  }

  return <HeroDefault content={content} hero={hero} />;
}

function HeroDefault({
  content,
  hero,
}: {
  content: HeroSection["content"];
  hero: HeroSection["hero"];
}) {
  return (
    <div className={cn("relative", getContentContainerClass())}>
      <div className="grid min-h-[500px] items-center gap-12 lg:grid-cols-2">
        {/* Content */}
        <div className="space-y-6">
          {content?.eyebrow && (
            <p className="text-primary text-sm font-semibold tracking-wide uppercase">
              {content.eyebrow}
            </p>
          )}

          {content?.title && (
            <h1 className="text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              {content.title}
            </h1>
          )}

          {content?.subtitle && (
            <h2 className="text-2xl font-semibold opacity-90 md:text-3xl">{content.subtitle}</h2>
          )}

          {content?.description && (
            <p className="max-w-2xl text-lg opacity-80">{content.description}</p>
          )}

          {hero.ctas && hero.ctas.length > 0 && (
            <div className="flex flex-wrap gap-4 pt-4">
              {hero.ctas.map((cta, index) => (
                <Link
                  key={index}
                  href={cta.href}
                  target={cta.target}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all",
                    getCTAVariantClass(cta.variant)
                  )}
                >
                  {cta.label}
                  {cta.icon && <span className="text-xl">{cta.icon}</span>}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Media */}
        {hero.media?.src && (
          <div className="relative h-[400px] overflow-hidden rounded-2xl lg:h-[500px]">
            <Image
              src={hero.media.src}
              alt={hero.media.alt || content?.title || "Hero image"}
              fill
              className="object-cover"
              priority={hero.media.priority}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function HeroSplit({
  content,
  hero,
}: {
  content: HeroSection["content"];
  hero: HeroSection["hero"];
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Content Side */}
      <div className="flex items-center justify-center p-8 lg:p-16">
        <div className="max-w-xl space-y-6">
          {content?.eyebrow && (
            <p className="text-primary text-sm font-semibold tracking-wide uppercase">
              {content.eyebrow}
            </p>
          )}

          {content?.title && (
            <h1 className="text-4xl leading-tight font-bold md:text-5xl">{content.title}</h1>
          )}

          {content?.description && <p className="text-lg opacity-80">{content.description}</p>}

          {hero.ctas && hero.ctas.length > 0 && (
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              {hero.ctas.map((cta, index) => (
                <Link
                  key={index}
                  href={cta.href}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-all",
                    getCTAVariantClass(cta.variant)
                  )}
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Side */}
      {hero.media?.src && (
        <div className="relative h-[400px] lg:h-auto">
          <Image
            src={hero.media.src}
            alt={hero.media.alt || content?.title || "Hero image"}
            fill
            className="object-cover"
            priority={hero.media.priority}
          />
          {hero.overlay && <div className="absolute inset-0 bg-black/30" />}
        </div>
      )}
    </div>
  );
}

function HeroCentered({
  content,
  hero,
}: {
  content: HeroSection["content"];
  hero: HeroSection["hero"];
}) {
  return (
    <div className={cn("text-center", getContentContainerClass("narrow"))}>
      <div className="space-y-6 py-20">
        {content?.eyebrow && (
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">
            {content.eyebrow}
          </p>
        )}

        {content?.title && (
          <h1 className="text-5xl leading-tight font-bold md:text-6xl">{content.title}</h1>
        )}

        {content?.description && (
          <p className="mx-auto max-w-2xl text-xl opacity-80">{content.description}</p>
        )}

        {hero.ctas && hero.ctas.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            {hero.ctas.map((cta, index) => (
              <Link
                key={index}
                href={cta.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all",
                  getCTAVariantClass(cta.variant)
                )}
              >
                {cta.label}
              </Link>
            ))}
          </div>
        )}

        {hero.media?.src && (
          <div className="relative mt-12 h-[400px] overflow-hidden rounded-2xl">
            <Image
              src={hero.media.src}
              alt={hero.media.alt || content?.title || "Hero image"}
              fill
              className="object-cover"
              priority={hero.media.priority}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function getCTAVariantClass(variant: "primary" | "secondary" | "outline" | "ghost"): string {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    outline: "border-2 border-current hover:bg-current/10",
    ghost: "hover:bg-current/10",
  };

  return variants[variant] || variants.primary;
}
