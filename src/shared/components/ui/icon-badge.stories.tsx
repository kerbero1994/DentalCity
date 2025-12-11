import type { Meta, StoryObj } from "@storybook/nextjs";
import { IconBadge } from "./icon-badge";
import { Calendar, Star, Bell, Heart, User, Settings } from "lucide-react";

const meta = {
  title: "UI/IconBadge",
  component: IconBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "ghost"],
      description: "Color variant",
    },
  },
} satisfies Meta<typeof IconBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: Calendar,
  },
};

export const Primary: Story = {
  args: {
    icon: Star,
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    icon: Bell,
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    icon: Heart,
    variant: "ghost",
  },
};

export const Sizes = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconBadge icon={User} size="sm" variant="primary" />
      <IconBadge icon={User} size="md" variant="primary" />
      <IconBadge icon={User} size="lg" variant="primary" />
    </div>
  ),
};

export const AllVariants = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconBadge icon={Settings} variant="default" />
      <IconBadge icon={Settings} variant="primary" />
      <IconBadge icon={Settings} variant="secondary" />
      <div className="rounded-lg bg-gray-800 p-2">
        <IconBadge icon={Settings} variant="ghost" />
      </div>
    </div>
  ),
};

export const IconShowcase = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <IconBadge icon={Calendar} variant="primary" />
      <IconBadge icon={Star} variant="secondary" />
      <IconBadge icon={Bell} variant="default" />
      <IconBadge icon={Heart} variant="primary" />
      <IconBadge icon={User} variant="secondary" />
      <IconBadge icon={Settings} variant="default" />
    </div>
  ),
};
