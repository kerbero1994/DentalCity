import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "./badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
      description: "Visual style variant of the badge",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const AllVariants = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const WithEmojis = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>✨ New</Badge>
      <Badge variant="secondary">🔥 Hot</Badge>
      <Badge variant="destructive">⚠️ Alert</Badge>
      <Badge variant="outline">📢 Announcement</Badge>
    </div>
  ),
};

export const Statuses = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Badge className="bg-green-500">Active</Badge>
        <span>User is online</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge className="bg-yellow-500">Pending</Badge>
        <span>Awaiting approval</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="destructive">Inactive</Badge>
        <span>User is offline</span>
      </div>
    </div>
  ),
};
