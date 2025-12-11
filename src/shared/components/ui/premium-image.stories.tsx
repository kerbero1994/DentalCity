import type { Meta, StoryObj } from "@storybook/nextjs";
import { PremiumImage } from "./premium-image";

const meta = {
  title: "UI/PremiumImage",
  component: PremiumImage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    objectFit: {
      control: "select",
      options: ["contain", "cover", "fill", "none", "scale-down"],
      description: "Object fit style",
    },
    priority: {
      control: "boolean",
      description: "Load image with priority",
    },
  },
} satisfies Meta<typeof PremiumImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://picsum.photos/400/300",
    alt: "Sample image",
    width: 400,
    height: 300,
  },
};

export const WithAspectRatio: Story = {
  args: {
    src: "https://picsum.photos/800/600",
    alt: "Landscape image",
    width: 400,
    height: 300,
    aspectRatio: "16/9",
    containerClassName: "w-96",
  },
};

export const FillContainer: Story = {
  args: {
    src: "https://picsum.photos/800/800",
    alt: "Square image",
    fill: true,
    containerClassName: "w-64 h-64",
  },
};

export const ObjectFitContain: Story = {
  args: {
    src: "https://picsum.photos/800/400",
    alt: "Wide image",
    fill: true,
    objectFit: "contain",
    containerClassName: "w-64 h-64 bg-gray-100",
  },
};

export const ObjectFitCover: Story = {
  args: {
    src: "https://picsum.photos/400/800",
    alt: "Tall image",
    fill: true,
    objectFit: "cover",
    containerClassName: "w-64 h-64",
  },
};

export const Priority: Story = {
  args: {
    src: "https://picsum.photos/600/400",
    alt: "Priority loaded image",
    width: 300,
    height: 200,
    priority: true,
  },
};

export const Gallery = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <PremiumImage
        src="https://picsum.photos/300/300?random=1"
        alt="Gallery image 1"
        width={150}
        height={150}
        containerClassName="rounded-lg overflow-hidden"
      />
      <PremiumImage
        src="https://picsum.photos/300/300?random=2"
        alt="Gallery image 2"
        width={150}
        height={150}
        containerClassName="rounded-lg overflow-hidden"
      />
      <PremiumImage
        src="https://picsum.photos/300/300?random=3"
        alt="Gallery image 3"
        width={150}
        height={150}
        containerClassName="rounded-lg overflow-hidden"
      />
      <PremiumImage
        src="https://picsum.photos/300/300?random=4"
        alt="Gallery image 4"
        width={150}
        height={150}
        containerClassName="rounded-lg overflow-hidden"
      />
      <PremiumImage
        src="https://picsum.photos/300/300?random=5"
        alt="Gallery image 5"
        width={150}
        height={150}
        containerClassName="rounded-lg overflow-hidden"
      />
      <PremiumImage
        src="https://picsum.photos/300/300?random=6"
        alt="Gallery image 6"
        width={150}
        height={150}
        containerClassName="rounded-lg overflow-hidden"
      />
    </div>
  ),
};

export const AspectRatios = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-sm text-gray-500">16:9 Aspect Ratio</p>
        <PremiumImage
          src="https://picsum.photos/800/450"
          alt="16:9 image"
          fill
          aspectRatio="16/9"
          containerClassName="w-80"
        />
      </div>
      <div>
        <p className="mb-2 text-sm text-gray-500">4:3 Aspect Ratio</p>
        <PremiumImage
          src="https://picsum.photos/800/600"
          alt="4:3 image"
          fill
          aspectRatio="4/3"
          containerClassName="w-80"
        />
      </div>
      <div>
        <p className="mb-2 text-sm text-gray-500">1:1 Aspect Ratio</p>
        <PremiumImage
          src="https://picsum.photos/400/400"
          alt="1:1 image"
          fill
          aspectRatio="1/1"
          containerClassName="w-40"
        />
      </div>
    </div>
  ),
};
