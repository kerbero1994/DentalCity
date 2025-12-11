"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        {/* Error Code */}
        <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</h1>

        {/* Error Message */}
        <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">{t("title")}</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{t("description")}</p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-white transition-colors hover:bg-red-700"
          >
            <Home size={20} />
            {t("goHome")}
          </Link>

          <Link
            href="/buscar"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-6 py-3 text-gray-900 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            <Search size={20} />
            {t("search")}
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-6 py-3 text-gray-900 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            <ArrowLeft size={20} />
            {t("goBack")}
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {t("helpfulLinks")}
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Link
              href="/blog"
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              {t("links.blog")}
            </Link>
            <Link
              href="/eventos"
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              {t("links.events")}
            </Link>
            <Link
              href="/programas"
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              {t("links.programs")}
            </Link>
            <Link
              href="/descuentos"
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              {t("links.benefits")}
            </Link>
            <Link
              href="/preguntas-frecuentes"
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              {t("links.faq")}
            </Link>
            <Link
              href="/revistas"
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              {t("links.magazines")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
