import type { Meta, StoryObj } from "@storybook/nextjs";
import { EmptyState } from "./empty-state";
import { Search, FileText, Calendar, Users } from "lucide-react";
import { Button } from "./button";

const meta = {
  title: "UI/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "dashed", "minimal"],
      description: "Visual style variant",
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: Search,
    title: "No results found",
    description: "Try adjusting your search criteria or filters",
  },
};

export const WithAction: Story = {
  args: {
    icon: FileText,
    title: "No documents",
    description: "Get started by creating your first document",
    action: <Button variant="sitimm">Create Document</Button>,
  },
};

export const DashedVariant: Story = {
  args: {
    icon: Calendar,
    title: "No events scheduled",
    description: "There are no upcoming events at this time",
    variant: "dashed",
  },
};

export const MinimalVariant: Story = {
  args: {
    icon: Users,
    title: "No members",
    description: "No team members have been added yet",
    variant: "minimal",
  },
};

export const WithoutIcon: Story = {
  args: {
    title: "Nothing here yet",
    description: "This section is empty",
  },
};

export const AllVariants = {
  render: () => (
    <div className="flex flex-col gap-8">
      <EmptyState
        icon={Search}
        title="Default variant"
        description="Standard empty state with subtle background"
        variant="default"
      />
      <EmptyState
        icon={FileText}
        title="Dashed variant"
        description="Empty state with dashed border"
        variant="dashed"
      />
      <EmptyState
        icon={Calendar}
        title="Minimal variant"
        description="Minimal empty state without background"
        variant="minimal"
      />
    </div>
  ),
};
