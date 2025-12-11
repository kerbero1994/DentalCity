import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Container } from "../container";

describe("Container", () => {
  describe("Basic Rendering", () => {
    it("renders container element", () => {
      const { container } = render(<Container>Content</Container>);
      const element = container.querySelector("div");
      expect(element).toBeInTheDocument();
    });

    it("renders as div by default", () => {
      const { container } = render(<Container>Content</Container>);
      const element = container.querySelector("div");
      expect(element).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<Container>Test Content</Container>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("is centered", () => {
      const { container } = render(<Container>Content</Container>);
      const element = container.querySelector("div");
      expect(element).toHaveClass("mx-auto");
    });

    it("is full width", () => {
      const { container } = render(<Container>Content</Container>);
      const element = container.querySelector("div");
      expect(element).toHaveClass("w-full");
    });
  });

  describe("Polymorphic 'as' Prop", () => {
    it("renders as section when as=section", () => {
      const { container } = render(<Container as="section">Content</Container>);
      const element = container.querySelector("section");
      expect(element).toBeInTheDocument();
    });

    it("renders as main when as=main", () => {
      const { container } = render(<Container as="main">Content</Container>);
      const element = container.querySelector("main");
      expect(element).toBeInTheDocument();
    });

    it("renders as article when as=article", () => {
      const { container } = render(<Container as="article">Content</Container>);
      const element = container.querySelector("article");
      expect(element).toBeInTheDocument();
    });

    it("renders as aside when as=aside", () => {
      const { container } = render(<Container as="aside">Content</Container>);
      const element = container.querySelector("aside");
      expect(element).toBeInTheDocument();
    });

    it("renders as header when as=header", () => {
      const { container } = render(<Container as="header">Content</Container>);
      const element = container.querySelector("header");
      expect(element).toBeInTheDocument();
    });

    it("renders as footer when as=footer", () => {
      const { container } = render(<Container as="footer">Content</Container>);
      const element = container.querySelector("footer");
      expect(element).toBeInTheDocument();
    });

    it("renders as nav when as=nav", () => {
      const { container } = render(<Container as="nav">Content</Container>);
      const element = container.querySelector("nav");
      expect(element).toBeInTheDocument();
    });
  });

  describe("Size Variants", () => {
    it("applies sm size", () => {
      const { container } = render(<Container size="sm">Content</Container>);
      const element = container.querySelector(".max-w-3xl");
      expect(element).toBeInTheDocument();
    });

    it("applies md size", () => {
      const { container } = render(<Container size="md">Content</Container>);
      const element = container.querySelector(".max-w-5xl");
      expect(element).toBeInTheDocument();
    });

    it("applies lg size (default)", () => {
      const { container } = render(<Container size="lg">Content</Container>);
      const element = container.querySelector(".max-w-7xl");
      expect(element).toBeInTheDocument();
    });

    it("applies xl size", () => {
      const { container } = render(<Container size="xl">Content</Container>);
      const element = container.querySelector(".max-w-screen-2xl");
      expect(element).toBeInTheDocument();
    });

    it("applies full size", () => {
      const { container } = render(<Container size="full">Content</Container>);
      const element = container.querySelector(".max-w-full");
      expect(element).toBeInTheDocument();
    });

    it("uses lg size by default", () => {
      const { container } = render(<Container>Content</Container>);
      const element = container.querySelector(".max-w-7xl");
      expect(element).toBeInTheDocument();
    });
  });

  describe("Padding Variants", () => {
    it("applies none padding", () => {
      const { container } = render(<Container padding="none">Content</Container>);
      const element = container.querySelector(".px-0");
      expect(element).toBeInTheDocument();
    });

    it("applies sm padding", () => {
      const { container } = render(<Container padding="sm">Content</Container>);
      const element = container.querySelector(".px-4");
      expect(element).toBeInTheDocument();
    });

    it("applies md padding (default)", () => {
      const { container } = render(<Container padding="md">Content</Container>);
      const element = container.querySelector(".px-4");
      expect(element).toBeInTheDocument();
    });

    it("md padding is responsive", () => {
      const { container } = render(<Container padding="md">Content</Container>);
      const element = container.querySelector(".sm\\:px-6");
      expect(element).toBeInTheDocument();
    });

    it("applies lg padding", () => {
      const { container } = render(<Container padding="lg">Content</Container>);
      const element = container.querySelector(".px-4");
      expect(element).toBeInTheDocument();
    });

    it("lg padding is responsive", () => {
      const { container } = render(<Container padding="lg">Content</Container>);
      const element = container.querySelector(".sm\\:px-6.lg\\:px-8");
      expect(element).toBeInTheDocument();
    });

    it("uses md padding by default", () => {
      const { container } = render(<Container>Content</Container>);
      const element = container.querySelector(".px-4.sm\\:px-6");
      expect(element).toBeInTheDocument();
    });
  });

  describe("Custom ClassName", () => {
    it("accepts custom className", () => {
      const { container } = render(<Container className="custom-container">Content</Container>);
      const element = container.querySelector(".custom-container");
      expect(element).toBeInTheDocument();
    });

    it("merges custom className with variants", () => {
      const { container } = render(
        <Container className="bg-gray-100" size="lg" padding="md">
          Content
        </Container>
      );
      const element = container.querySelector("div");
      expect(element).toHaveClass("bg-gray-100", "max-w-7xl", "px-4");
    });

    it("allows overriding styles", () => {
      const { container } = render(<Container className="max-w-custom">Content</Container>);
      const element = container.querySelector(".max-w-custom");
      expect(element).toBeInTheDocument();
    });
  });

  describe("HTML Attributes", () => {
    it("accepts id attribute", () => {
      const { container } = render(<Container id="main-container">Content</Container>);
      const element = container.querySelector("#main-container");
      expect(element).toBeInTheDocument();
    });

    it("accepts aria-label", () => {
      const { container } = render(<Container aria-label="Main content">Content</Container>);
      const element = container.querySelector('[aria-label="Main content"]');
      expect(element).toBeInTheDocument();
    });

    it("accepts data attributes", () => {
      const { container } = render(<Container data-testid="test-container">Content</Container>);
      const element = container.querySelector('[data-testid="test-container"]');
      expect(element).toBeInTheDocument();
    });

    it("accepts role attribute", () => {
      const { container } = render(<Container role="region">Content</Container>);
      const element = container.querySelector('[role="region"]');
      expect(element).toBeInTheDocument();
    });
  });

  describe("Combination of Props", () => {
    it("combines size and padding", () => {
      const { container } = render(
        <Container size="md" padding="lg">
          Content
        </Container>
      );
      const element = container.querySelector("div");
      expect(element).toHaveClass("max-w-5xl", "px-4", "lg:px-8");
    });

    it("combines all props", () => {
      const { container } = render(
        <Container as="main" size="xl" padding="sm" className="custom" id="main">
          Content
        </Container>
      );
      const element = container.querySelector("main");
      expect(element).toHaveAttribute("id", "main");
      expect(element).toHaveClass("custom", "max-w-screen-2xl", "px-4");
    });

    it("as prop with different size and padding", () => {
      const { container } = render(
        <Container as="section" size="sm" padding="none">
          Content
        </Container>
      );
      const element = container.querySelector("section");
      expect(element).toHaveClass("max-w-3xl", "px-0");
    });
  });

  describe("Real-World Scenarios", () => {
    it("main content container", () => {
      const { container } = render(
        <Container as="main" size="lg" padding="md">
          <h1>Page Title</h1>
          <p>Main content</p>
        </Container>
      );
      const main = container.querySelector("main");
      expect(main).toBeInTheDocument();
      expect(screen.getByText("Page Title")).toBeInTheDocument();
    });

    it("narrow content for reading", () => {
      const { container } = render(
        <Container as="article" size="sm" padding="md">
          <h2>Article Title</h2>
          <p>Article content</p>
        </Container>
      );
      const article = container.querySelector("article");
      expect(article).toHaveClass("max-w-3xl");
    });

    it("full-width hero section", () => {
      const { container } = render(
        <Container as="section" size="full" padding="lg">
          <div>Hero content</div>
        </Container>
      );
      const section = container.querySelector("section");
      expect(section).toHaveClass("max-w-full");
    });

    it("header container", () => {
      const { container } = render(
        <Container as="header" size="xl" padding="md">
          <nav>Navigation</nav>
        </Container>
      );
      const header = container.querySelector("header");
      expect(header).toBeInTheDocument();
      expect(screen.getByText("Navigation")).toBeInTheDocument();
    });

    it("footer container", () => {
      const { container } = render(
        <Container as="footer" size="lg" padding="lg">
          <p>Copyright</p>
        </Container>
      );
      const footer = container.querySelector("footer");
      expect(footer).toBeInTheDocument();
      expect(screen.getByText("Copyright")).toBeInTheDocument();
    });

    it("sidebar container", () => {
      const { container } = render(
        <Container as="aside" size="sm" padding="sm">
          <h3>Sidebar</h3>
        </Container>
      );
      const aside = container.querySelector("aside");
      expect(aside).toHaveClass("max-w-3xl");
    });

    it("content without padding", () => {
      const { container } = render(
        <Container padding="none">
          <img src="/full-width.jpg" alt="Full width" />
        </Container>
      );
      const element = container.querySelector("div");
      expect(element).toHaveClass("px-0");
    });

    it("extra large landing page container", () => {
      const { container } = render(
        <Container size="xl" padding="lg">
          <h1>Welcome</h1>
        </Container>
      );
      const element = container.querySelector("div");
      expect(element).toHaveClass("max-w-screen-2xl");
    });
  });

  describe("Responsive Behavior", () => {
    it("padding scales responsively", () => {
      const { container } = render(<Container padding="md">Content</Container>);
      const element = container.querySelector("div");
      expect(element).toHaveClass("px-4", "sm:px-6");
    });

    it("lg padding has three breakpoints", () => {
      const { container } = render(<Container padding="lg">Content</Container>);
      const element = container.querySelector("div");
      expect(element).toHaveClass("px-4", "sm:px-6", "lg:px-8");
    });

    it("max-width constrains at all sizes", () => {
      const { container } = render(<Container size="lg">Content</Container>);
      const element = container.querySelector("div");
      expect(element).toHaveClass("max-w-7xl");
    });
  });

  describe("Layout Structure", () => {
    it("content is directly inside container", () => {
      const { container } = render(<Container>Test Content</Container>);
      const element = container.querySelector("div");
      expect(element?.textContent).toBe("Test Content");
    });

    it("supports nested elements", () => {
      render(
        <Container>
          <div>
            <h1>Title</h1>
            <p>Content</p>
          </div>
        </Container>
      );
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("supports multiple direct children", () => {
      render(
        <Container>
          <h1>Heading</h1>
          <p>Paragraph</p>
          <button>Button</button>
        </Container>
      );
      expect(screen.getByText("Heading")).toBeInTheDocument();
      expect(screen.getByText("Paragraph")).toBeInTheDocument();
      expect(screen.getByText("Button")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("uses semantic HTML with as prop", () => {
      const { container } = render(<Container as="main">Content</Container>);
      const main = container.querySelector("main");
      expect(main).toBeInTheDocument();
    });

    it("supports aria attributes", () => {
      const { container } = render(
        <Container aria-labelledby="section-title">
          <h2 id="section-title">Title</h2>
        </Container>
      );
      const element = container.querySelector('[aria-labelledby="section-title"]');
      expect(element).toBeInTheDocument();
    });

    it("supports role attribute", () => {
      const { container } = render(
        <Container role="region" aria-label="Content area">
          Content
        </Container>
      );
      const element = container.querySelector('[role="region"]');
      expect(element).toHaveAttribute("aria-label", "Content area");
    });

    it("landmark elements provide structure", () => {
      render(
        <>
          <Container as="header">Header</Container>
          <Container as="main">Main</Container>
          <Container as="footer">Footer</Container>
        </>
      );
      expect(document.querySelector("header")).toBeInTheDocument();
      expect(document.querySelector("main")).toBeInTheDocument();
      expect(document.querySelector("footer")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty children", () => {
      const { container } = render(<Container>{null}</Container>);
      const element = container.querySelector("div");
      expect(element).toBeInTheDocument();
    });

    it("handles null children", () => {
      const { container } = render(<Container>{null}</Container>);
      const element = container.querySelector("div");
      expect(element).toBeInTheDocument();
    });

    it("handles undefined children", () => {
      const { container } = render(<Container>{undefined}</Container>);
      const element = container.querySelector("div");
      expect(element).toBeInTheDocument();
    });

    it("handles JSX children", () => {
      render(
        <Container>
          <span>First</span>
          <span>Second</span>
        </Container>
      );
      expect(screen.getByText("First")).toBeInTheDocument();
      expect(screen.getByText("Second")).toBeInTheDocument();
    });

    it("handles deeply nested content", () => {
      render(
        <Container>
          <div>
            <div>
              <div>
                <p>Deep content</p>
              </div>
            </div>
          </div>
        </Container>
      );
      expect(screen.getByText("Deep content")).toBeInTheDocument();
    });

    it("handles fragments", () => {
      render(
        <Container>
          <>
            <span>A</span>
            <span>B</span>
          </>
        </Container>
      );
      expect(screen.getByText("A")).toBeInTheDocument();
      expect(screen.getByText("B")).toBeInTheDocument();
    });
  });

  describe("TypeScript Props", () => {
    it("accepts generic div props", () => {
      const { container } = render(
        <Container onClick={() => {}} title="Container Title">
          Content
        </Container>
      );
      const element = container.querySelector("div");
      expect(element).toHaveAttribute("title", "Container Title");
    });

    it("accepts section-specific props when as=section", () => {
      const { container } = render(
        <Container as="section" id="main-section">
          Content
        </Container>
      );
      const section = container.querySelector("section");
      expect(section).toHaveAttribute("id", "main-section");
    });

    it("accepts nav-specific props when as=nav", () => {
      const { container } = render(
        <Container as="nav" aria-label="Main navigation">
          Content
        </Container>
      );
      const nav = container.querySelector("nav");
      expect(nav).toHaveAttribute("aria-label", "Main navigation");
    });
  });

  describe("Centering and Width", () => {
    it("is always centered horizontally", () => {
      const { container } = render(<Container>Content</Container>);
      const element = container.querySelector("div");
      expect(element).toHaveClass("mx-auto");
    });

    it("is always full width within constraints", () => {
      const { container } = render(<Container>Content</Container>);
      const element = container.querySelector("div");
      expect(element).toHaveClass("w-full");
    });

    it("max-width constrains centered element", () => {
      const { container } = render(<Container size="sm">Content</Container>);
      const element = container.querySelector("div");
      expect(element).toHaveClass("mx-auto", "w-full", "max-w-3xl");
    });
  });

  describe("Usage Patterns", () => {
    it("wraps page content", () => {
      render(
        <Container>
          <h1>Page Title</h1>
          <main>
            <article>Article content</article>
          </main>
        </Container>
      );
      expect(screen.getByText("Page Title")).toBeInTheDocument();
      expect(screen.getByText("Article content")).toBeInTheDocument();
    });

    it("constrains wide layouts", () => {
      const { container } = render(
        <Container size="xl">
          <div className="grid grid-cols-3">
            <div>Col 1</div>
            <div>Col 2</div>
            <div>Col 3</div>
          </div>
        </Container>
      );
      const element = container.querySelector(".max-w-screen-2xl");
      expect(element).toBeInTheDocument();
    });

    it("provides consistent padding", () => {
      render(
        <>
          <Container padding="md">
            <p>Section 1</p>
          </Container>
          <Container padding="md">
            <p>Section 2</p>
          </Container>
        </>
      );
      expect(screen.getByText("Section 1")).toBeInTheDocument();
      expect(screen.getByText("Section 2")).toBeInTheDocument();
    });
  });
});
