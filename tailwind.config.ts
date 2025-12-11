import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class" as const,
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        white: "var(--color-white)",
        black: "var(--color-black)",
        gray: {
          50: "var(--color-gray-50)",
          100: "var(--color-gray-100)",
          200: "var(--color-gray-200)",
          300: "var(--color-gray-300)",
          400: "var(--color-gray-400)",
          500: "var(--color-gray-500)",
          600: "var(--color-gray-600)",
          700: "var(--color-gray-700)",
          800: "var(--color-gray-800)",
          900: "var(--color-gray-900)",
        },
      },
    },
  },
  safelist: [
    "bg-[var(--color-primary)]",
    "!bg-[var(--color-primary)]",
    "hover:bg-[var(--color-primary-hover)]",
    "hover:!bg-[var(--color-primary-hover)]",
    "text-white",
    "!text-white",
    "focus:ring-[var(--color-primary)]",
  ],
  plugins: [],
};
export default config;
