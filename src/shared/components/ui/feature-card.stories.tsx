/* eslint-disable jsx-a11y/aria-role */
import type { Meta, StoryObj } from "@storybook/nextjs";
import { FeatureCard, CompactFeatureCard, TestimonialCard } from "./feature-card";
import { Zap, Shield, Palette, Rocket, TrendingUp, Users } from "lucide-react";
import { Button } from "./button";

const meta = {
  title: "UI/Feature Card",
  component: FeatureCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "ghost", "gradient"],
      description: "Visual style variant",
    },
    layout: {
      control: "select",
      options: ["vertical", "horizontal", "image-top"],
      description: "Card layout direction",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Padding size",
    },
  },
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <Zap className="size-6" />,
    title: "Lightning Fast",
    description: "Optimized for performance with instant page loads and smart caching mechanisms.",
    href: "/features/performance",
  },
};

export const WithImage: Story = {
  args: {
    title: "Advanced Analytics",
    description:
      "Get deep insights into your business with real-time data and AI-powered recommendations.",
    image: {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
      alt: "Analytics dashboard",
    },
    href: "/features/analytics",
  },
};

export const WithBadge: Story = {
  args: {
    icon: <Rocket className="size-6" />,
    badge: "New",
    title: "Auto Deployments",
    description: "Deploy to production automatically with every commit. Zero downtime guaranteed.",
    href: "/features/deploy",
  },
};

export const OutlineVariant: Story = {
  args: {
    icon: <Shield className="size-6" />,
    title: "Enterprise Security",
    description: "Bank-level encryption, SOC 2 compliance, and advanced access controls.",
    variant: "outline",
    href: "/security",
  },
};

export const GradientVariant: Story = {
  args: {
    icon: <Palette className="size-6" />,
    title: "Beautiful Design",
    description: "Stunning interfaces that users love. Dark mode included.",
    variant: "gradient",
    href: "/design",
  },
};

export const GhostVariant: Story = {
  args: {
    icon: <Users className="size-6" />,
    title: "Team Collaboration",
    description: "Work together seamlessly with built-in chat, video, and shared workspaces.",
    variant: "ghost",
    href: "/collaboration",
  },
};

export const HorizontalLayout: Story = {
  args: {
    icon: <TrendingUp className="size-6" />,
    title: "Growth Tools",
    description:
      "A/B testing, conversion funnels, and user journey mapping to optimize your business.",
    layout: "horizontal",
    href: "/growth",
  },
};

export const HorizontalWithImage: Story = {
  args: {
    title: "Mobile Ready",
    description: "Works perfectly on all devices with responsive design.",
    layout: "horizontal",
    image: {
      src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
      alt: "Mobile devices",
    },
    href: "/mobile",
  },
};

export const SmallSize: Story = {
  args: {
    icon: <Zap className="size-5" />,
    title: "Quick Setup",
    description: "Get started in minutes with our simple onboarding process.",
    size: "sm",
    href: "/setup",
  },
};

export const LargeSize: Story = {
  args: {
    icon: <Shield className="size-8" />,
    title: "Enterprise Solution",
    description:
      "Complete platform for large organizations with dedicated support and custom integrations.",
    size: "lg",
    href: "/enterprise",
  },
};

export const WithActions: Story = {
  args: {
    icon: <Rocket className="size-6" />,
    title: "Deploy Anywhere",
    description: "Support for AWS, Azure, GCP, and more. One-click deployment to any platform.",
    actions: (
      <>
        <Button size="sm" variant="default">
          Get Started
        </Button>
        <Button size="sm" variant="outline">
          Learn More
        </Button>
      </>
    ),
  },
};

export const NoLink: Story = {
  args: {
    icon: <Palette className="size-6" />,
    title: "Customizable Themes",
    description: "Create your own themes or choose from our library of pre-built designs.",
  },
};

export const ImageTop: Story = {
  args: {
    title: "Integration Marketplace",
    description: "Connect with hundreds of apps and services. Zapier, Slack, GitHub, and more.",
    layout: "image-top",
    image: {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
      alt: "Integrations",
    },
    href: "/integrations",
  },
};

