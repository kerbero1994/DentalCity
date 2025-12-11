import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getSiteUrl, getMetadataBase } from "@/lib/metadata";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${locale}`;
  const title =
    locale === "es"
      ? "DentalCity - Clínica Dental de Confianza"
      : "DentalCity - Your Trusted Dental Clinic";
  const description =
    locale === "es"
      ? "Clínica dental profesional con servicios de calidad. Odontología general, ortodoncia, implantes y más. Tu sonrisa es nuestra prioridad."
      : "Professional dental clinic with quality services. General dentistry, orthodontics, implants and more. Your smile is our priority.";

  return {
    metadataBase: getMetadataBase(),
    title,
    description,
    keywords: [
      "DentalCity",
      "clínica dental",
      "dentista",
      "odontología",
      "ortodoncia",
      "implantes dentales",
      "dental clinic",
      "dentist",
      "orthodontics",
      "dental implants",
    ],
    openGraph: {
      title: `${title}`,
      description,
      url: pageUrl,
      siteName: "DentalCity",
      locale: locale === "es" ? "es_MX" : "en_US",
      type: "website",
      images: [
        {
          url: `${siteUrl}/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "DentalCity",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title}`,
      description,
      images: [`${siteUrl}/${locale}/opengraph-image`],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        es: "/es",
        en: "/en",
      },
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-center mb-4">
        {locale === "es" ? "Bienvenido a DentalCity" : "Welcome to DentalCity"}
      </h1>
      <p className="text-lg text-muted-foreground text-center max-w-2xl">
        {locale === "es"
          ? "Tu clínica dental de confianza. Estamos construyendo algo increíble."
          : "Your trusted dental clinic. We are building something amazing."}
      </p>
    </main>
  );
}
