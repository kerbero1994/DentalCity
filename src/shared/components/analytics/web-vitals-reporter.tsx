"use client";

import { useReportWebVitals } from "next/web-vitals";
import { reportWebVitals } from "@/infrastructure/analytics/web-vitals";

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    reportWebVitals(metric);
  });

  return null;
}
