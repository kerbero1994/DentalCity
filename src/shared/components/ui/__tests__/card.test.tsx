import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "../card";

describe("Card", () => {
  describe("Card Component", () => {
    it("renders card element", () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("renders as div element", () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.querySelector("div");
      expect(card).toBeInTheDocument();
    });

    it("has data-slot attribute", () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.querySelector('[data-slot="card"]');
      expect(card).toBeInTheDocument();
    });

    it("applies base card styles", () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.querySelector('[data-slot="card"]');
      expect(card).toHaveClass(
        "bg-card",
        "text-card-foreground",
        "flex",
        "flex-col",
        "rounded-xl",
        "border",
        "shadow-sm"
      );
    });

    it("merges custom className", () => {
      const { container } = render(<Card className="custom-class">Content</Card>);
      const card = container.querySelector('[data-slot="card"]');
      expect(card).toHaveClass("custom-class");
      expect(card).toHaveClass("rounded-xl"); // Base class
    });

    it("accepts standard div props", () => {
      const { container } = render(<Card id="test-card">Content</Card>);
      const card = container.querySelector("#test-card");
      expect(card).toBeInTheDocument();
    });

    it("renders children", () => {
      render(
        <Card>
          <div>Child 1</div>
          <div>Child 2</div>
        </Card>
      );
      expect(screen.getByText("Child 1")).toBeInTheDocument();
      expect(screen.getByText("Child 2")).toBeInTheDocument();
    });
  });

  describe("CardHeader Component", () => {
    it("renders header content", () => {
      render(<CardHeader>Header</CardHeader>);
      expect(screen.getByText("Header")).toBeInTheDocument();
    });

    it("has data-slot attribute", () => {
      const { container } = render(<CardHeader>Header</CardHeader>);
      const header = container.querySelector('[data-slot="card-header"]');
      expect(header).toBeInTheDocument();
    });

    it("applies header styles", () => {
      const { container } = render(<CardHeader>Header</CardHeader>);
      const header = container.querySelector('[data-slot="card-header"]');
      expect(header).toHaveClass("grid", "items-start", "gap-1.5", "px-6");
    });

    it("supports custom className", () => {
      const { container } = render(<CardHeader className="custom-header">Header</CardHeader>);
      const header = container.querySelector('[data-slot="card-header"]');
      expect(header).toHaveClass("custom-header");
    });

    it("adjusts grid when action is present", () => {
      const { container } = render(<CardHeader>Header</CardHeader>);
      const header = container.querySelector('[data-slot="card-header"]');
      expect(header).toHaveClass("has-data-[slot=card-action]:grid-cols-[1fr_auto]");
    });
  });

  describe("CardTitle Component", () => {
    it("renders title text", () => {
      render(<CardTitle>Title</CardTitle>);
      expect(screen.getByText("Title")).toBeInTheDocument();
    });

    it("has data-slot attribute", () => {
      const { container } = render(<CardTitle>Title</CardTitle>);
      const title = container.querySelector('[data-slot="card-title"]');
      expect(title).toBeInTheDocument();
    });

    it("applies title styles", () => {
      const { container } = render(<CardTitle>Title</CardTitle>);
      const title = container.querySelector('[data-slot="card-title"]');
      expect(title).toHaveClass("leading-none", "font-semibold");
    });

    it("supports custom className", () => {
      const { container } = render(<CardTitle className="text-2xl">Title</CardTitle>);
      const title = container.querySelector('[data-slot="card-title"]');
      expect(title).toHaveClass("text-2xl");
    });

    it("renders as div", () => {
      const { container } = render(<CardTitle>Title</CardTitle>);
      const title = container.querySelector("div[data-slot='card-title']");
      expect(title).toBeInTheDocument();
    });
  });

  describe("CardDescription Component", () => {
    it("renders description text", () => {
      render(<CardDescription>Description</CardDescription>);
      expect(screen.getByText("Description")).toBeInTheDocument();
    });

    it("has data-slot attribute", () => {
      const { container } = render(<CardDescription>Description</CardDescription>);
      const desc = container.querySelector('[data-slot="card-description"]');
      expect(desc).toBeInTheDocument();
    });

    it("applies description styles", () => {
      const { container } = render(<CardDescription>Description</CardDescription>);
      const desc = container.querySelector('[data-slot="card-description"]');
      expect(desc).toHaveClass("text-muted-foreground", "text-sm");
    });

    it("supports custom className", () => {
      const { container } = render(
        <CardDescription className="text-base">Description</CardDescription>
      );
      const desc = container.querySelector('[data-slot="card-description"]');
      expect(desc).toHaveClass("text-base");
    });

    it("renders as div", () => {
      const { container } = render(<CardDescription>Description</CardDescription>);
      const desc = container.querySelector("div[data-slot='card-description']");
      expect(desc).toBeInTheDocument();
    });
  });

  describe("CardAction Component", () => {
    it("renders action content", () => {
      render(<CardAction>Action</CardAction>);
      expect(screen.getByText("Action")).toBeInTheDocument();
    });

    it("has data-slot attribute", () => {
      const { container } = render(<CardAction>Action</CardAction>);
      const action = container.querySelector('[data-slot="card-action"]');
      expect(action).toBeInTheDocument();
    });

    it("applies action positioning styles", () => {
      const { container } = render(<CardAction>Action</CardAction>);
      const action = container.querySelector('[data-slot="card-action"]');
      expect(action).toHaveClass("col-start-2", "row-span-2", "row-start-1", "justify-self-end");
    });

    it("supports custom className", () => {
      const { container } = render(<CardAction className="custom-action">Action</CardAction>);
      const action = container.querySelector('[data-slot="card-action"]');
      expect(action).toHaveClass("custom-action");
    });

    it("renders button children", () => {
      render(
        <CardAction>
          <button>Click</button>
        </CardAction>
      );
      expect(screen.getByRole("button", { name: "Click" })).toBeInTheDocument();
    });
  });

  describe("CardContent Component", () => {
    it("renders content", () => {
      render(<CardContent>Content</CardContent>);
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("has data-slot attribute", () => {
      const { container } = render(<CardContent>Content</CardContent>);
      const content = container.querySelector('[data-slot="card-content"]');
      expect(content).toBeInTheDocument();
    });

    it("applies content padding", () => {
      const { container } = render(<CardContent>Content</CardContent>);
      const content = container.querySelector('[data-slot="card-content"]');
      expect(content).toHaveClass("px-6");
    });

    it("supports custom className", () => {
      const { container } = render(<CardContent className="py-8">Content</CardContent>);
      const content = container.querySelector('[data-slot="card-content"]');
      expect(content).toHaveClass("py-8");
    });

    it("renders complex children", () => {
      render(
        <CardContent>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </CardContent>
      );
      expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
      expect(screen.getByText("Paragraph 2")).toBeInTheDocument();
    });
  });

  describe("CardFooter Component", () => {
    it("renders footer content", () => {
      render(<CardFooter>Footer</CardFooter>);
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });

    it("has data-slot attribute", () => {
      const { container } = render(<CardFooter>Footer</CardFooter>);
      const footer = container.querySelector('[data-slot="card-footer"]');
      expect(footer).toBeInTheDocument();
    });

    it("applies footer styles", () => {
      const { container } = render(<CardFooter>Footer</CardFooter>);
      const footer = container.querySelector('[data-slot="card-footer"]');
      expect(footer).toHaveClass("flex", "items-center", "px-6");
    });

    it("supports custom className", () => {
      const { container } = render(<CardFooter className="justify-end">Footer</CardFooter>);
      const footer = container.querySelector('[data-slot="card-footer"]');
      expect(footer).toHaveClass("justify-end");
    });

    it("renders button children", () => {
      render(
        <CardFooter>
          <button>Cancel</button>
          <button>Submit</button>
        </CardFooter>
      );
      expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    });
  });

  describe("Composed Card", () => {
    it("renders complete card with all parts", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Event Title</CardTitle>
            <CardDescription>Event Description</CardDescription>
          </CardHeader>
          <CardContent>Event details go here</CardContent>
          <CardFooter>
            <button>Register</button>
          </CardFooter>
        </Card>
      );

      expect(screen.getByText("Event Title")).toBeInTheDocument();
      expect(screen.getByText("Event Description")).toBeInTheDocument();
      expect(screen.getByText("Event details go here")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Register" })).toBeInTheDocument();
    });

    it("renders card with header action", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardDescription>Description</CardDescription>
            <CardAction>
              <button>⋮</button>
            </CardAction>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      );

      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "⋮" })).toBeInTheDocument();
    });

    it("renders minimal card", () => {
      render(
        <Card>
          <CardContent>Simple content</CardContent>
        </Card>
      );

      expect(screen.getByText("Simple content")).toBeInTheDocument();
    });

    it("renders card without footer", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      );

      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });

  describe("Real-World Scenarios", () => {
    it("renders event card", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>CURSO - TALLER: ILO</CardTitle>
            <CardDescription>12 de Enero, 2024 • Lima, Perú</CardDescription>
            <CardAction>
              <button aria-label="More options">⋮</button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>Curso intensivo sobre normativas de la Organización Internacional del Trabajo.</p>
          </CardContent>
          <CardFooter>
            <button>Ver Detalles</button>
            <button>Registrarse</button>
          </CardFooter>
        </Card>
      );

      expect(screen.getByText("CURSO - TALLER: ILO")).toBeInTheDocument();
      expect(screen.getByText(/12 de Enero, 2024/)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Ver Detalles" })).toBeInTheDocument();
    });

    it("renders program card", () => {
      render(
        <Card className="transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle>Programa de Seguridad</CardTitle>
            <CardDescription>3 cursos • 12 semanas</CardDescription>
          </CardHeader>
          <CardContent>
            <ul>
              <li>Módulo 1: Fundamentos</li>
              <li>Módulo 2: Aplicación</li>
              <li>Módulo 3: Evaluación</li>
            </ul>
          </CardContent>
          <CardFooter>
            <button>Inscribirse</button>
          </CardFooter>
        </Card>
      );

      expect(screen.getByText("Programa de Seguridad")).toBeInTheDocument();
      expect(screen.getByText("Módulo 1: Fundamentos")).toBeInTheDocument();
    });

    it("renders stats card", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">247</div>
          </CardContent>
          <CardFooter>
            <span className="text-muted-foreground text-sm">+12% from last month</span>
          </CardFooter>
        </Card>
      );

      expect(screen.getByText("Total Events")).toBeInTheDocument();
      expect(screen.getByText("247")).toBeInTheDocument();
      expect(screen.getByText("+12% from last month")).toBeInTheDocument();
    });

    it("renders profile card", () => {
      render(
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-200" />
              <div>
                <CardTitle>Dr. María García</CardTitle>
                <CardDescription>Médico Especialista</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>15 años de experiencia en medicina del trabajo.</p>
          </CardContent>
          <CardFooter>
            <button>Ver Perfil</button>
            <button>Contactar</button>
          </CardFooter>
        </Card>
      );

      expect(screen.getByText("Dr. María García")).toBeInTheDocument();
      expect(screen.getByText("Médico Especialista")).toBeInTheDocument();
    });

    it("renders notification card with action", () => {
      render(
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle>New Event Available</CardTitle>
            <CardDescription>2 hours ago</CardDescription>
            <CardAction>
              <button aria-label="Mark as read">✓</button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>A new safety training event has been scheduled for next week.</p>
          </CardContent>
        </Card>
      );

      expect(screen.getByText("New Event Available")).toBeInTheDocument();
      expect(screen.getByLabelText("Mark as read")).toBeInTheDocument();
    });

    it("renders loading card skeleton", () => {
      render(
        <Card>
          <CardHeader>
            <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
          </CardHeader>
          <CardContent>
            <div className="h-20 animate-pulse rounded bg-gray-200" />
          </CardContent>
        </Card>
      );

      const card = screen.getByText("", { selector: '[data-slot="card"]' }).parentElement;
      expect(card).toBeInTheDocument();
    });
  });

  describe("Styling Variants", () => {
    it("applies custom background color", () => {
      const { container } = render(<Card className="bg-blue-50">Content</Card>);
      const card = container.querySelector('[data-slot="card"]');
      expect(card).toHaveClass("bg-blue-50");
    });

    it("applies custom border", () => {
      const { container } = render(<Card className="border-2 border-red-500">Content</Card>);
      const card = container.querySelector('[data-slot="card"]');
      expect(card).toHaveClass("border-2", "border-red-500");
    });

    it("applies hover effects", () => {
      const { container } = render(
        <Card className="transition-shadow hover:shadow-xl">Content</Card>
      );
      const card = container.querySelector('[data-slot="card"]');
      expect(card).toHaveClass("hover:shadow-xl");
    });

    it("applies custom padding", () => {
      const { container } = render(<Card className="p-8">Content</Card>);
      const card = container.querySelector('[data-slot="card"]');
      expect(card).toHaveClass("p-8");
    });
  });

  describe("Accessibility", () => {
    it("maintains semantic structure", () => {
      const { container } = render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      );

      const card = container.querySelector('[data-slot="card"]');
      const header = container.querySelector('[data-slot="card-header"]');
      const title = container.querySelector('[data-slot="card-title"]');
      const content = container.querySelector('[data-slot="card-content"]');

      expect(card).toBeInTheDocument();
      expect(header).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });

    it("supports aria attributes", () => {
      const { container } = render(
        <Card aria-labelledby="card-title">
          <CardHeader>
            <CardTitle id="card-title">Title</CardTitle>
          </CardHeader>
        </Card>
      );

      const card = container.querySelector('[data-slot="card"]');
      expect(card).toHaveAttribute("aria-labelledby", "card-title");
    });

    it("action buttons are accessible", () => {
      render(
        <CardAction>
          <button aria-label="More options">⋮</button>
        </CardAction>
      );

      const button = screen.getByLabelText("More options");
      expect(button).toBeInTheDocument();
    });
  });

  describe("Data Slot System", () => {
    it("all components have unique data-slot values", () => {
      const { container } = render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardDescription>Description</CardDescription>
            <CardAction>Action</CardAction>
          </CardHeader>
          <CardContent>Content</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      );

      expect(container.querySelector('[data-slot="card"]')).toBeInTheDocument();
      expect(container.querySelector('[data-slot="card-header"]')).toBeInTheDocument();
      expect(container.querySelector('[data-slot="card-title"]')).toBeInTheDocument();
      expect(container.querySelector('[data-slot="card-description"]')).toBeInTheDocument();
      expect(container.querySelector('[data-slot="card-action"]')).toBeInTheDocument();
      expect(container.querySelector('[data-slot="card-content"]')).toBeInTheDocument();
      expect(container.querySelector('[data-slot="card-footer"]')).toBeInTheDocument();
    });
  });
});
