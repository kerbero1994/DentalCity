/**
 * Centralized color system for SITIMM brand
 * All brand colors should reference these constants
 */

export const colors = {
  brand: {
    primary: "#d32027", // SITIMM Red
    primaryDark: "#b71c21", // Hover state
    primaryLight: "#ff4444", // Light variant for dark mode
  },
  institutions: {
    sitimm: "#d32027",
    imss: "#006847",
    infonavit: "#E4002B",
    fonacot: "#0066CC",
    afore: "#13322B",
  },
  backgrounds: {
    light: "#fdf2f2", // Light mode background
    dark: "#1c0005", // Dark mode background
  },
  surface: {
    light: "#ffffff",
    dark: "#2a080f",
  },
  glassmorphism: {
    light: "rgba(255, 255, 255, 0.9)",
    dark: "rgba(0, 0, 0, 0.4)",
    border: {
      light: "rgba(0, 0, 0, 0.1)",
      dark: "rgba(255, 255, 255, 0.1)",
    },
  },
} as const;

export type BrandColor = keyof typeof colors.brand;
export type InstitutionColor = keyof typeof colors.institutions;
