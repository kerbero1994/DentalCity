import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsSectionComponent } from "../StatsSection";
import type { StatsSection } from "@/core/types/lib/page-builder";

describe("StatsSectionComponent", () => {
  describe("Default Variant", () => {
    it("renders stats in default variant", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Our Stats",
        },
        stats: {
          variant: "default",
          columns: 3,
          items: [
            {
              id: "1",
              value: "1000",
              label: "Users",
            },
            {
              id: "2",
              value: "50",
              label: "Countries",
            },
          ],
        },
      };

      render(<StatsSectionComponent section={section} />);

      expect(screen.getByText("Our Stats")).toBeInTheDocument();
      expect(screen.getByText("1000")).toBeInTheDocument();
      expect(screen.getByText("Users")).toBeInTheDocument();
      expect(screen.getByText("50")).toBeInTheDocument();
      expect(screen.getByText("Countries")).toBeInTheDocument();
    });

    it("renders eyebrow text", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          eyebrow: "Our Numbers",
          title: "Stats",
        },
        stats: {
          variant: "default",
          items: [],
        },
      };

      render(<StatsSectionComponent section={section} />);

      expect(screen.getByText("Our Numbers")).toBeInTheDocument();
    });

    it("renders description", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
          description: "These are our impressive statistics",
        },
        stats: {
          variant: "default",
          items: [],
        },
      };

      render(<StatsSectionComponent section={section} />);

      expect(screen.getByText("These are our impressive statistics")).toBeInTheDocument();
    });

    it("renders stat icons", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
        },
        stats: {
          variant: "default",
          items: [
            {
              id: "1",
              value: "100",
              label: "Items",
              icon: "📊",
            },
          ],
        },
      };

      render(<StatsSectionComponent section={section} />);

      expect(screen.getByText("📊")).toBeInTheDocument();
    });

    it("renders stat with prefix", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
        },
        stats: {
          variant: "default",
          items: [
            {
              id: "1",
              value: "100",
              label: "Price",
              prefix: "$",
            },
          ],
        },
      };

      render(<StatsSectionComponent section={section} />);

      // Prefix and value are rendered together
      expect(screen.getByText("$100")).toBeInTheDocument();
    });

    it("renders stat with suffix", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
        },
        stats: {
          variant: "default",
          items: [
            {
              id: "1",
              value: "99",
              label: "Success Rate",
              suffix: "%",
            },
          ],
        },
      };

      render(<StatsSectionComponent section={section} />);

      // Value and suffix are rendered together
      expect(screen.getByText("99%")).toBeInTheDocument();
    });

    it("renders stat with prefix and suffix", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
        },
        stats: {
          variant: "default",
          items: [
            {
              id: "1",
              value: "100",
              label: "Value",
              prefix: "$",
              suffix: "K",
            },
          ],
        },
      };

      render(<StatsSectionComponent section={section} />);

      // Prefix, value, and suffix are rendered together
      expect(screen.getByText("$100K")).toBeInTheDocument();
    });

    it("renders stat description", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
        },
        stats: {
          variant: "default",
          items: [
            {
              id: "1",
              value: "500",
              label: "Downloads",
              description: "This month",
            },
          ],
        },
      };

      render(<StatsSectionComponent section={section} />);

      expect(screen.getByText("This month")).toBeInTheDocument();
    });
  });

  describe("Card Variant", () => {
    it("renders stats in card variant", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
        },
        stats: {
          variant: "card",
          items: [
            {
              id: "1",
              value: "100",
              label: "Items",
            },
          ],
        },
      };

      const { container } = render(<StatsSectionComponent section={section} />);

      expect(screen.getByText("100")).toBeInTheDocument();
      const cardElement = container.querySelector(".shadow-lg");
      expect(cardElement).toBeInTheDocument();
    });

    it("renders multiple stats in card variant", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
        },
        stats: {
          variant: "card",
          items: [
            { id: "1", value: "100", label: "Stat 1" },
            { id: "2", value: "200", label: "Stat 2" },
          ],
        },
      };

      render(<StatsSectionComponent section={section} />);

      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("200")).toBeInTheDocument();
    });
  });

  describe("Cards Variant", () => {
    it("renders stats in cards variant", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
        },
        stats: {
          variant: "cards",
          items: [
            {
              id: "1",
              value: "100",
              label: "Items",
            },
          ],
        },
      };

      const { container } = render(<StatsSectionComponent section={section} />);

      expect(screen.getByText("100")).toBeInTheDocument();
      const cardElement = container.querySelector(".shadow-lg");
      expect(cardElement).toBeInTheDocument();
    });
  });

  describe("Bordered Variant", () => {
    it("renders stats in bordered variant", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
        },
        stats: {
          variant: "bordered",
          items: [
            {
              id: "1",
              value: "100",
              label: "Items",
            },
          ],
        },
      };

      const { container } = render(<StatsSectionComponent section={section} />);

      expect(screen.getByText("100")).toBeInTheDocument();
      const borderedElement = container.querySelector(".border-2");
      expect(borderedElement).toBeInTheDocument();
    });
  });

  describe("Minimal Variant", () => {
    it("renders stats in minimal variant", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
        },
        stats: {
          variant: "minimal",
          items: [
            {
              id: "1",
              value: "100",
              label: "Items",
            },
          ],
        },
      };

      render(<StatsSectionComponent section={section} />);

      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("Items")).toBeInTheDocument();
    });
  });

  describe("Column Layouts", () => {
    it("renders 2 column layout", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
        },
        stats: {
          variant: "default",
          columns: 2,
          items: [
            { id: "1", value: "100", label: "Stat 1" },
            { id: "2", value: "200", label: "Stat 2" },
          ],
        },
      };

      render(<StatsSectionComponent section={section} />);

      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("200")).toBeInTheDocument();
    });

    it("renders 3 column layout", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
        },
        stats: {
          variant: "default",
          columns: 3,
          items: [
            { id: "1", value: "100", label: "Stat 1" },
            { id: "2", value: "200", label: "Stat 2" },
            { id: "3", value: "300", label: "Stat 3" },
          ],
        },
      };

      render(<StatsSectionComponent section={section} />);

      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("200")).toBeInTheDocument();
      expect(screen.getByText("300")).toBeInTheDocument();
    });

    it("renders 4 column layout", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
        },
        stats: {
          variant: "default",
          columns: 4,
          items: [
            { id: "1", value: "100", label: "Stat 1" },
            { id: "2", value: "200", label: "Stat 2" },
            { id: "3", value: "300", label: "Stat 3" },
            { id: "4", value: "400", label: "Stat 4" },
          ],
        },
      };

      render(<StatsSectionComponent section={section} />);

      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("400")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("renders without variant (defaults to default)", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
        },
        stats: {
          items: [
            {
              id: "1",
              value: "100",
              label: "Items",
            },
          ],
        },
      };

      render(<StatsSectionComponent section={section} />);

      expect(screen.getByText("100")).toBeInTheDocument();
    });

    it("renders without content header", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {},
        stats: {
          variant: "default",
          items: [
            {
              id: "1",
              value: "100",
              label: "Items",
            },
          ],
        },
      };

      render(<StatsSectionComponent section={section} />);

      expect(screen.getByText("100")).toBeInTheDocument();
    });

    it("renders empty stats array", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
        },
        stats: {
          variant: "default",
          items: [],
        },
      };

      const { container } = render(<StatsSectionComponent section={section} />);

      expect(screen.getByText("Stats")).toBeInTheDocument();
      expect(container.querySelectorAll(".text-center").length).toBeLessThanOrEqual(1);
    });

    it("renders stats without IDs", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
        },
        stats: {
          variant: "default",
          items: [
            {
              value: "100",
              label: "No ID Stat",
            },
          ],
        },
      };

      render(<StatsSectionComponent section={section} />);

      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("No ID Stat")).toBeInTheDocument();
    });

    it("renders stat without icon", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
        },
        stats: {
          variant: "default",
          items: [
            {
              id: "1",
              value: "100",
              label: "No Icon",
            },
          ],
        },
      };

      render(<StatsSectionComponent section={section} />);

      expect(screen.getByText("100")).toBeInTheDocument();
    });

    it("renders stat without description", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
        },
        stats: {
          variant: "default",
          items: [
            {
              id: "1",
              value: "100",
              label: "No Description",
            },
          ],
        },
      };

      render(<StatsSectionComponent section={section} />);

      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("No Description")).toBeInTheDocument();
    });

    it("renders stat without prefix or suffix", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
        },
        stats: {
          variant: "default",
          items: [
            {
              id: "1",
              value: "100",
              label: "Plain Number",
            },
          ],
        },
      };

      render(<StatsSectionComponent section={section} />);

      expect(screen.getByText("100")).toBeInTheDocument();
    });

    it("renders stat with all fields", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          eyebrow: "Our Impact",
          title: "Statistics",
          description: "Impressive numbers",
        },
        stats: {
          variant: "card",
          columns: 3,
          items: [
            {
              id: "1",
              value: "1000",
              label: "Users",
              icon: "👥",
              prefix: "+",
              suffix: "K",
              description: "Active users",
            },
          ],
        },
      };

      render(<StatsSectionComponent section={section} />);

      expect(screen.getByText("Our Impact")).toBeInTheDocument();
      expect(screen.getByText("Statistics")).toBeInTheDocument();
      expect(screen.getByText("Impressive numbers")).toBeInTheDocument();
      expect(screen.getByText("👥")).toBeInTheDocument();
      // Prefix, value, and suffix are rendered together
      expect(screen.getByText("+1000K")).toBeInTheDocument();
      expect(screen.getByText("Users")).toBeInTheDocument();
      expect(screen.getByText("Active users")).toBeInTheDocument();
    });

    it("renders without columns specification", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
        },
        stats: {
          variant: "default",
          items: [
            { id: "1", value: "100", label: "Stat 1" },
            { id: "2", value: "200", label: "Stat 2" },
          ],
        },
      };

      render(<StatsSectionComponent section={section} />);

      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("200")).toBeInTheDocument();
    });

    it("handles large numbers", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
        },
        stats: {
          variant: "default",
          items: [
            {
              id: "1",
              value: "1,000,000",
              label: "Big Number",
              suffix: "+",
            },
          ],
        },
      };

      render(<StatsSectionComponent section={section} />);

      // Value and suffix are rendered together
      expect(screen.getByText("1,000,000+")).toBeInTheDocument();
    });

    it("handles decimal numbers", () => {
      const section: StatsSection = {
        type: "stats",
        id: "test-section",
        content: {
          title: "Stats",
        },
        stats: {
          variant: "default",
          items: [
            {
              id: "1",
              value: "99.9",
              label: "Accuracy",
              suffix: "%",
            },
          ],
        },
      };

      render(<StatsSectionComponent section={section} />);

      // Value and suffix are rendered together
      expect(screen.getByText("99.9%")).toBeInTheDocument();
    });
  });
});
