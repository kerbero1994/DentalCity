import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardGrid, MasonryGrid } from "../card-grid";

describe("CardGrid", () => {
  describe("Basic Rendering", () => {
    it("renders grid container", () => {
      const { container } = render(
        <CardGrid>
          <div>Card 1</div>
        </CardGrid>
      );
      const grid = container.querySelector("div");
      expect(grid).toBeInTheDocument();
    });

    it("renders children", () => {
      render(
        <CardGrid>
          <div>Card 1</div>
          <div>Card 2</div>
        </CardGrid>
      );
      expect(screen.getByText("Card 1")).toBeInTheDocument();
      expect(screen.getByText("Card 2")).toBeInTheDocument();
    });

    it("has grid layout", () => {
      const { container } = render(
        <CardGrid>
          <div>Card</div>
        </CardGrid>
      );
      const grid = container.querySelector(".grid");
      expect(grid).toBeInTheDocument();
    });

    it("has list role by default", () => {
      render(
        <CardGrid>
          <div>Card</div>
        </CardGrid>
      );
      const grid = screen.getByRole("list");
      expect(grid).toBeInTheDocument();
    });
  });

  describe("Column Variants", () => {
    it("applies 1 column layout", () => {
      const { container } = render(
        <CardGrid columns={1}>
          <div>Card</div>
        </CardGrid>
      );
      const grid = container.querySelector(".grid-cols-1");
      expect(grid).toBeInTheDocument();
    });

    it("applies 2 column layout", () => {
      const { container } = render(
        <CardGrid columns={2}>
          <div>Card</div>
        </CardGrid>
      );
      const grid = container.querySelector(".sm\\:grid-cols-2");
      expect(grid).toBeInTheDocument();
    });

    it("applies 3 column layout (default)", () => {
      const { container } = render(
        <CardGrid columns={3}>
          <div>Card</div>
        </CardGrid>
      );
      const grid = container.querySelector(".lg\\:grid-cols-3");
      expect(grid).toBeInTheDocument();
    });

    it("applies 4 column layout", () => {
      const { container } = render(
        <CardGrid columns={4}>
          <div>Card</div>
        </CardGrid>
      );
      const grid = container.querySelector(".lg\\:grid-cols-4");
      expect(grid).toBeInTheDocument();
    });

    it("applies auto column layout", () => {
      const { container } = render(
        <CardGrid columns="auto">
          <div>Card</div>
        </CardGrid>
      );
      const grid = container.querySelector(".grid");
      // The auto-fit class is applied via a complex Tailwind class
      expect(grid?.className).toContain("auto-fit");
    });

    it("uses 3 columns by default", () => {
      const { container } = render(
        <CardGrid>
          <div>Card</div>
        </CardGrid>
      );
      const grid = container.querySelector(".lg\\:grid-cols-3");
      expect(grid).toBeInTheDocument();
    });

    it("2 column is responsive", () => {
      const { container } = render(
        <CardGrid columns={2}>
          <div>Card</div>
        </CardGrid>
      );
      const grid = container.querySelector(".grid-cols-1.sm\\:grid-cols-2");
      expect(grid).toBeInTheDocument();
    });

    it("3 column is responsive", () => {
      const { container } = render(
        <CardGrid columns={3}>
          <div>Card</div>
        </CardGrid>
      );
      const grid = container.querySelector(".grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3");
      expect(grid).toBeInTheDocument();
    });

    it("4 column is responsive", () => {
      const { container } = render(
        <CardGrid columns={4}>
          <div>Card</div>
        </CardGrid>
      );
      const grid = container.querySelector(".grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4");
      expect(grid).toBeInTheDocument();
    });
  });

  describe("Gap Variants", () => {
    it("applies sm gap", () => {
      const { container } = render(
        <CardGrid gap="sm">
          <div>Card</div>
        </CardGrid>
      );
      const grid = container.querySelector(".gap-4");
      expect(grid).toBeInTheDocument();
    });

    it("applies md gap (default)", () => {
      const { container } = render(
        <CardGrid gap="md">
          <div>Card</div>
        </CardGrid>
      );
      const grid = container.querySelector(".gap-6");
      expect(grid).toBeInTheDocument();
    });

    it("applies lg gap", () => {
      const { container } = render(
        <CardGrid gap="lg">
          <div>Card</div>
        </CardGrid>
      );
      const grid = container.querySelector(".gap-8");
      expect(grid).toBeInTheDocument();
    });

    it("applies xl gap", () => {
      const { container } = render(
        <CardGrid gap="xl">
          <div>Card</div>
        </CardGrid>
      );
      const grid = container.querySelector(".gap-10");
      expect(grid).toBeInTheDocument();
    });

    it("uses md gap by default", () => {
      const { container } = render(
        <CardGrid>
          <div>Card</div>
        </CardGrid>
      );
      const grid = container.querySelector(".gap-6");
      expect(grid).toBeInTheDocument();
    });
  });

  describe("Custom Role", () => {
    it("accepts custom role", () => {
      render(
        <CardGrid role="grid">
          <div>Card</div>
        </CardGrid>
      );
      const grid = screen.getByRole("grid");
      expect(grid).toBeInTheDocument();
    });

    it("can use presentation role", () => {
      render(
        <CardGrid role="presentation">
          <div>Card</div>
        </CardGrid>
      );
      const grid = screen.getByRole("presentation");
      expect(grid).toBeInTheDocument();
    });

    it("can use generic role", () => {
      const { container } = render(
        <CardGrid role="">
          <div>Card</div>
        </CardGrid>
      );
      const grid = container.querySelector(".grid");
      expect(grid).toBeInTheDocument();
    });
  });

  describe("Custom ClassName", () => {
    it("accepts custom className", () => {
      const { container } = render(
        <CardGrid className="custom-grid">
          <div>Card</div>
        </CardGrid>
      );
      const grid = container.querySelector(".custom-grid");
      expect(grid).toBeInTheDocument();
    });

    it("merges custom className with variants", () => {
      const { container } = render(
        <CardGrid className="bg-gray-100" columns={3} gap="lg">
          <div>Card</div>
        </CardGrid>
      );
      const grid = container.querySelector(".bg-gray-100.grid.gap-8");
      expect(grid).toBeInTheDocument();
    });
  });

  describe("Combination of Props", () => {
    it("combines columns and gap", () => {
      const { container } = render(
        <CardGrid columns={2} gap="xl">
          <div>Card</div>
        </CardGrid>
      );
      const grid = container.querySelector(".sm\\:grid-cols-2.gap-10");
      expect(grid).toBeInTheDocument();
    });

    it("combines all props", () => {
      const { container } = render(
        <CardGrid columns={4} gap="lg" className="custom" role="list">
          <div>Card</div>
        </CardGrid>
      );
      const grid = screen.getByRole("list");
      expect(grid).toHaveClass("custom", "gap-8");
    });
  });

  describe("Real-World Scenarios", () => {
    it("program cards grid", () => {
      render(
        <CardGrid columns={3} gap="lg">
          <div>Engineering</div>
          <div>Business</div>
          <div>Healthcare</div>
        </CardGrid>
      );
      expect(screen.getByText("Engineering")).toBeInTheDocument();
      expect(screen.getByText("Business")).toBeInTheDocument();
      expect(screen.getByText("Healthcare")).toBeInTheDocument();
    });

    it("feature cards grid", () => {
      render(
        <CardGrid columns={4} gap="md">
          <div>Feature 1</div>
          <div>Feature 2</div>
          <div>Feature 3</div>
          <div>Feature 4</div>
        </CardGrid>
      );
      expect(screen.getAllByText(/Feature/)).toHaveLength(4);
    });

    it("testimonial cards", () => {
      render(
        <CardGrid columns={2} gap="xl">
          <div>Testimonial 1</div>
          <div>Testimonial 2</div>
        </CardGrid>
      );
      expect(screen.getByText("Testimonial 1")).toBeInTheDocument();
      expect(screen.getByText("Testimonial 2")).toBeInTheDocument();
    });

    it("mobile-friendly single column", () => {
      const { container } = render(
        <CardGrid columns={1} gap="sm">
          <div>Mobile Card</div>
        </CardGrid>
      );
      const grid = container.querySelector(".grid-cols-1");
      expect(grid).toBeInTheDocument();
    });

    it("auto-fit responsive grid", () => {
      const { container } = render(
        <CardGrid columns="auto" gap="md">
          <div>Auto 1</div>
          <div>Auto 2</div>
          <div>Auto 3</div>
        </CardGrid>
      );
      const grid = container.querySelector(".grid");
      // The auto-fit class is applied via a complex Tailwind class
      expect(grid?.className).toContain("auto-fit");
    });
  });
});

