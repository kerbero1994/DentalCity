import type { Meta, StoryObj } from "@storybook/nextjs";
import { TextArea } from "./textarea";

const meta = {
  title: "UI/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error", "success"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    label: {
      control: "text",
    },
    error: {
      control: "text",
    },
    helperText: {
      control: "text",
    },
    showCharCount: {
      control: "boolean",
    },
    maxLength: {
      control: "number",
    },
    rows: {
      control: "number",
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter your message...",
    rows: 4,
  },
};

export const WithLabel: Story = {
  args: {
    label: "Description",
    placeholder: "Enter a description...",
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    label: "Comments",
    placeholder: "Enter your comments",
    error: "Comments are required",
    variant: "error",
    rows: 4,
  },
};

export const WithSuccess: Story = {
  args: {
    label: "Feedback",
    placeholder: "Your feedback",
    variant: "success",
    helperText: "Thank you for your feedback!",
    defaultValue: "This is great!",
    rows: 4,
  },
};

export const WithCharCount: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself...",
    showCharCount: true,
    maxLength: 200,
    rows: 4,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Additional Notes",
    placeholder: "Any additional information...",
    helperText: "Optional: Add any relevant details",
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled TextArea",
    placeholder: "This field is disabled",
    disabled: true,
    helperText: "This field is currently disabled",
    rows: 4,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <TextArea size="sm" label="Small" placeholder="Small textarea" rows={3} />
      <TextArea size="md" label="Medium" placeholder="Medium textarea" rows={4} />
      <TextArea size="lg" label="Large" placeholder="Large textarea" rows={5} />
    </div>
  ),
};

export const DifferentRows: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <TextArea label="Compact (2 rows)" placeholder="Compact textarea..." rows={2} />
      <TextArea label="Standard (4 rows)" placeholder="Standard textarea..." rows={4} />
      <TextArea label="Extended (8 rows)" placeholder="Extended textarea..." rows={8} />
    </div>
  ),
};

export const ValidationStates = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <TextArea
        label="Default State"
        placeholder="Enter text"
        helperText="This is a helper text"
        rows={3}
      />
      <TextArea
        label="Error State"
        placeholder="Enter description"
        variant="error"
        error="This field is required"
        rows={3}
      />
      <TextArea
        label="Success State"
        placeholder="Enter message"
        variant="success"
        helperText="Message saved successfully"
        defaultValue="Thank you for your submission"
        rows={3}
      />
    </div>
  ),
};

export const EventDescription = {
  render: () => (
    <div className="w-[500px] space-y-4">
      <TextArea
        label="Descripción del Evento"
        placeholder="Ingrese una descripción detallada del evento..."
        helperText="Incluya información sobre el contenido, objetivos y beneficios del evento"
        showCharCount={true}
        maxLength={500}
        rows={6}
        defaultValue="Este taller está diseñado para proporcionar a los trabajadores conocimientos fundamentales sobre sus derechos laborales y las reformas más recientes. Los participantes aprenderán sobre contratos colectivos, libertad sindical, y los nuevos mecanismos de justicia laboral."
      />
    </div>
  ),
};

export const ContactForm = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Formulario de Contacto</h3>
        <TextArea
          label="Mensaje"
          placeholder="Escriba su mensaje aquí..."
          helperText="Mínimo 50 caracteres"
          showCharCount={true}
          maxLength={1000}
          rows={6}
        />
        <TextArea
          label="¿Cómo podemos ayudarte?"
          placeholder="Describe tu situación o pregunta..."
          rows={4}
        />
      </div>
    </div>
  ),
};

export const WithMaxLength = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <TextArea
        label="Short Message (50 chars)"
        placeholder="Brief message..."
        showCharCount={true}
        maxLength={50}
        rows={2}
      />
      <TextArea
        label="Tweet (280 chars)"
        placeholder="What's happening?"
        showCharCount={true}
        maxLength={280}
        rows={3}
        defaultValue="The SITIMM Design System provides consistent, accessible components for building modern web applications. Check out our new TextArea component!"
      />
      <TextArea
        label="Extended Description (500 chars)"
        placeholder="Detailed description..."
        showCharCount={true}
        maxLength={500}
        rows={5}
      />
    </div>
  ),
};
