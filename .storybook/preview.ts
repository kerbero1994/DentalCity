import type { Preview } from "@storybook/nextjs";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#1a1a2e",
        },
        {
          name: "gray",
          value: "#f9fafb",
        },
      ],
    },
    a11y: {
      test: "todo",
    },
    layout: "padded",
    docs: {
      toc: true,
    },
  },
  tags: ["autodocs"],
};

export default preview;