describe("MasonryGrid", () => {
  describe("Basic Rendering", () => {
    it("renders masonry grid container", () => {
      const { container } = render(
        <MasonryGrid>
          <div>Card 1</div>
        </MasonryGrid>
      );
      const grid = container.querySelector("div");
      expect(grid).toBeInTheDocument();
    });

    it("renders children", () => {
      render(
        <MasonryGrid>
          <div>Card 1</div>
          <div>Card 2</div>
        </MasonryGrid>
      );
      expect(screen.getByText("Card 1")).toBeInTheDocument();
      expect(screen.getByText("Card 2")).toBeInTheDocument();
    });

    it("has grid layout", () => {
      const { container } = render(
        <MasonryGrid>
          <div>Card</div>
        </MasonryGrid>
      );
      const grid = container.querySelector(".grid");
      expect(grid).toBeInTheDocument();
    });

    it("has list role by default", () => {
      render(
        <MasonryGrid>
          <div>Card</div>
        </MasonryGrid>
      );
      const grid = screen.getByRole("list");
      expect(grid).toBeInTheDocument();
    });

    it("has gap spacing", () => {
      const { container } = render(
        <MasonryGrid>
          <div>Card</div>
        </MasonryGrid>
      );
      const grid = container.querySelector(".gap-6");
      expect(grid).toBeInTheDocument();
    });
  });

  describe("Layout Variants", () => {
    it("applies 2-1 layout (default)", () => {
      const { container } = render(
        <MasonryGrid layout="2-1">
          <div>Card 1</div>
          <div>Card 2</div>
        </MasonryGrid>
      );
      const grid = container.querySelector(".lg\\:grid-cols-3");
      expect(grid).toBeInTheDocument();
    });

    it("2-1 layout makes first item span 2 columns", () => {
      const { container } = render(
        <MasonryGrid layout="2-1">
          <div>Featured</div>
          <div>Normal</div>
        </MasonryGrid>
      );
      // First child should span 2 columns
      const grid = container.querySelector(
        '[class*="\\[\\&\\>\\*\\:nth-child\\(1\\)\\]\\:lg\\:col-span-2"]'
      );
      expect(grid).toBeInTheDocument();
    });

    it("applies 1-2 layout", () => {
      const { container } = render(
        <MasonryGrid layout="1-2">
          <div>Card 1</div>
          <div>Card 2</div>
        </MasonryGrid>
      );
      const grid = container.querySelector(".lg\\:grid-cols-3");
      expect(grid).toBeInTheDocument();
    });

    it("1-2 layout makes second item span 2 columns", () => {
      const { container } = render(
        <MasonryGrid layout="1-2">
          <div>Normal</div>
          <div>Featured</div>
        </MasonryGrid>
      );
      // Second child should span 2 columns
      const grid = container.querySelector(
        '[class*="\\[\\&\\>\\*\\:nth-child\\(2\\)\\]\\:lg\\:col-span-2"]'
      );
      expect(grid).toBeInTheDocument();
    });

    it("applies featured layout", () => {
      const { container } = render(
        <MasonryGrid layout="featured">
          <div>Featured 1</div>
          <div>Featured 2</div>
          <div>Normal</div>
        </MasonryGrid>
      );
      const grid = container.querySelector(".lg\\:grid-cols-3");
      expect(grid).toBeInTheDocument();
    });

    it("featured layout makes first two items span full width", () => {
      const { container } = render(
        <MasonryGrid layout="featured">
          <div>Featured 1</div>
          <div>Featured 2</div>
          <div>Normal</div>
        </MasonryGrid>
      );
      // First two items span 3 columns each
      const grid = container.querySelector(
        '[class*="\\[\\&\\>\\*\\:nth-child\\(-n\\+2\\)\\]\\:lg\\:col-span-3"]'
      );
      expect(grid).toBeInTheDocument();
    });

    it("uses 2-1 layout by default", () => {
      const { container } = render(
        <MasonryGrid>
          <div>Card</div>
        </MasonryGrid>
      );
      const grid = container.querySelector(
        '[class*="\\[\\&\\>\\*\\:nth-child\\(1\\)\\]\\:lg\\:col-span-2"]'
      );
      expect(grid).toBeInTheDocument();
    });
  });

  describe("Responsive Behavior", () => {
    it("is single column on mobile", () => {
      const { container } = render(
        <MasonryGrid>
          <div>Card</div>
        </MasonryGrid>
      );
      const grid = container.querySelector(".grid-cols-1");
      expect(grid).toBeInTheDocument();
    });

    it("is two columns on tablet", () => {
      const { container } = render(
        <MasonryGrid>
          <div>Card</div>
        </MasonryGrid>
      );
      const grid = container.querySelector(".sm\\:grid-cols-2");
      expect(grid).toBeInTheDocument();
    });

    it("is three columns on desktop", () => {
      const { container } = render(
        <MasonryGrid>
          <div>Card</div>
        </MasonryGrid>
      );
      const grid = container.querySelector(".lg\\:grid-cols-3");
      expect(grid).toBeInTheDocument();
    });
  });

  describe("Custom Role", () => {
    it("accepts custom role", () => {
      render(
        <MasonryGrid role="grid">
          <div>Card</div>
        </MasonryGrid>
      );
      const grid = screen.getByRole("grid");
      expect(grid).toBeInTheDocument();
    });
  });

  describe("Custom ClassName", () => {
    it("accepts custom className", () => {
      const { container } = render(
        <MasonryGrid className="custom-masonry">
          <div>Card</div>
        </MasonryGrid>
      );
      const grid = container.querySelector(".custom-masonry");
      expect(grid).toBeInTheDocument();
    });

    it("merges custom className with layout", () => {
      const { container } = render(
        <MasonryGrid className="bg-gray-50" layout="featured">
          <div>Card</div>
        </MasonryGrid>
      );
      const grid = container.querySelector(".bg-gray-50.grid");
      expect(grid).toBeInTheDocument();
    });
  });

  describe("Real-World Scenarios", () => {
    it("blog posts with featured article", () => {
      render(
        <MasonryGrid layout="2-1">
          <article>Featured Article</article>
          <article>Regular Post</article>
          <article>Another Post</article>
        </MasonryGrid>
      );
      expect(screen.getByText("Featured Article")).toBeInTheDocument();
      expect(screen.getByText("Regular Post")).toBeInTheDocument();
    });

    it("portfolio with large showcase item", () => {
      render(
        <MasonryGrid layout="1-2">
          <div>Thumbnail</div>
          <div>Large Showcase</div>
          <div>Thumbnail</div>
        </MasonryGrid>
      );
      expect(screen.getByText("Large Showcase")).toBeInTheDocument();
    });

    it("news feed with top stories", () => {
      render(
        <MasonryGrid layout="featured">
          <article>Breaking News 1</article>
          <article>Breaking News 2</article>
          <article>Regular Story 1</article>
          <article>Regular Story 2</article>
          <article>Regular Story 3</article>
        </MasonryGrid>
      );
      expect(screen.getByText("Breaking News 1")).toBeInTheDocument();
      expect(screen.getByText("Breaking News 2")).toBeInTheDocument();
      expect(screen.getAllByText(/Regular Story/)).toHaveLength(3);
    });

    it("image gallery with hero image", () => {
      render(
        <MasonryGrid layout="2-1">
          <figure>Hero Image</figure>
          <figure>Thumbnail 1</figure>
          <figure>Thumbnail 2</figure>
          <figure>Thumbnail 3</figure>
        </MasonryGrid>
      );
      expect(screen.getByText("Hero Image")).toBeInTheDocument();
      expect(screen.getAllByText(/Thumbnail/)).toHaveLength(3);
    });
  });

  describe("Complex Layouts", () => {
    it("handles many items in 2-1 layout", () => {
      render(
        <MasonryGrid layout="2-1">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i}>Item {i + 1}</div>
          ))}
        </MasonryGrid>
      );
      expect(screen.getAllByText(/Item/)).toHaveLength(10);
    });

    it("handles many items in featured layout", () => {
      render(
        <MasonryGrid layout="featured">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i}>Card {i + 1}</div>
          ))}
        </MasonryGrid>
      );
      expect(screen.getAllByText(/Card/)).toHaveLength(8);
    });
  });

  describe("Accessibility", () => {
    it("maintains semantic structure", () => {
      render(
        <MasonryGrid>
          <article>Article 1</article>
          <article>Article 2</article>
        </MasonryGrid>
      );
      const articles = screen.getAllByRole("article");
      expect(articles).toHaveLength(2);
    });

    it("supports list role for screen readers", () => {
      render(
        <MasonryGrid>
          <div>Item 1</div>
          <div>Item 2</div>
        </MasonryGrid>
      );
      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
    });
  });
});

