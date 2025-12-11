import type { Meta, StoryObj } from "@storybook/nextjs";
import { SkipLink } from "./skip-link";
import { NextIntlClientProvider } from "next-intl";

const messages = {
  a11y: {
    skipToContent: "Skip to main content",
  },
};

const meta = {
  title: "UI/SkipLink",
  component: SkipLink,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
} satisfies Meta<typeof SkipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-100">
      <SkipLink />
      <header className="bg-white p-4 shadow">
        <nav>
          <p className="text-sm text-gray-600">
            Press <kbd className="rounded bg-gray-200 px-1">Tab</kbd> to see the skip link
          </p>
        </nav>
      </header>
      <main id="main-content" className="p-8">
        <h1 className="mb-4 text-2xl font-bold">Main Content</h1>
        <p className="text-gray-600">
          The skip link appears when focused, allowing keyboard users to bypass navigation.
        </p>
      </main>
    </div>
  ),
};

export const Focused: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-100">
      {/* Visible version for demonstration */}
      <a
        href="#main-content"
        className="absolute top-4 left-4 z-[9999] rounded-md bg-[var(--color-primary)] px-4 py-2 text-white shadow-lg ring-2 ring-white ring-offset-2 outline-none"
      >
        Skip to main content
      </a>
      <header className="bg-white p-4 pt-16 shadow">
        <nav>
          <p className="text-sm text-gray-600">This shows how the skip link looks when focused</p>
        </nav>
      </header>
      <main id="main-content" className="p-8">
        <h1 className="mb-4 text-2xl font-bold">Main Content</h1>
        <p className="text-gray-600">The skip link jumps directly to this content.</p>
      </main>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-100">
      <SkipLink />
      <header className="bg-red-600 p-4 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="text-xl font-bold">SITIMM</span>
          <nav className="flex gap-4">
            <span className="cursor-pointer hover:underline">Home</span>
            <span className="cursor-pointer hover:underline">Events</span>
            <span className="cursor-pointer hover:underline">Programs</span>
            <span className="cursor-pointer hover:underline">Contact</span>
          </nav>
        </div>
      </header>
      <main id="main-content" className="mx-auto max-w-6xl p-8">
        <h1 className="mb-4 text-3xl font-bold">Welcome to SITIMM</h1>
        <p className="mb-4 text-gray-600">
          Tab to see the skip link that allows keyboard users to skip the navigation.
        </p>
        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="mb-2 text-xl font-semibold">Accessibility Feature</h2>
          <p className="text-gray-600">
            Skip links are an important accessibility feature that allows keyboard and screen reader
            users to bypass repetitive navigation and jump directly to the main content.
          </p>
        </div>
      </main>
    </div>
  ),
};
