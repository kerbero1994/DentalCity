import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { VideoSectionComponent } from "../VideoSection";
import type { VideoSection } from "@/core/types/lib/page-builder";

describe("VideoSectionComponent", () => {
  describe("YouTube Videos", () => {
    it("renders YouTube video", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Video Title",
        },
        video: {
          provider: "youtube",
          videoId: "dQw4w9WgXcQ",
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const iframe = container.querySelector("iframe");
      expect(iframe).toBeInTheDocument();
      expect(iframe?.src).toContain("youtube-nocookie.com");
      expect(iframe?.src).toContain("dQw4w9WgXcQ");
    });

    it("renders YouTube video with autoplay", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Video",
        },
        video: {
          provider: "youtube",
          videoId: "test123",
          autoplay: true,
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const iframe = container.querySelector("iframe");
      expect(iframe?.src).toContain("autoplay=1");
      expect(iframe?.src).toContain("mute=1");
    });

    it("renders YouTube video without autoplay", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Video",
        },
        video: {
          provider: "youtube",
          videoId: "test123",
          autoplay: false,
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const iframe = container.querySelector("iframe");
      expect(iframe?.src).not.toContain("autoplay=1");
    });

    it("renders YouTube iframe with correct title", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "My Video Title",
        },
        video: {
          provider: "youtube",
          videoId: "test123",
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const iframe = container.querySelector("iframe");
      expect(iframe?.title).toBe("My Video Title");
    });

    it("uses default title when content title missing", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {},
        video: {
          provider: "youtube",
          videoId: "test123",
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const iframe = container.querySelector("iframe");
      expect(iframe?.title).toBe("Video");
    });
  });

  describe("Vimeo Videos", () => {
    it("renders Vimeo video", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Vimeo Video",
        },
        video: {
          provider: "vimeo",
          videoId: "123456789",
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const iframe = container.querySelector("iframe");
      expect(iframe).toBeInTheDocument();
      expect(iframe?.src).toContain("player.vimeo.com");
      expect(iframe?.src).toContain("123456789");
    });

    it("renders Vimeo video with autoplay", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Video",
        },
        video: {
          provider: "vimeo",
          videoId: "123456789",
          autoplay: true,
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const iframe = container.querySelector("iframe");
      expect(iframe?.src).toContain("autoplay=1");
      expect(iframe?.src).toContain("muted=1");
    });

    it("renders Vimeo video without autoplay", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Video",
        },
        video: {
          provider: "vimeo",
          videoId: "123456789",
          autoplay: false,
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const iframe = container.querySelector("iframe");
      expect(iframe?.src).not.toContain("autoplay=1");
    });
  });

  describe("Self-Hosted Videos", () => {
    it("renders self-hosted video", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Self-Hosted Video",
        },
        video: {
          provider: "self-hosted",
          url: "/videos/sample.mp4",
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const video = container.querySelector("video");
      expect(video).toBeInTheDocument();
      expect(video?.src).toContain("sample.mp4");
    });

    it("renders self-hosted video with src field", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Video",
        },
        video: {
          provider: "self-hosted",
          src: "/videos/sample.mp4",
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const video = container.querySelector("video");
      expect(video?.src).toContain("sample.mp4");
    });

    it("renders video with controls", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Video",
        },
        video: {
          provider: "self-hosted",
          url: "/video.mp4",
          controls: true,
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const video = container.querySelector("video");
      expect(video).toHaveAttribute("controls");
    });

    it("renders video without controls when disabled", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Video",
        },
        video: {
          provider: "self-hosted",
          url: "/video.mp4",
          controls: false,
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const video = container.querySelector("video");
      expect(video).not.toHaveAttribute("controls");
    });

    it("renders video with autoplay", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Video",
        },
        video: {
          provider: "self-hosted",
          url: "/video.mp4",
          autoplay: true,
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const video = container.querySelector("video");
      expect(video).toHaveAttribute("autoplay");
    });

    it("renders video with loop", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Video",
        },
        video: {
          provider: "self-hosted",
          url: "/video.mp4",
          loop: true,
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const video = container.querySelector("video");
      expect(video).toHaveAttribute("loop");
    });

    it("renders video with muted", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Video",
        },
        video: {
          provider: "self-hosted",
          url: "/video.mp4",
          muted: true,
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const video = container.querySelector("video") as HTMLVideoElement;
      // muted is a DOM property, not an attribute
      expect(video.muted).toBe(true);
    });

    it("renders video with poster", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Video",
        },
        video: {
          provider: "self-hosted",
          url: "/video.mp4",
          poster: "/poster.jpg",
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const video = container.querySelector("video");
      expect(video).toHaveAttribute("poster", "/poster.jpg");
    });
  });

  describe("Custom Videos", () => {
    it("renders custom video provider", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Custom Video",
        },
        video: {
          provider: "custom",
          url: "https://example.com/video.mp4",
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const video = container.querySelector("video");
      expect(video).toBeInTheDocument();
      expect(video?.src).toContain("example.com/video.mp4");
    });
  });

  describe("Content Header", () => {
    it("renders eyebrow text", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          eyebrow: "Watch Now",
          title: "Video",
        },
        video: {
          provider: "youtube",
          videoId: "test123",
        },
      };

      render(<VideoSectionComponent section={section} />);

      expect(screen.getByText("Watch Now")).toBeInTheDocument();
    });

    it("renders title", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Amazing Video",
        },
        video: {
          provider: "youtube",
          videoId: "test123",
        },
      };

      render(<VideoSectionComponent section={section} />);

      expect(screen.getByText("Amazing Video")).toBeInTheDocument();
    });

    it("renders description", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Video",
          description: "This is an amazing video description",
        },
        video: {
          provider: "youtube",
          videoId: "test123",
        },
      };

      render(<VideoSectionComponent section={section} />);

      expect(screen.getByText("This is an amazing video description")).toBeInTheDocument();
    });

    it("renders without header when content is empty", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {},
        video: {
          provider: "youtube",
          videoId: "test123",
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const iframe = container.querySelector("iframe");
      expect(iframe).toBeInTheDocument();
    });
  });

  describe("Aspect Ratio", () => {
    it("renders with default 16/9 aspect ratio", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Video",
        },
        video: {
          provider: "youtube",
          videoId: "test123",
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const videoContainer = container.querySelector("[style*='aspect-ratio']");
      expect(videoContainer).toHaveStyle({ aspectRatio: "16/9" });
    });

    it("renders with custom aspect ratio", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Video",
        },
        video: {
          provider: "youtube",
          videoId: "test123",
          aspectRatio: "4/3",
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const videoContainer = container.querySelector("[style*='aspect-ratio']");
      expect(videoContainer).toHaveStyle({ aspectRatio: "4/3" });
    });

    it("renders with square aspect ratio", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Video",
        },
        video: {
          provider: "youtube",
          videoId: "test123",
          aspectRatio: "1/1",
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const videoContainer = container.querySelector("[style*='aspect-ratio']");
      expect(videoContainer).toHaveStyle({ aspectRatio: "1/1" });
    });
  });

  describe("Caption", () => {
    it("renders video caption", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Video",
        },
        video: {
          provider: "youtube",
          videoId: "test123",
          caption: "This is a video caption",
        },
      };

      render(<VideoSectionComponent section={section} />);

      expect(screen.getByText("This is a video caption")).toBeInTheDocument();
    });

    it("renders without caption", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Video",
        },
        video: {
          provider: "youtube",
          videoId: "test123",
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const caption = container.querySelector(".text-sm.opacity-70");
      expect(caption).not.toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("renders without videoId for YouTube", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Video",
        },
        video: {
          provider: "youtube",
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const iframe = container.querySelector("iframe");
      expect(iframe).not.toBeInTheDocument();
    });

    it("renders without videoId for Vimeo", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Video",
        },
        video: {
          provider: "vimeo",
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const iframe = container.querySelector("iframe");
      expect(iframe).not.toBeInTheDocument();
    });

    it("renders without url for self-hosted", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          title: "Video",
        },
        video: {
          provider: "self-hosted",
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const video = container.querySelector("video");
      expect(video).not.toBeInTheDocument();
    });

    it("renders with all YouTube features", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          eyebrow: "Featured",
          title: "Complete Video",
          description: "Full description",
        },
        video: {
          provider: "youtube",
          videoId: "test123",
          autoplay: true,
          aspectRatio: "21/9",
          caption: "Video caption text",
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      expect(screen.getByText("Featured")).toBeInTheDocument();
      expect(screen.getByText("Complete Video")).toBeInTheDocument();
      expect(screen.getByText("Full description")).toBeInTheDocument();
      expect(screen.getByText("Video caption text")).toBeInTheDocument();

      const iframe = container.querySelector("iframe");
      expect(iframe?.src).toContain("autoplay=1");
    });

    it("renders with all self-hosted features", () => {
      const section: VideoSection = {
        type: "video",
        id: "test-section",
        content: {
          eyebrow: "Featured",
          title: "Complete Video",
          description: "Full description",
        },
        video: {
          provider: "self-hosted",
          url: "/video.mp4",
          controls: true,
          autoplay: true,
          loop: true,
          muted: true,
          poster: "/poster.jpg",
          aspectRatio: "16/9",
          caption: "Video caption",
        },
      };

      const { container } = render(<VideoSectionComponent section={section} />);

      const video = container.querySelector("video") as HTMLVideoElement;
      expect(video).toHaveAttribute("controls");
      expect(video).toHaveAttribute("autoplay");
      expect(video).toHaveAttribute("loop");
      // muted is a DOM property, not an attribute
      expect(video.muted).toBe(true);
      expect(video).toHaveAttribute("poster", "/poster.jpg");
    });
  });
});
