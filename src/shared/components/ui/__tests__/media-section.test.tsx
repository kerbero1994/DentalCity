import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MediaSection } from "../media-section";

// Mock Next.js Image
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    width,
    height,
    priority,
    className,
    sizes,
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    className?: string;
    sizes?: string;
  }) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      data-priority={priority}
      className={className}
      data-sizes={sizes}
    />
  ),
}));

describe("MediaSection", () => {
  const defaultProps = {
    imageSrc: "/test-image.jpg",
    imageAlt: "Test Image",
    children: <p>Test Content</p>,
  };

  describe("Basic Rendering", () => {
    it("renders media section", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const section = container.querySelector("div");
      expect(section).toBeInTheDocument();
    });

    it("renders children content", () => {
      render(<MediaSection {...defaultProps} />);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("renders image", () => {
      render(<MediaSection {...defaultProps} />);
      expect(screen.getByAltText("Test Image")).toBeInTheDocument();
    });

    it("image has correct src", () => {
      render(<MediaSection {...defaultProps} />);
      const image = screen.getByAltText("Test Image");
      expect(image).toHaveAttribute("src", "/test-image.jpg");
    });
  });

  describe("Layout Variants", () => {
    it("applies image-right layout by default", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const grid = container.querySelector(".lg\\:grid-cols-2");
      expect(grid).toBeInTheDocument();
    });

    it("applies image-left layout", () => {
      const { container } = render(<MediaSection {...defaultProps} layout="image-left" />);
      const mediaWrapper = container.querySelector(".lg\\:order-first");
      expect(mediaWrapper).toBeInTheDocument();
    });

    it("image-right has correct order", () => {
      const { container } = render(<MediaSection {...defaultProps} layout="image-right" />);
      const mediaWrapper = container.querySelector(".lg\\:order-last");
      expect(mediaWrapper).toBeInTheDocument();
    });

    it("applies stacked layout", () => {
      const { container } = render(<MediaSection {...defaultProps} layout="stacked" />);
      const grid = container.querySelector(".grid-cols-1");
      expect(grid).toBeInTheDocument();
    });

    it("stacked layout has no column split", () => {
      const { container } = render(<MediaSection {...defaultProps} layout="stacked" />);
      const grid = container.querySelector(".lg\\:grid-cols-2");
      expect(grid).not.toBeInTheDocument();
    });
  });

  describe("Image Properties", () => {
    it("uses default image dimensions", () => {
      render(<MediaSection {...defaultProps} />);
      const image = screen.getByAltText("Test Image");
      expect(image).toHaveAttribute("width", "880");
      expect(image).toHaveAttribute("height", "560");
    });

    it("accepts custom image width", () => {
      render(<MediaSection {...defaultProps} imageWidth={1200} />);
      const image = screen.getByAltText("Test Image");
      expect(image).toHaveAttribute("width", "1200");
    });

    it("accepts custom image height", () => {
      render(<MediaSection {...defaultProps} imageHeight={800} />);
      const image = screen.getByAltText("Test Image");
      expect(image).toHaveAttribute("height", "800");
    });

    it("priority is false by default", () => {
      render(<MediaSection {...defaultProps} />);
      const image = screen.getByAltText("Test Image");
      expect(image).toHaveAttribute("data-priority", "false");
    });

    it("accepts priority prop", () => {
      render(<MediaSection {...defaultProps} priority />);
      const image = screen.getByAltText("Test Image");
      expect(image).toHaveAttribute("data-priority", "true");
    });

    it("image has object-cover class", () => {
      render(<MediaSection {...defaultProps} />);
      const image = screen.getByAltText("Test Image");
      expect(image).toHaveClass("object-cover");
    });

    it("image has responsive sizes", () => {
      render(<MediaSection {...defaultProps} />);
      const image = screen.getByAltText("Test Image");
      expect(image).toHaveAttribute("data-sizes", "(max-width: 1024px) 100vw, 560px");
    });
  });

  describe("Custom Image ClassName", () => {
    it("accepts imageClassName prop", () => {
      render(<MediaSection {...defaultProps} imageClassName="custom-image" />);
      const image = screen.getByAltText("Test Image");
      expect(image).toHaveClass("custom-image");
    });

    it("merges imageClassName with default classes", () => {
      render(<MediaSection {...defaultProps} imageClassName="rounded-full" />);
      const image = screen.getByAltText("Test Image");
      expect(image).toHaveClass("rounded-full", "object-cover");
    });
  });

  describe("Badge", () => {
    it("renders badge when provided", () => {
      render(<MediaSection {...defaultProps} badge="New" />);
      expect(screen.getByText("New")).toBeInTheDocument();
    });

    it("badge is in figcaption", () => {
      render(<MediaSection {...defaultProps} badge="Featured" />);
      const badge = screen.getByText("Featured");
      expect(badge.tagName).toBe("FIGCAPTION");
    });

    it("badge has proper styling", () => {
      render(<MediaSection {...defaultProps} badge="Badge" />);
      const badge = screen.getByText("Badge");
      expect(badge).toHaveClass(
        "absolute",
        "bottom-4",
        "left-4",
        "rounded-full",
        "px-4",
        "py-2",
        "text-sm",
        "font-semibold",
        "shadow-lg",
        "backdrop-blur-sm"
      );
    });

    it("badge has background with transparency", () => {
      render(<MediaSection {...defaultProps} badge="Badge" />);
      const badge = screen.getByText("Badge");
      expect(badge).toHaveClass("bg-background/90");
    });

    it("does not render badge when not provided", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const figcaption = container.querySelector("figcaption");
      expect(figcaption).not.toBeInTheDocument();
    });

    it("badge can be ReactNode", () => {
      render(
        <MediaSection
          {...defaultProps}
          badge={
            <span>
              <strong>New</strong> Feature
            </span>
          }
        />
      );
      expect(screen.getByText("New")).toBeInTheDocument();
      expect(screen.getByText("Feature")).toBeInTheDocument();
    });
  });

  describe("Offset Effect", () => {
    it("renders offset by default", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const offset = container.querySelector(".from-primary\\/5");
      expect(offset).toBeInTheDocument();
    });

    it("offset has gradient background", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const offset = container.querySelector(".bg-gradient-to-br");
      expect(offset).toBeInTheDocument();
    });

    it("offset is behind image", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const offset = container.querySelector(".-z-10");
      expect(offset).toBeInTheDocument();
    });

    it("offset is decorative", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const offset = container.querySelector('[aria-hidden="true"]');
      expect(offset).toBeInTheDocument();
    });

    it("offset is absolutely positioned", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const offset = container.querySelector(".absolute.-inset-4");
      expect(offset).toBeInTheDocument();
    });

    it("can disable offset", () => {
      const { container } = render(<MediaSection {...defaultProps} withOffset={false} />);
      const offset = container.querySelector(".from-primary\\/5");
      expect(offset).not.toBeInTheDocument();
    });

    it("offset has rounded corners", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const offset = container.querySelector(".rounded-2xl");
      expect(offset).toBeInTheDocument();
    });
  });

  describe("Image Container", () => {
    it("image is in figure element", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const figure = container.querySelector("figure");
      expect(figure).toBeInTheDocument();
    });

    it("figure is relatively positioned", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const figure = container.querySelector("figure");
      expect(figure).toHaveClass("relative");
    });

    it("image wrapper has rounded corners", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const imageWrapper = container.querySelector(".rounded-xl");
      expect(imageWrapper).toBeInTheDocument();
    });

    it("image wrapper has overflow hidden", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const imageWrapper = container.querySelector(".overflow-hidden");
      expect(imageWrapper).toBeInTheDocument();
    });
  });

  describe("Content Container", () => {
    it("content is in flex container", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const contentContainer = container.querySelector(".flex.flex-col");
      expect(contentContainer).toBeInTheDocument();
    });

    it("content has gap spacing", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const contentContainer = container.querySelector(".gap-6");
      expect(contentContainer).toBeInTheDocument();
    });

    it("content gap is responsive", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const contentContainer = container.querySelector(".lg\\:gap-8");
      expect(contentContainer).toBeInTheDocument();
    });
  });

  describe("Grid Layout", () => {
    it("has grid layout", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const grid = container.querySelector(".grid");
      expect(grid).toBeInTheDocument();
    });

    it("has gap between columns", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const grid = container.querySelector(".gap-8");
      expect(grid).toBeInTheDocument();
    });

    it("gap is responsive", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const grid = container.querySelector(".lg\\:gap-12");
      expect(grid).toBeInTheDocument();
    });
  });

  describe("Custom ClassName", () => {
    it("accepts custom className", () => {
      const { container } = render(<MediaSection {...defaultProps} className="custom-media" />);
      const section = container.querySelector(".custom-media");
      expect(section).toBeInTheDocument();
    });

    it("merges custom className with layout", () => {
      const { container } = render(<MediaSection {...defaultProps} className="bg-gray-100" />);
      const section = container.querySelector(".bg-gray-100.grid");
      expect(section).toBeInTheDocument();
    });
  });

  describe("Real-World Scenarios", () => {
    it("program feature with image on right", () => {
      render(
        <MediaSection imageSrc="/program.jpg" imageAlt="Program Screenshot" layout="image-right">
          <h2>Advanced Engineering</h2>
          <p>Learn cutting-edge technologies</p>
        </MediaSection>
      );
      expect(screen.getByText("Advanced Engineering")).toBeInTheDocument();
      expect(screen.getByAltText("Program Screenshot")).toBeInTheDocument();
    });

    it("testimonial with image on left", () => {
      render(
        <MediaSection
          imageSrc="/student.jpg"
          imageAlt="Student Photo"
          layout="image-left"
          badge="Alumni"
        >
          <blockquote>This program changed my life</blockquote>
        </MediaSection>
      );
      expect(screen.getByText("This program changed my life")).toBeInTheDocument();
      expect(screen.getByText("Alumni")).toBeInTheDocument();
    });

    it("hero section with priority image", () => {
      render(
        <MediaSection
          imageSrc="/hero.jpg"
          imageAlt="Hero Image"
          imageWidth={1920}
          imageHeight={1080}
          priority
          layout="stacked"
        >
          <h1>Welcome to SITIMM</h1>
        </MediaSection>
      );
      const image = screen.getByAltText("Hero Image");
      expect(image).toHaveAttribute("data-priority", "true");
    });

    it("feature section without offset", () => {
      render(
        <MediaSection imageSrc="/feature.jpg" imageAlt="Feature" withOffset={false}>
          <h3>Key Feature</h3>
        </MediaSection>
      );
      const { container } = render(<MediaSection {...defaultProps} withOffset={false} />);
      const offset = container.querySelector(".from-primary\\/5");
      expect(offset).not.toBeInTheDocument();
    });

    it("case study with badge", () => {
      render(
        <MediaSection imageSrc="/study.jpg" imageAlt="Case Study" badge="Success Story">
          <h3>Digital Transformation</h3>
          <p>How we helped Company X achieve their goals</p>
        </MediaSection>
      );
      expect(screen.getByText("Success Story")).toBeInTheDocument();
      expect(screen.getByText("Digital Transformation")).toBeInTheDocument();
    });
  });

  describe("Responsive Behavior", () => {
    it("grid is responsive", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const grid = container.querySelector(".lg\\:grid-cols-2");
      expect(grid).toBeInTheDocument();
    });

    it("content gap is responsive", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const contentContainer = container.querySelector(".gap-6.lg\\:gap-8");
      expect(contentContainer).toBeInTheDocument();
    });

    it("grid gap is responsive", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const grid = container.querySelector(".gap-8.lg\\:gap-12");
      expect(grid).toBeInTheDocument();
    });

    it("layout changes on mobile", () => {
      const { container } = render(<MediaSection {...defaultProps} layout="image-right" />);
      // On mobile, columns stack naturally
      const grid = container.querySelector(".grid");
      expect(grid).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("image has alt text", () => {
      render(<MediaSection {...defaultProps} />);
      const image = screen.getByAltText("Test Image");
      expect(image).toHaveAttribute("alt", "Test Image");
    });

    it("figure element provides semantic structure", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const figure = container.querySelector("figure");
      expect(figure).toBeInTheDocument();
    });

    it("badge uses figcaption appropriately", () => {
      render(<MediaSection {...defaultProps} badge="New" />);
      const figcaption = screen.getByText("New");
      expect(figcaption.tagName).toBe("FIGCAPTION");
    });

    it("offset is marked as decorative", () => {
      const { container } = render(<MediaSection {...defaultProps} />);
      const offset = container.querySelector('[aria-hidden="true"]');
      expect(offset).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty children", () => {
      render(
        <MediaSection imageSrc="/test.jpg" imageAlt="Test">
          <></>
        </MediaSection>
      );
      expect(screen.getByAltText("Test")).toBeInTheDocument();
    });

    it("handles multiple children elements", () => {
      render(
        <MediaSection {...defaultProps}>
          <h2>Title</h2>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
          <button>CTA</button>
        </MediaSection>
      );
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
      expect(screen.getByText("Paragraph 2")).toBeInTheDocument();
      expect(screen.getByText("CTA")).toBeInTheDocument();
    });

    it("handles complex badge content", () => {
      render(
        <MediaSection
          {...defaultProps}
          badge={
            <div>
              <span>⭐</span>
              <strong>Featured</strong>
            </div>
          }
        />
      );
      expect(screen.getByText("⭐")).toBeInTheDocument();
      expect(screen.getByText("Featured")).toBeInTheDocument();
    });

    it("handles very long image URLs", () => {
      const longUrl = "https://example.com/" + "a".repeat(200) + ".jpg";
      render(
        <MediaSection imageSrc={longUrl} imageAlt="Long URL">
          Content
        </MediaSection>
      );
      const image = screen.getByAltText("Long URL");
      expect(image).toHaveAttribute("src", longUrl);
    });
  });
});
