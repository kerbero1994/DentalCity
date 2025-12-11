import type { Meta, StoryObj } from "@storybook/nextjs";
import { CTABannerSectionComponent } from "./CTABannerSection";
import type { CTABannerSection } from "@/core/types/lib/page-builder";

const meta = {
  title: "Page Builder/CTA Banner Section",
  component: CTABannerSectionComponent,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CTABannerSectionComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseSection: CTABannerSection = {
  id: "cta-1",
  type: "cta-banner",
  order: 1,
  visible: true,
  layout: {
    variant: "contained",
    padding: { top: "large", bottom: "large" },
  },
  content: {
    eyebrow: "Get Started Today",
    title: "Ready to transform your business?",
    description: "Join thousands of companies already using our platform",
  },
  ctaBanner: {
    variant: "default",
    ctas: [
      {
        label: "Start Free Trial",
        href: "/signup",
        variant: "primary",
      },
      {
        label: "Contact Sales",
        href: "/contact",
        variant: "secondary",
      },
    ],
  },
};

export const Default: Story = {
  args: {
    section: baseSection,
  },
};

export const GradientVariant: Story = {
  args: {
    section: {
      ...baseSection,
      ctaBanner: {
        ...baseSection.ctaBanner,
        variant: "gradient",
      },
    },
  },
};

export const BorderedVariant: Story = {
  args: {
    section: {
      ...baseSection,
      ctaBanner: {
        ...baseSection.ctaBanner,
        variant: "bordered",
      },
    },
  },
};

export const SingleCTA: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "Start Your Journey Today",
        description: "No credit card required. Cancel anytime.",
      },
      ctaBanner: {
        variant: "gradient",
        ctas: [
          {
            label: "Get Started →",
            href: "/get-started",
            variant: "primary",
          },
        ],
      },
    },
  },
};

export const WithIcon: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "Join 10,000+ Happy Customers",
        description: "Experience the difference today",
      },
      ctaBanner: {
        variant: "default",
        ctas: [
          {
            label: "Start Now",
            href: "/start",
            variant: "primary",
            icon: "→",
          },
          {
            label: "Watch Demo",
            href: "/demo",
            variant: "outline",
            icon: "▶",
          },
        ],
      },
    },
  },
};

export const MinimalCTA: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "Questions?",
        description: "Our team is here to help",
      },
      ctaBanner: {
        variant: "bordered",
        ctas: [
          {
            label: "Chat with us",
            href: "/support",
            variant: "primary",
          },
        ],
      },
    },
  },
};

export const UrgentCTA: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        eyebrow: "⚡ Limited Time Offer",
        title: "50% Off - First 100 Customers",
        description: "Don't miss out on this exclusive deal",
      },
      ctaBanner: {
        variant: "gradient",
        ctas: [
          {
            label: "Claim Offer Now",
            href: "/offer",
            variant: "primary",
          },
        ],
      },
    },
  },
};

export const NewsletterCTA: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "Stay in the loop",
        description: "Get the latest updates and exclusive content delivered to your inbox",
      },
      ctaBanner: {
        variant: "default",
        ctas: [
          {
            label: "Subscribe",
            href: "/newsletter",
            variant: "primary",
          },
        ],
      },
    },
  },
};

export const MultipleCTAs: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "Choose your path",
        description: "We have options for everyone",
      },
      ctaBanner: {
        variant: "bordered",
        ctas: [
          {
            label: "For Individuals",
            href: "/individual",
            variant: "primary",
          },
          {
            label: "For Teams",
            href: "/teams",
            variant: "primary",
          },
          {
            label: "For Enterprise",
            href: "/enterprise",
            variant: "outline",
          },
        ],
      },
    },
  },
};

export const SimpleCTA: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "Let's build something great together",
      },
      ctaBanner: {
        variant: "gradient",
        ctas: [
          {
            label: "Get in touch",
            href: "/contact",
            variant: "primary",
          },
        ],
      },
    },
  },
};
