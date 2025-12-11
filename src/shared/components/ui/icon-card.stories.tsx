import type { Meta, StoryObj } from "@storybook/nextjs";
import { IconCard } from "./icon-card";
import { Zap, Shield, Palette, Rocket, Users, TrendingUp } from "lucide-react";

const meta = {
  title: "UI/Icon Card",
  component: IconCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "ghost"],
      description: "Card style variant",
    },
    iconVariant: {
      control: "select",
      options: ["default", "accent", "brand"],
      description: "Icon background variant",
    },
    as: {
      control: "select",
      options: ["article", "div"],
      description: "HTML element to render",
    },
  },
} satisfies Meta<typeof IconCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <Zap className="size-5" />,
    title: "Lightning Fast",
    description: "Optimized for performance with instant page loads and smart caching.",
    href: "/features/performance",
  },
};

export const WithBadge: Story = {
  args: {
    icon: <Rocket className="size-5" />,
    badge: "New",
    title: "Auto Deployments",
    description: "Deploy to production automatically with every commit.",
    href: "/features/deploy",
  },
};

export const OutlineVariant: Story = {
  args: {
    icon: <Shield className="size-5" />,
    title: "Enterprise Security",
    description: "Bank-level encryption and SOC 2 compliance built-in.",
    variant: "outline",
    href: "/security",
  },
};

export const GhostVariant: Story = {
  args: {
    icon: <Users className="size-5" />,
    title: "Team Collaboration",
    description: "Work together seamlessly with built-in communication tools.",
    variant: "ghost",
    href: "/collaboration",
  },
};

export const AccentIcon: Story = {
  args: {
    icon: <Palette className="size-5" />,
    title: "Beautiful Design",
    description: "Stunning interfaces that users love to interact with.",
    iconVariant: "accent",
    href: "/design",
  },
};

export const BrandIcon: Story = {
  args: {
    icon: <TrendingUp className="size-5" />,
    title: "Growth Analytics",
    description: "Track your growth with advanced analytics and reporting.",
    iconVariant: "brand",
    href: "/analytics",
  },
};

export const NoLink: Story = {
  args: {
    icon: <Shield className="size-5" />,
    title: "Secure by Default",
    description: "Enterprise-grade security without the complexity.",
  },
};

export const NoIcon: Story = {
  args: {
    title: "Simple Card",
    description: "A card without an icon, focusing on the content.",
    href: "/simple",
  },
};

export const CustomLinkLabel: Story = {
  args: {
    icon: <Rocket className="size-5" />,
    title: "Deploy Anywhere",
    description: "Support for AWS, Azure, GCP, and more.",
    href: "/deploy",
    linkLabel: "Ver más",
  },
};

export const LongContent: Story = {
  args: {
    icon: <Users className="size-5" />,
    badge: "Popular",
    title: "Advanced Team Collaboration Features",
    description:
      "Enable your team to work together more effectively with real-time editing, video calls, comments, reviews, role-based access control, and much more.",
    href: "/collaboration",
  },
};

export const AsDiv: Story = {
  args: {
    icon: <Zap className="size-5" />,
    title: "Div Element",
    description: "This card is rendered as a div instead of article.",
    as: "div",
    href: "/example",
  },
};

export const AllVariants = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-3">
      <IconCard
        icon={<Zap className="size-5" />}
        title="Default Variant"
        description="Standard card style with border and hover effect"
        variant="default"
        href="#"
      />
      <IconCard
        icon={<Shield className="size-5" />}
        title="Outline Variant"
        description="Subtle border that highlights on hover"
        variant="outline"
        href="#"
      />
      <IconCard
        icon={<Palette className="size-5" />}
        title="Ghost Variant"
        description="Minimal border with background on hover"
        variant="ghost"
        href="#"
      />
    </div>
  ),
};

export const AllIconVariants = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-3">
      <IconCard
        icon={<Zap className="size-5" />}
        title="Default Icon"
        description="Primary-colored icon background"
        iconVariant="default"
        href="#"
      />
      <IconCard
        icon={<Shield className="size-5" />}
        title="Accent Icon"
        description="Accent-colored icon background"
        iconVariant="accent"
        href="#"
      />
      <IconCard
        icon={<Palette className="size-5" />}
        title="Brand Icon"
        description="Brand red-colored icon background"
        iconVariant="brand"
        href="#"
      />
    </div>
  ),
};

export const FeatureGrid = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <IconCard
        icon={<Zap className="size-5" />}
        title="Lightning Fast"
        description="Optimized performance with instant page loads"
        iconVariant="brand"
        href="/features/performance"
      />
      <IconCard
        icon={<Shield className="size-5" />}
        title="Secure by Default"
        description="Enterprise-grade security built into every layer"
        iconVariant="brand"
        href="/features/security"
      />
      <IconCard
        icon={<Palette className="size-5" />}
        title="Beautiful Design"
        description="Stunning interfaces that users love"
        iconVariant="brand"
        href="/features/design"
      />
      <IconCard
        icon={<Rocket className="size-5" />}
        title="Easy Deployment"
        description="One-click deployment to any platform"
        iconVariant="brand"
        href="/features/deploy"
      />
      <IconCard
        icon={<Users className="size-5" />}
        title="Team Collaboration"
        description="Work together seamlessly in real-time"
        iconVariant="brand"
        href="/features/team"
      />
      <IconCard
        icon={<TrendingUp className="size-5" />}
        title="Analytics"
        description="Deep insights into your business performance"
        iconVariant="brand"
        href="/features/analytics"
      />
    </div>
  ),
};

export const ProductFeatures = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Platform Features</h2>
        <p className="text-muted-foreground mt-2">Everything you need to build amazing products</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <IconCard
          icon={<Zap className="size-5" />}
          badge="Popular"
          title="Real-time Sync"
          description="Keep your data synchronized across all devices automatically"
          variant="outline"
          iconVariant="default"
          href="/features/sync"
        />
        <IconCard
          icon={<Shield className="size-5" />}
          badge="Enterprise"
          title="Advanced Security"
          description="SOC 2 compliant with end-to-end encryption"
          variant="outline"
          iconVariant="default"
          href="/features/security"
        />
        <IconCard
          icon={<Users className="size-5" />}
          title="Unlimited Users"
          description="Add as many team members as you need, no extra cost"
          variant="outline"
          iconVariant="default"
          href="/features/users"
        />
        <IconCard
          icon={<Rocket className="size-5" />}
          badge="New"
          title="Auto Scaling"
          description="Automatically scale based on your traffic and usage"
          variant="outline"
          iconVariant="default"
          href="/features/scaling"
        />
        <IconCard
          icon={<TrendingUp className="size-5" />}
          title="Analytics Dashboard"
          description="Visualize your data with customizable charts and reports"
          variant="outline"
          iconVariant="default"
          href="/features/analytics"
        />
        <IconCard
          icon={<Palette className="size-5" />}
          title="Custom Branding"
          description="White-label solution with your logo and colors"
          variant="outline"
          iconVariant="default"
          href="/features/branding"
        />
      </div>
    </div>
  ),
};

export const ServiceCards = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-2">
      <IconCard
        icon={
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        title="Consultoría Sindical"
        description="Asesoramiento experto para todas tus necesidades sindicales y laborales."
        iconVariant="brand"
        linkLabel="Conocer más"
        href="/servicios/consultoria"
      />
      <IconCard
        icon={
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        }
        title="Formación"
        description="Programas de capacitación diseñados para fortalecer a nuestros miembros."
        iconVariant="brand"
        linkLabel="Conocer más"
        href="/servicios/formacion"
      />
    </div>
  ),
};
