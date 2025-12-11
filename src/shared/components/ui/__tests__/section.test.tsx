import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section } from "../section";

describe("Section", () => {
  describe("Basic Rendering", () => {
    it("renders section element by default", () => {
      const { container } = render(<Section>Content</Section>);
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<Section>Test Content</Section>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("has full width", () => {
      const { container } = render(<Section>Content</Section>);
      const section = container.querySelector("section");
      expect(section).toHaveClass("w-full");
    });
  });

  describe("Polymorphic 'as' Prop", () => {
    it("renders as div when as=div", () => {
      const { container } = render(<Section as="div">Content</Section>);
      const element = container.querySelector("div");
      expect(element).toBeInTheDocument();
      expect(container.querySelector("section")).not.toBeInTheDocument();
    });

    it("renders as article when as=article", () => {
      const { container } = render(<Section as="article">Content</Section>);
      const element = container.querySelector("article");
      expect(element).toBeInTheDocument();
    });

    it("renders as main when as=main", () => {
      const { container } = render(<Section as="main">Content</Section>);
      const element = container.querySelector("main");
      expect(element).toBeInTheDocument();
    });

    it("renders as aside when as=aside", () => {
      const { container } = render(<Section as="aside">Content</Section>);
      const element = container.querySelector("aside");
      expect(element).toBeInTheDocument();
    });
  });

  describe("Spacing Variants", () => {
    it("applies none spacing", () => {
      const { container } = render(<Section spacing="none">Content</Section>);
      const section = container.querySelector("section");
      expect(section).toHaveClass("py-0");
    });

    it("applies sm spacing", () => {
      const { container } = render(<Section spacing="sm">Content</Section>);
      const section = container.querySelector("section");
      expect(section).toHaveClass("py-8", "md:py-12");
    });

    it("applies md spacing", () => {
      const { container } = render(<Section spacing="md">Content</Section>);
      const section = container.querySelector("section");
      expect(section).toHaveClass("py-12", "md:py-16");
    });

    it("applies lg spacing (default)", () => {
      const { container } = render(<Section spacing="lg">Content</Section>);
      const section = container.querySelector("section");
      expect(section).toHaveClass("py-16", "md:py-24");
    });

    it("applies xl spacing", () => {
      const { container } = render(<Section spacing="xl">Content</Section>);
      const section = container.querySelector("section");
      expect(section).toHaveClass("py-20", "md:py-32");
    });

    it("uses lg spacing by default", () => {
      const { container } = render(<Section>Content</Section>);
      const section = container.querySelector("section");
      expect(section).toHaveClass("py-16", "md:py-24");
    });
  });

  describe("Container Size Variants", () => {
    it("applies sm container size", () => {
      const { container } = render(<Section size="sm">Content</Section>);
      const innerContainer = container.querySelector(".max-w-3xl");
      expect(innerContainer).toBeInTheDocument();
    });

    it("applies md container size", () => {
      const { container } = render(<Section size="md">Content</Section>);
      const innerContainer = container.querySelector(".max-w-5xl");
      expect(innerContainer).toBeInTheDocument();
    });

    it("applies lg container size (default)", () => {
      const { container } = render(<Section size="lg">Content</Section>);
      const innerContainer = container.querySelector(".max-w-7xl");
      expect(innerContainer).toBeInTheDocument();
    });

    it("applies full container size", () => {
      const { container } = render(<Section size="full">Content</Section>);
      const innerContainer = container.querySelector(".max-w-full");
      expect(innerContainer).toBeInTheDocument();
    });

    it("uses lg size by default", () => {
      const { container } = render(<Section>Content</Section>);
      const innerContainer = container.querySelector(".max-w-7xl");
      expect(innerContainer).toBeInTheDocument();
    });
  });

  describe("Inner Container", () => {
    it("renders inner container div", () => {
      const { container } = render(<Section>Content</Section>);
      const innerContainer = container.querySelector("div");
      expect(innerContainer).toBeInTheDocument();
    });

    it("inner container is centered", () => {
      const { container } = render(<Section>Content</Section>);
      const innerContainer = container.querySelector("div");
      expect(innerContainer).toHaveClass("mx-auto", "w-full");
    });

    it("inner container has horizontal padding", () => {
      const { container } = render(<Section>Content</Section>);
      const innerContainer = container.querySelector("div");
      expect(innerContainer).toHaveClass("px-4", "sm:px-6");
    });

    it("children are inside inner container", () => {
      const { container } = render(<Section>Content</Section>);
      const innerContainer = container.querySelector("div");
      expect(innerContainer?.textContent).toBe("Content");
    });
  });

  describe("Custom ClassName", () => {
    it("accepts custom className on section", () => {
      const { container } = render(<Section className="custom-section">Content</Section>);
      const section = container.querySelector(".custom-section");
      expect(section).toBeInTheDocument();
    });

    it("merges custom className with variants", () => {
      const { container } = render(
        <Section className="bg-gray-100" spacing="lg">
          Content
        </Section>
      );
      const section = container.querySelector("section");
      expect(section).toHaveClass("bg-gray-100", "py-16");
    });

    it("accepts custom className on container", () => {
      const { container } = render(
        <Section containerClassName="custom-container">Content</Section>
      );
      const innerContainer = container.querySelector(".custom-container");
      expect(innerContainer).toBeInTheDocument();
    });

    it("merges container className with variants", () => {
      const { container } = render(
        <Section containerClassName="custom-padding" size="lg">
          Content
        </Section>
      );
      const innerContainer = container.querySelector("div");
      expect(innerContainer).toHaveClass("custom-padding", "max-w-7xl");
    });
  });

  describe("ID Attribute", () => {
    it("accepts id attribute", () => {
      const { container } = render(<Section id="main-section">Content</Section>);
      const section = container.querySelector("#main-section");
      expect(section).toBeInTheDocument();
    });

    it("can be targeted with id", () => {
      render(<Section id="target">Content</Section>);
      const section = document.getElementById("target");
      expect(section).toBeInTheDocument();
    });
  });

  describe("ARIA Attributes", () => {
    it("accepts aria-labelledby", () => {
      const { container } = render(<Section aria-labelledby="section-title">Content</Section>);
      const section = container.querySelector("section");
      expect(section).toHaveAttribute("aria-labelledby", "section-title");
    });

    it("accepts aria-describedby", () => {
      const { container } = render(<Section aria-describedby="section-desc">Content</Section>);
      const section = container.querySelector("section");
      expect(section).toHaveAttribute("aria-describedby", "section-desc");
    });

    it("accepts both aria attributes", () => {
      const { container } = render(
        <Section aria-labelledby="title" aria-describedby="desc">
          Content
        </Section>
      );
      const section = container.querySelector("section");
      expect(section).toHaveAttribute("aria-labelledby", "title");
      expect(section).toHaveAttribute("aria-describedby", "desc");
    });
  });

  describe("Combination of Props", () => {
    it("combines spacing and size", () => {
      const { container } = render(
        <Section spacing="xl" size="sm">
          Content
        </Section>
      );
      const section = container.querySelector("section");
      const innerContainer = container.querySelector("div");
      expect(section).toHaveClass("py-20", "md:py-32");
      expect(innerContainer).toHaveClass("max-w-3xl");
    });

    it("combines all props", () => {
      const { container } = render(
        <Section
          as="main"
          spacing="md"
          size="md"
          className="bg-white"
          containerClassName="custom"
          id="main"
          aria-labelledby="title"
        >
          Content
        </Section>
      );
      const main = container.querySelector("main");
      expect(main).toHaveAttribute("id", "main");
      expect(main).toHaveClass("bg-white", "py-12");
    });
  });

  describe("Real-World Scenarios", () => {
    it("hero section with full width", () => {
      const { container } = render(
        <Section size="full" spacing="xl">
          <h1>Welcome</h1>
        </Section>
      );
      const innerContainer = container.querySelector(".max-w-full");
      expect(innerContainer).toBeInTheDocument();
      expect(screen.getByText("Welcome")).toBeInTheDocument();
    });

    it("content section with medium spacing", () => {
      const { container } = render(
        <Section size="lg" spacing="md" id="content">
          <p>Article content</p>
        </Section>
      );
      const section = container.querySelector("#content");
      expect(section).toHaveClass("py-12", "md:py-16");
    });

    it("narrow section for text content", () => {
      const { container } = render(
        <Section size="sm" spacing="lg">
          <article>Blog post</article>
        </Section>
      );
      const innerContainer = container.querySelector(".max-w-3xl");
      expect(innerContainer).toBeInTheDocument();
    });

    it("section with no vertical spacing", () => {
      const { container } = render(
        <Section spacing="none">
          <div>No spacing content</div>
        </Section>
      );
      const section = container.querySelector("section");
      expect(section).toHaveClass("py-0");
    });

    it("main content area", () => {
      const { container } = render(
        <Section as="main" id="main-content" aria-labelledby="page-title">
          <h1 id="page-title">Page Title</h1>
          <p>Content</p>
        </Section>
      );
      const main = container.querySelector("main");
      expect(main).toHaveAttribute("id", "main-content");
      expect(main).toHaveAttribute("aria-labelledby", "page-title");
    });

    it("sidebar section", () => {
      const { container } = render(
        <Section as="aside" size="sm" spacing="md">
          <h2>Sidebar</h2>
        </Section>
      );
      const aside = container.querySelector("aside");
      expect(aside).toBeInTheDocument();
    });

    it("article section", () => {
      const { container } = render(
        <Section as="article" size="md" spacing="lg">
          <h2>Article Title</h2>
          <p>Article body</p>
        </Section>
      );
      const article = container.querySelector("article");
      expect(article).toBeInTheDocument();
    });
  });

  describe("Responsive Behavior", () => {
    it("spacing is responsive", () => {
      const { container } = render(<Section spacing="lg">Content</Section>);
      const section = container.querySelector("section");
      expect(section).toHaveClass("py-16", "md:py-24");
    });

    it("container padding is responsive", () => {
      const { container } = render(<Section>Content</Section>);
      const innerContainer = container.querySelector("div");
      expect(innerContainer).toHaveClass("px-4", "sm:px-6");
    });

    it("xl spacing scales significantly", () => {
      const { container } = render(<Section spacing="xl">Content</Section>);
      const section = container.querySelector("section");
      expect(section).toHaveClass("py-20", "md:py-32");
    });
  });

  describe("Accessibility", () => {
    it("uses semantic HTML by default", () => {
      const { container } = render(<Section>Content</Section>);
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("supports custom semantic elements", () => {
      const { container } = render(<Section as="main">Content</Section>);
      const main = container.querySelector("main");
      expect(main).toBeInTheDocument();
    });

    it("supports aria-labelledby for accessibility", () => {
      render(
        <div>
          <h2 id="section-heading">Section Title</h2>
          <Section aria-labelledby="section-heading">Section content</Section>
        </div>
      );
      const section = document.querySelector('[aria-labelledby="section-heading"]');
      expect(section).toBeInTheDocument();
    });

    it("supports navigation between sections via ids", () => {
      render(
        <>
          <Section id="intro">Intro</Section>
          <Section id="features">Features</Section>
          <Section id="contact">Contact</Section>
        </>
      );
      expect(document.getElementById("intro")).toBeInTheDocument();
      expect(document.getElementById("features")).toBeInTheDocument();
      expect(document.getElementById("contact")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty children", () => {
      const { container } = render(<Section>{null}</Section>);
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("handles JSX children", () => {
      render(
        <Section>
          <h2>Heading</h2>
          <p>Paragraph</p>
          <ul>
            <li>Item</li>
          </ul>
        </Section>
      );
      expect(screen.getByText("Heading")).toBeInTheDocument();
      expect(screen.getByText("Paragraph")).toBeInTheDocument();
      expect(screen.getByText("Item")).toBeInTheDocument();
    });

    it("handles deeply nested content", () => {
      render(
        <Section>
          <div>
            <div>
              <div>
                <p>Deep content</p>
              </div>
            </div>
          </div>
        </Section>
      );
      expect(screen.getByText("Deep content")).toBeInTheDocument();
    });

    it("handles multiple children", () => {
      render(
        <Section>
          <span>First</span>
          <span>Second</span>
          <span>Third</span>
        </Section>
      );
      expect(screen.getByText("First")).toBeInTheDocument();
      expect(screen.getByText("Second")).toBeInTheDocument();
      expect(screen.getByText("Third")).toBeInTheDocument();
    });
  });

  describe("Layout Structure", () => {
    it("section wraps container", () => {
      const { container } = render(<Section>Content</Section>);
      const section = container.querySelector("section");
      const innerContainer = container.querySelector("div");
      expect(section?.contains(innerContainer)).toBe(true);
    });

    it("container is direct child of section", () => {
      const { container } = render(<Section>Content</Section>);
      const section = container.querySelector("section");
      const innerContainer = container.querySelector("div");
      expect(innerContainer?.parentElement).toBe(section);
    });

    it("content is inside container", () => {
      const { container } = render(<Section>Test Content</Section>);
      const innerContainer = container.querySelector("div");
      expect(innerContainer?.textContent).toContain("Test Content");
    });
  });
});
