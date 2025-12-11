import type { Meta, StoryObj } from "@storybook/nextjs";
import { PageHeader } from "./page-header";
import { NextIntlClientProvider } from "next-intl";

const messages = {};

const meta = {
  title: "UI/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="es" messages={messages}>
        <div className="max-w-4xl">
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
  argTypes: {
    animated: {
      control: "boolean",
      description: "Enable text typing animation",
    },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "EVENTOS",
    title: "Eventos del Sindicato",
    description:
      "Mantente informado sobre nuestros cursos, talleres y eventos especiales para todos los agremiados.",
  },
};

export const WithoutLabel: Story = {
  args: {
    title: "Programas de Capacitación",
    description: "Descubre los programas disponibles para tu desarrollo profesional.",
  },
};

export const WithoutDescription: Story = {
  args: {
    label: "PROGRAMAS",
    title: "Programas Disponibles",
  },
};

export const TitleOnly: Story = {
  args: {
    title: "Preguntas Frecuentes",
  },
};

export const LongDescription: Story = {
  args: {
    label: "BOLETINES",
    title: "Boletines Informativos",
    description:
      "Accede a todos nuestros boletines informativos donde encontrarás las últimas noticias, actualizaciones importantes sobre tus beneficios, cambios en las políticas laborales y mucho más contenido relevante para ti como agremiado.",
  },
};

export const Animated: Story = {
  args: {
    label: "EVENTOS",
    title: "Eventos del Sindicato",
    description: "Descubre todos los eventos disponibles.",
    animated: true,
  },
};

export const Events: Story = {
  args: {
    label: "EVENTOS",
    title: "Eventos del Sindicato",
    description:
      "Mantente informado sobre nuestros cursos, talleres y eventos especiales para todos los agremiados.",
  },
};

export const Programs: Story = {
  args: {
    label: "PROGRAMAS",
    title: "Programas de Capacitación",
    description:
      "Desarrolla tus habilidades profesionales con nuestros programas de formación y capacitación.",
  },
};

export const FAQ: Story = {
  args: {
    label: "FAQ",
    title: "Preguntas Frecuentes",
    description: "Encuentra respuestas a las dudas más comunes sobre tus beneficios y servicios.",
  },
};

export const Magazines: Story = {
  args: {
    label: "REVISTAS",
    title: "Revistas SITIMM",
    description: "Consulta nuestras publicaciones mensuales con información relevante.",
  },
};

export const Bonuses: Story = {
  args: {
    label: "DESCUENTOS",
    title: "Descuentos y Beneficios",
    description: "Aprovecha los descuentos exclusivos disponibles para agremiados SITIMM.",
  },
};

export const AllExamples = {
  render: () => (
    <div className="space-y-8">
      <PageHeader
        label="EVENTOS"
        title="Eventos del Sindicato"
        description="Mantente informado sobre nuestros eventos."
      />
      <PageHeader label="PROGRAMAS" title="Programas de Capacitación" />
      <PageHeader title="Preguntas Frecuentes" />
    </div>
  ),
};
