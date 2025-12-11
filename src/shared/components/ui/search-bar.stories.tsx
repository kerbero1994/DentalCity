import type { Meta } from "@storybook/nextjs";
import { SearchBar } from "./search-bar";
import { useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { Calendar } from "lucide-react";
import { Button } from "./button";

const messages = {
  ui: {
    searchBar: {
      defaultPlaceholder: "Search...",
      defaultAriaLabel: "Search",
      clearSearch: "Clear search",
      toggleFilters: "Toggle filters",
      filters: "Filters",
      gridView: "Grid view",
      listView: "List view",
      compactView: "Compact view",
      result: "result",
      results: "results",
    },
  },
};

const meta = {
  title: "UI/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="es" messages={messages}>
        <div className="max-w-2xl">
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
    showFilter: {
      control: "boolean",
      description: "Show filter button",
    },
    showViewToggle: {
      control: "boolean",
      description: "Show view mode toggle",
    },
    showResultsCount: {
      control: "boolean",
      description: "Show results counter",
    },
  },
} satisfies Meta<typeof SearchBar>;

export default meta;

// Interactive wrapper component
const SearchBarWrapper = (props: Partial<React.ComponentProps<typeof SearchBar>>) => {
  const [value, setValue] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "compact">("grid");

  return (
    <SearchBar
      value={value}
      onChange={setValue}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      {...props}
    />
  );
};

export const Default = {
  render: () => <SearchBarWrapper placeholder="Search events..." />,
};

export const WithValue = {
  render: () => {
    const [value, setValue] = useState("annual conference");
    return <SearchBar value={value} onChange={setValue} placeholder="Search events..." />;
  },
};

export const Sizes = {
  render: () => (
    <div className="space-y-4">
      <SearchBarWrapper size="sm" placeholder="Small search..." />
      <SearchBarWrapper size="md" placeholder="Medium search..." />
      <SearchBarWrapper size="lg" placeholder="Large search..." />
    </div>
  ),
};

export const WithFilters = {
  render: () => (
    <SearchBarWrapper
      placeholder="Search..."
      showFilter
      filterContent={
        <div className="space-y-4">
          <div>
            <label htmlFor="category" className="mb-2 block text-sm font-medium">
              Category
            </label>
            <select id="category" className="w-full rounded-md border p-2">
              <option>All categories</option>
              <option>Events</option>
              <option>Programs</option>
              <option>FAQ</option>
            </select>
          </div>
          <div>
            <label htmlFor="date-range" className="mb-2 block text-sm font-medium">
              Date Range
            </label>
            <input id="date-range" type="date" className="w-full rounded-md border p-2" />
          </div>
        </div>
      }
    />
  ),
};

export const WithViewToggle = {
  render: () => <SearchBarWrapper placeholder="Search..." showViewToggle />,
};

export const WithResultsCount = {
  render: () => (
    <SearchBarWrapper
      placeholder="Search..."
      showResultsCount
      resultsCount={42}
      resultsIcon={<Calendar className="h-4 w-4" />}
    />
  ),
};

export const FullFeatured = {
  render: () => (
    <SearchBarWrapper
      placeholder="Search events, programs, FAQ..."
      showFilter
      showViewToggle
      showResultsCount
      resultsCount={156}
      filterContent={
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="type" className="mb-2 block text-sm font-medium">
              Type
            </label>
            <select id="type" className="w-full rounded-md border p-2">
              <option>All types</option>
              <option>Events</option>
              <option>Programs</option>
            </select>
          </div>
          <div>
            <label htmlFor="status" className="mb-2 block text-sm font-medium">
              Status
            </label>
            <select id="status" className="w-full rounded-md border p-2">
              <option>All</option>
              <option>Active</option>
              <option>Past</option>
            </select>
          </div>
        </div>
      }
    />
  ),
};

export const WithCustomActions = {
  render: () => (
    <SearchBarWrapper
      placeholder="Search..."
      actions={
        <Button variant="sitimm" size="sm">
          Add New
        </Button>
      }
    />
  ),
};

export const Disabled = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <SearchBar value={value} onChange={setValue} placeholder="Search disabled..." disabled />
    );
  },
};

export const InContext = {
  render: () => (
    <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-bold">Events</h2>
      <SearchBarWrapper
        placeholder="Search events..."
        showFilter
        showViewToggle
        showResultsCount
        resultsCount={24}
        filterContent={
          <div className="space-y-4">
            <div>
              <span className="mb-2 block text-sm font-medium">Event Type</span>
              <div className="flex flex-wrap gap-2">
                <button className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-600">
                  Workshops
                </button>
                <button className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                  Conferences
                </button>
                <button className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                  Training
                </button>
              </div>
            </div>
          </div>
        }
      />
    </div>
  ),
};
