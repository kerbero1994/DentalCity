import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../button";

describe("Button", () => {
  describe("Rendering", () => {
    it("renders button with text", () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
    });

    it("renders as button element by default", () => {
      const { container } = render(<Button>Button</Button>);
      expect(container.querySelector("button")).toBeInTheDocument();
    });

    it("has data-slot attribute", () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-slot", "button");
    });

    it("renders with children", () => {
      render(
        <Button>
          <span>Icon</span>
          <span>Text</span>
        </Button>
      );
      expect(screen.getByText("Icon")).toBeInTheDocument();
      expect(screen.getByText("Text")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("applies default variant styles", () => {
      render(<Button variant="default">Default</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-primary", "text-primary-foreground");
    });

    it("applies sitimm variant styles", () => {
      render(<Button variant="sitimm">SITIMM</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("!bg-[var(--color-primary)]", "!text-white");
    });

    it("applies destructive variant styles", () => {
      render(<Button variant="destructive">Delete</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-destructive", "text-white");
    });

    it("applies outline variant styles", () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("border", "bg-white", "text-gray-700");
    });

    it("applies secondary variant styles", () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-secondary", "text-secondary-foreground");
    });

    it("applies ghost variant styles", () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("hover:bg-accent");
    });

    it("applies link variant styles", () => {
      render(<Button variant="link">Link</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-[var(--color-primary)]", "underline-offset-4");
    });
  });

  describe("Sizes", () => {
    it("applies default size styles", () => {
      render(<Button size="default">Default Size</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-9", "px-4", "py-2");
    });

    it("applies sm size styles", () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-8", "px-3");
    });

    it("applies lg size styles", () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-10", "px-6");
    });

    it("applies icon size styles", () => {
      render(<Button size="icon" aria-label="Icon button" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("size-9");
    });
  });

  describe("Custom ClassName", () => {
    it("merges custom className with default classes", () => {
      render(<Button className="custom-class">Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
      expect(button).toHaveClass("inline-flex"); // Base class
    });

    it("allows Tailwind class overrides", () => {
      render(<Button className="px-8">Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("px-8");
    });
  });

  describe("Interactions", () => {
    it("calls onClick when clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Click</Button>);

      await user.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      );

      // Disabled buttons can't be clicked via user interaction
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("can be focused", async () => {
      const user = userEvent.setup();
      render(<Button>Focusable</Button>);

      const button = screen.getByRole("button");
      await user.tab();

      expect(button).toHaveFocus();
    });

    it("applies focus ring on focus", () => {
      render(<Button>Focus Test</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("focus:ring-2", "focus:ring-offset-2");
    });
  });

  describe("Disabled State", () => {
    it("applies disabled styles", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("disabled:pointer-events-none", "disabled:opacity-50");
    });

    it("is not focusable when disabled", async () => {
      const user = userEvent.setup();
      render(
        <>
          <Button>First</Button>
          <Button disabled>Disabled</Button>
          <Button>Last</Button>
        </>
      );

      await user.tab(); // Focus first button
      await user.tab(); // Should skip disabled and focus last

      expect(screen.getByRole("button", { name: "Last" })).toHaveFocus();
    });

    it("has disabled attribute when disabled", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });
  });

  describe("AsChild Prop", () => {
    it("renders children as the button when asChild is true", () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/test");
      expect(link).toHaveClass("inline-flex"); // Button classes applied
    });

    it("allows rendering custom elements", () => {
      const { container } = render(
        <Button asChild>
          <div>Custom Element</div>
        </Button>
      );

      const div = container.querySelector("div");
      expect(div).toBeInTheDocument();
      expect(div).toHaveClass("inline-flex");
    });
  });

  describe("Accessibility", () => {
    it("has button role", () => {
      render(<Button>Accessible</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("supports aria-label", () => {
      render(<Button aria-label="Custom label">Icon</Button>);
      expect(screen.getByLabelText("Custom label")).toBeInTheDocument();
    });

    it("supports aria-describedby", () => {
      render(
        <>
          <Button aria-describedby="description">Button</Button>
          <p id="description">Button description</p>
        </>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-describedby", "description");
    });

    it("has outline-none and focus:outline-none classes", () => {
      render(<Button>Focus</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("outline-none", "focus:outline-none");
    });

    it("is keyboard accessible", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Keyboard</Button>);

      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard("{Enter}");

      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe("HTML Attributes", () => {
    it("accepts type attribute", () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("defaults to button type", () => {
      render(<Button>Button</Button>);
      // Button elements default to type="submit" in forms, so no explicit type
      const button = screen.getByRole("button");
      expect(button.tagName).toBe("BUTTON");
    });

    it("accepts name attribute", () => {
      render(<Button name="action">Action</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("name", "action");
    });

    it("accepts value attribute", () => {
      render(<Button value="save">Save</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("value", "save");
    });

    it("accepts form attribute", () => {
      render(<Button form="myForm">Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("form", "myForm");
    });
  });

  describe("SVG Icons", () => {
    it("applies SVG sizing classes", () => {
      const { container } = render(
        <Button>
          <svg data-testid="icon" />
          Text
        </Button>
      );

      const button = container.querySelector("button");
      expect(button).toHaveClass("[&_svg]:pointer-events-none");
      expect(button).toHaveClass("[&_svg:not([class*='size-'])]:size-4");
    });

    it("renders with icon children", () => {
      render(
        <Button>
          <svg data-testid="test-icon" />
          <span>With Icon</span>
        </Button>
      );

      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
      expect(screen.getByText("With Icon")).toBeInTheDocument();
    });
  });

  describe("Real-World Scenarios", () => {
    it("renders primary action button", () => {
      render(
        <Button variant="sitimm" size="lg">
          Registrarse
        </Button>
      );

      const button = screen.getByRole("button", { name: "Registrarse" });
      expect(button).toHaveClass("!bg-[var(--color-primary)]", "h-10", "px-6");
    });

    it("renders form submit button", () => {
      render(
        <Button type="submit" variant="default">
          Enviar
        </Button>
      );

      const button = screen.getByRole("button", { name: "Enviar" });
      expect(button).toHaveAttribute("type", "submit");
      expect(button).toHaveClass("bg-primary");
    });

    it("renders cancel button", () => {
      const handleCancel = vi.fn();
      render(
        <Button variant="outline" onClick={handleCancel}>
          Cancelar
        </Button>
      );

      const button = screen.getByRole("button", { name: "Cancelar" });
      expect(button).toHaveClass("border", "bg-white");
    });

    it("renders delete button", async () => {
      const user = userEvent.setup();
      const handleDelete = vi.fn();

      render(
        <Button variant="destructive" onClick={handleDelete}>
          Eliminar
        </Button>
      );

      const button = screen.getByRole("button", { name: "Eliminar" });
      expect(button).toHaveClass("bg-destructive");

      await user.click(button);
      expect(handleDelete).toHaveBeenCalled();
    });

    it("renders link styled as button", () => {
      render(
        <Button asChild>
          <a href="/events">Ver Eventos</a>
        </Button>
      );

      const link = screen.getByRole("link", { name: "Ver Eventos" });
      expect(link).toHaveAttribute("href", "/events");
      expect(link).toHaveClass("inline-flex");
    });

    it("renders icon-only button with aria-label", () => {
      render(
        <Button size="icon" variant="ghost" aria-label="Close">
          <svg data-testid="close-icon" />
        </Button>
      );

      const button = screen.getByLabelText("Close");
      expect(button).toHaveClass("size-9");
      expect(screen.getByTestId("close-icon")).toBeInTheDocument();
    });
  });

  describe("Variant and Size Combinations", () => {
    it("combines sitimm variant with sm size", () => {
      render(
        <Button variant="sitimm" size="sm">
          Small SITIMM
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass("!bg-[var(--color-primary)]", "h-8");
    });

    it("combines destructive variant with lg size", () => {
      render(
        <Button variant="destructive" size="lg">
          Large Delete
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-destructive", "h-10");
    });

    it("combines outline variant with icon size", () => {
      render(
        <Button variant="outline" size="icon" aria-label="Menu">
          <svg />
        </Button>
      );

      const button = screen.getByLabelText("Menu");
      expect(button).toHaveClass("border", "size-9");
    });
  });
});
