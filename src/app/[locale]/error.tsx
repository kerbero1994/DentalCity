"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { logger } from "@/shared/utils/logger";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations("error");

  useEffect(() => {
    // Log the error to an error reporting service
    logger.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <AlertTriangle className="h-24 w-24 text-red-600" aria-hidden="true" />
        </div>

        {/* Error Title */}
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">{t("title")}</h1>

        {/* Error Description */}
        <p className="mb-2 text-lg text-gray-600 dark:text-gray-300">{t("description")}</p>

        {/* Error Details (in development) */}
        {process.env.NODE_ENV === "development" && (
          <details className="mb-8 rounded-lg bg-gray-100 p-4 text-left dark:bg-gray-800">
            <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">
              {t("technicalDetails")}
            </summary>
            <pre className="mt-4 overflow-auto text-sm text-gray-700 dark:text-gray-300">
              {error.message}
              {error.digest && `\n\n${t("errorDigest")}: ${error.digest}`}
            </pre>
          </details>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-white transition-colors hover:bg-red-700"
          >
            <RefreshCcw size={20} aria-hidden="true" />
            {t("tryAgain")}
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-6 py-3 text-gray-900 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            <Home size={20} aria-hidden="true" />
            {t("goHome")}
          </Link>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">{t("helpText")}</p>
      </div>
    </div>
  );
}
