import type { Meta, StoryObj } from "@storybook/nextjs";
import { PremiumButton } from "./premium-button";
import { ArrowRight, Download, Send, Plus } from "lucide-react";
import { NextIntlClientProvider } from "next-intl";

const messages = {
  ui: {
    button: {
      loading: "Loading...",
    },
  },
};

const meta = {
  title: "UI/PremiumButton",
  component: PremiumButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="es" messages={messages}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "destructive"],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Size variant",
    },
    loading: {
      control: "boolean",
      description: "Loading state",
    },
    pulse: {
      control: "boolean",
      description: "Pulse animation effect",
    },
    glow: {
      control: "boolean",
      description: "Glow effect",
    },
    fullWidth: {
      control: "boolean",
      description: "Full width button",
    },
  },
} satisfies Meta<typeof PremiumButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
  },
};

export const Destructive: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
  },
};

export const WithIcon: Story = {
  args: {
    children: "Continue",
    variant: "primary",
    icon: <ArrowRight className="h-4 w-4" />,
    iconPosition: "right",
  },
};

export const WithIconLeft: Story = {
  args: {
    children: "Download",
    variant: "primary",
    icon: <Download className="h-4 w-4" />,
    iconPosition: "left",
  },
};

export const Loading: Story = {
  args: {
    children: "Submit",
    variant: "primary",
    loading: true,
  },
};

export const WithGlow: Story = {
  args: {
    children: "Glow Effect",
    variant: "primary",
    glow: true,
  },
};

export const WithPulse: Story = {
  args: {
    children: "Pulse Effect",
    variant: "primary",
    pulse: true,
  },
};

export const Sizes = {
  render: () => (
    <div className="flex items-center gap-4">
      <PremiumButton size="sm">Small</PremiumButton>
      <PremiumButton size="md">Medium</PremiumButton>
      <PremiumButton size="lg">Large</PremiumButton>
      <PremiumButton size="xl">Extra Large</PremiumButton>
    </div>
  ),
};

export const AllVariants = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <PremiumButton variant="primary">Primary</PremiumButton>
      <PremiumButton variant="secondary">Secondary</PremiumButton>
      <PremiumButton variant="outline">Outline</PremiumButton>
      <PremiumButton variant="ghost">Ghost</PremiumButton>
      <PremiumButton variant="destructive">Destructive</PremiumButton>
    </div>
  ),
};

export const IconButtons = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <PremiumButton icon={<Send className="h-4 w-4" />}>Send</PremiumButton>
      <PremiumButton icon={<Download className="h-4 w-4" />} variant="secondary">
        Download
      </PremiumButton>
      <PremiumButton icon={<Plus className="h-4 w-4" />} variant="outline">
        Add New
      </PremiumButton>
      <PremiumButton icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
        Next
      </PremiumButton>
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    children: "Full Width Button",
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="es" messages={messages}>
        <div className="w-80">
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};
