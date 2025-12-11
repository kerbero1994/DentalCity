import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";
import { withSentryConfig } from "@sentry/nextjs";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      { protocol: "https", hostname: "sitimm-files.nyc3.digitaloceanspaces.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
    // Simplified quality settings - 75 for most images, 90 for hero/featured
    qualities: [75, 90],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/:path*",
        headers: [
          // Content Security Policy (CSP)
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://www.googletagmanager.com https://cdn.botpress.cloud https://files.bpcontent.cloud",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.sitimm.org https://sitimm-files.nyc3.digitaloceanspaces.com https://vercel.live https://www.youtube.com https://*.sentry.io https://www.google-analytics.com https://analytics.google.com https://*.botpress.cloud https://files.bpcontent.cloud https://cdn-global.configcat.com",
              "media-src 'self' https://sitimm-files.nyc3.digitaloceanspaces.com https://www.youtube.com https://youtube.com",
              "frame-src 'self' https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com https://zoom.us https://*.zoom.us https://cdn.botpress.cloud https://files.bpcontent.cloud",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ]
              .join("; ")
              .replace(/\s+/g, " "),
          },
          // Prevent clickjacking attacks - but allow our site to embed YouTube
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // Prevent MIME type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Referrer Policy
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions Policy (formerly Feature Policy)
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=(self)",
              "interest-cohort=()",
              "payment=()",
              "usb=()",
            ].join(", "),
          },
          // XSS Protection (legacy but still useful for older browsers)
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Strict Transport Security (HSTS)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

// Sentry configuration options
const sentryOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,

  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Only upload source maps in production
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
};

// Export the final configuration
// Apply plugins in order: Sentry -> BundleAnalyzer -> NextIntl
export default withSentryConfig(withBundleAnalyzer(withNextIntl(nextConfig)), sentryOptions);
