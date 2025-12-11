import type { Meta, StoryObj } from "@storybook/nextjs";
import { Globe, User, Settings, LogOut, Bell, Shield, HelpCircle, Flag } from "lucide-react";
import { Dropdown } from "./dropdown";

const meta = {
  title: "UI/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    align: {
      control: "select",
      options: ["left", "right", "center"],
    },
    width: {
      control: "select",
      options: ["auto", "full", "min"],
    },
    showCheckmark: {
      control: "boolean",
    },
    closeOnSelect: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
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

export const WithSelectedValue: Story = {
  args: {
    options: defaultOptions,
    placeholder: "Select an option",
    value: "option2",
  },
};

export const WithIcons: Story = {
  args: {
    options: [
      { value: "profile", label: "Profile", icon: <User className="h-4 w-4" /> },
      { value: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
      { value: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
      { value: "security", label: "Security", icon: <Shield className="h-4 w-4" /> },
      { value: "help", label: "Help", icon: <HelpCircle className="h-4 w-4" /> },
      { value: "logout", label: "Logout", icon: <LogOut className="h-4 w-4" /> },
    ],
    placeholder: "Select action",
  },
};

export const WithDescriptions: Story = {
  args: {
    options: [
      {
        value: "basic",
        label: "Basic Plan",
        description: "Perfect for individuals",
      },
      {
        value: "pro",
        label: "Pro Plan",
        description: "Best for professionals",
      },
      {
        value: "enterprise",
        label: "Enterprise",
        description: "For large organizations",
      },
    ],
    placeholder: "Select a plan",
    width: "min",
  },
};

export const LanguageSelector: Story = {
  args: {
    options: [
      {
        value: "es",
        label: "Español",
        icon: <span>🇲🇽</span>,
        description: "Spanish",
      },
      {
        value: "en",
        label: "English",
        icon: <span>🇺🇸</span>,
        description: "English",
      },
      {
        value: "fr",
        label: "Français",
        icon: <span>🇫🇷</span>,
        description: "French",
      },
      {
        value: "de",
        label: "Deutsch",
        icon: <span>🇩🇪</span>,
        description: "German",
      },
    ],
    placeholder: "Select language",
    value: "es",
  },
};

export const Variants: Story = {
  args: {
    options: defaultOptions,
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Dropdown variant="default" options={defaultOptions} placeholder="Default variant" />
      <Dropdown variant="outline" options={defaultOptions} placeholder="Outline variant" />
      <Dropdown variant="ghost" options={defaultOptions} placeholder="Ghost variant" />
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    options: defaultOptions,
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Dropdown size="sm" options={defaultOptions} placeholder="Small size" />
      <Dropdown size="md" options={defaultOptions} placeholder="Medium size" />
      <Dropdown size="lg" options={defaultOptions} placeholder="Large size" />
    </div>
  ),
};

export const Alignments: Story = {
  args: {
    options: defaultOptions,
  },
  render: () => (
    <div className="flex w-[600px] justify-between">
      <Dropdown align="left" options={defaultOptions} placeholder="Left aligned" />
      <Dropdown align="center" options={defaultOptions} placeholder="Center aligned" />
      <Dropdown align="right" options={defaultOptions} placeholder="Right aligned" />
    </div>
  ),
};

export const UserMenu: Story = {
  args: {
    options: [
      {
        value: "profile",
        label: "Juan Pérez",
        description: "juan.perez@sitimm.org",
        icon: <User className="h-4 w-4" />,
      },
      { value: "divider1", label: "---", disabled: true },
      { value: "settings", label: "Configuración", icon: <Settings className="h-4 w-4" /> },
      { value: "notifications", label: "Notificaciones", icon: <Bell className="h-4 w-4" /> },
      { value: "divider2", label: "---", disabled: true },
      { value: "help", label: "Ayuda", icon: <HelpCircle className="h-4 w-4" /> },
      {
        value: "logout",
        label: "Cerrar sesión",
        icon: <LogOut className="h-4 w-4 text-red-500" />,
      },
    ],
    placeholder: "Mi cuenta",
    align: "right",
    showCheckmark: false,
  },
};

export const CustomTrigger: Story = {
  args: {
    trigger: (
      <button className="flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-white hover:bg-[var(--color-primary-hover)]">
        <Globe className="h-4 w-4" />
        <span>Custom Trigger</span>
      </button>
    ),
    options: [
      { value: "option1", label: "First Option" },
      { value: "option2", label: "Second Option" },
      { value: "option3", label: "Third Option" },
    ],
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: "active", label: "Active Option" },
      { value: "disabled1", label: "Disabled Option 1", disabled: true },
      { value: "enabled", label: "Enabled Option" },
      { value: "disabled2", label: "Disabled Option 2", disabled: true },
      { value: "available", label: "Available Option" },
    ],
    placeholder: "Select an option",
  },
};

export const NoCloseOnSelect: Story = {
  args: {
    options: [
      { value: "option1", label: "Option 1", icon: <Flag className="h-4 w-4" /> },
      { value: "option2", label: "Option 2", icon: <Flag className="h-4 w-4" /> },
      { value: "option3", label: "Option 3", icon: <Flag className="h-4 w-4" /> },
    ],
    placeholder: "Multi-select behavior",
    closeOnSelect: false,
  },
};
