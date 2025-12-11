/**
 * Google Analytics 4 component
 * Tracks page views and events
 */

"use client";

import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId?: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const GA_MEASUREMENT_ID = measurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
