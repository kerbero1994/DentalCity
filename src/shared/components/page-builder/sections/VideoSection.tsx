import type { VideoSection } from "@/core/types/lib/page-builder";
import { cn } from "@/lib/utils";
import { getContentContainerClass } from "../utils/section-styles";

interface VideoSectionProps {
  section: VideoSection;
}

export function VideoSectionComponent({ section }: VideoSectionProps) {
  const { content, video } = section;
  const aspectRatio = video.aspectRatio || "16/9";

  return (
    <div className={getContentContainerClass()}>
      {/* Header */}
      {(content?.eyebrow || content?.title || content?.description) && (
        <div className="mb-8 space-y-4 text-center">
          {content.eyebrow && (
            <p className="text-primary text-sm font-semibold tracking-wide uppercase">
              {content.eyebrow}
            </p>
          )}
          {content.title && <h2 className="text-3xl font-bold md:text-4xl">{content.title}</h2>}
          {content.description && (
            <p className="mx-auto max-w-3xl text-lg opacity-80">{content.description}</p>
          )}
        </div>
      )}

      {/* Video Container */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl",
          getVideoContainerClass(video.provider)
        )}
        style={{ aspectRatio }}
      >
        {video.provider === "youtube" && video.videoId && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}${video.autoplay ? "?autoplay=1&mute=1" : ""}`}
            title={content?.title || "Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        )}

        {video.provider === "vimeo" && video.videoId && (
          <iframe
            src={`https://player.vimeo.com/video/${video.videoId}${video.autoplay ? "?autoplay=1&muted=1" : ""}`}
            title={content?.title || "Video"}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        )}

        {(video.provider === "self-hosted" || video.provider === "custom") &&
          (video.url || video.src) && (
            <video
              src={video.url || video.src}
              controls={video.controls !== false}
              autoPlay={video.autoplay}
              loop={video.loop}
              muted={video.muted}
              poster={video.poster}
              className="absolute inset-0 h-full w-full object-cover"
            >
              <track kind="captions" />
            </video>
          )}
      </div>

      {/* Caption */}
      {video.caption && <p className="mt-4 text-center text-sm opacity-70">{video.caption}</p>}
    </div>
  );
}

function getVideoContainerClass(provider?: "youtube" | "vimeo" | "self-hosted" | "custom"): string {
  if (provider === "self-hosted" || provider === "custom") {
    return "bg-black";
  }
  return "bg-gray-900";
}
