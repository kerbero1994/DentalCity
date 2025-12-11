import type { Meta, StoryObj } from "@storybook/nextjs";
import { SectionHeader } from "./section-header";
import { Button } from "./button";
import { ArrowRight, Sparkles } from "lucide-react";

const meta = {
  title: "UI/Section Header",
  component: SectionHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    align: {
      control: "select",
      options: ["left", "center"],
      description: "Text alignment",
    },
    variant: {
      control: "select",
      options: ["default", "accent", "brand"],
      description: "Eyebrow color variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Title size",
    },
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Our Platform Features",
    description: "Everything you need to build amazing products and scale your business.",
  },
};

export const WithEyebrow: Story = {
  args: {
    eyebrow: "Features",
    title: "Everything you need",
    description: "All the tools to build, deploy, and scale your applications.",
  },
};

export const WithEyebrowIcon: Story = {
  args: {
    eyebrow: "New Release",
    eyebrowIcon: <Sparkles className="size-4" />,
    title: "Introducing v2.0",
    description: "Our biggest update yet with powerful new features and improvements.",
  },
};

export const CenterAligned: Story = {
  args: {
    eyebrow: "Testimonials",
    title: "Loved by thousands",
    description: "See what our customers have to say about working with us.",
    align: "center",
  },
};

export const AccentVariant: Story = {
  args: {
    eyebrow: "Get Started",
    title: "Ready to begin?",
    description: "Join thousands of teams already building with our platform.",
    variant: "accent",
  },
};

export const BrandVariant: Story = {
  args: {
    eyebrow: "Union Services",
    title: "Servicios para Afiliados",
    description: "Todo el apoyo que necesitas como miembro del sindicato.",
    variant: "brand",
  },
};

export const SmallSize: Story = {
  args: {
    eyebrow: "Updates",
    title: "Recent Changes",
    description: "Check out the latest updates to our platform.",
    size: "sm",
  },
};

export const LargeSize: Story = {
  args: {
    eyebrow: "Welcome",
    title: "Transform Your Workflow",
    description: "The complete platform for modern teams to collaborate and build better products.",
    size: "lg",
  },
};

export const WithTitleAccent: Story = {
  args: {
    title: "Build Better",
    titleAccent: "Together",
    description: "Collaborate with your team to create amazing products.",
  },
};

export const WithActions: Story = {
  args: {
    eyebrow: "Getting Started",
    title: "Ready to dive in?",
    description: "Start building with our platform in minutes.",
    actions: (
      <div className="flex gap-4">
        <Button>Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </div>
    ),
  },
};

export const WithActionsCenter: Story = {
  args: {
    eyebrow: "Contact",
    title: "Let's talk",
    description: "Get in touch with our team to learn how we can help your business grow.",
    align: "center",
    actions: (
      <div className="flex gap-4">
        <Button size="lg">Schedule a Call</Button>
        <Button size="lg" variant="ghost">
          Send Email
        </Button>
      </div>
    ),
  },
};

export const LandingHero: Story = {
  args: {
    eyebrow: "Platform",
    eyebrowIcon: <Sparkles className="size-4" />,
    title: "Build. Deploy. Scale.",
    titleAccent: "Effortlessly.",
    description:
      "The complete platform for modern development teams. Ship faster, collaborate better, and scale with confidence.",
    size: "lg",
    align: "center",
    variant: "accent",
    actions: (
      <div className="flex flex-wrap justify-center gap-4">
        <Button size="lg">
          Start Free Trial
          <ArrowRight className="ml-2 size-5" />
        </Button>
        <Button size="lg" variant="outline">
          Watch Demo
        </Button>
      </div>
    ),
  },
};

export const ProductSection: Story = {
  args: {
    eyebrow: "Product",
    title: "Advanced Analytics Dashboard",
    description:
      "Get real-time insights into your business performance with customizable dashboards and AI-powered recommendations.",
    variant: "default",
    size: "md",
    actions: (
      <div className="flex gap-4">
        <Button variant="link" className="px-0">
          Explore Features →
        </Button>
      </div>
    ),
  },
};

