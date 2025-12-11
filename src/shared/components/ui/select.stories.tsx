import type { Meta, StoryObj } from "@storybook/nextjs";
import { MapPin, Calendar, Filter } from "lucide-react";
import { Select } from "./select";

const meta = {
  title: "UI/Select",
  component: Select,
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
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: "", label: "Select an option" },
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4", disabled: true },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: "Select an option",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Choose an option",
    options: defaultOptions,
  },
};

export const WithError: Story = {
  args: {
    label: "Category",
    options: defaultOptions,
    error: "Please select a category",
    variant: "error",
  },
};

export const WithSuccess: Story = {
  args: {
    label: "Status",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "pending", label: "Pending" },
    ],
    variant: "success",
    helperText: "Status updated successfully",
    defaultValue: "active",
  },
};

export const WithIcon: Story = {
  args: {
    label: "Location",
    options: [
      { value: "", label: "Select location" },
      { value: "celaya", label: "Celaya" },
      { value: "irapuato", label: "Irapuato" },
      { value: "leon", label: "León" },
      { value: "virtual", label: "Virtual" },
    ],
    icon: <MapPin className="h-4 w-4" />,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Select",
    options: defaultOptions,
    disabled: true,
    helperText: "This field is disabled",
  },
};

export const Sizes: Story = {
  args: {
    options: defaultOptions,
  },
  render: () => (
    <div className="w-[350px] space-y-4">
      <Select size="sm" label="Small" options={defaultOptions} />
      <Select size="md" label="Medium" options={defaultOptions} />
      <Select size="lg" label="Large" options={defaultOptions} />
    </div>
  ),
};

export const EventFilters = {
  render: () => (
    <div className="w-[350px] space-y-4">
      <Select
        label="Categoría"
        icon={<Filter className="h-4 w-4" />}
        options={[
          { value: "", label: "Todas las categorías" },
          { value: "taller", label: "Taller" },
          { value: "curso", label: "Curso" },
          { value: "asamblea", label: "Asamblea" },
          { value: "conferencia", label: "Conferencia" },
        ]}
      />
      <Select
        label="Mes"
        icon={<Calendar className="h-4 w-4" />}
        options={[
          { value: "", label: "Todos los meses" },
          { value: "01", label: "Enero" },
          { value: "02", label: "Febrero" },
          { value: "03", label: "Marzo" },
          { value: "04", label: "Abril" },
          { value: "05", label: "Mayo" },
          { value: "06", label: "Junio" },
          { value: "07", label: "Julio" },
          { value: "08", label: "Agosto" },
          { value: "09", label: "Septiembre" },
          { value: "10", label: "Octubre" },
          { value: "11", label: "Noviembre" },
          { value: "12", label: "Diciembre" },
        ]}
      />
      <Select
        label="Ubicación"
        icon={<MapPin className="h-4 w-4" />}
        options={[
          { value: "", label: "Todas las ubicaciones" },
          { value: "celaya", label: "Centro de Capacitación - Celaya" },
          { value: "irapuato", label: "Centro de Capacitación - Irapuato" },
          { value: "leon", label: "Oficinas - León" },
          { value: "virtual", label: "Virtual (Zoom)" },
        ]}
      />
    </div>
  ),
};

export const ValidationStates = {
  render: () => (
    <div className="w-[350px] space-y-4">
      <Select label="Default State" options={defaultOptions} helperText="Please select an option" />
      <Select
        label="Error State"
        options={defaultOptions}
        variant="error"
        error="This field is required"
      />
      <Select
        label="Success State"
        options={defaultOptions}
        variant="success"
        helperText="Option saved successfully"
        defaultValue="option1"
      />
    </div>
  ),
};
