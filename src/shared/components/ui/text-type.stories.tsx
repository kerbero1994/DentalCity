import type { Meta, StoryObj } from "@storybook/nextjs";
import TextType from "./text-type";

const meta = {
  title: "UI/TextType",
  component: TextType,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    typingSpeed: {
      control: { type: "range", min: 10, max: 200, step: 10 },
      description: "Speed of typing in ms",
    },
    loop: {
      control: "boolean",
      description: "Loop the animation",
    },
    showCursor: {
      control: "boolean",
      description: "Show blinking cursor",
    },
  },
} satisfies Meta<typeof TextType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Welcome to SITIMM",
    typingSpeed: 50,
    loop: false,
    showCursor: true,
  },
};

export const MultipleTexts: Story = {
  args: {
    text: ["Welcome to SITIMM", "Bienvenido a SITIMM", "Your union, your voice"],
    typingSpeed: 50,
    loop: true,
    pauseDuration: 2000,
    showCursor: true,
  },
};

export const FastTyping: Story = {
  args: {
    text: "This types really fast!",
    typingSpeed: 20,
    loop: false,
    showCursor: true,
  },
};

export const SlowTyping: Story = {
  args: {
    text: "This... types... slowly...",
    typingSpeed: 150,
    loop: false,
    showCursor: true,
  },
};

export const NoCursor: Story = {
  args: {
    text: "No cursor visible",
    typingSpeed: 50,
    loop: false,
    showCursor: false,
  },
};

export const CustomCursor: Story = {
  args: {
    text: "Custom cursor character",
    typingSpeed: 50,
    loop: false,
    showCursor: true,
    cursorCharacter: "_",
  },
};

export const WithDelay: Story = {
  args: {
    text: "This starts after a delay",
    typingSpeed: 50,
    initialDelay: 1500,
    loop: false,
    showCursor: true,
  },
};

export const AsHeading: Story = {
  args: {
    text: "Heading Animation",
    as: "h1",
    typingSpeed: 40,
    loop: false,
    showCursor: true,
    className: "text-3xl font-bold",
  },
};

export const WithColors: Story = {
  args: {
    text: ["Red text", "Blue text", "Green text"],
    textColors: ["#d32027", "#3b82f6", "#10b981"],
    typingSpeed: 50,
    loop: true,
    pauseDuration: 1500,
    showCursor: true,
  },
};

export const VariableSpeed: Story = {
  args: {
    text: "Variable typing speed makes it feel more natural",
    variableSpeed: { min: 30, max: 100 },
    loop: false,
    showCursor: true,
  },
};

export const HeroExample = {
  render: () => (
    <div className="rounded-xl bg-gradient-to-r from-red-600 to-red-700 p-8 text-white">
      <p className="mb-2 text-sm tracking-wider uppercase opacity-80">SITIMM</p>
      <TextType
        text={["Tu sindicato, tu voz", "Your union, your voice", "Juntos somos más fuertes"]}
        as="h1"
        typingSpeed={40}
        loop={true}
        pauseDuration={3000}
        showCursor={true}
        cursorClassName="text-white"
        className="text-4xl font-bold"
      />
    </div>
  ),
};

export const FormPlaceholder = {
  render: () => (
    <div className="w-80 rounded-lg border border-gray-300 bg-white p-4">
      <span className="mb-2 block text-sm font-medium text-gray-700">Search</span>
      <div className="flex items-center rounded-md border border-gray-200 px-3 py-2">
        <TextType
          text={["Search events...", "Search programs...", "Search FAQs..."]}
          typingSpeed={60}
          loop={true}
          pauseDuration={2000}
          showCursor={false}
          className="text-gray-400"
        />
      </div>
    </div>
  ),
};
