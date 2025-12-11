"use client";

import { useFeatureFlag as useBaseFeatureFlag } from "configcat-react";
import { FeatureFlagKey } from "./client";

/**
 * Hook to get a feature flag value on the client side
 * @param key - The feature flag key
 * @param defaultValue - Default value if flag is not found
 * @returns The feature flag value
 */
export function useFeatureFlag(key: FeatureFlagKey, defaultValue: boolean = false): boolean {
  const { value, loading } = useBaseFeatureFlag(key, defaultValue);

  // Return default value while loading
  if (loading) {
    return defaultValue;
  }

  return value;
}

/**
 * Hook to check if a feature flag is enabled (true)
 * @param key - The feature flag key
 * @returns true if the flag is enabled, false otherwise
 */
export function useIsFeatureEnabled(key: FeatureFlagKey): boolean {
  return useFeatureFlag(key, false);
}

/**
 * Hook to check if a feature flag is disabled (false)
 * @param key - The feature flag key
 * @returns true if the flag is disabled, false otherwise
 */
export function useIsFeatureDisabled(key: FeatureFlagKey): boolean {
  return !useFeatureFlag(key, false);
}
