"use client";

import { captureException } from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

/**
 * Global error boundary for Next.js
 * This component catches errors that occur in the app and sends them to Sentry
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-errors-in-root-layouts
 */
export default function GlobalError({
  error,
  reset: _reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Capture error in Sentry
    captureException(error, {
      tags: {
        boundary: "global",
      },
    });
  }, [error]);

  return (
    <html lang="en">
      <body>
        {/* This is the default Next.js error component. It will be replaced by your custom error component in production */}
        <NextError statusCode={500} />
      </body>
    </html>
  );
}