export const CompactStyle = {
  render: () => (
    <div className="space-y-4">
      <CompactFeatureCard
        icon={<Zap className="size-5" />}
        title="Fast Performance"
        description="Lightning-fast load times"
      />
      <CompactFeatureCard
        icon={<Shield className="size-5" />}
        title="Secure by Default"
        description="Enterprise-grade security"
      />
      <CompactFeatureCard
        icon={<Users className="size-5" />}
        title="Team Collaboration"
        description="Work together seamlessly"
      />
    </div>
  ),
};

export const TestimonialExample = {
  render: () => (
    <TestimonialCard
      quote="This platform has completely transformed how we work. The collaboration features are unmatched and the performance is incredible."
      author="Sarah Johnson"
      role="CEO, TechCorp"
      avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
    />
  ),
};

export const TestimonialNoAvatar = {
  render: () => (
    <TestimonialCard
      quote="Best decision we made this year. Our team productivity increased by 40% in just two months."
      author="Michael Chen"
      role="Product Manager"
    />
  ),
};

export const AllVariants = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-2">
      <FeatureCard
        icon={<Zap className="size-6" />}
        title="Default Variant"
        description="Standard card with hover effects"
        variant="default"
        href="#"
      />
      <FeatureCard
        icon={<Shield className="size-6" />}
        title="Outline Variant"
        description="Bordered design with highlight on hover"
        variant="outline"
        href="#"
      />
      <FeatureCard
        icon={<Palette className="size-6" />}
        title="Ghost Variant"
        description="Subtle background that appears on hover"
        variant="ghost"
        href="#"
      />
      <FeatureCard
        icon={<Rocket className="size-6" />}
        title="Gradient Variant"
        description="Eye-catching gradient background"
        variant="gradient"
        href="#"
      />
    </div>
  ),
};

export const AllLayouts = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Vertical Layout</h3>
        <FeatureCard
          icon={<Zap className="size-6" />}
          title="Vertical Card"
          description="Content stacked vertically with icon on top"
          layout="vertical"
          href="#"
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Horizontal Layout</h3>
        <FeatureCard
          icon={<Shield className="size-6" />}
          title="Horizontal Card"
          description="Content arranged side by side"
          layout="horizontal"
          href="#"
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Image Top Layout</h3>
        <FeatureCard
          title="Image Top Card"
          description="Full-width image at the top"
          layout="image-top"
          image={{
            src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
            alt: "Feature",
          }}
          href="#"
        />
      </div>
    </div>
  ),
};

export const FeatureShowcase = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-3">
      <FeatureCard
        icon={<Zap className="size-6" />}
        badge="Popular"
        title="Lightning Fast"
        description="Optimized performance with instant page loads and smart caching."
        variant="gradient"
        size="lg"
        href="/features/performance"
      />
      <FeatureCard
        icon={<Shield className="size-6" />}
        title="Secure by Default"
        description="Enterprise-grade security built into every layer of the platform."
        variant="outline"
        size="lg"
        href="/features/security"
      />
      <FeatureCard
        icon={<Palette className="size-6" />}
        badge="New"
        title="Beautiful Design"
        description="Stunning interfaces that users love to interact with every day."
        variant="default"
        size="lg"
        href="/features/design"
      />
    </div>
  ),
};

export const TestimonialGrid = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-2">
      <TestimonialCard
        quote="The best tool we've used for team collaboration. Highly recommended!"
        author="Alex Martinez"
        role="Engineering Manager, Startup Inc"
        avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
      />
      <TestimonialCard
        quote="Incredible performance and ease of use. Our entire team loves it."
        author="Emily Davis"
        role="CTO, Enterprise Co"
        avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
      />
      <TestimonialCard
        quote="Game changer for our workflow. We can't imagine working without it now."
        author="David Kim"
        role="Product Designer"
      />
      <TestimonialCard
        quote="The analytics features are unmatched. We've seen tremendous growth."
        author="Rachel Green"
        role="Marketing Director"
      />
    </div>
  ),
};
