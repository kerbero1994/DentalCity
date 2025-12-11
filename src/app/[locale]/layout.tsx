// src/app/[locale]/layout.tsx
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { ThemeScript } from "@/shared/components/theme/theme-script";
import { poppins } from "@/lib/fonts";
import { locales } from "@/shared/config/supported-locales";
import { getSiteUrl, getMetadataBase } from "@/lib/metadata";

// --- Metadata & Viewport ---
const siteName = "DentalCity";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const siteUrl = getSiteUrl();
  const siteDescription =
    locale === "es"
      ? "Clínica dental profesional con servicios de calidad"
      : "Professional dental clinic with quality services";

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    metadataBase: getMetadataBase(),
    keywords: [
      "dental",
      "dentist",
      "clinic",
      "orthodontics",
      "implants",
      "DentalCity",
    ],
    authors: [{ name: "DentalCity" }],
    creator: "DentalCity",
    publisher: "DentalCity",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_MX" : "en_US",
      url: siteUrl,
      title: siteName,
      description: siteDescription,
      siteName: siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: siteDescription,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        es: `${siteUrl}/es`,
        en: `${siteUrl}/en`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0fdfa" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1a1d" },
  ],
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming locale is valid
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale} className={poppins.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <div className="site-wrapper">
              <main id="main-content" tabIndex={-1} className="focus:outline-none">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
