import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CallToAction, SplitCTA, BannerCTA } from "../call-to-action";

// Mock Next.js Link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock Next.js Image
vi.mock("next/image", () => ({
  default: ({ src, alt, fill, ...props }: { src: string; alt: string; fill?: boolean }) => (
    <img src={src} alt={alt} data-fill={fill} {...props} />
  ),
}));

// Mock lucide-react
vi.mock("lucide-react", () => ({
  ArrowRight: ({ className, ...props }: { className?: string; "aria-hidden"?: boolean }) => (
    <span data-testid="arrow-right-icon" className={className} aria-hidden={props["aria-hidden"]}>
      →
    </span>
  ),
}));

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      dismiss: "Dismiss",
    };
    return translations[key] || key;
  },
}));

describe("CallToAction", () => {
  describe("Basic Rendering", () => {
    it("renders section element", () => {
      const { container } = render(<CallToAction title="CTA Title" />);
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("renders title", () => {
      render(<CallToAction title="Join Us Today" />);
      expect(screen.getByText("Join Us Today")).toBeInTheDocument();
    });

    it("title is in h2 tag", () => {
      render(<CallToAction title="Title" />);
      const title = screen.getByText("Title");
      expect(title.tagName).toBe("H2");
    });

    it("title has proper styling", () => {
      render(<CallToAction title="Title" />);
      const title = screen.getByText("Title");
      expect(title).toHaveClass("text-3xl", "font-bold", "tracking-tight");
    });

    it("title is responsive", () => {
      render(<CallToAction title="Title" />);
      const title = screen.getByText("Title");
      expect(title).toHaveClass("sm:text-4xl", "lg:text-5xl");
    });
  });

  describe("Description", () => {
    it("renders description when provided", () => {
      render(<CallToAction title="Title" description="This is a description" />);
      expect(screen.getByText("This is a description")).toBeInTheDocument();
    });

    it("description is in p tag", () => {
      render(<CallToAction title="Title" description="Description" />);
      const desc = screen.getByText("Description");
      expect(desc.tagName).toBe("P");
    });

    it("description has proper styling", () => {
      render(<CallToAction title="Title" description="Description" />);
      const desc = screen.getByText("Description");
      expect(desc).toHaveClass("text-lg", "opacity-90");
    });

    it("does not render description when not provided", () => {
      render(<CallToAction title="Title" />);
      const { container } = render(<CallToAction title="Title" />);
      expect(container.querySelector("p")).not.toBeInTheDocument();
    });

    it("description has max width", () => {
      render(<CallToAction title="Title" description="Description" />);
      const desc = screen.getByText("Description");
      expect(desc).toHaveClass("max-w-2xl");
    });
  });

  describe("Primary Action", () => {
    it("renders primary action button", () => {
      render(
        <CallToAction title="Title" primaryAction={{ label: "Get Started", href: "/start" }} />
      );
      expect(screen.getByText("Get Started")).toBeInTheDocument();
    });

    it("primary action is a link", () => {
      render(<CallToAction title="Title" primaryAction={{ label: "Click", href: "/action" }} />);
      const link = screen.getByText("Click").closest("a");
      expect(link).toHaveAttribute("href", "/action");
    });

    it("primary action has proper styling", () => {
      render(<CallToAction title="Title" primaryAction={{ label: "Action", href: "/" }} />);
      const link = screen.getByText("Action").closest("a");
      expect(link).toHaveClass(
        "inline-flex",
        "items-center",
        "gap-2",
        "rounded-lg",
        "bg-white",
        "px-6",
        "py-3",
        "font-semibold"
      );
    });

    it("primary action has shadow", () => {
      render(<CallToAction title="Title" primaryAction={{ label: "Action", href: "/" }} />);
      const link = screen.getByText("Action").closest("a");
      expect(link).toHaveClass("shadow-lg");
    });

    it("primary action has hover effect", () => {
      render(<CallToAction title="Title" primaryAction={{ label: "Action", href: "/" }} />);
      const link = screen.getByText("Action").closest("a");
      expect(link).toHaveClass("hover:scale-105", "hover:shadow-xl");
    });

    it("primary action shows arrow icon by default", () => {
      render(<CallToAction title="Title" primaryAction={{ label: "Action", href: "/" }} />);
      expect(screen.getByTestId("arrow-right-icon")).toBeInTheDocument();
    });

    it("primary action can have custom icon", () => {
      const CustomIcon = () => <span>★</span>;
      render(
        <CallToAction
          title="Title"
          primaryAction={{ label: "Action", href: "/", icon: <CustomIcon /> }}
        />
      );
      expect(screen.getByText("★")).toBeInTheDocument();
    });

    it("does not render actions div when no actions", () => {
      const { container } = render(<CallToAction title="Title" />);
      const actionsDiv = container.querySelector(".flex.flex-wrap");
      expect(actionsDiv).not.toBeInTheDocument();
    });
  });

  describe("Secondary Action", () => {
    it("renders secondary action button", () => {
      render(
        <CallToAction title="Title" secondaryAction={{ label: "Learn More", href: "/learn" }} />
      );
      expect(screen.getByText("Learn More")).toBeInTheDocument();
    });

    it("secondary action is a link", () => {
      render(<CallToAction title="Title" secondaryAction={{ label: "Learn", href: "/learn" }} />);
      const link = screen.getByText("Learn").closest("a");
      expect(link).toHaveAttribute("href", "/learn");
    });

    it("secondary action has different styling", () => {
      render(<CallToAction title="Title" secondaryAction={{ label: "Action", href: "/" }} />);
      const link = screen.getByText("Action").closest("a");
      expect(link).toHaveClass("border-2", "border-white/30", "bg-white/10", "backdrop-blur-sm");
    });

    it("secondary action has hover effect", () => {
      render(<CallToAction title="Title" secondaryAction={{ label: "Action", href: "/" }} />);
      const link = screen.getByText("Action").closest("a");
      expect(link).toHaveClass("hover:bg-white/20");
    });

    it("renders both primary and secondary actions", () => {
      render(
        <CallToAction
          title="Title"
          primaryAction={{ label: "Primary", href: "/primary" }}
          secondaryAction={{ label: "Secondary", href: "/secondary" }}
        />
      );
      expect(screen.getByText("Primary")).toBeInTheDocument();
      expect(screen.getByText("Secondary")).toBeInTheDocument();
    });

    it("secondary action can have custom icon", () => {
      const CustomIcon = () => <span>✓</span>;
      render(
        <CallToAction
          title="Title"
          secondaryAction={{
            label: "Action",
            href: "/",
            icon: <CustomIcon />,
          }}
        />
      );
      expect(screen.getByText("✓")).toBeInTheDocument();
    });
  });

  describe("Variant Styles", () => {
    it("applies default variant", () => {
      const { container } = render(<CallToAction title="Title" variant="default" />);
      const section = container.querySelector("section");
      expect(section).toHaveClass("bg-primary", "text-primary-foreground");
    });

    it("applies gradient variant (default)", () => {
      const { container } = render(<CallToAction title="Title" />);
      const section = container.querySelector("section");
      expect(section).toHaveClass("bg-gradient-to-br", "from-primary", "to-red-600", "text-white");
    });

    it("applies outline variant", () => {
      const { container } = render(<CallToAction title="Title" variant="outline" />);
      const section = container.querySelector("section");
      expect(section).toHaveClass("border-2", "border-primary", "bg-background");
    });

    it("applies ghost variant", () => {
      const { container } = render(<CallToAction title="Title" variant="ghost" />);
      const section = container.querySelector("section");
      expect(section).toHaveClass("bg-accent/50");
    });
  });

  describe("Size Variants", () => {
    it("applies sm size", () => {
      const { container } = render(<CallToAction title="Title" size="sm" />);
      const section = container.querySelector("section");
      expect(section).toHaveClass("p-8");
    });

    it("applies md size (default)", () => {
      const { container } = render(<CallToAction title="Title" size="md" />);
      const section = container.querySelector("section");
      expect(section).toHaveClass("p-10", "md:p-12");
    });

    it("applies lg size", () => {
      const { container } = render(<CallToAction title="Title" size="lg" />);
      const section = container.querySelector("section");
      expect(section).toHaveClass("p-12", "md:p-16");
    });
  });

  describe("Background Image", () => {
    it("renders image when provided", () => {
      render(<CallToAction title="Title" image={<img src="/bg.jpg" alt="BG" />} />);
      expect(screen.getByRole("img", { name: "BG" })).toBeInTheDocument();
    });

    it("image has low opacity", () => {
      const { container } = render(
        <CallToAction title="Title" image={<img src="/bg.jpg" alt="BG" />} />
      );
      const imageContainer = container.querySelector(".opacity-10");
      expect(imageContainer).toBeInTheDocument();
    });

    it("image is absolutely positioned", () => {
      const { container } = render(
        <CallToAction title="Title" image={<img src="/bg.jpg" alt="BG" />} />
      );
      const imageContainer = container.querySelector(".opacity-10");
      expect(imageContainer).toHaveClass("absolute", "inset-0");
    });
  });

  describe("Background Overlay", () => {
    it("renders background overlay", () => {
      const { container } = render(<CallToAction title="Title" />);
      const overlay = container.querySelector('[aria-hidden="true"]');
      expect(overlay).toBeInTheDocument();
    });

    it("overlay has gradient", () => {
      const { container } = render(<CallToAction title="Title" />);
      const overlay = container.querySelector(".bg-gradient-to-t");
      expect(overlay).toBeInTheDocument();
    });

    it("overlay is decorative", () => {
      const { container } = render(<CallToAction title="Title" />);
      const overlay = container.querySelector('[aria-hidden="true"]');
      expect(overlay).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Custom ClassName", () => {
    it("accepts custom className", () => {
      const { container } = render(<CallToAction title="Title" className="custom-cta" />);
      const section = container.querySelector(".custom-cta");
      expect(section).toBeInTheDocument();
    });
  });
});

describe("SplitCTA", () => {
  describe("Basic Rendering", () => {
    it("renders section element", () => {
      const { container } = render(<SplitCTA title="Split CTA" />);
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("renders title", () => {
      render(<SplitCTA title="Join Our Program" />);
      expect(screen.getByText("Join Our Program")).toBeInTheDocument();
    });

    it("title is in h2 tag", () => {
      render(<SplitCTA title="Title" />);
      const title = screen.getByText("Title");
      expect(title.tagName).toBe("H2");
    });

    it("has grid layout", () => {
      const { container } = render(<SplitCTA title="Title" />);
      const section = container.querySelector("section");
      expect(section).toHaveClass("grid", "lg:grid-cols-2");
    });

    it("has rounded corners", () => {
      const { container } = render(<SplitCTA title="Title" />);
      const section = container.querySelector("section");
      expect(section).toHaveClass("rounded-2xl");
    });

    it("has border", () => {
      const { container } = render(<SplitCTA title="Title" />);
      const section = container.querySelector("section");
      expect(section).toHaveClass("border");
    });
  });

  describe("Description", () => {
    it("renders description when provided", () => {
      render(<SplitCTA title="Title" description="Description text" />);
      expect(screen.getByText("Description text")).toBeInTheDocument();
    });

    it("description is in p tag", () => {
      render(<SplitCTA title="Title" description="Description" />);
      const desc = screen.getByText("Description");
      expect(desc.tagName).toBe("P");
    });

    it("description has muted color", () => {
      render(<SplitCTA title="Title" description="Description" />);
      const desc = screen.getByText("Description");
      expect(desc).toHaveClass("text-muted-foreground");
    });
  });

  describe("Action Button", () => {
    it("renders action button when provided", () => {
      render(<SplitCTA title="Title" action={{ label: "Get Started", href: "/start" }} />);
      expect(screen.getByText("Get Started")).toBeInTheDocument();
    });

    it("action is a link", () => {
      render(<SplitCTA title="Title" action={{ label: "Click", href: "/action" }} />);
      const link = screen.getByText("Click").closest("a");
      expect(link).toHaveAttribute("href", "/action");
    });

    it("action has primary styling", () => {
      render(<SplitCTA title="Title" action={{ label: "Action", href: "/" }} />);
      const link = screen.getByText("Action").closest("a");
      expect(link).toHaveClass("bg-primary", "text-primary-foreground");
    });

    it("action shows arrow icon", () => {
      render(<SplitCTA title="Title" action={{ label: "Action", href: "/" }} />);
      expect(screen.getByTestId("arrow-right-icon")).toBeInTheDocument();
    });

    it("arrow icon is decorative", () => {
      render(<SplitCTA title="Title" action={{ label: "Action", href: "/" }} />);
      const icon = screen.getByTestId("arrow-right-icon");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Image", () => {
    it("renders image when provided", () => {
      render(<SplitCTA title="Title" image={{ src: "/test.jpg", alt: "Test Image" }} />);
      expect(screen.getByAltText("Test Image")).toBeInTheDocument();
    });

    it("image has fill prop", () => {
      render(<SplitCTA title="Title" image={{ src: "/test.jpg", alt: "Test Image" }} />);
      const img = screen.getByAltText("Test Image");
      expect(img).toHaveAttribute("data-fill", "true");
    });

    it("image has object-cover", () => {
      render(<SplitCTA title="Title" image={{ src: "/test.jpg", alt: "Test Image" }} />);
      const img = screen.getByAltText("Test Image");
      expect(img).toHaveClass("object-cover");
    });

    it("image container has min height", () => {
      const { container } = render(
        <SplitCTA title="Title" image={{ src: "/test.jpg", alt: "Test Image" }} />
      );
      const imageContainer = container.querySelector(".min-h-\\[300px\\]");
      expect(imageContainer).toBeInTheDocument();
    });
  });

  describe("Image Position", () => {
    it("image on right by default", () => {
      const { container } = render(
        <SplitCTA title="Title" image={{ src: "/test.jpg", alt: "Test Image" }} />
      );
      const imageContainer = container.querySelector(".lg\\:order-1");
      expect(imageContainer).not.toBeInTheDocument();
    });

    it("image on left when imagePosition=left", () => {
      const { container } = render(
        <SplitCTA
          title="Title"
          image={{ src: "/test.jpg", alt: "Test Image" }}
          imagePosition="left"
        />
      );
      const imageContainer = container.querySelector(".lg\\:order-1");
      expect(imageContainer).toBeInTheDocument();
    });

    it("content reordered when image on left", () => {
      const { container } = render(<SplitCTA title="Title" imagePosition="left" />);
      const contentContainer = container.querySelector(".lg\\:order-2");
      expect(contentContainer).toBeInTheDocument();
    });
  });

  describe("Custom ClassName", () => {
    it("accepts custom className", () => {
      const { container } = render(<SplitCTA title="Title" className="custom-split" />);
      const section = container.querySelector(".custom-split");
      expect(section).toBeInTheDocument();
    });
  });
});

describe("BannerCTA", () => {
  describe("Basic Rendering", () => {
    it("renders banner div", () => {
      const { container } = render(<BannerCTA message="Banner message" />);
      const banner = container.querySelector("div");
      expect(banner).toBeInTheDocument();
    });

    it("renders message", () => {
      render(<BannerCTA message="Important announcement" />);
      expect(screen.getByText("Important announcement")).toBeInTheDocument();
    });

    it("message is in p tag", () => {
      render(<BannerCTA message="Message" />);
      const message = screen.getByText("Message");
      expect(message.tagName).toBe("P");
    });

    it("has primary background", () => {
      const { container } = render(<BannerCTA message="Message" />);
      const banner = container.querySelector("div");
      expect(banner).toHaveClass("bg-primary", "text-primary-foreground");
    });

    it("has padding", () => {
      const { container } = render(<BannerCTA message="Message" />);
      const banner = container.querySelector("div");
      expect(banner).toHaveClass("px-4", "py-3");
    });

    it("content is centered", () => {
      const { container } = render(<BannerCTA message="Message" />);
      const contentWrapper = container.querySelector(".max-w-7xl");
      expect(contentWrapper).toBeInTheDocument();
    });
  });

  describe("Action Button", () => {
    it("renders action button when provided", () => {
      render(<BannerCTA message="Message" action={{ label: "Learn More", href: "/learn" }} />);
      expect(screen.getByText("Learn More")).toBeInTheDocument();
    });

    it("action is a link", () => {
      render(<BannerCTA message="Message" action={{ label: "Click", href: "/action" }} />);
      const link = screen.getByText("Click").closest("a");
      expect(link).toHaveAttribute("href", "/action");
    });

    it("action has white background", () => {
      render(<BannerCTA message="Message" action={{ label: "Action", href: "/" }} />);
      const link = screen.getByText("Action").closest("a");
      expect(link).toHaveClass("bg-white", "text-primary");
    });

    it("action shows arrow icon", () => {
      render(<BannerCTA message="Message" action={{ label: "Action", href: "/" }} />);
      expect(screen.getByTestId("arrow-right-icon")).toBeInTheDocument();
    });
  });

  describe("Dismiss Button", () => {
    it("renders dismiss button when onDismiss provided", () => {
      const handleDismiss = vi.fn();
      render(<BannerCTA message="Message" onDismiss={handleDismiss} />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("dismiss button has accessible label", () => {
      const handleDismiss = vi.fn();
      render(<BannerCTA message="Message" onDismiss={handleDismiss} />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Dismiss");
    });

    it("dismiss button shows close icon", () => {
      const handleDismiss = vi.fn();
      const { container } = render(<BannerCTA message="Message" onDismiss={handleDismiss} />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("calls onDismiss when clicked", async () => {
      const user = userEvent.setup();
      const handleDismiss = vi.fn();
      render(<BannerCTA message="Message" onDismiss={handleDismiss} />);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });

    it("does not render dismiss button when onDismiss not provided", () => {
      render(<BannerCTA message="Message" />);
      const buttons = screen.queryAllByRole("button");
      expect(buttons).toHaveLength(0);
    });
  });

  describe("Layout", () => {
    it("has flex layout", () => {
      const { container } = render(<BannerCTA message="Message" />);
      const contentWrapper = container.querySelector(".flex");
      expect(contentWrapper).toBeInTheDocument();
    });

    it("content is space-between", () => {
      const { container } = render(<BannerCTA message="Message" />);
      const contentWrapper = container.querySelector(".justify-between");
      expect(contentWrapper).toBeInTheDocument();
    });

    it("items are centered", () => {
      const { container } = render(<BannerCTA message="Message" />);
      const contentWrapper = container.querySelector(".items-center");
      expect(contentWrapper).toBeInTheDocument();
    });
  });

  describe("Custom ClassName", () => {
    it("accepts custom className", () => {
      const { container } = render(<BannerCTA message="Message" className="custom-banner" />);
      const banner = container.querySelector(".custom-banner");
      expect(banner).toBeInTheDocument();
    });
  });

  describe("Responsive Behavior", () => {
    it("message text is responsive", () => {
      render(<BannerCTA message="Message" />);
      const message = screen.getByText("Message");
      expect(message).toHaveClass("text-sm", "sm:text-base");
    });

    it("actions are on right", () => {
      const { container } = render(
        <BannerCTA message="Message" action={{ label: "Action", href: "/" }} />
      );
      const actionsContainer = container.querySelector(".shrink-0");
      expect(actionsContainer).toBeInTheDocument();
    });
  });
});

describe("Real-World Scenarios", () => {
  it("hero CTA with both actions", () => {
    render(
      <CallToAction
        title="Transform Your Career"
        description="Join thousands of students who have advanced their careers"
        variant="gradient"
        size="lg"
        primaryAction={{ label: "Enroll Now", href: "/enroll" }}
        secondaryAction={{ label: "Learn More", href: "/about" }}
      />
    );
    expect(screen.getByText("Transform Your Career")).toBeInTheDocument();
    expect(screen.getByText("Enroll Now")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("split CTA for program promotion", () => {
    render(
      <SplitCTA
        title="Engineering Program"
        description="Learn cutting-edge technologies"
        action={{ label: "Apply Now", href: "/apply" }}
        image={{ src: "/engineering.jpg", alt: "Engineering Lab" }}
        imagePosition="right"
      />
    );
    expect(screen.getByText("Engineering Program")).toBeInTheDocument();
    expect(screen.getByAltText("Engineering Lab")).toBeInTheDocument();
  });

  it("banner CTA for announcements", () => {
    const handleDismiss = vi.fn();
    render(
      <BannerCTA
        message="New semester starting soon! Limited spots available."
        action={{ label: "Register", href: "/register" }}
        onDismiss={handleDismiss}
      />
    );
    expect(screen.getByText(/New semester starting soon/)).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("newsletter CTA with outline variant", () => {
    render(
      <CallToAction
        title="Stay Updated"
        description="Subscribe to our newsletter"
        variant="outline"
        size="sm"
        primaryAction={{ label: "Subscribe", href: "/subscribe" }}
      />
    );
    expect(screen.getByText("Stay Updated")).toBeInTheDocument();
    expect(screen.getByText("Subscribe")).toBeInTheDocument();
  });
});
