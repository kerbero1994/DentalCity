import type { Meta, StoryObj } from "@storybook/nextjs";
import { Search, User, Lock, Mail, Phone } from "lucide-react";
import { Input } from "./input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
    },
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
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithValue: Story = {
  args: {
    value: "Sample text",
    placeholder: "Enter text...",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "email@example.com",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password...",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter number...",
  },
};

export const SearchInput: Story = {
  args: {
    type: "search",
    placeholder: "Search...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
    label: "Disabled Field",
    helperText: "This field is disabled",
  },
};

export const FormExample = {
  render: () => (
    <div className="w-[350px] space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Full Name
        </label>
        <Input id="name" placeholder="John Doe" />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input id="email" type="email" placeholder="john@example.com" />
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">
          Phone Number
        </label>
        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "Enter email",
    error: "Please enter a valid email address",
    variant: "error",
  },
};

export const WithSuccess: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    variant: "success",
    helperText: "Username is available!",
  },
};

export const WithIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search for items...",
    icon: <Search className="h-4 w-4" />,
  },
};

export const Sizes: Story = {
  args: {},
  render: () => (
    <div className="w-[350px] space-y-4">
      <Input size="sm" placeholder="Small input" label="Small" />
      <Input size="md" placeholder="Medium input" label="Medium" />
      <Input size="lg" placeholder="Large input" label="Large" />
    </div>
  ),
};

export const WithIcons = {
  render: () => (
    <div className="w-[350px] space-y-4">
      <Input label="Username" placeholder="Enter username" icon={<User className="h-4 w-4" />} />
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        icon={<Mail className="h-4 w-4" />}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        icon={<Lock className="h-4 w-4" />}
      />
      <Input
        label="Phone"
        type="tel"
        placeholder="+1 (555) 000-0000"
        icon={<Phone className="h-4 w-4" />}
      />
    </div>
  ),
};

export const ValidationStates = {
  render: () => (
    <div className="w-[350px] space-y-4">
      <Input label="Default State" placeholder="Enter text" helperText="This is a helper text" />
      <Input
        label="Error State"
        placeholder="Enter email"
        variant="error"
        error="This field is required"
        value="invalid@"
      />
      <Input
        label="Success State"
        placeholder="Enter username"
        variant="success"
        helperText="Username is available!"
        value="johndoe"
      />
    </div>
  ),
};

export const AllTypes = {
  render: () => (
    <div className="w-[350px] space-y-3">
      <Input type="text" placeholder="Text input" label="Text" />
      <Input type="email" placeholder="Email input" label="Email" />
      <Input type="password" placeholder="Password input" label="Password" />
      <Input type="number" placeholder="Number input" label="Number" />
      <Input type="search" placeholder="Search input" label="Search" />
      <Input type="tel" placeholder="Phone input" label="Phone" />
      <Input type="url" placeholder="URL input" label="URL" />
    </div>
  ),
};
