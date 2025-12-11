import type { Meta, StoryObj } from "@storybook/nextjs";
import { ThemeToggleButton } from "./theme-toggle-button";
import { useState } from "react";

const meta = {
  title: "UI/ThemeToggleButton",
  component: ThemeToggleButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: "select",
      options: ["light", "dark"],
      description: "Current theme state",
    },
    variant: {
      control: "select",
      options: ["circle", "circle-blur", "polygon"],
      description: "Animation variant for theme transition",
    },
  },
} satisfies Meta<typeof ThemeToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    theme: "light",
    "aria-label": "Toggle theme",
  },
};

export const Dark: Story = {
  args: {
    theme: "dark",
    "aria-label": "Toggle theme",
  },
};

// Interactive demo component
const InteractiveDemo = ({ variant }: { variant: "circle" | "circle-blur" | "polygon" }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div
      className={`flex h-40 w-80 items-center justify-center rounded-lg transition-colors ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="text-center">
        <p className={`mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          Current: {theme} mode
        </p>
        <ThemeToggleButton
          theme={theme}
          variant={variant}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label="Toggle theme"
          className={theme === "dark" ? "text-white" : "text-gray-900"}
        />
      </div>
    </div>
  );
};

export const Interactive = {
  render: () => <InteractiveDemo variant="circle" />,
};

export const CircleBlurVariant = {
  render: () => <InteractiveDemo variant="circle-blur" />,
};

export const PolygonVariant = {
  render: () => <InteractiveDemo variant="polygon" />,
};

export const AllVariants = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <p className="mb-2 text-sm text-gray-500">Circle Variant (Default)</p>
        <InteractiveDemo variant="circle" />
      </div>
      <div className="text-center">
        <p className="mb-2 text-sm text-gray-500">Circle Blur Variant</p>
        <InteractiveDemo variant="circle-blur" />
      </div>
      <div className="text-center">
        <p className="mb-2 text-sm text-gray-500">Polygon Variant</p>
        <InteractiveDemo variant="polygon" />
      </div>
    </div>
  ),
};

export const InNavbar = {
  render: () => {
    const NavbarDemo = () => {
      const [theme, setTheme] = useState<"light" | "dark">("light");

      return (
        <div
          className={`w-full rounded-lg ${theme === "dark" ? "bg-gray-900" : "bg-white"} shadow-lg`}
        >
          <div className="flex items-center justify-between p-4">
            <span
              className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-red-600"}`}
            >
              SITIMM
            </span>
            <nav className="flex items-center gap-4">
              <span
                className={`cursor-pointer ${theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
              >
                Home
              </span>
              <span
                className={`cursor-pointer ${theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
              >
                Events
              </span>
              <ThemeToggleButton
                theme={theme}
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                aria-label="Toggle theme"
                className={theme === "dark" ? "text-white" : "text-gray-900"}
              />
            </nav>
          </div>
        </div>
      );
    };

    return <NavbarDemo />;
  },
};
