import type { Meta, StoryObj } from "@storybook/nextjs";
import { Spinner } from "./spinner";

const meta = {
  title: "UI/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const AllSizes = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <Spinner size="sm" />
        <p className="text-muted-foreground mt-2 text-xs">Small</p>
      </div>
      <div className="text-center">
        <Spinner size="md" />
        <p className="text-muted-foreground mt-2 text-xs">Medium</p>
      </div>
      <div className="text-center">
        <Spinner size="lg" />
        <p className="text-muted-foreground mt-2 text-xs">Large</p>
      </div>
    </div>
  ),
};

export const LoadingButton = {
  render: () => (
    <button className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-md px-4 py-2">
      <Spinner size="sm" />
      Loading...
    </button>
  ),
};

export const LoadingCard = {
  render: () => (
    <div className="w-[350px] rounded-lg border p-6">
      <div className="flex flex-col items-center justify-center space-y-4 py-8">
        <Spinner size="lg" />
        <p className="text-muted-foreground text-sm">Loading content...</p>
      </div>
    </div>
  ),
};

export const InlineLoading = {
  render: () => (
    <div className="space-y-3">
      <p className="flex items-center gap-2 text-sm">
        <Spinner size="sm" />
        Processing your request...
      </p>
      <p className="flex items-center gap-2 text-sm">
        <Spinner size="sm" />
        Uploading files...
      </p>
      <p className="flex items-center gap-2 text-sm">
        <Spinner size="sm" />
        Syncing data...
      </p>
    </div>
  ),
};

export const FullPageLoader = {
  render: () => (
    <div className="bg-muted/20 flex h-[400px] w-[600px] items-center justify-center rounded-lg border">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="text-muted-foreground mt-4 text-sm">Loading your dashboard...</p>
      </div>
    </div>
  ),
};
