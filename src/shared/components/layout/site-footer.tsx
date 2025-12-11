"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Youtube, MapPin, Phone, Mail, ArrowUp } from "lucide-react";
import { GradientWrapper } from "@/shared/components/ui/gradient-wrapper";
import { useTranslations } from "next-intl";

import sitimmLogo from "@/assets/sitimm_logo.webp";

import styles from "./site-footer.module.css";

type NavItem = { label: string; href: string };

type FooterColumns = {
  quickLinks: NavItem[];
  institutional: NavItem[];
};

type Office = {
  name: string;
  address?: string;
  phone: string;
  mapsUrl?: string;
};

type Contact = {
  addressLines: string[];
  mapsUrl: string;
  offices: Office[];
  email: string;
};

export type FooterContent = {
  brand?: string;
  tagline?: string;
  logoSrc?: string | StaticImageData;
  columns?: FooterColumns;
  contact?: Contact;
  legalLinks?: NavItem[];
  yearFrom?: number;
};

const _DEFAULTS: Required<FooterContent> = {
  brand: "SITIMM",
  tagline:
    "El sindicato más importante de México, defendiendo los derechos de los trabajadores desde 1948.",
  logoSrc: sitimmLogo,
  columns: {
    quickLinks: [
      { label: "Beneficios", href: "/descuentos" },
      { label: "Eventos", href: "/eventos" },
      { label: "Programas", href: "/programas" },
      { label: "Blog", href: "/blog" },
      { label: "Boletines", href: "/boletines" },
    ],
    institutional: [
      { label: "Revistas", href: "/revistas" },
      { label: "Preguntas Frecuentes", href: "/preguntas-frecuentes" },
      { label: "Búsqueda", href: "/buscar" },
      { label: "Inicio", href: "/" },
    ],
  },
  contact: {
    addressLines: ["CEFORMA IRAPUATO MODERNA", "Irapuato, Guanajuato, México"],
    mapsUrl:
      "https://www.google.com/maps/place/CEFORMA+IRAPUATO+MODERNA/@20.6778165,-101.3632499,17z/data=!4m6!3m5!1s0x842c7f506667d27b:0xc57b1eb3daa53b6!8m2!3d20.67739!4d-101.3620912!16s%2Fg%2F11q58f6yp0",
    offices: [
      { name: "SITIMM IRAPUATO", phone: "(462) 626 06 97 y (462) 626 25 50" },
      { name: "SITIMM SILAO", phone: "(472) 722 35" },
      { name: "SITIMM CELAYA", phone: "(461) 608 02 30" },
      { name: "SITIMM VILLAGRÁN", phone: "(411) 165 31 49" },
      { name: "SITIMM SAN JOSÉ ITURBIDE", phone: "(419) 198 25 51" },
    ],
    email: "sitimm.ctm@gmail.com",
  },
  legalLinks: [
    { label: "Preguntas Frecuentes", href: "/preguntas-frecuentes" },
    { label: "Blog", href: "/blog" },
    { label: "Eventos", href: "/eventos" },
  ],
  yearFrom: new Date().getFullYear(),
};

