import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {
  Skeleton,
  SkeletonText,
  SkeletonHeading,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonCard,
  SkeletonImage,
  SkeletonArticle,
  SkeletonProfile,
  SkeletonTable,
} from "../skeleton";

describe("Skeleton", () => {
  describe("Base Skeleton", () => {
    it("renders skeleton element", () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.querySelector("div");
      expect(skeleton).toBeInTheDocument();
    });

    it("applies base skeleton styles", () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.querySelector("div");
      expect(skeleton).toHaveClass("animate-pulse", "rounded-md", "bg-muted");
    });

    it("applies default variant", () => {
      const { container } = render(<Skeleton variant="default" />);
      const skeleton = container.querySelector("div");
      expect(skeleton).toHaveClass("bg-muted");
    });

    it("applies shimmer variant", () => {
      const { container } = render(<Skeleton variant="shimmer" />);
      const skeleton = container.querySelector("div");
      expect(skeleton).toHaveClass("bg-gradient-to-r", "animate-shimmer");
    });

    it("accepts custom className", () => {
      const { container } = render(<Skeleton className="h-4 w-full" />);
      const skeleton = container.querySelector("div");
      expect(skeleton).toHaveClass("h-4", "w-full");
      expect(skeleton).toHaveClass("animate-pulse");
    });
  });

  describe("SkeletonText", () => {
    it("renders default 3 lines", () => {
      const { container } = render(<SkeletonText />);
      const wrapper = container.querySelector(".space-y-2");
      const lines = wrapper?.querySelectorAll(":scope > div");
      expect(lines).toHaveLength(3);
    });

    it("renders custom number of lines", () => {
      const { container } = render(<SkeletonText lines={5} />);
      const wrapper = container.querySelector(".space-y-2");
      const lines = wrapper?.querySelectorAll(":scope > div");
      expect(lines).toHaveLength(5);
    });

    it("last line is shorter (80%)", () => {
      const { container } = render(<SkeletonText lines={3} />);
      const wrapper = container.querySelector(".space-y-2");
      const lines = wrapper?.querySelectorAll(":scope > div");
      const lastLine = lines?.[lines.length - 1];
      expect(lastLine).toHaveClass("w-4/5");
    });

    it("applies space between lines", () => {
      const { container } = render(<SkeletonText />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("space-y-2");
    });

    it("all lines have height", () => {
      const { container } = render(<SkeletonText lines={3} />);
      const wrapper = container.querySelector(".space-y-2");
      const lines = wrapper?.querySelectorAll(":scope > div");
      lines?.forEach((line) => {
        expect(line).toHaveClass("h-4");
      });
    });

    it("accepts custom className", () => {
      const { container } = render(<SkeletonText className="custom" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("custom");
    });

    it("renders single line", () => {
      const { container } = render(<SkeletonText lines={1} />);
      const wrapper = container.querySelector(".space-y-2");
      const lines = wrapper?.querySelectorAll(":scope > div");
      expect(lines).toHaveLength(1);
    });
  });

  describe("SkeletonHeading", () => {
    it("renders heading skeleton", () => {
      const { container } = render(<SkeletonHeading />);
      const heading = container.querySelector("div");
      expect(heading).toBeInTheDocument();
    });

    it("applies heading size", () => {
      const { container } = render(<SkeletonHeading />);
      const heading = container.querySelector("div");
      expect(heading).toHaveClass("h-8", "w-3/4");
    });

    it("accepts custom className", () => {
      const { container } = render(<SkeletonHeading className="w-full" />);
      const heading = container.querySelector("div");
      expect(heading).toHaveClass("w-full");
    });

    it("has animate pulse", () => {
      const { container } = render(<SkeletonHeading />);
      const heading = container.querySelector("div");
      expect(heading).toHaveClass("animate-pulse");
    });
  });

  describe("SkeletonAvatar", () => {
    it("renders avatar skeleton", () => {
      const { container } = render(<SkeletonAvatar />);
      const avatar = container.querySelector("div");
      expect(avatar).toBeInTheDocument();
    });

    it("is circular", () => {
      const { container } = render(<SkeletonAvatar />);
      const avatar = container.querySelector("div");
      expect(avatar).toHaveClass("rounded-full");
    });

    it("renders sm size", () => {
      const { container } = render(<SkeletonAvatar size="sm" />);
      const avatar = container.querySelector("div");
      expect(avatar).toHaveClass("size-8");
    });

    it("renders md (default) size", () => {
      const { container } = render(<SkeletonAvatar size="md" />);
      const avatar = container.querySelector("div");
      expect(avatar).toHaveClass("size-10");
    });

    it("renders lg size", () => {
      const { container } = render(<SkeletonAvatar size="lg" />);
      const avatar = container.querySelector("div");
      expect(avatar).toHaveClass("size-12");
    });

    it("accepts custom className", () => {
      const { container } = render(<SkeletonAvatar className="custom" />);
      const avatar = container.querySelector("div");
      expect(avatar).toHaveClass("custom");
    });
  });

  describe("SkeletonButton", () => {
    it("renders button skeleton", () => {
      const { container } = render(<SkeletonButton />);
      const button = container.querySelector("div");
      expect(button).toBeInTheDocument();
    });

    it("applies button dimensions", () => {
      const { container } = render(<SkeletonButton />);
      const button = container.querySelector("div");
      expect(button).toHaveClass("h-10", "w-24");
    });

    it("accepts custom className", () => {
      const { container } = render(<SkeletonButton className="w-32" />);
      const button = container.querySelector("div");
      expect(button).toHaveClass("w-32");
    });

    it("has rounded corners", () => {
      const { container } = render(<SkeletonButton />);
      const button = container.querySelector("div");
      expect(button).toHaveClass("rounded-md");
    });
  });

  describe("SkeletonCard", () => {
    it("renders card skeleton", () => {
      const { container } = render(<SkeletonCard />);
      const card = container.firstChild;
      expect(card).toBeInTheDocument();
    });

    it("has border and padding", () => {
      const { container } = render(<SkeletonCard />);
      const card = container.firstChild;
      expect(card).toHaveClass("border", "p-6", "rounded-lg");
    });

    it("contains title skeleton", () => {
      const { container } = render(<SkeletonCard />);
      const skeletons = container.querySelectorAll("div > div");
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it("contains text lines", () => {
      const { container } = render(<SkeletonCard />);
      const card = container.firstChild as Element;
      const text = card.querySelector(".space-y-2");
      expect(text).toBeInTheDocument();
    });

    it("contains button skeleton", () => {
      const { container } = render(<SkeletonCard />);
      const skeletons = container.querySelectorAll("div > div");
      const button = skeletons[skeletons.length - 1];
      expect(button).toHaveClass("h-10");
    });

    it("accepts custom className", () => {
      const { container } = render(<SkeletonCard className="custom" />);
      const card = container.firstChild;
      expect(card).toHaveClass("custom");
    });
  });

  describe("SkeletonImage", () => {
    it("renders image skeleton", () => {
      const { container } = render(<SkeletonImage />);
      const image = container.querySelector("div");
      expect(image).toBeInTheDocument();
    });

    it("renders square aspect ratio", () => {
      const { container } = render(<SkeletonImage aspectRatio="square" />);
      const image = container.querySelector("div");
      expect(image).toHaveClass("aspect-square");
    });

    it("renders video (16:9) aspect ratio", () => {
      const { container } = render(<SkeletonImage aspectRatio="video" />);
      const image = container.querySelector("div");
      expect(image).toHaveClass("aspect-video");
    });

    it("renders portrait (3:4) aspect ratio", () => {
      const { container } = render(<SkeletonImage aspectRatio="portrait" />);
      const image = container.querySelector("div");
      expect(image).toHaveClass("aspect-[3/4]");
    });

    it("defaults to video aspect ratio", () => {
      const { container } = render(<SkeletonImage />);
      const image = container.querySelector("div");
      expect(image).toHaveClass("aspect-video");
    });

    it("is full width", () => {
      const { container } = render(<SkeletonImage />);
      const image = container.querySelector("div");
      expect(image).toHaveClass("w-full");
    });

    it("accepts custom className", () => {
      const { container } = render(<SkeletonImage className="rounded-xl" />);
      const image = container.querySelector("div");
      expect(image).toHaveClass("rounded-xl");
    });
  });

  describe("SkeletonArticle", () => {
    it("renders article skeleton", () => {
      const { container } = render(<SkeletonArticle />);
      const article = container.firstChild;
      expect(article).toBeInTheDocument();
    });

    it("contains image skeleton", () => {
      const { container } = render(<SkeletonArticle />);
      const image = container.querySelector(".aspect-video");
      expect(image).toBeInTheDocument();
    });

    it("contains heading skeleton", () => {
      const { container } = render(<SkeletonArticle />);
      const skeletons = container.querySelectorAll("div > div");
      const heading = Array.from(skeletons).find((el) => el.classList.contains("h-8"));
      expect(heading).toBeInTheDocument();
    });

    it("contains text with 4 lines", () => {
      const { container } = render(<SkeletonArticle />);
      const textWrapper = container.querySelector(".space-y-2");
      expect(textWrapper).toBeInTheDocument();
      const lines = textWrapper?.querySelectorAll("div");
      expect(lines?.length).toBe(4);
    });

    it("applies spacing", () => {
      const { container } = render(<SkeletonArticle />);
      const article = container.firstChild;
      expect(article).toHaveClass("space-y-4");
    });

    it("accepts custom className", () => {
      const { container } = render(<SkeletonArticle className="custom" />);
      const article = container.firstChild;
      expect(article).toHaveClass("custom");
    });
  });

  describe("SkeletonProfile", () => {
    it("renders profile skeleton", () => {
      const { container } = render(<SkeletonProfile />);
      const profile = container.firstChild;
      expect(profile).toBeInTheDocument();
    });

    it("uses flex layout", () => {
      const { container } = render(<SkeletonProfile />);
      const profile = container.firstChild;
      expect(profile).toHaveClass("flex", "items-center", "space-x-4");
    });

    it("contains large avatar", () => {
      const { container } = render(<SkeletonProfile />);
      const avatar = container.querySelector(".size-12");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveClass("rounded-full");
    });

    it("contains text lines", () => {
      const { container } = render(<SkeletonProfile />);
      const textWrapper = container.querySelector(".flex-1");
      expect(textWrapper).toBeInTheDocument();
      const skeletons = textWrapper?.querySelectorAll("div");
      expect(skeletons?.length).toBeGreaterThanOrEqual(2);
    });

    it("accepts custom className", () => {
      const { container } = render(<SkeletonProfile className="custom" />);
      const profile = container.firstChild;
      expect(profile).toHaveClass("custom");
    });
  });

  describe("SkeletonTable", () => {
    it("renders table skeleton", () => {
      const { container } = render(<SkeletonTable />);
      const table = container.firstChild;
      expect(table).toBeInTheDocument();
    });

    it("renders default 5 rows", () => {
      const { container } = render(<SkeletonTable />);
      // Header + 5 rows = 6 grid containers
      const grids = container.querySelectorAll(".grid");
      expect(grids.length).toBe(6);
    });

    it("renders default 4 columns", () => {
      const { container } = render(<SkeletonTable />);
      const firstRow = container.querySelector(".grid");
      const cells = firstRow?.querySelectorAll("div");
      expect(cells?.length).toBe(4);
    });

    it("renders custom number of rows", () => {
      const { container } = render(<SkeletonTable rows={3} />);
      // Header + 3 rows = 4 grid containers
      const grids = container.querySelectorAll(".grid");
      expect(grids.length).toBe(4);
    });

    it("renders custom number of columns", () => {
      const { container } = render(<SkeletonTable cols={6} />);
      const firstRow = container.querySelector(".grid");
      const cells = firstRow?.querySelectorAll("div");
      expect(cells?.length).toBe(6);
    });

    it("header has taller cells", () => {
      const { container } = render(<SkeletonTable />);
      const headerCells = container.querySelector(".grid")?.querySelectorAll("div");
      headerCells?.forEach((cell) => {
        expect(cell).toHaveClass("h-10");
      });
    });

    it("body rows have correct height", () => {
      const { container } = render(<SkeletonTable />);
      const grids = container.querySelectorAll(".grid");
      const bodyRow = grids[1]; // First body row
      const cells = bodyRow.querySelectorAll("div");
      cells.forEach((cell) => {
        expect(cell).toHaveClass("h-12");
      });
    });

    it("applies spacing", () => {
      const { container } = render(<SkeletonTable />);
      const table = container.firstChild;
      expect(table).toHaveClass("space-y-3");
    });

    it("accepts custom className", () => {
      const { container } = render(<SkeletonTable className="custom" />);
      const table = container.firstChild;
      expect(table).toHaveClass("custom");
    });
  });

  describe("Real-World Scenarios", () => {
    it("renders event card loading state", () => {
      const { container } = render(
        <div className="space-y-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      );

      const cards = container.querySelectorAll(".border");
      expect(cards).toHaveLength(3);
    });

    it("renders blog post loading state", () => {
      const { container } = render(<SkeletonArticle />);

      expect(container.querySelector(".aspect-video")).toBeInTheDocument();
      expect(container.querySelector(".h-8")).toBeInTheDocument();
    });

    it("renders user profile loading state", () => {
      const { container } = render(<SkeletonProfile />);

      expect(container.querySelector(".size-12")).toBeInTheDocument();
      expect(container.querySelector(".flex-1")).toBeInTheDocument();
    });

    it("renders data table loading state", () => {
      const { container } = render(<SkeletonTable rows={10} cols={5} />);

      const grids = container.querySelectorAll(".grid");
      expect(grids.length).toBe(11); // Header + 10 rows
    });

    it("renders comment list with avatars", () => {
      const { container } = render(
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <SkeletonProfile key={i} />
          ))}
        </div>
      );

      const avatars = container.querySelectorAll(".size-12");
      expect(avatars).toHaveLength(3);
    });

    it("renders form with buttons loading state", () => {
      const { container } = render(
        <div className="space-y-4">
          <SkeletonText lines={2} />
          <SkeletonText lines={2} />
          <div className="flex gap-2">
            <SkeletonButton />
            <SkeletonButton />
          </div>
        </div>
      );

      const buttons = container.querySelectorAll(".h-10.w-24");
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("Animation", () => {
    it("all skeleton elements animate", () => {
      const { container } = render(
        <>
          <Skeleton />
          <SkeletonText />
          <SkeletonHeading />
          <SkeletonAvatar />
          <SkeletonButton />
        </>
      );

      const skeletons = container.querySelectorAll(".animate-pulse");
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it("shimmer variant has different animation", () => {
      const { container } = render(<Skeleton variant="shimmer" />);
      const skeleton = container.querySelector("div");
      expect(skeleton).toHaveClass("animate-shimmer");
    });
  });

  describe("Composition", () => {
    it("combines multiple skeleton types", () => {
      const { container } = render(
        <div>
          <SkeletonHeading />
          <SkeletonImage />
          <SkeletonText lines={3} />
          <SkeletonButton />
        </div>
      );

      expect(container.querySelector(".h-8")).toBeInTheDocument();
      expect(container.querySelector(".aspect-video")).toBeInTheDocument();
      expect(container.querySelector(".space-y-2")).toBeInTheDocument();
      expect(container.querySelector(".h-10.w-24")).toBeInTheDocument();
    });

    it("supports nested compositions", () => {
      const { container } = render(
        <div>
          <SkeletonCard className="p-4" />
          <SkeletonProfile />
        </div>
      );

      expect(container.querySelector(".border")).toBeInTheDocument();
      expect(container.querySelector(".size-12")).toBeInTheDocument();
    });
  });
});
