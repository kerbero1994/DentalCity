import {
  getClient,
  PollingMode,
  createConsoleLogger,
  LogLevel,
  type User,
  type SettingValue,
} from "configcat-node";
import { logger } from "@/shared/utils/logger";

// ConfigCat SDK Key - Get this from ConfigCat dashboard
const sdkKey = process.env.NEXT_PUBLIC_CONFIGCAT_SDK_KEY || "";

if (!sdkKey && process.env.NODE_ENV === "production") {
  logger.warn("ConfigCat SDK Key is not set. Feature flags will use default values.");
}

// Create the ConfigCat client with options for Node.js (server-side)
export const configCatClient = sdkKey
  ? getClient(sdkKey, PollingMode.AutoPoll, {
      pollIntervalSeconds: 60, // Poll for changes every 60 seconds
      logger: createConsoleLogger(
        process.env.NODE_ENV === "development" ? LogLevel.Info : LogLevel.Warn
      ),
    })
  : null;

// Feature flag keys - Define your feature flags here
export const FeatureFlags = {
  // Example flags
  ENABLE_NEW_HEADER: "enableNewHeader",
  ENABLE_DARK_MODE: "enableDarkMode",
  ENABLE_ANALYTICS: "enableAnalytics",
  MAINTENANCE_MODE: "maintenanceMode",
  ENABLE_BETA_FEATURES: "enableBetaFeatures",
  BONUS_V2: "bonus_v2",

  // Chatbot feature flags
  CHATBOT_ENABLED: "chatbot_enabled",
  CHATBOT_DEMO_MODE: "chatbot_demo_mode",

  // Blog feature flags
  BLOG_V2: "blog_v2",
} as const;

export type FeatureFlagKey = (typeof FeatureFlags)[keyof typeof FeatureFlags];

// Helper function to get a feature flag value
export async function getFeatureFlag(
  key: FeatureFlagKey,
  defaultValue: boolean = false,
  userObject?: User
): Promise<boolean> {
  if (!configCatClient) {
    return defaultValue;
  }

  try {
    const value = await configCatClient.getValueAsync(key, defaultValue, userObject);
    return value;
  } catch (error) {
    logger.error(`Error fetching feature flag ${key}:`, error);
    return defaultValue;
  }
}

// Helper function to get all feature flags at once
export async function getAllFeatureFlags(userObject?: User): Promise<Record<string, SettingValue>> {
  if (!configCatClient) {
    return {};
  }

  try {
    const allValues = await configCatClient.getAllValuesAsync(userObject);
    // Convert array to object
    const result: Record<string, SettingValue> = {};
    allValues.forEach((item) => {
      result[item.settingKey] = item.settingValue;
    });
    return result;
  } catch (error) {
    logger.error("Error fetching all feature flags:", error);
    return {};
  }
}

// Dispose of the client when shutting down (important for server-side)
export function disposeConfigCat() {
  if (configCatClient) {
    configCatClient.dispose();
  }
}
