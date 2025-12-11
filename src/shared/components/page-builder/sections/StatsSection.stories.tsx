import type { Meta, StoryObj } from "@storybook/nextjs";
import { StatsSectionComponent } from "./StatsSection";
import type { StatsSection } from "@/core/types/lib/page-builder";

const meta = {
  title: "Page Builder/Stats Section",
  component: StatsSectionComponent,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StatsSectionComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseSection: StatsSection = {
  id: "stats-1",
  type: "stats",
  order: 1,
  visible: true,
  layout: {
    variant: "contained",
    padding: { top: "large", bottom: "large" },
  },
  content: {
    eyebrow: "By the numbers",
    title: "Our Impact",
    description: "See how we're making a difference",
  },
  stats: {
    variant: "default",
    columns: 4,
    items: [
      {
        id: "stat-1",
        icon: "👥",
        value: "69,000",
        suffix: "+",
        label: "Members",
        description: "Active union members",
      },
      {
        id: "stat-2",
        icon: "🏭",
        value: "170",
        suffix: "+",
        label: "Companies",
        description: "Partner organizations",
      },
      {
        id: "stat-3",
        icon: "📍",
        value: "4",
        label: "States",
        description: "Operating regions",
      },
      {
        id: "stat-4",
        icon: "🌎",
        value: "20",
        suffix: "+",
        label: "Countries",
        description: "International reach",
      },
    ],
  },
};

export const Default: Story = {
  args: {
    section: baseSection,
  },
};

export const CardVariant: Story = {
  args: {
    section: {
      ...baseSection,
      stats: {
        ...baseSection.stats,
        variant: "card",
      },
    },
  },
};

export const MinimalVariant: Story = {
  args: {
    section: {
      ...baseSection,
      stats: {
        ...baseSection.stats,
        variant: "minimal",
      },
    },
  },
};

export const ThreeColumns: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "Key Metrics",
        description: "Our performance at a glance",
      },
      stats: {
        variant: "card",
        columns: 3,
        items: [
          {
            id: "metric-1",
            value: "99.9",
            suffix: "%",
            label: "Uptime",
            description: "System availability",
          },
          {
            id: "metric-2",
            value: "50",
            suffix: "ms",
            label: "Response Time",
            description: "Average latency",
          },
          {
            id: "metric-3",
            value: "1M",
            suffix: "+",
            label: "Requests",
            description: "Per day",
          },
        ],
      },
    },
  },
};

export const WithPrefix: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "Revenue Growth",
      },
      stats: {
        variant: "card",
        columns: 3,
        items: [
          {
            id: "rev-1",
            prefix: "$",
            value: "2.5",
            suffix: "M",
            label: "Annual Revenue",
          },
          {
            id: "rev-2",
            prefix: "$",
            value: "150",
            suffix: "K",
            label: "Average Deal Size",
          },
          {
            id: "rev-3",
            value: "45",
            suffix: "%",
            label: "Year over Year Growth",
          },
        ],
      },
    },
  },
};

export const WithoutIcons: Story = {
  args: {
    section: {
      ...baseSection,
      stats: {
        variant: "minimal",
        columns: 4,
        items: [
          { id: "1", value: "500", suffix: "+", label: "Projects Completed" },
          { id: "2", value: "98", suffix: "%", label: "Client Satisfaction" },
          { id: "3", value: "50", suffix: "+", label: "Team Members" },
          { id: "4", value: "15", label: "Years Experience" },
        ],
      },
    },
  },
};

export const SimpleStats: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "Quick Stats",
      },
      stats: {
        variant: "default",
        columns: 2,
        items: [
          {
            id: "simple-1",
            value: "24/7",
            label: "Support Available",
          },
          {
            id: "simple-2",
            value: "100",
            suffix: "%",
            label: "Satisfaction Guaranteed",
          },
        ],
      },
    },
  },
};

export const LargeNumbers: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        eyebrow: "Global Scale",
        title: "Serving Millions",
        description: "Our platform reaches users worldwide",
      },
      stats: {
        variant: "card",
        columns: 3,
        items: [
          {
            id: "large-1",
            icon: "👨‍💼",
            value: "5",
            suffix: "M+",
            label: "Active Users",
            description: "And growing daily",
          },
          {
            id: "large-2",
            icon: "🌍",
            value: "150",
            suffix: "+",
            label: "Countries",
            description: "Worldwide presence",
          },
          {
            id: "large-3",
            icon: "⚡",
            value: "1",
            suffix: "B+",
            label: "API Calls",
            description: "Processed monthly",
          },
        ],
      },
    },
  },
};
