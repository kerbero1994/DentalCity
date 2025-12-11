import type { Meta, StoryObj } from "@storybook/nextjs";
import { Container } from "./container";

const meta = {
  title: "UI/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type _Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <Container className="bg-gray-100 py-8">
      <div className="rounded-lg bg-white p-6">
        <h2 className="mb-2 text-2xl font-bold">Default Container</h2>
        <p className="text-muted-foreground">This content is centered with max-width constraints</p>
      </div>
    </Container>
  ),
};

export const Small = {
  render: () => (
    <Container size="sm" className="bg-gray-100 py-8">
      <div className="rounded-lg bg-white p-6">
        <h2 className="mb-2 text-2xl font-bold">Small Container</h2>
        <p className="text-muted-foreground">
          Perfect for focused content or forms (max-w-screen-sm)
        </p>
      </div>
    </Container>
  ),
};

export const Medium = {
  render: () => (
    <Container size="md" className="bg-gray-100 py-8">
      <div className="rounded-lg bg-white p-6">
        <h2 className="mb-2 text-2xl font-bold">Medium Container</h2>
        <p className="text-muted-foreground">Ideal for articles and blog posts (max-w-screen-md)</p>
      </div>
    </Container>
  ),
};

export const Large = {
  render: () => (
    <Container size="lg" className="bg-gray-100 py-8">
      <div className="rounded-lg bg-white p-6">
        <h2 className="mb-2 text-2xl font-bold">Large Container</h2>
        <p className="text-muted-foreground">
          Great for dashboards and content-rich pages (max-w-screen-lg)
        </p>
      </div>
    </Container>
  ),
};

export const ExtraLarge = {
  render: () => (
    <Container size="xl" className="bg-gray-100 py-8">
      <div className="rounded-lg bg-white p-6">
        <h2 className="mb-2 text-2xl font-bold">Extra Large Container</h2>
        <p className="text-muted-foreground">
          For wide layouts and marketing pages (max-w-screen-xl)
        </p>
      </div>
    </Container>
  ),
};

export const Full = {
  render: () => (
    <Container size="full" className="bg-gray-100 py-8">
      <div className="rounded-lg bg-white p-6">
        <h2 className="mb-2 text-2xl font-bold">Full Width Container</h2>
        <p className="text-muted-foreground">Uses the full width of the viewport (w-full)</p>
      </div>
    </Container>
  ),
};

export const AllSizes = {
  render: () => (
    <div className="space-y-4 py-8">
      {[
        { size: "sm" as const, label: "Small" },
        { size: "md" as const, label: "Medium" },
        { size: "lg" as const, label: "Large" },
        { size: "xl" as const, label: "Extra Large" },
        { size: "full" as const, label: "Full Width" },
      ].map(({ size, label }) => (
        <Container key={size} size={size} className="bg-gray-100">
          <div className="rounded-lg bg-white p-4">
            <p className="font-medium">
              {label} Container ({size})
            </p>
          </div>
        </Container>
      ))}
    </div>
  ),
};

export const NestedContent = {
  render: () => (
    <Container className="bg-gray-100 py-8">
      <div className="space-y-6">
        <header className="rounded-lg bg-white p-6">
          <h1 className="text-3xl font-bold">Page Title</h1>
          <p className="text-muted-foreground mt-2">Subtitle or description</p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6">
            <h2 className="mb-2 text-xl font-semibold">Feature 1</h2>
            <p className="text-muted-foreground">Content goes here</p>
          </div>
          <div className="rounded-lg bg-white p-6">
            <h2 className="mb-2 text-xl font-semibold">Feature 2</h2>
            <p className="text-muted-foreground">Content goes here</p>
          </div>
        </div>

        <footer className="rounded-lg bg-white p-6">
          <p className="text-muted-foreground text-sm">Footer content</p>
        </footer>
      </div>
    </Container>
  ),
};
