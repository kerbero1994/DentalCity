import type { Meta, StoryObj } from "@storybook/nextjs";
import { Skeleton } from "./skeleton";

const meta = {
  title: "UI/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type _Story = StoryObj<typeof meta>;

export const Default = {
  render: () => <Skeleton className="h-12 w-[250px]" />,
};

export const Circle = {
  render: () => <Skeleton className="h-12 w-12 rounded-full" />,
};

export const CardSkeleton = {
  render: () => (
    <div className="flex w-[350px] flex-col space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  ),
};

export const ProfileSkeleton = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};

export const TableSkeleton = {
  render: () => (
    <div className="w-full space-y-2">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  ),
};

export const ListSkeleton = {
  render: () => (
    <div className="w-[400px] space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const TextSkeleton = {
  render: () => (
    <div className="w-[500px] space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  ),
};

export const DashboardSkeleton = {
  render: () => (
    <div className="w-full max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2 rounded-lg border p-4">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-8 w-[80px]" />
            <Skeleton className="h-3 w-[120px]" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        <Skeleton className="h-[200px] w-full rounded-lg" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-[150px] rounded-lg" />
          <Skeleton className="h-[150px] rounded-lg" />
        </div>
      </div>
    </div>
  ),
};
