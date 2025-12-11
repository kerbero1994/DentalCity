import type { Meta, StoryObj } from "@storybook/nextjs";
import { TextContentSectionComponent } from "./TextContentSection";
import type { TextContentSection } from "@/core/types/lib/page-builder";

const meta = {
  title: "Page Builder/Text Content Section",
  component: TextContentSectionComponent,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextContentSectionComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseSection: TextContentSection = {
  id: "text-1",
  type: "text-content",
  order: 1,
  visible: true,
  layout: {
    variant: "contained",
    padding: { top: "large", bottom: "large" },
  },
  content: {
    title: "About Our Platform",
  },
  textContent: {
    body: `
      <p>Our platform is designed to help teams collaborate more effectively and build better products. We combine powerful features with an intuitive interface that anyone can use.</p>
      <p>Whether you're a small startup or a large enterprise, we have the tools you need to succeed in today's competitive market.</p>
    `,
  },
};

export const Default: Story = {
  args: {
    section: baseSection,
  },
};

export const WithHeadings: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "Getting Started Guide",
      },
      textContent: {
        body: `
          <h3>Installation</h3>
          <p>First, install the package using npm:</p>
          <pre><code>npm install our-package</code></pre>

          <h3>Configuration</h3>
          <p>Next, configure your environment variables:</p>
          <pre><code>API_KEY=your-api-key</code></pre>

          <h3>Usage</h3>
          <p>Now you're ready to start using the platform!</p>
        `,
      },
    },
  },
};

export const WithLists: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "Key Benefits",
      },
      textContent: {
        body: `
          <p>Our platform offers numerous advantages:</p>
          <ul>
            <li>Increase team productivity by up to 50%</li>
            <li>Reduce operational costs significantly</li>
            <li>Improve communication and collaboration</li>
            <li>Scale effortlessly as your business grows</li>
            <li>24/7 customer support</li>
          </ul>

          <p>Getting started is easy:</p>
          <ol>
            <li>Sign up for a free account</li>
            <li>Invite your team members</li>
            <li>Create your first project</li>
            <li>Start collaborating!</li>
          </ol>
        `,
      },
    },
  },
};

export const ArticleContent: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "The Future of Remote Work",
      },
      textContent: {
        body: `
          <p class="lead">Remote work has fundamentally changed how we collaborate, communicate, and create value in the modern workplace.</p>

          <h2>The New Normal</h2>
          <p>What started as a temporary response to global events has evolved into a permanent shift in work culture. Companies worldwide are embracing hybrid and fully remote models.</p>

          <h2>Key Challenges</h2>
          <p>While remote work offers flexibility, it also presents unique challenges:</p>
          <ul>
            <li>Maintaining team cohesion</li>
            <li>Ensuring clear communication</li>
            <li>Managing across time zones</li>
            <li>Preserving company culture</li>
          </ul>

          <h2>Solutions for Success</h2>
          <p>The right tools and practices can help teams thrive in a remote environment. Focus on:</p>
          <ul>
            <li>Asynchronous communication</li>
            <li>Regular check-ins</li>
            <li>Clear documentation</li>
            <li>Virtual team building</li>
          </ul>

          <blockquote>
            "The future of work isn't about where you work, it's about how you work together."
          </blockquote>
        `,
      },
    },
  },
};

export const ShortContent: Story = {
  args: {
    section: {
      ...baseSection,
      layout: {
        variant: "narrow",
        padding: { top: "medium", bottom: "medium" },
      },
      content: {
        title: "Quick Note",
      },
      textContent: {
        body: `<p>This is a brief message or announcement. Perfect for short updates or notices.</p>`,
      },
    },
  },
};

export const NoTitle: Story = {
  args: {
    section: {
      ...baseSection,
      content: {},
      textContent: {
        body: `
          <p>Sometimes you don't need a title. This content section flows naturally without one, perfect for continuation of ideas or supplementary information.</p>
          <p>It maintains the same beautiful typography and spacing while feeling more integrated with the surrounding content.</p>
        `,
      },
    },
  },
};

export const RichFormatting: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "Documentation",
      },
      textContent: {
        body: `
          <p>You can use <strong>bold text</strong> for emphasis, <em>italic text</em> for subtle emphasis, and <code>inline code</code> for technical terms.</p>

          <p>Here's a code block example:</p>
          <pre><code>function hello() {
  console.log("Hello, World!");
}</code></pre>

          <p>And a blockquote:</p>
          <blockquote>
            "Design is not just what it looks like and feels like. Design is how it works."
            <cite>— Steve Jobs</cite>
          </blockquote>

          <p>You can also create tables:</p>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Basic</th>
                <th>Pro</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Users</td>
                <td>5</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>Storage</td>
                <td>10GB</td>
                <td>1TB</td>
              </tr>
            </tbody>
          </table>
        `,
      },
    },
  },
};

export const LegalContent: Story = {
  args: {
    section: {
      ...baseSection,
      content: {
        title: "Terms of Service",
      },
      textContent: {
        body: `
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.</p>

          <h2>2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.</p>

          <h2>3. Disclaimer</h2>
          <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

          <h2>4. Limitations</h2>
          <p>In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.</p>
        `,
      },
    },
  },
};
