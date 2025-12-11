import type { Meta, StoryObj } from "@storybook/nextjs";
import { CardGrid, MasonryGrid } from "./card-grid";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card";

const meta = {
  title: "UI/Card Grid",
  component: CardGrid,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    columns: {
      control: "select",
      options: [1, 2, 3, 4, "auto"],
      description: "Number of columns",
    },
    gap: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Gap between items",
    },
  },
} satisfies Meta<typeof CardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleCard = ({ title, index }: { title: string; index: number }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>Card {index + 1} description</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground text-sm">
        This is sample content for card {index + 1}. It demonstrates how the grid layout works.
      </p>
    </CardContent>
  </Card>
);

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    children: Array.from({ length: 6 }, (_, i) => (
      <SampleCard key={i} title={`Feature ${i + 1}`} index={i} />
    )),
  },
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
    children: Array.from({ length: 4 }, (_, i) => (
      <SampleCard key={i} title={`Product ${i + 1}`} index={i} />
    )),
  },
};

export const FourColumns: Story = {
  args: {
    columns: 4,
    children: Array.from({ length: 8 }, (_, i) => (
      <SampleCard key={i} title={`Item ${i + 1}`} index={i} />
    )),
  },
};

export const SingleColumn: Story = {
  args: {
    columns: 1,
    children: Array.from({ length: 3 }, (_, i) => (
      <SampleCard key={i} title={`Article ${i + 1}`} index={i} />
    )),
  },
};

export const AutoFit: Story = {
  args: {
    columns: "auto",
    children: Array.from({ length: 6 }, (_, i) => (
      <SampleCard key={i} title={`Auto Item ${i + 1}`} index={i} />
    )),
  },
};

export const SmallGap: Story = {
  args: {
    columns: 3,
    gap: "sm",
    children: Array.from({ length: 6 }, (_, i) => (
      <SampleCard key={i} title={`Card ${i + 1}`} index={i} />
    )),
  },
};

export const LargeGap: Story = {
  args: {
    columns: 3,
    gap: "lg",
    children: Array.from({ length: 6 }, (_, i) => (
      <SampleCard key={i} title={`Card ${i + 1}`} index={i} />
    )),
  },
};

export const ExtraLargeGap: Story = {
  args: {
    columns: 2,
    gap: "xl",
    children: Array.from({ length: 4 }, (_, i) => (
      <SampleCard key={i} title={`Card ${i + 1}`} index={i} />
    )),
  },
};

export const ProductGrid = {
  render: () => (
    <CardGrid columns={3} gap="md">
      {[
        { title: "Starter", price: "$9", features: ["5 projects", "Basic support", "1GB storage"] },
        {
          title: "Pro",
          price: "$29",
          features: ["Unlimited projects", "Priority support", "50GB storage"],
        },
        {
          title: "Enterprise",
          price: "$99",
          features: ["Custom solutions", "24/7 support", "Unlimited storage"],
        },
      ].map((plan, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>{plan.title}</CardTitle>
            <CardDescription className="text-2xl font-bold">{plan.price}/mo</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {plan.features.map((feature, j) => (
                <li key={j} className="text-sm">
                  ✓ {feature}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </CardGrid>
  ),
};

export const BlogGrid = {
  render: () => (
    <CardGrid columns={2} gap="lg">
      {[
        { title: "Getting Started Guide", date: "Oct 1, 2025", readTime: "5 min read" },
        { title: "Advanced Features", date: "Oct 2, 2025", readTime: "8 min read" },
        { title: "Best Practices", date: "Oct 3, 2025", readTime: "6 min read" },
        { title: "Case Studies", date: "Oct 4, 2025", readTime: "10 min read" },
      ].map((post, i) => (
        <Card key={i} className="transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>
              {post.date} • {post.readTime}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Learn more about this topic with our comprehensive guide and examples.
            </p>
          </CardContent>
        </Card>
      ))}
    </CardGrid>
  ),
};

export const MasonryTwoOne = {
  render: () => (
    <MasonryGrid layout="2-1">
      <Card className="h-64">
        <CardHeader>
          <CardTitle>Featured Content</CardTitle>
          <CardDescription>Large featured card (2 columns)</CardDescription>
        </CardHeader>
      </Card>
      <Card className="h-64">
        <CardHeader>
          <CardTitle>Side Card</CardTitle>
          <CardDescription>Smaller side card (1 column)</CardDescription>
        </CardHeader>
      </Card>
      <Card className="h-48">
        <CardHeader>
          <CardTitle>Regular Card 1</CardTitle>
        </CardHeader>
      </Card>
      <Card className="h-48">
        <CardHeader>
          <CardTitle>Regular Card 2</CardTitle>
        </CardHeader>
      </Card>
      <Card className="h-48">
        <CardHeader>
          <CardTitle>Regular Card 3</CardTitle>
        </CardHeader>
      </Card>
    </MasonryGrid>
  ),
};

export const MasonryOneTwo = {
  render: () => (
    <MasonryGrid layout="1-2">
      <Card className="h-64">
        <CardHeader>
          <CardTitle>Side Content</CardTitle>
          <CardDescription>Side card (1 column)</CardDescription>
        </CardHeader>
      </Card>
      <Card className="h-64">
        <CardHeader>
          <CardTitle>Featured Content</CardTitle>
          <CardDescription>Large featured card (2 columns)</CardDescription>
        </CardHeader>
      </Card>
      <Card className="h-48">
        <CardHeader>
          <CardTitle>Regular Card 1</CardTitle>
        </CardHeader>
      </Card>
      <Card className="h-48">
        <CardHeader>
          <CardTitle>Regular Card 2</CardTitle>
        </CardHeader>
      </Card>
      <Card className="h-48">
        <CardHeader>
          <CardTitle>Regular Card 3</CardTitle>
        </CardHeader>
      </Card>
    </MasonryGrid>
  ),
};

export const MasonryFeatured = {
  render: () => (
    <MasonryGrid layout="featured">
      <Card className="h-64">
        <CardHeader>
          <CardTitle>Top Featured 1</CardTitle>
          <CardDescription>Full width featured card</CardDescription>
        </CardHeader>
      </Card>
      <Card className="h-64">
        <CardHeader>
          <CardTitle>Top Featured 2</CardTitle>
          <CardDescription>Full width featured card</CardDescription>
        </CardHeader>
      </Card>
      <Card className="h-48">
        <CardHeader>
          <CardTitle>Item 1</CardTitle>
        </CardHeader>
      </Card>
      <Card className="h-48">
        <CardHeader>
          <CardTitle>Item 2</CardTitle>
        </CardHeader>
      </Card>
      <Card className="h-48">
        <CardHeader>
          <CardTitle>Item 3</CardTitle>
        </CardHeader>
      </Card>
    </MasonryGrid>
  ),
};

export const AllGapSizes = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Small Gap</h3>
        <CardGrid columns={3} gap="sm">
          {Array.from({ length: 3 }, (_, i) => (
            <SampleCard key={i} title={`Card ${i + 1}`} index={i} />
          ))}
        </CardGrid>
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Medium Gap</h3>
        <CardGrid columns={3} gap="md">
          {Array.from({ length: 3 }, (_, i) => (
            <SampleCard key={i} title={`Card ${i + 1}`} index={i} />
          ))}
        </CardGrid>
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Large Gap</h3>
        <CardGrid columns={3} gap="lg">
          {Array.from({ length: 3 }, (_, i) => (
            <SampleCard key={i} title={`Card ${i + 1}`} index={i} />
          ))}
        </CardGrid>
      </div>
    </div>
  ),
};
