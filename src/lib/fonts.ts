import { Poppins } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "optional", // Changed from "swap" to "optional" to prevent CLS
  adjustFontFallback: true,
});
