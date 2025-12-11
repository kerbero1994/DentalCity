import type { Meta, StoryObj } from "@storybook/nextjs";
import { Avatar } from "./avatar";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type _Story = StoryObj<typeof meta>;

export const WithImage = {
  render: () => <Avatar src="https://github.com/shadcn.png" alt="User" fallback="CN" />,
};

export const WithFallback = {
  render: () => <Avatar src="invalid-url" alt="User" fallback="JD" />,
};

export const FallbackOnly = {
  render: () => <Avatar fallback="AB" alt="User" />,
};

export const Sizes = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar src="https://github.com/shadcn.png" alt="User" fallback="SM" size="sm" />
      <Avatar src="https://github.com/shadcn.png" alt="User" fallback="MD" size="md" />
      <Avatar src="https://github.com/shadcn.png" alt="User" fallback="LG" size="lg" />
      <Avatar src="https://github.com/shadcn.png" alt="User" fallback="XL" size="xl" />
    </div>
  ),
};

export const UserList = {
  render: () => (
    <div className="space-y-3">
      {[
        { name: "John Doe", initials: "JD", image: "https://i.pravatar.cc/150?img=1" },
        { name: "Jane Smith", initials: "JS", image: "https://i.pravatar.cc/150?img=2" },
        { name: "Bob Wilson", initials: "BW", image: "https://i.pravatar.cc/150?img=3" },
      ].map((user) => (
        <div key={user.initials} className="flex items-center gap-3">
          <Avatar src={user.image} alt={user.name} fallback={user.initials} />
          <span className="text-sm font-medium">{user.name}</span>
        </div>
      ))}
    </div>
  ),
};

export const AvatarGroup = {
  render: () => (
    <div className="flex -space-x-4">
      <Avatar
        src="https://i.pravatar.cc/150?img=1"
        alt="User 1"
        fallback="U1"
        className="border-background border-2"
      />
      <Avatar
        src="https://i.pravatar.cc/150?img=2"
        alt="User 2"
        fallback="U2"
        className="border-background border-2"
      />
      <Avatar
        src="https://i.pravatar.cc/150?img=3"
        alt="User 3"
        fallback="U3"
        className="border-background border-2"
      />
      <Avatar fallback="+5" alt="More users" className="border-background border-2" />
    </div>
  ),
};

export const ColoredFallbacks = {
  render: () => (
    <div className="flex gap-4">
      <Avatar fallback="RD" alt="Red" className="bg-red-500 text-white" />
      <Avatar fallback="BL" alt="Blue" className="bg-blue-500 text-white" />
      <Avatar fallback="GR" alt="Green" className="bg-green-500 text-white" />
      <Avatar fallback="PR" alt="Purple" className="bg-purple-500 text-white" />
    </div>
  ),
};
