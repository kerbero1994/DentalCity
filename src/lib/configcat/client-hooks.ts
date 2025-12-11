"use client";

import { useFeatureFlag } from "configcat-react";

/**
 * ConfigCat client-side hooks
 * Use these hooks in client components to access feature flags
 */

// Helper hook to get feature flag value in client components
export function useFeatureFlagValue<T = boolean>(key: string, defaultValue: T): T {
  const { value, loading } = useFeatureFlag(key, defaultValue as any);

  if (loading) {
    return defaultValue;
  }

  return value as T;
}

// Feature flag keys
export const FeatureFlags = {
  ENABLE_NEW_HEADER: "enableNewHeader",
  ENABLE_DARK_MODE: "enableDarkMode",
  ENABLE_ANALYTICS: "enableAnalytics",
  MAINTENANCE_MODE: "maintenanceMode",
  ENABLE_BETA_FEATURES: "enableBetaFeatures",
  BONUS_V2: "bonus_v2",

  // Chatbot feature flags
  CHATBOT_ENABLED: "chatbot_enabled", // Master switch: enable/disable chatbot
  CHATBOT_DEMO_MODE: "chatbot_demo_mode", // Demo mode: bypass geo/time restrictions
  CHATBOT_CONFIG: "chatbot_config", // Advanced config (not used currently)
} as const;

export type FeatureFlagKey = (typeof FeatureFlags)[keyof typeof FeatureFlags];
