import type { Meta, StoryObj } from "@storybook/nextjs";
import { ModalBackdrop } from "./modal-backdrop";
import { useState } from "react";
import { Button } from "./button";

const meta = {
  title: "UI/ModalBackdrop",
  component: ModalBackdrop,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "dark", "blur"],
      description: "Opacity/effect variant",
    },
  },
} satisfies Meta<typeof ModalBackdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive demo component
const InteractiveDemo = ({ variant }: { variant: "default" | "dark" | "blur" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-96 w-full bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="text-white">
        <h2 className="mb-4 text-2xl font-bold">Background Content</h2>
        <p className="mb-4">Click the button to show the backdrop overlay.</p>
        <Button onClick={() => setIsOpen(true)} variant="outline" className="text-white">
          Show Backdrop ({variant})
        </Button>
      </div>

      {isOpen && (
        <>
          <ModalBackdrop onClick={() => setIsOpen(false)} variant={variant} />
          <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-2 text-lg font-semibold">Modal Content</h3>
            <p className="mb-4 text-gray-600">Click the backdrop to close</p>
            <Button onClick={() => setIsOpen(false)} variant="sitimm">
              Close
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export const Default: Story = {
  render: () => <InteractiveDemo variant="default" />,
};

export const Dark: Story = {
  render: () => <InteractiveDemo variant="dark" />,
};

export const Blur: Story = {
  render: () => <InteractiveDemo variant="blur" />,
};

export const AllVariants = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="relative h-48 overflow-hidden rounded-lg bg-gradient-to-r from-green-400 to-blue-500">
        <div className="relative z-10 p-4 text-white">
          <h3 className="font-bold">Default Backdrop</h3>
          <p>50% opacity black overlay</p>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-black/50" />
      </div>
      <div className="relative h-48 overflow-hidden rounded-lg bg-gradient-to-r from-pink-400 to-red-500">
        <div className="relative z-10 p-4 text-white">
          <h3 className="font-bold">Dark Backdrop</h3>
          <p>70% opacity black overlay</p>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-black/70" />
      </div>
      <div className="relative h-48 overflow-hidden rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="relative z-10 p-4 text-white">
          <h3 className="font-bold">Blur Backdrop</h3>
          <p>70% opacity with blur effect</p>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>
    </div>
  ),
};
