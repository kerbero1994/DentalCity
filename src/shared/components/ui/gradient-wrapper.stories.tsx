import type { Meta, StoryObj } from "@storybook/nextjs";
import { GradientWrapper } from "./gradient-wrapper";

const meta = {
  title: "UI/Gradient Wrapper",
  component: GradientWrapper,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["brand", "pearl", "rose", "midnight"],
      description: "Color scheme variant",
    },
    as: {
      control: "text",
      description: "HTML element to render",
    },
  },
} satisfies Meta<typeof GradientWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brand: Story = {
  args: {
    variant: "brand",
    children: (
      <div className="text-center">
        <h2 className="text-4xl font-bold">Brand Gradient</h2>
        <p className="mt-4 text-lg opacity-90">
          Bold red gradient perfect for call-to-action sections
        </p>
      </div>
    ),
  },
};

export const Pearl: Story = {
  args: {
    variant: "pearl",
    children: (
      <div className="text-center">
        <h2 className="text-4xl font-bold">Pearl Gradient</h2>
        <p className="text-muted-foreground mt-4 text-lg">
          Elegant light gradient for premium content
        </p>
      </div>
    ),
  },
};

export const Rose: Story = {
  args: {
    variant: "rose",
    children: (
      <div className="text-center">
        <h2 className="text-4xl font-bold">Rose Gradient</h2>
        <p className="text-muted-foreground mt-4 text-lg">Soft rose gradient with subtle warmth</p>
      </div>
    ),
  },
};

export const Midnight: Story = {
  args: {
    variant: "midnight",
    children: (
      <div className="text-center">
        <h2 className="text-4xl font-bold">Midnight Gradient</h2>
        <p className="mt-4 text-lg opacity-90">Dark gradient for dramatic impact</p>
      </div>
    ),
  },
};

export const WithRichContent: Story = {
  args: {
    variant: "brand",
    children: (
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h2 className="text-5xl font-bold tracking-tight">Transform Your Workflow</h2>
          <p className="mt-4 text-xl opacity-90">Powerful tools designed for modern teams</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold">Fast</h3>
            <p className="mt-2 opacity-80">Lightning-fast performance</p>
          </div>
          <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold">Secure</h3>
            <p className="mt-2 opacity-80">Enterprise-grade security</p>
          </div>
          <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold">Reliable</h3>
            <p className="mt-2 opacity-80">99.9% uptime guarantee</p>
          </div>
        </div>
      </div>
    ),
  },
};

export const AsSection: Story = {
  args: {
    as: "section",
    variant: "midnight",
    children: (
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold">Section Element</h2>
        <p className="mt-4 text-lg opacity-90">Rendered as a semantic section tag</p>
      </div>
    ),
  },
};

export const WithButtons: Story = {
  args: {
    variant: "brand",
    children: (
      <div className="text-center">
        <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
        <p className="mt-4 text-lg opacity-90">
          Join thousands of teams already using our platform
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="rounded-lg bg-white px-6 py-3 font-semibold text-red-700 shadow-lg transition-transform hover:scale-105">
            Start Free Trial
          </button>
          <button className="rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3 font-semibold backdrop-blur-sm transition-colors hover:bg-white/20">
            Learn More
          </button>
        </div>
      </div>
    ),
  },
};

export const FeatureShowcase: Story = {
  args: {
    variant: "rose",
    children: (
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
            Features
          </span>
          <h2 className="mt-4 text-5xl font-bold tracking-tight">Everything You Need</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-white/20">
              ⚡
            </div>
            <div>
              <h3 className="text-xl font-semibold">Lightning Fast</h3>
              <p className="mt-2 opacity-80">Optimized performance with instant page loads</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-white/20">
              🔒
            </div>
            <div>
              <h3 className="text-xl font-semibold">Secure by Default</h3>
              <p className="mt-2 opacity-80">Enterprise-grade security built in</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-white/20">
              🎨
            </div>
            <div>
              <h3 className="text-xl font-semibold">Beautiful Design</h3>
              <p className="mt-2 opacity-80">Stunning interfaces users love</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-white/20">
              🚀
            </div>
            <div>
              <h3 className="text-xl font-semibold">Easy to Deploy</h3>
              <p className="mt-2 opacity-80">One-click deployment to any platform</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};

export const TestimonialSection: Story = {
  args: {
    variant: "pearl",
    children: (
      <div className="mx-auto max-w-3xl text-center">
        <blockquote className="text-3xl font-semibold italic">
          &quot;This platform has completely transformed how we work. The team collaboration
          features are unmatched.&quot;
        </blockquote>
        <div className="mt-8">
          <div className="font-semibold">Sarah Johnson</div>
          <div className="text-muted-foreground">CEO, TechCorp</div>
        </div>
      </div>
    ),
  },
};

export const StatsSection: Story = {
  args: {
    variant: "midnight",
    children: (
      <div className="grid gap-8 text-center md:grid-cols-4">
        <div>
          <div className="text-5xl font-bold">10K+</div>
          <div className="mt-2 text-lg opacity-80">Active Users</div>
        </div>
        <div>
          <div className="text-5xl font-bold">99.9%</div>
          <div className="mt-2 text-lg opacity-80">Uptime</div>
        </div>
        <div>
          <div className="text-5xl font-bold">50ms</div>
          <div className="mt-2 text-lg opacity-80">Response Time</div>
        </div>
        <div>
          <div className="text-5xl font-bold">24/7</div>
          <div className="mt-2 text-lg opacity-80">Support</div>
        </div>
      </div>
    ),
  },
};

export const AllVariants = {
  render: () => (
    <div className="space-y-8 p-8">
      <GradientWrapper variant="brand">
        <div className="text-center">
          <h3 className="text-3xl font-bold">Brand Variant</h3>
          <p className="mt-2 opacity-90">Bold red gradient for CTAs</p>
        </div>
      </GradientWrapper>
      <GradientWrapper variant="pearl">
        <div className="text-center">
          <h3 className="text-3xl font-bold">Pearl Variant</h3>
          <p className="text-muted-foreground mt-2">Elegant light gradient</p>
        </div>
      </GradientWrapper>
      <GradientWrapper variant="rose">
        <div className="text-center">
          <h3 className="text-3xl font-bold">Rose Variant</h3>
          <p className="text-muted-foreground mt-2">Soft rose gradient</p>
        </div>
      </GradientWrapper>
      <GradientWrapper variant="midnight">
        <div className="text-center">
          <h3 className="text-3xl font-bold">Midnight Variant</h3>
          <p className="mt-2 opacity-90">Dark dramatic gradient</p>
        </div>
      </GradientWrapper>
    </div>
  ),
};

export const CTAExample: Story = {
  args: {
    variant: "brand",
    children: (
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold tracking-wide uppercase">
          Limited Time Offer
        </span>
        <h2 className="mt-6 text-5xl font-bold tracking-tight">Get 50% Off Your First Year</h2>
        <p className="mt-6 text-xl opacity-90">
          Join over 10,000 teams building the future with our platform. Start your free trial today,
          no credit card required.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-red-700 shadow-xl transition-transform hover:scale-105">
            Claim Your Discount
          </button>
          <button className="rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-colors hover:bg-white/20">
            View Pricing
          </button>
        </div>
      </div>
    ),
  },
};
