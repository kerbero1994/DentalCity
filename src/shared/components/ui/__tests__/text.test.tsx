import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Text, Paragraph, Lead, Small, Muted, Code, Kbd } from "../text";

describe("Text", () => {
  describe("Basic Rendering", () => {
    it("renders text content", () => {
      render(<Text>Hello World</Text>);
      expect(screen.getByText("Hello World")).toBeInTheDocument();
    });

    it("renders as p by default", () => {
      const { container } = render(<Text>Text</Text>);
      const element = container.querySelector("p");
      expect(element).toBeInTheDocument();
    });

    it("has base text styles", () => {
      render(<Text>Styled Text</Text>);
      const element = screen.getByText("Styled Text");
      expect(element).toHaveClass("text-base");
    });
  });

  describe("Polymorphic 'as' Prop", () => {
    it("renders as paragraph", () => {
      render(<Text as="p">Paragraph</Text>);
      const element = screen.getByText("Paragraph");
      expect(element.tagName).toBe("P");
    });

    it("renders as div", () => {
      render(<Text as="div">Div Text</Text>);
      const element = screen.getByText("Div Text");
      expect(element.tagName).toBe("DIV");
    });

    it("renders as h1", () => {
      render(<Text as="h1">Heading</Text>);
      const element = screen.getByText("Heading");
      expect(element.tagName).toBe("H1");
    });

    it("renders as h2", () => {
      render(<Text as="h2">Subheading</Text>);
      const element = screen.getByText("Subheading");
      expect(element.tagName).toBe("H2");
    });

    it("renders as h3", () => {
      render(<Text as="h3">Section Title</Text>);
      const element = screen.getByText("Section Title");
      expect(element.tagName).toBe("H3");
    });

    it("renders as label", () => {
      render(<Text as="label">Label Text</Text>);
      const element = screen.getByText("Label Text");
      expect(element.tagName).toBe("LABEL");
    });

    it("renders as strong", () => {
      render(<Text as="strong">Bold Text</Text>);
      const element = screen.getByText("Bold Text");
      expect(element.tagName).toBe("STRONG");
    });

    it("renders as em", () => {
      render(<Text as="em">Italic Text</Text>);
      const element = screen.getByText("Italic Text");
      expect(element.tagName).toBe("EM");
    });

    it("renders as span", () => {
      render(<Text as="span">Span Text</Text>);
      const element = screen.getByText("Span Text");
      expect(element.tagName).toBe("SPAN");
    });
  });

  describe("Size Variants", () => {
    it("applies xs size", () => {
      render(<Text size="xs">Extra Small</Text>);
      const element = screen.getByText("Extra Small");
      expect(element).toHaveClass("text-xs");
    });

    it("applies sm size", () => {
      render(<Text size="sm">Small</Text>);
      const element = screen.getByText("Small");
      expect(element).toHaveClass("text-sm");
    });

    it("applies base size (default)", () => {
      render(<Text size="base">Base</Text>);
      const element = screen.getByText("Base");
      expect(element).toHaveClass("text-base");
    });

    it("applies lg size", () => {
      render(<Text size="lg">Large</Text>);
      const element = screen.getByText("Large");
      expect(element).toHaveClass("text-lg");
    });

    it("applies xl size", () => {
      render(<Text size="xl">Extra Large</Text>);
      const element = screen.getByText("Extra Large");
      expect(element).toHaveClass("text-xl");
    });

    it("applies 2xl size", () => {
      render(<Text size="2xl">2X Large</Text>);
      const element = screen.getByText("2X Large");
      expect(element).toHaveClass("text-2xl");
    });
  });

  describe("Weight Variants", () => {
    it("applies normal weight", () => {
      render(<Text weight="normal">Normal</Text>);
      const element = screen.getByText("Normal");
      expect(element).toHaveClass("font-normal");
    });

    it("applies medium weight", () => {
      render(<Text weight="medium">Medium</Text>);
      const element = screen.getByText("Medium");
      expect(element).toHaveClass("font-medium");
    });

    it("applies semibold weight", () => {
      render(<Text weight="semibold">Semibold</Text>);
      const element = screen.getByText("Semibold");
      expect(element).toHaveClass("font-semibold");
    });

    it("applies bold weight", () => {
      render(<Text weight="bold">Bold</Text>);
      const element = screen.getByText("Bold");
      expect(element).toHaveClass("font-bold");
    });
  });

  describe("Color Variants", () => {
    it("applies default color", () => {
      render(<Text color="default">Default</Text>);
      const element = screen.getByText("Default");
      expect(element).toHaveClass("text-foreground");
    });

    it("applies muted color", () => {
      render(<Text color="muted">Muted</Text>);
      const element = screen.getByText("Muted");
      expect(element).toHaveClass("text-muted-foreground");
    });

    it("applies primary color", () => {
      render(<Text color="primary">Primary</Text>);
      const element = screen.getByText("Primary");
      expect(element).toHaveClass("text-primary");
    });

    it("applies success color", () => {
      render(<Text color="success">Success</Text>);
      const element = screen.getByText("Success");
      expect(element).toHaveClass("text-green-700");
    });

    it("applies warning color", () => {
      render(<Text color="warning">Warning</Text>);
      const element = screen.getByText("Warning");
      expect(element).toHaveClass("text-yellow-700");
    });

    it("applies destructive color", () => {
      render(<Text color="destructive">Error</Text>);
      const element = screen.getByText("Error");
      expect(element).toHaveClass("text-destructive");
    });

    it("applies accent color", () => {
      render(<Text color="accent">Accent</Text>);
      const element = screen.getByText("Accent");
      expect(element).toHaveClass("text-red-700");
    });

    it("applies secondary color", () => {
      render(<Text color="secondary">Secondary</Text>);
      const element = screen.getByText("Secondary");
      expect(element).toHaveClass("text-secondary-foreground");
    });

    it("has dark mode support for success color", () => {
      render(<Text color="success">Text</Text>);
      const element = screen.getByText("Text");
      expect(element.className).toMatch(/dark:text-green-500/);
    });

    it("has dark mode support for warning color", () => {
      render(<Text color="warning">Text</Text>);
      const element = screen.getByText("Text");
      expect(element.className).toMatch(/dark:text-yellow-500/);
    });
  });

  describe("Alignment Variants", () => {
    it("applies left alignment", () => {
      render(<Text align="left">Left</Text>);
      const element = screen.getByText("Left");
      expect(element).toHaveClass("text-left");
    });

    it("applies center alignment", () => {
      render(<Text align="center">Center</Text>);
      const element = screen.getByText("Center");
      expect(element).toHaveClass("text-center");
    });

    it("applies right alignment", () => {
      render(<Text align="right">Right</Text>);
      const element = screen.getByText("Right");
      expect(element).toHaveClass("text-right");
    });

    it("applies justify alignment", () => {
      render(<Text align="justify">Justify</Text>);
      const element = screen.getByText("Justify");
      expect(element).toHaveClass("text-justify");
    });
  });

  describe("Line Clamping", () => {
    it("applies 1 line clamp", () => {
      render(<Text lineClamp={1}>Single Line</Text>);
      const element = screen.getByText("Single Line");
      expect(element).toHaveClass("line-clamp-1");
    });

    it("applies 2 line clamp", () => {
      render(<Text lineClamp={2}>Two Lines</Text>);
      const element = screen.getByText("Two Lines");
      expect(element).toHaveClass("line-clamp-2");
    });

    it("applies 3 line clamp", () => {
      render(<Text lineClamp={3}>Three Lines</Text>);
      const element = screen.getByText("Three Lines");
      expect(element).toHaveClass("line-clamp-3");
    });

    it("applies 4 line clamp", () => {
      render(<Text lineClamp={4}>Four Lines</Text>);
      const element = screen.getByText("Four Lines");
      expect(element).toHaveClass("line-clamp-4");
    });

    it("applies none line clamp", () => {
      render(<Text lineClamp="none">No Clamp</Text>);
      const element = screen.getByText("No Clamp");
      expect(element).not.toHaveClass("line-clamp-1");
    });
  });

  describe("Truncate", () => {
    it("applies truncate", () => {
      render(<Text truncate>Truncated Text</Text>);
      const element = screen.getByText("Truncated Text");
      expect(element).toHaveClass("truncate");
    });

    it("does not apply truncate by default", () => {
      render(<Text>Not Truncated</Text>);
      const element = screen.getByText("Not Truncated");
      expect(element).not.toHaveClass("truncate");
    });
  });

  describe("Text Transform", () => {
    it("applies uppercase transform", () => {
      render(<Text transform="uppercase">Uppercase</Text>);
      const element = screen.getByText("Uppercase");
      expect(element).toHaveClass("uppercase");
    });

    it("applies lowercase transform", () => {
      render(<Text transform="lowercase">Lowercase</Text>);
      const element = screen.getByText("Lowercase");
      expect(element).toHaveClass("lowercase");
    });

    it("applies capitalize transform", () => {
      render(<Text transform="capitalize">Capitalize</Text>);
      const element = screen.getByText("Capitalize");
      expect(element).toHaveClass("capitalize");
    });

    it("applies normal-case transform", () => {
      render(<Text transform="none">Normal Case</Text>);
      const element = screen.getByText("Normal Case");
      expect(element).toHaveClass("normal-case");
    });

    it("no transform by default", () => {
      render(<Text>No Transform</Text>);
      const element = screen.getByText("No Transform");
      expect(element).not.toHaveClass("uppercase");
      expect(element).not.toHaveClass("lowercase");
    });
  });

  describe("Custom ClassName", () => {
    it("accepts custom className", () => {
      render(<Text className="custom-class">Custom</Text>);
      const element = screen.getByText("Custom");
      expect(element).toHaveClass("custom-class");
    });

    it("merges custom className with variants", () => {
      render(
        <Text className="custom-margin" size="lg" weight="bold">
          Merged
        </Text>
      );
      const element = screen.getByText("Merged");
      expect(element).toHaveClass("custom-margin", "text-lg", "font-bold");
    });
  });

  describe("Combination of Variants", () => {
    it("combines size and weight", () => {
      render(
        <Text size="xl" weight="bold">
          Combined
        </Text>
      );
      const element = screen.getByText("Combined");
      expect(element).toHaveClass("text-xl", "font-bold");
    });

    it("combines size, weight, and color", () => {
      render(
        <Text size="lg" weight="semibold" color="primary">
          Triple
        </Text>
      );
      const element = screen.getByText("Triple");
      expect(element).toHaveClass("text-lg", "font-semibold", "text-primary");
    });

    it("combines all variants", () => {
      render(
        <Text size="2xl" weight="bold" color="primary" align="center" transform="uppercase">
          All Variants
        </Text>
      );
      const element = screen.getByText("All Variants");
      expect(element).toHaveClass("text-2xl", "font-bold", "text-primary", "text-center", "uppercase");
    });

    it("combines lineClamp with other variants", () => {
      render(
        <Text size="lg" color="muted" lineClamp={2}>
          Clamped
        </Text>
      );
      const element = screen.getByText("Clamped");
      expect(element).toHaveClass("text-lg", "text-muted-foreground", "line-clamp-2");
    });
  });

  describe("Paragraph Component", () => {
    it("renders as p tag", () => {
      render(<Paragraph>Paragraph text</Paragraph>);
      const element = screen.getByText("Paragraph text");
      expect(element.tagName).toBe("P");
    });

    it("has paragraph styling", () => {
      render(<Paragraph>Paragraph</Paragraph>);
      const element = screen.getByText("Paragraph");
      expect(element).toHaveClass("text-base", "leading-7");
    });

    it("accepts additional props", () => {
      render(
        <Paragraph className="custom-paragraph" color="muted">
          Custom
        </Paragraph>
      );
      const element = screen.getByText("Custom");
      expect(element).toHaveClass("custom-paragraph", "text-muted-foreground");
    });
  });

  describe("Lead Component", () => {
    it("renders as p tag", () => {
      render(<Lead>Lead text</Lead>);
      const element = screen.getByText("Lead text");
      expect(element.tagName).toBe("P");
    });

    it("has lead styling", () => {
      render(<Lead>Lead</Lead>);
      const element = screen.getByText("Lead");
      expect(element).toHaveClass("text-lg", "text-muted-foreground", "leading-relaxed");
    });

    it("accepts custom className", () => {
      render(<Lead className="custom-lead">Custom Lead</Lead>);
      const element = screen.getByText("Custom Lead");
      expect(element).toHaveClass("custom-lead", "text-lg");
    });
  });

  describe("Small Component", () => {
    it("renders as small tag", () => {
      render(<Small>Small text</Small>);
      const element = screen.getByText("Small text");
      expect(element.tagName).toBe("SMALL");
    });

    it("has small styling", () => {
      render(<Small>Small</Small>);
      const element = screen.getByText("Small");
      expect(element).toHaveClass("text-sm", "leading-none");
    });

    it("accepts custom className", () => {
      render(<Small className="custom-small">Custom Small</Small>);
      const element = screen.getByText("Custom Small");
      expect(element).toHaveClass("custom-small", "text-sm");
    });
  });

  describe("Muted Component", () => {
    it("renders as p tag", () => {
      render(<Muted>Muted text</Muted>);
      const element = screen.getByText("Muted text");
      expect(element.tagName).toBe("P");
    });

    it("has muted styling", () => {
      render(<Muted>Muted</Muted>);
      const element = screen.getByText("Muted");
      expect(element).toHaveClass("text-sm", "text-muted-foreground");
    });

    it("accepts custom className", () => {
      render(<Muted className="custom-muted">Custom Muted</Muted>);
      const element = screen.getByText("Custom Muted");
      expect(element).toHaveClass("custom-muted", "text-sm");
    });
  });

  describe("Code Component", () => {
    it("renders as code tag", () => {
      render(<Code>const x = 10;</Code>);
      const element = screen.getByText("const x = 10;");
      expect(element.tagName).toBe("CODE");
    });

    it("has code styling", () => {
      render(<Code>code</Code>);
      const element = screen.getByText("code");
      expect(element).toHaveClass("relative", "rounded", "bg-muted", "font-mono", "text-sm", "font-semibold");
    });

    it("accepts custom className", () => {
      render(<Code className="custom-code">Custom Code</Code>);
      const element = screen.getByText("Custom Code");
      expect(element).toHaveClass("custom-code", "font-mono");
    });
  });

  describe("Kbd Component", () => {
    it("renders as kbd tag", () => {
      render(<Kbd>Ctrl</Kbd>);
      const element = screen.getByText("Ctrl");
      expect(element.tagName).toBe("KBD");
    });

    it("has kbd styling", () => {
      render(<Kbd>Ctrl</Kbd>);
      const element = screen.getByText("Ctrl");
      expect(element).toHaveClass("rounded", "border", "bg-muted", "font-mono", "text-muted-foreground");
    });

    it("accepts custom className", () => {
      render(<Kbd className="custom-kbd">Custom Kbd</Kbd>);
      const element = screen.getByText("Custom Kbd");
      expect(element).toHaveClass("custom-kbd", "font-mono");
    });
  });

  describe("Real-World Scenarios", () => {
    it("page title", () => {
      render(
        <Text as="h1" size="2xl" weight="bold" color="default">
          Page Title
        </Text>
      );
      const element = screen.getByText("Page Title");
      expect(element.tagName).toBe("H1");
      expect(element).toHaveClass("text-2xl", "font-bold");
    });

    it("section heading", () => {
      render(
        <Text as="h2" size="2xl" weight="semibold" color="default">
          Section Heading
        </Text>
      );
      const element = screen.getByText("Section Heading");
      expect(element.tagName).toBe("H2");
      expect(element).toHaveClass("text-2xl", "font-semibold");
    });

    it("body paragraph", () => {
      render(<Paragraph>This is a regular paragraph with some body text content.</Paragraph>);
      const element = screen.getByText("This is a regular paragraph with some body text content.");
      expect(element.tagName).toBe("P");
    });

    it("lead paragraph", () => {
      render(<Lead>This is an introductory lead paragraph.</Lead>);
      const element = screen.getByText("This is an introductory lead paragraph.");
      expect(element).toHaveClass("text-lg");
    });

    it("error message", () => {
      render(
        <Text size="sm" color="destructive" weight="medium">
          Error: Invalid input
        </Text>
      );
      const element = screen.getByText("Error: Invalid input");
      expect(element).toHaveClass("text-sm", "text-destructive", "font-medium");
    });

    it("success message", () => {
      render(
        <Text size="sm" color="success" weight="medium">
          Success! Changes saved
        </Text>
      );
      const element = screen.getByText("Success! Changes saved");
      expect(element).toHaveClass("text-sm", "text-green-700", "font-medium");
    });

    it("inline code snippet", () => {
      render(
        <p>
          Use the <Code>npm install</Code> command to install.
        </p>
      );
      const code = screen.getByText("npm install");
      expect(code.tagName).toBe("CODE");
      expect(code).toHaveClass("font-mono");
    });

    it("keyboard shortcut", () => {
      render(
        <p>
          Press <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd> to copy
        </p>
      );
      const ctrl = screen.getByText("Ctrl");
      const c = screen.getByText("C");
      expect(ctrl.tagName).toBe("KBD");
      expect(c.tagName).toBe("KBD");
    });

    it("truncated card title", () => {
      render(
        <Text as="h3" size="lg" weight="semibold" truncate className="max-w-xs">
          This is a very long title that should be truncated
        </Text>
      );
      const element = screen.getByText("This is a very long title that should be truncated");
      expect(element).toHaveClass("truncate");
    });

    it("clamped description", () => {
      render(
        <Text size="sm" color="muted" lineClamp={3}>
          This is a long description that will be clamped to three lines maximum to prevent the card
          from becoming too tall.
        </Text>
      );
      const element = screen.getByText(/This is a long description/);
      expect(element).toHaveClass("line-clamp-3");
    });

    it("centered heading", () => {
      render(
        <Text as="h2" size="2xl" weight="bold" align="center">
          Centered Title
        </Text>
      );
      const element = screen.getByText("Centered Title");
      expect(element).toHaveClass("text-center");
    });

    it("uppercase label", () => {
      render(
        <Text size="xs" weight="semibold" transform="uppercase" color="muted">
          Category
        </Text>
      );
      const element = screen.getByText("Category");
      expect(element).toHaveClass("uppercase", "text-xs");
    });
  });

  describe("Accessibility", () => {
    it("uses semantic HTML for headings", () => {
      render(<Text as="h1">Heading</Text>);
      const element = screen.getByText("Heading");
      expect(element.tagName).toBe("H1");
    });

    it("uses semantic HTML for paragraphs", () => {
      render(<Paragraph>Paragraph</Paragraph>);
      const element = screen.getByText("Paragraph");
      expect(element.tagName).toBe("P");
    });

    it("uses semantic HTML for code", () => {
      render(<Code>code</Code>);
      const element = screen.getByText("code");
      expect(element.tagName).toBe("CODE");
    });

    it("uses semantic HTML for keyboard shortcuts", () => {
      render(<Kbd>key</Kbd>);
      const element = screen.getByText("key");
      expect(element.tagName).toBe("KBD");
    });

    it("supports aria attributes", () => {
      render(<Text aria-label="Description">Text</Text>);
      const element = screen.getByText("Text");
      expect(element).toHaveAttribute("aria-label", "Description");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty children", () => {
      render(<Text>{null}</Text>);
      const { container } = render(<Text>Test Text</Text>);
      expect(container.querySelector("p")).toBeInTheDocument();
    });

    it("handles very long text", () => {
      const longText = "a".repeat(500);
      render(<Text>{longText}</Text>);
      const element = screen.getByText(longText);
      expect(element).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<Text>{"<>&\"'"}</Text>);
      expect(screen.getByText("<>&\"'")).toBeInTheDocument();
    });

    it("handles JSX children", () => {
      render(
        <Text>
          Hello <strong>world</strong>
        </Text>
      );
      expect(screen.getByText(/Hello/)).toBeInTheDocument();
      expect(screen.getByText("world")).toBeInTheDocument();
    });

    it("handles multiple children", () => {
      render(
        <Text>
          First <Code>code</Code> Last
        </Text>
      );
      expect(screen.getByText(/First/)).toBeInTheDocument();
      expect(screen.getByText("code")).toBeInTheDocument();
      expect(screen.getByText(/Last/)).toBeInTheDocument();
    });
  });

  describe("TypeScript Props", () => {
    it("accepts all HTML attributes", () => {
      render(
        <Text id="text-id" data-testid="custom-text" title="Tooltip">
          Text
        </Text>
      );
      const element = screen.getByTitle("Tooltip");
      expect(element).toHaveAttribute("id", "text-id");
      expect(element).toHaveAttribute("data-testid", "custom-text");
    });

    it("Paragraph accepts p attributes", () => {
      render(<Paragraph id="para-id">Paragraph</Paragraph>);
      const element = screen.getByText("Paragraph");
      expect(element).toHaveAttribute("id", "para-id");
    });

    it("Code accepts code attributes", () => {
      render(<Code id="code-id">code</Code>);
      const element = screen.getByText("code");
      expect(element).toHaveAttribute("id", "code-id");
    });
  });
});
