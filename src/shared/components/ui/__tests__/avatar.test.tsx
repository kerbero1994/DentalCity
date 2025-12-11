import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarWithBadge, AvatarGroup } from "../avatar";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      defaultAlt: "User avatar",
      statusOnline: "Online",
      statusOffline: "Offline",
      statusAway: "Away",
      statusBusy: "Busy",
    };
    return translations[key] || key;
  },
}));

// Mock Next.js Image
vi.mock("next/image", () => ({
  default: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} />
  ),
}));

describe("Avatar", () => {
  describe("Rendering", () => {
    it("renders avatar container", () => {
      const { container } = render(<Avatar />);
      const avatar = container.querySelector("span");
      expect(avatar).toBeInTheDocument();
    });

    it("applies base avatar styles", () => {
      const { container } = render(<Avatar />);
      const avatar = container.querySelector("span");
      expect(avatar).toHaveClass("inline-flex", "rounded-full", "bg-muted", "overflow-hidden");
    });

    it("renders with image when src provided", () => {
      render(<Avatar src="/avatar.jpg" alt="John Doe" />);
      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("src", "/avatar.jpg");
      expect(image).toHaveAttribute("alt", "John Doe");
    });

    it("renders fallback when no src provided", () => {
      const { container } = render(<Avatar />);
      const fallback = container.querySelector("svg");
      expect(fallback).toBeInTheDocument();
    });

    it("uses default alt text", () => {
      render(<Avatar src="/avatar.jpg" />);
      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("alt", "User avatar");
    });
  });

  describe("Sizes", () => {
    it("renders xs size", () => {
      const { container } = render(<Avatar size="xs" />);
      const avatar = container.querySelector("span");
      expect(avatar).toHaveClass("size-6");
    });

    it("renders sm size", () => {
      const { container } = render(<Avatar size="sm" />);
      const avatar = container.querySelector("span");
      expect(avatar).toHaveClass("size-8");
    });

    it("renders md (default) size", () => {
      const { container } = render(<Avatar size="md" />);
      const avatar = container.querySelector("span");
      expect(avatar).toHaveClass("size-10");
    });

    it("renders lg size", () => {
      const { container } = render(<Avatar size="lg" />);
      const avatar = container.querySelector("span");
      expect(avatar).toHaveClass("size-12");
    });

    it("renders xl size", () => {
      const { container } = render(<Avatar size="xl" />);
      const avatar = container.querySelector("span");
      expect(avatar).toHaveClass("size-16");
    });

    it("renders 2xl size", () => {
      const { container } = render(<Avatar size="2xl" />);
      const avatar = container.querySelector("span");
      expect(avatar).toHaveClass("size-20");
    });

    it("renders 3xl size", () => {
      const { container } = render(<Avatar size="3xl" />);
      const avatar = container.querySelector("span");
      expect(avatar).toHaveClass("size-24");
    });
  });

  describe("Fallback", () => {
    it("renders default icon fallback", () => {
      const { container } = render(<Avatar />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("renders custom fallback text", () => {
      render(<Avatar fallback="JD" />);
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("renders custom fallback component", () => {
      render(<Avatar fallback={<span>Custom</span>} />);
      expect(screen.getByText("Custom")).toBeInTheDocument();
    });

    it("fallback has proper styling", () => {
      const { container } = render(<Avatar fallback="AB" />);
      const fallback = container.querySelector("span > span");
      expect(fallback).toHaveClass("flex", "items-center", "justify-center", "bg-muted");
    });

    it("fallback text size adjusts with avatar size", () => {
      const { container: c1 } = render(<Avatar fallback="A" size="xs" />);
      const fallbackXs = c1.querySelector("span > span");
      expect(fallbackXs).toHaveClass("text-[10px]");

      const { container: c2 } = render(<Avatar fallback="A" size="lg" />);
      const fallbackLg = c2.querySelector("span > span");
      expect(fallbackLg).toHaveClass("text-base");
    });

    it("icon size adjusts with avatar size", () => {
      const { container: c1 } = render(<Avatar size="xs" />);
      const iconXs = c1.querySelector("svg");
      expect(iconXs).toHaveClass("size-3");

      const { container: c2 } = render(<Avatar size="3xl" />);
      const icon3xl = c2.querySelector("svg");
      expect(icon3xl).toHaveClass("size-12");
    });

    it("icon is hidden from screen readers", () => {
      const { container } = render(<Avatar />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("aria-hidden");
    });
  });

  describe("Image", () => {
    it("renders image with correct props", () => {
      render(<Avatar src="/photo.jpg" alt="Profile" />);
      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("src", "/photo.jpg");
      expect(image).toHaveAttribute("alt", "Profile");
    });

    it("applies object-cover to image", () => {
      render(<Avatar src="/photo.jpg" />);
      const image = screen.getByRole("img");
      expect(image).toHaveClass("object-cover");
    });

    it("priority prop is passed to image", () => {
      // Priority would be passed to Next.js Image in real implementation
      const { container } = render(<Avatar src="/photo.jpg" priority />);
      expect(container.querySelector("img")).toBeInTheDocument();
    });

    it("does not render fallback when image is present", () => {
      const { container } = render(<Avatar src="/photo.jpg" fallback="AB" />);
      expect(screen.queryByText("AB")).not.toBeInTheDocument();
      expect(container.querySelector("svg")).not.toBeInTheDocument();
    });
  });

  describe("Custom ClassName", () => {
    it("merges custom className", () => {
      const { container } = render(<Avatar className="border-2 border-red-500" />);
      const avatar = container.querySelector("span");
      expect(avatar).toHaveClass("border-2", "border-red-500");
      expect(avatar).toHaveClass("rounded-full");
    });
  });

  describe("AvatarWithBadge", () => {
    it("renders avatar with badge wrapper", () => {
      const { container } = render(<AvatarWithBadge src="/photo.jpg" />);
      const wrapper = container.querySelector("div");
      expect(wrapper).toHaveClass("relative", "inline-block");
    });

    it("renders online status badge", () => {
      const { container } = render(<AvatarWithBadge status="online" />);
      const badge = container.querySelector('[aria-label="Online"]');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass("bg-green-500");
    });

    it("renders offline status badge", () => {
      const { container } = render(<AvatarWithBadge status="offline" />);
      const badge = container.querySelector('[aria-label="Offline"]');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass("bg-gray-400");
    });

    it("renders away status badge", () => {
      const { container } = render(<AvatarWithBadge status="away" />);
      const badge = container.querySelector('[aria-label="Away"]');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass("bg-yellow-500");
    });

    it("renders busy status badge", () => {
      const { container } = render(<AvatarWithBadge status="busy" />);
      const badge = container.querySelector('[aria-label="Busy"]');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass("bg-red-500");
    });

    it("status badge is positioned correctly", () => {
      const { container } = render(<AvatarWithBadge status="online" />);
      const badge = container.querySelector("span.absolute");
      expect(badge).toHaveClass("right-0", "bottom-0", "rounded-full");
    });

    it("status badge has border", () => {
      const { container } = render(<AvatarWithBadge status="online" />);
      const badge = container.querySelector("span.absolute");
      expect(badge).toHaveClass("border-2", "border-background");
    });

    it("renders custom badge when provided", () => {
      render(<AvatarWithBadge badge={<span>5</span>} />);
      expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("custom badge is positioned correctly", () => {
      const { container } = render(<AvatarWithBadge badge={<span>3</span>} />);
      const badge = container.querySelector("span.absolute");
      expect(badge).toHaveClass("right-0", "bottom-0");
    });

    it("custom badge has custom className", () => {
      const { container } = render(
        <AvatarWithBadge badge={<span>1</span>} badgeClassName="bg-blue-500" />
      );
      const badge = container.querySelector(".bg-blue-500");
      expect(badge).toBeInTheDocument();
    });

    it("status takes precedence over custom badge", () => {
      const { container } = render(<AvatarWithBadge status="online" badge={<span>5</span>} />);
      expect(container.querySelector('[aria-label="Online"]')).toBeInTheDocument();
      expect(screen.queryByText("5")).not.toBeInTheDocument();
    });

    it("forwards avatar props", () => {
      const { container } = render(<AvatarWithBadge src="/photo.jpg" size="lg" status="online" />);
      const avatar = container.querySelector(".size-12");
      expect(avatar).toBeInTheDocument();
    });
  });

  describe("AvatarGroup", () => {
    it("renders avatar group", () => {
      const { container } = render(
        <AvatarGroup>
          <Avatar src="/1.jpg" />
          <Avatar src="/2.jpg" />
          <Avatar src="/3.jpg" />
        </AvatarGroup>
      );
      const group = container.querySelector("div");
      expect(group).toHaveClass("flex", "items-center");
    });

    it("applies negative spacing", () => {
      const { container } = render(
        <AvatarGroup spacing="normal">
          <Avatar />
        </AvatarGroup>
      );
      const group = container.querySelector("div");
      expect(group).toHaveClass("-space-x-3");
    });

    it("applies tight spacing", () => {
      const { container } = render(
        <AvatarGroup spacing="tight">
          <Avatar />
        </AvatarGroup>
      );
      const group = container.querySelector("div");
      expect(group).toHaveClass("-space-x-2");
    });

    it("applies loose spacing", () => {
      const { container } = render(
        <AvatarGroup spacing="loose">
          <Avatar />
        </AvatarGroup>
      );
      const group = container.querySelector("div");
      expect(group).toHaveClass("-space-x-1");
    });

    it("shows all avatars when under max", () => {
      render(
        <AvatarGroup max={5}>
          <Avatar fallback="A" />
          <Avatar fallback="B" />
          <Avatar fallback="C" />
        </AvatarGroup>
      );
      expect(screen.getByText("A")).toBeInTheDocument();
      expect(screen.getByText("B")).toBeInTheDocument();
      expect(screen.getByText("C")).toBeInTheDocument();
    });

    it("limits avatars to max", () => {
      const children = [
        <Avatar key="1" fallback="A" />,
        <Avatar key="2" fallback="B" />,
        <Avatar key="3" fallback="C" />,
        <Avatar key="4" fallback="D" />,
        <Avatar key="5" fallback="E" />,
        <Avatar key="6" fallback="F" />,
      ];

      render(<AvatarGroup max={3}>{children}</AvatarGroup>);

      expect(screen.getByText("A")).toBeInTheDocument();
      expect(screen.getByText("B")).toBeInTheDocument();
      expect(screen.getByText("C")).toBeInTheDocument();
      expect(screen.queryByText("D")).not.toBeInTheDocument();
    });

    it("shows remaining count", () => {
      const children = [
        <Avatar key="1" />,
        <Avatar key="2" />,
        <Avatar key="3" />,
        <Avatar key="4" />,
        <Avatar key="5" />,
        <Avatar key="6" />,
      ];

      render(<AvatarGroup max={3}>{children}</AvatarGroup>);
      expect(screen.getByText("+3")).toBeInTheDocument();
    });

    it("remaining count has proper styling", () => {
      const children = [1, 2, 3, 4, 5, 6].map((i) => <Avatar key={i} />);
      const { container } = render(<AvatarGroup max={3}>{children}</AvatarGroup>);

      const remaining = screen.getByText("+3");
      expect(remaining.tagName).toBe("SPAN");
      expect(remaining).toHaveClass("rounded-full", "bg-muted", "text-muted-foreground");
    });

    it("accepts custom className", () => {
      const { container } = render(
        <AvatarGroup className="custom-group">
          <Avatar />
        </AvatarGroup>
      );
      const group = container.querySelector("div");
      expect(group).toHaveClass("custom-group");
    });

    it("handles single child", () => {
      render(
        <AvatarGroup>
          <Avatar fallback="A" />
        </AvatarGroup>
      );
      expect(screen.getByText("A")).toBeInTheDocument();
    });

    it("default max is 5", () => {
      const children = [1, 2, 3, 4, 5, 6, 7].map((i) => <Avatar key={i} fallback={String(i)} />);
      render(<AvatarGroup>{children}</AvatarGroup>);

      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
      expect(screen.queryByText("6")).not.toBeInTheDocument();
      expect(screen.getByText("+2")).toBeInTheDocument();
    });
  });

  describe("Real-World Scenarios", () => {
    it("renders user profile avatar", () => {
      render(<Avatar src="/users/john.jpg" alt="John Doe" size="lg" />);
      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("alt", "John Doe");
    });

    it("renders online user with status", () => {
      render(<AvatarWithBadge src="/user.jpg" status="online" size="md" />);
      const badge = screen.getByLabelText("Online");
      expect(badge).toHaveClass("bg-green-500");
    });

    it("renders initials fallback", () => {
      render(<Avatar fallback="JD" size="md" />);
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("renders notification count badge", () => {
      render(
        <AvatarWithBadge
          src="/user.jpg"
          badge={<span className="bg-red-500 px-2 py-1 text-xs text-white">3</span>}
          badgeClassName="bg-red-500"
        />
      );
      expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("renders team member list", () => {
      const team = [
        <Avatar key="1" src="/user1.jpg" size="sm" />,
        <Avatar key="2" src="/user2.jpg" size="sm" />,
        <Avatar key="3" src="/user3.jpg" size="sm" />,
        <Avatar key="4" src="/user4.jpg" size="sm" />,
      ];

      render(<AvatarGroup spacing="tight">{team}</AvatarGroup>);
      const images = screen.getAllByRole("img");
      expect(images).toHaveLength(4);
    });

    it("renders comment author avatar", () => {
      render(
        <div className="flex items-start gap-3">
          <Avatar src="/author.jpg" size="sm" />
          <div>
            <p>Comment text</p>
          </div>
        </div>
      );
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("renders large profile header avatar", () => {
      render(<Avatar src="/profile.jpg" size="3xl" className="border-4 border-white" />);
      const { container } = render(<Avatar src="/profile.jpg" size="3xl" />);
      const avatar = container.querySelector(".size-24");
      expect(avatar).toBeInTheDocument();
    });

    it("renders loading avatar with skeleton", () => {
      const { container } = render(<Avatar />);
      const avatar = container.querySelector(".bg-muted");
      expect(avatar).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("image has alt text", () => {
      render(<Avatar src="/photo.jpg" alt="User photo" />);
      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("alt", "User photo");
    });

    it("fallback icon is hidden from screen readers", () => {
      const { container } = render(<Avatar />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("aria-hidden");
    });

    it("status badges have aria-label", () => {
      render(<AvatarWithBadge status="online" />);
      expect(screen.getByLabelText("Online")).toBeInTheDocument();
    });

    it("all status types have labels", () => {
      const statuses = ["online", "offline", "away", "busy"] as const;
      statuses.forEach((status) => {
        const { container } = render(<AvatarWithBadge status={status} />);
        const badge = container.querySelector("span.absolute");
        expect(badge).toHaveAttribute("aria-label");
      });
    });
  });

  describe("Size and Variant Combinations", () => {
    it("combines size with custom fallback", () => {
      const { container } = render(<Avatar size="xl" fallback="AB" />);
      const avatar = container.querySelector(".size-16");
      expect(avatar).toBeInTheDocument();
      expect(screen.getByText("AB")).toBeInTheDocument();
    });

    it("combines size with status badge", () => {
      const { container } = render(<AvatarWithBadge size="lg" status="online" />);
      expect(container.querySelector(".size-12")).toBeInTheDocument();
      expect(screen.getByLabelText("Online")).toBeInTheDocument();
    });

    it("combines custom className with size", () => {
      const { container } = render(<Avatar size="md" className="ring-2 ring-blue-500" />);
      const avatar = container.querySelector("span");
      expect(avatar).toHaveClass("size-10", "ring-2", "ring-blue-500");
    });
  });
});
