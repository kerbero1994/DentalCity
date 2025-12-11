import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSectionComponent } from "../HeroSection";
import type { HeroSection } from "@/core/types/lib/page-builder";

// Mock Next.js components
vi.mock("next/image", () => ({
  default: ({ src, alt, priority }: any) => <img src={src} alt={alt} data-priority={priority} />,
}));

vi.mock("next/link", () => ({
  default: ({ href, children, target, className }: any) => (
    <a href={href} target={target} className={className}>
      {children}
    </a>
  ),
}));

describe("HeroSectionComponent", () => {
  describe("Default Variant", () => {
    it("renders default hero section", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Hero Title",
          description: "Hero description",
        },
        hero: {
          variant: "default",
          ctas: [],
        },
      };

      render(<HeroSectionComponent section={section} />);

      expect(screen.getByText("Hero Title")).toBeInTheDocument();
      expect(screen.getByText("Hero description")).toBeInTheDocument();
    });

    it("renders eyebrow text", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          eyebrow: "Eyebrow Text",
          title: "Title",
        },
        hero: {
          variant: "default",
          ctas: [],
        },
      };

      render(<HeroSectionComponent section={section} />);

      expect(screen.getByText("Eyebrow Text")).toBeInTheDocument();
    });

    it("renders subtitle", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Title",
          subtitle: "Subtitle Text",
        },
        hero: {
          variant: "default",
          ctas: [],
        },
      };

      render(<HeroSectionComponent section={section} />);

      expect(screen.getByText("Subtitle Text")).toBeInTheDocument();
    });

    it("renders media image", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Title",
        },
        hero: {
          variant: "default",
          media: {
            type: "image",
            src: "/hero-image.jpg",
            alt: "Hero Image",
          },
          ctas: [],
        },
      };

      render(<HeroSectionComponent section={section} />);

      const img = screen.getByRole("img", { name: "Hero Image" });
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "/hero-image.jpg");
    });

    it("uses title as fallback alt text when alt is not provided", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Page Title",
        },
        hero: {
          variant: "default",
          media: {
            type: "image",
            src: "/image.jpg",
          },
          ctas: [],
        },
      };

      render(<HeroSectionComponent section={section} />);

      expect(screen.getByRole("img", { name: "Page Title" })).toBeInTheDocument();
    });

    it("renders priority image", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Title",
        },
        hero: {
          variant: "default",
          media: {
            type: "image",
            src: "/image.jpg",
            alt: "Image",
            priority: true,
          },
          ctas: [],
        },
      };

      const { container } = render(<HeroSectionComponent section={section} />);

      const img = container.querySelector('img[data-priority="true"]');
      expect(img).toBeInTheDocument();
    });

    it("renders CTA buttons", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Title",
        },
        hero: {
          variant: "default",
          ctas: [
            {
              label: "Primary CTA",
              href: "/primary",
              variant: "primary",
            },
            {
              label: "Secondary CTA",
              href: "/secondary",
              variant: "secondary",
            },
          ],
        },
      };

      render(<HeroSectionComponent section={section} />);

      const primaryCTA = screen.getByText("Primary CTA");
      const secondaryCTA = screen.getByText("Secondary CTA");

      expect(primaryCTA).toBeInTheDocument();
      expect(primaryCTA.closest("a")).toHaveAttribute("href", "/primary");

      expect(secondaryCTA).toBeInTheDocument();
      expect(secondaryCTA.closest("a")).toHaveAttribute("href", "/secondary");
    });

    it("renders CTA with icon", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Title",
        },
        hero: {
          variant: "default",
          ctas: [
            {
              label: "CTA with Icon",
              href: "/link",
              icon: "→",
              variant: "primary",
            },
          ],
        },
      };

      render(<HeroSectionComponent section={section} />);

      expect(screen.getByText("→")).toBeInTheDocument();
    });

    it("renders CTA with target attribute", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Title",
        },
        hero: {
          variant: "default",
          ctas: [
            {
              label: "External Link",
              href: "https://example.com",
              target: "_blank",
              variant: "primary",
            },
          ],
        },
      };

      render(<HeroSectionComponent section={section} />);

      const link = screen.getByText("External Link").closest("a");
      expect(link).toHaveAttribute("target", "_blank");
    });

    it("handles missing content fields gracefully", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {},
        hero: {
          variant: "default",
          ctas: [],
        },
      };

      const { container } = render(<HeroSectionComponent section={section} />);

      expect(container).toBeInTheDocument();
    });
  });

  describe("Split Variant", () => {
    it("renders split hero section", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Split Hero",
          description: "Split description",
        },
        hero: {
          variant: "split",
          ctas: [],
        },
      };

      render(<HeroSectionComponent section={section} />);

      expect(screen.getByText("Split Hero")).toBeInTheDocument();
      expect(screen.getByText("Split description")).toBeInTheDocument();
    });

    it("renders split layout with image", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Title",
        },
        hero: {
          variant: "split",
          media: {
            type: "image",
            src: "/split-image.jpg",
            alt: "Split Image",
          },
          ctas: [],
        },
      };

      render(<HeroSectionComponent section={section} />);

      expect(screen.getByRole("img", { name: "Split Image" })).toBeInTheDocument();
    });

    it("renders overlay when enabled", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Title",
        },
        hero: {
          variant: "split",
          media: {
            type: "image",
            src: "/image.jpg",
            alt: "Image",
          },
          overlay: true,
          ctas: [],
        },
      };

      const { container } = render(<HeroSectionComponent section={section} />);

      const overlay = container.querySelector(".bg-black\\/30");
      expect(overlay).toBeInTheDocument();
    });

    it("does not render overlay when disabled", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Title",
        },
        hero: {
          variant: "split",
          media: {
            type: "image",
            src: "/image.jpg",
            alt: "Image",
          },
          overlay: false,
          ctas: [],
        },
      };

      const { container } = render(<HeroSectionComponent section={section} />);

      const overlay = container.querySelector(".bg-black\\/30");
      expect(overlay).not.toBeInTheDocument();
    });

    it("renders CTAs in split layout", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Title",
        },
        hero: {
          variant: "split",
          ctas: [
            {
              label: "Action",
              href: "/action",
              variant: "primary",
            },
          ],
        },
      };

      render(<HeroSectionComponent section={section} />);

      expect(screen.getByText("Action")).toBeInTheDocument();
    });
  });

  describe("Centered Variant", () => {
    it("renders centered hero section", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Centered Hero",
          description: "Centered description",
        },
        hero: {
          variant: "centered",
          ctas: [],
        },
      };

      render(<HeroSectionComponent section={section} />);

      expect(screen.getByText("Centered Hero")).toBeInTheDocument();
      expect(screen.getByText("Centered description")).toBeInTheDocument();
    });

    it("centers all content", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Centered",
        },
        hero: {
          variant: "centered",
          ctas: [],
        },
      };

      const { container } = render(<HeroSectionComponent section={section} />);

      const centerDiv = container.querySelector(".text-center");
      expect(centerDiv).toBeInTheDocument();
    });

    it("renders centered layout with image", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Title",
        },
        hero: {
          variant: "centered",
          media: {
            type: "image",
            src: "/centered-image.jpg",
            alt: "Centered Image",
          },
          ctas: [],
        },
      };

      render(<HeroSectionComponent section={section} />);

      expect(screen.getByRole("img", { name: "Centered Image" })).toBeInTheDocument();
    });
  });

  describe("CTA Variants", () => {
    it("renders primary CTA variant", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Title",
        },
        hero: {
          variant: "default",
          ctas: [
            {
              label: "Primary",
              href: "/link",
              variant: "primary",
            },
          ],
        },
      };

      const { container } = render(<HeroSectionComponent section={section} />);

      const cta = screen.getByText("Primary").closest("a");
      expect(cta?.className).toContain("bg-primary");
    });

    it("renders secondary CTA variant", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Title",
        },
        hero: {
          variant: "default",
          ctas: [
            {
              label: "Secondary",
              href: "/link",
              variant: "secondary",
            },
          ],
        },
      };

      const { container } = render(<HeroSectionComponent section={section} />);

      const cta = screen.getByText("Secondary").closest("a");
      expect(cta?.className).toContain("bg-secondary");
    });

    it("renders outline CTA variant", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Title",
        },
        hero: {
          variant: "default",
          ctas: [
            {
              label: "Outline",
              href: "/link",
              variant: "outline",
            },
          ],
        },
      };

      const { container } = render(<HeroSectionComponent section={section} />);

      const cta = screen.getByText("Outline").closest("a");
      expect(cta?.className).toContain("border-2");
    });

    it("renders ghost CTA variant", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Title",
        },
        hero: {
          variant: "default",
          ctas: [
            {
              label: "Ghost",
              href: "/link",
              variant: "ghost",
            },
          ],
        },
      };

      render(<HeroSectionComponent section={section} />);

      expect(screen.getByText("Ghost")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("renders without variant (defaults to default)", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Default Variant",
        },
        hero: {
          ctas: [],
        },
      };

      render(<HeroSectionComponent section={section} />);

      expect(screen.getByText("Default Variant")).toBeInTheDocument();
    });

    it("renders without CTAs", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "No CTAs",
        },
        hero: {
          variant: "default",
        },
      };

      render(<HeroSectionComponent section={section} />);

      expect(screen.getByText("No CTAs")).toBeInTheDocument();
    });

    it("renders without media", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "No Media",
        },
        hero: {
          variant: "default",
          ctas: [],
        },
      };

      render(<HeroSectionComponent section={section} />);

      expect(screen.getByText("No Media")).toBeInTheDocument();
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("handles empty CTAs array", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Empty CTAs",
        },
        hero: {
          variant: "default",
          ctas: [],
        },
      };

      render(<HeroSectionComponent section={section} />);

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });

    it("renders multiple CTAs", () => {
      const section: HeroSection = {
        type: "hero",
        id: "test-section",
        content: {
          title: "Title",
        },
        hero: {
          variant: "default",
          ctas: [
            { label: "CTA 1", href: "/1", variant: "primary" },
            { label: "CTA 2", href: "/2", variant: "secondary" },
            { label: "CTA 3", href: "/3", variant: "outline" },
          ],
        },
      };

      render(<HeroSectionComponent section={section} />);

      expect(screen.getByText("CTA 1")).toBeInTheDocument();
      expect(screen.getByText("CTA 2")).toBeInTheDocument();
      expect(screen.getByText("CTA 3")).toBeInTheDocument();
    });
  });
});
