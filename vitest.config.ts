// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest/config" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "node:url";

const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/e2e/**", "**/*.stories.*"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "**/*.config.*",
        "**/dist/**",
        "**/.next/**",
        "**/node_modules/**",
        "**/e2e/**",
        "**/*.spec.*",
        "**/*.test.*",
        "**/vitest.setup.ts",
        "**/*.stories.*",
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
      // Mock server-only module for tests (Next.js RSC marker)
      "server-only": path.resolve(dirname, "./src/__mocks__/server-only.ts"),
    },
  },
});
