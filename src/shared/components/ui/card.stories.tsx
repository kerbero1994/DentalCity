import type { Meta, StoryObj } from "@storybook/nextjs";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./card";
import { Button } from "./button";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type _Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content area with information and details.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Project Update</CardTitle>
        <CardDescription>Your project has been successfully deployed</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          All systems are running smoothly. Your application is now live and accessible to users.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>View Project</Button>
      </CardFooter>
    </Card>
  ),
};

export const SimpleCard = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>A simple card with just content, no header or footer.</p>
      </CardContent>
    </Card>
  ),
};

export const MultipleCards = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Feature 1</CardTitle>
          <CardDescription>Fast & Reliable</CardDescription>
        </CardHeader>
        <CardContent>Built for performance and scalability.</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Feature 2</CardTitle>
          <CardDescription>Easy to Use</CardDescription>
        </CardHeader>
        <CardContent>Intuitive interface for all users.</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Feature 3</CardTitle>
          <CardDescription>Secure</CardDescription>
        </CardHeader>
        <CardContent>Enterprise-grade security built-in.</CardContent>
      </Card>
    </div>
  ),
};
