/**
 * Design Tokens for SITIMM Design System
 * These tokens define the core visual properties of the design system
 */

export const colors = {
  // Brand Colors
  brand: {
    primary: "#d32027", // SITIMM Red
    primaryHover: "#b71c21",
    primaryLight: "#f5d5d6",
    primaryDark: "#8b1216",
  },

  // Dark Mode Brand
  darkMode: {
    background: "#1c0005", // Official SITIMM dark background
    surface: "#2a080f",
    surfaceHover: "#3a0f17",
  },

  // Neutral Colors
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712",
  },

  // Semantic Colors
  semantic: {
    success: "#10b981",
    successLight: "#d1fae5",
    successDark: "#065f46",

    warning: "#f59e0b",
    warningLight: "#fef3c7",
    warningDark: "#92400e",

    error: "#ef4444",
    errorLight: "#fee2e2",
    errorDark: "#991b1b",

    info: "#3b82f6",
    infoLight: "#dbeafe",
    infoDark: "#1e40af",
  },

  // Background & Surface
  background: {
    primary: "#ffffff",
    secondary: "#f9fafb",
    tertiary: "#f3f4f6",
  },

  // Text Colors
  text: {
    primary: "#111827",
    secondary: "#6b7280",
    tertiary: "#9ca3af",
    inverse: "#ffffff",
  },
} as const;

export const spacing = {
  0: "0",
  px: "1px",
  0.5: "0.125rem", // 2px
  1: "0.25rem", // 4px
  1.5: "0.375rem", // 6px
  2: "0.5rem", // 8px
  2.5: "0.625rem", // 10px
  3: "0.75rem", // 12px
  3.5: "0.875rem", // 14px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  7: "1.75rem", // 28px
  8: "2rem", // 32px
  9: "2.25rem", // 36px
  10: "2.5rem", // 40px
  11: "2.75rem", // 44px
  12: "3rem", // 48px
  14: "3.5rem", // 56px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  28: "7rem", // 112px
  32: "8rem", // 128px
  36: "9rem", // 144px
  40: "10rem", // 160px
  44: "11rem", // 176px
  48: "12rem", // 192px
  52: "13rem", // 208px
  56: "14rem", // 224px
  60: "15rem", // 240px
  64: "16rem", // 256px
  72: "18rem", // 288px
  80: "20rem", // 320px
  96: "24rem", // 384px
} as const;

export const typography = {
  // Font Families
  fontFamily: {
    sans: ["var(--font-poppins)", "system-ui", "-apple-system", "sans-serif"],
    mono: ["ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
  },

  // Font Sizes
  fontSize: {
    xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
    sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
    base: ["1rem", { lineHeight: "1.5rem" }], // 16px
    lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
    xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
    "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
    "5xl": ["3rem", { lineHeight: "1" }], // 48px
    "6xl": ["3.75rem", { lineHeight: "1" }], // 60px
    "7xl": ["4.5rem", { lineHeight: "1" }], // 72px
    "8xl": ["6rem", { lineHeight: "1" }], // 96px
    "9xl": ["8rem", { lineHeight: "1" }], // 128px
  },

  // Font Weights
  fontWeight: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },

  // Line Heights
  lineHeight: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },

  // Letter Spacing
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
} as const;

export const borderRadius = {
  none: "0",
  sm: "0.125rem", // 2px
  DEFAULT: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px",
} as const;

export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
} as const;

export const animation = {
  // Transitions
  transition: {
    none: "none",
    all: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    colors:
      "background-color, border-color, color, fill, stroke 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    shadow: "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    transform: "transform 150ms cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // Durations
  duration: {
    75: "75ms",
    100: "100ms",
    150: "150ms",
    200: "200ms",
    300: "300ms",
    500: "500ms",
    700: "700ms",
    1000: "1000ms",
  },

  // Easing
  easing: {
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export const zIndex = {
  0: "0",
  10: "10",
  20: "20",
  30: "30",
  40: "40",
  50: "50",
  modal: "1000",
  dropdown: "1100",
  popover: "1200",
  tooltip: "1300",
  notification: "1400",
} as const;

// Type exports for TypeScript
export type Colors = typeof colors;
export type Spacing = typeof spacing;
export type Typography = typeof typography;
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows;
export type Animation = typeof animation;
export type Breakpoints = typeof breakpoints;
export type ZIndex = typeof zIndex;
