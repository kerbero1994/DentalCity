import type { Meta, StoryObj } from "@storybook/nextjs";
import { Section } from "./section";
import { Container } from "./container";

const meta = {
  title: "UI/Section",
  component: Section,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    spacing: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
    },
  },
} satisfies Meta<typeof Section>;

export default meta;
type _Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <Section>
      <Container>
        <h2 className="text-2xl font-bold">Default Section</h2>
        <p className="text-muted-foreground mt-2">With standard padding</p>
      </Container>
    </Section>
  ),
};

export const NoPadding = {
  render: () => (
    <Section spacing="none" className="bg-gray-100">
      <Container>
        <h2 className="text-2xl font-bold">No Padding Section</h2>
        <p className="text-muted-foreground mt-2">Useful for full-bleed content</p>
      </Container>
    </Section>
  ),
};

export const SmallPadding = {
  render: () => (
    <Section spacing="sm" className="bg-gray-100">
      <Container>
        <h2 className="text-2xl font-bold">Small Padding</h2>
        <p className="text-muted-foreground mt-2">Compact spacing</p>
      </Container>
    </Section>
  ),
};

export const LargePadding = {
  render: () => (
    <Section spacing="lg" className="bg-gray-100">
      <Container>
        <h2 className="text-2xl font-bold">Large Padding</h2>
        <p className="text-muted-foreground mt-2">Spacious layout</p>
      </Container>
    </Section>
  ),
};

export const ExtraLargePadding = {
  render: () => (
    <Section spacing="xl" className="bg-gray-100">
      <Container>
        <h2 className="text-2xl font-bold">Extra Large Padding</h2>
        <p className="text-muted-foreground mt-2">Maximum spacing for hero sections</p>
      </Container>
    </Section>
  ),
};

export const AlternatingSections = {
  render: () => (
    <div>
      <Section className="bg-white">
        <Container>
          <h2 className="text-2xl font-bold">Section One</h2>
          <p className="text-muted-foreground mt-2">Light background</p>
        </Container>
      </Section>

      <Section className="bg-gray-100">
        <Container>
          <h2 className="text-2xl font-bold">Section Two</h2>
          <p className="text-muted-foreground mt-2">Gray background</p>
        </Container>
      </Section>

      <Section className="bg-primary text-primary-foreground">
        <Container>
          <h2 className="text-2xl font-bold">Section Three</h2>
          <p className="mt-2 opacity-90">Primary colored background</p>
        </Container>
      </Section>
    </div>
  ),
};

export const HeroSection = {
  render: () => (
    <Section
      spacing="xl"
      className="from-primary to-primary/80 text-primary-foreground bg-gradient-to-r"
    >
      <Container>
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">Welcome to Our Platform</h1>
          <p className="mx-auto max-w-2xl text-xl opacity-90">
            Build amazing applications with our comprehensive design system
          </p>
          <div className="flex justify-center gap-3 pt-4">
            <button className="text-primary rounded-lg bg-white px-6 py-3 font-semibold hover:bg-white/90">
              Get Started
            </button>
            <button className="rounded-lg border-2 border-white px-6 py-3 font-semibold hover:bg-white/10">
              Learn More
            </button>
          </div>
        </div>
      </Container>
    </Section>
  ),
};

export const FeatureSection = {
  render: () => (
    <Section spacing="lg">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">Features</h2>
          <p className="text-muted-foreground mt-2">Everything you need to build great products</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border p-6">
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Feature {i}</h3>
              <p className="text-muted-foreground">Description of the feature goes here</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  ),
};

export const CTASection = {
  render: () => (
    <Section spacing="lg" className="bg-primary text-primary-foreground">
      <Container size="md">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="text-lg opacity-90">Join thousands of users already using our platform</p>
          <button className="text-primary mt-6 rounded-lg bg-white px-8 py-3 font-semibold hover:bg-white/90">
            Start Free Trial
          </button>
        </div>
      </Container>
    </Section>
  ),
};
