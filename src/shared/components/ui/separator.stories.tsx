import type { Meta, StoryObj } from "@storybook/nextjs";
import { Separator } from "./separator";

const meta = {
  title: "UI/Separator",
  component: Separator,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type _Story = StoryObj<typeof meta>;

export const Horizontal = {
  render: () => (
    <div className="w-full max-w-md">
      <div className="space-y-1">
        <h4 className="text-sm leading-none font-medium">Radix Primitives</h4>
        <p className="text-muted-foreground text-sm">An open-source UI component library.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

export const Vertical = {
  render: () => (
    <div className="flex h-20 items-center space-x-4">
      <div className="text-sm">Item 1</div>
      <Separator orientation="vertical" />
      <div className="text-sm">Item 2</div>
      <Separator orientation="vertical" />
      <div className="text-sm">Item 3</div>
    </div>
  ),
};

export const InCard = {
  render: () => (
    <div className="w-[350px] space-y-4 rounded-lg border p-6">
      <div>
        <h3 className="text-lg font-semibold">Account Settings</h3>
        <p className="text-muted-foreground text-sm">Manage your account preferences</p>
      </div>
      <Separator />
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">Email Notifications</span>
          <span className="text-muted-foreground text-sm">Enabled</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-sm">Two-Factor Auth</span>
          <span className="text-muted-foreground text-sm">Disabled</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-sm">Language</span>
          <span className="text-muted-foreground text-sm">English</span>
        </div>
      </div>
    </div>
  ),
};

export const NavigationMenu = {
  render: () => (
    <div className="w-full max-w-4xl">
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <a href="https://example.com" className="hover:text-primary transition-colors">
          Overview
        </a>
        <Separator orientation="vertical" className="h-4" />
        <a href="https://example.com" className="hover:text-primary transition-colors">
          Customers
        </a>
        <Separator orientation="vertical" className="h-4" />
        <a href="https://example.com" className="hover:text-primary transition-colors">
          Products
        </a>
        <Separator orientation="vertical" className="h-4" />
        <a href="https://example.com" className="hover:text-primary transition-colors">
          Settings
        </a>
      </nav>
    </div>
  ),
};

export const SectionDivider = {
  render: () => (
    <div className="w-full max-w-2xl space-y-8">
      <section>
        <h2 className="mb-2 text-2xl font-bold">Section One</h2>
        <p className="text-muted-foreground">Content for the first section goes here.</p>
      </section>
      <Separator />
      <section>
        <h2 className="mb-2 text-2xl font-bold">Section Two</h2>
        <p className="text-muted-foreground">Content for the second section goes here.</p>
      </section>
      <Separator />
      <section>
        <h2 className="mb-2 text-2xl font-bold">Section Three</h2>
        <p className="text-muted-foreground">Content for the third section goes here.</p>
      </section>
    </div>
  ),
};
