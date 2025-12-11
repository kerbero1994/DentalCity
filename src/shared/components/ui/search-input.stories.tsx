import type { Meta } from "@storybook/nextjs";
import { SearchInput } from "./search-input";
import { useState } from "react";
import { NextIntlClientProvider } from "next-intl";

const messages = {
  ui: {
    searchInput: {
      defaultPlaceholder: "Search...",
      defaultAriaLabel: "Search",
      clearSearch: "Clear search",
    },
  },
};

const meta = {
  title: "UI/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="es" messages={messages}>
        <div className="w-80">
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;

// Interactive wrapper
const SearchInputWrapper = (props: Partial<React.ComponentProps<typeof SearchInput>>) => {
  const [value, setValue] = useState("");
  return <SearchInput value={value} onChange={setValue} {...props} />;
};

export const Default = {
  render: () => <SearchInputWrapper placeholder="Search..." />,
};

export const WithValue = {
  render: () => {
    const [value, setValue] = useState("search term");
    return <SearchInput value={value} onChange={setValue} placeholder="Search..." />;
  },
};

export const Small = {
  render: () => <SearchInputWrapper size="sm" placeholder="Small search..." />,
};

export const Medium = {
  render: () => <SearchInputWrapper size="md" placeholder="Medium search..." />,
};

export const Large = {
  render: () => <SearchInputWrapper size="lg" placeholder="Large search..." />,
};

export const Sizes = {
  render: () => (
    <div className="space-y-4">
      <SearchInputWrapper size="sm" placeholder="Small" />
      <SearchInputWrapper size="md" placeholder="Medium" />
      <SearchInputWrapper size="lg" placeholder="Large" />
    </div>
  ),
};

export const Disabled = {
  render: () => {
    const [value, setValue] = useState("");
    return <SearchInput value={value} onChange={setValue} placeholder="Disabled..." disabled />;
  },
};

export const CustomPlaceholder = {
  render: () => <SearchInputWrapper placeholder="Search events, programs, FAQ..." />,
};

export const WithCustomAriaLabel = {
  render: () => (
    <SearchInputWrapper placeholder="Search..." ariaLabel="Search for events and programs" />
  ),
};

export const InCard = {
  render: () => (
    <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <h3 className="mb-4 font-semibold">Search Events</h3>
      <SearchInputWrapper placeholder="Type to search..." />
    </div>
  ),
};

export const InHeader = {
  render: () => (
    <div className="flex items-center gap-4 rounded-lg bg-red-600 p-4">
      <span className="font-bold text-white">SITIMM</span>
      <div className="flex-1">
        <SearchInputWrapper placeholder="Search..." />
      </div>
    </div>
  ),
};

export const InSidebar = {
  render: () => (
    <div className="w-64 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
      <SearchInputWrapper size="sm" placeholder="Filter results..." />
      <div className="mt-4 space-y-2">
        <div className="rounded bg-white p-2 text-sm dark:bg-gray-700">Events (12)</div>
        <div className="rounded bg-white p-2 text-sm dark:bg-gray-700">Programs (8)</div>
        <div className="rounded bg-white p-2 text-sm dark:bg-gray-700">FAQ (24)</div>
      </div>
    </div>
  ),
};

export const DarkBackground = {
  render: () => (
    <div className="rounded-lg bg-gray-900 p-6">
      <h3 className="mb-4 font-semibold text-white">Search</h3>
      <SearchInputWrapper placeholder="Search in dark mode..." />
    </div>
  ),
};
