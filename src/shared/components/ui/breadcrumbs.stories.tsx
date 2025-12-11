import type { Meta, StoryObj } from "@storybook/nextjs";
import { Breadcrumbs } from "./breadcrumbs";
import { NextIntlClientProvider } from "next-intl";

const messages = {
  ui: {
    breadcrumbs: {
      ariaLabel: "Breadcrumb navigation",
    },
  },
};

const meta = {
  title: "UI/Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="es" messages={messages}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { name: "Home", url: "/" },
      { name: "Events", url: "/events" },
      { name: "Annual Conference", url: "/events/annual-conference" },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [
      { name: "Home", url: "/" },
      { name: "Programs", url: "/programs" },
    ],
  },
};

export const FourLevels: Story = {
  args: {
    items: [
      { name: "Home", url: "/" },
      { name: "Programs", url: "/programs" },
      { name: "Education", url: "/programs/education" },
      { name: "Course Details", url: "/programs/education/course-123" },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ name: "Home", url: "/" }],
  },
};

export const LongNames: Story = {
  args: {
    items: [
      { name: "Home", url: "/" },
      { name: "Frequently Asked Questions", url: "/faq" },
      { name: "How to register for membership benefits", url: "/faq/registration" },
    ],
  },
};

export const SpanishNavigation: Story = {
  args: {
    items: [
      { name: "Inicio", url: "/es" },
      { name: "Eventos", url: "/es/eventos" },
      { name: "Conferencia Anual 2024", url: "/es/eventos/conferencia-2024" },
    ],
  },
};

export const WithCustomClass: Story = {
  args: {
    items: [
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
      { name: "Article Title", url: "/blog/article" },
    ],
    className: "bg-gray-100 p-3 rounded-lg",
  },
};

export const InPageContext = {
  render: () => (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow">
        <Breadcrumbs
          items={[
            { name: "Inicio", url: "/" },
            { name: "Programas", url: "/programas" },
            { name: "Capacitación Laboral", url: "/programas/capacitacion" },
          ]}
        />
        <h1 className="mt-4 text-2xl font-bold">Capacitación Laboral</h1>
        <p className="mt-2 text-gray-600">
          Programa de capacitación para trabajadores sindicalizados.
        </p>
      </div>
    </div>
  ),
};
