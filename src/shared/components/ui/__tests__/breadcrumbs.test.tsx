import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Breadcrumbs, type BreadcrumbItem } from "../breadcrumbs";

// Mock Next.js Link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock lucide-react icons with class forwarding
vi.mock("lucide-react", () => ({
  Home: ({ className, ...props }: { className?: string }) => (
    <span data-testid="home-icon" className={className} {...props}>
      Home Icon
    </span>
  ),
  ChevronRight: ({ className, ...props }: { className?: string }) => (
    <span data-testid="chevron-icon" className={className} {...props}>
      Chevron Icon
    </span>
  ),
}));

describe("Breadcrumbs", () => {
  const mockItems: BreadcrumbItem[] = [
    { name: "Home", url: "/" },
    { name: "Programs", url: "/programs" },
    { name: "Details", url: "/programs/details" },
  ];

  describe("Basic Rendering", () => {
    it("renders breadcrumb navigation", () => {
      render(<Breadcrumbs items={mockItems} />);
      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
    });

    it("renders all breadcrumb items", () => {
      render(<Breadcrumbs items={mockItems} />);
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Programs")).toBeInTheDocument();
      expect(screen.getByText("Details")).toBeInTheDocument();
    });

    it("navigation has aria-label", () => {
      render(<Breadcrumbs items={mockItems} />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "Breadcrumb");
    });

    it("renders as ordered list", () => {
      render(<Breadcrumbs items={mockItems} />);
      const list = screen.getByRole("list");
      expect(list.tagName).toBe("OL");
    });

    it("list has flex layout", () => {
      render(<Breadcrumbs items={mockItems} />);
      const list = screen.getByRole("list");
      expect(list).toHaveClass("flex", "items-center");
    });
  });

  describe("Home Icon", () => {
    it("first item displays home icon", () => {
      render(<Breadcrumbs items={mockItems} />);
      expect(screen.getByTestId("home-icon")).toBeInTheDocument();
    });

    it("first item displays label text alongside icon", () => {
      render(<Breadcrumbs items={mockItems} />);
      const homeIcon = screen.getByTestId("home-icon");
      expect(homeIcon).toBeInTheDocument();
      // The component shows both icon and text
      expect(screen.getByText("Home")).toBeInTheDocument();
    });

    it("second item shows label text", () => {
      render(<Breadcrumbs items={mockItems} />);
      expect(screen.getByText("Programs")).toBeInTheDocument();
    });

    it("home icon link is clickable", () => {
      render(<Breadcrumbs items={mockItems} />);
      const homeLink = screen.getByTestId("home-icon").closest("a");
      expect(homeLink).toHaveAttribute("href", "/");
    });
  });

  describe("Separators", () => {
    it("renders chevron separators between items", () => {
      render(<Breadcrumbs items={mockItems} />);
      const chevrons = screen.getAllByTestId("chevron-icon");
      // Should have n-1 separators for n items
      expect(chevrons).toHaveLength(mockItems.length - 1);
    });

    it("separator has proper styling", () => {
      render(<Breadcrumbs items={mockItems} />);
      const chevrons = screen.getAllByTestId("chevron-icon");
      chevrons.forEach((chevron) => {
        expect(chevron).toHaveClass("text-gray-400");
      });
    });

    it("separator has correct size", () => {
      render(<Breadcrumbs items={mockItems} />);
      const chevrons = screen.getAllByTestId("chevron-icon");
      chevrons.forEach((chevron) => {
        expect(chevron).toHaveClass("h-4", "w-4");
      });
    });

    it("no separator after last item", () => {
      render(<Breadcrumbs items={mockItems} />);
      const chevrons = screen.getAllByTestId("chevron-icon");
      expect(chevrons.length).toBe(2); // 3 items = 2 separators
    });
  });

  describe("Links", () => {
    it("all items except last are links", () => {
      render(<Breadcrumbs items={mockItems} />);
      const links = screen.getAllByRole("link");
      // First two items should be links (Home and Programs)
      expect(links.length).toBeGreaterThanOrEqual(2);
    });

    it("links have correct href attributes", () => {
      render(<Breadcrumbs items={mockItems} />);
      const programsLink = screen.getByText("Programs").closest("a");
      expect(programsLink).toHaveAttribute("href", "/programs");
    });

    it("links have hover styles", () => {
      render(<Breadcrumbs items={mockItems} />);
      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link).toHaveClass("hover:text-[var(--color-primary)]");
      });
    });

    it("links have focus ring", () => {
      render(<Breadcrumbs items={mockItems} />);
      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link).toHaveClass("focus:ring-2");
      });
    });

    it("links have transition", () => {
      render(<Breadcrumbs items={mockItems} />);
      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link).toHaveClass("transition-colors");
      });
    });
  });

  describe("Current Page", () => {
    it("last item is not a link", () => {
      render(<Breadcrumbs items={mockItems} />);
      const lastItem = screen.getByText("Details");
      expect(lastItem.tagName).not.toBe("A");
    });

    it("last item has aria-current attribute", () => {
      render(<Breadcrumbs items={mockItems} />);
      const lastItem = screen.getByText("Details");
      expect(lastItem).toHaveAttribute("aria-current", "page");
    });

    it("last item has different text color", () => {
      render(<Breadcrumbs items={mockItems} />);
      const lastItem = screen.getByText("Details");
      expect(lastItem).toHaveClass("text-gray-900");
    });

    it("last item has font weight", () => {
      render(<Breadcrumbs items={mockItems} />);
      const lastItem = screen.getByText("Details");
      expect(lastItem).toHaveClass("font-medium");
    });
  });

  describe("JSON-LD Schema", () => {
    it("renders script tag with schema markup", () => {
      const { container } = render(<Breadcrumbs items={mockItems} />);
      const script = container.querySelector('script[type="application/ld+json"]');
      expect(script).toBeInTheDocument();
    });

    it("schema contains correct @type", () => {
      const { container } = render(<Breadcrumbs items={mockItems} />);
      const script = container.querySelector('script[type="application/ld+json"]');
      const schema = JSON.parse(script?.textContent || "{}");
      expect(schema["@type"]).toBe("BreadcrumbList");
    });

    it("schema contains all breadcrumb items", () => {
      const { container } = render(<Breadcrumbs items={mockItems} />);
      const script = container.querySelector('script[type="application/ld+json"]');
      const schema = JSON.parse(script?.textContent || "{}");
      expect(schema.itemListElement).toHaveLength(mockItems.length);
    });

    it("schema items have correct position", () => {
      const { container } = render(<Breadcrumbs items={mockItems} />);
      const script = container.querySelector('script[type="application/ld+json"]');
      const schema = JSON.parse(script?.textContent || "{}");

      schema.itemListElement.forEach((item: any, index: number) => {
        expect(item.position).toBe(index + 1);
      });
    });

    it("schema items have correct name", () => {
      const { container } = render(<Breadcrumbs items={mockItems} />);
      const script = container.querySelector('script[type="application/ld+json"]');
      const schema = JSON.parse(script?.textContent || "{}");

      schema.itemListElement.forEach((item: any, index: number) => {
        expect(item.name).toBe(mockItems[index].name);
      });
    });

    it("schema items have correct URL", () => {
      const { container } = render(<Breadcrumbs items={mockItems} />);
      const script = container.querySelector('script[type="application/ld+json"]');
      const schema = JSON.parse(script?.textContent || "{}");

      schema.itemListElement.forEach((item: any, index: number) => {
        expect(item.item).toBe(mockItems[index].url);
      });
    });

    it("schema has correct context", () => {
      const { container } = render(<Breadcrumbs items={mockItems} />);
      const script = container.querySelector('script[type="application/ld+json"]');
      const schema = JSON.parse(script?.textContent || "{}");

      expect(schema["@context"]).toBe("https://schema.org");
    });
  });

  describe("Different Item Counts", () => {
    it("handles single item", () => {
      const singleItem: BreadcrumbItem[] = [{ name: "Home", url: "/" }];
      render(<Breadcrumbs items={singleItem} />);
      expect(screen.getByTestId("home-icon")).toBeInTheDocument();
    });

    it("single item has aria-current", () => {
      const singleItem: BreadcrumbItem[] = [{ name: "Home", url: "/" }];
      render(<Breadcrumbs items={singleItem} />);
      const homeIcon = screen.getByTestId("home-icon");
      expect(homeIcon.parentElement).toHaveAttribute("aria-current", "page");
    });

    it("handles two items", () => {
      const twoItems: BreadcrumbItem[] = [
        { name: "Home", url: "/" },
        { name: "About", url: "/about" },
      ];
      render(<Breadcrumbs items={twoItems} />);
      expect(screen.getByText("About")).toBeInTheDocument();
    });

    it("two items have one separator", () => {
      const twoItems: BreadcrumbItem[] = [
        { name: "Home", url: "/" },
        { name: "About", url: "/about" },
      ];
      render(<Breadcrumbs items={twoItems} />);
      const chevrons = screen.getAllByTestId("chevron-icon");
      expect(chevrons).toHaveLength(1);
    });

    it("handles many items", () => {
      const manyItems: BreadcrumbItem[] = [
        { name: "Home", url: "/" },
        { name: "Level 1", url: "/level1" },
        { name: "Level 2", url: "/level1/level2" },
        { name: "Level 3", url: "/level1/level2/level3" },
        { name: "Level 4", url: "/level1/level2/level3/level4" },
      ];
      render(<Breadcrumbs items={manyItems} />);
      expect(screen.getByText("Level 4")).toBeInTheDocument();
    });

    it("many items have correct separator count", () => {
      const manyItems: BreadcrumbItem[] = [
        { name: "Home", url: "/" },
        { name: "Level 1", url: "/level1" },
        { name: "Level 2", url: "/level1/level2" },
        { name: "Level 3", url: "/level1/level2/level3" },
      ];
      render(<Breadcrumbs items={manyItems} />);
      const chevrons = screen.getAllByTestId("chevron-icon");
      expect(chevrons).toHaveLength(3); // 4 items = 3 separators
    });
  });

  describe("Real-World Scenarios", () => {
    it("program detail breadcrumbs", () => {
      const programBreadcrumbs: BreadcrumbItem[] = [
        { name: "Inicio", url: "/" },
        { name: "Programas", url: "/programs" },
        { name: "Ingeniería", url: "/programs/engineering" },
        { name: "Sistemas", url: "/programs/engineering/systems" },
      ];

      render(<Breadcrumbs items={programBreadcrumbs} />);
      expect(screen.getByText("Sistemas")).toHaveAttribute("aria-current", "page");
    });

    it("event detail breadcrumbs", () => {
      const eventBreadcrumbs: BreadcrumbItem[] = [
        { name: "Home", url: "/" },
        { name: "Events", url: "/events" },
        { name: "Conference 2024", url: "/events/conference-2024" },
      ];

      render(<Breadcrumbs items={eventBreadcrumbs} />);
      expect(screen.getByText("Conference 2024")).toBeInTheDocument();
    });

    it("nested category breadcrumbs", () => {
      const categoryBreadcrumbs: BreadcrumbItem[] = [
        { name: "Home", url: "/" },
        { name: "Documentation", url: "/docs" },
        { name: "API", url: "/docs/api" },
        { name: "Authentication", url: "/docs/api/auth" },
      ];

      render(<Breadcrumbs items={categoryBreadcrumbs} />);

      const links = screen.getAllByRole("link");
      expect(links.length).toBe(3); // All except last

      expect(screen.getByText("Authentication")).toHaveAttribute("aria-current", "page");
    });

    it("search results breadcrumbs", () => {
      const searchBreadcrumbs: BreadcrumbItem[] = [
        { name: "Home", url: "/" },
        { name: "Search", url: "/search" },
        { name: 'Results for "security"', url: "/search?q=security" },
      ];

      render(<Breadcrumbs items={searchBreadcrumbs} />);
      expect(screen.getByText('Results for "security"')).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic HTML structure", () => {
      render(<Breadcrumbs items={mockItems} />);
      const nav = screen.getByRole("navigation");
      const list = screen.getByRole("list");
      expect(nav.contains(list)).toBe(true);
    });

    it("list items are properly nested", () => {
      render(<Breadcrumbs items={mockItems} />);
      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(mockItems.length);
    });

    it("screen readers can identify current page", () => {
      render(<Breadcrumbs items={mockItems} />);
      const currentPage = screen.getByText("Details");
      expect(currentPage).toHaveAttribute("aria-current", "page");
    });

    it("links are keyboard navigable", () => {
      render(<Breadcrumbs items={mockItems} />);
      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link).toHaveAttribute("href");
      });
    });

    it("focus indicators are visible", () => {
      render(<Breadcrumbs items={mockItems} />);
      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link).toHaveClass("focus:ring-2", "focus:ring-[var(--color-primary)]");
      });
    });

    it("focus has rounded corners", () => {
      render(<Breadcrumbs items={mockItems} />);
      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link).toHaveClass("rounded");
      });
    });

    it("decorative icons do not interfere with screen readers", () => {
      render(<Breadcrumbs items={mockItems} />);
      // ChevronRight icons should be decorative
      const chevrons = screen.getAllByTestId("chevron-icon");
      chevrons.forEach((chevron) => {
        // The icon itself has aria-hidden from the component
        expect(chevron).toHaveAttribute("aria-hidden", "true");
      });
    });
  });

  describe("Styling", () => {
    it("nav has text color", () => {
      render(<Breadcrumbs items={mockItems} />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("text-gray-600");
    });

    it("nav has text size", () => {
      render(<Breadcrumbs items={mockItems} />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("text-sm");
    });

    it("list items have spacing", () => {
      render(<Breadcrumbs items={mockItems} />);
      const listItems = screen.getAllByRole("listitem");
      listItems.forEach((item) => {
        expect(item).toHaveClass("flex", "items-center");
      });
    });

    it("dark mode support", () => {
      render(<Breadcrumbs items={mockItems} />);
      const nav = screen.getByRole("navigation");
      expect(nav.className).toMatch(/dark:/);
    });
  });

  describe("Edge Cases", () => {
    it("handles empty items array", () => {
      render(<Breadcrumbs items={[]} />);
      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
    });

    it("handles items with special characters", () => {
      const specialItems: BreadcrumbItem[] = [
        { name: "Home", url: "/" },
        { name: "Q&A", url: "/qa" },
        { name: "C++ Programming", url: "/qa/cpp" },
      ];

      render(<Breadcrumbs items={specialItems} />);
      expect(screen.getByText("Q&A")).toBeInTheDocument();
      expect(screen.getByText("C++ Programming")).toBeInTheDocument();
    });

    it("handles very long labels", () => {
      const longLabelItems: BreadcrumbItem[] = [
        { name: "Home", url: "/" },
        {
          name: "This is a very long breadcrumb label that might need special handling",
          url: "/long",
        },
      ];

      render(<Breadcrumbs items={longLabelItems} />);
      expect(
        screen.getByText("This is a very long breadcrumb label that might need special handling")
      ).toBeInTheDocument();
    });

    it("handles items with query parameters", () => {
      const queryItems: BreadcrumbItem[] = [
        { name: "Home", url: "/" },
        { name: "Search", url: "/search?q=test&filter=all" },
        { name: "Results", url: "/search?q=test&filter=all&page=2" },
      ];

      render(<Breadcrumbs items={queryItems} />);
      const link = screen.getByText("Search").closest("a");
      expect(link).toHaveAttribute("href", "/search?q=test&filter=all");
    });

    it("handles items with hash fragments", () => {
      const hashItems: BreadcrumbItem[] = [
        { name: "Home", url: "/" },
        { name: "Documentation", url: "/docs" },
        { name: "API Section", url: "/docs#api" },
      ];

      render(<Breadcrumbs items={hashItems} />);
      expect(screen.getByText("API Section")).toBeInTheDocument();
    });
  });

  describe("Custom ClassName", () => {
    it("accepts custom className on nav", () => {
      const { container } = render(
        <Breadcrumbs items={mockItems} className="custom-breadcrumbs" />
      );
      const nav = container.querySelector(".custom-breadcrumbs");
      expect(nav).toBeInTheDocument();
    });

    it("merges custom className with default classes", () => {
      render(<Breadcrumbs items={mockItems} className="mb-8" />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("mb-8");
    });
  });

  describe("Navigation Flow", () => {
    it("maintains hierarchical structure", () => {
      const hierarchical: BreadcrumbItem[] = [
        { name: "Home", url: "/" },
        { name: "Parent", url: "/parent" },
        { name: "Child", url: "/parent/child" },
        { name: "Grandchild", url: "/parent/child/grandchild" },
      ];

      render(<Breadcrumbs items={hierarchical} />);

      // Verify all levels are present
      expect(screen.getByTestId("home-icon")).toBeInTheDocument();
      expect(screen.getByText("Parent")).toBeInTheDocument();
      expect(screen.getByText("Child")).toBeInTheDocument();
      expect(screen.getByText("Grandchild")).toBeInTheDocument();
    });

    it("all intermediate items are clickable", () => {
      const hierarchical: BreadcrumbItem[] = [
        { name: "Home", url: "/" },
        { name: "Parent", url: "/parent" },
        { name: "Child", url: "/parent/child" },
      ];

      render(<Breadcrumbs items={hierarchical} />);

      const parentLink = screen.getByText("Parent").closest("a");
      expect(parentLink).toHaveAttribute("href", "/parent");
    });
  });

  describe("Responsive Behavior", () => {
    it("uses flex layout for responsiveness", () => {
      render(<Breadcrumbs items={mockItems} />);
      const list = screen.getByRole("list");
      expect(list).toHaveClass("flex");
    });

    it("items are aligned", () => {
      render(<Breadcrumbs items={mockItems} />);
      const list = screen.getByRole("list");
      expect(list).toHaveClass("items-center");
    });

    it("maintains spacing on small screens", () => {
      render(<Breadcrumbs items={mockItems} />);
      const list = screen.getByRole("list");
      expect(list).toHaveClass("gap-2");
    });
  });
});
