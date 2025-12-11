import type { Meta, StoryObj } from "@storybook/nextjs";
import { StatItem, StatGrid } from "./stat-item";
import { TrendingUp, Users, DollarSign, Award, Zap, Shield } from "lucide-react";

const meta = {
  title: "UI/Stat Item",
  component: StatItem,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Stat layout",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Stat size",
    },
    variant: {
      control: "select",
      options: ["default", "muted", "accent"],
      description: "Icon color variant",
    },
    align: {
      control: "select",
      options: ["start", "center"],
      description: "Alignment",
    },
  },
} satisfies Meta<typeof StatItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "10,000+",
    label: "Active Users",
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Users className="size-6" />,
    value: "10,000+",
    label: "Active Users",
  },
};

export const HorizontalLayout: Story = {
  args: {
    icon: <TrendingUp className="size-6" />,
    value: "150%",
    label: "Growth Rate",
    layout: "horizontal",
  },
};

export const SmallSize: Story = {
  args: {
    icon: <DollarSign className="size-5" />,
    value: "$2.5M",
    label: "Revenue",
    size: "sm",
  },
};

export const LargeSize: Story = {
  args: {
    icon: <Award className="size-8" />,
    value: "99.9%",
    label: "Uptime",
    size: "lg",
  },
};

export const MutedVariant: Story = {
  args: {
    icon: <Zap className="size-6" />,
    value: "50ms",
    label: "Response Time",
    variant: "muted",
  },
};

export const AccentVariant: Story = {
  args: {
    icon: <Shield className="size-6" />,
    value: "SOC 2",
    label: "Compliant",
    variant: "accent",
  },
};

export const GridTwoColumns = {
  render: () => (
    <StatGrid columns={2}>
      <StatItem icon={<Users className="size-6" />} value="10,000+" label="Active Users" />
      <StatItem icon={<TrendingUp className="size-6" />} value="150%" label="Growth Rate" />
    </StatGrid>
  ),
};

export const GridThreeColumns = {
  render: () => (
    <StatGrid columns={3}>
      <StatItem icon={<Users className="size-6" />} value="10,000+" label="Active Users" />
      <StatItem icon={<TrendingUp className="size-6" />} value="150%" label="Growth Rate" />
      <StatItem icon={<DollarSign className="size-6" />} value="$2.5M" label="Revenue" />
    </StatGrid>
  ),
};

export const GridFourColumns = {
  render: () => (
    <StatGrid columns={4}>
      <StatItem icon={<Users className="size-6" />} value="10,000+" label="Active Users" />
      <StatItem icon={<TrendingUp className="size-6" />} value="150%" label="Growth Rate" />
      <StatItem icon={<DollarSign className="size-6" />} value="$2.5M" label="Revenue" />
      <StatItem icon={<Award className="size-6" />} value="99.9%" label="Uptime" />
    </StatGrid>
  ),
};

export const DashboardStats = {
  render: () => (
    <StatGrid columns={4}>
      <StatItem
        icon={<Users className="size-6" />}
        value="69,000+"
        label="Union Members"
        size="md"
      />
      <StatItem
        icon={
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        }
        value="170+"
        label="Partner Companies"
        size="md"
      />
      <StatItem
        icon={
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        }
        value="4"
        label="States"
        size="md"
      />
      <StatItem
        icon={
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        value="20+"
        label="Countries"
        size="md"
      />
    </StatGrid>
  ),
};

export const PerformanceMetrics = {
  render: () => (
    <StatGrid columns={3}>
      <StatItem
        icon={<Zap className="size-6" />}
        value="50ms"
        label="Avg Response Time"
        size="lg"
        variant="accent"
      />
      <StatItem
        icon={<Shield className="size-6" />}
        value="99.9%"
        label="Uptime SLA"
        size="lg"
        variant="accent"
      />
      <StatItem
        icon={<Award className="size-6" />}
        value="1M+"
        label="Daily Requests"
        size="lg"
        variant="accent"
      />
    </StatGrid>
  ),
};

export const BusinessMetrics = {
  render: () => (
    <StatGrid columns={4}>
      <StatItem icon={<DollarSign className="size-6" />} value="$2.5M" label="Annual Revenue" />
      <StatItem icon={<Users className="size-6" />} value="500+" label="Customers" />
      <StatItem icon={<TrendingUp className="size-6" />} value="45%" label="YoY Growth" />
      <StatItem icon={<Award className="size-6" />} value="98%" label="Satisfaction" />
    </StatGrid>
  ),
};

export const AllSizes = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Small Size</h3>
        <StatGrid columns={3}>
          <StatItem icon={<Users className="size-4" />} value="10K" label="Users" size="sm" />
          <StatItem
            icon={<TrendingUp className="size-4" />}
            value="150%"
            label="Growth"
            size="sm"
          />
          <StatItem
            icon={<DollarSign className="size-4" />}
            value="$2.5M"
            label="Revenue"
            size="sm"
          />
        </StatGrid>
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Medium Size</h3>
        <StatGrid columns={3}>
          <StatItem icon={<Users className="size-6" />} value="10K" label="Users" size="md" />
          <StatItem
            icon={<TrendingUp className="size-6" />}
            value="150%"
            label="Growth"
            size="md"
          />
          <StatItem
            icon={<DollarSign className="size-6" />}
            value="$2.5M"
            label="Revenue"
            size="md"
          />
        </StatGrid>
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Large Size</h3>
        <StatGrid columns={3}>
          <StatItem icon={<Users className="size-8" />} value="10K" label="Users" size="lg" />
          <StatItem
            icon={<TrendingUp className="size-8" />}
            value="150%"
            label="Growth"
            size="lg"
          />
          <StatItem
            icon={<DollarSign className="size-8" />}
            value="$2.5M"
            label="Revenue"
            size="lg"
          />
        </StatGrid>
      </div>
    </div>
  ),
};

