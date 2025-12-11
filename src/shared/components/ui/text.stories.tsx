import type { Meta, StoryObj } from "@storybook/nextjs";
import { Text, Paragraph, Lead, Small, Muted, Code, Kbd } from "./text";

const meta = {
  title: "UI/Text",
  component: Text,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "base", "lg", "xl", "2xl"],
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
    },
    color: {
      control: "select",
      options: [
        "default",
        "muted",
        "primary",
        "secondary",
        "accent",
        "destructive",
        "success",
        "warning",
      ],
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is default text",
  },
};

export const Sizes: Story = {
  args: { children: "" },
  render: () => (
    <div className="space-y-2">
      <Text size="xs">Extra Small Text</Text>
      <Text size="sm">Small Text</Text>
      <Text size="base">Base Text</Text>
      <Text size="lg">Large Text</Text>
      <Text size="xl">Extra Large Text</Text>
      <Text size="2xl">2XL Text</Text>
    </div>
  ),
};

export const Weights: Story = {
  args: { children: "" },
  render: () => (
    <div className="space-y-2">
      <Text weight="normal">Normal Weight</Text>
      <Text weight="medium">Medium Weight</Text>
      <Text weight="semibold">Semibold Weight</Text>
      <Text weight="bold">Bold Weight</Text>
    </div>
  ),
};

export const Colors: Story = {
  args: { children: "" },
  render: () => (
    <div className="space-y-2">
      <Text color="default">Default Color</Text>
      <Text color="muted">Muted Color</Text>
      <Text color="primary">Primary Color</Text>
      <Text color="accent">Accent Color</Text>
      <Text color="destructive">Destructive Color</Text>
      <Text color="success">Success Color</Text>
      <Text color="warning">Warning Color</Text>
    </div>
  ),
};

export const Alignment: Story = {
  args: { children: "" },
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <Text align="left" className="border p-2">
        Left Aligned Text
      </Text>
      <Text align="center" className="border p-2">
        Center Aligned Text
      </Text>
      <Text align="right" className="border p-2">
        Right Aligned Text
      </Text>
      <Text align="justify" className="border p-2">
        Justified text will distribute evenly across the line when there is enough content to fill
        multiple lines.
      </Text>
    </div>
  ),
};

export const Transform: Story = {
  args: { children: "" },
  render: () => (
    <div className="space-y-2">
      <Text transform="none">Normal Case Text</Text>
      <Text transform="uppercase">Uppercase Text</Text>
      <Text transform="lowercase">LOWERCASE TEXT</Text>
      <Text transform="capitalize">capitalize each word</Text>
    </div>
  ),
};

export const Truncate: Story = {
  args: { children: "" },
  render: () => (
    <div className="w-[300px] space-y-2">
      <Text truncate>
        This is a very long text that will be truncated with an ellipsis when it exceeds the
        container width
      </Text>
      <Text lineClamp={2}>
        This is a multi-line text that will be clamped to exactly 2 lines. Any content beyond these
        two lines will be hidden with an ellipsis at the end of the second line.
      </Text>
      <Text lineClamp={3}>
        This is a multi-line text that will be clamped to exactly 3 lines. Any content beyond these
        three lines will be hidden with an ellipsis. You can use this for previews or summaries
        where you want to limit the visible text.
      </Text>
    </div>
  ),
};

export const ParagraphComponent: Story = {
  args: { children: "" },
  render: () => (
    <div className="max-w-prose space-y-4">
      <Paragraph>
        This is a standard paragraph with proper line height. Paragraphs are great for regular body
        text and maintain good readability with the leading-7 class.
      </Paragraph>
      <Paragraph weight="medium">
        You can also make paragraphs medium weight for slightly more emphasis while maintaining
        readability.
      </Paragraph>
    </div>
  ),
};

export const LeadComponent: Story = {
  args: { children: "" },
  render: () => (
    <div className="max-w-prose">
      <Lead>
        This is lead text, perfect for introductions or highlighting important information at the
        start of content. It&apos;s slightly larger and has a muted color.
      </Lead>
    </div>
  ),
};

export const SmallComponent: Story = {
  args: { children: "" },
  render: () => (
    <div className="space-y-2">
      <Small>This is small text, perfect for captions or metadata</Small>
      <Small color="muted">Small muted text for less important information</Small>
    </div>
  ),
};

export const MutedComponent: Story = {
  args: { children: "" },
  render: () => (
    <div className="space-y-2">
      <Muted>This is muted text, great for secondary information</Muted>
      <Muted>Last updated 2 hours ago</Muted>
    </div>
  ),
};

export const CodeComponent: Story = {
  args: { children: "" },
  render: () => (
    <div className="space-y-3">
      <Text>
        Use the <Code>npm install</Code> command to install packages
      </Text>
      <Text>
        The <Code>className</Code> prop accepts Tailwind classes
      </Text>
      <Text>
        Import components with{" "}
        <Code>import &#123; Button &#125; from &quot;@/components/ui/button&quot;</Code>
      </Text>
    </div>
  ),
};

export const KbdComponent: Story = {
  args: { children: "" },
  render: () => (
    <div className="space-y-3">
      <Text>
        Press <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd> to copy
      </Text>
      <Text>
        Press <Kbd>Cmd</Kbd> + <Kbd>K</Kbd> to open search
      </Text>
      <Text>
        Use <Kbd>←</Kbd> <Kbd>→</Kbd> arrow keys to navigate
      </Text>
      <Text>
        Press <Kbd>Esc</Kbd> to close
      </Text>
    </div>
  ),
};

export const RichContent: Story = {
  args: { children: "" },
  render: () => (
    <div className="max-w-2xl space-y-6">
      <div>
        <Text size="2xl" weight="bold">
          Article Title
        </Text>
        <Small color="muted">Published on October 3, 2025</Small>
      </div>

      <Lead>
        This is the lead paragraph that introduces the article topic. It&apos;s designed to grab
        attention and provide context for what follows.
      </Lead>

      <Paragraph>
        Regular paragraph text flows naturally with proper spacing. You can use inline elements like{" "}
        <Code>code</Code>
        and <Kbd>Ctrl+K</Kbd> keyboard shortcuts within paragraphs.
      </Paragraph>

      <Paragraph>
        Text can be{" "}
        <Text as="span" weight="bold">
          bold
        </Text>
        ,{" "}
        <Text as="span" color="primary">
          colored
        </Text>
        , or
        <Text as="span" color="muted">
          {" "}
          muted
        </Text>{" "}
        to emphasize different parts of your content.
      </Paragraph>

      <Muted>
        This is a footnote or additional context that&apos;s less important than the main content.
      </Muted>
    </div>
  ),
};
