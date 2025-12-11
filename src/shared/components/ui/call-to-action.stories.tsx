import type { Meta, StoryObj } from "@storybook/nextjs";
import { CallToAction, SplitCTA, BannerCTA } from "./call-to-action";

const meta = {
  title: "UI/Call To Action",
  component: CallToAction,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "gradient", "outline", "ghost"],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Padding size",
    },
  },
} satisfies Meta<typeof CallToAction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Ready to get started?",
    description: "Join thousands of teams already using our platform to build amazing products.",
    primaryAction: {
      label: "Start Free Trial",
      href: "/signup",
    },
    secondaryAction: {
      label: "Schedule Demo",
      href: "/demo",
    },
  },
};

export const GradientVariant: Story = {
  args: {
    title: "Transform your workflow today",
    description: "Everything you need to collaborate, create, and succeed.",
    variant: "gradient",
    primaryAction: {
      label: "Get Started",
      href: "/start",
    },
    secondaryAction: {
      label: "Learn More",
      href: "/learn",
    },
  },
};

export const OutlineVariant: Story = {
  args: {
    title: "Join our community",
    description: "Connect with thousands of developers worldwide",
    variant: "outline",
    primaryAction: {
      label: "Sign Up Free",
      href: "/join",
    },
  },
};

export const GhostVariant: Story = {
  args: {
    title: "Need help getting started?",
    description: "Our team is here to guide you every step of the way",
    variant: "ghost",
    size: "md",
    primaryAction: {
      label: "Contact Support",
      href: "/support",
    },
    secondaryAction: {
      label: "View Docs",
      href: "/docs",
    },
  },
};

export const SmallSize: Story = {
  args: {
    title: "Quick question?",
    description: "We're here to help",
    size: "sm",
    variant: "gradient",
    primaryAction: {
      label: "Chat Now",
      href: "/chat",
    },
  },
};

export const LargeSize: Story = {
  args: {
    title: "The future of work starts here",
    description:
      "Powerful tools, seamless collaboration, and unlimited potential. Join the revolution.",
    size: "lg",
    variant: "gradient",
    primaryAction: {
      label: "Start Building",
      href: "/build",
    },
    secondaryAction: {
      label: "Watch Video",
      href: "/video",
    },
  },
};

export const SingleAction: Story = {
  args: {
    title: "Limited time offer",
    description: "Get 50% off your first year. Offer ends soon!",
    variant: "gradient",
    primaryAction: {
      label: "Claim Discount",
      href: "/offer",
    },
  },
};

export const NoDescription: Story = {
  args: {
    title: "Let's build something amazing together",
    variant: "gradient",
    primaryAction: {
      label: "Get Started",
      href: "/start",
    },
  },
};

export const SplitWithImage = {
  render: () => (
    <SplitCTA
      title="Powerful analytics at your fingertips"
      description="Get deep insights into your business performance with real-time data visualization and AI-powered recommendations."
      action={{ label: "Explore Features", href: "/features" }}
      image={{
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        alt: "Analytics dashboard",
      }}
      imagePosition="right"
    />
  ),
};

export const SplitImageLeft = {
  render: () => (
    <SplitCTA
      title="Collaborate in real-time"
      description="Work together seamlessly with your team, no matter where they are. Built-in video, chat, and shared workspaces."
      action={{ label: "Try It Free", href: "/try" }}
      image={{
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
        alt: "Team collaboration",
      }}
      imagePosition="left"
    />
  ),
};

export const SplitNoImage = {
  render: () => (
    <SplitCTA
      title="Enterprise-ready security"
      description="Bank-level encryption, SOC 2 compliance, and advanced access controls to keep your data safe."
      action={{ label: "Learn About Security", href: "/security" }}
    />
  ),
};

export const BannerSimple = {
  render: () => (
    <BannerCTA
      message="🎉 New feature launch! Check out our updated dashboard with AI insights."
      action={{ label: "Explore Now", href: "/new" }}
    />
  ),
};

export const BannerWithDismiss = {
  render: () => (
    <BannerCTA
      message="Limited time: Get 3 months free when you upgrade to Pro today"
      action={{ label: "Upgrade Now", href: "/upgrade" }}
      onDismiss={() => alert("Banner dismissed")}
    />
  ),
};

export const BannerAnnouncement = {
  render: () => (
    <BannerCTA
      message="📢 Join us for our annual conference on Oct 15-17. Early bird tickets available!"
      action={{ label: "Register", href: "/conference" }}
    />
  ),
};

export const BannerNoAction = {
  render: () => (
    <BannerCTA
      message="Scheduled maintenance on Oct 5, 2:00-4:00 AM UTC. Services may be briefly unavailable."
      onDismiss={() => alert("Dismissed")}
    />
  ),
};

export const AllVariants = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Default</h3>
        <CallToAction
          title="Default variant"
          description="Solid background with contrasting text"
          variant="default"
          size="sm"
          primaryAction={{ label: "Action", href: "#" }}
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Gradient</h3>
        <CallToAction
          title="Gradient variant"
          description="Eye-catching gradient background"
          variant="gradient"
          size="sm"
          primaryAction={{ label: "Action", href: "#" }}
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Outline</h3>
        <CallToAction
          title="Outline variant"
          description="Bordered design with transparent background"
          variant="outline"
          size="sm"
          primaryAction={{ label: "Action", href: "#" }}
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Ghost</h3>
        <CallToAction
          title="Ghost variant"
          description="Subtle background for minimal design"
          variant="ghost"
          size="sm"
          primaryAction={{ label: "Action", href: "#" }}
        />
      </div>
    </div>
  ),
};

export const AllSizes = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Small</h3>
        <CallToAction
          title="Small CTA"
          description="Compact padding"
          variant="gradient"
          size="sm"
          primaryAction={{ label: "Action", href: "#" }}
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Medium</h3>
        <CallToAction
          title="Medium CTA"
          description="Default padding"
          variant="gradient"
          size="md"
          primaryAction={{ label: "Action", href: "#" }}
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Large</h3>
        <CallToAction
          title="Large CTA"
          description="Generous padding for impact"
          variant="gradient"
          size="lg"
          primaryAction={{ label: "Action", href: "#" }}
        />
      </div>
    </div>
  ),
};

export const CompleteExample = {
  render: () => (
    <div className="space-y-4">
      <BannerCTA
        message="🎉 Welcome to our new platform! Explore the latest features."
        action={{ label: "Get Started", href: "/start" }}
        onDismiss={() => alert("Dismissed")}
      />
      <CallToAction
        title="Ready to revolutionize your workflow?"
        description="Join over 10,000 teams building the future with our platform. Start your free trial today, no credit card required."
        variant="gradient"
        size="lg"
        primaryAction={{ label: "Start Free Trial", href: "/trial" }}
        secondaryAction={{ label: "Watch Demo", href: "/demo" }}
      />
    </div>
  ),
};
