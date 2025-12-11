/**
 * Web Vitals reporting
 * Tracks Core Web Vitals and sends them to your analytics endpoint
 */

import { logger } from "@/shared/utils/logger";
import type { Metric } from "web-vitals";

// Send vitals to your analytics endpoint
function sendToAnalytics(metric: Metric) {
  // Replace with your analytics endpoint
  const analyticsEndpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;

  if (!analyticsEndpoint) {
    // In development, log to console
    if (process.env.NODE_ENV === "development") {
      logger.log("[Web Vitals]", {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
      });
    }
    return;
  }

  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  });

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
  const blob = new Blob([body], { type: "application/json" });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(analyticsEndpoint, blob);
  } else {
    fetch(analyticsEndpoint, {
      body,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    }).catch((error) => {
      logger.error("Failed to send web vitals:", error);
    });
  }
}

export function reportWebVitals(metric: Metric) {
  sendToAnalytics(metric);

  // Send to Google Analytics if configured
  if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    sendToGoogleAnalytics(metric);
  }

  // You can also send to other analytics services
  // sendToVercelAnalytics(metric);
}

// Optional: Send to Google Analytics
export function sendToGoogleAnalytics(metric: Metric) {
  // @ts-expect-error - gtag is loaded via script
  if (typeof window.gtag === "function") {
    // @ts-expect-error - gtag types
    window.gtag("event", metric.name, {
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      event_category: "Web Vitals",
      event_label: metric.id,
      non_interaction: true,
    });
  }
}

// Optional: Send to Vercel Analytics
export function sendToVercelAnalytics(metric: Metric) {
  // @ts-expect-error - vercel analytics types
  if (typeof window.va === "function") {
    // @ts-expect-error - vercel analytics types
    window.va("event", {
      name: metric.name,
      data: {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
      },
    });
  }
}

/**
 * Core Web Vitals thresholds
 * Based on https://web.dev/vitals/
 */
export const VITALS_THRESHOLDS = {
  // Largest Contentful Paint (LCP)
  LCP: {
    good: 2500, // ms
    needsImprovement: 4000, // ms
  },
  // First Input Delay (FID)
  FID: {
    good: 100, // ms
    needsImprovement: 300, // ms
  },
  // Cumulative Layout Shift (CLS)
  CLS: {
    good: 0.1,
    needsImprovement: 0.25,
  },
  // First Contentful Paint (FCP)
  FCP: {
    good: 1800, // ms
    needsImprovement: 3000, // ms
  },
  // Time to First Byte (TTFB)
  TTFB: {
    good: 800, // ms
    needsImprovement: 1800, // ms
  },
  // Interaction to Next Paint (INP)
  INP: {
    good: 200, // ms
    needsImprovement: 500, // ms
  },
} as const;

export function getVitalRating(name: string, value: number): "good" | "needs-improvement" | "poor" {
  const thresholds = VITALS_THRESHOLDS[name as keyof typeof VITALS_THRESHOLDS];

  if (!thresholds) return "good";

  if (value <= thresholds.good) return "good";
  if (value <= thresholds.needsImprovement) return "needs-improvement";
  return "poor";
}
