import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TextContentSectionComponent } from "../TextContentSection";
import type { TextContentSection } from "@/core/types/lib/page-builder";

describe("TextContentSectionComponent", () => {
  describe("Basic Rendering", () => {
    it("renders text content with HTML", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {
          title: "Content Title",
        },
        textContent: {
          body: "<p>This is some content</p>",
        },
      };

      render(<TextContentSectionComponent section={section} />);

      expect(screen.getByText("Content Title")).toBeInTheDocument();
      expect(screen.getByText("This is some content")).toBeInTheDocument();
    });

    it("renders without title", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {},
        textContent: {
          body: "<p>Content without title</p>",
        },
      };

      render(<TextContentSectionComponent section={section} />);

      expect(screen.getByText("Content without title")).toBeInTheDocument();
    });

    it("renders HTML content with dangerouslySetInnerHTML", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {
          title: "Title",
        },
        textContent: {
          body: "<div><p>Paragraph</p><ul><li>Item 1</li><li>Item 2</li></ul></div>",
        },
      };

      const { container } = render(<TextContentSectionComponent section={section} />);

      const contentDiv = container.querySelector(".prose");
      expect(contentDiv).toBeInTheDocument();
      expect(contentDiv?.innerHTML).toContain("<p>Paragraph</p>");
      expect(contentDiv?.innerHTML).toContain("<ul>");
      expect(contentDiv?.innerHTML).toContain("<li>Item 1</li>");
    });
  });

  describe("HTML Content Types", () => {
    it("renders paragraph content", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {},
        textContent: {
          body: "<p>Simple paragraph</p>",
        },
      };

      render(<TextContentSectionComponent section={section} />);

      expect(screen.getByText("Simple paragraph")).toBeInTheDocument();
    });

    it("renders multiple paragraphs", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {},
        textContent: {
          body: "<p>First paragraph</p><p>Second paragraph</p>",
        },
      };

      render(<TextContentSectionComponent section={section} />);

      expect(screen.getByText("First paragraph")).toBeInTheDocument();
      expect(screen.getByText("Second paragraph")).toBeInTheDocument();
    });

    it("renders headings", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {},
        textContent: {
          body: "<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>",
        },
      };

      render(<TextContentSectionComponent section={section} />);

      expect(screen.getByText("Heading 1")).toBeInTheDocument();
      expect(screen.getByText("Heading 2")).toBeInTheDocument();
      expect(screen.getByText("Heading 3")).toBeInTheDocument();
    });

    it("renders lists", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {},
        textContent: {
          body: "<ul><li>Item 1</li><li>Item 2</li></ul>",
        },
      };

      render(<TextContentSectionComponent section={section} />);

      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });

    it("renders ordered lists", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {},
        textContent: {
          body: "<ol><li>First</li><li>Second</li></ol>",
        },
      };

      render(<TextContentSectionComponent section={section} />);

      expect(screen.getByText("First")).toBeInTheDocument();
      expect(screen.getByText("Second")).toBeInTheDocument();
    });

    it("renders links", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {},
        textContent: {
          body: '<p>Visit <a href="https://example.com">our website</a></p>',
        },
      };

      const { container } = render(<TextContentSectionComponent section={section} />);

      const link = container.querySelector("a");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "https://example.com");
      expect(screen.getByText("our website")).toBeInTheDocument();
    });

    it("renders strong/bold text", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {},
        textContent: {
          body: "<p>This is <strong>bold text</strong></p>",
        },
      };

      const { container } = render(<TextContentSectionComponent section={section} />);

      const strong = container.querySelector("strong");
      expect(strong).toBeInTheDocument();
      expect(screen.getByText("bold text")).toBeInTheDocument();
    });

    it("renders emphasized/italic text", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {},
        textContent: {
          body: "<p>This is <em>italic text</em></p>",
        },
      };

      const { container } = render(<TextContentSectionComponent section={section} />);

      const em = container.querySelector("em");
      expect(em).toBeInTheDocument();
      expect(screen.getByText("italic text")).toBeInTheDocument();
    });

    it("renders blockquotes", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {},
        textContent: {
          body: "<blockquote>This is a quote</blockquote>",
        },
      };

      const { container } = render(<TextContentSectionComponent section={section} />);

      const blockquote = container.querySelector("blockquote");
      expect(blockquote).toBeInTheDocument();
      expect(screen.getByText("This is a quote")).toBeInTheDocument();
    });

    it("renders code blocks", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {},
        textContent: {
          body: "<pre><code>const x = 10;</code></pre>",
        },
      };

      const { container } = render(<TextContentSectionComponent section={section} />);

      const code = container.querySelector("code");
      expect(code).toBeInTheDocument();
      expect(screen.getByText("const x = 10;")).toBeInTheDocument();
    });

    it("renders inline code", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {},
        textContent: {
          body: "<p>Use <code>npm install</code> to install</p>",
        },
      };

      const { container } = render(<TextContentSectionComponent section={section} />);

      const code = container.querySelector("code");
      expect(code).toBeInTheDocument();
      expect(screen.getByText("npm install")).toBeInTheDocument();
    });

    it("renders images in content", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {},
        textContent: {
          body: '<p><img src="/image.jpg" alt="Image" /></p>',
        },
      };

      const { container } = render(<TextContentSectionComponent section={section} />);

      const img = container.querySelector("img");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "/image.jpg");
      expect(img).toHaveAttribute("alt", "Image");
    });
  });

  describe("Prose Styling", () => {
    it("applies prose classes", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {},
        textContent: {
          body: "<p>Content</p>",
        },
      };

      const { container } = render(<TextContentSectionComponent section={section} />);

      const proseDiv = container.querySelector(".prose");
      expect(proseDiv).toBeInTheDocument();
      expect(proseDiv).toHaveClass("prose-lg");
      expect(proseDiv).toHaveClass("dark:prose-invert");
      expect(proseDiv).toHaveClass("max-w-none");
    });
  });

  describe("Edge Cases", () => {
    it("renders empty body", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {},
        textContent: {
          body: "",
        },
      };

      const { container } = render(<TextContentSectionComponent section={section} />);

      const proseDiv = container.querySelector(".prose");
      expect(proseDiv).toBeInTheDocument();
      expect(proseDiv?.innerHTML).toBe("");
    });

    it("renders with title and content", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {
          title: "Article Title",
        },
        textContent: {
          body: "<p>Article content goes here</p>",
        },
      };

      render(<TextContentSectionComponent section={section} />);

      expect(screen.getByText("Article Title")).toBeInTheDocument();
      expect(screen.getByText("Article content goes here")).toBeInTheDocument();
    });

    it("renders complex nested HTML", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {},
        textContent: {
          body: `
            <div>
              <h2>Section Title</h2>
              <p>Introduction paragraph</p>
              <ul>
                <li>Point 1</li>
                <li>Point 2</li>
              </ul>
              <p>Conclusion with <strong>bold</strong> and <em>italic</em> text.</p>
            </div>
          `,
        },
      };

      render(<TextContentSectionComponent section={section} />);

      expect(screen.getByText("Section Title")).toBeInTheDocument();
      expect(screen.getByText("Introduction paragraph")).toBeInTheDocument();
      expect(screen.getByText("Point 1")).toBeInTheDocument();
      expect(screen.getByText("Point 2")).toBeInTheDocument();
      expect(screen.getByText("bold")).toBeInTheDocument();
      expect(screen.getByText("italic")).toBeInTheDocument();
    });

    it("handles special characters in HTML", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {},
        textContent: {
          body: "<p>Special chars: &amp; &lt; &gt; &quot;</p>",
        },
      };

      const { container } = render(<TextContentSectionComponent section={section} />);

      expect(container.textContent).toContain('& < > "');
    });

    it("renders table content", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {},
        textContent: {
          body: `
            <table>
              <thead>
                <tr>
                  <th>Header 1</th>
                  <th>Header 2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cell 1</td>
                  <td>Cell 2</td>
                </tr>
              </tbody>
            </table>
          `,
        },
      };

      const { container } = render(<TextContentSectionComponent section={section} />);

      // Table elements are stripped by DOMPurify (not in ALLOWED_TAGS)
      // The text content may or may not be preserved depending on DOMPurify behavior
      const proseDiv = container.querySelector(".prose");
      expect(proseDiv).toBeInTheDocument();
      // At minimum, tbody content should be preserved as text
      expect(container.textContent).toContain("Cell 1");
      expect(container.textContent).toContain("Cell 2");
    });

    it("strips horizontal rules (not allowed by sanitizer)", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {},
        textContent: {
          body: "<p>Before</p><hr /><p>After</p>",
        },
      };

      const { container } = render(<TextContentSectionComponent section={section} />);

      // hr is not in ALLOWED_TAGS so it's stripped
      const hr = container.querySelector("hr");
      expect(hr).not.toBeInTheDocument();
      // But the paragraph content remains
      expect(screen.getByText("Before")).toBeInTheDocument();
      expect(screen.getByText("After")).toBeInTheDocument();
    });

    it("renders nested lists", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {},
        textContent: {
          body: `
            <ul>
              <li>Level 1 Item 1
                <ul>
                  <li>Level 2 Item 1</li>
                  <li>Level 2 Item 2</li>
                </ul>
              </li>
              <li>Level 1 Item 2</li>
            </ul>
          `,
        },
      };

      render(<TextContentSectionComponent section={section} />);

      expect(screen.getByText(/Level 1 Item 1/)).toBeInTheDocument();
      expect(screen.getByText("Level 2 Item 1")).toBeInTheDocument();
      expect(screen.getByText("Level 2 Item 2")).toBeInTheDocument();
      expect(screen.getByText("Level 1 Item 2")).toBeInTheDocument();
    });

    it("renders content with multiple HTML elements", () => {
      const section: TextContentSection = {
        type: "text-content",
        id: "test-section",
        content: {
          title: "Complete Article",
        },
        textContent: {
          body: `
            <h2>Introduction</h2>
            <p>This is the introduction paragraph with <strong>important</strong> information.</p>
            <h3>Main Points</h3>
            <ul>
              <li>First point</li>
              <li>Second point</li>
            </ul>
            <blockquote>A relevant quote from someone important</blockquote>
            <p>More content with a <a href="/link">link</a>.</p>
            <pre><code>Code example here</code></pre>
            <p>Final paragraph.</p>
          `,
        },
      };

      render(<TextContentSectionComponent section={section} />);

      expect(screen.getByText("Complete Article")).toBeInTheDocument();
      expect(screen.getByText("Introduction")).toBeInTheDocument();
      expect(screen.getByText("important")).toBeInTheDocument();
      expect(screen.getByText("Main Points")).toBeInTheDocument();
      expect(screen.getByText("First point")).toBeInTheDocument();
      expect(screen.getByText("A relevant quote from someone important")).toBeInTheDocument();
      expect(screen.getByText("link")).toBeInTheDocument();
      expect(screen.getByText("Code example here")).toBeInTheDocument();
      expect(screen.getByText("Final paragraph.")).toBeInTheDocument();
    });
  });
});
