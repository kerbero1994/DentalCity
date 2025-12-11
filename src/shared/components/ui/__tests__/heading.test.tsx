import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Heading, HeadingWithAccent } from "../heading";

describe("Heading", () => {
  describe("Basic Rendering", () => {
    it("renders heading text", () => {
      render(<Heading>Test Heading</Heading>);
      expect(screen.getByText("Test Heading")).toBeInTheDocument();
    });

    it("renders as h2 by default", () => {
      render(<Heading>Default</Heading>);
      const heading = screen.getByText("Default");
      expect(heading.tagName).toBe("H2");
    });

    it("has bold font weight by default", () => {
      render(<Heading>Bold</Heading>);
      const heading = screen.getByText("Bold");
      expect(heading).toHaveClass("font-bold");
    });

    it("has tracking-tight by default", () => {
      render(<Heading>Tracked</Heading>);
      const heading = screen.getByText("Tracked");
      expect(heading).toHaveClass("tracking-tight");
    });
  });

  describe("Level Variants", () => {
    it("renders as h1 with level prop", () => {
      render(<Heading level="h1">H1 Heading</Heading>);
      const heading = screen.getByText("H1 Heading");
      expect(heading.tagName).toBe("H1");
    });

    it("renders as h3 with level prop", () => {
      render(<Heading level="h3">H3 Heading</Heading>);
      const heading = screen.getByText("H3 Heading");
      expect(heading.tagName).toBe("H3");
    });

    it("renders as h4 with level prop", () => {
      render(<Heading level="h4">H4 Heading</Heading>);
      const heading = screen.getByText("H4 Heading");
      expect(heading.tagName).toBe("H4");
    });

    it("renders as h5 with level prop", () => {
      render(<Heading level="h5">H5 Heading</Heading>);
      const heading = screen.getByText("H5 Heading");
      expect(heading.tagName).toBe("H5");
    });

    it("renders as h6 with level prop", () => {
      render(<Heading level="h6">H6 Heading</Heading>);
      const heading = screen.getByText("H6 Heading");
      expect(heading.tagName).toBe("H6");
    });

    it("h1 has correct responsive sizes", () => {
      render(<Heading level="h1">H1</Heading>);
      const heading = screen.getByText("H1");
      expect(heading).toHaveClass("text-4xl", "sm:text-5xl", "lg:text-6xl");
    });

    it("h2 has correct responsive sizes", () => {
      render(<Heading level="h2">H2</Heading>);
      const heading = screen.getByText("H2");
      expect(heading).toHaveClass("text-3xl", "sm:text-4xl", "lg:text-5xl");
    });

    it("h3 has correct responsive sizes", () => {
      render(<Heading level="h3">H3</Heading>);
      const heading = screen.getByText("H3");
      expect(heading).toHaveClass("text-2xl", "sm:text-3xl", "lg:text-4xl");
    });

    it("h4 has correct responsive sizes", () => {
      render(<Heading level="h4">H4</Heading>);
      const heading = screen.getByText("H4");
      expect(heading).toHaveClass("text-xl", "sm:text-2xl", "lg:text-3xl");
    });

    it("h5 has correct responsive sizes", () => {
      render(<Heading level="h5">H5</Heading>);
      const heading = screen.getByText("H5");
      expect(heading).toHaveClass("text-lg", "sm:text-xl");
    });

    it("h6 has correct responsive sizes", () => {
      render(<Heading level="h6">H6</Heading>);
      const heading = screen.getByText("H6");
      expect(heading).toHaveClass("text-base", "sm:text-lg");
    });
  });

  describe("'as' Prop Override", () => {
    it("renders as h1 with as prop", () => {
      render(<Heading as="h1">As H1</Heading>);
      const heading = screen.getByText("As H1");
      expect(heading.tagName).toBe("H1");
    });

    it("renders as h3 with as prop", () => {
      render(<Heading as="h3">As H3</Heading>);
      const heading = screen.getByText("As H3");
      expect(heading.tagName).toBe("H3");
    });

    it("as prop takes precedence over level", () => {
      render(
        <Heading as="h1" level="h3">
          Override
        </Heading>
      );
      const heading = screen.getByText("Override");
      expect(heading.tagName).toBe("H1");
    });
  });

  describe("Weight Variants", () => {
    it("applies normal weight", () => {
      render(<Heading weight="normal">Normal</Heading>);
      const heading = screen.getByText("Normal");
      expect(heading).toHaveClass("font-normal");
    });

    it("applies medium weight", () => {
      render(<Heading weight="medium">Medium</Heading>);
      const heading = screen.getByText("Medium");
      expect(heading).toHaveClass("font-medium");
    });

    it("applies semibold weight", () => {
      render(<Heading weight="semibold">Semibold</Heading>);
      const heading = screen.getByText("Semibold");
      expect(heading).toHaveClass("font-semibold");
    });

    it("applies bold weight", () => {
      render(<Heading weight="bold">Bold</Heading>);
      const heading = screen.getByText("Bold");
      expect(heading).toHaveClass("font-bold");
    });

    it("applies extrabold weight", () => {
      render(<Heading weight="extrabold">Extrabold</Heading>);
      const heading = screen.getByText("Extrabold");
      expect(heading).toHaveClass("font-extrabold");
    });
  });

  describe("Alignment Variants", () => {
    it("applies left alignment (default)", () => {
      render(<Heading align="left">Left</Heading>);
      const heading = screen.getByText("Left");
      expect(heading).toHaveClass("text-left");
    });

    it("applies center alignment", () => {
      render(<Heading align="center">Center</Heading>);
      const heading = screen.getByText("Center");
      expect(heading).toHaveClass("text-center");
    });

    it("applies right alignment", () => {
      render(<Heading align="right">Right</Heading>);
      const heading = screen.getByText("Right");
      expect(heading).toHaveClass("text-right");
    });
  });

  describe("Color Variants", () => {
    it("applies default color", () => {
      render(<Heading color="default">Default</Heading>);
      const heading = screen.getByText("Default");
      expect(heading).toHaveClass("text-foreground");
    });

    it("applies muted color", () => {
      render(<Heading color="muted">Muted</Heading>);
      const heading = screen.getByText("Muted");
      expect(heading).toHaveClass("text-muted-foreground");
    });

    it("applies primary color", () => {
      render(<Heading color="primary">Primary</Heading>);
      const heading = screen.getByText("Primary");
      expect(heading).toHaveClass("text-primary");
    });

    it("applies accent color", () => {
      render(<Heading color="accent">Accent</Heading>);
      const heading = screen.getByText("Accent");
      expect(heading).toHaveClass("text-red-700");
    });

    it("accent color has dark mode support", () => {
      render(<Heading color="accent">Accent</Heading>);
      const heading = screen.getByText("Accent");
      expect(heading.className).toMatch(/dark:text-red-500/);
    });
  });

  describe("Gradient Option", () => {
    it("applies gradient when gradient=true", () => {
      render(<Heading gradient>Gradient</Heading>);
      const heading = screen.getByText("Gradient");
      expect(heading).toHaveClass(
        "bg-gradient-to-r",
        "from-primary",
        "to-red-600",
        "bg-clip-text",
        "text-transparent"
      );
    });

    it("no gradient by default", () => {
      render(<Heading>No Gradient</Heading>);
      const heading = screen.getByText("No Gradient");
      expect(heading).not.toHaveClass("bg-gradient-to-r");
    });

    it("gradient=false does not apply gradient", () => {
      render(<Heading gradient={false}>No Gradient</Heading>);
      const heading = screen.getByText("No Gradient");
      expect(heading).not.toHaveClass("bg-gradient-to-r");
    });
  });

  describe("Custom ClassName", () => {
    it("accepts custom className", () => {
      render(<Heading className="custom-class">Custom</Heading>);
      const heading = screen.getByText("Custom");
      expect(heading).toHaveClass("custom-class");
    });

    it("merges custom className with variants", () => {
      render(
        <Heading className="custom-margin" level="h1" weight="extrabold">
          Merged
        </Heading>
      );
      const heading = screen.getByText("Merged");
      expect(heading).toHaveClass("custom-margin", "font-extrabold");
    });
  });

  describe("HTML Attributes", () => {
    it("accepts id attribute", () => {
      render(<Heading id="main-heading">ID Heading</Heading>);
      const heading = screen.getByText("ID Heading");
      expect(heading).toHaveAttribute("id", "main-heading");
    });

    it("accepts aria-label", () => {
      render(<Heading aria-label="Important heading">Heading</Heading>);
      const heading = screen.getByText("Heading");
      expect(heading).toHaveAttribute("aria-label", "Important heading");
    });

    it("accepts data attributes", () => {
      render(<Heading data-testid="test-heading">Data</Heading>);
      const heading = screen.getByTestId("test-heading");
      expect(heading).toBeInTheDocument();
    });
  });

  describe("HeadingWithAccent", () => {
    it("renders heading with accent text", () => {
      render(<HeadingWithAccent accent="!">Main Text</HeadingWithAccent>);
      expect(screen.getByText("Main Text")).toBeInTheDocument();
      expect(screen.getByText("!")).toBeInTheDocument();
    });

    it("accent is rendered as span", () => {
      render(<HeadingWithAccent accent="*">Text</HeadingWithAccent>);
      const accent = screen.getByText("*");
      expect(accent.tagName).toBe("SPAN");
    });

    it("accent has left margin", () => {
      render(<HeadingWithAccent accent=".">Text</HeadingWithAccent>);
      const accent = screen.getByText(".");
      expect(accent).toHaveClass("ml-1");
    });

    it("applies primary accent color by default", () => {
      render(<HeadingWithAccent accent="!">Text</HeadingWithAccent>);
      const accent = screen.getByText("!");
      expect(accent).toHaveClass("text-primary");
    });

    it("applies accent color variant", () => {
      render(
        <HeadingWithAccent accent="!" accentColor="accent">
          Text
        </HeadingWithAccent>
      );
      const accent = screen.getByText("!");
      expect(accent).toHaveClass("text-red-700");
    });

    it("applies destructive accent color", () => {
      render(
        <HeadingWithAccent accent="!" accentColor="destructive">
          Text
        </HeadingWithAccent>
      );
      const accent = screen.getByText("!");
      expect(accent).toHaveClass("text-destructive");
    });

    it("accent color has dark mode support", () => {
      render(
        <HeadingWithAccent accent="!" accentColor="accent">
          Text
        </HeadingWithAccent>
      );
      const accent = screen.getByText("!");
      expect(accent.className).toMatch(/dark:text-red-500/);
    });

    it("renders without accent when not provided", () => {
      render(<HeadingWithAccent>Just Text</HeadingWithAccent>);
      expect(screen.getByText("Just Text")).toBeInTheDocument();
    });

    it("accepts all Heading props", () => {
      render(
        <HeadingWithAccent level="h1" weight="extrabold" align="center" accent="!">
          Props Test
        </HeadingWithAccent>
      );
      const heading = screen.getByText("Props Test");
      expect(heading.tagName).toBe("H1");
      expect(heading).toHaveClass("font-extrabold", "text-center");
    });

    it("accepts custom className", () => {
      render(
        <HeadingWithAccent className="custom-heading" accent=".">
          Custom
        </HeadingWithAccent>
      );
      const heading = screen.getByText("Custom");
      expect(heading).toHaveClass("custom-heading");
    });

    it("supports ReactNode as accent", () => {
      render(
        <HeadingWithAccent accent={<span className="emoji">🎉</span>}>
          Celebration
        </HeadingWithAccent>
      );
      expect(screen.getByText("🎉")).toBeInTheDocument();
    });
  });

  describe("Real-World Scenarios", () => {
    it("page hero heading", () => {
      render(
        <Heading level="h1" weight="extrabold" align="center" gradient>
          Welcome to SITIMM
        </Heading>
      );
      const heading = screen.getByText("Welcome to SITIMM");
      expect(heading.tagName).toBe("H1");
      expect(heading).toHaveClass("font-extrabold", "text-center", "bg-gradient-to-r");
    });

    it("section heading", () => {
      render(
        <Heading level="h2" weight="bold">
          Our Programs
        </Heading>
      );
      const heading = screen.getByText("Our Programs");
      expect(heading.tagName).toBe("H2");
      expect(heading).toHaveClass("font-bold");
    });

    it("subsection heading", () => {
      render(
        <Heading level="h3" weight="semibold" color="muted">
          Key Features
        </Heading>
      );
      const heading = screen.getByText("Key Features");
      expect(heading.tagName).toBe("H3");
      expect(heading).toHaveClass("font-semibold", "text-muted-foreground");
    });

    it("card title", () => {
      render(
        <Heading level="h4" weight="bold">
          Engineering Program
        </Heading>
      );
      const heading = screen.getByText("Engineering Program");
      expect(heading.tagName).toBe("H4");
    });

    it("heading with accent for emphasis", () => {
      render(
        <HeadingWithAccent level="h2" accent="." accentColor="primary">
          Why Choose Us
        </HeadingWithAccent>
      );
      expect(screen.getByText("Why Choose Us")).toBeInTheDocument();
      expect(screen.getByText(".")).toHaveClass("text-primary");
    });

    it("centered gradient heading", () => {
      render(
        <Heading level="h1" align="center" gradient>
          Transform Your Future
        </Heading>
      );
      const heading = screen.getByText("Transform Your Future");
      expect(heading).toHaveClass("text-center", "bg-gradient-to-r");
    });

    it("semantic SEO heading with custom element", () => {
      render(
        <Heading as="h1" level="h2">
          Visually H2, Semantically H1
        </Heading>
      );
      const heading = screen.getByText("Visually H2, Semantically H1");
      expect(heading.tagName).toBe("H1");
      expect(heading).toHaveClass("text-3xl");
    });
  });

  describe("Combination of Variants", () => {
    it("combines level, weight, and color", () => {
      render(
        <Heading level="h1" weight="extrabold" color="primary">
          Combined
        </Heading>
      );
      const heading = screen.getByText("Combined");
      expect(heading).toHaveClass("font-extrabold", "text-primary");
    });

    it("combines all variants", () => {
      render(
        <Heading level="h2" weight="bold" align="center" color="accent">
          All Variants
        </Heading>
      );
      const heading = screen.getByText("All Variants");
      expect(heading).toHaveClass("font-bold", "text-center", "text-red-700");
    });

    it("gradient with other variants", () => {
      render(
        <Heading level="h1" weight="extrabold" align="center" gradient>
          Gradient Combined
        </Heading>
      );
      const heading = screen.getByText("Gradient Combined");
      expect(heading).toHaveClass("font-extrabold", "text-center", "bg-gradient-to-r");
    });
  });

  describe("Accessibility", () => {
    it("uses semantic HTML headings", () => {
      render(<Heading level="h1">Accessible</Heading>);
      const heading = screen.getByText("Accessible");
      expect(heading.tagName).toBe("H1");
    });

    it("supports aria-labelledby", () => {
      render(
        <Heading aria-labelledby="section-id" id="heading-id">
          Heading
        </Heading>
      );
      const heading = screen.getByText("Heading");
      expect(heading).toHaveAttribute("aria-labelledby", "section-id");
      expect(heading).toHaveAttribute("id", "heading-id");
    });

    it("maintains heading hierarchy", () => {
      render(
        <>
          <Heading level="h1">Main Title</Heading>
          <Heading level="h2">Section Title</Heading>
          <Heading level="h3">Subsection Title</Heading>
        </>
      );
      expect(screen.getByText("Main Title").tagName).toBe("H1");
      expect(screen.getByText("Section Title").tagName).toBe("H2");
      expect(screen.getByText("Subsection Title").tagName).toBe("H3");
    });
  });

  describe("Responsive Behavior", () => {
    it("h1 scales responsively", () => {
      render(<Heading level="h1">Responsive</Heading>);
      const heading = screen.getByText("Responsive");
      expect(heading).toHaveClass("text-4xl", "sm:text-5xl", "lg:text-6xl");
    });

    it("h3 scales responsively", () => {
      render(<Heading level="h3">Responsive</Heading>);
      const heading = screen.getByText("Responsive");
      expect(heading).toHaveClass("text-2xl", "sm:text-3xl", "lg:text-4xl");
    });

    it("h5 scales responsively", () => {
      render(<Heading level="h5">Responsive</Heading>);
      const heading = screen.getByText("Responsive");
      expect(heading).toHaveClass("text-lg", "sm:text-xl");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty children", () => {
      const { container } = render(<Heading>{null}</Heading>);
      const heading = container.querySelector("h2");
      expect(heading).toBeInTheDocument();
    });

    it("handles very long text", () => {
      const longText = "A".repeat(200);
      render(<Heading>{longText}</Heading>);
      const heading = screen.getByText(longText);
      expect(heading).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<Heading>{"<>&\"' Special"}</Heading>);
      expect(screen.getByText("<>&\"' Special")).toBeInTheDocument();
    });

    it("handles JSX children", () => {
      render(
        <Heading>
          Main <strong>Bold</strong> Text
        </Heading>
      );
      expect(screen.getByText(/Main/)).toBeInTheDocument();
      expect(screen.getByText("Bold")).toBeInTheDocument();
    });

    it("HeadingWithAccent handles empty accent gracefully", () => {
      render(<HeadingWithAccent accent="">Text</HeadingWithAccent>);
      expect(screen.getByText("Text")).toBeInTheDocument();
    });

    it("HeadingWithAccent handles null accent", () => {
      render(<HeadingWithAccent accent={null}>Text</HeadingWithAccent>);
      expect(screen.getByText("Text")).toBeInTheDocument();
    });

    it("HeadingWithAccent handles undefined accent", () => {
      render(<HeadingWithAccent>Text</HeadingWithAccent>);
      expect(screen.getByText("Text")).toBeInTheDocument();
    });
  });
});
