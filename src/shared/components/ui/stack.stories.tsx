import type { Meta, StoryObj } from "@storybook/nextjs";
import { Stack, VStack, HStack, Spacer, Grid, Center, FlexDivider } from "./stack";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { Button } from "./button";

const meta = {
  title: "UI/Stack",
  component: Stack,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["row", "column", "row-reverse", "column-reverse"],
      description: "Flex direction",
    },
    gap: {
      control: "select",
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
      description: "Gap between items",
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "baseline", "stretch"],
      description: "Align items",
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around", "evenly"],
      description: "Justify content",
    },
    wrap: {
      control: "select",
      options: [true, false, "reverse"],
      description: "Flex wrap",
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-primary/10 rounded-lg p-4 text-center ${className}`}>{children}</div>
);

export const VerticalStack: Story = {
  args: {
    direction: "column",
    gap: 4,
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

export const HorizontalStack: Story = {
  args: {
    direction: "row",
    gap: 4,
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

export const WithAlignment: Story = {
  args: {
    direction: "row",
    gap: 4,
    align: "center",
    children: (
      <>
        <Box className="h-12">Short</Box>
        <Box className="h-24">Tall</Box>
        <Box className="h-16">Medium</Box>
      </>
    ),
  },
};

export const WithJustify: Story = {
  args: {
    direction: "row",
    gap: 4,
    justify: "between",
    className: "w-full",
    children: (
      <>
        <Box>Start</Box>
        <Box>Middle</Box>
        <Box>End</Box>
      </>
    ),
  },
};

export const WithWrap: Story = {
  args: {
    direction: "row",
    gap: 4,
    wrap: true,
    className: "max-w-md",
    children: (
      <>
        {Array.from({ length: 8 }, (_, i) => (
          <Box key={i} className="w-24">
            Item {i + 1}
          </Box>
        ))}
      </>
    ),
  },
};

export const VStackExample = {
  render: () => (
    <VStack gap={4}>
      <Box>Vertical Item 1</Box>
      <Box>Vertical Item 2</Box>
      <Box>Vertical Item 3</Box>
    </VStack>
  ),
};

export const HStackExample = {
  render: () => (
    <HStack gap={4}>
      <Box>Horizontal Item 1</Box>
      <Box>Horizontal Item 2</Box>
      <Box>Horizontal Item 3</Box>
    </HStack>
  ),
};

export const WithSpacer = {
  render: () => (
    <HStack gap={4} className="w-full">
      <Box>Left</Box>
      <Spacer />
      <Box>Right</Box>
    </HStack>
  ),
};

export const GridLayout = {
  render: () => (
    <Grid cols={3} gap={4}>
      <Box>Grid 1</Box>
      <Box>Grid 2</Box>
      <Box>Grid 3</Box>
      <Box>Grid 4</Box>
      <Box>Grid 5</Box>
      <Box>Grid 6</Box>
    </Grid>
  ),
};

export const CenterContent = {
  render: () => (
    <Center className="h-48 rounded-lg border-2 border-dashed">
      <Box>Centered Content</Box>
    </Center>
  ),
};

export const CardLayout = {
  render: () => (
    <VStack gap={6}>
      <Card>
        <CardHeader>
          <CardTitle>Card with VStack</CardTitle>
        </CardHeader>
        <CardContent>
          <VStack gap={3}>
            <p>First paragraph of content</p>
            <p>Second paragraph of content</p>
            <p>Third paragraph of content</p>
          </VStack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Card with HStack</CardTitle>
        </CardHeader>
        <CardContent>
          <HStack gap={4} align="center">
            <div className="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-full">
              1
            </div>
            <VStack gap={1}>
              <p className="font-semibold">Feature Title</p>
              <p className="text-muted-foreground text-sm">Feature description</p>
            </VStack>
          </HStack>
        </CardContent>
      </Card>
    </VStack>
  ),
};

export const ButtonGroup = {
  render: () => (
    <HStack gap={4} wrap={true}>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </HStack>
  ),
};

export const NavigationBar = {
  render: () => (
    <HStack gap={4} align="center" justify="between" className="w-full rounded-lg border p-4">
      <HStack gap={6} align="center">
        <div className="text-xl font-bold">Logo</div>
        <HStack gap={4}>
          <Button variant="ghost">Home</Button>
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Contact</Button>
        </HStack>
      </HStack>
      <HStack gap={2}>
        <Button variant="outline">Sign In</Button>
        <Button>Sign Up</Button>
      </HStack>
    </HStack>
  ),
};

export const AllGapSizes = {
  render: () => (
    <VStack gap={8}>
      <div>
        <p className="text-muted-foreground mb-2 text-sm font-semibold">Gap 0</p>
        <HStack gap={0}>
          <Box>Item</Box>
          <Box>Item</Box>
          <Box>Item</Box>
        </HStack>
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm font-semibold">Gap 2</p>
        <HStack gap={2}>
          <Box>Item</Box>
          <Box>Item</Box>
          <Box>Item</Box>
        </HStack>
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm font-semibold">Gap 4</p>
        <HStack gap={4}>
          <Box>Item</Box>
          <Box>Item</Box>
          <Box>Item</Box>
        </HStack>
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm font-semibold">Gap 8</p>
        <HStack gap={8}>
          <Box>Item</Box>
          <Box>Item</Box>
          <Box>Item</Box>
        </HStack>
      </div>
    </VStack>
  ),
};

export const AllAlignments = {
  render: () => (
    <VStack gap={8}>
      <div>
        <p className="text-muted-foreground mb-2 text-sm font-semibold">Align Start</p>
        <HStack gap={4} align="start" className="h-32 rounded-lg border">
          <Box className="h-12">Short</Box>
          <Box className="h-24">Tall</Box>
          <Box className="h-16">Medium</Box>
        </HStack>
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm font-semibold">Align Center</p>
        <HStack gap={4} align="center" className="h-32 rounded-lg border">
          <Box className="h-12">Short</Box>
          <Box className="h-24">Tall</Box>
          <Box className="h-16">Medium</Box>
        </HStack>
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm font-semibold">Align End</p>
        <HStack gap={4} align="end" className="h-32 rounded-lg border">
          <Box className="h-12">Short</Box>
          <Box className="h-24">Tall</Box>
          <Box className="h-16">Medium</Box>
        </HStack>
      </div>
    </VStack>
  ),
};

export const AllJustify = {
  render: () => (
    <VStack gap={8}>
      <div>
        <p className="text-muted-foreground mb-2 text-sm font-semibold">Justify Start</p>
        <HStack gap={4} justify="start" className="w-full rounded-lg border p-4">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </HStack>
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm font-semibold">Justify Center</p>
        <HStack gap={4} justify="center" className="w-full rounded-lg border p-4">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </HStack>
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm font-semibold">Justify Between</p>
        <HStack gap={4} justify="between" className="w-full rounded-lg border p-4">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </HStack>
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm font-semibold">Justify Evenly</p>
        <HStack gap={4} justify="evenly" className="w-full rounded-lg border p-4">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </HStack>
      </div>
    </VStack>
  ),
};

export const WithDivider = {
  render: () => (
    <VStack gap={4}>
      <Box>Section 1</Box>
      <FlexDivider />
      <Box>Section 2</Box>
      <FlexDivider />
      <Box>Section 3</Box>
    </VStack>
  ),
};

export const FormLayout = {
  render: () => (
    <VStack gap={6} className="max-w-md">
      <VStack gap={2}>
        <label htmlFor="name" className="text-sm font-semibold">
          Name
        </label>
        <input id="name" className="rounded-lg border px-3 py-2" placeholder="Enter your name" />
      </VStack>
      <VStack gap={2}>
        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <input
          id="email"
          className="rounded-lg border px-3 py-2"
          placeholder="Enter your email"
          type="email"
        />
      </VStack>
      <VStack gap={2}>
        <label htmlFor="message" className="text-sm font-semibold">
          Message
        </label>
        <textarea
          id="message"
          className="rounded-lg border px-3 py-2"
          rows={4}
          placeholder="Your message"
        />
      </VStack>
      <HStack gap={4} justify="end">
        <Button variant="outline">Cancel</Button>
        <Button>Submit</Button>
      </HStack>
    </VStack>
  ),
};

export const ResponsiveGrid = {
  render: () => (
    <Grid cols={4} gap={6}>
      {Array.from({ length: 8 }, (_, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>Card {i + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">Grid item content</p>
          </CardContent>
        </Card>
      ))}
    </Grid>
  ),
};
