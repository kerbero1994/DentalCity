"use client";

import { ConfigCatProvider as ConfigCatReactProvider, PollingMode } from "configcat-react";

interface ConfigCatProviderProps {
  children: React.ReactNode;
}

export function ConfigCatProvider({ children }: ConfigCatProviderProps) {
  const sdkKey = process.env.NEXT_PUBLIC_CONFIGCAT_SDK_KEY;

  // Debug: Log SDK key status
  if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
    console.log("🔑 ConfigCat SDK Key:", sdkKey ? "✅ Present" : "❌ Missing");
  }

  // If no SDK key or invalid key, just render children without ConfigCat
  if (!sdkKey || sdkKey === "your-sdk-key-here" || sdkKey.trim() === "") {
    // Only log once in development
    if (process.env.NODE_ENV === "development" && typeof window === "undefined") {
      console.info("ℹ️ ConfigCat: Using default feature flag values (SDK key not configured)");
    }
    return <>{children}</>;
  }

  return (
    <ConfigCatReactProvider
      sdkKey={sdkKey}
      pollingMode={PollingMode.AutoPoll}
      options={{
        pollIntervalSeconds: 60,
        logger: {
          // Suppress ConfigCat logs in development to reduce console noise
          log: () => {},
        },
        setupHooks: (hooks) => {
          hooks.on("configChanged", () => {
            if (process.env.NODE_ENV === "development") {
              console.log("✅ [ConfigCat] Configuration updated");
            }
          });
        },
      }}
    >
      {children}
    </ConfigCatReactProvider>
  );
}
