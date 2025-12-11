import type { Meta, StoryObj } from "@storybook/nextjs";
import { Heading, HeadingWithAccent } from "./heading";

const meta = {
  title: "UI/Heading",
  component: Heading,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      description: "Heading level and size",
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold", "extrabold"],
      description: "Font weight",
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Text alignment",
    },
    color: {
      control: "select",
      options: ["default", "muted", "primary", "accent"],
      description: "Text color variant",
    },
    gradient: {
      control: "boolean",
      description: "Apply gradient effect",
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    level: "h1",
    children: "Heading Level 1",
  },
};

export const H2: Story = {
  args: {
    level: "h2",
    children: "Heading Level 2",
  },
};

export const H3: Story = {
  args: {
    level: "h3",
    children: "Heading Level 3",
  },
};

export const H4: Story = {
  args: {
    level: "h4",
    children: "Heading Level 4",
  },
};

export const AllLevels = {
  render: () => (
    <div className="space-y-4">
      <Heading level="h1">Heading Level 1</Heading>
      <Heading level="h2">Heading Level 2</Heading>
      <Heading level="h3">Heading Level 3</Heading>
      <Heading level="h4">Heading Level 4</Heading>
      <Heading level="h5">Heading Level 5</Heading>
      <Heading level="h6">Heading Level 6</Heading>
    </div>
  ),
};

export const ColorVariants = {
  render: () => (
    <div className="space-y-4">
      <Heading color="default">Default Color</Heading>
      <Heading color="muted">Muted Color</Heading>
      <Heading color="primary">Primary Color</Heading>
      <Heading color="accent">Accent Color</Heading>
    </div>
  ),
};

export const WithGradient: Story = {
  args: {
    level: "h1",
    gradient: true,
    children: "Beautiful Gradient Heading",
  },
};

export const Centered: Story = {
  args: {
    level: "h2",
    align: "center",
    children: "Centered Heading",
  },
};

export const WithAccent = {
  render: () => (
    <div className="space-y-4">
      <HeadingWithAccent level="h2" accent="with accent">
        Heading
      </HeadingWithAccent>
      <HeadingWithAccent level="h2" accent="is important" accentColor="accent">
        This text
      </HeadingWithAccent>
      <HeadingWithAccent level="h3" accent="🎯" accentColor="primary">
        With Emoji
      </HeadingWithAccent>
    </div>
  ),
};

export const WeightVariants = {
  render: () => (
    <div className="space-y-4">
      <Heading weight="normal">Normal Weight</Heading>
      <Heading weight="medium">Medium Weight</Heading>
      <Heading weight="semibold">Semibold Weight</Heading>
      <Heading weight="bold">Bold Weight</Heading>
      <Heading weight="extrabold">Extrabold Weight</Heading>
    </div>
  ),
};