export const AllLayouts = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Vertical Layout</h3>
        <StatGrid columns={3}>
          <StatItem
            icon={<Users className="size-6" />}
            value="10,000+"
            label="Active Users"
            layout="vertical"
          />
          <StatItem
            icon={<TrendingUp className="size-6" />}
            value="150%"
            label="Growth Rate"
            layout="vertical"
          />
          <StatItem
            icon={<DollarSign className="size-6" />}
            value="$2.5M"
            label="Revenue"
            layout="vertical"
          />
        </StatGrid>
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Horizontal Layout</h3>
        <StatGrid columns={2}>
          <StatItem
            icon={<Users className="size-6" />}
            value="10,000+"
            label="Active Users"
            layout="horizontal"
          />
          <StatItem
            icon={<TrendingUp className="size-6" />}
            value="150%"
            label="Growth Rate"
            layout="horizontal"
          />
        </StatGrid>
      </div>
    </div>
  ),
};

export const AllVariants = {
  render: () => (
    <StatGrid columns={3}>
      <StatItem
        icon={<Users className="size-6" />}
        value="10,000+"
        label="Default Variant"
        variant="default"
      />
      <StatItem
        icon={<TrendingUp className="size-6" />}
        value="150%"
        label="Muted Variant"
        variant="muted"
      />
      <StatItem
        icon={<DollarSign className="size-6" />}
        value="$2.5M"
        label="Accent Variant"
        variant="accent"
      />
    </StatGrid>
  ),
};

export const SimpleStats = {
  render: () => (
    <StatGrid columns={4}>
      <StatItem value="24/7" label="Support Available" />
      <StatItem value="100%" label="Satisfaction" />
      <StatItem value="50ms" label="Response Time" />
      <StatItem value="99.9%" label="Uptime" />
    </StatGrid>
  ),
};

export const EmojiIcons = {
  render: () => (
    <StatGrid columns={4}>
      <StatItem icon="👥" value="69,000+" label="Members" />
      <StatItem icon="🏭" value="170+" label="Companies" />
      <StatItem icon="📍" value="4" label="States" />
      <StatItem icon="🌎" value="20+" label="Countries" />
    </StatGrid>
  ),
};

export const CompleteExample = {
  render: () => (
    <div className="space-y-8 rounded-lg border p-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Our Impact</h2>
        <p className="text-muted-foreground mt-2">See how we&apos;re making a difference</p>
      </div>
      <StatGrid columns={4}>
        <StatItem
          icon={<Users className="size-6" />}
          value="69,000+"
          label="Union Members"
          size="lg"
          variant="accent"
        />
        <StatItem
          icon={
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          }
          value="170+"
          label="Partner Companies"
          size="lg"
          variant="accent"
        />
        <StatItem
          icon={
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>
          }
          value="4"
          label="Operating States"
          size="lg"
          variant="accent"
        />
        <StatItem
          icon={
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          value="20+"
          label="International Reach"
          size="lg"
          variant="accent"
        />
      </StatGrid>
    </div>
  ),
};
