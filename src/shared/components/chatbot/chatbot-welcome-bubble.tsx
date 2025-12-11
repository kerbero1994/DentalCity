"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import styles from "./chatbot-welcome-bubble.module.css";

// Session duration: 30 minutes in milliseconds
const SESSION_DURATION_MS = 30 * 60 * 1000;
// Storage keys
const STORAGE_KEY_DISMISSED = "chatbot-welcome-dismissed-at";
const STORAGE_KEY_SEEN = "chatbot-bubble-seen-at";

interface ChatbotWelcomeBubbleProps {
  demoMode?: boolean;
  isChatOpen?: boolean;
  hideOnFirstDemoVisit?: boolean;
}

export function ChatbotWelcomeBubble({
  demoMode = false,
  isChatOpen = false,
  hideOnFirstDemoVisit = false,
}: ChatbotWelcomeBubbleProps) {
  const t = useTranslations("common");
  const tChatbot = useTranslations("chatbot.welcomeBubble");
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const initialPathRef = useRef<string | null>(null);

  // Helper to hide bubble with animation
  const hideBubble = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsExiting(false);
    }, 200); // Match animation duration
  }, []);

  // Helper to check if within session time (30 minutes)
  const isWithinSession = useCallback((timestamp: string | null): boolean => {
    if (!timestamp) return false;
    const storedTime = parseInt(timestamp, 10);
    return Date.now() - storedTime < SESSION_DURATION_MS;
  }, []);

  // Initialize: check if bubble should be shown
  useEffect(() => {
    // Clean up old localStorage key (migration)
    localStorage.removeItem("chatbot-welcome-dismissed");

    // Check if user has dismissed the bubble recently (within 30 min)
    const dismissedAt = sessionStorage.getItem(STORAGE_KEY_DISMISSED);
    if (isWithinSession(dismissedAt)) {
      setIsDismissed(true);
      return;
    }

    // Check if user has seen the bubble and navigated away without interacting
    const seenAt = sessionStorage.getItem(STORAGE_KEY_SEEN);
    if (isWithinSession(seenAt)) {
      // User saw the bubble before, don't show it again this session
      setIsDismissed(true);
      return;
    }

    // Store initial path to detect navigation
    initialPathRef.current = pathname;

    // Show bubble after a short delay (only if chat is not already open)
    const timer = setTimeout(() => {
      if (!isChatOpen) {
        setIsVisible(true);
        // Mark that user has seen the bubble
        sessionStorage.setItem(STORAGE_KEY_SEEN, Date.now().toString());
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isWithinSession, isChatOpen, pathname]);

  // Hide bubble when chat opens
  useEffect(() => {
    if (isChatOpen && isVisible && !isExiting) {
      hideBubble();
    }
  }, [isChatOpen, isVisible, isExiting, hideBubble]);

  // Hide bubble on page navigation (if user didn't interact)
  useEffect(() => {
    if (initialPathRef.current && pathname !== initialPathRef.current && isVisible) {
      // User navigated to a different page without interacting
      hideBubble();
      setIsDismissed(true);
      // Keep the "seen" marker so it doesn't show again this session
    }
  }, [pathname, isVisible, hideBubble]);

  const handleDismiss = () => {
    hideBubble();
    setIsDismissed(true);
    // Store timestamp in sessionStorage - will auto-expire after 30 min or when tab closes
    sessionStorage.setItem(STORAGE_KEY_DISMISSED, Date.now().toString());
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Find and highlight the Botpress button
    const botpressButton = document.querySelector(
      '[id*="botpress"], [class*="botpress"]'
    ) as HTMLElement;
    if (botpressButton) {
      botpressButton.style.transform = "scale(1.1)";
      botpressButton.style.transition = "transform 0.2s ease";
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset Botpress button
    const botpressButton = document.querySelector(
      '[id*="botpress"], [class*="botpress"]'
    ) as HTMLElement;
    if (botpressButton) {
      botpressButton.style.transform = "scale(1)";
    }
  };

  const handleBubbleClick = () => {
    // Hide the bubble with animation
    hideBubble();

    // Open the chatbot when clicking the bubble
    // @ts-expect-error - Botpress webchat API
    if (typeof window !== "undefined" && window.botpress && window.botpress.open) {
      // @ts-expect-error - Botpress webchat API
      window.botpress.open();
    }
  };

  // Don't show if:
  // 1. Dismissed by user
  // 2. Not visible and not exiting
  // 3. In demo mode on first visit (chatbot auto-opens instead)
  if (isDismissed || (!isVisible && !isExiting) || (demoMode && hideOnFirstDemoVisit)) {
    return null;
  }

  return (
    <div
      ref={bubbleRef}
      className={`${styles.welcomeBubble} ${isHovered ? styles.hovered : ""} ${isExiting ? styles.exiting : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleBubbleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleBubbleClick();
        }
      }}
    >
      <button
        className={styles.closeButton}
        onClick={(e) => {
          e.stopPropagation(); // Prevent bubble click when closing
          handleDismiss();
        }}
        aria-label={t("close")}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 1L1 13M1 1L13 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className={styles.bubbleContent}>
        <p className={styles.greeting}>
          {demoMode ? tChatbot("demoGreeting") : tChatbot("greeting")}
        </p>
        <p className={styles.message}>{demoMode ? tChatbot("demoMessage") : tChatbot("message")}</p>
      </div>
      {/* Triangle pointer */}
      <div className={styles.triangle} />
    </div>
  );
}