describe("Grid Comparisons", () => {
  it("CardGrid uses uniform columns", () => {
    const { container } = render(
      <CardGrid columns={3}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </CardGrid>
    );
    // All items should have equal width
    const grid = container.querySelector(".lg\\:grid-cols-3");
    expect(grid).toBeInTheDocument();
  });

  it("MasonryGrid uses varied column spans", () => {
    const { container } = render(
      <MasonryGrid layout="2-1">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </MasonryGrid>
    );
    // First item spans 2 columns, others span 1
    const grid = container.querySelector('[class*="col-span"]');
    expect(grid).toBeInTheDocument();
  });

  it("CardGrid is for uniform content", () => {
    render(
      <CardGrid columns={4} gap="md">
        <div>Card</div>
        <div>Card</div>
        <div>Card</div>
        <div>Card</div>
      </CardGrid>
    );
    expect(screen.getAllByText("Card")).toHaveLength(4);
  });

  it("MasonryGrid is for featured content", () => {
    render(
      <MasonryGrid layout="featured">
        <div>Featured</div>
        <div>Featured</div>
        <div>Regular</div>
      </MasonryGrid>
    );
    expect(screen.getAllByText("Featured")).toHaveLength(2);
    expect(screen.getByText("Regular")).toBeInTheDocument();
  });
});
