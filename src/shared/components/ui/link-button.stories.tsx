import type { Meta, StoryObj } from "@storybook/nextjs";
import { LinkButton } from "./link-button";

const meta = {
  title: "UI/Link Button",
  component: LinkButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "button", "ghost", "arrow"],
    },
  },
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "/",
    children: "Go Home",
  },
};

export const Primary: Story = {
  args: {
    href: "/about",
    variant: "default",
    children: "About Us",
  },
};

export const Button: Story = {
  args: {
    href: "/contact",
    variant: "button",
    children: "Contact",
  },
};

export const Ghost: Story = {
  args: {
    href: "/blog",
    variant: "ghost",
    children: "Blog",
  },
};

export const Arrow: Story = {
  args: {
    href: "/docs",
    variant: "arrow",
    children: "Documentation",
  },
};

export const ExternalLink: Story = {
  args: {
    href: "https://github.com",
    external: true,
    children: "GitHub",
  },
};

export const WithArrow = {
  render: () => <LinkButton href="/learn-more">Learn More →</LinkButton>,
};

export const AllVariantsShowcase = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <LinkButton href="/" variant="default">
        Default Link
      </LinkButton>
      <LinkButton href="/" variant="button">
        Button Link
      </LinkButton>
      <LinkButton href="/" variant="ghost">
        Ghost Link
      </LinkButton>
      <LinkButton href="/" variant="arrow">
        Arrow Link
      </LinkButton>
    </div>
  ),
};

export const AllVariants = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <LinkButton href="/" variant="default">
        Default
      </LinkButton>
      <LinkButton href="/" variant="button">
        Button
      </LinkButton>
      <LinkButton href="/" variant="ghost">
        Ghost
      </LinkButton>
      <LinkButton href="/" variant="arrow">
        Arrow
      </LinkButton>
    </div>
  ),
};

export const Navigation = {
  render: () => (
    <nav className="flex gap-2">
      <LinkButton href="/" variant="ghost">
        Home
      </LinkButton>
      <LinkButton href="/products" variant="ghost">
        Products
      </LinkButton>
      <LinkButton href="/about" variant="ghost">
        About
      </LinkButton>
      <LinkButton href="/contact" variant="button">
        Contact
      </LinkButton>
    </nav>
  ),
};

export const CTAButtons = {
  render: () => (
    <div className="flex gap-3">
      <LinkButton href="/get-started" variant="button">
        Get Started
      </LinkButton>
      <LinkButton href="/learn-more" variant="button">
        Learn More
      </LinkButton>
    </div>
  ),
};
