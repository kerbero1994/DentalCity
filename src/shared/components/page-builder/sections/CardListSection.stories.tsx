import type { Meta, StoryObj } from "@storybook/nextjs";
import { CardListSectionComponent } from "./CardListSection";
import type { CardListSection } from "@/core/types/lib/page-builder";

const meta = {
  title: "Page Builder/Card List Section",
  component: CardListSectionComponent,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CardListSectionComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseSection: CardListSection = {
  id: "cards-1",
  type: "card-list",
  order: 1,
  visible: true,
  layout: {
    variant: "contained",
    padding: { top: "large", bottom: "large" },
  },
  content: {
    eyebrow: "Our Services",
    title: "What We Offer",
    description: "Comprehensive solutions for all your needs",
  },
  cardList: {
    variant: "default",
    columns: 3,
    cards: [
      {
        id: "card-1",
        icon: "⚖️",
        title: "Legal Support",
        description: "Professional legal assistance and representation for all members.",
        link: {
          label: "Learn more",
          href: "/services/legal",
        },
      },
      {
        id: "card-2",
        icon: "📚",
        title: "Training Programs",
        description: "Continuous education and skill development opportunities.",
        link: {
          label: "View courses",
          href: "/services/training",
        },
      },
      {
        id: "card-3",
        icon: "🏥",
        title: "Health Benefits",
        description: "Comprehensive health coverage and wellness programs.",
        link: {
          label: "See benefits",
          href: "/services/health",
        },
      },
    ],
  },
};

export const Default: Story = {
  args: {
    section: baseSection,
  },
};

export const Elevated: Story = {
  args: {
    section: {
      ...baseSection,
      cardList: {
        ...baseSection.cardList,
        variant: "elevated",
      },
    },
  },
};

export const Outlined: Story = {
  args: {
    section: {
      ...baseSection,
      cardList: {
        ...baseSection.cardList,
        variant: "outlined",
      },
    },
  },
};

export const Minimal: Story = {
  args: {
    section: {
      ...baseSection,
      cardList: {
        ...baseSection.cardList,
        variant: "minimal",
      },
    },
  },
};

export const WithImages: Story = {
  args: {
    section: {
      ...baseSection,
      cardList: {
        variant: "elevated",
        columns: 3,
        cards: [
          {
            id: "card-1",
            title: "Modern Workspace",
            description: "State-of-the-art facilities for all members",
            image: {
              src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400",
              alt: "Office workspace",
            },
            link: {
              label: "Explore",
              href: "/facilities",
            },
          },
          {
            id: "card-2",
            title: "Team Collaboration",
            description: "Work together to achieve common goals",
            image: {
              src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400",
              alt: "Team meeting",
            },
            link: {
              label: "Join us",
              href: "/join",
            },
          },
          {
            id: "card-3",
            title: "Professional Growth",
            description: "Continuous learning and development",
            image: {
              src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400",
              alt: "Training session",
            },
            link: {
              label: "Learn more",
              href: "/growth",
            },
          },
        ],
      },
    },
  },
};

export const WithBadges: Story = {
  args: {
    section: {
      ...baseSection,
      cardList: {
        variant: "elevated",
        columns: 4,
        cards: [
          {
            id: "card-1",
            icon: "🎯",
            badge: "New",
            title: "Goal Setting",
            description: "Define and achieve your objectives",
          },
          {
            id: "card-2",
            icon: "📊",
            badge: "Popular",
            title: "Analytics",
            description: "Track your progress with data",
          },
          {
            id: "card-3",
            icon: "🔒",
            badge: "Secure",
            title: "Security",
            description: "Enterprise-grade protection",
          },
          {
            id: "card-4",
            icon: "⚡",
            badge: "Fast",
            title: "Performance",
            description: "Lightning-fast operations",
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
        title: "Key Features",
        description: "Two powerful features that set us apart",
      },
      cardList: {
        variant: "elevated",
        columns: 2,
        cards: [
          {
            id: "feature-1",
            icon: "💪",
            title: "Strong Representation",
            description:
              "We fight for your rights and ensure fair treatment in the workplace. Our experienced team is dedicated to protecting your interests.",
            link: {
              label: "Learn how we help",
              href: "/representation",
            },
          },
          {
            id: "feature-2",
            icon: "🤝",
            title: "Community Support",
            description:
              "Join a network of over 69,000 members who support each other. Access resources, events, and opportunities for growth.",
            link: {
              label: "Join the community",
              href: "/community",
            },
          },
        ],
      },
    },
  },
};
