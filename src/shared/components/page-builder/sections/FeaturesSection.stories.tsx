import type { Meta, StoryObj } from "@storybook/nextjs";
import { FeaturesSectionComponent } from "./FeaturesSection";
import type { FeaturesSection } from "@/core/types/lib/page-builder";

const meta = {
  title: "Page Builder/Features Section",
  component: FeaturesSectionComponent,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FeaturesSectionComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseSection: FeaturesSection = {
  id: "features-1",
  type: "features",
  order: 1,
  visible: true,
  layout: {
    variant: "contained",
    padding: { top: "large", bottom: "large" },
  },
  content: {
    eyebrow: "Features",
    title: "Everything you need",
    description: "All the tools to build amazing products",
  },
  features: {
    layout: "grid",
    columns: 3,
    items: [
      {
        id: "feature-1",
        icon: "⚡",
        title: "Lightning Fast",
        description: "Optimized for speed and performance from the ground up.",
        items: ["Instant page loads", "Optimized assets", "Smart caching"],
      },
      {
        id: "feature-2",
        icon: "🔒",
        title: "Secure by Default",
        description: "Enterprise-grade security built into every layer.",
        items: ["End-to-end encryption", "SOC 2 compliant", "Regular audits"],
      },
      {
        id: "feature-3",
        icon: "🎨",
        title: "Beautiful Design",
        description: "Stunning interfaces that users love to interact with.",
        items: ["Modern UI", "Dark mode", "Responsive design"],
      },
    ],
  },
};

export const GridLayout: Story = {
  args: {
    section: baseSection,
  },
};

export const AlternatingLayout: Story = {
  args: {
    section: {
      ...baseSection,
      features: {
        ...baseSection.features,
        layout: "alternating",
        items: [
          {
            id: "alt-1",
            icon: "🚀",
            title: "Deploy Anywhere",
            description:
              "Deploy to any platform with a single command. Our universal deployment system works with all major cloud providers.",
            image: {
              src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
              alt: "Deployment dashboard",
            },
            items: ["AWS, Azure, GCP", "Automatic scaling", "Zero downtime deployments"],
          },
          {
            id: "alt-2",
            icon: "📊",
            title: "Real-time Analytics",
            description:
              "Get instant insights into your application's performance with our advanced analytics dashboard.",
            image: {
              src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
              alt: "Analytics dashboard",
            },
            items: ["Custom dashboards", "Live metrics", "Historical data"],
          },
          {
            id: "alt-3",
            icon: "🤝",
            title: "Team Collaboration",
            description:
              "Work together seamlessly with built-in collaboration tools designed for modern teams.",
            image: {
              src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600",
              alt: "Team collaboration",
            },
            items: ["Real-time editing", "Comments & reviews", "Role-based access"],
          },
        ],
      },
    },
  },
};

export const TwoColumns: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "Core Features",
        description: "The essentials for getting started",
      },
      features: {
        layout: "grid",
        columns: 2,
        items: [
          {
            id: "core-1",
            icon: "💪",
            title: "Powerful API",
            description:
              "RESTful API with comprehensive documentation and SDKs for all major languages.",
            items: ["OpenAPI spec", "Rate limiting", "Webhooks support"],
          },
          {
            id: "core-2",
            icon: "🔧",
            title: "Easy Integration",
            description: "Integrate with your existing tools and workflows in minutes, not days.",
            items: ["Pre-built connectors", "Custom webhooks", "Import/export tools"],
          },
        ],
      },
    },
  },
};

export const WithImages: Story = {
  args: {
    section: {
      ...baseSection,
      features: {
        layout: "grid",
        columns: 3,
        items: [
          {
            id: "img-1",
            title: "Modern Interface",
            description: "Clean and intuitive design",
            image: {
              src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
              alt: "Modern UI",
            },
          },
          {
            id: "img-2",
            title: "Mobile Ready",
            description: "Works perfectly on all devices",
            image: {
              src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
              alt: "Mobile devices",
            },
          },
          {
            id: "img-3",
            title: "Data Visualization",
            description: "Beautiful charts and graphs",
            image: {
              src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
              alt: "Data charts",
            },
          },
        ],
      },
    },
  },
};

export const SimpleFeatures: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "Why Choose Us",
      },
      features: {
        layout: "grid",
        columns: 4,
        items: [
          {
            id: "simple-1",
            icon: "✓",
            title: "Easy Setup",
            description: "Get started in minutes",
          },
          {
            id: "simple-2",
            icon: "✓",
            title: "24/7 Support",
            description: "Always here to help",
          },
          {
            id: "simple-3",
            icon: "✓",
            title: "Secure",
            description: "Bank-level encryption",
          },
          {
            id: "simple-4",
            icon: "✓",
            title: "Scalable",
            description: "Grows with your needs",
          },
        ],
      },
    },
  },
};

export const DetailedFeatures: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        eyebrow: "Platform Capabilities",
        title: "Built for Enterprise",
        description: "Everything your team needs to succeed",
      },
      features: {
        layout: "alternating",
        columns: 2,
        items: [
          {
            id: "detail-1",
            icon: "🎯",
            title: "Advanced Targeting",
            description:
              "Reach the right audience with precision targeting based on demographics, behavior, and custom attributes. Our ML-powered system learns and optimizes over time.",
            image: {
              src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
              alt: "Targeting dashboard",
            },
            items: [
              "Demographic filters",
              "Behavioral analysis",
              "Custom audience segments",
              "AI-powered recommendations",
              "Real-time optimization",
            ],
          },
          {
            id: "detail-2",
            icon: "📈",
            title: "Growth Tools",
            description:
              "Everything you need to grow your business. From A/B testing to conversion optimization, we've got you covered with enterprise-grade tools.",
            image: {
              src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
              alt: "Growth metrics",
            },
            items: [
              "A/B testing framework",
              "Conversion funnels",
              "User journey mapping",
              "Automated experiments",
              "Performance insights",
            ],
          },
        ],
      },
    },
  },
};
