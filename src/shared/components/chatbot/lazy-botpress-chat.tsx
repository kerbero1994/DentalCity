"use client";

import dynamic from "next/dynamic";

// Lazy load BotpressChat - splits it into a separate chunk
const BotpressChat = dynamic(() => import("./botpress-chat").then((mod) => mod.BotpressChat), {
  ssr: false,
});

interface LazyBotpressChatProps {
  chatbotEnabled?: boolean;
  chatbotDemoMode?: boolean;
  locale?: string;
}

export function LazyBotpressChat({
  chatbotEnabled,
  chatbotDemoMode,
  locale,
}: LazyBotpressChatProps) {
  // Don't render anything if chatbot is disabled - prevents loading inject.js
  if (!chatbotEnabled) {
    return null;
  }

  return (
    <BotpressChat
      chatbotEnabled={chatbotEnabled}
      chatbotDemoMode={chatbotDemoMode}
      locale={locale}
    />
  );
}
