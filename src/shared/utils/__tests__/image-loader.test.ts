import { describe, it, expect } from "vitest";
import {
  shouldUnoptimizeImage,
  getCarouselImageUrl,
  getCarouselImageDimensions,
  getContentTypeFromUrl,
} from "../image-loader";

describe("image-loader", () => {
  describe("shouldUnoptimizeImage", () => {
    it("returns false for undefined src", () => {
      expect(shouldUnoptimizeImage(undefined)).toBe(false);
    });

    it("returns false for empty string", () => {
      expect(shouldUnoptimizeImage("")).toBe(false);
    });

    it("returns true for DigitalOcean Spaces images (bypasses optimization to prevent timeouts)", () => {
      const url = "https://sitimm-files.nyc3.digitaloceanspaces.com/image.jpg";
      expect(shouldUnoptimizeImage(url)).toBe(true);
    });

    it("returns false for googleusercontent.com images", () => {
      const url = "https://lh3.googleusercontent.com/image.jpg";
      expect(shouldUnoptimizeImage(url)).toBe(false);
    });

    it("returns true for other external HTTP URLs", () => {
      const url = "http://example.com/image.jpg";
      expect(shouldUnoptimizeImage(url)).toBe(true);
    });

    it("returns true for other external HTTPS URLs", () => {
      const url = "https://example.com/image.jpg";
      expect(shouldUnoptimizeImage(url)).toBe(true);
    });

    it("returns false for relative URLs starting with /", () => {
      expect(shouldUnoptimizeImage("/images/logo.png")).toBe(false);
    });

    it("returns false for relative URLs without /", () => {
      expect(shouldUnoptimizeImage("images/logo.png")).toBe(false);
    });

    it("returns true for external URLs from unknown domains", () => {
      const url = "https://unknown-cdn.com/image.jpg";
      expect(shouldUnoptimizeImage(url)).toBe(true);
    });

    it("handles URLs with query parameters", () => {
      const url = "https://example.com/image.jpg?v=1234";
      expect(shouldUnoptimizeImage(url)).toBe(true);
    });

    it("handles URLs with hash fragments", () => {
      const url = "https://example.com/image.jpg#section";
      expect(shouldUnoptimizeImage(url)).toBe(true);
    });

    it("handles data URLs", () => {
      const dataUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg";
      expect(shouldUnoptimizeImage(dataUrl)).toBe(false);
    });
  });

  describe("getCarouselImageUrl", () => {
    it("returns empty string for undefined src", () => {
      expect(getCarouselImageUrl(undefined)).toBe("");
    });

    it("returns empty string for empty src", () => {
      expect(getCarouselImageUrl("")).toBe("");
    });

    it("returns DigitalOcean Spaces URL unchanged", () => {
      const url = "https://sitimm-files.nyc3.digitaloceanspaces.com/carousel/image.jpg";
      expect(getCarouselImageUrl(url)).toBe(url);
    });

    it("returns DigitalOcean Spaces URL unchanged even with options", () => {
      const url = "https://sitimm-files.nyc3.digitaloceanspaces.com/carousel/image.jpg";
      const result = getCarouselImageUrl(url, { width: 1200, height: 800, quality: 90 });
      expect(result).toBe(url);
    });

    it("returns Google Cloud Storage URL unchanged", () => {
      const url = "https://lh3.googleusercontent.com/image.jpg";
      expect(getCarouselImageUrl(url)).toBe(url);
    });

    it("returns Google Cloud Storage URL unchanged with options", () => {
      const url = "https://lh3.googleusercontent.com/image.jpg";
      const result = getCarouselImageUrl(url, { width: 800, height: 600 });
      expect(result).toBe(url);
    });

    it("returns local image URL unchanged", () => {
      const url = "/images/carousel/hero.jpg";
      expect(getCarouselImageUrl(url)).toBe(url);
    });

    it("returns external image URL unchanged", () => {
      const url = "https://example.com/image.jpg";
      expect(getCarouselImageUrl(url)).toBe(url);
    });

    it("accepts custom width option", () => {
      const url = "/images/test.jpg";
      const result = getCarouselImageUrl(url, { width: 1920 });
      expect(result).toBe(url);
    });

    it("accepts custom height option", () => {
      const url = "/images/test.jpg";
      const result = getCarouselImageUrl(url, { height: 1080 });
      expect(result).toBe(url);
    });

    it("accepts custom quality option", () => {
      const url = "/images/test.jpg";
      const result = getCarouselImageUrl(url, { quality: 95 });
      expect(result).toBe(url);
    });

    it("accepts all options together", () => {
      const url = "/images/test.jpg";
      const result = getCarouselImageUrl(url, {
        width: 1920,
        height: 1080,
        quality: 95,
      });
      expect(result).toBe(url);
    });

    it("handles URLs with query parameters", () => {
      const url = "https://example.com/image.jpg?v=123";
      expect(getCarouselImageUrl(url)).toBe(url);
    });

    it("handles relative URLs without leading slash", () => {
      const url = "images/carousel.jpg";
      expect(getCarouselImageUrl(url)).toBe(url);
    });
  });

  describe("getCarouselImageDimensions", () => {
    it("returns standard carousel dimensions", () => {
      const dimensions = getCarouselImageDimensions();
      expect(dimensions).toEqual({
        width: 800,
        height: 550,
      });
    });

    it("returns consistent dimensions on multiple calls", () => {
      const dim1 = getCarouselImageDimensions();
      const dim2 = getCarouselImageDimensions();
      expect(dim1).toEqual(dim2);
    });

    it("returns 16:11 aspect ratio", () => {
      const { width, height } = getCarouselImageDimensions();
      const ratio = width / height;
      const expected = 16 / 11;
      expect(ratio).toBeCloseTo(expected, 2);
    });

    it("returns object with width and height properties", () => {
      const dimensions = getCarouselImageDimensions();
      expect(dimensions).toHaveProperty("width");
      expect(dimensions).toHaveProperty("height");
    });

    it("returns numeric width and height", () => {
      const { width, height } = getCarouselImageDimensions();
      expect(typeof width).toBe("number");
      expect(typeof height).toBe("number");
    });

    it("returns positive dimensions", () => {
      const { width, height } = getCarouselImageDimensions();
      expect(width).toBeGreaterThan(0);
      expect(height).toBeGreaterThan(0);
    });
  });

  describe("getContentTypeFromUrl", () => {
    it("returns image/jpeg for .jpg files", () => {
      expect(getContentTypeFromUrl("image.jpg")).toBe("image/jpeg");
    });

    it("returns image/jpeg for .jpeg files", () => {
      expect(getContentTypeFromUrl("photo.jpeg")).toBe("image/jpeg");
    });

    it("returns image/png for .png files", () => {
      expect(getContentTypeFromUrl("logo.png")).toBe("image/png");
    });

    it("returns image/gif for .gif files", () => {
      expect(getContentTypeFromUrl("animation.gif")).toBe("image/gif");
    });

    it("returns image/webp for .webp files", () => {
      expect(getContentTypeFromUrl("modern.webp")).toBe("image/webp");
    });

    it("returns image/svg+xml for .svg files", () => {
      expect(getContentTypeFromUrl("icon.svg")).toBe("image/svg+xml");
    });

    it("returns image/bmp for .bmp files", () => {
      expect(getContentTypeFromUrl("bitmap.bmp")).toBe("image/bmp");
    });

    it("returns image/x-icon for .ico files", () => {
      expect(getContentTypeFromUrl("favicon.ico")).toBe("image/x-icon");
    });

    it("handles uppercase extensions", () => {
      expect(getContentTypeFromUrl("IMAGE.JPG")).toBe("image/jpeg");
      expect(getContentTypeFromUrl("PHOTO.PNG")).toBe("image/png");
    });

    it("handles mixed case extensions", () => {
      expect(getContentTypeFromUrl("file.JpEg")).toBe("image/jpeg");
      expect(getContentTypeFromUrl("file.PnG")).toBe("image/png");
    });

    it("returns image/jpeg as default for unknown extensions", () => {
      expect(getContentTypeFromUrl("file.unknown")).toBe("image/jpeg");
    });

    it("returns image/jpeg for files without extension", () => {
      expect(getContentTypeFromUrl("imagefile")).toBe("image/jpeg");
    });

    it("handles full URLs with extensions", () => {
      expect(getContentTypeFromUrl("https://example.com/image.png")).toBe("image/png");
    });

    it("handles URLs with query parameters", () => {
      expect(getContentTypeFromUrl("https://example.com/image.jpg?v=123")).toBe("image/jpeg");
    });

    it("handles multiple dots in filename", () => {
      expect(getContentTypeFromUrl("file.name.with.dots.png")).toBe("image/png");
    });

    it("handles DigitalOcean Spaces URLs", () => {
      const url = "https://sitimm-files.nyc3.digitaloceanspaces.com/images/photo.jpeg";
      expect(getContentTypeFromUrl(url)).toBe("image/jpeg");
    });

    it("handles paths with directories", () => {
      expect(getContentTypeFromUrl("/images/gallery/photo.png")).toBe("image/png");
    });

    it("handles empty string", () => {
      expect(getContentTypeFromUrl("")).toBe("image/jpeg");
    });

    it("handles paths ending with slash", () => {
      expect(getContentTypeFromUrl("images/")).toBe("image/jpeg");
    });

    it("handles relative paths", () => {
      expect(getContentTypeFromUrl("../../images/logo.svg")).toBe("image/svg+xml");
    });

    it("correctly identifies all supported formats", () => {
      const formats = [
        { ext: "jpg", type: "image/jpeg" },
        { ext: "jpeg", type: "image/jpeg" },
        { ext: "png", type: "image/png" },
        { ext: "gif", type: "image/gif" },
        { ext: "webp", type: "image/webp" },
        { ext: "svg", type: "image/svg+xml" },
        { ext: "bmp", type: "image/bmp" },
        { ext: "ico", type: "image/x-icon" },
      ];

      formats.forEach(({ ext, type }) => {
        expect(getContentTypeFromUrl(`file.${ext}`)).toBe(type);
      });
    });
  });

  describe("Real-World Scenarios", () => {
    it("handles typical DigitalOcean Spaces carousel image", () => {
      const url = "https://sitimm-files.nyc3.digitaloceanspaces.com/carousel/hero-2024.jpg";

      // DigitalOcean Spaces images are unoptimized to prevent timeouts
      expect(shouldUnoptimizeImage(url)).toBe(true);
      expect(getCarouselImageUrl(url, { width: 1920, height: 1080 })).toBe(url);
      expect(getContentTypeFromUrl(url)).toBe("image/jpeg");
    });

    it("handles Google user content image", () => {
      const url = "https://lh3.googleusercontent.com/a/user-photo.jpg";

      expect(shouldUnoptimizeImage(url)).toBe(false);
      expect(getCarouselImageUrl(url)).toBe(url);
      expect(getContentTypeFromUrl(url)).toBe("image/jpeg");
    });

    it("handles external CDN image that should be unoptimized", () => {
      const url = "https://cdn.example.com/images/banner.png";

      expect(shouldUnoptimizeImage(url)).toBe(true);
      expect(getCarouselImageUrl(url)).toBe(url);
      expect(getContentTypeFromUrl(url)).toBe("image/png");
    });

    it("handles local static image", () => {
      const url = "/static/images/logo.svg";

      expect(shouldUnoptimizeImage(url)).toBe(false);
      expect(getCarouselImageUrl(url)).toBe(url);
      expect(getContentTypeFromUrl(url)).toBe("image/svg+xml");
    });

    it("provides correct dimensions for carousel component", () => {
      const dimensions = getCarouselImageDimensions();

      // Verify these are suitable for typical carousel usage
      expect(dimensions.width).toBeGreaterThanOrEqual(600);
      expect(dimensions.height).toBeGreaterThanOrEqual(400);
    });
  });
});
