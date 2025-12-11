import type { Meta, StoryObj } from "@storybook/nextjs";
import { MediaSection } from "./media-section";
import { Heading } from "./heading";
import { BulletList } from "./bullet-list";
import { Button } from "./button";

const meta = {
  title: "UI/Media Section",
  component: MediaSection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: "select",
      options: ["image-left", "image-right", "stacked"],
      description: "Image position",
    },
    withOffset: {
      control: "boolean",
      description: "Add gradient offset background",
    },
    priority: {
      control: "boolean",
      description: "Prioritize image loading",
    },
  },
} satisfies Meta<typeof MediaSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ImageRight: Story = {
  args: {
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    imageAlt: "Analytics dashboard",
    layout: "image-right",
    children: (
      <>
        <Heading level="h2">Powerful Analytics</Heading>
        <p className="text-muted-foreground text-lg">
          Get deep insights into your business performance with real-time data visualization and
          AI-powered recommendations.
        </p>
        <BulletList
          items={[
            "Real-time data synchronization",
            "Customizable dashboards",
            "AI-powered insights",
            "Export to multiple formats",
          ]}
          spacing="md"
        />
        <div className="flex gap-4">
          <Button>Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </>
    ),
  },
};

export const ImageLeft: Story = {
  args: {
    imageSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
    imageAlt: "Team collaboration",
    layout: "image-left",
    children: (
      <>
        <Heading level="h2">Team Collaboration</Heading>
        <p className="text-muted-foreground text-lg">
          Work together seamlessly with built-in video calls, chat, and shared workspaces. Perfect
          for remote and hybrid teams.
        </p>
        <BulletList
          items={[
            "Real-time collaboration",
            "Video conferencing",
            "Shared workspaces",
            "Comment threads",
          ]}
          spacing="md"
        />
      </>
    ),
  },
};

export const Stacked: Story = {
  args: {
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    imageAlt: "Performance metrics",
    layout: "stacked",
    children: (
      <>
        <Heading level="h2">Performance Metrics</Heading>
        <p className="text-muted-foreground text-lg">
          Track all your key performance indicators in one place. Monitor growth, identify trends,
          and make data-driven decisions.
        </p>
        <Button size="lg">View Dashboard</Button>
      </>
    ),
  },
};

export const WithBadge: Story = {
  args: {
    imageSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    imageAlt: "Modern workspace",
    badge: "New Feature",
    layout: "image-right",
    children: (
      <>
        <span className="bg-primary/10 text-primary inline-block rounded-full px-3 py-1 text-sm font-semibold">
          Just Released
        </span>
        <Heading level="h2">Modern Workspace</Heading>
        <p className="text-muted-foreground text-lg">
          Our redesigned workspace brings everything you need into one beautiful interface.
        </p>
      </>
    ),
  },
};

export const WithoutOffset: Story = {
  args: {
    imageSrc: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
    imageAlt: "Mobile app",
    layout: "image-left",
    withOffset: false,
    children: (
      <>
        <Heading level="h2">Mobile First</Heading>
        <p className="text-muted-foreground text-lg">
          Access everything from your phone with our native mobile apps for iOS and Android.
        </p>
        <div className="flex gap-4">
          <Button>Download App</Button>
        </div>
      </>
    ),
  },
};

export const PriorityImage: Story = {
  args: {
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    imageAlt: "Hero image",
    priority: true,
    layout: "image-right",
    children: (
      <>
        <Heading level="h2">Priority Loading</Heading>
        <p className="text-muted-foreground text-lg">
          This image is loaded with priority for above-the-fold content.
        </p>
      </>
    ),
  },
};

export const ProductShowcase: Story = {
  args: {
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    imageAlt: "Product interface",
    badge: "⚡ Fast",
    layout: "image-right",
    children: (
      <>
        <span className="text-primary text-sm font-semibold tracking-wide uppercase">Features</span>
        <Heading level="h2">Lightning Fast Performance</Heading>
        <p className="text-muted-foreground text-lg">
          Experience blazing-fast load times and smooth interactions. Our platform is optimized for
          performance at every level.
        </p>
        <BulletList
          items={[
            "Sub-50ms response times",
            "Optimized asset delivery",
            "Smart caching strategies",
            "Edge network deployment",
          ]}
          icon="check-circle"
          spacing="lg"
        />
        <div className="flex gap-4">
          <Button size="lg">Try It Now</Button>
          <Button size="lg" variant="ghost">
            See Benchmarks
          </Button>
        </div>
      </>
    ),
  },
};

