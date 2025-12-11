import type { Meta, StoryObj } from "@storybook/nextjs";
import { VideoSectionComponent } from "./VideoSection";
import type { VideoSection } from "@/core/types/lib/page-builder";

const meta = {
  title: "Page Builder/Video Section",
  component: VideoSectionComponent,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof VideoSectionComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseSection: VideoSection = {
  id: "video-1",
  type: "video",
  order: 1,
  visible: true,
  layout: {
    variant: "contained",
    padding: { top: "large", bottom: "large" },
  },
  content: {
    eyebrow: "Watch Demo",
    title: "See it in action",
    description: "Learn how our platform can transform your workflow",
  },
  video: {
    provider: "youtube",
    videoId: "dQw4w9WgXcQ",
    aspectRatio: "16/9",
  },
};

export const YouTubeVideo: Story = {
  args: {
    section: baseSection,
  },
};

export const VimeoVideo: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "Product Showcase",
        description: "Watch our latest product demo",
      },
      video: {
        provider: "vimeo",
        videoId: "76979871",
        aspectRatio: "16/9",
      },
    },
  },
};

export const WithCaption: Story = {
  args: {
    section: {
      ...baseSection,
      video: {
        ...baseSection.video,
        caption: "Product demo featuring our latest features (2 min)",
      },
    },
  },
};

export const CinematicRatio: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "Cinematic Experience",
        description: "Ultra-wide format video",
      },
      video: {
        provider: "youtube",
        videoId: "dQw4w9WgXcQ",
        aspectRatio: "21/9",
      },
    },
  },
};

export const SquareVideo: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "Social Media Ready",
        description: "Perfect for Instagram and Facebook",
      },
      video: {
        provider: "youtube",
        videoId: "dQw4w9WgXcQ",
        aspectRatio: "1/1",
      },
    },
  },
};

export const PortraitVideo: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "Mobile First",
        description: "Optimized for mobile viewing",
      },
      video: {
        provider: "youtube",
        videoId: "dQw4w9WgXcQ",
        aspectRatio: "9/16",
      },
    },
  },
};

export const AutoplayVideo: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "Auto-playing Background Video",
        description: "Muted autoplay for ambient effect",
      },
      video: {
        provider: "youtube",
        videoId: "dQw4w9WgXcQ",
        autoplay: true,
        aspectRatio: "16/9",
      },
    },
  },
};

export const SimpleVideo: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "Tutorial Video",
      },
      video: {
        provider: "youtube",
        videoId: "dQw4w9WgXcQ",
        aspectRatio: "16/9",
      },
    },
  },
};

export const FullWidthVideo: Story = {
  args: {
    section: {
      ...baseSection,
      layout: {
        variant: "full-width",
        padding: { top: "large", bottom: "large" },
      },
      content: {
        eyebrow: "Immersive Experience",
        title: "Full Screen Showcase",
        description: "Experience our platform in full glory",
      },
      video: {
        provider: "youtube",
        videoId: "dQw4w9WgXcQ",
        aspectRatio: "16/9",
      },
    },
  },
};

export const MultipleVideos = {
  render: () => (
    <div className="space-y-8">
      <VideoSectionComponent
        section={{
          id: "vid-1",
          type: "video",
          order: 1,
          visible: true,
          layout: { variant: "contained", padding: { top: "medium", bottom: "medium" } },
          content: {
            title: "Introduction",
            description: "Getting started with our platform",
          },
          video: {
            provider: "youtube",
            videoId: "dQw4w9WgXcQ",
            aspectRatio: "16/9",
          },
        }}
      />
      <VideoSectionComponent
        section={{
          id: "vid-2",
          type: "video",
          order: 2,
          visible: true,
          layout: { variant: "contained", padding: { top: "medium", bottom: "medium" } },
          content: {
            title: "Advanced Features",
            description: "Deep dive into power user features",
          },
          video: {
            provider: "youtube",
            videoId: "dQw4w9WgXcQ",
            aspectRatio: "16/9",
          },
        }}
      />
    </div>
  ),
};