export function SiteFooter({ content }: { content?: FooterContent }) {
  const t = useTranslations("footer");

  const TRANSLATED_DEFAULTS: Required<FooterContent> = {
    brand: "SITIMM",
    tagline: t("tagline"),
    logoSrc: sitimmLogo,
    columns: {
      quickLinks: [
        { label: t("links.benefits"), href: "/descuentos" },
        { label: t("links.events"), href: "/eventos" },
        { label: t("links.programs"), href: "/programas" },
        { label: t("links.blog"), href: "/blog" },
        { label: t("links.bulletins"), href: "/boletines" },
      ],
      institutional: [
        { label: t("links.magazines"), href: "/revistas" },
        { label: t("links.faq"), href: "/preguntas-frecuentes" },
        { label: t("links.search"), href: "/buscar" },
        { label: t("links.home"), href: "/" },
      ],
    },
    contact: {
      addressLines: t.raw("contactInfo.address"),
      mapsUrl: t("contactInfo.mapsUrl"),
      offices: t.raw("contactInfo.offices"),
      email: t("contactInfo.email"),
    },
    legalLinks: [
      { label: t("links.faq"), href: "/preguntas-frecuentes" },
      { label: t("links.blog"), href: "/blog" },
      { label: t("links.events"), href: "/eventos" },
    ],
    yearFrom: new Date().getFullYear(),
  };

  const cfg = { ...TRANSLATED_DEFAULTS, ...(content ?? {}) };

  return (
    <GradientWrapper
      as="footer"
      aria-labelledby="footer-title"
      variant="midnight"
      className={styles.shell}
      contentClassName={styles.content}
    >
      <div className={styles.topGrid}>
        {/* Marca */}
        <div className={styles.brandCol}>
          <div className={styles.brandRow}>
            <Image
              src={cfg.logoSrc ?? sitimmLogo}
              alt=""
              width={44}
              height={44}
              className={styles.logo}
              aria-hidden
            />
            <div>
              <h2 id="footer-title" className={styles.brand}>
                {cfg.brand}
              </h2>
              <p className={styles.subbrand}>{t("brandSubtitle")}</p>
            </div>
          </div>
          <p className={styles.tagline}>{cfg.tagline}</p>

          {/* Social: links con nombre accesible (si solo hay ícono, usa aria-label) */}
          <ul className={styles.social} aria-label={t("a11y.socialMedia")}>
            <li>
              <Link href="https://www.facebook.com/YoSoySITIMM" aria-label={t("a11y.facebook")}>
                <Facebook aria-hidden className={styles.socialIcon} />
              </Link>
            </li>
            <li>
              <Link href="https://x.com/SITIMM_CTM" aria-label={t("a11y.twitter")}>
                <Twitter aria-hidden className={styles.socialIcon} />
              </Link>
            </li>
            <li>
              <Link href="https://www.youtube.com/@sitimm8775" aria-label={t("a11y.youtube")}>
                <Youtube aria-hidden className={styles.socialIcon} />
              </Link>
            </li>
          </ul>
        </div>

        {/* Enlaces Rápidos */}
        <nav className={styles.linksCol} aria-label={t("a11y.quickLinks")}>
          <h3 className={styles.colTitle}>{t("quickLinks")}</h3>
          <ul className={styles.linkList}>
            {cfg.columns.quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Institucional */}
        <nav className={styles.linksCol} aria-label={t("a11y.institutional")}>
          <h3 className={styles.colTitle}>{t("institutional")}</h3>
          <ul className={styles.linkList}>
            {cfg.columns.institutional.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contacto Principal */}
        <section className={styles.contactCol} aria-labelledby="contacto-title">
          <h3 id="contacto-title" className={styles.colTitle}>
            {t("contact")}
          </h3>
          <address className={styles.address}>
            <div className={styles.contactItem}>
              <MapPin className={styles.contactIcon} aria-hidden />
              <Link
                href={cfg.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                {cfg.contact.addressLines.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </Link>
            </div>

            <div className={styles.contactItem}>
              <Phone className={styles.contactIcon} aria-hidden />
              <div>
                <Link href="#offices" className={styles.contactLink}>
                  {t("ourOffices")}
                </Link>
              </div>
            </div>

            <div className={styles.contactItem}>
              <Mail className={styles.contactIcon} aria-hidden />
              <Link href={`mailto:${cfg.contact.email}`} className={styles.contactLink}>
                {cfg.contact.email}
              </Link>
            </div>
          </address>
        </section>
      </div>

      {/* Nuestras Oficinas - Sección horizontal */}
      <section id="offices" className={styles.officesSection} aria-labelledby="offices-title">
        <h3 id="offices-title" className={styles.officesTitle}>
          {t("ourOffices")}
        </h3>
        <div className={styles.officesGrid}>
          {cfg.contact.offices.map((office, i) => (
            <div key={i} className={styles.officeCard}>
              <div className={styles.officeName}>{office.name}</div>
              {office.address && office.mapsUrl && (
                <Link
                  href={office.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.officeAddress}
                >
                  <MapPin className={styles.officeIcon} aria-hidden />
                  <span>{office.address}</span>
                </Link>
              )}
              <Link href={`tel:${office.phone.replace(/\s+/g, "")}`} className={styles.officePhone}>
                <Phone className={styles.officeIcon} aria-hidden />
                <span>{office.phone}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Barra inferior */}
      <div className={styles.bottomBar}>
        <div className={styles.copy}>{t("copyright", { year: cfg.yearFrom })}</div>
        <nav className={styles.legal} aria-label={t("a11y.legalInfo")}>
          {cfg.legalLinks.map((l) => (
            <Link key={l.href} href={l.href} className={styles.legalLink}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Botón volver arriba accesible */}
      <Link href="#top" className={styles.backToTop} aria-label={t("a11y.backToTop")}>
        <ArrowUp className={styles.backIcon} aria-hidden />
      </Link>
    </GradientWrapper>
  );
}
