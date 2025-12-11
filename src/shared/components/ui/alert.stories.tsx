import type { Meta, StoryObj } from "@storybook/nextjs";
import { Alert, AlertDescription, AlertTitle } from "./alert";

const meta = {
  title: "UI/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type _Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <Alert>
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>This is an informational alert message.</AlertDescription>
    </Alert>
  ),
};

export const Destructive = {
  render: () => (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Something went wrong. Please try again.</AlertDescription>
    </Alert>
  ),
};

export const TitleOnly = {
  render: () => (
    <Alert>
      <AlertTitle>Quick Alert</AlertTitle>
    </Alert>
  ),
};

export const DescriptionOnly = {
  render: () => (
    <Alert>
      <AlertDescription>Simple message without a title.</AlertDescription>
    </Alert>
  ),
};

export const WithIcon = {
  render: () => (
    <div className="space-y-4">
      <Alert>
        <span className="mr-2">ℹ️</span>
        <div>
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>This alert includes an icon for better visibility.</AlertDescription>
        </div>
      </Alert>
      <Alert variant="destructive">
        <span className="mr-2">⚠️</span>
        <div>
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>Critical action required.</AlertDescription>
        </div>
      </Alert>
    </div>
  ),
};

export const AllVariants = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <Alert>
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>Standard informational alert message.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>Error or warning message that needs attention.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const LongContent = {
  render: () => (
    <Alert>
      <AlertTitle>Detailed Information</AlertTitle>
      <AlertDescription>
        This is a longer alert message that demonstrates how the alert component handles multiple
        lines of text. It will wrap gracefully and maintain proper spacing. You can include detailed
        information, instructions, or any other content that users need to read carefully.
      </AlertDescription>
    </Alert>
  ),
};
