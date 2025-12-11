import type { Meta, StoryObj } from "@storybook/nextjs";
import { BulletList, Checklist } from "./bullet-list";

const meta = {
  title: "UI/Bullet List",
  component: BulletList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    spacing: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Spacing between list items",
    },
    variant: {
      control: "select",
      options: ["default", "muted", "accent"],
      description: "Text color variant",
    },
    icon: {
      control: "select",
      options: ["check", "check-circle", "circle", "dot"],
      description: "Icon style",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Icon size",
    },
  },
} satisfies Meta<typeof BulletList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  "Lightning-fast performance with optimized rendering",
  "Built-in accessibility features for all users",
  "Responsive design that works on any device",
  "Comprehensive documentation and examples",
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const CheckCircleIcon: Story = {
  args: {
    items: sampleItems,
    icon: "check-circle",
    size: "md",
  },
};

export const CheckIcon: Story = {
  args: {
    items: sampleItems,
    icon: "check",
    size: "md",
  },
};

export const DotIcon: Story = {
  args: {
    items: ["Feature One", "Feature Two", "Feature Three", "Feature Four"],
    icon: "dot",
    size: "md",
  },
};

export const CircleIcon: Story = {
  args: {
    items: ["Upcoming feature", "In development", "Planned for Q2", "Under consideration"],
    icon: "circle",
    size: "md",
  },
};

export const SmallSpacing: Story = {
  args: {
    items: ["Compact list item", "Another compact item", "Third compact item"],
    spacing: "sm",
  },
};

export const LargeSpacing: Story = {
  args: {
    items: [
      "List item with more breathing room",
      "Another item with extra space",
      "Third item with comfortable spacing",
    ],
    spacing: "lg",
  },
};

export const MutedVariant: Story = {
  args: {
    items: ["Secondary information", "Additional details", "Optional features"],
    variant: "muted",
  },
};

export const AccentVariant: Story = {
  args: {
    items: ["Highlighted feature", "Important benefit", "Key advantage"],
    variant: "accent",
  },
};

export const SmallSize: Story = {
  args: {
    items: ["Small list item", "Another small item", "Third small item"],
    size: "sm",
  },
};

export const LargeSize: Story = {
  args: {
    items: ["Large list item", "Another large item", "Third large item"],
    size: "lg",
  },
};

export const ProductFeatures: Story = {
  args: {
    items: [
      "Unlimited projects and team members",
      "Advanced analytics and reporting",
      "Priority customer support 24/7",
      "Custom integrations with your tools",
      "Enterprise-grade security and compliance",
    ],
    icon: "check-circle",
    spacing: "lg",
    variant: "default",
  },
};

export const ShortList: Story = {
  args: {
    items: ["Simple", "Fast", "Reliable"],
    spacing: "sm",
    size: "sm",
  },
};

export const ChecklistWithAllChecked = {
  render: () => (
    <Checklist
      items={[
        "Set up development environment",
        "Create initial project structure",
        "Install dependencies",
        "Configure build tools",
      ]}
    />
  ),
};

export const ChecklistWithMixed = {
  render: () => (
    <Checklist
      items={[
        "Complete onboarding tutorial",
        "Connect your first integration",
        "Invite team members",
        "Deploy first project",
        "Set up monitoring",
      ]}
      checked={[true, true, true, false, false]}
    />
  ),
};

export const ChecklistTodoList = {
  render: () => (
    <Checklist
      items={[
        "Review pull requests",
        "Update documentation",
        "Fix reported bugs",
        "Plan sprint meeting",
        "Code review session",
      ]}
      checked={[true, true, false, false, false]}
      spacing="md"
    />
  ),
};

export const ComparisonList = {
  render: () => (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Free Plan</h3>
        <BulletList
          items={["Up to 3 projects", "Basic analytics", "Community support", "1GB storage"]}
          icon="check"
          variant="muted"
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Pro Plan</h3>
        <BulletList
          items={[
            "Unlimited projects",
            "Advanced analytics",
            "Priority support",
            "100GB storage",
            "Custom integrations",
          ]}
          icon="check-circle"
          variant="accent"
          size="lg"
        />
      </div>
    </div>
  ),
};

export const AllSpacingVariants = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-muted-foreground mb-2 text-sm font-semibold">Small Spacing</h3>
        <BulletList items={["Item 1", "Item 2", "Item 3"]} spacing="sm" />
      </div>
      <div>
        <h3 className="text-muted-foreground mb-2 text-sm font-semibold">Medium Spacing</h3>
        <BulletList items={["Item 1", "Item 2", "Item 3"]} spacing="md" />
      </div>
      <div>
        <h3 className="text-muted-foreground mb-2 text-sm font-semibold">Large Spacing</h3>
        <BulletList items={["Item 1", "Item 2", "Item 3"]} spacing="lg" />
      </div>
    </div>
  ),
};

export const AllIconStyles = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h3 className="mb-3 text-sm font-semibold">Check Circle</h3>
        <BulletList items={["Feature 1", "Feature 2", "Feature 3"]} icon="check-circle" />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold">Check</h3>
        <BulletList items={["Feature 1", "Feature 2", "Feature 3"]} icon="check" />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold">Circle</h3>
        <BulletList items={["Feature 1", "Feature 2", "Feature 3"]} icon="circle" />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold">Dot</h3>
        <BulletList items={["Feature 1", "Feature 2", "Feature 3"]} icon="dot" />
      </div>
    </div>
  ),
};