export const BlogSection: Story = {
  args: {
    eyebrow: "Blog",
    title: "Latest Articles",
    description: "Insights, tutorials, and updates from our team.",
    align: "left",
    size: "md",
  },
};

export const PricingSection: Story = {
  args: {
    eyebrow: "Pricing",
    title: "Choose your plan",
    description: "Simple, transparent pricing that grows with you. No hidden fees.",
    align: "center",
    size: "lg",
    variant: "accent",
  },
};

export const TeamSection: Story = {
  args: {
    eyebrow: "Our Team",
    title: "Meet the people behind the product",
    description:
      "We're a distributed team of designers, developers, and strategists passionate about building great products.",
    align: "center",
  },
};

export const FeaturesSection: Story = {
  args: {
    eyebrow: "Features",
    eyebrowIcon: "⚡",
    title: "Everything you need to succeed",
    description:
      "Powerful features designed to help your team collaborate, build, and ship better products faster.",
    size: "md",
  },
};

export const CallToAction: Story = {
  args: {
    eyebrow: "Ready to get started?",
    title: "Join thousands of teams",
    titleAccent: "building the future",
    description: "Start your free trial today. No credit card required.",
    align: "center",
    size: "lg",
    variant: "accent",
    actions: (
      <div className="flex flex-wrap justify-center gap-4">
        <Button size="lg" variant="default">
          Start Free Trial
        </Button>
        <Button size="lg" variant="outline">
          Contact Sales
        </Button>
      </div>
    ),
  },
};

export const AllSizes = {
  render: () => (
    <div className="space-y-16">
      <SectionHeader
        eyebrow="Small"
        title="Small Title Size"
        description="This is a small section header suitable for subsections."
        size="sm"
      />
      <SectionHeader
        eyebrow="Medium"
        title="Medium Title Size"
        description="This is the default medium section header size."
        size="md"
      />
      <SectionHeader
        eyebrow="Large"
        title="Large Title Size"
        description="This is a large section header perfect for main sections and hero areas."
        size="lg"
      />
    </div>
  ),
};

export const AllAlignments = {
  render: () => (
    <div className="space-y-16">
      <SectionHeader
        eyebrow="Left Aligned"
        title="Left Alignment"
        description="This header is aligned to the left, suitable for most content sections."
        align="left"
      />
      <SectionHeader
        eyebrow="Center Aligned"
        title="Center Alignment"
        description="This header is centered, perfect for hero sections and landing pages."
        align="center"
      />
    </div>
  ),
};

export const AllVariants = {
  render: () => (
    <div className="space-y-16">
      <SectionHeader
        eyebrow="Default Variant"
        title="Muted Eyebrow"
        description="The default variant uses muted text for the eyebrow."
        variant="default"
      />
      <SectionHeader
        eyebrow="Accent Variant"
        title="Primary Colored Eyebrow"
        description="The accent variant uses primary color for the eyebrow."
        variant="accent"
      />
      <SectionHeader
        eyebrow="Brand Variant"
        title="Brand Red Eyebrow"
        description="The brand variant uses the brand red color for the eyebrow."
        variant="brand"
      />
    </div>
  ),
};

export const CompleteExample = {
  render: () => (
    <div className="space-y-16">
      <SectionHeader
        eyebrow="Platform Overview"
        eyebrowIcon={<Sparkles className="size-4" />}
        title="Everything you need to"
        titleAccent="build better products"
        description="Our platform provides all the tools and features your team needs to collaborate effectively, ship faster, and scale with confidence."
        size="lg"
        align="center"
        variant="accent"
        actions={
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">Get Started Free</Button>
            <Button size="lg" variant="outline">
              Schedule Demo
            </Button>
            <Button size="lg" variant="ghost">
              View Pricing
            </Button>
          </div>
        }
      />
    </div>
  ),
};
