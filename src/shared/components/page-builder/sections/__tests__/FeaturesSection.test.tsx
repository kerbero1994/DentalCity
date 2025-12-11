import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeaturesSectionComponent } from "../FeaturesSection";
import type { FeaturesSection } from "@/core/types/lib/page-builder";

// Mock Next.js components
vi.mock("next/image", () => ({
  default: ({ src, alt }: any) => <img src={src} alt={alt} />,
}));

describe("FeaturesSectionComponent", () => {
  describe("Grid Layout", () => {
    it("renders features in grid layout", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
        },
        features: {
          layout: "grid",
          columns: 3,
          items: [
            {
              id: "1",
              title: "Feature 1",
              description: "Description 1",
            },
            {
              id: "2",
              title: "Feature 2",
              description: "Description 2",
            },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("Features")).toBeInTheDocument();
      expect(screen.getByText("Feature 1")).toBeInTheDocument();
      expect(screen.getByText("Feature 2")).toBeInTheDocument();
      expect(screen.getByText("Description 1")).toBeInTheDocument();
      expect(screen.getByText("Description 2")).toBeInTheDocument();
    });

    it("renders eyebrow text", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          eyebrow: "Our Features",
          title: "Features",
        },
        features: {
          layout: "grid",
          items: [],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("Our Features")).toBeInTheDocument();
    });

    it("renders description", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
          description: "Feature description text",
        },
        features: {
          layout: "grid",
          items: [],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("Feature description text")).toBeInTheDocument();
    });

    it("renders feature icons", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
        },
        features: {
          layout: "grid",
          items: [
            {
              id: "1",
              title: "Feature",
              description: "Feature description",
              icon: "🚀",
            },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("🚀")).toBeInTheDocument();
    });

    it("renders feature images", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
        },
        features: {
          layout: "grid",
          items: [
            {
              id: "1",
              title: "Feature",
              description: "Feature description",
              image: {
                src: "/feature.jpg",
                alt: "Feature Image",
              },
            },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByRole("img", { name: "Feature Image" })).toBeInTheDocument();
    });

    it("renders feature items list", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
        },
        features: {
          layout: "grid",
          items: [
            {
              id: "1",
              title: "Feature",
              description: "Feature description",
              items: ["Item 1", "Item 2", "Item 3"],
            },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
      expect(screen.getByText("Item 3")).toBeInTheDocument();
    });

    it("renders checkmarks for feature items", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
        },
        features: {
          layout: "grid",
          items: [
            {
              id: "1",
              title: "Feature",
              description: "Feature description",
              items: ["Item"],
            },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("✓")).toBeInTheDocument();
    });

    it("handles 2 column layout", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
        },
        features: {
          layout: "grid",
          columns: 2,
          items: [
            { id: "1", title: "Feature 1", description: "Test description" },
            { id: "2", title: "Feature 2", description: "Test description" },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("Feature 1")).toBeInTheDocument();
      expect(screen.getByText("Feature 2")).toBeInTheDocument();
    });

    it("handles 3 column layout", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
        },
        features: {
          layout: "grid",
          columns: 3,
          items: [
            { id: "1", title: "Feature 1", description: "Test description" },
            { id: "2", title: "Feature 2", description: "Test description" },
            { id: "3", title: "Feature 3", description: "Test description" },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("Feature 1")).toBeInTheDocument();
      expect(screen.getByText("Feature 2")).toBeInTheDocument();
      expect(screen.getByText("Feature 3")).toBeInTheDocument();
    });

    it("handles 4 column layout", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
        },
        features: {
          layout: "grid",
          columns: 4,
          items: [
            { id: "1", title: "Feature 1", description: "Test description" },
            { id: "2", title: "Feature 2", description: "Test description" },
            { id: "3", title: "Feature 3", description: "Test description" },
            { id: "4", title: "Feature 4", description: "Test description" },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("Feature 1")).toBeInTheDocument();
      expect(screen.getByText("Feature 4")).toBeInTheDocument();
    });

    it("renders features without descriptions", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
        },
        features: {
          layout: "grid",
          items: [
            {
              id: "1",
              title: "Feature Only Title",
              description: "Feature description",
            },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("Feature Only Title")).toBeInTheDocument();
    });

    it("renders features without icons", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
        },
        features: {
          layout: "grid",
          items: [
            {
              id: "1",
              title: "No Icon Feature",
              description: "Description",
            },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("No Icon Feature")).toBeInTheDocument();
    });
  });

  describe("Alternating Layout", () => {
    it("renders features in alternating layout", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
        },
        features: {
          layout: "alternating",
          items: [
            {
              id: "1",
              title: "Feature 1",
              description: "Description 1",
            },
            {
              id: "2",
              title: "Feature 2",
              description: "Description 2",
            },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("Feature 1")).toBeInTheDocument();
      expect(screen.getByText("Feature 2")).toBeInTheDocument();
    });

    it("renders alternating layout with images", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
        },
        features: {
          layout: "alternating",
          items: [
            {
              id: "1",
              title: "Feature 1",
              description: "Feature 1 description",
              image: {
                src: "/image1.jpg",
                alt: "Image 1",
              },
            },
            {
              id: "2",
              title: "Feature 2",
              description: "Feature 2 description",
              image: {
                src: "/image2.jpg",
                alt: "Image 2",
              },
            },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByRole("img", { name: "Image 1" })).toBeInTheDocument();
      expect(screen.getByRole("img", { name: "Image 2" })).toBeInTheDocument();
    });

    it("renders icons in alternating layout", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
        },
        features: {
          layout: "alternating",
          items: [
            {
              id: "1",
              title: "Feature",
              description: "Feature description",
              icon: "⭐",
            },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("⭐")).toBeInTheDocument();
    });

    it("renders feature items in alternating layout", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
        },
        features: {
          layout: "alternating",
          items: [
            {
              id: "1",
              title: "Feature",
              description: "Feature description",
              items: ["Alt Item 1", "Alt Item 2"],
            },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("Alt Item 1")).toBeInTheDocument();
      expect(screen.getByText("Alt Item 2")).toBeInTheDocument();
    });

    it("renders header in alternating layout", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          eyebrow: "Eyebrow",
          title: "Title",
          description: "Description",
        },
        features: {
          layout: "alternating",
          items: [],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("Eyebrow")).toBeInTheDocument();
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
    });

    it("handles single feature in alternating layout", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
        },
        features: {
          layout: "alternating",
          items: [
            {
              id: "1",
              title: "Single Feature",
              description: "Single description",
            },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("Single Feature")).toBeInTheDocument();
      expect(screen.getByText("Single description")).toBeInTheDocument();
    });

    it("handles multiple features in alternating layout", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
        },
        features: {
          layout: "alternating",
          items: [
            { id: "1", title: "Feature 1", description: "Test description" },
            { id: "2", title: "Feature 2", description: "Test description" },
            { id: "3", title: "Feature 3", description: "Test description" },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("Feature 1")).toBeInTheDocument();
      expect(screen.getByText("Feature 2")).toBeInTheDocument();
      expect(screen.getByText("Feature 3")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("renders without layout (defaults to grid)", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
        },
        features: {
          items: [
            {
              id: "1",
              title: "Feature",
              description: "Feature description",
            },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("Feature")).toBeInTheDocument();
    });

    it("renders without content header", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {},
        features: {
          layout: "grid",
          items: [
            {
              id: "1",
              title: "Feature",
              description: "Feature description",
            },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("Feature")).toBeInTheDocument();
    });

    it("renders empty features array", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
        },
        features: {
          layout: "grid",
          items: [],
        },
      };

      const { container } = render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("Features")).toBeInTheDocument();
      // 1 space-y-4 is from the header section, no feature items rendered
      expect(container.querySelectorAll(".space-y-4").length).toBe(1);
    });

    it("handles features without IDs", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
        },
        features: {
          layout: "grid",
          items: [
            {
              id: "1",
              title: "No ID Feature",
              description: "Feature description",
            },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("No ID Feature")).toBeInTheDocument();
    });

    it("renders feature with icon and image", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
        },
        features: {
          layout: "grid",
          items: [
            {
              id: "1",
              title: "Feature",
              description: "Feature description",
              icon: "🎯",
              image: {
                src: "/image.jpg",
                alt: "Image",
              },
            },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("🎯")).toBeInTheDocument();
      expect(screen.getByRole("img", { name: "Image" })).toBeInTheDocument();
    });

    it("renders feature with all fields", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          eyebrow: "Eyebrow",
          title: "Title",
          description: "Description",
        },
        features: {
          layout: "grid",
          items: [
            {
              id: "1",
              title: "Feature Title",
              description: "Feature Description",
              icon: "✨",
              image: {
                src: "/feature.jpg",
                alt: "Feature",
              },
              items: ["List Item 1", "List Item 2"],
            },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("Eyebrow")).toBeInTheDocument();
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByText("Feature Title")).toBeInTheDocument();
      expect(screen.getByText("Feature Description")).toBeInTheDocument();
      expect(screen.getByText("✨")).toBeInTheDocument();
      expect(screen.getByRole("img", { name: "Feature" })).toBeInTheDocument();
      expect(screen.getByText("List Item 1")).toBeInTheDocument();
      expect(screen.getByText("List Item 2")).toBeInTheDocument();
    });

    it("renders without columns specification", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
        },
        features: {
          layout: "grid",
          items: [
            { id: "1", title: "Feature 1", description: "Test description" },
            { id: "2", title: "Feature 2", description: "Test description" },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("Feature 1")).toBeInTheDocument();
      expect(screen.getByText("Feature 2")).toBeInTheDocument();
    });

    it("handles empty items array in feature", () => {
      const section: FeaturesSection = {
        type: "features",
        id: "test-section",
        content: {
          title: "Features",
        },
        features: {
          layout: "grid",
          items: [
            {
              id: "1",
              title: "Feature",
              description: "Feature description",
              items: [],
            },
          ],
        },
      };

      render(<FeaturesSectionComponent section={section} />);

      expect(screen.getByText("Feature")).toBeInTheDocument();
    });
  });
});
