"use client";

import { useEffect, useState, useCallback } from "react";
import Script from "next/script";
import { useFeatureFlagValue } from "@/lib/configcat/client-hooks";
import { useChatbotEligibility, type EligibilityConfig } from "./chatbot-eligibility";
import { ChatbotWelcomeBubble } from "./chatbot-welcome-bubble";

// Storage key for demo mode auto-open tracking
const DEMO_AUTO_OPENED_KEY = "chatbot-demo-auto-opened";

interface BotpressChatProps {
  botId?: string;
  hostUrl?: string;
  chatbotEnabled?: boolean;
  chatbotDemoMode?: boolean;
  locale?: string;
}

/**
 * Botpress Chat Widget Component with Targeting
 *
 * Integrates Botpress chatbot with smart targeting rules:
 * - Only shows to users in Mexico
 * - Only during business hours (Mon-Fri, 9am-6pm Mexico City time)
 * - Controlled via ConfigCat feature flags
 *
 * This helps optimize token usage by avoiding conversations with:
 * - Users outside Mexico (not potential members)
 * - Users outside business hours (when no human agents available)
 *
 * @example
 * ```tsx
 * <BotpressChat />
 * ```
 */
export function BotpressChat({
  botId = process.env.NEXT_PUBLIC_BOTPRESS_BOT_ID,
  hostUrl = process.env.NEXT_PUBLIC_BOTPRESS_HOST_URL,
  chatbotEnabled: chatbotEnabledProp,
  chatbotDemoMode: chatbotDemoModeProp,
  locale,
}: BotpressChatProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFirstDemoVisit, setIsFirstDemoVisit] = useState(false);

  // Check if this is the first demo visit (for auto-open behavior)
  // Wrapped in try-catch for private browsing mode compatibility
  const checkFirstDemoVisit = useCallback(() => {
    if (typeof window === "undefined") return false;
    try {
      return !localStorage.getItem(DEMO_AUTO_OPENED_KEY);
    } catch {
      // localStorage may throw in private browsing or when quota exceeded
      return false;
    }
  }, []);

  // Mark demo as having been auto-opened
  // Wrapped in try-catch for private browsing mode compatibility
  const markDemoAutoOpened = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(DEMO_AUTO_OPENED_KEY, Date.now().toString());
    } catch {
      // Silently fail - localStorage may throw in private browsing
    }
  }, []);

  // Get chatbot configuration from ConfigCat (fallback to client-side if not provided via props)
  const chatbotEnabledClient = useFeatureFlagValue("chatbot_enabled", false);
  const chatbotDemoModeClient = useFeatureFlagValue("chatbot_demo_mode", false);

  // Use props from server if available, otherwise use client-side values
  const chatbotEnabled = chatbotEnabledProp ?? chatbotEnabledClient;
  const chatbotDemoMode = chatbotDemoModeProp ?? chatbotDemoModeClient;

  // Debug: Log ConfigCat values
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("🔍 ConfigCat Debug:", {
        chatbot_enabled: chatbotEnabled,
        chatbot_demo_mode: chatbotDemoMode,
        bot_id: botId ? "configured" : "missing",
        source: chatbotEnabledProp !== undefined ? "server-props" : "client-hooks",
      });
    }
  }, [chatbotEnabled, chatbotDemoMode, botId, chatbotEnabledProp]);

  // Configuration with demo mode and locale support
  const eligibilityConfig: EligibilityConfig = {
    allowedCountries: ["MX", "Mexico", "México"],
    allowedLocales: ["es", "en"], // Chatbot only available in Spanish and English
    currentLocale: locale,
    businessHours: {
      timezone: "America/Mexico_City",
      days: [1, 2, 3, 4, 5], // Monday to Friday
      startHour: 9,
      endHour: 18,
    },
    enabled: chatbotEnabled,
    demoMode: chatbotDemoMode, // Pass demo mode to eligibility checker (bypasses locale restriction)
  };

  // Check eligibility based on country and business hours
  const { isEligible, isLoading, reason } = useChatbotEligibility(eligibilityConfig);

  useEffect(() => {
    if (!isLoading && isEligible && botId) {
      setShouldLoad(true);

      // In demo mode, check if this is the first visit
      if (chatbotDemoMode) {
        const firstVisit = checkFirstDemoVisit();
        setIsFirstDemoVisit(firstVisit);

        if (process.env.NODE_ENV === "development") {
          console.log(
            `🎯 Botpress chatbot: DEMO MODE - Loading for everyone (first visit: ${firstVisit})`
          );
        }
      } else {
        if (process.env.NODE_ENV === "development") {
          console.log("Botpress chatbot: User is eligible. Loading chatbot...");
        }
      }
    } else if (!isLoading && !isEligible) {
      if (process.env.NODE_ENV === "development") {
        console.log(`Botpress chatbot: User not eligible. Reason: ${reason}`);
      }
    }
  }, [isLoading, isEligible, botId, reason, chatbotDemoMode, checkFirstDemoVisit]);

  // Add alt attribute to Botpress FAB image for accessibility and SEO
  useEffect(() => {
    if (!shouldLoad) return;

    const addAltToFabImage = () => {
      const fabImage = document.querySelector("img.bpFabImage") as HTMLImageElement;
      if (fabImage && !fabImage.alt) {
        fabImage.alt = "Chat assistant";
      }
    };

    // Try immediately
    addAltToFabImage();

    // Also observe for dynamic changes
    const observer = new MutationObserver(() => {
      addAltToFabImage();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [shouldLoad]);

  // Track Botpress chat open/close state
  useEffect(() => {
    if (!shouldLoad) return;

    // Track timers for cleanup
    let retryIntervalId: ReturnType<typeof setInterval> | null = null;
    let cleanupTimeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleChatOpen = () => {
      setIsChatOpen(true);
      if (process.env.NODE_ENV === "development") {
        console.log("📬 Botpress chat opened");
      }
    };

    const handleChatClose = () => {
      setIsChatOpen(false);
      if (process.env.NODE_ENV === "development") {
        console.log("📪 Botpress chat closed");
      }
    };

    // Listen for Botpress events
    const setupListeners = () => {
      // @ts-expect-error - Botpress webchat API
      if (window.botpress) {
        // @ts-expect-error - Botpress webchat API
        window.botpress.on?.("webchat:opened", handleChatOpen);
        // @ts-expect-error - Botpress webchat API
        window.botpress.on?.("webchat:closed", handleChatClose);
        return true;
      }
      return false;
    };

    // Try immediately
    if (!setupListeners()) {
      // Retry a few times as Botpress may not be ready yet
      retryIntervalId = setInterval(() => {
        if (setupListeners()) {
          if (retryIntervalId) clearInterval(retryIntervalId);
          retryIntervalId = null;
        }
      }, 500);

      // Clean up retry interval after 10 seconds
      cleanupTimeoutId = setTimeout(() => {
        if (retryIntervalId) {
          clearInterval(retryIntervalId);
          retryIntervalId = null;
        }
      }, 10000);
    }

    return () => {
      // Clean up timers to prevent memory leaks
      if (retryIntervalId) {
        clearInterval(retryIntervalId);
        retryIntervalId = null;
      }
      if (cleanupTimeoutId) {
        clearTimeout(cleanupTimeoutId);
        cleanupTimeoutId = null;
      }

      // @ts-expect-error - Botpress webchat API
      if (window.botpress) {
        // @ts-expect-error - Botpress webchat API
        window.botpress.off?.("webchat:opened", handleChatOpen);
        // @ts-expect-error - Botpress webchat API
        window.botpress.off?.("webchat:closed", handleChatClose);
      }
    };
  }, [shouldLoad]);

  // If no botId is configured, don't render the chatbot
  if (!botId) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Botpress chatbot: No botId configured. Set NEXT_PUBLIC_BOTPRESS_BOT_ID environment variable."
      );
    }
    return null;
  }

  // Don't load if user is not eligible
  if (!shouldLoad) {
    return null;
  }

  // Detect Botpress version based on Bot ID format
  // v3.4: YYYYMMDDHHMMSS-XXXXXXXX (e.g., 20251108190059-6BB87X6P)
  // v1/v2: UUID format (e.g., 6f27a336-b27b-4820-8db7-954149922217)
  const isV3Bot = botId.match(/^\d{14}-[A-Z0-9]{8}$/);
  const isV1V2Bot = botId.match(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i);

  // Auto-detect host URL if not provided
  const defaultHostUrl = isV3Bot
    ? "https://cdn.botpress.cloud/webchat/v3.4"
    : "https://cdn.botpress.cloud/webchat/v1";
  const finalHostUrl = hostUrl || defaultHostUrl;

  if (process.env.NODE_ENV === "development") {
    console.log("🤖 Botpress version detection:", {
      botId,
      isV3: !!isV3Bot,
      isV1V2: !!isV1V2Bot,
      hostUrl: finalHostUrl,
      autoDetected: !hostUrl,
    });
  }

  // For v3.4, use script-based injection with JSON config
  if (isV3Bot) {
    const injectUrl = `${finalHostUrl}/inject.js`;
    const configUrl = `https://files.bpcontent.cloud/2025/11/08/19/${botId}.json`;

    return (
      <>
        {/* Welcome bubble - hidden on first demo visit since chatbot auto-opens */}
        <ChatbotWelcomeBubble
          demoMode={chatbotDemoMode}
          isChatOpen={isChatOpen}
          hideOnFirstDemoVisit={isFirstDemoVisit}
        />

        {/* Load Botpress v3.4 inject script */}
        <Script
          src={injectUrl}
          strategy="afterInteractive"
          onLoad={() => {
            if (process.env.NODE_ENV === "development") {
              console.log("✅ Botpress v3.4 inject script loaded");
            }
            // Initialize the webchat with the config URL
            if (typeof window !== "undefined") {
              // Fetch the config and initialize
              fetch(configUrl)
                .then((res) => res.json())
                .then((config) => {
                  if (process.env.NODE_ENV === "development") {
                    console.log("✅ Botpress v3.4 config loaded:", config);
                  }
                  // @ts-expect-error - Botpress webchat API
                  if (window.botpress && window.botpress.init) {
                    // @ts-expect-error - Botpress webchat API
                    window.botpress.init(config);
                    if (process.env.NODE_ENV === "development") {
                      console.log("✅ Botpress v3.4 webchat initialized");
                    }

                    // Auto-open the webchat in demo mode ONLY on first visit
                    if (chatbotDemoMode && isFirstDemoVisit) {
                      setTimeout(() => {
                        // @ts-expect-error - Botpress webchat API
                        if (window.botpress && window.botpress.open) {
                          // @ts-expect-error - Botpress webchat API
                          window.botpress.open();
                          // Mark that we've auto-opened so next visit won't auto-open
                          markDemoAutoOpened();
                          if (process.env.NODE_ENV === "development") {
                            console.log(
                              "🎯 Botpress v3.4 webchat opened automatically (DEMO MODE - first visit)"
                            );
                          }
                        }
                      }, 1500);
                    }
                  }
                })
                .catch((err) => {
                  console.error("Failed to load Botpress v3.4 config:", err);
                });
            }
          }}
          onError={(e) => {
            console.error("Failed to load Botpress v3.4 inject script:", e);
          }}
        />
      </>
    );
  }

  // For v1/v2, use the original script-based approach
  const injectUrl = `${finalHostUrl}/inject.js`;
  const configUrl = `${finalHostUrl}/config.js`;

  return (
    <>
      {/* Welcome bubble - hidden on first demo visit since chatbot auto-opens */}
      <ChatbotWelcomeBubble
        demoMode={chatbotDemoMode}
        isChatOpen={isChatOpen}
        hideOnFirstDemoVisit={isFirstDemoVisit}
      />

      {/* Load Botpress Webchat v1/v2 */}
      <Script
        src={injectUrl}
        strategy="lazyOnload"
        onLoad={() => {
          if (process.env.NODE_ENV === "development") {
            console.log("Botpress webchat inject script loaded (v1/v2)");
          }
        }}
        onError={(e) => {
          console.error("Failed to load Botpress webchat inject script:", e);
        }}
      />
      <Script
        src={configUrl}
        strategy="lazyOnload"
        defer
        onLoad={() => {
          if (process.env.NODE_ENV === "development") {
            console.log("Botpress bot config loaded (v1/v2)");
          }
        }}
        onError={(e) => {
          console.error("Failed to load Botpress bot config:", e);
          if (process.env.NODE_ENV === "development") {
            console.error("Config URL attempted:", configUrl);
          }
        }}
      />
    </>
  );
}
