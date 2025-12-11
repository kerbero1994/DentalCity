import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CTABannerSectionComponent } from "../CTABannerSection";
import type { CTABannerSection } from "@/core/types/lib/page-builder";

// Mock Next.js components
vi.mock("next/link", () => ({
  default: ({ href, children, target, className }: any) => (
    <a href={href} target={target} className={className}>
      {children}
    </a>
  ),
}));

describe("CTABannerSectionComponent", () => {
  describe("Default Variant", () => {
    it("renders default CTA banner", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          title: "CTA Title",
          description: "CTA description",
        },
        ctaBanner: {
          variant: "default",
          ctas: [],
        },
      };

      render(<CTABannerSectionComponent section={section} />);

      expect(screen.getByText("CTA Title")).toBeInTheDocument();
      expect(screen.getByText("CTA description")).toBeInTheDocument();
    });

    it("renders eyebrow text", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          eyebrow: "Eyebrow Text",
          title: "Title",
        },
        ctaBanner: {
          variant: "default",
          ctas: [],
        },
      };

      render(<CTABannerSectionComponent section={section} />);

      expect(screen.getByText("Eyebrow Text")).toBeInTheDocument();
    });

    it("renders without description", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          title: "Title Only",
        },
        ctaBanner: {
          variant: "default",
          ctas: [],
        },
      };

      render(<CTABannerSectionComponent section={section} />);

      expect(screen.getByText("Title Only")).toBeInTheDocument();
    });

    it("renders CTA buttons", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          title: "Title",
        },
        ctaBanner: {
          variant: "default",
          ctas: [
            {
              label: "Primary Action",
              href: "/action",
              variant: "primary",
            },
          ],
        },
      };

      render(<CTABannerSectionComponent section={section} />);

      const cta = screen.getByText("Primary Action");
      expect(cta).toBeInTheDocument();
      expect(cta.closest("a")).toHaveAttribute("href", "/action");
    });

    it("renders multiple CTAs", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          title: "Title",
        },
        ctaBanner: {
          variant: "default",
          ctas: [
            { label: "CTA 1", href: "/1", variant: "primary" },
            { label: "CTA 2", href: "/2", variant: "secondary" },
          ],
        },
      };

      render(<CTABannerSectionComponent section={section} />);

      expect(screen.getByText("CTA 1")).toBeInTheDocument();
      expect(screen.getByText("CTA 2")).toBeInTheDocument();
    });

    it("renders CTA with icon", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          title: "Title",
        },
        ctaBanner: {
          variant: "default",
          ctas: [
            {
              label: "Action",
              href: "/action",
              icon: "→",
              variant: "primary",
            },
          ],
        },
      };

      render(<CTABannerSectionComponent section={section} />);

      expect(screen.getByText("→")).toBeInTheDocument();
    });

    it("renders CTA with target attribute", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          title: "Title",
        },
        ctaBanner: {
          variant: "default",
          ctas: [
            {
              label: "External",
              href: "https://example.com",
              target: "_blank",
              variant: "primary",
            },
          ],
        },
      };

      render(<CTABannerSectionComponent section={section} />);

      const link = screen.getByText("External").closest("a");
      expect(link).toHaveAttribute("target", "_blank");
    });
  });

  describe("Gradient Variant", () => {
    it("renders gradient variant", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          title: "Gradient Banner",
        },
        ctaBanner: {
          variant: "gradient",
          ctas: [],
        },
      };

      const { container } = render(<CTABannerSectionComponent section={section} />);

      expect(screen.getByText("Gradient Banner")).toBeInTheDocument();
      const banner = container.querySelector(".bg-gradient-to-r");
      expect(banner).toBeInTheDocument();
    });

    it("renders CTAs in gradient variant", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          title: "Title",
        },
        ctaBanner: {
          variant: "gradient",
          ctas: [
            {
              label: "Action",
              href: "/action",
              variant: "primary",
            },
          ],
        },
      };

      render(<CTABannerSectionComponent section={section} />);

      expect(screen.getByText("Action")).toBeInTheDocument();
    });
  });

  describe("Bordered Variant", () => {
    it("renders bordered variant", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          title: "Bordered Banner",
        },
        ctaBanner: {
          variant: "bordered",
          ctas: [],
        },
      };

      const { container } = render(<CTABannerSectionComponent section={section} />);

      expect(screen.getByText("Bordered Banner")).toBeInTheDocument();
      const banner = container.querySelector(".border-2");
      expect(banner).toBeInTheDocument();
    });

    it("renders CTAs in bordered variant", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          title: "Title",
        },
        ctaBanner: {
          variant: "bordered",
          ctas: [
            {
              label: "Action",
              href: "/action",
              variant: "primary",
            },
          ],
        },
      };

      render(<CTABannerSectionComponent section={section} />);

      expect(screen.getByText("Action")).toBeInTheDocument();
    });
  });

  describe("CTA Variants", () => {
    it("renders primary CTA variant", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          title: "Title",
        },
        ctaBanner: {
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

      const { container } = render(<CTABannerSectionComponent section={section} />);

      const cta = screen.getByText("Primary").closest("a");
      expect(cta?.className).toContain("bg-white");
    });

    it("renders secondary CTA variant", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          title: "Title",
        },
        ctaBanner: {
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

      const { container } = render(<CTABannerSectionComponent section={section} />);

      const cta = screen.getByText("Secondary").closest("a");
      expect(cta?.className).toContain("bg-primary-foreground/20");
    });

    it("renders outline CTA variant", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          title: "Title",
        },
        ctaBanner: {
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

      const { container } = render(<CTABannerSectionComponent section={section} />);

      const cta = screen.getByText("Outline").closest("a");
      expect(cta?.className).toContain("border-2");
    });

    it("renders ghost CTA variant", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          title: "Title",
        },
        ctaBanner: {
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

      render(<CTABannerSectionComponent section={section} />);

      expect(screen.getByText("Ghost")).toBeInTheDocument();
    });

    it("defaults to primary when variant not specified", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          title: "Title",
        },
        ctaBanner: {
          variant: "default",
          ctas: [
            {
              label: "Default",
              href: "/link",
            },
          ],
        },
      };

      const { container } = render(<CTABannerSectionComponent section={section} />);

      const cta = screen.getByText("Default").closest("a");
      expect(cta?.className).toContain("bg-white");
    });
  });

  describe("Edge Cases", () => {
    it("renders without variant (defaults to default)", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          title: "Title",
        },
        ctaBanner: {
          ctas: [],
        },
      };

      render(<CTABannerSectionComponent section={section} />);

      expect(screen.getByText("Title")).toBeInTheDocument();
    });

    it("renders without CTAs", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          title: "No CTAs",
        },
        ctaBanner: {
          variant: "default",
          ctas: [],
        },
      };

      render(<CTABannerSectionComponent section={section} />);

      expect(screen.getByText("No CTAs")).toBeInTheDocument();
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });

    it("renders with empty CTAs array", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          title: "Empty CTAs",
        },
        ctaBanner: {
          variant: "default",
          ctas: [],
        },
      };

      render(<CTABannerSectionComponent section={section} />);

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });

    it("renders without eyebrow", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          title: "No Eyebrow",
          description: "Description",
        },
        ctaBanner: {
          variant: "default",
          ctas: [],
        },
      };

      render(<CTABannerSectionComponent section={section} />);

      expect(screen.getByText("No Eyebrow")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
    });

    it("renders with all content fields", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          eyebrow: "Eyebrow",
          title: "Title",
          description: "Description",
        },
        ctaBanner: {
          variant: "default",
          ctas: [],
        },
      };

      render(<CTABannerSectionComponent section={section} />);

      expect(screen.getByText("Eyebrow")).toBeInTheDocument();
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
    });

    it("renders with all fields and multiple CTAs", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          eyebrow: "Call to Action",
          title: "Get Started Today",
          description: "Join thousands of satisfied customers",
        },
        ctaBanner: {
          variant: "gradient",
          ctas: [
            {
              label: "Sign Up",
              href: "/signup",
              icon: "→",
              target: "_self",
              variant: "primary",
            },
            {
              label: "Learn More",
              href: "/learn",
              variant: "secondary",
            },
          ],
        },
      };

      render(<CTABannerSectionComponent section={section} />);

      expect(screen.getByText("Call to Action")).toBeInTheDocument();
      expect(screen.getByText("Get Started Today")).toBeInTheDocument();
      expect(screen.getByText("Join thousands of satisfied customers")).toBeInTheDocument();
      expect(screen.getByText("Sign Up")).toBeInTheDocument();
      expect(screen.getByText("Learn More")).toBeInTheDocument();
      expect(screen.getByText("→")).toBeInTheDocument();
    });

    it("handles CTA without icon", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          title: "Title",
        },
        ctaBanner: {
          variant: "default",
          ctas: [
            {
              label: "No Icon",
              href: "/link",
              variant: "primary",
            },
          ],
        },
      };

      render(<CTABannerSectionComponent section={section} />);

      expect(screen.getByText("No Icon")).toBeInTheDocument();
    });

    it("handles CTA without target", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          title: "Title",
        },
        ctaBanner: {
          variant: "default",
          ctas: [
            {
              label: "No Target",
              href: "/link",
              variant: "primary",
            },
          ],
        },
      };

      render(<CTABannerSectionComponent section={section} />);

      const link = screen.getByText("No Target").closest("a");
      expect(link).toHaveAttribute("href", "/link");
    });

    it("renders minimal content", () => {
      const section: CTABannerSection = {
        type: "cta-banner",
        id: "test-section",
        content: {
          title: "Minimal",
        },
        ctaBanner: {
          variant: "default",
          ctas: [
            {
              label: "Action",
              href: "/action",
              variant: "primary",
            },
          ],
        },
      };

      render(<CTABannerSectionComponent section={section} />);

      expect(screen.getByText("Minimal")).toBeInTheDocument();
      expect(screen.getByText("Action")).toBeInTheDocument();
    });
  });
});
