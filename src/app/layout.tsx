import type { ReactNode } from "react";
import type { Metadata } from "next";
import { locales } from "@/shared/config/supported-locales";
import { getMetadataBase } from "@/lib/metadata";
import "./globals.css";

// This is the root layout that wraps all localized layouts
export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
