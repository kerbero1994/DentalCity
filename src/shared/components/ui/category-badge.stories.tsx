import type { Meta, StoryObj } from "@storybook/nextjs";
import { CategoryBadge } from "./category-badge";

const meta = {
  title: "UI/CategoryBadge",
  component: CategoryBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    category: {
      control: "select",
      options: ["SITIMM", "IMSS", "INFONAVIT", "FONACOT", "AFORE", undefined],
      description: "Institution category for color mapping",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    variant: {
      control: "select",
      options: ["solid", "subtle", "ghost"],
      description: "Visual style variant",
    },
  },
} satisfies Meta<typeof CategoryBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "SITIMM",
    category: "SITIMM",
  },
};

export const IMSS: Story = {
  args: {
    label: "IMSS",
    category: "IMSS",
  },
};

export const INFONAVIT: Story = {
  args: {
    label: "INFONAVIT",
    category: "INFONAVIT",
  },
};

export const FONACOT: Story = {
  args: {
    label: "FONACOT",
    category: "FONACOT",
  },
};

export const AFORE: Story = {
  args: {
    label: "AFORE",
    category: "AFORE",
  },
};

export const AllCategories = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <CategoryBadge label="SITIMM" category="SITIMM" />
      <CategoryBadge label="IMSS" category="IMSS" />
      <CategoryBadge label="INFONAVIT" category="INFONAVIT" />
      <CategoryBadge label="FONACOT" category="FONACOT" />
      <CategoryBadge label="AFORE" category="AFORE" />
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div className="flex items-center gap-2">
      <CategoryBadge label="Small" category="SITIMM" size="sm" />
      <CategoryBadge label="Medium" category="SITIMM" size="md" />
      <CategoryBadge label="Large" category="SITIMM" size="lg" />
    </div>
  ),
};

export const SubtleVariant = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <CategoryBadge label="SITIMM" category="SITIMM" variant="subtle" />
      <CategoryBadge label="IMSS" category="IMSS" variant="subtle" />
      <CategoryBadge label="INFONAVIT" category="INFONAVIT" variant="subtle" />
      <CategoryBadge label="FONACOT" category="FONACOT" variant="subtle" />
      <CategoryBadge label="AFORE" category="AFORE" variant="subtle" />
    </div>
  ),
};

export const WithoutCategory: Story = {
  args: {
    label: "Custom Label",
  },
};
