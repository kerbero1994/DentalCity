import type { Meta, StoryObj } from "@storybook/nextjs";
import { HeroSectionComponent } from "./HeroSection";
import type { HeroSection } from "@/core/types/lib/page-builder";

const meta = {
  title: "Page Builder/Hero Section",
  component: HeroSectionComponent,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HeroSectionComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseSection: HeroSection = {
  id: "hero-1",
  type: "hero",
  order: 1,
  visible: true,
  layout: {
    variant: "contained",
    padding: { top: "large", bottom: "large" },
  },
  content: {
    eyebrow: "Welcome",
    title: "SITIMM",
    subtitle: "Sindicalismo de verdad",
    description:
      "La organización sindical más importante del centro del país. Más de 69,000 compañeras y compañeros afiliados.",
  },
  hero: {
    variant: "default",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800",
      alt: "Team collaboration",
      priority: true,
    },
    ctas: [
      {
        label: "Conoce más",
        href: "/about",
        variant: "primary",
      },
      {
        label: "Únete",
        href: "/join",
        variant: "outline",
      },
    ],
  },
};

export const Default: Story = {
  args: {
    section: baseSection,
  },
};

export const SplitLayout: Story = {
  args: {
    section: {
      ...baseSection,
      hero: {
        ...baseSection.hero,
        variant: "split",
      },
    },
  },
};

export const CenteredLayout: Story = {
  args: {
    section: {
      ...baseSection,
      hero: {
        ...baseSection.hero,
        variant: "centered",
      },
    },
  },
};

export const WithGradientBackground: Story = {
  args: {
    section: {
      ...baseSection,
      layout: {
        ...baseSection.layout,
        background: {
          gradient: {
            from: "#1a1a2e",
            to: "#16213e",
            direction: "to-bottom",
          },
        },
      },
      style: {
        textColor: "#ffffff",
      },
    },
  },
};

export const WithoutImage: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        eyebrow: "Bienvenido",
        title: "Construyendo el Futuro",
        subtitle: "Juntos somos más fuertes",
        description:
          "Únete a la organización sindical que defiende tus derechos y promueve tu desarrollo profesional.",
      },
      hero: {
        variant: "centered",
        ctas: [
          {
            label: "Comienza ahora",
            href: "/start",
            variant: "primary",
            icon: "→",
          },
        ],
      },
    },
  },
};

export const MinimalCentered: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "Simple & Powerful",
        description: "Everything you need, nothing you don't.",
      },
      hero: {
        variant: "centered",
        ctas: [
          {
            label: "Get Started",
            href: "/start",
            variant: "primary",
          },
          {
            label: "Learn More",
            href: "/learn",
            variant: "secondary",
          },
        ],
      },
    },
  },
};