export const SecurityFeature: Story = {
  args: {
    imageSrc: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
    imageAlt: "Security features",
    badge: "🔒 Secure",
    layout: "image-left",
    children: (
      <>
        <Heading level="h2">Enterprise-Grade Security</Heading>
        <p className="text-muted-foreground text-lg">
          Your data is protected with bank-level encryption and industry-leading security practices.
          SOC 2 Type II certified.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-4">
            <div className="text-2xl font-bold">256-bit</div>
            <div className="text-muted-foreground text-sm">Encryption</div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="text-2xl font-bold">99.9%</div>
            <div className="text-muted-foreground text-sm">Uptime SLA</div>
          </div>
        </div>
        <Button size="lg">Learn About Security</Button>
      </>
    ),
  },
};

export const AllLayouts = {
  render: () => (
    <div className="space-y-16">
      <MediaSection
        imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
        imageAlt="Image right"
        layout="image-right"
      >
        <Heading level="h3">Image Right Layout</Heading>
        <p className="text-muted-foreground">Content on the left, image on the right.</p>
      </MediaSection>

      <MediaSection
        imageSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
        imageAlt="Image left"
        layout="image-left"
      >
        <Heading level="h3">Image Left Layout</Heading>
        <p className="text-muted-foreground">Image on the left, content on the right.</p>
      </MediaSection>

      <MediaSection
        imageSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
        imageAlt="Stacked"
        layout="stacked"
      >
        <Heading level="h3">Stacked Layout</Heading>
        <p className="text-muted-foreground">Content stacked vertically with image.</p>
      </MediaSection>
    </div>
  ),
};

export const FeatureComparison = {
  render: () => (
    <div className="space-y-16">
      <MediaSection
        imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
        imageAlt="Analytics"
        layout="image-right"
        badge="📊 Analytics"
      >
        <Heading level="h2">Advanced Analytics</Heading>
        <p className="text-muted-foreground text-lg">
          Track every metric that matters to your business.
        </p>
        <BulletList
          items={["Custom dashboards", "Real-time data", "Export reports", "API access"]}
        />
      </MediaSection>

      <MediaSection
        imageSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
        imageAlt="Collaboration"
        layout="image-left"
        badge="🤝 Teamwork"
      >
        <Heading level="h2">Built for Teams</Heading>
        <p className="text-muted-foreground text-lg">
          Collaborate seamlessly with your entire organization.
        </p>
        <BulletList items={["Real-time sync", "Comments", "Permissions", "Activity feed"]} />
      </MediaSection>

      <MediaSection
        imageSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
        imageAlt="Integration"
        layout="image-right"
        badge="🔌 Integrations"
      >
        <Heading level="h2">Connect Everything</Heading>
        <p className="text-muted-foreground text-lg">
          Integrate with all your favorite tools and services.
        </p>
        <BulletList
          items={["200+ integrations", "Zapier support", "Custom webhooks", "API access"]}
        />
      </MediaSection>
    </div>
  ),
};

export const LandingPageSection: Story = {
  args: {
    imageSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    imageAlt: "Platform overview",
    layout: "image-right",
    priority: true,
    badge: "🚀 Launch Ready",
    children: (
      <>
        <span className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700 dark:bg-green-950 dark:text-green-400">
          New Release v2.0
        </span>
        <Heading level="h1" className="text-5xl">
          Build Better Products Faster
        </Heading>
        <p className="text-muted-foreground text-xl">
          The complete platform for modern teams. Ship faster, collaborate better, and scale with
          confidence.
        </p>
        <BulletList
          items={[
            "Deploy in minutes, not hours",
            "99.9% uptime guarantee",
            "24/7 expert support",
            "Start free, upgrade anytime",
          ]}
          size="lg"
          spacing="lg"
        />
        <div className="flex flex-wrap gap-4">
          <Button size="lg">Start Free Trial</Button>
          <Button size="lg" variant="outline">
            Schedule Demo
          </Button>
          <Button size="lg" variant="ghost">
            View Pricing
          </Button>
        </div>
      </>
    ),
  },
};
